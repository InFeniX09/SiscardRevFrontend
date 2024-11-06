import { Button } from "@nextui-org/react";
import { useCallback } from "react";

interface ImageProps {
  texto: string;
  handleGenerarPDF: () => void;
}

export default function ButtonComponent({
  texto,
  handleGenerarPDF
}: ImageProps) {
  const onClickHandler = useCallback(() => {
    
    handleGenerarPDF();
  }, [handleGenerarPDF]);

  return (
    <Button
      color="danger"
      className="text-white px-2 overflow-visible"
      onClick={onClickHandler}>
      {texto}
    </Button>
  );
}