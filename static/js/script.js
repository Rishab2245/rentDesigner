// Global variables
let designers = [];
let isShortlistedFilterActive = false;

// DOM elements
const listingsContainer = document.getElementById('listings-container');
const shortlistedTab = document.getElementById('shortlisted-tab');
const shortlistedIcon = document.getElementById('shortlisted-icon');
const designerTemplate = document.getElementById('designer-template');

// Fetch designers data
async function fetchDesigners() {
    try {
        // Fetch from API
        const response = await fetch('/api/designers');
        designers = await response.json();
        renderDesigners();
    } catch (error) {
        console.error('Error fetching designers data:', error);
        designers = [];
    }
}

// Render designers based on current filter
function renderDesigners() {
    // Clear current listings
    listingsContainer.innerHTML = '';
    
    // Filter designers if shortlisted filter is active
    const designersToRender = isShortlistedFilterActive 
        ? designers.filter(designer => designer.shortlisted) 
        : designers;
    
    // Render each designer
    designersToRender.forEach(designer => {
        const designerCard = createDesignerCard(designer);
        listingsContainer.appendChild(designerCard);
    });
}

// Create designer card from template
function createDesignerCard(designer) {
    // Clone the template
    const designerCard = designerTemplate.content.cloneNode(true);
    
    // Set designer name
    designerCard.querySelector('.designer-name').textContent = designer.name;
    
    // Set rating stars
    const ratingContainer = designerCard.querySelector('.rating');
    const fullStars = Math.floor(designer.rating);
    const hasHalfStar = designer.rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '★';
        ratingContainer.appendChild(star);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        const halfStar = document.createElement('span');
        halfStar.className = 'star';
        halfStar.innerHTML = '★';
        halfStar.style.opacity = '0.5';
        ratingContainer.appendChild(halfStar);
    }
    
    // Add empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(designer.rating);
    for (let i = 0; i < emptyStars; i++) {
        const emptyStar = document.createElement('span');
        emptyStar.className = 'star';
        emptyStar.innerHTML = '☆';
        emptyStar.style.opacity = '0.5';
        ratingContainer.appendChild(emptyStar);
    }
    
    // Set description
    designerCard.querySelector('.designer-description').textContent = designer.description;
    
    // Set stats
    designerCard.querySelector('.projects-count').textContent = designer.projects;
    designerCard.querySelector('.years-count').textContent = designer.years;
    designerCard.querySelector('.price-level').textContent = designer.price_level;
    
    // Set contact info
    designerCard.querySelector('.phone-1').textContent = designer.contact[0];
    designerCard.querySelector('.phone-2').textContent = designer.contact[1];
    
    // Set shortlist button state
    const shortlistButton = designerCard.querySelector('.shortlist-button');
    const shortlistIcon = shortlistButton.querySelector('.shortlist-icon');
    
    if (designer.shortlisted) {
        shortlistButton.classList.add('active');
        shortlistIcon.src = '../static/icons/shortlist-click.png';
    } else {
        shortlistIcon.src = '../static/icons/shortlist-unclick.png';
    }
    
    // Add event listener to shortlist button
    shortlistButton.addEventListener('click', () => {
        toggleShortlist(designer.id);
    });
    
    return designerCard.firstElementChild;
}

// Toggle shortlist status for a designer
async function toggleShortlist(designerId) {
    // Find the designer
    const designerIndex = designers.findIndex(d => d.id === designerId);
    if (designerIndex === -1) return;
    
    // Toggle shortlisted status
    const newShortlistedStatus = !designers[designerIndex].shortlisted;
    
    try {
        // Update in database via API
        const response = await fetch(`/api/designers/${designerId}/shortlist`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortlisted: newShortlistedStatus }),
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update local state
            designers[designerIndex].shortlisted = newShortlistedStatus;
            // Update UI
            renderDesigners();
        }
    } catch (error) {
        console.error('Error updating shortlist status:', error);
    }
}

// Toggle shortlisted filter
function toggleShortlistedFilter() {
    isShortlistedFilterActive = !isShortlistedFilterActive;
    
    // Update UI
    if (isShortlistedFilterActive) {
        shortlistedTab.classList.add('active-filter');
        shortlistedIcon.src = '../static/icons/shortlisted-click.png';
    } else {
        shortlistedTab.classList.remove('active-filter');
        shortlistedIcon.src = '../static/icons/shortlisted-unclick.png';
    }
    
    renderDesigners();
}

// Initialize the app
function init() {
    // Fetch designers data
    fetchDesigners();
    
    // Add event listener to shortlisted tab
    shortlistedTab.addEventListener('click', toggleShortlistedFilter);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
