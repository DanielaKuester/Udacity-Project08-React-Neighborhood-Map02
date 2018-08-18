import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

    initialiseMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYS1rdWVzdGVyIiwiYSI6ImNqam9jdjF1YTAxczQzcG9na3JrZmh2bnkifQ.zMFUT-fI5tsviUOPZsJxog';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [4.841389, 45.758889],
            zoom: 12
        });
    }

    componentDidMount() {
        this.initialiseMap()
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