"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import TableEquipoStockComponent from "../Table/TableEquipoStock";
import TableEquipoControlComponent from "../Table/TablaEquipoControl";
import TableEquipoSerieComponent from "../Table/TableEquipoSerie";

export default function TabGestionStock() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); 
  const [dataequipostock, setEquipoStock] = useState([]);
  const [dataequipocontrol, setEquipoControl] = useState([]);
  const [dataequiposerie, setEquipoSerie] = useState([]);

  useEffect(() => {
    if (session) {
      socket?.emit("listar-equipostock", "", (TipoEquipo: any) => {
        setEquipoStock(TipoEquipo);
      });
    }
  }, [session, socket]);
  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        if (dataequipocontrol.length === 0) {
          socket?.emit("listar-equipocontrol", "", (EquipoControl: any) => {
            setEquipoControl(EquipoControl);
          });
        } else {
        }
        break;
      case 3:
        if (dataequiposerie.length === 0) {
          socket?.emit("listar-equiposerie", "", (EquipoSerie: any) => {
            setEquipoSerie(EquipoSerie);
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
        aria-label="Disabled Options"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="Equipo Stock">
          <Card>
            <CardBody>
              <TableEquipoStockComponent array={dataequipostock} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Equipo Control">
          <Card>
            <CardBody>
              <TableEquipoControlComponent array={dataequipocontrol} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Equipo Serie">
          <Card>
            <CardBody>
              <TableEquipoSerieComponent array={dataequiposerie} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
