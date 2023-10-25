package wshandler

import (
	"time"

	"github.com/gofiber/contrib/websocket"
)

func WSTimeOut(c *websocket.Conn, alive *bool, lastRecieved *time.Time, timeOutSec int) {
	for *alive {
		time.Sleep(time.Second)
		if time.Since(*lastRecieved) > time.Duration(timeOutSec)*time.Second {
			*alive = false
			c.Close()
			return
		}
	}
}
