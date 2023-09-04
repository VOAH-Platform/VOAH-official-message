package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"implude.kr/VOAH-Template-Project/configs"
	"implude.kr/VOAH-Template-Project/routers"
	"implude.kr/VOAH-Template-Project/utils/directory"
	"implude.kr/VOAH-Template-Project/utils/logger"
)

func main() {
	configs.LoadEnv()     // Load envs
	configs.LoadSetting() // Load settings
	logger.InitLogger()   // Intitialize logger
	directory.IniteDirectory()

	serverConf := configs.Env.Server
	log := logger.Logger

	app := fiber.New()

	// CORS
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", serverConf.CSRFOrigin)
		c.Set("Access-Control-Allow-Methods", "*")
		c.Set("Access-Control-Allow-Headers", "*")
		return c.Next()
	})

	routers.Initialize(app)

	// Static Files
	app.Get("/logo.svg", func(c *fiber.Ctx) error {
		return c.SendFile("./public/logo.svg")
	})
	app.Static("/assets", "./public/assets")
	app.Static("*", "./public/index.html")

	log.Fatal(app.Listen(fmt.Sprintf(":%d", serverConf.Port)))
}
