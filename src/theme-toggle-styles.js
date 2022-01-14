// Copyright 2022 manufosela.
// SPDX-License-Identifier: MIT

import { css } from 'lit';

export const themeToggleStyles = css`
  :host,
  :root {
    display: block;
  }

  /***** CSS TOGGLE INPUTS from astro.build ********/

  .theme-toggle {
    box-sizing: border-box;
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
    padding: 0.33em 0.67em;
    border-radius: 99em;
    background-color: hsla(215, 14%, 95%, 1);
  }
  .checked {
    color: hsla(22, 100%, 50%, 1);
    opacity: 1;
  }
  input[name=theme-toggle] {
      position: absolute;
      opacity: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
  }
  .theme-toggle>label {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: .5;
      cursor: pointer;
  }
`;