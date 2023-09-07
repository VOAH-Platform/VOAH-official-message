package info

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"implude.kr/VOAH-Official-Message/configs"
)

func GetInfoCtrl(c *fiber.Ctx) error {
	serverConfig := configs.Env.Server
	return c.JSON(fiber.Map{
		"id":                configs.ModuleID,
		"version":           configs.ModuleVersion,
		"name":              configs.ModuleName,
		"description":       configs.ModuleDescription,
		"host-url":          serverConfig.HostURL,
		"host-internal-url": serverConfig.InternalHost,
		"deps":              configs.ModuleDeps,
		"permission-type":   configs.ModuleObjectTypes,
		"permission-scope":  configs.ModulePermissionScopes,
	})
}

func InfoInitCtrl(c *fiber.Ctx) error {
	receivedHash := c.Get("HASHED-API-KEY", "")
	if receivedHash == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "HASHED-API-KEY header is required",
		})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(receivedHash), []byte(configs.Env.Server.CoreAPIKey)); err != nil {
		fmt.Println(receivedHash)
		fmt.Println(configs.Env.Server.CoreAPIKey)
		return c.Status(403).JSON(fiber.Map{
			"message": "HASHED-API-KEY is not valid",
		})
	}
	return c.SendString(configs.Env.Server.CoreAPIKey)
}
