export interface Persona {
    id: number;
    name: string;
    description: string;
    image: string;
}

export const personas: Persona[] = [
    {
        id: 1,
        name: "Narendra Modi",
        description: "Narendra Modi is the Prime Minister of India and a prominent leader of the Bharatiya Janata Party (BJP). Starting his journey with the Rashtriya Swayamsevak Sangh (RSS), he gradually rose to national leadership. ",
        image: "https://www.pmindia.gov.in/wp-content/uploads/2025/12/01.jpg"
    },
    {
        id: 2,
        name: "Donald Trump",
        description: "Donald Trump is the former President of the United States and a prominent leader of the Republican Party. Starting his career as a businessman Actor, he gradually rose to national political prominence.",
        image: "https://live.staticflickr.com/3936/32984155372_157f8c94b3_4k.jpg"
    },
    {
        id: 3,
        name: "Agrim Gupta",
        description: "Agrim Gupta is a B.Tech student and an aspiring full-stack MERN developer. Starting his journey with coding during school, he gradually rose to building real-world projects and exploring GenAi",
        image: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg"
    }
];