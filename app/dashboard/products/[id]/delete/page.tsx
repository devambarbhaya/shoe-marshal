import { deleteProduct } from "@/app/actions";
import { SubmitButtons } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeletePage({ params }: { params: { id: string } }) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>ARE YOU ABSOLUTELY SURE?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            product and remove all data from the servers
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/products">Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={params.id} />
            <SubmitButtons text="Delete Product" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
