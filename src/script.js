function openAdoptionForm(petName) {
    document.getElementById('selectedPet').textContent = petName;
    document.getElementById('adoptionModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeAdoptionForm() {
    document.getElementById('adoptionModal').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function submitAdoptionForm(event) {
    event.preventDefault();
    // Here you would typically send the form data to your server
    alert('Thank you for your application! We will contact you soon.');
    closeAdoptionForm();
}

// Close modal if clicking outside
document.getElementById('adoptionModal').addEventListener('click', function (event) {
    if (event.target === this) {
        closeAdoptionForm();
    }
});