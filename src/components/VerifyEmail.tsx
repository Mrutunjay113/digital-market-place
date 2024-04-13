"use client";
import { trpc } from "@/trpc/client";
import { XCircle } from "lucide-react";
import Image from "next/image";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-500" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-center">
          This Token is invalid or has expired. Please try again.
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex flex-col items-center h-full justify-center ">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image
            src="/hippo-email-sent.png"
            fill
            alt="hippo email verified image"
          />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
      </div>
    );
  }
};
export default VerifyEmail;
