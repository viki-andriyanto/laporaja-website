import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import backgroundImage from '../../assets/background.png';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nik: '',
        password: '',
        namalengkap: '',
        noTelepon: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Register data:', formData);
        // TODO: Proses registrasi
    };

    return (
        <div style={layoutStyle}>
            <div style={backgroundStyle} />
            <div style={formContainerStyle}>
                <div style={formWrapperStyle}>
                    <img src={logoImage} alt="Logo" style={logoStyle} />
                    <h4 style={{ marginBottom: 20 }}>Register</h4>
                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: 10 }}>
                            <input
                                type="text"
                                name="nik"
                                placeholder="NIK"
                                value={formData.nik}
                                onChange={handleInputChange}
                                style={inputStyle}
                                maxLength={16}
                                inputMode="numeric"
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
                            />
                        </div>
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
                            />
                        </div>
                        <button type="submit" style={buttonStyle}>Daftar</button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <hr style={{ margin: '20px 0' }} />
                        <p>
                            Sudah punya akun?{' '}
                            <span style={linkStyle} onClick={() => navigate('/auth/login')}>Masuk</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Style sama seperti di login
const layoutStyle = { display: 'flex', height: '100vh', fontFamily: 'sans-serif' };
const backgroundStyle = {
    flex: 2,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
};
const formContainerStyle = { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' };
const formWrapperStyle = { width: '90%', maxWidth: '320px' };
const logoStyle = { width: 150, margin: '0 auto 50px', display: 'block' };
const inputStyle = {
    width: '100%', padding: '10px', fontSize: '14px',
    borderRadius: '5px', border: '1px solid #ccc'
};
const buttonStyle = {
    width: '100%', padding: '10px', backgroundColor: '#4285F4',
    color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px'
};
const linkStyle = { color: '#4285F4', cursor: 'pointer', textDecoration: 'underline' };

export default RegisterPage;
