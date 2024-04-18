import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import "./index.css";
import { BrowserRouter, Routes, Route, useParams  , NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
export const Home = () => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // console.log( " posts here" , Posts)
  return (
    <div>
      <div className="post-container">
        {Posts.map((post) => (
          <NavLink style={{display:"block"}} to={`/post/${post.id}`}>{post.title}</NavLink>
        ))}
      </div>
    </div>
  );
};

export const Account = () => {
  return <h1>Account</h1>;
};

export const About = () => {
  return (
    <div>
      <h1>about page</h1>
    </div>
  );
};

export function Profile() {
  return (
    <div>
      <h1>profile page</h1>
    </div>
  );
}

export function Setting() {
  return (
    <div>
      <h1>setting page</h1>
    </div>
  );
}

export const SayUser = () => {
  const Params = useParams();
  console.log(Params);
  return (
    <div>
      <h1>the user name is {Params.userId}</h1>
    </div>
  );
};

const PostPage = ()=>{
  const params  = useParams();
  console.log("params" , params)

  const [data, setdata] = useState(null)
  
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then(response => response.json())
    .then(json => setdata(json))
  }, [])
  console.log("data" , data)
  
if(data === null) return <li>loading....</li>
 
  return(
    <div className="post">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

{/* dynamic routing */}
        <Route path="/user/:userId" element={<SayUser />} />
        <Route path="/post/:postId" element={<PostPage />} />
{/* dynamic routing */}
        <Route path="account">
          <Route path="profile" element={<Profile />}></Route>
          <Route path="setting" element={<Setting />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
