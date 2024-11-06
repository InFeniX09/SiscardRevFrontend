import { Card, CardBody, Input, Tab, Tabs, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { postListarTecnicoGenerales, postListarTecnicoGestion } from "@/src/actions/pilotaje/guia-tecnicos";

interface Props {
  id_tecnico: string;
}

const TabGestionTecnico: React.FC<Props> = ({ id_tecnico }) => {
  const [data, setData] = useState<any>(null); // Ajusta el tipo según la estructura de tus datos
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await  postListarTecnicoGestion(id_tecnico);
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
          <Tab key="1" title="DATOS DE GESTION" className="flex justify-center">
            <Card className="w-10/12" >
              <CardBody className="flex gap-4">
                <Input
                  isReadOnly
                  type="text"
                  label="Estado de actividad de la Zona"
                  defaultValue={data ? data.sDsEstadoZona : ''}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Piloto responsable del control de la Zona"
                  defaultValue={data ? data.sDsUsuario : ''}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Direccion de operaciones"
                  defaultValue={data ? data.sDsDirOperaciones : ''}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Zona de cabecera"
                  defaultValue={data ? data.zonacabecera_id : ''}
                ></Input>
                <Input
                  isReadOnly
                  type="text"
                  label="Nivel de saturacion para esta Zona"
                  defaultValue={data ? data.nSatur : ''}
                ></Input>
              </CardBody>
            </Card>
          </Tab>
          
        </Tabs>
      </div>
    </>
  );
};

export default TabGestionTecnico;
