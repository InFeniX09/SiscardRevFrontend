"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";
import { Ticket } from "../interfaces";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const getlistarArea = async () => {
  const response = await api.get("/select/listarArea");
  return response.data.Query3;
};
export const getlistarPrioridad = async () => {
  const response = await api.get("/select/listarPrioridad");
  return response.data.Query3;
};
export const getlistarUsuario = async () => {
  const response = await api.get("/select/listarUsuario");
  return response.data.Query3;
};
export const getlistarTicketEstadoxFecha = async (dia: number) => {
  const response = await api.get(
    `/centro-atencion/listarTicketEstadoxFecha?DiasAtras=${dia}`
  );
  return response.data;
};

export const createTicket = async (
  asunto: string,
  descripcion: string,
  idUsuario: number,
  idArea: number,
  idTicketcc: number,
  idPrioridad: number
) => {
  const response = await api.post("/centro-atencion/crearTicket", {
    Asunto: asunto,
    Descripcion: descripcion,
    idUsuario: idUsuario,
    idArea: idArea,
    idTicketcc: idTicketcc,
    idPrioridad: idPrioridad,
  });
  return response.data;
};
