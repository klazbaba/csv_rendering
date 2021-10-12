import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Show dem</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
