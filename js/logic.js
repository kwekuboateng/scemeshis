function sediment() {
  return remotoid();
}

function openPanel() {
  $("#insider").hide();
}

function remotoid() {
  return "sedemGloryUp"
}

function showPanel() {
  $("#passerInfo").hide();
  $("#insider").show();
}

$(document).ready(function(){
  openPanel();
  $("#adminEntry").unbind('click').click(function(){
    let adminVal =  $("#adminPass").val();
    if (adminVal.length && adminVal == sediment() ) {
      showPanel();
    } else {
      $("#adminPass").val("");
      alert("Sorry Only Admins Can Create An Account Turns Out Youre Not So Please Pack. Thanks")
    }
  })
})
