import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and success message
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to register user');
      }

      setSuccessMessage('Registration successful');
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error:', error.message);
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
        {errors.submit && <div className="mt-3 text-danger text-center">{errors.submit}</div>}
        {successMessage && <div className="mt-3 text-success text-center">{successMessage}</div>}
      </form>
    </div>
  );
}

export default App;
