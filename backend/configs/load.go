package configs

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

func getEnvStr(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func getEnvInt(key string, defaultValue int) int {
	value := getEnvStr(key, "")
	intValue, err := strconv.Atoi(value)
	if err != nil {
		return defaultValue
	}
	return intValue
}

func LoadEnv() {
	Env = &MainEnv{
		Database: databaseEnv{
			Host:     getEnvStr("DB_HOST", "localhost"),
			Port:     getEnvInt("DB_PORT", 5432),
			User:     getEnvStr("DB_USER", "postgres"),
			Password: getEnvStr("DB_PASSWORD", "postgres"),
			DBName:   getEnvStr("DB_NAME", "voah-message-db"),
		},
		Server: serverEnv{
			HostURL:          getEnvStr("SERVER_HOST_URL", "http://localhost:3001"),
			InternalHost:     getEnvStr("SERVER_INTERNAL_HOST", "http://localhost:3001"),
			CoreInternalHost: getEnvStr("SERVER_CORE_INTERNAL_HOST", "http://localhost:3000"),
			Port:             getEnvInt("SERVER_PORT", 3001),
			CSRFOrigin:       getEnvStr("SERVER_CSRF_ORIGIN", "*"),
			DataDir:          getEnvStr("SERVER_DATA_DIR", "./data"),
			CoreAPIKey:       getEnvStr("SERVER_CORE_API_KEY", "some-api-key"),
		},
	}
}

func LoadSetting() {
	jsonFile, err := os.ReadFile(fmt.Sprintf("%s/setting.json", Env.Server.DataDir))
	if err != nil {
		panic(err)
	}
	if err = json.Unmarshal(jsonFile, &Setting); err != nil {
		panic(err)
	}
}
