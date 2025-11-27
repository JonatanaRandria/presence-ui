import { Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import type { User } from "@/features/auth";
import { Event } from "@/pages/Event/Event";
import { AddEventPage } from "@/features/event/pages/AddEvent";
import { EventParticipantsPage } from "@/features/attendance/pages/EventAttendanceParticipantPage";

export const protectedRoutes = ({ user }: { user: User | null }): RouteObject[] => [
  {
 
    path: "/event",
    element: user ? <Outlet /> : <Navigate to="/login" replace />,
    children: [
 
      { path: "", element: <Event /> },

  
      { path: "add", element: <AddEventPage /> },

      { path: ":id/attendance", element: <EventParticipantsPage /> }, 
    ],
  },
];