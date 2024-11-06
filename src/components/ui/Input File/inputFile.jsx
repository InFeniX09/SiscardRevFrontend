// components/InputFile.js
import * as XLSX from 'xlsx';

const InputFile = ({ setExcelData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData); // Pasar los datos al componente padre
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
  );
};

export default InputFile;