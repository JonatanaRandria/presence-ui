import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AttendanceCodeDisplayModalProps {
    show: boolean;
    eventId: string;
    eventCode: number;
    onClose: () => void;
}

export const AttendanceCodeDisplayModal = ({
    show,
    eventId,
    eventCode,
    onClose,
}: AttendanceCodeDisplayModalProps) => {
    const navigate = useNavigate();

    if (!show) return null;

    const handleGoToAttendees = () => {
        onClose(); // Fermer la modal
        // Redirection vers la liste des participants (route mockée)
        navigate(`/event/${eventId}/attendance`); 
    };

    return (
        <>
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
                onClick={onClose}
            ></div>
            <div
                className="modal d-block"
                tabIndex={-1}
                role="dialog"
                style={{ zIndex: 1050 }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">✅ Session Activée!</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body text-center">
                            <h4>Code de Présence de l'Événement</h4>
                            <p>Partagez ce code ou scannez le QR Code pour l'enregistrement des participants.</p>
                            
                            <div className="py-4 border border-success rounded my-3 bg-light">
                                <h3>
                                    <strong>{eventCode}</strong>
                                </h3>
                        
                            </div>
                            
                           

                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Fermer
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleGoToAttendees}
                            >
                                Liste des Participants
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};