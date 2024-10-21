import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createInvoice, getAllInvoices } from "@/modules/invoices";
import { InvoiceFormInputs } from "@/types/types";
import { usePdf } from "@/hooks/usePdf";

export function ExtractInvoiceModal({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormInputs>();
  const { extractTextFromFile } = usePdf();

  const onSubmit: SubmitHandler<InvoiceFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("installationNumber", data.installationNumber);
    formData.append("distributor", data.distributor);
    formData.append("consumer", data.consumer);
    formData.append("clientNumber", data.clientNumber);
    formData.append("invoiceMonth", data.invoiceMonth);
    formData.append("energyValue", data.energyValue);
    formData.append("energyQuantity", data.energyQuantity);
    formData.append("sceeeValue", data.sceeeValue);
    formData.append("sceeeQuantity", data.sceeeQuantity);
    formData.append("compensatedValue", data.compensatedValue);
    formData.append("compensatedQuantity", data.compensatedQuantity);
    formData.append("publicLighting", data.publicLighting);

    if (data.pdfFile && data.pdfFile.length > 0) {
      formData.append("pdfFile", data.pdfFile[0]);
    }

    try {
      const response = await createInvoice(formData);
      console.log("Fatura cadastrada com sucesso:", response);
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar fatura:", error);
    } finally {
      await getAllInvoices();
      onClose();
    }
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const extractedData = await extractTextFromFile(file);
      setValue("installationNumber", extractedData.installationNumber);
      setValue("distributor", extractedData.distributor);
      setValue("consumer", extractedData.consumer);
      setValue("clientNumber", extractedData.clientNumber);
      setValue("invoiceMonth", extractedData.invoiceMonth);
      setValue("publicLighting", extractedData.publicLighting);
      setValue("energyValue", extractedData.energyValue);
      setValue("energyQuantity", extractedData.energyQuantity);
      setValue("sceeeValue", extractedData.sceeeValue);
      setValue("sceeeQuantity", extractedData.sceeeQuantity);
      setValue("compensatedValue", extractedData.compensatedValue);
      setValue("compensatedQuantity", extractedData.compensatedQuantity);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white mr-3" onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4 text-white" /> Extrair PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Extrair Fatura</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="installationNumber">Numero da instalação</Label>
              <Input
                id="installationNumber"
                placeholder="000000..."
                {...register("installationNumber", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.installationNumber && <p className="text-red-500 text-sm">{errors.installationNumber.message}</p>}
              <p className="text-sm text-muted-foreground">O número de instalação da unidade consumidora.</p>
            </div>
            <div>
              <Label htmlFor="distributor">Distribuidora</Label>
              <Input
                id="distributor"
                placeholder="Distribuidora"
                {...register("distributor", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.distributor && <p className="text-red-500 text-sm">{errors.distributor.message}</p>}
              <p className="text-sm text-muted-foreground">O nome da distribuidora de energia elétrica.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="consumer">Consumidor</Label>
              <Input
                id="consumer"
                placeholder="Consumidor"
                {...register("consumer", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.consumer && <p className="text-red-500 text-sm">{errors.consumer.message}</p>}
              <p className="text-sm text-muted-foreground">O nome do consumidor da energia elétrica.</p>
            </div>
            <div>
              <Label htmlFor="clientNumber">Numero do cliente</Label>
              <Input
                id="clientNumber"
                placeholder="000000..."
                {...register("clientNumber", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.clientNumber && <p className="text-red-500 text-sm">{errors.clientNumber.message}</p>}
              <p className="text-sm text-muted-foreground">O número do cliente na distribuidora.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceMonth">Mes de referencia da fatura</Label>
              <Input
                id="invoiceMonth"
                placeholder="MES/ANO"
                {...register("invoiceMonth", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.invoiceMonth && <p className="text-red-500 text-sm">{errors.invoiceMonth.message}</p>}
              <p className="text-sm text-muted-foreground">O mês e ano de referência da fatura.</p>
            </div>
            <div>
              <Label htmlFor="energyValue">Valor energia eletrica</Label>
              <Input
                id="energyValue"
                placeholder="0.0"
                {...register("energyValue", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.energyValue && <p className="text-red-500 text-sm">{errors.energyValue.message}</p>}
              <p className="text-sm text-muted-foreground">O custo de energia elétrica na fatura em R$.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="energyQuantity">Quantidade energia eletrica</Label>
              <Input
                id="energyQuantity"
                placeholder="0.0"
                {...register("energyQuantity", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.energyQuantity && <p className="text-red-500 text-sm">{errors.energyQuantity.message}</p>}
              <p className="text-sm text-muted-foreground">A quantidade de energia elétrica na fatura em kWh.</p>
            </div>
            <div>
              <Label htmlFor="sceeeValue">Valor energia SCEEE s/ICMS</Label>
              <Input
                id="sceeeValue"
                placeholder="0.0"
                {...register("sceeeValue", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.sceeeValue && <p className="text-red-500 text-sm">{errors.sceeeValue.message}</p>}
              <p className="text-sm text-muted-foreground">O custo de energia SCEEE s/ICMS na fatura em R$.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sceeeQuantity">Quantidade energia SCEEE s/ICMS</Label>
              <Input
                id="sceeeQuantity"
                placeholder="0.0"
                {...register("sceeeQuantity", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.sceeeQuantity && <p className="text-red-500 text-sm">{errors.sceeeQuantity.message}</p>}
              <p className="text-sm text-muted-foreground">A quantidade de energia SCEEE s/ICMS na fatura em kWh.</p>
            </div>
            <div>
              <Label htmlFor="compensatedValue">Valor energia compensada</Label>
              <Input
                id="compensatedValue"
                placeholder="0.0"
                {...register("compensatedValue", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.compensatedValue && <p className="text-red-500 text-sm">{errors.compensatedValue.message}</p>}
              <p className="text-sm text-muted-foreground">O custo de energia compensada na fatura em R$.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="compensatedQuantity">Quantidade energia compensada</Label>
              <Input
                id="compensatedQuantity"
                placeholder="0.0"
                {...register("compensatedQuantity", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.compensatedQuantity && (
                <p className="text-red-500 text-sm">{errors.compensatedQuantity.message}</p>
              )}
              <p className="text-sm text-muted-foreground">A quantidade de energia compensada na fatura em kWh.</p>
            </div>
            <div>
              <Label htmlFor="publicLighting">Contrib ilum publica municipal</Label>
              <Input
                id="publicLighting"
                placeholder="0.0"
                {...register("publicLighting", { required: "Este campo é obrigatório" })}
                className="rounded-md"
              />
              {errors.publicLighting && <p className="text-red-500 text-sm">{errors.publicLighting.message}</p>}
              <p className="text-sm text-muted-foreground">A contribuição para iluminação pública municipal.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <Label htmlFor="pdfFile" className="sr-only">
                Carregar PDF
              </Label>
              <Input
                id="pdfFile"
                type="file"
                accept="application/pdf"
                {...register("pdfFile", { required: "Este campo é obrigatório" })}
                className="rounded-md cursor-pointer"
                onChange={handlePdfUpload}
              />
              {errors.pdfFile && <p className="text-red-500 text-sm">{errors.pdfFile.message}</p>}
              <p className="text-sm text-muted-foreground">Carregue o arquivo PDF da fatura.</p>
            </div>
            <Button type="submit" className="rounded-md w-full">
              Cadastrar Fatura
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
