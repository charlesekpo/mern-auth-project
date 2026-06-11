import {useState, useEffect} from 'react'
import API from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';

const AdminDashboard = () => {
    const[users, setUsers] = useState([]);
    const[error, setError] = useState('');
    const[message, setMessage] = useState('');

    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                const response = await API.get('/all-user');
                setUsers(response.data);
                setMessage('Record fetched successfully');
            }catch(err){
                setError(err.response?.data?.message || 'Failed to fetch users');
            }
        };
        fetchUsers();
    },[]);

    const handleDelete = async(userId)=>{
        if(!window.confirm('Are you sure to delete user?')) return;

        try{
            await API.post(`/delete-user/${userId}`);
            setUsers(users.filter(user => user._id !== userId))
            setMessage('User deleted successfully');
        }catch(err){
            setError(err.response?.data?.message || "Failed to delete user")
        }
    }
  return (
    <>
        <Navbar />
        <div className='admin-container'>
            <h2>Admin Dashboard - All Users</h2>
            {error && <div className='error'>{error}</div>}
            {message && <div className='success'>{message}</div>}
            {users.length === 0 && !error && <p>No users found</p>}
            {users.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (<tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className='delete-button' onClick={handleDelete(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            )}
        </div>
        
    </>
  );
};

export default AdminDashboard