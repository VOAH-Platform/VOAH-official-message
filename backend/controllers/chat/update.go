package chat

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type UpdateChatRequest struct {
	ChatID  uint   `json:"chat-id" validate:"required,uint"`
	Content string `json:"content" validate:"required"`
}

func UpdateChat(c *fiber.Ctx) error {
	UpdateChatRequest := new(UpdateChatRequest)
	if errArr := validator.ParseAndValidate(c, UpdateChatRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	db := database.DB

	var chat models.Chat

	db.Find(models.Chat{ID: UpdateChatRequest.ChatID}).First(&chat)
	chat.Content = UpdateChatRequest.Content

	if err := db.Save(&chat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
