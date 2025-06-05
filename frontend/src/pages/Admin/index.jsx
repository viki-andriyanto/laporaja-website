import React from "react";
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
  // Data dummy
  const reports = [
    {
      title: "Perbaikan Saluran Air",
      date: "25-06-2025",
      status: "Dalam Proses",
    },

    {
      title: "Laporan kerusakan jalan di Jalan Merdeka",
      date: "12-01-2025",
      status: "Dalam Proses",
    },

    {
      title: "Pengaduan sampah menumpuk di RT 05",
      date: "13-01-2025",
      status: "Perlu Ditinjau",
    },

    {
      title: "Kurangnya Rambu Lalu Lintas",
      date: "03-07-2025",
      status: "Perlu Ditinjau",
    },

    {
      title: "Laporan fasilitas taman rusak",
      date: "15-01-2025",
      status: "Selesai",
    },

    {
      title: "Perbaikan Trotoar Jln.Urip",
      date: "05-07-2025",
      status: "Selesai",
    },

    { 
      title: "Pipa Air Bocor", 
      date: "06-07-2025", 
      status: "Selesai" 
    },
    
    {
      title: "Permohonan perbaikan drainase di komplek Permai",
      date: "14-01-2025",
      status: "Ditolak",
    },

    {
      title: "Permohonan pemasangan rambu lalu lintas",
      date: "17-01-2025",
      status: "Ditolak",
    },
  ];

  // Hitung statistik laporan
  const totalLaporan = reports.length;
  const laporanSelesai = reports.filter(
    (report) => report.status === "Selesai"
  ).length;
  const persentaseSelesai = ((laporanSelesai / totalLaporan) * 100).toFixed(0);

  // Data untuk grafik
  const statusCounts = reports.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Jumlah Laporan",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Dalam Proses
          "rgba(255, 206, 86, 0.7)", // Perlu Ditinjau
          "rgba(75, 192, 192, 0.7)", // Selesai
          "rgba(255, 99, 132, 0.7)", // Ditolak
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
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
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Selamat Datang, Rizal</h2>
            <div className="d-flex gap-3">
              <div className="bg-primary text-white p-2 rounded">
                <small>Total Laporan</small>
                <h3 className="mb-0">9</h3>
              </div>
              <div className="bg-success text-white p-2 rounded">
                <small>Pengguna</small>
                <h3 className="mb-0">12</h3>
              </div>
            </div>
          </div>

          {/* Statistik Utama */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card h-100">
                <div className="card-body">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Progress Laporan</h5>
                  <div className="progress mb-3" style={{ height: "30px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${persentaseSelesai}%` }}
                    >
                      {persentaseSelesai}%
                    </div>
                  </div>
                  <div className="list-group">
                    {Object.entries(statusCounts).map(([status, count]) => (
                      <div
                        key={status}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span
                          className={`badge bg-${getStatusColor(status)} me-2`}
                        >
                          &nbsp;
                        </span>
                        {status}
                        <span className="badge bg-primary rounded-pill">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laporan Terbaru */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Laporan Terbaru</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Judul Laporan</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index}>
                        <td>{report.title}</td>
                        <td>{report.date}</td>
                        <td>
                          <span
                            className={`badge bg-${getStatusColor(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper untuk warna status
const getStatusColor = (status) => {
  switch (status) {
    case "Dalam Proses":
      return "info";
    case "Perlu Ditinjau":
      return "warning";
    case "Selesai":
      return "success";
    case "Ditolak":
      return "danger";
    default:
      return "secondary";
  }
};

export default AdminDashboard;
