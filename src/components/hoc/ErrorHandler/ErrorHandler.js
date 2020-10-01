import React, {useEffect, useState} from "react";
import Modal from "../../UI/Model/Modal";

const ErrorHandler = (WrappedComponents, RequestResolver) => {

    const Handler = (props) => {

        const [error, setError] = useState(false);

        //todo State is not updating in axios interceptors
        useEffect(() => {
            const reqInterceptor = RequestResolver.interceptors.request.use(req => req, () => {
                setError(false);
                console.log("Error on Request and error ", error)
            });
            const resInterceptor = RequestResolver.interceptors.response.use(res => res, () => {
                setError(true);
                console.log("Error on Response and error ", error)
            });
            return () => {
                RequestResolver.interceptors.request.eject(reqInterceptor);
                RequestResolver.interceptors.request.eject(resInterceptor);
            }
        });

        const errorConfirmedHandler = () => {
            setError(false);
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
    console.log();
    return Handler;
}

export default ErrorHandler;
