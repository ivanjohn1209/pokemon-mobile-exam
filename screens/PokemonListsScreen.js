import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";

import { connect } from "react-redux";
import { getPokemon } from "../redux/actions";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
class PokemonListsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PokemonList: [],
      pokemonsData: [],
      screen: "",
    };

    this.changeScreen = this.changeScreen.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.capitalLetter = this.capitalLetter.bind(this);
    this.shortName = this.shortName.bind(this);
  }
  capitalLetter(e) {
    const nameCapitalized = e.charAt(0).toUpperCase() + e.slice(1);
    return nameCapitalized;
  }
  shortName(e) {
    if (e.length > 8) {
      var shortname = e.substring(0, 8) + " ...";
      return shortname;
    } else {
      return e;
    }
  }
  deletePokemon(name) {
    var deletePokemon = this.state.pokemonsData.filter((e) => e.name != name);
    this.setState({
      pokemonsData: deletePokemon,
    });
    this.deletePokemonData(deletePokemon);
  }
  changeScreen(screen, pokemonsData) {
    if (pokemonsData.url === false) {
      this.props.navigation.navigate(screen, {
        pokemondata: pokemonsData,
        PokemonUrl: pokemonsData.url,
        allPokemonsData: this.state.pokemonsData,
      });
    } else {
      this.props.navigation.navigate(screen, {
        url: true,
        PokemonUrl: pokemonsData.url,
        allPokemonsData: this.state.pokemonsData,
      });
    }
  }
  async readData() {
    try {
      const pokemonData = await AsyncStorage.getItem("pokemonData");
      if (pokemonData !== null) {
        let newPokemonData = JSON.parse(pokemonData);
        this.setState({
          pokemonsData: newPokemonData,
        });
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  }
  async deletePokemonData(e) {
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
      this.readData();
    });
  }
  render() {
    const createTwoButtonAlert = (e) =>
      Alert.alert(
        "Delete!",
        `you want to delete ${e}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => this.deletePokemon(e) },
        ],
        { cancelable: false }
      );
    return this.state.pokemonsData.length === 0 ? (
      <View style={styles.spinner}>
        <ActivityIndicator color="red" size="large" />
      </View>
    ) : (
      <View style={styles.container}>
        <Header />
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.pokemonsData}
          showsVerticalScrollIndicator={false}
          onEndReached={() => this.props.getPokemon(this.state.pokemonsData.length + 10)}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card}
              onPress={() => this.changeScreen("PokemonDetails", item)}>
                <Image
                  style={styles.image}
                  source={require("../assets/Poke_Ball.png")}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>
                    {this.shortName(this.capitalLetter(item.name))}
                  </Text>
                  <TouchableOpacity
                    style={styles.View}
                    onPress={() => this.changeScreen("PokemonDetails", item)}
                  >
                    <Text style={styles.ViewText}>View</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.Action}>
                  <TouchableOpacity
                    onPress={() => createTwoButtonAlert(item.name)}
                  >
                    <EvilIcons name="trash" style={styles.Icon} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.changeScreen("UpdatePokemon", item)}
                  >
                    <AntDesign name="edit" style={styles.Icon} color="black" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <Footer
          navigation={this.props.navigation}
          pokemonData={this.state.pokemonsData}
        />
      </View>
    );
  }
}
PokemonListsScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
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
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },
  Action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
  Icon: {
    backgroundColor: "#eee",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 15,
    borderRadius: 30,
    marginRight: 5,
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  View: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  ViewText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
});

const mapStateToProps = (state) => {
  const { pokemons } = state;
  return { pokemons };
};
export default connect(mapStateToProps, { getPokemon })(PokemonListsScreen);
