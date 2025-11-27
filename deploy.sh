#!/bin/bash

# Script hỗ trợ deploy website
# Sử dụng: ./deploy.sh [vercel|netlify|build]

set -e

echo "🚀 HTKD Deploy Helper"
echo "===================="

# Màu sắc
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kiểm tra Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt. Vui lòng cài đặt Node.js trước."
    exit 1
fi

echo -e "${BLUE}✓ Node.js version: $(node -v)${NC}"

# Kiểm tra npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm chưa được cài đặt."
    exit 1
fi

echo -e "${BLUE}✓ npm version: $(npm -v)${NC}"

# Function: Build project
build_project() {
    echo -e "\n${YELLOW}📦 Đang build project...${NC}"
    npm run build
    echo -e "${GREEN}✓ Build thành công!${NC}"
}

# Function: Deploy to Vercel
deploy_vercel() {
    echo -e "\n${YELLOW}🚀 Deploy lên Vercel...${NC}"
    
    # Kiểm tra Vercel CLI
    if ! command -v vercel &> /dev/null; then
        echo "📥 Đang cài đặt Vercel CLI..."
        npm install -g vercel
    fi
    
    build_project
    vercel --prod
    echo -e "${GREEN}✓ Deploy thành công!${NC}"
}

# Function: Deploy to Netlify
deploy_netlify() {
    echo -e "\n${YELLOW}🚀 Deploy lên Netlify...${NC}"
    
    # Kiểm tra Netlify CLI
    if ! command -v netlify &> /dev/null; then
        echo "📥 Đang cài đặt Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    build_project
    netlify deploy --prod
    echo -e "${GREEN}✓ Deploy thành công!${NC}"
}

# Main
case "$1" in
    vercel)
        deploy_vercel
        ;;
    netlify)
        deploy_netlify
        ;;
    build)
        build_project
        echo -e "\n${BLUE}Để chạy production server:${NC}"
        echo "npm start"
        ;;
    *)
        echo "Cách sử dụng: ./deploy.sh [vercel|netlify|build]"
        echo ""
        echo "Options:"
        echo "  vercel  - Deploy lên Vercel"
        echo "  netlify - Deploy lên Netlify"
        echo "  build   - Chỉ build project"
        echo ""
        echo "Hoặc xem file DEPLOY.md để biết hướng dẫn chi tiết."
        exit 1
        ;;
esac

