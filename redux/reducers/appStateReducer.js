const initalState = {
    AccessGatePassed: false,
    fullname: "John Doe",
    email: "johndoe@helpaidafrica.org",
    totalBoxesDelivered: 69,
    rank: 1,
    rankTotal: 24
}

const appStateReducer = (state = initalState, action) => {
    switch (action.type){
        case 'UPDATE_ACCESSGATE':
            return {
                AccessGatePassed: action.AccessGatePassed,
                fullname: state.fullname,
			    email: state.email,
			    totalBoxesDelivered: state.totalBoxesDelivered,
			    rank: state.rank,
			    rankTotal: state.rankTotal
            }
    }

    return state
}

export default appStateReducer;
