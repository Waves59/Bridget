import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import bgImage from '../../images/init.png';
import Logo from '../../images/logo.png';
import Icon, { Button } from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import Axios from 'axios';
import Budgets from './Budgets';
import Budget from './Budget';

const { width: WIDTH } = Dimensions.get('window')

export default class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
      budgets: '',
      auth_token: '',
      isLoading: true,
    }
  }


  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    try {
      let auth_token = await AsyncStorage.getItem('auth_token');
      this.setState({auth_token: auth_token});
      this.getBudgets();
    } catch (error) {
      alert('impossible de vous authentifier');
      Actions.Home();
    }
  }

  setBudgets = () => {
    if(this.state.budgets){
      Axios.post(`https://bridgetapi.herokuapp.com/todos?title=${this.state.budgets}`,"", 
      {
        headers: {
            'Authorization': JSON.parse(this.state.auth_token),
            'Accept':'application/vnd.todos.v1+json',
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({isLoading: true});
        this.getBudgets();
      })
      .catch(err => {
        alert("Le budget ne peux être ajouté");
      });
    }
  }

  getBudgets = () => {
    Axios.get("https://bridgetapi.herokuapp.com/todos/",
    {
      headers: {
          'Authorization': JSON.parse(this.state.auth_token),
          'Content-Type': 'application/json',
          'Accept':'application/vnd.todos.v1+json'
      }
    })
    .then(res => {
      this.state.data = res.data;
      this.setState({isLoading: false});
    }
    ).catch(err => {
      alert("Impossible de récupérer vos budgets");
    });
  }

  delBudgets = (id, key) => {

    Axios({
      method: 'delete',
      url: `https://bridgetapi.herokuapp.com/todos/${id}`,
      data: null,
      headers: 
      {
        'Authorization': JSON.parse(this.state.auth_token),
        'Content-Type': 'application/json',
        'Accept':'application/vnd.todos.v1+json'
      }
      })
    .then(res => {
      this.state.data.splice(key, 1);
      this.setState({data: this.state.data});
    }
    ).catch(err => {
      alert("Le budget ne peux être supprimé");
      console.warn(err);
      
    });
  }


  render() {

    if(this.state.isLoading){
      return(
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={[styles.loader, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </ImageBackground>
      )
    }

    let budgets = this.state.data.map((val, key) => {
      return <Budgets key={key} keyval={key} val={val} deleteMethod={()=> this.delBudgets(val.id, key)} />
    });

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.logoText}>Bridget</Text>
        </View>
        <View style={styles.scroll}>
          <ScrollView>
            {budgets}
          </ScrollView>
        </View>
        <View style ={styles.container} >
          <Icon name={'ios-add-outline'} size={28} color={'rgba(255, 255, 255, 0.3)'} style={styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder={'Mettre en place un budget'}
            placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
            underlineColorAndroid='transparent' 
            onChangeText= {(budgets) => this.setState({budgets})}
          />
        <TouchableOpacity style={styles.Button} onPress={this.setBudgets}>
            <Text style={styles.textAdd}>Créer</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
    justifyContent: 'center',
    flex:1,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
  }
});
