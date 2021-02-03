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



//retrieves values from user and pass fields, connects to backend and inserts new user.
function registerUser() {
    $(document).ready(function() 
    {
        const Url ='http://3.134.99.115/api/signup.php';
        $('#sign-up').click(function()
        {
            var username = document.getElementById("sign-user").value;
            var pass = document.getElementById("sign-password").value;

            if(username && pass)
            {
                $.ajax
                ({
                url: Url + '?username=' + username + '&password='+ pass,
                type: "GET",
                success: function(result)
                {
                    console.log(result)
                    if(result == 1)
                    {
                    alert("Username already exists");
                    
                    }
                    else
                    {
                        alert("User Registered!");
                    }
                },
                error:function(error) 
                {
                    console.log(`Error ${error}`)
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

//retrieves values from user and pass fields, connects to backend and verifies user for logging in.
function login() {
    $(document).ready(function() 
    {
        const Url ='http://3.134.99.115/api/login.php';
        $('#login-btn').click(function()
        {
            var username = document.getElementById("login-user").value;
            var pass = document.getElementById("login-password").value;

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
                        
                        //chrome.runtime.sendMessage({type: 1 ,token: result}, function(response){});
                        window.location.href = "user-otp.html" +"?username=" + username + "&token=" + result;
                    }
                },
                error:function(error) 
                {
                    console.log(`Error ${error}`)
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
 //pswdstr();

 chrome.runtime.sendMessage({type: 2}, function(response) 
 {
    var existingToken = response.verify;

    if(existingToken)
    {
    const Url ='http://3.134.99.115/api/login.php';
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

pageLoad();