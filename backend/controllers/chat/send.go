package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type Message struct {
	Content   string    `json:"content" validate:"required"`
	ChannelId uuid.UUID `json:"channel_id" validate:"required,uuid4"`
}

func SendJson(c *fiber.Ctx) error {
	body := new(Message)
	if errArr := validator.ParseAndValidate(c, body); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	db := database.DB
	chat := models.Chat{
		Content:   body.Content,
		AuthorID:  c.Locals("user-id").(uuid.UUID),
		ChannelID: body.ChannelId,
	}

	if err := db.Create(&chat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not create chat",
			"data":    err,
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
