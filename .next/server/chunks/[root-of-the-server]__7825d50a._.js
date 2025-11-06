module.exports = {

"[project]/.next-internal/server/app/api/result/latest/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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
"[project]/utils/helpers.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// utils/helpers.ts
/**
 * Given a panna (3-digit string like "160"), return the derived digit.
 * Rule: sum of digits % 10
 */ __turbopack_context__.s({
    "deriveJodi": ()=>deriveJodi,
    "digitFromPanna": ()=>digitFromPanna,
    "formatResult": ()=>formatResult,
    "generateRoundId": ()=>generateRoundId,
    "randomPanna": ()=>randomPanna
});
function digitFromPanna(panna) {
    if (!/^\d{3}$/.test(panna)) {
        throw new Error(`Invalid panna: ${panna}`);
    }
    const sum = [
        ...panna
    ].reduce((acc, ch)=>acc + Number(ch), 0);
    return sum % 10;
}
function randomPanna() {
    return String(Math.floor(Math.random() * 1000)).padStart(3, '0');
}
function deriveJodi(openingDigit, closingDigit) {
    if (closingDigit === undefined) return undefined;
    return `${openingDigit}${closingDigit}`;
}
function formatResult(openingPanna, openingDigit, closingDigit, closingPanna) {
    if (!openingPanna || openingDigit === undefined) return '';
    if (!closingPanna || closingDigit === undefined) {
        // Only opening published
        return `(${openingPanna}) ${openingDigit} | ?`;
    }
    return `(${openingPanna}) ${openingDigit} | ${closingDigit} (${closingPanna})`;
}
function generateRoundId() {
    const d = new Date();
    const s = d.toISOString().replace(/[-:T]/g, '').slice(0, 14);
    return s; // e.g. "20251001123456"
}
}),
"[project]/app/api/result/latest/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Round.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/helpers.ts [app-route] (ecmascript)");
;
;
;
;
function isNowBeforeIST(sessionDate, hhmm) {
    if (!hhmm) return false;
    const target = new Date(`${sessionDate}T${hhmm}:00+05:30`);
    return new Date() < target;
}
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const side = searchParams.get('side') || 'day';
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    const round = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({}).sort({
        sessionDate: -1,
        createdAt: -1
    }).lean();
    if (!round) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'No round'
        }, {
            status: 404
        });
    }
    // grab legacy times
    const legacyDayTime = round.dayTime || null;
    const legacyNightTime = round.nightTime || null;
    // ===== DAY =====
    const dayHasExplicitOpenTime = !!round.dayOpenTime && round.dayOpenTime !== legacyDayTime;
    const dayHasExplicitCloseTime = !!round.dayCloseTime && round.dayCloseTime !== legacyDayTime;
    const dayOpenTooEarly = dayHasExplicitOpenTime && isNowBeforeIST(round.sessionDate, round.dayOpenTime);
    const dayCloseTooEarly = dayHasExplicitCloseTime && isNowBeforeIST(round.sessionDate, round.dayCloseTime);
    const dayOpenPannaRaw = round.dayOpenPanna ?? round.dayPanna ?? null;
    const dayOpenDigitRaw = round.dayOpenDigit ?? round.dayDigit ?? null;
    const dayClosePannaRaw = round.dayClosePanna ?? null;
    const dayCloseDigitRaw = round.dayCloseDigit ?? null;
    const dayOpenPanna = dayOpenTooEarly ? null : dayOpenPannaRaw;
    const dayOpenDigit = dayOpenTooEarly ? null : dayOpenDigitRaw;
    const dayClosePanna = dayCloseTooEarly ? null : dayClosePannaRaw;
    const dayCloseDigit = dayCloseTooEarly ? null : dayCloseDigitRaw;
    const haveDayOpen = dayOpenDigit != null;
    const haveDayClose = dayCloseDigit != null;
    const dayLineStatus = haveDayOpen ? haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED' : 'READY';
    const dayJodi = haveDayOpen && haveDayClose ? round.dayJodi ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deriveJodi"])(dayOpenDigit, dayCloseDigit) : null;
    // ===== NIGHT =====
    const nightHasExplicitOpenTime = !!round.nightOpenTime && round.nightOpenTime !== legacyNightTime;
    const nightHasExplicitCloseTime = !!round.nightCloseTime && round.nightCloseTime !== legacyNightTime;
    const nightOpenTooEarly = nightHasExplicitOpenTime && isNowBeforeIST(round.sessionDate, round.nightOpenTime);
    const nightCloseTooEarly = nightHasExplicitCloseTime && isNowBeforeIST(round.sessionDate, round.nightCloseTime);
    const nightOpenPannaRaw = round.nightOpenPanna ?? round.nightPanna ?? null;
    const nightOpenDigitRaw = round.nightOpenDigit ?? round.nightDigit ?? null;
    const nightClosePannaRaw = round.nightClosePanna ?? null;
    const nightCloseDigitRaw = round.nightCloseDigit ?? null;
    const nightOpenPanna = nightOpenTooEarly ? null : nightOpenPannaRaw;
    const nightOpenDigit = nightOpenTooEarly ? null : nightOpenDigitRaw;
    const nightClosePanna = nightCloseTooEarly ? null : nightClosePannaRaw;
    const nightCloseDigit = nightCloseTooEarly ? null : nightCloseDigitRaw;
    const haveNightOpen = nightOpenDigit != null;
    const haveNightClose = nightCloseDigit != null;
    const nightLineStatus = haveNightOpen ? haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED' : 'READY';
    const nightJodi = haveNightOpen && haveNightClose ? round.nightJodi ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deriveJodi"])(nightOpenDigit, nightCloseDigit) : null;
    // side-specific response
    if (side === 'night') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            sessionDate: round.sessionDate,
            status: nightLineStatus,
            jodi: nightJodi,
            nightPanna: nightOpenPanna,
            nightDigit: nightOpenDigit,
            nightClosePanna,
            nightCloseDigit
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        sessionDate: round.sessionDate,
        status: dayLineStatus,
        jodi: dayJodi,
        dayPanna: dayOpenPanna,
        dayDigit: dayOpenDigit,
        dayClosePanna,
        dayCloseDigit
    });
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7825d50a._.js.map