import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import styles from './Marker.module.scss';

const Marker = ({ map, place }) => {

  var outerDiv = document.createElement('div'),
  innerDiv = document.createElement('div');
  outerDiv.appendChild(innerDiv);

  outerDiv.className = styles.marker;

  useEffect(() => {
    const marker = new mapboxgl.Marker(outerDiv)
      .setLngLat([place.longitude, place.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h6>' + place.common_place_name + '</h6>'))
      .addTo(map)

    return () => marker.remove()
  })

  return <div />
}

const Markers = ({ map, places }) => {
  return (
    <>
      {places &&
        places.map(place => (
          <Marker key={place.name} map={map} place={place} />
        ))}
    </>
  )
}

export default Markers