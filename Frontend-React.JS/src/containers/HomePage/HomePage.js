import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import HomeFooter from './HomeFooter';
import About from './Section/About';
class HomePage extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,


          };
        return (
            <div>

                <HomeHeader isShowBanner={true} / >
                <Specialty settings= {settings}/>
                <MedicalFacility settings= {settings}/>
                <OutStandingDoctor settings ={settings}/>
                <Handbook settings ={settings}/>

                <About/>
                <HomeFooter/>
            </div>
       
            );
    }

}

const mapStateToProps = state => {
    return {
       isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
