package personal

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
)

func GetChannelList(c *fiber.Ctx) error {
	userID := c.Locals("user-id").(uuid.UUID)

	db := database.DB
	// get all personal channels with user id
	var personalChannels []models.PersonalChannel
	var tempPersonalChannels []models.PersonalChannel
	if err := db.Where(&models.PersonalChannel{FirstUser: userID}).Find(&personalChannels).Error; err != nil && err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	if err := db.Where(&models.PersonalChannel{SecondUser: userID}).Find(&tempPersonalChannels).Error; err != nil && err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	personalChannels = append(personalChannels, tempPersonalChannels...)

	return c.JSON(fiber.Map{
		"message": "Success",
		"result":  personalChannels,
	})
}

func CreateChannel(c *fiber.Ctx) error {
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
			personalChannel = models.PersonalChannel{
				FirstUser:  userID,
				SecondUser: targetID,
			}
			if err := db.Create(&personalChannel).Error; err != nil {
				return c.Status(500).JSON(fiber.Map{
					"message": "Internal Server Error",
				})
			}
		} else if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "Internal Server Error",
			})
		}
	}
	return c.JSON(fiber.Map{
		"message": "Success",
		"result":  personalChannel,
	})
}
