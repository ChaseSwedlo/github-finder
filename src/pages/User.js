import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function User() {
  const { slug } = useParams();
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async (slug) => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${slug}`),
          axios.get(`https://api.github.com/users/${slug}/repos`)
        ]);
        setUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('User not found');
        }
        navigate(`/`);
      }
    }
    fetchUser(slug);
  }, [slug, navigate]);


  const formatDate = (date) => {
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

  return (
    <motion.div 
      key='user'
      initial={{ opacity: 0, y: -25 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, delay: 1.1 }
      }}
      exit={{ 
        opacity: 0, 
        y: -25,
        transition: { duration: 0.4 }
      }}
    >
      {user ? (
        <div className='user-info'>
          <figure>
            <img alt={user.avatar_url} src={user.avatar_url}/>
          </figure>
          <h1>{user.name === null ? user.login : user.name}</h1>
          <div className='stats flex'>
            <p><span>{user.public_repos}</span>Repositories</p>
            <p><span>{user.followers}</span>Followers</p>
            <p><span>{user.following}</span>Following</p>
          </div>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            <input type="button" value="Go to Github"/>
          </a>
        </div>
      ) : (
        <p>User data not found</p>
      )}
      <section className='repos'>
      <h2>My repositories</h2>
      {repos ? (
        repos.length > 0 ? (
          repos.map(repo => (
            <div className='repo' key={repo.id}>
              <div className='flex sb'>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  <h3>{repo.name}</h3>
                </a>
                <span className='date'>{formatDate(repo.updated_at)}</span>
              </div>
              {repo.description !== null && <p>{repo.description}</p>}
            </div>
          ))
        ) : (
        <div className='repo'>
          <h3>No repositories</h3>
        </div>)
        ) : (
        <p>User data not found</p>
      )
      }
      </section>
    </motion.div>
  );
}

export default User;