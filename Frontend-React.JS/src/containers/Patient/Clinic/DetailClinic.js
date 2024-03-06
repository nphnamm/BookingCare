import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById,getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailClinic extends Component {

    constructor(props){
        super(props)
        this.state ={
            arrDoctorId:[],
            dataDetailClinic:{},
           
        }
    }

    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id:id
               
            })
            if(res && res.errCode === 0){
                let data = res.data;
                let arrDoctorId =[];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length >0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                // if(dataProvince && dataProvince.length > 0){
                //     dataProvince.unshift({
                //         createdAt: null,
                //         keyMap:"ALL",
                //         type:"PROVINCE",
                //         valueEn:"ALL",
                //         valueVi:"Toàn quốc",
                //     })
                // } 
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }


    }
    // handleOnChangeSelect =async (event) =>{
    //     console.log('check onchange', event.target.value);

    //     if(this.props.match && this.props.match.params && this.props.match.params.id){
    //         let id = this.props.match.params.id;
    //         let location = event.target.value;
    //         let res = await getAllDetailClinicById({
    //             id:id,
    //             location: location
    //         });

    //         if(res && res.errCode === 0) {
    //             let data = res.data; 
    //             let arrDoctorId = [];
    //             if(data && !_.isEmpty(res.data)){
    //                 let arr = data.doctorclinic;
    //                 if(arr && arr.length > 0){
    //                     arr.map(item =>{
    //                             arrDoctorId.push(item.doctorId);
    //                     })
    //                 }
    //             }
    //             this.setState({
    //                 dataDetailClinic: res.data,
    //                 arrDoctorId: arrDoctorId,

    //             })
    //         }
    //     }
    // }
  
    render() {
         
        let {arrDoctorId,dataDetailClinic,listProvince} = this.state;
        console.log('check state', this.state);
        let {language} =this.props;
        return(
            <div className='detail-clinic-container'>
                <HomeHeader/>
                <div className='detail-clinic-body'> 
                        <div className='description-clinic'>
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                    && 
                                    <>
                                   
                                    <div>{dataDetailClinic.name}</div>
                                    <div dangerouslySetInnerHTML={{__html:dataDetailClinic.descriptionHTML}}>

                                    </div>
                                    </>
                                }
                        </div>
                    
                        {arrDoctorId && arrDoctorId.map((item,index) =>{
                            return (
                                <div className='each-doctor ' key={index}>
                                    <div className='doctor-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDecriptionDoctor ={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className='doctor-content-right'>
                                        <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                  doctorIdFromParent={item}

                                                />
                                        </div>
                                        <div className='doctor-extra'>
                                                <DoctorExtraInfor
                                                    doctorIdFromParent={item}

                                                />

                                        </div>

                                    </div>
                                    
                                </div>
                            )

                        })}


                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
