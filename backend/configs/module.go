package configs

const (
	ModuleID          = 1
	ModuleName        = "VOAH-Official-Message"
	ModuleVersion     = "0.0.1"
	ModuleDescription = "VOAH Official Message Module"
)

type ObjectType string

const (
	Team    ObjectType = "team"
	Project ObjectType = "project"
	Company ObjectType = "company"
	Channel ObjectType = "channel"
)

type PermissionScope string

const (
	ChatRead  PermissionScope = "chat:read"
	ChatWrite PermissionScope = "chat:write"
)

var (
	ModuleDeps             = []string{}
	ModuleObjectTypes      = []ObjectType{Team, Project, Company, Channel}
	ModulePermissionScopes = []PermissionScope{ChatRead, ChatWrite}
)
