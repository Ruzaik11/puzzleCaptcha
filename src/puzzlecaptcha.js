var ROUNDS = 3; // total test to be shown
var SUCCESS = 2; // total should be solved
var TOTAL_TEST = 1; // total test taken
var TOTAL_PASS = 0; // total solved
var ANSWER = 0; // correct answer
var PUZZLE_SOLVED = false; // status


var button = document.getElementById("puzzle-captcha");

var puzzles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // currently support 15 puzzle

function isPuzzleCaptchaSolved() {
    return PUZZLE_SOLVED;
}

button.innerHTML = '<b id="text-im-not-robot" >Are you a human?</b> <img id="puzzle-captcha-icon" src="src/images/puzzle-start.webp" ></div>';

document.getElementById("puzzle-captcha").addEventListener("click", function () {
    if (!PUZZLE_SOLVED) {
        var modal = document.getElementById("puzzle-captcha-modal");
        modal.style.visibility = "visible";
        modal.style.opacity = 1;
        resetPuzzle();
    }
});

resetPuzzle();

function resetPuzzle() {

    let element = document.createElement('div');
    document.body.append(element);
    element.innerHTML = '<div style="visibility: hidden;" id="puzzle-captcha-modal" class="details-modal"> <div class="details-modal-content"> <div style="display: flex; border: 1px solid gray;"> <h2 style="padding:15px;">Select The Matching Puzzle</h2> <img id="answer-img" src="" alt=""> </div> <br> <div id="puzzle-selections"> </div> </div> </div>';

    TOTAL_TEST = 1;
    TOTAL_PASS = 0;
    ANSWER = 0;
    PUZZLE_SOLVED = false;

    LoadPuzzle();
}

function LoadPuzzle() {

    var puzzle_icons = '';
    var puzzle_arr = [];

    puzzle_arr = getRandom(puzzles, 8);

    for (var i = 0; i < puzzle_arr.length; i++) {
        puzzle_icons += '<img class="puzzle-img" style="width:90px; height:90px; border:1px solid #d9d9d9; margin: 5px;" data-id="' + puzzle_arr[i] + '" src="src/images/puzzles/' + puzzle_arr[i] + '.png" >';
    }

    document.getElementById("puzzle-selections").innerHTML = puzzle_icons;

    ANSWER = puzzle_arr[Math.floor(Math.random() * puzzle_arr.length)]

    var Base64URL = '/src/images/puzzles-black/' + ANSWER + '.png';

    toDataURL(Base64URL,
        function (dataUrl) {
            document.getElementById("answer-img").src = dataUrl;
            document.getElementById("answer-img").style.width = "80px";
            document.getElementById("answer-img").style.height = "80px";
            document.getElementById("answer-img").style.marginTop = "10px";
            document.getElementById("answer-img").style.float = "right";
        }
    )
    // reader.readAsDataURL(file);

}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


function toDataURL(src, callback, outputFormat) {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    image.src = src;
    if (image.complete || image.complete === undefined) {
        image.src = "data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        image.src = src;
    }
}



document.addEventListener('click', function (e) {

    if (e.target && e.target.classList.contains('puzzle-img')) {
        console.log()
        if (TOTAL_TEST < ROUNDS) {

            if (e.target.dataset.id == ANSWER) {
                e.target.style.border = '2px solid green';
                TOTAL_PASS++;

                setTimeout(() => {
                    LoadPuzzle();
                }, 500);

            } else {

                e.target.style.border = '2px solid red';

                setTimeout(() => {
                    LoadPuzzle();
                }, 500);
            }

        } else {
            var modal = document.getElementById("puzzle-captcha-modal");
            if (TOTAL_PASS >= SUCCESS) {

                modal.style.visibility = "hidden";
                modal.style.opacity = 0;

                var puzzle_icon = document.getElementById("puzzle-captcha-icon");
                if (puzzle_icon) {
                    puzzle_icon.remove()
                }

                document.querySelectorAll(".crossmark").forEach(el => el.remove());

                document.getElementById('text-im-not-robot').insertAdjacentHTML('afterend', '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>')
                PUZZLE_SOLVED = true;

            } else {

                modal.style.visibility = "hidden";
                modal.style.opacity = 0;

                var puzzle_icon = document.getElementById("puzzle-captcha-icon");
                if (puzzle_icon) {
                    puzzle_icon.remove()
                }

                document.querySelectorAll(".checkmark").forEach(el => el.remove());

                document.getElementById('text-im-not-robot').insertAdjacentHTML('afterend', '<svg class="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="cross__circle" cx="26" cy="26" r="25" fill="none" /> <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" /> </svg>')
                PUZZLE_SOLVED = false;
            }

        }
        console.log(TOTAL_TEST, TOTAL_PASS);
        TOTAL_TEST++;

    }



});