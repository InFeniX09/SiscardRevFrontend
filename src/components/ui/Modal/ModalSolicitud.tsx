"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SocketContext } from "@/src/context/SocketContext";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectNormalComponent from "../Select/SelectNormal";
import SelectComponent from "../Select/Select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface FormValues {
  tipomotivo: string;
  cliente?: string;
  nombre: string;
  dni?: string;
  rol?: string;
}

export default function ModalSolicitudComponent() {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const [tiposolicitud, setTipoSolicitud] = useState<any>([]);
  const [clientes, setClientes] = useState<any>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tipomotivo, setTipoMotivo] = useState([]);
  const [selecttiposolicitud, setSelectTipoSolicitud] = useState("");
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

  useEffect(() => {
    socket?.emit("listar-tiposolicitud", null, (tiposolicitud: any) => {
      setTipoSolicitud(tiposolicitud);
    });

    socket?.emit("listar-cliente", null, (datosResponse: any) => {
      setClientes(datosResponse);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (datos: FormValues) => {
    const MySwal = withReactContent(Swal);
    const DeUsuario_id = session?.user.IdUsuario;
    const data = {
      TipoSolicitud_id: selecttiposolicitud,
      TipoMotivo_id: datos.tipomotivo,
      Usuario_id: DeUsuario_id,
      Cliente_id: datos.cliente,
      Nombre: datos.nombre,
      Dni: datos.dni,
      Rol: datos.rol,
    };

    MySwal.fire({
      title: "Crear nueva Solicitud?",
      text: "Se creará un nueva solicitud.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit("crear-solicitud", data, (solicitud: any) => {
          if (solicitud.msg === "HUBO UN ERROR") {
            Swal.fire({
              title: "Creación sin Exito!",
              text: "HUBO UN ERROR",
              icon: "error",
            });
          } else {
            reset();
            Swal.fire({
              title: "Creación Exitosa!",
              text: "Se ha creado un nueva solicitud.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleSelectChange = async (selectedValue: string) => {
    try {
      setSelectTipoSolicitud(selectedValue);
      setShowAdditionalInputs(selectedValue === "1"); // Mostrar inputs adicionales si el tipo de solicitud es '1'

      const data = {
        TipoSolicitud_id: selectedValue,
      };
      socket?.emit("listar-tipomotivo", data, (tipomotivo: any) => {
        console.log(tipomotivo);
        setTipoMotivo(tipomotivo);
      });
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-foreground text-background"
        endContent={<UserPlusIcon className="h-5" />}
        size="sm"
      >
        Crear nueva solicitud
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Solicitud
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="h-[84%] overflow-auto">
                  <SelectComponent
                    array={tiposolicitud}
                    value="IdTipoSolicitud"
                    texts={["TipoSolicitud"]}
                    label="Solicitud"
                    placeholder="Seleccione una solicitud"
                    prop={{}}
                    onSelectChange={handleSelectChange}
                  />
                  <SelectNormalComponent
                    array={tipomotivo}
                    value="IdTipoMotivo"
                    texts={["TipoMotivo"]}
                    label="Motivo"
                    placeholder="Seleccione un motivo"
                    prop={{ ...register("tipomotivo", { required: true }) }}
                  />
                  <Input
                    type="text"
                    label="Nombre"
                    isRequired
                    {...register("nombre", { required: true })}
                  />

                  {showAdditionalInputs && (
                    <>
                      <Input
                        type="text"
                        label="Dni"
                        isRequired
                        {...register("dni")}
                      />
                      <Input
                        type="text"
                        label="Rol"
                        isRequired
                        {...register("rol")}
                      />

                      <SelectNormalComponent
                        array={clientes}
                        value="IdCliente"
                        texts={["CodCliente"]}
                        label="Cliente"
                        placeholder="Selecciona un cliente"
                        prop={{ ...register("cliente", { required: true }) }}
                      />
                    </>
                  )}
                  
                </ModalBody>
                <ModalFooter className="h-full">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
                    Crear
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
