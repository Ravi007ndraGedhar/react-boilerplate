/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

export function useFormHandler<T extends Record<string, any>>(
  schema: Zod.Schema<T>,
  action: (formData: FormData) => Promise<any>,
  defaultValues?: Partial<T>
) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  });
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {}
  );

  const onSubmit = async (data: T) => {
    console.log("Data:", data);
    setServerErrors({}); // Reset server errors
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value as string)
    );

    console.log("Form Data: ", formData, "Data", data);
    const result = await action(formData);
    if (result.errors) setServerErrors(result.errors);

    if (result.success) {
      toast.success(result.message)
    }
    else
      toast.error(result.message)

  };

  return {
    register,
    handleSubmit,
    errors,
    serverErrors,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
    setValue,
    watch,
  };
}
