function openAdoptionForm(petName) {
    document.getElementById('selectedPet').textContent = petName;
    document.getElementById('adoptionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdoptionForm() {
    document.getElementById('adoptionModal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('adoptionForm').reset();
}

function submitAdoptionForm(event) {
    event.preventDefault();

    // form values
    const formData = {
        petName: document.getElementById('selectedPet').textContent,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        photo: null
    };

    //  photo upload
    const photoFile = document.getElementById('photo').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            formData.photo = e.target.result;

            // Save to localStorage after photo is loaded
            saveAdoptedPet(formData);

            // Update confirmation modal
            updateConfirmationModal(formData);

            // Update adopted pets display
            displayAdoptedPets();

            // Show confirmation
            document.getElementById('adoptionModal').classList.remove('active');
            document.getElementById('confirmationModal').classList.add('active');
        };
        reader.readAsDataURL(photoFile);
        console.log(photoFile)
    }
}

// Save adopted pet to localStorage
function saveAdoptedPet(petData) {
    let adoptedPets = JSON.parse(localStorage.getItem('adoptedPets')) || [];
    adoptedPets.push({
        ...petData,
        adoptionDate: new Date().toLocaleDateString()
    });
    localStorage.setItem('adoptedPets', JSON.stringify(adoptedPets));
}

// Update  form data
function updateConfirmationModal(formData) {
    document.getElementById('confirmPetName').textContent = formData.petName;
    document.getElementById('confirmName').textContent = formData.name;
    document.getElementById('confirmEmail').textContent = formData.email;
    document.getElementById('confirmPhone').textContent = formData.phone;
    document.getElementById('confirmAddress').textContent = formData.address;
    document.getElementById('confirmPhoto').src = formData.photo;
}

// Display adopted pets in the adopted-animals section
function displayAdoptedPets() {
    const adoptedPetsSection = document.getElementById('adopted-animals');
    const adoptedPets = JSON.parse(localStorage.getItem('adoptedPets')) || [];

    adoptedPetsSection.innerHTML = '<h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Recently Adopted Pets</h2>';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

    adoptedPets.forEach(pet => {
        const petCard = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="h-64 overflow-hidden">
                    <img src="${pet.photo}" alt="${pet.petName}" class="w-full h-full object-cover"/>
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-2">
                        ${pet.petName}
                    </h3>
                    <div class="space-y-2">
                        <p class="text-gray-600">
                            <span class="font-semibold">Adopted by:</span> ${pet.name}
                        </p>
                        <p class="text-gray-600">
                            <span class="font-semibold">Contact:</span> ${pet.email}
                        </p>
                        <p class="text-gray-600">
                            <span class="font-semibold">Phone:</span> ${pet.phone}
                        </p>
                        <p class="text-gray-600">
                            <span class="font-semibold">Address:</span> ${pet.address}
                        </p>
                       
                    </div>
                </div>
            </div>
        `;
        gridContainer.innerHTML += petCard;
    });

    adoptedPetsSection.appendChild(gridContainer);
}

window.addEventListener('load', displayAdoptedPets);

function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('adoptionForm').reset();
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeAdoptionForm();
        closeConfirmation();
    }
}

//to show the details in the adopted pet section after the user adopts a pet
const user_img = document.getElementById('user-img');
const pet_name = document.getElementById('petName');
const email = document.getElementById('email');
const phoneNo = document.getElementById('phoneNo');
const address = document.getElementById('address');

user_img.innerHTML = document.getElementById('photo').files[1];

pet_name.innerHTML = document.getElementById('selectedPet').value;
email.innerHTML = document.getElementById('email').value;



