import React, { useState, FormEvent } from 'react';
import './LoginPage.css';
import brainstormLogo from './assets/brainstorm.png';
import capybaraLogo from './assets/capybara.png';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }
    setErrorMessage('');
    console.log('Login Successful', { username, password });
    onLogin(true);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={capybaraLogo} alt="Capybara" className="capybara-logo" />
        <img src={brainstormLogo} alt="Brainstorm" className="brainstorm-logo" />
        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username/Email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          <p className="forgot-password">Forgot password?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;