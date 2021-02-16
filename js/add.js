
var fillPwd;
var fillUsername='';
var usernameArray = [];

//counterValue already exists in localStorage? Let's use that or set to zero.
var counterValue = localStorage.counterValue || 0;

//localStorage.counterValue = 0;
var usernameStore = localStorage.getItem("name");
var fillUsername;

// If no existing data, create an array. Otherwise, convert the localStorage string to an array
usernameStore = usernameStore ? usernameStore.split(',') : [];

(function(){
  var count;

  try{
    
    checkUsername = document.querySelector("input[name='login'],input[name='email'],input[name='username'],input[name='loginKey'],input[name='identifier'],input[name='login_email'],input[name='p_username']");
    checkPwd = document.querySelector("input[name='password'],input[name='pass'],input[type='password'],input[name='login_password'],input[name='p_password']");

    try{

      fillUsername = document.querySelector("input[name='login'],input[name='email'],input[name='username'],input[name='loginKey'],input[name='identifier'],input[name='login_email'],input[name='p_username']").value;
      fillPwd =  document.querySelector("input[name='password'],input[name='pass'],input[type='password'],input[name='login_password'],input[name='p_password']").value;

      if(fillUsername !=='' || fillPwd !=='' || localStorage.counterValue === 1){
          localStorage.counterValue = 1;

          //detecting support for localStorage.
          if (window.localStorage) {

            usernameStore[0] = fillUsername;

            // Save back to localStorage
            localStorage.setItem("name", usernameStore[0].toString());

          }
          addFunction();   
      }
   
    }catch(err){
      
      if(localStorage.counterValue === '1'){
        addFunction();
      
      }else{
    
        console.log('Username and password not found!');
      }
      localStorage.counterValue = 0; 
    }

  }catch(err){
  
    console.log('Elements not found');
  }
  
  function defineEvent(){

      document
      .querySelector("input[name='commit'],input[type='submit']")
      .addEventListener("click", function(event){
        
        if (window.localStorage) {

          //increment the counter and store updated vale in localStorage as well.
          localStorage.counterValue = 1;
          fillUsername = document.querySelector("input[name='login'],input[name='email'],input[name='username'],input[name='loginKey'],input[name='identifier'],input[name='login_email'], input[name='p_username']").value;
          usernameStore[0] = fillUsername;

          // Save back to localStorage
          localStorage.setItem("name", usernameStore[0].toString());

        }
      });
  }
  
  function addFunction() {
    
      //Icon in the pop up
      var img  = document.createElement("img");
      img.id = "iconId";
      img.setAttribute("src", "https://user-images.githubusercontent.com/38464644/107901895-de894580-6f7f-11eb-89a0-4d8adf3ea5cc.png");
      img.setAttribute("width", "40");
      img.setAttribute("height", "40");
      img.setAttribute("alt", "The Pulpit Rock");
      
      img.style.float= 'left';

      //Pop up design
      var popup = document.createElement('div');
      popup.className = 'popup';
      popup.style.background = '#e8e8e8';
      popup.style.width = '250px';
      popup.style.height = '130px';
      popup.style.zIndex = '100000000000000000';
      popup.style.marginLeft = '65%';        
      popup.style.marginTop = '50px';
      popup.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)";
  
      popup.style.top = '0px';
      popup.style.left='0px';
      popup.style.position = 'absolute';

      //Create the close function
      var cancel = document.createElement('div');
      cancel.className = 'cancel';
      cancel.style.display = 'relative';
      cancel.style.float = 'right';
      cancel.style.height= '30px';
      cancel.style.width = '70px';
      cancel.style.paddingLeft = '7px';
      cancel.style.paddingTop = '4px';
      cancel.style.border = '1px solid black';
      cancel.style.borderRadius = '5px';
      cancel.style.border = '1px solid black';
      cancel.style.borderRadius = '5px';
      cancel.style.marginRight = '8px';
      cancel.style.backgroundColor = '#ffff';
      cancel.style.fontSize = '13px';
  
      //Close the pop up
      cancel.innerHTML = 'Not now';
      cancel.style.color = "black";
      
      cancel.onclick = function (e) { 
        popup.parentNode.removeChild(popup) 
        
      };

      //Add the username and website 
      var add = document.createElement('div');
      add.className = 'add';
      add.style.display = 'relative';
      add.style.float = 'right';
      add.style.height= '30px';
      add.style.width = '70px';
      add.style.paddingLeft = '22px';
      add.style.paddingTop = '4px';
      add.style.border = '1px solid black';
      add.style.borderRadius = '5px';
      add.style.marginRight = '20px';
      add.style.color = 'white';
      add.style.backgroundColor = '#0f335c';
      add.style.marginTop = '5px';
      add.innerHTML = 'Add';
      add.style.fontSize = '13px';
      
      //Create store password pop up
      var storePwd = document.createElement('div');
      storePwd.style.height= '50px';
      storePwd.style.width = '225px';
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
      var urlTxt = window.location.hostname;
      storeUrl.innerHTML = urlTxt;
      storeUrl.style.fontSize = '10px';
      storeUrl.style.fontWeight = '900';
      storeUrl.style.color = "black";
        
      //Display username
      var storeUsername = document.createElement('div');
      storeUsername.innerHTML = localStorage.getItem("name");
      storeUsername.style.fontSize = '10px';
      storeUsername.style.width = '150px';
      storeUsername.style.color = "black";
   
      //Show message 
      var message = document.createElement('span');
      message.innerHTML = "Add to Easy Vault?";
      message.style.fontSize = "13px";
      message.style.marginLeft= "10px";
      message.style.marginTop = "10px  ";
      message.style.display = "block";
      message.style.width = "150px";
      message.style.float = "left";
      message.style.color = "black";
      
      popup.appendChild(message);                                    
      storePwd.appendChild(img);
      storePwd.appendChild(storeUsernamePwd);
      storeUsernamePwd.appendChild(storeUrl);
      storeUsernamePwd.appendChild(storeUsername);
      
      popup.appendChild(storePwd);
      popup.appendChild(add);
      popup.appendChild(cancel);
      document.body.appendChild(popup);

    }

  defineEvent();

})();




