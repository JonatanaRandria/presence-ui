import type { EventToList } from "../types";
import { EventDetails } from "./EventDetails";



type _EventListProps = {
  posts: EventToList[];
};

export const EventList = ({ posts }: _EventListProps) => {
  return (
    <>
      {posts.map((post ) => (
        <EventDetails key={post.id} post={post} />
      ))}
    </>
  );
};
