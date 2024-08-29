import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";
import { Tickets } from "lucide-react";

interface TableProps {
  caption?: string;
  header: string[];
  tickets?: any[];
}

export function TableInput(data: TableProps) {
  return (
    <Table className={`bg-paleYellow rounded-lg max-sm:w-[35rem]`}>
      <TableCaption className="text-onyx/50">
        A list of your purchased tickets
      </TableCaption>
      <TableHeader className="">
        <TableRow>
          {data.header.map((data, index) => {
            return (
              <TableHead
                key={index}
                className={`font-semibold ${index === 0 && "w-[100px]"}
                ${data === "Amount" && "text-right"}`}
              >
                {data}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>

      {data.tickets?.map((ticket, index) => (
        <TableBody>
          <TableRow key={index} className="hover:bg-onyx/10">
            <TableCell>{ticket.ticketId}</TableCell>
            <TableCell>{ticket.eventName}</TableCell>
            <TableCell>{ticket.status}</TableCell>
            <TableCell className="w-[fit-content]">
              {formatDate(ticket.purchaseDate)}
            </TableCell>
            <TableCell className="">{formatPrice(ticket.price)}</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}
