import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "../../../data/posts";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) return notFound();

    // Example: treat all blog posts as 'image' mediaType
    const mediaType = "image";

    return (
        <ScrollExpandMedia
            mediaType={mediaType}
            mediaSrc={post.img}             // main post image
            bgImageSrc={post.bgImg || post.img}          // background, can also be another image
            title={post.title}
            date={post.date}
            scrollToExpand="Scroll to Explore"
        // textBlend
        >
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-white-500 text-sm mb-8">
                    By {post.author} • {post.date}
                </p>
                <div className="prose prose-lg max-w-none">{post.content}</div>
            </div>
        </ScrollExpandMedia>
    );
}
