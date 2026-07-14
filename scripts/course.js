const courses = [
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 3,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 3,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 3,
        completed: false
    },
    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    }
];


function displayCourses(courseList) {

    const container = document.querySelector("#courseCards");

    container.innerHTML = "";


    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course");


        if (course.completed) {
            card.classList.add("completed");
        }


        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;


        container.appendChild(card);

    });


    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );


    document.querySelector("#totalCredits").textContent =
        `Total Credits: ${totalCredits}`;
}



displayCourses(courses);



document.querySelector("#allCourses").addEventListener("click", () => {
    displayCourses(courses);
});


document.querySelector("#wddCourses").addEventListener("click", () => {

    const wddCourses = courses.filter(
        course => course.subject === "WDD"
    );

    displayCourses(wddCourses);

});


document.querySelector("#cseCourses").addEventListener("click", () => {

    const cseCourses = courses.filter(
        course => course.subject === "CSE"
    );

    displayCourses(cseCourses);

});