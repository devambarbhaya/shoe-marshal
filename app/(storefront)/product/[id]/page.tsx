import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/components/storefront/ImageSlider";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ShoppingBag, Star } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-primary">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <Button size="lg" className="w-full mt-5">
            <ShoppingBag className="h-5 w-5 mr-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
