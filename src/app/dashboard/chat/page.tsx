"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Badge,
  User,
} from "@nextui-org/react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { formatRevalidate } from "next/dist/server/lib/revalidate";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvisible, setIsInvisible] = React.useState(false);
  const [usuariochat, setUsuarioChat] = useState();
  const [chat, setChat] = useState<any>([]);
  const { data: session, status } = useSession(); //Usuario
  const [usuario, setUsuario] = useState<any>([]); //UsuarioDestinatario
  const { socket } = useContext(SocketContext);
  const data = {
    TipoEntidad_id: 1,
  };

  useEffect(() => {
    socket?.emit("listar-usuario", data, (ticket: any) => {
      setUsuario(ticket);
    });
  }, []);

  useEffect(() => {
    socket?.on("mensaje-personal", (data) => {
      setChat(data);
    });
  }, [socket]);

  useEffect(() => {}, [usuariochat]);

  const handleOpen = () => {
    onOpen();
  };

  const listarchat = (dato: any) => {
    setUsuarioChat(dato);
    const data = {
      DeUsuario_id: session?.user.IdUsuario,
      ParaUsuario_id: dato,
    };
    socket?.emit("listar-chat", data, (ticket: any) => {
      setChat(ticket);
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { Mensaje } = data;
    const DeUsuario_id = session?.user.IdUsuario;
    const data1 = {
      DeUsuario_id: DeUsuario_id,
      ParaUsuario_id: usuariochat,
      Mensaje: Mensaje,
    };
    socket?.emit("mensaje-personal", data1);
    reset();
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Comprobar si el contenedor existe
    if (containerRef.current) {
      // Obtener el último mensaje dentro del contenedor
      const lastMessage = containerRef.current.lastChild as HTMLDivElement;
  
      // Comprobar si el último mensaje existe
      if (lastMessage) {
        // Desplazar el contenedor hasta el último mensaje
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chat]);

  return (
    <>
      {/*<div className="flex h-full overflow-hidden">
        <div className="w-[30%] h-full bg-red-400 overflow-y-scroll overflow-x-hidden p-2">
          {usuario.map((item: any, key: any) => (
            <div className="hover:bg-red-600 cursor-pointer">
              <User
                key={key}
                onClick={() => listarchat(item.IdUsuario)}
                avatarProps={{
                  radius: "full",
                  size: "sm",
                  src: item.RutaImagen,
                }}
                classNames={{
                  description: "text-default-500",
                }}
                name={item.Usuario}
              ></User>
            </div>
          ))}
        </div>
        <div className="w-[70%] h-full bg-blue-500">
          <div className="w-full h-[90%] bg-white/40 flex flex-col items-start space-y-2 overflow-auto p-3">
            {chat.map((item: any, key: any) => (
              <div
                ref={key === chat.length - 1 ? containerRef : null}
                key={key}
                className={`p-2 rounded-lg max-w-[80%] ${
                  item.DeUsuario_id === session?.user.IdUsuario
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <p className="mb-1">{item.Mensaje}</p>
                <span className="text-xs text-gray-900">
                  {formatDate(item.FechaCreacion)}
                </span>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-[10%] bg-white/80 flex"
          >
            <textarea
              placeholder="Escribe tu mensaje ..."
              id=""
              className="w-full"
              {...register("Mensaje", { required: true })}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
            ></textarea>
            <button
              className="w-full h-full bg-blue-900 text-white"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>*/}
    </>
  );
}
