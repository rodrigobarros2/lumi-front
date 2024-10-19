import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { ExtractInvoiceModal } from "./modal";
import { Header } from "@/components/Header";
import { getAllInvoices } from "@/modules/invoices";

// Definindo a estrutura de Invoice real
type Invoice = {
  id: string;
  ucName: string;
  ucNumber: string;
  distributor: string;
  consumer: string;
  months: Record<string, boolean>; // Meses e se a fatura está disponível
  invoiceUrl: string | null;
  invoiceName: string | null;
};

// Meses para mapear as faturas
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function Invoices() {
  const [filter, setFilter] = useState("");
  const [year, setYear] = useState("2024");
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Função para mapear os meses de acordo com as faturas reais
  const mapInvoicesToMonths = (invoicesData: any[]) => {
    return invoicesData.map((invoice) => {
      // Criando um objeto para mapear quais meses têm faturas
      const monthsAvailability = months.reduce((acc, month) => {
        acc[month] = invoice.invoiceMonth.includes(month);
        return acc;
      }, {} as Record<string, boolean>);

      return {
        id: invoice.id,
        ucName: invoice.consumer,
        ucNumber: invoice.clientNumber.toString(),
        distributor: invoice.distributor,
        consumer: invoice.consumer,
        months: monthsAvailability,
        invoiceUrl: invoice.invoiceUrl,
        invoiceName: invoice.invoiceName,
      };
    });
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getAllInvoices(); // Obtendo os dados da API
        const mappedInvoices = mapInvoicesToMonths(response.data); // Mapeando os dados para os meses
        setInvoices(mappedInvoices);
      } catch (error) {
        console.error("Erro ao buscar faturas:", error);
      }
    };

    fetchInvoices();
  }, []);

  // Filtrando as faturas pelo número ou nome do cliente
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
                    {invoice.months[month] ? (
                      <Button variant="ghost" size="sm">
                        <a
                          href={invoice.invoiceUrl ?? "#"}
                          download={invoice.invoiceName ?? ""}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="opacity-50 cursor-not-allowed" disabled>
                        <Download className="h-4 w-4" />
                      </Button>
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
