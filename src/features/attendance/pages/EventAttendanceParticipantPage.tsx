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

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalParticipants: number;
    participants: Participant[];
}

export const EventParticipantsPage = () => {
  const { id: eventId } = useParams<{ id: string }>(); 

  // Suppression de l'état currentPage et de son gestionnaire
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: participantsData, 
    isLoading,
    error
  } = useEventParticipantsList(eventId!, 1, searchQuery); // Page est fixée à 1

  const eventIdDisplay = eventId || 'undefined';
  const pageHeaderTitle = `Event ID: ${eventIdDisplay} - Participants`;

  const handleDebouncedSearchChange = (value: string) => {
    // setCurrentPage(1); // Suppression de la réinitialisation de la page
    setSearchQuery(value);
  };
  
  // Suppression de handlePageChange

  const renderContent = () => {
    // Si isLoading est TRUE, le spinner s'affiche (cela devrait être transitoire)
    if (isLoading) {
        //         return <PageSpinner />;
    }
    
    // Si la requête a échoué (error est une string non vide)
    if (!!error) {
        return <ErrorPageLayout title="Error loading participants" message={error} />;
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