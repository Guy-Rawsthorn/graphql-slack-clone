import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { allUsersQuery} from '../Queries/users';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div>
          {!this.props.data.allUsers ? 
          <h3>Loading</h3> : 
          this.props.data.allUsers.map(u=> {
            return (
            <h3>{u.email}</h3>
            )
          })
          }
        </div>
      </div>
    );
  }
}

export default graphql(allUsersQuery)(Home);