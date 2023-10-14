package routers

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/controllers/info"
	"implude.kr/VOAH-Official-Message/middleware"
	"implude.kr/VOAH-Official-Message/websockets"
)

func addWebsocket(router *fiber.App) {
	wsGroup := router.Group("/api/ws") // websocket router group

	wsGroup.Use(middleware.Authenticate)

	wsGroup.Get("/", func(c *fiber.Ctx) error {
		return info.GetInfoCtrl(c)
	})

	wsGroup.Get("/:id", websockets.WebsocketHandler)
}
