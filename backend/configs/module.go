package configs

const (
	ModuleID          = 1
	ModuleName        = "VOAH-Official-Message"
	ModuleVersion     = "0.0.1"
	ModuleDescription = "VOAH Official Message Module"
)

type ObjectType string

const (
	SystemObject  ObjectType = "system"
	RootObject    ObjectType = "root"
	ProjectObject ObjectType = "project"
	TeamObject    ObjectType = "team"
	CompanyObject ObjectType = "company"
	ChannelObject ObjectType = "channel"
)

type PermissionScope string

const (
	AdminPermissionScope PermissionScope = "admin"
	EditPermissionScope  PermissionScope = "edit"
	ReadPermissionScope  PermissionScope = "read"
	WritePermissionScope PermissionScope = "write"
)

var (
	ModuleDeps             = []string{}
	ModuleObjectTypes      = []ObjectType{SystemObject, RootObject, ProjectObject, TeamObject, CompanyObject, ChannelObject}
	ModulePermissionScopes = []PermissionScope{AdminPermissionScope, EditPermissionScope, ReadPermissionScope, WritePermissionScope}
)
