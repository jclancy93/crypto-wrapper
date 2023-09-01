import styled from "styled-components";

export * from "./Header";
export * from "./Button";
export * from "./Footer";
export * from "./Stats";
export * from "./Tabs";
export * from "./Input";
export * from "./Steps";
export * from "./Web3Modal";

export const Body = styled.body``;

export const Image = ({ ...props }) => <img {...props} />;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const DarkLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: rgb(129 137 149);
  cursor: pointer;

  &:hover {
    text-decoration: underline !important;
  }
`;
