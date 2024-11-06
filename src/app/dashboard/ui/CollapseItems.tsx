"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import {
  Cog8ToothIcon,
  ComputerDesktopIcon,
  DocumentArrowDownIcon,
  GiftTopIcon,
  HandRaisedIcon,
  HomeIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { IoMdSettings } from "react-icons/io";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
interface Item {
  name: string;
  url: string;
  icon: string;
}

interface Props {
  icon: string;
  title: string;
  items: Item[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const getIconComponent = (iconText: string) => {
    // Agrega más casos según los iconos que puedas tener en tu base de datos
    switch (iconText) {
      case "TicketIcon":
        return <TicketIcon className="h-6 w-6 text-[var(--color-neutral)] " />;
      case "HomeIcon":
        return <HomeIcon className="h-6 w-6 text-[var(--color-neutral)]" />;
      case "UsersIcon":
        return <UsersIcon className="h-6 w-6 text-[var(--color-neutral)]" />;
      case "DocumentArrowDownIcon":
        return (
          <DocumentArrowDownIcon className="h-6 w-6 text-[var(--color-neutral)]" />
        );
      case "GiftTopIcon":
        return <GiftTopIcon className="h-6 w-6 text-[var(--color-neutral)]" />;
      case "ComputerDesktopIcon":
        return (
          <ComputerDesktopIcon className="h-6 w-6 text-[var(--color-neutral)]" />
        );
      case "HandRaisedIcon":
        return (
          <HandRaisedIcon className="h-6 w-6 text-[var(--color-neutral)] " />
        );
      case "IoMdSettings":
        return (
          <IoMdSettings className="h-6 w-6 text-[var(--color-neutral)] " />
        );
      default:
        return null; // Si el icono no coincide con ninguno conocido, devuelve null
    }
  };
  return (
    <div className="flex gap-4 h-full items-center cursor-pointer text-[0.8rem]">
      <Accordion className='px-0'>
        <AccordionItem
          indicator={<ChevronDownIcon className="h-5" color="black" />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3",

            title: "px-0 flex text-sm gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-3">
              {getIconComponent(icon) || (
                <Image
                  src=""
                  alt={title}
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              )}
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-7 flex flex-col gap-2">
            {items.map((item, index) => (
              //cuando item.uel sea igual a la currentpath que se mantenga activo
              <Link
                key={index}
                href={item.url}
                className={clsx("w-full flex text-default-500  gap-2 pl-2", item.url === currentPath ? "bg-[#E62532] bg-opacity-50  [&_svg_path]:fill-[#FFFFFF] border-opacity-70 border-1 border-white rounded-2xl text-white": "hover:text-default-900 transition-colors")}
              >
                {getIconComponent(item.icon) || (
                  <Image
                    src=""
                    alt={title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
