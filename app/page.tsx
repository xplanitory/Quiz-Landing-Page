import { AssetFinanceQuiz } from "@/components/asset-finance-quiz"
import { Car, Cog, Clock, BadgeCheck, ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a 
            href="https://www.spidifinance.com.au" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold text-lg text-foreground hover:text-accent transition-colors"
          >
            <span className="font-bold">Spidi</span>
            <span className="text-muted-foreground font-normal">Finance</span>
          </a>
          
          <a 
            href="https://www.spidifinance.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Visit Main Site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero Section with Quiz */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <AssetFinanceQuiz />
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Why Choose Spidi Finance?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make asset finance simple, fast, and tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Wide Range of Assets</h3>
              <p className="text-sm text-muted-foreground">
                Vehicles, equipment, machinery, and more. We finance what you need.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Fast Approvals</h3>
              <p className="text-sm text-muted-foreground">
                Get pre-approval within 24 hours. No lengthy paperwork delays.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
                <Cog className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Tailored Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Custom finance structures designed to suit your cash flow.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
                <BadgeCheck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Expert Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated brokers who understand your industry and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm">Businesses Financed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">$50M+</div>
              <div className="text-sm">Total Finance Arranged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">24hr</div>
              <div className="text-sm">Pre-Approval Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">4.9★</div>
              <div className="text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <a 
                href="https://www.spidifinance.com.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-accent transition-colors"
              >
                Spidi Finance
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                Your trusted partner in asset finance solutions.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a 
                href="https://www.spidifinance.com.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                www.spidifinance.com.au
              </a>
              <a 
                href="mailto:matt@spidifinance.com.au"
                className="hover:text-foreground transition-colors"
              >
                matt@spidifinance.com.au
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Spidi Finance. All rights reserved. Australian Credit Licence.
          </div>
        </div>
      </footer>
    </div>
  )
}
