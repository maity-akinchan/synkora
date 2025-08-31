import { notFound } from "next/navigation";
import Image from "next/image";
import { posts } from "../../../data/posts";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) return notFound();

    return (
        <article className="max-w-3xl mx-auto px-6 py-12">
            <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
                <Image src={post.img} alt={post.title} fill className="object-cover" />
            </div>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 text-sm mb-8">
                By {post.author} • {post.date}
            </p>

            <div className="prose prose-lg max-w-none">
                <p>{post.content}</p>
            </div>
        </article>
    );
}
