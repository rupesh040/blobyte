"use client";

import React from "react";
import { PageBanner } from "@/components/PageBanner";
import { Contact } from "@/components/Contact";
import { homePageData, contactData } from "@/data";

export default function ContactPage() {
  return (
    <div className="relative">
      <PageBanner
        title="Contact Us"
        image="/page-banner.webp"
      />

      <Contact data={contactData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-neutral-200/60" />
      </div>
    </div>
  );
}
