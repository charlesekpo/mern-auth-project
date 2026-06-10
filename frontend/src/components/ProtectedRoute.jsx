import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContex.jsx';

const ProtectedRoute = ({children, admin=false}) => {
    //first get user from global state
    const{user} = useAuth();

    // navigate to login page if user is not set
    if(!user){
        return <Navigate to="/login" />
    };

    // if the route is for admin only, but the logged in user is not admin, navigate to user's profile page
    if(adminOnly && user.role !== 'admin'){
        return <Navigate to="/profile" />
    };

    // return components that will be wrapped inside protected route component
    return children;
};

export default ProtectedRoute;