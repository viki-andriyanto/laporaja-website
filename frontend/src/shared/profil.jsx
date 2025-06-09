import React, { useEffect, useState } from 'react';
import { getUserById } from '../_services/user';

export default function Profil() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userLocal = JSON.parse(localStorage.getItem('user'));
                if (!userLocal || !userLocal.id) {
                    setError('Pengguna tidak ditemukan. Silakan login.');
                    setLoading(false);
                    return;
                }

                const data = await getUserById(userLocal.id);
                setUserData(data);
            } catch (err) {
                setError('Gagal mengambil data pengguna.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p className="text-center">Memuat data...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="container mt-5">
            <div className="text-center">
                <img
                    src="https://via.placeholder.com/120"
                    alt="Foto Profil"
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px' }}
                />
                <h4>{userData.nama_lengkap}</h4>
                <p>{userData.nik}</p>
            </div>
            <hr />
            <div className="mb-3">
                <strong>Tempat Tinggal</strong>
                <p>{userData.alamat}</p>
            </div>
            <div className="mb-3">
                <strong>Tanggal Lahir</strong>
                <p>{userData.tanggal_lahir}</p>
            </div>
            <div className="mb-3">
                <strong>Jenis Kelamin</strong>
                <p>{userData.jenis_kelamin}</p>
            </div>
            <div className="mb-3">
                <strong>No Telepon</strong>
                <p>{userData.no_telepon}</p>
            </div>
            <div className="mb-3">
                <strong>Email</strong>
                <p>{userData.email}</p>
            </div>
        </div>
    );
}
