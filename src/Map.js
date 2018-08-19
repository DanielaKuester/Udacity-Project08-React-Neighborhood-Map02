import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

    initialiseMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYS1rdWVzdGVyIiwiYSI6ImNqam9jdjF1YTAxczQzcG9na3JrZmh2bnkifQ.zMFUT-fI5tsviUOPZsJxog';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [4.841389, 45.758889],
            zoom: 12
        });
    }

    addMarkers = () => {
        // create the marker
        this.marker = new mapboxgl.Marker({color: "blue", className: 'my-marker'})
        .setLngLat([4.841389, 45.758889])
        .addTo(this.map)
    }

    componentDidMount() {
        this.initialiseMap()
        this.addMarkers()
    }

    render() { 
        return(
            <div id="map" className="map-container">
                {/* Initialise the map here*/}
            </div>
        );
    }
}
 
export default Map;