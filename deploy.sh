#!/usr/bin/env sh
# 直接本地打包提交到vercel。而vercel自动部署需要最新版本的nodejs
# 运行 ./deploy.sh 前仅需要切换nvm node v14：

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:AlexZhong22c/viewz.git main:gh-pages
git push -f git@github.com:AlexZhong22c/viewz.git main:gh-pages

cd -
