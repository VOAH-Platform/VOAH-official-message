# official-module-boilerplate frontend

## CLI 사용법

- 패키지 매니저로 pnpm을 사용합니다.
- `pnpm install`로 의존성을 설치합니다.
- `pnpm dev`로 개발 서버를 실행합니다.

## 프로젝트 구조

- `public/` : 정적 파일들이 위치합니다.
- `src/assets` : 다양한 코드 외의 리소스들이 위치합니다.
- `src/pages` : 페이지 컴포넌트들이 위치합니다.
- `src/components` : 페이지 컴포넌트들이 사용하는 컴포넌트들이 위치합니다.

## Quick Installation
1. install psql
   ```bash
   sudo apt-get install -y postgresql-client
   ```
2. create Database "voah-message"
   ```yaml
   version: '3'
   
   services:
    voah-message:
      container_name: voah-message-dev
      image: implude/voah-message-dev
      restart: always
      environment:
        TZ: Asia/Seoul
      env_file:
        - .env
      expose:
        - 8080
      volumes:
        - ./backend/data:/data
   networks:
    default:
      name: voah
      external: true
   ```
   ```bash
   psql

   CREATE DATABASE voah-message;
   ```

