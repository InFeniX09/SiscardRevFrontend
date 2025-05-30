import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { DarkModeSwitch } from "@/src/app/dashboard/ui/DarkmodeSwitch";

interface Props {
  name: string;
}

export default function DropdownComponent({ name }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              className: "h-10 w-10   sm:h-8 sm:w-8 ",
            }}
            className="transition-transform text-[var(--color-neutral)]"
            name={""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2 bg-[var(--colorcontra-neutral)]"
          >
            <p className="font-bold text-[var(--color-neutral)]">Nombre:</p>
            <p className="font-bold text-[var(--color-neutral)]">
              {session?.user.Usuario}
            </p>
          </DropdownItem>
          <DropdownItem key="settings">
            <DarkModeSwitch />
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href={"/dashboard/configuracion"}>Configuración</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
