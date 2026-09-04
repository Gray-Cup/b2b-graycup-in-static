// Minimal Next.js `next/server` shim so the API route handlers can keep their
// Next-style `POST(request: NextRequest)` signature under React Router. Each
// route file re-wraps this with a thin `action`/`loader` export at the bottom.

export class NextRequest extends Request {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init);
  }

  get nextUrl() {
    return new URL(this.url);
  }

  async json(): Promise<any> {
    return super.json();
  }
}

export class NextResponse extends Response {
  static json(body: any, init?: ResponseInit) {
    const headers = new Headers(init?.headers);
    if (!headers.has("content-type")) headers.set("content-type", "application/json");
    return new Response(JSON.stringify(body), { ...init, headers });
  }

  static redirect(url: string | URL, status: number = 307) {
    return new Response(null, {
      status,
      headers: { Location: typeof url === "string" ? url : url.toString() },
    });
  }
}
