import React, { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  CalendarIcon,
  CreditCard,
  Clock,
  Users,
  CheckCircle,
  CircleFadingArrowUp,
  Crown,
  Star,
  Zap,
  Settings,
  ExternalLink,
  Calendar,
  TrendingUp
} from "lucide-react"
import { auth } from '../auth'
import * as utils from "@/lib/utils/functions";
import { ReservationStats } from '@/components/ui/reservations'
import { LoadingStats } from '@/components/ui/loadingReservations'
import Stripe from 'stripe'

const Page = async () => {
  const { user } = await auth();
  const stripeSubscription = user.subscription as Stripe.SubscriptionItem | (Stripe.SubscriptionItem & {
    price: Stripe.Price & {
      product: Stripe.Product | undefined;
    };
  }) | undefined;

  const product = stripeSubscription?.price.product && typeof stripeSubscription?.price.product !== "string" ? stripeSubscription?.price.product as Stripe.Product : undefined;
  const status = product ? "Active" : "No active plan";
  const price = stripeSubscription?.price;

  const subscription = {
    plan: product?.name ?? "No active plan",
    price: price && price?.unit_amount
      ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price.unit_amount / 100)
      : "—",
    billingCycle: price ? price.recurring?.interval === "month" ? "Monthly" : "Yearly" : undefined,
    nextBillingDate: "Coming soon",
    features: product?.metadata ?? {},
    status: status,
  };

  //console.log(subscription)

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#4A154B] to-[#611f64] text-white">
        <div className="container py-12 md:py-20 pt-16 md:pt-28">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/20 shadow-2xl">
                <AvatarImage src={user.image} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-4xl bg-white/10 text-white backdrop-blur-sm">
                  {utils.capitalizeName(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center md:text-left space-y-4 flex-1">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{utils.capitalizeName(user.name)}</h1>
                <p className="text-xl text-white/80 mb-4">{user.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 text-sm backdrop-blur-sm border-white/30">
                    <Users className="h-4 w-4 mr-2" />
                    {user.role}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-100 hover:bg-green-500/30 px-4 py-2 text-sm backdrop-blur-sm border-green-400/30">
                    <Crown className="h-4 w-4 mr-2" />
                    {subscription.plan}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/70 justify-center md:justify-start">
                <Clock className="h-4 w-4" />
                <span>Member since {utils.dateDisplay(user.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container -mt-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:grid-rows-1 lg:items-start">

          {/* Stats Section */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="p-2 bg-[#4A154B]/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-[#4A154B]" />
                    </div>
                    Usage Analytics
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    This Month
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Track your reservation activity and workspace utilization
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Suspense fallback={<LoadingStats />}>
                  {product ? <ReservationStats tenantId={user.tenant?.id} product={product} /> : <div className="text-center text-gray-500 p-6">No product data available</div>}
                </Suspense>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Section */}
          <div className="flex flex-col h-full">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 flex-1 flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Crown className="h-5 w-5 text-green-600" />
                  </div>
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="text-center p-6 bg-white/80 rounded-xl border border-green-200/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{subscription.plan}</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {subscription.status}
                    </Badge>
                  </div>

                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {subscription.price}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {subscription.billingCycle ? `Billed ${subscription.billingCycle.toLowerCase()}` : ""}
                  </p>

                  <Separator className="my-4" />

                </div>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Star className="h-4 w-4 text-green-600" />
                    Plan Features
                  </h4>
                  <div className="space-y-2">
                    {Object.keys(subscription.features).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{utils.makeTitle(feature)}:</span>
                          <span className="text-gray-600 ml-1">{subscription.features[feature]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 mt-auto">
                  <form action="/pricing" method="POST" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      <CircleFadingArrowUp className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </form>

                  <div className="grid grid-cols-1 gap-2">
                    <form action="/api/create-customer-portal-session" method="GET">
                      <Button variant="outline" className="w-full hover:bg-gray-50">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage Billing
                      </Button>
                    </form>

                    <form action="/api/create-customer-portal-session" method="GET">
                      <Button variant="ghost" className="w-full text-sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Billing History
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page