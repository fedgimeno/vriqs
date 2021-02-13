import Ball from "./ball.js"
import Paddle from "/paddle.js"
import Levels from "./levels.js"
import * as CSTS from "./constants.js"
import * as UI from "./ui.js"

export default class Game {

    constructor (width, height){
        this.width = width
        this.height = height

        //The pause dialog
        this.pauseModal = new UI.Modal(
            this.width/2 - CSTS.PAUSE_WIN_W/2,
            this.height/2 - CSTS.PAUSE_WIN_H/2,
            CSTS.PAUSE_WIN_W,
            CSTS.PAUSE_WIN_H,
            document.getElementById("main")
        )
        this.pauseModal.setBgColor(CSTS.COLORS.WHITE)
        this.pauseModal.setFgColor(CSTS.COLORS.BLUE)
        this.pauseModal.setBorder(CSTS.COLORS.LIGHT_BLUE, 5, "solid", 10)

        this.pauseLabel = new UI.Label(0,0,"Verdana","sans-serif",CSTS.PAUSE_TEXT,this.pauseModal);
        this.pauseLabel.setTextColor(CSTS.COLORS.BLUE)
        this.pauseLabel.setTextSize(30)
        this.pauseLabel.expandAndCenter()
        this.pauseModal.append(this.pauseLabel)

        //The start dialog
        this.startModal = new UI.Modal(
            this.width/2 - CSTS.READY_WIN_W/2,
            //this.height/2 - CSTS.READY_WIN_H/2,
            330 - 40,
            CSTS.READY_WIN_W,
            CSTS.READY_WIN_H,
            document.getElementById("main")
        )
        this.startModal.setBgColor(CSTS.COLORS.WHITE)
        this.startModal.setFgColor(CSTS.COLORS.BLUE)
        this.startModal.setBorder(CSTS.COLORS.LIGHT_BLUE, 5, "solid", 10)

        this.readyLabel = new UI.Label(0,0,"Verdana","sans-serif",CSTS.MENU_TEXT,this.startModal);
        this.readyLabel.setTextColor(CSTS.COLORS.BLUE)
        this.readyLabel.setTextSize(25)
        this.readyLabel.expandAndCenter()
        this.startModal.append(this.readyLabel)

        //Create the game objects
        this.paddle = new Paddle(this)
        this.ball = new Ball(this)
        this.levels = new Levels(this)
        this.init()
    }

    init () {
        this.win = false;
        this.bricks = []
        this.lives = CSTS.MAX_LIVES
        this.score = 0
        this.curr_level = 0
        this.bricks = this.levels.load (this.curr_level, this.bricks)
        this.gamestate = CSTS.GAMESTATE.MENU;
        this.paddle.reset()
        this.ball.reset()
    }

    clear (ctx) {
        ctx.fillStyle = CSTS.COLORS.BLACK_30
        ctx.fillRect(0, 0, this.width, this.height);
    }

    drawText(ctx, x, y, align, color,  size, text){
        ctx.font = `${size}px Arial`;
        ctx.fillStyle = color
        ctx.textAlign = align
        ctx.fillText(text, x, y); 
    }

    update (dt){
        
        if (this.gamestate === CSTS.GAMESTATE.RUNNING){
            this.bricks = this.bricks.filter ( (val, index, arr) => { return !val.deleteme } )
            this.bricks.forEach (brick => { brick.update(dt) })
            this.paddle.update(dt)
            this.ball.update(dt)

            if (!this.lives){
                this.gamestate = CSTS.GAMESTATE.GAMEOVER
                return
            }

            if (this.bricks.length === 0) {
                this.gamestate = CSTS.GAMESTATE.MENU
                this.curr_level ++;
                console.log (this.curr_level,this.levels.levels.length)
                if (this.curr_level === this.levels.levels.length){
                    this.win = true;
                    this.gamestate = CSTS.GAMESTATE.GAMEOVER
                    return
                }
                this.ball.reset()
                this.paddle.reset()
                this.bricks = this.levels.load (this.curr_level, this.bricks)
            }
        }
    }

    draw (ctx) {
        let half_w = this.width / 2
        let half_h = this.height / 2
        this.pauseModal.hide()
        this.startModal.hide()

        if (this.gamestate !== CSTS.GAMESTATE.GAMEOVER){
            this.clear(ctx)
            this.paddle.draw(ctx)
            this.ball.draw(ctx)
            this.bricks.forEach (brick => { brick.draw(ctx) })
            let text = `Score: ${this.score}     Lives: ${this.lives}     Level: ${this.curr_level + 1}`
            this.drawText(ctx, 10, this.height - 10, "left", CSTS.COLORS.WHITE, 20, text)
        }

        if (this.gamestate === CSTS.GAMESTATE.GAMEOVER){
            this.clear(ctx)
            if (!this.win){
                this.drawText(ctx, half_w, half_h - 30, "center", CSTS.COLORS.RED, 50, CSTS.GAMEOVER_TEXT1)
            } else {
                this.drawText(ctx, half_w, half_h - 30, "center", CSTS.COLORS.GREEN, 55, "YOU WIN!")
            }
            this.drawText(ctx, half_w, half_h + 10, "center", CSTS.COLORS.LIGHT_BLUE, 20, CSTS.GAMEOVER_TEXT2)
            this.drawText(ctx, half_w, half_h + 50, "center", CSTS.COLORS.LIGHT_BLUE, 44, this.score)
            this.drawText(ctx, half_w, half_h + 100, "center", CSTS.COLORS.WHITE, 30, "Press enter to play again")
            return
        }

        if (this.gamestate === CSTS.GAMESTATE.PAUSED){            
            this.pauseModal.show()
            return
        }

        if (this.gamestate === CSTS.GAMESTATE.MENU) {
            this.startModal.show()
            return
        }        
    }
}