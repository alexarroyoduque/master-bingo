import { LitElement, html, css } from 'lit-element';

export class BingoBall extends LitElement {

  static get is() {
    return 'bingo-ball';
  }

  static get properties() {
    return {
      ball: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.ball = {
      isActive: false,
      value: 0
    };
  }

  static get styles() {
    return css`

      :host {
        display: inline-block;
      }

      .ball {
        background-color: #E0E0E0;
        color: #212121;
        border-radius: 50%;
        padding: .3rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        font-size: 12px;
        box-shadow: 0 0 0 1px #212121 inset;
        display: table-cell;
        vertical-align: middle;
      }

      .active-true {
        transition: background-color .5s ease;
        background-color: #81e210;
      }

      @media (min-width: 480px) {
        .ball {
          padding: 0.7rem;
          font-size: 1.1rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      @media (min-width: 600px) {
        .ball {
          font-size: 1.4rem;
          width: 1.8rem;
          height: 1.8rem;
        }
      }

    `;
  }

  render() {
    return html`
      <span class='ball active-${this.ball.isActive}'>${this.ball.value}</span>
    `;
  }

}

customElements.define('bingo-ball', BingoBall);
