import axios from 'axios';
import { environment } from '@/src/environments/environment';
import { Button } from '@nextui-org/react';

const DownloadExcel = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(environment.baseUrl+'/logistica/descargarExcelSGA', {
        responseType: 'blob', // Importante para que Axios maneje el archivo como un Blob
      });

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-SGA.xlsx'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el archivo', error);
    }
  };

  return (
    <div>
      <h1>Descargar archivo Excel</h1>
      <Button onClick={handleDownload} color="danger"
      className="text-white px-2 overflow-visible">Descargar Excel</Button>
    </div>
  );
};

export default DownloadExcel;