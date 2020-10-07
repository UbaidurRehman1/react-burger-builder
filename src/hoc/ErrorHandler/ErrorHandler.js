import React, {useEffect, useState} from "react";
import Modal from "../../components/UI/Model/Modal";

const ErrorHandler = (WrappedComponents, RequestResolver) => {

    const Handler = (props) => {

        const [error, setError] = useState('');

        //todo State is not updating in axios interceptors
        useEffect(() => {
            const reqInterceptor = RequestResolver.interceptors.request.use(req => req, () => {
                setError('');
            });
            const resInterceptor = RequestResolver.interceptors.response.use(res => res, () => {
                setError('There is an Error');
            });
            return () => {
                RequestResolver.interceptors.request.eject(reqInterceptor);
                RequestResolver.interceptors.request.eject(resInterceptor);
            }
        });

        const errorConfirmedHandler = () => {
            setError('');
        }

        return (
            <React.Fragment>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponents {...props}/>
            </React.Fragment>
        );
    }
    return Handler;
}

export default ErrorHandler;
