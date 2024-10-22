import { vi } from "vitest";
import { extractRelevantData } from "./usePdf";
import { pdfData } from "../utils/constantTestPdf";

vi.mock("pdfjs-dist", () => {
  return {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
    getDocument: () => ({
      promise: Promise.resolve({
        getPage: () => ({
          getTextContent: () => ({
            items: [],
          }),
        }),
      }),
    }),
  };
});

describe("extractRelevantData", () => {
  it("deve extrair dados relevantes do array fornecido", () => {
    const result = extractRelevantData(pdfData);

    expect(result).toEqual({
      clientNumber: "7202210726",
      compensatedQuantity: "2.300",
      compensatedValue: "-1.120,85",
      consumer: "SELFWAY TREINAMENTO PERSONALIZADO LTDA",
      distributor: "CEMIG DISTRIBUIÇÃO S.A. CNPJ 06.981.180/0001-16 / INSC. ESTADUAL 062.322136.0087.",
      energyQuantity: "100",
      energyValue: "95,52",
      installationNumber: "7202210726",
      invoiceMonth: "JAN/2024",
      publicLighting: "40,45",
      sceeeQuantity: "2.300",
      sceeeValue: "1.172,31",
    });
  });
});
