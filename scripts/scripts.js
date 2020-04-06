

// label init
$(document).ready(function() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  $(":checkbox").labelauty();
});
let roundCount = 0;
$(".deal").click(function() {
  let selected = [];
  let valSelect = $(this).find("h2").html();
  roundCount++;
  if (roundCount === 5 || roundCount === 8 || roundCount === 11 || roundCount === 14 || roundCount === 17 || roundCount === 20) {
    selected.push(valSelect);
    var node = document.createElement("LI");
    var textnode = document.createTextNode(valSelect);
    node.setAttribute('class', 'selectedItems list-group-item waves-effect');
    node.appendChild(textnode);
    document.getElementById("dealSelected").appendChild(node);
    $(this).fadeOut("slow");
    $('#dealBanker').modal('show')
    console.log("Offer time");
  } else {
    selected.push(valSelect);
    var node = document.createElement("LI");
    var textnode = document.createTextNode(valSelect);
    node.setAttribute('class', 'selectedItems list-group-item waves-effect');
    node.appendChild(textnode);
    document.getElementById("dealSelected").appendChild(node);
    $(this).fadeOut("slow");
  }
  console.log(roundCount);
  console.log(selected);
});

function dealRefresh(){
  $(".deal").fadeIn("slow");
  $(".selectedItems").remove();
  roundCount = 0;
}
// end deal
$('input').change(function () {
    if ($(this).prop('checked')) {
        var iCountRes = $('.result').length;
        $(this).attr('data-id', 'result' + iCountRes);
        $("#summary-table").append(createRow($(this).parent().find('.labelauty-checked .labelautyLabel').text(), iCountRes));
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


//FB


  var firebaseConfig = {
    apiKey: "AIzaSyDkspge0QHbZXnU6wLa0G6SyJABex8ww8w",
    authDomain: "dept-raid.firebaseapp.com",
    databaseURL: "https://dept-raid.firebaseio.com",
    projectId: "dept-raid",
    storageBucket: "dept-raid.appspot.com",
    messagingSenderId: "252856474954",
    appId: "1:252856474954:web:121f3ff5f67b4a63"
  };
  firebase.initializeApp(firebaseConfig);

  function toggleSignIn() {
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            $("#signinEmailAlert").show('fast');
            return;
          }
          if (password.length < 4) {
            $("#signinPasswordAlert1").show('fast');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              $("#signinPasswordAlert2").show('fast');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
      }
      /*
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
  					$("#siginInForm").hide('slow');
  					$("#siginFooter").hide('slow');
  					$("#siginOutForm").show('slow');
  					$("#userEmail").append(email);
            $("#main-boady").load('/ajax/team.html',
              function(){
              /* Stuff to do after the page is loaded */
            })
            .done(function() {
              console.log("success");
            })
            .fail(function() {
              console.log("error");
            })
            .always(function() {
              console.log("complete");
            });

            console.log(uid);
            if (!emailVerified) {

            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
  					$("#siginInForm").show('slow');
  					$("#siginFooter").show('slow');
  					$("#siginOutForm").hide('slow');
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

      }
      window.onload = function() {
        initApp();
      };

      document.getElementById('updateTeamName').addEventListener('click', updateTeamName);
      function updateTeamName() {

        var teamName = $("#teamNameInput").val();
        firebase.database().ref('team/' + userId).set({
          teamName: teamName
        });
}
