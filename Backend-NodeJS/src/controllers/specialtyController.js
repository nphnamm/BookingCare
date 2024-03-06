import specialtyService from "../services/specialtyService";

let createSpecialty = async(req,res)=>{
    try{
        let infor = await specialtyService.createSpecialtyService(req.body);
        return res.status(200).json(infor);

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from the server'

        })
    }
}
let getAllSpecialty = async (req,res) =>{
    try {
        let infor = await specialtyService.getAllSpecialtyService(req.body);
        return res.status(200).json(infor);

    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from the server'
        })
    }
}

let getDetailSpecialtyById =  async (req,res) =>{
    try {
        let infor = await specialtyService.getDetailSpecialtyByIdService(req.query.id, req.query.location);
        return res.status(200).json(infor);

    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from the server'
        })
    }
}
module.exports ={
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
}