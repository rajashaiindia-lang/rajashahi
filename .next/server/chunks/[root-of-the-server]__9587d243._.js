module.exports = {

"[project]/.next-internal/server/app/api/result/history/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "dbConnect": ()=>dbConnect
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
}
let cached = global._mongoose;
if (!cached) cached = global._mongoose = {
    conn: null,
    promise: null
};
async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI).then((m)=>m);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/models/Round.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// models/Round.ts
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const timeHHmm = /^([01]\d|2[0-3]):[0-5]\d$/;
const panna3 = /^\d{3}$/;
const jodi2 = /^\d{2}$/;
const RoundSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    roundId: {
        type: String,
        required: true,
        unique: true
    },
    sessionDate: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
    },
    market: {
        type: String,
        default: 'KALYAN',
        required: true
    },
    openingTime: {
        type: String,
        required: true,
        match: timeHHmm
    },
    closingTime: {
        type: String,
        required: true,
        match: timeHHmm
    },
    openingPanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    openingDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    closingPanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    closingDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    jodi: {
        type: String,
        match: jodi2,
        default: undefined
    },
    status: {
        type: String,
        enum: [
            'READY',
            'OPENING_PUBLISHED',
            'CLOSED'
        ],
        default: 'READY',
        required: true
    }
}, {
    timestamps: true
});
// Helpful unique constraint to avoid duplicate market-day sessions:
RoundSchema.index({
    market: 1,
    sessionDate: 1
}, {
    unique: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Round || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Round', RoundSchema);
}),
"[project]/app/api/result/history/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Round.ts [app-route] (ecmascript)");
;
;
;
// Month helpers
function monthBounds(yyyyMM) {
    const [Y, M] = yyyyMM.split('-').map(Number);
    const start = new Date(Date.UTC(Y, M - 1, 1, 0, 0, 0));
    const next = new Date(Date.UTC(Y, M, 1, 0, 0, 0));
    const lo = start.toISOString().slice(0, 10); // inclusive
    const hi = next.toISOString().slice(0, 10); // exclusive
    return {
        lo,
        hi
    };
}
function addDays(d, n) {
    const x = new Date(d);
    x.setUTCDate(x.getUTCDate() + n);
    return x;
}
async function GET(req) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month'); // e.g. '2025-10'
    const limit = Number(searchParams.get('limit') ?? 0);
    const weeksParam = searchParams.get('weeks'); // e.g. '6'
    const endParam = searchParams.get('end'); // e.g. '2025-10-16'
    const market = searchParams.get('market') ?? 'KALYAN';
    const filter = {
        market
    };
    let lo;
    let hi;
    if (month) {
        const b = monthBounds(month);
        lo = b.lo;
        hi = b.hi;
    } else if (weeksParam) {
        // Allow up to 52 weeks (~1 year)
        const weeks = Math.max(1, Math.min(52, Number(weeksParam) || 6));
        let endDateStr = endParam;
        if (!endDateStr) {
            // 👇 Explicitly type the lean() result to avoid union [] | {} typings
            const latest = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                market
            }).sort({
                sessionDate: -1
            }).select('sessionDate').lean();
            if (!latest) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                items: []
            });
            endDateStr = latest.sessionDate;
        }
        const end = new Date(`${endDateStr}T00:00:00Z`);
        const start = addDays(end, -(weeks * 7) + 1); // inclusive
        lo = start.toISOString().slice(0, 10);
        hi = addDays(end, 1).toISOString().slice(0, 10); // exclusive
    }
    if (lo && hi) {
        filter.sessionDate = {
            $gte: lo,
            $lt: hi
        };
    }
    // 👇 Also type the array returned by lean()
    const rounds = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(filter).sort({
        sessionDate: 1
    }).select('sessionDate openingPanna closingPanna openingDigit closingDigit jodi status market').lean();
    const items = month || weeksParam || !limit ? rounds : rounds.slice(-limit);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        items
    });
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__9587d243._.js.map