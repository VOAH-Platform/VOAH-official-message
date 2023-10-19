package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/permission"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type GetChatListRequest struct {
	ChannelID string `json:"channel-id" validate:"required,uuid4"`
	Count     int    `json:"count" validate:"required"`
	Page      int    `json:"page" validate:"required"`
}

func GetChatList(c *fiber.Ctx) error {
	getChatListRequest := new(GetChatListRequest)
	if errArr := validator.ParseAndValidate(c, getChatListRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}
	var requirePerms []permission.Permission = []permission.Permission{
		{
			Type:   configs.ChannelObject,
			Scope:  configs.ReadPermissionScope,
			Target: uuid.MustParse(getChatListRequest.ChannelID),
		},
	}
	userPerms := c.Locals("permissions").([]permission.Permission)
	if !permission.PermissionCheck(userPerms, requirePerms) {
		return c.Status(403).JSON(fiber.Map{
			"message": "You don't have permission to read chat",
		})
	}

	db := database.DB

	var chats []models.Chat

	err := db.Where(&models.Chat{ChannelID: uuid.MustParse(getChatListRequest.ChannelID)}).
		Order("created_at").Offset((getChatListRequest.Page - 1) * getChatListRequest.Count).
		Limit(getChatListRequest.Count).
		Find(&chats).Error

	if err != nil && err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"chats":   chats,
	})

}
