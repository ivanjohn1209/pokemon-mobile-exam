import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  AsyncStorage, 
  ImageBackground
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPokemon } from "../redux/actions";
const image = { uri: "https://wallpapercave.com/wp/DxDqIvq.jpg" };

 class LoginScreen extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      pokemonsData:[]
    }
    this.Login = this.Login.bind(this);
  }

  Login() {
    this.props.navigation.navigate("PokemonLists");
}
async setData() {
  try {
      await AsyncStorage.setItem('pokemonData',JSON.stringify(this.state.pokemonsData));
} catch (error) {
    // Error saving data
  }
  };
componentDidMount(){
  try {
    console.log(this.props.pokemons._55.results)
    this.setState({
      pokemonsData: this.props.pokemons._55.results,
    }, () => {
      this.setData()
    });
  } catch (error) {
    this.props.getPokemon();
  }
}
  render() {
    return (

      <View style={styles.container}>
                        <ImageBackground source={image} style={styles.image}> 
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.Login()}>
          <Text style={styles.loginText}>Enter</Text>
        </TouchableHighlight>
        </ImageBackground> 
      </View>

    );
  }
}
LoginScreen.navigationOptions = {
    headerShown: false,
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:"-100%",
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

const mapStateToProps = (state) => {
    const { pokemons } = state;
    return { pokemons };
  };
  export default connect(mapStateToProps, { getPokemon })(LoginScreen);
  