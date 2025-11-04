const classData = {
    math: {
        announcements: [
            { title: "Welcome to Advanced Algorithms", date: "Sep 1", content: "Welcome everyone! We'll be covering exciting topics this semester." },
            { title: "Quiz Next Week", date: "Sep 5", content: "Prepare for a quiz on Graph Theory fundamentals." }
        ],
        assignments: [
            { title: "Homework 1: Graph Theory", dueDate: "Sep 10", points: "100 points" },
            { title: "Group Project: Algorithm Analysis", dueDate: "Sep 15", points: "150 points" }
        ],
        pastWork: [
            { title: "Introduction to Algorithms", date: "Aug 30", grade: "95/100" },
            { title: "Sorting Algorithms Quiz", date: "Aug 25", grade: "88/100" }
        ]
    },
    physics: {
        announcements: [
            { title: "Lab Safety Guidelines", date: "Sep 2", content: "Please review the updated lab safety protocols." },
            { title: "Guest Lecturer Next Week", date: "Sep 6", content: "Dr. Brown will give a lecture on quantum entanglement." }
        ],
        assignments: [
            { title: "Lab Report: Wave Functions", dueDate: "Today", points: "100 points" },
            { title: "Problem Set 2: Quantum States", dueDate: "Sep 12", points: "50 points" }
        ]
    },
    programming: {
        announcements: [
            { title: "Project Teams Formed", date: "Sep 3", content: "Check your assigned teams for the semester project." },
            { title: "Software Installation", date: "Sep 4", content: "Please install TensorFlow before next class." }
        ],
        assignments: [
            { title: "Neural Network Implementation", dueDate: "Sep 20", points: "200 points" },
            { title: "Code Review Exercise", dueDate: "Sep 8", points: "50 points" }
        ]
    }
};

function showClassroom(classroom, card = null) {
    const classroomView = document.querySelector('.classroom-view');
    const header = document.querySelector('.classroom-header');
    const announcementList = document.querySelector('.announcement-list');
    const assignmentList = document.querySelector('.assignment-list');
    const pastWorkList = document.querySelector('.past-work-list');
    const classList = document.querySelector('.class-list');
    const upcomingList = document.querySelector('.upcoming-list');

    // Update class list in sidebar
    classList.innerHTML = Object.keys(classData).map(className => `
        <div class="class-item ${className === classroom ? 'active' : ''}" data-classroom="${className}">
            ${classData[className].title || className.charAt(0).toUpperCase() + className.slice(1)}
        </div>
    `).join('');

    // Add click handlers to class items
    document.querySelectorAll('.class-item').forEach(item => {
        item.addEventListener('click', () => showClassroom(item.dataset.classroom));
    });

    if (card) {
        // Get the clicked card's position for zoom origin
        const rect = card.getBoundingClientRect();
        const originX = rect.left + (rect.width / 2);
        const originY = rect.top + (rect.height / 2);
        classroomView.style.transformOrigin = `${originX}px ${originY}px`;
        
        // Update header with card info
        const bannerColor = card.querySelector('.card-banner').style.backgroundColor;
        header.style.backgroundColor = bannerColor;
        header.innerHTML = `
            <button class="back-button">← Back to Classes</button>
            <h1>${card.querySelector('h2').textContent}</h1>
            <p>${card.querySelector('.teacher').textContent}</p>
        `;
    }

    // Populate announcements
    announcementList.innerHTML = classData[classroom].announcements.map(announcement => `
        <div class="announcement-item">
            <div class="announcement-meta">
                <span class="date">${announcement.date}</span>
            </div>
            <h3>${announcement.title}</h3>
            <p>${announcement.content}</p>
        </div>
    `).join('');

    // Populate assignments
    assignmentList.innerHTML = classData[classroom].assignments.map(assignment => `
        <div class="assignment-item">
            <div class="assignment-meta">
                <span class="points">${assignment.points}</span> · 
                <span class="due-date">Due ${assignment.dueDate}</span>
            </div>
            <h3>${assignment.title}</h3>
        </div>
    `).join('');

    // Populate past work if available
    if (classData[classroom].pastWork) {
        pastWorkList.innerHTML = classData[classroom].pastWork.map(work => `
            <div class="past-work-item">
                <div>
                    <h3>${work.title}</h3>
                    <div class="past-work-meta">${work.date}</div>
                </div>
                <div class="grade">${work.grade}</div>
            </div>
        `).join('');
    }

    // Show the classroom view with animations
    classroomView.classList.add('active');
    
    // Animate content after a short delay
    setTimeout(() => {
        document.querySelector('.classroom-content').classList.add('visible');
        document.querySelectorAll('.stream-section > div, .sidebar > div').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, i * 100);
        });
        
        // Reattach back button event listener
        document.querySelector('.back-button').addEventListener('click', hideClassroom);
    }, 300);
}

function hideClassroom() {
    const classroomView = document.querySelector('.classroom-view');
    const content = document.querySelector('.classroom-content');
    
    // Reverse animations
    content.classList.remove('visible');
    document.querySelectorAll('.stream-section > div, .sidebar > div').forEach(el => {
        el.classList.remove('fade-in');
    });
    
    // Wait for animations to complete before hiding
    setTimeout(() => {
        classroomView.classList.remove('active');
    }, 300);
}

// Event listeners for classroom cards
document.querySelectorAll('.classroom-card').forEach(card => {
    card.addEventListener('click', function(e) {
        showClassroom(this.dataset.classroom, this);
    });
});

// Handle back button click
document.querySelector('.back-button').addEventListener('click', function() {
    hideClassroom();
});

// Close classroom view when clicking outside content
document.querySelector('.classroom-view').addEventListener('click', function(e) {
    if (e.target === this) {
        hideClassroom();
    }
});