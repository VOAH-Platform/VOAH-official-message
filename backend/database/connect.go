package database

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"implude.kr/VOAH-Official-Message/configs"
	"implude.kr/VOAH-Official-Message/models"
	"implude.kr/VOAH-Official-Message/utils/logger"
)

func ConnectDB() {
	var err error // define error here to prevent overshadowing the global DB
	dbConfig := configs.Env.Database
	log := logger.Logger

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=Asia/Seoul", dbConfig.Host, dbConfig.User, dbConfig.Password, dbConfig.DBName, dbConfig.Port)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Error("Failed to connect to database")
		log.Fatal(err)
	}
	err = DB.AutoMigrate(
		&models.Channel{},
		&models.Chat{},
	)
	if err != nil {
		log.Error("Failed to migrate database")
		log.Fatal(err)
	}
	log.Info("Connected to database")
}

func connectRedis(dbName int) (redisClient *redis.Client) {
	redisConfig := configs.Env.Redis
	log := logger.Logger
	ctx := context.Background()

	redisClient = redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", redisConfig.Host, redisConfig.Port),
		Password: redisConfig.Password,
		DB:       dbName,
	})
	status := redisClient.Ping(ctx)

	if status.Err() != nil {
		log.Error("Failed to connect to redis" + fmt.Sprintf(" (DB: %d)", dbName))
		log.Fatal(status.Err())
	}

	log.Info("Connected to redis" + fmt.Sprintf(" (DB: %d)", dbName))
	return redisClient
}

func InitRedis() {
	redisConfig := configs.Env.Redis
	Redis = RedisDB{
		OnWritingRedis: connectRedis(redisConfig.OnWritingDB),
	}
}
