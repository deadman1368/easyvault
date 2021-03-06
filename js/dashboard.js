//global array to store fetched passwords
var passwords = [];

//var used to store the id's for editPassword() and deletePassword()
var current_user_id;
var current_password_id;

var querystring = window.location.search;
var urlparms = new URLSearchParams(querystring);
var current_user = urlparms.get('username');


$(document).ready(function () {
    $('.sidebar ul li:first').addClass('active');
    $('.tab-content:not(:first)').hide();
    $('.sidebar ul li a').click(function (event) {
        event.preventDefault();
        var content = $(this).attr('href');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $(content).show();
        $(content).siblings('.tab-content').hide();
    });
	
	$(this).on("click", ".clickpass", function(){
		document.getElementById("createDID").classList.toggle("show");
		window.onclick = function(e) {
		  if (!e.target.matches('.createTemp')) {
		  var myDropdown = document.getElementById("createDID");
			if (myDropdown.classList.contains('show')) {
			  myDropdown.classList.remove('show');
			}
		  }
		}
	});
	
	//password length text validation for modal2
	$("#createForm").validate({
		rules: {
			url:{
				required:true
			},
			createUsername:{
				required:true,
			},
			createPassword:{
				required:true,
				minlength: 8
			},
		},
		messages :{
			createPassword:{
			minlength: "Your password length is less than 8"
			}
		}
	});
	
	//password length text validation for modal1
	$("#editForm").validate({
		rules: {
			url:{
				required:true
			},
			username:{
				required:true,
				email: true
			},
			password:{
				required:true,
				minlength: 8
			},
		},
		messages :{
			password:{
			minlength: "Your password length is less than 8"
			}
		}
	});
	
	//makes the password generator appear on click
	$('.clicktogen').click(function(){
		$(".generatorBox").show();
	});
	
	$('.cross').click(function(){
		$('input[name=generateIn').val('');
		$(".generatorBox").hide();
		
	});
	
	$('.clicktogen-settings').click(function(){
		$(".generatorBox").show();
	});
	
	$(".generate.form").click(function(){
		var field = $(this).closest('div').find('input[rel="gp"]');
		var datasize = $(this).closest('div').find('input[rel="dl"]');
		var datasym = $(this).closest('div').find('input[rel="ds"]');
		
		field.val(randString(field, $(datasize).val(), datasym));
	});	
	
	$('body').on('click', '.copybtn', function() {
		var $temp = $("<input>");
			$("body").append($temp);
		  $temp.val($(this).closest('div').find('input[rel="gp"]').val()).select();
		  document.execCommand("Copy");
		  $temp.remove();
	});
	
	//modal2 converts password field to text / vice versa
	$("#checkShow2").on("click", function(){
		  var x = document.getElementById("createPassword");
		  if (x.type === "password") {
			x.type = "text";
		  } else {
			x.type = "password";
		  }

	});

	//modal1 converts password field to text / vice versa
	$("#checkShow1").on("click", function(){

		var y = document.getElementById("editPassword");
		if (y.type === "password") {
		  y.type = "text";
		} else {
		  y.type = "password";
		}

  });
	
	//convert password between text and password for master password new passwor input
	$("#checkShow3").on("click", function(){

		var y = document.getElementById("new-master-password");
		if (y.type === "password") {
		  y.type = "text";
		} else {
		  y.type = "password";
		}

  });
	
	
  //clears create form on pressing cancel
  $("#cancel2").on("click", function(){
	document.getElementById("createForm").reset();
});


	$("#createSubmit").on("click", function(){
		addPassword();
	});
	
	$("#editSubmit").on("click", function(){
		editPassword();
	});
	
	//setting email
	$('.change-email').click(function(){
		$(".masterlogin-email.two").show();
	});
	$('.email-cancel').click(function(){
		$(".masterlogin-email.two").hide();
		$('input[type=email]').val('');
	});
	
	//setting master password 
	$('.change-master-password').click(function(){
		$(".masterlogin-password.two").show();
	});
	
	$('.cancel-master-password').click(function(){
		$(".masterlogin-password.two").hide();
		$('input[type=password]').val('');
	});
	
	//confirm to delete account modal
	$('.setting-form.delete').click(function(){
		$(".confirm-delete").show();
	});
	
	$('.cancel-delete').click(function(){
		$(".confirm-delete").hide();
	});
	
	//confirm to save changes modal at settings
	$('.save-master-password').click(function(){
		$("#change-masterpassword-window").show();
	});
	
	$('.save-email').click(function(){
		$("#change-email-window").show();
	});
	
	$('.cancel-changes').click(function(){
		$(".confirm-changes").hide();
	});

	//modal for confirming to delete password card at password page
	
	$('#delete-password').click(function(){
		$(".password-confirm-changes").show();
	});
	
	$('.password-cancel-changes').click(function(){
		$(".password-confirm-changes").hide();
	});
	

	//Password Validation
	$("#new-master-password").passwordValidation({"confirmField": "#confirm-master-password"}, function(element, valid, match, failedCases) {
	  $(".pswd_info").html("<pre>" + failedCases.join("\n") + "</pre>");
	   if(valid) $(element).css("border","2px solid green");
	   if(!valid) $(element).css("border","2px solid red");
	   if(valid && match) $("#confirm-master-password").css("border","2px solid green");
	   if(!valid || !match) $("confirm-master-password").css("border","2px solid red");
	});
	
	//Password Strength meter
	$('#new-master-password').passtrength({
		minChars: 8,
		passwordToggle : false
	});
	
	$('#createPassword').passtrength({
		minChars: 8,
		passwordToggle: false
	});
	
	$('#editPassword').passtrength({
		minChars: 8,
		passwordToggle: false
	});
	
});

//email validation for registration
function is_email(email){      
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email); } 
	

//sets the values for input fileds on clicking edit
function setValues() 
{
	var index = parseInt(this.id.split("_")[1]);
	var data = passwords[index];

	var data_url = data.url
	var data_username = data.username;
	var data_password = data.password;
	var data_id = data.id;
	var data_userid = data.user_id;
	var data_misc = data.misc;

	current_password_id = data_id;
	current_user_id = data_userid;

	document.getElementById("editUrl").value = data_url;
	document.getElementById("editUsername").value = data_username;
	document.getElementById("editPassword").value = data_password;
	document.getElementById("editNote").value = data_misc;
}

//sets global variables for pass and user id to null
function clear_id() 
{
	current_password_id = null;
	current_user_id = null;
}

//to retrieve and show the passwords on the dashboard page
function populatePasswords() {
	var url;
	var username;
	var password;
	var id;
	var userid;
	var misc;

	for(i=0;i<passwords.length;i++)
	{
		url = passwords[i].url;
		username = passwords[i].username;
		password = passwords[i].password;
		id = passwords[i].id;
		userid = passwords[i].userid;
		misc = passwords[i].misc;

		// generate the html cards for the passwords
		jQuery("<div/>",{
			id : "cardID"+passwords[i].id,
			class : "cardClass",
			css:{
				width: 350,
				height: 150,
				border: "1px solid #000000",
				display: "block",
				float: "left",
				position: "relative",
				textAlign : "center",
				boxSizing :"border-box",
				margin : 20,
				fontWeight : "bold"
			}
		}).append( $("<div>",{
			id : "url"+passwords[i].url,
			class : "urlClass",
			css:{
				width :350,
				height : 75,
				borderBottom : "1px solid #000000",
				background : "maroon",
			}
		}), $("<div>",{
			id : "username" + passwords[i].id,
			class : "usernameClass",
			css:{
				width : "auto",
				height: 100,
				background : "white"
			}
		}).append(
			//generates a link to editmodel with a unique id for each, containing their own pre-populated input fields for each password.
			"<p>&nbsp;</p>",
			"<p style = 'float:left'>Website:</p>",url,
			"<p>&nbsp;</p>",
			"<p style = 'float:left'>Username:",username,"</p>",
			"&nbsp;",'<a id = "editModel_'+i+'" href="#modal1" style = "float: right; color:black; "><i class="fas fa-cog"></i>Edit</a>')).appendTo("#passwdStore");

			//function to prepopulate the input fields for each EditModel
			document.getElementById("editModel_"+i).onclick = setValues;

			//clears the global variable on cancel click
			document.getElementById("cancelForm").onclick = clear_id;

	}

}

//on page load, retrieve all passowrd objects,split and store them as seperate object arrays,store them in global "passwords" array, sets the last login time.
function pageLoad() {

	chrome.runtime.sendMessage({type: 2}, function(response) 
	{
	   var existingToken = response.verify;
		
	   chrome.runtime.sendMessage({type: 7}, function(response) 
	   {
		   var time = response.verify;
		   if(time)
		   {
			document.getElementById("LastLoginTime").innerHTML = "Your previous Login was: " + time;
		   }
		   else if(!time)
		   {
			document.getElementById("LastLoginTime").innerHTML = "Your previous Login was: " + "Never";
		   }
	   });
	   
	   if(existingToken)
	   {
	   const Url ='https://3.20.221.122/api/viewpassword.php';
	   $.ajax
	   ({
		   url: Url + '?token='+ existingToken,
		   type: "GET",
		   success: function(result)
		   {
			   if(result == 0)
			   {
					alert("error, unable to communicate with backend");
			   }
			   else if(result == 2)
			   {
				   //do nothing
			   }
			   else
			   {

				var temp = result.split(";");
				for(i=0;i < temp.length;i++)
				{
					if(temp[i])
					{
						var passwordList = temp[i].split(",");
						var temp2 = {id: passwordList[0], user_id: passwordList[1] , username: passwordList[2] ,password: passwordList[3], url: passwordList[4], misc: passwordList[5]  };
						passwords.push(temp2);

					}
				}

			   }

			   chrome.runtime.sendMessage({type: 4, data:passwords}, function(response){});
			   populatePasswords();
		   },
		   error:function(error) 
		   {
		   		alert(`Error ${error}`)
		   }
	   });
	   }
	   else
	   {
		   alert("Session expired, redirecting to login page...");
		   window.location.href = "login.html";
	   }
   
   });
   
   	document.getElementById("LoggedUser").innerHTML = "User: "+current_user;
	document.getElementById("LoggedUser2").innerHTML += current_user;

	//set delete user button function
	document.getElementById("deleteuser-Btn").onclick = deleteUser;
	//set update email button function
	document.getElementById("confirm-change-email").onclick = editUsername;
	//set update master password button function
	document.getElementById("confirm-change-master-password").onclick = editMasterPassword;
	//set the logout button
	document.getElementById("logout-Btn").onclick = logout;
	//set the delete button
	document.getElementById("password-delete-confirm").onclick = deletePassword;

}

//uses values from input fields in modal2, connects to backend and inserts into passwords db.
function addPassword() 
{
	chrome.runtime.sendMessage({type: 2}, function(response) 
	{
		var existingToken = response.verify;

		var new_url = document.getElementById("createUrl").value;
		var new_username = document.getElementById("createUsername").value;
		var new_password = document.getElementById("createPassword").value;
		var new_misc = document.getElementById("createNote").value;

		if(existingToken)
    	{
   	 		const Url ='https://3.20.221.122/api/addpassword.php';
    		$.ajax
    		({
        		url: Url + '?token='+ existingToken + "&site_username=" + new_username + "&site_password=" + new_password + "&site_url="+ new_url + "&misc="+ new_misc,
        		type: "GET",
        		success: function(result)
       			{
            	if(result != 0)
            	{
					alert("Password Added");
					window.location.reload();
           		}
           		else
            	{
					console.log("error adding password, unable to communicate with backend");
					window.location.reload();
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
			alert("Session expired, redirecting to login page...");
			window.location.href = "login.html";
		}
	});
}

//function to connect to database to edit any existing password, values taken from input fields in modal1
function editPassword() 
{
	chrome.runtime.sendMessage({type: 2}, function(response) 
	{
		var existingToken = response.verify;

		var edit_id = current_password_id;
		var edit_userid = current_user_id;
		var edit_siteuser = document.getElementById("editUsername").value;
		var edit_sitepassword = document.getElementById("editPassword").value;
		var edit_siteurl = document.getElementById("editUrl").value;
		var edit_sitemisc = document.getElementById("editNote").value;


		var appendurl =  "?id=" + edit_id + "&user_id=" + edit_userid + "&site_url="+ edit_siteurl  + "&site_username=" + edit_siteuser  + "&site_password=" + edit_sitepassword + "&misc=" + edit_sitemisc + "&token=" + existingToken;

		
		if(existingToken)
    	{
   	 		const Url ='https://3.20.221.122/api/editpassword.php';
    		$.ajax
    		({
        		url: Url + appendurl,
        		type: "GET",
        		success: function(result)
       			{
            	if(result == 1)
            	{
					alert("Password Changes saved");
					window.location.href = "dashboard.html" + "?username=" + current_user +"&tokenstring=" + result;
           		}
           		else
            	{
					alert("error editing password, unable to communicate with backend");
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
			alert("Session expired, redirecting to login page...");
			window.location.href = "login.html";
		}
	});
	
}

//function to delete existing passwords for the user.
function deletePassword() 
{
	var delete_id = current_password_id;

	//if(confirm("Confirm deletion of password?"))
	//{
		chrome.runtime.sendMessage({type: 2}, function(response) 
		{
			var existingToken = response.verify;

			if(existingToken)
			{
				const Url ='https://3.20.221.122/api/deletepassword.php';
				$.ajax
				({
					url: Url + '?id='+ delete_id + "&token=" + existingToken,
					type: "GET",
					success: function(result)
					{
					if(result == 1)
					{
						alert("Password Deleted");
						window.location.href = "dashboard.html" + "?username=" + current_user +"&tokenstring=" + result;
					}
					else
					{
						console.log("error deleting password, unable to communicate with backend");
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
				alert("Session expired, redirecting to login page...");
				window.location.href = "login.html";
			}
		});
	//}
}

//function to change the email for the user.
function deleteUser() 
{

	chrome.runtime.sendMessage({type: 2}, function(response) 
	{
		var existingToken = response.verify;

		if(existingToken)
    	{
   	 		const Url ='https://3.20.221.122/api/deleteuser.php';
    		$.ajax
    		({
        		url: Url + "?token=" + existingToken,
        		type: "GET",
        		success: function(result)
       			{
            	if(result == 1)
            	{
						console.log(result);
						alert("User has been deleted");
						chrome.runtime.sendMessage({type: 3}, function(response){});
						window.location.href = "login.html";
           		}
           		else
            	{
					alert("error deleting user, unable to communicate with backend");
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
			alert("Session expired, redirecting to login page...");
			window.location.href = "login.html";
		}
	});
	
}

//function to change the username(email) of the user
function editUsername() 
{
	var new_username = document.getElementById("inputemail").value;
	var confirm_newusername = document.getElementById("confirm-inputemail").value;
	
	if(new_username == confirm_newusername)
	{

		if(is_email(new_username))
		{
			chrome.runtime.sendMessage({type: 2}, function(response) 
			{
				var existingToken = response.verify;

				if(existingToken && new_username)
				{
					const Url ='https://3.20.221.122/api/editemail.php';
					$.ajax
					({
						url: Url + "?newusername=" + new_username + "&token=" + existingToken,
						type: "GET",
						success: function(result)
						{
							if(result == 1)
							{
								alert("email has been changed, please relogin with the new email");
								chrome.runtime.sendMessage({type: 3}, function(response){});
								window.location.href = "login.html";
							}
							else
							{
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
					alert("Session expired, redirecting to login page...");
					window.location.href = "login.html";
				}
			});
		}
		else
		{
			alert("enter a valid email format");
		}
	}
	else
	{
		alert("email fields don't match");
	}
}

//function to change the master password of the user.
function editMasterPassword() 
{
	var placeholder = document.getElementById("new-master-password").value;
	var placeholder2 = document.getElementById("confirm-master-password").value;
	if(placeholder == placeholder2)
	{
		var new_master_password = document.getElementById("new-master-password").value;
		var old_master_password = document.getElementById("old-master-password").value;
	}

	chrome.runtime.sendMessage({type: 2}, function(response) 
	{
		var existingToken = response.verify;

		if(existingToken)
    	{
			if(new_master_password && old_master_password)
			{
				const Url ='https://3.20.221.122/api/editmasterpassword.php';
				$.ajax
				({
					url: Url + "?new_password=" + new_master_password + "&old_password=" + old_master_password + "&token=" + existingToken,
					type: "GET",
					success: function(result)
					{
						if(result == 1)
						{
							alert("Master Password has been changed, please relogin with the new password");
							chrome.runtime.sendMessage({type: 3}, function(response){});
							window.location.href = "login.html";
						}
						else
						{
							alert("something went wrong");
							window.location.href = "dashboard.html" + "?username=" + current_user +"&tokenstring=" + result;
						}
					
					},
					error:function(error) 
					{
						alert(`Error ${error}`)
					}
				});
			}
			else if(!old_master_password)
			{
				alert("enter in your old password");
			}
			else
			{
				alert("New Password and Confirm Password don't match")
			}
		}
		else
		{
			alert("Session expired, redirecting to login page...");
			window.location.href = "login.html";
		}
	});
	
}


//function to log out the user, and deletes the relevant session token from the backend
function logout()
{
	chrome.runtime.sendMessage({type: 2}, function(response) 
	{
		var existingToken = response.verify;

		if(existingToken)
    	{
   	 		const Url ='https://3.20.221.122/api/logout.php';
    		$.ajax
    		({
        		url: Url + "?username=" + current_user,
        		type: "GET",
        		success: function(result)
       			{
            		if(result == 1)
            		{
						alert("Logged out");
						chrome.runtime.sendMessage({type: 3}, function(response){});
						window.location.href = "login.html";
           			}
           			else
            		{
						alert("Something went wrong, unable to communicate with backend");
						window.location.href = "login.html";;
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
			alert("Session expired, redirecting to login page...");
			window.location.href = "login.html";
		}
	});
}

var emailfield = document.getElementById("inputemail");
var confirmemailfield = document.getElementById("confirm-inputemail");

var passwordfield = document.getElementById("new-master-password");
var confirmpasswordfield = document.getElementById("confirm-master-password");

emailfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      $("#change-email-window").show();
    }
  });

confirmemailfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      $("#change-email-window").show();
    }
  });

passwordfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      $("#change-masterpassword-window").show();
    }
  });

confirmpasswordfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      event.preventDefault();
      $("#change-masterpassword-window").show();
    }
  });

window.onload=pageLoad();