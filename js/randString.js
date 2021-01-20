//function for generatoring a random password
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
	  possible += '![]{}()%&*$#^>~@|';
	}
	  if($.inArray('#', dataSet) >= 0 && $(datasym).is(":checked")){
		  possible += '![]{}()%&*$#^>~|';
	  } 
			  
	var text = '';
	for(var i=0; i < datasize; i++) {
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
  }