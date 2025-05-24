import React, { useState } from 'react';
import backgroundImage from '../../assets/background.png';
import logoImage from '../../assets/logo.png';

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login');
  const [formData, setFormData] = useState({
    nik: '',
    password: '',
    namalengkap: '',
    noTelepon: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${currentView === 'login' ? 'Login' : 'Register'} data:`, formData);
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
          <h4 style={{ marginBottom: 20 }}>
            {currentView === 'login' ? 'Log in' : 'Register'}
          </h4>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10 }}>
              <input
                type="text"
                name="nik"
                placeholder="NIK"
                value={formData.nik}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            {currentView === 'register' && (
              <>
                <div style={{ marginBottom: 10 }}>
                  <input
                    type="text"
                    name="namalengkap"
                    placeholder="Nama Lengkap"
                    value={formData.namalengkap}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <input
                    type="text"
                    name="noTelepon"
                    placeholder="No Telepon"
                    value={formData.noTelepon}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </>
            )}
            <div style={{ marginBottom: 10 }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle}>
              {currentView === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <hr style={{ margin: '20px 0' }} />
            {currentView === 'login' ? (
              <p>
                Apakah kamu tidak memiliki akun?{' '}
                <span style={linkStyle} onClick={() => setCurrentView('register')}>Buat akun</span>
              </p>
            ) : (
              <p>
                Sudah memiliki akun?{' '}
                <span style={linkStyle} onClick={() => setCurrentView('login')}>Masuk</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  cursor: 'pointer',
  textDecoration: 'underline'
};

export default AuthPage;
