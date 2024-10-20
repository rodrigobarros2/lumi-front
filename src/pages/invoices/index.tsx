import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExtractInvoiceModal } from "./modal";
import { Header } from "@/components/Header";
import { getAllInvoices } from "@/modules/invoices";
import { InvoiceTable } from "./invoiceTable";
import { Invoice } from "@/types/types";

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState("");
  const [year, setYear] = useState<string>("2024");

  const fetchAndFilterInvoices = useCallback(async () => {
    try {
      const response = await getAllInvoices();
      const data = response.data as Invoice[];

      const filtered = data.filter(
        (invoice) =>
          new Date(invoice.createdAt).getFullYear().toString() === year &&
          (invoice.consumer.toLowerCase().includes(filter.toLowerCase()) ||
            String(invoice.clientNumber).includes(filter))
      );
      setInvoices(data);
      setFilteredInvoices(filtered);
    } catch (error) {
      console.error("Erro ao buscar faturas:", error);
    }
  }, [year, filter]);

  useEffect(() => {
    fetchAndFilterInvoices();
  }, [year, filter, fetchAndFilterInvoices]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Dashboard de Faturas</h1>

      <div className="flex mb-6 justify-between">
        <Input
          placeholder="Filtrar por número do cliente ou nome..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-[330px] mr-4"
        />

        <div className="flex">
          <ExtractInvoiceModal onClose={fetchAndFilterInvoices} />
          <Select value={year} onValueChange={(value) => setYear(value)}>
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
      </div>

      {filteredInvoices.length > 0 ? (
        <InvoiceTable invoices={invoices} filteredInvoices={filteredInvoices} />
      ) : (
        <div className="text-center text-gray-500">Nenhuma fatura encontrada para o ano selecionado.</div>
      )}
    </div>
  );
}
