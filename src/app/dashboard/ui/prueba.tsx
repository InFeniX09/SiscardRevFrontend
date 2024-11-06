import React, { useContext } from 'react';
import { SocketContext } from "@/src/context/SocketContext";



interface ButtonProps {
    nombre: string
}

const Button: React.FC<ButtonProps> = ({nombre}) => {
    const { socket } = useContext(SocketContext);

    const handleClick = () => {
        if(socket){
            socket.emit('prueba', 'alvino',(response: any) => {
                console.log(`respuesta del servidor ${response}`)
            });
        }
    };
    return (
        <button className="bg-green-700" onClick={handleClick}>VOY A EMITIR UN SOCKET {nombre} </button>
    )
}

export default Button;
