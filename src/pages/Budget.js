import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import Icon, { Button } from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import Home from './Home';
import Axios from 'axios';
import bgImage from '../../images/init.png';
import Logo from '../../images/logo.png';

const { width: WIDTH } = Dimensions.get('window')
export default class Budget extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          auth_token: '',
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            let auth_token = await AsyncStorage.getItem('auth_token');
            this.setState({auth_token: auth_token});
            this.getBudget();
        } catch (error) {
            alert('impossible de vous authentifier');
            console.warn(error);
            
        }
    }

    getBudget = () => {
        Axios.get("https://bridgetapi.herokuapp.com/todos/${this.props.val.id}",
        {
          headers: {
              'Authorization': JSON.parse(this.state.auth_token),
              'Content-Type': 'application/json',
              'Accept':'application/vnd.todos.v1+json'
          }
        })
        .then(res => {
          this.state.data = res.data;
        }
        ).catch(err => {
          alert("Impossible de récupérer vos budgets");
        });
    }


  render() {

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View>
            <Text>`${this.props.val.id}`</Text>
        </View>
      </ImageBackground>
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