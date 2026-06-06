﻿import '../src/index.css'

export const metadata = { 
  title: 'AidKit',
  icons: {
    icon: '/logo.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html><body>{children}</body></html>
}
