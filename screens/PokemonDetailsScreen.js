import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import Header from "../component/Header";

export default class PokemonDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PokemonDetails: "",
      PokemonData: [],
      noUrl: false,
    };
    this.getPokemonData = this.getPokemonData.bind(this);
    this.capitalLetter = this.capitalLetter.bind(this);
  }
  capitalLetter(e) {
    const nameCapitalized = e.charAt(0).toUpperCase() + e.slice(1);
    return nameCapitalized;
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
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      const { state } = this.props.navigation;
      if (state.params.url === true) {
        this.setState(
          {
            PokemonDetails: state.params.PokemonUrl,
          },
          () => {
            this.getPokemonData();
          }
        );
      } else if (state.params.pokemondata.url === false) {
        this.setState({
          PokemonData: state.params.pokemondata,
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
      <ScrollView>
        <View style={styles.containerHeader}>
          <Header />
          <View style={styles.container}>
            <View style={[styles.card, styles.PokemonCard]}>
            <ImageBackground
          source={require("../assets/Background2.jpg")}
          style={styles.image}
        >
              <Image
                style={styles.avatar}
                source={{
                  uri:
                    this.state.noUrl === true
                      ? this.state.PokemonData.image
                      : this.state.PokemonData.sprites === undefined
                      ? ""
                      : this.state.PokemonData.sprites.front_default,
                }}
              />
              </ImageBackground>
              <Text style={styles.name}>
                {this.capitalLetter(this.state.PokemonData.name)}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTittle}>Type:</Text>
              <Text>
                - {this.state.noUrl === true
                  ? this.capitalLetter(this.state.PokemonData.type)
                  : this.state.PokemonData.types === undefined
                  ? ""
                  : this.capitalLetter(
                      this.state.PokemonData.types[0].type.name
                    )}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTittle}>Ability:</Text>
              <Text>
                - {this.state.noUrl === true
                  ? this.capitalLetter(this.state.PokemonData.ability)
                  : this.state.PokemonData.abilities === undefined
                  ? ""
                  : this.capitalLetter(
                      this.state.PokemonData.abilities[0].ability.name
                    )}
              </Text>
            </View>
            <View style={styles.photosCard}>
              <Text style={styles.cardTittle}>Photos</Text>
              <View style={styles.photosContainer}>
                <Image
                  style={[styles.photo]}
                  source={{
                    uri:
                      this.state.noUrl === true
                        ? this.state.PokemonData.image
                        : this.state.PokemonData.sprites === undefined
                        ? ""
                        : this.state.PokemonData.sprites.front_default,
                  }}
                />
                <Image
                  style={styles.photo}
                  source={{
                    uri:
                      this.state.noUrl === true
                        ? this.state.PokemonData.image
                        : this.state.PokemonData.sprites === undefined
                        ? ""
                        : this.state.PokemonData.sprites.back_default,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
PokemonDetailsScreen.navigationOptions = {
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width:'100%'
  },
  containerHeader: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ebf0f7",
  },
  cardTittle: {
    color: "#808080",
    fontSize: 22,
    marginBottom: 5,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius:100
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 10,
  },
  PokemonCard: {
    height: 200,
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: "#808080",
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius:100,
    marginTop: 5,
    marginRight: 5,
  },
});
