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
    // old
    dayTime: {
        type: String,
        required: true,
        match: timeHHmm
    },
    nightTime: {
        type: String,
        required: true,
        match: timeHHmm
    },
    // new optional times
    dayOpenTime: {
        type: String,
        match: timeHHmm,
        default: undefined
    },
    dayCloseTime: {
        type: String,
        match: timeHHmm,
        default: undefined
    },
    nightOpenTime: {
        type: String,
        match: timeHHmm,
        default: undefined
    },
    nightCloseTime: {
        type: String,
        match: timeHHmm,
        default: undefined
    },
    // DAY line
    dayOpenPanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    dayOpenDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    dayClosePanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    dayCloseDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    dayJodi: {
        type: String,
        match: jodi2,
        default: undefined
    },
    dayLineStatus: {
        type: String,
        enum: [
            'READY',
            'OPEN_PUBLISHED',
            'CLOSED'
        ],
        default: 'READY'
    },
    // NIGHT line
    nightOpenPanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    nightOpenDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    nightClosePanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    nightCloseDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    nightJodi: {
        type: String,
        match: jodi2,
        default: undefined
    },
    nightLineStatus: {
        type: String,
        enum: [
            'READY',
            'OPEN_PUBLISHED',
            'CLOSED'
        ],
        default: 'READY'
    },
    // legacy
    dayPanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    dayDigit: {
        type: Number,
        min: 0,
        max: 9,
        default: undefined
    },
    nightPanna: {
        type: String,
        match: panna3,
        default: undefined
    },
    nightDigit: {
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
            'DAY_PUBLISHED',
            'CLOSED'
        ],
        default: 'READY',
        required: true
    }
}, {
    timestamps: true
});
RoundSchema.index({
    sessionDate: 1
}, {
    unique: true
});
// keep your legacy pre-validate but extend it
RoundSchema.pre('validate', function(next) {
    // legacy names to new names
    // @ts-ignore
    const openingTime = this.openingTime;
    // @ts-ignore
    const closingTime = this.closingTime;
    // if new times missing, fall back to old ones
    if (!this.dayOpenTime) this.dayOpenTime = this.dayTime || openingTime;
    if (!this.dayCloseTime) this.dayCloseTime = this.dayTime || closingTime;
    if (!this.nightOpenTime) this.nightOpenTime = this.nightTime || openingTime;
    if (!this.nightCloseTime) this.nightCloseTime = this.nightTime || closingTime;
    // legacy result fields
    // @ts-ignore
    const openingPanna = this.openingPanna;
    // @ts-ignore
    const openingDigit = this.openingDigit;
    // @ts-ignore
    const closingPanna = this.closingPanna;
    // @ts-ignore
    const closingDigit = this.closingDigit;
    // map old day → dayOpen
    if (!this.dayOpenPanna && (this.dayPanna || openingPanna)) {
        this.dayOpenPanna = this.dayPanna || openingPanna;
    }
    if (this.dayOpenDigit == null && (this.dayDigit != null || openingDigit != null)) {
        this.dayOpenDigit = this.dayDigit ?? openingDigit;
    }
    // map old night → nightOpen
    if (!this.nightOpenPanna && (this.nightPanna || closingPanna)) {
        this.nightOpenPanna = this.nightPanna || closingPanna;
    }
    if (this.nightOpenDigit == null && (this.nightDigit != null || closingDigit != null)) {
        this.nightOpenDigit = this.nightDigit ?? closingDigit;
    }
    next();
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Round || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Round', RoundSchema);
}),
"[project]/app/api/result/history/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/api/result/history/route.ts
__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Round.ts [app-route] (ecmascript)");
;
;
;
// helper to get month range
function monthBounds(yyyyMM) {
    const [Y, M] = yyyyMM.split('-').map(Number);
    const start = new Date(Date.UTC(Y, M - 1, 1, 0, 0, 0));
    const next = new Date(Date.UTC(Y, M, 1, 0, 0, 0));
    const lo = start.toISOString().slice(0, 10);
    const hi = next.toISOString().slice(0, 10);
    return {
        lo,
        hi
    };
}
function addDaysUTC(d, n) {
    const x = new Date(d);
    x.setUTCDate(x.getUTCDate() + n);
    return x;
}
async function GET(req) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month'); // 'YYYY-MM'
    const limitRaw = searchParams.get('limit');
    const weeksRaw = searchParams.get('weeks'); // '24'
    const endParam = searchParams.get('end'); // 'YYYY-MM-DD'
    const side = searchParams.get('side'); // 'day' | 'night' | null
    const limit = Number(limitRaw ?? 0);
    const filter = {};
    let lo;
    let hi;
    if (month) {
        // month mode
        const { lo: _lo, hi: _hi } = monthBounds(month);
        lo = _lo;
        hi = _hi;
    } else if (weeksRaw) {
        // weeks mode (like your previous code)
        const weeks = Math.max(1, Math.min(52, Number(weeksRaw) || 24));
        // figure out latest sessionDate as end (or use ?end=)
        const latest = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({}).sort({
            sessionDate: -1
        }).select('sessionDate').lean();
        const endDateStr = endParam || latest?.sessionDate;
        if (!endDateStr) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                items: []
            });
        }
        const end = new Date(`${endDateStr}T00:00:00Z`);
        const start = addDaysUTC(end, -(weeks * 7) + 1);
        lo = start.toISOString().slice(0, 10);
        hi = addDaysUTC(end, 1).toISOString().slice(0, 10);
    }
    if (lo && hi) {
        filter.sessionDate = {
            $gte: lo,
            $lt: hi
        };
    }
    // pull all needed fields, including the new ones
    const rounds = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(filter).sort({
        sessionDate: 1
    }).select('sessionDate ' + 'dayOpenPanna dayOpenDigit dayClosePanna dayCloseDigit dayJodi dayLineStatus ' + 'nightOpenPanna nightOpenDigit nightClosePanna nightCloseDigit nightJodi nightLineStatus ' + // legacy
    'dayPanna dayDigit nightPanna nightDigit jodi status').lean();
    // now map to a consistent shape
    const mapped = rounds.map((r)=>{
        // ----- DAY LINE -----
        // try new fields first, then fall back to legacy
        const dayOpenPanna = r.dayOpenPanna ?? r.dayPanna ?? null;
        const dayOpenDigit = r.dayOpenDigit ?? r.dayDigit ?? null;
        const dayClosePanna = r.dayClosePanna ?? null;
        const dayCloseDigit = r.dayCloseDigit ?? null;
        // if both open+close exist, prefer stored dayJodi, else derive from digits
        const haveDayOpen = dayOpenDigit !== null && dayOpenDigit !== undefined;
        const haveDayClose = dayCloseDigit !== null && dayCloseDigit !== undefined;
        const dayJodi = haveDayOpen && haveDayClose ? r.dayJodi ?? `${dayOpenDigit}${dayCloseDigit}` : null;
        // a status for day-line, default to READY
        const dayLineStatus = r.dayLineStatus ? r.dayLineStatus : haveDayOpen ? haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED' : 'READY';
        // ----- NIGHT LINE -----
        const nightOpenPanna = r.nightOpenPanna ?? r.nightPanna ?? null;
        const nightOpenDigit = r.nightOpenDigit ?? r.nightDigit ?? null;
        const nightClosePanna = r.nightClosePanna ?? null;
        const nightCloseDigit = r.nightCloseDigit ?? null;
        const haveNightOpen = nightOpenDigit !== null && nightOpenDigit !== undefined;
        const haveNightClose = nightCloseDigit !== null && nightCloseDigit !== undefined;
        const nightJodi = haveNightOpen && haveNightClose ? r.nightJodi ?? `${nightOpenDigit}${nightCloseDigit}` : null;
        const nightLineStatus = r.nightLineStatus ? r.nightLineStatus : haveNightOpen ? haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED' : 'READY';
        // legacy bridge for top-level status (UI that still reads r.status)
        const topStatus = r.status === 'OPENING_PUBLISHED' ? 'DAY_PUBLISHED' : r.status;
        return {
            sessionDate: r.sessionDate,
            status: topStatus,
            day: {
                openPanna: dayOpenPanna,
                openDigit: dayOpenDigit,
                closePanna: dayClosePanna,
                closeDigit: dayCloseDigit,
                jodi: dayJodi,
                status: dayLineStatus
            },
            night: {
                openPanna: nightOpenPanna,
                openDigit: nightOpenDigit,
                closePanna: nightClosePanna,
                closeDigit: nightCloseDigit,
                jodi: nightJodi,
                status: nightLineStatus
            }
        };
    });
    // allow side=day or side=night for simpler components
    let items = mapped;
    if (side === 'day') {
        items = mapped.map((m)=>({
                sessionDate: m.sessionDate,
                ...m.day
            }));
    } else if (side === 'night') {
        items = mapped.map((m)=>({
                sessionDate: m.sessionDate,
                ...m.night
            }));
    }
    // keep your old behaviour: if no month/weeks and limit is set, slice from the end
    if (!month && !weeksRaw && limit && items.length > limit) {
        items = items.slice(-limit);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        items
    });
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__9587d243._.js.map