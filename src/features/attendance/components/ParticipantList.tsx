// src/features/events/components/ParticipantList.tsx

interface Participant {
    id: string;
    fullName: string;
    scannedBy: string;
    job: string;
  }
  
  interface ParticipantsListProps {
    participants: Participant[];
  }
  
  export const ParticipantsList = ({ participants }: ParticipantsListProps) => {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Registration Number</th> 
              <th>Full Name</th>
              <th>Scanned By</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.id}</td> 
                <td>{participant.fullName}</td>
                <td>{participant.scannedBy}</td>
                <td>{participant.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };