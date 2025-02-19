// 资料区点击展开/收起功能
document.querySelector('.resource-section h2').addEventListener('click', function() {
    const content = document.getElementById('resourceContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    
    if (content.style.display === 'block') {
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.opacity = '1';
        }, 10);
    }
});

// 图片轮播功能
class Slideshow {
    constructor(container) {
        this.container = container;
        this.images = [];
        this.currentIndex = 0;
        this.interval = 3000; // 3秒切换一次
        this.isTransitioning = false;
    }

    addImage(src, title) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'slide';
        
        const img = document.createElement('img');
        img.src = src;
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'slide-title';
        titleDiv.textContent = title;
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(titleDiv);
        
        this.images.push(imgContainer);
        this.container.appendChild(imgContainer);
    }

    start() {
        if (this.images.length === 0) return;
        
        this.showImage(0);
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.showImage(this.currentIndex);
        }, this.interval);
    }

    showImage(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.images.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
}

// 初始化轮播
const slideshow = new Slideshow(document.getElementById('slideshowContainer'));
slideshow.start();

// 防身技巧展示功能
document.addEventListener('DOMContentLoaded', function() {
    const defenseBtn = document.querySelector('.defense-btn');
    const defenseModal = document.getElementById('defenseModal');
    const closeDefense = document.querySelector('.close-defense');
    const scrollToTop = document.getElementById('scrollToTop');
    const modalContent = document.querySelector('.defense-modal-content');
    
    defenseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        defenseModal.style.display = 'block';
    });

    // 关闭按钮事件
    closeDefense.addEventListener('click', function() {
        defenseModal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === defenseModal) {
            defenseModal.style.display = 'none';
        }
    });
    
    // 控制返回顶部按钮的显示和隐藏
    modalContent.addEventListener('scroll', function() {
        if (modalContent.scrollTop > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    // 返回顶部按钮点击事件
    scrollToTop.addEventListener('click', function() {
        modalContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加页面加载动画
    const animateElements = document.querySelectorAll('.sidebar, .plan-item, .resource-content');
    
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
});

function openFullscreenMap() {
    const mapWindow = window.open('fullscreen-map.html', '_blank', 'width=800,height=600');
    if (mapWindow) {
        mapWindow.focus();
    }
} 