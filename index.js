import Game from "/game.js"
import InputHandler from "/input.js"
let canvas = document.getElementById("gameScreen")
let container = document.getElementById("container")
container.style.gridTemplateRows = canvas.height + "px"

let ctx = canvas.getContext("2d")
let game = new Game (canvas.width, canvas.height)
new InputHandler(game)
let lastTime = 0;
let fps

function gameLoop (timeStamp) {
    const dt = (timeStamp - lastTime) * .001
    fps = Math.round(1 / dt)
    lastTime = timeStamp
    game.update(dt)
    game.draw(ctx)
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)



