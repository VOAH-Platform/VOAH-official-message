package routers

import (
	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Official-Message/controllers/info"
)

func addInfo(router *fiber.App) {
	infoGroup := router.Group("/api/info") // auth router

	infoGroup.Get("/", func(c *fiber.Ctx) error {
		return info.GetInfoCtrl(c)
	})
	infoGroup.Get("/init", func(c *fiber.Ctx) error {
		return info.InfoInitCtrl(c)
	})

}
