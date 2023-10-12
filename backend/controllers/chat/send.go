package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
)

type Message struct {
	content   string
	ChannelId uuid.UUID
}

func sendJson(c *fiber.Ctx) {
	body := new(Message)

	if err := c.BodyParser(body); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	db := database.DB
	chat := models.Chat{
		Content:   body.content,
		ChannelID: body.ChannelId,
	}

	if err := db.Create(&chat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create user", "data": err})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
