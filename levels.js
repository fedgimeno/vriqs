import Brick from "./brick.js";
import {COLORS} from "./constants.js"
export default class Levels {
    constructor (game) {
        this.game = game
        this.levels = [ 
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
                let color = COLORS.GREEN
                let hp = val
                if (val === 2) {                     
                    color = COLORS.LIGHT_BLUE 
                } else if (val === 3) {
                    color = COLORS.RED
                }
                bricks.push (new Brick (pos, bw, bh, color, hp, this.game) )
            }
        } ) 

        return bricks
    }
}