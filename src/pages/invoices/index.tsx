import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExtractInvoiceModal } from "./modal";
import { Header } from "@/components/Header";
import { downloadInvoicePdf, getAllInvoices } from "@/modules/invoices";
import { Download } from "lucide-react";

type Invoice = {
  id: string;
  consumer: string;
  distributor: string;
  invoiceMonth: string;
  installationNumber: string;
  clientNumber: string;
  energyValue: string;
  energyQuantity: string;
  sceeeValue: string;
  sceeeQuantity: string;
  compensatedValue: string;
  compensatedQuantity: string;
  publicLighting: string;
  invoiceUrl: string;
  invoiceName: string;
  createdAt: string;
  updatedAt: string;
};

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState("");
  const [year, setYear] = useState<string>("2024");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getAllInvoices();
        const data = response.data as Invoice[];
        setInvoices(data);
        setFilteredInvoices(filterByYear(data, year));
      } catch (error) {
        console.error("Erro ao buscar faturas:", error);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    setFilteredInvoices(filterByYear(invoices, year));
  }, [year, filter, invoices]);

  const filterByYear = (invoices: Invoice[], year: string) => {
    return invoices.filter(
      (invoice) =>
        invoice.createdAt.includes(year) &&
        (invoice.consumer.toLowerCase().includes(filter.toLowerCase()) || invoice.clientNumber.includes(filter))
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Dashboard de Faturas</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 mr-4">
          <Input
            placeholder="Filtrar por número do cliente ou nome..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <ExtractInvoiceModal />
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.consumer}</TableCell>
                <TableCell>{invoice.installationNumber}</TableCell>
                <TableCell>{invoice.distributor}</TableCell>
                {months.map((month) => (
                  <TableCell key={month} className="text-center">
                    {invoice.invoiceMonth.includes(month) ? (
                      <Download className="h-4 w-4 cursor-pointer" onClick={() => downloadInvoicePdf(invoice.id)} />
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
    </div>
  );
}
