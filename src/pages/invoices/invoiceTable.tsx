import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { downloadInvoicePdf } from "@/modules/invoices";
import { Invoice } from "@/types/types";
import { Download } from "lucide-react";

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export function InvoiceTable({ invoices, filteredInvoices }: { invoices: Invoice[]; filteredInvoices: Invoice[] }) {
  const dataToDisplay = filteredInvoices.length > 0 ? filteredInvoices : invoices;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Consumidor</TableHead>
            <TableHead className="whitespace-nowrap">Número da Instalação</TableHead>
            <TableHead>Distribuidora</TableHead>
            {months.map((month) => (
              <TableHead key={month} className="text-center">
                {month}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataToDisplay.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.consumer}</TableCell>
              <TableCell>{invoice.installationNumber}</TableCell>
              <TableCell>{invoice.distributor}</TableCell>
              {months.map((month) => (
                <TableCell key={month} className="text-center">
                  {invoice.invoiceMonth.includes(month) ? (
                    <Download
                      className="h-4 w-4 cursor-pointer text-primary"
                      onClick={() => downloadInvoicePdf(invoice.id)}
                    />
                  ) : (
                    <Download className="h-4 w-4 text-gray-400" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
