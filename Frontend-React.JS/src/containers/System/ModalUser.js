import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from "../../utils/emitter";

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
        this.listenToEmiiter();
    }
    componentDidMount() {
        
    }
    listenToEmiiter(){
        
        emitter.on('EVENT_CLEAR_MODAL_DATA',
        () =>{
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:'',
            })
        }
        
        )
    }
    toggle =()=>{
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event,id) =>{
        // //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // },() =>{
        //     console.log('check bad state:' ,this.state)
        // })

        // console.log("event 1:",event.target.value,id);

        //good code

        let copyState ={...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState}
            ,
            ()=>{
                console.log('check good state: ',this.state);
            }
            
            );
        console.log('copystate',copyState)
        console.log('event 1',event.target.value,id);


    }
    checkValidInput = () =>{
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for(let i = 0;i<arrInput.length;i++){
          console.log('check inside loop ',this.state[arrInput[i]],arrInput[i])
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
            }
        }
        return true
        
    }
    handleAddNewUser =()=>{
        //validate
        let isValid = this.checkValidInput();
        if(isValid===true){

            console.log('check props child :',this.props)
            this.props.createNewUser(this.state);
            console.log('data modal: ',this.state)
        }
    }
 

    render() {
        return (

            <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'model-user-container'}
            size ="lg"
            centered
            >
            <ModalHeader toggle={()=>{this.toggle()}}>Modal title</ModalHeader>
            <ModalBody>
             <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' 
                            onChange={(event)=>{this.handleOnChangeInput(event,"email")}}
                            value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' 
                            onChange={(event)=>{this.handleOnChangeInput(event,"password")}}
                            value={this.state.password}

                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'
                             onChange={(event)=>{this.handleOnChangeInput(event,"firstName")}}
                             value={this.state.firstName}

                             ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text' 
                            onChange={(event)=>{this.handleOnChangeInput(event,"lastName")}}
                            value={this.state.lastName}

                            ></input>
                        </div>
                        <div className=' max-width-input input-container'>
                            <label>Address</label>
                            <input type='text'
                             onChange={(event)=>{this.handleOnChangeInput(event,"address")}}
                             value={this.state.address}

                             ></input>
                        </div>
                    

             </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" 
              className='px-3' 
              onClick={()=>{this.handleAddNewUser()}} 
              >
              Add new
              </Button>{' '}
              <Button color="secondary" className='px-3' toggle={()=>{this.toggle()}}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
