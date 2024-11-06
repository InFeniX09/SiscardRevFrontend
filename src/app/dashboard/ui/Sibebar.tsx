import {
  ComputerDesktopIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  ChartBarIcon,
  InboxStackIcon,
  HomeIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "./SidebarMenu";
import { CollapseItems } from "./CollapseItems";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Menu } from "@/src/interfaces";
import { auth } from "@/src/auth.config";
import { getlistarMenuxUsuarioxPerfil } from "@/src/actions/menu";
import { useSession } from "next-auth/react";
import { SocketContext } from "@/src/context/SocketContext";

interface Props {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  issidebarcollapsedmobile: boolean;
  onToggleSidebarMobile: () => void;
}

export const Sidebar = ({
  isSidebarCollapsed,
  onToggleSidebar,
  issidebarcollapsedmobile,
  onToggleSidebarMobile,
}: Props) => {
  const currentPath = usePathname();
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const { data: session, status } = useSession();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (status === "authenticated") {
      try {
        const dato = {
          Usuario_id: session?.user.IdUsuario,
          Puesto_id: session?.user.Puesto_id,
        };
        socket?.emit("listar-menuxusuarioxperfil", dato, (menuxusuario: any) => {
          setMenuItems(menuxusuario);
        });

      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
  }, [status]);

  const renderMenuItems = () => {
    return menuItems.map((menuItem) => {

      switch (menuItem.TipoMenu_id) {
        case 1:
          return (
            <SidebarMenu key={menuItem.IdMenu} title={menuItem.Menu}>
              {renderSubMenuItems(menuItem.IdMenu)}
            </SidebarMenu>
          );

        default:
          return null;
      }
    });
  };
  const renderSubMenuItems = (parentId: number) => {
    return menuItems
      .filter((menuItem) => menuItem.Padre_id === parentId)
      .map((menuItem) => {
        switch (menuItem.TipoMenu_id) {
          case 2:
            return (
              <SidebarItem 
                key={menuItem.IdMenu}
                title={menuItem.Menu}
                icon={menuItem.RutaImagen}
                isActive={currentPath === menuItem.Ruta}
                href={menuItem.Ruta}
              />
            );
          case 3:
            const subItems = menuItems.filter(
              (item) => item.Padre_id === menuItem.IdMenu
            );
            return (
              <CollapseItems
                key={menuItem.IdMenu}
                title={menuItem.Menu}
                icon={menuItem.RutaImagen}
                items={subItems.map((subItem) => ({
                  name: subItem.Menu,
                  url: subItem.Ruta,
                  icon: subItem.RutaImagen,
                }))}
              />
            );
          default:
            return null;
        }
      });
  };
  return (
    <>
      <div className="flex p-3 justify-between items-center h-[12%] w-full">
        <div className="flex items-center">
          <Image
            width={80}
            height={80}
            src={"/dashboard/LogoSiscardPeru.png"}
            alt="d"
            className="flex-none flex-shrink-0"
          />
          <span
            className={clsx(
              isSidebarCollapsed ? "block" : "hidden",
              "text-[1.5rem] text-[var(--color-neutral)]"
            )}
          >
            <strong>Siscard</strong>
          </span>
        </div>
        {issidebarcollapsedmobile ? (
          <XMarkIcon className="h-5 " onClick={onToggleSidebarMobile} />
        ) : isSidebarCollapsed ? (
          <ChevronLeftIcon
            className="h-5 cursor-pointer"
            onClick={onToggleSidebar}
          />
        ) : (
          <ChevronRightIcon
            className="h-5 cursor-pointer"
            onClick={onToggleSidebar}
          />
        )}
      </div>
      <div
        className={`w-full flex flex-col gap-1 h-full overflow-hidden text-[0.8rem] px-2 `}
      >
        {renderMenuItems()}
      </div>
    </>
  );
};
