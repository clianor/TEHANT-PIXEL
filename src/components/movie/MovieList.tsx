/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export const MovieList: React.FC = ({ children }) => {
  return <div css={listStyle}>{children}</div>;
};

const listStyle = css`
  & > div + div {
    padding-top: 1.5rem;
    border-top: 2px solid #eee;
  }
`;
