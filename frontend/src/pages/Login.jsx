
import {useState} from 'react';
import{useNavigate, Link} from 'react-router-dom';
import API from '../api/axios.js';
import {useAuth} from '../context/AuthContext.jsx';

const Login =()=>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);

    const {login} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const response = await API.post('/login', {email, password});
            // expecting  {success: true, user:{id, name, email, role}}

            // so save it into login global state
            login(response?.data?.user);

            if(response?.data?.user.role === 'admin'){
                navigate('/admin');
            }else{
                navigate('/profile');
            }
            
        }catch(error){
            setError(response?.data?.message);
        }finally{
            setLoading(false);
        }
    }

    return (<div className='form-container'>
        <h2>Login</h2>
        {error && <div className='error'>{error}</div>}
        <form onSubmit={handleSubmit}>
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
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='Enter Password'
                    required
                />
            </div>
            <div>
                <button className='btn' type="submit" disabled={loading}>
                    {loading ? 'Login in...' : 'Login'}
                </button>
            </div>
        </form>

        <div className='link-text'>Don't have account? <Link to="/register">Register Here</Link> </div>
    </div>);
}

export default Login
