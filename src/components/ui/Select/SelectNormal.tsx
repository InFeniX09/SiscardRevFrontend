import { Select, SelectItem } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import React, { useCallback } from "react";

interface Props {
  array: any;
  value: string;
  texts: string[];
  label: string;
  placeholder: string;
  prop: FieldValues;
}

export default function SelectNormalComponent({
  array,
  value,
  texts,
  label,
  placeholder,
  prop,
}: Props) {
  
  return (
    <>
      <Select
        {...prop}
        items={array as any[]}
        label={label}
        placeholder={placeholder}
        className=""
        labelPlacement="outside"
      >
        {(item) => (
          <SelectItem key={item[value]}>
            {texts.map((text) => item[text]).join(" - ")}
          </SelectItem>
        )}
      </Select>
    </>
  );
}
