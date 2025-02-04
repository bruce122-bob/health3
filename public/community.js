class CommunityManager {
    constructor() {
        this.comments = [];
        this.modal = document.getElementById('communityModal');
        this.commentsList = document.getElementById('commentsList');
        this.commentForm = document.getElementById('commentForm');
        this.searchInput = document.getElementById('commentSearch');
        
        // 添加新的元素引用
        this.previewComments = document.getElementById('previewComments');
        this.openCommunityBtn = document.getElementById('openCommunityBtn');
        
        // 从localStorage加载评论
        this.loadComments();
        this.init();
    }

    init() {
        // 关闭按钮事件
        document.querySelector('.close-community-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // 提交评论
        this.commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addComment();
        });

        // 搜索功能
        this.searchInput.addEventListener('input', () => {
            this.searchComments();
        });

        // 修改openCommunityBtn的点击事件
        this.openCommunityBtn.addEventListener('click', () => {
            window.location.href = 'community.html';
        });

        // 初始显示预览评论
        this.updatePreviewComments();
    }

    // 生成随机用户名
    generateUsername() {
        const adjectives = ['快乐的', '勇敢的', '智慧的', '温柔的', '坚强的'];
        const nouns = ['蝴蝶', '向日葵', '海豚', '星星', '微风'];
        const randomNum = Math.floor(Math.random() * 1000);
        return adjectives[Math.floor(Math.random() * adjectives.length)] + 
               nouns[Math.floor(Math.random() * nouns.length)] + 
               randomNum;
    }

    // 添加新评论
    addComment() {
        const content = document.getElementById('commentInput').value.trim();
        if (!content) return;

        const comment = {
            id: Date.now(),
            username: this.generateUsername(),
            content: content,
            timestamp: new Date().toISOString(),
            likes: 0
        };

        this.comments.unshift(comment);
        this.saveComments();
        this.displayComments();
        document.getElementById('commentInput').value = '';

        // 更新预览区域
        this.updatePreviewComments();
    }

    // 显示评论
    displayComments(commentsToShow = this.comments) {
        this.commentsList.innerHTML = '';
        
        commentsToShow.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-card';
            const date = new Date(comment.timestamp);
            
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span class="comment-username">${comment.username}</span>
                    <span class="comment-time">${date.toLocaleString()}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-footer">
                    <button class="like-button" data-id="${comment.id}">
                        👍 ${comment.likes}
                    </button>
                </div>
            `;

            // 添加点赞功能
            const likeButton = commentElement.querySelector('.like-button');
            likeButton.addEventListener('click', () => this.likeComment(comment.id));

            this.commentsList.appendChild(commentElement);
        });
    }

    // 搜索评论
    searchComments() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredComments = this.comments.filter(comment => 
            comment.content.toLowerCase().includes(searchTerm) ||
            comment.username.toLowerCase().includes(searchTerm)
        );
        this.displayComments(filteredComments);
    }

    // 点赞功能
    likeComment(id) {
        const comment = this.comments.find(c => c.id === id);
        if (comment) {
            comment.likes++;
            this.saveComments();
            this.displayComments();
        }
    }

    // 保存评论到localStorage
    saveComments() {
        localStorage.setItem('communityComments', JSON.stringify(this.comments));
    }

    // 从localStorage加载评论
    loadComments() {
        const saved = localStorage.getItem('communityComments');
        this.comments = saved ? JSON.parse(saved) : [];
    }

    openModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // 添加新方法：更新预览区域的评论
    updatePreviewComments() {
        if (!this.previewComments) return;
        
        this.previewComments.innerHTML = '';
        
        // 只显示最新的3条评论
        const recentComments = this.comments.slice(0, 3);
        
        recentComments.forEach(comment => {
            const previewElement = document.createElement('div');
            previewElement.className = 'preview-comment';
            const date = new Date(comment.timestamp);
            
            previewElement.innerHTML = `
                <div class="preview-comment-header">
                    <span>${comment.username}</span>
                    <span>${date.toLocaleString()}</span>
                </div>
                <div class="preview-comment-content">
                    ${comment.content.length > 50 ? comment.content.substring(0, 50) + '...' : comment.content}
                </div>
            `;
            
            this.previewComments.appendChild(previewElement);
        });

        if (this.comments.length === 0) {
            this.previewComments.innerHTML = '<div class="preview-comment">暂无评论</div>';
        }
    }
}

// 初始化社区管理器
document.addEventListener('DOMContentLoaded', () => {
    new CommunityManager();
}); 