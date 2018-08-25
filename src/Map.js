import React, { Component } from 'react';

class Map extends Component {


    componentDidMount() {
        this.props.initialiseMap()
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