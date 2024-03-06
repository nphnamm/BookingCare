import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor:[],
    allDoctor:[],
    allScheduleTime:[],
    allRequiredDoctorInfor:[],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoading = true;
            // console.log('fire fetch gender start',action);
            return {
                ...copyState
              
        }
        case actionTypes.FETCH_GENDER_SUCCESS:
          state.genders = action.data;
                   
        state.isLoading = false;
            // console.log('fire fetch gender success',action);

            return {
                ...state
              
        }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('fire fetch gender failed',action);
            
       
            state.genders = [];
            return {
                ...state
              
        }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            // console.log('fire fetch position success',action);
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
            // console.log('fire fetch role success',action);
              return {
                  ...state
                
          }
          case actionTypes.FETCH_ROLE_FAILED:
    
              state.roles = [];
              return {
                  ...state
                
          }

          case actionTypes.FETCH_ALL_USERS_SUCCESS:
    
          state.users = action.users;
          return {
              ...state

            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
    
        state.users = [];
        return {
            ...state
    
           }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
    
        state.topDoctor = action.dataDoctors;
        return {
            ...state
    
        }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
    
        state.topDoctor = [];
        return {
            ...state
    
        }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
    
        state.allDoctor = action.dataAllDoctors;
        // console.log('check allDoctor',state.allDoctor)
        return {
            ...state
    
        }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
    
        state.allDoctor = [];
        return {
            ...state
    
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
    
        state.allScheduleTime = action.dataTime;
        // console.log('check allDoctor',state.allScheduleTime)
        return {
            ...state
    
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
    
        state.allScheduleTime = [];
        return {
            ...state
    
        }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
    
        state.allRequiredDoctorInfor = action.data;
        // console.log("fetch required doctor infor", action);
        return {
            ...state
    
        }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
    
        state.allRequiredDoctorInfor = [];
        return {
            ...state
    
        }




        default:
            return state;
    }
}

export default appReducer;