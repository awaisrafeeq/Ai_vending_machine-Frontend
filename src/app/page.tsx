// pages/index.js
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50" style={{ width: '1920px', height: '1080px' }}>
      {/* Logo Section */}
      <div className="flex items-start justify-between w-full absolute top-3 z-[0]">
        <Image
          src="/images/cat_left.png"
          alt="Left Cat"
          width={230}
          height={80}
          className="animate-bounce abosulte"
        />
        <Image
          src="/images/logo.png"
          alt="Realtime Nutrition Logo"
          width={950}
          height={140}
        />
        <Image
          src="/images/calt_right.png"
          alt="Right Cat"
          width={180}
          height={80}
          className="animate-bounce abosulte"
        />
      </div>

      {/* Product Selection Section */}
      <div className="flex justify-center items-center gap-32 mt-20 relative z-2">
        {/* Select a Product */}
        {/* Select a Product */}
        <Link href="/products">
          <div className="flex flex-col items-center cursor-pointer">
            <Image
              src="/images/circle_product.png"
              alt="Select a Product"
              width={400}
              height={400}
              className="mb-6"
            />
            <button className="px-8 py-4 text-4xl font-bold bg-gradient-to-b from-sky-500 to-cyan-950 bg-clip-text text-transparent">
              Select a Product
            </button>
          </div>
        </Link>

        {/* Select Snack with AI */}
        <Link href="/ai-selector">
          <div className="flex flex-col items-center cursor-pointer">
            <Image
              src="/images/circle_machine.png"
              alt="Select Snack with AI"
              width={400}
              height={400}
              className="mb-6"
            />
            <span className="px-8 py-4 text-4xl font-bold bg-gradient-to-b from-sky-500 to-cyan-950 bg-clip-text text-transparent">
              Select Snack with AI
            </span>
          </div>
        </Link>

        {/* </div> */}
      </div>
    </div>
  )
}
