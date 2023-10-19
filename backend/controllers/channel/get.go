package channel

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/permission"
)

func GetChannelList(c *fiber.Ctx) error {
	targetID, err := uuid.Parse(c.Query("target-id", "0"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
			"error":   "target-id must be uuid",
		})
	}
	// get all channels with target-id
	db := database.DB
	var channels []models.Channel
	if err := db.Where(&models.Channel{AffiliationID: targetID}).Find(&channels).Error; err != nil && err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	userPerm := c.Locals("permissions").([]permission.Permission)
	channelPermission := &permission.Permission{
		Type:  configs.ChannelObject,
		Scope: configs.ReadPermissionScope,
	}
	returnArr := []models.Channel{}
	for _, channel := range channels {
		channelPermission.Target = channel.ID
		if permission.PermissionCheck(userPerm, []permission.Permission{*channelPermission}) {
			returnArr = append(returnArr, channel)
		}
	}

	return c.JSON(fiber.Map{
		"message": "Success",
		"result":  returnArr,
	})
}
