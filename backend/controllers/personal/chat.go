package personal

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
)

func GetChatList(c *fiber.Ctx) error {
	userID := c.Locals("user-id").(uuid.UUID)
	targetID, err := uuid.Parse(c.Query("target-id", "0"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
			"error":   "target-id must be uuid",
		})
	}
	// get find personal channel with target-id
	db := database.DB
	var personalChannel models.PersonalChannel
	if err = db.Where(&models.PersonalChannel{FirstUser: userID, SecondUser: targetID}).First(&personalChannel).Error; err == gorm.ErrRecordNotFound {
		if err = db.Where(&models.PersonalChannel{FirstUser: targetID, SecondUser: userID}).First(&personalChannel).Error; err == gorm.ErrRecordNotFound {
			return c.Status(404).JSON(fiber.Map{
				"message": "Not Found",
				"error":   "Personal Channel not found",
			})
		} else if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "Internal Server Error",
			})
		}
	} else if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	// get all chats with personal channel
	var chats []models.PersonalChat
	if err := db.Where(&models.PersonalChat{ChannelID: personalChannel.ID}).Find(&chats).Error; err != nil && err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Success",
		"result":  chats,
	})
}
