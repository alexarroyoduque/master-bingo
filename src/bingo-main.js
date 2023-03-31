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
        .panel {
          margin: 0 auto;
          text-align: center;
          width: 830px;
          position: relative;
        }

        .new-ball {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #E91E63;
          box-shadow: 0 0 0 6px white inset;
          border: 8px solid #E91E63;
          color: white;
          font-size: 80px;
          line-height: 90px;
          padding: 20px;
          display: inline-block;
          top: 40px;
        }

        .new-ball-1 {
          left: -22%;
        }

        .new-ball-2 {
          left: 103%;
        }

        .pause-info {
          background-color: white;
          color: #6f6d6d;
          font-size: 80px;
          left: 32.5%;
          opacity: .7;
          padding: 20px;
          position: absolute;
          top: 100px;
        }

        button {
          outline: 0;
          border: none;
          height: 50px;
          width: 100px;
          font-size: 18px;
          color: white;
          margin: 10px;
          position: absolute;
          left: -170px;
          background-color: #3c49ef;
        }

        button:active {
          background-color: #616161;
        }

        .start {
          background-color: #3c49ef;
          top: 400px;
        }

        .start::after {
          content: "Puedes usar la tecla espacio";
          position: absolute;
          color: #616161;
          font-size: 13px;
          left: 0;
          top: 52px;
        }

        .stop {
          background-color: #f121ba;
          top: 500px;
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

      <div class="panel">

        <div class="new-ball new-ball-1">
          ${this.newBallActive.value}
        </div>

        <span ?hidden=${this.isStartDisabled} class="pause-info">PAUSA</span>

        ${this.balls.map(ball => html`
          <bingo-ball id='ball${ball.index}' .ball=${ball}></bingo-ball>
        `)}

        <div class="new-ball new-ball-2">
          ${this.newBallActive.value}
        </div>

        <button class="start" ?disabled=${this.isStartDisabled} @click=${this.start}>${this.startText}</button>
        <button class="stop" ?disabled=${!this.isStartDisabled} @click=${this.stop}>Stop</button>
      </div>
    `;
  }

}

customElements.define('bingo-main', BingoMain);
