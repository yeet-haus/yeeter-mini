import { FieldApi } from "@tanstack/react-form";

export const FieldInfo = ({
  field,
  message,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
  message?: string;
}) => {
  return (
    <>
      <div className="label">
        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
          <span className="label-text-alt text-accent">
            {field.state.meta.errors[0]}
          </span>
        )}

        {message && (
          <span className="label-text-alt text-primary font-bold">
            {message}
          </span>
        )}
      </div>
    </>
  );
};
