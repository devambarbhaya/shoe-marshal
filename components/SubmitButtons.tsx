"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

interface SubmitButtonsProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButtons({ text, variant }: SubmitButtonsProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="h-5 w-5 mr-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-5">
          <ShoppingBag className="h-5 w-5 mr-4" />
          Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-red-500 text-end">
          Removing...
        </button>
      ) : (
        <button type="submit" className="font-medium text-red-500 text-end">
          Delete
        </button>
      )}
    </>
  );
}
