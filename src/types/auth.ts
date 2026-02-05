export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message?: string;
  error?: string;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("message" in error || "error" in error)
  );
};
