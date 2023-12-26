import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";



class About extends Component {
    
    render() {
      
        return (
                <div className='section-share  section-about'>
                    <div className='section-about-header'>
                        Truyền thông nói gì về Booking Care?

                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/nu_pCVPKzTk" title="Full Stack Web Development for Beginners (Full Course on HTML, CSS, JavaScript, Node.js, MongoDB)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className='content-right'>
                                    <p>
                                    Khám bệnh không phải xếp hàng ở Hà Nội
Với ứng dụng trên điện thoại, người bệnh đặt lịch khám, chọn bác sĩ ở 60 bệnh viện, phòng khám tại Hà Nội đồng thời nhận được thông báo mức chi phí.
                                    </p>
                        </div>


                    </div>
                </div>
            );
    }

}

const mapStateToProps = state => {
    return {
       isLoggedIn: state.user.isLoggedIn,
       language: state.app.Component
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
