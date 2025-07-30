// Destinations Page JavaScript

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationItems = document.querySelectorAll('.destination-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            destinationItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animation on scroll for destination items
    const observeDestinations = new IntersectionObserver((entries) => {
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
    
    destinationItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observeDestinations.observe(item);
    });
});

// Destination card click functionality
function viewDestination(destinationName) {
    // This would typically navigate to a detailed destination page
    console.log(`Viewing destination: ${destinationName}`);
    // You could implement this to show a modal or navigate to another page
}

// Search functionality for destinations
function searchDestinations(query) {
    const destinationItems = document.querySelectorAll('.destination-item');
    const searchTerm = query.toLowerCase();
    
    destinationItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const isMatch = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.some(tag => tag.includes(searchTerm));
        
        if (isMatch) {
            item.style.display = 'block';
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Map interaction (placeholder for future implementation)
function initializeDestinationMap() {
    // This would initialize an interactive map
    // You could integrate with Google Maps, Leaflet, or another mapping service
    console.log('Initializing destination map...');
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.destination-stats span');
    
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const finalNumber = parseInt(entry.target.textContent);
                    let currentNumber = 0;
                    const increment = Math.ceil(finalNumber / 20);
                    
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            currentNumber = finalNumber;
                            clearInterval(timer);
                        }
                        entry.target.textContent = currentNumber;
                    }, 50);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
    initializeDestinationMap();
});

// Export functions for global use
window.searchDestinations = searchDestinations;
window.viewDestination = viewDestination;
