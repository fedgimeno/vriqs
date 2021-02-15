import * as CSTS from "./constants.js";
import * as coll from "/collision.js"
export default class Ball {
    
    constructor (game) {
        this.game = game        
        this.velocity = {
            x: 250,
            y: 300
        };
        this.size = 8;
        this.pos = {}
        this.reset();
    }

    reset (){
        this.pos = {
            x: this.game.width / 2,
            y: this.game.paddle.pos.y - this.size
        }
    }

    update (dt) {
        this.pos.x += this.velocity.x * dt
        this.pos.y += this.velocity.y * dt
        let ball_btm = this.pos.y + this.size
        let ball_top = this.pos.y - this.size
        let ball_lft = this.pos.x - this.size
        let ball_rgt = this.pos.x + this.size

        //Ball with game right
        if (ball_rgt > this.game.width){
            this.pos.x = this.game.width - this.size
            this.velocity.x = -this.velocity.x
        }
        //Ball with game left
        else if (ball_lft < 0){
            this.pos.x = 0 + this.size
            this.velocity.x = -this.velocity.x
        }

        //Ball with game bottom
        if (ball_btm > this.game.height) {
            this.game.lives --;
            this.game.gamestate = CSTS.GAMESTATE.MENU
            this.reset()
            this.game.paddle.reset()
        }

        //Ball with game top
        else if (ball_top < 0){            
            this.pos.y = 0 + this.size
            this.velocity.y = -this.velocity.y
        }
        
        //Ball collides with the paddle top
        if (coll.ballCollidesTop(this,this.game.paddle)){
            this.velocity.y = -this.velocity.y
        }
    }

    draw (ctx){
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false)
        ctx.fillStyle = CSTS.COLORS.YELLOW
        ctx.fill()
    }
}