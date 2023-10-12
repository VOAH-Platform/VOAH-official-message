package websockets

import (
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func websocketHandler(c *fiber.Ctx) error {
	return websocket.New(func(conn *websocket.Conn) {
		var (
			msg string
			err error
		)
		for {
			if err = conn.ReadJSON(&msg); err != nil {
				return
			}

			if err = conn.WriteJSON(msg); err != nil {
				return
			}
		}
	})(c)
}

// to do
// https://github.com/unownone/go-chat
