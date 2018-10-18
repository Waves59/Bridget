import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import Icon, { Button } from 'react-native-vector-icons/Ionicons';
import Budget from './Budget';
import {Actions} from 'react-native-router-flux';

const { width: WIDTH } = Dimensions.get('window')
export default class Budgets extends React.Component {

  constructor(props){
    super(props)
  }


  render() {

    return (
      <View key = {this.props.keyval} >
        <TouchableOpacity onPress={ () => Actions.budget(this.props.val.id) } style = {styles.inputButton} >
        <Text style = {styles.text}>{this.props.val.id} {this.props.val.title}</Text>
          <TouchableOpacity style = {styles.inputClose} onPress={this.props.deleteMethod}>
            <Icon name={'ios-close-outline'} size={35} color={'rgba(255, 255, 255, 0.3)'} style={styles.btnEye} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputClose: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    width: 45,
    height: 45,
    position: 'absolute',
    right: 0,
  },
  inputButton: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    height: 500,
    width: 400,
  },
  container: {
    position: 'absolute',
    bottom: 20
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  Button: {
    position: 'absolute',
    top: 20,
    right: 37
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 20
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    position: 'absolute',
    opacity: 1,
    top: 23
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    marginHorizontal: 25,
    marginTop: 10
  },
  inputIcon: {
    position: 'absolute',
    top: 17,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 5,
    right: 15
  },
  login: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10
  },
  textAdd: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
  text: {
    position: 'absolute',
    top: 7,
    left: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
  }
});