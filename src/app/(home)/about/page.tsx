"use client";

import React from "react";
import { Navigation } from "@/components/general/home/Navigation";
import ScrollStack, { ScrollStackItem } from '../../../components/ScrollStack';
import { Footer } from "@/components/general/home/Footer";

const teamMembers = [
    { image: "/akshat.png" },
    { image: "/arshia.png" },
    { image: "/angel.png" },
    { image: "/akinchan.png" },
];

const AboutPage = () => {
    return (
        <div className="bg-black text-white">
            <Navigation />

            {/* Hero Section */}

            <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
                <img
                    src="/abouthero.svg"
                    alt="Synkora Hero"
                    className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
                />

            </section>


            <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        "To simplify collaboration by uniting communication,
                        project management, and data visualization into one
                        powerful platform — enabling teams to work smarter,
                        stay aligned, and bring ideas to life with clarity and efficiency."
                    </p>
                </div>

                <div className="flex justify-center">
                    <img
                        src="/mission.jpg"
                        alt="Our Mission"
                        className="rounded-xl shadow-lg w-full max-w-md object-cover"
                    />
                </div>
            </section>

            <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center order-2 md:order-1">
                    <img
                        src="/vision.jpg"
                        alt="Our Vision"
                        className="rounded-xl shadow-lg w-full max-w-md object-cover"
                    />
                </div>

                <div className="order-1 md:order-2 text-center md:text-right">
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-lg leading-relaxed">
                        "To become the world’s most intuitive collaborative
                        platform where teams can seamlessly connect, manage projects,
                        and transform complex data into meaningful insights — empowering organizations
                        of all sizes to innovate, grow, and achieve more together."
                    </p>
                </div>
            </section>

            <section className="max-w-full mx-auto py-20 px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

                <div className="relative h-[300vh]">


                    <div className="sticky top-8 h-screen">

                        {/* Your original ScrollStack component is placed inside the sticky container. */}
                        <ScrollStack
                            itemDistance={300}
                            itemScale={0.05}
                            itemStackDistance={50}
                            stackPosition="0%"
                            scaleEndPosition="5%"
                            baseScale={0.75}
                            rotationAmount={0}
                            blurAmount={1}
                            onStackComplete={() => console.log("Team stack complete!")}
                        >
                            {teamMembers.map((member, index) => (
                                <ScrollStackItem key={index} itemClassName="flex justify-center">
                                    <div className="flex flex-col items-center w-full h-full">
                                        <img
                                            src={member.image}
                                            alt={`Team member ${index + 1}`}
                                            className="rounded-2xl shadow-2xl w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] object-cover"
                                        />
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    );
};

export default AboutPage;
