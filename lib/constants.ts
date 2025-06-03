console.log(`Running server in ${process.env.NODE_ENV} mode`);

export const CONSTANTS = {
    TIMERS: {
        ALERT_COOLDOWN_MILISECONDS: 5 * 60 * 1000 // 5 minutos
    },
    PRICING: {
        HIGHLIGHTED_PLAN: "company",
        FIXED_PLAN: "free",
        WANT_MORE_PLAN: "enterprise",
        CORRESPONDENT_YEARLY_MONTHS: 10
    },
    UI: {
        NAVBAR_ROUTES: [
            { name: "Roadmap", path: "/roadmap" },
            { name: "Pricing", path: "/pricing" },
            { name: "Privacy", path: "/privacy-policy" },
            { name: "Contact", path: "/contact" }
        ]
    },
    CONTACT_EMAIL: "slackreserver@gmail.com",
    STRIPE: {
        VALID_SUBSCRIPTION_STATUSES: [
            "active"
        ]
    }
}
