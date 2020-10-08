import AuthReducer from "./auth";
import * as actionTypes from '../actions/ActionTypes'

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(AuthReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store token upon login', () => {
        expect(AuthReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCeSS,
            idToken: '2342432ewsfdsfsdfhsdofj',
            userId: 'sdkfjsldkjfkldjskjkjfd'
        })).toEqual({
            token: '2342432ewsfdsfsdfhsdofj',
            userId: 'sdkfjsldkjfkldjskjkjfd',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })

    })
})
