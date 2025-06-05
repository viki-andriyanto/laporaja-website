import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import Sidebar from "../../../shared/sidebar"; // Sesuaikan path sidebar Anda

// Data dummy
const laporanDummy = [
  {
    id: 1,
    tanggal: "12/01/2025",
    isi: "Laporan kerusakan jalan di Jalan Merdeka",
    status: "DALAM PROSES",
    komentar: "Sedang diperbaiki oleh petugas",
    media: [
      "https://imgx.gridoto.com/crop/0x0:0x0/700x465/photo/2023/05/02/lampungjpg-20230502023313.jpg",
    ],
  },
  {
    id: 2,
    tanggal: "13/01/2025",
    isi: "Pengaduan sampah menumpuk di RT 05",
    status: "PERLU DITINJAU",
    komentar: "",
    media: [
      "https://th.bing.com/th/id/OIP.zej-qqKuvTr9A9SL1wDhlgHaFj?w=205&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    ],
  },
  {
    id: 3,
    tanggal: "14/01/2025",
    isi: "Permohonan perbaikan drainase di komplek Permai",
    status: "DITOLAK",
    komentar: "Tidak sesuai dengan wilayah kerja kami",
    media: [
      "https://th.bing.com/th/id/OIP.xFiqJH7MeoVP_MfSxaiFLwHaEK?w=317&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    ],
  },
  {
    id: 4,
    tanggal: "15/01/2025",
    isi: "Laporan fasilitas taman rusak",
    status: "SELESAI",
    komentar: "Sudah diperbaiki oleh petugas",
    media: [
      "https://akcdn.detik.net.id/community/media/visual/2018/02/18/8cbed52e-a643-457a-92a1-49c9de80ed4e.jpeg?w=700&q=90",
    ],
  },
  {
    id: 5,
    tanggal: "16/01/2025",
    isi: "Pengaduan kebisingan dari tempat usaha",
    status: "PERLU DITINJAU",
    komentar: "",
    media: [
      "https://i.ytimg.com/vi/185yAl-KJUg/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgVihHMA8=&rs=AOn4CLDc_OFWQYOnDsMHaJ2T2FhYZfulYQ",
    ],
  },
  {
    id: 6,
    tanggal: "17/01/2025",
    isi: "Permohonan pemasangan rambu lalu lintas",
    status: "DITOLAK",
    komentar: "Sudah ada rambu di lokasi tersebut",
    media: [
      "https://murtigading.bantulkab.go.id/assets/files/artikel/sedang_1561530174pemasangan%20rambu%20lalu%20lintas.jpeg",
    ],
  },
  {
    id: 7,
    tanggal: "25/06/2025",
    isi: "Perbaikan saluran air",
    status: "DALAM PROSES",
    komentar: "Sedang diperbaiki oleh petugas",
    media: [
      "https://jatimnow.com/po-content/uploads/202212/img-20221213-wa0004.jpg",
    ],
  },
  {
    id: 8,
    tanggal: "06/07/2025",
    isi: "Pipa Air Bocor",
    status: "SELESAI",
    komentar: "Sudah diperbaiki oleh petugas",
    media: [
      "https://th.bing.com/th/id/OIP.5Yvjwknoals9PoJhkWYswwHaE9?rs=1&pid=ImgDetMain",
    ],
  },
  {
    id: 9,
    tanggal: "05/07/2025",
    isi: "Perbaikan Trotoar Jln.Urip",
    status: "SELESAI",
    komentar: "Sudah diperbaiki oleh petugas",
    media: [
      "https://th.bing.com/th/id/OIP.bSENCKS_GgBIWskKu_Ij_wHaFM?w=245&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    ],
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "PERLU DITINJAU":
      return (
        <Badge bg="warning" className="p-2">
          PERLU DITINJAU
        </Badge>
      );
    case "DALAM PROSES":
      return (
        <Badge bg="info" className="p-2">
          DALAM PROSES
        </Badge>
      );
    case "SELESAI":
      return (
        <Badge bg="success" className="p-2">
          SELESAI
        </Badge>
      );
    case "DITOLAK":
      return (
        <Badge bg="danger" className="p-2">
          DITOLAK
        </Badge>
      );
    default:
      return (
        <Badge bg="secondary" className="p-2">
          {status}
        </Badge>
      );
  }
};

const ModalDetailLaporan = ({ show, laporan, onHide, handleStatusChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Detail Laporan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h4 className="fw-bold">{laporan?.isi}</h4>
          <p className="text-muted mb-3">Tanggal: {laporan?.tanggal}</p>

          <div className="mb-3">
            <h6 className="fw-bold">Status Laporan:</h6>
            <div className="d-flex flex-wrap gap-2">
              <Button
                variant={
                  laporan?.status === "PERLU DITINJAU"
                    ? "warning"
                    : "outline-warning"
                }
                onClick={() => handleStatusChange(laporan.id, "PERLU DITINJAU")}
              >
                Tinjau
              </Button>
              <Button
                variant={
                  laporan?.status === "DALAM PROSES" ? "info" : "outline-info"
                }
                onClick={() => handleStatusChange(laporan.id, "DALAM PROSES")}
              >
                Dalam Proses
              </Button>
              <Button
                variant={
                  laporan?.status === "SELESAI" ? "success" : "outline-success"
                }
                onClick={() => handleStatusChange(laporan.id, "SELESAI")}
              >
                Selesai
              </Button>
              <Button
                variant={
                  laporan?.status === "DITOLAK" ? "danger" : "outline-danger"
                }
                onClick={() => handleStatusChange(laporan.id, "DITOLAK")}
              >
                Tolak
              </Button>
            </div>
          </div>

          {/* Isi Laporan Lengkap */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={laporan?.isi}
              readOnly
              className="bg-light"
            />
          </Form.Group>

          {/* Media yang disubmit pengguna */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Media</Form.Label>
            {laporan?.media && laporan.media.length > 0 ? (
              <div className="media-gallery">
                {/* Gambar utama */}
                <div className="mb-3 text-center">
                  <Image
                    src={laporan.media[activeIndex]}
                    alt={`Media ${activeIndex + 1}`}
                    fluid
                    className="rounded"
                    style={{ maxHeight: "300px" }}
                  />
                </div>

                {/* Thumbnail untuk navigasi */}
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {laporan.media.map((media, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => setActiveIndex(index)}
                      style={{
                        cursor: "pointer",
                        border:
                          activeIndex === index
                            ? "3px solid #0d6efd"
                            : "1px solid #dee2e6",
                      }}
                    >
                      <Image
                        src={media}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={60}
                        className="object-fit-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-3 bg-light rounded">
                <i className="bi bi-image fs-1 text-muted"></i>
                <p className="mt-2 mb-0">Tidak ada media yang disertakan</p>
              </div>
            )}
          </Form.Group>

          {/* Komentar */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tulis komentar untuk laporan ini..."
              defaultValue={laporan?.komentar || ""}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
        <Button variant="primary" onClick={onHide}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const KelolaLaporan = () => {
  const [laporan, setLaporan] = useState([]);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Simulasi pengambilan data dari API
    setLaporan(laporanDummy);
  }, []);

  const handleShowModal = (laporan) => {
    setSelectedLaporan(laporan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (id, status) => {
    const updatedLaporan = laporan.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setLaporan(updatedLaporan);

    // Update juga laporan yang sedang dilihat di modal
    if (selectedLaporan && selectedLaporan.id === id) {
      setSelectedLaporan({ ...selectedLaporan, status });
    }
  };

  const handleCommentChange = (id, comment) => {
    const updatedLaporan = laporan.map((item) =>
      item.id === id ? { ...item, komentar: comment } : item
    );
    setLaporan(updatedLaporan);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      const updatedLaporan = laporan.filter((item) => item.id !== id);
      setLaporan(updatedLaporan);
    }
  };

  // Filter laporan berdasarkan pencarian
  const filteredLaporan = laporan.filter(
    (item) =>
      item.isi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLaporan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLaporan.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
            <h1 className="h2">Kelola Laporan</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari laporan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-dark">
                    <tr className="bg-light">
                      <th width="15%">Tanggal</th>
                      <th width="30%">Judul Laporan</th>
                      <th width="15%">Status</th>
                      <th width="25%">Komentar</th>
                      <th width="15%" className="text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.tanggal}</td>
                          <td>
                            <div className="fw-semibold">
                              {item.isi.substring(0, 30)}...
                            </div>
                          </td>
                          <td>{getStatusBadge(item.status)}</td>
                          <td>
                            <Form.Control
                              type="text"
                              value={item.komentar}
                              onChange={(e) =>
                                handleCommentChange(item.id, e.target.value)
                              }
                              placeholder="Tulis komentar..."
                              className="form-control-sm"
                            />
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleShowModal(item)}
                              title="Detail"
                            >
                              <i className="bi bi-eye"></i>
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="me-1"
                              title="Selesaikan"
                              onClick={() =>
                                handleStatusChange(item.id, "SELESAI")
                              }
                            >
                              <i className="bi bi-check-lg"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Hapus"
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <div className="text-muted">
                            <i
                              className="bi bi-inbox"
                              style={{ fontSize: "3rem" }}
                            ></i>
                            <p className="mt-2">
                              Tidak ada laporan yang ditemukan
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredLaporan.length > itemsPerPage && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted">
                    Menampilkan{" "}
                    {Math.min(indexOfFirstItem + 1, filteredLaporan.length)} -
                    {Math.min(indexOfLastItem, filteredLaporan.length)} dari{" "}
                    {filteredLaporan.length} laporan
                  </div>
                  <nav>
                    <ul className="pagination mb-0">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          &laquo;
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <li
                            key={number}
                            className={`page-item ${
                              currentPage === number ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(number)}
                            >
                              {number}
                            </button>
                          </li>
                        )
                      )}

                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ModalDetailLaporan
        show={showModal}
        laporan={selectedLaporan}
        onHide={handleCloseModal}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default KelolaLaporan;
