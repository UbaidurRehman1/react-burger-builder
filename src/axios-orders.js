import axios from 'axios'
const RequestResolver = axios.create({
    baseURL: 'https://spring-boot-oauth-27802.firebaseio.com/'
});

export default RequestResolver;
