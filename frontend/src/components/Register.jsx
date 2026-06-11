
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
    <div className='form-container'>
        <h1>Register</h1>
        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Name</label>
                <input 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder='Enter Name'
                required
                />
            </div>

            <div className='form-group'>
                <label>Email</label>
                <input 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder='Enter Email Address'
                required
                />
            </div>

            <div className='form-group'>
                <label>Password</label>
                <input 
                type="password"
                value={name}
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder='Enter Password'
                required
                />
            </div>
            <button className='btn' type='submit' disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
            </button>
        </form>
        <div className='link-text'>
            Already have an account? <Link to="/login">Login Here</Link>
        </div>
    </div>
  )
}

export default Register