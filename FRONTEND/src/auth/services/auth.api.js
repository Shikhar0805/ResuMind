import axios from "axios";

const api={
    baseURL: "http://localhost:3000",
    withCredentials: true
}

export async function register(username,email,password){
    try{
        const response=await axios.post("/api/auth/register",{email,username,password},api);    
        return response.data;
    }catch(err){
        throw err.response.data;
    }  
}


export async function login(email,password){
    try{
        const response=await axios.post("/api/auth/login",{email,password},api);    
        return response.data;
    }catch(err){
        throw err.response?.data || err;
    }
}

export async function logout(){
    try{
        const response=await axios.get("/api/auth/logout",api);    
        return response.data;
    }catch(err){
        throw err.response?.data || err;
    }
}

export async function getProfile(){
    try{
        const response=await axios.get("/api/auth/getuser",api);    
        return response.data;
    }catch(err){
        throw err.response.data;
    }
}