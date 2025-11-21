import React, { useState } from "react";
import { format } from "date-fns";
import type { EventToList } from "@/features/event/types";
import { useNavigate } from 'react-router-dom'; 

// Import du hook d'activation de la présence
import { useActivateAttendance } from '../hooks/useActivateAttendance'; 

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

export const LaunchAttendance = ({
  post,
  show,
  onClose,
}: LaunchAttendanceProps) => {
  const navigate = useNavigate(); 
  
  // Utilisation du hook d'activation
  const { activateAttendance, isActivating, activationError } = useActivateAttendance();

  const [geolocationState, setGeolocationState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  if (!show) return null;

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
        await activateAttendance(post.id, latitude, longitude);
        
        // 3. SUCCÈS : Fermer le modal et naviguer
        onClose(); 
        navigate(`/event/${post.id}/attendance`); 

    } catch (error) {
        let finalError = "Une erreur inconnue est survenue lors du processus.";

        if (error instanceof GeolocationPositionError) {
            finalError = error.code === error.PERMISSION_DENIED 
                ? "Accès à la localisation refusé par l'utilisateur. La session de présence ne peut pas démarrer." 
                : "Impossible d'obtenir la localisation. Veuillez vérifier vos paramètres.";
        } else if (typeof error === 'string') {
            finalError = error; // Erreur personnalisée de `getPosition`
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
  );
};