import { Button } from "@/components/ui/button";
import {
  coffeeProducts,
  ctcTeaProducts,
  looseLeafTeaProducts,
  instantCoffeeProducts,
} from "@/data/products";
import { CoffeeCup } from "@/components/svgs";
import { LazyProductRow } from "@/components/products";

export const revalidate = 3600;

export default function Home() {
  return (
    <div>
      <div className="mx-auto px-4 lg:px-6 h-auto my-10">
        <div className="md:min-h-screen pt-10 pb-20 max-w-6xl mx-auto md:pb-0 flex flex-col justify-center">
          <div>
            {/* Left Column */}
            <div>
              <div>
                <span className="mb-4 sm:ml-0.5 text-sm font-medium uppercase text-neutral-500">
                  We Support Sustainability
                </span>
              </div>
              {/* Featured Products Section */}
              <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 lg:px-6">
                  <LazyProductRow
                    title="CTC Tea"
                    products={ctcTeaProducts}
                  />
                  <LazyProductRow
                    title="Coffee"
                    products={[...coffeeProducts, ...instantCoffeeProducts]}
                  />
                  <LazyProductRow
                    title="Loose Leaf Tea"
                    products={looseLeafTeaProducts}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-20 py-20 bg-neutral-100">
            <h2 className="text-5xl font-medium text-neutral-900 mb-6 flex justify-center flex-row items-center gap-4 font-instrument-sans"></h2>
          </div>

          <div className="my-20 flex flex-col md:items-center px-6 py-10 md:py-20 bg-neutral-50 md:grid md:grid-cols-[70%_30%]">
            <div>
              <div className="block md:hidden max-md:pb-5">
                <CoffeeCup />
              </div>
              <h2 className="text-2xl sm:text-5xl font-medium text-neutral-900 mb-6 font-instrument-sans">
                Gray Cup Narrative
              </h2>
              <p className="text-md sm:text-xl mb-10 text-neutral-700 my-4 max-w-2xl">
                Gray Cup believes in the power of the perfect brew. Whether it's
                the calming ritual of Matcha, the bold awakening of artisanal
                Coffee, or the soothing embrace of fine Tea.
                <br />
                <br />
                Sustainably sourced, expertly curated, and poured for you.
              </p>
            </div>
            <div className="hidden md:block">
              <CoffeeCup />
            </div>
            <a href="https://discord.gg/gpRxmW63JW" target="_blank">
              <Button variant="gray">Join Our Discord</Button>
            </a>
          </div>

          {/* <Image src="/beans-circle.webp" alt="coffee beans" className="pl-2" width={200} height={200} /> */}
        </div>
      </div>
    </div>
  );
}
