package wshandler

import (
	"context"
	"fmt"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/google/uuid"
	"gorm.io/gorm/clause"
	"implude.kr/VOAH-Official-Message/database"
	"implude.kr/VOAH-Official-Message/middleware"
	"implude.kr/VOAH-Official-Message/models"
)

type Message struct {
	Message string `json:"message" validate:"required"`
}
type CheckAccessRequest struct {
	AccessToken string `json:"access-token" validate:"required"`
}
type NewMessageResponse struct {
	Count       int      `json:"count"`
	WritingUser []string `json:"writing-user"`
}
type StatusCheckRequest struct {
	Writing bool `json:"writing"`
}

func ChatWebsocket() func(*websocket.Conn) {
	return func(c *websocket.Conn) {
		var alive bool = true
		var lastRecieved time.Time = time.Now()

		c.SetCloseHandler(func(code int, text string) error {
			alive = false
			return nil
		})

		channelId, err := uuid.Parse(c.Params("channel", ""))
		if err == nil {
			go func() {
				// check user access-token
				if err = c.WriteJSON(&Message{Message: "Send Access Token in 15Sec"}); err != nil {
					alive = false
					c.Close()
					return
				}
				var checkAccess CheckAccessRequest
				if err = c.ReadJSON(&checkAccess); err != nil {
					fmt.Println(err)
					alive = false
					c.Close()
					return
				}

				var checkAccessResponse middleware.CheckTokenResponse
				_, err = middleware.CheckAccessToCore(checkAccess.AccessToken, &checkAccessResponse)
				if err != nil {
					if err = c.WriteJSON(&Message{Message: err.Error()}); err != nil {
						alive = false
						c.Close()
						return
					}
					alive = false
					c.Close()
					return
				}
				lastRecieved = time.Now()

				go func() {
					var count int
					var lastUpdated time.Time = time.Now()
					var chats []models.Chat

					db := database.DB
					rdb := database.Redis.OnWritingRedis
					for alive {
						count = 0
						time.Sleep(3 * time.Second)
						ctx := context.Background()
						onWritingUser := []string{}
						rdb.SMembers(ctx, channelId.String()).ScanSlice(&onWritingUser)
						// fmt.Println(lastUpdated.UTC().Format("2006-01-02 15:04:05"))
						err = db.Where(&models.Chat{ChannelID: channelId}).
							Order(clause.OrderByColumn{Column: clause.Column{Name: "updated_at"}, Desc: true}).
							Limit(20).
							Find(&chats).Error
						if err != nil {
							fmt.Println(err)
							alive = false
							c.Close()
							return
						}
						fmt.Println(chats)
						for _, chat := range chats {
							fmt.Println(chat.UpdatedAt)
							fmt.Println(lastUpdated)
							if chat.UpdatedAt.After(lastUpdated) {
								count++
							}
						}
						// db.Model(&models.Chat{}).Where("updated_at >= ? AND channel_id = ?", lastUpdated.UTC().Format("2006-01-02 15:04:05"), channelId.String()).Count(&count)
						lastUpdated = time.Now()
						if err = c.WriteJSON(NewMessageResponse{Count: count, WritingUser: onWritingUser}); err != nil {
							alive = false
							c.Close()
							return
						}
					}
				}()
				var writing bool = false
				c.SetCloseHandler(func(code int, text string) error {

					if writing {
						ctx := context.Background()
						rdb := database.Redis.OnWritingRedis
						rdb.SRem(ctx, channelId.String(), checkAccessResponse.UserID).Err()
					}
					return nil
				})

				// check client is writing
				go func() {
					var statusCheck StatusCheckRequest
					rdb := database.Redis.OnWritingRedis
					for alive {
						if err = c.ReadJSON(&statusCheck); err != nil {
							alive = false
							c.Close()
							return
						}
						if writing != statusCheck.Writing {
							writing = statusCheck.Writing
							ctx := context.Background()
							if writing {
								err = rdb.SAdd(ctx, channelId.String(), checkAccessResponse.UserID).Err()
							} else {
								err = rdb.SRem(ctx, channelId.String(), checkAccessResponse.UserID).Err()
							}
						}
						lastRecieved = time.Now()
					}
				}()
			}()
			WSTimeOut(c, &alive, &lastRecieved, 15)
		}
	}
}
