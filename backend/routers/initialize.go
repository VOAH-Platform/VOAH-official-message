package routers

import "github.com/gofiber/fiber/v2"

func Initialize(router *fiber.App) {
	addChat(router)
	addInfo(router)
	addChannel(router)
}
