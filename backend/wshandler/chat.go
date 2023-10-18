package wshandler

import (
	"fmt"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
)

type NewMessageResponse struct {
	Count int64 `json:"count"`
}

func ChatWebsocket() func(*websocket.Conn) {
	return func(c *websocket.Conn) {
		channelId, err := uuid.Parse(c.Params("channel", ""))
		fmt.Println(channelId)
		if err == nil {
			db := database.DB

			var count int64
			var chats []models.Chat
			var alive bool = true
			var lastUpdated time.Time = time.Now()
			go func() {
				for alive {
					time.Sleep(3 * time.Second)
					db.Where("updated_at > ? AND channel_id = ?", lastUpdated.Local().Format("2006-01-02 15:04:05"), channelId.String()).Find(&chats).Count(&count)
					lastUpdated = time.Now()
					if err := c.WriteJSON(NewMessageResponse{Count: count}); err != nil {
						c.Close()
						return
					}
				}
			}()
			// check client connection
			for {
				if _, _, err := c.ReadMessage(); err != nil {
					alive = false
					c.Close()
					return
				}
			}
		}
	}
}
