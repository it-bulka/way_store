declare global {
  interface Window {
    Wayforpay: new () => {
      run: (params: object, callback: (event: { data: string }) => void) => void
    }
  }
}

export {}
