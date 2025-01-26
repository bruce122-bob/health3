const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();

app.use(cors());

// 存储抓取的文章
let articles = [];

// 模拟数据
const mockArticles = [
    {
        id: 1,
        title: "独居女生必看的安全指南",
        platform: "xiaohongshu",
        author: "@安全生活指南",
        source: "https://www.xiaohongshu.com/example1",
        publishDate: new Date().toISOString(),
        content: `独居安全注意事项：
1. 安装智能门铃和摄像头
2. 不要在社交媒体暴露住址信息
3. 结识可靠的邻居
4. 准备防身器材
5. 保存紧急联系人`,
        images: [
            "https://via.placeholder.com/400x300?text=安全指南1",
            "https://via.placeholder.com/400x300?text=安全指南2"
        ]
    },
    {
        id: 2,
        title: "女生外出防身技巧合集",
        platform: "xiaohongshu",
        author: "@防身教练小K",
        source: "https://www.xiaohongshu.com/example2",
        publishDate: new Date().toISOString(),
        content: `实用防身技巧：
1. 保持警惕，避免使用耳机
2. 记住安全路线和紧急联系人
3. 随身携带防身用品
4. 学习基本的防身动作
5. 提高安全意识`,
        images: [
            "https://via.placeholder.com/400x300?text=防身技巧1",
            "https://via.placeholder.com/400x300?text=防身技巧2"
        ]
    }
];

// 修改API端点
app.get('/api/articles', (req, res) => {
    console.log('Received request for articles');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(mockArticles);
});

// 添加错误处理中间件
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 