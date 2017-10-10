import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

var REQUEST_URL = 'https://chirp-app-saqlain.herokuapp.com/api/posts';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 2, paddingTop: 20, backgroundColor: '#ff00ff', alignItems: 'stretch', height: 100}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.text}  {rowData.created_by} {rowData.created_at}</Text>}
        />
      </View>
    );
  }
}