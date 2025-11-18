import { format } from 'date-fns';
import type { EventToList } from "../types";
import { LaunchAttendance } from '@/features/attendance/components/LaunchAttendance';
import { useState } from 'react';

interface _EventDetailsProps {
  post: EventToList;
}

export const EventDetails = ({ post }: _EventDetailsProps) => {
  const formattedStartTime = format(new Date(post.start_datetime), 'dd MMM yyyy HH:mm');
  const formattedEndTime = format(new Date(post.end_datetime), 'dd MMM yyyy HH:mm');

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleConfirmStart = () => {
    console.log("Presence started for:", post?.id);

    

    closeModal();
  };
  return (
    <div className='border rounded shadow-sm mb-4 p-4 bg-white position-relative'>

     
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h3 className='mb-0'>{post.title}</h3>
        <small className='text-muted'>Created by {post.createdByFullName}</small>
      </div>

   
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <small className='text-muted'>{formattedStartTime}</small>
          <span className='text-muted'> — </span>
          <small className='text-muted'>{formattedEndTime}</small>
        </div>

        <span
  className={`badge px-3 py-2 ${
    post.status === 'incoming'
      ? 'bg-warning'
      : post.status === 'in_progress'
      ? 'bg-primary'
      : 'bg-success'
  }`}
>
  {post.status === 'incoming'
    ? 'INCOMING'
    : post.status === 'in_progress'
    ? 'ON ATTENDANCE'
    : 'PASSED'}
</span>

      </div>

      
      {post.status == 'incoming' && (
  <div className='mt-3 text-end'>
    <button className='btn btn-primary' onClick={openModal}>
      Start attendance session
    </button>
  </div>
)}



<LaunchAttendance
  post={post}
  show={showModal}
  onClose={closeModal}
  onConfirm={handleConfirmStart}
  />

    
  
</div>
  );
};
