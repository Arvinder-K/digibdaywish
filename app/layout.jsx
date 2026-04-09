import './globals.css'
import Footer from '../components/Footer'
import CookieConsent from '../components/CookieConsent'

export const metadata = {
  title: 'DigiBdayWish ✨ - Digital Birthday Gift Creator',
  description: 'Create and share magical, personalized digital birthday wishes with animations and music!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LYB4JS7980"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-LYB4JS7980');
            `
          }}
        />
      </head>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}
