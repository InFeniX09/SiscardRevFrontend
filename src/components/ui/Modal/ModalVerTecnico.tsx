import { Tooltip } from "@nextui-org/tooltip";
import { MdPreview } from "react-icons/md";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Tabs,
  Tab,
  Card,
  CardBody,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import TabDocumentos from "../Tabs/TabDocumentos";
import TabGeneralTecnico from "../Tabs/TabGeneralTecnico"
import TabGestionTecnico from "../Tabs/TabGestionTecnico";

interface Props {
  idZona: string;
}

const ModalVerTecnicos: React.FC<Props> = ({ idZona }) => {
  const handleClick = () => {
    onOpen();
  };
  const tabs = [
    {
      id: "general",
      label: "General",
      content: <TabGeneralTecnico id_tecnico={idZona}></TabGeneralTecnico>,
    },
    {
      id: "gestion",
      label: "Gestión",
      content: <TabGestionTecnico id_tecnico={idZona}></TabGestionTecnico>,
    },
    {
      id: "conexiones",
      label: "Conexiones",
      content: "3",
    },
  ];

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <>
      {/*<Tooltip content="Ver más">
        <MdPreview className="h-5 w-5" onClick={handleClick} />
      </Tooltip>*/}
      <MdPreview className="h-5 w-5" onClick={handleClick} cursor={"pointer"} />
      <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          <>
            <ModalHeader>PROPIEDADES DE LA ZONA: {idZona}</ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col">
                <Tabs aria-label="Dynamic Tabs" items={tabs}>
                  {(item) => (
                    <Tab key={item.id} title={item.label}>
                      {item.content}
                    </Tab>
                  )}
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalVerTecnicos;
