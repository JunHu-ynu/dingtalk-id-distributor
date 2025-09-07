// 简单的ID分发接口
// 模拟1000条ID，每次返回10条，自动标记为已处理

// 模拟ID数据库（1000条ID）
let idDatabase = [];
let totalIds = 1000;

// 初始化1000条ID
function initializeIds() {
    if (idDatabase.length === 0) {
        for (let i = 1; i <= totalIds; i++) {
            idDatabase.push({
                id: "user" + String(i).padStart(4, '0'),
                used: false
            });
        }
        console.log("已初始化 " + totalIds + " 条ID");
    }
}

export default function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许GET请求
    if (req.method !== 'GET') {
        res.status(405).json({ error: '只支持GET请求' });
        return;
    }

    try {
        // 初始化ID数据库
        initializeIds();
        
        // 获取未使用的ID
        const availableIds = idDatabase.filter(item => !item.used);
        
        if (availableIds.length === 0) {
            res.status(200).json({
                success: true,
                ids: [],
                message: "没有可用的ID了",
                stats: {
                    total: totalIds,
                    available: 0,
                    used: totalIds
                }
            });
            return;
        }

        // 每次分发10条ID
        const batchSize = 10;
        const selectedIds = availableIds.slice(0, batchSize);
        
        // 标记为已使用
        selectedIds.forEach(selected => {
            const item = idDatabase.find(item => item.id === selected.id);
            if (item) {
                item.used = true;
            }
        });

        // 计算剩余可用ID数量
        const remainingAvailable = idDatabase.filter(item => !item.used).length;
        const usedCount = totalIds - remainingAvailable;

        // 返回结果
        res.status(200).json({
            success: true,
            ids: selectedIds.map(item => item.id),
            message: `成功分发 ${selectedIds.length} 条ID`,
            stats: {
                total: totalIds,
                available: remainingAvailable,
                used: usedCount
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
