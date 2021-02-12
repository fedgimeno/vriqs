import {GAMESTATE} from "./constants.js"

export default class InputHandler {
    constructor (game) {
        this.game = game
        this.paddle = this.game.paddle

        document.addEventListener("keydown", event => {
            
            switch (event.code){
                case "ArrowLeft":
                    if (this.game.gamestate === GAMESTATE.RUNNING)
                        this.paddle.moveLeft()
                    break
                case "ArrowRight":
                    if (this.game.gamestate === GAMESTATE.RUNNING)
                        this.paddle.moveRight()
                    break
                case "Enter":
                    if (this.game.gamestate === GAMESTATE.MENU){
                        this.game.gamestate = GAMESTATE.RUNNING
                    }  if (this.game.gamestate === GAMESTATE.GAMEOVER){
                        this.game.init()                        
                    }
                    break
                case "KeyP":
                    if (this.game.gamestate === GAMESTATE.RUNNING){
                        this.game.gamestate = GAMESTATE.PAUSED;
                    } else if (this.game.gamestate === GAMESTATE.PAUSED){
                        this.game.gamestate = GAMESTATE.RUNNING;
                    }
                    break
            }
          }, true);

          document.addEventListener("keyup", event => {
            
            switch (event.code){
                case "ArrowLeft":
                    if (this.game.gamestate === GAMESTATE.RUNNING){
                        if (this.paddle.velocity < 0)
                            this.paddle.stop()
                    }
                    break;
                case "ArrowRight":
                    if (this.game.gamestate === GAMESTATE.RUNNING){
                        if (this.paddle.velocity > 0)
                            this.paddle.stop()
                    }
                    break;
            }
          }, true);
    }
}