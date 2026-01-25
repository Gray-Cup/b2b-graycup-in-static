"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaLinkedin, FaGlobeAsia, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
type Tier = {
  name: string;
  price: string;
  cta: string;
  ctaVariant?: "default" | "blue" | "red";
  features: string[];
  flagText?: string;
};

/* ---------- Single borderless plan column ---------- */
function PricingCard({
  tier,
  columnRef,
}: {
  tier: Tier;
  columnRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={columnRef} className="relative">
      <Card className="p-0 shadow-none border-0 rounded-none bg-white">
        <div className="flex flex-col gap-6">
          <CardHeader className="p-6">
            <CardTitle className="text-lg font-semibold">{tier.name}</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex w-full flex-col items-start gap-4 px-6 lg:h-[150px]">
              <div className="mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-4xl leading-none tracking-[-0.15rem] tabular-nums">
                    {tier.price}
                  </span>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  per month
                </CardDescription>
              </div>
              <Button
                className="w-full h-12 rounded-lg"
                variant={tier.ctaVariant ?? "default"}
              >
                {tier.cta}
              </Button>
            </div>

            <Separator className="my-10" />

            <ul className="mt-4 flex flex-col gap-4 px-6 pb-8 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg
                    className="size-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Example data ---------- */
const tiers: Tier[] = [
  {
    name: "Vibe",
    price: "$30",
    cta: "Vibe with Us",
    ctaVariant: "blue",
    features: [
      "Unlimited Customer Agents + 100MB of Context",
      "500MB KnowledgeBase Size(Customer Analysis)",
      "Long Term & Short Term Memory",
      "Integrate with Slack, Discord, and more",
      "1,000 messages/month",
      "Email + chat support",
    ],
  },
  {
    name: "Cracked",
    price: "$150",
    cta: "Go Nuts Here",
    ctaVariant: "red",
    features: [
      "Unlimited Customer Agents + 500MB of Context",
      "1GB KnowledgeBase Size(Customer Analysis)",
      "Unlimited projects",
      "Advanced workflows",
      "50,000 messages/month",
      "API access & priority support",
    ],
  },
  {
    name: "Startups",
    price: "$300",
    cta: "Grow Your Startup",
    features: [
      "Unlimited Customer Agents + 1GB of Context",
      "2GB KnowledgeBase Size(Customer Analysis)",
      "Advanced AI routing",
      "200,000 messages/month",
      "ColdChat + team collaboration",
      "SLA-backed priority support",
    ],
  },
  {
    name: "Companies",
    price: "$900",
    cta: "Unify Your Company",
    ctaVariant: "blue",
    features: [
      "Total Memory Size: 5GB",
      "10GB KnowledgeBase Size(Customer Analysis)",
      "Everything in Startups",
      "White-label agents",
      "Enterprise SSO & RBAC",
      "1,000,000 messages/month",
      "24/7 dedicated support",
    ],
  },
];

/* ---------- Page ---------- */
export default function PricingPage() {
  const frameRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="px-4 lg:px-6">
      <div className="min-h-screen py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-start mb-16">
            <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
              Our Impact
            </h1>
            <p className="text-md md:text-lg text-muted-foreground">
              What are we? Who Started this? Started why?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
