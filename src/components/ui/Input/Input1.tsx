"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Input } from "@nextui-org/react";
import React from "react";

interface ImageProps {
  name: string;
  tipo: string;
  titulo: string;
  placeholder: string;
  icon: React.ReactNode;
  icon1: React.ReactNode;
}

export default function Input1Component({
  tipo,
  titulo,
  placeholder,
  icon,
  icon1,

  name,
}: ImageProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      classNames={{ label: "!text-[var(--color-contraneutral)]" }}
      name={name}
      type={tipo === "text" ? "text" : isVisible ? "text" : "password"}
      label={titulo}
      placeholder={placeholder}
      startContent={icon}
      labelPlacement="outside"
      endContent={
        <button
          className={`focus:outline-none ${icon1}`}
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeIcon className="h-5 text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeSlashIcon className="h-5 text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
  );
}
