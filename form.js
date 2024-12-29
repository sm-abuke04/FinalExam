document.addEventListener('DOMContentLoaded', function() {
    // DOM element selections
    const form = document.querySelector('.ui.form');
    const sections = document.querySelectorAll('.form-section');
    const progressBar = document.getElementById('form-progress');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const gradeSelect = document.getElementById('grade-select');
    const studentPhoto = document.getElementById('student-photo');
    const photoPreview = document.getElementById('photo-preview');
    const grade12Documents = document.getElementById('grade12-1-documents');
    const collegeDocuments = document.getElementById('college-documents');

    let currentSection = 0;

    // Function to display the current section and update progress
    function showSection(index) {
        // Show/hide form sections
        sections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });

        // Show/hide navigation buttons
        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === sections.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = index === sections.length - 1 ? 'inline-block' : 'none';

        // Update progress bar
        const progressPercentage = ((index + 1) / sections.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Set progress bar color based on completion percentage
        let gradient;
        if (progressPercentage <= 25) {
            gradient = 'linear-gradient(to right, red 10%, red 10%)';
        } else if (progressPercentage <= 50) {
            gradient = 'linear-gradient(to right, red 0%, orange 100%)';
        } else if (progressPercentage <= 75) {
            gradient = 'linear-gradient(to right, red 0%, yellow 100%)';
        } else {
            gradient = 'linear-gradient(to right, red 0%, rgb(105, 218, 0) 80%)';
        }
        progressBar.style.backgroundImage = gradient;
    }

    // Event listener for the previous button
    prevBtn.addEventListener('click', () => {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    });

    // Event listener for the next button
    nextBtn.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Form submitted successfully!');
    });

    // Event listener for grade selection
    gradeSelect.addEventListener('change', function() {
        const selectedGrade = parseInt(this.value);
        
        // Show/hide grade and course-specific documents based on selected grade
        if (selectedGrade >= 1 && selectedGrade <= 12) {
            grade12Documents.style.display = 'block';
            collegeDocuments.style.display = 'none';
        } else if (selectedGrade >= 13 && selectedGrade <= 16) {
            grade12Documents.style.display = 'none';
            collegeDocuments.style.display = 'block';
        } else {
            grade12Documents.style.display = 'none';
            collegeDocuments.style.display = 'none';
        }
    });

    // Event listener for photo upload and preview
    studentPhoto.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas size
                canvas.width = canvas.height = 200;

                // Calculate crop dimensions
                const size = Math.min(img.width, img.height);
                const startX = (img.width - size) / 2;
                const startY = (img.height - size) / 2;

                // Create circular clipping path
                ctx.beginPath();
                ctx.arc(100, 100, 100, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                // Draw image
                ctx.drawImage(img, startX, startY, size, size, 0, 0, 200, 200);

                // Apply simple image enhancement
                const imageData = ctx.getImageData(0, 0, 200, 200);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, data[i] * 1.2);     // Red
                    data[i + 1] = Math.min(255, data[i + 1] * 1.2); // Green
                    data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Blue
                }
                ctx.putImageData(imageData, 0, 0);

                // Update preview
                photoPreview.innerHTML = '';
                photoPreview.appendChild(canvas);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });

    // Initialize the form by showing the first section
    showSection(currentSection);
});
