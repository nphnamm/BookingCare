import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';


class DetailSpecialty extends Component {

    constructor(props){
        super(props)
        this.state ={
          
        }
    }

    async componentDidMount () {

    }
    async componentDidUpdate(preProps, prevState,snapshoot){
        if(this.props.language !== preProps.language){

        }


    }
  
    render() {
        return(
            <>
            <HomeHeader/>
            <div>Hello world from detai specialty </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
