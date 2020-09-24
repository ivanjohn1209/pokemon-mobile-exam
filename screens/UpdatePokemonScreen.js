import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../component/Header";
import ImagePicker from "../component/ImagePicker";

export default class UpdatePokemonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PokemonName: "",
      PokemonType: "",
      PokemonAbility: "",
      PokemonData: [],
      noUrl: false,
      allPokemonData: [],
      image: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
    this.getPokemonData = this.getPokemonData.bind(this);
    this.getImageFile = this.getImageFile.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 || val == ""
      ? true
      : false;
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  updatePokemon() {
    var array = this.state.allPokemonData;
    var PokemonName = this.state.PokemonData.name;
    var PokemonType =
      this.state.noUrl === true
        ? this.state.PokemonData.type
        : this.state.PokemonData.types === undefined
        ? ""
        : this.state.PokemonData.types[0].type.name;
    var PokemonAbility =
      this.state.noUrl === true
        ? this.state.PokemonData.ability
        : this.state.PokemonData.abilities === undefined
        ? ""
        : this.state.PokemonData.abilities[0].ability.name;
    var newItem = {
      name: this.isEmpty(this.state.PokemonName)
        ? PokemonName
        : this.state.PokemonName,
      type: this.isEmpty(this.state.PokemonType)
        ? PokemonType
        : this.state.PokemonType,
      ability: this.isEmpty(this.state.PokemonAbility)
        ? PokemonAbility
        : this.state.PokemonAbility,
      image: this.isEmpty(this.state.image)
        ? this.state.noUrl === true
          ? this.state.PokemonData.image
          : this.state.PokemonData.sprites === undefined
          ? null
          : this.state.PokemonData.sprites.front_default
        : this.state.image,
      url: false,
    };
    var index = array.findIndex(
      (item) => item.name === this.state.PokemonData.name
    );
    // Replace the item by index.
    array.splice(index, 1, newItem);

    this.UpdateDataPokemon(array);
  }
  async UpdateDataPokemon(e) {
    try {
      await AsyncStorage.setItem("pokemonData", JSON.stringify(e));
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.navigate("PokemonLists");
  }
  getPokemonData() {
    fetch(this.state.PokemonDetails)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          PokemonData: { ...result },
        });
      })
      .catch((error) => console.log("error", error));
  }
  getImageFile(callback) {
    this.setState({
      image: callback,
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      const { state } = this.props.navigation;
      if (state.params.url === true) {
        this.setState(
          {
            PokemonDetails: state.params.PokemonUrl,
            allPokemonData: state.params.allPokemonsData,
          },
          () => {
            this.getPokemonData();
          }
        );
      } else if (state.params.pokemondata.url === false) {
        this.setState({
          PokemonData: state.params.pokemondata,
          allPokemonData: state.params.allPokemonsData,
          noUrl: true,
        });
      }
    });
  }
  render() {
    return this.state.PokemonData.length === 0 ? (
      <View style={styles.spinner}>
        <ActivityIndicator color="red" size="large" />
      </View>
    ) : (
      <View style={styles.containerHeader}>
        <Header />
        <ScrollView style={styles.containerView}>
          <View style={styles.container}>
            <ImagePicker
              PokemonImage={
                this.state.noUrl === true
                  ? this.state.PokemonData.image
                  : this.state.PokemonData.sprites === undefined
                  ? null
                  : this.state.PokemonData.sprites.front_default
              }
              getImageFile={this.getImageFile}
              Status="Update"
            />
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={require("../assets/Poke_Ball.png")}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Pokemon Name"
                underlineColorAndroid="transparent"
                defaultValue={this.state.PokemonData.name}
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
                defaultValue={
                  this.state.noUrl === true
                    ? this.state.PokemonData.type
                    : this.state.PokemonData.types === undefined
                    ? ""
                    : this.state.PokemonData.types[0].type.name
                }
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
                defaultValue={
                  this.state.noUrl === true
                    ? this.state.PokemonData.ability
                    : this.state.PokemonData.abilities === undefined
                    ? ""
                    : this.state.PokemonData.abilities[0].ability.name
                }
                underlineColorAndroid="transparent"
                onChangeText={(e) => this.handleChange(e, "PokemonAbility")}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.updateButton]}
              onPress={() => this.updatePokemon("PokemonLists")}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}
UpdatePokemonScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  containerView: {
    backgroundColor: "#ebf0f7",
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  containerHeader: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
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
  updateButton: {
    backgroundColor: "#FF4500",
  },
  buttonText: {
    color: "white",
  },
});
