"use client";
import React from "react";
import {
  Bars4Icon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  IdentificationIcon,
  CurrencyDollarIcon,
  BellIcon,
  WalletIcon,
  TicketIcon,
  WindowIcon,
  ClipboardDocumentListIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Chip,
  Input,
  Navbar,
  NavbarContent,
  Tooltip,
} from "@nextui-org/react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { DarkModeSwitch } from "./DarkmodeSwitch";
import DropdownComponent from "@/src/components/ui/Dropdown/Dropdown";
import Link from "next/link";

interface Props {
  nombreusuario: string;
  issidebarcollapsedmobile: boolean;
  onToggleSidebarMobile: () => void;
}

export default function NavbarPage({
  nombreusuario,
  issidebarcollapsedmobile,
  onToggleSidebarMobile,
}: Props) {
  return (
    <Navbar
      className="w-full rounded-[200px] h-[8%] bg-[var(--colorblur-contraneutral)]"
      classNames={{
        wrapper: "w-full max-w-full px-3",
      }}
    >
      <NavbarContent justify="start">
        <Chip className="bg-[var(--color-peru)]" variant="faded">
          <Tooltip content="Chat">
          <Link href="/dashboard/chat">
          <ChatBubbleLeftRightIcon className="h-5 text-[var(--color-contraneutral)]" />
            </Link>
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] " variant="faded">
          <Tooltip content="Centro de Atención">
            <Link href="/dashboard/centro-atencion">
              <HandRaisedIcon className="h-5  text-[var(--color-contraneutral)]" />
            </Link>
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] " variant="faded">
          <Tooltip content="Reportes">
            <Link href="/dashboard/reportes">
              <ClipboardDocumentListIcon className="h-5  text-[var(--color-contraneutral)]" />
            </Link>
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] " variant="faded">
          <Tooltip content="Alertas">
            <MegaphoneIcon className="h-5 text-[var(--color-contraneutral)]" />
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] " variant="faded">
          <Tooltip content="Notificaciones">
            <BellIcon className="h-5  text-[var(--color-contraneutral)]" />
          </Tooltip>
        </Chip>
      </NavbarContent>
      <NavbarContent justify="end">
        <Chip className="bg-[var(--color-peru)] " variant="faded">
          <Tooltip content="Billetera">
            <WalletIcon className="h-6 text-[var(--color-contraneutral)]" />
          </Tooltip>
        </Chip>
        <DropdownComponent name={nombreusuario} />
      </NavbarContent>
    </Navbar>
  );
}
