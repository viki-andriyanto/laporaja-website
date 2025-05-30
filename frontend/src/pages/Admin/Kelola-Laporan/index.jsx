import React, { useState } from "react";
import { Table, Button, Modal, Form, Badge, Container, Row, Col } from "react-bootstrap";
import Header from "../../../shared/header";

// Data dummy
const laporanDummy = [
  {
    id: 1,
    tanggal: "12/1/2024",
    isi: "Lorem Ipsum Dolor si Amet",
    status: "SELESAI",
    komentar: "",
  },
  {
    id: 2,
    tanggal: "12/1/2024",
    isi: "Lorem Ipsum Dolor si Amet",
    status: "PERLU DITINJAU",
    komentar: "",
  },
  {
    id: 3,
    tanggal: "12/1/2024",
    isi: "Lorem Ipsum Dolor si Amet",
    status: "DITOLAK",
    komentar: "",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "SELESAI":
      return <Badge bg="success">SELESAI</Badge>;
    case "PERLU DITINJAU":
      return <Badge bg="warning" text="dark">PERLU DITINJAU</Badge>;
    case "DITOLAK":
      return <Badge bg="danger">DITOLAK</Badge>;
    default:
      return <Badge bg="secondary">{status}</Badge>;
  }
};

const ModalDetailLaporan = ({ show, laporan, onHide }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Detail Laporan</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h5>{laporan?.isi}</h5>
      <p className="text-muted mb-2">Tanggal: {laporan?.tanggal}</p>
      <Form.Group className="mb-3">
        <Form.Label>Isi Laporan</Form.Label>
        <Form.Control as="textarea" rows={3} value="isi laporan" readOnly />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger">Tolak Laporan</Button>
      <Button variant="success">Selesaikan</Button>
    </Modal.Footer>
  </Modal>
);

const KelolaLaporan = () => {
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (laporan) => {
    setSelectedLaporan(laporan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedLaporan(null);
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h2>Kelola Laporan</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Judul Laporan</th>
                  <th>Status</th>
                  <th>Komentar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {laporanDummy.map((laporan) => (
                  <tr key={laporan.id}>
                    <td>{laporan.tanggal}</td>
                    <td>{laporan.isi}</td>
                    <td>{getStatusBadge(laporan.status)}</td>
                    <td>
                      <Form.Control type="text" placeholder="Komentar..." />
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-1"
                        onClick={() => handleShowModal(laporan)}
                        title="Detail"
                      >
                        🔍
                      </Button>
                      <Button variant="outline-success" size="sm" className="me-1" title="Selesaikan">
                        ✅
                      </Button>
                      <Button variant="outline-danger" size="sm" title="Tolak">
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button variant="outline-secondary">Kembali</Button>
          </Col>
        </Row>

        <ModalDetailLaporan
          show={showModal}
          laporan={selectedLaporan}
          onHide={handleCloseModal}
        />
      </Container>
    </>
  );
};

export default KelolaLaporan;