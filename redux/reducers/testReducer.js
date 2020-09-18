const initalState = {
    counter: 10,
    counterMultiplied: 100
}

const testReducer = (state = initalState, action) => {
    console.log(JSON.stringify(action))
    switch (action.type){
        case 'INCREASE_COUNTER':
            console.log("COUNTER: " + JSON.stringify(state))
            return {
                counter: state.counter + action.constant,
                counterMultiplied: (state.counter + action.constant)*10
            }

        case 'DECREASE_COUNTER':
            return {
                counter: state.counter -1,
                counterMultiplied: (state.counter + -1)*10
            }

    }

    return state
}

export default testReducer;
