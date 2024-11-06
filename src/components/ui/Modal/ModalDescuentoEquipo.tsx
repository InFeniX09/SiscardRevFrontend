"use client";
//Manejar estados
import React, { useContext, useEffect, useState } from "react";
//Componentes UI
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalProps,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
//Fetch
import {
  getlistarArea,
  getlistarPrioridad,
} from "@/src/actions/centro-atencion";
//Intefaces
import { Ticket } from "@/src/interfaces";
//Alerta
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeSharp } from "react-icons/io5";
import { EquipoDescuento } from "@/src/interfaces/equipodescuento.interface";
import { SocketContext } from "@/src/context/SocketContext";

interface Props {
  idModelo: number;
}

export default function ModalDescuentoComponent({ idModelo }: Props) {
  const { socket } = useContext(SocketContext);
  const [descuento, setDescuento] = useState<EquipoDescuento[]>([]);

  //Apertura de modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //Scroll de modal
  const [scrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");

  const headerColumns = [
    {
      key: "Tiempo",
      name: "Tiempo",
    },
    {
      key: "Precio",
      name: "Precio",
    },
  ];
  //Fetch de datos
  /*useEffect(() => {
    
  }, []);*/

  const handleClick = () => {
    socket?.emit("listar-descuento", idModelo, (descuentoResponse: any) => {
        setDescuento(descuentoResponse);
      });
  }

  const classNames = React.useMemo(
    () => ({
      table: ["bg-[var(--color-peru)] rounded-xl"],
      wrapper: ["max-h-[382px]"],
      th: [
        "bg-[var(--color-peru)]",
        "font-bold text-white text-xs",
        "border-b",
        "border-divider",
      ],
      td: [
        // changing the rows border radius
        // first
        "text-white",
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
      <ToastContainer />
      <Button
        onPress={onOpen}
        className="bg-foreground text-background"
        endContent={<IoEyeSharp className="h-5" />}
        size="sm"
        onClick={handleClick}
      >
        Ver
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        placement="top-center"
        className="overflow-hidden h-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 h-[10%]">
                Descuento del equipo: {idModelo}
              </ModalHeader>

              <ModalBody className="h-[85%] overflow-auto">
                <Table
                  isCompact
                  aria-label="Example table with custom cells, pagination and sorting"
                  bottomContentPlacement="outside"
                  checkboxesProps={{
                    classNames: {
                      wrapper:
                        "after:bg-foreground after:text-background text-background",
                    },
                  }}
                  classNames={classNames}
                  topContentPlacement="outside"
                >
                  <TableHeader columns={headerColumns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.name}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody emptyContent={"No users found"} items={descuento}>
                    {(item: EquipoDescuento) => (
                      <TableRow key={item.IdEquipoDescuento}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter className="h-[15%]">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
