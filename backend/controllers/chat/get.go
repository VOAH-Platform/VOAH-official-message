package chat

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/permission"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type GetChatListRequest struct {
	ChannelID string `validate:"required,uuid4"`
	Count     int    `validate:"required,gt=0,lte=50"`
	Page      int    `validate:"required,gt=0"`
}

func GetChatList(c *fiber.Ctx) error {
	count, err := strconv.Atoi(c.Query("count", "0"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
			"error":   "count and page must be integer",
		})
	}
	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
			"error":   "count and page must be integer",
		})
	}
	getChatListRequest := GetChatListRequest{
		ChannelID: c.Query("channel-id"),
		Count:     count,
		Page:      page,
	}
	if errArr := validator.VOAHValidator.Validate(getChatListRequest); len(errArr) > 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
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

	err = db.Where(&models.Chat{ChannelID: uuid.MustParse(getChatListRequest.ChannelID)}).
		Order(clause.OrderByColumn{Column: clause.Column{Name: "created_at"}, Desc: false}).Offset((getChatListRequest.Page - 1) * getChatListRequest.Count).
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
