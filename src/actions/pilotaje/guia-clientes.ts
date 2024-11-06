"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const getListarClientes = async () => {
  const response = await api.get("/pilotaje/listarClientes");
  return response.data.Query3;
};

