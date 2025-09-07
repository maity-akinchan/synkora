"use client";
import Link from "next/link";
import Image from "next/image";
import { posts } from "../../(server)/data/posts";
import { Navigation } from "@/components/general/home/Navigation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Masonry } from "@/components/ui/responsive-masonry-layout";


export default function BlogPage() {
    return (
        <main className="max-w-7xl mx-auto">
            <Navigation />

            {/* Hero Section */}
            <section className="relative w-full overflow-hidden mb-12">
                <div className="hidden sm:block relative w-full">
                    <ContainerScroll
                        titleComponent={
                            <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight drop-shadow-lg text-center">
                                Explore Our <br />
                                Blog Insights
                            </h1>
                        }
                    >
                        <Image
                            src="/image.svg"
                            alt="Blog Hero"
                            height={700}
                            width={1400}
                            className="mx-auto rounded-xl object-contain"
                            draggable={false}
                        />
                    </ContainerScroll>
                </div>
            </section>

            {/* Blog Posts Header */}
            <h1 className="text-3xl font-bold mb-10 text-center">Recent Blog Posts</h1>

            {/*Blog Cards */}
            <section className="mb-16">
                <Masonry>
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <div className="group bg-white rounded-xl shadow-2xl/10 border-0 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">

                                {/* Image */}
                                <div className="relative overflow-hidden p-4">
                                    <Image
                                        src={post.img}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                                        draggable={false}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        {post.content.length > 80
                                            ? post.content.substring(0, 80) + "..."
                                            : post.content}
                                    </p>

                                    {/* Author & Date */}
                                    <div className="mt-3 flex items-center text-xs text-gray-400">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                            {post.author} • {post.date}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </Masonry>
            </section>
        </main>
    );
}
