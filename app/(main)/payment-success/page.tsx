import PaymentSuccess from "@/components/(main)/PaymentSuccess";
import { Suspense } from "react";

// Fallback component to show while the search params are loading
function Loading() {
  return <div>Loading...</div>;
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccess />
    </Suspense>
  );
}
