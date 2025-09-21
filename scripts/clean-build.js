#!/usr/bin/env node

/**
 * 清理构建文件脚本 - 为 Cloudflare Pages 优化
 * 移除超大文件以符合 25MB 限制
 */

const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');
const cacheDir = path.join(nextDir, 'cache');

function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ 已删除: ${dirPath}`);
  }
}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✓ 已删除: ${filePath}`);
  }
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function checkFileSize(filePath) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    console.log(`文件大小: ${filePath} = ${formatBytes(stats.size)}`);

    // 如果文件超过 20MB，删除它
    if (sizeMB > 20) {
      console.log(`⚠️  文件过大，删除: ${filePath}`);
      deleteFile(filePath);
      return true;
    }
  }
  return false;
}

function cleanBuildFiles() {
  console.log('🧹 开始清理构建文件...');

  // 删除整个缓存目录
  deleteDirectory(cacheDir);

  // 删除可能的大文件
  const potentialLargeFiles = [
    path.join(nextDir, 'trace'),
    path.join(nextDir, 'cache'),
    path.join(nextDir, 'standalone'),
    path.join(nextDir, 'server', 'chunks'),
  ];

  potentialLargeFiles.forEach(deleteDirectory);

  // 检查剩余文件大小
  function scanDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        scanDirectory(itemPath);
      } else {
        checkFileSize(itemPath);
      }
    });
  }

  // 扫描 .next 目录中的所有文件
  scanDirectory(nextDir);

  console.log('✅ 构建文件清理完成');
}

// 运行清理
cleanBuildFiles();