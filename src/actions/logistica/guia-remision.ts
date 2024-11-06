"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});



export const getlistarAlmacenxAlbaranSalida = async () => {
  const response = await api.get("/logistica/listarAlmacenxAlbaranSalida");
  return response.data.Query3;
};

export const getlistarAlbaranSalidaxZona = async (zona_id:string) => {
  const response = await api.post("/logistica/listarAlbaranSalidaxZona", {
    zona_id:zona_id
  });
  return response.data;
};

export const getlistarDetalleAlbaranSalida = async (palbaran_id:string) => {
  const response = await api.post("/logistica/listarDetalleAlbaranSalida", {
    palbaran_id:palbaran_id
  });
  return response.data.Query3;
};

export const getlistarDatosPdfAlbaranSalida= async (palmacen_id:string) => {
  const response = await api.post("/logistica/listarDatosPdfAlbaranSalida", {
    palmacen_id:palmacen_id
  });
  return response.data.Query3;
};

export const generarpdf = async (pdatos:any,pdetalle:any) => {
  const response = await api.post("/logistica/generar-pdf",{
    pdatos:pdatos,
    pdetalle:pdetalle
  }, { responseType: "arraybuffer" });
  return response.data;
};

/*export const getDescargarReporteSGA = async () => {
  try {
    const response = await fetch("http://localhost:3100/logistica/descargarReporteSGA", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Obtén el blob de la respuesta
    const blob = await response.blob();
    console.log('Blob obtenido:', blob);

    // Aquí puedes manejar el blob como desees, como crear un enlace de descarga
    return blob; // Retorna el blob
  } catch (error) {
    console.error('Error al descargar el reporte SGA:', error);
    throw error; // Opcional: re-lanza el error si necesitas manejarlo más arriba
  }
};*/