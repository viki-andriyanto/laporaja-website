import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Form, InputGroup, Card, Badge } from 'react-bootstrap';
import Header from "../../shared/header";
import Footer from "../../shared/footer";

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
        status: "progress",
        hasMedia: true,
    },
    {
        id: "RPT-2024-001",
        title: "Jalan Rusak di Depan Sekolah",
        category: "lingkungan",
        location: "Jl. Sudirman No. 123, Jakarta",
        description:
            "Terdapat lubang besar di jalan yang sangat berbahaya bagi pengendara motor. Sudah beberapa kali terjadi kecelakaan di lokasi ini.",
        date: "2024-05-20",
        status: "pending",
        hasMedia: true,
    },
];

const statusLabels = {
    pending: "Menunggu",
    progress: "Diproses",
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
                        <Button className="w-100" onClick={() => alert("Form laporan baru")}>➕ Buat Laporan Baru</Button>
                    </Col>
                </Row>

                <Row>
                    {filteredReports.length === 0 ? (
                        <Col className="text-center text-muted py-5">
                            <div style={{ fontSize: "3rem" }}>📋</div>
                            <h4 className="mt-3">Tidak ada laporan</h4>
                            <p>Belum ada laporan yang sesuai dengan kriteria pencarian Anda.</p>
                        </Col>
                    ) : (
                        filteredReports.map((report) => (
                            <Col md={6} lg={4} key={report.id} className="mb-4">
                                <Card onClick={() => alert(`Detail laporan: ${report.title}`)}>
                                    <Card.Header className="bg-primary text-white">
                                        <small>{report.id}</small>
                                        <h5 className="mt-2">{report.title}</h5>
                                        <small>📅 {formatDate(report.date)}</small>
                                    </Card.Header>
                                    <Card.Body>
                                        <Badge bg="info" className="mb-2">
                                            {categoryLabels[report.category]}
                                        </Badge>
                                        <p className="text-muted">📍 {report.location}</p>
                                        <p>{report.description.substring(0, 100)}...</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Badge bg="secondary">{statusLabels[report.status]}</Badge>
                                            {report.hasMedia && <span style={{ color: "#0d6efd" }}>📎 Media</span>}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            <Footer />
        </>

    );

}


