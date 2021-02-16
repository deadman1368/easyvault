

//retrieves values from user and pass fields, connects to backend and inserts new user.
function resetpassword() 
{
        const Url ='http://3.20.221.122//api/resetpassword.php';

            var username = document.getElementById("forgetPwd").value;

            if(username)
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