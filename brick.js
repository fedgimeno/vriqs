import * as coll from "/collision.js"

export default class Brick{

    constructor (pos, width, height, img_src, hp, game) {
        this.pos = pos
        this.game = game
        this.width = width
        this.height = height        
        this.hp = hp;
        this.deleteme = false;
        this.image = new Image(this.width, this.height)
        this.image.src = img_src
    }

    update (dt) {

        if (this.ballCollides()){
            this.hp --
            let spin = Math.floor(Math.random() * (8 + 8) - 8)
            this.game.ball.angle += spin;
            if (spin < 0 && this.game.ball.angle <= 30)
                this.game.ball.angle = 30
            if (spin > 0 && this.game.ball.angle >= 70)
                this.game.ball.angle = 70
            
            if (this.hp < 1) this.deleteme = true
            this.game.score += 100;
        }
    }

    ballCollides () {
        let ball = this.game.ball;
        let collided = false;
        
        //Ball collides with top or bottom of brick

        if (coll.ballCollidesTop(ball, this) || coll.ballCollidesBottom(ball, this)){
            ball.velocity.y = -ball.velocity.y            
            collided = true
        }
        //Ball collides with left or right of brick
        else if (coll.ballCollidesLeft(ball, this) || coll.ballCollidesRight(ball, this)){
            ball.velocity.x = -ball.velocity.x
            collided = true
        } 

        
        return collided
    }
    draw (ctx) {
        ctx.drawImage(this.image, this.pos.x, this.pos.y)
    }
}