
import{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios.js';

const Register = () => {
    //set the states
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[success, setSuccess] = useState('');
    const[loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try{
            await API.post('/register', {name, email, password});
            setSuccess('User created successfully');
            // redirect to login after1.5sec
            setTimeout(()=>navigate('/login'),1500);
        }catch(error){
            setError(error.response?.data?.message || 'Error occured while creating user, please try again later');
        }finally{
            setLoading(false);
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder='Enter Name'
                required
                />
            </div>

            <div>
                <input 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder='Enter Email Address'
                required
                />
            </div>

            <div>
                <input 
                type="password"
                value={name}
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder='Enter Password'
                required
                />
            </div>
            <button type='submit' disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
            </button>
        </form>
    </div>
  )
}

export default Register