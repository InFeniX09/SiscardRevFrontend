"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Input,
  select,
} from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "../Input/Input";
import { useFieldArray, useForm } from "react-hook-form";
import SelectNormalComponent from "../Select/SelectNormal";
import TextAreaNormalComponent from "../Textarea/TextAreaNormal";
import SelectStateComponent from "../Select/SelectState";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TabCrearEquipo() {
  //-------------------------
  //Socket y Session
  //-------------------------
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  //-------------------------
  //Estados
  //-------------------------
  const [selectedTab, setSelectedTab] = useState(0);
  const [equipo, setEquipo] = useState<any>([]);
  const [tipoequipo, setTipoEquipo] = useState<any>([]);
  const [cliente, setCliente] = useState<any>([]);
  const [marca, setMarca] = useState<any>([]);
  const [area, setArea] = useState<any>([]);
  const [modelo, setModelo] = useState<any>([]);
  const [equipodescuento, setEquipoDescuento] = useState<any>([]);
  const [btnguardar, setBtnGuardar] = useState<any>(true);
  const [selectarea, setSelectArea] = useState<any>();
  const [selectcliente, setSelectCliente] = useState<any>();
  const [selecttipoequipo, setSelectTipoEquipo] = useState<any>();
  const [selectmarca, setSelectMarca] = useState<any>();
  const [marcaxtipoequipo, setMarcaXTipoEquipo] = useState<any>([]);
  const [modeloxmarca, setModeloXMarca] = useState<any>([]);
  const [equipoxareaxclientextipoequipo, setEquipoXAreaXClienteXTipoEquipo] =
    useState<any>([]);

  //-------------------------
  //Cambio Tab
  //-------------------------
  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        if (marca.length === 0) {
          socket?.emit("listar-tipoequipo", "", (tipoequipo: any) => {
            setTipoEquipo(tipoequipo);
          });
        } else {
        }
        break;
      case 3:
        if (modelo.length === 0) {
          socket?.emit("listar-tipoequipo", "", (tipoequipo: any) => {
            setTipoEquipo(tipoequipo);
          });
        } else {
        }
        break;
      case 4:
        if (equipo.length === 0) {
          socket?.emit("listar-tipoequipo", "", (tipoequipo: any) => {
            setTipoEquipo(tipoequipo);
          });
          socket?.emit("listar-cliente", "", (cliente: any) => {
            setCliente(cliente);
          });
          socket?.emit("listar-area", "", (area: any) => {
            setArea(area);
          });
        } else {
        }
        break;
      case 5:
        if (equipodescuento.length === 0) {
          socket?.emit("listar-equipodescuento", "", (EquipoDescuento: any) => {
            setEquipoDescuento(EquipoDescuento);
          });
          socket?.emit("listar-tipoequipo", "", (tipoequipo: any) => {
            setTipoEquipo(tipoequipo);
          });
          socket?.emit("listar-cliente", "", (cliente: any) => {
            setCliente(cliente);
          });
          socket?.emit("listar-area", "", (area: any) => {
            setArea(area);
          });
        } else {
        }
        break;
    }
  };
  //-------------------------
  //Formularios
  //-------------------------
  const {
    register: rTipoEquipo,
    handleSubmit: fTipoEquipo,
    reset: resetTipoEquipo,
  } = useForm();
  const actionTipoEquipo = async (dato: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Crear nuevo Tipo de Equipo?",
      text: "Se creará un nuevo tipo de equipo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit("crear-tipoequipo", dato, (tipoequipo: any) => {
          if (tipoequipo.msg === "Existe") {
            Swal.fire({
              title: "Creación sin Exito!",
              text: "El tipo de equipo ya existe, intente con otros datos.",
              icon: "error",
            });
          } else {
            resetTipoEquipo();
            Swal.fire({
              title: "Creación Exitosa!",
              text: "Se ha creado un nuevo tipo de equipo.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const {
    register: rMarca,
    handleSubmit: fMarca,
    reset: resetMarca,
  } = useForm();
  const actionMarca = async (dato: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Crear nueva Marca?",
      text: "Se creará una nueva marca.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit("crear-marca", dato, (marca: any) => {
          if (marca.msg === "Existe") {
            Swal.fire({
              title: "Creación sin Exito!",
              text: "La marca ya existe, intente con otros datos.",
              icon: "error",
            });
          } else {
            resetMarca();
            Swal.fire({
              title: "Creación Exitosa!",
              text: "Se ha creado una nueva marca.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const {
    register: rModelo,
    handleSubmit: fModelo,
    reset: resetModelo,
  } = useForm();
  const actionModelo = async (dato: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Crear nuevo Modelo?",
      text: "Se creará un nuevo Modelo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit("crear-modelo", dato, (modelo: any) => {
          if (modelo.msg === "Existe") {
            Swal.fire({
              title: "Creación sin Exito!",
              text: "El Modelo ya existe, intente con otros datos.",
              icon: "error",
            });
          } else {
            resetModelo();
            Swal.fire({
              title: "Creación Exitosa!",
              text: "Se ha creado un nuevo modelo.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const {
    register: rEquipo,
    handleSubmit: fEquipo,
    reset: resetEquipo,
  } = useForm();
  const actionEquipo = async (dato: any) => {
    console.log("MARCA", selectmarca);
    console.log(dato);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Crear nuevo Equipo?",
      text: "Se creará un nuevo Equipo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit(
          "crear-equipo",
          {
            Marca: selectmarca[0],
            Modelo: dato.modelo,
            Imei: dato.imei,
            Area: dato.area,
            Cliente: dato.cliente,
            Gamma: dato.Gamma,
          },
          (equipo: any) => {
            if (equipo.msg === "Existe") {
              Swal.fire({
                title: "Creación sin Exito!",
                text: "El Equipo ya existe, intente con otros datos.",
                icon: "error",
              });
            } else {
              resetEquipo();
              Swal.fire({
                title: "Creación Exitosa!",
                text: "Se ha creado un nuevo equipo.",
                icon: "success",
              });
            }
          }
        );
      }
    });
  };
  const {
    register: rLogicaEquipoDescuento,
    handleSubmit: fLogicaEquipoDescuento,
  } = useForm();
  const actionLogicaEquipoDescuento = async (dato: any) => {
    console.log(dato);
    for (let i = 0; i < dato.CMes; i++) {
      insert(i, {
        Equipo: dato.IdEquipo,
        Tiempo: i + 1,
        Precio: "",
      });
    }
    setBtnGuardar(false);
  };
  const {
    register: rEquipoDescuento,
    handleSubmit: fEquipoDescuento,
    control,
    reset,
  } = useForm();
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "test",
  });
  const actionEquipoDescuento = async (dato: any) => {
    console.log("ysy", dato);
    socket?.emit("crear-equipodescuento", dato, (equipodescuento: any) => {
      console.log("blon", equipodescuento);
    });
    remove();
    setBtnGuardar(true);
  };

  useEffect(() => {
    if (selecttipoequipo) {
      socket?.emit(
        "listar-marcaxtipoequipo",
        { TipoEquipo: selecttipoequipo },
        (marcaxtipoequipo: any) => {
          setMarcaXTipoEquipo(marcaxtipoequipo);
        }
      );
    }
  }, [selecttipoequipo]);
  useEffect(() => {
    if (selectmarca) {
      socket?.emit(
        "listar-modeloxmarca",
        { Marca: selectmarca },
        (modeloxmarca: any) => {
          setModeloXMarca(modeloxmarca);
        }
      );
    }
  }, [selectmarca]);
  useEffect(() => {
    if (selectarea && selectcliente && selecttipoequipo) {
      socket?.emit(
        "listar-equipoxareaxclientextipoequipo",
        {
          Cliente: selectcliente,
          Area: selectarea,
          TipoEquipo: selecttipoequipo,
        },
        (equipoxareaxclientextipoequipo: any) => {
          setEquipoXAreaXClienteXTipoEquipo(equipoxareaxclientextipoequipo);
        }
      );
    }
  }, [selectarea, selectcliente, selecttipoequipo]);

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
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <InputComponent
                  tipo="text"
                  titulo="Nuevo Tipo de Equipo"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rTipoEquipo(`TipoEquipo`) }}
                />
                <Select
                  label="Clasificacion"
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Seleccionar"
                  {...rTipoEquipo(`Clasificacion`)}
                >
                  <SelectItem key={"Seriado"} value="Seriado">
                    Seriado
                  </SelectItem>
                  <SelectItem key={"Consumible"} value="Consumible">
                    Consumible
                  </SelectItem>
                  <SelectItem key={"Sustituible"} value="Sustituible">
                    Sustituible
                  </SelectItem>
                  <SelectItem key={"Accesorio"} value="Accesorio">
                    Accesorio
                  </SelectItem>
                </Select>
                <Button color="danger" onClick={fTipoEquipo(actionTipoEquipo)}>
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Marca">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <SelectNormalComponent
                  array={tipoequipo}
                  value="IdTipoEquipo"
                  texts={["Clasificacion", "TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar un tipo de equipo"
                  prop={{ ...rMarca(`TipoEquipo`) }}
                />
                <InputComponent
                  tipo="text"
                  titulo="Nueva Marca"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rMarca(`Marca`) }}
                />
                <Button color="danger" onClick={fMarca(actionMarca)}>
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Modelo">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <SelectStateComponent
                  array={tipoequipo}
                  index="IdTipoEquipo"
                  texts={["Clasificacion", "TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar un tipo de equipo"
                  value={selecttipoequipo}
                  onChange={setSelectTipoEquipo}
                />
                <SelectNormalComponent
                  array={marcaxtipoequipo}
                  value="IdMarca"
                  texts={["Marca"]}
                  label="Marca"
                  placeholder="Seleccionar una Marca"
                  prop={{ ...rModelo(`Marca`) }}
                />

                <InputComponent
                  tipo="text"
                  titulo="Nuevo Modelo"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rModelo(`Modelo`) }}
                />

                <InputComponent
                  tipo="text"
                  titulo="Cuotas"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rModelo(`Cuotas`) }}
                />

                <InputComponent
                  tipo="text"
                  titulo="Costo de la primera cuota"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rModelo(`Costo`) }}
                />
                <Button color="danger" onClick={fModelo(actionModelo)}>
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="4" title="Equipo">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <SelectStateComponent
                  array={tipoequipo}
                  index="IdTipoEquipo"
                  texts={["Clasificacion", "TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar un tipo de equipo"
                  value={selecttipoequipo}
                  onChange={setSelectTipoEquipo}
                />

                <SelectStateComponent
                  array={marcaxtipoequipo}
                  index="IdMarca"
                  texts={["Marca"]}
                  label="Marca"
                  placeholder="Seleccionar una Marca"
                  value={selectmarca}
                  onChange={setSelectMarca}
                />
                <SelectNormalComponent
                  array={modeloxmarca}
                  value="IdModelo"
                  texts={["Modelo"]}
                  label="Modelo"
                  placeholder="Seleccione un Modelo"
                  prop={{ ...rEquipo("modelo") }}
                />

                <InputComponent
                  tipo="text"
                  titulo="IMEI"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rEquipo(`imei`) }}
                />

                <SelectNormalComponent
                  array={area}
                  value="IdArea"
                  texts={["Area"]}
                  label="Area"
                  placeholder="Seleccionar un área"
                  prop={{ ...rEquipo("area") }}
                />

                <SelectNormalComponent
                  array={cliente}
                  value="IdCliente"
                  texts={["CodCliente"]}
                  label="Cliente"
                  placeholder="Seleccionar un cliente"
                  prop={{ ...rEquipo("cliente") }}
                />

                <Select
                  label="Gamma"
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Seleccionar"
                  {...rEquipo("Gamma")}
                >
                  <SelectItem key={"Alta"} value="Alta">
                    Alta
                  </SelectItem>
                  <SelectItem key={"Media"} value="Media">
                    Media
                  </SelectItem>
                  <SelectItem key={"Baja"} value="Baja">
                    Baja
                  </SelectItem>
                </Select>
                <Button
                  type="button"
                  onClick={fEquipo(actionEquipo)}
                  color="danger"
                >
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="5" title="EquipoDescuento">
          <Card>
            <CardBody>
              <h1>Escoger los precios en función al mes</h1>
              <br />
              <form className="flex flex-col justify-center items-center">
                <SelectStateComponent
                  array={area}
                  index="IdArea"
                  texts={["Area"]}
                  label="Area"
                  placeholder="Seleccionar un área"
                  value={selectarea}
                  onChange={setSelectArea}
                />
                <SelectStateComponent
                  array={cliente}
                  index="IdCliente"
                  texts={["CodCliente"]}
                  label="Cliente"
                  placeholder="Seleccionar un cliente"
                  value={selectcliente}
                  onChange={setSelectCliente}
                />
                <SelectStateComponent
                  array={tipoequipo}
                  index="IdTipoEquipo"
                  texts={["Clasificacion", "TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar un tipo de equipo"
                  value={selecttipoequipo}
                  onChange={setSelectTipoEquipo}
                />
                <SelectNormalComponent
                  array={equipoxareaxclientextipoequipo}
                  value="IdEquipo"
                  texts={["Marca", "Modelo"]}
                  label="Equipo"
                  placeholder="Seleccionar"
                  prop={{ ...rLogicaEquipoDescuento(`IdEquipo`) }}
                />
                <Input
                  label="Cantidad de Meses"
                  labelPlacement="outside"
                  type="number"
                  {...rLogicaEquipoDescuento(`CMes`)}
                />
                <div className="flex gap-5 py-3">
                  <Button
                    color="danger"
                    onClick={fLogicaEquipoDescuento(
                      actionLogicaEquipoDescuento
                    )}
                  >
                    Iniciar
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      remove();
                      setBtnGuardar(true);
                    }}
                  >
                    Resetear
                  </Button>
                </div>
              </form>
              <form>
                <ul>
                  {fields.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <Input
                          label={`Equipo ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          className="hidden"
                          {...rEquipoDescuento(`test.${index}.Equipo`)}
                        />
                        <Input
                          label={`Tiempo ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          className="hidden"
                          {...rEquipoDescuento(`test.${index}.Tiempo`)}
                        />
                        <Input
                          label={`Precio ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          {...rEquipoDescuento(`test.${index}.Precio`)}
                        />
                      </li>
                    );
                  })}
                </ul>

                <Button
                  type="button"
                  onClick={fEquipoDescuento(actionEquipoDescuento)}
                  color="danger"
                  isDisabled={btnguardar}
                >
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
