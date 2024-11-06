import { Key } from "react";

export interface Equipo {
    Especificacion: any;
    IdEquipo: Key | null | undefined;
    id_equipo:number,
    equipo_imei: string,
    Marca:string,
    Modelo:string,
    Estado:string,
    Area:string,
    Cliente: string,
    Entidad:string
};