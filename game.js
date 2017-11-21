/**
 * Created by piotrek on 2017-11-07.
 */
$(function () {
    var $board = $('.board');
    var $table = $('<table>');
    for (var y = 0; y < 14; y += 1) {
        var $tr = $('<tr>');
        for (var x = 0; x < 35; x += 1) {
            var $td = $('<td>').addClass('cell');
            $tr.append($td);
        }
        $table.append($tr);
    }
    $board.append($table);

    var snakeCells = $('td').slice(0, 4).toArray();

    $(snakeCells).addClass('snake');
    drawCoin();
    drawSpeedUp();
    drawSlowDown();
    drawGreenMushroom();
    drawYellowMushroom();
    drawRedMushroom();
    drawBlueMushroom();

    var moves = {
        38: function up($node) {
            return $node.parent().prev().find('.cell').eq($node.index());
        },
        40: function down($node) {
            return $node.parent().next().find('.cell').eq($node.index());
        },
        37: function left($node) {
            return $node.prev();
        },
        39: function right($node) {
            return $node.next();
        }
    };

    moves[38].invalid = 40;
    moves[40].invalid = 38;
    moves[37].invalid = 39;
    moves[39].invalid = 37;

    var direction = moves[40];

    $(window).on('keydown', function (event) {

        var code = event.keyCode
        console.log(code)

        if (code === direction.invalid) {
            return
        }

        direction = moves[event.keyCode] || direction
    });

    function drawCoin() {
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('coin')
    }

    function drawSpeedUp(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('speedUp')
    }

    function drawSlowDown(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('slowDown')
    }

    function drawGreenMushroom(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('greenMushroom')
    }

    function drawYellowMushroom(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('yellowMushroom')
    }

    function drawRedMushroom(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('redMushroom')
    }

    function drawBlueMushroom(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('blueMushroom')
    }

    var points = 0;
    var interval;
    var modifySpeed = 500;
    function runInterval(s){
        var speed = s;
        clearInterval(interval);
        interval = setInterval(function () {

            var tail = snakeCells[0];
            var head = snakeCells[snakeCells.length - 1];

            $(head).removeClass('head');

            var $nextHead = direction($(head));

            if ($nextHead.hasClass('snake') || $nextHead.length === 0) {
                clearInterval(interval);
                alert('GAME OVER');
                return;
            }

            if ($nextHead.hasClass('slowDown') === true) {
                $nextHead.removeClass('slowDown');
                modifySpeed *= 1.2;
                runInterval(modifySpeed);
                drawSlowDown()
            }

            if ($nextHead.hasClass('speedUp') === true) {
                $nextHead.removeClass('speedUp');
                modifySpeed *= 0.8;
                runInterval(modifySpeed);
                drawSpeedUp()
            }

            if ($nextHead.hasClass('greenMushroom') === true) {
                $nextHead.removeClass('greenMushroom');
                points = points + (Math.floor(Math.random()*10)*10);
                drawGreenMushroom()
            }

            if ($nextHead.hasClass('yellowMushroom') === true) {
                $nextHead.removeClass('yellowMushroom');
                points = points + (Math.floor(Math.random()*10)*5);
                drawYellowMushroom()
            }

            if ($nextHead.hasClass('redMushroom') === true) {
                $nextHead.removeClass('redMushroom');
                points = points - (Math.floor(Math.random()*10)*5);
                drawRedMushroom()
            }

            if ($nextHead.hasClass('blueMushroom') === true) {
                $nextHead.removeClass('blueMushroom');
                points = points - (Math.floor(Math.random()*10)*5);
                drawBlueMushroom()
            }

            if ($nextHead.hasClass('coin') === false) {
                $(tail).removeClass('snake');
                snakeCells = snakeCells.slice(1);

            } else {

                if (modifySpeed < 500 && modifySpeed > 250) {
                    $nextHead.removeClass('coin');
                    points += 15;
                    drawCoin()
                }

                if (modifySpeed <= 250 && modifySpeed > 150) {
                    $nextHead.removeClass('coin');
                    points += 25;
                    drawCoin()
                }

                if (modifySpeed <= 150) {
                    $nextHead.removeClass('coin');
                    points += 50;
                    drawCoin()
                }

                if (modifySpeed >= 500 && modifySpeed < 700) {
                    $nextHead.removeClass('coin');
                    points += 10;
                    drawCoin()

                } else if (modifySpeed > 700) {
                    $nextHead.removeClass('coin');
                    points += 5;
                    drawCoin()
                }

            }

            $('.score').text(points);

            snakeCells = snakeCells.concat($nextHead.get(0));
            $nextHead.addClass('head snake');

        }, speed)
    }
    runInterval(modifySpeed)
});