import actionTypes from './actionTypes';
import { 
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService    
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

// let rest = await getTopDoctorHomeService(3)

export const fetchTopDoctor = () =>{
    return async(dispatch,getState) => {
        try{
            let res =  await getTopDoctorHomeService();
            console.log('check res doctor',res);
            if(res && res.errCode === 0){
                dispatch({

                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data

                })
            }else {
                dispatch({

                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED

                })

            }
        }catch(e){
            console.log('error of fetch top doctor: ',e)
            dispatch({

                type: actionTypes.FETCH_TOP_DOCTORS_FAILED

            })
        }
    }

}

// export const fetchAllDoctors = () =>{
//     return async(dispatch,getState) => {
//         try{
//             let res =  await getAllDoctors();
//             console.log('check all doctor',res);
//             if(res && res.errCode === 0){
//                 dispatch({

//                     type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
//                     dataDr: res.data

//                 })
//             }else {
//                 dispatch({

//                     type: actionTypes.FETCH_ALL_DOCTORS_FAILED

//                 })

//             }
//         }catch(e){
//             console.log('error of fetch top doctor: ',e)
//             dispatch({

//                 type: actionTypes.FETCH_ALL_DOCTORS_FAILED

//             })
//         }
//     }

// }

export const fetchAllDoctors = () =>{
    return async(dispatch,getState) => {
        try{
            let res =  await getAllDoctors();
            console.log('check all doctor',res);
            if(res && res.errCode === 0){
                dispatch({

                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataAllDoctors: res.data

                })
            }else {
                dispatch({

                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED

                })

            }
        }catch(e){
            console.log('error of fetch top doctor: ',e)
            dispatch({

                type: actionTypes.FETCH_ALL_DOCTORS_FAILED

            })
        }
    }

}

export const saveDetailDoctors = (data) =>{
    return async(dispatch,getState) => {
        try{
            let res =  await saveDetailDoctorService(data);
            console.log('check all doctor',res);
            if(res && res.errCode === 0){
                toast.success("Save for Infor detail doctor succeed")
                dispatch({

                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS

                })
            }else {
                toast.error("Save for Infor detail doctor error")

                dispatch({

                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED

                })

            }
        }catch(e){
            console.log('error of save doctor detail: ',e)
            toast.error("Save for Infor detail doctor error")

            dispatch({

                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED

            })
        }
    }

}

export const fetchAllScheduleTime = (type) =>{
    return async(dispatch,getState) => {
        try{
            let res =  await getAllCodeService("TIME");
            console.log('check all doctor',res);
            if(res && res.errCode === 0){
                dispatch({

                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data

                })
            }else {
                dispatch({

                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED

                })

            }
        }catch(e){
            console.log('error of fetch top doctor: ',e)
            dispatch({

                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED

            })
        }
    }

}
export const getRequiredDoctorInfor = () =>{
    return async (dispatch, getState) =>{
    try{
        dispatch({type:actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})
        let resPrice = await getAllCodeService("PRICE")
        let resPayment = await getAllCodeService("PAYMENT");
        let resProvince = await getAllCodeService("PROVINCE");

        if(resPrice && resPrice.errCode === 0
            && resPayment && resPayment.errCode === 0
            && resProvince && resProvince.errCode === 0
            
        
            ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            
        }else{
            dispatch(fetchRequiredDoctorInforFailed())

        }


    }catch(e){
        dispatch(fetchRequiredDoctorInforFailed())

        console.log(e);
    }


    }
}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) =>({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = (allRequiredData) =>({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})
