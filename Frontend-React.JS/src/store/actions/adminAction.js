import actionTypes from './actionTypes';
import { getAllCodeService,createNewUserService,getAllUsers } from '../../services/userService';
import {toast } from "react-toastify";
// export const fetchGenderStart= () => ({
//     type: actionTypes.FETCH_GENDER_START
// })


export const fetchGenderStart= () => {


    return async(dispatch,getState) => {
    try{

        dispatch(
        {type: actionTypes.FETCH_GENDER_START} )
        let res = await getAllCodeService("GENDER");
        if(res && res.errCode === 0){

            dispatch(fetchGenderSuccess(res.data))

        }else{

            dispatch(fetchGenderFailed());
        }


    }catch(e){
        dispatch(fetchGenderFailed());
        console.log('error:',e)
    }
}
}

export const fetchGenderSuccess= (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
})

export const fetchGenderFailed= () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



export const fetchPositionStart= () => {


    return async(dispatch,getState) => {
    try{

       
        let res = await getAllCodeService("POSITION");
        if(res && res.errCode === 0){

            dispatch(fetchPositionSuccess(res.data))

        }else{

            dispatch(fetchPositionFailed());
        }


    }catch(e){
        dispatch(fetchPositionFailed());
        console.log('error:',e)
    }
}
}


export const fetchRoleStart= () => {


    return async(dispatch,getState) => {
    try{

        let res = await getAllCodeService("ROLE");
        if(res && res.errCode === 0){

            dispatch(fetchRoleSuccess(res.data))

        }else{

            dispatch(fetchRoleFailed());
        }


        }catch(e){
            dispatch(fetchRoleFailed());
            console.log('error:',e)
        }
    }
}
export const createNewUser = (data) =>{
    return async(dispatch,getState) => {
        try{
    
            let res = await createNewUserService(data);
            // console.log("check user redux",res);
            
            if(res && res.errCode === 0){
                toast.success("CREATE A NEW USER SUCCEED");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
    
            }else{
    
                dispatch(saveUserFailed());
            }
    
    
        }catch(e){
            dispatch(saveUserFailed());
            console.log('save user failed error:',e)
        }
    }
}
export const saveUserSuccess = () =>({
    type: 'CREATE_USER_SUCCESS'
})

export const saveUserFailed = () =>({
    type: 'CREATE_USER_FAILED'
})

export const fetchPositionSuccess= (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed= () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleSuccess= (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data:RoleData
})

export const fetchRoleFailed= () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const fetchAllUserStart= () => {


    return async(dispatch,getState) => {
    try{

        let res = await getAllUsers("ALL");
        if(res && res.errCode === 0){

            dispatch(fetchAllUserSuccess(res.users.reverse()))

        }else{

            dispatch(fetchAllUserFailed());
        }


        }catch(e){
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed :',e)
        }
    }
}
export const fetchAllUserSuccess = (data) =>({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUserFailed = () =>({
    type: 'FETCH_ALL_USERS_FAILED'
})




