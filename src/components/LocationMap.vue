<template>
  <div class="flex flex-col h-150">
    <div class="flex flex-1 overflow-hidden">
      <div ref="mapContainer" class="flex-1"></div>
    </div>
    <div
      v-if="routeDistance !== null"
      class="p-2"
      :style="{ backgroundColor: colors.textColor, color: colors.bgColor }"
    >
      <strong>Distanța totală:</strong> {{ formattedDistance }}
    </div>
  </div>
</template>

<script>
// Import your locations data - this will be replaced at build time
import locations from '@/assets/locations.json'

export default {
  props: {
    darkMode: { type: Boolean, default: false },
    colors: {
      type: Object,
      required: true,
    },
  },
  name: 'LocationMap',
  data() {
    return {
      locations: locations,
      map: null,
      markers: [],
      infoWindow: null,
      routeDistance: null,
    }
  },
  computed: {
    formattedDistance() {
      if (this.routeDistance === null) return ''
      // display in km with one decimal
      return (this.routeDistance / 1000).toFixed(1) + ' km'
    },
  },
  mounted() {
    this.loadGoogleMapsAPI()
  },
  methods: {
    loadGoogleMapsAPI() {
      if (window.google && window.google.maps) {
        this.initMap()
        return
      }
      const apiKey = 'AIzaSyBn5udHvDzJXQV5VD93ag0NBj5cT5E6wUc'
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`
      script.async = true
      script.defer = true
      script.onload = () => this.initMap()
      document.head.appendChild(script)
    },

    initMap() {
      const styledMapType = new google.maps.StyledMapType(
        [
          {
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'administrative',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
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
      const centerLat =
        this.locations.reduce((sum, l) => sum + l.latitude, 0) / this.locations.length
      const centerLng =
        this.locations.reduce((sum, l) => sum + l.longitude, 0) / this.locations.length
      this.map = new google.maps.Map(this.$refs.mapContainer, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 12,
      })
      this.map.mapTypes.set('styled_map', styledMapType)
      this.map.setMapTypeId('styled_map')
      this.infoWindow = new google.maps.InfoWindow()

      this.locations.forEach((loc) => this.addMarker(loc))
      this.drawRouteWithRoutesAPI()
      this.fitMapToBounds()
    },

    addMarker(location) {
      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: this.map,
        title: `ID: ${location.id}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#0bd66b',
          fillOpacity: 1,
          strokeWeight: 2,
        },
      })
      marker.addListener('click', () => {
        const content = `
          <div><strong>ID:</strong> ${location.id}</div>
          <div>${location.address}</div>
          <div>${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}</div>
        `
        this.infoWindow.setContent(content)
        this.infoWindow.open(this.map, marker)
      })
      this.markers.push(marker)
    },

    async drawRouteWithRoutesAPI() {
      if (this.locations.length < 2) return
      const apiKey = 'AIzaSyBn5udHvDzJXQV5VD93ag0NBj5cT5E6wUc'
      const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
      const origin = this.locations[0]
      const destination = this.locations[this.locations.length - 1]
      // Build intermediates array per Routes API schema
      const intermediates = this.locations.slice(1, -1).map((loc) => ({
        location: { latLng: { latitude: loc.latitude, longitude: loc.longitude } },
      }))

      const body = {
        origin: {
          location: { latLng: { latitude: origin.latitude, longitude: origin.longitude } },
        },
        destination: {
          location: {
            latLng: { latitude: destination.latitude, longitude: destination.longitude },
          },
        },
        intermediates,
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE',
        optimizeWaypointOrder: true,
      }

      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask':
              'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.optimized_intermediate_waypoint_index',
          },
          body: JSON.stringify(body),
        })
        const data = await resp.json()
        if (!data.routes || !data.routes.length) {
          console.error('Routes API no routes:', data)
          return
        }
        const route = data.routes[0]
        this.routeDistance = route.distanceMeters
        const poly = data.routes[0].polyline.encodedPolyline
        const path = google.maps.geometry.encoding.decodePath(poly)
        new google.maps.Polyline({ path, strokeColor: '#0bd66b', strokeWeight: 5, map: this.map })
      } catch (err) {
        console.error('Routes API error:', err)
      }
    },

    fitMapToBounds() {
      const bounds = new google.maps.LatLngBounds()
      this.markers.forEach((m) => bounds.extend(m.getPosition()))
      this.map.fitBounds(bounds)
    },
  },
}
</script>
