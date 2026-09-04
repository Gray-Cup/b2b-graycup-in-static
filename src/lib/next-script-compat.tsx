import React, { useEffect } from "react";

export function Script({ children, dangerouslySetInnerHTML, id, src }: any) {
  useEffect(() => {
    if (src) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      if (id) script.id = id;
      document.head.appendChild(script);
    } else if (children || dangerouslySetInnerHTML?.__html) {
      const script = document.createElement("script");
      if (id) script.id = id;
      script.textContent = typeof children === "string" ? children : dangerouslySetInnerHTML?.__html || "";
      document.head.appendChild(script);
    }
  }, [src, children, dangerouslySetInnerHTML, id]);

  return null;
}

export default Script;
