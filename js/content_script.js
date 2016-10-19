$(function() {
  $("body").mouseup(function (event) {
    $("#translation").remove();
    var oDiv = document.createElement('div'); 
    var selection = window.getSelection().toString();
    if(selection != ""){
      oDiv.style.left = event.clientX+'px';
      oDiv.style.top = event.clientY+$(document).scrollTop()+'px';
      oDiv.style.border = '1px solid #000';
      oDiv.style.background = '#ffff99'
      oDiv.style.position = 'absolute';
      oDiv.style.width = '200px';
      oDiv.style.height = 'auto';
      oDiv.style.fontSize = '12px';
      $(oDiv).attr("id","translation");
      document.body.appendChild(oDiv);
      $.get("https://api.shanbay.com/bdc/search/?word="+selection, function (response, status) {
        if(status == "success"){
          if(response.status_code == 0){
            document.getElementById("translation").innerHTML = "<p>"+response.data.content+
              "</p><p>中文释义："+response.data.definition+
              "</p><p>音标:"+response.data.pronunciation+"</p>"+
              "<audio id='audio'></audio>"+
              "<button id='play'>播放</button>";
            $("#audio").attr("src",response.data.audio_addresses.us[0]);
            $("#play").mouseup(function (ev) {
              $("#audio")[0].play();
              ev.stopPropagation();
            });
          }else if(response.status_code == 1){
            document.getElementById("translation").innerHTML="<div><p>"+response.msg+"</p></div>"
          }
        }else if(status == "fail"){
          document.getElementById("translation").innerHTML="<div><p>网络出错，请重试！</p></div>"
        }
      });
    }  
  });
})
