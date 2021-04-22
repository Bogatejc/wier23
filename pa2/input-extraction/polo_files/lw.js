if (typeof lwdgt_executed == 'undefined')
{
	(function()
	{
		if(document.readyState === 'interactive' || document.readyState === 'complete')
		{
			var lwdgt_link  = document.createElement('link');
			lwdgt_link.rel  = 'stylesheet';
			lwdgt_link.type = 'text/css';
			lwdgt_link.href = 'https://linker-network.com/widget/css/lw.css';
			document.getElementsByTagName('head')[0].appendChild(lwdgt_link);
        	lwdgt_process = function(url, widget_id)
			{
				var lwdgt_request = new XMLHttpRequest();
				lwdgt_request.onreadystatechange = function()
				{
					if (lwdgt_request.readyState == 4 && lwdgt_request.status == 200)
					{
						document.getElementById(widget_id).innerHTML = JSON.parse(lwdgt_request.responseText);
						
						var arr = document.getElementById(widget_id).getElementsByTagName('script');
						for (var n = 0; n < arr.length; n++)
						{
							var s = document.createElement('script');
							s.setAttribute('type', 'text/javascript');
							if(arr[n].src){
								s.setAttribute('src', arr[n].src);
							}
							if(arr[n].innerHTML){
								s.innerHTML = arr[n].innerHTML;
							}
							s.async = true;
							document.body.appendChild(s);
						}
					}
				};
				lwdgt_request.open('GET', url, true);
				lwdgt_request.send();
			}
			var lwdgt_divs = document.getElementsByClassName('lwdgt');
			for (var lw_i = 0; lw_i < lwdgt_divs.length; lw_i++)
			{
				lwdgt_divs[lw_i].id = 'lwdgt-' + Math.floor((Math.random() * 10000) + 1);
				lwdgt_process("https://linker-network.com/widget/lw.php?&wid=" + lwdgt_divs[lw_i].getAttribute('data-wid') + "&amp=" + lwdgt_divs[lw_i].getAttribute('data-amp'), lwdgt_divs[lw_i].id);
			}
		}
		else setTimeout(arguments.callee, 200);
	})();
	//var lwdgt_executed = true;
}
