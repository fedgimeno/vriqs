import * as CSTS from "./constants.js"
export default class Paddle {

    constructor(game) {
        this.image = new Image()
        this.width = 120
        this.height = 20
        this.image = new Image(this.width, this.height)
        this.image.src ="./assets/paddle.png"
        this.pos = {}
        this.game = game
        this.max_speed = 600
        this.reset()
    }

    reset() {
        this.dying_ctr = 0
        this.dying_anim_ctr = 0
        this.pos.x = this.game.width / 2 - this.width / 2
        this.pos.y = this.game.height - this.height - 40
        this.velocity = 0
    }

    stop () {
        this.velocity = 0;
    }

    moveLeft () {        
        this.velocity = -this.max_speed
    }

    moveRight () {
        this.velocity = +this.max_speed
    }

    update (dt){

        //console.log ("paddle update")
        this.pos.x += this.velocity * dt

        if (this.pos.x < 0){
            this.pos.x = 0
        }

        if (this.pos.x + this.width > this.game.width){
            this.pos.x = this.game.width - this.width
        }
    }

    draw (ctx){
        if (this.game.gamestate === CSTS.GAMESTATE.PLYR_DYING){
            if (!this.dying_anim_ctr) return
        }
        ctx.drawImage(this.image, this.pos.x, this.pos.y)
    }
}