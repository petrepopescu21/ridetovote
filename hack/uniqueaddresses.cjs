#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { parse } = require('csv-parse/sync')

// --- CLI args & config ---
const [
  ,
  ,
  inputFile = 'hack/sectii_votare.csv',
  idsFile = 'registered.txt',
  outputFile = 'src/assets/locations.json',
] = process.argv
const API_KEY = process.env.GOOGLE_MAPS_API_KEY
if (!API_KEY) {
  console.error('❌  ERROR: set your GOOGLE_MAPS_API_KEY in the environment')
  process.exit(1)
}

// --- Helper to call Google Geocoding API with raw address ---
async function geocode(rawAddress) {
  try {
    const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: { address: rawAddress, key: API_KEY },
    })
    const data = res.data
    if (data.status === 'OK' && data.results.length) {
      const { lat, lng } = data.results[0].geometry.location
      console.log(`✅  OK: ${rawAddress} → ${lat},${lng}`)
      return { lat, lon: lng }
    } else {
      // Log full API response for errors or zero results
      console.error(
        `❌  Geocode failed for ${rawAddress} - status: ${data.status}${data.error_message ? `, error_message: ${data.error_message}` : ''} - full response: ${JSON.stringify(data)}`,
      )
    }
  } catch (err) {
    // Log entire error object if request fails
    console.error(`❌  Geocode error for ${rawAddress} -`, err)
  }
  return { lat: null, lon: null }
}

// --- Main execution ---
;(async () => {
  // 1) Read IDs
  if (!fs.existsSync(idsFile)) {
    console.error(`❌  IDs file not found: ${idsFile}`)
    process.exit(1)
  }
  const ids = new Set(
    fs
      .readFileSync(idsFile, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean),
  )
  if (!ids.size) {
    console.error('❌  No IDs to process')
    process.exit(1)
  }

  // 2) Load existing JSON
  let existing = []
  if (fs.existsSync(outputFile)) {
    try {
      const raw = fs.readFileSync(outputFile, 'utf8')
      existing = JSON.parse(raw)
      if (!Array.isArray(existing)) existing = []
    } catch {
      existing = []
    }
  }
  const existingMap = new Map(existing.map((r) => [r.id, r]))

  // 3) Read CSV
  if (!fs.existsSync(inputFile)) {
    console.error(`❌  CSV not found: ${inputFile}`)
    process.exit(1)
  }
  const csvContent = fs.readFileSync(inputFile, 'utf8')
  const records = parse(csvContent, { columns: true, skip_empty_lines: true, trim: true })

  // 4) Filter records to geocode
  const toProcess = records.filter((r) => {
    const id = r['Nr SV']
    if (!ids.has(id)) return false
    const ex = existingMap.get(id)
    return !(ex && ex.latitude != null && ex.longitude != null)
  })

  console.log(`🔎  ${toProcess.length} records to geocode`)

  // 5) Geocode each and update JSON incrementally
  for (let i = 0; i < toProcess.length; i++) {
    const rec = toProcess[i]
    const id = rec['Nr SV']
    let rawAddr =
      `${rec['Adresa SV'] || ''} ${rec['Adresa SV descriptivă'] || ''} ${rec['Sediu SV'] || ''}`.trim()

    rawAddr = rawAddr.replace(/['"”“]/g, '')

    console.log(`\n[${i + 1}/${toProcess.length}] ID ${id}`)
    console.log(` → Raw Address: ${rawAddr}`)

    const { lat, lon } = await geocode(rawAddr)

    // skip entries without valid coordinates
    if (lat == null || lon == null) {
      console.log(`⚠️  Skipping ID ${id} due to missing coordinates`)
      continue
    }

    const entry = { id, address: rawAddr, latitude: lat, longitude: lon }

    // update in-memory
    existing = existing.filter((r) => r.id !== id)
    existing.push(entry)

    // write to disk
    fs.mkdirSync(path.dirname(outputFile), { recursive: true })
    fs.writeFileSync(outputFile, JSON.stringify(existing, null, 2), 'utf8')

    // brief pause to avoid quota issues
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`\n🎉  Done! Wrote ${existing.length} total entries to ${outputFile}`)
})()
