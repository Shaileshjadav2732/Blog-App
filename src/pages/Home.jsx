import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { Container } from "../components/";
import PostCard from "../components/Postcard";
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div>
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read Post
                </h1>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className=" flex flex-wrap">
          {posts.map((posts) => (
            <div>
              <div key={posts.$id} className="p-2 w-1/4">
                <PostCard {...posts} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
