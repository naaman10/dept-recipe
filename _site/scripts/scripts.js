// label init
$(document).ready(function() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  $(":checkbox").labelauty();
});
//
// $('input').change(function() {
//   if ($(this).prop('checked')) {
//     var iCountRes = $('.result').length;
//     $(this).attr('data-id', 'result' + iCountRes);
//     $("#summary-table").append(createRow($(this).parent().find('.labelauty-checked .labelautyLabel').html(), iCountRes));
//     //START ONBLUR
//     $('input').on('click', function() {
//       var theTime = document.getElementById('p' + iCountRes).value;
//       console.log("time: " + theTime);
//       var theRate = document.getElementById('d' + iCountRes).value;
//       console.log("rate: " + theRate);
//       var theTotal = theTime * theRate;
//       console.log('total per row: ' + theTotal);
//       document.getElementById('c' + iCountRes).value = new Number(theTotal);
//     });
//     //END ONBLUR
//   } else {
//     $('#' + $(this).attr('data-id')).remove();
//     $(this).removeAttr('data-id');
//   }
// });
//
// function createRow(text, count) {
//   var data = '<tr id="resultRow' + count + '" class="result">' +
//     '<td> <h6>' + text + '</h6> ' +
//     '</td> <td> ' +
//     '<input id="p' + count + '" name="p' + count + '" type="number"  value="1" class="timeInput form-control"> ' +
//     '</td> <td> ' +
//     '<input  id="d' + count + '" name="d' + count + '" type="number"  value="800" min="650" step="25" class="rateInput form-control"> ' +
//     '</td> <td><input id="c' + count + '" name="c' + count + '" value="" class="totalCell form-control" >' + '</td> </tr>';
//   return data;
// }

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
            '<td> <h6>' + text + '</h6> ' +
            '</td> <td> ' +
            '<input id="p' + count + '" name="p' + count + '" type="number"  value="1" min="1" class="form-control"> ' +
            '</td> <td> ' +
            '<input  id="d' + count + '" name="d' + count + '" type="number" min="650" max="1000" value="800" step="25" class="form-control"> ' +
            '</td> <td> ' +
            '<input  id="c' + count + '" name="c' + count + '" type="number" disabled value="800" class="form-control"> ' +
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
  $('input[id^=' + id + ']').each(function() {
    sum += Number($(this).val());
    console.log(sum);
  });
  return sum;
}

$('.calculate-me').on('click', function(event) {
  event.preventDefault();
  $('.hours').html(calculate('p'));
  $('.cost').html("£" + calculate('c'));
  $("#conclusion").fadeIn(300, "linear");
});

// Clear all input fields
$('#tableReset').on('click', function() {
  $('#summary-table').children('tr').remove();
});
