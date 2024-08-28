import {
  getCurrentUserInfo,
  getEventsById,
} from "@/lib/actions/database.action";
import { formatDate, formatPrice } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface UserEventModel {
  eventId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  price: number;
  attendanceCount: number;
  imgUrl: string;

  // User Info Typings
  name: string;
  email: string;
}

export function Checkout({ eventId }: { eventId: any }) {
  const isInitialMount = useRef(true);
  const [event, setEvent] = useState<UserEventModel | null>();
  const [userInfo, setUserInfo] = useState<UserEventModel | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isInitialMount.current) {
      // Skip the first render
      isInitialMount.current = false;
      return;
    }

    const fetchEventDetailsAndUserInfo = async () => {
      try {
        setLoading(true);
        const response = await getEventsById(eventId);

        const user = await getCurrentUserInfo();

        if (!response) return null;
        if (!user) return null;

        setUserInfo(user.data);
        console.log(user.data);

        console.log(response);
        setEvent(response.data);
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetailsAndUserInfo();
  }, []);

  if (loading) return "Loading...";
  if (!event) return null;
  if (!userInfo) return null;

  return (
    <div>
      <div className="maxCenter p-5 space-y-4">
        <h2 className="text-2xl font-extrabold">Checkout</h2>

        <div className="event-details bg-light rounded-lg">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <p>
            <strong>Title:</strong> {event.title}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(event.date)}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Price:</strong> {formatPrice(event.price)}
          </p>
        </div>

        <div className="bg-light rounded-lg mb-4">
          <h2 className="text-xl font-semibold">Your Information</h2>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      </div>
    </div>
  );
}
