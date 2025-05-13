"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Input } from "@nextui-org/react";
import React from "react";
import { FieldValues } from "react-hook-form";

interface ImageProps {
  tipo: string;
  titulo: string;
  placeholder: string;
  icon: React.ReactNode;
  icon1: React.ReactNode;
  prop: FieldValues;
}

export default function InputComponent({
  tipo,
  titulo,
  placeholder,
  icon,
  icon1,
  prop,
}: ImageProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      {...prop}
      type={
        tipo === "date"
          ? "date"
          : tipo === "text"
          ? "text"
          : tipo === "checkbox" 
          ? "checkbox"
          : isVisible
          ? "text"
          : "password"
      }
      label={titulo}
      placeholder={placeholder}
      startContent={icon}
      labelPlacement="outside"
      className="w-[100%]"
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
