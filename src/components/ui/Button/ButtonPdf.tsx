import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { environment } from "@/src/environments/environment";

// Define la interfaz para las props del componente
interface Props {
  nombre: string;
  dni: string;
  rol: string;
  smartphone:string;
  chip: string;
  laptop:string
}

// Crea una instancia de Axios
const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

// El componente recibe las props como argumento
const DescargarPdfButton: React.FC<Props> = ({ nombre, dni, rol, smartphone, chip, laptop }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPdf = async () => {

    //validar si hay uno seleccionado si no alerta de seleccionar
    setLoading(true);

    try {

      // Realizar una solicitud al backend para obtener el PDF
      // Asegúrate de que el backend pueda recibir y usar estos parámetros
      const response = await api.get("/pdf/generar-pdf", {
        responseType: "arraybuffer", // Importante para recibir el archivo binario
        params: { nombre, dni, rol, smartphone, chip, laptop }, // Enviar las props como parámetros
      });

      // Crear un Blob a partir de los bytes del PDF
      const pdfBlob = new Blob([new Uint8Array(response.data)], {
        type: "application/pdf",
      });

      // Crear una URL para el Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Crear un enlace de descarga y hacer clic en él
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "archivo.pdf"; // Nombre del archivo que se descargará
      document.body.appendChild(link);
      link.click();

      // Limpiar el objeto URL después de usarlo
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownloadPdf} isLoading={loading}>
      Descargar PDF
    </Button>
  );
};

export default DescargarPdfButton;
