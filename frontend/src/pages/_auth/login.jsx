import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../_services/auth';
import backgroundImage from '../../assets/background.png';
import logoImage from '../../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await login({
        nik: formData.nik,
        password: formData.password
      });

      console.log('Login berhasil:', response);
      navigate('/dashboard'); // Ganti dengan rute tujuan kamu
    } catch (error) {
      const msg = error.response?.data?.message || 'Login gagal. Periksa NIK dan password Anda.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Gambar perpustakaan */}
      <div style={{
        flex: 2,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Form login */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '90%', maxWidth: '320px' }}>
          <img src={logoImage} alt="Logo" style={{ width: 150, margin: '0 auto 50px', display: 'block' }} />
          <h4 style={{ marginBottom: 20 }}>Log in</h4>
          
          {error && (
            <div style={{ 
              color: 'red', 
              fontSize: '14px', 
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10 }}>
              <input
                type="text"
                name="nik"
                placeholder="NIK"
                value={formData.nik}
                onChange={handleInputChange}
                style={inputStyle}
                maxLength={16}
                inputMode='numeric'
                required
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={inputStyle}
                maxLength={12}
                required
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...buttonStyle,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <hr style={{ margin: '20px 0' }} />
            <p>
              Apakah kamu tidak memiliki akun?{' '}
              <Link to="/register" style={linkStyle}>Buat akun</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4285F4',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px'
};

const linkStyle = {
  color: '#4285F4',
  textDecoration: 'underline'
};
