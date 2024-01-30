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
import { LANGUAGES } from '../../../utils';


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
            listDoctors:[]
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctorsRedux();
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


    componentDidUpdate(prevProps,prevState,snapshoot){
        if(prevProps.allDoctors !== this.props.allDoctors){
           let dataSelect = this.builDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
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
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
        console.log("test handle save",this.state);
    }
    handleChange = selectedDoctor =>{
        this.setState({
            selectedDoctor
        });
        console.log("option selected",selectedDoctor); 
    }

    handleOnchangeDesciption = (event) =>{
        this.setState({
            description: event.target.value
        })
    }
    render() {
        console.log('check state manage doctor', this.state);
        // console.log('check render',this.state);
        // let arrUsers = this.state.arrUsers;
        console.log('check all users',this.props.listUsers)
        console.log('check all users',this.userRedux);
        let arrUsers = this.state.userRedux;
        
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Create information

                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                      
                        <label>Select doctor</label>
                        <Select
                            value ={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        >
                        </Select>

                    </div>
                    <div className='content-right'>

                    <label>Introduction information</label>
                        <textarea 
                            className='form-control' 
                            rows="4"
                            onChange={(event) =>this.handleOnchangeDesciption(event)}
                            value={this.state.description}
                        >

                             assfhakshfaksjfhj
                        </textarea>
          
                    </div>
                </div>
                <div className='manage-doctor-editor'>

                <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} />




                </div>
                <button 
                onClick={() => this.handleSaveContentMarkdown()}
                className='save-content-doctor'>
                    
                    Save
                    
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        allDoctors: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=> dispatch(actions.fetchAllDoctors()),
        saveDetailDoctorRedux : (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
 

