require('dotenv').config;
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) =>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure:false,
        auth:{
            user: process.env.EMAIL_APP,
            pass:process.env.EMAIL_APP_PASSWORD,

        },

    });
    //send mail with defined transport object
    let infor = await transporter.sendMail({

        from:'"Nguyễn Phan Hoài Nam" <nphnamm@gmail.com>',
        to: dataSend.receiverEmail,
        subject:"Thông tin đặt lịch khám bệnh",
       
        html: getBodyHTMLEmail(dataSend)
    });

}
let getBodyHTMLEmail = (dataSend) =>{
    let result =''
    if(dataSend.language === 'vi'){
        result =  `
        <h3>Xin Chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời Gian:${dataSend.time}</b></div>
        <div><b>Bác sĩ:${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận
            và hoàn tất thủ tục đặt lịch khám bệnh
        </p>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        <div>Xin chân thành cảm ơn</div>

        `
    }
    if(dataSend.language ==='en'){
        result =  `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on the BookingCare </p>
        <p>Information to schedule an appointment: </p>
        <div><b>Time:${dataSend.time}</b></div>
        <div><b>Doctor:${dataSend.doctorName}</b></div>

        <p>
        If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment

        </p>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        <div>Sincerely thank!</div>

        `
    }
    return result;
}

let getBodyHTMLEmailRemedy =(dataSend) =>{
    let result = '';
    if(dataSend.language === 'vi'){

        result= `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang web BookingCare</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
        <div> Xin chân thành cảm ơn!</div>
        
        
        `
    }
    if(dataSend.language === 'en'){
        result= `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appoinment on the BookingCare Website</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
        <div> Sincerely Thank!</div>
        
        
        `
    }
}
let sendAttachment = async (dataSend) =>{
    return new Promise(async(resolve, reject) =>{
        try{
            let transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port: 587,
                secure:false,
                auth:{
                    user: process.env.EMAIL_APP,
                    pass:process.env.EMAIL_APP_PASSWORD,
        
                },
        
            });
            let infor = await transporter.sendMail({

                from:'"Nguyễn Phan Hoài Nam" <nphnamm@gmail.com>',
                to: dataSend.email,
                subject:"Kết quả đặt lịch khám bệnh",
               
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments:[
                    {
                        filename:`remedy-${dataSend.patientId}-${new Date().getDate()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding:'base64'
                    },
                ],
            });
            resolve(true);
        }catch(e){
            reject(e);
        }
    })
}
module.exports ={
    sendSimpleEmailService: sendSimpleEmail,
    sendAttachmentService: sendAttachment
}