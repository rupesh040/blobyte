import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/PageBanner";
import { BlogDetail } from "@/components/BlogDetail";
import { BlogDetailSkeleton } from "@/components/BlogDetailSkeleton";
import { MomentsGallery } from "@/components/MomentsGallery";
import { getBlogPostBySlug, blogPosts, homePageData } from "@/data";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function BlogPostContent({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageBanner
        title={post.category}
        image="/page-banner.webp"
      />

      <BlogDetail post={post} />
    </>
  );
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <div className="relative">
      <Suspense fallback={<BlogDetailSkeleton />}>
        <BlogPostContent params={params} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-neutral-200/60" />
      </div>

      <MomentsGallery data={homePageData.momentsGallery} />
    </div>
  );
}
