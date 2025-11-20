// src/components/Modals/CloseEventConfirmationModal.tsx

import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'; // 👈 Importation de useNavigate

interface CloseEventConfirmationModalProps {
  show: boolean;
  eventName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const CloseEventConfirmationModal = ({
  show,
  eventName,
  onClose,
  onConfirm,
}: CloseEventConfirmationModalProps) => {
  const navigate = useNavigate(); // 👈 Initialisation du hook de navigation

  const [confirmationInput, setConfirmationInput] = useState('');
  const requiredConfirmationText = `close event ${eventName}`;

  // Gestion de la classe 'modal-open' pour bloquer le défilement du body
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      setConfirmationInput(''); 
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);


  if (!show) return null;

  const isConfirmationValid = confirmationInput.trim() === requiredConfirmationText;

  const handleConfirmClick = () => {
    if (isConfirmationValid) {
      // 1. Exécuter l'action de confirmation (fermeture de la modal/appel API)
      onConfirm();
      
      // 2. Naviguer vers /event après l'action
      navigate('/event'); // 👈 Ajout de la navigation
    }
  };

  const MODAL_BACKDROP_ZINDEX = 1040;
  const MODAL_ZINDEX = 1050; 

  // Le contenu de la modal que nous allons téléporter
  const modalContent = (
    <>
      {/* Background overlay */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: MODAL_BACKDROP_ZINDEX }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="modal d-block"
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: MODAL_ZINDEX }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">⚠️ Confirm Event Closure</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
            {/* Body */}
            <div className="modal-body">
              <p>
                This action will **permanently close the attendance session** for the event: 
                <strong> {eventName}</strong>. Participants will no longer be able to scan their presence.
              </p>
              <p className="fw-bold text-danger">
                To confirm, please type the following phrase exactly as it appears:
              </p>
              <p className="p-2 border border-danger bg-light text-monospace">
                **{requiredConfirmationText}**
              </p>
              
              <div className="form-group mt-3">
                <label htmlFor="confirmationInput" className="form-label">Type confirmation phrase:</label>
                <input
                  id="confirmationInput"
                  type="text"
                  className={`form-control ${!isConfirmationValid && confirmationInput.length > 0 ? 'is-invalid' : ''}`}
                  value={confirmationInput}
                  onChange={(e) => setConfirmationInput(e.target.value)}
                  placeholder={requiredConfirmationText}
                />
              </div>
            </div>
            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleConfirmClick}
                disabled={!isConfirmationValid} 
              >
                Close Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};