import * as React from 'react';
import { Button, Image, View, Platform ,  StyleSheet} from 'react-native';
import * as ImagePickers from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.isEmpty = this.isEmpty.bind(this);
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  render() {
    let { image } = this.state;
    return (
      <View style={styles.imageView}>
        <Button title="Pokemon Picture" onPress={this._pickImage} />
        {
          this.isEmpty(this.state.image)
          ?<Image source={{ uri: this.props.PokemonImage}} style={styles.image} />:
          image && <Image source={{ uri: image }} style={styles.image} />
        }
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePickers.launchImageLibraryAsync({
        mediaTypes: ImagePickers.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.props.getImageFile(result.uri);

      }

    } catch (E) {

    }
  };
}
const styles = StyleSheet.create({
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    marginTop:20,
    marginBottom:20,
    borderColor:"#ebf0f7"
  },
  imageView:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  }
}); 