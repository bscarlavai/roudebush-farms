function goToPage(pageName, hash)
{
	if(hash)
		document.location.href = pageName + ".html#" + hash;
	else
		document.location.href = pageName + ".html";
		
	initPage(pageName, hash);
	
	$('#' + hash).show();
}

function hideElements(selector)
{
	$(selector).each(function(idx){
		$(this).css('display', 'none');
	});
}

function initPage(pageName, hash)
{
	if(hash)
	{
		$('a.active').removeClass('active');
		$('#' + pageName + '-' + hash).addClass('active');
	}
	else
	{
		$('a.active').removeClass('active');
		$('#' + pageName).addClass('active');
	}
}

function loadMasterPage(masterPageName)
{
	if(masterPageName)
		alert('masterPageName=' + masterPageName);
	else
	{
		var html = $('#page-container').html();
		loadXmlContent('master.xml', '#page-container');
		$('#main-content').replaceWith(html);
	}
}

function loadXmlContent(xmlFilePath, controlSelector)
{
	$.ajax({
		type: "GET",
		async: false,
		url: xmlFilePath,
		dataType: "text",
		success: function(xml) {
			$(controlSelector).replaceWith(xml);
		}
	});
}

function setupEvents()
{
	$.ajax({
		type: "GET",
		async: false,
		url: 'events.xml',
		dataType: "xml",
		success: function(xml) {
			var jXmlData = $(xml);
			jXmlData.find('event[ month = "' + $('.ui-datepicker-month').text() + '" ]').each(function( intPartIndex ){
				var event = $(this);
				var day = event.attr('day');
				$('#datepicker a:contains("' + day + '")').each(function(index){
					if($(this).text() == day)
					{
						$(this).css('color', 'white');
						$(this).css('background', '#6EAC2C url(includes/css/images/ui-bg_gloss-wave_50_6eac2c_500x100.png) repeat-x 50% 50%');
						$(this).css('border', '1px solid #ACDD4A');
						
						$(this).addClass('tip_trigger');
						$(this).html($(this).html() + '<span class="tip" style="text-align:left;padding:15px;display:none;">' +
							'<span style="text-align:left;display:inline;padding:0px;font-weight:bold;">' + event.text() + '</span><br />' +
							(event.attr('location') != '' ? 'Location: ' + event.attr('location') + '<br />' : '') +
							(event.attr('time') != '' ? 'Time: ' + event.attr('time') + '<br />' : '') +
							'</span>');
					}
				});
			});
		}
	});
}

function initEvents()
{
	$('.ui-state-active').removeClass('ui-state-active');
	setupEvents();
	
	$(".tip_trigger").hover(function(){
		tip = $(this).find('.tip');
		tip.show(); //Show tooltip
	}, function() {
		tip.hide(); //Hide tooltip
	}).mousemove(function(e) {
		var mousex = e.pageX + 20; //Get X coodrinates
		var mousey = e.pageY + 20; //Get Y coordinates
		var tipWidth = tip.width(); //Find width of tooltip
		var tipHeight = tip.height(); //Find height of tooltip

		//Distance of element from the right edge of viewport
		var tipVisX = $(window).width() - (mousex + tipWidth);
		//Distance of element from the bottom of viewport
		var tipVisY = $(window).height() - (mousey + tipHeight);

		if ( tipVisX < 20 ) { //If tooltip exceeds the X coordinate of viewport
			mousex = e.pageX - tipWidth - 20;
		} if ( tipVisY < 20 ) { //If tooltip exceeds the Y coordinate of viewport
			mousey = e.pageY - tipHeight - 20;
		}
		//Absolute position the tooltip according to mouse position
		tip.css({  top: mousey, left: mousex });
	});
}

function setupPoolCalendar()
{
	$.ajax({
		type: "GET",
		async: false,
		url: 'pool_calendar.xml',
		dataType: "xml",
		success: function(xml) {
			var jXmlData = $(xml);
			jXmlData.find('event[ month = "' + $('.ui-datepicker-month').text() + '" ]').each(function( intPartIndex ){
				var event = $(this);
				var day = event.attr('day');
				$('#pool-datepicker a:contains("' + day + '")').each(function(index){
					if($(this).text() == day)
					{
						$(this).css('color', 'white');
						$(this).css('background', '#6EAC2C url(includes/css/images/ui-bg_gloss-wave_50_6eac2c_500x100.png) repeat-x 50% 50%');
						$(this).css('border', '1px solid #ACDD4A');
						
						$(this).addClass('tip_trigger');
						$(this).html($(this).html() + '<span class="tip" style="text-align:left;padding:15px;display:none;">' +
							'<span style="text-align:left;display:inline;padding:0px;font-weight:bold;">' + event.text() + '</span><br />' +
							(event.attr('location') != '' ? 'Location: ' + event.attr('location') + '<br />' : '') +
							(event.attr('time') != '' ? 'Time: ' + event.attr('time') + '<br />' : '') +
							'</span>');
					}
				});
			});
		}
	});
}

function initPoolCalendar()
{
	//$('.ui-state-active').removeClass('ui-state-active');
	setupPoolCalendar();
	
	/*$(".tip_trigger").hover(function(){
		tip = $(this).find('.tip');
		tip.show(); //Show tooltip
	}, function() {
		tip.hide(); //Hide tooltip
	}).mousemove(function(e) {
		var mousex = e.pageX + 20; //Get X coodrinates
		var mousey = e.pageY + 20; //Get Y coordinates
		var tipWidth = tip.width(); //Find width of tooltip
		var tipHeight = tip.height(); //Find height of tooltip

		//Distance of element from the right edge of viewport
		var tipVisX = $(window).width() - (mousex + tipWidth);
		//Distance of element from the bottom of viewport
		var tipVisY = $(window).height() - (mousey + tipHeight);

		if ( tipVisX < 20 ) { //If tooltip exceeds the X coordinate of viewport
			mousex = e.pageX - tipWidth - 20;
		} if ( tipVisY < 20 ) { //If tooltip exceeds the Y coordinate of viewport
			mousey = e.pageY - tipHeight - 20;
		}
		//Absolute position the tooltip according to mouse position
		tip.css({  top: mousey, left: mousex });
	});*/
}