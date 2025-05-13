// LocationMap.vue
<template>
  <div class="flex flex-col h-150">
    <div class="flex flex-1 overflow-hidden">
      <!-- Map -->
      <div ref="mapContainer" class="flex-1"></div>

      <!-- Sidebar -->
      <!-- <div class="w-72 bg-gray-50 p-4 overflow-y-auto shadow-md">
        <h2 class="text-lg font-semibold mb-3">Locations</h2> -->

      <!-- Location List -->
      <!-- <div>
          <div
            v-for="location in locations"
            :key="location.id"
            class="p-3 mb-2 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
            @click="centerOnLocation(location)"
          >
            <div class="font-medium text-blue-600">Sectia {{ location.id }}</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// Import your locations data - this will be replaced at build time
import locations from '@/assets/locations.json'

export default {
  props: {
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  name: 'LocationMap',
  data() {
    return {
      locations: locations,
      map: null,
      markers: [],
      infoWindow: null,
      googleMapsLoaded: false,
    }
  },
  mounted() {
    // Load Google Maps API
    this.loadGoogleMapsAPI()
  },
  methods: {
    loadGoogleMapsAPI() {
      // Only load if not already loaded
      if (window.google && window.google.maps) {
        this.googleMapsLoaded = true
        this.initMap()
        return
      }

      // Create a script element to load the Google Maps API
      const apiKey = 'AIzaSyBn5udHvDzJXQV5VD93ag0NBj5cT5E6wUc'
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true

      // Initialize map when the API is loaded
      script.onload = () => {
        this.googleMapsLoaded = true
        this.initMap()
      }

      // Add the script to the document
      document.head.appendChild(script)
    },

    initMap() {
      const styledMapType = new google.maps.StyledMapType(
        [
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [
              {
                invert_lightness: this.darkMode,
              },
              {
                saturation: 10,
              },
              {
                lightness: 30,
              },
              {
                gamma: 0.5,
              },
              {
                hue: '#F2E9FF',
              },
            ],
          },
        ],
        { name: 'Styled Map' }
      )
      // Calculate the center of all points
      const centerLat =
        this.locations.reduce((sum, loc) => sum + loc.latitude, 0) / this.locations.length
      const centerLng =
        this.locations.reduce((sum, loc) => sum + loc.longitude, 0) / this.locations.length

      // Create the map instance
      this.map = new google.maps.Map(this.$refs.mapContainer, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 12,
        streetViewControl: true,
        fullscreenControl: true,
      })

      this.map.mapTypes.set('styled_map', styledMapType)
      this.map.setMapTypeId('styled_map')

      // Create shared info window
      this.infoWindow = new google.maps.InfoWindow()

      // Add markers for each location
      this.locations.forEach((location) => this.addMarker(location))

      // Fit the map to show all markers
      this.fitMapToBounds()
    },

    addMarker(location) {
      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: this.map,
        title: `Location ID: ${location.id}`,
        animation: google.maps.Animation.DROP,
      })

      this.markers.push(marker)

      // Create info window content
      const infoContent = `
        <div class="max-w-xs">
          <h3 class="font-bold">Location ID: ${location.id}</h3>
          <p class="mt-1">${location.address}</p>
          <p class="mt-2"><strong>Coordinates:</strong> ${location.latitude.toFixed(
            6
          )}, ${location.longitude.toFixed(6)}</p>
        </div>
      `

      // Add click listener to the marker
      // marker.addListener('click', () => {
      //   this.infoWindow.setContent(infoContent)
      //   this.infoWindow.open(this.map, marker)
      // })
    },

    centerOnLocation(location) {
      // Find the corresponding marker
      const marker = this.markers.find(
        (m) =>
          m.getPosition().lat() === location.latitude &&
          m.getPosition().lng() === location.longitude
      )

      if (marker) {
        // Center map on the marker
        this.map.panTo(marker.getPosition())
        this.map.setZoom(15)

        // Open info window for the marker
        const infoContent = `
          <div class="max-w-xs">
            <h3 class="font-bold">Location ID: ${location.id}</h3>
            <p class="mt-1">${location.address}</p>
            <p class="mt-2"><strong>Coordinates:</strong> ${location.latitude.toFixed(
              6
            )}, ${location.longitude.toFixed(6)}</p>
          </div>
        `

        this.infoWindow.setContent(infoContent)
        this.infoWindow.open(this.map, marker)
      }
    },

    fitMapToBounds() {
      if (this.markers.length > 0) {
        const bounds = new google.maps.LatLngBounds()
        this.markers.forEach((marker) => bounds.extend(marker.getPosition()))
        this.map.fitBounds(bounds)
      }
    },
  },
}
</script>