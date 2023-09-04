FROM golang:1.21-alpine AS backend-builder

WORKDIR /build
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
COPY ./backend/ .
RUN go build -o main .

FROM node:18-alpine AS frontend-builder

WORKDIR /build
COPY ./frontend/ ./
RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM scratch

COPY --from=backend-builder /build/main .
COPY --from=frontend-builder /build/dist/ ./public
ENTRYPOINT ["/main"]
