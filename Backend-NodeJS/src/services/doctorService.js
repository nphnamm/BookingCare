import db from "../models/index";
import bcrypt from 'bcryptjs';

let getTopDoctorHome = (limitInput) =>{
    return new Promise(async(resolve,reject) =>{
        try{
            let users = await db.User.findAll({
                limit:limitInput,
                where:{roleId: 'R2'},
                order:[['createdAt','DESC']],
                
                attributes:{
                    exclude:['password']
                }
                // raw: true



                
            })

            resolve({
                errCode: 0,
                data: users
            })

        }catch(e){
            reject(e);
        }

    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome


}