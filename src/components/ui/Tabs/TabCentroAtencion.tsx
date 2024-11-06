"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import TableTicketComponent from "@/src/components/ui/Table/TableTicket";
import TableSolicitudComponent from "@/src/components/ui/Table/TableSolicitud";
import TableTodasSolicitudesComponent from "@/src/components/ui/Table/TableTodasSolicitudes";
import { useSession } from "next-auth/react";
import { Menu } from "@/src/interfaces";
import Loading from "../Loading/Loading";
import TableTodosTicketsComponent from "../Table/TableTodosTickets";

export default function TabCentroAtencion() {
  const { socket } = useContext(SocketContext);
  const { data: session, status } = useSession();
  const [datasolicitud, setSolicitud] = useState([]);
  const [dataticket, setDataTicket] = useState([]);
  const [datatodossolicitud, setDataTodosSolicitud] = useState([]);
  const [datatodosticket, setDataTodosTicket] = useState([]);
  const [datatodosticketResponsable, setDataTodosTicketResponsable] = useState(
    []
  );
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (status === "authenticated") {
      const quesada = session?.user.IdUsuario;
      const data = {
        Usuario_id: quesada,
      };

      //sacar el AREA ID
      socket?.emit("area-id-usuario", quesada, (areaResponse: any) => {
        localStorage.setItem("area",areaResponse)
      });

      // Emitir el evento listar-misolicitud para obtener los datos iniciales
      socket?.emit("listar-misolicitud", data, (asignados: any) => {
        setSolicitud(asignados);
      });

      // Escuchar el evento nueva-solicitud
      socket?.on("nueva-solicitud", () => {
        socket?.emit("listar-misolicitud", data, (asignados: any) => {
          setSolicitud(asignados);
        });
      });

      socket?.on("nuevo-ticket", () => {
        socket?.emit("listar-miticket", data, (ticket: any) => {
          setDataTicket(ticket);
        });
      });

      socket?.on("ticket-aceptado", () => {
        let area = localStorage.getItem("area");
        socket?.emit("listar-ticket", area, (ticket: any) => {
          setDataTodosTicket(ticket);
        });
      });
    }

    return () => {
      // Cleanup para evitar fugas de memoria
      socket?.off("nueva-solicitud");
      socket?.off("nuevo-ticket");
      socket?.off("ticket-aceptado");
    };
  }, [status, socket, session?.user.IdUsuario]);

  useEffect(() => {
    if (status === "authenticated") {
      try {
        const dato = {
          Usuario_id: session?.user.IdUsuario,
          Puesto_id: session?.user.Puesto_id,
        };
        socket?.emit(
          "listar-menuxusuarioxperfil",
          dato,
          (menuxusuario: any) => {
            setMenuItems(menuxusuario);
            setMenuLoaded(true);
          }
        );
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
  }, [status, session?.user.IdUsuario, socket]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key.toString());
    switch (Number(key)) {
      case 1:
        console.log(menuItems);
        break;
      case 2:
        if (dataticket.length === 0) {
          const data = {
            Usuario_id: session?.user.IdUsuario,
          };
          socket?.emit("listar-miticket", data, (ticket: any) => {
            setDataTicket(ticket);
          });
        }
        break;
      case 3:
        if (datatodossolicitud.length === 0) {
          const data = {
            Usuario_id: undefined,
          };
          socket?.emit("listar-solicitud", data, (solicitudtodos: any) => {
            setDataTodosSolicitud(solicitudtodos);
          });
        }
        break;
      case 4:
        let area = localStorage.getItem("area");
        if (datatodosticket.length === 0) {
          socket?.emit("listar-ticket", area, (ticket: any) => {
            setDataTodosTicket(ticket);
          });
        }
        break;

      case 5:
        let idResponsable = session?.user.IdUsuario;
        socket?.emit(
          "listar-ticket-responsable",
          idResponsable,
          (ticketResponsable: any) => {
            setDataTodosTicketResponsable(ticketResponsable);
          }
        );

        break;
    }
  };

  const tabs = [
    <Tab key="1" title="MIS SOLICITUDES">
      <Card>
        <CardBody>
          <TableSolicitudComponent array={datasolicitud} atender="no" />
        </CardBody>
      </Card>
    </Tab>,
    <Tab key="2" title="MIS TICKETS">
      <Card>
        <CardBody>
          <TableTicketComponent array={dataticket} atender="no" />
        </CardBody>
      </Card>
    </Tab>,
  ];

  if (menuItems.some((item) => item.IdMenu === 7)) {
    tabs.push(
      <Tab key="3" title="TODAS SOLICITUDES">
        <Card>
          <CardBody>
            <TableTodasSolicitudesComponent array={datatodossolicitud} />
          </CardBody>
        </Card>
      </Tab>
    );
  }

  tabs.push(
    <Tab key="4" title="TODOS TICKETS (AREA)">
      <Card>
        <CardBody>
          <TableTodosTicketsComponent array={datatodosticket} />
        </CardBody>
      </Card>
    </Tab>,
    <Tab key="5" title="TICKETS POR RESPONSABLE">
      <Card>
        <CardBody>
          <TableTicketComponent
            array={datatodosticketResponsable}
            atender="si"
          />
        </CardBody>
      </Card>
    </Tab>
  );

  return (
    <div className="flex w-full flex-col">
      {menuLoaded ? (
        <Tabs
          classNames={{
            cursor: "bg-[var(--color-peru)]",
            tabList: "bg-white",
          }}
          color="danger"
          aria-label="Options"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
        >
          {tabs}
        </Tabs>
      ) : (
        <Loading />
      )}
    </div>
  );
}
