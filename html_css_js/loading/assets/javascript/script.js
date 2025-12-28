document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.querySelector('.loading-container');
    const mainContent = document.querySelector('.main-content');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let progress = 0;
    const loadingTime = 5000; // 5 seconds
    const updateInterval = 50; // Update every 50ms
    const progressIncrement = (100 / (loadingTime / updateInterval));
    
    // Smooth progress animation
    const progressInterval = setInterval(() => {
        progress += progressIncrement;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, updateInterval);
    
    // Add fade out animation after loading
    setTimeout(() => {
        loadingContainer.classList.add('fade-out');
        
        // Show main content after fade out
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            mainContent.style.display = 'flex';
        }, 800);
    }, loadingTime);
    
    // Add click to restart loading
    mainContent.addEventListener('click', function() {
        location.reload();
    });
    
    // Add particle movement on mouse move
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            const moveX = (x - 0.5) * speed * 20;
            const moveY = (y - 0.5) * speed * 20;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});
