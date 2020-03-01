var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener('click', clickHandler);

var blocks = [];
var width = canvas.width / 3;
var height = 100;

var xTurn = true;

var isGameOver = false;

var xWins = 0;
var oWins = 0;

var knowledge = [];

function clickHandler(e) {

    if (isGameOver)
        return;

    var x = e.offsetX;
    var y = e.offsetY;

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {
            var cell = blocks[i][j];

            if (x >= cell.x && x <= cell.x + width) {
                if (y >= cell.y && y <= cell.y + height) {
                    if (blocks[i][j].v !== '') {
                        i = 3;
                        break;
                    }
                    blocks[i][j].v = xTurn == true ? 1 : 0;
                    drawBlocks();
                    i = 3;
                    runGameWinLogic();
                    computerPlay();
                    break;

                }
            }
        }
    }

}

function runGameWinLogic() {

    var won = check(xTurn);
    if (won) {
        isGameOver = true;
        drawBlocks();
        updateScore();
    } else {
        checkGamePlayOver();
    }

    xTurn = !xTurn;

    document.getElementById("turn").innerText = xTurn === true ? "X" : "O";
}

function updateScore() {

    if (xTurn) {
        xWins++;
    } else {
        oWins++;
    }

    document.getElementById("xScore").innerText = xWins;
    document.getElementById("oScore").innerText = oWins;
}

function checkGamePlayOver() {

    var played = 0;

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {
            if (blocks[i][j].v !== '') {
                played++;
            }
        }
    }

    if (played === 9) {
        isGameOver = true;
        xTurn = true;
    }

}

function createBlocks() {

    for (var i = 0; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 3; j++) {
            var cell = { v: '', x: 0, y: 0, isWinningPattern: false };
            row.push(cell)
        }
        blocks.push(row);
    }
}

function drawBlocks() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {

            var x = j * width;
            var y = i * height;
            var value = blocks[i][j].v;
            var isWinningPattern = blocks[i][j].isWinningPattern;

            switch (value) {
                case 1:
                    drawX(x, y, width, height, isWinningPattern);
                    break;
                case 0:
                    drawO(x, y, width, height, isWinningPattern);
                    break;
                default:
                    {
                        ctx.beginPath();
                        ctx.strokeRect(x, y, width, height);
                        ctx.strokeStyle = 'blue';
                        ctx.closePath();
                    }
            }

            blocks[i][j].x = x;
            blocks[i][j].y = y;

        }
    }
}

function drawX(x, y, width, height, isWinningPattern) {

    ctx.beginPath();
    ctx.strokeRect(x, y, width, height);
    ctx.strokeStyle = 'blue';
    ctx.font = "900 30px Arial";
    ctx.fillStyle = isWinningPattern ? "green" : "black"
    ctx.fillText("X", x + (width / 2), y + (height / 2));
    ctx.stroke();
    ctx.closePath();
}

function drawO(x, y, width, height, isWinningPattern) {

    ctx.beginPath();
    ctx.strokeRect(x, y, width, height);
    ctx.strokeStyle = 'blue';
    ctx.font = "900 30px Arial";
    ctx.fillStyle = isWinningPattern ? "green" : "black"
    ctx.fillText("O", x + (width / 2), y + (height / 2));
    ctx.stroke();
    ctx.closePath();
}

function check(isX) {

    var value = isX === true ? 1 : 0;

    if (blocks[0][0].v === value && blocks[0][1].v === value && blocks[0][2].v === value) {

        blocks[0][0].isWinningPattern = true;
        blocks[0][1].isWinningPattern = true;
        blocks[0][2].isWinningPattern = true;

        knowledge.push([
            [0, 0],
            [0, 1],
            [0, 2]
        ]);
        return true;

    } else if (blocks[0][0].v === value && blocks[1][0].v === value && blocks[2][0].v === value) {

        blocks[0][0].isWinningPattern = true;
        blocks[1][0].isWinningPattern = true;
        blocks[2][0].isWinningPattern = true;

        knowledge.push([
            [0, 0],
            [1, 0],
            [2, 0]
        ]);
        return true;
    } else if (blocks[0][1].v === value && blocks[1][1].v === value && blocks[2][1].v === value) {

        blocks[0][1].isWinningPattern = true;
        blocks[1][1].isWinningPattern = true;
        blocks[2][1].isWinningPattern = true;

        knowledge.push([
            [0, 1],
            [1, 1],
            [2, 1]
        ]);
        return true;
    } else if (blocks[0][2].v === value && blocks[1][2].v === value && blocks[2][2].v === value) {

        blocks[0][2].isWinningPattern = true;
        blocks[1][2].isWinningPattern = true;
        blocks[2][2].isWinningPattern = true;

        knowledge.push([
            [0, 2],
            [1, 2],
            [2, 2]
        ]);
        return true;
    } else if (blocks[0][0].v === value && blocks[1][1].v === value && blocks[2][2].v === value) {

        blocks[0][0].isWinningPattern = true;
        blocks[1][1].isWinningPattern = true;
        blocks[2][2].isWinningPattern = true;

        knowledge.push([
            [0, 0],
            [1, 1],
            [2, 2]
        ]);
        return true;
    } else if (blocks[1][0].v === value && blocks[1][1].v === value && blocks[1][2].v === value) {

        blocks[1][0].isWinningPattern = true;
        blocks[1][1].isWinningPattern = true;
        blocks[1][2].isWinningPattern = true;

        knowledge.push([
            [1, 0],
            [1, 1],
            [1, 2]
        ]);
        return true;
    } else if (blocks[2][0].v === value && blocks[2][1].v === value && blocks[2][2].v === value) {

        blocks[2][0].isWinningPattern = true;
        blocks[2][1].isWinningPattern = true;
        blocks[2][2].isWinningPattern = true;

        knowledge.push([
            [2, 0],
            [2, 1],
            [2, 2]
        ]);
        return true;
    } else if (blocks[0][2].v === value && blocks[1][1].v === value && blocks[2][0].v === value) {

        blocks[0][2].isWinningPattern = true;
        blocks[1][1].isWinningPattern = true;
        blocks[2][0].isWinningPattern = true;

        knowledge.push([
            [0, 2],
            [1, 1],
            [2, 0]
        ]);
        return true;
    }


    return false;
}

function reset() {
    xTurn = true;
    blocks = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isGameOver = false;
    createBlocks();
    drawBlocks();

    document.getElementById("turn").innerText = xTurn === true ? "X" : "O";
}

function computerPlay() {

    if (isGameOver)
        return;

    mediumPlay();
    runGameWinLogic();
}

function easyPlay() {

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {
            if (blocks[i][j].v !== 1 && blocks[i][j].v !== 0) {
                blocks[i][j].v = 0;
                drawBlocks();
                i = 3;
                break;
            }
        }
    }

}

function playRandom() {

    var randomNumber = Math.random() * 8;
    var i = parseInt(randomNumber / 3);
    var j = parseInt(randomNumber % 3);

    if (blocks[i][j].v === '') {

        blocks[i][j].v = 0;
        drawBlocks();
    } else {
        playRandom();
    }

}

function mediumPlay() {

    var played = false;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (blocks[i][j].v === '') {
                var tempBlock = copyArray(blocks);
                tempBlock[i][j].v = 0;
                var wins = getResult(tempBlock, 0);
                if (wins === true) {
                    blocks[i][j].v = 0;
                    i = 3;
                    played = true;
                    drawBlocks();
                    break;
                }
            }
        }
    }

    if (!played) {
        counterOpponent();
    }

}

function counterOpponent() {

    var played = false;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (blocks[i][j].v === '') {
                var tempBlock = copyArray(blocks);
                tempBlock[i][j].v = 1;
                var wins = getResult(tempBlock, 1);
                if (wins === true) {
                    blocks[i][j].v = 0;
                    i = 3;
                    played = true;
                    drawBlocks();
                    break;
                }
            }
        }
    }

    if (!played)
        playRandom();
}

function copyArray(arr) {

    var newBlocks = [];

    for (var i = 0; i < 3; i++) {
        var rows = [];
        for (var j = 0; j < 3; j++) {
            var cell = { v: arr[i][j].v };
            rows.push(cell);
        }
        newBlocks.push(rows);
    }

    return newBlocks;
}

function getResult(blocks, value) {

    if (blocks[0][0].v === value && blocks[0][1].v === value && blocks[0][2].v === value) {

        return true;

    } else if (blocks[0][0].v === value && blocks[1][0].v === value && blocks[2][0].v === value) {

        return true;
    } else if (blocks[0][1].v === value && blocks[1][1].v === value && blocks[2][1].v === value) {

        return true;
    } else if (blocks[0][2].v === value && blocks[1][2].v === value && blocks[2][2].v === value) {

        return true;
    } else if (blocks[0][0].v === value && blocks[1][1].v === value && blocks[2][2].v === value) {

        return true;
    } else if (blocks[1][0].v === value && blocks[1][1].v === value && blocks[1][2].v === value) {

        return true;
    } else if (blocks[2][0].v === value && blocks[2][1].v === value && blocks[2][2].v === value) {

        return true;
    } else if (blocks[0][2].v === value && blocks[1][1].v === value && blocks[2][0].v === value) {

        return true;
    }


    return false;
}

createBlocks();
drawBlocks();