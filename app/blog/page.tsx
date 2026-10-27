"use client";

import React from "react";
import { PageBanner } from "@/components/PageBanner";
import { BlogSection } from "@/components/BlogSection";
import { homePageData, blogData } from "@/data";

export default function BlogPage() {
  return (
    <div className="relative">
      <PageBanner
        title="Blogs"
        image="/page-banner.webp"
      />

      <BlogSection data={blogData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-neutral-200/60" />
      </div>
    </div>
  );
}
