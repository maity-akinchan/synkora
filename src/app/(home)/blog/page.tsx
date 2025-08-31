import Link from "next/link";
import Image from "next/image";
import { posts } from "../../data/posts";
import { Navigation } from "@/components/home/Navigation";

export default function BlogPage() {
    return (
        <main className="max-w-7xl mx-auto">
            <Navigation />
            <section className="relative w-full  overflow-hidden mb-12">
                <div className="hidden md:block relative w-full h-[500px] lg:h-[700px] rounded-xl overflow-hidden">
                    <Image
                        src="/image.svg"
                        alt="Blog Hero"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>
            <h1 className="text-3xl font-bold mb-10">Recent Blog Posts</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <div className="group cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                            <div className="relative w-full h-48">
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
                                <p className="text-sm text-gray-600">
                                    {post.author} • {post.date}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
