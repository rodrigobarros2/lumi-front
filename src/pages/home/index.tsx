import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { ChartContainer } from "@/components/ui/chart";
import { getAllInvoices, getByClientNumber } from "@/modules/invoices";
import { INITIAL_ENERGY_DATA, INITIAL_MONETARY_DATA, processInvoiceData } from "@/utils/invoiceUtils";
import { Invoice } from "@/types/types";
import { chartConfig } from "@/utils/chartConfig";

export function Home() {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [clients, setClients] = useState<string[]>([]);
  const [energyData, setEnergyData] = useState(INITIAL_ENERGY_DATA);
  const [monetaryData, setMonetaryData] = useState(INITIAL_MONETARY_DATA);
  const [totalEnergy, setTotalEnergy] = useState<number>(0);
  const [totalCompensated, setTotalCompensated] = useState<number>(0);
  const [totalWithoutGD, setTotalWithoutGD] = useState<number>(0);
  const [totalEconomyGD, setTotalEconomyGD] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allInvoicesResponse = await getAllInvoices();
        const allInvoices = allInvoicesResponse.data as Invoice[];
        const uniqueClients = Array.from(new Set(allInvoices.map((invoice) => invoice.clientNumber)));
        setClients(uniqueClients);

        if (selectedClient) {
          const clientInvoicesResponse = await getByClientNumber(Number(selectedClient));
          const clientInvoices = clientInvoicesResponse.data as Invoice[];
          processInvoiceData(
            clientInvoices,
            setEnergyData,
            setMonetaryData,
            setTotalEnergy,
            setTotalCompensated,
            setTotalWithoutGD,
            setTotalEconomyGD
          );
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, [selectedClient]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <Header />
      <main>
        <div className="flex justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <div className="relative">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Número do cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((clientNumber) => (
                  <SelectItem key={clientNumber} value={clientNumber}>
                    {clientNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Consumo de Energia Elétrica</p>
              <div>
                <span className="text-2xl font-bold">{totalEnergy}</span>
                <span> kWh</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Energia Compensada</p>
              <div>
                <span className="text-2xl font-bold">{totalCompensated}</span>
                <span> kWh</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Valor Total sem GD</p>
              <p className="text-2xl font-bold">R$ {totalWithoutGD.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Economia GD</p>
              <p className="text-2xl font-bold">R$ {totalEconomyGD.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Energia (kWh) / Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumo" fill="hsl(var(--chart-1))" name="Consumo de Energia Elétrica (kWh)" />
                    <Bar dataKey="compensada" fill="hsl(var(--chart-2))" name="Energia Compensada (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Valores Monetários (R$) / Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monetaryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumo" fill="hsl(var(--chart-1))" name="Valor Total sem GD (R$)" />
                    <Bar dataKey="compensada" fill="hsl(var(--chart-2))" name="Economia GD (R$)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
