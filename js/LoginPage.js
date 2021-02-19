//login page animations
(function(window, document){
 
    const getSelector = ele => {
        return typeof ele === "string" ? document.querySelector(ele) : "";
    }
    
    
    
    const containerShow = () => {
        var show = getSelector(".container")
        show.className += " container-show"
    }
    
    window.onload = containerShow;
    
    
    
        let toSignBtn = getSelector(".toSign"),
            toLoginBtn = getSelector(".toLogin")
            loginBox = getSelector(".login-box"),
            signBox = getSelector(".sign-box");
        
        toSignBtn.onclick = () => {
            loginBox.className += ' animate_login';
            signBox.className += ' animate_sign';
        }
    
        toLoginBtn.onclick = () => {
            loginBox.classList.remove("animate_login");
            signBox.classList.remove("animate_sign");
        }
    
    
    })(window, document);


function pswdstr(){
	$(document).ready(function(){
		$('#myPassword').strength_meter();
	});
}

//email validation for registration
function is_email(email){      
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email); } 

//password validation for registration 

function pwd_validation(pwd){    
    //8-20 Characters, at least one capital letter, at least one number, no spaces
    //one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces.   
    var pwdReg = /^(?=.*\d)(?=.*[A-Z])(?!.*\s).{8,20}$/;
    return pwdReg.test(pwd); } 



//retrieves values from user and pass fields, connects to backend and inserts new user.
function registerUser() {
    $(document).ready(function() 
    {
        const Url ='https://3.20.221.122/api/signup.php';
        $('#sign-up').click(function()
        {
            var username = document.getElementById("sign-user").value;
            var pass = document.getElementById("sign-password").value;
            var confirmPass = document.getElementById("confirm-password").value;

                if(is_email(username) && pwd_validation(pass) && pass == confirmPass )
                {
                    $.ajax
                    ({
                    url: Url + '?username=' + username + '&password='+ pass,
                    type: "GET",
                    success: function(result)
                    {
                        if(result == 1)
                        {
                        alert("Username already exists");
                        
                        }
                        else if(result == 0)
                        {
                            alert("User Registered!");
                        }
                    },
    
                    error:function(error) 
                    {
                        alert(`Error ${error}`)
                    }
    
                    })
                   
                }
                else
                {
                    alert("1. Username must be an email. \r\n2. Password must be 8-20 characters, at least one capital letter, at least one number and no spaces. \r\n3. All input fields cannot be empty.\r\n4. Confirm password must match the created password.");
                }
        })

    }
    )
}

//retrieves values from user and pass fields, connects to backend and verifies user for logging in.
function login() {
    $(document).ready(function() 
    {
        const Url ='https://3.20.221.122/api/login.php';
        $('#login-btn').click(function()
        {
            var username = document.getElementById("login-user").value;
            var pass = document.getElementById("login-password").value;
            var sessiontoken;
            var last_login;

            if(username && pass)
            {
                $.ajax
                ({
                url: Url + '?username=' + username + '&password='+ pass,
                type: "GET",
                success: function(result)
                {
                    if(result == 0)
                    {
                    alert("Incorrect Credentials");
                    }
                    else
                    {
                        sessiontoken = result.split(";")[0];
                        last_login = result.split(";")[1];

                       window.location.href = "user-otp.html" +"?username=" + username + "&token=" + sessiontoken + "&last_login="+ last_login;

                    }
                },
                error:function(error) 
                {
                    alert(`Error ${error}`)
                }
                }) 
            }
            else
            {
                alert("Complete the required fields");
            }
        })

    }
    )
}

//checks for an existing session token in background js and compares with token table in database, if token is valid, redirect to dashboard page.
function pageLoad() 
{
 document.getElementById("sign-up").addEventListener("click",registerUser());
 document.getElementById("login-btn").addEventListener("click",login());
 pswdstr();

 chrome.runtime.sendMessage({type: 2}, function(response) 
 {
    var existingToken = response.verify;

    if(existingToken)
    {
        const Url ='https://3.20.221.122/api/login.php';
        $.ajax
        ({
            url: Url + '?token='+ existingToken,
            type: "GET",
            success: function(result)
            {
                if(result == 0)
                {
                    chrome.runtime.sendMessage({type: 3}, function(response){});
                    alert("Session expired");
                    window.location.href = "login.html";
                    return true;
                }
                else
                {
                    window.location.href = "dashboard.html" + "?username=" + result +"&tokenstring=" + existingToken;
                    return true;
                }
            },
            error:function(error) 
            {
            console.log(`Error ${error}`)
            }
        });

    }
});

}

var usernamefield = document.getElementById("login-user");
var passwordfield = document.getElementById("login-password");

//set enter key to login when either username or password fields are "on focus"
// 13 = enter key
usernamefield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      document.getElementById("login-btn").click();
    }
  });

  passwordfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("login-btn").click();
    }
  });

//call on page load
pageLoad();