import PaymentSuccess from "@/components/shared/PaymentSuccess";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-4 max-w-[50rem] mx-auto text-center p-5">
      <h1>Hey there!</h1>
      <PaymentSuccess />
      {/* <FaRegCircleCheck className="text-emeraldGreen size-10" />
      <p className="font-semibold text-pretty">
        Payment Successful! 🎉 Thank you for your purchase. You have
        successfully bought a ticket to <br /> <b>{eventName}</b> for{" "}
        <b>{formatPrice(Number(amount))}</b>. <br />
        We look forward to seeing you there!
      </p>
      <Link href="/events">
        <ButtonInput variant="ticket" label="Back to Events" />
      </Link> */}
    </div>
  );
}
