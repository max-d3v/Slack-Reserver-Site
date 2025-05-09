import prisma from "@/lib/db/db";
import { CalendarCheck, Clock, CalendarX, Building, Users, Calendar } from "lucide-react";
import { resolve } from "path";

export enum ReservationStatuses {
    CREATED = "created",
    ONGOING = "ongoing",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

const getReservations = async (tenantId: string) => {
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

export const ReservationStats = async ({ tenantId }: { tenantId: string }) => {
    const reservations = await getReservations(tenantId);

    // Get current date for comparisons
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    console.log(reservations);

    //Get valid reservation based on active resources and groups.
    const validReservations = reservations.filter(r => {
        return (r.resources.active && r.resources.resource_groups.active)
    });

    console.log("valid ones: ", validReservations);

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
    let mostReservedResource = null;
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
    const planLimit = 250; // Default to pro plan limit
    const utilizationPercentage = Math.round((totalReservations / planLimit) * 100);

    // Count participants
    const participantCount = reservations.reduce((count, res) => {
        // Each reservation has at least one participant (the organizer)
        return count + 1;
    }, 0);

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
                            <h3 className="text-sm font-medium text-gray-500">Finished/Deleted</h3>
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
            </div>
        </div>
    );
};