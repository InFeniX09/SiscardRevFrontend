"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import TableEntidad from "../Table/TableEntidad";
import TableEmpleado from "../Table/TableEmpleado";

export default function TabConfiguracionesRecursosHumanos() {
  const { socket } = useContext(SocketContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tablaempleado, setTablaEmpleado] = useState([]);

  useEffect(() => {
    socket?.emit("listar-tablaempleado", "", (tablaempleado: any) => {
        setTablaEmpleado(tablaempleado)
    });
  }, []);

  const handleTabChange = (key: any) => {
    setSelectedTab(key.toString());
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        /*
        if (dataticket!.length === 0) {
          const data = {
            Usuario_id: session?.user.IdUsuario,
          };
          socket?.emit("listar-miticket", data, (ticket: any) => {
            setDataTicket(ticket);
          });
        } else {
        }*/
        break;
    }
  };
  //-------------------------
  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="Empleado">
          <Card>
            <CardBody>
              <TableEmpleado array={tablaempleado} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
