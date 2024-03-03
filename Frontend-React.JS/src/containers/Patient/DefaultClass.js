import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import {LANGUAGES , CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from '../../../store/actions'
import './DefaultClass.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableManageUser from './TableManageUser';
class DefaultClass extends Component {

    constructor(props){
        super(props)
        this.state ={
          
        }
    }

    async componentDidMount () {

    }
    componentDidUpdate(preProps, prevState,snapshoot){
   


    }
  
    render() {

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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
