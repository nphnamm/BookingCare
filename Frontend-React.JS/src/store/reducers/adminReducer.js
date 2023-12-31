import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoading = true;
            console.log('fire fetch gender start',action);
            return {
                ...copyState
              
        }
        case actionTypes.FETCH_GENDER_SUCCESS:
          state.genders = action.data;
                   
        state.isLoading = false;
            console.log('fire fetch gender success',action);

            return {
                ...state
              
        }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire fetch gender failed',action);
            
       
            state.genders = [];
            return {
                ...state
              
        }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            console.log('fire fetch position success',action);
              return {
                  ...state
                
          }
          case actionTypes.FETCH_POSITION_FAILED:
    
              state.positions = [];
              return {
                  ...state
                
          }
          
          case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            console.log('fire fetch role success',action);
              return {
                  ...state
                
          }
          case actionTypes.FETCH_ROLE_FAILED:
    
              state.roles = [];
              return {
                  ...state
                
          }

        default:
            return state;
    }
}

export default appReducer;