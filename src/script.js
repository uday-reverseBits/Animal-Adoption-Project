function openAdoptionForm(petName) {
    document.getElementById('selectedPet').textContent = petName;
    document.getElementById('adoptionModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeAdoptionForm() {
    document.getElementById('adoptionModal').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    document.getElementById('adoptionForm').reset();
}

function submitAdoptionForm(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        petName: document.getElementById('selectedPet').textContent,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        photo: document.getElementById('photo').files[0]
    };

    // Update confirmation modal with form values
    document.getElementById('confirmPetName').textContent = formData.petName;
    document.getElementById('confirmName').textContent = formData.name;
    document.getElementById('confirmEmail').textContent = formData.email;
    document.getElementById('confirmPhone').textContent = formData.phone;
    document.getElementById('confirmAddress').textContent = formData.address;

    // Display uploaded photo
    if (formData.photo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('confirmPhoto').src = e.target.result;
        };
        reader.readAsDataURL(formData.photo);
    }

    // Hide adoption form and show confirmation
    document.getElementById('adoptionModal').classList.remove('active');
    document.getElementById('confirmationModal').classList.add('active');
}

function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('adoptionForm').reset();
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeAdoptionForm();
        closeConfirmation();
    }
}









