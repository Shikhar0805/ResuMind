import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
const Protected = ({children}) => {
    const {user,loading} = useAuth();

    if(loading){
        return <div>Loading...</div>;
    }
    
    if(!user){
        return <Navigate to="/" replace />;
    }
    return children;
}

export default Protected;