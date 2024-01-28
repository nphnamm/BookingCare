import axios from "../axios"


const handleLoginApi = (userEmail,userPassword) =>{
    return axios.post('/api/login',{email: userEmail,password: userPassword});
}
const getAllUsers = (inputId) =>{
    return axios.get(`/api/get-all-users?id=${inputId}`);

}
const createNewUserService =(data) =>{
    console.log("check data from service :", data);
    return axios.post('/api/create-new-user',data);

}
const deleteUserService = (userid) =>{
    // return axios.delete('api/delete-user',{id: userid});

    return axios.delete('/api/delete-user',{
        data:{
            id:userid
        }
    })

}
const editUserService = (inputData)=>{
    return axios.put('/api/edit-user',inputData);
}
const getAllCodeService =(inputType) =>{
    return axios.get(`api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) =>{
    return axios.get(`api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors
}
