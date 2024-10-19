import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { ExtractInvoiceModal } from "./modal";
import { Header } from "@/components/Header";
import { getAllInvoices } from "@/modules/invoices";
import { toast } from "@/hooks/use-toast"; // Importar a função toast

type Invoice = {
  id: string;
  consumer: string;
  distributor: string;
  invoiceMonth: string;
  installationNumber: string;
  clientNumber: string;
  energyValue: number;
  energyQuantity: number;
  sceeeValue: number;
  sceeeQuantity: number;
  compensatedValue: number;
  compensatedQuantity: number;
  publicLighting: number;
  invoiceUrl: string;
  invoiceName: string;
  createdAt: string;
  updatedAt: string;
};

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function Invoices() {
  const [filter, setFilter] = useState("");
  const [year, setYear] = useState("2024");
  const [invoices, setInvoices] = useState<Invoice[]>([]);

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

  const filteredInvoices = invoices.filter(
    (invoice) => invoice.clientNumber.includes(filter) || invoice.consumer.toLowerCase().includes(filter.toLowerCase())
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
              <TableHead>Nome do Consumidor</TableHead>
              <TableHead>Número do Cliente</TableHead>
              <TableHead>Distribuidora</TableHead>
              <TableHead>Mês da Fatura</TableHead>
              <TableHead>Valor da Energia</TableHead>
              <TableHead>Quantidade de Energia</TableHead>
              <TableHead>Valor SCEE</TableHead>
              <TableHead>Quantidade SCEE</TableHead>
              <TableHead>Valor Compensado</TableHead>
              <TableHead>Quantidade Compensada</TableHead>
              <TableHead>Iluminação Pública</TableHead>
              <TableHead>URL da Fatura</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.consumer}</TableCell>
                <TableCell>{invoice.clientNumber}</TableCell>
                <TableCell>{invoice.distributor}</TableCell>
                <TableCell>{invoice.invoiceMonth}</TableCell>
                <TableCell>{invoice.energyValue}</TableCell>
                <TableCell>{invoice.energyQuantity}</TableCell>
                <TableCell>{invoice.sceeeValue}</TableCell>
                <TableCell>{invoice.sceeeQuantity}</TableCell>
                <TableCell>{invoice.compensatedValue}</TableCell>
                <TableCell>{invoice.compensatedQuantity}</TableCell>
                <TableCell>{invoice.publicLighting}</TableCell>
                <TableCell>
                  <a href={invoice.invoiceUrl} target="_blank" rel="noopener noreferrer">
                    {invoice.invoiceName}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
