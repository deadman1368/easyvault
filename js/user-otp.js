//global varies to retrieve parameters from login page
var querystring = window.location.search;
var urlparms = new URLSearchParams(querystring);
var current_user = urlparms.get('username');
var sessiontoken = urlparms.get('token'); 
var last_login = urlparms.get('last_login');

//on page load, run backend call to generate otp
function pageLoad()
{
    const Url ='https://3.20.221.122/api/generateotp.php';

        if(current_user)
        {
            $.ajax
            ({
            url: Url + '?username=' + current_user,
            type: "GET",
            success: function(result)
            {
                if(result == 0)
                {
                alert("something went wrong");
                }
            },

            error:function(error) 
            {
                alert(`Error ${error}`)
            }
            });
        }
        else
        {
            alert("No user was logged in previously");
        }
}

//on pressing submit, send OTP code to verify it matches with record in DB
function sendOTP()
{
    var otp = document.getElementById("otp").value;

        const Url ='https://3.20.221.122/api/verifyotp.php';

            if(otp)
            {
                $.ajax
                ({
                url: Url + '?otp=' + otp + "&username="+ current_user,
                type: "GET",
                success: function(result)
                {
                    if(result == 0)
                    {
                    alert("Invalid or Expired OTP");
                    }
                    else if(result == otp)
                    {
                        alert("logged in successfully, redirecting...")
                        //send session token and last login time to background.js
                        chrome.runtime.sendMessage({type: 1 ,token: sessiontoken}, function(response){});
                        chrome.runtime.sendMessage({type: 6 ,time: last_login}, function(response){});
                        window.location.href = "dashboard.html" + "?username=" + current_user +"&token=" + sessiontoken;
                    }
                },
                error:function(error) 
                {
                    alert(`Error ${error}`)
                }
                }); 
            }
            else
            {
                alert("Enter in the OTP");
            }

}

//used for resending the OTP to user's email, recalls the same php function on click
function regenerateOTP()
{
    const Url ='https://3.20.221.122/api/generateotp.php';

        if(current_user)
        {
            $.ajax
            ({
            url: Url + '?username=' + current_user,
            type: "GET",
            success: function(result)
            {
                if(result == 0)
                {
                alert("something went wrong");
                }
                else
                {
                    alert("Verification code resent");
                }
            },

            error:function(error) 
            {
                alert(`Error ${error}`)
            }
            });
        }
        else
        {
            alert("No user was logged in earlier");
        }
}

//set function buttons
document.getElementById("login-btn").addEventListener("click",sendOTP);
document.getElementById("resend-otp").addEventListener("click",regenerateOTP);


var otpfield = document.getElementById("otp");
//map enter key submit otp
otp.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      document.getElementById("login-btn").click();
    }
  });

//call on page load
pageLoad();

