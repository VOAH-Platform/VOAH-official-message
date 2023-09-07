package models

import (
	"time"

	"github.com/google/uuid"
)

type Chat struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Content   string    `gorm:"type:text;not null;"`
	AuthorID  uuid.UUID `gorm:"type:uuid;not null;"`
	ChannelID uuid.UUID `gorm:"type:uuid;not null;"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created-at"`
}
