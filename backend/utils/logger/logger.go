package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Logger *VOAHLogger

type VOAHLogger struct {
	logger *zap.Logger
}

func (l *VOAHLogger) Debug(msg string, fields ...zap.Field) {
	l.logger.Debug(msg, fields...)
}

func (l *VOAHLogger) Info(msg string, fields ...zap.Field) {
	l.logger.Info(msg, fields...)
}

func (l *VOAHLogger) Error(msg string, fields ...zap.Field) {
	l.logger.Error(msg, fields...)
}

func (l *VOAHLogger) Fatal(err error, fields ...zap.Field) {
	l.logger.Fatal(err.Error(), fields...)
}

func InitLogger() {
	config := zap.NewProductionConfig()
	config.Encoding = "json"
	config.EncoderConfig.MessageKey = "log"
	config.EncoderConfig.TimeKey = "time"
	config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	config.EncoderConfig.CallerKey = ""

	logger, _ := config.Build()

	Logger = &VOAHLogger{logger: logger}
	defer Logger.logger.Sync()

	Logger.Info("Initialized logger")
}
