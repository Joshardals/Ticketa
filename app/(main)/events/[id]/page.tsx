import EventsHeader from "@/components/(main)/EventsHeader";
import { formatDate, formatPrice } from "@/lib/utils";
import { getEventsById } from "@/lib/actions/database.action";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function EventPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = await getEventsById(id);
  if (!data) return null;
  console.log(data);
  return (
    <div className="maxCenter">
      <EventsHeader />
      <div className="flex justify-center p-5 space-y-4">
        <div className="bg-paleYellow p-5 rounded-lg max-w-2xl space-y-4">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <Image
            src={data.imgUrl}
            width={500}
            height={500}
            alt={data.title}
            className="object-cover h-72 rounded-lg w-full"
          />
          <p className="text-pretty">{data.description}</p>
          <p>
            Date: <b>{formatDate(data.date)}</b>
          </p>
          <p>
            Location: <b>{data.location}</b>
          </p>
          <p>
            Category: <b>{data.category}</b>
          </p>
          <p>
            Price: <b>{formatPrice(data.price)}</b>
          </p>
          <Button variant={"ticket"}>Buy Tickets</Button>
        </div>
      </div>
    </div>
  );
}
