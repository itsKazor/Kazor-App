import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white px-4 transform -translate-y-12">
      <div className="text-center max-w-md w-full">
        <Image
          src="/giphy.gif"
          alt="404 GIF"
          width={150}
          height={150}
          className="mx-auto rounded-2xl"
        />
        <h1 className="text-3xl sm:text-4xl font-semibold mt-4"><span className="text-orange-300">404</span> - Halaman Ga Ketemu</h1>
        <p className="mt-2 max-w-80 mx-auto text-base sm:text-lg">Maaf, Mungkin Kamu Salah Alamat Atau Sedang Di Perbaiki</p>
        
        
      </div>
    </div>
  );
}
