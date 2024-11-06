"use client";
import {
  Bars4Icon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  HandRaisedIcon
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

export default function NavbarBottomMobile({
  nombreusuario,
  issidebarcollapsedmobile,
  onToggleSidebarMobile,
}: Props) {
  return (
    <Navbar
      className="w-full rounded-[200px] h-[8%]  bg-[var(--colorblur-contraneutral)]"
      classNames={{
        wrapper: "w-full max-w-full px-3 ",
      }}
    >
      <NavbarContent justify="start">
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Identificación">
            <ChatBubbleLeftRightIcon className="h-5 text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Identificación">
            <HandRaisedIcon className="h-5  text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
      </NavbarContent>
      <NavbarContent justify="center">
        <Image
          src={"/dashboard/fondo1.jpg"}
          width={100}
          height={100}
          alt="1"
        ></Image>
      </NavbarContent>
      <NavbarContent justify="end">
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Identificación">
            <ClipboardDocumentListIcon className="h-5  text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
        <Chip className="bg-[var(--color-peru)] border-[var(--colorblur-neutral)]" variant="faded">
          <Tooltip content="Identificación">
            <Bars4Icon className="h-5  text-[var(--color-neutral)]" />
          </Tooltip>
        </Chip>
      </NavbarContent>
    </Navbar>
  );
}
