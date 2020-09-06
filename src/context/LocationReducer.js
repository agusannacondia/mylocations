import { 
    ADD_LOCATION,
    REMOVE_LOCATION
} from './types'

export default (state, action) => {
    switch(action.type){
        case ADD_LOCATION:
            return {
                locations: state.locations.length === 0 ? [ action.payload ] : [ ...state.locations, action.payload ]
            };
        case REMOVE_LOCATION:
            return {
                locations: action.payload
            };
        default: 
            return state;
    }
}