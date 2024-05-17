import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Home() {
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  
  const fetchUser = async (userInput) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${userInput}`);
      setIsValid(true);
      navigate(`/user/${userInput}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('User not found, setting isValid to false');
        setIsValid(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUser(event.target.userinput.value);
    event.target.userinput.value = '';
  };

  return (
    <motion.div
      key='home'
      className='home'
      initial={{ opacity: 0, y: -25 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 1 }
      }}
      exit={{ 
        opacity: 0, 
        y: -25,
        transition: { duration: 0.4 }
      }}
    >
      <div className='search'>
        <FaGithub />
        <div className='text-border'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Username'
              name='userinput'
              autoComplete='off'
            />
          </form>
        </div>
        <p>{isValid ? 'Welcome to GitHub Finder' : 'Not a valid user'}</p>
      </div>
    </motion.div>
  );
}

export default Home;