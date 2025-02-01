import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface Event {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  venue?: string;
}

const API_URL = process.env.REACT_APP_API_URL_LOCAL;

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/events`, {
          credentials: "include", 
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = (await response.json()) as Event[];
        setEvents(data);
      } catch (err) {
        setError("Failed to fetch events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const syncEvents = async () => {
    try {
      setLoading(true);
      const syncResponse = await fetch(`${API_URL}/api/auth/events/sync`, {
        method: "POST",
        credentials: "include",
      });
      if (!syncResponse.ok) {
        throw new Error("Failed to sync events");
      }

      const eventsResponse = await fetch(`${API_URL}/api/auth/events`, {
        credentials: "include",
      });
      if (!eventsResponse.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = (await eventsResponse.json()) as Event[];
      setEvents(data);
      setError(null);
    } catch (err) {
      setError("Failed to sync events");
      console.error("Error syncing events:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Events</h1>
        <button
          onClick={syncEvents}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sync Eventbrite Events
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            {event.description && (
              <p className="text-gray-600 mb-2">{event.description}</p>
            )}
            <div className="text-sm text-gray-500">
              <p>Start: {new Date(event.startDate).toLocaleString()}</p>
              <p>End: {new Date(event.endDate).toLocaleString()}</p>
              {event.venue && <p>Venue: {event.venue}</p>}
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No events found. Click "Sync Eventbrite Events" to import your events.
        </p>
      )}
    </div>
  );
};
