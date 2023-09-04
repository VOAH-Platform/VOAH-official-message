package getinfo

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Template-Project/configs"
)

func GetInfoCtrl(c *fiber.Ctx) error {
	serverConfig := configs.Env.Server
	return c.JSON(fiber.Map{
		"host-url":    serverConfig.HostURL,
		"id":          configs.ModuleID,
		"version":     configs.ModuleVersion,
		"name":        configs.ModuleName,
		"description": configs.ModuleDescription,
		"deps":        configs.ModuleDeps,
		"permissions": []string{},
	})
}
