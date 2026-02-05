import { Typography } from "@mui/material";
import styled from "styled-components";

export const WrapperTodoList = styled.div`
  margin-top: 16px;
`;

export const EmptyMessage = styled(Typography)`
  padding-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
