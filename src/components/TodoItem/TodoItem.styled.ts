import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

export const TodoCard = styled(Card)`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
`;

export const StyledCardContent = styled(CardContent)`
  flex: 1;
  padding: 0;
`;

export const Title = styled(Typography)<{ $completed?: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  color: ${({ theme, $completed }) =>
    $completed ? theme.palette.text.secondary : theme.palette.text.primary};
`;

export const Actions = styled.div`
  display: flex;
  gap: 4px;
`;
