import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES , CRUD_ACTIONS, CommonUtils} from "../../../utils";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props){
        super(props)
        this.state ={
            dataProfile: {}
        }
           
        

    }

    async componentDidMount () {
        console.log('Props:', this.props);

        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) =>{
        let result = {};
        if(id){
            let res = await getProfileDoctorById(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        
        }
        return result;
    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }
        if(this.props.doctorId !== preProps.doctorId){
            
        }


    }
    renderTimeBooking = (dataTime) =>{
        let { language } = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? 
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
        
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date /1000).locale('en').format('dddd - DD/MM/YYYY')

            return(
                <>
                    <div>{time}-{date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking"/></div>
                </>
            )
        }
    }
  
    render() {

        let {dataProfile} = this.state;
        let {language ,isShowDecriptionDoctor,dataTime, isShowLinkDetail, isShowPrice,doctorId}=this.props;
        // console.log('check state of ProfileDoctor: ', this.state);
        // console.log('check dateTime: ', dataTime);
        // console.log('check isShowDescription: ', isShowDecriptionDoctor);

        let nameVi ='', nameEn='';
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName}${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName}${dataProfile.lastName}`;

        }
        return (
            <div className='profile-doctor-container'>
                  <div className='intro-doctor'>
                    <div className='content-left' 
                        style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}}
                    >


                    </div>

                    <div className='content-right'>
                        <div className='up'>
                            
                            {language === LANGUAGES.VI ? nameVi: nameEn }
                            
                        </div>
                        <div className='down'>
                     
                        {isShowDecriptionDoctor === true ?
                            <>
                                {dataProfile && dataProfile.Markdown
                                    && dataProfile.Markdown.description
                                    && 
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                }
                            </>
                            : 
                            <>

                            {this.renderTimeBooking(dataTime)}
                            </>
                            
                        }
                        </div>
                    </div>
                </div>

                {isShowLinkDetail === true && 
                    <div className="view-detail-doctor">
                            
                            <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
                    </div>
                
                }
                {isShowPrice ===true &&
                        <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price"/>
                        
                                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VNĐ'}
                                        />
                                            
                                        
                                    }
                                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                            
                                        
                                    }



                                 

                </div>
                }
        
            

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
