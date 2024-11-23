import Image from "next/image";

export function FeedTheLlama() {
  return (
    <div className="absolute top-4 flex flex-row items-center justify-center p-2 rounded-md">
      <Image
        src="/logo.png"
        alt="Feed the Llama Logo"
        width={100}
        height={100}
        className="rounded-md"
      />

      <h1 className="mt-2 text-3xl font-bold text-gray-800">Feed the Llama</h1>
    </div>
  );
}
