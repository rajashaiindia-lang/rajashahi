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
// models/Round.ts (add this BEFORE export default)
RoundSchema.pre('validate', function(next) {
    // @ts-ignore – tolerate legacy fields
    const openingTime = this.openingTime;
    // @ts-ignore
    const closingTime = this.closingTime;
    if (!this.dayTime && openingTime) this.dayTime = openingTime;
    if (!this.nightTime && closingTime) this.nightTime = closingTime;
    // Legacy result fields (best-effort)
    // @ts-ignore
    const openingPanna = this.openingPanna;
    // @ts-ignore
    const openingDigit = this.openingDigit;
    // @ts-ignore
    const closingPanna = this.closingPanna;
    // @ts-ignore
    const closingDigit = this.closingDigit;
    if (!this.dayPanna && openingPanna) this.dayPanna = openingPanna;
    if (this.dayDigit == null && openingDigit != null) this.dayDigit = openingDigit;
    if (!this.nightPanna && closingPanna) this.nightPanna = closingPanna;
    if (this.nightDigit == null && closingDigit != null) this.nightDigit = closingDigit;
    // Status bridge: allow old 'OPENING_PUBLISHED'
    // (you already added the enum, this is just a safety)
    // no mapping needed unless you want to force-convert:
    // if (this.status === 'OPENING_PUBLISHED') this.status = 'DAY_PUBLISHED';
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
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/helpers.ts [app-route] (ecmascript)");
;
;
;
;
const pad3 = (v)=>String(v ?? '').replace(/\D/g, '').slice(0, 3).padStart(3, '0');
async function PATCH(req, { params }) {
    // Normalize the URL param: remove zero-width chars etc., trim, and validate
    const raw = (params.sessionDate ?? '').normalize().trim();
    const sessionDate = raw.replace(/[^\d-]/g, ''); // keep only digits and hyphen
    if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Bad sessionDate in URL'
        }, {
            status: 400
        });
    }
    const body = await req.json().catch(()=>({}));
    const setDay = 'dayPanna' in body;
    const setNight = 'nightPanna' in body;
    if (!setDay && !setNight) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Provide dayPanna and/or nightPanna'
        }, {
            status: 400
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    const round = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
        sessionDate
    });
    if (!round) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: false,
        error: `No round for ${sessionDate}`
    }, {
        status: 404
    });
    // --- Update fields ---
    if (setDay) {
        if (body.dayPanna === null) {
            round.dayPanna = undefined;
            round.dayDigit = undefined;
        } else {
            const p = pad3(body.dayPanna);
            if (!/^\d{3}$/.test(p)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: 'dayPanna must be 000–999'
            }, {
                status: 400
            });
            round.dayPanna = p;
            round.dayDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    if (setNight) {
        if (body.nightPanna === null) {
            round.nightPanna = undefined;
            round.nightDigit = undefined;
        } else {
            const p = pad3(body.nightPanna);
            if (!/^\d{3}$/.test(p)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: 'nightPanna must be 000–999'
            }, {
                status: 400
            });
            round.nightPanna = p;
            round.nightDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["digitFromPanna"])(p);
        }
    }
    // --- Derive jodi + status automatically ---
    const haveDay = round.dayDigit !== undefined;
    const haveNight = round.nightDigit !== undefined;
    if (haveDay && haveNight) {
        round.jodi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deriveJodi"])(round.dayDigit, round.nightDigit);
        round.status = 'CLOSED';
    } else if (haveDay) {
        round.jodi = undefined;
        round.status = 'DAY_PUBLISHED';
    } else {
        round.jodi = undefined;
        round.status = 'READY';
    }
    await round.save();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        round
    });
}
async function DELETE(_req, { params }) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
    const { deletedCount } = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteOne({
        sessionDate: params.sessionDate
    });
    if (!deletedCount) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: false,
        error: 'Not found'
    }, {
        status: 404
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__cb4c63de._.js.map