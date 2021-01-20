//tbd

(function(){

    function fnAddButtons(){
    
 
      var usernameVar = document.querySelector("input[name='login']");
      var pwdVar =  document.querySelector("input[name='password']");
      var bgImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC')";
      
      usernameVar.style.backgroundImage = bgImage;
      pwdVar.style.backgroundImage = bgImage;
      usernameVar.id = "username-id";
      pwdVar.id = "pwd-id";

  }
    var count = 0;
    function fnDefineEvents() {
        document
          .getElementById("username-id")
          .addEventListener("click", function (event) {
            count = 0;
            usernamePwdPopUp();
          });

          document
          .getElementById("pwd-id")
          .addEventListener("click", function (event) {
            count = 1; 
            usernamePwdPopUp();
          });
      }
 
    function usernamePwdPopUp(){
    
      var img  = document.createElement("img");
     
      img.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC");
      img.setAttribute("width", "50");
      img.setAttribute("height", "50");
      img.setAttribute("alt", "The Pulpit Rock");
      img.style.float= 'left';
    
      var popup = document.createElement('div');
      popup.className = 'popup';
      popup.id = 'test';
      popup.style.background = '#e8e8e8';
      popup.style.width = '200px';
      popup.style.height = '100px';
      popup.style.zIndex = '100000000000000000';
      popup.style.marginLeft = '45.5%';

      if(count == 0){
        popup.style.marginTop = '230px';
      }else{
        popup.style.marginTop = '305px';

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
      var urlTxt = 'github.com';
      var pwd = '12345';
      storeUrl.innerHTML = urlTxt;
      storeUrl.style.fontSize = '10px';
      storeUrl.style.fontWeight = '900';
         
      //Display username
      var storeUsername = document.createElement('div');
      var usernameTxt = 'mrlai999@gmail.com';
      storeUsername.innerHTML = usernameTxt;
      storeUsername.style.fontSize = '10px';

      //Populate data into username div and password div
      storeUsernamePwd.onclick = function (e){
        document.querySelector("input[name='login']").value = usernameTxt;
        document.querySelector("input[name='password']").value = pwd;
      };
      
      //Close the pop up
      cancel.innerHTML = 'close';
      cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };

      var message = document.createElement('span');
      message.innerHTML = "Password";
      message.style.marginLeft= "10px";
      message.style.marginTop = "10px  ";
      message.style.display = "block";
      message.style.width = "100px";
      message.style.float = "left";

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
 
  