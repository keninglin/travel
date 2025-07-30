// Contact Page JavaScript

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name').trim(),
                email: formData.get('email').trim(),
                subject: formData.get('subject'),
                message: formData.get('message').trim(),
                newsletter: formData.get('newsletter') === 'on',
                privacy: formData.get('privacy') === 'on'
            };
            
            // Validate form
            const validation = validateContactForm(data);
            
            if (validation.isValid) {
                submitContactForm(data);
            } else {
                showFormMessage(validation.errors.join('<br>'), 'error');
            }
        });
    }
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

// Form validation function
function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name) {
        errors.push('姓名為必填項目');
    } else if (data.name.length < 2) {
        errors.push('姓名至少需要2個字元');
    }
    
    // Email validation
    if (!data.email) {
        errors.push('電子郵件為必填項目');
    } else if (!isValidEmail(data.email)) {
        errors.push('請輸入有效的電子郵件格式');
    }
    
    // Message validation
    if (!data.message) {
        errors.push('訊息內容為必填項目');
    } else if (data.message.length < 10) {
        errors.push('訊息內容至少需要10個字元');
    } else if (data.message.length > 1000) {
        errors.push('訊息內容不能超過1000個字元');
    }
    
    // Privacy agreement validation
    if (!data.privacy) {
        errors.push('請同意隱私政策');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    removeFieldError(field);
    
    switch(field.name) {
        case 'name':
            if (!value) {
                errorMessage = '姓名為必填項目';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = '姓名至少需要2個字元';
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                errorMessage = '電子郵件為必填項目';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = '請輸入有效的電子郵件格式';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = '訊息內容為必填項目';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = '訊息內容至少需要10個字元';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = '訊息內容不能超過1000個字元';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field-specific error message
function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.3rem;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Remove field-specific error message
function removeFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit form
async function submitContactForm(data) {
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real application, you would send the data to your server
        console.log('Form data to submit:', data);
        
        // Show success message
        showFormMessage('感謝您的訊息！我們會在24小時內回覆您。', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // If newsletter subscription was checked, handle it
        if (data.newsletter) {
            subscribeToNewsletter(data.email);
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showFormMessage('發送失敗，請稍後再試或直接發送電子郵件給我們。', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.innerHTML = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Newsletter subscription (separate from contact form)
function subscribeToNewsletter(email) {
    console.log(`Newsletter subscription for: ${email}`);
    // This would typically be handled by your backend
}

// Handle newsletter form submissions
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('請輸入您的電子郵件地址');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('請輸入有效的電子郵件格式');
                return;
            }
            
            // Submit newsletter subscription
            subscribeToNewsletter(email);
            alert('感謝您訂閱我們的電子報！');
            emailInput.value = '';
        });
    });
});

// Character counter for message textarea
document.addEventListener('DOMContentLoaded', function() {
    const messageTextarea = document.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        const maxLength = 1000;
        
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 0.3rem;
        `;
        
        const updateCounter = () => {
            const currentLength = messageTextarea.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#ff6b6b';
            } else {
                counter.style.color = '#666';
            }
        };
        
        messageTextarea.parentNode.appendChild(counter);
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
});

// FAQ accordion functionality (if FAQ section exists)
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Auto-resize textarea
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
    });
    
    // Initialize FAQ if present
    initFAQAccordion();
});

// Export functions for global use
window.validateContactForm = validateContactForm;
window.submitContactForm = submitContactForm;
window.subscribeToNewsletter = subscribeToNewsletter;
