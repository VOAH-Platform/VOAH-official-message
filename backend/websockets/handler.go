package websockets

import (
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/logger"
)

var TimeList = make(map[uuid.UUID]time.Time)

func WebsocketHandler(c *fiber.Ctx) error {
	return websocket.New(func(conn *websocket.Conn) {
		db := database.DB
		log := logger.Logger
		channelId := uuid.MustParse(c.Params("id"))
		
		var chat models.Chat

		for {
			db.Where(&models.Chat{ChannelID: channelId}).Last(&chat)
			val, ok := TimeList[channelId]

			if !ok {
				TimeList[channelId] = chat.CreatedAt
			}

			if val.Before(chat.CreatedAt) {
				if err := conn.WriteMessage(0, []byte("read")); err != nil {
					log.Error("write error")
				}
				TimeList[channelId] = chat.CreatedAt
			}
		}
	})(c)
}
