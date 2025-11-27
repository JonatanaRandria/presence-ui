import { Head } from "@/components/Head/Head";
import { EventList } from "../components/EventList";
import { ContentLayout } from "@/layouts/ContentLayout";
import { PageSpinner } from "@/components/Element/Spinner/PageSpinner";
import { ErrorPageLayout } from "@/layouts/ErrorPageLayout";
import { DebouncedInputField } from "@/components/Form/DebouncedInputField";
import { useEventList } from "../hooks/useEventList";

export const EventListPage = () => {
  const { handleSearchChange, events, query, isLoading, error } = useEventList();

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <PageSpinner />;
      case !!error:
        return <ErrorPageLayout title="Error loading events" message={error} />;
      case !events.length:
        return <p className="mt-5 text-center text-body-secondary">No events found</p>;
      default:
        return (
          <div className="mt-3">
            <EventList posts={events} />
          </div>
        );
    }
  };

  return (
    <>
      <Head title="Events" />
      <ContentLayout title="Events">
      

        <div 
                    
                    className="sticky-top bg-white shadow-sm pt-3 pb-3 border-bottom"
                    style={{ top: '0', zIndex: 1020 }} 
                >
                  <DebouncedInputField
                            label="Search"
                            placeholder="Search events"
                            defaultValue={query}
                            onDebouncedChange={handleSearchChange}
                  />
                </div>
        {renderContent()}
      </ContentLayout>
    </>
  );
};
