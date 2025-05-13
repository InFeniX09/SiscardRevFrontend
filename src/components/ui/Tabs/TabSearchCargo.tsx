"use client";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Input } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import React, { useContext, useEffect, useState, useCallback } from "react";
import { SocketContext } from "@/src/context/SocketContext";
import { Equipo } from "@/src/interfaces/equipo.interface";
import { generarpdfequipos } from "@/src/actions/sistemas/cargo-pdf";
import { useSession } from "next-auth/react";

export default function TabSearchCargo() {
  const { socket } = useContext(SocketContext);

  const [zonas, setZonas] = useState<{ zona_id: string }[]>([]);
  const [areas, setAreas] = useState<{ Area: string }[]>([]);
  const [equipos, setEquipos] = useState<any[]>([]);
  const [seleccionados, setSeleccionados] = useState<Equipo[]>([]);

  const [zonaSeleccionadaKey, setZonaSeleccionadaKey] = React.useState("");
  const [zonaSeleccionadaValue, setZonaSeleccionadaValue] = React.useState("");

  const [areaSeleccionadaKey, setAreaSeleccionadaKey] = React.useState("");
  const [areaSeleccionadaValue, setAreaSeleccionadaValue] = React.useState("");

    const [estadoseleccionadoKey, setEstadoSeleccionadoKey] = React.useState("");
  const [estadoseleccionadoValue, setEstadoseleccionadoValue] = React.useState("");

  const [Comentario, setComentario] = React.useState("");
  const [Mes, setMes] = React.useState("");

  //const [areaSeleccionada, setAreaSeleccionada] = useState<string>("");

  useEffect(() => {
    socket?.emit("listar-zona", "", (res: any[]) => setZonas(res || []));
    socket?.emit("listar-area", "", (res: any[]) => setAreas(res || []));
  }, [socket]);

  const onSelectionChangeZona = (id :any) => {
    setZonaSeleccionadaKey(id);
  };

  const onInputChangeZona = (value :any) => {
    setZonaSeleccionadaValue(value);
  };

  const onSelectionChangeArea = (id : any) => {
    setAreaSeleccionadaKey(id);
  };

  const onInputChangeArea = (value: any) => {
    setAreaSeleccionadaValue(value);
  };


  const onSelectionChangeEstado = (id : any ) => {
    setEstadoSeleccionadoKey(id);
  };

  const onInputChangeEstado = (value : any) => {
    setEstadoseleccionadoValue(value);
  };

  const buscarEquipos = () => {
    if (!zonaSeleccionadaValue) return;
    socket?.emit(
      "listar-equipos-siscard",
      zonaSeleccionadaValue,
      (res: any[]) => setEquipos(res || [])
    );
  };

  const onEquiposSeleccionados = (ids: string[]) => {
    const filtrados = equipos.filter((eq) => ids.includes(eq.componente_id));
    setSeleccionados(filtrados);
  };

  const limpiarTodo = () => {
    setEquipos([]);
    setSeleccionados([]);
    setComentario("");
    setMes("");
  };

  const { data: session } = useSession();

  const descargarPdf = async () => {
    try {
      const pdf = await generarpdfequipos(
        seleccionados,
        zonaSeleccionadaValue,
        areaSeleccionadaValue,
        Comentario,
        Mes,
        session?.user.Usuario,
        estadoseleccionadoValue
      );
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "archivo.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al generar PDF:", err);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        color="danger"
        classNames={{ cursor: "bg-[var(--color-peru)]", tabList: "bg-white" }}
        aria-label="Options"
      >
        <Tab key="1" title="Zonas" className="text-white">
          <Card>
            <CardBody className="flex flex-col gap-4">
              <label className="text-black text-lg">ESCOGE LA ZONA</label>
              <Autocomplete
                label="Zonas"
                placeholder="Selecciona una zona"
                className="max-w-xs"
                onInputChange={onInputChangeZona}
                onSelectionChange={onSelectionChangeZona}
              >
                {zonas.map((z) => (
                  <AutocompleteItem key={z.zona_id}>
                    {z.zona_id}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Autocomplete
                label="Areas"
                placeholder="Selecciona un área"
                className="max-w-xs"
                onInputChange={onInputChangeArea}
                onSelectionChange={onSelectionChangeArea}
              >
                {areas.map((a) => (
                  <AutocompleteItem key={a.Area}>{a.Area}</AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete
                label="Estado"
                placeholder="Selecciona un estado"
                className="max-w-xs"
                onInputChange={onInputChangeEstado}
                onSelectionChange={onSelectionChangeEstado}
              >
                  <AutocompleteItem key={"NUEVO"}>NUEVO</AutocompleteItem>
                  <AutocompleteItem key={"USADO"}>USADO</AutocompleteItem>


              </Autocomplete>

              <Button onClick={buscarEquipos} color="danger">
                BUSCAR
              </Button>

              {equipos.length > 0 && (
                <>
                  <CheckboxGroup onChange={onEquiposSeleccionados}>
                    {equipos.map((eq) => (
                      <Checkbox key={eq.componente_id} value={eq.componente_id}>
                        {eq.componente_id}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>

                  {/**COMENTARIO */}
                  <Input
                    label="Comentario"
                    placeholder="Ingresa un comentario"
                    value={Comentario}
                    onValueChange={setComentario}
                  />

                  {/**MES DE REPOSICION */}

                  <Input
                    label="Mes de reposicion"
                    placeholder="Mes"
                    value={Mes}
                    onValueChange={setMes}
                  />

                  <Button onClick={descargarPdf} color="danger">
                    GENERAR CARGO
                  </Button>

                  <Button onClick={limpiarTodo} color="warning">
                    LIMPIAR
                  </Button>
                </>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
