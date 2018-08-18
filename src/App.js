import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import axios from 'axios'

class App extends Component {

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
                console.log(response)
            })
            .catch(error => {
                console.log(`An error occurred: ${error}`)
            })
    }

    componentDidMount() {
        this.getFoursquareVenues()
    }

    render() {
        return (
            <div className="App">
                <main>
                    <Map />
                </main>
            </div>
        );
    }
}

export default App;
