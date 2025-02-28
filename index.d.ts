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

type adHandler = (options?: string|AdHandlerOptions) => Promise<void>

export default function createAdHandler(zoneid: number): adHandler
