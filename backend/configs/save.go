package configs

import (
	"fmt"
	"os"

	"implude.kr/VOAH-Template-Project/utils/logger"
)

func SaveSetting(jsonSetting string) (err error) {
	log := logger.Logger
	err = os.WriteFile(fmt.Sprintf("%s/setting.json", Env.Server.DataDir), []byte(jsonSetting), 0700)
	if err != nil {
		log.Error(err.Error())
	}
	return
}
