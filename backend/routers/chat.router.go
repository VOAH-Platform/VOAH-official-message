package routers

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/controllers/chat"
	"implude.kr/VOAH-Official-Message/middleware"
	"implude.kr/VOAH-Official-Message/websockets"
)

func addChat(router *fiber.App) {
	chatGroup := router.Group("/api/chat") // chat router group

	chatGroup.Use(middleware.Authenticate)

	chatGroup.Get("/", func(c *fiber.Ctx) error {
		return chat.GetChatList(c)
	})

	chatGroup.Get("/:id", websockets.WebsocketHandler)
}
