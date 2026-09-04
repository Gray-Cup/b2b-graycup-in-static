export class ImageResponse extends Response {
  constructor(element: any, options?: any) {
    super("OG Image", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
