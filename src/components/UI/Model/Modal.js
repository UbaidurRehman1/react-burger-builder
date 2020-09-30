import React from "react";
import classes from './Modal.module.css'
import Backdrop from "../Backdrop/Backdrop";
import PropTypes from 'prop-types';

const Modal = props => {
    const show = props.show;
    return (
        <React.Fragment>
            <Backdrop
                show={show}
                clickHandler={props.modalClosed}
            />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1': '0'
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired
}

export default React.memo(Modal, ((prevProps, nextProps) => {
    return prevProps['show'] === nextProps['show'];
}));
