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
      .ball {
        background-color: #E0E0E0;
        color: #212121;
        border-radius: 50%;
        padding: .55rem;
        display: inline-block;
        width: .5rem;
        height: .5rem;
        font-size: 12px;
        line-height: 9px;
        margin: 1px;
        box-shadow: 0 0 0 1px #212121 inset;
      }

      .active-true {
        transition: background-color .5s ease;
        background-color: #81e210;
      }

      @media (min-width: 700px) {
        .ball {
          padding: 1.2rem;
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }
      }

      @media (min-width: 800px) {
        .ball {
          padding: 1.5rem;
          font-size: 1.3rem;
          margin: 2px;
          width: 1.2rem;
          height: 1.2rem;
          line-height: 1rem;

        }
      }

      @media (min-width: 900px) {
        .ball {
          padding: 1.5rem;
          margin: 2px;
          font-size: 1.4rem;
          width: 1.4rem;
          height: 1.4rem;
          line-height: 1.4rem;
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
