import {COLORS} from "./constants.js"
export default class Paddle {

    constructor(game) {
        this.width = 120
        this.height = 20
        this.pos = {}
        this.game = game
        this.max_speed = 600
        this.reset()
    }

    reset() {
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
        ctx.fillStyle = COLORS.PURPLE
        ctx.fillRect (this.pos.x, this.pos.y, this.width, this.height)
    }
}