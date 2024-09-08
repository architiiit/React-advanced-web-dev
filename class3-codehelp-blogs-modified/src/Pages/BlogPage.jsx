import React, { useContext, useEffect, useState } from 'react'
import { useLocation ,useNavigate,useNavigation} from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import BlogDetails from '../components/BlogDetails';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
const BlogPage = () => {
    const newBaseUrl="https://codehelp-apis.vercel.app/api/"
    const {fetchBlogPosts}=useContext(AppContext);
    const [blog,setBlog]=useState(null);
    const [relatedBlogs,setRelatedBlogs]=useState([]);
    const location=useLocation();
    const navigation=useNavigate();
    const {setLoading,loading}=useContext(AppContext);
    const blogId=location.pathname.split("/").at(-1);
    async function fetchRelatedBlogs(){
        setLoading(true);
        let url=`${newBaseUrl}get-blog?blogId=${blogId}`;
        try{
            const res=await fetch(url);
            const data=await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error)
        {
            console.log("error aa gya in blog id wali call");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(()=>{ 
        if(blogId){
            fetchRelatedBlogs();
        }
    },[location.pathname])
    return (
    <div>
      <Header/>
      <div>
      <button onClick={()=>navigation(-1)}>
        back
      </button>
      </div>
      {
       loading ? 
       (
        <div>
            <p>Loading</p>
        </div>
       ):
       blog ?
       (
        <div>
            <BlogDetails post={blog}/>
            <h2>Related Blogs</h2>
            {
                relatedBlogs.map((post)=>(
                    <div key={post.id}>
                        <BlogDetails post={post}/>
                    </div>
                ))
            }
        </div>
       ):
       (
        <div>No Blog Found</div>
       )
       
      }
    </div>
  )
}

export default BlogPage
