/* eslint-disable @typescript-eslint/no-explicit-any */
import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

interface ExtractedData {
  distributor: string;
  installationNumber: string;
  consumer: string;
  clientNumber: string;
  invoiceMonth: string;
  publicLighting: string;
  energyValue: string;
  energyQuantity: string;
  sceeeValue: string;
  sceeeQuantity: string;
  compensatedValue: string;
  compensatedQuantity: string;
}

export const extractRelevantData = (data: string[]): ExtractedData => {
  const getValue = (index: number, offset: number = 1) => data[index + offset] || "0";

  const clientNumberIdx = data.findIndex((item) => item === "Nº DO CLIENTE");
  const dateReferenceIdx = data.findIndex((item) => item === "Referente a");
  const electricalEnergyIdx = data.findIndex((item) => item === "Energia Elétrica");
  const sceeEnergyIdx = data.findIndex((item) => item.startsWith("Energia SCEE"));
  const compensatedEnergyIdx = data.findIndex((item) => item.startsWith("Energia compensada"));
  const contribIdx = data.findIndex((item) => item === "Contrib Ilum Publica Municipal");
  const consumerIdx = data.findIndex((item) => item.includes("CNPJ"));
  const installationNumberIdx = data.findIndex((item) => item === "Nº DA INSTALAÇÃO");
  const distributorIdx = data.findIndex((item) => item.includes("CEP"));

  return {
    distributor: getValue(distributorIdx, -2),
    installationNumber: getValue(installationNumberIdx),
    consumer: getValue(consumerIdx, -4).replace(/\d+/g, "").trim(),
    clientNumber: getValue(clientNumberIdx, 2),
    invoiceMonth: getValue(dateReferenceIdx, 3),
    publicLighting: getValue(contribIdx),
    energyValue: electricalEnergyIdx > -1 ? getValue(electricalEnergyIdx, 4) : "0",
    energyQuantity: electricalEnergyIdx > -1 ? getValue(electricalEnergyIdx, 2) : "0",
    sceeeValue: sceeEnergyIdx > -1 ? getValue(sceeEnergyIdx, 4) : "0",
    sceeeQuantity: sceeEnergyIdx > -1 ? getValue(sceeEnergyIdx, 2) : "0",
    compensatedValue: compensatedEnergyIdx > -1 ? getValue(compensatedEnergyIdx, 4) : "0",
    compensatedQuantity: compensatedEnergyIdx > -1 ? getValue(compensatedEnergyIdx, 2) : "0",
  };
};

export const extractTextFromFile = async (pdf: File, pdfjsLib = pdfjs): Promise<ExtractedData> => {
  const fileBuffer = new Uint8Array(await pdf.arrayBuffer());
  const file = await pdfjsLib.getDocument(fileBuffer).promise;
  const firstPage = await file.getPage(1);

  const textContent = await firstPage.getTextContent();
  const textItems = textContent.items
    .map((item: Record<string, any>) => item.str)
    .filter((item: string) => !!item && item.trim() !== "");

  return extractRelevantData(textItems);
};

export const usePdf = () => {
  return {
    extractTextFromFile,
  };
};
