import { styled } from "@mui/material";

export const Container = styled("div")`
  border-right: 1px solid;
  border-right-color: ${(props) => props.theme.palette.grey[200]};
  display: flex;
  flex-direction: column;
  min-width: 300px;

  ${(props) => props.theme.breakpoints.up("lg")} {
    min-width: 300px;
  }
`;
export const SearchContainer = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
`;
export const ListContainer = styled("div")`
  overflow-y: auto;
`;