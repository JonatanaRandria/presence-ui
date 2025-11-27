// Fichier: ./LaunchAttendance.tsx

import React, { useState } from "react";
import { format } from "date-fns";
import type { EventToList } from "@/features/event/types";
import { useNavigate } from 'react-router-dom'; 

import { useActivateAttendance } from '../hooks/useActivateAttendance'; 
import { AttendanceCodeDisplayModal } from '@/features/attendance/components/AttendanceCodeDisplayModal';

// --- INTERFACES (pour la complétude) ---
interface LaunchAttendanceProps {
  post: EventToList;
  show: boolean;
  onClose: () => void;
}

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    loading: boolean;
    error: string | null;
}
// ----------------------------------------

// NOTE: Placeholder pour votre librairie de toasts (à remplacer par toast.success)
const showToastSuccess = (message: string) => {
    console.log(`TOAST SUCCESS: ${message}`);
    // Ex: toast.success(message);
};

export const LaunchAttendance = ({
  post,
  show,
  onClose,
}: LaunchAttendanceProps) => {
  const navigate = useNavigate(); 
  
  const { activateAttendance, isActivating, activationError } = useActivateAttendance();
  
  // État pour la deuxième modal
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [eventCode, setEventCode] = useState<number | null>(null);

  const [geolocationState, setGeolocationState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  // 🛑 CORRECTION ICI : Reste monté si l'une ou l'autre des modals doit être affichée
  if (!show && !showCodeModal) return null;

  const formattedStart = format(new Date(post.start_datetime), "dd MMM yyyy HH:mm");
  const formattedEnd = format(new Date(post.end_datetime), "dd MMM yyyy HH:mm");

  const getPosition = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported by your browser.");
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            reject, 
            { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0 
        });
    });
  };
  
  // 🚀 NOUVELLE FONCTION: Gère la fermeture complète et la réinitialisation des états
  const handleFinalClose = () => {
      setShowCodeModal(false); // Cache la modal de code
      setEventCode(null); // Réinitialise le code
      onClose(); // Ferme le composant parent
  };


  const handleConfirmAndNavigate = async () => {
    setGeolocationState({ 
        latitude: null, 
        longitude: null, 
        loading: true, 
        error: null 
    });

    try {
        // 1. OBTENIR LA GÉOLOCALISATION
        const position = await getPosition();
        const { latitude, longitude } = position;

        // Mise à jour de l'état local après succès de la géolocalisation
        setGeolocationState({ 
            latitude, 
            longitude, 
            loading: false, 
            error: null 
        });

        // 2. APPELER L'API D'ACTIVATION
        const result = await activateAttendance(post.id, latitude, longitude);
        
        // 3. FLUX DE SUCCÈS AUTOMATIQUE
        if (result?.event_code) {
            
            // 3a. Afficher le Toast
            showToastSuccess("Session de présence activée avec succès. Le code est prêt.");
            
            // 3b. Mettre à jour l'état et ouvrir la deuxième modal, déclenchant la transition automatique
            setEventCode(result.event_code);
            setShowCodeModal(true); 
            
            // 🛑 NE PAS APPELER onClose() ici. La transition est gérée par le rendu conditionnel.
        } else {
            throw new Error("Activation réussie, mais aucun code d'événement reçu de l'API.");
        }

    } catch (error) {
        let finalError = "Une erreur inconnue est survenue lors du processus.";

        if (error instanceof GeolocationPositionError) {
            finalError = error.code === error.PERMISSION_DENIED 
                ? "Accès à la localisation refusé par l'utilisateur. La session de présence ne peut pas démarrer." 
                : "Impossible d'obtenir la localisation. Veuillez vérifier vos paramètres.";
        } else if (typeof error === 'string') {
            finalError = error;
        } else if (error instanceof Error) {
            finalError = error.message; 
        }
        
        setGeolocationState({ 
            latitude: null, 
            longitude: null, 
            loading: false, 
            error: finalError 
        });
    }
  };

  const isButtonDisabled = geolocationState.loading || isActivating;
  const displayError = activationError || geolocationState.error;
  
  return (
    <>
      {/* Première Modal: Lancement et Géolocalisation */}
      {/* 🛑 NE RENDRE CELA QUE SI LA PREMIÈRE MODAL DOIT ÊTRE AFFICHEE */}
      {show && !showCodeModal && (
        <>
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
                onClick={onClose} 
            ></div>

            {/* Modal */}
            <div
                className="modal d-block"
                tabIndex={-1}
                role="dialog"
                style={{ zIndex: 1050 }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">Start Presence – {post.title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            {/* ... (Contenu du Body) ... */}
                            <p>
                                <strong>Start:</strong> {formattedStart}
                            </p>
                            <p>
                                <strong>End:</strong> {formattedEnd}
                            </p>
                            <p>
                                <strong>Location:</strong> {post.location_name ?? "No location provided"}
                            </p>
                            <hr />
                            
                            {(geolocationState.loading || isActivating) && (
                                <div className="alert alert-info d-flex align-items-center">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    **{geolocationState.loading ? "Acquisition de la position..." : "Activation de la session..."}**
                                </div>
                            )}
                            {displayError && (
                                <div className="alert alert-danger">
                                    ⚠️ **Erreur:** {displayError}
                                </div>
                            )}
                            {geolocationState.latitude && !isActivating && (
                                <div className="alert alert-success">
                                    ✅ **Position Obtenue.** Prêt à démarrer la présence.
                                </div>
                            )}

                            <p className="text-warning mt-3">
                                Confirmer démarrera la session de présence pour cet événement et vous redirigera vers la page de gestion. **La permission de localisation est obligatoire.**
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose} disabled={isButtonDisabled}>
                                Annuler
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleConfirmAndNavigate}
                                disabled={isButtonDisabled} 
                            >
                                {isActivating ? "Activation..." : (geolocationState.loading ? "Vérification de la Position..." : "Confirmer le début de la session de présence")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )}
      
      {/* Deuxième Modal: Affichage du Code (S'affiche automatiquement si eventCode est défini) */}
      {eventCode && (
          <AttendanceCodeDisplayModal
              show={showCodeModal}
              eventId={post.id}
              eventCode={eventCode}
              onClose={handleFinalClose} // Utilisation du gestionnaire de fermeture finale
          />
      )}
    </>
  );
};