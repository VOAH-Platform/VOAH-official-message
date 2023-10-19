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

func PermissionCheck(userPerms []Permission, requirePerms []Permission) bool {
	for _, requrequirePerm := range requirePerms {
		for _, userPerm := range userPerms {
			if userPerm.Type == configs.RootObject || userPerm.Type == configs.SystemObject {
				return true
			} else if requrequirePerm.Type == userPerm.Type && requrequirePerm.Target == userPerm.Target {
				if configs.AdminPermissionScope == userPerm.Scope {
					return true
				} else if requrequirePerm.Scope == userPerm.Scope {
					return true
				}
			}
		}
	}
	return false
}
