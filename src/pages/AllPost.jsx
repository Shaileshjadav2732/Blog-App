import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/conf.js";
import { Container } from "../components";
import Postcard from "../components/Postcard.jsx";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Fetch posts when the component mounts
    appwriteService.getPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);  
      }
    });
  }, []);// Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
