import React from 'react';
import { Environment, Store, RecordSource } from 'relay-runtime'
import { RelayEnvironmentProvider } from "relay-hooks";
// import modernEnvironment, { network } from "../Environment";
import modernEnvironment, { network } from './Environment'
import { EnvironmentContext } from "./environmentContextDef";

// import { useQuery, graphql } from 'relay-hooks'

import './App.css';
import AppContainer from './navigation/AppContainer';
import AppRouter from './navigation/AppRouter';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      environment: modernEnvironment,
    }
  }

  _resetRelayStore = async () => {
    const res = await new Promise((resolve, reject) => {
      this.setState({ environment: null }, () => {
        const store = new Store(new RecordSource());

        const newEnvironment = new Environment({ network, store })

        this.setState({ environment: newEnvironment }, () => {
          resolve("STORE HAS BEEN RESET!")
        })
      })
    })
    return res
  }

  render() {
    return (
      <EnvironmentContext.Provider
        value={{
          environment: this.state.environment,
          resetEnvironment: this._resetRelayStore
        }}
      >
        <RelayEnvironmentProvider environment={this.state.environment}>

          <AppRouter />
          {/* <AppContainer /> */}
        </RelayEnvironmentProvider>
      </EnvironmentContext.Provider>

    )
  };
}
