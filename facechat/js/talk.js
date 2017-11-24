window.onload=()=>{
  // add_line("","ㄱㄱㄱㄱ영상","현운용",1,"25","전주","57분전",1234);
  // add_line("","안녕하세요 잘부탁","이정헌",0,"26","익산","58분전",453);
  // add_line("","ㄱㄱㄱㄱ영상","현운용",1,"25","전주","57분전",1234);
  // add_line("","안녕하세요 잘부탁","이정헌",0,"26","익산","58분전",453);
  // add_line("","ㄱㄱㄱㄱ영상","현운용",1,"25","전주","57분전",1234);
  // add_line("","안녕하세요 잘부탁","이정헌",0,"26","익산","58분전",453);
  window.parent.postMessage("Phone","*");

}
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }
  lat1=lat1*1;lon1=lon1*1;lat2=lat2*1;lon2=lon2*1;
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
function imageView(url){
  window.parent.postMessage('{"title":"imageView","url":"'+url+'"}',"*");
}
var my_phone;
var my_lat;
var my_lng;
function get_users_info(){
  $.post("http://ksar.co.kr/facechat2/sql/select_user.php",{lat:my_lat,lng:my_lng,phone:my_phone}).done((r)=>{
    var user_json=JSON.parse(r);
    for(var i=0;i<user_json.length;i++){
      if(user_json[i][4]==my_sex)continue;
      add_line(user_json[i][7],user_json[i][5],user_json[i][2],user_json[i][4],user_json[i][11],user_json[i][13],user_json[i][6],user_json[i][1],user_json[i][8],user_json[i][12],user_json[i][13]);
    }
  });
}
function request_talk_val(phone,img){
  window.parent.postMessage('{"title":"talk","phone":"'+phone+'","img":"'+img+'"}',"*");
}
function request_face_chat_val(id,name){
  window.parent.postMessage('{"title":"facechat","id":"'+id+'","name":"'+name+'"}',"*");
}
function add_line(imguri,text,nickname,sex,age,loc,time,id,phone,lat_,lng_){
  var line_text_width=$(window).width()-260;
  var sex_color;
  var sex_text;


  a_loc=Math.round(calculateDistance(my_lat,my_lng,lng_,lat_));
  console.log("distance"+a_loc);
  if(a_loc>10000)a_loc="???";
  else{
    a_loc=a_loc+"";
    a_loc=a_loc;
  }
  if(sex==0){
    sex_color="man";
    sex_text="남자";
  }else if(sex==1){
    sex_color="girl";
    sex_text="여자";
  }
  var html="<div class=line>";
  html+="<div class=img_left>";
  html+="<div class='image_box line_left_margin'><img onclick='imageView(\""+imguri+"\")' class=img src='"+imguri+"' width=100% height=100%></div>";
  html+="</div>";
  html+="<div class=line_contents style='width:"+line_text_width+"'>";
  html+="<div class='line_nickname "+sex_color+"'>"+nickname+"</div>";
  html+="<div class=line_text>"+text+"</div>";
  html+="<div class=line_normal>"+sex_text+" / "+age+"세 / "+a_loc+"Km</div>";
  html+="</div>";
  html+="<div class=icon_box>";
  html+="<div class=send_message onclick='request_talk_val(\""+my_phone+"\",\""+imguri+"\")'><img src='./img/chat.png' width=50 height=50></div>";
  html+="<div class=call_facechat onclick='request_face_chat_val(\""+id+"\",\""+nickname+"\")'><img src='./img/video.png' width=50 height=50></div>";
  html+="</div>";
  html+="</div>";
  document.getElementById('contents').innerHTML+=html;
}
var my_sex=-1;
window.onmessage=(e)=>{
  if(e.data==""){

  }else{
    var JSONDATA=JSON.parse(e.data);
    if(JSONDATA.title=="phone"){
      my_phone=JSONDATA.phone;
      $.get("http://ksar.co.kr/facechat2/sql/select_sex_by_phone.php",{phone:my_phone}).done((r)=>{
        my_sex=r;
        window.parent.postMessage("location","*");
      });
    }else if(JSONDATA.title=="location"){
      my_lat=JSONDATA.lat;
      my_lng=JSONDATA.lng;
      get_users_info();
    }

  }
}
