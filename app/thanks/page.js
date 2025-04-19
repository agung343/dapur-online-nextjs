import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="min-h-[800px] mt-12 flex flex-col items-center">
      <h1 className="text-center text-cherry-red text-5xl">
        Thank you for ordering, please wait while we delivery to you.
      </h1>
      <button type="button" className="py-2 px-4 bg-medium-blue text-background text-xl rounded-lg hover:bg-light-blue">
        <Link href="/">Back to Home</Link>
      </button>
    </div>
  );
}
