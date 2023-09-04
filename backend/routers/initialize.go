package routers

import "github.com/gofiber/fiber/v2"

func Initialize(router *fiber.App) {
	addInfo(router)
}
