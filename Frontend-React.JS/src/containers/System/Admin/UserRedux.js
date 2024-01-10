import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import {LANGUAGES} from "../../../utils";
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state ={
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen:false,

            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',

        }
    }

    async componentDidMount () {

        // try{
            

        //     let res = await getAllCodeService('gender');
        //     if(res && res.errCode === 0){
        //         this.setState({
        //             genderArr : res.data

        //         })
        //     }
        //     console.log('check res',res)
        // }catch(e){
        //     console.log(e)
        // }
        this.props.getGenderStart();
        this.props.getPositionStart()
        this.props.getRoleStart();
        // this.props.dispatch(action.getGenderStart())

    }
    componentDidUpdate(preProps, prevState,snapshoot){
        if(preProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if(preProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if(preProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux
            })
        }


    }
    handleOnchangeImage = (event) =>{
        let data = event.target.files
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL :objectUrl,
                avatar: file
            })
        }

    }
    openPreviewImage =() =>{
        if(!this.state.previewImgURL)return;
        this.setState({
            isOpen:true
        })
    }
    handleSaveUser =()=>{
        
    }
    onChangeInput = (event,id) =>{
        let copyState ={...this.state}


        copyState[id] = event.target.value;
        this.setState({

            ...copyState
        },()=>{
            console.log('hoi dan it check input onchange',this.state)
        })
        // email:'',
        // password:'',
        // lastName:'',
        // phoneNumber:'',
        // address:'',
        // gender:'',
        // position:'',
        // role:'',
        // avatar:'',

        // email,password,lastName,phoneNumber,address,gender,position,role,avatar
    }

    render() {
        // console.log('check state:',this.state)
        
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let languages = this.props.language;
        let isLoadingGenderReact = this.props.isLoadingGender

        let {email,password,firstName,lastName,phoneNumber,address,gender,position,role,avatar} =this.state;

        console.log("check props from redux: ",this.state);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                User Redux
                </div>

               
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><FormattedMessage id="manage-user.add"/></div>
                        <div className='col-12 my-3'>{isLoadingGenderReact === true? 'Loading Gender' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email"></FormattedMessage> </label>
                                <input className='form-control' type='email'
                                        value={email}
                                        onChange={(event)=>{this.onChangeInput(event,'email')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className='form-control' type='password'
                                         value={password}
                                         onChange={(event)=>{this.onChangeInput(event,'password')}}

                                
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstName"/></label>
                                <input className='form-control' type='text'
                                  value={firstName}
                                  onChange={(event)=>{this.onChangeInput(event,'firstName')}}

                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastName"/></label>
                                <input className='form-control' type='text'
                                  value={lastName}
                                  onChange={(event)=>{this.onChangeInput(event,'lastName')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phoneNumber"/></label>
                                <input className='form-control' type='text'
                                  value={phoneNumber}
                                  onChange={(event)=>{this.onChangeInput(event,'phoneNumber')}}
                                ></input>
                            </div>

                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className='form-control' type='text'
                                      value={address}
                                      onChange={(event)=>{this.onChangeInput(event,'address')}}
                                
                                
                                ></input>
                            </div>

                          <div className='col-3'>
                                  <label><FormattedMessage id="manage-user.gender"/></label>
                                <select  className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event,'gender')}}

                                >
                                    {genders && genders.length > 0 && 
                                    genders.map((item,index)=>{
                                        return (
                                            <option key={index} value={item.key} >
                                                {languages === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>

                                        )
                                    })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                  <label><FormattedMessage id="manage-user.position"/></label>
                                <select  className='form-control'
                                          
                                          onChange={(event)=>{this.onChangeInput(event,'position')}}
                                
                                >
                                    {roles && roles.length > 0 && roles.map((item,index) =>{
                                        return (
                                            
                                            <option key={index} value={item.key} >
                                            {languages === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                             </option>
                                        
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                  <label><FormattedMessage id="manage-user.role"/></label>
                                <select  className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event,'role')}}

                                >
                                {positions && positions.length > 0 && positions.map((item,index) =>{
                                        return (
                                            
                                            <option key={index}  value={item.key}>
                                            {languages === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                             </option>
                                        
                                        )
                                    })}
                                </select>
                            </div>
                            
                            <div className='col-3'>
                                  <label><FormattedMessage id="manage-user.image"/></label>
                                  <div className='preview-img-container'>

                                    <input id="previewImg"type="file" hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                    
                                    ></input>
                                    <label className="label-upload" htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick ={() => this.openPreviewImage()}
                                    >
                                        
                                    </div>

                                  </div>
                            </div>
                            <div className='col-12 mt-3'>
                                    <button className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}
                                    
                                    ><FormattedMessage id="manage-user.save"></FormattedMessage></button>

                            </div>




                        </div>
                    </div>
               

                </div>

                {this.state.isOpen ===true &&
                <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                 
                    
                   
                />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoading

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
