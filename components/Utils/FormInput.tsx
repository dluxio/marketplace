import { useTranslation } from "next-export-i18n";
import React, { ChangeEventHandler } from "react";

type FormInputProps = {
  handleChange: ChangeEventHandler;
  handleBlur: ChangeEventHandler;
  value: any;
  errors: any;
  touched: any;
  name: string;
  type?: string;
  min?: number;
  max?: number;
  title?: string;
  sideTitle?: string;
};

export const FormInput = ({
  handleChange,
  handleBlur,
  value,
  errors,
  touched,
  name,
  min,
  max,
  sideTitle,
  type = "text",
  title,
}: FormInputProps) => {
  const formattedName = name.replace("_", " ");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <label className="text-left mb-1 text-md" htmlFor="start">
        {title
          ? title
          : t(formattedName).charAt(0).toUpperCase() +
            t(formattedName).slice(1)}
      </label>
      <div className="flex align-center w-full">
        {sideTitle && (
          <div className="bg-gray-700 rounded-l-lg px-3 border border-gray-300 flex justify-center items-center">
            <h1>{sideTitle}</h1>
          </div>
        )}
        <input
          className={`px-3 py-1 w-full border ${
            sideTitle ? "border-l-0" : "rounded-lg"
          } bg-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200`}
          type={type}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          step={0.1}
          min={min ? min : 0}
          max={max ? max : Number.MAX_VALUE}
        />
      </div>
      <h1 className="text-red-500">{errors && touched && errors}</h1>
    </div>
  );
};
