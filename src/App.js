import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import axios from 'axios'

class App extends Component {

    state = {
        foursquareVenues: [],
        color: "blue"
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

    componentDidMount() {
        this.getFoursquareVenues()
    }

    render() {
        return (
            <div className="App">
                <main>
                    <Map
                        color={this.state.color}
                    />
                </main>
            </div>
        );
    }
}

export default App;
