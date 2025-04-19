'use client'

export default function GlobalError() {
    return (
        <div className="min-h-[800px]">
        <h1 className="text-center text-cherry-red text-5xl">
            Mohon maaf, halaman sedang bermasalah coba lagi beberapa saat lagi.
        </h1>
        <p>{error.message}</p>
      </div>
    )
}