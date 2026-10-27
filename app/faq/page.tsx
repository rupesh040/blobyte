"use client";

import React from "react";
import { PageBanner } from "@/components/PageBanner";
import { Faq } from "@/components/Faq";
import { homePageData, faqData } from "@/data";

export default function FaqPage() {
  return (
    <div className="relative">
      <PageBanner
        title="FAQ"
        image="/page-banner.webp"
      />

      <Faq data={faqData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-neutral-200/60" />
      </div>

    </div>
  );
}
