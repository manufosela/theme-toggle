export class ThemeToggle extends LitElement {
    static get styles(): import("lit").CSSResult[];
    static get properties(): {
        id: {
            type: StringConstructor;
        };
        theme: {
            type: StringConstructor;
        };
    };
    theme: string;
    bgColors: {
        light: string;
        dark: string;
    };
    invertColorsCSS: string;
}
import { LitElement } from "lit-element/lit-element";
