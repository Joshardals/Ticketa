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

interface TableProps {
  caption?: string;
  header: string[];
  tickets?: any[];
}

export function TableInput(data: TableProps) {
  return (
    <Table className={`bg-paleYellow rounded-lg max-sm:w-[35rem]`}>
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

      <TableBody>
        {data.tickets?.map((ticket, index) => (
          <TableRow key={index} className="hover:bg-onyx/10">
            <TableCell>{ticket.ticketId}</TableCell>
            <TableCell>{ticket.eventName}</TableCell>
            <TableCell>{ticket.status}</TableCell>
            <TableCell className="w-[fit-content]">
              {formatDate(ticket.purchaseDate)}
            </TableCell>
            <TableCell className="">{formatPrice(ticket.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
