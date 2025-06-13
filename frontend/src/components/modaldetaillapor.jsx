import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalDetailLaporan({ show, handleClose, selectedReport }) {
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

    if (!selectedReport) return null;

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
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
                    onClick={handleClose}
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
    );
}
