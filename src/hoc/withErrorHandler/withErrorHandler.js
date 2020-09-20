import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Aux';

const withErrorHandler = (WrappedComponenet, axios) =>{
    return class extends Component{
        constructor(){
            super();
            axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res=>res, error=>{
                this.setState({error: error});
            });
        }
        state = {
            error: null
        }
        errorConfirmedHandler=()=>{
            this.setState({error: null})
        }
        render (){
            return(
                <Aux>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponenet {...this.props}/>
                </Aux>   
            
            );
    }
}
}
export default withErrorHandler;