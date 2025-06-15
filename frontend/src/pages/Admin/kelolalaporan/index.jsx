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
  deleteRiwayat,
  updateStatusRiwayat,
} from "../../../_services/riwayat-laporan";
import ModalDetailRiwayat from "../../../shared/ModalDetailRiwayat";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

const KelolaLaporan = () => {
  const [setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [riwayatData, setRiwayatData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentField, setActiveCommentField] = useState(null);
  const [commentValue, setCommentValue] = useState({});

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
        // Initialize comment values
        const initialComments = {};
        list.forEach(item => {
          initialComments[item.riwayat_id] = item.komentar || '';
        });
        setCommentValue(initialComments);
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
      // Check if the new comment is different from the current one
      const currentItem = riwayatData.find(item => item.riwayat_id === id);
      if (currentItem && currentItem.komentar === komentar && currentItem.status === status) {
        return; // No changes, don't update
      }
  
      await updateStatusRiwayat(id, { status, komentar });
  
      setRiwayatData(prev =>
        prev.map(item =>
          item.riwayat_id === id ? { ...item, status, komentar } : item
        )
      );
  
      if (selectedItem?.riwayat_id === id) {
        setSelectedItem(prev => ({ ...prev, status, komentar }));
      }
  
      MySwal.fire({
        title: "Berhasil!",
        text: "Perubahan berhasil disimpan",
        icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
      });

      setActiveCommentField(null); // Close the comment field after submit

    } catch (err) {
      console.error("Error updating:", err);
      MySwal.fire({
        title: "Gagal!",
        text: err.message || "Gagal menyimpan perubahan",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentValue(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const confirmCommentChange = (id, status) => {
    MySwal.fire({
      title: "Konfirmasi Perubahan",
      text: "Anda yakin ingin menyimpan perubahan komentar ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "btn btn-primary me-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusChange(id, status, commentValue[id]);
      }
    });
  };

  const handleCommentReset = (id, originalComment) => {
    setCommentValue(prev => ({
      ...prev,
      [id]: originalComment || ''
    }));
    setActiveCommentField(null);
  };

  

  const confirmStatusChange = (id, status, currentComment) => {
    const statusLabel = status === "selesai" ? "Selesai" : "Ditolak";
    const confirmButtonColor = status === "selesai" ? "success" : "danger";
    
    MySwal.fire({
      title: `Konfirmasi ${statusLabel}`,
      text: `Anda yakin ingin mengubah status laporan ini menjadi ${statusLabel.toLowerCase()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Ya, ${statusLabel}`,
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: `btn btn-${confirmButtonColor} me-2`,
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusChange(id, status, currentComment);
      }
    });
  };

  const confirmDelete = (id) => {
    setIdToDelete(id);

    MySwal.fire({
      title: "Konfirmasi Hapus",
      text: "Yakin nih mau dihapus datanya?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus Sekarang",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "btn btn-danger me-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirmed();
      }
    });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteRiwayat(idToDelete);

      // Show success notification
      await MySwal.fire({
        title: "Berhasil!",
        text: "Data berhasil dihapus.",
        icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
      });

      // Update state to remove the deleted item
      setRiwayatData((prev) =>
        prev.filter((it) => it.riwayat_id !== idToDelete)
      );
    } catch (err) {
      console.error(err);

      // Show error notification
      await MySwal.fire({
        title: "Gagal!",
        text: "Gagal menghapus data.",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    } finally {
      setShowDeleteModal(false);
      setIdToDelete(null);
    }
  };

  /* -------------------------- filter & paging --------------------------- */
  const filtered = riwayatData.filter((it) =>
    [
      it.judul,
      it.status,
      it.jenis,
      it.created_at,
      it.jenis === "laporan" && it.laporan?.kategori?.nama_kategori,
      it.jenis === "surat" && it.surat?.jenis_surat,
      it.deskripsi,
    ]
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
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <div className="text-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
                <p className="mt-3 text-muted">
                  Memuat Data Laporan & Surat...
                </p>
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
                          <div className="d-flex flex-column">
                            <Form.Control
                              size="sm"
                              value={commentValue[it.riwayat_id] || ""}
                              placeholder="Komentar…"
                              onChange={(e) => handleCommentChange(it.riwayat_id, e.target.value)}
                              onFocus={() => setActiveCommentField(it.riwayat_id)}
                            />
                            {activeCommentField === it.riwayat_id && (
                              <div className="d-flex justify-content-end gap-2 mt-2">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleCommentReset(it.riwayat_id, it.komentar)}
                                >
                                  Reset
                                </Button>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => confirmCommentChange(it.riwayat_id, it.status)}
                                >
                                  Kirim
                                </Button>
                              </div>
                            )}
                          </div>
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
                              confirmStatusChange(
                                it.riwayat_id, 
                                "selesai", 
                                commentValue[it.riwayat_id] || it.komentar
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
                              confirmStatusChange(
                                it.riwayat_id, 
                                "ditolak", 
                                commentValue[it.riwayat_id] || it.komentar
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