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
import { CalendarIcon, CreditCard, Clock, Users, CheckCircle } from "lucide-react"
import { auth } from '../auth'
import * as utils from "@/lib/utils/functions";
import { ReservationStats } from '@/components/ui/reservations'
import { LoadingStats } from '@/components/ui/loadingReservations'
import prisma from "@/lib/db/db";




const Page = async () => {
  const { user } = await auth();
  const activeSubscription = user.tenant?.tenant_subscriptions?.[0];
  const plan = activeSubscription?.plans;
  
  const subscription = {
    plan: plan?.name ?? "No active plan",
    description: plan?.description ?? "No description available",
    price: plan && plan.price ? `$${plan.price}/${plan.billing_interval}` : "—",
    billingCycle: plan?.billing_interval === "monthly" ? "Monthly" : "Yearly",
    nextBillingDate: plan ? "Coming soon" : "—",
    features: plan?.features ?? {},
    status: activeSubscription?.status ?? "Inactive",
    isActive: activeSubscription?.status === "active"
  };


  return (
    <div className='container mt-[10vh] mb-20'>
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1 border-t-4 border-t-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-5">
            <Avatar className="w-32 h-32 border-2 border-primary/20">
              <AvatarImage src={user.image} alt={user.image} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-3 text-center w-full">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge variant="outline" className="bg-primary/10 hover:bg-primary/15 text-primary border-primary/30 px-3 py-1">
                {user.role}
              </Badge>
            </div>
            <div className="w-full pt-4 border-t flex items-center gap-2 justify-center text-muted-foreground">
              <Clock className="h-4 w-4" />
              <p className="text-sm">Member since: {user.joinedDate}</p>
            </div>
          </CardContent>

        </Card>

        <Card className="md:col-span-2 border-t-4 border-t-[#4A154B] shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#4A154B]" />
              Your Usage
            </CardTitle>
            <CardDescription>Information about your reservations</CardDescription>
            <Suspense fallback={<LoadingStats />}>
              <ReservationStats tenantId={user.tenant?.id} />
            </Suspense>
          </CardHeader>
        </Card>
      </div>

      <Card className="w-full border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Subscription Plan
          </CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="bg-gray-50 p-5 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">{subscription.plan}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                    {subscription.status}
                  </Badge>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-2xl font-bold">{subscription.price}</p>
                  <p className="text-sm text-muted-foreground">Billed {subscription.billingCycle.toLowerCase()}</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    Next billing: {subscription.nextBillingDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <div className="h-full">
                <h3 className="text-lg font-medium mb-4">Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(subscription.features).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>{utils.makeTitle(feature)}: {subscription.features[feature]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <form action="/api/create-customer-portal-session" method="POST">
            <button className="bg-green-600 text-white hover:bg-green-700 px-4 py-2.5 rounded-md flex items-center gap-2 font-medium sm:order-2">
              <CreditCard className="h-4 w-4" /> Manage Subscription
            </button>
          </form>
          <form action="/api/create-customer-portal-session" method="POST">
            <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-md flex items-center gap-2 font-medium w-full sm:w-auto sm:order-1">
              View Billing History
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page