import { useEffect, useState } from 'react';
import './App.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

function App() {
  const [postData, setPostData] = useState([]);

  // useEffect hook without any depandancy is used so that the API call will be made once when the functional component is mounted
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const posts = await response.json();
        // data received from API is then set into postData state to that it is available to use
        setPostData(posts.posts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);

  // console.log(postData, typeof postData);

  return (
    <>
      {/* h2 tag shows the purpose of the page user is visiting  */}
      <h2 className='post_page_heading'>
        Welcome to the Posts Page! Checkout the posts by other users below.
      </h2>

      {/* li elemenents will be created in a loop to display all the posts on the page */}
      <ul className='app_posts'>
        {postData.map((post, index) => (
          <li key={index} className='app_postDetails'>
            {/* this p tag shos the title of the post that is coming from API */}
            <p className='app_post_heading'>
              {post.id}. {post.title}
            </p>
            {/* The container div is created to give the styling effects to the details of each post. */}
            <div className='post_detail_container'>
              {/* This p tag ill display the body of each post coming from API */}
              <p className='app_post_description'>{post.body}</p>
              {/* This p tag will show the userId of the individual posts */}
              <p className='post_author'>Posted By: {post.userId}</p>
              {/* This p tag creates a container for styling of the array of tags coming from API */}
              <p className='post_tags'>
                Category:
                {post.tags.map((tag) => (
                  // span tag is used to separate the tags as they in Array, and therefore can be styled individually
                  <span>{tag} </span>
                ))}
              </p>
              {/* This p tag is a container for reactions coming from API */}
              <p className='posts_reaction'>
                <FavoriteIcon /> {post.reactions}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
