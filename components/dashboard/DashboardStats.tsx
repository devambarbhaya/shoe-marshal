import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import prisma from "@/lib/db";

async function getData() {
  const [user, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return {
    user,
    products,
    orders,
  };
}

export async function DashboardStats() {
  const { user, products, orders } = await getData();

  const totalAmount = orders.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${new Intl.NumberFormat("en-GB").format(totalAmount / 100)}
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{orders.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Sales on ShoeMarshal
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-5 w-5 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Products on ShoeMarshal
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
