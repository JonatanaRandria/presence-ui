import { Head } from "@/components/Head/Head";
import { ContentLayout } from "@/layouts/ContentLayout";
import { PageSpinner } from "@/components/Element/Spinner/PageSpinner";
import { ErrorPageLayout } from "@/layouts/ErrorPageLayout";
import { ParticipantsList } from "../components/ParticipantList";
import { useEventParticipantsList } from "../hooks/useEventParticipantList";
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { DebouncedInputField } from "@/components/Form/DebouncedInputField"; 
// Importez Pagination si vous l'implémentez

interface Participant {
  id: string; 
  fullName: string;
  scannedBy: string;
  job: string;
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalParticipants: number;
    participants: Participant[];
}

export const EventParticipantsPage = () => {
  const { id: eventId } = useParams<{ id: string }>(); 

  const [currentPage, setCurrentPage] = useState(1); 
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: participantsData, 
    isLoading,
    error
  } = useEventParticipantsList(eventId!, currentPage, searchQuery);

  const eventIdDisplay = eventId || 'undefined';
  const pageHeaderTitle = `Event ID: ${eventIdDisplay} - Participants`;

  const handleDebouncedSearchChange = (value: string) => {
    setCurrentPage(1); 
    setSearchQuery(value);
  };

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <PageSpinner />;
        
      case !!error:
        return <ErrorPageLayout title="Error loading participants" message={error} />;
        
      case !participantsData?.participants.length:
        const message = searchQuery 
          ? `No participants found matching "${searchQuery}".`
          : "No participants found for this event.";
        return <p className="mt-5 text-center text-body-secondary">{message}</p>;
        
      default:
        return (
          <div className="mt-3">
            <ParticipantsList participants={participantsData.participants} />
            {/* <Pagination 
                 currentPage={participantsData.currentPage}
                 totalPages={participantsData.totalPages}
                 onPageChange={setCurrentPage} 
            /> */}
          </div>
        );
    }
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