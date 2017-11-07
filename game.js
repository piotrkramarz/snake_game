/**
 * Created by piotrek on 2017-11-07.
 */
$(function () {
    var $board = $('.board');
    var $table = $('<table>');
    for (var y = 0; y < 15; y += 1) {
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
    drawApple();
    drawSpeedUp();
    drawSlowDown();

    function drawApple() {
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('apple')
    }

    function drawSpeedUp(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('speedUp')
    }

    function drawSlowDown(){
        var $emptyCells = $('td:not(".snake")');

        $emptyCells.eq(Math.floor(Math.random() * $emptyCells.length)).addClass('slowDown')
    }

});