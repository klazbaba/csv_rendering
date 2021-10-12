import React, {Component} from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

interface State {
  text: string;
}

export default class App extends Component<any, State> {
  state = {text: ''};

  handleFilePick = async () => {
    const file = await DocumentPicker.pickSingle({
      type: DocumentPicker.types.csv,
    });
    const readFile = await RNFS.readFile(file.uri);
    this.setState({text: readFile});
  };

  renderCsv = () => {
    const {text} = this.state;
    const rows = text.split('\r\n');

    if (JSON.stringify(rows) === '[""]') return null;

    return rows.map((row, index) => {
      const columns = row.split(',').map(item => (
        <View style={styles.column}>
          <Text>{item}</Text>
        </View>
      ));
      return (
        <View key={index} style={styles.row}>
          {columns}
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Pressable style={styles.button} onPress={this.handleFilePick}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            Pick File
          </Text>
        </Pressable>

        {this.renderCsv()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  button: {
    padding: 16,
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  column: {
    borderWidth: 0.5,
    flex: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
