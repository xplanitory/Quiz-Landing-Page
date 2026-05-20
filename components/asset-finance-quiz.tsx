"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"

type QuizStep = "intro" | "questions" | "contact" | "success"

interface QuizAnswers {
  assetType: string
  purchaseTimeline: string
  businessAge: string
  financeAmount: string
}

interface ContactInfo {
  name: string
  email: string
  phone: string
  message: string
}

const assetTypes = [
  { id: "vehicle", label: "Vehicle (Car, Ute, Truck)", icon: "🚗" },
  { id: "equipment", label: "Equipment & Machinery", icon: "⚙️" },
  { id: "construction", label: "Construction Equipment", icon: "🏗️" },
  { id: "medical", label: "Medical Equipment", icon: "🏥" },
  { id: "technology", label: "IT & Technology", icon: "💻" },
  { id: "other", label: "Other Asset", icon: "📦" },
]

const purchaseTimelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "1month", label: "Within 1 month" },
  { id: "3months", label: "1-3 months" },
  { id: "exploring", label: "Just exploring options" },
]

const businessAges = [
  { id: "new", label: "Less than 1 year" },
  { id: "1-2", label: "1-2 years" },
  { id: "3-5", label: "3-5 years" },
  { id: "5plus", label: "5+ years" },
]

const financeAmounts = [
  { id: "under25k", label: "Under $25,000" },
  { id: "25-50k", label: "$25,000 - $50,000" },
  { id: "50-100k", label: "$50,000 - $100,000" },
  { id: "100-250k", label: "$100,000 - $250,000" },
  { id: "250kplus", label: "$250,000+" },
]

export function AssetFinanceQuiz() {
  const [step, setStep] = useState<QuizStep>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    assetType: "",
    purchaseTimeline: "",
    businessAge: "",
    financeAmount: "",
  })
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const questions = [
    {
      key: "assetType" as keyof QuizAnswers,
      title: "What type of asset are you looking to finance?",
      options: assetTypes,
      hasIcons: true,
    },
    {
      key: "purchaseTimeline" as keyof QuizAnswers,
      title: "When are you looking to make this purchase?",
      options: purchaseTimelines,
      hasIcons: false,
    },
    {
      key: "businessAge" as keyof QuizAnswers,
      title: "How long has your business been operating?",
      options: businessAges,
      hasIcons: false,
    },
    {
      key: "financeAmount" as keyof QuizAnswers,
      title: "What is your estimated finance amount?",
      options: financeAmounts,
      hasIcons: false,
    },
  ]

  const handleAnswerSelect = (questionKey: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }))
    
    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setStep("contact")
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    } else {
      setStep("intro")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, contactInfo }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      setStep("success")
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercentage = step === "questions" 
    ? ((currentQuestion + 1) / questions.length) * 100
    : step === "contact" ? 100 : 0

  if (step === "intro") {
    return (
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          2-Minute Quiz
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight text-balance">
          Find Your Perfect
          <br />
          <span className="text-accent">Asset Finance</span> Solution
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Answer a few quick questions and get personalized finance options tailored to your business needs. No commitment, just clarity.
        </p>
        
        <Button 
          size="lg"
          onClick={() => setStep("questions")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full"
        >
          Start Quiz
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" />
            No credit check required
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" />
            Free consultation
          </div>
        </div>
      </div>
    )
  }

  if (step === "questions") {
    const question = questions[currentQuestion]
    
    return (
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-balance">
            {question.title}
          </h2>

          <div className={`grid gap-3 ${question.hasIcons ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(question.key, option.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-accent hover:bg-accent/5 ${
                  answers[question.key] === option.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  {"icon" in option && (
                    <span className="text-2xl">{option.icon}</span>
                  )}
                  <span className="font-medium text-foreground">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    )
  }

  if (step === "contact") {
    return (
      <div className="w-full max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Great! Almost there...
          </h2>
          <p className="text-muted-foreground">
            Enter your details and we&apos;ll send you personalized finance options within 24 hours.
          </p>
        </div>

        <Card className="p-6 md:p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name *
              </label>
              <Input
                id="name"
                type="text"
                required
                value={contactInfo.name}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="John Smith"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={contactInfo.email}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="john@business.com.au"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number *
              </label>
              <Input
                id="phone"
                type="tel"
                required
                value={contactInfo.phone}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="0400 000 000"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Additional Details (Optional)
              </label>
              <textarea
                id="message"
                value={contactInfo.message}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us more about your requirements..."
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {submitError && (
              <p className="text-destructive text-sm">{submitError}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to be contacted by Spidi Finance regarding your enquiry.
            </p>
          </form>
        </Card>

        <Button
          variant="ghost"
          onClick={() => {
            setCurrentQuestion(questions.length - 1)
            setStep("questions")
          }}
          className="mx-auto flex text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to quiz
        </Button>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="text-center space-y-8 max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full">
          <Check className="h-10 w-10 text-accent" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          Thank You, {contactInfo.name.split(" ")[0]}!
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          We&apos;ve received your enquiry and will be in touch within 24 hours with personalized asset finance options.
        </p>

        <Card className="p-6 bg-card border-border text-left">
          <h3 className="font-semibold text-foreground mb-4">Your Quiz Summary:</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Asset Type:</dt>
              <dd className="font-medium text-foreground">
                {assetTypes.find((a) => a.id === answers.assetType)?.label}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Timeline:</dt>
              <dd className="font-medium text-foreground">
                {purchaseTimelines.find((t) => t.id === answers.purchaseTimeline)?.label}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Business Age:</dt>
              <dd className="font-medium text-foreground">
                {businessAges.find((b) => b.id === answers.businessAge)?.label}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Finance Amount:</dt>
              <dd className="font-medium text-foreground">
                {financeAmounts.find((f) => f.id === answers.financeAmount)?.label}
              </dd>
            </div>
          </dl>
        </Card>

        <div className="pt-4">
          <p className="text-muted-foreground mb-4">
            In the meantime, learn more about our services:
          </p>
          <Button
            asChild
            variant="outline"
            className="border-border hover:bg-secondary"
          >
            <a href="https://www.spidifinance.com.au" target="_blank" rel="noopener noreferrer">
              Visit spidifinance.com.au
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return null
}
