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

                {/* The following text only shows if the map doesn't load.
                The error handling that I wanted to have (an alarm) was always off sync
                so I decided to show a background text message instead. */}
                <div id="background">
                    Ooooops! The map can't load!
                </div>
            </div>
        );
    }
}

export default Map;