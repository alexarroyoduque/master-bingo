/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


import { LitElement, html, css } from 'lit-element';
import './elements/bingo-ball.js';

export class BingoMain extends LitElement {
  static get properties() {
    return {
      startText: {
        type: String
      },
      balls: {
        type: Array
      },
      randomBalls: {
        type: Array
      },
      newBallActive :{
        type: Object
      },
      isStartDisabled: {
        type: Boolean,
        reflect: true 
      }
    };
  }

  constructor() {
    super();
    this.startText = 'Empezar';
    this.balls = [];
    this.randomBalls = [];
    this.newBallActive = {};
    this.isStartDisabled = false;
  }

  firstUpdated(){
    this.generateBalls();
    this.generateRandomBalls(this.balls);

    document.addEventListener('keyup', function(e) {
      if (e.code === 'Space') {
        this.managePausedGame();
      }
    }.bind(this));
  }

  generateBalls() {
    let balls = [];
    for (let i = 0; i < 90; i++) {
      balls.push({
        value: i + 1,
        isActive: false,
        index: i
      });
    }
    this.balls = balls;
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
  }

  generateRandomBalls(balls) {
    this.randomBalls = balls.slice();
    this.shuffle(this.randomBalls);
  }

  activeBall() {
    this.newBallActive = this.randomBalls.pop();
    this.balls[this.newBallActive.index].isActive = true;
    this.shadowRoot.querySelector(`#ball${this.newBallActive.index}`).requestUpdate();
    this.shadowRoot.querySelector(`#ball-audio${this.newBallActive.value}`).play();
  }

  start() {
    var interval = 5000;
    this.startText = 'Continuar';
    this.isStartDisabled = true;
    this.timer = setInterval(function() {
      this.activeBall();
    }.bind(this), interval);
  }

  stop() {
    clearInterval(this.timer);
    this.isStartDisabled = false;
  }

  managePausedGame() {
    if (!this.isStartDisabled) {
      this.start();
    } else {
      this.stop();
    }
  }


  static get styles() {
    return css`

        .parent {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 1fr 2fr;
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          height: calc(100vh - 3rem);
          align-items: center;
          max-width: 600px;
          margin: 0 auto;
        }

        /* buttons */
        .div1 {
          grid-area: 1 / 1 / 2 / 2;
          text-align: center;
        }
        /* new ball */
        .div2 {
          grid-area: 1 / 2 / 2 / 4;
          text-align: center;
        }
        /* balls */
        .div3 {
          grid-area: 2 / 1 / 3 / 4;
          text-align: center;
        }

        .panel {
          margin: 0 auto;
          text-align: center;
          width: 830px;
          position: relative;
        }

        .new-ball {
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          background-color: #E91E63;
          box-shadow: 0 0 0 6px white inset;
          border: 8px solid #E91E63;
          color: white;
          font-size: 90px;
          padding: 1rem;
          display: inline-block;
          line-height: 107px;
        }

        .pause-info {
          background-color: white;
          color: #6f6d6d;
          font-size: 80px;
          opacity: .7;
          padding: 20px;
          position: absolute;
          top: 50%;
          left: 0px;
          right: 0px;
          text-align: center;
        }

        button {
          outline: 0;
          border: none;
          height: 50px;
          width: 6rem;
          font-size: 18px;
          color: white;
          background-color: #3c49ef;
        }

        button:active {
          background-color: #616161;
        }

        .start {
          background-color: #3c49ef;
          margin-bottom: 1rem;
        }

        .stop {
          background-color: #f121ba;
        }

        button:disabled {
          opacity: .2;
        }
    `;
  }
    

  render() {
    return html`
      ${this.balls.map(ball => html`
        <audio
          id='ball-audio${ball.index + 1}'
          src="./src/audio/${ball.index + 1}.ogg" aria-hidden="true"
        ></audio>
      `)}

      <div class="parent">
        <span ?hidden=${this.isStartDisabled} class="pause-info">PAUSA</span>

        <div class="div1">
          <button class="start" ?disabled=${this.isStartDisabled} @click=${this.start}>${this.startText}</button>
          <button class="stop" ?disabled=${!this.isStartDisabled} @click=${this.stop}>Stop</button>
          <p>Puedes usar la tecla espacio</p>
        </div>
        <div class="div2">
          <div class="new-ball new-ball-1">
            ${this.newBallActive.value}
          </div>
        </div>
        <div class="div3">
          ${this.balls.map(ball => html`
            <bingo-ball id='ball${ball.index}' .ball=${ball}></bingo-ball>
          `)}
        </div>

      </div>
    `;
  }

}

customElements.define('bingo-main', BingoMain);
