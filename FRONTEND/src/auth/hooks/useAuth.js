import {useContext} from "react";
import {AuthContext} from "../auth.context";
import {login,register,logout,getProfile} from "../services/auth.api";
import { useEffect } from "react";
export const useAuth = () => {
 const context = useContext(AuthContext);
 const {user,setUser,loading,setLoading} = context;

const handleLogin = async (email,password) => {
    setLoading(true);
    try{
        await login(email,password);
        await fetchProfile();
    }catch(err){
        setLoading(false);
        throw err;
    }finally{
        setLoading(false);
    }
}

const handleRegister = async (username,email,password) => {
    setLoading(true);
    try{
        await register(username,email,password);
        await fetchProfile();
    }catch(err){
        setLoading(false);
        throw err;
    }finally{
        setLoading(false);
    }
}

const handleLogout = async () => {
    setLoading(true);
    try{
    await logout();
    setUser(null);
    }catch(err){}
    finally{
    setLoading(false); 
    } 
}

const fetchProfile = async () => {
    setLoading(true);
    try{
    const data=await getProfile();
    setUser(data.user);
    }catch(err){}
    finally{
    setLoading(false);      
}
}

 useEffect(() => {
    const getandSetUser = async () => {
        try {
            const data = await getProfile();
            setUser(data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }   
    getandSetUser();
    }, []);

return {user,loading,handleLogin,handleRegister,handleLogout,fetchProfile};
}