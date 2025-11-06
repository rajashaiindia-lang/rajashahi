module.exports = {

"[project]/.next-internal/server/app/api/admin/rounds/[sessionDate]/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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
"[project]/models/Bet.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// models/Bet.ts
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const BetSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    guestId: {
        type: String,
        required: true,
        index: true
    },
    round: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: 'Round',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: [
            'SINGLE_DAY',
            'SINGLE_NIGHT',
            'JODI',
            'PANNA_DAY',
            'PANNA_NIGHT'
        ],
        required: true,
        index: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator (v) {
                switch(this.type){
                    case 'SINGLE_DAY':
                    case 'SINGLE_NIGHT':
                        return /^[0-9]$/.test(v);
                    case 'JODI':
                        return /^\d{2}$/.test(v);
                    case 'PANNA_DAY':
                    case 'PANNA_NIGHT':
                        return /^\d{3}$/.test(v);
                    default:
                        return false;
                }
            },
            message: 'Invalid number format for the selected bet type.'
        }
    },
    stakeTokens: {
        type: Number,
        default: 1,
        min: 0
    }
}, {
    timestamps: true
});
BetSchema.index({
    round: 1,
    type: 1
});
BetSchema.index({
    round: 1,
    guestId: 1
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Bet || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Bet', BetSchema);
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
"[project]/app/api/admin/rounds/[sessionDate]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/api/admin/rounds/[sessionDate]/route.ts
__turbopack_context__.s({
    "DELETE": ()=>DELETE,
    "PATCH": ()=>PATCH
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Round.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Bet$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Bet.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/helpers.ts [app-route] (ecmascript)");
;
;
;
;
;
const pad3 = (v)=>String(v ?? '').replace(/\D/g, '').slice(0, 3).padStart(3, '0');
const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;
function extractSessionDate(req) {
    const url = new URL(req.url);
    const rawParam = decodeURIComponent(url.pathname.split('/').pop() || '');
    const raw = rawParam.normalize().trim();
    const sessionDate = raw.replace(/[^\d-]/g, '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate)) return null;
    return sessionDate;
}
async function PATCH(req) {
    const sessionDate = extractSessionDate(req);
    if (!sessionDate) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Bad sessionDate in URL'
        }, {
            status: 400
        });
    }
    const body = await req.json().catch(()=>({}));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    let round = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
        sessionDate
    });
    // create round if missing
    if (!round) {
        round = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            roundId: 'R-' + sessionDate.replace(/-/g, ''),
            sessionDate,
            dayTime: '10:00',
            nightTime: '22:00',
            status: 'READY'
        });
    }
    // ---------- NEW: time fields ----------
    if (typeof body.dayOpenTime === 'string' && hhmm.test(body.dayOpenTime)) {
        round.dayOpenTime = body.dayOpenTime;
    }
    if (typeof body.dayCloseTime === 'string' && hhmm.test(body.dayCloseTime)) {
        round.dayCloseTime = body.dayCloseTime;
    }
    if (typeof body.nightOpenTime === 'string' && hhmm.test(body.nightOpenTime)) {
        round.nightOpenTime = body.nightOpenTime;
    }
    if (typeof body.nightCloseTime === 'string' && hhmm.test(body.nightCloseTime)) {
        round.nightCloseTime = body.nightCloseTime;
    }
    // figure out what we’re setting (same as before)
    const setDayLegacy = 'dayPanna' in body;
    const setNightLegacy = 'nightPanna' in body;
    const setDayOpen = 'dayOpenPanna' in body;
    const setDayClose = 'dayClosePanna' in body;
    const setNightOpen = 'nightOpenPanna' in body;
    const setNightClose = 'nightClosePanna' in body;
    if (!setDayLegacy && !setNightLegacy && !setDayOpen && !setDayClose && !setNightOpen && !setNightClose && // 👆 we added times, so allow PATCH with only times
    !('dayOpenTime' in body) && !('dayCloseTime' in body) && !('nightOpenTime' in body) && !('nightCloseTime' in body)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Provide at least one of: dayPanna, nightPanna, dayOpenPanna, dayClosePanna, nightOpenPanna, nightClosePanna, or any of the time fields'
        }, {
            status: 400
        });
    }
    // ----- legacy day -----
    if (setDayLegacy) {
        if (body.dayPanna === null) {
            round.dayPanna = undefined;
            round.dayDigit = undefined;
        } else {
            const p = pad3(body.dayPanna);
            if (!/^\d{3}$/.test(p)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: 'dayPanna must be 000–999'
                }, {
                    status: 400
                });
            }
            round.dayPanna = p;
            round.dayDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // ----- legacy night -----
    if (setNightLegacy) {
        if (body.nightPanna === null) {
            round.nightPanna = undefined;
            round.nightDigit = undefined;
        } else {
            const p = pad3(body.nightPanna);
            if (!/^\d{3}$/.test(p)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: 'nightPanna must be 000–999'
                }, {
                    status: 400
                });
            }
            round.nightPanna = p;
            round.nightDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // ----- DAY OPEN -----
    if (setDayOpen) {
        if (body.dayOpenPanna === null) {
            round.dayOpenPanna = undefined;
            round.dayOpenDigit = undefined;
        } else {
            const p = pad3(body.dayOpenPanna);
            if (!/^\d{3}$/.test(p)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: 'dayOpenPanna must be 000–999'
                }, {
                    status: 400
                });
            }
            round.dayOpenPanna = p;
            round.dayOpenDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // ----- DAY CLOSE -----
    if (setDayClose) {
        if (body.dayClosePanna === null) {
            round.dayClosePanna = undefined;
            round.dayCloseDigit = undefined;
        } else {
            const p = pad3(body.dayClosePanna);
            if (!/^\d{3}$/.test(p)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: 'dayClosePanna must be 000–999'
                }, {
                    status: 400
                });
            }
            round.dayClosePanna = p;
            round.dayCloseDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // ----- NIGHT OPEN -----
    if (setNightOpen) {
        if (body.nightOpenPanna === null) {
            round.nightOpenPanna = undefined;
            round.nightOpenDigit = undefined;
        } else {
            const p = pad3(body.nightOpenPanna);
            if (!/^\d{3}$/.test(p)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: 'nightOpenPanna must be 000–999'
                }, {
                    status: 400
                });
            }
            round.nightOpenPanna = p;
            round.nightOpenDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // ----- NIGHT CLOSE -----
    if (setNightClose) {
        if (body.nightClosePanna === null) {
            round.nightClosePanna = undefined;
            round.nightCloseDigit = undefined;
        } else {
            const p = pad3(body.nightClosePanna);
            if (!/^\d{3}$/.test(p)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: 'nightClosePanna must be 000–999'
                }, {
                    status: 400
                });
            }
            round.nightClosePanna = p;
            round.nightCloseDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // recompute day line
    const haveDayOpen = round.dayOpenDigit != null;
    const haveDayClose = round.dayCloseDigit != null;
    if (haveDayOpen && haveDayClose) {
        round.dayJodi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deriveJodi"])(round.dayOpenDigit, round.dayCloseDigit);
        // @ts-ignore
        round.dayLineStatus = 'CLOSED';
    } else if (haveDayOpen) {
        // @ts-ignore
        round.dayLineStatus = 'OPEN_PUBLISHED';
        round.dayJodi = undefined;
    } else {
        // @ts-ignore
        round.dayLineStatus = 'READY';
        round.dayJodi = undefined;
    }
    // recompute night line
    const haveNightOpen2 = round.nightOpenDigit != null;
    const haveNightClose2 = round.nightCloseDigit != null;
    if (haveNightOpen2 && haveNightClose2) {
        round.nightJodi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deriveJodi"])(round.nightOpenDigit, round.nightCloseDigit);
        // @ts-ignore
        round.nightLineStatus = 'CLOSED';
    } else if (haveNightOpen2) {
        // @ts-ignore
        round.nightLineStatus = 'OPEN_PUBLISHED';
        round.nightJodi = undefined;
    } else {
        // @ts-ignore
        round.nightLineStatus = 'READY';
        round.nightJodi = undefined;
    }
    await round.save();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        round
    });
}
async function DELETE(req) {
    const sessionDate = extractSessionDate(req);
    if (!sessionDate) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Bad sessionDate in URL'
        }, {
            status: 400
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    // find the round first (so we can also delete bets that point to it)
    const round = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
        sessionDate
    });
    if (!round) {
        // UI will show “Deleted successfully!” if we just return ok
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            note: 'Round not found (already deleted?)'
        });
    }
    // delete bets for that round (optional but nice to keep DB clean)
    await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Bet$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteMany({
        round: round._id
    });
    // delete the round itself
    await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteOne({
        _id: round._id
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__48bc76eb._.js.map