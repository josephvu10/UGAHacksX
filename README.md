# UGAHacksX

## Contributors:
- Khoa Le
- Daniel Laij
- Lauren Lee
- Joseph Vu

## Inspiration
Music is one of the most powerful forms of self-expression, yet not everyone has equal access to creating it. We asked ourselves: How do we express ourselves through music? This question led us to explore the intersection of music, accessibility, and technology. Throughout this year, we’ve met individuals with different challenges—language barriers, hearing impairments, speech disabilities, and limited mobility—who struggle to express themselves through traditional means. With Sona, we wanted to bridge that gap and create an inclusive platform where anyone, regardless of their abilities, can create and share music effortlessly.

## What it does
Sona is a web application designed to empower individuals who may face barriers in music creation. Whether someone is deaf, mute, or has limited mobility, Sona allows them to generate music using simple phrases or lyrics that hold meaning to them. Users can either keep their music private or share it with the world, fostering a community built on creative expression.

## How we built it
We developed Sona using Next.js for its efficient server-side rendering, ensuring a smooth and responsive experience. The frontend was crafted with HTML, CSS, and TypeScript to provide an interactive and user-friendly interface. Generative AI tools played a crucial role in our project—Beatoven for AI-generated music, Gemini AI for lyrical suggestions, and Stability AI for generating album cover art. For decentralized file storage, we integrated Pinata, allowing us to securely store user-generated content, including images, audio files, and metadata.

## Challenges we ran into
Working with multiple APIs, especially Generative AI, presented several challenges. We encountered rate limits, API restrictions, and paywalls that forced us to adapt and find alternative solutions. Additionally, integrating Pinata as a decentralized storage system required us to rethink how we structure and organize data efficiently. Learning and implementing these new technologies on the fly was a steep learning curve, but it ultimately strengthened our problem-solving skills.

## Accomplishments that we're proud of
We’re incredibly proud of diving into Generative AI and leveraging it in meaningful ways to enhance accessibility. For most of our team, this was our first time working with AI-powered APIs, and we successfully integrated them into our application. Another major achievement was implementing Pinata for decentralized storage, allowing us to manage files efficiently and securely. Most importantly, we created a platform that embodies inclusivity, ensuring that more people have the opportunity to express themselves through music.

## What we learned
Developing Sona taught us the importance of designing with accessibility in mind. We gained valuable experience working with new frameworks, databases, and AI models while also improving our ability to collaborate effectively as a team. Splitting tasks into manageable sections allowed us to streamline our workflow and maintain steady progress.

## What's next for Sona
Looking ahead, we aim to expand Sona’s reach, making it an even more inclusive platform for individuals of all abilities. We want to refine our AI models, improve the user experience, and introduce new features that enhance accessibility. Our ultimate goal is to create a space where self-expression through music is truly universal—where anyone, regardless of their physical or communicative limitations, can create, share, and connect through the power of sound.

## How to run our app:

connect to the ugahacksx directory

cd ugahacksx

npm install

npm run dev

## Frameworks and Technologies
BeatovenAI API
GeminiAI API
StabilityAI API
Pinata
Next.JS
React
Auth0
