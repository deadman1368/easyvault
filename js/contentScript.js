//context sub menu passwords
var clickedEl = null;

document.addEventListener("contextmenu", function(event){
    clickedEl = event.target;
    chrome.runtime.sendMessage({type: 5}, function(response){});
}, true);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == 10) {
        clickedEl.value = request.value.password;
        return true;
    }
});


var popUpValue = localStorage.popUpValue || 0;
localStorage.popUpValue = 0;

(function(){

    function fnAddButtons(){
      
      //Query select all the input fields
      var usernameVar = document.querySelector("input[name='login'],input[name='email'],input[name='username'],input[name='loginKey'],input[name='identifier'],input[name='login_email'], input[name='login_id']");
      var pwdVar =  document.querySelector("input[name='password'],input[name='pass'],input[type='password'],input[name='login_password']");
      var bgImage = "url('https://user-images.githubusercontent.com/38464644/107901895-de894580-6f7f-11eb-89a0-4d8adf3ea5cc.png')";

      //Username textfield
      usernameVar.style.backgroundImage = bgImage;
      usernameVar.style.backgroundRepeat = "no-repeat";
      usernameVar.style.backgroundPosition = "100% 100%";
      usernameVar.style.backgroundSize = "30px 30px";
      usernameVar.style.paddingRight = "6%";
      usernameVar.id = "username-id";

      //Password textfield 
      pwdVar.style.backgroundImage = bgImage;
      pwdVar.style.backgroundRepeat = "no-repeat";
      pwdVar.style.backgroundPosition = "100% 100%";
      pwdVar.style.backgroundSize = "30px 30px";
      pwdVar.style.paddingTop = "2%";
      pwdVar.id = "pwd-id";

  }
  
    var count = 0;
    function fnDefineEvents() {
        document
          .getElementById("username-id")
          .addEventListener("focus", function (event) {
            
            if (localStorage.popUpValue === '0'){
                count = 0;
                usernamePwdPopUp();
            }
          });

          document
          .getElementById("pwd-id")
          .addEventListener("focus", function (event) {
            if (localStorage.popUpValue === '0'){
              count = 1;
              usernamePwdPopUp();
            }
          });
      }
      
    function usernamePwdPopUp(){

      localStorage.popUpValue = 1; 
    
      var img  = document.createElement("img");

      //Pop up image
      img.setAttribute("alt", "The Pulpit Rock");
      img.src = "https://user-images.githubusercontent.com/38464644/107901895-de894580-6f7f-11eb-89a0-4d8adf3ea5cc.png"; 
      img.style.height = "40px";
      img.style.weight = "40px";
      img.style.float= 'left';
      
      var popup = document.createElement('div');
      popup.className = 'popup';
      popup.id = 'test';
      popup.style.background = '#e8e8e8';
      popup.style.width = '200px';
      popup.style.height = '100px';
      popup.style.zIndex = '100000000000000000';
      popup.style.marginLeft = '60%';
      popup.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)";

      //Shifting of position if username or password are being clicked
      if(count == 0){
        popup.style.marginTop = '200px';
      }else{
        popup.style.marginTop = '280px';
      }
     
      popup.style.top = '0px';
      popup.style.left='0px';
      popup.style.position = 'absolute';

      //Close option
      var cancel = document.createElement('div');
      cancel.className = 'cancel';
      cancel.style.display = 'relative';
      cancel.style.float = 'right';
      cancel.style.margin = '0';
      cancel.style.height= '20px';
      cancel.style.width = '34px';
      cancel.style.padding = '0 0 5px 0';
      
      //Create store password pop up
      var storePwd = document.createElement('div');
      storePwd.style.height= '50px';
      storePwd.style.width = '170px';
      storePwd.style.padding = '0 0 5px 0';
      storePwd.style.marginLeft = '10px';
      storePwd.style.marginTop = '35px';
      storePwd.style.backgroundColor = '#f5f5f5';
      storePwd.style.paddingTop = '5px';

      //Display url and username
      var storeUsernamePwd = document.createElement('div');
      storeUsernamePwd.style.float = 'left';
      storeUsernamePwd.style.width = '100px';
      storeUsernamePwd.style.height = '50px';

       //Display url 
      var storeUrl = document.createElement('div');
      var urlTxt = window.location.hostname;;
      var pwd = '12345';
      storeUrl.innerHTML = urlTxt;
      storeUrl.style.fontSize = '10px';
      storeUrl.style.fontWeight = '900';
      storePwd.style.color = "black";
         
      //Display username
      var storeUsername = document.createElement('div');
      var usernameTxt = 'mrlai999@gmail.com';
      storeUsername.innerHTML = usernameTxt;
      storeUsername.style.fontSize = '10px';
      storeUsername.style.color = "black";
      
      //Populate data into username div and password div
      storeUsernamePwd.onclick = function (e){
        if (document.querySelector("input[name='login']") != null){

          document.querySelector("input[name='login']").value = usernameTxt;
          
        };
        if (document.querySelector("input[name='login_id']") != null){

          document.querySelector("input[name='login_id']").value = usernameTxt;
          
        };
        if( document.querySelector("input[name='email']") != null){

          document.querySelector("input[name='email']").value = usernameTxt;

        };
        if( document.querySelector("input[type='text']") != null){

          document.querySelector("input[type='text']").value = usernameTxt;

        };
        if(document.querySelector("input[name='password']") != null){
       
          document.querySelector("input[name='password']").value = pwd;

        };
        if(document.querySelector("input[type='password']") != null){
       
          document.querySelector("input[type='password']").value = pwd;

        };
        if(document.querySelector("input[name='pass']") != null){

          document.querySelector("input[name='pass']").value = pwd;

        };
      };
      
      
      //Close the pop up
      cancel.innerHTML = 'close';
      cancel.style.color = "black";
      cancel.onclick = function (e) { 
        popup.parentNode.removeChild(popup);
        localStorage.popUpValue = 0; 
      };

      var message = document.createElement('span');
      message.innerHTML = "Password";
      message.style.marginLeft= "10px";
      message.style.marginTop = "10px  ";
      message.style.display = "block";
      message.style.width = "100px";
      message.style.float = "left";
      message.style.color = "black";

      popup.appendChild(message);                                    
      popup.appendChild(cancel);
      storePwd.appendChild(img);
      storePwd.appendChild(storeUsernamePwd);
      storeUsernamePwd.appendChild(storeUrl);
      storeUsernamePwd.appendChild(storeUsername);
      popup.appendChild(storePwd);
      document.body.appendChild(popup);
      
    }

    fnAddButtons();
    fnDefineEvents();

  })();
 
  


