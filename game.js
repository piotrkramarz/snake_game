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
});