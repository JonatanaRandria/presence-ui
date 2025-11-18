import { Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import type { User } from "@/features/auth";
import { AddEventPage } from "@/features/event/pages/AddEvent";
import { Event } from "@/pages/Event/Event";

export const protectedRoutes = ({ user }: { user: User | null }): RouteObject[] => [
  {
    path: "/event",
    element: user ? <Outlet /> : <Navigate to="/login" replace />,
    children: [
      { path: "", element: <Event /> },       
      { path: "add", element: <AddEventPage /> },    
    ],
  },
];
