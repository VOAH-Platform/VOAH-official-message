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

func WebsocketHandler(c *fiber.Ctx) error {
	return websocket.New(func(conn *websocket.Conn) {
		db := database.DB
		log := logger.Logger

		channelId, err := uuid.Parse(c.Params("id"));
		if err != nil {
			log.Error("channer id is not uuid")
		}
		
		var (
            msg string
			chat models.Chat
			updated time.Time
        )

		for {
			if err := conn.ReadJSON(&msg); err != nil {
                log.Error("read error")
                break
            }

			if err := updated.UnmarshalJSON([]byte(msg)); err != nil {
				log.Error("msg not equall RFC 3339 format")
			}

			count := 0

			for {
				db.Where(&models.Chat{ChannelID: channelId}).Offset(count).First(&chat)
				if updated.Before(chat.UpdatedAt) {
					count += 1
				} else {
					break
				}
			}
		
			if err := conn.WriteJSON(count); err != nil {
				log.Error("write error")
			break
		}
		}

	})(c)
}
