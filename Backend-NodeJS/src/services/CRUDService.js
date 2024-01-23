
import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) =>{

    return new Promise(async(resolve,reject) =>{
            try{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address : data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender === '1'? true :false,
                    roleId:data.roleId,
                    
                    

                })
                resolve("ok create a new user success")

                
            }catch(e){
                reject(e);
            }

    })
        // let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        // console.log("data from service");
        // console.log(data);
        // console.log("hash password:  " + hashPasswordFromBcrypt);

}

let hashUserPassword = (password) =>{
    return new Promise(async (resolve,reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}
let getAllUser = () =>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users = db.User.findAll({
                raw:true,
            });
            resolve(users);
        }
        catch(e){
            reject(e);
        }

    })

}
let getUserInfoById = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = db.User.findOne({
                where: {id: userId}

            });
            if(user){
                
                resolve(user);
            }else{
                resolve([])
            }
        }
        catch(e){
            reject(e);
        }

    })


        

}
let updateUserData = (data) =>
{
    console.log('data from service');
    console.log(data);

    return new Promise(async(resolve,reject)=>{

        try{
            if(!data.id || !data.roleId || !data.positionId || !data.gender ){
                    
                resolve({
                    errCode:2,
                    errMessage: 'Missing required parameters'
                });

            }
            let user = await db.User.findOne({
                where:{id:data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber
                await user.save();
                let allUser = await db.User.findAll();
                resolve(allUser);
            }
            else{
                resolve();
            }
            
        }catch(e){
            console.log(e);
        }
    })
}
let deleteUserById =(userId) => {
    return new Promise(async(resolve,reject )=>{
        try{

            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
               await user.destroy();
               let allUser = await db.User.findAll();
               resolve(allUser);

            }


        }catch(e){
            reject(e);
        }

    })
}
module.exports ={
    createNewUser: createNewUser,
    getAllUser :getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById

}
