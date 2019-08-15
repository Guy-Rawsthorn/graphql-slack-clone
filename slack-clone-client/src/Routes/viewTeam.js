import React, { Component } from "react";
import Channels from './components/channels';
import Header from './components/Header';
import Input from './components/Input';
import Teams from './components/teams';
import Messages from './components/Messages';
import AppLayout from './components/app.layout';

export default class viewTeam extends Component {
  render() {
    return (
      <div>
        <AppLayout class="app-layout">
          <Teams class="teams">Teams</Teams>
          <Channels class="channels">Channels</Channels>
          <Header class="header">Header</Header>
          <Messages class="messages">
            <ul class="message-list">
              <li />
              <li />
            </ul>
          </Messages>
          <Input class="input">
            <input type="text" placeholder="CSS Grid Layout Module" />
          </Input>
        </AppLayout>
      </div>
    );
  }
}
