package models

import (
	"time"

	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/configs"
)

type Channel struct {
	ID              uuid.UUID          `gorm:"type:uuid;primary_key;" json:"id"`
	Name            string             `gorm:"not null;size:40" json:"name"`
	Description     string             `gorm:"not null;size:200" json:"description"`
	AffiliationType configs.ObjectType `gorm:"not null;size:20" json:"affiliation-type"`
	AffiliationID   uuid.UUID          `gorm:"type:uuid;not null" json:"affiliation-id"`
	Chats           []Chat             `gorm:"foreignKey:ChannelID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	CreatedAt       time.Time          `gorm:"autoCreateTime" json:"created-at"`
}

type PersonalChannel struct {
	ID         uuid.UUID      `gorm:"type:uuid;primary_key;" json:"id"`
	FirstUser  uuid.UUID      `gorm:"type:uuid;not null" json:"first-user"`
	SecondUser uuid.UUID      `gorm:"type:uuid;not null" json:"second-user"`
	Chats      []PersonalChat `gorm:"foreignKey:ChannelID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	CreatedAt  time.Time      `gorm:"autoCreateTime" json:"created-at"`
}
