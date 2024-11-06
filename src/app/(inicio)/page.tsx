"use client";
import { auth } from "@/src/auth.config";
import classes from "./index.module.css";
import { Image } from "@nextui-org/react";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <section className="bg-[image:url(/inicio/inicioperu.png)] h-screen w-full bg-cover bg-center bg-no-repeat py-20 px-10 flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-3 text-white">
          <h4 className="text-2xl tracking-wider text-shadow">BIENVENIDO A</h4>
          <h1 className="text-4xl tracking-wide text-shadow">SISCARD PERÚ</h1>
        </div>
        <div className="grid grid-cols-3 gap-8 text-white">
          <div className="flex  gap-5 items-center justify-center bg-opacity-30 bg-gray-600 backdrop-blur-md max-w-xs p-2 rounded-lg cursor-pointer">
            <Image
              src={"/inicio/banderaperu.png"}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1>Perú</h1>
              <p>Ciudad Lima</p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center bg-opacity-30 bg-gray-600 backdrop-blur-md max-w-xs p-2 rounded-lg cursor-pointer">
            <Image
              src={"/inicio/banderaargentina.png"}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1>Argentina</h1>
              <p>Ciudad Cordova</p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center bg-opacity-30 bg-gray-600 backdrop-blur-md max-w-xs p-2 rounded-lg cursor-pointer">
            <Image
              src={"/inicio/banderacolombia.png"}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1>Colombia</h1>
              <p>Ciudad Medellin</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
