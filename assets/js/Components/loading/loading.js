import React from 'react';
import ReactLoading from 'react-loading';
 
const divLoading = {
    'height': "100%",
    'width': "100%",   
}

const divBucle = {
    'margin': '1% auto'
}

const divMensaje = {
    'margin': '6% auto'
}


const Loading = () => (
    <div className="row justify-content-center" style={divLoading}>
            <div className="row justify-content-center"  align="center" style={divBucle}>
                <div className="col-8 col-md-8 col-lg-8">
                    <ReactLoading type={'spin'} color="#153D57" height={'30%'} width={'30%'}/>
                </div>
            </div>
            <div className="row justify-content-center" align="center" style={divMensaje}>
                <div className="col-8 col-md-8 col-lg-8">
                    <h5>Cargando</h5>
                </div>
                <div className="col-8 col-md-8 col-lg-8">
                    <h5>...</h5>
                </div>
                <div className="col-8 col-md-8 col-lg-8">
                    <h5>Espere un momento</h5>
                </div>
            </div>
    </div>
);
 
export default Loading;


