package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type DeleteChatRequest struct {
	ChatID uint `json:"chat-id" validate:"required"`
}

func DeleteChat(c *fiber.Ctx) error {
	DeleteChatRequest := new(DeleteChatRequest)
	if errArr := validator.ParseAndValidate(c, DeleteChatRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	var chat models.Chat
	db := database.DB
	err := db.Where(&models.Chat{ID: DeleteChatRequest.ChatID}).First(&chat).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(404).JSON(fiber.Map{
			"message": "Chat not found",
		})
	} else if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	if chat.AuthorID != c.Locals("user-id").(uuid.UUID) {
		return c.Status(403).JSON(fiber.Map{
			"message": "You are not the author of this chat",
		})
	}

	if db.Delete(chat); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
