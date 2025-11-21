// Fichier: '@/features/attendance/components/CloseEventConfirmationModal.tsx'

import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

interface CloseEventConfirmationModalProps {
  show: boolean;
  eventName: string; // <-- Nom dynamique de l'événement
  onClose: () => void;
  onConfirm: () => Promise<void>; 
  isProcessing: boolean;
  apiError: string | null;
}

export const CloseEventConfirmationModal = ({
  show,
  eventName,
  onClose,
  onConfirm,
  isProcessing,
  apiError,
}: CloseEventConfirmationModalProps) => {
  const [confirmationInput, setConfirmationInput] = useState('');
  
  // La phrase de confirmation est dynamique
  const requiredConfirmationText = `close event ${eventName}`; 

  useEffect(() => {
// ... (omitted for brevity, same as before) ...
  }, [show]);


  if (!show) return null;

  const isConfirmationValid = confirmationInput.trim() === requiredConfirmationText;

  const handleConfirmClick = () => {
    if (isConfirmationValid) {
      onConfirm(); 
    }
  };
// ... (omitted modal z-index variables) ...
 
  const modalContent = (
    <>
      {/* Background overlay */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="modal d-block"
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: 1050 }}
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
                disabled={isProcessing}
              ></button>
            </div>
            {/* Body */}
            <div className="modal-body">
              <p>
                This action will **permanently close the attendance session** for the event: 
                <strong> {eventName}</strong>. Participants will no longer be able to scan their presence.
              </p>
              
              {apiError && (
                <div className="alert alert-danger" role="alert">
                    <strong>API Error:</strong> {apiError}
                </div>
              )}

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
                  disabled={isProcessing}
                />
              </div>
            </div>
            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleConfirmClick}
                disabled={!isConfirmationValid || isProcessing}
              >
                {isProcessing ? 'Closing...' : 'Close Event'}
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