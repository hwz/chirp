import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, RefreshControl } from 'react-native';
import moment from 'moment' // for datetime format

var REQUEST_URL = 'https://chirp-app-saqlain.herokuapp.com/api/posts';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
    }
  }

  componentDidMount() {
    return this._loadData();
  }

  _loadData() {
    var func = fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return func;

  }
  
  static toDateTimeString(dateStr: string) {
    return moment(new Date(dateStr)).format('lll');
  }

  

  _onRefresh() {
    if (!this.state.isLoading) {
      this.setState({ refreshing: true });
      this._loadData().then(() => {
        this.setState({ refreshing: false });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } 

    return (
      <View style={{ flex: 1, paddingTop: 0, paddingBottom: 20, alignItems: 'stretch' }}>
        <ListView
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          renderRow={(rowData) =>
            <View style={{ flex: 2, padding: 10, marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#f2f9ff', alignItems: 'stretch' }}>
              <Text>{rowData.text}</Text>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text>Posted by @{rowData.created_by}</Text>
                <Text>{Posts.toDateTimeString(rowData.created_at)}</Text>
              </View>
            </View>
          }
        />
      </View>
    );
  }


}