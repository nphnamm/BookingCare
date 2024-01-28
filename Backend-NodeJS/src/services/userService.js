import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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


let handleUserLogin = (email,password) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            
            let userData ={};
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user already exist 
                //compare password
                let user = await db.User.findOne({
                    attributes:['email','roleId','password','firstName','lastName'],
                    where:{email :email},
                    raw: true
                })
                if(user){
                    //compare password
                    // bcrypt.comparesync("not_bacon",hash);; false
                    let check = await bcrypt.compareSync(password,user.password); //false
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage ='ok';
                        delete user.password;
                        userData.user = user;

                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }

                }else{
                    userData.errCode =2 ;
                    userData.errMessage = `User's isn't exist`;

                }   


            }else{
                userData.errCode = 1;
                userData.errMessage =`Your's Email isn't exist in your system. Plz try other email`
            }

            resolve(userData)

        }catch(e){
            reject(e);

        }
})

}

let checkUserEmail = (userEmail) =>{
    return new Promise(async(resolve, reject)=>{
            try{
            
                let user = await db.User.findOne({
                    where:{ email: userEmail}
                })
                if(user){
                    resolve(true)
                }else{

                    resolve (false)
                }
            }catch(e){
                reject(e);

            }
    })
}


let getAllUsers = (userId) =>{
    return new Promise(async(resolve,reject) =>{
        try{
            let users ='';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                });
            }
            if(userId  && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            resolve(users)
        }catch(e){
            reject(e);
        }


    })

} 
let createNewUser = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try{
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode :1,
                    errMessage: 'Your email is already exits'
                })
            }else{


                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address : data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender ,
                    roleId:data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                    
    
                })
                resolve({
                    errCode:0,
                    message:'Ok'
                })
            }




        }catch(e){
            reject(e);
        }
    })
}
let deleteUser =(userId) =>{
    return new Promise(async(resolve,reject)=>{
        let user = await db.User.findOne({
            where:{id:userId}
        })
        if(!user){
            resolve({
                errCode:2,
                errMessage:`The user isn't exit`
            })
        }
        if(user){

            await user.destroy();
        }
        resolve({
            errCode:0,
            errMessage:`The user is deleted `
        })


    })
}

let updateUserData = (data) =>{
    return new Promise(async(resolve,reject)=>{

        try{


            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where:{id: data.id},
                raw:false   
            })
            if(user){
  
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.gender = data.gender ;
                user.roleId =data.roleId;
                user.positionId = data.positionId;
                if(data.avatar){
                    user.image = data.avatar


                }
                
                await user.save();

                // let allUser = await db.User.findAll();
                // resolve(allUser);
                resolve({
                    errCode: 0,
                    errMessage:'Update the user succeeds'
                })
            }
            else{
                resolve({
                    errCode:1,
                    errMessage:`User's not found `
                });
            }
            
        }catch(e){
            console.log(e);
        }
    })
}
let getAllCodeService = (typeInput)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!typeInput){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters!'
                })
            }else{
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where:{ type: typeInput}
                });
                res.errCode = 0;
    
                res.data = allcode;
                resolve(res);
            }
      
        }catch(e){
            reject(e);
        }

    })
}
module.exports ={
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService,
    
}