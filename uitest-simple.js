"ui";
auto();

// 简单的UI界面
ui.layout(
    <vertical padding="16dp" bg="#f5f5f5">
        <text text="钉钉ID分发系统" textSize="20sp" textColor="#333333" gravity="center" marginBottom="20dp"/>
        
        <card w="*" h="auto" cardCornerRadius="8dp" cardElevation="4dp" marginBottom="16dp">
            <vertical padding="16dp">
                <text text="操作功能" textSize="16sp" textColor="#333333" marginBottom="12dp"/>
                <button id="getIdsBtn" text="📥 获取10条ID" textSize="16sp" textColor="#ffffff" 
                        bg="#4CAF50" w="*" h="48dp" radius="8dp"/>
            </vertical>
        </card>
        
        <card w="*" h="auto" cardCornerRadius="8dp" cardElevation="4dp" marginBottom="16dp">
            <vertical padding="16dp">
                <text text="使用说明" textSize="14sp" textColor="#333333" marginBottom="8dp"/>
                <text text="1. 点击'获取10条ID'从云端获取ID列表&#10;2. 获取的ID会自动标记为已使用&#10;3. 每次获取会显示剩余可用ID数量&#10;4. 系统模拟1000条ID供分发" 
                      textSize="12sp" textColor="#666666" maxLines="4"/>
            </vertical>
        </card>
        
        <horizontal gravity="center" marginTop="20dp">
            <text id="startBtn" text="开始添加好友" textSize="16sp" textColor="#ffffff" 
                  bg="#9C27B0" w="120dp" h="48dp" radius="8dp" marginRight="8dp" 
                  gravity="center" clickable="true" focusable="true" 
                  padding="0dp"/>
            <text id="exitBtn" text="退出" textSize="16sp" textColor="#ffffff" 
                  bg="#f44336" w="120dp" h="48dp" radius="8dp" 
                  gravity="center" clickable="true" focusable="true" 
                  padding="0dp"/>
        </horizontal>
    </vertical>
);

// 全局变量
var friendIds = [];
var isRunning = false;

// API地址（部署后需要替换）
var API_BASE_URL = "https://your-project.vercel.app";

// 获取ID列表
function getIdsFromCloud() {
    try {
        console.log("开始获取ID列表...");
        
        var response = http.get(API_BASE_URL + "/api/getIds", {
            timeout: 10000
        });
        
        if (response.statusCode === 200) {
            var data = response.body.json();
            console.log("云端返回数据:", data);
            
            if (data.success && data.ids) {
                friendIds = data.ids;
                var message = "成功获取 " + friendIds.length + " 条ID\n\n";
                message += "ID列表:\n";
                friendIds.forEach(function(id, index) {
                    message += (index + 1) + ". " + id + "\n";
                });
                
                // 显示统计信息
                if (data.stats) {
                    message += "\n统计信息:\n";
                    message += "总ID数: " + data.stats.total + "\n";
                    message += "可用ID: " + data.stats.available + "\n";
                    message += "已使用: " + data.stats.used + "\n";
                }
                
                dialogs.alert("获取ID成功", message);
                return true;
            } else {
                toast("获取ID失败: " + (data.message || "未知错误"));
                return false;
            }
        } else {
            toast("获取ID失败，状态码: " + response.statusCode);
            return false;
        }
        
    } catch (error) {
        console.error("获取ID失败:", error);
        toast("获取ID失败: " + error.message);
        return false;
    }
}


// 按钮点击事件
ui.getIdsBtn.click(function() {
    threads.start(function() {
        getIdsFromCloud();
    });
});

ui.startBtn.click(function() {
    if (friendIds.length === 0) {
        toast("请先获取ID列表");
        return;
    }
    
    if (isRunning) {
        toast("脚本正在运行中...");
        return;
    }
    
    dialogs.confirm("确认开始", "即将添加 " + friendIds.length + " 个好友，是否继续？")
        .then(function(confirmed) {
            if (confirmed) {
                isRunning = true;
                toast("开始添加好友...");
                // 这里可以添加你的好友添加逻辑
                // 添加完成后设置 isRunning = false
            }
        });
});

ui.exitBtn.click(function() {
    ui.finish();
    exit();
});
