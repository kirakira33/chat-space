$(function(){
  function buildHTML(message){
    var image = message.image.url ? '< img class="Chat-whole__Chat-main__messages__message__text__image" src="${message.image.url}" ></img>' : ''

    var html = `<div class="Chat-whole__Chat-main__messages">
                  <div class="Chat-whole__Chat-main__messages__message">
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
})
