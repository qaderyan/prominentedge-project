import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import bbox from "@turf/bbox"
import { multiPoint } from "@turf/helpers"
import Markers from "../Marker/Marker"
import "mapbox-gl/dist/mapbox-gl.css"
import styles from './Map.module.scss';

// Incident Files Example (It would be cool if this was iterating from API call)
var incident_one = require('../../data/F01705150050.json');
var incident_two = require('../../data/F01705150090.json');

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  position: 'absolute'
}

  // Incident Places (This would be API Call)
  const places = [
    {
      common_place_name: incident_one.address.common_place_name,
      longitude: incident_one.address.longitude,
      latitude: incident_one.address.latitude,
    },
    {
      common_place_name: incident_two.address.common_place_name,
      longitude: incident_two.address.longitude,
      latitude: incident_two.address.latitude,
    },
  ]

const Map = () => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: 'pk.eyJ1IjoidGVsb3ciLCJhIjoiY2tsbzJrMzloMDZocTMwcXlqandzdm5xYyJ9.UBxSH925tP1N50Q-3HLHtQ',
      style: "mapbox://styles/telow/cklocfpit5n8017p7o8p4nv7h",
      center: [-73.9856, 40.7497],
      zoom: 1,
    })
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right")

    setMap(map)

    return () => map.remove()
  }, [])

  // add new effect hook
  useEffect(() => {
    if (!map) return

    if (places.length !== 0) {
      const coords = []
      places.forEach(place => {
        coords.push([place.longitude, place.latitude])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)

      map.fitBounds(
        [
          [box[0], box[1]],
          [box[2], box[3]],
        ],
        {
          padding: 150,
          maxZoom: 14,
          duration: 2000,
        }
      )
    } else {
      map.easeTo({
        center: [-77.4360, 37.5407], // Overview of Richmond by Default
        zoom: 10,
        duration: 2000,
      })
    }
  }, [map])


  return (
    <div ref={mapContainerRef} style={mapContainerStyle}>
      {places && map && <Markers map={map} places={places} />}
    </div>
  )
}

export default Map