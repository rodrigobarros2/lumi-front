import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { downloadInvoicePdf } from "@/modules/invoices";
import { Invoice } from "@/types/types";
import { FileText } from "lucide-react";

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export function InvoiceTable({ invoices, filteredInvoices }: { invoices: Invoice[]; filteredInvoices: Invoice[] }) {
  const dataToDisplay = filteredInvoices.length > 0 ? filteredInvoices : invoices;

  const extractMonth = (invoiceMonth: string) => invoiceMonth.split("/")[0];

  const groupedInvoices = dataToDisplay.reduce((acc, invoice) => {
    const { installationNumber, invoiceMonth, id } = invoice;
    const month = extractMonth(invoiceMonth);
    const existingInvoice = acc[installationNumber];

    if (existingInvoice) {
      existingInvoice.invoiceMonths = [...new Set([...existingInvoice.invoiceMonths, month])];
      existingInvoice.invoiceIds = [...new Set([...existingInvoice.invoiceIds, id])];
    } else {
      acc[installationNumber] = {
        consumer: invoice.consumer,
        installationNumber,
        distributor: invoice.distributor,
        invoiceMonths: [month],
        invoiceIds: [id],
      };
    }

    return acc;
  }, {} as Record<string, { consumer: string; installationNumber: string; distributor: string; invoiceMonths: string[]; invoiceIds: string[] }>);

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
          {Object.values(groupedInvoices).map((groupedInvoice) => (
            <TableRow key={groupedInvoice.installationNumber}>
              <TableCell className="font-medium">{groupedInvoice.consumer}</TableCell>
              <TableCell>{groupedInvoice.installationNumber}</TableCell>
              <TableCell>{groupedInvoice.distributor}</TableCell>
              {months.map((month) => (
                <TableCell key={month} className="text-center">
                  {groupedInvoice.invoiceMonths.includes(month) ? (
                    <FileText
                      className="h-5 w-5 cursor-pointer text-primary"
                      onClick={() => downloadInvoicePdf(groupedInvoice.invoiceIds[0])}
                    />
                  ) : (
                    <FileText className="h-5 w-5 text-gray-400" />
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
