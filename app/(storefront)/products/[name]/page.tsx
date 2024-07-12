import { ProductCard } from "@/components/storefront/ProductCard";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          images: true,
          description: true,
          name: true,
          id: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "men",
        },
        select: {
          price: true,
          images: true,
          description: true,
          name: true,
          id: true,
        },
      });

      return {
        title: "Products for men",
        data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "women",
        },
        select: {
          price: true,
          images: true,
          description: true,
          name: true,
          id: true,
        },
      });

      return {
        title: "Products for Women",
        data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kids",
        },
        select: {
          price: true,
          images: true,
          description: true,
          name: true,
          id: true,
        },
      });

      return {
        title: "Products for Kids",
        data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function page({ params }: { params: { name: string } }) {
  const { data, title } = await getData(params.name);

  return (
    <section>
      <h1 className="font-semibold text-3xl mr-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
