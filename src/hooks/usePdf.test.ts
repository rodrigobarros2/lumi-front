import * as pdfjs from "pdfjs-dist";
import fs from "fs";
import path from "path";
import { extractTextFromFile } from "@/hooks/usePdf";

// Configurar o workerSrc
pdfjs.GlobalWorkerOptions.workerSrc =
  "../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

describe("extractTextFromFile", () => {
  it("should extract text from a real PDF file", async () => {
    // Caminho para o arquivo PDF de teste
    const pdfPath = path.resolve(__dirname, "__mocks__/test.pdf");

    // Ler o conteúdo do PDF como um Buffer
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Criar um objeto File para simular o envio de arquivo (caso necessário)
    const mockPdfFile = new File([pdfBuffer], "test.pdf", {
      type: "application/pdf",
    });

    // Chamar a função real que extrai o texto do arquivo PDF
    const result = await extractTextFromFile(mockPdfFile);

    // Verificar o resultado da extração (ajustar de acordo com o conteúdo do PDF de teste)
    expect(result).toEqual({
      distributor: "CEP",
      installationNumber: "987654",
      consumer: "ABC",
      clientNumber: "12345",
      invoiceMonth: "Janeiro 2024",
      publicLighting: "R$ 5,00",
      energyValue: "R$ 150,00",
      energyQuantity: "300 kWh",
      sceeeValue: "R$ 30,00",
      sceeeQuantity: "0",
      compensatedValue: "R$ 20,00",
      compensatedQuantity: "0",
    });
  });
});
