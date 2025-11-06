(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/AdminHistoryEditor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/(admin)/AdminHistoryEditor.tsx
__turbopack_context__.s({
    "default": ()=>AdminHistoryEditor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const clean3 = (v)=>v.replace(/\D/g, '').slice(0, 3);
const pad3 = (v)=>v.padStart(3, '0');
function AdminHistoryEditor() {
    _s();
    const [month, setMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().slice(0, 7));
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [msgType, setMsgType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('success');
    const load = async ()=>{
        setLoading(true);
        setMsg(null);
        try {
            const r = await fetch("/api/admin/rounds?month=".concat(month), {
                cache: 'no-store'
            });
            const d = await r.json();
            // sort by date desc so latest is on top
            const items = (d.items || []).sort((a, b)=>b.sessionDate.localeCompare(a.sessionDate));
            setRows(items);
        } catch (e) {
            setMsg('Failed to load rounds');
            setMsgType('error');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminHistoryEditor.useEffect": ()=>{
            load();
        }
    }["AdminHistoryEditor.useEffect"], [
        month
    ]);
    const save = async (sessionDate, patch)=>{
        setMsg(null);
        const body = {};
        for (const [k, v] of Object.entries(patch)){
            if (v === undefined) continue;
            body[k] = v;
        }
        const r = await fetch("/api/admin/rounds/".concat(encodeURIComponent(sessionDate.trim())), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const d = await r.json().catch(()=>({}));
        if (!r.ok || d.ok === false) {
            setMsg(d.error || 'Update failed');
            setMsgType('error');
            return;
        }
        setMsg('✅ Saved successfully!');
        setMsgType('success');
        await load();
    };
    const del = async (sessionDate)=>{
        if (!confirm("Delete round ".concat(sessionDate, "?"))) return;
        const r = await fetch("/api/admin/rounds/".concat(encodeURIComponent(sessionDate.trim())), {
            method: 'DELETE'
        });
        if (!r.ok) {
            setMsg('Delete failed');
            setMsgType('error');
            return;
        }
        setMsg('✅ Deleted successfully!');
        setMsgType('success');
        await load();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 max-w-6xl mx-auto p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border-2 border-gray-300 rounded-xl p-6 space-y-4 shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-4 justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-gray-900",
                                children: "📝 History Editor"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm text-gray-700 font-semibold",
                                        children: "📅 Month:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "month",
                                        value: month,
                                        onChange: (e)=>setMonth(e.target.value),
                                        className: "px-3 py-2 border-2 border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: load,
                                        className: "px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all",
                                        disabled: loading,
                                        children: loading ? '⏳ Loading…' : '🔄 Reload'
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2 rounded-lg border-2 ".concat(msgType === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'),
                                        children: msg
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Tip: You can set panna and also schedule the time (IST) for that day or night directly here."
                    }, void 0, false, {
                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminHistoryEditor.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-x-auto mb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm min-w-[1100px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-gray-100 border-b border-gray-300 text-xs uppercase tracking-wide text-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3 px-3 text-left",
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3 px-3 text-left",
                                        children: "Day Open"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3 px-3 text-left",
                                        children: "Day Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3 px-3 text-left",
                                        children: "Night Open"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3 px-3 text-left",
                                        children: "Night Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3 px-3 text-left",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AdminHistoryEditor.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: [
                                !loading && rows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 7,
                                        className: "py-6 text-center text-gray-500",
                                        children: "No rounds for this month."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                rows.map((r)=>{
                                    var _r_dayOpenPanna, _ref, _r_dayOpenTime, _r_dayClosePanna, _r_dayCloseTime, _r_nightOpenPanna, _ref1, _r_nightOpenTime, _r_nightClosePanna, _r_nightCloseTime;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t border-gray-200 hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 px-3 font-semibold text-gray-900 whitespace-nowrap",
                                                children: r.sessionDate
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 px-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlinePannaEditor, {
                                                    label: "Open",
                                                    initial: (_ref = (_r_dayOpenPanna = r.dayOpenPanna) !== null && _r_dayOpenPanna !== void 0 ? _r_dayOpenPanna : r.dayPanna) !== null && _ref !== void 0 ? _ref : '',
                                                    timeInitial: (_r_dayOpenTime = r.dayOpenTime) !== null && _r_dayOpenTime !== void 0 ? _r_dayOpenTime : '',
                                                    onSave: (panna, time)=>save(r.sessionDate, {
                                                            dayOpenPanna: panna || null,
                                                            ...time ? {
                                                                dayOpenTime: time
                                                            } : {}
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                lineNumber: 173,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 px-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlinePannaEditor, {
                                                    label: "Close",
                                                    initial: (_r_dayClosePanna = r.dayClosePanna) !== null && _r_dayClosePanna !== void 0 ? _r_dayClosePanna : '',
                                                    timeInitial: (_r_dayCloseTime = r.dayCloseTime) !== null && _r_dayCloseTime !== void 0 ? _r_dayCloseTime : '',
                                                    onSave: (panna, time)=>save(r.sessionDate, {
                                                            dayClosePanna: panna || null,
                                                            ...time ? {
                                                                dayCloseTime: time
                                                            } : {}
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 px-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlinePannaEditor, {
                                                    label: "Open",
                                                    initial: (_ref1 = (_r_nightOpenPanna = r.nightOpenPanna) !== null && _r_nightOpenPanna !== void 0 ? _r_nightOpenPanna : r.nightPanna) !== null && _ref1 !== void 0 ? _ref1 : '',
                                                    timeInitial: (_r_nightOpenTime = r.nightOpenTime) !== null && _r_nightOpenTime !== void 0 ? _r_nightOpenTime : '',
                                                    color: "purple",
                                                    onSave: (panna, time)=>save(r.sessionDate, {
                                                            nightOpenPanna: panna || null,
                                                            ...time ? {
                                                                nightOpenTime: time
                                                            } : {}
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 px-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlinePannaEditor, {
                                                    label: "Close",
                                                    initial: (_r_nightClosePanna = r.nightClosePanna) !== null && _r_nightClosePanna !== void 0 ? _r_nightClosePanna : '',
                                                    timeInitial: (_r_nightCloseTime = r.nightCloseTime) !== null && _r_nightCloseTime !== void 0 ? _r_nightCloseTime : '',
                                                    color: "pink",
                                                    onSave: (panna, time)=>save(r.sessionDate, {
                                                            nightClosePanna: panna || null,
                                                            ...time ? {
                                                                nightCloseTime: time
                                                            } : {}
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                lineNumber: 219,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 px-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>del(r.sessionDate),
                                                    className: "px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors",
                                                    children: "🗑️ Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminHistoryEditor.tsx",
                                                lineNumber: 236,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, r.sessionDate, true, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this);
                                }),
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 7,
                                        className: "py-4 text-center text-gray-500",
                                        children: "Loading…"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminHistoryEditor.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminHistoryEditor.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AdminHistoryEditor.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminHistoryEditor.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(AdminHistoryEditor, "0Esc8IEOpgscYJVLp8WhBlGJcQs=");
_c = AdminHistoryEditor;
/**
 * Small inline editor for one panna + optional time
 */ function InlinePannaEditor(param) {
    let { label, initial, timeInitial, onSave, color } = param;
    _s1();
    const [panna, setPanna] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial !== null && initial !== void 0 ? initial : '');
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(timeInitial !== null && timeInitial !== void 0 ? timeInitial : '');
    // keep input in sync if parent refetches
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InlinePannaEditor.useEffect": ()=>{
            setPanna(initial !== null && initial !== void 0 ? initial : '');
        }
    }["InlinePannaEditor.useEffect"], [
        initial
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InlinePannaEditor.useEffect": ()=>{
            setTime(timeInitial !== null && timeInitial !== void 0 ? timeInitial : '');
        }
    }["InlinePannaEditor.useEffect"], [
        timeInitial
    ]);
    const btnBase = color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : color === 'pink' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-600 hover:bg-blue-700';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: label,
                        value: panna,
                        onChange: (e)=>setPanna(clean3(e.target.value)),
                        onBlur: ()=>panna && setPanna(pad3(panna)),
                        maxLength: 3,
                        className: "w-20 px-2 py-1 border-2 border-gray-200 rounded-md font-mono text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSave(panna, time),
                        className: "px-2 py-1 rounded-md text-white text-xs font-semibold transition-colors ".concat(btnBase),
                        children: "Save"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminHistoryEditor.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "time",
                        value: time,
                        onChange: (e)=>setTime(e.target.value),
                        className: "w-28 px-2 py-1 border-2 border-gray-200 rounded-md text-xs text-gray-800 focus:ring-1 focus:ring-blue-200 outline-none"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-gray-400",
                        children: "IST"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminHistoryEditor.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminHistoryEditor.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminHistoryEditor.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_s1(InlinePannaEditor, "/bISoBfXy8dMVOJ2qokfeutlXto=");
_c1 = InlinePannaEditor;
var _c, _c1;
__turbopack_context__.k.register(_c, "AdminHistoryEditor");
__turbopack_context__.k.register(_c1, "InlinePannaEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/admin/dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>AdminPanel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminHistoryEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AdminHistoryEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const pad3 = (v)=>v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');
const randPanna = ()=>String(Math.floor(Math.random() * 1000)).padStart(3, '0');
const todayStr = ()=>new Date().toISOString().slice(0, 10);
function AdminPanel() {
    _s();
    const [dayDate, setDayDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(todayStr());
    const [nightDate, setNightDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(todayStr());
    // the latest round in DB
    const [latestRound, setLatestRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // rounds for selected dates
    const [dayRound, setDayRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nightRound, setNightRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // inputs
    const [dayOpenP, setDayOpenP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dayCloseP, setDayCloseP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nightOpenP, setNightOpenP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nightCloseP, setNightCloseP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // optional time inputs
    const [dayOpenTime, setDayOpenTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dayCloseTime, setDayCloseTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nightOpenTime, setNightOpenTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nightCloseTime, setNightCloseTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dayOpenErr, setDayOpenErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dayCloseErr, setDayCloseErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nightOpenErr, setNightOpenErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nightCloseErr, setNightCloseErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const clean3digits = (v)=>v.replace(/\D/g, '').slice(0, 3);
    // load latest once
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPanel.useEffect": ()=>{
            ({
                "AdminPanel.useEffect": async ()=>{
                    try {
                        var _d_round;
                        const r = await fetch('/api/round/current', {
                            cache: 'no-store'
                        });
                        if (r.status === 401) {
                            window.location.href = '/admin';
                            return;
                        }
                        if (!r.ok) return;
                        const d = await r.json();
                        if ((_d_round = d.round) === null || _d_round === void 0 ? void 0 : _d_round.sessionDate) {
                            const latestDate = d.round.sessionDate;
                            setLatestRound(d.round);
                            setDayDate(latestDate);
                            setNightDate(latestDate);
                        }
                    } catch (e) {
                    // ignore
                    }
                }
            })["AdminPanel.useEffect"]();
        }
    }["AdminPanel.useEffect"], []);
    // load day round for chosen date
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPanel.useEffect": ()=>{
            if (!dayDate) return;
            ({
                "AdminPanel.useEffect": async ()=>{
                    try {
                        const r = await fetch("/api/admin/rounds/".concat(dayDate), {
                            cache: 'no-store'
                        });
                        if (r.ok) {
                            const d = await r.json();
                            var _d_round;
                            setDayRound((_d_round = d.round) !== null && _d_round !== void 0 ? _d_round : d);
                        } else if (r.status === 404) {
                            setDayRound(null);
                        }
                    } catch (e) {}
                }
            })["AdminPanel.useEffect"]();
        }
    }["AdminPanel.useEffect"], [
        dayDate
    ]);
    // load night round for chosen date
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPanel.useEffect": ()=>{
            if (!nightDate) return;
            ({
                "AdminPanel.useEffect": async ()=>{
                    try {
                        const r = await fetch("/api/admin/rounds/".concat(nightDate), {
                            cache: 'no-store'
                        });
                        if (r.ok) {
                            const d = await r.json();
                            var _d_round;
                            setNightRound((_d_round = d.round) !== null && _d_round !== void 0 ? _d_round : d);
                        } else if (r.status === 404) {
                            setNightRound(null);
                        }
                    } catch (e) {}
                }
            })["AdminPanel.useEffect"]();
        }
    }["AdminPanel.useEffect"], [
        nightDate
    ]);
    const withBusy = async (fn)=>{
        setBusy(true);
        setErr(null);
        setSuccess(null);
        try {
            await fn();
        } catch (e) {
            setErr('Network error');
        } finally{
            setBusy(false);
        }
    };
    // publishers
    const publishDayOpen = ()=>withBusy(async ()=>{
            const panna = dayOpenP.trim() ? pad3(dayOpenP) : randPanna();
            if (!/^\d{3}$/.test(panna)) {
                setErr('Day opening panna must be 3 digits');
                return;
            }
            const body = {
                dayOpenPanna: panna
            };
            if (dayOpenTime.trim()) body.dayOpenTime = dayOpenTime.trim();
            const r = await fetch("/api/admin/rounds/".concat(dayDate), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const d = await r.json();
            if (!r.ok || !d.ok) {
                setErr(d.error || 'Failed to publish day opening');
                return;
            }
            setDayRound(d.round || null);
            setDayOpenP('');
            setSuccess("Day opening published for ".concat(dayDate, "!"));
        });
    const publishDayClose = ()=>withBusy(async ()=>{
            const panna = dayCloseP.trim() ? pad3(dayCloseP) : randPanna();
            if (!/^\d{3}$/.test(panna)) {
                setErr('Day closing panna must be 3 digits');
                return;
            }
            const body = {
                dayClosePanna: panna
            };
            if (dayCloseTime.trim()) body.dayCloseTime = dayCloseTime.trim();
            const r = await fetch("/api/admin/rounds/".concat(dayDate), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const d = await r.json();
            if (!r.ok || !d.ok) {
                setErr(d.error || 'Failed to publish day closing');
                return;
            }
            setDayRound(d.round || null);
            setDayCloseP('');
            setSuccess("Day closing published for ".concat(dayDate, "!"));
        });
    const publishNightOpen = ()=>withBusy(async ()=>{
            const panna = nightOpenP.trim() ? pad3(nightOpenP) : randPanna();
            if (!/^\d{3}$/.test(panna)) {
                setErr('Night opening panna must be 3 digits');
                return;
            }
            const body = {
                nightOpenPanna: panna
            };
            if (nightOpenTime.trim()) body.nightOpenTime = nightOpenTime.trim();
            const r = await fetch("/api/admin/rounds/".concat(nightDate), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const d = await r.json();
            if (!r.ok || !d.ok) {
                setErr(d.error || 'Failed to publish night opening');
                return;
            }
            setNightRound(d.round || null);
            setNightOpenP('');
            setSuccess("Night opening published for ".concat(nightDate, "!"));
        });
    const publishNightClose = ()=>withBusy(async ()=>{
            const panna = nightCloseP.trim() ? pad3(nightCloseP) : randPanna();
            if (!/^\d{3}$/.test(panna)) {
                setErr('Night closing panna must be 3 digits');
                return;
            }
            const body = {
                nightClosePanna: panna
            };
            if (nightCloseTime.trim()) body.nightCloseTime = nightCloseTime.trim();
            const r = await fetch("/api/admin/rounds/".concat(nightDate), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const d = await r.json();
            if (!r.ok || !d.ok) {
                setErr(d.error || 'Failed to publish night closing');
                return;
            }
            setNightRound(d.round || null);
            setNightCloseP('');
            setSuccess("Night closing published for ".concat(nightDate, "!"));
        });
    // DISPLAY: use selected-date round, or fallback
    const displayDay = dayRound !== null && dayRound !== void 0 ? dayRound : latestRound;
    const displayNight = nightRound !== null && nightRound !== void 0 ? nightRound : latestRound;
    const dayLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminPanel.useMemo[dayLine]": ()=>{
            if (!displayDay) return '(—) — | (—) —';
            var _displayDay_dayOpenPanna, _ref;
            const op = (_ref = (_displayDay_dayOpenPanna = displayDay.dayOpenPanna) !== null && _displayDay_dayOpenPanna !== void 0 ? _displayDay_dayOpenPanna : displayDay.dayPanna) !== null && _ref !== void 0 ? _ref : '—';
            var _displayDay_dayOpenDigit, _ref1;
            const od = (_ref1 = (_displayDay_dayOpenDigit = displayDay.dayOpenDigit) !== null && _displayDay_dayOpenDigit !== void 0 ? _displayDay_dayOpenDigit : displayDay.dayDigit) !== null && _ref1 !== void 0 ? _ref1 : '—';
            var _displayDay_dayClosePanna;
            const cp = (_displayDay_dayClosePanna = displayDay.dayClosePanna) !== null && _displayDay_dayClosePanna !== void 0 ? _displayDay_dayClosePanna : '—';
            var _displayDay_dayCloseDigit;
            const cd = (_displayDay_dayCloseDigit = displayDay.dayCloseDigit) !== null && _displayDay_dayCloseDigit !== void 0 ? _displayDay_dayCloseDigit : '—';
            return "(".concat(op, ") ").concat(od, " | (").concat(cp, ") ").concat(cd);
        }
    }["AdminPanel.useMemo[dayLine]"], [
        displayDay
    ]);
    const nightLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminPanel.useMemo[nightLine]": ()=>{
            if (!displayNight) return '(—) — | (—) —';
            var _displayNight_nightOpenPanna, _ref;
            const op = (_ref = (_displayNight_nightOpenPanna = displayNight.nightOpenPanna) !== null && _displayNight_nightOpenPanna !== void 0 ? _displayNight_nightOpenPanna : displayNight.nightPanna) !== null && _ref !== void 0 ? _ref : '—';
            var _displayNight_nightOpenDigit, _ref1;
            const od = (_ref1 = (_displayNight_nightOpenDigit = displayNight.nightOpenDigit) !== null && _displayNight_nightOpenDigit !== void 0 ? _displayNight_nightOpenDigit : displayNight.nightDigit) !== null && _ref1 !== void 0 ? _ref1 : '—';
            var _displayNight_nightClosePanna;
            const cp = (_displayNight_nightClosePanna = displayNight.nightClosePanna) !== null && _displayNight_nightClosePanna !== void 0 ? _displayNight_nightClosePanna : '—';
            var _displayNight_nightCloseDigit;
            const cd = (_displayNight_nightCloseDigit = displayNight.nightCloseDigit) !== null && _displayNight_nightCloseDigit !== void 0 ? _displayNight_nightCloseDigit : '—';
            return "(".concat(op, ") ").concat(od, " | (").concat(cp, ") ").concat(cd);
        }
    }["AdminPanel.useMemo[nightLine]"], [
        displayNight
    ]);
    const dayOpenDone = !!(displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayOpenDigit);
    const dayCloseDone = !!(displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayCloseDigit);
    const nightOpenDone = !!(displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightOpenDigit);
    const nightCloseDone = !!(displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightCloseDigit);
    var _displayDay_dayJodi, _displayNight_nightJodi;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-white text-gray-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-900 py-6 border-b-4 border-blue-600 shadow-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto px-4 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/",
                                            className: "px-4 py-2 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all text-gray-900 font-semibold flex items-center gap-2",
                                            children: "← Back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-4xl font-extrabold tracking-wider text-white",
                                            children: "ADMIN PANEL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                    lineNumber: 266,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: async ()=>{
                                            setBusy(true);
                                            try {
                                                await fetch('/api/logout', {
                                                    method: 'POST'
                                                });
                                            } catch (e) {} finally{
                                                setBusy(false);
                                                window.location.href = '/admin';
                                            }
                                        },
                                        className: "px-4 py-2 rounded-lg bg-red-600 border-2 border-red-700 hover:bg-red-700 transition-all text-white font-semibold",
                                        disabled: busy,
                                        children: "🚪 Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/dashboard/page.tsx",
                            lineNumber: 265,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/dashboard/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto p-4 space-y-6 mt-6",
                        children: [
                            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-800",
                                children: [
                                    "⚠️ ",
                                    err
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-green-50 border-2 border-green-500 rounded-lg p-4 text-green-800",
                                children: [
                                    "✅ ",
                                    success
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 text-gray-900 rounded-xl p-6 border-4 border-blue-600 shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-blue-900 mb-2",
                                            children: "Current Results"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                            lineNumber: 314,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center space-y-1 md:space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center justify-center gap-2 text-gray-900 font-mono font-bold text-2xl md:text-3xl tracking-wider",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: dayLine
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 5
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block md:hidden text-lg font-semibold text-gray-800",
                                                            children: (displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayJodi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    " Jodi:",
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-blue-800 font-bold",
                                                                        children: displayDay.dayJodi
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 327,
                                                                        columnNumber: 7
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 1
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 3
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden md:block text-lg font-semibold text-gray-900",
                                                    children: [
                                                        "Day Jodi:",
                                                        ' ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-900 text-2xl",
                                                            children: (_displayDay_dayJodi = displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayJodi) !== null && _displayDay_dayJodi !== void 0 ? _displayDay_dayJodi : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 5
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 3
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 1
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-px bg-blue-300"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center space-y-1 md:space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center justify-center gap-2 text-gray-900 font-mono font-bold text-2xl md:text-3xl tracking-wider",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: nightLine
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 5
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block md:hidden text-lg font-semibold text-gray-800",
                                                            children: (displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightJodi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    " Jodi:",
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-purple-800 font-bold",
                                                                        children: displayNight.nightJodi
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                        lineNumber: 355,
                                                                        columnNumber: 7
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 1
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 3
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden md:block text-lg font-semibold text-gray-900",
                                                    children: [
                                                        "Night Jodi:",
                                                        ' ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-900 text-2xl",
                                                            children: (_displayNight_nightJodi = displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightJodi) !== null && _displayNight_nightJodi !== void 0 ? _displayNight_nightJodi : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 5
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 3
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/dashboard/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 1
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/dashboard/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 rounded-xl p-6 border-2 border-blue-400 shadow-md space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-blue-900 mb-1",
                                                children: "☀️ Day (Open & Close)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm text-gray-700 font-semibold",
                                                        children: "Day date:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: dayDate,
                                                        onChange: (e)=>setDayDate(e.target.value),
                                                        className: "px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 380,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-gray-700 font-semibold mb-2",
                                                        children: "Day Opening Panna (000-999)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: dayOpenP,
                                                                onChange: (e)=>{
                                                                    const cleaned = clean3digits(e.target.value);
                                                                    setDayOpenP(cleaned);
                                                                    if (e.target.value !== cleaned) {
                                                                        setDayOpenErr('Only 0-9 allowed (max 3)');
                                                                    } else {
                                                                        setDayOpenErr('');
                                                                    }
                                                                },
                                                                maxLength: 3,
                                                                placeholder: dayOpenDone ? 'Already published' : 'e.g. 123',
                                                                className: "flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900",
                                                                disabled: busy
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 18
                                                            }, this),
                                                            dayOpenErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-600 mt-1",
                                                                children: dayOpenErr
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 3
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: publishDayOpen,
                                                                disabled: busy,
                                                                className: "px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold",
                                                                children: "Publish"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Open time (IST):"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 427,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "time",
                                                                value: dayOpenTime,
                                                                onChange: (e)=>setDayOpenTime(e.target.value),
                                                                className: "px-2 py-1 rounded border border-gray-300 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-gray-500",
                                                                children: "leave empty = no change"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 434,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 426,
                                                        columnNumber: 17
                                                    }, this),
                                                    dayOpenDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-green-700 font-semibold mt-1",
                                                        children: [
                                                            "Current: ",
                                                            displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayOpenPanna,
                                                            " → ",
                                                            displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayOpenDigit
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 391,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-gray-700 font-semibold mb-2",
                                                        children: "Day Closing Panna (000-999)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: dayCloseP,
                                                                onChange: (e)=>{
                                                                    const cleaned = clean3digits(e.target.value);
                                                                    setDayCloseP(cleaned);
                                                                    if (e.target.value !== cleaned) {
                                                                        setDayCloseErr('Only 0-9 allowed (max 3)');
                                                                    } else {
                                                                        setDayCloseErr('');
                                                                    }
                                                                },
                                                                maxLength: 3,
                                                                placeholder: dayCloseDone ? 'Already published' : 'e.g. 456',
                                                                className: "flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900",
                                                                disabled: busy
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 18
                                                            }, this),
                                                            dayCloseErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-600 mt-1",
                                                                children: dayCloseErr
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 3
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: publishDayClose,
                                                                disabled: busy,
                                                                className: "px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold",
                                                                children: "Publish"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 470,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Close time (IST):"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "time",
                                                                value: dayCloseTime,
                                                                onChange: (e)=>setDayCloseTime(e.target.value),
                                                                className: "px-2 py-1 rounded border border-gray-300 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-gray-500",
                                                                children: "leave empty = no change"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 17
                                                    }, this),
                                                    dayCloseDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-green-700 font-semibold mt-1",
                                                        children: [
                                                            "Current: ",
                                                            displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayClosePanna,
                                                            " → ",
                                                            displayDay === null || displayDay === void 0 ? void 0 : displayDay.dayCloseDigit
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 444,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-purple-50 rounded-xl p-6 border-2 border-purple-400 shadow-md space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-purple-900 mb-1",
                                                children: "🌙 Night (Open & Close)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm text-gray-700 font-semibold",
                                                        children: "Night date:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: nightDate,
                                                        onChange: (e)=>setNightDate(e.target.value),
                                                        className: "px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 500,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-gray-700 font-semibold mb-2",
                                                        children: "Night Opening Panna (000-999)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: nightOpenP,
                                                                onChange: (e)=>{
                                                                    const cleaned = clean3digits(e.target.value);
                                                                    setNightOpenP(cleaned);
                                                                    if (e.target.value !== cleaned) {
                                                                        setNightOpenErr('Only 0-9 allowed (max 3)');
                                                                    } else {
                                                                        setNightOpenErr('');
                                                                    }
                                                                },
                                                                maxLength: 3,
                                                                placeholder: nightOpenDone ? 'Already published' : 'e.g. 789',
                                                                className: "flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900",
                                                                disabled: busy
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 15
                                                            }, this),
                                                            nightOpenErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-600 mt-1",
                                                                children: nightOpenErr
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 3
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: publishNightOpen,
                                                                disabled: busy,
                                                                className: "px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold",
                                                                children: "Publish"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Open time (IST):"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 546,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "time",
                                                                value: nightOpenTime,
                                                                onChange: (e)=>setNightOpenTime(e.target.value),
                                                                className: "px-2 py-1 rounded border border-gray-300 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-gray-500",
                                                                children: "leave empty = no change"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 17
                                                    }, this),
                                                    nightOpenDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-green-700 font-semibold mt-1",
                                                        children: [
                                                            "Current: ",
                                                            displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightOpenPanna,
                                                            " → ",
                                                            displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightOpenDigit
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 511,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-gray-700 font-semibold mb-2",
                                                        children: "Night Closing Panna (000-999)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: nightCloseP,
                                                                onChange: (e)=>{
                                                                    const cleaned = clean3digits(e.target.value);
                                                                    setNightCloseP(cleaned);
                                                                    if (e.target.value !== cleaned) {
                                                                        setNightCloseErr('Only 0-9 allowed (max 3)');
                                                                    } else {
                                                                        setNightCloseErr('');
                                                                    }
                                                                },
                                                                maxLength: 3,
                                                                placeholder: nightCloseDone ? 'Already published' : 'e.g. 012',
                                                                className: "flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900",
                                                                disabled: busy
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 568,
                                                                columnNumber: 1
                                                            }, this),
                                                            nightCloseErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-600 mt-1",
                                                                children: nightCloseErr
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 3
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: publishNightClose,
                                                                disabled: busy,
                                                                className: "px-4 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold",
                                                                children: "Publish"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 589,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Close time (IST):"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 598,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "time",
                                                                value: nightCloseTime,
                                                                onChange: (e)=>setNightCloseTime(e.target.value),
                                                                className: "px-2 py-1 rounded border border-gray-300 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 599,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-gray-500",
                                                                children: "leave empty = no change"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 17
                                                    }, this),
                                                    nightCloseDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-green-700 font-semibold mt-1",
                                                        children: [
                                                            "Current: ",
                                                            displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightClosePanna,
                                                            " → ",
                                                            displayNight === null || displayNight === void 0 ? void 0 : displayNight.nightCloseDigit
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                                lineNumber: 563,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/dashboard/page.tsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/dashboard/page.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/dashboard/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/dashboard/page.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminHistoryEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/admin/dashboard/page.tsx",
                lineNumber: 618,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AdminPanel, "yYC77uaCAcXlqpmvXMun7LXsxJQ=");
_c = AdminPanel;
var _c;
__turbopack_context__.k.register(_c, "AdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_fa1a2ed8._.js.map