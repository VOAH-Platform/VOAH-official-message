package channel

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type UpdateChannelRequest struct {
	ChannelID   string `json:"channel-id" validate:"required,uuid4"`
	Name        string `json:"name" validate:"required,min=1,max=40"`
	Description string `json:"description" validate:"required,min=1,max=200"`
}

func UpdateChannel(c *fiber.Ctx) error {
	updateChannelRequest := new(UpdateChannelRequest)
	if errArr := validator.ParseAndValidate(c, updateChannelRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	db := database.DB
	var channel models.Channel

	err := db.Where(&models.Channel{ID: uuid.MustParse(updateChannelRequest.ChannelID)}).First(&channel).Error
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

	channel.Name = updateChannelRequest.Name
	channel.Description = updateChannelRequest.Description

	if err := db.Save(&channel).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}
}
