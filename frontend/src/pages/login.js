import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

function Login() {
  const { setUser } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/home/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
      } else {
        
        const { token, username, _id } = data; 
        const userWithToken = { _id, username, token };
        localStorage.setItem('user', JSON.stringify(userWithToken));
        
        // Update context with new user
        setUser(userWithToken); 
        console.log('Login response data:', data);

        navigate('/books');  
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login Error:', error); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginDiv">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
          required
        />
        <div className="horizontal">
          <button className="mt-3 add" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error">{error}</div>}
          <p className="loginLink mt-4 mx-5">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
