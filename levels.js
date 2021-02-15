import Brick from "./brick.js";
import {COLORS} from "./constants.js"
export default class Levels {
    constructor (game) {
        this.game = game
        this.levels = [ 
            //[0,0,0,0,0,0,0,0,0,1],
            //Level1
            [   
                0,0,0,0,0,0,0,0,0,0,0,      
                0,0,0,0,0,0,0,0,0,0,0,
                1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,0,
                1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,0,
                1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,0,
                1,1,1,1,1,1,1,1,1,1,1
            ],
            //Level2
            [         
                0,0,0,0,0,0,0,0,0,0,0,
                0,1,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0,1,0,1,0,1,
                0,2,0,2,0,2,0,2,0,2,0,
                1,0,1,0,1,0,1,0,1,0,1,
                0,1,0,1,0,1,0,1,0,1,0,
                0,0,1,0,2,0,2,0,1,0,0,
                0,0,0,1,0,2,0,1,0,0,0,
                0,0,0,0,1,0,1,0,0,0,0,
                0,0,0,0,0,1,0,0,0,0,0
            ],
            //Level3
            [   0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,
                2,2,2,2,2,2,2,2,2,2,2,
                2,1,1,1,3,3,3,1,1,1,2,
                2,1,1,1,1,1,1,1,1,1,1,
                0,2,1,1,1,1,1,1,1,2,0,
                0,0,2,1,1,1,1,1,2,0,0,
                0,0,0,2,1,1,1,2,0,0,0,
                0,0,2,1,1,1,1,1,2,0,0,
                0,2,1,1,1,1,1,1,1,2,0,
                0,0,0,0,2,3,2,0,0,0,0,                
            ],
            //Level4
            [
                0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,
                1,1,1,0,0,0,0,0,1,1,1,
                1,1,2,1,0,0,0,1,2,1,1,
                1,1,3,2,2,0,2,2,3,1,3,
                1,1,3,3,4,4,4,3,3,1,1,
                1,1,1,1,2,2,2,1,1,1,1,
                1,1,1,1,1,3,1,1,1,1,1,
                0,0,1,1,1,1,1,1,1,0,0,
                0,0,0,1,1,1,1,1,0,0,0,
                0,0,0,0,3,2,3,0,0,0,0
            ]
        ]
    }

    load (level){
        
        let lvlArray = this.levels[level];
        let bw = this.game.width / 11
        let bh = 30
        let bricks = []
        console.log (lvlArray)

        lvlArray.forEach( (val, index, arr) => {
            let pos = {
                x: (index * bw) % this.game.width,
                y: (Math.floor(index/ 11) * bh) % this.game.height
            }

            if (val > 0){
                let img_src = "./assets/green_brick.png"                   
                let hp = val
                if (val === 2) {  
                    img_src = "./assets/blue_brick.png"                   
                    //color = COLORS.LIGHT_BLUE 
                } else if (val === 3) {
                    img_src = "./assets/red_brick.png"                   
                    //color = COLORS.RED
                } else if (val === 4) {
                    img_src = "./assets/gray_brick.png"                   
                }
                bricks.push (new Brick (pos, bw, bh, img_src, hp, this.game) )
            }
        } ) 

        return bricks
    }
}