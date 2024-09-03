import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <div className='home-container'>
      <Link to={'/shop'}>

      <img src='https://i.postimg.cc/Vk13Xn6S/home-pic.png' alt='foo'/>
      <p className='pcontainer'>Shop now</p>

      </Link>
    </div>
  );
};

export default Home;