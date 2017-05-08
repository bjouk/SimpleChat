var socket=io()
$(function(){

$('#loginForm').submit(function(e){
	socket.emit('pseudo',$('#pseudoVal').val())
	e.preventDefault();
	$('#login').hide();
})

$('#form').submit(function(e){
	socket.emit('chat message',$('#mess').val())
	e.preventDefault();
	$('#mess').val('')
})
$('#pseudo').submit(function(e){
	socket.emit('pseudo',$('#pseudoVal').val())
	e.preventDefault();
})
socket.on('chat message',function(msg){
	console.log(msg)
	$('#conv').append('<li><span id="pseudo">'+msg['pseudo']+'</span>'+msg['message']+'</li>')
	var height = $('#conv')[0].scrollHeight;
	$('#conv').scrollTop(height);
})
})
