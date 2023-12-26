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
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService
}