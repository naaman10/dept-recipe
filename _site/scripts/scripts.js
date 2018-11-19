var totalTimeEst = 0;
var totalCostEst;

// summary table init
var table = $('#summaryTable').DataTable({
  "paging": false,
  "searching": false,
  "language": {
    "info": ""
  }
});
// label init
$(document).ready(function(){
	$(":checkbox").labelauty();
});

$('input').change(function () {
    if ($(this).prop('checked')) {
        var iCountRes = $('.result').length;
        $(this).attr('data-id', 'result' + iCountRes);
        $("#summary-table").append(createRow($(this).parent().find('.labelauty-checked .labelautyLabel').html(), iCountRes));
        //START ONBLUR
        $('input').blur(function () {
            $('input[name=c' + iCountRes + ']').val(+($('input[name=p' + iCountRes + ']').val()) * (+$('input[name=d' + iCountRes + ']').val()));
        });
        //END ONBLUR
    } else {
        $('#' + $(this).attr('data-id')).remove();
        $(this).removeAttr('data-id');
    }
});

function createRow(text, count) {
    var data = '<tr id="result' + count + '" class="result">' +
            '<td class="col-md-4"> <h6>' + text + '</h6> ' +
            '</td> <td> ' +
            '<input id="p' + count + '" name="p' + count + '" type="number"  value="0" class="col-md-2 form-control"> ' +
            '</td> <td> ' +
            '<input  id="d' + count + '" name="d' + count + '" type="number"  value="800" class="col-md-2 form-control"> ' +
            '</td> <td id="c' + count + '" name="c' + count + '" value="0" class="col-md-4" ' +
            '</td> </tr>';
    return data;
}

function uncheckem() {
    $('input:checkbox').removeAttr('checked');
    $('#conclusion').hide();
    $("#summary-table").html('');
}
//calculate the sum  // PDC

var calculate = function(id) {
  var sum = 0;
  $('input[name^='+id+']').each(function() {
    sum += Number($(this).val());
  });
  return sum;
}

$('.calculate-me').on('click', function(event) {
  event.preventDefault();

  $('.hours').html(calculate('p'));
  $('.cost').html(calculate('c'));

  $("#conclusion").fadeIn( 300, "linear" );

});

// Clear all input fields
$('.btn-ux-danger').on('click', function(event) {
	event.preventDefault();
	$('input[type="number"]').val('');
});
