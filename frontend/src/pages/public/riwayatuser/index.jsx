import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, Modal } from 'react-bootstrap';
import Header from "../../../shared/header";
import Footer from "../../../shared/footer";
import { useNavigate } from "react-router";

// Data Dummy
const reportsData = [
    {
        id: "RPT-2024-001",
        title: "Jalan Rusak di Depan Sekolah",
        category: "infrastruktur",
        location: "Jl. Sudirman No. 123, Jakarta",
        description:
            "Terdapat lubang besar di jalan yang sangat berbahaya bagi pengendara motor. Sudah beberapa kali terjadi kecelakaan di lokasi ini.",
        date: "2024-05-20",
        status: "completed",
        hasMedia: true,
    },
    {
        id: "RPT-2024-002",
        title: "Sampah Menumpuk di Taman",
        category: "lingkungan",
        location: "Taman Kota Blok M, Jakarta",
        description:
            "Tumpukan sampah yang mengganggu pemandangan dan menimbulkan bau tak sedap. Diperlukan tindakan pembersihan segera.",
        date: "2024-05-21",
        status: "pending",
        hasMedia: true,
    },
];

const statusLabels = {
    pending: "Perlu Ditinjau",
    progress: "Dalam Proses",
    completed: "Selesai",
    rejected: "Ditolak",
};

const categoryLabels = {
    infrastruktur: "Infrastruktur",
    lingkungan: "Lingkungan",
    keamanan: "Keamanan",
    pelayanan: "Pelayanan Publik",
};

export default function RiwayatUser() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [filteredReports, setFilteredReports] = useState(reportsData);
    const navigate = useNavigate();

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Filter
    useEffect(() => {
        const filtered = reportsData.filter((report) => {
            const matchesSearch =
                report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.location.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                !categoryFilter || report.category === categoryFilter;
            const matchesStatus = !statusFilter || report.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
        setFilteredReports(filtered);
    }, [searchTerm, categoryFilter, statusFilter]);

    const renderStats = () => {
        const stats = reportsData.reduce(
            (acc, report) => {
                acc.total++;
                acc[report.status] = (acc[report.status] || 0) + 1;
                return acc;
            },
            { total: 0, pending: 0, progress: 0, completed: 0, rejected: 0 }
        );

        return (
            <Row className="text-center my-4">
                <Col><h5>Total Laporan</h5><h3>{stats.total}</h3></Col>
                <Col><h5>Menunggu</h5><h3>{stats.pending}</h3></Col>
                <Col><h5>Diproses</h5><h3>{stats.progress}</h3></Col>
                <Col><h5>Selesai</h5><h3>{stats.completed}</h3></Col>
            </Row>
        );
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const handleCardClick = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

    return (
        <>
            <Header />

            <Container className="my-5">
                {renderStats()}
                <Row className="my-4 align-items-end">
                    <Col md>
                        <Form.Group controlId="searchInput">
                            <Form.Label>Cari Laporan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ketik kata kunci..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="categoryFilter">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                {Object.entries(categoryLabels).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="statusFilter">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Semua Status</option>
                                {Object.entries(statusLabels).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Button className="w-100" style={{
                            background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 50%, #0dcaf0 100%)"
                        }} type="button" onClick={() => navigate("/Lapor")}> <i class="fa-solid fa-plus"></i> Buat Laporan Baru</Button>
                    </Col>
                </Row>

                <Row>
                    {filteredReports.length === 0 ? (
                        <Col className="text-center text-muted py-5">
                            <div style={{ fontSize: "3rem" }}><i class="fa-solid fa-inbox" style={{ color: "" }}></i> </div>
                            <h4 className="mt-3">Tidak ada laporan</h4>
                            <p>Belum ada laporan yang sesuai dengan kriteria pencarian Anda.</p>
                        </Col>
                    ) : (
                        filteredReports.map((report) => (
                            <Col md={6} lg={4} key={report.id} className="mb-4">
                                <Card onClick={() => handleCardClick(report)} style={{ cursor: "pointer" }}>
                                    <Card.Header
                                        className="text-white"
                                        style={{
                                            background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 50%, #0dcaf0 100%)"
                                        }}
                                    >
                                        <small>{report.id}</small>
                                        <h5 className="mt-2">{report.title}</h5>
                                        <small> <i className="fa-solid fa-calendar-days"></i> {formatDate(report.date)}</small>
                                    </Card.Header>
                                    <Card.Body>
                                        <Badge
                                            className="mb-2"
                                            style={{
                                                background: "linear-gradient(45deg, #0dcaf0 0%, #6f42c1 100%)",
                                                color: "white"
                                            }}
                                        >
                                            {categoryLabels[report.category]}
                                        </Badge>
                                        <p className="text-muted"> <i className="fa-solid fa-location-dot me-2" style={{ color: "#dc3545" }}></i> {report.location}</p>
                                        <p>{report.description.substring(0, 100)}...</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Badge
                                                style={{
                                                    background:
                                                        report.status === "progress"
                                                            ? "linear-gradient(45deg, #ffc107, #fd7e14)" // warna oranye untuk 'Diproses'
                                                            : report.status === "pending"
                                                                ? "linear-gradient(45deg, #6c757d, #adb5bd)" // abu-abu untuk 'Menunggu'
                                                                : report.status === "completed"
                                                                    ? "linear-gradient(45deg, #198754, #20c997)" // hijau untuk 'Selesai'
                                                                    : report.status === "rejected"
                                                                        ? "linear-gradient(45deg, #dc3545, #ff073a)" // merah untuk 'Ditolak'
                                                                        : "#6c757d",
                                                    color: "white"
                                                }}
                                            >
                                                {statusLabels[report.status]}
                                            </Badge>

                                            {report.hasMedia && (
                                                <span className="text-primary"
                                                >
                                                    <i class="fa-solid fa-paperclip"></i> Media
                                                </span>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            {/* Modal Detail Laporan */}
            {selectedReport && (
                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Modal.Header
                        closeButton
                        style={{
                            background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 50%, #0dcaf0 100%)",
                            color: "white",
                            border: "none"
                        }}
                    >
                        <Modal.Title style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                            {selectedReport.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: "2rem" }}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <strong style={{ color: "#6c757d" }}>ID Laporan:</strong>
                                    <div style={{
                                        background: "linear-gradient(45deg, #f8f9fa, #e9ecef)",
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        marginTop: "4px",
                                        fontFamily: "monospace"
                                    }}>
                                        {selectedReport.id}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <strong style={{ color: "#6c757d" }}>Tanggal:</strong>
                                    <div style={{ marginTop: "4px" }}>
                                        <i className="fa-solid fa-calendar-days me-2" style={{ color: "#0d6efd" }}></i>
                                        {formatDate(selectedReport.date)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <strong style={{ color: "#6c757d" }}>Kategori:</strong>
                                    <div style={{ marginTop: "8px" }}>
                                        <span
                                            className="badge"
                                            style={{
                                                background: "linear-gradient(45deg, #0dcaf0 0%, #6f42c1 100%)",
                                                color: "white",
                                                fontSize: "0.9rem",
                                                padding: "8px 16px",
                                                borderRadius: "12px"
                                            }}
                                        >
                                            {categoryLabels[selectedReport.category]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <strong style={{ color: "#6c757d" }}>Status:</strong>
                                    <div style={{ marginTop: "8px" }}>
                                        <span className="badge bg-secondary" style={{ fontSize: "0.9rem", padding: "8px 16px" }}>
                                            {statusLabels[selectedReport.status]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <strong style={{ color: "#6c757d" }}>Lokasi:</strong>
                            <div style={{ marginTop: "4px" }}>
                                <i className="fa-solid fa-location-dot me-2" style={{ color: "#dc3545" }}></i>
                                {selectedReport.location}
                            </div>
                        </div>

                        <div className="mb-3">
                            <strong style={{ color: "#6c757d" }}>Deskripsi:</strong>
                            <div style={{
                                marginTop: "8px",
                                padding: "16px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                border: "1px solid #e9ecef",
                                lineHeight: "1.6"
                            }}>
                                {selectedReport.description}
                            </div>
                        </div>

                        {selectedReport.hasMedia && (
                            <div className="mb-3">
                                <strong style={{ color: "#6c757d" }}>Media:</strong>
                                <div style={{
                                    marginTop: "8px",
                                    padding: "12px 16px",
                                    background: "linear-gradient(45deg, #e3f2fd, #f3e5f5)",
                                    borderRadius: "8px",
                                    border: "1px solid #bbdefb"
                                }}>
                                    <i
                                        className="fa-solid fa-file me-2"
                                        style={{
                                            background: "linear-gradient(45deg, #0d6efd, #6610f2)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text"
                                        }}
                                    ></i>
                                    Ada media terkait
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer style={{
                        background: "#f8f9fa",
                        border: "none",
                        padding: "1rem 2rem"
                    }}>
                        <Button
                            variant="secondary"
                            onClick={handleCloseModal}
                            style={{
                                background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
                                border: "none",
                                padding: "10px 24px",
                                borderRadius: "6px",
                                fontWeight: "500"
                            }}
                        >
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            <Footer />
        </>
    );
}
