/* eslint-disable @typescript-eslint/no-explicit-any */
export function ValidationErrorLabel({
  errors,
  serverErrors,
  field,
}: {
  errors: Record<string, any>;
  serverErrors: Record<string, any>;
  field: string;
}) {
  const error = errors[field] || serverErrors[field];
  if (!error) return null;

  return (
    <>
      {errors[field] && (
        <p className="text-red-500 text-xs">{errors[field].message}</p>
      )}
      {serverErrors && serverErrors[field] && (
        <p className="text-red-500 text-xs">{serverErrors[field][0]}</p>
      )}
    </>
  );
}
