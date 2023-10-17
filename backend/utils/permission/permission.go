package permission

import (
	"github.com/google/uuid"
	"implude.kr/VOAH-Official-Message/configs"
)

type Permission struct {
	ID     uuid.UUID               `json:"permission-id"`
	Type   configs.ObjectType      `json:"type"`
	Target uuid.UUID               `json:"target"`
	Scope  configs.PermissionScope `json:"scope"`
	RoleID uuid.UUID               `json:"role-id"`
}
