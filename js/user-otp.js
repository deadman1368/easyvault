var querystring = window.location.search;
var urlparms = new URLSearchParams(querystring);
var current_user = urlparms.get('username');
var sessiontoken = urlparms.get('token'); 
var last_login = urlparms.get('last_login');

function pageLoad()
{
    const Url ='http://3.20.221.122/api/generateotp.php';

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
            alert("No user was logged in");
        }
}

function sendOTP()
{
    var otp = document.getElementById("otp").value;

        const Url ='http://3.20.221.122/api/verifyotp.php';

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

function regenerateOTP()
{
    const Url ='http://3.20.221.122/api/generateotp.php';

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

document.getElementById("login-btn").addEventListener("click",sendOTP);
document.getElementById("resend-otp").addEventListener("click",regenerateOTP);

pageLoad();

