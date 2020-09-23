import React, { Component } from 'react'
import { View,StyleSheet,Text} from 'react-native';

export default class Header extends Component {
    render() {
        return (
           <View style={styles.Header}>
            <Text style={styles.HeaderText}>All Pokemons</Text>
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
       marginTop:10


   },
   HeaderText:{
       fontWeight:"bold",
       fontSize:20,
       color:"#333",
       letterSpacing:1
   }
});

  