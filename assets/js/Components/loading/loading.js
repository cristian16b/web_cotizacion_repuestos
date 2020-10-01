import React from 'react';
import ReactLoading from 'react-loading';
 
const divLoading = {
    'height': "100%",
    'width': "100%" 
}

const divBucle = {
    'margin': '1% auto'
}

const divMensaje = {
    'margin': '6% auto'
}

const centrar = {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
}

const h5 = {
    'textTransform': 'uppercase',
    'color': 'rgb(244,179,27)',
    'backgroundColor': 'rgba(21, 61, 87)',
    'paddingLeft': '10%',
    'borderRadius': '25px',
    'opacity':'0.9',
}

const Loading = () => (
    <div style={divLoading}>
        <div className="row"  align="center" style={divBucle}>
            <div className="col-12 col-md-12 col-lg-12">
                <ReactLoading type={'spin'} color="#153D57" height={'20%'} width={'20%'}/>
            </div>
        </div>
        <br></br>
        <div style={divMensaje}>
            <div className="row" style={centrar}>
                <div className="col-8 col-md-8 col-lg-4">
                    <h5 align="center" style={h5}>Cargando</h5>
                </div>
            </div>
            <div className="row" align="center" style={centrar}>
                <div className="col-8 col-md-8 col-lg-4">
                    <h5 style={h5}>...</h5>
                </div>
            </div> 
            <div className="row" align="center" style={centrar}>
                <div className="col-8 col-md-8 col-lg-4">
                    <h5 style={h5}>Espere un momento</h5>
                </div>
            </div>
        </div>
        <br></br>  
    </div>
);
 
export default Loading;


