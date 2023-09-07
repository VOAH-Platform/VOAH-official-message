package chat

type GetChatList struct {
	ChannelID string `json:"channel_id" validate:"required,uuid4"`
	Count     int    `json:"count" validate:"required"`
}
