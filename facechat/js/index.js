var sel_id;
var sel_name;

var menu_item_list=[
    document.getElementById('menu1'),document.getElementById('menu2'),
    document.getElementById('menu3'),document.getElementById('menu4'),
    document.getElementById('menu5'),document.getElementById('menu6')
  ];

function select_it(id,name){
  sel_id=id;
  sel_name=name;
}
function click_menu(btn_n){
    select_btn=btn_n;
    var width_size=$('#menu1').width();

    //document.getElementById('menu_line').style.left=width_size*btn_n;
    $('#menu_line').animate({left:width_size*btn_n+"px"},300,()=>{});
    //alert(btn_n);
}
function reload_data(){
  window.parent.postMessage('reload',"*");
}
function click_face_chat_btn(){
  if(sel_id==null || sel_name==null){
    alert("선택하지 않았음");
    return;
  }
  window.parent.postMessage('{"title":"facechat","id":"'+sel_id+'","name":"'+sel_name+'"}',"*");
}

function swiperAppendSlide(imguri,sex,name,loc,id){
  //alert(html);
  var html='<div class="swiper-slide">';
  html+='<center>';
  html+='<div id=content_container'+id+' class=content_container onclick="select_it(\''+id+'\',\''+name+'\');toggle_select('+id+')">';
  html+='<img src="./profileimg/'+imguri+'" width=200 height=200>';
  html+='<div class=profile_text>'+name+sex+loc+'</div>';
  html+='</div></center></div>';
  swiper.appendSlide(html);
}
function toggle_select(id){
  $('.content_container').removeClass("content_select");
  $('#content_container'+id).addClass("content_select");
}
window.onload=()=>{

}
// $.get("http://hume.co.kr/facechat/sql/select_user_by_id.php",{id:JSONDATA[i].id}).done((r)=>{
//   var user_data=JSON.parse(r);
//   //swiperAppendSlide(user_data[7],user_data[4],user_data[2],user_data[5],user_data[1]);
// });
var user_array;
window.onmessage=(e)=>{

  if(e.data==""){

  }else{
    var JSONDATA=JSON.parse(e.data);
    user_array=new Array();
    for(var i=0;i<JSONDATA.length;i++){
      if(JSONDATA[i]==null)continue;
      var user=new Object();
      user.id=JSONDATA[i].id;
      user.full_name=JSONDATA[i].full_name;
      user_array.push(user);
    }
    swiper.removeAllSlides();
    for(var i=0;i<user_array.length;i++){
      swiperAppendSlide("hyojin.JPG","",user_array[i].full_name,"",user_array[i].id);
    }
  }
}