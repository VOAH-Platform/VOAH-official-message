package models

import (
	"time"

	"github.com/google/uuid"
)

type Chat struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Content   string    `gorm:"type:text;not null;"`
	Priority  int       `gorm:"type:int;not null;default:1"`
	AuthorID  uuid.UUID `gorm:"type:uuid;not null;"`
	ChannelID uuid.UUID `gorm:"type:uuid;not null;"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created-at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated-at"`
}
