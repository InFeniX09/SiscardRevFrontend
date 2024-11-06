"use client";
import { getListarClientes } from "@/src/actions/pilotaje/guia-clientes";
import { SocketContext } from "@/src/context/SocketContext";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import TableCliente from "../Table/TableCliente";
export default function TabConfiguracionesRecursosHumanos() {
  const { socket } = useContext(SocketContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tablaCliente, setTablaCliente] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await getListarClientes();
          setTablaCliente(response);
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
        <Tab key="1" title="Clientes">
          <Card>
            <CardBody>
                <TableCliente array={tablaCliente} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
