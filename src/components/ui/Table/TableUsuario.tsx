"use client";
//Manejar estados
import React, { useContext, useEffect, useState } from "react";
//Componentes UI
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
//Iconos
import {
  ArrowsUpDownIcon,
  CheckCircleIcon,
  CheckIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  TicketIcon,
  UserPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
//Extra
import { capitalize } from "./Utils";
/**/
import ModalTicketComponent from "../Modal/ModalTicket";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { Solicitud } from "@/src/interfaces/solicitud.interface";
import ModalSolicitudComponent from "../Modal/ModalSolicitud";
import ModalAtenderTicketComponent from "../Modal/ModalAtenderTicket";
import { Equipo } from "@/src/interfaces/equipo.interface";
import { Usuario } from "@/src/interfaces/usuario.interface";
import ModalGestionEntidad from "../Modal/ModalGestionEntidad";

/**/

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "Usuario",
  "Datos de Cuenta",
  "FechaLaborable",
  "FcIngreso",
  "FcBaja",
  "RutaImagen",
  "Entidad_id",
  "Online",
  "Estado",
  "actions",
];
export const columnsSolicitud = [
  { name: "Usuario", uid: "Usuario", sortable: true },
  { name: "Datos de Cuenta", uid: "Datos de Cuenta", sortable: true },
  { name: "FechaLaborable", uid: "FechaLaborable", sortable: true },
  { name: "Online", uid: "Online", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: true },
];
interface Props {
  array: Usuario[];
}

export default function TableUsuario({ array }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(array.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsSolicitud;

    return columnsSolicitud.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...array];

    if (hasSearchFilter) {
      const lowerCaseFilterValue = filterValue.toLowerCase();

      filteredUsers = filteredUsers.filter(
        (user) =>
          (user.Usuario &&
            user.Usuario.toLowerCase().includes(lowerCaseFilterValue)) ||
          (user.Correo &&
            user.Correo.toLowerCase().includes(lowerCaseFilterValue))
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.Clave)
      );
    }

    return filteredUsers;
  }, [array, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Usuario, b: Usuario) => {
      const first = a[sortDescriptor.column as keyof Usuario] as number;
      const second = b[sortDescriptor.column as keyof Usuario] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: Usuario, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof Usuario];

      switch (columnKey) {
        case "Usuario":
          return (
            <User
              avatarProps={{
                radius: "full",
                size: "sm",
                src: user.RutaImagen,
              }}
              classNames={{
                description: "text-default-500",
              }}
              name={
                typeof cellValue === "object"
                  ? cellValue.toISOString()
                  : String(cellValue)
              }
            ></User>
          );
        case "Datos de Cuenta":
          return (
            <div className="flex flex-col">
              {user.Correo ? (
                <span className="text-white flex">
                  <EnvelopeIcon className="h-5" />
                  {user.Correo}
                </span>
              ) : (
                <></>
              )}
              {user.Telefono ? (
                <span className="text-white flex">
                  <PhoneIcon className="h-5" />
                  {user.Telefono}
                </span>
              ) : (
                <></>
              )}
            </div>
          );
        case "FechaLaborable":
          return (
            <div className="flex">
              {user.FcIngreso ? (
                <span className="text-white flex">
                  <ArrowsUpDownIcon className="h-5" />
                  {String(user.FcIngreso)}
                </span>
              ) : (
                <></>
              )}
              {user.FcBaja ? (
                <span className="text-white flex">| {String(user.FcBaja)}</span>
              ) : (
                <></>
              )}
            </div>
          );
        case "Online":
          return (
            <Chip
              startContent={
                user.Online ? (
                  <CheckCircleIcon className="h-5" />
                ) : (
                  <XCircleIcon className="h-5" />
                )
              }
              variant="faded"
              className={
                user.Online
                  ? "bg-[var(--color-contraneutral)] text-green-500"
                  : "bg-[var(--color-contraneutral)]  text-red-500"
              }
            >
              {user.Online ? "En linea" : "Fuera de linea"}
            </Chip>
          );
        case "actions":
          return <div className="relative flex items-center gap-2"></div>;
        default:
          return typeof cellValue === "object" || typeof cellValue === "boolean"
            ? String(cellValue)
            : cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Buscador"
            size="sm"
            startContent={<MagnifyingGlassIcon className="h-5" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<TicketIcon className="h-5" />}
                  size="sm"
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsSolicitud.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalGestionEntidad />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {array.length} Usuarios
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    array.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los items seleccionados"
            : `${selectedKeys.size} de ${items.length} seleccionados`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      table: ["bg-[var(--color-peru)] rounded-xl"],
      wrapper: ["max-h-[382px]"],
      th: [
        "bg-[var(--color-peru)]",
        "font-bold text-white text-xs",
        "border-b",
        "border-divider",
      ],
      td: [
        // changing the rows border radius
        // first
        "text-white",
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
      <Table
        isCompact
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        isHeaderSticky
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item: Usuario) => (
            <TableRow key={item.IdUsuario}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
