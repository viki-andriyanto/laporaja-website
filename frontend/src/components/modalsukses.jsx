import React from "react";

export default function ModalSukses({ show, onClose, message, onNavigate }) {
    if (!show) return null;

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1050
            }}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
                <div className="modal-content border-0 shadow rounded-4 px-4 pt-4 pb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="text-success fw-bold mb-0">
                            <i className="fa-solid fa-circle-check me-2"></i>
                            Berhasil
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center pt-0">
                        <p className="fs-5 mb-4">{message}</p>

                        <div className="d-flex justify-content-center gap-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={onClose}
                            >
                                Tutup
                            </button>
                            <button
                                type="button"
                                className="btn btn-success px-4"
                                onClick={onNavigate}
                            >
                                Lihat Riwayat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
