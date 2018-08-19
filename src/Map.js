import React, { Component } from 'react';

class Map extends Component {


    componentDidMount() {
        this.props.initialiseMap()
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