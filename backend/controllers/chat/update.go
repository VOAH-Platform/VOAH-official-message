package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type UpdateChatRequest struct {
	ChatID  uint   `json:"chat-id" validate:"required"`
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

	err := db.Where(&models.Chat{ID: UpdateChatRequest.ChatID}).First(&chat).Error
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
	chat.Content = UpdateChatRequest.Content

	if err := db.Save(&chat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
