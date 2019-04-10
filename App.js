import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ActivityIndicator} from 'react-native';

export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state={ isLoading: true }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      }, function(){

      })
      
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  render() {
    
      if(this.state.isLoading){
        return (
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator />
          </View>
        )
      }
      
      return (
        <View style={styles.container}>
          <Text style={styles.titulo}>PegaTrampo</Text>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item})=> <Text style={styles.item}>{item.title}, {item.releaseYear}</Text>}
            keyExtractor={({id}, index) => id}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  titulo: {
    textAlign: 'center'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
