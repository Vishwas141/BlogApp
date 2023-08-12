import React, { useEffect, useState } from "react";
import Post from "../component/Post";
import axios from "axios";

const IndexPage = () => 
{
  const [posts,setPosts]=useState([]);
  useEffect(() => {

    async function getdata()
    {
      const data=await axios.get("http://localhost:4000/postdata");
      setPosts(data.data.resp);
      console.log(data.data.resp);
    }
    getdata();
  
  }, []);
  return (
    <div>
             {
              posts.length>0 && 
              posts.map((post)=>
              {
                return (
                  <Post {...post}/>

                  
                )
              })
                
             }
    </div>
  );
};

export default IndexPage;
