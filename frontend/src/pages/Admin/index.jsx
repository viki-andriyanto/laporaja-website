import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../../shared/sidebar";
import { getAllRiwayat } from "../../_services/riwayat-laporan";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { isValid, parseISO, format } from "date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetail = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  // Fetch data dari database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const riwayatData = await getAllRiwayat().catch(err => {
          console.error("Error fetching riwayat:", err);
          return [];
        });
  
        setReports(Array.isArray(riwayatData) ? riwayatData : []);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError("Gagal memuat data. Periksa koneksi server.");
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-light">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Hitung statistik laporan dengan safe fallbacks
  const totalLaporan = Array.isArray(reports) ? reports.length : 0;
  const totalUsers = Array.isArray(reports)
  ? new Set(reports.map(r => r?.users_user_id).filter(Boolean)).size
  : 0;
  const laporanSelesai = Array.isArray(reports) 
    ? reports.filter(report => report?.status === "Selesai").length 
    : 0;
  const persentaseSelesai = totalLaporan > 0 ? ((laporanSelesai / totalLaporan) * 100).toFixed(0) : 0;

  // Data untuk grafik - hitung berdasarkan status dengan safe handling
  const statusCounts = Array.isArray(reports) ? reports.reduce((acc, report) => {
    if (report && report.status) {
      acc[report.status] = (acc[report.status] || 0) + 1;
    }
    return acc;
  }, {}) : {};

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Jumlah Laporan",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Dalam Proses
          "rgba(75, 192, 192, 0.7)", // Selesai
          "rgba(255, 206, 86, 0.7)", // Perlu Ditinjau
          "rgba(255, 99, 132, 0.7)", // Ditolak
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribusi Status Laporan",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  // Format tanggal untuk tampilan
  const formatDate = (t) => {
    if (!t) return "-";
    const safe = t.includes("T") ? t : t.replace(" ", "T");
    const d = parseISO(safe);
    return isValid(d) ? format(d, "dd/MM/yyyy HH:mm") : "-";
  };
  
  // Urutkan laporan berdasarkan created_at (terbaru di atas)
  const sortedReports = Array.isArray(reports)
    ? [...reports]
        .filter((r) => r?.created_at) // filter yang tidak punya tanggal
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10)
    : [];

    const ModalDetailRiwayat = ({ show, laporan, onHide }) => {
      const [activeIndex, setActiveIndex] = useState(0);
    
      // Helper function to get file extension
      const getFileExtension = (filename) => {
        if (!filename) return '';
        return filename.split('.').pop().toLowerCase();
      };
    
      // Helper function to get file type
      const getFileType = (filename) => {
        if (!filename) return 'unknown';
        const extension = getFileExtension(filename);
        
        // Image files
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
          return 'image';
        }
        // Video files
        if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
          return 'video';
        }
        // Audio files
        if (['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(extension)) {
          return 'audio';
        }
        // PDF files
        if (extension === 'pdf') {
          return 'pdf';
        }
        // Document files
        if (['doc', 'docx'].includes(extension)) {
          return 'document';
        }
        // Spreadsheet files
        if (['xls', 'xlsx', 'csv'].includes(extension)) {
          return 'spreadsheet';
        }
        // Presentation files
        if (['ppt', 'pptx'].includes(extension)) {
          return 'presentation';
        }
        
        return 'unknown';
      };
    
      // Helper function to get file icon
      const getFileIcon = (fileType) => {
        const iconMap = {
          'pdf': 'bi-file-earmark-pdf-fill text-danger',
          'document': 'bi-file-earmark-word-fill text-primary',
          'spreadsheet': 'bi-file-earmark-excel-fill text-success',
          'presentation': 'bi-file-earmark-ppt-fill text-warning',
          'audio': 'bi-file-earmark-music-fill text-info',
          'video': 'bi-file-earmark-play-fill text-dark',
          'unknown': 'bi-file-earmark-fill text-secondary'
        };
        
        return iconMap[fileType] || iconMap['unknown'];
      };
    
      // Component to render different file types
      const FileViewer = ({ fileUrl, fileType, fileName, style = {} }) => {
        switch (fileType) {
          case 'image':
            return (
              <Image
                src={fileUrl}
                alt={fileName}
                fluid
                className="rounded"
                style={{ maxHeight: "300px", ...style }}
                onError={(e) => {
                  console.log('Image load error:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
            );
          
          case 'video':
            return (
              <video
                controls
                className="rounded"
                style={{ maxHeight: "300px", width: "100%", ...style }}
              >
                <source src={fileUrl} type={`video/${getFileExtension(fileName)}`} />
                Browser Anda tidak mendukung video HTML5.
              </video>
            );
          
          case 'audio':
            return (
              <div className="text-center py-4">
                <i className="bi bi-file-earmark-music-fill fs-1 text-info mb-3"></i>
                <audio controls className="w-100">
                  <source src={fileUrl} type={`audio/${getFileExtension(fileName)}`} />
                  Browser Anda tidak mendukung audio HTML5.
                </audio>
                <p className="mt-2 mb-0">{fileName}</p>
              </div>
            );
          
          case 'pdf':
            return (
              <div className="text-center py-4">
                <i className="bi bi-file-earmark-pdf-fill fs-1 text-danger mb-3"></i>
                <p className="mb-2">{fileName}</p>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => window.open(fileUrl, '_blank')}
                  >
                    <i className="bi bi-eye me-1"></i>
                    Lihat
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = fileUrl;
                      link.download = fileName;
                      link.click();
                    }}
                  >
                    <i className="bi bi-download me-1"></i>
                    Unduh
                  </Button>
                </div>
              </div>
            );
          
          default:
            return (
              <div className="text-center py-4">
                <i className={`${getFileIcon(fileType)} fs-1 mb-3`}></i>
                <p className="mb-2">{fileName}</p>
                <p className="text-muted small mb-3">
                  File {fileType.toUpperCase()} - {getFileExtension(fileName).toUpperCase()}
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => window.open(fileUrl, '_blank')}
                  >
                    <i className="bi bi-eye me-1"></i>
                    Buka
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = fileUrl;
                      link.download = fileName;
                      link.click();
                    }}
                  >
                    <i className="bi bi-download me-1"></i>
                    Unduh
                  </Button>
                </div>
              </div>
            );
        }
      };
    
      // Component to render thumbnail
      const FileThumbnail = ({ fileUrl, fileType, fileName, isActive, onClick }) => {
        const thumbnailStyle = {
          cursor: "pointer",
          border: isActive ? "3px solid #0d6efd" : "1px solid #dee2e6",
          width: "80px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        };
    
        if (fileType === 'image') {
          return (
            <div className="thumbnail" onClick={onClick} style={thumbnailStyle}>
              <Image
                src={fileUrl}
                alt={`Thumbnail ${fileName}`}
                width={80}
                height={60}
                className="object-fit-cover rounded"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yNSAyMEg1NVY0MEgyNVYyMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+';
                }}
              />
            </div>
          );
        }
    
        return (
          <div 
            className="thumbnail rounded d-flex flex-column align-items-center justify-content-center bg-light" 
            onClick={onClick} 
            style={thumbnailStyle}
          >
            <i className={`${getFileIcon(fileType)} fs-6`}></i>
            <small className="text-truncate" style={{ fontSize: '10px', width: '70px' }}>
              {getFileExtension(fileName).toUpperCase()}
            </small>
          </div>
        );
      };
    
      // Data sudah termasuk relasi dari backend (with['laporan', 'surat', 'user'])
      // Jadi tidak perlu fetch tambahan
    
      const getBadgeStatus = (status) => {
        if (!status) return <span className="badge bg-secondary">Tidak diketahui</span>;
        const color = getStatusColor(status);
        return <span className={`badge bg-${color}`}>{status}</span>;
      };
    
      // Helper function to get reporter NIK
      const getReporterNIK = (laporan) => {
        // Try different possible paths for NIK
        return laporan?.users?.nik || 
               laporan?.user?.nik || 
               laporan?.users?.NIK || 
               laporan?.user?.NIK || 
               'NIK tidak tersedia';
      };
    
      // Helper function to get category name
      const getCategoryName = (laporan) => {
        // Berdasarkan struktur database: riwayat_laporan -> laporan -> kategori
        // Foreign key: laporan.kategori_kategori_id -> kategori.kategori_id
        return laporan?.laporan?.kategori?.nama_kategori || 
               'Kategori tidak diketahui';
      };
    
      return (
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Detail {laporan?.laporan ? 'Laporan' : 'Surat'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <h4 className="fw-bold">{laporan?.judul || (laporan?.laporan?.judul || laporan?.surat?.judul)}</h4>
              <p className="text-muted mb-3">Tanggal Dibuat: {formatDate(laporan?.created_at)}</p>
    
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6 className="fw-bold">Status:</h6>
                  {getBadgeStatus(laporan?.status)}
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold">Pelapor:</h6>
                  <p className="mb-0">{getReporterNIK(laporan)}</p>
                </div>
              </div>
    
              {/* Detail khusus Laporan */}
              {laporan?.laporan && (
                <>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Kategori:</h6>
                      <p className="mb-0">{getCategoryName(laporan)}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Lokasi Kejadian:</h6>
                      <p className="mb-0">{laporan.laporan.lokasi_kejadian || '-'}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Tanggal Kejadian:</h6>
                      <p className="mb-0">{formatDate(laporan.laporan.tanggal_kejadian) || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Kontak:</h6>
                      <p className="mb-0">{laporan.kontak || '-'}</p>
                    </div>
                  </div>
                </>
              )}
    
              {/* Detail khusus Surat */}
              {laporan?.surat && (
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Jenis Surat:</h6>
                    <p className="mb-0">{laporan.surat.jenis_surat || 'Tidak diketahui'}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Kontak:</h6>
                    <p className="mb-0">{laporan.kontak || '-'}</p>
                  </div>
                </div>
              )}
    
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={laporan?.isi || laporan?.deskripsi || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
    
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Media/File</Form.Label>
                {(() => {
                  // Helper function to get media files
                  const getMediaFiles = (laporan) => {
                    // Cek berbagai kemungkinan struktur data media
                    if (laporan?.media && Array.isArray(laporan.media) && laporan.media.length > 0) {
                      return laporan.media;
                    }
                    
                    // Cek field file dari database
                    if (laporan?.file) {
                      // Jika file adalah string (single file)
                      if (typeof laporan.file === 'string') {
                        return [laporan.file];
                      }
                      // Jika file adalah array
                      if (Array.isArray(laporan.file)) {
                        return laporan.file;
                      }
                    }
                    
                    // Cek field files (plural)
                    if (laporan?.files && Array.isArray(laporan.files)) {
                      return laporan.files;
                    }
                    
                    return null;
                  };
    
                  const mediaFiles = getMediaFiles(laporan);
                  
                  // Debug log untuk melihat struktur data
                  console.log('Media files:', mediaFiles);
                  console.log('Laporan file field:', laporan?.file);
                  
                  return mediaFiles && mediaFiles.length > 0 ? (
                    <div className="media-gallery">
                      <div className="mb-3 text-center">
                        {(() => {
                          const currentFile = mediaFiles[activeIndex];
                          const fileName = currentFile ? currentFile.split('/').pop() : '';
                          const fileType = getFileType(currentFile);
                          
                          return (
                            <FileViewer
                              fileUrl={currentFile}
                              fileType={fileType}
                              fileName={fileName}
                            />
                          );
                        })()}
                      </div>
                      
                      {mediaFiles.length > 1 && (
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                          {mediaFiles.map((media, index) => {
                            const fileName = media ? media.split('/').pop() : '';
                            const fileType = getFileType(media);
                            
                            return (
                              <FileThumbnail
                                key={index}
                                fileUrl={media}
                                fileType={fileType}
                                fileName={fileName}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(index)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-3 bg-light rounded">
                      <i className="bi bi-file-earmark fs-1 text-muted"></i>
                      <p className="mt-2 mb-0">Tidak ada file yang disertakan</p>
                      {laporan?.file && (
                        <small className="text-muted d-block">
                          File: {laporan.file}
                        </small>
                      )}
                    </div>
                  );
                })()}
              </Form.Group>
    
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Komentar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={laporan?.komentar || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-light">
          {/* Error Alert */}
          {error && (
            <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Dashboard Admin</h2>
            <div className="d-flex gap-3">
              <div className="bg-primary text-white p-3 rounded shadow-sm">
                <div className="d-flex align-items-center">
                  <div>
                    <small className="opacity-75">Total Laporan</small>
                    <h3 className="mb-0 fw-bold">{totalLaporan}</h3>
                  </div>
                  <i className="bi bi-file-text-fill ms-3 fs-2 opacity-75"></i>
                </div>
              </div>
              <div className="bg-success text-white p-3 rounded shadow-sm">
                <div className="d-flex align-items-center">
                  <div>
                    <small className="opacity-75">Total Pengguna</small>
                    <h3 className="mb-0 fw-bold">{totalUsers}</h3>
                  </div>
                  <i className="bi bi-people-fill ms-3 fs-2 opacity-75"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Statistik Utama */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  {Object.keys(statusCounts).length > 0 ? (
                    <Bar data={chartData} options={chartOptions} />
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 py-5">
                      <i className="bi bi-bar-chart-fill text-muted mb-3" style={{fontSize: '3rem'}}></i>
                      <p className="text-muted mb-0">Belum ada data laporan untuk ditampilkan</p>
                      <small className="text-muted">Grafik akan muncul setelah ada laporan masuk</small>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center">
                    <i className="bi bi-graph-up me-2 text-success"></i>
                    Progress Laporan
                  </h5>
                  <div className="progress mb-3" style={{ height: "25px" }}>
                    <div
                      className="progress-bar bg-success progress-bar-striped"
                      role="progressbar"
                      style={{ width: `${persentaseSelesai}%` }}
                    >
                      {persentaseSelesai}%
                    </div>
                  </div>
                  <div className="list-group list-group-flush">
                    {Object.keys(statusCounts).length > 0 ? (
                      Object.entries(statusCounts).map(([status, count]) => (
                        <div
                          key={status}
                          className="list-group-item d-flex justify-content-between align-items-center px-0 border-0"
                        >
                          <div className="d-flex align-items-center">
                            <span
                              className={`badge bg-${getStatusColor(status)} me-2`}
                              style={{width: '12px', height: '12px'}}
                            >
                              &nbsp;
                            </span>
                            {status}
                          </div>
                          <span className="badge bg-primary rounded-pill">
                            {count}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="list-group-item text-center text-muted px-0 border-0 py-4">
                        <i className="bi bi-inbox mb-2 d-block" style={{fontSize: '2rem'}}></i>
                        Belum ada data status
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laporan Terbaru */}
          <div className="card shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                Laporan Terbaru
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Judul Laporan</th>
                      <th className="border-0 py-3">Tanggal</th>
                      <th className="border-0 py-3">Status</th>
                      <th className="border-0 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedReports.length > 0 ? (
                      sortedReports.map((report, index) => (
                        <tr key={report?.id || index}>
                          <td className="px-4 py-3">
                            <div className="fw-medium">
                              {report?.judul || report?.title || "Tanpa Judul"}
                            </div>
                            {report?.deskripsi && (
                              <small className="text-muted">
                                {report.deskripsi.length > 50 
                                  ? report.deskripsi.substring(0, 50) + "..." 
                                  : report.deskripsi}
                              </small>
                            )}
                          </td>
                          <td className="py-3">
                            <small className="text-muted">
                              {formatDate(report?.created_at || report?.tanggal || report?.date)}
                            </small>
                          </td>
                          <td className="py-3">
                            <span
                              className={`badge bg-${getStatusColor(
                                report?.status
                              )}`}
                            >
                              {report?.status || "Tidak Diketahui"}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                          <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewDetail(report)}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-5">
                          <i className="bi bi-inbox mb-3 d-block" style={{fontSize: '3rem'}}></i>
                          <div>Belum ada laporan</div>
                          <small className="text-muted">Laporan yang masuk akan ditampilkan di sini</small>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ModalDetailRiwayat 
        show={showModal} 
        laporan={selectedReport} 
        onHide={handleCloseModal} 
      />
    </div>
  );
};



// Helper untuk warna status
const getStatusColor = (status) => {
  if (!status) return "secondary";

  const normalized = status.toLowerCase();

  switch (normalized) {
    case "dalam proses":
      return "info";
    case "perlu ditinjau":
      return "warning";
    case "selesai":
      return "success";
    case "ditolak":
      return "danger";
    default:
      return "secondary";
  }
};

export default AdminDashboard;