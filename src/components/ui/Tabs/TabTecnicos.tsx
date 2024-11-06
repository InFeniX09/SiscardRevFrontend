"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import "react-toastify/dist/ReactToastify.css";
import TableCliente from "../Table/TableCliente";
import { getListarClientes } from "@/src/actions/pilotaje/guia-clientes";
import { getListarTecnicos } from "@/src/actions/pilotaje/guia-tecnicos";
import TableTecnico from "../Table/TableTecnico";
export default function TabTecnicos() {
  const { socket } = useContext(SocketContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tablaTecnico, setTablaTecnico] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await getListarTecnicos();
          setTablaTecnico(response);
        } catch (error) {
          console.error("Error ", error);
        }
      };
  
      // Only call fetchData when session.status changes from any value to 'authenticated'
      fetchData();
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
        <Tab key="1" title="Tecnicos">
          <Card>
            <CardBody>
                <TableTecnico array={tablaTecnico} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
