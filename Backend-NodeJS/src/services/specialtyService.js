const db = require("../models");

let createSpecialty = (data) =>{
    return new Promise(async (resolve,reject) =>{
        try{
            if(!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown
                ){


                }else{

                    console.log('check data ', data);
                    await db.Specialty.create({
                        name: data.name,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown
                    })
                    resolve({
                        errCode:0,
                        errMessage:'ok'
                    })
                }
        }catch(e){
            reject(e);
        }
    })
}

let getAllSpecialty = () =>{
    return new Promise(async(resolve,reject) =>{
        try{
            let data =  await db.Specialty.findAll({
            })
            if(data && data.length >0){
                data.map(item =>{
                    item.image = new Buffer.from(item.image, 'base64').toString('binary');

                    return item;
                })
            }
            resolve({
                errCode:0,
                errMessage:"ok",
                data
            })

        }catch(e){

            reject(e)
        }
    })
}
let getDetailSpecialtyById = (inputId,location) =>{
    return new Promise(async(resolve,reject) =>{
        try{

            if(!inputId || !location){
                resolve({
                    errCode:1,
                    errMessage:'Missing parameter'
                })
            }else{
                
                let data = await db.Specialty.findOne({
                    where:{id:inputId},
                    attributes: ['descriptionHTML','descriptionMarkdown']
                })
                let doctorSpecialty =[];
                data.doctorSpecialty = doctorSpecialty;
                if(data){
                    let doctorSpecialties =[];

                    if(location ==='ALL'){
                        doctorSpecialties = await db.Doctor_Infor.findAll({
                            where: {specialtyId: inputId},
                            attributes:['doctorId','provinceId'],
                        })

                    }
                    else
                    {
                        doctorSpecialties = await db.Doctor_Infor.findAll({
                            where:{
                                specialtyId: inputId,
                                provinceId: location
                            }, attributes:['doctorId','provinceId'],
                        })
                        

                    }
                    data = {
                        descriptionHTML:data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown,
                        doctorSpecialty: doctorSpecialties,

                    };
                }else {data ={};}
                resolve({
                    errCode:0,
                    errMessage:"ok",
                    data
                })
            }
            
          

        }catch(e){

            reject(e)
        }
    })
}

module.exports ={
    createSpecialtyService: createSpecialty,
    getAllSpecialtyService: getAllSpecialty,
    getDetailSpecialtyByIdService: getDetailSpecialtyById
}