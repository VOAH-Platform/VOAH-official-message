package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/routers"
	"implude.kr/VOAH-Official-Message/utils/logger"
)

func main() {
	configs.LoadEnv()     // Load envs
	configs.LoadSetting() // Load settings
	logger.InitLogger()   // Intitialize logger
	database.ConnectDB()  // Connect to database
	database.InitRedis()  // Initialize redis

	serverConf := configs.Env.Server
	log := logger.Logger

	app := fiber.New()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: serverConf.CSRFOrigin,
		AllowHeaders: "*",
		AllowMethods: "*",
	}))

	routers.Initialize(app)

	// Static Files
	app.Get("/logo.svg", func(c *fiber.Ctx) error {
		return c.SendFile("./public/logo.svg")
	})
	app.Static("/assets", "./public/assets")
	app.Static("*", "./public/index.html")

	log.Fatal(app.Listen(fmt.Sprintf(":%d", serverConf.Port)))
}
