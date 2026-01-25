import { getNewsroomPosts } from "@/lib/mdx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export default async function NewsroomPage() {
  const posts = await getNewsroomPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-12">
      {/* Header */}
      <div className="text-start mb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Newsroom
        </h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl">
          Insights about Gray Cup and What we are committing to.
        </p>
      </div>

      {/* Newsroom Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No newsroom posts yet</h3>
          <p className="text-muted-foreground mb-6">
            We're working on some amazing content. Check back soon!
          </p>
          <Link href="/">
            <Button>
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col mx-auto max-w-4xl">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden border-b transition-all duration-300"
            >
              <div className="flex flex-row gap-5 items-center p-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-nowrap">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <h2 className="text-lg  font-semibold group-hover:text-primary hover:text-blue-600 hover:underline transition-colors line-clamp-2">
                  <Link href={`/newsroom/${post.slug}`}>{post.title}</Link>
                </h2>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      {posts.length > 0 && (
        <section className="mt-16 text-center p-8 bg-muted/50 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest insights on AI, customer experience, and business
            automation delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Subscribe to Newsletter</Button>
            </Link>
            <Link href="/case-studies">
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
