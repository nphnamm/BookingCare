import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor , postSendRemedy} from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {

    constructor(props){
        super(props)
        this.state ={
          currentDate: moment(new Date()).startOf('day').valueOf(),
          dataPatient: [],
          isOpenRemedyModal: false,
          dataModal:{},
          isShowLoading:false
        }
    }

    async componentDidMount () {

        // console.log("check: ", this.props.userInfo);
        // this.getDataPatient(userInfo,formatedDate)
        this.getDataPatient()
    }
    getDataPatient = async ()=>{
        let {userInfo} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime();




        let res = await getAllPatientForDoctor({
            doctorId: userInfo.id,
            date: formatedDate
        })
        if(res && res.errCode ===0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) =>{
        let {currentDate} = this.state;

        let formatedDate1  = new Date(currentDate).getTime();
        console.log('check date', formatedDate1);
        console.log('check user', this.props.userInfo);


        this.setState({
            currentDate: date[0]
        },async () =>{
            await this.getDataPatient();

        })
    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }


    }
    handleBtnConfirm = (item) =>{
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () =>{
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChild) =>{
        let {dataModal} =this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientname: dataModal.patientName

        });
        if(res && res.errCode === 0){
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy succeeds:');
            this.closeRemedyModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrongs...');
        }
    }

  
    render() {
        let {dataPatient,dataModal, isOpenRemedyModal} = this.state;
        let {language} = this.props;
        console.log('check state', this.state);
        
        return(
            <>
            <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text='Loading...'
            
            >
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                        onChange={this.handleOnChangeDatePicker}
                        className="form-control"
                        value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                            <table style={{width: '100%'}}>
                                <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Thời gian</th>
                                    <th>Họ và Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới Tính</th>
                                    <th>Actions</th>

                                </tr>

                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item,index)=>{
                                        let time = language === LANGUAGES.VI?
                                            item.timeTypeDatePatient.valueVi : item.timeTypeDatePatient.valueEn;

                                        let gender = language === LANGUAGES.VI?
                                            item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    <button className='mp-btn-confirm'
                                                        onClick={() =>this.handleBtnConfirm(item)}
                                                    >Xác nhận</button>
                                                    
                                                </td>

                                            </tr>
                                        )
                                    })
                            
                                
                                :
                                <tr>
                                    <td colSpan="6" style={{textAlign:"center"}}>  No data
                                    </td>    
                                  
                                </tr>
                                }
                                </tbody>
                            </table>
                       
                    </div>

                </div>

            </div>
                                <RemedyModal
                                    isOpenModal={isOpenRemedyModal}
                                    dataModal={dataModal}
                                    closeRemedyModal={this.closeRemedyModal}
                                    sendRemedy={this.sendRemedy}
                                />

            </LoadingOverlay>
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
