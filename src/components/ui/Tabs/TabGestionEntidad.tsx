"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/src/context/SocketContext";
import TableUsuario from "../Table/TableUsuario";
import TableMenuAsignado from "../Table/TableMenuAsignado";
import TablePerfil from "../Table/TablePerfil";
import TablePerfilUsuario from "../Table/TablePerfilUsuario"
import { log } from "console";

export default function TabGestionEntidad() {
  const { socket } = useContext(SocketContext);
  const [usuario, setUsuario] = useState([]);
  const [menuasignado, setMenuAsignado] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [usuarioxperfil, setUsuarioPerfil] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    socket?.emit("listar-usuario", "", (usuario: any) => {
      setUsuario(usuario);
    });
  }, []);

  const handleTabChange = (key: any) => {
    setSelectedTab(key.toString());
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        if (menuasignado!.length === 0) {
          socket?.emit(
            "listar-tablamenuasignado",
            "",
            (tablamenuasignado: any) => {
              setMenuAsignado(tablamenuasignado);
            }
          );
        } else {
        }
        break;
      case 3:
        socket?.emit("listar-perfil", "", (tablaPerfil: any) => {
          setPerfil(tablaPerfil);
        });
        break;
      case 4:
        socket?.emit('listar-usuarioxperfil', '', (tablaUsuarioPerfil:any) => {
          setUsuarioPerfil(tablaUsuarioPerfil)
        });
        break;
    }
  };
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          color="danger"
          classNames={{
            cursor: "bg-[var(--color-peru)]",
            tabList: "bg-white",
          }}
          aria-label="Options"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
        >
          <Tab key="1" title="Usuario" className="text-white">
            <Card>
              <CardBody className="flex gap-4">
                <TableUsuario array={usuario} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2" title="Menu Asignado" className="text-white">
            <Card>
              <CardBody className="flex gap-4">
                <TableMenuAsignado array={menuasignado} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="3" title="Perfil" className="text-white">
            <Card>
              <CardBody className="flex gap-4">
                <TablePerfil array={perfil} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="4" title="Perfil y Usuario" className="text-white">
            <Card>
              <CardBody className="flex gap-4">
                <TablePerfilUsuario array={usuarioxperfil} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
