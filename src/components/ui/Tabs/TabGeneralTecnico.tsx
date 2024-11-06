import { Card, CardBody, Input, Tab, Tabs, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { postListarTecnicoGenerales } from "@/src/actions/pilotaje/guia-tecnicos";

interface Props {
  id_tecnico: string;
}

const TabGeneralTecnico: React.FC<Props> = ({ id_tecnico }) => {
  const [data, setData] = useState<any>(null); // Ajusta el tipo según la estructura de tus datos
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await postListarTecnicoGenerales(id_tecnico);
        setData(result); // Ajusta esto según la estructura de tu respuesta
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error al cargar los datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_tecnico]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs color="danger" aria-label="Options">
          <Tab key="1" title="DATOS GENERALES" className="flex justify-center">
            <Card className="w-8/12" >
              <CardBody className="flex gap-4">
                <Input
                  isReadOnly
                  type="text"
                  label="Descripcion"
                  defaultValue={data ? data.sDsZona : ""}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="RUC"
                  defaultValue={data ? data.sDsNif : ""}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Contacto"
                  defaultValue={data ? data.sDsContacto : ""}
                ></Input>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2" title="LOCALIZACION">
            <Card>
              <CardBody className="flex gap-4">
                <Input
                  isReadOnly
                  type="text"
                  label="Direccion"
                  defaultValue={data ? data.sDsDireccion : ""}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Provincia"
                  defaultValue={data ? data.sDsProvincia : ""}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Poblacion"
                  defaultValue={data ? data.sDsPoblacion : ""}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Ubigeo"
                  defaultValue={data ? data.cdubigeo_id : ""}
                ></Input>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="3" title="OBSERVACIONES">
            <Card>
              <CardBody className="flex gap-4">
                <Textarea
                  label="Observacion"
                  placeholder="Ingresa la observacion"
                  className="max-w-full"
                />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default TabGeneralTecnico;
