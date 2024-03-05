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

module.exports ={
    createSpecialtyService: createSpecialty,
    getAllSpecialtyService: getAllSpecialty
}