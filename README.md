# 钉钉ID分发系统 - 超简单版

## 功能说明

这是一个超简单的ID分发系统，专门用于钉钉好友添加。

### 核心功能
1. **获取ID** - 每次从云端获取10条ID（模拟1000条ID）
2. **自动统计** - 每次获取ID时显示剩余可用ID数量

### 数据规模
- **总ID数**: 1000条（user0001 - user1000）
- **每次分发**: 10条ID
- **自动标记**: 获取的ID自动标记为已使用
- **实时统计**: 显示剩余可用ID数量

### 文件结构
```
vercel-simple-simple/
├── api/
│   └── getIds.js      # 获取ID接口（包含统计信息）
├── package.json       # 项目配置
├── uitest-simple.js   # Auto.js脚本
├── test-api.js        # API测试脚本
└── README.md          # 说明文档
```

## 部署步骤

### 1. 创建GitHub仓库
1. 在GitHub创建新仓库：`dingtalk-id-distributor`
2. 上传所有文件到仓库

### 2. 部署到Vercel
1. 访问 [Vercel官网](https://vercel.com)
2. 用GitHub账号登录
3. 点击"New Project"
4. 选择你的仓库
5. 点击"Deploy"

### 3. 更新API地址
在 `uitest-simple.js` 中替换API地址：
```javascript
var API_BASE_URL = "https://your-project.vercel.app";
```

## 使用方法

### 1. 运行Auto.js脚本
1. 在Auto.js中运行 `uitest-simple.js`
2. 确保API地址正确

### 2. 获取ID
1. 点击"📥 获取10条ID"
2. 系统会从云端获取10条ID
3. 自动标记为已使用
4. 显示剩余可用ID数量

## API接口

### 获取ID
- **URL**: `/api/getIds`
- **方法**: GET
- **返回**: 10条ID列表 + 统计信息
- **示例响应**:
```json
{
  "success": true,
  "ids": ["user0001", "user0002", "user0003", "user0004", "user0005", "user0006", "user0007", "user0008", "user0009", "user0010"],
  "message": "成功分发 10 条ID",
  "stats": {
    "total": 1000,
    "available": 990,
    "used": 10
  }
}
```

## 特点

- ✅ **超简单** - 只有1个接口，逻辑清晰
- ✅ **无数据库** - 使用内存存储，部署简单
- ✅ **自动标记** - 获取的ID自动标记为已使用
- ✅ **自动统计** - 每次获取ID时显示剩余可用ID数量
- ✅ **大规模数据** - 模拟1000条ID，满足测试需求

## 注意事项

1. **内存存储** - 重启服务后ID状态会重置
2. **单次分发** - 每次最多分发10条ID
3. **自动标记** - 获取的ID会自动标记为已使用
4. **自动统计** - 每次获取ID时自动显示剩余数量

## 扩展功能

如果需要持久化存储，可以：
1. 连接数据库
2. 使用文件存储
3. 添加更多ID到数据库

这个版本专注于核心功能，简单易用！
