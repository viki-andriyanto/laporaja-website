import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { Check2, X, Trash, Eye, ClipboardData } from "react-bootstrap-icons";
import Sidebar from "../../../shared/sidebar";
import { isValid, parseISO, format } from "date-fns";
import {
  getAllRiwayat,
  updateRiwayat,
  deleteRiwayat,
} from "../../../_services/riwayat-laporan";
import ModalDetailRiwayat from "../../../shared/ModalDetailRiwayat";

/* -------------------------------------------------------------------------- */
/*  Helper util & constant                                                     */
/* -------------------------------------------------------------------------- */

const STATUS_OPTIONS = [
  { key: "perlu ditinjau", label: "Tinjau", variant: "warning" },
  { key: "dalam proses", label: "Proses", variant: "info" },
  { key: "selesai", label: "Selesai", variant: "success" },
  { key: "ditolak", label: "Tolak", variant: "danger" },
];

const getStatusBadge = (st) => {
  const opt = STATUS_OPTIONS.find((s) => s.key === st);
  return <Badge bg={opt?.variant ?? "secondary"}>{st.toUpperCase()}</Badge>;
};

const formatTanggal = (t) => {
  if (!t) return "-";
  const safe = t.includes("T") ? t : t.replace(" ", "T");
  const d = parseISO(safe);
  return isValid(d) ? format(d, "dd/MM/yyyy HH:mm") : "-";
};



/* -------------------------------------------------------------------------- */
/*  Halaman utama                                                              */
/* -------------------------------------------------------------------------- */

const ModalKonfirmasiHapus = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>Konfirmasi Hapus</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="fs-5 fw-semibold">Yakin nih mau dihapus datanya?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Hapus Sekarang
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const KelolaLaporan = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [riwayatData, setRiwayatData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  /* -------------------------- fetch data awal --------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login dulu.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const list = await getAllRiwayat();
        setRiwayatData(list);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  /* -------------------------- handler util ------------------------------ */
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleStatusChange = async (id, status, komentar) => {
    try {
      await updateRiwayat(id, { status, komentar });
      setRiwayatData((prev) =>
        prev.map((it) =>
          it.riwayat_id === id ? { ...it, status, komentar } : it
        )
      );
      if (selectedItem?.riwayat_id === id) {
        setSelectedItem((s) => ({ ...s, status, komentar }));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui status.");
    }
  };

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteRiwayat(idToDelete);
      setRiwayatData((prev) =>
        prev.filter((it) => it.riwayat_id !== idToDelete)
      );
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data.");
    } finally {
      setShowDeleteModal(false);
      setIdToDelete(null);
    }
  };

  /* -------------------------- filter & paging --------------------------- */
  const filtered = riwayatData.filter((it) =>
    [it.judul, it.status, it.jenis, it.created_at]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  /* -------------------------- render ----------------------------------- */
    // Loading state
    if (loading) {
      return (
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-3 text-muted">Memuat Data Laporan & Surat...</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*  Halaman utama (potongan render)                                            */
  /* -------------------------------------------------------------------------- */

  const totalAll = riwayatData.length; // keseluruhan
  const totalFiltered = filtered.length; // setelah disaring search

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        {/* ----------------------------- MAIN -------------------------------- */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {/* ======= Header besar (tetap) ======= */}
          <div className="d-flex align-items-center gap-2 border-bottom mb-4">
            <i className="bi bi-clock-fill fs-3" />
            <h1 className="h2 mb-0">Kelola Riwayat Laporan &amp; Surat</h1>
          </div>

          {/* ======= Kotak Cari + Total ======= */}
          <div className="card shadow-sm mb-3">
            <div className="card-body py-3">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                {/* Search input */}
                <div className="flex-grow-1">
                  <Form.Control
                    type="search"
                    placeholder="Cari laporan, status, tanggal…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Kotak total */}
                <div className="d-flex align-items-center bg-primary text-white rounded px-3 py-2 shadow-sm">
                  <ClipboardData className="me-2" />
                  <span className="fw-semibold">
                    Total:&nbsp;{totalFiltered}&nbsp;dari&nbsp;{totalAll}
                    &nbsp;laporan masuk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======= Tabel ======= */}
          <div className="card shadow-sm">
            <div className="card-body table-responsive rounded px-3 py-2">
              <Table hover>
                <thead className="table-dark rounded px-3 py-2">
                  <tr>
                    <th>Tanggal</th>
                    <th>Jenis</th>
                    <th>Judul</th>
                    <th>Status</th>
                    <th>Komentar</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.length ? (
                    currentItems.map((it) => (
                      <tr key={it.riwayat_id}>
                        <td>{formatTanggal(it.created_at)}</td>

                        <td>
                          <Badge
                            bg={it.jenis === "laporan" ? "info" : "success"}
                          >
                            {it.jenis.toUpperCase()}
                          </Badge>
                        </td>

                        <td>{it.judul}</td>
                        <td>{getStatusBadge(it.status)}</td>

                        <td>
                          <Form.Control
                            size="sm"
                            value={it.komentar || ""}
                            placeholder="Komentar…"
                            onChange={(e) =>
                              handleStatusChange(
                                it.riwayat_id,
                                it.status,
                                e.target.value
                              )
                            }
                          />
                        </td>

                        <td className="text-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => openModal(it)}
                            title="Detail"
                          >
                            <Eye />
                          </Button>

                          <Button
                            variant="outline-success"
                            size="sm"
                            className="me-1"
                            title="Selesai"
                            onClick={() =>
                              handleStatusChange(
                                it.riwayat_id,
                                "selesai",
                                it.komentar
                              )
                            }
                          >
                            <Check2 />
                          </Button>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-1"
                            title="Tolak"
                            onClick={() =>
                              handleStatusChange(
                                it.riwayat_id,
                                "ditolak",
                                it.komentar
                              )
                            }
                          >
                            <X />
                          </Button>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            title="Hapus"
                            onClick={() => confirmDelete(it.riwayat_id)}
                          >
                            <Trash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="bi bi-clock-history me-2 text-center py-4"
                      >
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* ======= Pagination ======= */}
              {totalPages > 1 && (
                <nav className="d-flex justify-content-center">
                  <ul className="pagination mb-0">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <li
                          key={n}
                          className={`page-item ${
                            n === currentPage && "active"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(n)}
                          >
                            {n}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>

          {/* Modal untuk konfirmasi hapus */}
          <ModalKonfirmasiHapus
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirmed}
          />

        </main>
      </div>

      {/* -- Modal detail -- */}
      <ModalDetailRiwayat
        show={showModal}
        item={selectedItem}
        onHide={() => setShowModal(false)}
        onUpdate={handleStatusChange}
        isAdmin={true}
      />
      
    </div>
  );
};

export default KelolaLaporan;