import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
class ManagePatient extends Component {

    constructor(props){
        super(props)
        this.state ={
          currentDate: moment(new Date()).startOf('day').valueOf(),
          dataPatient: []
        }
    }

    async componentDidMount () {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime();
        console.log("check: ", this.props.user);
        this.getDataPatient(user,formatedDate)
    }
    getDataPatient = async (user, formatedDate)=>{
        // let res = await getAllPatientForDoctor({
        //     doctorId: user.Id,
        //     date: formatedDate
        // })
        // if(res && res.errCode ===0){
        //     this.setState({
        //         dataPatient: res.data
        //     })
        // }
    }

    handOnChangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        },() =>{
            let {user} = this.props;
            let {currentDate} = this.state;
            let formatedDate  = new Date(currentDate).getTime();
            this.getDataPatient(user,formatedDate);
        })
    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }


    }
    handleBtnConfirm = () =>{

    }
    handleBtnRemedy =()=>{

    }
  
    render() {
        let {dataPatient} = this.state;
        return(
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                        onChange={this.handOnChangeDatePicker}
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
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className='mp-btn-confirm'
                                                        onClick={() =>this.handleBtnConfirm()}
                                                    >Xác nhận</button>
                                                    <button className='mp-btn-remedy'
                                                        onClick={() =>this.handleBtnRemedy()}
                                                    >Gửi Hóa đơn</button>
                                                </td>

                                            </tr>
                                        )
                                    })
                            
                                
                                :
                                <tr>No data</tr>
                                }
                                </tbody>
                            </table>
                       
                    </div>

                </div>

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
