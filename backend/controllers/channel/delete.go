package channel

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type DeleteChannelRequest struct {
	ChannelID string `json:"channel-id" validate:"required,uuid"`
}

func DeleteChannel(c *fiber.Ctx) error {
	deleteChannelRequest := new(DeleteChannelRequest)
	if errArr := validator.ParseAndValidate(c, deleteChannelRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	var channel models.Channel
	db := database.DB
	err := db.Where(&models.Channel{ID: uuid.MustParse(deleteChannelRequest.ChannelID)}).First(&channel).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(404).JSON(fiber.Map{
			"message": "Channel not found",
		})
	} else if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	// TODO: permission

	if db.Delete(channel); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
