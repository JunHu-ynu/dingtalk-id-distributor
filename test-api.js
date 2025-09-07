// 测试API功能
// 在Node.js环境中运行: node test-api.js

const http = require('http');

// 测试配置
const API_BASE_URL = "http://localhost:3000"; // 本地测试
// const API_BASE_URL = "https://your-project.vercel.app"; // 生产环境

// 发送HTTP请求的辅助函数
function makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: API_BASE_URL.replace('http://', '').replace('https://', ''),
            port: API_BASE_URL.includes('https') ? 443 : 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(body);
                    resolve({
                        statusCode: res.statusCode,
                        data: jsonData
                    });
                } catch (e) {
                    resolve({
                        statusCode: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// 测试函数
async function testAPI() {
    console.log('🚀 开始测试ID分发API...\n');

    try {
        // 1. 测试获取ID（第一次）
        console.log('1️⃣ 测试获取ID（第一次）...');
        const firstGetResponse = await makeRequest('/api/getIds');
        console.log('状态码:', firstGetResponse.statusCode);
        console.log('响应数据:', JSON.stringify(firstGetResponse.data, null, 2));
        console.log('');

        // 2. 测试获取ID（第二次）
        console.log('2️⃣ 测试获取ID（第二次）...');
        const secondGetResponse = await makeRequest('/api/getIds');
        console.log('状态码:', secondGetResponse.statusCode);
        console.log('响应数据:', JSON.stringify(secondGetResponse.data, null, 2));
        console.log('');

        // 3. 测试获取ID（第三次）
        console.log('3️⃣ 测试获取ID（第三次）...');
        const thirdGetResponse = await makeRequest('/api/getIds');
        console.log('状态码:', thirdGetResponse.statusCode);
        console.log('响应数据:', JSON.stringify(thirdGetResponse.data, null, 2));
        console.log('');

        // 4. 测试获取ID（第四次）
        console.log('4️⃣ 测试获取ID（第四次）...');
        const fourthGetResponse = await makeRequest('/api/getIds');
        console.log('状态码:', fourthGetResponse.statusCode);
        console.log('响应数据:', JSON.stringify(fourthGetResponse.data, null, 2));
        console.log('');

        console.log('✅ 所有测试完成！');

    } catch (error) {
        console.error('❌ 测试失败:', error.message);
    }
}

// 运行测试
testAPI();
