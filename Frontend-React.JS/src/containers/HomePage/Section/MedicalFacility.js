import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share '>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cở sở y tế</span>
                    <button className='btn-section'> Xem thêm</button>
                </div>


            <div className='section-body'>

            <Slider {...this.props.settings}>
            <div className='section-customize'>
                <div className='bg-image section-medical-facility '></div>
                <div>Hệ thông ý tế Thu Cúc 1</div>
            </div>
            <div className='section-customize'>
            <div className='bg-image section-medical-facility'></div>
                <div>Cơ xuong khớp 2</div>
            </div>
            <div className='section-customize'>
                <div className='bg-image section-medical-facility'></div>
                <div>Cơ xuong khớp 3</div>
            </div>
            <div className='section-customize'>
                <div className='bg-image section-medical-facility'></div>
                <div>Cơ xuong khớp 4</div>
            </div>
            <div className='section-customize'>
                <div className='bg-image section-medical-facility'></div>
                <div>Cơ xuong khớp 5</div>
            </div>
            <div className='section-customize'>
                <div className='bg-image section-medical-facility'> </div>
                <div>Cơ xuong khớp 6</div>
            </div>
            </Slider>

            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
