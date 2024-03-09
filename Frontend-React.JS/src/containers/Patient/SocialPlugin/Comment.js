import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES , CRUD_ACTIONS, CommonUtils} from "../../../utils";

class Comment extends Component {

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
        let {width, dataHref, numPost} = this.props;
        return (
            <>
                <div className='fb-comments'
                  data-href={dataHref}
                  data-width={width ? width : ""}
                  data-numposts ={numPost ? numPost : 5}
                
                >
                  

                </div>
            
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
