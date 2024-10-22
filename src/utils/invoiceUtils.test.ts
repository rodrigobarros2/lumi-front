import { describe, it, expect, beforeEach, vi } from "vitest";
import { processInvoiceData, calculateInvoiceData, INITIAL_ENERGY_DATA, INITIAL_MONETARY_DATA } from "./invoiceUtils";
import { Invoice } from "@/types/types";

describe("processInvoiceData", () => {
  let setEnergyData: React.Dispatch<React.SetStateAction<typeof INITIAL_ENERGY_DATA>>;
  let setMonetaryData: React.Dispatch<React.SetStateAction<typeof INITIAL_MONETARY_DATA>>;
  let setTotalEnergy: React.Dispatch<React.SetStateAction<number>>;
  let setTotalCompensated: React.Dispatch<React.SetStateAction<number>>;
  let setTotalWithoutGD: React.Dispatch<React.SetStateAction<number>>;
  let setTotalEconomyGD: React.Dispatch<React.SetStateAction<number>>;

  beforeEach(() => {
    setEnergyData = vi.fn();
    setMonetaryData = vi.fn();
    setTotalEnergy = vi.fn();
    setTotalCompensated = vi.fn();
    setTotalWithoutGD = vi.fn();
    setTotalEconomyGD = vi.fn();
  });

  it("deve processar os dados da fatura corretamente", () => {
    const invoices: Invoice[] = [
      {
        id: "1",
        consumer: "Consumer A",
        distributor: "Distributor X",
        invoiceMonth: "JAN/2023",
        installationNumber: "12345",
        clientNumber: "67890",
        energyQuantity: "150",
        sceeeQuantity: "50",
        compensatedQuantity: "30",
        energyValue: "200",
        sceeeValue: "100",
        compensatedValue: "60",
        publicLighting: "20",
        invoiceUrl: "/invoices/1",
        invoiceName: "Invoice JAN/2023",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-02",
      },
      {
        id: "2",
        consumer: "Consumer B",
        distributor: "Distributor Y",
        invoiceMonth: "FEB/2023",
        installationNumber: "54321",
        clientNumber: "09876",
        energyQuantity: "0",
        sceeeQuantity: "70",
        compensatedQuantity: "0",
        energyValue: "0",
        sceeeValue: "140",
        compensatedValue: "0",
        publicLighting: "30",
        invoiceUrl: "/invoices/2",
        invoiceName: "Invoice FEB/2023",
        createdAt: "2023-02-01",
        updatedAt: "2023-02-02",
      },
    ];

    processInvoiceData(
      invoices,
      setEnergyData,
      setMonetaryData,
      setTotalEnergy,
      setTotalCompensated,
      setTotalWithoutGD,
      setTotalEconomyGD
    );

    expect(setEnergyData).toHaveBeenCalledWith([
      { month: "JAN", consumo: 200, compensada: 30 },
      { month: "FEV", consumo: 0, compensada: 0 },
      ...INITIAL_ENERGY_DATA.slice(2),
    ]);

    expect(setMonetaryData).toHaveBeenCalledWith([
      { month: "JAN", consumo: 300, compensada: 60 },
      { month: "FEV", consumo: 0, compensada: 0 },
      ...INITIAL_MONETARY_DATA.slice(2),
    ]);

    expect(setTotalEnergy).toHaveBeenCalledWith(200);
    expect(setTotalCompensated).toHaveBeenCalledWith(30);
    expect(setTotalWithoutGD).toHaveBeenCalledWith(300);
    expect(setTotalEconomyGD).toHaveBeenCalledWith(60);
  });

  it("deve lidar com array de faturas vazio", () => {
    const invoices: Invoice[] = [];

    processInvoiceData(
      invoices,
      setEnergyData,
      setMonetaryData,
      setTotalEnergy,
      setTotalCompensated,
      setTotalWithoutGD,
      setTotalEconomyGD
    );

    expect(setEnergyData).toHaveBeenCalledWith(INITIAL_ENERGY_DATA);
    expect(setMonetaryData).toHaveBeenCalledWith(INITIAL_MONETARY_DATA);
    expect(setTotalEnergy).toHaveBeenCalledWith(0);
    expect(setTotalCompensated).toHaveBeenCalledWith(0);
    expect(setTotalWithoutGD).toHaveBeenCalledWith(0);
    expect(setTotalEconomyGD).toHaveBeenCalledWith(0);
  });
});

describe("calculateInvoiceData", () => {
  it("deve calcular os dados da fatura corretamente", () => {
    const invoices: Invoice[] = [
      {
        id: "1",
        consumer: "Consumer A",
        distributor: "Distributor X",
        invoiceMonth: "JAN/2023",
        installationNumber: "12345",
        clientNumber: "67890",
        energyQuantity: "150",
        sceeeQuantity: "50",
        compensatedQuantity: "30",
        energyValue: "200",
        sceeeValue: "100",
        compensatedValue: "60",
        publicLighting: "20",
        invoiceUrl: "/invoices/1",
        invoiceName: "Invoice JAN/2023",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-02",
      },
      {
        id: "2",
        consumer: "Consumer B",
        distributor: "Distributor Y",
        invoiceMonth: "FEB/2023",
        installationNumber: "54321",
        clientNumber: "09876",
        energyQuantity: "0",
        sceeeQuantity: "70",
        compensatedQuantity: "0",
        energyValue: "0",
        sceeeValue: "140",
        compensatedValue: "0",
        publicLighting: "30",
        invoiceUrl: "/invoices/2",
        invoiceName: "Invoice FEB/2023",
        createdAt: "2023-02-01",
        updatedAt: "2023-02-02",
      },
    ];

    const result = calculateInvoiceData(invoices);

    expect(result.energyData).toEqual([
      { month: "JAN", consumo: 200, compensada: 30 },
      { month: "FEV", consumo: 0, compensada: 0 },
      ...INITIAL_ENERGY_DATA.slice(2),
    ]);

    expect(result.monetaryData).toEqual([
      { month: "JAN", consumo: 300, compensada: 60 },
      { month: "FEV", consumo: 0, compensada: 0 },
      ...INITIAL_MONETARY_DATA.slice(2),
    ]);

    expect(result.totalEnergy).toBe(200);
    expect(result.totalCompensated).toBe(30);
    expect(result.totalWithoutGD).toBe(300);
    expect(result.totalEconomyGD).toBe(60);
  });

  it("should handle empty invoices array", () => {
    const invoices: Invoice[] = [];

    const result = calculateInvoiceData(invoices);

    expect(result.energyData).toEqual(INITIAL_ENERGY_DATA);
    expect(result.monetaryData).toEqual(INITIAL_MONETARY_DATA);
    expect(result.totalEnergy).toBe(0);
    expect(result.totalCompensated).toBe(0);
    expect(result.totalWithoutGD).toBe(0);
    expect(result.totalEconomyGD).toBe(0);
  });
});
