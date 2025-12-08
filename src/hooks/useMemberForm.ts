import { useState, useCallback } from "react";
import { z } from "zod";

interface UseMemberFormOptions<T extends z.ZodTypeAny> {
  schema: T;
  onSuccess?: (data: z.infer<T>) => void;
}

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useMemberForm<T extends z.ZodTypeAny>({
  schema,
  onSuccess,
}: UseMemberFormOptions<T>) {
  const [errors, setErrors] = useState<FormErrors<z.infer<T>>>({});

  const validateForm = useCallback(
    (data: z.infer<T>): boolean => {
      const result = schema.safeParse(data);

      if (!result.success) {
        const fieldErrors: FormErrors<z.infer<T>> = {};
        result.error.issues.forEach((err) => {
          if (err.path && err.path.length > 0) {
            const key = String(err.path[0]) as keyof z.infer<T>;
            fieldErrors[key] = err.message;
          }
        });
        setErrors(fieldErrors);
        return false;
      }

      setErrors({});
      onSuccess?.(data);
      return true;
    },
    [schema, onSuccess]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: keyof z.infer<T>) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateForm,
    clearErrors,
    clearFieldError,
  };
}
