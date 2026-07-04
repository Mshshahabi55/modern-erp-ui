import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AppButton } from "@/components/common/AppButton";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isLoading,
    isAuthenticated,
    isInitialized,
  } = useAuth();

  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname ?? ROUTES.DASHBOARD;

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate, from]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "admin",
      password: "admin123",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(undefined);

    try {
      await login(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 3,
              bgcolor: "primary.main",
              color: "#fff",
              mb: 2,
              fontSize: 28,
            }}
          >
            📊
          </Box>

          <Typography variant="h5" fontWeight={700}>
            ERP Management System
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Sign in to continue
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  placeholder="Enter your username"
                  fullWidth
                  autoFocus
                  autoComplete="username"
                  disabled={isLoading}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  fullWidth
                  autoComplete="current-password"
                  disabled={isLoading}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setShowPassword((prev) => !prev)
                            }
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Remember me"
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        disabled={isLoading}
                      />
                    }
                  />
                )}
              />

              <Link
                href="#"
                underline="hover"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </Link>
            </Box>

            <AppButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </AppButton>
          </Box>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption">
            Demo Credentials
          </Typography>
        </Divider>

        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          Username: <strong>admin</strong> | Password:{" "}
          <strong>admin123</strong>
        </Typography>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            textAlign: "center",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ERP Next v1.0.0
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}