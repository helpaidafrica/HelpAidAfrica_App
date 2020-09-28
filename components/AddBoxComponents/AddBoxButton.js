import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    LayoutAnimation,
    Alert,
} from 'react-native';

var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'

import ModalSelector from 'react-native-modal-selector'    

import ButtonCustom from '../ButtonCustom'

import * as Haptics from 'expo-haptics';

class BoxButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async _handleAddBoxButtonClicked(){
        await ClientAPI.addBoxToEvent({boxID:this.props.boxData.message, nextBoxState: this.props.boxData.nextState}, this.props.navigation)
    }

  render() {

    return(
        <View style={styles.container}>
            <ButtonCustom 
                loading={this.props.addingBoxToEvent} 
                disabled={this.props.boxSearch != "searchSuccess"} 
                buttonText="Add Box" color={"green"} 
                onPress={()=> this._handleAddBoxButtonClicked()}
            />
        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        boxData: state.addBoxReducer.boxData,
        boxSearch: state.addBoxReducer.boxSearch,
        addingBoxToEvent: state.addBoxReducer.addingBoxToEvent,
        boxID_Number: state.addBoxReducer.boxID_Number,
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateBoxData: (cons) => dispatch({ type: 'UPDATE_BOX_DATA' , boxData: cons}),
    }
}

const styles = StyleSheet.create({
    container: {
    },

    messageText:{
        alignSelf: 'center'
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(BoxButton))
