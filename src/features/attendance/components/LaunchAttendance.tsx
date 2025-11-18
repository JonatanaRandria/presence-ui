import React from "react";
import { format } from "date-fns";
import type { EventToList } from "@/features/event/types";

interface LaunchAttendanceProps {
  post: EventToList;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LaunchAttendance = ({
  post,
  show,
  onClose,
  onConfirm,
}: LaunchAttendanceProps) => {
  if (!show) return null;

  const formattedStart = format(new Date(post.start_datetime), "dd MMM yyyy HH:mm");
  const formattedEnd = format(new Date(post.end_datetime), "dd MMM yyyy HH:mm");

  return (
    <>
      {/* Background overlay */}
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
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={onConfirm}>
                Confirm Start Presence
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
