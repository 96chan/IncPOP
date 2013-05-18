/*
 * Designed by
 * Eungchan Kim
 * May 2013
 */
 
// FB_like_count FB_share_count FB_comment_count twitter_count duration
var ORDER =['FBL','FBS','FBC','TC','D'];	
var COEFF = {'FBL':-41.36680781, 'FBS':27.83859388, 'FBC':40.9995862, 'TC':152.88826727, 'D':1.58684257};
var IND_VARIABLES = {'FBL':'','FBS':'','FBC':'','TC':'','D':''};
var VIEW_COUNT = 0;
var E_VIEW_COUNT = 0;
var ACCURACY = 0;

var func = {
	init: function(){
		for (var i=0; i<ORDER.length;i++){
			IND_VARIABLES[ORDER[i]]=0;
		}
		VIEW_COUNT = 0;
		E_VIEW_COUNT = 0;
		ACCURACY = 0;
	},
	buttons: function(){
			// click submit button
		$('form').submit(function() {
			func.init();
			var input_url = $("#video_url").val();
			console.log("url : "+ input_url);
			func.facebook(input_url);
			func.twitter(input_url);
			func.youtube(input_url);
			$('#main-image').css("display","none");
			return false;	
		});

	},
	calculate: function(){
		 console.log(IND_VARIABLES);	
		 console.log(VIEW_COUNT);
		 for (var i =0; i< ORDER.length; i++){
		   E_VIEW_COUNT += COEFF[ORDER[i]]*IND_VARIABLES[ORDER[i]];
		 }
		
		 console.log(E_VIEW_COUNT);
		 var format_e = String(E_VIEW_COUNT).substring(0,String(E_VIEW_COUNT).indexOf('.'));
		 console.log(format_e);
		 ACCURACY = (1- (Math.abs(E_VIEW_COUNT-VIEW_COUNT) / VIEW_COUNT)) *100;
		 var format_a = String(ACCURACY).substring(0,String(ACCURACY).indexOf('.')+2);
		 $('#real').html("<p>View Count</p><p>"+VIEW_COUNT+"</p>");
		 $('#estimated').html("<p>Estimated View Count</p><p> "+format_e+"</p>");
		 $('#accuracy').html("<p>Accuracy</p><p>"+format_a+"%</p>");
		
		 // tag-line
		 if (E_VIEW_COUNT < VIEW_COUNT){
			$('#tagline').html("<span style='font-family:Lobster, sans-serif;BACKGROUND-COLOR: #3350ae; color:#fff; font-size:2em;'> This video is over-populated! </span>");
		}
		else {
			$('#tagline').html("<span style='font-family:Lobster, sans-serif;BACKGROUND-COLOR: #c60404; color:#fff; font-size:2em;'> This video is under-populated! </span>");
		}
		 console.log(ACCURACY);
	},
	validate:function(){
		return true;
	},
	delay: function(millis){
		  var date = new Date();
		  var curDate = null;
		  do { curDate = new Date(); }
		  while(curDate-date < millis);
	},
	
 	youtube: function(url){
		var p = String(url).indexOf('?v=');
		var id = String(url).substring(p+3);
		var feed_url ="https://gdata.youtube.com/feeds/api/videos/"+id+"?v=2&alt=jsonc";
		$.getJSON(feed_url+'&callback=?', function(json) {
	       $(json).each(function(){
				// console.log(this.data);
				var duration = this.data.duration;
				var title = this.data.title;
				var uploaded = this.data.uploaded;
				VIEW_COUNT = this.data.viewCount;
				var video_date = String(uploaded).substring(0,4);
				var video_title = "<p>"+title+ " ("+video_date+")</p>"; 
				$('#video-title').html(video_title);
				$('#video-clip').html('<iframe width="560" height="315" src="http://www.youtube.com/embed/'+id+'"frameborder="0" allowfullscreen ></iframe>');
	         	var stats = "<img src='youtube_hover.png'/><p>Duration(s): " +duration+ "</p>";
	         	$('#youtube').html(stats);

				IND_VARIABLES['D']= duration;
				func.calculate();
   			});	
		});
		console.log('Youtube data extracted');		
	},
	facebook: function(url){
	    // using Facebook API
	    var feed_url = "http://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,%20commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url='"+url+"'";
	    $.getJSON(feed_url+'&callback=?', function(json) {
	       $(json).each(function(){
				//console.log(this.data[0]);
				var like_count = this.data[0].like_count;
				var share_count = this.data[0].share_count;
				var comment_count = this.data[0].comment_count;
				//console.log(like_count, share_count, comment_count);
	         	var new_text = "<img src='facebook_hover.png'/><p>Like: " +like_count+ "</p><p>Share: "+share_count+"</p><p>Comment: "+comment_count+"</p>";
	         	$('#facebook').html(new_text);
				IND_VARIABLES['FBL'] = like_count;
				IND_VARIABLES['FBS'] = share_count;
				IND_VARIABLES['FBC'] = comment_count;
	       });		
		});
		console.log('Facebook data extracted');		
	},
	twitter: function(url){
		var feed_url = "http://urls.api.twitter.com/1/urls/count.json?url=" + url;
	    $.getJSON(feed_url + '&callback=?', function(json) {
			$(json).each(function(){
				var count = this.count;
				var new_text = "<img src='twitter_hover.png'/><p>Tweet: " + count +"</p>";
	         	$('#twitter').html(new_text);
				IND_VARIABLES['TC'] = count;
				console.log("twitter : "+count);
			});
		});
		console.log('Twitter data extracted');		
	}		
};		


//--------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
	console.log('Ppop start');
    func.init();
	func.buttons();
});
