import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {


    componentDidMount() {
        this.props.initialiseMap()
        this.props.addMarkers()
    }

    render() { 
        console.log(this.props)
        return(
            <div id="map" className="map-container">
                {/* Initialise the map here*/}
            </div>
        );
    }
}

export default Map;