import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemInfo from '../components/SystemInfo/SystemInfo';

const RootPage = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nickname = localStorage.getItem('nickname');
    if (token) {
      // Optionally decode the token to get the user's nickname
      // For now, we'll just check if the token exists
      setIsLoggedIn(true);
      setNickname(nickname || '');
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const managementUrl = import.meta.env.VITE_MANAGEMENT_URL;
    console.log('env', import.meta.env);
    console.log('process', process.env);

    const response = await fetch(`/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, password })
    });

    if (response.ok) {
      const { data } = await response.json();
      localStorage.setItem('token', data.token); // Store the token in local storage
      localStorage.setItem('nickname', data.nickname); // Store the nickname in local storage
      // Update state or perform other actions as needed
      setIsLoggedIn(true);
    } else {
      // Handle login error
      console.error('Login failed');
    }
  };

  const handlePlay = () => {
    navigate('/play');
  };

  return (
    <div className="container mx-auto px-4">
      <SystemInfo />
      <header style={{ textAlign: 'center' }}>
        <h1>TRN Test Application</h1>
      </header>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Hello, {nickname}, let's play!</p>
          <button onClick={handlePlay}>Play</button>
        </div>
      )}
    </div>
  );
};

export default RootPage;
