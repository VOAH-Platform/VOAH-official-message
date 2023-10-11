package routers

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/controllers/info"
	"implude.kr/VOAH-Official-Message/middleware"
)

func addChat(router *fiber.App) {
	chatGroup := router.Group("/api/chat") // chat router group

	chatGroup.Use(middleware.Authenticate)

	chatGroup.Get("/", func(c *fiber.Ctx) error {
		return info.GetInfoCtrl(c)
	})
}