import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../component/Header";
import ImagePicker from "../component/ImagePicker";
export default class CreatePokemonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PokemonName: "",
      PokemonType: "",
      PokemonAbility: "",
      image: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
    this.getImageFile = this.getImageFile.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }

  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 || val == ""
      ? true
      : false;
  }
  addPokemon() {
    if (
      this.isEmpty(this.state.PokemonName) ||
      this.isEmpty(this.state.PokemonType) ||
      this.isEmpty(this.state.PokemonAbility) ||
      this.isEmpty(this.state.image)
    ) {
      Alert.alert(
        "Please!",
        "Please fill up all fields",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK" },
        ],
        { cancelable: false }
      );
    } else {
      let pokemonData = {
        name: this.state.PokemonName,
        type: this.state.PokemonType,
        ability: this.state.PokemonAbility,
        image: this.state.image,
        url: false,
      };
      var x = this.state.pokemonData;
      x.unshift(pokemonData);
      this.addNewDataPokemon(x);
    }
  }
  async addNewDataPokemon(e) {
    try {
      await AsyncStorage.setItem("pokemonData", JSON.stringify(e));
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.navigate("PokemonLists");
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      const { state } = this.props.navigation;
      this.setState({
        pokemonData: state.params.pokemonData,
      });
    });
  }
  getImageFile(callback) {
    this.setState({
      image: callback,
    });
  }
  render() {
    return (
      <View style={styles.containerHeader}>
        <Header />
        <ScrollView style={styles.containerView}>
          <View style={styles.container}>
            <ImagePicker getImageFile={this.getImageFile} Status="Add" />
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={require("../assets/Poke_Ball.png")}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Pokemon Name"
                underlineColorAndroid="transparent"
                onChangeText={(e) => this.handleChange(e, "PokemonName")}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={require("../assets/Poke_Ball.png")}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Type"
                underlineColorAndroid="transparent"
                onChangeText={(e) => this.handleChange(e, "PokemonType")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={require("../assets/Poke_Ball.png")}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Ability"
                underlineColorAndroid="transparent"
                onChangeText={(e) => this.handleChange(e, "PokemonAbility")}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.sendButton]}
              onPress={() => this.addPokemon()}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}
CreatePokemonScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  containerView: {
    backgroundColor: "#ebf0f7",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebf0f7",
  },
  containerHeader: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: "#FF4500",
  },
  buttonText: {
    color: "white",
  },
});
