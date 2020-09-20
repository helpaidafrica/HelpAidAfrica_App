import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

var Global = require('../../assets/styles/global');
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'
import ModalSelector from 'react-native-modal-selector'     
import TemplateComponent from '../TemplateComponent'


class ManualInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.inputRef = React.createRef()
    }

    _handleFieldEdited(text){
        this.props.updateBoxID_Number(text)
        this.props.updateBoxSearchState(null);
        this.props.updateBoxData(null);
    }

    async _handleSearchForBox(boxID){
        // Alert.alert("TODO: ask server for box info: " + boxID)
        this.inputRef.current.blur()
        await ClientAPI.searchForBox(boxID)
    }

  render() {
    const SearchBoxIcon = () => {
        switch(this.props.boxSearch){
            case null: 
                return <MaterialCommunityIcons name="feature-search" size={24} color="white" />
            case "searching":
                return <ActivityIndicator size="small" color="white" />

            case "searchFailure":
                return <MaterialCommunityIcons name="emoticon-sad-outline" size={24} color="white" />

            case "searchSuccess":
                return <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="white" />
        }
    }

    return(
        <View style={styles.container}>
            <TextInput 
                value = { this.props.boxID_Number } 
                editable = { this.props.boxScanned }
                textAlign="center"  
                placeholder="C123_1" 
                style={styles.InputField}
                onChangeText={(text)=>this._handleFieldEdited(text)}
                onSubmitText={()=> this._handleSearchForBox(this.props.boxID_Number)}
                ref={this.inputRef}
            />
            <TouchableOpacity disabled={(this.props.boxSearch !== null) || !this.props.boxScanned} style={styles.searchButton} onPress={()=>this._handleSearchForBox(this.props.boxID_Number)}>
                <SearchBoxIcon/>
            </TouchableOpacity>
        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        boxID_Number: state.addBoxReducer.boxID_Number,
        boxSearch: state.addBoxReducer.boxSearch,
        boxScanned: state.addBoxReducer.boxScanned
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateBoxID_Number: (cons) => dispatch({ type: 'UPDATE_BOXID_NUMBER', boxID_Number: cons }),
        updateBoxSearchState: (cons) => dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: cons}),
        updateBoxData: (cons) => dispatch({type: 'UPDATE_BOX_DATA', boxData: cons})

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },

    InputField: {
        height: 45,
        flex: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'column',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        paddingRight: 25
    },

    searchButton:{
        flex: 2,
        backgroundColor: Global.Styles.primaryLight,
        height: 45,
        borderRadius: 15,
        left: -10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(ManualInput))
