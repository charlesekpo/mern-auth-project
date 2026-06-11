import {useState, useEffect} from 'react'
import API from'../api/axios.js';
import Navbar from './Navbar.jsx';

const Profile = () => {
    const[profileData, setProfileData] = useState('');
    const[error, setError] = useState('');

    useEffect(()=>{
        const fetchProfile = async()=>{
            try{
                const profileD = await API.get('/profile');
                serProfileData(profileD.data);
            }catch(error){
                setError(error.response?.data?.message || 'Failed to load profile');
            }
        }
        fetchProfile();
    },[]);

  return (
    <>
        <Navbar />
        <div className="profile-card">

            <h2>My Profile</h2>

            {error && <div className='error'>{error}</div>}

            {!profileData && !error && <p>Loading...</p>}

            {profileData && <div>
                <p><span>Name: </span>{profileData.name}</p>
                <p><span>Email: </span>{profileData.email}</p>
                <p><span>Role: </span>{profileData.role}</p>
            </div>}
            
        </div>
        
    </>
  )
}

export default Profile