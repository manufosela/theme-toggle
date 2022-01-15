import { html, LitElement } from 'lit';
import { themeToggleStyles } from './theme-toggle-styles.js';

export class ThemeToggle extends LitElement {
  static get is() {
    return 'theme-toggle';
  }

  static get styles() {
    return [themeToggleStyles];
  }

  static get properties() {
    return {
      id: { type: String },
      theme: { type: String },
    };
  }

  constructor() {
    super();
    this.id = `theme-toggle-${Math.floor(Math.random() * 100000)}`;
    this.theme = 'light';
    this.bgColors = {
      light: '#fff',
      dark: '#11191f',
    };
    this.invertColorsCSS = `
      body { -webkit-filter: invert(100%); filter: invert(100%); }
    `;
    document.documentElement.dataset.theme = this.theme;
  }

  firstUpdated() {
    this.shadowRoot
      .querySelector('#themeToggle')
      .addEventListener('click', e => {
        if (e.target.tagName === 'INPUT') {
          this.shadowRoot
            .querySelector(`#label${this.theme}`)
            .classList.remove('checked');
          this.shadowRoot
            .querySelector(`#img${this.theme}`)
            .removeAttribute('fill');
          this.theme = e.target.value;
          document.documentElement.dataset.theme = this.theme;
          this.shadowRoot
            .querySelector(`#label${this.theme}`)
            .classList.add('checked');
          this.shadowRoot
            .querySelector(`#img${this.theme}`)
            .setAttribute('fill', 'currentColor');

          this.dispatchEvent(
            new CustomEvent('theme-changed', {
              detail: {
                id: this.id,
                theme: this.theme,
              },
            })
          );
          if (this.theme === 'dark') {
            const head = document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.id = 'dark-theme-styles';
            style.textContent = this.invertColorsCSS;
            head.appendChild(style);
            this.shadowRoot.querySelector(
              '#themeToggle'
            ).style.backgroundColor = this.bgColors.dark;
            this.shadowRoot.querySelector('svg').style.fill = '#fff';
          } else {
            document.getElementById('dark-theme-styles').remove();
            this.shadowRoot.querySelector(
              '#themeToggle'
            ).style.backgroundColor = this.bgColors.light;
            this.shadowRoot.querySelector('svg').style.fill = '';
          }
        }
      });
  }

  render() {
    return html`
      <div id="themeToggle" class="theme-toggle">
        <!-- theme toggle from astro.build -->
        <label id="labellight" class="checked">
          <svg
            id="imglight"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <input
            type="radio"
            name="theme-toggle"
            value="light"
            title="Use light theme"
            aria-label="Use light theme"
          />
        </label>
        <label id="labeldark">
          <svg
            id="imgdark"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <input
            type="radio"
            name="theme-toggle"
            value="dark"
            title="Use dark theme"
            aria-label="Use dark theme"
          />
        </label>
      </div>
    `;
  }
}
