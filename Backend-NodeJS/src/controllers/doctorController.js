import doctorService from "../services/doctorService";




let getTopDoctorHome = async (req, res) =>{
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            messegage:'Error from server...'
        })


    }

}
let getAllDoctors = async (req,res) =>{
    try{
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from the server'
        })
    }
}

let postInforDoctor = async (req,res) =>{
    try{
        let response = await doctorService.saveDetailInforDoctor(req.body);

        return res.status(200).json(response);
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from the server'
        })
    }
}

let getDetailDoctorById = async(req,res)=>{
    try{

        
            let infor = await doctorService.getDetailDoctorById(req.query.id);
            return res.status(200).json(infor);


    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from the server'
        })
    }

}

let bulkCreateSchedule = async (req, res) =>{
    try{
        let infor = await doctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(
            infor
        )
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from the server'
        })
    }
}
let getScheduleByDate = async (req, res) =>{
    try{
        let infor = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date);
        return res.status(200).json(
            infor
        )
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from the server'
        })
    }

}
let getExtraInforDoctorById = async (req,res) =>{
    try{
        let infor = await doctorService.getExtraInforDoctorByIdService(req.query.doctorId);
        return res.status(200).json(
            infor
        )
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from the server'
        })
    }
}
let getProfileDoctorById  = async (req,res)=>{
    try{
        let infor = await doctorService.getDetailDoctorByIdService(req.query.doctorId);
        return res.status(200).json(
            infor
        )
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from the server'
        })
    }

}
let getListPatientForDoctor = async (req,res) =>{
    try{
        let infor = await doctorService.getListPatientForDoctorService(req.query.doctorId,req.query.date)
        return res.status(200).json(infor);
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from the server'
        })
    }   
}
let sendRemedy = async (req,res) =>{
    try{
        let infor = await doctorService.sendRemedyService(req.body);
        return res.status(200).json(infor);
        
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from the server'
        })
    }
}
module.exports ={
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy
}