import {useAuth} from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';

const Navbar = () => {
  
    // first get the logged in user and logout from the global state
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async()=>{

        try{
            await API.post('/logout');
            logout();
            navigate('/login');
        }catch(error){
            console.log(error);
        }
        
    }
          
  return (
    <nav className='navbar'>
        <h1>Authentication System</h1>
        {/* only show this logout if the user is logged in */}
        {user && (<button onClick={handleLogout}>Logout</button>)}
    </nav>
  )
}

export default Navbar