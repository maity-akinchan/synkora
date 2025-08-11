import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math';
import rehypeRaw from "rehype-raw"; // enables HTML inside markdown
import rehypeSanitize from "rehype-sanitize"; // optional security
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

type MarkdownComponentProps = {
  content: string;
};

export default function MarkdownComponent({ content }: MarkdownComponentProps) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex, rehypeStringify]} // parse + sanitize HTML
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
