interface AdHandlerOptions {
    type: 'preload'|'start'|'end'|'pop'|'inApp'
    timeout?: number
    requestVar?: string
    ymid?: string
    catchIfNoFeed?: boolean
    inAppSettings?: {
      frequency?: number
      capping?: number
      interval?: number
      timeout?: number
      everyPage?: boolean
    }
}

export default function createAdHandler(zoneid: number) {
    return (options: string|AdHandlerOptions) => Promise<void>
}
