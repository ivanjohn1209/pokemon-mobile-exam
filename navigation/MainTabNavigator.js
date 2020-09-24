import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import PokemonListsScreen from "../screens/PokemonListsScreen";
import CreatePokemonScreen from "../screens/CreatePokemonScreen";
import PokemonDetailsScreen from "../screens/PokemonDetailsScreen";
import UpdatePokemonScreen from "../screens/UpdatePokemonScreen";
import LoginScreen from "../screens/LoginScreen"
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const MainNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    PokemonLists: PokemonListsScreen,
    CreatePokemon: CreatePokemonScreen,
    PokemonDetails:PokemonDetailsScreen,
    UpdatePokemon:UpdatePokemonScreen,
  },
  config
);
MainNavigator.path = "";

export default MainNavigator;
