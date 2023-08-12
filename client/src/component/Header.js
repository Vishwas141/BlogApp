import React, { useContext, useEffect ,useState} from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import { UserContext } from '../userContext';

const Header = () => 
{
  const {setUserInfo,userInfo}=useContext(UserContext);

 async  function logout()
  {
        await  axios.post("http://localhost:4000/logout",{
             credentials:'include'
         })
        setUserInfo(null);

  }

  const username=userInfo?.data?.username;
  console.log(username)
   
  useEffect(()=>
  {
    
   
     async function getdata()
     {
         const token= Cookies.get("token");
     
         const resp=await axios.post("http://localhost:4000/profile",{token});

         if(resp.data.success)
         {
               setUserInfo(resp.data);
               
         }
     }
     getdata();
  },[])
  return (
    <header>
    <Link to="" className='logo'>My Blog</Link>
    <nav>
             {
              userInfo && (
                <>
                     <Link to="/create">Create New Post</Link>
                     <Link onClick={logout}>Logout</Link>
                </>
              )
             }
             {
              !userInfo &&
              <>
                  <div>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  </div>
              </>
             }
            
    </nav>
       
   </header>
  )
}

export default Header