import * as CSTS from "./constants.js"

export class Modal {
    constructor(x, y, w, h, parent) {
        this.element = document.createElement("div")
        this.element.style.position = "absolute"    
        this.element.style.width = w + "px"
        this.element.style.height = h + "px"
        this.element.style.top = y + "px"
        this.element.style.left =x + "px"
        
        parent.appendChild(this.element)
    }

    setBgColor (color){
        this.element.style.background = color;
    }

    setFgColor (color){
        this.element.style.color = color;
    }

    setBorder (color, width, style, radius, border) {
        if (!border){
            this.element.style.border = "none"    
        }

        if (radius){
            this.element.style.borderRadius = radius + "px"
        }        
        this.element.style.border = `${width}px ${color} ${style}`
    }

    show () {
        this.element.style.display= "inline-block"
    }

    hide () {
        this.element.style.display= "none"
    }

    append(elem){
        this.element.appendChild(elem.element)
    }

}


export class Label{
    constructor (x, y, font, textSz, text, parent) {
        this.element = document.createElement("span")        
        this.x = x
        this.y = y
        this.font = font
        this.textSz = textSz
        this.text = text
        parent.element.appendChild (this.element)
        this.element.style.left = this.x
        this.element.style.top = this.y
        this.element.style.position = "absolute"
        this.element.innerHTML = this.text
    }

    setTextSize (size){
        this.element.style.fontSize = size + "px"
    }

    setTextColor(color){
        this.element.style.color = color
    }

    setFont(family, type){
        this.element.style.fontFamily = `${family} ${type}`
    }

    setText(text){
        this.element.innerHTML = text
    }

    expandAndCenter() {
        this.element.style.left = "0"
        this.element.style.top = "0"
        this.element.style.width = "100%"
        this.element.style.height = "100%"
        this.element.style.alignItems = "center"
        this.element.style.justifyContent = "center"
        this.element.style.display = "flex"
    }
}

export function createModal (winDef, parent) {
    let modal = document.createElement("div")
    modal.id = winDef.id
    modal.style.display = "none";
    modal.style.position = "absolute";
    modal.style.background = CSTS.COLORS.BLUE;
    modal.style.width = winDef.w + "px"
    modal.style.height = winDef.h + "px"
    modal.style.color = CSTS.COLORS.WHITE
    modal.style.top = winDef.y + "px"
    modal.style.left = winDef.x + "px"
    modal.style.border = "1px white solid"
    modal.style.borderRadius = "10px"
    parent.appendChild(modal)
    return modal
}

export function createLabel (labelDef, parent){
    let span = document.createElement("span")
    span.style.height = "1fr"
    span.style.display = "flex"
    span.style.justifyContent = labelDef.align //"center"
    span.style.alignItems = labelDef.align //"center"
    span.style.fontSize = labelDef.textSize + "px"//"40px"
    span.innerHTML = labelDef.text
    parent.appendChild(span)
    return span
}