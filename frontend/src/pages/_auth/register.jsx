import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register } from '../../_services/auth';
import backgroundImage from '../../assets/background.png';
import logoImage from '../../assets/logo.png';

export default function Register() {
  const [formData, setFormData] = useState({
    nik: '',
    password: '',
    namalengkap: '',
    noTelepon: '',
    email: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
    setSuccess('');
  
    try {
      const response = await register({
        nik: formData.nik,
        password: formData.password,
        namalengkap: formData.namalengkap,
        noTelepon: formData.noTelepon,
        email: formData.email
      });
  
      console.log('Registrasi berhasil:', response);
      setSuccess('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
  
      // Reset form
      setFormData({
        nik: '',
        password: '',
        namalengkap: '',
        noTelepon: '',
        email: ''
      });
  
      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Registrasi gagal. Periksa data Anda dan coba lagi.');
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Gambar perpustakaan lebih lebar */}
      <div style={{
        flex: 2,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Form lebih ramping */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '90%', maxWidth: '320px' }}>
          <img src={logoImage} alt="Logo" style={{ width: 150, margin: '0 auto 50px', display: 'block' }} />
          <h4 style={{ marginBottom: 20 }}>Register</h4>
          
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

          {success && (
            <div style={{ 
              color: 'green', 
              fontSize: '14px', 
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Input NIK - Max 16 karakter */}
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
                type="text"
                name="namalengkap"
                placeholder="Nama Lengkap"
                value={formData.namalengkap}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Input No Telepon - Max 12 karakter */}
            <div style={{ marginBottom: 10 }}>
              <input
                type="tel"
                name="noTelepon"
                placeholder="No Telepon diawali (08)"
                value={formData.noTelepon}
                onChange={handleInputChange}
                style={inputStyle}
                maxLength={12}
                inputMode='numeric'
                required
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Input Password - Max 12 karakter */}
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
              {isLoading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <hr style={{ margin: '20px 0' }} />
            <p>
              Sudah memiliki akun?{' '}
              <Link to="/login" style={linkStyle}>Masuk</Link>
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