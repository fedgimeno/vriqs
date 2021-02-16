import * as CSTS from "./constants.js";
import * as coll from "/collision.js"
export default class Ball {
    
    constructor (game) {
        this.game = game        

        this.pos = {}
        this.reset();
    }

    reset (){
        this.velocity = {
            x: 350,
            y: 350
        };
        
        this.size = 8;
        this.angle = 45
        this.pos = {
            x: this.game.width / 2,
            y: this.game.paddle.pos.y - this.size - 10
        }
    }

    update (dt) {
        let rad_a = (Math.PI * this.angle) / 180
        this.pos.x += this.velocity.x * Math.cos(rad_a) * dt
        this.pos.y += this.velocity.y * Math.sin(rad_a) * dt
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
            let paddle_x = this.game.paddle.pos.x
            let pad_vel_x = this.game.paddle.velocity
            let paddle_c = paddle_x + (this.game.paddle.width / 2)
            let dist = Math.abs(paddle_c - this.pos.x)

            let a = 0
            if (dist <= 2){
                this.angle = 80
            } else if (dist > 2 && dist < 15){
                this.angle = 70
            } else if (dist > 15 && dist < 30){
                this.angle = 50
            } else if (dist > 30 && dist < 45){
                this.angle = 30
            } else if (dist > 45){
                this.angle = 20
            }
            
        
                        
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