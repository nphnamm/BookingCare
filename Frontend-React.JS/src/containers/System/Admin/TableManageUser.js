import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

class TableManageUser extends Component {


    constructor(props){
        super(props);
        this.state ={
            userRedux: []
        }
    }
    componentDidMount(){
            this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps,prevState,snapshoot){
        if(prevProps.listUsers !== this.props.listUsers){
                this.setState({
                    userRedux: this.props.listUsers
                })
        }
    }

    render() {
        // console.log('check render',this.state);
        // let arrUsers = this.state.arrUsers;
        console.log('check all users',this.props.listUsers)
        console.log('check all users',this.userRedux);
        let arrUsers = this.state.userRedux;
        
        return (
                <table id='TableManageUser'>
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Frist Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>

                    </tr>
                    
                        {arrUsers && arrUsers.length > 0 && 
                        
                            arrUsers.map((item,index) => {
                                return (
                                <tr key={index}>
                                           <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit btn-primary' ><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete btn-primary'><i className='fas fa-trash'></i></button>
                                            
                                            </td>
                                </tr>

                                )
                            })
                        
                        }
                               
                     
            
                    
                        </tbody>   
                    </table>
     
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(actions.fetchAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
