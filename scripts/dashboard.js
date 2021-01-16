function randString(id, datasize, datasym){
  var dataSet = $(id).attr('data-character-set').split(',');  
  var possible = '';
	
  if($.inArray('a-z', dataSet) >= 0){
    possible += 'abcdefghijklmnopqrstuvwxyz';
  }
  if($.inArray('A-Z', dataSet) >= 0){
    possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if($.inArray('0-9', dataSet) >= 0){
    possible += '0123456789';
  }

  if($.inArray('#', dataSet) >= 0 && !$(datasym).is(":checked")){
    possible += '![]{}()%&*$#^<>~@|';
  }
	if($.inArray('#', dataSet) >= 0 && $(datasym).is(":checked")){
		possible += '![]{}()%&*$#^<>~|';
	} 
			
  var text = '';
  for(var i=0; i < datasize; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

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
	
	$("#myForm").validate({
		rules: {
			url:{
				required:true
			},
			createUsername:{
				required:true,
				email: true
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
	
	var i = 0;
	$(this).on("click", ".submit", function(){
		
		jQuery("<div/>",{
			id : "cardID",
			class : "cardClass",
			css:{
				width: 300,
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
			id : "urlID"+i,
			class : "urlClass",
			css:{
				width :299,
				height : 75,
				borderBottom : "1px solid #000000",
				background : "maroon",
			}
		}), $("<div>",{
			id : "usernameID" + i,
			class : "usernameClass",
			css:{
				width : "auto",
				height: 75,
				background : "white"
			}
		}).append(document.getElementById("url").value,"<br><br>",document.getElementById("username").value, "&nbsp;",'<a id = "editModel" href="#modal1" style = "float: right"><i class="fas fa-edit"></i>Edit</a>')).appendTo("#passwdStore");
		i++; 
	});
	
	$('.clicktogen').click(function(){
		$(".generatorBox").show();
	});
	
	$('.cross').click(function(){
		$('input[name=generateIn').val('');
		$(".generatorBox").hide();
		
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
	
	$(this).on("click", ".showpassword", function(){
		  var x = document.getElementById("password");
		  if (x.type === "password") {
			x.type = "text";
		  } else {
			x.type = "password";
		  }

	});
	
	/*
	$(document).on("click", ".editCard", function(){
		
			$("#usernameID0").replaceWith(
			$("<div>",{
			id : "usernameID0",
			class : "usernameClass0",
			css:{
				width : "auto",
				height: 75,
				background : "white"
			}
		}).append(document.getElementById("editUrl").value,"<br><br>",document.getElementById("editUsername").value, "&nbsp;",'<a href="#modal1" style = "float: right"><i class="fas fa-edit"></i>Edit</a>'));
		
	});*/
});