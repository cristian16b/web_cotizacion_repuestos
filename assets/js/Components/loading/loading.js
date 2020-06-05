import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = () => (
    <>
        <div className="row justify-content-center">
            <div className="col-6">
                <ReactLoading type={'spin'} color="#153D57" height={'30%'} width={'30%'}/>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-6">
                <h3>Cargando...Espere un momento...</h3>
            </div>
        </div>
    </>
);
 
export default Loading;


