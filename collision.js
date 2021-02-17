
export function ballCollidesTop (ball, colObj) 
{
    if (ball.pos.x + ball.size > colObj.pos.x &&
        ball.pos.x - ball.size < colObj.pos.x + colObj.width &&
        ball.pos.y + ball.size > colObj.pos.y && 
        ball.pos.y - ball.size < colObj.pos.y && 
        ball.velocity.y > 0){
            return true
        }
}


export function ballCollidesBottom (ball, colObj)
{
    if (ball.pos.x + ball.size > colObj.pos.x &&
        ball.pos.x - ball.size < colObj.pos.x + colObj.width &&
        ball.pos.y - ball.size < colObj.pos.y + colObj.height && 
        ball.pos.y + ball.size > colObj.pos.y + colObj.height && 
        ball.velocity.y < 0 ){
            return true
        }
}

export function ballCollidesLeft (ball, colObj){

    if (ball.pos.x - ball.size < colObj.pos.x + colObj.width &&
        ball.pos.x + ball.size > colObj.pos.x + colObj.width &&
        ball.pos.y + ball.size > colObj.pos.y &&
        ball.pos.y - ball.size < colObj.pos.y + colObj.height &&
        ball.velocity.x < 0) {
            return true
    }

}

export function ballCollidesRight (ball, colObj){

    if (ball.pos.x + ball.size > colObj.pos.x &&
        ball.pos.x - ball.size < colObj.pos.x &&
        ball.pos.y + ball.size > colObj.pos.y &&
        ball.pos.y - ball.size < colObj.pos.y + colObj.height &&
        ball.velocity.x > 0) {
            return true
    }

}

export function getAngle(dist, chunks, max_ang, min_ang){

    let chunk_sz = (max_ang - min_ang) / chunks
    if (dist <= 1){
        return max_ang
    }

    for (let i = 0; i < chunks; i++){                
        if (dist > chunk_sz * i && dist <= chunk_sz * (i+1)){        
            return max_ang - (chunk_sz * (i+1))
        }    
    }

    if (dist >= chunk_sz * chunks){
        return min_ang
    }
}