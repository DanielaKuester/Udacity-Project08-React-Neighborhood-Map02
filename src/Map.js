import React, { Component } from 'react';

class Map extends Component {


    componentDidMount() {
        this.props.initialiseMap()
    }

    /**
     * Bartek Burkot helped me to implement this function to update
     * the markers. First, it iterates through the markers and removes
     * every marker. Afterwards, it iterates through the array of the
     * filtered markers to 
     */
    displayMarkers = () => {
        this.props.markers.forEach(marker => marker.remove());
        this.props.showingMarkers.forEach(marker => {
            marker.addTo(this.props.mapElement)
        })
    }

    render() {
        this.displayMarkers();
        return(
            <div
                id="map"
                className="map-container"
                role="application"
                tabIndex="0"
            >
                {/* Initialise the map here*/}
            </div>
        );
    }
}

export default Map;