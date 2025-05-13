const fs = require('fs')
const { parse } = require('csv-parse/sync')
const https = require('https')
const querystring = require('querystring')
const readline = require('readline')

// Get input and output filenames from command line arguments
const inputFile = process.argv[2] || 'hack/sectii_votare.csv'
const idsFile = process.argv[3] || 'registered.txt'
const outputFile = process.argv[4] || 'src/assets/locations.json'

// Helper function to make geocoding API requests
async function getCoordinates(address) {
  // The address format in your example is not ideal for geocoding
  // Let's improve it by extracting more structured information

  // Extract components from the address
  let cleanAddress = address

  // Remove "Loc. " prefix if present
  cleanAddress = cleanAddress.replace(/^Loc\.\s+/, '')

  // Extract the sector information
  const sectorMatch = cleanAddress.match(/BUCUREŞTI SECTORUL (\d+)/i)
  const sector = sectorMatch ? sectorMatch[1] : ''

  // Extract street name if available
  const streetMatch = cleanAddress.match(/Strada\s+([^,]+)/i)
  const street = streetMatch ? streetMatch[1].trim() : ''

  // Extract number if available
  const numberMatch = cleanAddress.match(/Nr\.\s+([^,]+)/i)
  const number = numberMatch ? numberMatch[1].trim() : ''

  // Build a better formatted address for geocoding
  let formattedAddress = ''
  if (street) {
    // If we have a street name, use it with the number
    formattedAddress = `${street} ${number}, Sector ${sector}, Bucuresti, Romania`
  } else {
    // If no street name, try with just sector and number
    formattedAddress = `Sector ${sector}, ${number}, Bucuresti, Romania`
  }

  console.log(`Original address: ${address}`)
  console.log(`Formatted address for geocoding: ${formattedAddress}`)

  // Prepare the query parameters
  const params = querystring.stringify({
    q: formattedAddress,
    format: 'json',
    limit: 1,
  })

  // Try with the formatted address first
  let coordinates = await makeGeocodingRequest(params)

  // If that fails, try with the original address
  if (coordinates.lat === null) {
    console.log('First attempt failed, trying with original address...')
    const originalParams = querystring.stringify({
      q: `${address}, Romania`,
      format: 'json',
      limit: 1,
    })
    coordinates = await makeGeocodingRequest(originalParams)
  }

  // If that also fails, try with just "Bucuresti Sector X"
  if (coordinates.lat === null && sector) {
    console.log('Second attempt failed, trying with just sector...')
    const sectorParams = querystring.stringify({
      q: `Bucuresti Sector ${sector}, Romania`,
      format: 'json',
      limit: 1,
    })
    coordinates = await makeGeocodingRequest(sectorParams)
  }

  return coordinates
}

// Helper function to make the actual API request
function makeGeocodingRequest(params) {
  return new Promise((resolve, reject) => {
    // Add a delay to respect API rate limits (1 request per second is recommended)
    setTimeout(() => {
      // Nominatim usage policy requires a unique user agent identifying the application
      const options = {
        hostname: 'nominatim.openstreetmap.org',
        path: `/search?${params}`,
        method: 'GET',
        headers: {
          'User-Agent': 'SV-Location-Finder/1.0', // Change this to your app name/version
          Accept: 'application/json',
        },
      }

      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          try {
            const response = JSON.parse(data)
            if (response && response.length > 0) {
              console.log('Geocoding successful!')
              resolve({
                lat: parseFloat(response[0].lat),
                lon: parseFloat(response[0].lon),
              })
            } else {
              console.log('No geocoding results found')
              resolve({ lat: null, lon: null }) // No results found
            }
          } catch (error) {
            console.error('Error parsing geocoding response:', error)
            resolve({ lat: null, lon: null }) // Error fallback
          }
        })
      })

      req.on('error', (error) => {
        console.error('Error making geocoding request:', error)
        resolve({ lat: null, lon: null }) // Error fallback
      })

      req.end()
    }, 1000) // 1 second delay between requests
  })
}

// Helper function to read existing JSON or return empty array if file doesn't exist
function readExistingJson(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error(`Error reading existing JSON file: ${error.message}`)
  }
  return []
}

// Helper function to read IDs from a text file
// Each ID should be on a separate line
async function readIdsFromFile(filePath) {
  const ids = new Set()

  if (!fs.existsSync(filePath)) {
    console.error(`IDs file not found: ${filePath}`)
    return ids
  }

  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const trimmedLine = line.trim()
    if (trimmedLine) {
      ids.add(trimmedLine)
    }
  }

  return ids
}

// Helper function to log all information about a record
function logRecordInfo(record) {
  console.log('Record details:')
  for (const [key, value] of Object.entries(record)) {
    console.log(`  ${key}: ${value}`)
  }
}

// Process the CSV file
async function processCSV() {
  try {
    // Read the list of IDs to process
    console.log(`Reading IDs from ${idsFile}...`)
    const idsToProcess = await readIdsFromFile(idsFile)
    console.log(`Found ${idsToProcess.size} IDs to process: ${[...idsToProcess].join(', ')}`)

    if (idsToProcess.size === 0) {
      console.error('No IDs found to process. Exiting.')
      return
    }

    // Read existing results if output file exists
    let existingResults = []
    if (fs.existsSync(outputFile)) {
      try {
        const fileContent = fs.readFileSync(outputFile, 'utf8')
        existingResults = JSON.parse(fileContent)
        // Ensure existingResults is an array
        if (!Array.isArray(existingResults)) {
          console.error(
            'Warning: Output file does not contain an array. Starting with empty array.',
          )
          existingResults = []
        }
      } catch (error) {
        console.error(`Error reading existing JSON file: ${error.message}`)
        console.error('Starting with empty results array')
        existingResults = []
      }
    }

    console.log(`Found ${existingResults.length} existing results in output file`)

    // Create a map of existing results for quick lookup
    const existingResultsMap = new Map()
    for (const record of existingResults) {
      existingResultsMap.set(record.id, record)
    }

    // Filter out IDs that already have GPS coordinates
    const idsToSkip = new Set()
    for (const id of idsToProcess) {
      const existing = existingResultsMap.get(id)
      if (existing && existing.latitude !== null && existing.longitude !== null) {
        idsToSkip.add(id)
      }
    }

    console.log(`Skipping ${idsToSkip.size} IDs that already have GPS coordinates`)

    // Read and parse the CSV file
    console.log(`Reading CSV from ${inputFile}...`)
    const csvData = fs.readFileSync(inputFile, 'utf8')
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })

    console.log(`Total records in CSV: ${records.length}`)

    // Log the columns in the CSV for debugging
    if (records.length > 0) {
      console.log('CSV columns:', Object.keys(records[0]))
    }

    // Filter records by ID
    const recordsToProcess = records.filter((record) => {
      const id = record['Nr SV']
      const inIdsList = idsToProcess.has(id)
      const shouldSkip = idsToSkip.has(id)

      if (inIdsList && !shouldSkip) {
        return true
      }
      return false
    })

    console.log(
      `Records to process: ${recordsToProcess.length} of ${idsToProcess.size} requested IDs`,
    )

    // Log which IDs were not found in the CSV
    const foundIds = new Set(recordsToProcess.map((r) => r['Nr SV']))
    const notFoundIds = [...idsToProcess].filter((id) => !foundIds.has(id) && !idsToSkip.has(id))
    if (notFoundIds.length > 0) {
      console.log(
        `Warning: ${notFoundIds.length} IDs were not found in the CSV: ${notFoundIds.join(', ')}`,
      )
    }

    if (recordsToProcess.length === 0) {
      console.log('No new records to process. Exiting.')
      return
    }

    // Process records and get coordinates
    const newResults = []
    for (let i = 0; i < recordsToProcess.length; i++) {
      const record = recordsToProcess[i]
      const id = record['Nr SV']
      const address = record['Adresa SV'] + ' ' + record['Adresa SV descriptivă']

      console.log(`\nProcessing ${i + 1}/${recordsToProcess.length}: ID ${id}`)
      logRecordInfo(record)

      // Skip if we already have this ID with coordinates
      if (existingResultsMap.has(id) && existingResultsMap.get(id).latitude !== null) {
        console.log(`  ID ${id} already has coordinates in output file, skipping`)
        continue
      }

      console.log(`  Address: ${address}`)
      // Get coordinates for this address
      const coordinates = await getCoordinates(address)
      console.log(`  Coordinates: ${coordinates.lat}, ${coordinates.lon}`)

      // Create result entry
      const result = {
        id,
        address,
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      }

      // Add to our results array
      newResults.push(result)

      // Update existing map
      existingResultsMap.set(id, result)

      // Immediately write results after each address is processed
      // Properly merge with existing results
      // First, remove any existing record with this ID (if present)
      const filteredExistingResults = existingResults.filter((r) => r.id !== id)
      // Then append the new result
      const updatedResults = [...filteredExistingResults, result]
      fs.writeFileSync(outputFile, JSON.stringify(updatedResults, null, 2))
      console.log(`  Updated output file with ID ${id}`)
    }

    console.log(
      `\nProcessing complete. Added/updated ${newResults.length} records in ${outputFile}`,
    )
  } catch (error) {
    console.error('Error processing CSV:', error.message)
  }
}

// Execute the async function
processCSV()
