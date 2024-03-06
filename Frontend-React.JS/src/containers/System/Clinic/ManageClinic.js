import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import {createNewClinic} from '../../../services/userService';
import {toast} from "react-toastify";

const mdParser = new MarkdownIt(/* MarkdownIT */);




class ManageClinic extends Component {

    constructor(props){
        super(props)
        this.state ={
          name:'',
          imageBase64:'',
          address:'',
          descriptionHTML:'',
          descriptionMarkdown:'',

        }
    }

    async componentDidMount () {

    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }


    }
    handleOnChangeInput = (event,id) =>{
        let stateCopy ={...this.state}
        stateCopy[id] =event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({html,text}) =>{
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleOnChangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64:base64
            })
        }
    }
    handleSaveNewClinic = async () =>{
        let res = await createNewClinic(this.state);
        console.log('check res: ', res);
        if(res && res.errCode === 0){
            toast.success('Add new clinic succeeds!')
            this.setState({
                name:'',
                imageBase64:'',
                address:'',
                descriptionHTML:'',
                descriptionMarkdown:'',
            })
        }else{
            toast.error('Something wrongs...');
            console.log('>> check res:',res);
        }
    }
  
    render() 
    
    {
        console.log('check state: ', this.state);

        return (
            <div className='manage-clinic-container'>
                    <div className='ms-title'>Quản lý chuyên khoa</div>
                    <div className='add-new-clinic row'>
                            <div className='col-6 form-group'>
                                <label>Tên chuyên khoa</label>
                                <input className='form-control' type='text' value={this.state.name}
                                        onChange={(event) =>this.handleOnChangeInput(event,'name')}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ảnh chuyên khoa</label>
                                <input className='form-control-file' type='file'
                                        onChange={(event) =>this.handleOnChangeImage(event)}


                                        
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Địa chỉ phòng khám</label>
                                <input className='form-control' type='text' value={this.state.address}
                                        onChange={(event) =>this.handleOnChangeInput(event,'address')}

                                />
                            </div>
                            <div className='col-12'>
                                <MdEditor
                                    style={{height:'300px'}}
                                    renderHTML = {text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.descriptionMarkdown}
                                
                                />

                            </div>

                            <div className='col-12'>
                                <button className='btn-save-clinic'
                                    onClick={() =>this.handleSaveNewClinic()}
                                > 
                                Save
                                </button>

                            </div>



                    </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
