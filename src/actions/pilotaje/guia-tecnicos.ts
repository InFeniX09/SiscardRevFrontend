"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});
export const getListarTecnicos = async () => {
  const response = await api.get("/pilotaje/listarTecnicos");
  return response.data.Query3;
};

export const postListarTecnicoGenerales = async (id_zone: string) => {
    try {
      const response = await api.post("/pilotaje/listarDatosGeneralesTecnicos", {
        zona_id: id_zone,
      });
    
      // Asegúrate de que `data` es el campo correcto en la respuesta
      return response.data.data[0]; // Cambia esto si el campo correcto es diferente
    } catch (error) {
      console.error("Error en postListarTecnicoGenerales:", error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  export const postListarTecnicoGestion = async (id_zone: string) => {
    try {
      const response = await api.post("/pilotaje/listarDatosGestionTecnicos", {
        zona_id: id_zone,
      });  
      // Asegúrate de que `data` es el campo correcto en la respuesta
      return response.data.data; // Cambia esto si el campo correcto es diferente
    } catch (error) {
      console.error("Error en postListarTecnicoGenerales:", error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };