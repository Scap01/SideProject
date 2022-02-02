
var loader_block_page = function(add,_class){};
var format_amount = function(amount,display){};
var img_loader = '/components/com_tecnic_register/assets/img/loader.gif';


(function($){

	loader_block_page = function(add,_class){
		_class = _class || 'loader';
		add = add || false;
		if(add){
			var html = '<div class="' +_class+ '" style="z-index:9999;position: absolute;top:0;left:0;right:0;bottom:0;">';
			html += '<img style="display: block;left: 50%;position: absolute;top: 50%;margin:-32px 0 0-32px;" src="' + img_loader + '" />'
			html += '</div>';
			$('#content').append(html)
		}else{
			$('#content').find('.' + _class).remove();
		}
		//alert("alert to stop code");
	};

	format_amount = function(amount,display){

		if(typeof display == "undefined"){
			display = false;
		}

		amount = amount.toString();

		// Formatage Espace / sans tiret
		for (var i = 0; i < amount.length; i++) {
			amount = amount.replace(' ', '');
			amount = amount.replace(',', '.');
		}

		amount = parseFloat(Math.round(parseFloat(amount)*100))/100.0;
		amount = amount.toString();

		/* Method 2 - delete all dot if is not decimal */
		var tmp = amount.split('.');

		$.each(tmp, function(k, v){
			if(typeof tmp[k+1] != "undefined" && tmp[k+1].length <= 2){
				tmp[k] = v+'.';
			}
		});

		/* if(tmp.length > 1 && tmp[tmp.length - 1].length > 2){
			tmp[tmp.length - 1] = tmp[tmp.length - 1].slide(0, 2);
		}
		else if(tmp.length > 1 && tmp[tmp.length - 1].length < 2){
			tmp[tmp.length - 1] = tmp[tmp.length - 1]+'0';
		}
		else if(tmp.length == 1){
			tmp[tmp.length + 1] = '.00';
		} */

		amount = tmp.join('');

		if(display){
			amount = parseFloat(amount).toFixed(2).toString();

			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(amount)) {
				amount = amount.replace(rgx, '$1' + '&nbsp;' + '$2');
			}
			return amount;
		}
		else{
			return parseFloat(amount);
		}
	};

	submitFormFix = function(form){
		if ($.browser.mozilla) {
			setTimeout(function(){
				form.submit();
			},250)
		}else{
			form.submit();
		}
	}
})(jQuery)
