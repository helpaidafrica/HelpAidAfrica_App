import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'
import * as ImagePicker from 'expo-image-picker';


class PhotosAddedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    async _pickImage(){
        // const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        // if (status !== 'granted') {
        //   Alert.alert('Sorry, we need camera roll permissions to make this work!');
        //   return
        // }


        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });

        if (!result.cancelled) {
          let images = this.props.images
          let imagesNew = images.concat({uri: result.uri})
          // images.push({uri: result.uri})
          this.props.updateImages(imagesNew)
          return
        }

        return
    }

  render() {
    const ImageToShow = (image)=>{
        if (image.item == undefined){
            console.log("ISNULL")
            return(<View/>)
        }

        return(
            <View style={styles.imageContainer}>
                <Image
                  source={{uri: image.item.uri}}
                  style={styles.imageStyle}
                />
            </View>
        )
    }

    const AddImage = (box)=>{
        return(
            <View style={styles.imageContainer}>
                <MaterialCommunityIcons name="camera-plus" size={55} color="black" />
               
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Button title="Add Photo" onPress={()=> this._pickImage()}/>
            <FlatList
                data={this.props.images}
                renderItem={ImageToShow}
                columnWrapperStyle={styles.list}
                numColumns={3}
            />
           

        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        images: state.trackingEventReducer.images

    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateImages: (cons) => dispatch({ type: 'UPDATE_IMAGES' , images: cons}),
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    list:{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#ddd',
    },

    imageStyle:{
        width: "100%",
        height: "100%",
    },

    imageContainer:{
        backgroundColor: '#ccc',
        margin: 1,
        width: "30%",
        height: 150,
        flex: 1, 
        alignSelf: 'center'
    },

    boxName:{
        fontSize: 20,
        fontWeight: '800'
    },

    boxState:{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
    },

    boxStateContainer:{
        backgroundColor: Global.Styles.primaryGreen,
        padding: 10,
        borderRadius: 5, 
        width: '100%',
        justifyContent: 'space-around'
    }

});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(PhotosAddedList))