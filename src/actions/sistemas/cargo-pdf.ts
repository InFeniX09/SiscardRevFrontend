import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
});

export const generarpdfequipos = async (pdatos: any, zona: any, area: any, comenrtario:any, mes:any, usuario: any, estado: any) => {
  const response = await api.post("/logistica/generar-pdf-equipos", 
    {pdatos: pdatos,
      zona: zona,
      area: area,
      comentario: comenrtario,
      mes:mes,
      usuario:usuario,
      estado:estado
    },
    
    {responseType: "arraybuffer"}
  );
  return response.data;
};
