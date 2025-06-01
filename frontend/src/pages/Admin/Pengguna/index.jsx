import React, { useState, useEffect } from 'react';
import Sidebar from "../../../shared/sidebar";

const Pengguna = () => {
  // Data dummy pengguna (dalam aplikasi nyata, data akan diambil dari API)
  const allUsers = [
    { id: 1, nik: '3201123400010001', nama: 'Budi Santoso', jenisKelamin: 'Laki-laki' },
    { id: 2, nik: '3201123400010002', nama: 'Siti Rahayu', jenisKelamin: 'Perempuan' },
    { id: 3, nik: '3201123400010003', nama: 'Ahmad Fauzi', jenisKelamin: 'Laki-laki' },
    { id: 4, nik: '3201123400010004', nama: 'Dewi Lestari', jenisKelamin: 'Perempuan' },
    { id: 5, nik: '3201123400010005', nama: 'Rudi Hartono', jenisKelamin: 'Laki-laki' },
    { id: 6, nik: '3201123400010006', nama: 'Ani Wijaya', jenisKelamin: 'Perempuan' },
    { id: 7, nik: '3201123400010007', nama: 'Eko Prasetyo', jenisKelamin: 'Laki-laki' },
    { id: 8, nik: '3201123400010008', nama: 'Maya Sari', jenisKelamin: 'Perempuan' },
    { id: 9, nik: '3201123400010009', nama: 'Joko Susilo', jenisKelamin: 'Laki-laki' },
    { id: 10, nik: '3201123400010010', nama: 'Rina Permata', jenisKelamin: 'Perempuan' },
    { id: 11, nik: '3201123400010011', nama: 'Hendra Kurniawan', jenisKelamin: 'Laki-laki' },
    { id: 12, nik: '3201123400010012', nama: 'Lina Anggraeni', jenisKelamin: 'Perempuan' },
  ];

  // State untuk manajemen data
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Efek untuk inisialisasi data
  useEffect(() => {
    setUsers(allUsers);
  });

  // Fungsi untuk menghandle pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Fungsi untuk sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Proses sorting
  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Proses filter berdasarkan pencarian
  const filteredUsers = sortedUsers.filter(user => 
    user.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.jenisKelamin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Kalkulasi pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Fungsi untuk ganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => paginate(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          
          {pageNumbers.map(number => (
            <li 
              key={number} 
              className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
              <button 
                className="page-link" 
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => paginate(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Render icon sort
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Daftar Pengguna</h1>
          </div>

          {/* Pencarian */}
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Cari pengguna..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* Tabel Pengguna */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th onClick={() => requestSort('nik')} style={{ cursor: 'pointer' }}>
                    NIK {renderSortIcon('nik')}
                  </th>
                  <th onClick={() => requestSort('nama')} style={{ cursor: 'pointer' }}>
                    Nama Lengkap {renderSortIcon('nama')}
                  </th>
                  <th onClick={() => requestSort('jenisKelamin')} style={{ cursor: 'pointer' }}>
                    Jenis Kelamin {renderSortIcon('jenisKelamin')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(user => (
                    <tr key={user.id}>
                      <td>{user.nik}</td>
                      <td>{user.nama}</td>
                      <td>{user.jenisKelamin}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Tidak ada data pengguna yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
              Menampilkan {Math.min(indexOfFirstItem + 1, filteredUsers.length)} - 
              {Math.min(indexOfLastItem, filteredUsers.length)} dari {filteredUsers.length} pengguna
            </div>
            {renderPagination()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pengguna;