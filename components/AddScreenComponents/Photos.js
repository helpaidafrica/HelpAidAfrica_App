import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import CardList from '../CardList'


class UserBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {

    const cardData = [
      
        {
            icon: <MaterialIcons name="photo" size={18} color="black" />,
            label: this.props.images.length + " photos",
            showArrow: true,
            key: 1,
            onPress: "Photos",
            pressable: true
        }
    ]

    return(
        <View style={styles.container}>
            <CardList cardData={cardData} {...this.props}/>
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
    }
}

const styles = StyleSheet.create({
    container: {
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(UserBoxList))
