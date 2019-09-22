$(document).on('turbolinks:load', function() {
  $(function(){
    var search_list = $("#user-search-result")
    var append_list = $("#chat-group-users")
    function appendUserName(user) {
      var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id=${user.id}' data-user-name='${user.name}'>追加</a>
                  </div>`
        search_list.append(html);
    }
 
    function appendErrMsg(fail_comment) {
      var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${fail_comment}</p>
                  </div>`
        search_list.append(html);
    }

    function appendMember(userId, userName){
      var html =
        `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ userId }'>
          <input name='group[user_ids][]' type='hidden' value='${ userId }'>
          <p class='chat-group-user__name'>${ userName }</p>
          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`
      append_list.append(html);
    }
    $('#user-search-result').on("click",".chat-group-user__btn--add",function(){
      var userId = $(this).data("user-id")
      var userName = $(this).data("user-name")
      $(this).parent().remove();
      appendMember(userId, userName);
    });
    $('#chat-group-users').on("click",".chat-group-user__btn--remove ",function(){
      $(this).parent().remove();
    });

    $("#user-search-field").on("keyup", function() {
      var input = $(this).val();
      $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUserName(user);
          });
        }
        else {
          appendErrMsg("一致する名前はありません");
        }
      })
      .fail(function() {
        alert('ユーザーの検索に失敗しました');
      })
    })
  });
});