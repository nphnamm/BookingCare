import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from "../../utils/emitter";
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
    }
    componentDidMount() {

        let user = this.props.currentUser;

        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
        console.log('didmout edit modal', this.props.currentUser)
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
        for(let i = 2;i<arrInput.length;i++){
          console.log('check inside loop ',this.state[arrInput[i]],arrInput[i])
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
            }
        }
        return true
        
    }
    handleSaveUser =()=>{
        //validate
        let isValid = this.checkValidInput();
        if(isValid===true){

                this.props.editUser(this.state)
        }
    }
 

    render() {
        console.log('check props from parent: ', this.props);
        return (
            
            <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'model-user-container'}
            size ="lg"
            centered
            >
            <ModalHeader toggle={()=>{this.toggle()}}>Edit</ModalHeader>
            <ModalBody>
             <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' 
                            onChange={(event)=>{this.handleOnChangeInput(event,"email")}}
                            value={this.state.email}
                            disabled

                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' 
                            onChange={(event)=>{this.handleOnChangeInput(event,"password")}}
                            value={this.state.password}
                            disabled
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
              onClick={()=>{this.handleSaveUser()}} 
              >
              Save Changes
              </Button>{' '}
              <Button color="secondary" className='px-3' toggle={()=>{this.toggle()}}>
                close

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
