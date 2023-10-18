package routers

import (
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/controllers/chat"
	"implude.kr/VOAH-Official-Message/middleware"
	"implude.kr/VOAH-Official-Message/wshandler"
)

func addChat(router *fiber.App) {
	chatGroup := router.Group("/api/chat") // chat router group

	chatGroup.Use(middleware.Authenticate)

	chatGroup.Get("/", func(c *fiber.Ctx) error {
		return chat.GetChatList(c)
	})
	chatGroup.Post("/send", func(c *fiber.Ctx) error {
		return chat.SendChat(c)
	})
	chatGroup.Post("/update", func(c *fiber.Ctx) error {
		return chat.UpdateChat(c)
	})
	chatGroup.Get("/delete", func(c *fiber.Ctx) error {
		return chat.DeleteChat(c)
	})

	chatGroup.Get("/ws/:channel", websocket.New(wshandler.ChatWebsocket()))
}
