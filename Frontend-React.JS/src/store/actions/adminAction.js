import actionTypes from './actionTypes';
import { 
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService
} from '../../services/userService';
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

export const deleteAUser = (userId) =>{
    return async(dispatch,getState) => {
        try{
    
            let res = await deleteUserService(userId);
            // console.log("check user redux",res);
            
            if(res && res.errCode === 0){
                toast.success("DELETE THE USER SUCCEED");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
    
            }else{
                toast.error("DELETE USER FAILED");

                dispatch(deleteUserFailed());
            }
    
    
        }catch(e){
            toast.error("DELETE USER FAILED");

            dispatch(deleteUserFailed());
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
        let doctor = await getTopDoctorHomeService('');
        console.log('check top doctors', doctor);
        if(res && res.errCode === 0){
            toast.success("FETCH ALL USERS SUCCEED");

            dispatch(fetchAllUserSuccess(res.users.reverse()))

        }else{
            toast.error("FETCH ALL USERS FAILED");

            dispatch(fetchAllUserFailed());
        }


        }catch(e){
            toast.error("FETCH ALL USERS FAILED");

            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed :',e)
        }
    }
}
export const fetchAllUserSuccess = (data) =>({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () =>({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS
})


export const deleteUserFailed= () =>({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (userId) =>{
    return async(dispatch,getState) => {
        try{
    
            let res = await editUserService(userId);
            // console.log("check user redux",res);
            
            if(res && res.errCode === 0){
                toast.success("UPDATE THE USER SUCCEED");
                dispatch(updateUserSuccess())
                dispatch(fetchAllUserStart())
    
            }else{
                toast.error("DELETE USER FAILED");
                
                dispatch(updateUserFailed());
            }
    
    
        }catch(e){
            toast.error("DELETE USER FAILED");

            dispatch(updateUserFailed());
        }
    }
}


export const updateUserSuccess = () =>({
    type: actionTypes.UPDATE_USER_SUCCESS
})


export const updateUserFailed = () =>({
    type: actionTypes.UPDATE_USER_FAILED
})
