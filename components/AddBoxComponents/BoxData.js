import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    LayoutAnimation,
    Alert
} from 'react-native';

var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'
import * as Device from 'expo-device'

import ModalSelector from 'react-native-modal-selector'    
import ButtonCustom from '../ButtonCustom'


class BoxData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextBoxStatus: null,
            selectedIndex: 0
        };
    }

    async componentDidUpdate(){
        if (this.props.BoxStatusOptions.length == 0){
            let r = await ClientAPI.getBoxStatusEnumValues();
            if (!r.success){
                Alert.alert("Couldn't grab box status options: " + r.data)
            }
        }
    }

    _handleNextStateChosen(option){
        let n = this.props.boxData;
        n.nextState = option.label
        this.props.updateBoxData(n)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.forceUpdate();
 
    }

  render() {
    let index =0;
    const BoxStatusOptions = this.props.BoxStatusOptions;

    const data = BoxStatusOptions.map(option=> ({key: index++, label: option}));
    data.unshift(({key: index++, section: true, label:"Box State"}))

    const PickerCustom = ()=>{
        return (
            <ModalSelector
                data={data}
                onChange={(option)=> this._handleNextStateChosen(option)} 
                animationType={"fade"}
                backdropPressToClose={true}
                scrollViewPassThruProps={{scrollEnabled: true}}
                cancelStyle={{height:0, margin: 0, padding:0, backgroundColor: 'rgba(0,0,0,0.7)' }}
                sectionTextStyle={{fontWeight: 'bold'}}
            >
                <ButtonCustom buttonText={"Next State: " + this.props.boxData.nextState} color={Global.Styles.primaryLight} onPress={()=>Alert.alert("Button clicked.")}/>
            </ModalSelector>
        )
    }

    const BoxDataComponent = (props)=>{

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        switch(this.props.boxSearch){
            case "searchSuccess":
                return (
                    <View>
                        <Text style={[{color:"black"}, styles.messageText]}>{this.props.boxData.message || null}</Text>
                        <ButtonCustom disabled={true} buttonText={"Last State: " + this.props.boxData.currentState} color={Global.Styles.cancelRed} onPress={()=>Alert.alert("Button clicked.")}/>
                        <PickerCustom/>

                    </View>
                )

            case "searchFailure": 
                return <Text style={[{color:"red"}, styles.messageText]}>{this.props.boxData.message || null}</Text>

            case null:
            case "searching":
            default: 
                return <View/>
        }
    }
    return(
        <View style={styles.container}>
            <BoxDataComponent/>
        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        boxData: state.addBoxReducer.boxData,
        boxSearch: state.addBoxReducer.boxSearch,
        BoxStatusOptions: state.sessionReducer.BoxStatusOptions
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateBoxData: (cons) => dispatch({ type: 'UPDATE_BOX_DATA' , boxData: cons}),
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },

    messageText:{
        alignSelf: 'center'
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(BoxData))
