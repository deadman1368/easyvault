var querystring = window.location.search;
var urlparms = new URLSearchParams(querystring);
var current_user = urlparms.get('username');
var sessiontoken = urlparms.get('token'); 


function pageLoad()
{
    console.log(current_user);
    const Url ='http://3.134.99.115/api/generateotp.php';

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

        const Url ='http://3.134.99.115/api/verifyotp.php';

            if(otp)
            {
                $.ajax
                ({
                url: Url + '?otp=' + otp + "&username="+ current_user,
                type: "GET",
                success: function(result)
                {
                    console.log(result);
                    if(result == 0)
                    {
                    alert("Invalid or Expired OTP");
                    }
                    else if(result == otp)
                    {
                        alert("logged in successfully, redirecting...")
                        chrome.runtime.sendMessage({type: 1 ,token: sessiontoken}, function(response){});
                        window.location.href = "dashboard.html" + "?username=" + current_user +"&tokenstring=" + result;
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

document.getElementById("login-btn").addEventListener("click",sendOTP);
document.getElementById("resend-otp").addEventListener("click",sendOTP);

pageLoad();

