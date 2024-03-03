import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import './VerifyEmail.scss'
import HomeHeader from '../HomePage/HomeHeader';
import { postVerityBookAppointment } from '../../services/userService';
class VerifyEmail extends Component {

    constructor(props){
        super(props)
        this.state ={
            statusVerify:false,
            errCode: 0
        }
    }

    async componentDidMount () {
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerityBookAppointment({
                token: token,
                doctorId:doctorId
            })
            if(res && res.errCode === 0 ){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }


    }
  
    render() {
        let {statusVerify,errCode} = this.state;
        return (

            <>
            <HomeHeader></HomeHeader>
            <div className="verify-email-container">
                {statusVerify === false ?
                    <div className='infor-booking'>
                        Loading data...
                    </div>
                    :
                    <div>
                        {+errCode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công</div>
                                :
                                <div className='infor-booking'>Lịch hen không tồn tại hoặc đã xác nhận</div>

                        }    
                        
                    </div>
            
                }

            </div>
            
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
