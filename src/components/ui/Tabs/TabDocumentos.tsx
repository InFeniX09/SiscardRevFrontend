"use client";
import {
  generarpdf,
  getlistarAlbaranSalidaxZona,
  getlistarAlmacenxAlbaranSalida,
  getlistarDatosPdfAlbaranSalida,
  getlistarDetalleAlbaranSalida,
} from "@/src/actions/logistica/guia-remision";
import ButtonComponent from "@/src/components/ui/Button/Button";
import RadiogroupComponent from "@/src/components/ui/Radiogroup/Radiogroup";
import SelectComponent from "@/src/components/ui/Select/Select";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DownloadExcel from "../Button/Download";

export default function TabDocumentos() {
  const [Albaranes, setAlbaranes] = useState<any>([]);
  const [radiogroupData, setRadiogroupData] = useState<any[]>([]);
  const [selectedGroupValue, setSelectedGroupValue] = useState<string>("");
  const [RadioGroupValue, setRadioGroupValue] = useState<string>("");
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getlistarAlmacenxAlbaranSalida();
        setAlbaranes(response);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    // Only call fetchData when session.status changes from any value to 'authenticated'
    fetchData();
  }, []);

  const handleSelectChange = async (selectedValue: string) => {
    try {
      setSelectedGroupValue(selectedValue);
      const response = await getlistarAlbaranSalidaxZona(selectedValue);
      setRadiogroupData(response);
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };
  const handleRadioChange = async (selectedValue: string) => {
    try {
      setRadioGroupValue(selectedValue);
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };

  const handleGenerarPDF = async () => {
    try {
      if (RadioGroupValue != "") {
        const pdetalle = await getlistarDetalleAlbaranSalida(RadioGroupValue);
        const pdatos = await getlistarDatosPdfAlbaranSalida(selectedGroupValue);

        const pdfBytes = await generarpdf(pdatos, pdetalle);
        const pdfBlob = new Blob([new Uint8Array(pdfBytes.data)], {
          type: "application/pdf",
        });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = selectedGroupValue;
        document.body.appendChild(link);
        link.click();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Tienes que seleccionar una opción",
        });
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs color="danger" aria-label="Options">
          <Tab key="1" title="Guia Remisión">
            <Card>
              <CardBody className="flex gap-4">
                <SelectComponent
                  array={Albaranes}
                  value="almacen_id"
                  texts={["almacen_id", "sDsAlmacen", "cliente_id"]}
                  label="Zona"
                  placeholder="Seleccione una zona"
                  prop={{}}
                  onSelectChange={handleSelectChange}
                />
                <div className="bg-white w-full  border-[rgba(0,0,0,0.3)] border-2 rounded-xl p-4">
                  <RadiogroupComponent
                    data={radiogroupData}
                    onRadioChange={handleRadioChange}
                  />
                </div>
                <ButtonComponent
                  texto="Generar PDF"
                  handleGenerarPDF={handleGenerarPDF}
                />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2" title="Reporte SGA">
            <Card>
              <CardBody className="flex gap-4">
                <DownloadExcel></DownloadExcel>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}