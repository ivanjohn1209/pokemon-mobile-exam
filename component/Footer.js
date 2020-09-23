import React, { Component } from 'react'
import { View ,StyleSheet,Text,TouchableOpacity} from 'react-native';

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
           <View style={styles.Header}>
                   <TouchableOpacity style={styles.card} onPress={() =>  this.changeScreen("CreatePokemon")}>
                   <Text style={styles.HeaderText}>Add</Text>
                   </TouchableOpacity>
           </View>
        )
    }
}
const styles = StyleSheet.create({
   Header:{
       width:"100%",
       height:50,
       flexDirection: 'row',
       alignItems:"center",
       justifyContent:"center",
       backgroundColor:"#ef5350",
      //  marginTop:0


   },
   HeaderText:{
       fontWeight:"bold",
       fontSize:20,
       color:"#333",
       letterSpacing:1
   }
});

  