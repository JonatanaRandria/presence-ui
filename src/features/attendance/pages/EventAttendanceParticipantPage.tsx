// src/pages/EventParticipantsPage.tsx

import { Head } from "@/components/Head/Head";
import { ContentLayout } from "@/layouts/ContentLayout";
import { PageSpinner } from "@/components/Element/Spinner/PageSpinner";
import { ErrorPageLayout } from "@/layouts/ErrorPageLayout";
import { ParticipantsList } from "../components/ParticipantList";
import { useEventParticipantsList } from "../hooks/useEventParticipantList";
import type { Participant } from "../hooks/useEventParticipantList";
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { DebouncedInputField } from "@/components/Form/DebouncedInputField"; 
// Import du hook pour les détails de l'événement
import { useEventDetails } from "@/features/event/hooks/useEventDetails";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalParticipants: number;
    participants: Participant[];
}

export const EventParticipantsPage = () => {
  const { id: eventId } = useParams<{ id: string }>(); 

  // 1. Récupération des détails de l'événement
  const { 
    event, 
    isLoading: isEventLoading, 
    error: eventError 
  } = useEventDetails();

  const [searchQuery, setSearchQuery] = useState('');

  // 2. Récupération de la liste des participants
  const { 
    data: participantsData, 
    isLoading: isParticipantsLoading,
    error: participantsError
  } = useEventParticipantsList(eventId!, 1, searchQuery); 

  // 3. Gestion des titres et des états de chargement/erreur
  const eventName = event?.title || 'Loading Event...';
  // Afficher le nom de l'événement ou un identifiant si le nom est manquant/en cours de chargement
  const pageHeaderTitle = `Event: ${eventName} - Participants`;

  // Combiner les états de chargement et d'erreur
  const combinedIsLoading = isEventLoading || isParticipantsLoading;
  const combinedError = eventError || participantsError;


  const handleDebouncedSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  const renderContent = () => {
    // Si l'un des chargements est VRAI, affiche le spinner
    if (combinedIsLoading) {
        return <PageSpinner />;
    }
    
    // Si une erreur est présente (détails de l'événement ou participants)
    if (!!combinedError) {
        return <ErrorPageLayout title="Error loading event data" message={combinedError} />;
    }
        
    // Si la liste est vide (participantsData est non-null mais la liste est vide)
    if (!participantsData?.participants.length) {
        const message = searchQuery 
          ? `No participants found matching "${searchQuery}".`
          : "Aucun participant pour cet événement."; 
        return <p className="mt-5 text-center text-body-secondary">{message}</p>;
    }
        
    // Si la liste contient des données
    return (
      <div className="mt-3">
        <ParticipantsList participants={participantsData.participants} />
        {/* Suppression du composant <Pagination /> */}
      </div>
    );
  };

  return (
    <>
      <Head title={pageHeaderTitle} />
      <ContentLayout title={pageHeaderTitle}>
      <div 
            
            className="sticky-top bg-white shadow-sm pt-3 pb-3 border-bottom"
            style={{ top: '0', zIndex: 1020 }} 
        >
          <DebouncedInputField
            label="Search"
            placeholder="Search by full name, matricule, or job..."
            defaultValue={searchQuery}
            onDebouncedChange={handleDebouncedSearchChange}
          />
        </div>
        {renderContent()}
      </ContentLayout>
    </>
  );
};