"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PaymentStatus = "loading" | "paid" | "pending" | "failed";

function SuccessContent() {
  const searchParams = useSearchParams();
  const linkId = searchParams.get("link_id");
  const productName = searchParams.get("product");
  const amount = searchParams.get("amount");

  const [status, setStatus] = useState<PaymentStatus>("loading");

  useEffect(() => {
    if (!linkId) {
      setStatus("failed");
      return;
    }

    fetch(`/api/verify-payment?link_id=${linkId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "PAID") {
          setStatus("paid");
        } else if (
          data.status === "PARTIALLY_PAID" ||
          data.status === "ACTIVE"
        ) {
          setStatus("pending");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [linkId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg
            className="animate-spin h-7 w-7 text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-neutral-500 text-sm">Verifying your payment…</p>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-1">
            Payment Successful
          </h1>
          {productName && (
            <p className="text-neutral-500">
              Your order for{" "}
              <span className="font-medium text-neutral-700">{productName}</span>
              {amount && (
                <>
                  {" "}
                  (₹{amount})
                </>
              )}{" "}
              has been confirmed.
            </p>
          )}
        </div>
        <div className="bg-neutral-50 rounded-xl p-4 w-full text-left space-y-2">
          <p className="text-sm text-neutral-500">
            You'll receive a confirmation SMS shortly. Our team will process
            your order within 1–2 business days.
          </p>
          {linkId && (
            <p className="text-xs text-neutral-400 font-mono">
              Order ref: {linkId}
            </p>
          )}
        </div>
        <Button asChild variant="black" className="w-full h-11">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-1">
            Payment Pending
          </h1>
          <p className="text-neutral-500">
            Your payment is being processed. This usually takes a few minutes.
          </p>
        </div>
        <div className="bg-neutral-50 rounded-xl p-4 w-full text-left">
          <p className="text-sm text-neutral-500">
            If you completed the payment, please wait a moment and refresh this
            page. If you have any questions, contact us at{" "}
            <a
              href="mailto:hello@graycup.in"
              className="underline text-neutral-700"
            >
              hello@graycup.in
            </a>
            .
          </p>
        </div>
        <Button
          variant="black"
          className="w-full h-11"
          onClick={() => window.location.reload()}
        >
          Refresh Status
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 mb-1">
          Payment Failed
        </h1>
        <p className="text-neutral-500">
          We couldn't confirm your payment. No charges have been made.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Button asChild variant="black" className="w-full h-11">
          <Link href="/shop">Try Again</Link>
        </Button>
        <Button asChild variant="outline" className="w-full h-11">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}

export default function ShopSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <div className="animate-pulse w-16 h-16 rounded-full bg-neutral-100" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
