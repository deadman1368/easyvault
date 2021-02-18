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

    if(request.type == 11) {
        clickedEl.value = request.value.username;
        return true;
    }

});

//extension javascript injection code
var popUpValue = localStorage.popUpValue || 0;
localStorage.popUpValue = 0;

(function(){
	
	var popup = document.createElement('div');
	popup.className = 'popup';
	popup.id = 'test';
	popup.style.background = '#e8e8e8';
	popup.style.width = '200px';
	popup.style.height = 'auto';
	popup.style.zIndex = '10';
	popup.style.position = 'absolute';

	function addbuttons(){
		var bgImage = "url('https://user-images.githubusercontent.com/38464644/107901895-de894580-6f7f-11eb-89a0-4d8adf3ea5cc.png')";
		var usernameVar;
		var pwdVar;
		var usernameAll= document.querySelectorAll("input[type = 'text']");
		var pswdAll= document.querySelectorAll("input[type = 'password']");
		for(var i = 0; i < usernameAll.length; i++ ){
			if(usernameAll[i].name.includes("login") || usernameAll[i].name.includes("email") || usernameAll[i].name.includes("user") || usernameAll[i].name.includes("identifier")){
				usernameVar = usernameAll[i];
				usernameVar.id = "username-id";
				usernameVar.style.backgroundImage = bgImage;
				usernameVar.style.backgroundRepeat = "no-repeat";
				usernameVar.style.backgroundPosition = "100% 100%";
				usernameVar.style.backgroundSize = "30px 30px";
				usernameVar.style.paddingRight = "6%";
			}
		}
		
		for(var j = 0; j < pswdAll.length; j++ ){
			if(pswdAll[j].name.includes("pass")){
				pwdVar = pswdAll[j];
				pwdVar.id = "pwd-id";
				pwdVar.style.backgroundImage = bgImage;
				pwdVar.style.backgroundRepeat = "no-repeat";
				pwdVar.style.backgroundPosition = "100% 100%";
				pwdVar.style.backgroundSize = "30px 30px";
				pwdVar.style.paddingTop = "2%";
			}
		}
	}
	var count = 0;
	var counts = 0;
	function appendpopup(){
		var username = document.getElementById("username-id");
		var rect = username.getClientRects();
		username.addEventListener("click", function(){
			popup.style.left = rect[0].left + 'px';
			popup.style.top = rect[0].bottom + 'px';
			if(localStorage.popUpValue === '0'){
				count = 0;
				usernamePwdPopUp();
				document.body.appendChild(popup);
				//count++;
			}
		});
		
		var pswd = document.getElementById("pwd-id");
		var rect2 =pswd.getClientRects();
		pswd.addEventListener("click", function(){
			popup.style.left =rect2[0].left +'px';
			popup.style.top =rect2[0].bottom +'px';
			if(localStorage.popUpValue === '0'){
				count = 1;
				usernamePwdPopUp();
				document.body.appendChild(popup);
				//counts++;
			}
		});
	}
	
	
    function fnAddButtons(){
      
      //Query select all the input fields
      var usernameVar = document.querySelector("input[name='login'],input[name='email'],input[name='username'],input[name='loginKey'],input[name='identifier'],input[name='login_email'], input[name='login_id']");
      var pwdVar =  document.querySelector("input[name='password'],input[name='pass'],input[type='password'],input[name='login_password'],input[name='p_password']");
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
  
    function fnDefineEvents() {
        document
          .getElementById("username-id")
          .addEventListener("click", function (event) {
            
            if (localStorage.popUpValue === '0'){
                count = 0;
                usernamePwdPopUp();
            }
          });

          document
          .getElementById("pwd-id")
          .addEventListener("click", function (event) {
            if (localStorage.popUpValue === '0'){
              count = 1;
              usernamePwdPopUp();
            }
          });
      }
	
	function randString(generateNo){
	var possible = '';
	  possible += 'abcdefghijklmnopqrstuvwxyz';
	  possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	  possible += '0123456789';
	  possible += '![]{}()%&*$#^>~@|';
			  
	var text = '';
	for(var i=0; i < generateNo; i++) {
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	
	runPassword(text);
	return text;
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
      var urlTxt = window.location.hostname;
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
		
	/*
	for(int i = 0; i < listOfURL.length; i++){
		if(listOfURL[i].includes(window.location.hostname)){
			usernameTxt = listOfUsername[i].value;
			pwd = listofPassword[i].value
			storeUsername.innerHTML = usernameTxt;
			storeUsername.style.fontSize = '10px';
			storeUsername.style.color = "black";
		}
	}
	
	storeUsernamePwd.addEventListener("click", function(){
		document.getElementById('username-id').value = usernameTxt;
		document.getElementById('pwd-id').value = pwd;
	});
	*/
      
      //Populate data into username div and password div
		storeUsernamePwd.onclick = function (){
		document.getElementById('username-id').value = usernameTxt;
		document.getElementById('pwd-id').value = pwd;
        };
			
		
      
      //Close the pop up
		cancel.innerHTML = 'close';
		cancel.style.color = "black";
		cancel.onclick = function () { 
			var removepop = document.getElementById("test");
			removepop.parentNode.removeChild(removepop);
      };

      var message = document.createElement('span');
      message.innerHTML = "Password";
      message.style.marginLeft= "10px";
      message.style.marginTop = "10px  ";
      message.style.display = "block";
      message.style.width = "100px";
      message.style.float = "left";
      message.style.color = "black";
		
		var generateButton = document.createElement("button");
		generateButton.style.width = "100px";
		generateButton.style.fontSize = '10px';
		generateButton.innerHTML = "Generate Password";
		generateButton.style.display = "inline-block";
		generateButton.onclick = function(){
			var generateNo = document.getElementById('generateNumber-id').value;
			generateInput.value = randString(generateNo);
			var toggle = document.getElementById("generate-id");
			toggle.style.display = 'block';
		};
		
		var generateDiv = document.createElement("div");
		generateDiv.id = "generate-id";
		generateDiv.style.marginTop = '10px';
		generateDiv.style.display = 'none';
		
		var generateInput = document.createElement("input")
		generateInput.style.display = "inline-block";
		generateInput.style.padding = '5px';
		generateInput.id = 'generate-input-id';
		generateInput.style.width = '70%';
		
		var generateNumber = document.createElement("input");
		generateNumber.type = 'number';
		generateNumber.style.display = 'inline-block';
		generateNumber.style.width = '20%';
		generateNumber.value = '12';
		generateNumber.id = 'generateNumber-id';
		generateNumber.style.marginLeft = "10px";
		
		var generatemeter = document.createElement("div");
		generatemeter.id = "generatemeter-id";
		
		var generatetext = document.createElement("p");
		generatetext.id = "generateText-id";
		
		var hideGenerate = document.createElement("span");
		hideGenerate.style.cursor = 'pointer';
		hideGenerate.innerHTML = 'hide';
		hideGenerate.style.fontSize = '12px';
		hideGenerate.style.fontStyle = 'italic';
		hideGenerate.style.marginTop = '5px';
		hideGenerate.onclick = function(){
			var toggle = document.getElementById("generate-id");
			toggle.style.display = 'none';
		}
		

		popup.appendChild(message);                                    
		popup.appendChild(cancel);
		storePwd.appendChild(img);
		storePwd.appendChild(storeUsernamePwd);
		storeUsernamePwd.appendChild(storeUrl);
		storeUsernamePwd.appendChild(storeUsername);
		popup.appendChild(storePwd);
		popup.appendChild(generateButton);
		popup.appendChild(generateDiv);
		generateDiv.appendChild(generateInput);
		generateDiv.appendChild(generateNumber);
		generateDiv.appendChild(generatemeter);
		generateDiv.appendChild(generatetext);
		generateDiv.appendChild(hideGenerate);
      
    }
	
	
	var m_strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var m_strLowerCase = "abcdefghijklmnopqrstuvwxyz";
	var m_strNumber = "0123456789";
	var m_strCharacters = "!@#$%^&*?_~"
	
	function checkPassword(strPassword)
{
    // Reset combination count
    var nScore = 0;

    // Password length
    // -- Less than 4 characters
    if (strPassword.length < 5)
    {
        nScore += 5;
    }
    // -- 5 to 7 characters
    else if (strPassword.length > 4 && strPassword.length < 8)
    {
        nScore += 10;
    }
    // -- 8 or more
    else if (strPassword.length > 7)
    {
        nScore += 25;
    }

    // Letters
    var nUpperCount = countContain(strPassword, m_strUpperCase);
    var nLowerCount = countContain(strPassword, m_strLowerCase);
    var nLowerUpperCount = nUpperCount + nLowerCount;
    // -- Letters are all lower case
    if (nUpperCount == 0 && nLowerCount != 0) 
    { 
        nScore += 10; 
    }
    // -- Letters are upper case and lower case
    else if (nUpperCount != 0 && nLowerCount != 0) 
    { 
        nScore += 20; 
    }

    // Numbers
    var nNumberCount = countContain(strPassword, m_strNumber);
    // -- 1 number
    if (nNumberCount == 1)
    {
        nScore += 10;
    }
    // -- 3 or more numbers
    if (nNumberCount >= 3)
    {
        nScore += 20;
    }

    // Characters
    var nCharacterCount = countContain(strPassword, m_strCharacters);
    // -- 1 character
    if (nCharacterCount == 1)
    {
        nScore += 10;
    }   
    // -- More than 1 character
    if (nCharacterCount > 1)
    {
        nScore += 25;
    }

    // Bonus
    // -- Letters and numbers
    if (nNumberCount != 0 && nLowerUpperCount != 0)
    {
        nScore += 2;
    }
    // -- Letters, numbers, and characters
    if (nNumberCount != 0 && nLowerUpperCount != 0 && nCharacterCount != 0)
    {
        nScore += 3;
    }
    // -- Mixed case letters, numbers, and characters
    if (nNumberCount != 0 && nUpperCount != 0 && nLowerCount != 0 && nCharacterCount != 0)
    {
        nScore += 5;
    }


    return nScore;
}

// Runs password through check and then updates GUI 


function runPassword(strPassword) 
{
    // Check password
    var nScore = checkPassword(strPassword);


     // Get controls
        var ctlBar = document.getElementById('generatemeter-id'); 
        var ctlText = document.getElementById('generateText-id');
        if (!ctlBar || !ctlText)
            return;

        // Set new width
        ctlBar.style.width = (nScore*1.25>100)?100:nScore*1.25 + "%";

    if (nScore >= 80)
    {
        var strText = "Very Strong";
        var strColor = "#008000";
    }
    // -- Strong
    else if (nScore >= 60)
    {
        var strText = "Strong";
        var strColor = "#006000";
    }
    // -- Average
    else if (nScore >= 40)
    {
        var strText = "Average";
        var strColor = "#e3cb00";
    }
    // -- Weak
    else if (nScore >= 20)
    {
        var strText = "Weak";
        var strColor = "#Fe3d1a";
    }
    // -- Very Weak
    else
    {
        var strText = "Very Weak";
        var strColor = "#e71a1a";
    }

    if(strPassword.length == 0)
    {
    ctlBar.style.backgroundColor = "";
    ctlText.innerHTML =  "";
    }
else
    {
    ctlBar.style.backgroundColor = strColor;
    ctlText.innerHTML =  strText;
}
}

// Checks a string for a list of characters
function countContain(strPassword, strCheck)
{ 
    // Declare variables
    var nCount = 0;

    for (i = 0; i < strPassword.length; i++) 
    {
        if (strCheck.indexOf(strPassword.charAt(i)) > -1) 
        { 
                nCount++;
        } 
    } 

    return nCount; 
} 

	addbuttons();
	appendpopup();

  })();