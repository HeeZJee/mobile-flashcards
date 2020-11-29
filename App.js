import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecksOld } from './utils/api'

export class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    getDecksOld().then((data) => this.setState({ data }))
  }


  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>

        <Text>Open up App.js to start working on your app!</Text>
        <Text>{JSON.stringify(this.state.data)}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
