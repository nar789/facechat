var state=1;//1이면 iframe , if set 2 , quickblox!
var selId=32507789;
var selName='abc';
var user_list; //user_list[0].id  full_name
var Imember;
var my_id;
var gift_point;
function send_point_modal(){
  document.getElementById('modal_send_point').style.display='block';
}
function send_point(howmuch){
  //alert(howmuch);
  $('#give_point_modal').css('display','none');
}
function select_gift_point(str,me){
  gift_point=str;
}
function close_send_modal(){
  document.getElementById('modal_send_point').style.display="none";
}
function init(){
  Imember=setInterval(CheckMember,1000);
}
function CheckMember(){
  if(user_list){
      //to-do
      clearInterval(Imember);
  }
}
function auto_login(){
  window.plugins.sim.requestReadPermission((r)=>{
    window.plugins.sim.getSimInfo((r)=>{
      checkLoginStatus((e)=>{
        phone_number=r.phoneNumber.replace("+","");
        if(phone_number==""){
          alert("핸드폰 번호를 알 수 없습니다. (Permission Error)");
          navigator.app.exitApp();
        }
        if(e){
          $('#input_name').val(e);
          $("#submit_log").click();
        }else{
          document.getElementById('iframe').src="http://hume.co.kr/facechat2/signin.php";
          splash_animation(100);
        }
      });

    },()=>{})}, (er)=>{alert(er);});
}
function load_all_var(){
  if(user_list){
    for(var i=0;i<user_list.length;i++){

      if(user_list[i]==null)continue;
      if(my_id==user_list[i].id){
        delete user_list[i];
      }
    }

    var json=JSON.stringify(user_list);
    document.getElementById('iframe').contentWindow.postMessage(json,'*');
  }
}
function CheckMyid(id){
  my_id=id;
  $.get("http://hume.co.kr/facechat2/sql/update_id.php",{id:my_id,phone:phone_number}).done((r)=>{

    //alert(r);
  });
}
window.onload=init();
