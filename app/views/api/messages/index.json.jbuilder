json.array! @messages do |message|
  json.text message.content
  json.image message.image.url
  json.created_at message.created_at
  json.user_name message.user.name
  json.id message.id
end