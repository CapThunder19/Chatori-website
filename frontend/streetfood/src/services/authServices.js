import axios from 'axios';

export const signup = async (userdata)=>{
    try{
    const res = await axios.post(`https://chatori-website.onrender.com/api/auth/signup`, userdata);
        return res.data;

    }
    catch(err){
        console.error("signup error", err);
    return {error:true, msg: err?.response?.data?.msg || err.message};
    }
}

export const login = async (userdata)=>{
    try{
    const res = await axios.post("https://chatori-website.onrender.com/api/auth/login", userdata)
        return res.data
    }
    catch(err){
        console.error("login failed", err);
    return {error:true, msg: err?.response?.data?.msg || err.message}

    }
}