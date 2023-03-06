class SessionHelper{
    sessionSetAuth = (data)=>{
        localStorage.setItem('auth', JSON.stringify(data))
    }

    getAuth = ()=>{
       return JSON.parse(localStorage.getItem('auth'));
    }
    sessionSetToken = (token)=>{
        localStorage.setItem('token', token)
    }
    getToken = ()=>{
       return localStorage.getItem('token')
    }

    setVerifyEmail = (email) => {
        localStorage.setItem('otp-email', email)
    }
    getVerifyEmail = () => {
       return localStorage.getItem('otp-email')
    }

    setOtp = (otp) => {
        localStorage.setItem('otp', otp)
    }
    getOtp = () => {
        return localStorage.getItem('otp')
    }

    sessionRemove = ()=>{
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        window.location.href = '/login'
    }

}

export const {sessionSetAuth, getAuth, sessionSetToken, getToken, sessionRemove, setVerifyEmail, getVerifyEmail,
    setOtp, getOtp
} = new SessionHelper();