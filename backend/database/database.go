package database

import (
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

var DB *gorm.DB

type RedisDB struct {
	OnWritingRedis *redis.Client
}

var Redis RedisDB
