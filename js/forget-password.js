
//email validation for registration
function is_email(email){      
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email); } 

//retrieves values from user and pass fields, connects to backend and inserts new user.
function resetpassword() 
{
        const Url ='https://3.20.221.122//api/resetpassword.php';

            var username = document.getElementById("forgetPwd").value;

            if(is_email(username))
            {
                $.ajax
                ({
                url: Url + '?username=' + username,
                type: "GET",
                success: function(result)
                {
                    if(result == 1)
                    {
                        window.location.href = "resetPwd.html";
                    }
                    else
                    {
                        alert("Something went wrong");
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
                alert("Enter the email address to reset");
            }
}

document.getElementById('reset-btn').onclick = resetpassword;

var emailfield = document.getElementById("forgetPwd");
//map enter key to reset password button when email field is in focus
emailfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      document.getElementById("reset-btn").click();
    }
  });