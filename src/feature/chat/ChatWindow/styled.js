import { alpha, styled } from "@mui/material";

export const Header = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => props.theme.palette.grey[200]};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ChatContainer = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  overflow-y: auto;
`;

export const ChatItemContainer = styled("div")`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  justify-content: ${(props) => !props.guest && "flex-end"};
`;

export const UserChatContainer = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const ChatItemContent = styled("div")`
  display: inline-flex;
  flex-direction: column;
  align-items: ${(props) => !props.guest && "flex-end"};
  width: 70%;
`;

export const ChatItemText = styled("div")`
  background-color: ${(props) =>
    props.guest ? props.theme.palette.grey[200] : alpha(props.theme.palette.secondary.main, 0.5)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  padding: ${(props) => props.theme.spacing(1)};
  display: inline-block;
`;

export const InputContainer = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  border-top: 1px solid;
  border-top-color: ${(props) => props.theme.palette.grey[200]};
  display: flex;
  align-items: center;
`;