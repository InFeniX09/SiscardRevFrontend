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
  Tooltip,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SocketContext } from "@/src/context/SocketContext";
import SelectNormalComponent from "../Select/SelectNormal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonPdf from "../Button/ButtonPdf";

interface Props {
  IdSolicitud: number;
}

export default function ModalAtenderTicketComponent({ IdSolicitud }: Props) {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  const [datospdf, setDatosPdf] = useState<string | null>(null);
  const [datospdf1, setDatosPdf1] = useState<Blob | null>(null);

  const [solicitudxid, setSolicitudXId] = useState<any[]>([]);
  const [datosSolicitud, setDatosSolicitud] = useState<any>({});
  const [celular, setCelular] = useState<any[]>([]);
  const [laptop, setLaptop] = useState<any[]>([]);
  const [chip, setChip] = useState<any[]>([]);
  const [respuesta, setRespuesta] = useState<any[]>([]);
  const [selectedCelular, setSelectedCelular] = useState<string>("");
  const [selectedChip, setSelectedChip] = useState<string>("");
  const [selectedLaptop, setSelectedLaptop] = useState<string>("");

  useEffect(() => {
    if (isOpen1) {
      socket?.emit(
        "listar-solicitudxid",
        { IdSolicitud },
        (solicitudxid: any) => {
          setSolicitudXId(solicitudxid);
        }
      );

      socket?.emit(
        "listar-datos-solicitud",
        { IdSolicitud },
        (datosxsolicitud: any) => {
          setDatosSolicitud(datosxsolicitud);
        }
      );

      socket?.emit(
        "listar-equipoxclxtexusu",
        { TipoEquipo: "Celular" },
        (equipoxclasificacion: any) => {
          setCelular(equipoxclasificacion);
        }
      );

      socket?.emit(
        "listar-equipoxclxtexusu",
        { TipoEquipo: "Chip" },
        (equipoxclasificacion: any) => {
          setChip(equipoxclasificacion);
        }
      );

      socket?.emit(
        "listar-equipoxclxtexusu",
        { TipoEquipo: "Laptop" },
        (equipoxclasificacion: any) => {
          setLaptop(equipoxclasificacion);
        }
      );
    }
  }, [isOpen1]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log("celular", selectedCelular)
    console.log("chip", selectedChip)
    console.log("laptop", selectedLaptop)
    const usuario_id = session?.user.IdUsuario;

    socket?.emit(
      "asignar-equipos",
      {
        nroSolicitud: IdSolicitud,
        nroDni: datosSolicitud.Dni,
        celular: selectedCelular,
        chip: selectedChip,
        laptop: selectedLaptop,
      },
      (response: any) => {
        setRespuesta(response);
        if (response.error) {
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: response.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Good job!",
            text: "Equipo asignaod con exito",
          });
        }
      }
    );

    /*socket?.emit("armarpdf-solicitud", {
      dato: data,
      Solicitud: solicitudxid[0]?.TipoSolicitud,
      Motivo: solicitudxid[0]?.TipoMotivo,
      usuario_id,
      Usuario: solicitudxid[0]?.Usuario,
    }, (datospdf: any) => {
      const pdfBlob = new Blob([new Uint8Array(datospdf)], { type: "application/pdf" });
      const pdfURL = URL.createObjectURL(pdfBlob);
      setDatosPdf(pdfURL);
      setDatosPdf1(pdfBlob);
    });*/
  };

  const armarPdf = async () => {};

  const actionEnviarPdf = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Desea proceder con la solicitud?",
      text: "Se enviara un correo con lo detallado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          pdf: datospdf1,
        };
        socket?.emit("enviarcorreo", data, (response: any) => {
          console.log(response);
        });
        Swal.fire({
          title: "Exito!",
          text: "Su solicitud procedió exitosamente.",
          icon: "success",
        });
      }
    });
  };

  const handleCelularChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCelular(e.target.value);
  };

  const handleChipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChip(e.target.value);
  };


  const handleLaptopChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    setSelectedLaptop(e.target.value);
  };



  return (
    <>
      <Tooltip content="Atender">
        <UserPlusIcon className="h-5" onClick={onOpen1} />
      </Tooltip>
      <Modal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        aria-label="Modal para atender ticket"
        aria-labelledby="modal-title"
        size="2xl"
        className="h-[90vh]"
        classNames={{ wrapper: "overflow-hidden" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Atender solicitud: {solicitudxid[0]?.Usuario}</h1>
                <p className="text-[0.8rem]">
                  Solicitud: {solicitudxid[0]?.TipoSolicitud}
                </p>
                <p className="text-[0.8rem]">
                  Motivo: {solicitudxid[0]?.TipoMotivo}
                </p>
                <p className="text-[0.8rem]">DATOS DEL ATENDIDO</p>
                <div className="flex justify-evenly">
                  <p className="text-[0.8rem]">
                    Nombre: {datosSolicitud.Nombre}
                  </p>
                  {solicitudxid[0]?.IdTipoSolicitud === 1 && (
                    <>
                      <p className="text-[0.8rem]">Dni: {datosSolicitud.Dni}</p>
                      <p className="text-[0.8rem]">
                        Rol: {datosSolicitud.Puesto}
                      </p>
                    </>
                  )}
                </div>
              </ModalHeader>
              <ModalBody className="h-[80%] overflow-auto">
                <div className="flex w-full flex-col">
                  {solicitudxid[0]?.IdTipoSolicitud === 1 &&
                    solicitudxid[0]?.IdTipoMotivo === 1 && (
                      <Card>
                        <CardBody>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>Asignando Items</h2>
                            <div>
                              <div>
                                {celular.length > 0 ? (
                                  <SelectNormalComponent
                                    array={celular}
                                    value="id_equipo"
                                    texts={["Marca", "Modelo", "equipo_imei"]}
                                    label="Celular"
                                    placeholder="Seleccionar un Telefono"
                                    prop={{
                                      ...register("Celular"),
                                      onChange: handleCelularChange,
                                    }}

                                  />
                                ) : (
                                  <p>No hay Telefonos disponibles</p>
                                )}
                              </div>
                              <div>
                                {chip.length > 0 ? (
                                  <SelectNormalComponent
                                    array={chip}
                                    value="id_equipo"
                                    texts={["Marca", "Modelo", "equipo_imei"]}
                                    label="Chip"
                                    placeholder="Seleccionar un Chip"
                                    prop={{ ...register("Chip"),
                                      onChange: handleChipChange,
                                     }}
                                  />
                                ) : (
                                  <p>No hay chips disponibles</p>
                                )}
                              </div>
                              <div>
                                {laptop.length > 0 ? (
                                  <SelectNormalComponent
                                    array={laptop}
                                    value="id_equipo"
                                    texts={["Marca", "Modelo", "equipo_imei"]}
                                    label="Laptop"
                                    placeholder="Seleccionar una Laptop"
                                    prop={{ ...register("Laptop"),
                                      onChange: handleLaptopChange,
                                     }}
                                  />
                                ) : (
                                  <p>No hay laptops disponibles</p>
                                )}
                              </div>
                            </div>
                            <ButtonPdf
                              nombre={datosSolicitud.Nombre}
                              dni={datosSolicitud.Dni}
                              rol={datosSolicitud.Puesto}
                              smartphone={selectedCelular}
                              chip={selectedChip} laptop={selectedLaptop}
                            ></ButtonPdf>
                          </form>
                        </CardBody>
                      </Card>
                    )}

                    {solicitudxid[0]?.IdTipoSolicitud == 2 ?
                    (<div>
                      
                    </div>) :("")
                    }
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                  Asignar
                </Button>
                <Button color="danger" variant="flat" onClick={onClose}>
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
