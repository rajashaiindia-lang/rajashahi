(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/ResultRibbon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ResultRibbon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ResultRibbon(param) {
    let { side, sessionDate, status, dayPanna, dayDigit, nightPanna, nightDigit, dayClosePanna, dayCloseDigit, nightClosePanna, nightCloseDigit, jodi, onRefresh } = param;
    _s();
    const [spinning, setSpinning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const refresh = async ()=>{
        if (!onRefresh) return;
        setSpinning(true);
        try {
            await onRefresh();
        } finally{
            setSpinning(false);
        }
    };
    // Compose open/close display depending on side
    const mainLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ResultRibbon.useMemo[mainLine]": ()=>{
            if (side === 'day') {
                const openHas = dayDigit != null && dayPanna != null;
                const closeHas = dayCloseDigit != null && dayClosePanna != null;
                const open = openHas ? "(".concat(dayPanna, ") ").concat(dayDigit) : '(—) —';
                const close = closeHas ? "(".concat(dayClosePanna, ") ").concat(dayCloseDigit) : '(—)';
                return "".concat(open, " | ").concat(close);
            } else {
                const openHas = nightDigit != null && nightPanna != null;
                const closeHas = nightCloseDigit != null && nightClosePanna != null;
                const open = openHas ? "(".concat(nightPanna, ") ").concat(nightDigit) : '(—) —';
                const close = closeHas ? "(".concat(nightClosePanna, ") ").concat(nightCloseDigit) : '(—)';
                return "".concat(open, " | ").concat(close);
            }
        }
    }["ResultRibbon.useMemo[mainLine]"], [
        side,
        dayPanna,
        dayDigit,
        dayClosePanna,
        dayCloseDigit,
        nightPanna,
        nightDigit,
        nightClosePanna,
        nightCloseDigit
    ]);
    // Always show jodi row, with fallback '-'
    const jodiDisplay = jodi && jodi.trim() !== '' ? jodi : '-';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded border-2 border-red-700 bg-yellow-300 text-center py-5 px-3 shadow-[inset_0_0_0_2px_rgba(255,0,0,0.3)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 mb-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-block text-xs font-extrabold px-2 py-0.5 rounded-full border ".concat(side === 'day' ? 'bg-yellow-400 text-black border-yellow-700' : 'bg-purple-400 text-black border-purple-700'),
                    children: side.toUpperCase()
                }, void 0, false, {
                    fileName: "[project]/components/ResultRibbon.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ResultRibbon.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            sessionDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-700 mt-1",
                children: sessionDate
            }, void 0, false, {
                fileName: "[project]/components/ResultRibbon.tsx",
                lineNumber: 98,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-2xl font-bold font-mono",
                children: mainLine
            }, void 0, false, {
                fileName: "[project]/components/ResultRibbon.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-700 mt-1",
                children: [
                    "Jodi: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: jodiDisplay
                    }, void 0, false, {
                        fileName: "[project]/components/ResultRibbon.tsx",
                        lineNumber: 105,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ResultRibbon.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            onRefresh && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: refresh,
                className: "mt-3 inline-block rounded-full bg-yellow-400/90 px-4 py-1.5 text-sm font-semibold shadow hover:bg-yellow-400 border border-yellow-600",
                children: spinning ? 'Refreshing…' : 'Refresh Result'
            }, void 0, false, {
                fileName: "[project]/components/ResultRibbon.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ResultRibbon.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(ResultRibbon, "DBhoQH5e8hv/mMpVfaLLTpVJLwo=");
_c = ResultRibbon;
var _c;
__turbopack_context__.k.register(_c, "ResultRibbon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Hamburger.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Hamburger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Hamburger() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hamburger.useEffect": ()=>{
            const handleClickOutside = {
                "Hamburger.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setOpen(false);
                    }
                }
            }["Hamburger.useEffect.handleClickOutside"];
            if (open) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "Hamburger.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["Hamburger.useEffect"];
        }
    }["Hamburger.useEffect"], [
        open
    ]);
    const menuItems = [
        {
            label: 'Gallery',
            href: '/gallery',
            icon: '🖼️'
        },
        {
            label: 'About',
            href: '/about',
            icon: 'ℹ️'
        },
        {
            label: 'Admin Login',
            href: '/admin',
            icon: '🔐'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((v)=>!v),
                "aria-label": "Menu",
                className: "p-3 rounded-lg transition-all duration-300 ".concat(open ? 'bg-yellow-500/30 border-2 border-yellow-500' : 'bg-gray-800/50 border-2 border-gray-700 hover:bg-yellow-500/20 hover:border-yellow-500/50'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-6 space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-0.5 bg-yellow-400 transition-all duration-300 ".concat(open ? 'rotate-45 translate-y-2' : '')
                        }, void 0, false, {
                            fileName: "[project]/components/Hamburger.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-0.5 bg-yellow-400 transition-all duration-300 ".concat(open ? 'opacity-0' : '')
                        }, void 0, false, {
                            fileName: "[project]/components/Hamburger.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-0.5 bg-yellow-400 transition-all duration-300 ".concat(open ? '-rotate-45 -translate-y-2' : '')
                        }, void 0, false, {
                            fileName: "[project]/components/Hamburger.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Hamburger.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Hamburger.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 mt-3 w-56 transition-all duration-300 ".concat(open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-600/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-r from-[#7b0c2b] to-[#a01638] px-4 py-3 border-b-2 border-yellow-600/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-yellow-400 font-bold text-sm uppercase tracking-wider",
                                children: "Menu"
                            }, void 0, false, {
                                fileName: "[project]/components/Hamburger.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Hamburger.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-2",
                            children: menuItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-200 border-l-4 border-transparent hover:border-yellow-500",
                                    onClick: ()=>setOpen(false),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/components/Hamburger.tsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/Hamburger.tsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/components/Hamburger.tsx",
                                    lineNumber: 75,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Hamburger.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-900/50 px-4 py-2 border-t border-gray-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 text-center",
                                children: "Rajashahi Chart"
                            }, void 0, false, {
                                fileName: "[project]/components/Hamburger.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Hamburger.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Hamburger.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Hamburger.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Hamburger.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(Hamburger, "iuQeQ4sVg+lFcobs6EbZQm9Prm4=");
_c = Hamburger;
var _c;
__turbopack_context__.k.register(_c, "Hamburger");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/mongodb.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "dbConnect": ()=>dbConnect
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mongoose/dist/browser.umd.js [app-client] (ecmascript)");
;
const MONGODB_URI = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.MONGODB_URI;
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
        cached.promise = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].connect(MONGODB_URI).then((m)=>m);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/models/Round.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// models/Round.ts
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mongoose/dist/browser.umd.js [app-client] (ecmascript)");
;
const timeHHmm = /^([01]\d|2[0-3]):[0-5]\d$/;
const panna3 = /^\d{3}$/;
const jodi2 = /^\d{2}$/;
const RoundSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Schema"]({
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
        var _this_dayDigit;
        this.dayOpenDigit = (_this_dayDigit = this.dayDigit) !== null && _this_dayDigit !== void 0 ? _this_dayDigit : openingDigit;
    }
    // map old night → nightOpen
    if (!this.nightOpenPanna && (this.nightPanna || closingPanna)) {
        this.nightOpenPanna = this.nightPanna || closingPanna;
    }
    if (this.nightOpenDigit == null && (this.nightDigit != null || closingDigit != null)) {
        var _this_nightDigit;
        this.nightOpenDigit = (_this_nightDigit = this.nightDigit) !== null && _this_nightDigit !== void 0 ? _this_nightDigit : closingDigit;
    }
    next();
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["models"].Round || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["model"])('Round', RoundSchema);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/DayResultTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/api/result/history/route.ts
__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Round.ts [app-client] (ecmascript)");
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dbConnect"])();
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month'); // 'YYYY-MM'
    const limitRaw = searchParams.get('limit');
    const weeksRaw = searchParams.get('weeks'); // '24'
    const endParam = searchParams.get('end'); // 'YYYY-MM-DD'
    const side = searchParams.get('side'); // 'day' | 'night' | null
    const limit = Number(limitRaw !== null && limitRaw !== void 0 ? limitRaw : 0);
    const filter = {};
    let lo;
    let hi;
    if (month) {
        // month mode
        const { lo: _lo, hi: _hi } = monthBounds(month);
        lo = _lo;
        hi = _hi;
    } else if (weeksRaw) {
        // weeks mode
        const weeks = Math.max(1, Math.min(52, Number(weeksRaw) || 24));
        const latest = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].findOne({}).sort({
            sessionDate: -1
        }).select('sessionDate').lean();
        const endDateStr = endParam || (latest === null || latest === void 0 ? void 0 : latest.sessionDate);
        if (!endDateStr) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NextResponse"].json({
                items: []
            });
        }
        const end = new Date("".concat(endDateStr, "T00:00:00Z"));
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
    const rounds = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Round$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].find(filter).sort({
        sessionDate: 1
    }).select('sessionDate ' + 'dayOpenPanna dayOpenDigit dayClosePanna dayCloseDigit dayJodi dayLineStatus ' + 'nightOpenPanna nightOpenDigit nightClosePanna nightCloseDigit nightJodi nightLineStatus ' + 'dayOpenTime dayCloseTime nightOpenTime nightCloseTime ' + // <- add times
    // legacy times
    'dayTime nightTime ' + // legacy pannas
    'dayPanna dayDigit nightPanna nightDigit jodi status').lean();
    const mapped = rounds.map((r)=>{
        var _r_dayOpenPanna, _ref;
        // ----- DAY LINE -----
        const dayOpenPanna = (_ref = (_r_dayOpenPanna = r.dayOpenPanna) !== null && _r_dayOpenPanna !== void 0 ? _r_dayOpenPanna : r.dayPanna) !== null && _ref !== void 0 ? _ref : null;
        var _r_dayOpenDigit, _ref1;
        const dayOpenDigit = (_ref1 = (_r_dayOpenDigit = r.dayOpenDigit) !== null && _r_dayOpenDigit !== void 0 ? _r_dayOpenDigit : r.dayDigit) !== null && _ref1 !== void 0 ? _ref1 : null;
        var _r_dayClosePanna;
        const dayClosePanna = (_r_dayClosePanna = r.dayClosePanna) !== null && _r_dayClosePanna !== void 0 ? _r_dayClosePanna : null;
        var _r_dayCloseDigit;
        const dayCloseDigit = (_r_dayCloseDigit = r.dayCloseDigit) !== null && _r_dayCloseDigit !== void 0 ? _r_dayCloseDigit : null;
        const haveDayOpen = dayOpenDigit !== null && dayOpenDigit !== undefined;
        const haveDayClose = dayCloseDigit !== null && dayCloseDigit !== undefined;
        var _r_dayJodi;
        const dayJodi = haveDayOpen && haveDayClose ? (_r_dayJodi = r.dayJodi) !== null && _r_dayJodi !== void 0 ? _r_dayJodi : "".concat(dayOpenDigit).concat(dayCloseDigit) : null;
        const dayLineStatus = r.dayLineStatus ? r.dayLineStatus : haveDayOpen ? haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED' : 'READY';
        // explicit-time logic (same idea as we described earlier):
        const legacyDayTime = r.dayTime || null;
        const explicitDayOpenTime = r.dayOpenTime && r.dayOpenTime !== legacyDayTime ? r.dayOpenTime : null;
        const explicitDayCloseTime = r.dayCloseTime && r.dayCloseTime !== legacyDayTime ? r.dayCloseTime : null;
        var _r_nightOpenPanna, _ref2;
        // ----- NIGHT LINE -----
        const nightOpenPanna = (_ref2 = (_r_nightOpenPanna = r.nightOpenPanna) !== null && _r_nightOpenPanna !== void 0 ? _r_nightOpenPanna : r.nightPanna) !== null && _ref2 !== void 0 ? _ref2 : null;
        var _r_nightOpenDigit, _ref3;
        const nightOpenDigit = (_ref3 = (_r_nightOpenDigit = r.nightOpenDigit) !== null && _r_nightOpenDigit !== void 0 ? _r_nightOpenDigit : r.nightDigit) !== null && _ref3 !== void 0 ? _ref3 : null;
        var _r_nightClosePanna;
        const nightClosePanna = (_r_nightClosePanna = r.nightClosePanna) !== null && _r_nightClosePanna !== void 0 ? _r_nightClosePanna : null;
        var _r_nightCloseDigit;
        const nightCloseDigit = (_r_nightCloseDigit = r.nightCloseDigit) !== null && _r_nightCloseDigit !== void 0 ? _r_nightCloseDigit : null;
        const haveNightOpen = nightOpenDigit !== null && nightOpenDigit !== undefined;
        const haveNightClose = nightCloseDigit !== null && nightCloseDigit !== undefined;
        var _r_nightJodi;
        const nightJodi = haveNightOpen && haveNightClose ? (_r_nightJodi = r.nightJodi) !== null && _r_nightJodi !== void 0 ? _r_nightJodi : "".concat(nightOpenDigit).concat(nightCloseDigit) : null;
        const nightLineStatus = r.nightLineStatus ? r.nightLineStatus : haveNightOpen ? haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED' : 'READY';
        const legacyNightTime = r.nightTime || null;
        const explicitNightOpenTime = r.nightOpenTime && r.nightOpenTime !== legacyNightTime ? r.nightOpenTime : null;
        const explicitNightCloseTime = r.nightCloseTime && r.nightCloseTime !== legacyNightTime ? r.nightCloseTime : null;
        // legacy top-level status
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
                status: dayLineStatus,
                // only send if explicitly scheduled
                openTime: explicitDayOpenTime,
                closeTime: explicitDayCloseTime
            },
            night: {
                openPanna: nightOpenPanna,
                openDigit: nightOpenDigit,
                closePanna: nightClosePanna,
                closeDigit: nightCloseDigit,
                jodi: nightJodi,
                status: nightLineStatus,
                openTime: explicitNightOpenTime,
                closeTime: explicitNightCloseTime
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
    // keep old behaviour: if no month/weeks and limit is set, slice from the end
    if (!month && !weeksRaw && limit && items.length > limit) {
        items = items.slice(-limit);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NextResponse"].json({
        items
    });
}
_c = GET;
var _c;
__turbopack_context__.k.register(_c, "GET");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ResultRibbon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ResultRibbon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hamburger$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Hamburger.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DayResultTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DayResultTable.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Page() {
    _s();
    const [latest, setLatest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showScrollTop, setShowScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const load = async ()=>{
        const r = await fetch('/api/result/latest?side=day', {
            cache: 'no-store'
        });
        const d = await r.json();
        setLatest(d);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            load().catch({
                "Page.useEffect": ()=>{}
            }["Page.useEffect"]);
        }
    }["Page.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const handleScroll = {
                "Page.useEffect.handleScroll": ()=>setShowScrollTop(window.scrollY > 300)
            }["Page.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "Page.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["Page.useEffect"];
        }
    }["Page.useEffect"], []);
    const scrollToTop = ()=>window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    // 👇 translate NEW status → what ResultRibbon expects
    const ribbonStatus = (latest === null || latest === void 0 ? void 0 : latest.status) === 'OPEN_PUBLISHED' ? 'DAY_PUBLISHED' : latest === null || latest === void 0 ? void 0 : latest.status;
    var _latest_jodi;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hamburger$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] py-6 text-center border-b-4 border-yellow-600 shadow-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                    children: "RAJASHAHI CHART"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#5c0f24] py-3 border-b border-yellow-700/30 shadow-inner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto px-4 flex items-center justify-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-yellow-300 text-sm",
                            children: "View:"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex rounded-lg overflow-hidden border border-yellow-600/40",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-4 py-2 text-black font-semibold bg-yellow-400",
                                    "aria-current": "page",
                                    "aria-label": "Rajashahi Day selected",
                                    disabled: true,
                                    children: "Day"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/night",
                                    className: "px-4 py-2 text-yellow-200 hover:text-black hover:bg-yellow-300 transition",
                                    "aria-label": "Go to Rajashahi Night",
                                    children: "Night"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#9a1839] py-3 text-center text-sm italic border-b-2 border-yellow-700/50 shadow-inner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-yellow-200",
                    children: "Rajashahi Day Result"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#5c0f24] py-3 text-center text-sm border-b border-yellow-700/30 shadow-inner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-yellow-300 font-medium",
                    children: [
                        "📱 Mobile Number: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white font-semibold",
                            children: "8777787777"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 94,
                            columnNumber: 29
                        }, this),
                        "   |   📧 Gmail Support: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white font-semibold",
                            children: "rajashahi.india@gmail.com"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 95,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-300 text-black rounded-lg p-6 border-4 border-red-800 shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_2px_8px_rgba(255,255,255,0.3)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center font-extrabold text-5xl mb-3 text-red-800 drop-shadow-[0_2px_4px_rgba(218,165,32,0.8)]",
                                style: {
                                    textShadow: '2px 2px 0px #DAA520, -1px -1px 0px #B8860B'
                                },
                                children: "RAJASHAHI DAY"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ResultRibbon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                side: "day",
                                status: ribbonStatus,
                                sessionDate: latest.sessionDate,
                                dayPanna: latest.dayPanna,
                                dayDigit: latest.dayDigit,
                                dayClosePanna: latest.dayClosePanna,
                                dayCloseDigit: latest.dayCloseDigit,
                                jodi: (_latest_jodi = latest.jodi) !== null && _latest_jodi !== void 0 ? _latest_jodi : null,
                                onRefresh: load
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8 text-black font-semibold text-lg",
                                children: "Loading…"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 123,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-6"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DayResultTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "bottom",
                        className: "h-12"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: scrollToTop,
                className: "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-2xl transition-all duration-300 transform border-2 border-yellow-700 ".concat(showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-0 pointer-events-none'),
                "aria-label": "Scroll to top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 3,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M5 10l7-7m0 0l7 7m-7-7v18"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(Page, "/PPMjzK5t3HA+6OIguj69HcA4ng=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_0f4047b3._.js.map