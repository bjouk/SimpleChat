var socket=io()
var pseudo=''
function addMessage(pseudoSender,message){
	var date = new Date();
	if(pseudoSender==pseudo){
		$('#conv').append('<li><div id="me"><div id="info"><span id="pseudo">'+pseudoSender+'</span>'+'<span id="time">'+date.getHours()+':'+date.getMinutes()+'</span></div><div id=bubble>'+message+'</div></div></li>')
	}
	else{
		$('#conv').append('<li><div id="other"><div id="info"><span id="pseudo">'+pseudoSender+'</span>'+'<span id="time">'+date.getHours()+':'+date.getMinutes()+'</span></div><div id=bubble>'+message+'</div></div></li>')
	}
	var height = $('#conv')[0].scrollHeight;
	$('#conv').scrollTop(height);
}
$(function(){

$('#loginForm').submit(function(e){
	socket.emit('pseudo',$('#pseudoVal').val())
	pseudo=$('#pseudoVal').val()
	console.log(pseudo)
	e.preventDefault();
	$('#login').hide();
})

$('#form').submit(function(e){
	socket.emit('chat message',$('#mess').val())
	addMessage(pseudo,$('#mess').val())
	e.preventDefault();
	$('#mess').val('')
})
$('#pseudo').submit(function(e){
	socket.emit('pseudo',$('#pseudoVal').val())
	e.preventDefault();
})
socket.on('chat message',function(msg){
	addMessage(msg['pseudo'],msg['message'])
})
})
