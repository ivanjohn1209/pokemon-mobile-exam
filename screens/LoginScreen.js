import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { getPokemon } from "../redux/actions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      email: "",
      password: "",
      pokemonsData: [],
    };
    this.Login = this.Login.bind(this);
  }

  Login() {
    try {
      this.setState(
        {
          pokemonsData: this.props.pokemons._55.results,
        },
        () => {
          this.setData();
        }
      );
    } catch (error) {
      this.props.getPokemon();
    }
  }
  async setData() {
    try {
      await AsyncStorage.setItem(
        "pokemonData",
        JSON.stringify(this.state.pokemonsData)
      );
      this.props.navigation.navigate("PokemonLists");

    } catch (error) {
      // Error saving data
    }
  }
  componentDidMount(){
    try {
      this.setState(
        {
          pokemonsData: this.props.pokemons._55.results,
        },
        () => {
          this.setData();
        }
      );
    } catch (error) {
      this.props.getPokemon();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/Background1.jpg")}
          style={styles.image}
        >
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.Login()}
          >
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
    alignItems: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "-100%",
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: "white",
  },
});

const mapStateToProps = (state) => {
  const { pokemons } = state;
  return { pokemons };
};
export default connect(mapStateToProps, { getPokemon })(LoginScreen);
