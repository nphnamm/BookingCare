import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers,createNewUserService,deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from "../../utils/emitter";
class UserManage extends Component {


    constructor(props){
        super(props);
        this.state ={
            arrUsers:[],
            isOpenModalUser:false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }
    state = {

    }

    async componentDidMount () {
        await this.getAllUserFromReact();
    }
    handleAddNewUser = () =>{
        this.setState({
            isOpenModalUser:true,
        })
    }

    getAllUserFromReact = async ()=>{
        let response =  await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers:response.users
            })
            console.log('check status user 1', this.state.arrUsers);

        }

        console.log('get users from node.js : ', response);
    }
    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal =() =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async(data) =>{
        try{
           let response= await createNewUserService(data);
           console.log('reponse create user', response);
            if(response && response.errCode !=0){
                alert(response.errMessage)
            }else{
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser:false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }catch(e){
            console.log(e)
        }
        console.log('check data from child', data)
    }
    handleDeleteUser = async(user)=>{
        console.log('click User',user)

        try{
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){

                await this.getAllUserFromReact();
            }else{
                alert(res.errMessage)
            }
            console.log(res);
        }catch(e){
            console.log(e);
        }
    }
    handleEditUser = (user) =>{
        console.log('check edit user',user);
        this.setState({
            isOpenModalEditUser:true,
            userEdit: user,

        })
    }
    doEditUser = async(user)=>{

        try{

            let res = await editUserService(user);
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUserFromReact()
            }else{
                alert(res.errCode);
            }

        }catch(e){
            console.log(e)
        }

        
    }
    render() {
        console.log('check render',this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                { 
                
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModal}
                     currentUser = {this.state.userEdit}
                 //    createNewUser = {this.createNewUser}
                    editUser ={this.doEditUser}
                    
                    ></ModalEditUser>   

                }
             
                <div className='title text-center'>Manage user with nam</div>
            
                <div className='mx-1'>
                    
                    <button 
                    className='btn btn-primary px-3' 
                    onClick={()=>this.handleAddNewUser()}
                    >
                    
                    <i className='fas fa-plus'>Add new users</i></button>
                </div>            
                <div className='users-table mt-3 mx-1'>
                <table id="customers">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Frist Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>

                    </tr>
                    
                        {arrUsers && arrUsers.map((item,key)=>{
                            return(
                                <tr >
                                           <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit btn-primary' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete btn-primary' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                                

                                            </td>
                                </tr>
                            )
                        })
                     }
             
                    
                        </tbody>   
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
