import { Container, FormControl } from "@mui/material";
import styled from "styled-components";

export const WrapperHomePage = styled(Container)`
  margin-top: 32px;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const StyledFormControl = styled(FormControl)`
  min-width: 120px;
  flex: 1;
`;
