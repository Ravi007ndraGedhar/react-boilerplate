import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input } from "@/components/ui/input";
import { useFormHandler } from "@/hooks/useFormHandler";
import { permissionSchema } from "@/schemas/form";
import { ValidationErrorLabel } from "@/components/ui/validation-error-label";

export function CreatePermissionForm() {
  const resourceId = "1234dvdffg343c";

  const { register, errors, serverErrors, onSubmit, setValue, watch } =
    useFormHandler(permissionSchema, async (formData) => {
      return formData;
    });

  const name = watch("name");

  useEffect(() => {
    if (name) {
      const slug = name.toLowerCase().replace(/\s+/g, "_");
      setValue("slug", slug);
    }
  }, [name, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <FormControl label="PERMISSION NAME" htmlFor="permission-name">
        <Input
          id="permission-name"
          placeholder="Enter permission name"
          {...register("name")}
        />
        <ValidationErrorLabel
          field="name"
          errors={errors}
          serverErrors={serverErrors}
        />
        <div className="text-xs text-muted-foreground">
          You should add names like <span className="font-semibold">Read</span>,{" "}
          <span className="font-semibold">Update</span>,{" "}
          <span className="font-semibold">Delete</span>
        </div>
      </FormControl>

      <FormControl htmlFor="description" label="DESCRIPTION">
        <Input
          id="description"
          placeholder="Enter description"
          {...register("description")}
        />
        <ValidationErrorLabel
          field="description"
          errors={errors}
          serverErrors={serverErrors}
        />
      </FormControl>
      <FormControl htmlFor="machine_name" label="MACHINE NAME">
        <Input
          type="text"
          id="machine_name"
          placeholder="Enter machine name"
          {...register("slug")}
        />
        <div className="text-xs text-muted-foreground">
          Can only be separated by underscore (_) and no other special
          characters. This can later be used to check the permission as
          hasPermission(create_user)
        </div>
        <ValidationErrorLabel
          field="slug"
          errors={errors}
          serverErrors={serverErrors}
        />
      </FormControl>
      <input type="hidden" value={resourceId} {...register("resourceId")} />

      <ValidationErrorLabel
        field="general"
        errors={errors}
        serverErrors={serverErrors}
      />
      <div className="flex items-center gap-2 mb-1">
        <Button type="submit">Save</Button>
        <Button type="button" variant={"secondary"}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
