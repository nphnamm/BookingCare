import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { lang } from 'moment';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';
class DetailDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,

        }
    }
    async componentDidMount (){
        if(this.props.match && this.props.match.params && this.props.match.params.id ){
                
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id)
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor : res.data
                
                
                })    
            } 
            // console.log('check infor detail doctor',res);
        }
    }
    async componentDidUpdate(preProps,prevState,snapshoot){

        // if(this.props.doctorIdFromParent !== preProps.doctorIdFromParent){
        //             let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
        //             console.log('check data from serve',res);
        //             if(res && res.errCode === 0){
        //                 this.setState({
        //                     extraInfor: res.data
        //                 })
        //             }
        //         }

    }
    render() {

        let {detailDoctor} = this.state;
        let {language} = this.props;
        let nameVi = '' ; let nameEn='';
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;

        }
        let currentURL = process.env.REACT_APP_IS_LOCALHOST === 1 ?
        "https://youtu.be/q6NvhruKV4Q?si=mvpKsmDrVKxWHzA0" : window.location.href        // console.log('check doctor data from state:',this.state.detailDoctor);

        console.log('check is localhost  ',process.env.REACT_APP_IS_LOCALHOST)

        return (

            <>
            
            <HomeHeader isShowBanner ={false}>

                
            </HomeHeader>
            <div className='doctor-detail-container'>
                <div className='intro-doctor'>
                    <div className='content-left' 
                        style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}
                    >


                    </div>

                    <div className='content-right'>
                        <div className='up'>
                            
                            {language === LANGUAGES.VI ? nameVi: nameEn }
                            
                        </div>
                        <div className='down'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                         && <span>
                                {detailDoctor.Markdown.description}

                         </span>
                        
                        
                        }
                        <div className='like-share-plugin'>
                            <LikeAndShare
                                dataHref={currentURL}
                            />


                        </div>


                        </div>

                
                    </div>

                </div>
                <div className='schedule-doctor'>
                    <div className='content-left'>

                        <DoctorSchedule
                            doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            
                        />
                    </div>
                    <div className='content-right'>
                        <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId}></DoctorExtraInfor>
                    </div>
                </div>

                <div className='detail-infor-doctor'>
                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                         &&

                        //  <div dangerouslySetInnerHTML= {{ _html: detailDoctor.Markdown.contentHTML}}>
                            
                        //  </div>

                        <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML }}></div>

                        // <div>
                        //     {detailDoctor.Markdown.contentHTML}
                        // </div>
                        
                }


                </div>

                <div className='comment-doctor'>
                    <Comment
                        dataHref={currentURL}
                        width={"100%"}
                    />
                </div>


            </div>
            </>


            );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
