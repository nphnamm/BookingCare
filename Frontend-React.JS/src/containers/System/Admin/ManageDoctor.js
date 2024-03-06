import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

const options = [
    {value:'chocolate',label:'Chocolate'},
    {value:'strawberry',label:'Strawberry'},
    {value:'vanilla',label:'vanilla'}
]
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {


    constructor(props){
        super(props);
        this.state ={
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor :'',
            description: '',
            listDoctors:[],
            hasOldData:false,
            //save to doctor_infor table

            listPrice: [],
            listPayment:[],
            listProvince: [],
            listClinic:[],
            listSpecialty:[],

            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            selectedClinic:'',
            selectedSpecialty:'',
            
            nameClinic:'',
            addressClinic:'',
            note:''

        }
    }
    componentDidMount(){
        this.props.fetchAllDoctorsRedux();
        this.props.getAllRequiredDoctorInfor();

    }
    builDataInputSelect = (inputData,type) =>{
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0){
            if(type==='USERS'){
                inputData.map((item,index) =>{
                    let object = {};
                    let labelVi =   `${item.lastName} ${item.firstName}`;
                    let labelEn =  `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type ==="PRICE"){
                inputData.map((item,index) =>{
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn =  `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type ==="PAYMENT" || type ==='PROVINCE'){
                inputData.map((item,index) =>{
                    let object = {};
                    let labelVi =  `${item.valueVi}`;
                    let labelEn =  `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type === 'SPECIALTY'){
                inputData.map((item,index) =>{
                    let object ={};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }

            if(type === 'CLINIC'){
                inputData.map((item,index) =>{
                    let object ={};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
       
        }
        return result 
    }


    componentDidUpdate(prevProps,prevState,snapshoot){
        if(prevProps.allDoctors !== this.props.allDoctors){
           let dataSelect = this.builDataInputSelect(this.props.allDoctors,'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince,resSpecialty,resClinic} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.builDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment = this.builDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.builDataInputSelect(resProvince,'PROVINCE');
            let dataSelectSpecialty = this.builDataInputSelect(resSpecialty,'SPECIALTY')
            let dataSelectClinic = this.builDataInputSelect(resClinic,'CLINIC')


            this.setState({
                listPrice: dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic : dataSelectClinic

            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.builDataInputSelect(this.props.allDoctors,'USERS');
            let {resPayment,resPrice,resProvince} = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.builDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.builDataInputSelect(resProvince,'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince: dataSelectProvince,
            })

        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({

            contentMarkdown:text,
            contentHTML:html,
        })
    }

    handleSaveContentMarkdown = () =>{
        let {hasOldData} = this.state;

        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value

        });
        console.log("test handle save",this.state);
    }
     handleChangeSelect = async (selectedOption) =>{
        this.setState({
            selectedOption
        });
        let {listPayment,listPrice,listProvince,listSpecialty,listClinic} = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);

        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic ='',note='',
            paymentId ='', priceId='',provinceId ='',specialtyId='',clinicId='',
            selectedPayment ='',selectedPrice ='',selectedProvince ='',selectedSpecialty='',selectedClinic='';

            if(res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId=res.data.Doctor_Infor.clinicId;

                selectedPayment = listPayment.find(item =>{
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item =>{
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item =>{
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item =>{
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item =>{
                    return item && item.value === clinicId
                })

                
                

            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData:true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }else{
            this.setState({
                contentHTML:'',
                contentMarkdown:'',
                description: '',
                hasOldData:false,
                addressClinic: '',
                nameClinic:'',
                note:'',
                selectedPayment:'',
                selectedPrice:'',
                selectedProvince:'',
                selectedSpecialty:'',
                selectedClinic:''

            })
        }
        console.log("option selected",res); 
    }
    handleChangeSelectDoctorInfor = async (selectedOption,name) =>{
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event,id) =>{
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        
        })
    }

    handleOnchangeDesciption = (event) =>{
        this.setState({
            description: event.target.value
        })
    }
    render() {
        // console.log('check state manage doctor', this.state);
        // // console.log('check render',this.state);
        // // let arrUsers = this.state.arrUsers;
        // console.log('check all users',this.props.listUsers)
        // console.log('check all users',this.userRedux);
        let {hasOldData,listSpecialty} = this.state;
        let arrUsers = this.state.userRedux;
        console.log('check state', this.state);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <label><FormattedMessage id='admin.manage-doctor.title'></FormattedMessage></label>

                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                      
                    <label><FormattedMessage id='admin.manage-doctor.select-doctor'></FormattedMessage></label>
                        <Select
                            value ={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"></FormattedMessage>}
                        >
                        </Select>

                    </div>
                    <div className='content-right'>

                    <label><FormattedMessage id='admin.manage-doctor.intro'></FormattedMessage></label>
                        <textarea 
                            className='form-control' 
                            
                            onChange={(event) =>this.handleOnchangeText(event,'description')}
                            value={this.state.description}
                        >

                         
                        </textarea>
          
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"></FormattedMessage></label>
                        <Select
                         value={this.state.selectedPrice}
                         options={this.state.listPrice}
                         placeholder={<FormattedMessage id="admin.manage-doctor.price"></FormattedMessage>}

                         onChange={this.handleChangeSelectDoctorInfor}
                        name="selectedPrice"
                        
                        />

                        
                    </div>
                    <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.manage-doctor.payment"></FormattedMessage></label>
                        <Select
                        
                        options={this.state.listPayment}
                        value={this.state.selectedPayment}
                        placeholder={<FormattedMessage id="admin.manage-doctor.payment"></FormattedMessage>}

                        onChange={this.handleChangeSelectDoctorInfor}
                        name="selectedPayment"
                        />

                    </div>

                    <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.manage-doctor.province"></FormattedMessage></label>
                        <Select
                        
                        value={this.state.selectedProvince}
                        options={this.state.listProvince}
                        placeholder={<FormattedMessage id="admin.manage-doctor.province"></FormattedMessage>}

                        onChange={this.handleChangeSelectDoctorInfor}
                       name="selectedProvince"
                        />

                    </div>

                    <div className='col-4 form-group'>
                        <label>
                            
                            <FormattedMessage id="admin.manage-doctor.nameClinic"></FormattedMessage>
                        </label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event,'nameClinic')}
                            value={this.state.nameClinic}
                        
                        />

                    </div>
                    <div className='col-4 form-group'>
                    <label>
                            
                            <FormattedMessage id="admin.manage-doctor.addressClinic"></FormattedMessage>
                        </label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event,'addressClinic')}
                            value={this.state.addressClinic}
                        
                        />

                    </div>
                    <div className='col-4 form-group'>
                    <label>
                            
                            <FormattedMessage id="admin.manage-doctor.note"></FormattedMessage>
                        </label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event,'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.specialty"/></label>
                            <Select
                        
                            value={this.state.selectedSpecialty}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>}

                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedSpecialty"
                            />
                    
                    </div>

                    <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.select-clinic"/></label>
                            <Select
                        
                            value={this.state.selectedClinic}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic"></FormattedMessage>}

                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedClinic"
                            />
                    
                    </div>


                </div>

                <div className='manage-doctor-editor'>

                <MdEditor style={{ height: '300px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    value={this.state.contentMarkdown}
                    onChange={this.handleEditorChange} />



                </div>
                <button 
                onClick={() => this.handleSaveContentMarkdown()}
                className={hasOldData === true ? "btn save-content-doctor": "btn create-content-doctor"}>
                    
                    {hasOldData === true ? 
                    <span ><FormattedMessage id='admin.manage-doctor.save'/></span> 
                    : 
                    <span ><FormattedMessage id='admin.manage-doctor.add'/></span>}
                    
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=> dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctorRedux : (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
 

