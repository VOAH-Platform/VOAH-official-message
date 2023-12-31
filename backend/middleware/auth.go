package middleware

import (
	"encoding/json"
	"errors"
	"strings"

	"github.com/go-resty/resty/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/utils/logger"
	"implude.kr/VOAH-Official-Message/utils/permission"
	"implude.kr/VOAH-Official-Message/utils/validator"
)

type CheckTokenResponse struct {
	Success bool                    `json:"success" validate:"required"`
	UserID  string                  `json:"user-id" validate:"required,uuid4"`
	Perms   []permission.Permission `json:"permission" validate:"required"`
}

func Authenticate(c *fiber.Ctx) error {
	rawHeader := c.Get("Authorization", "")
	if rawHeader == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "Authorization header is required",
		})
	}
	if !strings.HasPrefix(rawHeader, "Bearer ") {
		return c.Status(400).JSON(fiber.Map{
			"message": "Authorization header must start with Bearer",
		})
	}
	rawHeader = strings.Replace(rawHeader, "Bearer ", "", 1)

	var claim CheckTokenResponse
	code, err := CheckAccessToCore(rawHeader, &claim)
	if err != nil {
		return c.Status(code).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if !claim.Success || claim.UserID == "" {
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	c.Locals("user-id", uuid.MustParse(claim.UserID)) // pass user id to next middleware
	c.Locals("permissions", claim.Perms)              // pass permission to next middleware
	return c.Next()
}

func CheckAccessToCore(token string, claim *CheckTokenResponse) (int, error) {
	log := logger.Logger
	client := resty.New()
	resp, err := client.R().
		SetHeader("API-KEY", configs.Env.Server.CoreAPIKey).
		SetHeader("Authorization", "Bearer "+token).
		Get(configs.Env.Server.CoreInternalHost + "/api/server/user")

	if err != nil {
		log.Error(err.Error())
		return 500, errors.New("internal server error")
	} else if resp.StatusCode() == 401 {
		return 401, errors.New("Unauthorized")
	} else if resp.StatusCode() == 403 {
		return 500, errors.New("API Key is invalid")
	} else if resp.StatusCode() != 200 {
		return 500, errors.New("internal server error")
	}
	if err := json.Unmarshal(resp.Body(), claim); err != nil {
		log.Error(err.Error())
		return 500, errors.New("internal server error")
	}
	if errArr := validator.VOAHValidator.Validate(claim); len(errArr) > 0 {
		return 500, errors.New("internal server error")
	}
	return 0, nil
}
