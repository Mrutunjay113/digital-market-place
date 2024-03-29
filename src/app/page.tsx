import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="md:text-4xl text-6xl font-bold tracking-tight text-gray-900 ">
            Your Market place for hight quality{" "}
            <span className="text-blue-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DigitalHippo. Every asset on our platform is verified by
            our team to ensure the highest quality standards.
          </p>
          <div className="sm:flex-row flex flex-col gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant={"ghost"}>Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* Todo: LIst product /*/}
      </MaxWidthWrapper>
      <section></section>
    </>
  );
}
