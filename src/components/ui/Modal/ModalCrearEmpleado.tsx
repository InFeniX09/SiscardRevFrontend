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
  Tooltip,
  Tabs,
  Tab,
  Card,
  CardBody,
  CheckboxGroup,
  Checkbox,
  DateInput,
  DatePicker,
} from "@nextui-org/react";
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SocketContext } from "@/src/context/SocketContext";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectNormalComponent from "../Select/SelectNormal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CheckboxGroupComponent from "../Checkbox/CheckboxGroup";
import InputComponent from "../Input/Input";
import SelectStateComponent from "../Select/SelectState";
export default function ModalCrearEmpleado() {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectequipogrupo, setSelectEquipoGrupo] = useState<any>();
  const [tipodocumento, setTipoDocumento] = useState<any>([]);
  const [area, setArea] = useState<any>([]);
  const [puesto, setPuesto] = useState<any>([]);
  const [departamento, setDepartamento] = useState([]);
  const [provincia, setProvincia] = useState([]);
  const [selectprovincia, setSelectProvincia] = useState([]);
  const [selectdepartamento, setSelectDepartamento] = useState([]);
  const [distrito, setDistrito] = useState([]);
  const [selectArea, setSelectArea] = useState([]);

  useEffect(() => {
    if (isOpen1 == true) {
      socket?.emit("listar-", "", (equipostockxid: any) => {});
      socket?.emit("listar-", "", (equipostockxid: any) => {});
    }
  }, [isOpen1]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
    }
  };

  useEffect(() => {
    socket?.emit("listar-tipodocumento", null, (tipodocumento: any) => {
      setTipoDocumento(tipodocumento);
    });
    socket?.emit("listar-area", null, (area: any) => {
      setArea(area);
    });
    socket?.emit("listar-departamento", null, (departamento: any) => {
      setDepartamento(departamento);
    });
  }, []);

  useEffect(() => {
    socket?.emit("listar-puesto", { Area: selectArea }, (puesto: any) => {
      setPuesto(puesto);
    });
  }, [selectArea]);

  useEffect(() => {
    socket?.emit(
      "listar-provinciaxdepartamento",
      { Departamento: selectdepartamento },
      (provinciaxdepartamento: any) => {
        setProvincia(provinciaxdepartamento);
      }
    );
  }, [selectdepartamento]);
  useEffect(() => {
    socket?.emit(
      "listar-distritoxprovinciaxdepartamento",
      { Provincia: selectprovincia },
      (distritoxprovinciaxdepartamento: any) => {
        setDistrito(distritoxprovinciaxdepartamento);
      }
    );
  }, [selectprovincia]);

  const { register: rCrearEmpleado, handleSubmit: fCrearEmpleado ,reset:rsCrearEmpleado , watch} = useForm();
  const actionCrearEmpleado1 = async (dato: any) => {
    handleTabChange("2");

  };
  const actionCrearEmpleado = async (dato: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Crear nuevo empleado?",
      text: "Se creará un nuevo empleado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit(
          "crear-empleado",
          {
            Nombres: dato.Nombres,
            Apellidos: dato.Apellidos,
            TipoDocumento: dato.TipoDocumento,
            NroDocumento: dato.NroDocumento,
            Telefono: dato.Telefono,
            Direccion: dato.Direccion,
            Ubigeo:formatoUbigeo(selectdepartamento)+formatoUbigeo(selectprovincia)+formatoUbigeo(dato.Distrito),
            Correo: dato.Correo,
            Fecha: dato.Fecha,
            Area: selectArea,
            Genero:dato.Genero,
            Puesto: dato.Puesto,
            Usuario: dato.Usuario,
            Clave: dato.Clave,
            CorreoCorporativo: dato.CorreoCorporativo,
            FechaIngreso:dato.FechaIngreso,
            FcEmo: dato.FcEmo,
            vPolicial: dato.vPolicial
          },
          (usuario: any) => {
            if (usuario.msg === "Existe") {
              Swal.fire({
                title: "Creación sin Exito!",
                text: "El empleado ya existe, intente con otros datos.",
                icon: "error",
              });
            } else {
                rsCrearEmpleado();
              Swal.fire({
                title: "Creación Exitosa!",
                text: "Se ha creado un nuevo empleado.",
                icon: "success",
              });
            }
          }
        );
      }
    });
  };

  const formatoUbigeo = (value:any) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const [correoCorporativo, setCorreoCorporativo] = useState('');

  const nombres = watch("Nombres", "");
  const apellidos = watch("Apellidos", "");
  useEffect(() => {
    const primerNombre = nombres.split(" ")[0] || "";
    const primerApellido = apellidos.split(" ")[0] || "";
    setCorreoCorporativo(`${primerNombre}.${primerApellido}@siscardperu.pe`.toLowerCase());
  }, [nombres, apellidos]);

  return (
    <>
      <Button
        onPress={onOpen1}
        className="bg-foreground text-background"
        endContent={<UserPlusIcon className="h-5" />}
        size="sm"
      >
        Crear nuevo empleado
      </Button>

      <Modal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        aria-label="Modal para atender ticket"
        aria-labelledby="modal-title"
        size="2xl"
        isDismissable={false}
        className="h-[90vh]"
        classNames={{ wrapper: "overflow-hidden" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Empleado
              </ModalHeader>
              <ModalBody className="h-[80%] overflow-auto">
                <Tabs
                  classNames={{
                    cursor: "bg-[var(--color-peru)]",
                  }}
                  color="danger"
                  disabledKeys={["music"]}
                  selectedKey={selectedTab}
                  onSelectionChange={handleTabChange}
                >
                  <Tab key="1" title="Datos personales">
                    <Card>
                      <CardBody>
                        <form className="flex justify-center items-center flex-col w-full gap-3">
                          <div className="flex gap-3  w-full">
                            <InputComponent
                              tipo="text"
                              titulo="Nombres"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`Nombres`) }}
                            />
                            <InputComponent
                              tipo="text"
                              titulo="Apellidos"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`Apellidos`) }}
                            />
                          </div>
                          <div className="flex gap-3  w-full">
                            <SelectNormalComponent
                              array={tipodocumento}
                              value="IdTipoDocumento"
                              texts={["TipoDocumento"]}
                              label="Tipo Documento"
                              placeholder="Seleccione un Modelo"
                              prop={{ ...rCrearEmpleado("TipoDocumento") }}
                            />

                            <InputComponent
                              tipo="text"
                              titulo="Nro Documento"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado("NroDocumento") }}
                            />
                          </div>
                          <div className="flex gap-3  w-full">
                            <SelectStateComponent
                              array={departamento}
                              index="IdDepartamento"
                              texts={["Departamento"]}
                              label="Departamento"
                              placeholder="Seleccione un Departamento"
                              value={selectdepartamento}
                              onChange={setSelectDepartamento}
                            />
                            <SelectStateComponent
                              array={provincia}
                              index="IdProvincia"
                              texts={["Provincia"]}
                              label="Provincia"
                              placeholder="Seleccione una Provincia"
                              value={selectprovincia}
                              onChange={setSelectProvincia}
                            />

                            <SelectNormalComponent
                              array={distrito}
                              value="IdDistrito"
                              texts={["Distrito"]}
                              label="Distrito"
                              placeholder="Seleccione un Distrito"
                              prop={{ ...rCrearEmpleado("Distrito") }}
                            />
                          </div>
                          <div className="flex gap-3  w-full">
                            <InputComponent
                              tipo="text"
                              titulo="Direccion"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`Direccion`) }}
                            />
                            <InputComponent
                              tipo="text"
                              titulo="Telefono"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`Telefono`) }}
                            />
                          </div>
                          <div className="flex gap-3  w-full">
                            <InputComponent
                              tipo="text"
                              titulo="Correo"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`Correo`) }}
                            />
                            <SelectNormalComponent
                              array={[
                                { IdSexo: "M", Sexo: "Masculino" },
                                { IdSexo: "F", Sexo: "Femenino" },
                              ]}
                              value="IdSexo"
                              texts={["Sexo"]}
                              label="Genero"
                              placeholder="Seleccionar un cliente"
                              prop={{ ...rCrearEmpleado("Genero") }}
                            />
                          </div>
                          <div className="flex gap-3  w-full">
                            <InputComponent
                              tipo="date"
                              titulo="Fecha de Nacimiento"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`Fecha`) }}
                            />
                            <InputComponent
                              tipo="date"
                              titulo="Fecha Ingreso"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`FechaIngreso`) }}
                            />
                          </div>

                          <Button
                            type="button"
                            onClick={fCrearEmpleado(actionCrearEmpleado1)}
                            color="danger"
                          >
                            Siguiente
                          </Button>
                        </form>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="2" title="Datos de empleado">
                    <Card>
                      <CardBody>
                        <form className="flex justify-center items-center flex-col w-full gap-3">
                          <div className="flex gap-3  w-full">
                            <InputComponent
                              tipo="text"
                              titulo="Correo Corporativo"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`CorreoCorporativo`),value:correoCorporativo }}
                            />                          
                          </div>
                          <div className="flex gap-3  w-full">
                            <SelectStateComponent
                              array={area}
                              index="IdArea"
                              texts={["Area"]}
                              label="Area"
                              placeholder="Seleccione un Area"
                              value={selectArea}
                              onChange={setSelectArea}
                            />
                            <SelectNormalComponent
                              array={puesto}
                              value="IdPuesto"
                              texts={["Puesto"]}
                              label="Puesto"
                              placeholder="Seleccione un Puesto"
                              prop={{ ...rCrearEmpleado("Puesto") }}
                            />
                          </div>
                          <div className="flex gap-3  w-full">
                          <InputComponent
                              tipo="date"
                              titulo="Fecha de EMO"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`FcEmo`) }}
                            />
                            <InputComponent
                              tipo="checkbox"
                              titulo="Validacion Policial"
                              placeholder=""
                              icon
                              icon1={"hidden"}
                              prop={{ ...rCrearEmpleado(`vPolicial`) }}
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={fCrearEmpleado(actionCrearEmpleado)}
                            color="danger"
                          >
                            Finalizar
                          </Button>
                        </form>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter className="">
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
