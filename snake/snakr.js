window.onload = function () {
    canv = document.getElementById("gc");
    pts = document.getElementById("points");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    });
    setInterval(game, 1000 / 8);
};

var px = 10;
var py = px;
var gs = 10;
var tc = 30;
var ax = 5;
var ay = ax;
var xv = 1;
var yv = 0;
var trail = [];
var tail = 5;
var xDown = null;
var yDown = null;
var nextDirections = [];

function game() {
    changeDirection();
    px += xv;
    py += yv;
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x === px && trail[i].y === py) {
            tail = 5;
            pts.innerHTML = (tail - 5);
        }
    }
    trail.push({x: px, y: py});
    while (trail.length > tail) {
        trail.shift();
    }

    if (ax === px && ay === py) {
        tail += 2;
        pts.innerHTML = (tail - 5);
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            nextDirections.unshift("left");
            break;
        case 38:
            nextDirections.unshift("up");
            break;
        case 39:
            nextDirections.unshift("right");
            break;
        case 40:
            nextDirections.unshift("down");
            break;
    }
}

// ---- ---- ---- ---- ----
// -START SWIPE FUNCTIONS--

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {

    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // left swipe
            nextDirections.unshift("left");
        } else {
            // right swipe
            nextDirections.unshift("right");
        }
    } else {
        if (yDiff > 0) {
            // swipe up
            nextDirections.unshift("up");
        } else {
            // swipe down
            nextDirections.unshift("down");
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}

function changeDirection() {
    // TODO create direction queue
    if (nextDirections.length !== 0)
        switch (nextDirections.pop()) {
            case "up":
                if (yv !== 1 && yv !== -1) {
                    xv = 0;
                    yv = -1;
                }
                break;
            case "down":
                if (yv !== 1 && yv !== -1) {
                    xv = 0;
                    yv = 1;
                }
                break;
            case "left":
                if (xv !== 1 && xv !== -1) {
                    xv = -1;
                    yv = 0;
                }
                break;
            case "right":
                if (xv !== 1 && xv !== -1) {
                    xv = 1;
                    yv = 0;
                }
                break;
        }
}
