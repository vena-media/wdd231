const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the relations of programming...',
        completed: true // Set to true if you have finished it!
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the design and development...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students write functions with parameters...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on top of WDD 130...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces principles of programming...',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user-experience...',
        completed: false
    }
];

function displayCourses(courseList) {
    const container = document.getElementById("course-container");
    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("p");

        card.textContent = `${course.subject} ${course.number}`;
        if (course.completed) {
            card.classList.add("completed");
        }
        container.appendChild(card);
    });

    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0)
    document.getElementById("total-credits").textContent = totalCredits;
}

displayCourses(courses);

const cseButton = document.querySelector('#cse-btn');
const wddButton = document.querySelector('#wdd-btn');
const allButton = document.querySelector('#all-btn');


cseButton.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});


wddButton.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});


allButton.addEventListener('click', () => {
    displayCourses(courses);
});

