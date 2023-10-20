package routers

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/controllers/channel"
	"implude.kr/VOAH-Official-Message/middleware"
)

func addChannel(router *fiber.App) {
	channelGroup := router.Group("/api/channel") // channel router group

	channelGroup.Use(middleware.Authenticate)

	channelGroup.Get("/", func(c *fiber.Ctx) error {
		return channel.GetChannelList(c)
	})

	channelGroup.Post("/create", func(c *fiber.Ctx) error {
		return channel.CreateChannel(c)
	})
}
