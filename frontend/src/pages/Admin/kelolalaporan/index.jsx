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
import { Check2, X, Trash, Eye } from "react-bootstrap-icons";
import Sidebar from "../../../shared/sidebar";
import { isValid, parseISO, format } from "date-fns";
import {
  getAllRiwayat,
  updateRiwayat,
  deleteRiwayat,
} from "../../../_services/riwayat-laporan";

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
/*  Modal detail                                                               */
/* -------------------------------------------------------------------------- */

const ModalDetailRiwayat = ({ show, item, onHide, onUpdate }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (item) {
      setComment(item.komentar ?? "");
    }
  }, [item]);

  if (!item) return null;

  const changeStatus = (status) => onUpdate(item.riwayat_id, status, comment);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Detail Riwayat • ID #{item.riwayat_id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Info ringkas */}
        <p className="mb-1">
          <strong>Tanggal:</strong> {formatTanggal(item.tanggal)}
        </p>
        <p className="mb-1">
          <strong>Jenis:</strong> {item.jenis_surat}
        </p>
        <p className="mb-3">
          <strong>Status:</strong> {getStatusBadge(item.status)}
        </p>

        {/* Judul & Deskripsi */}
        <h4 className="fw-bold">{item.judul_lapor}</h4>
        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={4}
            readOnly
            value={item.deskripsi || "-"}
          />
        </Form.Group>

        {/* Gambar (opsional) */}
        {item.gambar && (
          <div className="text-center mb-4">
            <Image
              src={`http://localhost:8000/storage/${item.gambar}`}
              fluid
              rounded
              style={{ maxHeight: 300 }}
            />
          </div>
        )}

        {/* Komentar admin */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Komentar Admin</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis komentar…"
          />
        </Form.Group>

        {/* Tombol ubah status */}
        <h6 className="fw-bold">Ubah Status</h6>
        <ButtonGroup className="flex-wrap gap-2">
          {STATUS_OPTIONS.map(({ key, label, variant }) => (
            <Button
              key={key}
              size="sm"
              variant={item.status === key ? variant : `outline-${variant}`}
              onClick={() => changeStatus(key)}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Modal.Body>

      <Modal.Footer>
        {/* aksi cepat ✔️ / ❌ */}
        <Button
          variant="success"
          onClick={() => changeStatus("selesai")}
          title="Tandai selesai"
        >
          <Check2 />
        </Button>
        <Button
          variant="danger"
          onClick={() => changeStatus("ditolak")}
          title="Tandai ditolak"
          className="me-auto"
        >
          <X />
        </Button>

        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/*  Halaman utama                                                              */
/* -------------------------------------------------------------------------- */

const KelolaLaporan = () => {
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

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus data ini?")) return;
    try {
      await deleteRiwayat(id);
      setRiwayatData((prev) => prev.filter((it) => it.riwayat_id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data.");
    }
  };

  /* -------------------------- filter & paging --------------------------- */
  const filtered = riwayatData.filter((it) =>
    [it.judul_lapor, it.status, it.jenis_surat, it.tanggal]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  /* -------------------------- render ----------------------------------- */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status" />
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

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        {/* -------------------------------- MAIN --------------------------- */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {/* header */}
          <div className="d-flex justify-content-between align-items-center border-bottom mb-4">
            <h2>Kelola Riwayat Laporan &amp; Surat</h2>
            <input
              className="form-control w-auto"
              placeholder="Cari…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* tabel */}
          <div className="card shadow-sm">
            <div className="card-body table-responsive">
              <Table hover>
                <thead className="table-dark">
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
                        <td>{formatTanggal(it.tanggal)}</td>
                        <td>
                          <Badge
                            bg={
                              it.jenis_surat === "laporan" ? "info" : "success"
                            }
                          >
                            {it.jenis_surat.toUpperCase()}
                          </Badge>
                        </td>
                        <td>{it.judul_lapor}</td>
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
                            onClick={() => handleDelete(it.riwayat_id)}
                          >
                            <Trash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* pagination sederhana */}
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

      {/* ── Modal detail ───────────────────────────────────────────── */}
      <ModalDetailRiwayat
        show={showModal}
        item={selectedItem}
        onHide={closeModal}
        onUpdate={handleStatusChange}
      />
    </div>
  );
};

export default KelolaLaporan;
