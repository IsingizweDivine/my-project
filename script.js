
document.addEventListener('DOMContentLoaded', function() {
    
    const socialFeed = document.getElementById('socialFeed');
    if (socialFeed) {
        fetch('https://api.truthlinkrwanda.org/social-feed')
            .then(response => response.json())
            .then(data => {
                let feedHtml = '<div class="row">';
                data.posts.forEach(post => {
                    feedHtml += `
                        <div class="col-md-4 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <p class="card-text">${post.content}</p>
                                    <small class="text-muted">${post.date} - ${post.platform}</small>
                                </div>
                            </div>
                        </div>
                    `;
                });
                feedHtml += '</div>';
                socialFeed.innerHTML = feedHtml;
            })
            .catch(error => {
                console.error('Error fetching social feed:', error);
                socialFeed.innerHTML = '<p class="text-center">Follow us on social media for the latest updates!</p>';
            });
    }
    
    const apiRequestForm = document.getElementById('apiRequestForm');
    if (apiRequestForm) {
        apiRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Thank you for your interest! We will review your request and contact you soon.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('apiModal'));
            modal.hide();
            apiRequestForm.reset();
        });
    }

    
    if (document.getElementById('map')) {
        const kigaliLocation = { lat: -1.9441, lng: 30.0619 };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: kigaliLocation,
        });
        new google.maps.Marker({
            position: kigaliLocation,
            map: map,
            title: 'TruthLink Rwanda'
        });
    }
    
    if (window.location.pathname.includes('about.html')) {
        fetch('https://api.truthlinkrwanda.org/stats')
            .then(response => response.json())
            .then(data => {
                const stats = document.getElementById('apiStats');
                if (stats) {
                    stats.innerHTML = `
                        <div class="row text-center">
                            <div class="col-md-4">
                                <h3>${data.totalReports || 0}</h3>
                                <p>Reports Submitted</p>
                            </div>
                            <div class="col-md-4">
                                <h3>${data.resolvedCases || 0}</h3>
                                <p>Cases Resolved</p>
                            </div>
                            <div class="col-md-4">
                                <h3>${data.activeInvestigations || 0}</h3>
                                <p>Active Investigations</p>
                            </div>
                        </div>
                    `;
                }
            })
            .catch(error => console.error('Error fetching stats:', error));
    }

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon.');
            this.reset();
        });
    }
    
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
            alert(`Your report has been submitted. Your tracking code is: ${trackingCode}`);
            this.reset();
        });
    }

    
    const trackForm = document.getElementById('trackForm');
    if (trackForm) {
        trackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingResult = document.getElementById('trackingResult');
            const statusMessage = document.getElementById('statusMessage');
            trackingResult.style.display = 'block';
            statusMessage.textContent = 'Your report is currently under review. We will update you when there are any developments.';
        });
    }
});
