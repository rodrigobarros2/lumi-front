import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const energyData = [
    { month: "Jan", consumo: 300, compensada: -250 },
    { month: "Fev", consumo: 280, compensada: -220 },
    { month: "Mar", consumo: 310, compensada: 240 },
    { month: "Abr", consumo: 290, compensada: 230 },
    { month: "Mai", consumo: 320, compensada: 260 },
    { month: "Jun", consumo: 300, compensada: 240 },
  ];

  const monetaryData = [
    { month: "Jan", consumo: 150, compensada: 120 },
    { month: "Fev", consumo: 140, compensada: 110 },
    { month: "Mar", consumo: 155, compensada: 125 },
    { month: "Abr", consumo: 145, compensada: 115 },
    { month: "Mai", consumo: 160, compensada: 130 },
    { month: "Jun", consumo: 150, compensada: 120 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <Header />

      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar por numero do cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Consumo Energia Elétrica</p>
              <p className="text-2xl font-bold">R$ 506,00</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Energia Compensada</p>
              <p className="text-2xl font-bold">R$ 456,00</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Valor Total sem GD</p>
              <p className="text-2xl font-bold">R$ 329,17</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Economia GD</p>
              <p className="text-2xl font-bold text-destructive">-R$ 222,22</p>
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
                    <Bar dataKey="consumo" fill="hsl(var(--chart-1))" name="Consumo" />
                    <Bar dataKey="compensada" fill="hsl(var(--chart-2))" name="Compensada" />
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
                    <Bar dataKey="consumo" fill="hsl(var(--chart-1))" name="Consumo" />
                    <Bar dataKey="compensada" fill="hsl(var(--chart-2))" name="Compensada" />
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
