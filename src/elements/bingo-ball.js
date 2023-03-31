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
        padding: 20px;
        display: inline-block;
        width: 28px;
        height: 28px;
        font-size: 26px;
        line-height: 26px;
        margin: 4px;
        box-shadow: 0 0 0 2px #212121 inset;
      }

      .active-true {
        transition: background-color .5s ease;
        background-color: #81e210;
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
