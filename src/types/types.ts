export interface InvoiceFormInputs {
  clientNumber: string;
  installationNumber: string;
  consumer: string;
  distributor: string;
  installationstring: string;
  clientstring: string;
  invoiceMonth: string;
  energyValue: string;
  energyQuantity: string;
  sceeeValue: string;
  sceeeQuantity: string;
  compensatedValue: string;
  compensatedQuantity: string;
  publicLighting: string;
  pdfFile: FileList;
}

export type Invoice = {
  id: string;
  consumer: string;
  distributor: string;
  invoiceMonth: string;
  installationNumber: string;
  clientNumber: string;
  energyValue: string;
  energyQuantity: string;
  sceeeValue: string;
  sceeeQuantity: string;
  compensatedValue: string;
  compensatedQuantity: string;
  publicLighting: string;
  invoiceUrl: string;
  invoiceName: string;
  createdAt: string;
  updatedAt: string;
};
