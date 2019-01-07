export default class whackAMole {
    constructor() {
        this.a = true;
        this.createButton();
        this.createHole();
        this.timeUp = false;
        this.score = 0;
        this.crosses = document.querySelectorAll('.cross')
        this.lastCross = 1;
    }

    createButton() {
        this.button = document.createElement("button");
        $(this.button).addClass('button').html('START').click(() => { this.gameStart() }).attr('start', 'true').css('cursor', 'pointer')
        $("#mainWrapper").append(this.button);
    }

    randomCross() {
        return Math.floor(Math.random() * 5);
    }
    randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    peep() {
        let time = this.randomTime(200, 1000);
        let visibleCrossIndex = this.randomCross()
        if (visibleCrossIndex == this.lastCross) {
            console.log("double")
            visibleCrossIndex = this.randomCross()
        }
        $(`.cross${visibleCrossIndex}`).css('top', '13%').click(() => {
            console.log(this.score)
            this.score = this.score + 1;
            $('#score').html(this.score);
        });
        this.lastCross = visibleCrossIndex;
        setTimeout(() => {
            $(`.cross${visibleCrossIndex}`).css('top', '100%').unbind("click");
            if (!this.timeUp) this.peep();
        }, time);
    }

    createHole() {
        this.boxContainer = document.createElement("div");
        for (var i = 0; i < 6; i++) {
            let box = document.createElement("div");
            $(box).attr('id', 'box_' + i).addClass('box')
            this.cross = document.createElement("div");
            $(this.cross).addClass('cross' + i).addClass('cross')
            $(box).append(this.cross)
            $(this.boxContainer).append(box);
        }
        $("#game").append(this.boxContainer);
    }

    gameStart() {        
        $(this.button).html('PLAY').attr('start', 'false').unbind("click").css('cursor', 'default')
        setTimeout(() => this.timeUp = true, 10000)
        this.peep();
    }
}
let shape = new whackAMole();
