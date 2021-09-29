import React, { ChangeEventHandler } from 'react';

type FormInputProps = {
  handleChange: ChangeEventHandler;
  handleBlur: ChangeEventHandler;
  value: any;
  errors: any;
  touched: any;
  name: string;
  type?: string;
};

export const FormInput = ({
  handleChange,
  handleBlur,
  value,
  errors,
  touched,
  name,
  type = 'text',
}: FormInputProps) => {
  const formattedName = name.replace('_', ' ');
  return (
    <div className="flex flex-col w-full">
      <label className="text-left mb-1 text-md" htmlFor="start">
        {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}
      </label>
      <input
        className="px-3 py-1 rounded-lg border bg-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      <h1 className="text-red-500">{errors && touched && errors}</h1>
    </div>
  );
};
