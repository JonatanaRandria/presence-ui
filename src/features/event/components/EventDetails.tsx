import { format } from 'date-fns';
import type { EventToList } from "../types";

interface _EventDetailsProps {
  post: EventToList;
}

export const EventDetails = ({ post }: _EventDetailsProps) => {
  const formattedStartTime = format(new Date(post.start_datetime), 'dd MMM yyyy HH:mm');
  const formattedEndTime = format(new Date(post.end_datetime), 'dd MMM yyyy HH:mm');

  return (
    <div className='border rounded shadow-sm mb-4 p-4 bg-white position-relative'>

      {/* Ligne 1 : Titre + Créé par */}
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h3 className='mb-0'>{post.title}</h3>
        <small className='text-muted'>Créé par {post.createdByFullName}</small>
      </div>

      {/* Ligne 2 : Date + Badge */}
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <small className='text-muted'>{formattedStartTime}</small>
          <span className='text-muted'> — </span>
          <small className='text-muted'>{formattedEndTime}</small>
        </div>

        <span
          className={`badge px-3 py-2 ${post.is_presence_active ? 'bg-success' : 'bg-warning'}`}
        >
          {post.is_presence_active ? 'En présence' : 'En attente'}
        </span>
      </div>

      {/* Bouton si pas encore en présence */}
      {!post.is_presence_active && (
        <div className='mt-3 text-end'>
          <button className='btn btn-primary'>
            Lancer une présence
          </button>
        </div>
      )}

    </div>
  );
};
