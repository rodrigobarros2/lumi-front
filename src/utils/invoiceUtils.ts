import { Invoice } from "@/types/types";

export const INITIAL_ENERGY_DATA = [
  { month: "JAN", consumo: 0, compensada: 0 },
  { month: "FEV", consumo: 0, compensada: 0 },
  { month: "MAR", consumo: 0, compensada: 0 },
  { month: "ABR", consumo: 0, compensada: 0 },
  { month: "MAI", consumo: 0, compensada: 0 },
  { month: "JUN", consumo: 0, compensada: 0 },
  { month: "JUL", consumo: 0, compensada: 0 },
  { month: "AGO", consumo: 0, compensada: 0 },
  { month: "SET", consumo: 0, compensada: 0 },
  { month: "OUT", consumo: 0, compensada: 0 },
  { month: "NOV", consumo: 0, compensada: 0 },
  { month: "DEZ", consumo: 0, compensada: 0 },
];

export const INITIAL_MONETARY_DATA = [
  { month: "JAN", consumo: 0, compensada: 0 },
  { month: "FEV", consumo: 0, compensada: 0 },
  { month: "MAR", consumo: 0, compensada: 0 },
  { month: "ABR", consumo: 0, compensada: 0 },
  { month: "MAI", consumo: 0, compensada: 0 },
  { month: "JUN", consumo: 0, compensada: 0 },
  { month: "JUL", consumo: 0, compensada: 0 },
  { month: "AGO", consumo: 0, compensada: 0 },
  { month: "SET", consumo: 0, compensada: 0 },
  { month: "OUT", consumo: 0, compensada: 0 },
  { month: "NOV", consumo: 0, compensada: 0 },
  { month: "DEZ", consumo: 0, compensada: 0 },
];

export const calculateInvoiceData = (invoices: Invoice[]) => {
  const energyData = INITIAL_ENERGY_DATA.map((data) => ({ ...data }));
  const monetaryData = INITIAL_MONETARY_DATA.map((data) => ({ ...data }));

  let totalEnergy = 0;
  let totalCompensated = 0;
  let totalWithoutGD = 0;
  let totalEconomyGD = 0;

  invoices.forEach((invoice) => {
    const month = invoice.invoiceMonth.split("/")[0].toUpperCase();
    const monthIndex = energyData.findIndex((data) => data.month === month);

    if (monthIndex !== -1) {
      energyData[monthIndex].consumo += Number(invoice.energyQuantity) + Number(invoice.sceeeQuantity);
      energyData[monthIndex].compensada += Number(invoice.compensatedQuantity);

      monetaryData[monthIndex].consumo += Number(invoice.energyValue) + Number(invoice.sceeeValue);
      monetaryData[monthIndex].compensada += Number(invoice.compensatedValue);

      totalEnergy += Number(invoice.energyQuantity) + Number(invoice.sceeeQuantity);
      totalCompensated += Number(invoice.compensatedQuantity);
      totalWithoutGD += Number(invoice.energyValue) + Number(invoice.sceeeValue);
      totalEconomyGD += Number(invoice.compensatedValue);
    }
  });

  return {
    energyData,
    monetaryData,
    totalEnergy,
    totalCompensated,
    totalWithoutGD,
    totalEconomyGD,
  };
};

export const processInvoiceData = (
  invoices: Invoice[],
  setEnergyData: React.Dispatch<React.SetStateAction<typeof INITIAL_ENERGY_DATA>>,
  setMonetaryData: React.Dispatch<React.SetStateAction<typeof INITIAL_MONETARY_DATA>>,
  setTotalEnergy: React.Dispatch<React.SetStateAction<number>>,
  setTotalCompensated: React.Dispatch<React.SetStateAction<number>>,
  setTotalWithoutGD: React.Dispatch<React.SetStateAction<number>>,
  setTotalEconomyGD: React.Dispatch<React.SetStateAction<number>>
) => {
  const {
    energyData,
    monetaryData,
    totalEnergy,
    totalCompensated,
    totalWithoutGD,
    totalEconomyGD,
  } = calculateInvoiceData(invoices);

  setEnergyData(energyData);
  setMonetaryData(monetaryData);
  setTotalEnergy(totalEnergy);
  setTotalCompensated(totalCompensated);
  setTotalWithoutGD(totalWithoutGD);
  setTotalEconomyGD(totalEconomyGD);
};