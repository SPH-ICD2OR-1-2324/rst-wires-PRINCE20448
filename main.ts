namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function _4_Wire () {
    BlueC = 0
    RedC = 0
    YellowC = 0
    WhiteC = 0
    BlackC = 0
    for (let value of WireList) {
        if (value == 2) {
            YellowC += 1
        }
        if (value == 0) {
            RedC += 1
        }
        if (value == 3) {
            YellowC += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        ODDSN = true
    }
    if (RedC >= 1 && ODDSN == true) {
        game.splash("Cut Last Wire")
    } else if (WireList[3] == 3 && RedC == 0) {
        game.splash("Cut 1st Wire")
    } else if (BlueC > 1) {
        game.splash("Cut 1st Wire")
    } else if (YellowC >= 1) {
        game.splash("Cut Last Wire")
    } else {
        game.splash("Cut 2nd wire")
    }
}
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    _3_Wire()
    _4_Wire()
    _5_Wire()
    _6_Wire()
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
function _6_Wire () {
    BlueC = 0
    RedC = 0
    YellowC = 0
    WhiteC = 0
    BlackC = 0
    for (let value of WireList) {
        if (value == 2) {
            YellowC += 1
        }
        if (value == 0) {
            RedC += 1
        }
        if (value == 3) {
            YellowC += 1
        }
        if (value == 4) {
            BlackC += 1
        }
        if (value == 4) {
            WhiteC += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        ODDSN = true
    } else {
        ODDSN = false
    }
    if (YellowC == 0 && ODDSN == true) {
        game.splash("Cut 3rd Wire")
    } else if (YellowC == 1 && WhiteC > 1) {
        game.splash("Cut 4th Wire")
    } else if (RedC == 0) {
        game.splash("Cut Last Wire")
    } else {
        game.splash("Cut 4th Wire")
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
function _5_Wire () {
    BlueC = 0
    RedC = 0
    YellowC = 0
    WhiteC = 0
    BlackC = 0
    for (let value of WireList) {
        if (value == 2) {
            YellowC += 1
        }
        if (value == 0) {
            RedC += 1
        }
        if (value == 3) {
            YellowC += 1
        }
        if (value == 4) {
            BlackC += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        ODDSN = true
    }
    if (WireList[4] >= 4 && ODDSN == true) {
        game.splash("Cut 4th Wire")
    } else if (RedC == 1 && YellowC > 1) {
        game.splash("Cut 1st Wire")
    } else if (BlackC == 0) {
        game.splash("Cut 2nd Wire")
    } else {
        game.splash("Cut 1st Wire")
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _3_Wire () {
    BlueC = 0
    RedC = 0
    for (let value of WireList) {
        if (value == 2) {
            BlueC += 1
        }
        if (value == 0) {
            RedC += 1
        }
    }
    // Wirelist means the Location 
    // The number Means the colour
    if (RedC == 0) {
        game.splash("Cut 2nd Wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut Last Wire")
    } else if (BlueC > 1) {
        game.splash("Cut Last Blue Wire")
    } else {
        game.splash("Cut Last Wire")
    }
}
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let Ratio = 0
let cursor: Sprite = null
let ODDSN = false
let SerialNumber = 0
let WireList: number[] = []
let BlackC = 0
let WhiteC = 0
let YellowC = 0
let RedC = 0
let BlueC = 0
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
