$(function(){
	var socket=io()
	$('button').on('click',function(){
		console.log('Hi')
		socket.emit('chat message',$('#mess').val())
		console.log($('#mess').val())

	})
	socket.on('chat message',function(msg){
		$('#conv').append($('<li>').text(msg))
	})
}
