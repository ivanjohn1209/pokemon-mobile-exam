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
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPokemon } from "../redux/actions";
import Header from "../component/Header";
import Footer from "../component/Footer";

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
  }
  deletePokemon(name) {
    var deletePokemon = this.state.pokemonsData.filter((e) => e.name != name)
    this.setState({
      pokemonsData: deletePokemon,
    });
    this.deletePokemonData(deletePokemon)
  }
  changeScreen(screen, pokemonsData) {
    if(pokemonsData.url === false){
      this.props.navigation.navigate(screen, { pokemondata :pokemonsData , PokemonUrl :pokemonsData.url ,allPokemonsData :this.state.pokemonsData });
    }else{
      this.props.navigation.navigate(screen, { url:true ,PokemonUrl :pokemonsData.url, allPokemonsData :this.state.pokemonsData });
    }
  }
  async readData() {
    try {
      const pokemonData = await AsyncStorage.getItem('pokemonData')
      if (pokemonData !== null) {
        let newPokemonData = JSON.parse(pokemonData)
       this.setState({
        pokemonsData:newPokemonData
       })
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  async deletePokemonData(e) {
    try {
      await AsyncStorage.setItem('pokemonData',JSON.stringify(e));
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.navigate("PokemonLists");
  };
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.readData()
    });
  }
  render() {
    const createTwoButtonAlert = (e) =>
    Alert.alert(
      "Delete!",
      "are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deletePokemon(e) }
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
            onEndReached={() => this.props.getPokemon(1123)}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.card}>
                  <Image
                    style={styles.image}
                    source={require("../assets/Poke_Ball.png")}
                  />
                  <View style={styles.cardContent}>
                    <TouchableOpacity
                      onPress={() => createTwoButtonAlert(item.name)}
                    >
                      <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.changeScreen("UpdatePokemon",  item)
                      }
                    >
                      <Text>edit</Text>
                    </TouchableOpacity>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.count}>{item.count}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() =>
                        this.changeScreen("PokemonDetails", item)
                      }
                    >
                      <Text style={styles.followButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
                  <Footer navigation={this.props.navigation} pokemonData={this.state.pokemonsData}/>

      </View>
    );
  }
}
PokemonListsScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  LogoImg: {
    height: 10,
    width: 10,
  },
  header: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "#ef5350",
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
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
  followButton: {
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
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
});

const mapStateToProps = (state) => {
  const { pokemons } = state;
  return { pokemons };
};
export default connect(mapStateToProps, { getPokemon })(PokemonListsScreen);
