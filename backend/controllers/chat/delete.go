package chat

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type DeleteChatRequest struct {
	ChatID uint `json:"chat-id" validate:"required,uint"`
}

func DeleteChat(c *fiber.Ctx) error {
	DeleteChatRequest := new(DeleteChatRequest)
	if errArr := validator.ParseAndValidate(c, DeleteChatRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	db := database.DB

	if err := db.Delete(&models.Chat{ID: DeleteChatRequest.ChatID}).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
