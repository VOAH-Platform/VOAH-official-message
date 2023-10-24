package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/permission"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type Message struct {
	Content   string `json:"content" validate:"required"`
	ChannelID string `json:"channel-id" validate:"required,uuid4"`
	Priority  int    `json:"priority" validate:"required,gte=1,lte=3"`
}

func SendChat(c *fiber.Ctx) error {
	sendRequest := new(Message)
	if errArr := validator.ParseAndValidate(c, sendRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}

	var requirePerms []permission.Permission = []permission.Permission{
		{
			Type:   configs.ChannelObject,
			Scope:  configs.WritePermissionScope,
			Target: uuid.MustParse(sendRequest.ChannelID),
		},
	}
	userPerms := c.Locals("permissions").([]permission.Permission)
	if !permission.PermissionCheck(userPerms, requirePerms) {
		return c.Status(403).JSON(fiber.Map{
			"message": "You don't have permission to read chat",
		})
	}

	db := database.DB
	chat := models.Chat{
		Content:   sendRequest.Content,
		AuthorID:  c.Locals("user-id").(uuid.UUID),
		ChannelID: uuid.MustParse(sendRequest.ChannelID),
		Priority:  sendRequest.Priority,
	}

	if err := db.Create(&chat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success"})
}
