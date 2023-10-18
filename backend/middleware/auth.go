package middleware

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/go-resty/resty/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/configs"
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
	client := resty.New()
	resp, err := client.R().
		SetHeader("API-KEY", configs.Env.Server.CoreAPIKey).
		SetHeader("Authorization", "Bearer "+rawHeader).
		Get(configs.Env.Server.CoreInternalHost + "/api/check")

	if err != nil {
		fmt.Println(err)
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	} else if resp.StatusCode() == 401 {
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	} else if resp.StatusCode() == 403 {
		return c.Status(500).JSON(fiber.Map{
			"message": "API-KEY is not valid",
		})
	} else if resp.StatusCode() != 200 {
		fmt.Println(resp.StatusCode())
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	respObject := &CheckTokenResponse{}
	fmt.Println(string(resp.Body()))
	if err := json.Unmarshal(resp.Body(), respObject); err != nil {
		fmt.Println(err)
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	if errArr := validator.VOAHValidator.Validate(respObject); len(errArr) > 0 {
		for _, err := range errArr {
			fmt.Println(err)
		}
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	if !respObject.Success || respObject.UserID == "" {
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	c.Locals("user-id", uuid.MustParse(respObject.UserID)) // pass user id to next middleware
	return c.Next()
}
