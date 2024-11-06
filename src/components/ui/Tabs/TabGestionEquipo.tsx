"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import TableTipoEquipoComponent from "@/src/components/ui/Table/TableTipoEquipo";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import TableMarcaComponent from "../Table/TableMarca";
import TableModeloComponent from "../Table/TableModelo";
import TableEquipoComponent from "../Table/TableEquipo";
import TableEquipoDescuentoComponent from "../Table/TableEquipoDescuento";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TabGestionEquipo() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada
  const [datatipoequipo, setTipoEquipo] = useState([]);
  const [datamarca, setMarca] = useState([]);
  const [datamodelo, setModelo] = useState([]);
  const [dataequipo, setEquipo] = useState([]);
  const [dataequipodescuento, setEquipoDescuento] = useState([]);

  useEffect(() => {
    socket?.emit("listar-tipoequipo", "", (TipoEquipo: any) => {
      setTipoEquipo(TipoEquipo);
    });
  }, []);

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        if (datamarca.length === 0) {
          socket?.emit("listar-marca", "", (Marca: any) => {
            setMarca(Marca);
          });
        } else {
        }
        break;
      case 3:
        if (datamodelo.length === 0) {
          socket?.emit("listar-modelo", "", (Modelo: any) => {
            setModelo(Modelo);
          });
        } else {
        }
        break;
      case 4:
        if (dataequipo.length === 0) {
          socket?.emit("listar-equipo", "", (Equipo: any) => {
            setEquipo(Equipo);
          });
        } else {
        }
        break;
      case 5:
        if (dataequipodescuento.length === 0) {
          socket?.emit("listar-equipodescuento", "", (EquipoDescuento: any) => {
            setEquipoDescuento(EquipoDescuento);
          });
        } else {
        }
        break;
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="TipoEquipo">
          <Card>
            <CardBody>
              <TableTipoEquipoComponent array={datatipoequipo} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Marca">
          <Card>
            <CardBody>
              <TableMarcaComponent array={datamarca} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Modelo">
          <Card>
            <CardBody>
              <TableModeloComponent array={datamodelo} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="4" title="Equipo">
          <Card>
            <CardBody>
              <TableEquipoComponent array={dataequipo} />
            </CardBody>
          </Card>
        </Tab>
        {/*<Tab key="5" title="EquipoDescuento">
          <Card>
            <CardBody>
              <TableEquipoDescuentoComponent array={dataequipodescuento} />
            </CardBody>
          </Card>
        </Tab>*/}
      </Tabs>
    </div>
  );
}
