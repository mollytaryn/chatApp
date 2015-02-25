'use strict';

var fbUrl = 'https://whereat.firebaseio.com/';
var fb = new Firebase(fbUrl);
var messages;
var fbMessageUrl;

//SUBMIT EVENT
$('#submitChat').click(function(event){
  event.preventDefault();
  messages = {
              name: $('#senderName').val(),
              message: $('#chatBox').val()
             }

  addMessageToDB(messages, function(data){
  });
  $('#senderName').val('');
  $('#chatBox').val('');
});

//PUSH TO FIREBASE
function addMessageToDB(data, cb) {
  var storeMessage = fb.push(data);
  cb(storeMessage);
}

//APPEND DATA TO PAGE
function appendMessageToPage(data) {
  $('.sentMessage').append('<div><div class="singleText">' + data.name + ': ' + data.message + '</div></div>');
}

//PULL DATA FROM FIREBASE
fb.on('child_added', function(snap){
  var data = snap.val();
  appendMessageToPage(data);
});


