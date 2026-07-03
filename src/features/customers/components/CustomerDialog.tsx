import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Customer } from "../types/customer.types";
import {
  customerSchema,
  type CustomerFormValues,
} from "../validation/customer.schema";

interface CustomerDialogProps {
  open: boolean;

  loading?: boolean;

  customer?: Customer | null;

  onClose: () => void;

  onSubmit: (data: CustomerFormValues) => void;
}

const defaultValues: CustomerFormValues = {
  code: "",
  name: "",
  company: "",
  mobile: "",
  email: "",
  creditLimit: 0,
};

export function CustomerDialog({
  open,
  loading = false,
  customer,
  onClose,
  onSubmit,
}: CustomerDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (customer) {
      reset({
        code: customer.code,
        name: customer.name,
        company: customer.company ?? "",
        mobile: customer.mobile ?? "",
        email: customer.email ?? "",
        creditLimit: customer.creditLimit ?? 0,
      });

      return;
    }

    reset(defaultValues);
  }, [customer, open, reset]);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {customer ? "Edit Customer" : "Add Customer"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Code"
            fullWidth
            {...register("code")}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Company"
            fullWidth
            {...register("company")}
          />

          <TextField
            label="Mobile"
            fullWidth
            {...register("mobile")}
          />

          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Credit Limit"
            type="number"
            fullWidth
            {...register("creditLimit")}
            error={!!errors.creditLimit}
            helperText={errors.creditLimit?.message}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading
            ? customer
              ? "Updating..."
              : "Creating..."
            : customer
              ? "Update"
              : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}