
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalMsg({ show, onClose }) {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>សូមស្វាគមន៍!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold fs-5">
          គេហទំព័រ​កំពុង​សាងសង់ (Site is under Construction).
        </p>
        <p className="text-muted">
          Thank you for visiting. Some features may be unavailable while we continue development.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          បិទ/Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
