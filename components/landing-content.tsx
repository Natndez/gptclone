"use client";

// Array of objects containing testimonials
const testimonials = [
    {
        name: "Nate",
        avatar: "N",
        title: "Web Developer",
        description: "In my opinion, Genie has the best UI of all the AI tools I've used"
    },
    {
        name: "Maria",
        avatar: "M",
        title: "Software Engineer",
        description: "Genie's natural language processing is top-notch. It understands context better than any other AI."
    },
    {
        name: "John",
        avatar: "J",
        title: "Data Scientist",
        description: "The insights provided by Genie are incredibly accurate and helpful for my projects."
    },
    {
        name: "Sara",
        avatar: "S",
        title: "Product Manager",
        description: "Genie has streamlined our workflow and made project management a breeze."
    },
    {
        name: "Carlos",
        avatar: "C",
        title: "UX Designer",
        description: "I love the intuitive design of Genie. It's user-friendly and powerful at the same time."
    },
    {
        name: "Emily",
        avatar: "E",
        title: "Research Analyst",
        description: "Genie's data analysis capabilities have significantly improved our research quality."
    }
];

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            </div>
        </div>
    )
}