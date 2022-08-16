import React from 'react';
import ReactDOM from "react-dom";

import  style from './Modal.module.css';

const BackDrop = (props) => {
    return(
        <div className={style.backdrop} onClick={props.onHideCart}></div>
    )
}

const ModalOverLay = (props) => {
    return(
        <div className={style.modal}>
            <div>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');
const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart}></BackDrop>, portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal;