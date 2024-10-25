let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const pointerContainer = document.createElement('div'); // Create a container for pointers
pointerContainer.classList.add('pointer-container'); // Add a class to the pointer container
document.body.appendChild(pointerContainer); // Append the pointer container to the body

// Create pointers
for (let i = 0; i < slides.length; i++) {
    const pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.setAttribute('data-slide-index', i); // Add data attribute to store slide index
    pointer.addEventListener('click', function() {
        showSlide(parseInt(pointer.getAttribute('data-slide-index')));
    });
    pointerContainer.appendChild(pointer);
}

const pointers = document.querySelectorAll('.pointer');

function showSlide(n) {
    slides[currentSlide].style.display = 'none';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = 'block';
    updatePointers(); // Update pointers to reflect the current slide
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function updatePointers() {
    pointers.forEach((pointer, index) => {
        if (index === currentSlide) {
            pointer.classList.add('active');
        } else {
            pointer.classList.remove('active');
        }
    });
}

// Show the first slide initially
showSlide(currentSlide);

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);

// Get the modal element
const modal = document.getElementById('myModal');
// Get the body element
const body = document.body;

// Get the close button element
const closeBtn = document.querySelector('.close-btn');

// Function to open modal
function openModal() {
    modal.style.display = 'flex';
    // Disable scrolling
    body.style.overflow = 'hidden';
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
    // Enable scrolling
    body.style.overflow = 'auto';
}

// Open modal after 5 seconds
setTimeout(openModal, 1000);

// Close modal when close button is clicked
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById('menu-icon').addEventListener('click', function() {
    const menuOptions = document.getElementById('menu-options');

    if (menuOptions.style.display === 'none' || menuOptions.style.display === '') {
        menuOptions.style.display = 'block';
    } else {
        menuOptions.style.display = 'none';
    }
    
    // fetch('/getUserProfileInfo')
    // .then(response =>  response.json())
    // .then(data => {
    //     console.log(data.firstName,data.lastName,data.email)
    //   document.getElementById('userName').innerText = `${data.firstName} ${data.lastName}`;
    //   document.getElementById('userEmail').innerText = data.email;
    // })
    // .catch(error => console.error('Error:', error));
    alert("hogaya")
    
});

document.addEventListener('click', function(event) {
    const menuOptions = document.getElementById('menu-options');
    const menuIcon = document.getElementById('menu-icon');

    if (!menuOptions.contains(event.target) && event.target !== menuIcon) {
        menuOptions.style.display = 'none';
    }
});
document.querySelector('#menu-icon').addEventListener('click', function () {

alert("hogya");
  });