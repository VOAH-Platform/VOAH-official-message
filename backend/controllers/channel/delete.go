package channel

import (
	"fmt"

	"github.com/go-resty/resty/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/logger"
	"implude.kr/VOAH-Official-Message/utils/permission"
)

func DeleteChannel(c *fiber.Ctx) error {
	channelID, err := uuid.Parse(c.Query("channel-id", "0"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
			"error":   "target-id must be uuid",
		})
	}

	var channel models.Channel
	db := database.DB
	err = db.Where(&models.Channel{ID: channelID}).First(&channel).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(404).JSON(fiber.Map{
			"message": "Channel not found",
		})
	} else if err != nil {
		log := logger.Logger
		log.Error(err.Error())
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	if !permission.PermissionCheck(c.Locals("permissions").([]permission.Permission), []permission.Permission{
		{
			Type:   configs.ChannelObject,
			Scope:  configs.AdminPermissionScope,
			Target: channel.ID,
		},
	}) {
		return c.Status(403).JSON(fiber.Map{
			"message": "You are not the admin of this channel",
		})
	}

	if db.Delete(channel); err != nil {
		log := logger.Logger
		log.Error(err.Error())
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	client := resty.New()
	resp, err := client.R().
		SetHeader("API-KEY", configs.Env.Server.CoreAPIKey).
		SetQueryParam("target-id", channelID.String()).
		Delete(configs.Env.Server.CoreInternalHost + "/api/server/permission/delete")
	if err != nil {
		log := logger.Logger
		log.Error(err.Error())
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	} else if resp.StatusCode() == 403 {
		return c.Status(500).JSON(fiber.Map{
			"message": "API Key is invalid",
		})
	} else if resp.StatusCode() != 200 {
		fmt.Println(resp.StatusCode())
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
