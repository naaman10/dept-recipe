$(document).ready(function (){
  $(".nav-link").click(function(){
    var navID = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $( navID ).offset().top
    }, 2000);
  });
});

$("#footerNav").hide();
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll > 600) {
    $('#footerNav').fadeIn();
    console.log( scroll );
  } else {
    $("#footerNav").fadeOut();
  };
});

//600
$(".low").click(function() {
  $(this).fadeOut("slow");
});
$(".high").click(function() {
  $(this).fadeOut("slow");
});

function createProject() {
      var database = firebase.database();
      var projectName = $("#projectName").val();
      var projectDescription = $("#projectDescription").val();
      var d = new Date();
      if (projectName === "") {Command: toastr["info"]("Please enter a name for your project ", "Oops", {
        "positionClass": "toast-bottom-left"
      })
    }
    else {
      var projectPath = firebase.database().ref('raid_table/');
      var newProject = projectPath.push();
      newProject.set({
        projectName: projectName,
        projectDescription: projectDescription,
        DateCreate: Date(),
        DateClose: ""
      }, function(error) {
        if (error) {
          Command: toastr["warning"]("Error code: " + error.code, "An error occurred ", {"positionClass": "toast-bottom-left"})
        }
        else {
          Command: toastr["success"](" ", "Project Created", {
            "positionClass": "toast-bottom-left"
          })
          $('#newRaidProjectModal').modal('hide');
          $("#projectName").val(null);
          $("#projectDescription").val(null);
        }
      })
    }
  }
  var projectPath = firebase.database().ref('raid_table/');
  projectPath.on("child_added", function(data, prevChildKey) {
    var allProjects = data.val();
    $("#listProjects").append('<a id="projectButton"  href="/raid/project?id=' + data.key + '" class="list-group-item list-group-item-action waves-effect">' + allProjects.projectName + '<i id="projectArrow" class="fas fa-arrow-right"></i></a>');
  }, function(error) {
    console.log("Error: " + error.code);
  })

  $(document).ready(function() {
    var urlString = window.location.href;
    var url = new URL(urlString);
    var projectId = url.searchParams.get("id");
    var raidRef = firebase.database().ref('raid_table/' + projectId);
    raidRef.on('value', function(snapshot) {
      console.log(snapshot);
      var projectName = raidRef.projectName ;
      var riskRef = firebase.database().ref('risk_row/');
      riskRef.orderByChild("project").equalTo(projectId).once('value', function(snapshot) {
        var content = '';
        snapshot.forEach(function(data) {
          var val = data.val();
          console.log(val);
          if (val.project == projectId) {
            content += '<tr id="riskRow" data-id="' + data.key + '">';
            content += '<td id="riskDescCell">' + val.riskDesc + '</td>';
            content += '<td id="riskSevCell"><h4><span class="badge badge-secondary ' + val.riskSeverity + '">' + val.riskSeverity + '</span></h4></td>';
            content += '<td id="riskMitiCell">' + val.riskMitigation + '</td>';
            content += '<td id="riskOwnCell">' + val.riskOwner + '</td>';
            content += '<td id="riskDatcCell">' + val.dateClosed + '</td>';
            content += '</tr>';

          }
        });
        $("#riskTable").append(content);
        $("#addRaidItem").on('click', function() {
          event.preventDefault();
          var riskDesc = $("#raidMessage").val();
          var riskSeverity = $("#raidSeveritiy").val();
          var riskMitigation = $("#riskMitigation").val();
          var riskOwner = $("#riskOwner").val();
          var newRisk = riskRef.push();
          newRisk.set({
            project: projectId,
            riskDesc: riskDesc,
            riskSeverity: riskSeverity,
            riskMitigation: riskMitigation,
            riskOwner: riskOwner,
            dateOpen: Date(),
            dateClosed: ""
          }, function(error) {
            if (error) {
              Command: toastr["warning"]("Error code: " + error.code, "An error occurred ", {"positionClass": "toast-bottom-left"})
            }
            else {
              Command: toastr["success"](" ", "Risk Created", {
                "positionClass": "toast-bottom-left"
              })
              $('#newRaidModal').modal('hide');
              $("#raidMessage").val(null);
              $("#raidSeveritiy").val(null);
              $("#riskMitigation").val(null);
              $("#riskOwner").val(null);
            }
          })
        });
        $("#riskTable").DataTable({
          paging: false,
          searching: false,
        });
        $("#riskRow").on('click', function(event) {
          event.preventDefault();
          var riskRowId = $(this).attr("data-id");
          var riskRowRef = firebase.database().ref('risk_row/' + riskRowId);
          console.log(riskRowRef);
          return riskRowRef.once('value').then(function(snapshot) {
              var modalDesc = (snapshot).val().riskDesc;
              var modalSev = (snapshot).val().riskSeverity;
              var modalMits = (snapshot).val().riskMitigation;
              var modalOwn = (snapshot).val().riskOwner;
              $("#raidMessageView").html(modalDesc);
              $("#raidSeveritiyView").val(modalSev);
              $("#riskMitigationView").val(modalMits);
              $("#riskOwnerView").val(modalOwn);
              $('#updateRiskModal').modal('show');
          });
        });
      });
    });
  });
