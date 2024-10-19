import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { ExtractInvoiceModal } from "./modal";
import { Header } from "@/components/Header";
import { getAllInvoices } from "@/modules/invoices";

type Invoice = {
  id: string;
  ucName: string;
  ucNumber: string;
  distributor: string;
  consumer: string;
  months: Record<string, boolean>;
};

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function Invoices() {
  const [filter, setFilter] = useState("");
  const [year, setYear] = useState("2019");
  const [invoices2, setInvoices] = useState<Invoice[]>([]);
  console.log("🚀 ~ Invoices ~ invoices2:", invoices2);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getAllInvoices();
        setInvoices(response);
      } catch (error) {
        console.error("Erro ao buscar faturas:", error);
      }
    };

    fetchInvoices();
  }, []);

  const invoices: Invoice[] = [
    {
      id: "1",
      ucName: "CASA DONA COMERCIO VAREJISTA E SOLUÇ...",
      ucNumber: "3002865313",
      distributor: "CEMIG",
      consumer: "CASA DONA COMERCIO VAR...",
      months: {
        Jan: true,
        Fev: true,
        Mar: true,
        Abr: true,
        Mai: true,
        Jun: true,
        Jul: true,
        Ago: true,
        Set: true,
        Out: true,
        Nov: true,
        Dez: true,
      },
    },
    {
      id: "2",
      ucName: "Walter Boaventura da Silva",
      ucNumber: "3003336712",
      distributor: "CEMIG",
      consumer: "Walter Boaventura da Silva",
      months: {
        Jan: true,
        Fev: true,
        Mar: false,
        Abr: true,
        Mai: true,
        Jun: true,
        Jul: true,
        Ago: true,
        Set: true,
        Out: true,
        Nov: true,
        Dez: true,
      },
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) => invoice.ucNumber.includes(filter) || invoice.ucName.toLowerCase().includes(filter.toLowerCase())
  );

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
            <SelectItem value="2019">2019</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da UC</TableHead>
              <TableHead>Número da UC</TableHead>
              <TableHead>Distribuidora</TableHead>
              <TableHead>Consumidor</TableHead>
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
                <TableCell className="font-medium">{invoice.ucName}</TableCell>
                <TableCell>{invoice.ucNumber}</TableCell>
                <TableCell>{invoice.distributor}</TableCell>
                <TableCell>{invoice.consumer}</TableCell>
                {months.map((month) => (
                  <TableCell key={month} className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={!invoice.months[month] ? "opacity-50 cursor-not-allowed" : ""}
                      disabled={!invoice.months[month]}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
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
