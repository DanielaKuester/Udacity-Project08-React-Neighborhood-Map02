import React, { Component } from 'react';

class Sidebar extends Component {
    
    render() { 
        return (
            <div id="location-sidebar">
                <ul className="location-list">
                        {   
                            this.props.foursquareVenues
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