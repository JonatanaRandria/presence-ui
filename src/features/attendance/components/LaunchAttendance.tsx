import React, { useState } from "react";
import { format } from "date-fns";
import type { EventToList } from "@/features/event/types";
import { useNavigate } from 'react-router-dom'; 

interface LaunchAttendanceProps {
  post: EventToList;
  show: boolean;
  onClose: () => void;
}

// Définition du type pour l'état de la géolocalisation
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
  
  // 1. État pour la géolocalisation
  const [geolocationState, setGeolocationState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  if (!show) return null;

  const formattedStart = format(new Date(post.start_datetime), "dd MMM yyyy HH:mm");
  const formattedEnd = format(new Date(post.end_datetime), "dd MMM yyyy HH:mm");

  // 2. Fonction pour obtenir la géolocalisation
  const getPosition = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported by your browser.");
        }
        // Demande de la position avec un timeout
        navigator.geolocation.getCurrentPosition(resolve, reject, { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0 
        });
    });
  };

  // 3. Modification de la fonction de confirmation
  const handleConfirmAndNavigate = async () => {
    // Réinitialiser les erreurs et démarrer le chargement
    setGeolocationState({ 
        latitude: null, 
        longitude: null, 
        loading: true, 
        error: null 
    });

    try {
        const position = await getPosition();
        
        const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };

        // Enregistrement des coordonnées (facultatif, mais utile pour l'affichage/débogage)
        setGeolocationState({ ...coords, loading: false, error: null });

        // TODO: Ici, vous devriez idéalement appeler l'API pour *vraiment* lancer la présence, 
        // en envoyant `coords` pour la vérification serveur.
        
        // Simuler la réussite de l'appel API
        
        // Succès : Fermeture du modal et navigation
        onClose(); 
        // NOTE: Si l'API nécessite les coordonnées dans l'URL/état de navigation, 
        // vous pourriez les passer ici :
        // navigate(`/event/${post.id}/attendance`, { state: { latitude: coords.latitude, longitude: coords.longitude } });
        navigate(`/event/${post.id}/attendance`); 

    } catch (error) {
        setGeolocationState({ 
            latitude: null, 
            longitude: null, 
            loading: false, 
            error: error instanceof GeolocationPositionError 
                ? (error.code === error.PERMISSION_DENIED ? "Access to location was denied by the user. Cannot start presence." : "Could not get location.")
                : (typeof error === 'string' ? error : "An unknown error occurred during geolocation.")
        });
        
        // Bloquer la navigation en cas d'échec
    }
  };

  const isButtonDisabled = geolocationState.loading;

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
              
              {/* Affichage du statut de la géolocalisation */}
              {geolocationState.loading && (
                <div className="alert alert-info d-flex align-items-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    **Getting your location...** (Required for verification)
                </div>
              )}
              {geolocationState.error && (
                <div className="alert alert-danger">
                    ⚠️ **Location Error:** {geolocationState.error}
                </div>
              )}
              {geolocationState.latitude && (
                <div className="alert alert-success">
                    ✅ **Location Obtained.** Ready to start presence.
                </div>
              )}

              <p className="text-warning mt-3">
                Confirming will start the attendance session for this event and redirect you to the attendance management page. **Location permission is mandatory.**
              </p>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose} disabled={geolocationState.loading}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleConfirmAndNavigate}
                disabled={isButtonDisabled} // Désactiver pendant le chargement de la géolocalisation
              >
                {geolocationState.loading ? "Checking Location..." : "Confirm Start Attendance Session"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};