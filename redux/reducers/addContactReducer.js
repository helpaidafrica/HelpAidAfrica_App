const initalState = {
    searchText: "",
    previousText: "",
    queue: {},
    queueCount: 0
}

const addContactReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'STORE_SEARCHTEXT':
            return {
                searchText: action.searchText,
                previousText: state.searchText,
                queue: state.queue,
                queueCount: state.queueCount
            }

        case 'UPDATE_QUEUE':
            return {
                searchText: state.searchText,
                previousText: state.previousText,
                queue: action.queue,
                queueCount: Object.keys(action.queue).length
            }
        default:
            return state

    }

    return state
}

export default addContactReducer;
