package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type Message struct {
	Content   string `json:"content" validate:"required"`
	ChannelID string `json:"channel-id" validate:"required,uuid4"`
}

func SendChat(c *fiber.Ctx) error {
	sendRequest := new(Message)
	if errArr := validator.ParseAndValidate(c, sendRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	db := database.DB
	chat := models.Chat{
		Content:   sendRequest.Content,
		AuthorID:  c.Locals("user-id").(uuid.UUID),
		ChannelID: uuid.MustParse(sendRequest.ChannelID),
	}

	if err := db.Create(&chat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
