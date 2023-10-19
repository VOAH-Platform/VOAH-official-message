package channel

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/logger"
	"implude.kr/VOAH-Official-Message/utils/permission"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type CreateChannelRequest struct {
	Name        string `json:"name" validate:"required,min=1,max=40"`
	Description string `json:"description" validate:"required,min=1,max=200"`
	TargetID    string `json:"target-id" validate:"required,uuid4"`
}

func CreateChannel(c *fiber.Ctx) error {
	createChannelRequest := new(CreateChannelRequest)
	if errArr := validator.ParseAndValidate(c, createChannelRequest); len(errArr) != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   errArr,
		})
	}
	var targetType configs.ObjectType

	projectPermission := []permission.Permission{
		{
			ID:     uuid.New(),
			Type:   configs.ProjectObject,
			Target: uuid.MustParse(createChannelRequest.TargetID),
			Scope:  configs.AdminPermissionScope,
		},
	}
	teamPermission := []permission.Permission{
		{
			ID:     uuid.New(),
			Type:   configs.TeamObject,
			Target: uuid.MustParse(createChannelRequest.TargetID),
			Scope:  configs.AdminPermissionScope,
		},
	}
	companyPermission := []permission.Permission{
		{
			ID:     uuid.New(),
			Type:   configs.CompanyObject,
			Target: uuid.MustParse(createChannelRequest.TargetID),
			Scope:  configs.AdminPermissionScope,
		},
	}
	userPermissions := c.Locals("permissions").([]permission.Permission)
	if permission.PermissionCheck(userPermissions, projectPermission) {
		targetType = configs.ProjectObject
	} else if permission.PermissionCheck(userPermissions, teamPermission) {
		targetType = configs.TeamObject
	} else if permission.PermissionCheck(userPermissions, companyPermission) {
		targetType = configs.CompanyObject
	} else {
		return c.Status(403).JSON(fiber.Map{
			"message": "You don't have permission to create channel in this target",
		})
	}

	channel := &models.Channel{
		ID:              uuid.New(),
		Name:            createChannelRequest.Name,
		Description:     createChannelRequest.Description,
		AffiliationType: targetType,
		AffiliationID:   uuid.MustParse(createChannelRequest.TargetID),
	}
	log := logger.Logger
	db := database.DB
	if err := db.Create(channel).Error; err != nil {
		log.Error(err.Error())
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	//TODO: Inject channel admin permission to user

	return c.Status(200).JSON(fiber.Map{
		"success": true,
	})

}
