import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const allUsersQuery = gql`
  {
    allUsers {
      id
      username
      email
    }
  }
`;

class App extends Component {

  componentDidUpdate(){
    console.log("props",this.props)
  }
  render() {
    // const Home = ({ data: { loading, allUsers } }) =>
    //   loading ? (
    //     <h3>Hello</h3>
    //   ) : (
    //     allUsers.map(u => <h1 key={u.id}>{u.email}</h1>)
    //   );

    // const Home = () => {
    //   if (!this.props.data.loading){
    //     console.log(this.props.data.allUsers)
    //   }
    // }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {/* <Home /> */}
          {/* if (this.props.data.loading) return <h3>Loading...</h3>; return{" "}
          <div>{`This is my data: ${this.props.data.allUsers}`}</div>; } */}
          {!this.props.data.allUsers ? 
          <h3>Loading</h3> : 
          this.props.data.allUsers.map(u=> {
            return (
            <h3>{u.email}</h3>
            )
          })
          // <p>close</p>
          }
        </div>
      </div>
    );
  }
}

export default graphql(allUsersQuery)(App);
