import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Sidebar extends Component {

    state = {
        query: '',
        searchedLocations: []
    }

    /**
     * Here, I am using and adapting what I have learned from the
     * Udacity course lessons about controlled components.
     * https://classroom.udacity.com/nanodegrees/nd001/parts/c3e7b0d6-ffef-4421-b5fc-6df10fd0a1ae/modules/82766b2b-1870-4904-aa90-8ccbe63928c5/lessons/14331e60-a548-4cfb-a326-054545da8927/concepts/fc3f11d3-8779-4d8a-8a23-1cd782f8ddf3
     * I'm really excited to try out the RegExp extension!
     * I have copied some of the search field code from my
     * MyReads-project to see if I can save time by altering it.
     */
    
    updateQuery = (query) => {
        this.setState({ query: query })
    }

    /*
    updateSearchedBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((searchedBooks) => {
                if (searchedBooks.error) {
                    this.setState({ searchedBooks: [] })
                }
                else {
                    this.setState({ searchedBooks: searchedBooks})
                }
            })
        }
        else {
            this.setState({ searchedBooks: [] })
        }
    }*/
    
    render() {

        let showingLocations;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query, 'i'))
            showingLocations = this.props.foursquareVenues.filter((myVenue) => match.test(myVenue.venue.name.toLowerCase()))
        } else {
            showingLocations = this.props.foursquareVenues
        }

        showingLocations.sort(sortBy('venue.name'))

        return (
            <div id="location-sidebar">
                {JSON.stringify(this.state)}
                <div id="search-field">
                    <input
                        className='search-locations'
                        type='text'
                        placeholder='Search locations'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <ul className="location-list">
                        {   
                            showingLocations
                                .map((myVenue) => (
                                    <li key={myVenue.venue.id}>
                                        {myVenue.venue.name}
                                        <button
                                        type="button"
                                        key={myVenue.venue.id}
                                        data-index={this.props.markers}
                                        className={`${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`}
                                        onClick={this.props.handleClick.bind(this)}
                                        >
                                            More info
                                        </button>
                                    </li>
                                ))
                        }
                    </ul>
            </div>
        );
    }
}
 
export default Sidebar;