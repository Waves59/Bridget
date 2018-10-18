import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';

import bgImage from '../../images/init.png';
import Logo from '../../images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import Axios from 'axios';
import * as Animatable from 'react-native-animatable';

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends React.Component {


  constructor(){
    super()
    this.state = {
      showPass: true,
      press: false,
      email: '',
      password: '',
      auth_token: ''
    }
  }


  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    try {

      let email = await AsyncStorage.getItem('email');
      this.setState({email: email});

      let password = await AsyncStorage.getItem('password');
      this.setState({password: password});

    } catch (error) {

    }
  }


  tokenSave = async () => {
      await AsyncStorage.setItem('auth_token', JSON.stringify(this.state.auth_token));
  }
  
  login = () => {

      const email = this.state.email
      const password = this.state.password

      Axios.post("https://bridgetapi.herokuapp.com/auth/login?email="+ email + "&password=" + password)
      .then(responseData => {
          this.setState({auth_token: responseData.data.auth_token});
          this.tokenSave();
          Actions.home();

      }).catch(err => {
          alert('Veuillez être connecté');
      })

  }
  


  showPass = () => {

    if(this.state.press == false ){
      this.setState({ showPass: false, press: true})
    } else {
      this.setState({ showPass: true, press: false})
    }

  }

  signup = () => {

    Actions.signup()

  }

  home = () => {

    Actions.home()

  }

  render() {

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <Animatable.View animation="zoomIn" duration={800} style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          <Animatable.Text animation="fadeIn" delay={1000} duration={1000} style={styles.logoText}>Bridget</Animatable.Text>
        </Animatable.View>
        <View>
          <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.3)'} style={styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder={'Email'}
            placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
            underlineColorAndroid='transparent'
            onChangeText= {(email) => this.setState({email})} 
          />
        </View>
        <View>
          <Icon name={'ios-lock-outline'} size={28} color={'rgba(255, 255, 255, 0.3)'} style={styles.inputIcon}/>
          <TextInput style={styles.input}
              placeholder={'Mot de passe'}
              placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
              underlineColorAndroid='transparent'
              secureTextEntry={this.state.showPass} 
              onChangeText= {(password) => this.setState({password})} 
            />
          <TouchableOpacity style={styles.btnEye}
            onPress={this.showPass.bind(this)}
          >
            <Icon name={this.state.press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'}
              size={28} color={'rgba(255, 255, 255, 0.3)'}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.login} onPress={this.login}>
          <Text style={styles.textLogin}>Connexion</Text>
        </TouchableOpacity>
        <Text>vous n'avez pas encore de compte?</Text>
        <TouchableOpacity onPress={this.signup}>
          <Text style={styles.textLogin}>S'inscrire</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
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
    top: 20,
    right: 37
  },
  login: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10
  },
  textLogin: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    textAlign: 'center'
  }
});
