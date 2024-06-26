import React from 'react'
import { useState } from 'react';
 

const Login = () => {
    const styles = {
      container: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      },
      header: {
        textAlign: 'center',
        marginBottom: '20px',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
      },
      formGroup: {
        marginBottom: '15px',
      },
      label: {
        display: 'block',
        marginBottom: '5px',
      },
      input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '3px',
      },
      button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      },
      buttonHover: {
        backgroundColor: '#0056b3',
      }
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const isAuth = localStorage.getItem('token');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:6005/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: isAuth
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        // Handle successful login (e.g., store token in local storage or state)
        console.log('Login successful');
      } catch (error) {
        setError(error.message);
      }
    };
  
    const validateEmail = (email) => {
      // Basic email validation regex (change as per your requirements)
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            // disabled={!validateEmail(email) || !password}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
  
  export default Login;