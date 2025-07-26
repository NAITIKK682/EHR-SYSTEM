// Reviews Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Star rating functionality
    const stars = document.querySelectorAll('.stars i');
    const ratingValue = document.getElementById('rating-value');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingValue.value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = this.getAttribute('data-rating');
            
            stars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = ratingValue.value;
            
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewer-name').value;
            const email = document.getElementById('reviewer-email').value;
            const rating = document.getElementById('rating-value').value;
            const reviewText = document.getElementById('review-text').value;
            
            if (!name || !reviewText || rating === '0') {
                alert('Please fill in all required fields and provide a rating.');
                return;
            }
            
            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            alert('Thank you for your review! It will be displayed after moderation.');
            
            // Reset the form
            reviewForm.reset();
            ratingValue.value = '0';
            stars.forEach(star => {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            });
        });
    }
    
    // Animate review cards when they come into view
    const reviewCards = document.querySelectorAll('.review-card');
    
    const animateOnScroll = () => {
        reviewCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.classList.add('animated');
            }
        });
    };
    
    // Initialize animation state
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});