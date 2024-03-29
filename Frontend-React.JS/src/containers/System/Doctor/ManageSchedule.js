import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select  from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES ,dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state ={
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: [],

        }
    }
    componentDidMount(){
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTimeRedux();
    }
    componentDidUpdate(prevProps,prevState,snapshoot){
        if(prevProps.allDoctors !== this.props.allDoctors){
           let dataSelect = this.builDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if(data && data.length > 0){
                data = data.map(item => ({...item, isSelected:false}))
            }
             this.setState({
                 rangeTime: this.props.allScheduleTime
             })
         }
    }
    builDataInputSelect = (inputData) =>{
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item,index) =>{
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result 
    }
    handleChangeSelect = async (selectedOption) =>{
        this.setState({
            selectedDoctor: selectedOption
        });
     
    }
    handleOnChangeDatePicker= (date)=>{
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) =>{
        let{rangeTime} =this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item =>{
                if(item.id === time.id ) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async() =>{
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        if(!currentDate){
            toast.error("Invalid date!");
            return
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid selected doctor!");
            return
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        let formatedDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected ===true);
            if(selectedTime && selectedTime.length > 0 ){
                selectedTime.map((schedule,index) =>{
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType= schedule.keyMap;
                    result.push(object);
                })
            }else{
                toast.error("Invalid selected time");
                return;
            }
            let res = await saveBulkScheduleDoctor({
                arrSchedule: result,
                doctorId: selectedDoctor.value,
                formatedDate: formatedDate
            })
            console.log('check res : saveBulk Schedule Doctor', res)
            
            if(res && res.errCode === 0){
                toast.success("Save infor succeed");
            }else{
                toast.error("error save BulkScheduleDoctor");
                console.log('error saveBulkScheduleDoctor >>> res:', res);
            }
        }
        console.log('channel check result:', result);
    }
    render() {
        console.log('check props', this.state);
        let {rangeTime} = this.state;
        let {language} = this.props;
        let yesterday= new Date(new Date().setDate(new Date().getDate() -1));
        let yesterday_1= new Date(new Date().setDate());
        let yesterday_2= new Date(new Date() -1);
        let yesterday_3 = new Date();


        console.log('check yesterday: ',yesterday);
        console.log('check yesterday 1: ',yesterday_1)
        console.log('check yesterday 2: ',yesterday_2)
        console.log('check yesterday 3: ',yesterday_3)


        return (
           
            <Fragment>
                    <div className='manage-schedule-container'>
                        <div className='m-s-title'>
                            <FormattedMessage id="manage-schedule.title"></FormattedMessage>

                        </div>

                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                        <label><FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage></label>
                                        <Select
                                            value ={this.state.selectedDoctor}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.listDoctors}
                                        >
                                        </Select>
                                </div>

                                <div className='col-6 form-group'>
                                        <label><FormattedMessage id="manage-schedule.choose-date"></FormattedMessage></label>
                                        <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.currentDate}
                                        // selected={this.state.currentDate}
                                        minDate={yesterday_2}
                                        />

                                    
                                </div>
                                <div className='col-12 pick-hour-container'>
                                     {rangeTime && rangeTime.length > 0 && 
                                        rangeTime.map((item,index)=>{

                                            return(
                                                <button className={item.isSelected ===true ? "btn btn-schedule active" : " btn btn-schedule"} 
                                                        key={index}
                                                        onClick={()=>this.handleClickBtnTime(item)}
                                                
                                                >
                                                
                                                   
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                                
                                                </button>
                                            )
                                        })
                                     }
                                </div>
                                <div className='col-12'>

                                    <button className='btn btn-primary btn-save-schedule'
                                            onClick={() => this.handleSaveSchedule()}
                                    ><FormattedMessage id="manage-schedule.save"></FormattedMessage></button>

                                </div>
                            </div>

                        </div>

                    </div>
                    </Fragment>
     
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime,



    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
