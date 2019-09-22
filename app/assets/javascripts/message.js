$(function(){
  function buildHTML(message){
    var image = message.image ? '< img class="Chat-whole__Chat-main__messages__message__text__image" src="${message.image}" >' : ''

    var html = `<div class="Chat-whole__Chat-main__messages__message", data-id='${message.id}'>
                  <div class="Chat-whole__Chat-main__messages__message__detail">
                    <div class="Chat-whole__Chat-main__messages__message__detail__detail-user">
                      ${message.user_name}
                    </div>
                    <div class="Chat-whole__Chat-main__messages__message__detail__detail-date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="Chat-whole__Chat-main__messages__message__text">
                    <p class="Chat-whole__Chat-main__messages__message__text__content">
                      ${message.text}
                      ${image}
                    </p>
                  </div>
                </div>
              </div>`
              return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.Chat-whole__Chat-main__messages').append(html);
      $('.Chat-whole__Chat-main__messages').animate({scrollTop:$('.Chat-whole__Chat-main__messages')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.Chat-whole__Chat-main__form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message').last().data('id');

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
      var insertHTML = '';
      
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      })
      $('.Chat-whole__Chat-main__messages').animate({scrollTop: $('.Chat-whole__Chat-main__messages')[0].scrollHeight}, 'fast')
      }
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    });
    }
  };
  setInterval(reloadMessages, 5000);
});
