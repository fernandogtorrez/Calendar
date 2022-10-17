import { parseISO } from "date-fns";

export const convertEvents = (events = []) => {
  return events.map((event) => {
    event.start = parseISO(event.start);
    event.end = parseISO(event.end);
    event.user.uid = event.user._id;
    delete event.user._id;
    return event;
  });
};
