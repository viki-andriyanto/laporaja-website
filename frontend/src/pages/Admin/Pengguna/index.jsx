import React, { useState, useEffect } from 'react';
import Sidebar from "../../../shared/sidebar";
import { getAllUsers } from "../../../_services/user";

// Helpers
const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Pengguna = () => {
  // States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const itemsPerPage = 8;

  // Fetch only users with role 'user'
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      const data = response.data || response;
      const filtered = data.filter(user => user.role === 'user');
      setUsers(filtered);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data pengguna. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedUsers = () => {
    if (!sortConfig.key) return [...users];

    return [...users].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const getFilteredUsers = () => {
    const search = searchTerm.toLowerCase();
    return getSortedUsers().filter(user =>
      ['nik', 'nama_lengkap', 'tempat_tinggal', 'tanggal_lahir', 'jenis_kelamin', 'no_telepon'].some(field =>
        user[field]?.toString().toLowerCase().includes(search)
      )
    );
  };

  const filteredUsers = getFilteredUsers();
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    return sortConfig.direction === 'asc'
      ? <i className="bi bi-arrow-up text-primary ms-1"></i>
      : <i className="bi bi-arrow-down text-primary ms-1"></i>;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>

          {start > 1 && (
            <>
              <li className="page-item"><button className="page-link" onClick={() => paginate(1)}>1</button></li>
              {start > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
            </>
          )}

          {pages.map(num => (
            <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(num)}>{num}</button>
            </li>
          ))}

          {end < totalPages && (
            <>
              {end < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
              <li className="page-item"><button className="page-link" onClick={() => paginate(totalPages)}>{totalPages}</button></li>
            </>
          )}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // UI Loading State
  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3 text-muted">Memuat Data Pengguna...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

          <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-4 border-bottom">
            <h1 className="h2"><i className="bi bi-people-fill me-2"></i>Daftar Pengguna</h1>
            {/* <button className="btn btn-outline-primary" onClick={fetchUsers} disabled={loading}>
              <i className="bi bi-arrow-clockwise me-1"></i>Refresh
            </button> */}
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={() => setError(null)}></button>
            </div>
          )}

          {/* Search */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari NIK, nama, atau tempat tinggal..."
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
                {searchTerm && (
                  <button className="btn btn-outline-secondary" onClick={() => setSearchTerm('')}>
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-primary fs-6 me-2">
                <i className="bi bi-people me-1"></i> Total: {filteredUsers.length}
              </span>
              <span className="text-muted small">dari {users.length} pengguna</span>
            </div>
          </div>

          {/* Table */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      {[
                        { key: 'nik', label: 'NIK', icon: 'card-text' },
                        { key: 'nama_lengkap', label: 'Nama Lengkap', icon: 'person' },
                        { key: 'tempat_tinggal', label: 'Tempat Tinggal', icon: 'house' },
                        { key: 'tanggal_lahir', label: 'Tanggal Lahir', icon: 'calendar' },
                        { key: 'jenis_kelamin', label: 'Jenis Kelamin', icon: 'gender-ambiguous' },
                        { key: 'no_telepon', label: 'No. Telepon', icon: 'telephone' },
                        { key: 'created_at', label: 'Tanggal Dibuat', icon: 'clock-history' }
                      ].map(col => (
                        <th key={col.key} onClick={() => requestSort(col.key)} style={{ cursor: 'pointer' }} className="text-nowrap">
                          <i className={`bi bi-${col.icon} me-1`}></i>{col.label} {renderSortIcon(col.key)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? currentItems.map(user => (
                      <tr key={user.id}>
                        <td><span className="fw-bold text-primary">{user.nik || '-'}</span></td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle me-2"><i className="bi bi-person-fill"></i></div>
                            <span className="fw-semibold">{user.nama_lengkap || '-'}</span>
                          </div>
                        </td>
                        <td><span className="text-muted">{user.tempat_tinggal || '-'}</span></td>
                        <td><span className="text-muted">{formatDate(user.tanggal_lahir)}</span></td>
                        <td>
                          <span className={`badge ${
                            user.jenis_kelamin === 'Laki-laki' || user.jenis_kelamin === 'L'
                              ? 'bg-info'
                              : 'bg-warning'
                          }`}>
                            <i className={`bi ${
                              user.jenis_kelamin === 'Laki-laki' || user.jenis_kelamin === 'L'
                                ? 'bi-gender-male'
                                : 'bi-gender-female'
                            } me-1`}></i>
                            {user.jenis_kelamin || '-'}
                          </span>
                        </td>
                        <td><span className="text-muted">{user.no_telepon || '-'}</span></td>
                        <td><span className="text-muted">{formatDate(user.created_at)}</span></td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5 text-muted">
                          <i className="bi bi-inbox display-4 d-block mb-3"></i>
                          <h5>Tidak ada data pengguna</h5>
                          <p>{searchTerm ? `Tidak ditemukan pengguna dengan kata kunci "${searchTerm}"` : 'Belum ada pengguna yang terdaftar'}</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {currentItems.length > 0 && (
            <div className="row mt-4">
              <div className="col-md-6">
                <p className="text-muted mb-0">
                  Menampilkan {indexOfFirstItem + 1} - {indexOfFirstItem + currentItems.length} dari {filteredUsers.length} pengguna
                </p>
              </div>
              <div className="col-md-6">{renderPagination()}</div>
            </div>
          )}
        </main>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(0, 123, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Pengguna;
