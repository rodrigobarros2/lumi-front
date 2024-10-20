import { http } from "@/services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createInvoice = async (invoiceData: FormData) => {
  try {
    const { data } = await http.post("/invoices", invoiceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("PDF cadastrado com sucesso!");
    return data;
  } catch (error) {
    toast.error("Erro ao cadastrado Pdf!");
    console.error("Error creating invoice:", error);
    throw error;
  }
};

export const getAllInvoices = async () => {
  try {
    const { data } = await http.get("/invoices");
    return data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const getByClientNumber = async (id: number) => {
  try {
    const { data } = await http.get(`/invoices/${id}/client`);
    return data;
  } catch (error) {
    console.error(`Error fetching invoice with ID ${id}:`, error);
    throw error;
  }
};

export const getById = async (id: number) => {
  try {
    const { data } = await http.get(`/invoices/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching invoice with ID ${id}:`, error);
    throw error;
  }
};

export const downloadInvoicePdf = async (id: string) => {
  try {
    const url = `${import.meta.env.VITE_REACT_API_URL}/invoices/${id}/pdf`;
    window.open(url, "_blank");
  } catch (error) {
    console.error(`Error downloading invoice PDF with ID ${id}:`, error);
    throw error;
  }
};
