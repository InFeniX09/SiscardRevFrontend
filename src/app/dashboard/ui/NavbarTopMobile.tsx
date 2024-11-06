"use client";
import DropdownComponent from "@/src/components/ui/Dropdown/Dropdown";
import {
  BellIcon,
  MegaphoneIcon,
  WalletIcon
} from "@heroicons/react/24/solid";
import {
  Chip,
  Navbar,
  NavbarContent,
  Tooltip
} from "@nextui-org/react";
import Image from "next/image";

interface Props {
  nombreusuario: string;
  issidebarcollapsedmobile: boolean;
  onToggleSidebarMobile: () => void;
}

export default function NavbarTopMobile({
  nombreusuario,
  issidebarcollapsedmobile,
  onToggleSidebarMobile,
}: Props) {
  return (
    <Navbar
      className="w-full rounded-3xl h-[8%] bg-[var(--colorblur-contraneutral)]"
      classNames={{
        wrapper: "w-full max-w-full px-3",
      }}
    >
      <NavbarContent justify="start">
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Alertas">
            <MegaphoneIcon className="h-5 text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Notificaciones">
            <BellIcon className="h-5  text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
      </NavbarContent>
      <NavbarContent justify="center">
        <Image
          src={"/dashboard/LogoSiscardPeru.png"}
          alt="1"
          width={70}
          height={70}
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Billetera">
            <WalletIcon className="h-6 text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
        <DropdownComponent name={nombreusuario} />
      </NavbarContent>
    </Navbar>
  );
}
