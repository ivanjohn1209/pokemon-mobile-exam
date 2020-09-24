import React, { Component } from 'react'
import { View ,StyleSheet,Text,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          screen: '',
        }
        this.changeScreen = this.changeScreen.bind(this)
      
      }
    changeScreen(screen) {
        this.props.navigation.navigate(screen, {pokemonData :this.props.pokemonData})   
      }
    render() {
        return (
           <View style={styles.Footer}>
                   <TouchableOpacity style={styles.card} onPress={() =>  this.changeScreen("CreatePokemon")}>
                   <Ionicons style={styles.FooterIcon} name="ios-add-circle-outline" color="black" />
                   <Text style={styles.FooterText}>Add Pokemon</Text>
                   </TouchableOpacity>
           </View>
        )
    }
}
const styles = StyleSheet.create({
   Footer:{
       width:"100%",
       flexDirection: 'row',
       alignItems:"center",
       justifyContent:"center",
       padding:10


   },
   FooterText:{
       fontWeight:"bold",
       fontSize:10,
       color:"#333",
       letterSpacing:1,
       textAlign:'center'
   },
   FooterIcon:{
    fontWeight:"bold",
    fontSize:40,
    color:"#333",
    textAlign:'center'
}
});

  