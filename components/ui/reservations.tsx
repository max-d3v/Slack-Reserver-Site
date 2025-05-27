import prisma from "@/lib/db/db";
import { reservations, resource_groups, resources } from "@prisma/client";
import { CalendarCheck, Clock, CalendarX, Building, Users, Calendar, TrendingUp } from "lucide-react";
import { resolve } from "path";
import Stripe from "stripe";

export enum ReservationStatuses {
    CREATED = "created",
    ONGOING = "ongoing",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export type ReservationDetails = reservations & {
    resources: resources & {
        resource_groups: resource_groups
    }
}

const getReservations = async (tenantId: string): Promise<ReservationDetails[]> => {
    const data = await prisma.reservations.findMany({
        where: {
            tenant_id: tenantId,

        },
        include: {
            resources: {
                include: {
                    resource_groups: true
                }
            },
        }
    });

    return data;
}

export const ReservationStats = async ({ tenantId, product }: { tenantId: string | undefined, product: Stripe.Product }) => {
    const reservations = tenantId ? await getReservations(tenantId) : [];


    // Anchor dates
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());



    //Get valid reservation based on active resources and groups.
    const validReservations = reservations.filter(r => {
        return (r.resources.active && r.resources.resource_groups.active)
    });

    // Calculate upcoming reservations (start date is in the future)
    const upcomingReservations = validReservations.filter(r =>
        new Date(r.start_date) >= today
    );

    const finishedReservationsCount = reservations.length - upcomingReservations.length;


    // Get popular resources (most reserved)
    const resourceCounts = validReservations.reduce((acc, res) => {
        const resourceId = res.resource_id;
        acc[resourceId] = (acc[resourceId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);



    // Find most reserved resource
    let mostReservedResource: ReservationDetails["resources"] | null | undefined = null;
    let maxReservations = 0;

    for (const [resourceId, count] of Object.entries(resourceCounts)) {
        if (count > maxReservations) {
            maxReservations = count;
            mostReservedResource = validReservations.find(r => r.resource_id === resourceId)?.resources;
        }
    }


    // Calculate reservation utilization percentage based on plan
    const totalReservations = reservations.length;

    // Assume plan limits from pricing page - this should be dynamically determined
    // from the tenant's subscription in a real implementation

    const planLimit = product?.metadata.reservations ? parseInt(product.metadata.reservations, 10) : 0;
    const utilizationPercentage = Math.round((totalReservations / planLimit) * 100);



    const thisMonthReservations = validReservations.filter(r =>
        new Date(r.created_at) >= lastMonth
    );

    const averageDuration = validReservations.reduce((sum, r) => {
        const duration = new Date(r.end_date).getTime() - new Date(r.start_date).getTime();
        return sum + (duration / (1000 * 60 * 60)); // Convert to hours
    }, 0) / validReservations.length || 0;

    // Peak day analysis
    const dayStats = validReservations.reduce((acc, r) => {
        const day = new Date(r.start_date).getDay();
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
        acc[dayName] = (acc[dayName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const peakDay = Object.entries(dayStats).reduce((a, b) =>
        dayStats[a[0]] > dayStats[b[0]] ? a : b, ['Monday', 0]
    )[0];

    // Booking lead time
    const leadTimes = validReservations.map(r => {
        const created = new Date(r.created_at);
        const start = new Date(r.start_date);
        return (start.getTime() - created.getTime()) / (1000 * 60 * 60 * 24); // Days
    }).filter(days => days >= 0);

    const avgLeadTime = leadTimes.reduce((sum, days) => sum + days, 0) / leadTimes.length || 0;




    return (
        <div className="space-y-6">

            <br />

            <div className="grid grid-cols-1 gap-4">
                {/* Large card on top */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-700">Total Reservations</h3>
                        <CalendarCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold">{totalReservations}</p>
                    <div className="mt-3 h-3 w-full bg-gray-100 rounded-full">
                        <div
                            className={`h-3 rounded-full ${utilizationPercentage > 80 ? 'bg-amber-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{utilizationPercentage}% of plan limit</p>
                </div>

                {/* Grid for smaller cards below */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">Finished/Cancelled</h3>
                            <Clock className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="text-2xl font-bold mt-2">{finishedReservationsCount}</p>
                        <p className="text-xs text-gray-500 mt-1">Passed reservations</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">Upcoming (active)</h3>
                            <Calendar className="h-5 w-5 text-purple-500" />
                        </div>
                        <p className="text-2xl font-bold mt-2">{upcomingReservations.length}</p>
                        <p className="text-xs text-gray-500 mt-1">Future reservations</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">Top active Resource</h3>
                            <Building className="h-5 w-5 text-amber-500" />
                        </div>
                        <p className="text-xl font-semibold mt-2 truncate" title={mostReservedResource?.name || 'None'}>
                            {mostReservedResource?.name || 'None'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {maxReservations} reservations
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold mt-2">{thisMonthReservations.length}</p>
                        <p className="text-xs text-gray-500 mt-1">New reservations</p>
                    </div>


                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">Peak Day</h3>
                            <Calendar className="h-5 w-5 text-purple-500" />
                        </div>
                        <p className="text-lg font-semibold mt-2">{peakDay}</p>
                        <p className="text-xs text-gray-500 mt-1">Most bookings</p>
                    </div>

                </div>

            </div>
        </div>
    );
};