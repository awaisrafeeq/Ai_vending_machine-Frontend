declare module "next-pwa" {
  type NextConfig = any;
  interface NextPwaOptions {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    runtimeCaching?: any;
    buildExcludes?: (RegExp | string)[];
    [key: string]: any;
  }
  export default function createNextPwa(options?: NextPwaOptions): (config: NextConfig) => NextConfig;
}

declare module "next-pwa/cache" {
  const runtimeCaching: any;
  export = runtimeCaching;
}


