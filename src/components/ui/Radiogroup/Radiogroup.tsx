"use client"
import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export default function RadiogroupComponent() {
  return (
    <RadioGroup
      label="Elige el albarán de salida a imprimir"
    >
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  );
}
