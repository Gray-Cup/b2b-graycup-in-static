import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/data/products";

export const alt = "Gray Cup B2B - Product";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          Product Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "48px",
        }}
      >
        {/* Header with logo area */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#1a1a1a",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              GC
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              Gray Cup B2B
            </span>
          </div>
          <div
            style={{
              background:
                product.category === "Tea" ? "#15803d" : "#92400e",
              color: "white",
              padding: "8px 20px",
              borderRadius: "24px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {product.category}
          </div>
        </div>

        {/* Main content area */}
        <div
          style={{
            display: "flex",
            flex: 1,
            gap: "48px",
          }}
        >
          {/* Product image */}
          <div
            style={{
              width: "400px",
              height: "400px",
              background: "white",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e5e5e5",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `https://b2b.graycup.in${product.image}`
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product info */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "700",
                color: "#1a1a1a",
                margin: "0 0 16px 0",
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: "#525252",
                margin: "0 0 32px 0",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description}
            </p>

            {/* Price and MOQ */}
            <div
              style={{
                display: "flex",
                gap: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "#737373",
                    marginBottom: "4px",
                  }}
                >
                  Price Range
                </span>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                  }}
                >
                  ₹{product.priceRange.min} - ₹{product.priceRange.max}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "#737373",
                    marginBottom: "4px",
                  }}
                >
                  Minimum Order
                </span>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                  }}
                >
                  {product.minimumOrder.quantity} {product.minimumOrder.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
            paddingTop: "24px",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#737373",
            }}
          >
            b2b.graycup.in
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#737373",
            }}
          >
            Premium Tea & Coffee Suppliers
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
