package configs

var Env *MainEnv

type serverEnv struct {
	HostURL          string
	InternalHost     string
	CoreInternalHost string
	Port             int
	CSRFOrigin       string
	DataDir          string
	CoreAPIKey       string
}

type databaseEnv struct {
	Host     string // Database host
	Port     int    // Database port
	User     string // Database user
	Password string // Database password
	DBName   string // Database name
}

type MainEnv struct {
	Database databaseEnv
	Server   serverEnv
}
