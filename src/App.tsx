import type { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { LoginForm, RegisterForm } from "@/components";
import { HomePage, type IAppProps, NotFoundPage, ProfilePage } from "@/pages";
import { ProtectedRoute } from "@/utils";

export const App: FC<IAppProps> = ({ toggleTheme, isDark }: IAppProps) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage toggleTheme={toggleTheme} isDark={isDark} />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
