// Blog Page JavaScript

// Search functionality
function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
        const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const isMatch = title.includes(query) || 
                       excerpt.includes(query) || 
                       tags.some(tag => tag.includes(query));
        
        if (isMatch || query === '') {
            article.style.display = 'block';
            article.style.opacity = '1';
        } else {
            article.style.opacity = '0';
            setTimeout(() => {
                article.style.display = 'none';
            }, 300);
        }
    });
}

// Tag filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const articles = document.querySelectorAll('.article-card');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-tag');
            
            articles.forEach(article => {
                if (filterValue === 'all') {
                    article.style.display = 'block';
                    article.style.opacity = '1';
                } else {
                    const articleTags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent);
                    const hasTag = articleTags.some(tag => tag.includes(filterValue));
                    
                    if (hasTag) {
                        article.style.display = 'block';
                        article.style.opacity = '1';
                    } else {
                        article.style.opacity = '0';
                        setTimeout(() => {
                            article.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Search input event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchArticles);
    }
    
    // Animation on scroll for articles
    const observeArticles = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observeArticles.observe(article);
    });
});

// Pagination functionality
function goToPage(pageNumber) {
    // This would typically load articles for the specified page
    console.log(`Loading page ${pageNumber}`);
    
    // Update active page button
    const pageButtons = document.querySelectorAll('.page-num');
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === pageNumber) {
            btn.classList.add('active');
        }
    });
    
    // Enable/disable prev/next buttons
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    
    if (pageNumber === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    // Assuming 8 is the total number of pages
    if (pageNumber === 8) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    
    // Scroll to top of articles
    document.querySelector('.articles-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Newsletter subscription
function subscribeNewsletter(email) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('請輸入有效的電子郵件地址');
        return false;
    }
    
    // This would typically send the subscription to a server
    console.log(`Subscribing email: ${email}`);
    alert('感謝您的訂閱！我們會定期寄送最新的旅行資訊給您。');
    return true;
}

// Handle newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (subscribeNewsletter(email)) {
                emailInput.value = '';
            }
        });
    });
});

// Article reading progress (for individual article pages)
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #2c5aa0;
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Social sharing
function shareArticle(platform, url, title) {
    const encodedUrl = encodeURIComponent(url || window.location.href);
    const encodedTitle = encodeURIComponent(title || document.title);
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        case 'line':
            shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Like/favorite functionality
function toggleLike(articleId) {
    const likeBtn = document.querySelector(`[data-article-id="${articleId}"] .like-btn`);
    const likeCount = document.querySelector(`[data-article-id="${articleId}"] .like-count`);
    
    if (likeBtn && likeCount) {
        const isLiked = likeBtn.classList.contains('liked');
        let count = parseInt(likeCount.textContent);
        
        if (isLiked) {
            likeBtn.classList.remove('liked');
            count--;
        } else {
            likeBtn.classList.add('liked');
            count++;
        }
        
        likeCount.textContent = count;
        
        // Store in localStorage
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        if (isLiked) {
            const index = likedArticles.indexOf(articleId);
            if (index > -1) likedArticles.splice(index, 1);
        } else {
            likedArticles.push(articleId);
        }
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
    }
}

// Load liked articles from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    
    likedArticles.forEach(articleId => {
        const likeBtn = document.querySelector(`[data-article-id="${articleId}"] .like-btn`);
        if (likeBtn) {
            likeBtn.classList.add('liked');
        }
    });
});

// Export functions for global use
window.searchArticles = searchArticles;
window.goToPage = goToPage;
window.shareArticle = shareArticle;
window.toggleLike = toggleLike;
window.subscribeNewsletter = subscribeNewsletter;

// Initialize reading progress if on article page
if (document.querySelector('.article-content')) {
    initReadingProgress();
}
