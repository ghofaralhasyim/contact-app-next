import { css, Global } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        font-family: sans-serif;
        line-height: 1.15;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      * {
        box-sizing: content-box;
      }
      ul,
      li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      main {
        height: 100dvh;
      }
      a {
        text-decoration: none;
        color: unset;
      }
    `}
  />
);
