import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import {getScheduleDoctorByDate} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';



class DoctorSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime:[],
            isOpenModalBooking: false,
            dataScheduleTimeModal:{}

        }
    }
    async componentDidMount (){
        // console.log('Props:', this.props);

        let {language} = this.props
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays
        })
        console.log('check date 0', allDays[0].value)
        console.log('checkidfrom parent', this.props.doctorIdFromParent)
        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent,allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

    }

    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) =>{
        let allDays = []
        for(let i = 0 ; i<7 ;i++){
            let object ={};
            if(language === LANGUAGES.VI){
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today =`Hôm nay - ${ddMM}`;
                    object.label = today;
                }else{
                    let labelVi = moment(new Date()).add(i,'days').format('dddd - DD/MM');
                    console.log('label Vi:',labelVi);
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
          

            }else{
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label= today
                }else{
                    let labelEn = moment(new Date()).add(i,'days').locale('en').format('dddd - DD/MM');

                    object.label = this.capitalizeFirstLetter(labelEn);

                }
            } 
            object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    // setArrDays = (language) =>{
    //     let allDays = []
    //     for(let i= 0;i<7 ;i++) {
    //         let object ={};
    //         if(language === LANGUAGES.VI){
    //             let labelVi = moment(new Date()).add(i,'days').format('dddd - DD/MM');
    //             object.label = this.capitalizeFirstLetter(labelVi)
    //         }else{
    //             object.label=  moment(new Date()).add(i,'days').locale('en').format("ddd - DD/MM")
    //         }
    //         object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
    //         allDays.push(object);

    //     }
    //     this.setState({
    //         allDays:allDays,
    //     })

    // }
    async componentDidUpdate (prevProps,prevState,snapshoot){
    
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays:allDays
            })
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays =this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent,allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
            
        }


    }
    handleOnChangeSelect = async (event)=>{
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            console.log('check onchange', date);
            let res = await getScheduleDoctorByDate(doctorId,date);
     

            if(res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                })
            }
            // console.log('check res2  schedule from react ', this.state.allAvailableTime);

        }
    }
    handleClickScheduleTime = (time) =>{
        this.setState({
            isOpenModalBooking:true,
            dataScheduleTimeModal: time
        })
        console.log('check time: ',time);
    }
    closeBookingClose = () =>{
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        
        let {allDays,allAvailableTime,isOpenModalBooking,dataScheduleTimeModal} = this.state;
        let {language} = this.props;
        console.log('check id of parents:', this.props.doctorIdFromParent);

        // console.log('check all available time', this.state)
        return (
            <>
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && 
                                allDays.map((item,index) =>{
                                    return(
                                        <option
                                        value={item.value}
                                        key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                    </select>
                    </div>
            
                <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>

                                <span><FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage></span>
                            </i>
                        </div>

                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                    {allAvailableTime.map((item,index)=> {
                                    let timeDisplay = language === LANGUAGES.VI ?
                                        item.timeTypeData.valueVi: item.timeTypeData.valueEn;
                                    return(
                                        <button key={index}
                                                className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                onClick={() =>this.handleClickScheduleTime(item)}
                                                
                                                
                                                >
                                                
                                            
                                            {timeDisplay}
                                        
                                        </button>
                                    )
                                      })
                                }

                            </div>
                            <div className='book-free'>
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.choose" />
                                    <i className='far fa-hand-point-up'></i>
                                    <FormattedMessage id="patient.detail-doctor.book-free"/>
                                </span>
                            </div>
                                
                            </>
                            :
                            <div className='no-schedule'>
                                <FormattedMessage id="patient.detail-doctor.no-schedule"/>
                            </div>
                            
                            }
                        </div>
                </div>
         </div>   
         <BookingModal
            isOpenModal = {isOpenModalBooking}
            closeBookingClose = {this.closeBookingClose}
            dataTime = {dataScheduleTimeModal}
         
         />
         </>
            );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
