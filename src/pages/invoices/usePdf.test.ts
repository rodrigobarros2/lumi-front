import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePdf } from "./ausePdf"; // Ajuste o caminho conforme necessário
import * as pdfjs from "pdfjs-dist";

vi.mock("pdfjs-dist", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    GlobalWorkerOptions: { workerSrc: "" },
    getDocument: vi.fn(),
  };
});

describe("usePdf", () => {
  const { extractTextFromFile } = usePdf();

  const mockPdf = new File(["dummy content"], "dummy.pdf", { type: "application/pdf" });

  const mockTextContent = {
    items: [
      { str: "Nº DO CLIENTE" },
      { str: "123456" },
      { str: "Referente a" },
      { str: "01/2023" },
      { str: "Energia Elétrica" },
      { str: "100" },
      { str: "kWh" },
      { str: "200" },
      { str: "R$" },
      { str: "Energia SCEE" },
      { str: "50" },
      { str: "kWh" },
      { str: "100" },
      { str: "R$" },
      { str: "Energia compensada" },
      { str: "30" },
      { str: "kWh" },
      { str: "60" },
      { str: "R$" },
      { str: "Contrib Ilum Publica Municipal" },
      { str: "10" },
      { str: "R$" },
      { str: "CNPJ" },
      { str: "12345678901234" },
      { str: "Nº DA INSTALAÇÃO" },
      { str: "654321" },
      { str: "CEP" },
      { str: "12345-678" },
    ],
  };

  const mockPage = {
    getTextContent: vi.fn().mockResolvedValue(mockTextContent),
  };

  const mockFile = {
    getPage: vi.fn().mockResolvedValue(mockPage),
  };

  beforeEach(() => {
    (pdfjs.getDocument as vi.Mock).mockReturnValue({ promise: Promise.resolve(mockFile) });
  });

  it("should extract text from a PDF file and return the relevant data", async () => {
    const result = await extractTextFromFile(mockPdf);

    expect(result).toEqual({
      distributor: "CEP",
      installationNumber: "654321",
      consumer: "",
      clientNumber: "123456",
      invoiceMonth: "01/2023",
      publicLighting: "10",
      energyValue: "200",
      energyQuantity: "100",
      sceeeValue: "100",
      sceeeQuantity: "50",
      compensatedValue: "60",
      compensatedQuantity: "30",
    });
  });

  it("should handle missing data gracefully", async () => {
    const incompleteTextContent = {
      items: [{ str: "Nº DO CLIENTE" }, { str: "123456" }, { str: "Referente a" }, { str: "01/2023" }],
    };

    const incompletePage = {
      getTextContent: vi.fn().mockResolvedValue(incompleteTextContent),
    };

    const incompleteFile = {
      getPage: vi.fn().mockResolvedValue(incompletePage),
    };

    (pdfjs.getDocument as vi.Mock).mockReturnValue({ promise: Promise.resolve(incompleteFile) });

    const result = await extractTextFromFile(mockPdf);

    expect(result).toEqual({
      distributor: "0",
      installationNumber: "0",
      consumer: "",
      clientNumber: "123456",
      invoiceMonth: "01/2023",
      publicLighting: "0",
      energyValue: "0",
      energyQuantity: "0",
      sceeeValue: "0",
      sceeeQuantity: "0",
      compensatedValue: "0",
      compensatedQuantity: "0",
    });
  });

  it("should throw an error if the PDF file cannot be read", async () => {
    (pdfjs.getDocument as vi.Mock).mockReturnValue({ promise: Promise.reject(new Error("Failed to load PDF")) });

    await expect(extractTextFromFile(mockPdf)).rejects.toThrow("Failed to load PDF");
  });
});
