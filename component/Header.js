import React, { Component } from 'react'
import { View,StyleSheet,Text,Image} from 'react-native';

export default class Header extends Component {
    render() {
        return (
           <View style={styles.Header}>
               
               <Image
                    style={styles.image}
                    source={require("../assets/PokemonLogo.png")}
                    />
           </View>
        )
    }
}
const styles = StyleSheet.create({
   Header:{
       width:"100%",
       flexDirection: 'row',
       alignItems:"center",
       justifyContent:"center",
       padding:15
   },
   image: {
    width: '40%',
    height: undefined,
    aspectRatio: 105 / 36,
  },
 
});

  