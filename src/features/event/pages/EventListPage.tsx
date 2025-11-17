import { Head } from "@/components/Head/Head"
import { EventList } from "../components/EventList"
import { ContentLayout } from "@/layouts/ContentLayout"

export const EventListpage = () =>{

    const defaultpost = [
        {
          "id": "8e16237e-d0a2-4b70-83e7-92164c3bafde",
          "createdBy": "a00bbe20-fa39-43cd-85a0-d57daea24843",
          "createdByFullName": "EmmaT Dupont",
          "title": "Conférence Cybersécurité 2025",
          "start_datetime": "2025-02-20T08:30:00Z",
          "end_datetime": "2025-02-20T17:00:00Z",
          "is_presence_active": true,
          "location_name": "Centre de Convention - Salle Horizon",
         
        },
        {
          "id": "b1f4c56a-3f70-4c1d-a7ef-7e5c2f3e9a11",
          "createdBy": "d12bfa90-2c31-4b12-9a1b-f9e3e8aab123",
          "createdByFullName": "Lucas M. Leroy",
          "title": "Atelier IA et Robotique",
          "start_datetime": "2025-03-05T09:00:00Z",
          "end_datetime": "2025-03-05T16:00:00Z",
          "is_presence_active": false,
          "location_name": "TechLab - Salle Innovation",
         
        },
        {
          "id": "c2d5e78b-4f90-4b22-b2cd-3e8f7f3d6e12",
          "createdBy": "e23cdb12-4a34-44cd-8a1b-d7f4e2a34567",
          "createdByFullName": "Sofia N. Rami",
          "title": "Séminaire Développement Durable",
          "start_datetime": "2025-04-10T10:00:00Z",
          "end_datetime": "2025-04-10T15:30:00Z",
          "is_presence_active": true,
          "location_name": "Université Centrale - Amphithéâtre B",
        
        },
        {
          "id": "d3e6f89c-5a12-4d33-9fcd-2f9e1c4b8a23",
          "createdBy": "f34edc23-5b45-4bde-9c2d-a9f4e3b67890",
          "createdByFullName": "Jean P. Martin",
          "title": "Webinaire FinTech Afrique",
          "start_datetime": "2025-05-15T14:00:00Z",
          "end_datetime": "2025-05-15T16:30:00Z",
          "is_presence_active": false,
          "location_name": "En ligne - Zoom",
        
        },
        {
          "id": "e4f7g90d-6b23-4e44-8abc-3g0h2i5j9k34",
          "createdBy": "g45fda34-6c56-4cde-8d3e-b2f5f4c78901",
          "createdByFullName": "Alice B. Moreau",
          "title": "Salon International des Startups",
          "start_datetime": "2025-06-20T09:30:00Z",
          "end_datetime": "2025-06-20T18:00:00Z",
          "is_presence_active": true,
          "location_name": "Parc des Expositions - Hall C",
      
        }
      ]

      const renderList = ()=>{
        return(
            <>
            <div className="mt-3">
                <EventList posts={defaultpost}/>
            </div>
            </>
        )
      }
      
      return (
        <>
          <Head title={'Events'} />
          <ContentLayout title={'Events'}>
            
            {renderList()}
          </ContentLayout>
   </> )
}