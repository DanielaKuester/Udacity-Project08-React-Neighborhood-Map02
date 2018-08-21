import React, { Component } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import Map from './Map'
import Sidebar from './Sidebar'
import axios from 'axios'

class App extends Component {

    state = {
        foursquareVenues: [],
        markerProperties: {
            color: "blue",
            className: "my-markers"
        },
        markers: []
    }

    /** Important: I used this tutorial by Elharony to learn how to fetch data from Foursquare:
     * https://www.youtube.com/watch?v=dAhMIF0fNpo&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=3
     * It is not as difficult as I imagined it beforehand, but the
     * getFoursquareVenues()-function is a slightly adjusted version of his tutorial!
     */

    getFoursquareVenues = () => {
        const apiEndpoint = "https://api.foursquare.com/v2/venues/explore?"
        const foursquareParameters = {
            client_id: "4QQDCSI1SQPEN4AUMQFAHJUWC3RK5F4WV2PVL1SCFKK1U0W1",
            client_secret: "SNX4V5ZR3IEWHWXEBPY3KDLTZWN4GIUUBPKO2SXV5KCLJASI",
            query: "arts",
            near: "Lyon, FR",
            v: 20182507
        }

        axios.get(apiEndpoint + new URLSearchParams(foursquareParameters))
            .then(response => {
                this.setState({
                    foursquareVenues: response.data.response.groups[0].items
                })
                console.log(this.state.foursquareVenues)
            })
            .catch(error => {
                console.log(`An error occurred: ${error}`)
            })
    }

    /**
     * I already tried beforehand to initialise the map with the help of a separate function.
     * I used this torial by Elharony to initialise my map:
     * https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=2
     * I would like to use "const map = new mapboxgl.Map();" instead of "this.map" to create the map
     * and "const marker = new mapboxgl.Marker({})" instead of "this.marker" to create a new marker.
     */

    initialiseMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYS1rdWVzdGVyIiwiYSI6ImNqam9jdjF1YTAxczQzcG9na3JrZmh2bnkifQ.zMFUT-fI5tsviUOPZsJxog';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [4.841389, 45.758889],
            zoom: 12
        });

        this.map.on('load', () => {
            this.addMarkers();
        })
    }


    /**
     * I used Elharony's tutorial to fix a problem that I had in creating my
     * markers. Thanks to his tutorial, I found out that the asynchronous
     * data fetching from the Foursquare API was the culprit:
     * https://www.youtube.com/watch?v=_1RjbT5dIeM&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=5
    */
    addMarkers = () => {
        this.state.foursquareVenues
            .map(myVenue => {
                // Create popups with the data from the Foursquare API
                const popup = new mapboxgl.Popup({offset: 40, className: `${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`})
                    .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
                    .setHTML(
                        `<h1>${myVenue.venue.name}</h1>
                        <p>${myVenue.venue.location.formattedAddress}</p>`
                    )
                
                //console.log(myVenue.venue.id)
                //console.log(this.state.markers.length)
                //console.log(this.state.id)
                
                // Create markers with the data from the Foursquare API
                let marker = new mapboxgl.Marker({
                    color: this.state.markerProperties.color,
                    className: myVenue.venue.id
                })
                .setLngLat([myVenue.venue.location.lng, myVenue.venue.location.lat])
                .setPopup(popup)
                .addTo(this.map)

                return this.state.markers.push(marker)
            }, console.log(this.state.markers));
    }

    handleClick(e) {
        e.preventDefault();
        console.log(e.target.className)
        console.log(e.target)
        let markersArray = this.props.markers
        for (let i = 0; i < markersArray.length; i++) {

            // Match the class names of the Popups with the class Name of the clicked button
            if (this.props.markers[i].getPopup().options.className === e.target.className) {
                console.log("You did it! You are a genius!");
                this.props.markers[i].togglePopup()
            }
        }
    }

    componentDidMount() {
        this.getFoursquareVenues()
    }

    render() {
        return (
            <div className="App">
                <main className="container">
                    <aside id="sidebar">
                        <Sidebar
                            foursquareVenues={this.state.foursquareVenues}
                            handleClick={this.handleClick}
                            markers={this.state.markers}
                        />
                    </aside>
                    <section>
                        <Map
                            venues={this.state.foursquareVenues}
                            initialiseMap={this.initialiseMap}
                            addMarkers={this.addMarkers}
                        />
                    </section>
                </main>
            </div>
        );
    }
}

export default App;
