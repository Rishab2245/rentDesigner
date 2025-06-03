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
        // First try to fetch from API
        const response = await fetch('/api/designers');
        designers = await response.json();
    } catch (error) {
        console.log('Falling back to local JSON file');
        // Fallback to local JSON file
        try {
            const response = await fetch('../static/js/designers.json');
            designers = await response.json();
        } catch (fallbackError) {
            console.error('Error fetching designers data:', fallbackError);
            designers = [];
        }
    }
    renderDesigners();
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
function toggleShortlist(designerId) {
    // Find the designer
    const designerIndex = designers.findIndex(d => d.id === designerId);
    if (designerIndex === -1) return;
    
    // Toggle shortlisted status
    designers[designerIndex].shortlisted = !designers[designerIndex].shortlisted;
    
    // Update UI
    renderDesigners();
    
    // Save updated data (in a real app, this would send to the server)
    saveDesignersData();
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

// Save designers data (mock implementation)
function saveDesignersData() {
    // In a real app, this would send data to the server
    console.log('Saving designers data:', designers);
    // For now, we just keep it in memory
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
