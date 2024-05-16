(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/394a6_framer-motion_dist_es_gestures_0cfeb9._.js", {

"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "createLock": ()=>createLock,
    "getGlobalLock": ()=>getGlobalLock,
    "isDragActive": ()=>isDragActive
});
function createLock(name) {
    let lock = null;
    return ()=>{
        const openLock = ()=>{
            lock = null;
        };
        if (lock === null) {
            lock = name;
            return openLock;
        }
        return false;
    };
}
const globalHorizontalLock = createLock("dragHorizontal");
const globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag) {
    let lock = false;
    if (drag === "y") {
        lock = globalVerticalLock();
    } else if (drag === "x") {
        lock = globalHorizontalLock();
    } else {
        const openHorizontal = globalHorizontalLock();
        const openVertical = globalVerticalLock();
        if (openHorizontal && openVertical) {
            lock = ()=>{
                openHorizontal();
                openVertical();
            };
        } else {
            // Release the locks because we don't use them
            if (openHorizontal) openHorizontal();
            if (openVertical) openVertical();
        }
    }
    return lock;
}
function isDragActive() {
    // Check the gesture lock - if we get it, it means no drag gesture is active
    // and we can safely fire the tap gesture.
    const openGestureLock = getGlobalLock(true);
    if (!openGestureLock) return true;
    openGestureLock();
    return false;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/hover.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "HoverGesture": ()=>HoverGesture
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
function addHoverEvent(node, isActive) {
    const eventName = isActive ? "pointerenter" : "pointerleave";
    const callbackName = isActive ? "onHoverStart" : "onHoverEnd";
    const handleEvent = (event, info)=>{
        if (event.pointerType === "touch" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragActive"])()) return;
        const props = node.getProps();
        if (node.animationState && props.whileHover) {
            node.animationState.setActive("whileHover", isActive);
        }
        const callback = props[callbackName];
        if (callback) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>callback(event, info));
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(node.current, eventName, handleEvent, {
        passive: !node.getProps()[callbackName]
    });
}
class HoverGesture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    mount() {
        this.unmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(addHoverEvent(this.node, true), addHoverEvent(this.node, false));
    }
    unmount() {}
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/focus.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "FocusGesture": ()=>FocusGesture
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-dom-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
class FocusGesture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    constructor(){
        super(...arguments);
        this.isActive = false;
    }
    onFocus() {
        let isFocusVisible = false;
        /**
         * If this element doesn't match focus-visible then don't
         * apply whileHover. But, if matches throws that focus-visible
         * is not a valid selector then in that browser outline styles will be applied
         * to the element by default and we want to match that behaviour with whileFocus.
         */ try {
            isFocusVisible = this.node.current.matches(":focus-visible");
        } catch (e) {
            isFocusVisible = true;
        }
        if (!isFocusVisible || !this.node.animationState) return;
        this.node.animationState.setActive("whileFocus", true);
        this.isActive = true;
    }
    onBlur() {
        if (!this.isActive || !this.node.animationState) return;
        this.node.animationState.setActive("whileFocus", false);
        this.isActive = false;
    }
    mount() {
        this.unmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(this.node.current, "focus", ()=>this.onFocus()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(this.node.current, "blur", ()=>this.onBlur()));
    }
    unmount() {}
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */ __turbopack_esm__({
    "isNodeOrChild": ()=>isNodeOrChild
});
const isNodeOrChild = (parent, child)=>{
    if (!child) {
        return false;
    } else if (parent === child) {
        return true;
    } else {
        return isNodeOrChild(parent, child.parentElement);
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/press.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "PressGesture": ()=>PressGesture
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/event-info.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-dom-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
function fireSyntheticPointerEvent(name, handler) {
    if (!handler) return;
    const syntheticPointerEvent = new PointerEvent("pointer" + name);
    handler(syntheticPointerEvent, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractEventInfo"])(syntheticPointerEvent));
}
class PressGesture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    constructor(){
        super(...arguments);
        this.removeStartListeners = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        this.removeEndListeners = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        this.removeAccessibleListeners = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        this.startPointerPress = (startEvent, startInfo)=>{
            if (this.isPressing) return;
            this.removeEndListeners();
            const props = this.node.getProps();
            const endPointerPress = (endEvent, endInfo)=>{
                if (!this.checkPressEnd()) return;
                const { onTap, onTapCancel, globalTapTarget } = this.node.getProps();
                /**
                 * We only count this as a tap gesture if the event.target is the same
                 * as, or a child of, this component's element
                 */ const handler = !globalTapTarget && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeOrChild"])(this.node.current, endEvent.target) ? onTapCancel : onTap;
                if (handler) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].update(()=>handler(endEvent, endInfo));
                }
            };
            const removePointerUpListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(window, "pointerup", endPointerPress, {
                passive: !(props.onTap || props["onPointerUp"])
            });
            const removePointerCancelListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(window, "pointercancel", (cancelEvent, cancelInfo)=>this.cancelPress(cancelEvent, cancelInfo), {
                passive: !(props.onTapCancel || props["onPointerCancel"])
            });
            this.removeEndListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(removePointerUpListener, removePointerCancelListener);
            this.startPress(startEvent, startInfo);
        };
        this.startAccessiblePress = ()=>{
            const handleKeydown = (keydownEvent)=>{
                if (keydownEvent.key !== "Enter" || this.isPressing) return;
                const handleKeyup = (keyupEvent)=>{
                    if (keyupEvent.key !== "Enter" || !this.checkPressEnd()) return;
                    fireSyntheticPointerEvent("up", (event, info)=>{
                        const { onTap } = this.node.getProps();
                        if (onTap) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>onTap(event, info));
                        }
                    });
                };
                this.removeEndListeners();
                this.removeEndListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(this.node.current, "keyup", handleKeyup);
                fireSyntheticPointerEvent("down", (event, info)=>{
                    this.startPress(event, info);
                });
            };
            const removeKeydownListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(this.node.current, "keydown", handleKeydown);
            const handleBlur = ()=>{
                if (!this.isPressing) return;
                fireSyntheticPointerEvent("cancel", (cancelEvent, cancelInfo)=>this.cancelPress(cancelEvent, cancelInfo));
            };
            const removeBlurListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(this.node.current, "blur", handleBlur);
            this.removeAccessibleListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(removeKeydownListener, removeBlurListener);
        };
    }
    startPress(event, info) {
        this.isPressing = true;
        const { onTapStart, whileTap } = this.node.getProps();
        /**
         * Ensure we trigger animations before firing event callback
         */ if (whileTap && this.node.animationState) {
            this.node.animationState.setActive("whileTap", true);
        }
        if (onTapStart) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>onTapStart(event, info));
        }
    }
    checkPressEnd() {
        this.removeEndListeners();
        this.isPressing = false;
        const props = this.node.getProps();
        if (props.whileTap && this.node.animationState) {
            this.node.animationState.setActive("whileTap", false);
        }
        return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragActive"])();
    }
    cancelPress(event, info) {
        if (!this.checkPressEnd()) return;
        const { onTapCancel } = this.node.getProps();
        if (onTapCancel) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>onTapCancel(event, info));
        }
    }
    mount() {
        const props = this.node.getProps();
        const removePointerListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(props.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, {
            passive: !(props.onTapStart || props["onPointerStart"])
        });
        const removeFocusListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(this.node.current, "focus", this.startAccessiblePress);
        this.removeStartListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(removePointerListener, removeFocusListener);
    }
    unmount() {
        this.removeStartListeners();
        this.removeEndListeners();
        this.removeAccessibleListeners();
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "PanSession": ()=>PanSession
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/event-info.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$distance$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/distance.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/utils/is-primary-pointer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
/**
 * @internal
 */ class PanSession {
    constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}){
        /**
         * @internal
         */ this.startEvent = null;
        /**
         * @internal
         */ this.lastMoveEvent = null;
        /**
         * @internal
         */ this.lastMoveEventInfo = null;
        /**
         * @internal
         */ this.handlers = {};
        /**
         * @internal
         */ this.contextWindow = window;
        this.updatePoint = ()=>{
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            const info = getPanInfo(this.lastMoveEventInfo, this.history);
            const isPanStarted = this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursoe.
            const isDistancePastThreshold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$distance$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["distance2D"])(info.offset, {
                x: 0,
                y: 0
            }) >= 3;
            if (!isPanStarted && !isDistancePastThreshold) return;
            const { point } = info;
            const { timestamp } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"];
            this.history.push({
                ...point,
                timestamp
            });
            const { onStart, onMove } = this.handlers;
            if (!isPanStarted) {
                onStart && onStart(this.lastMoveEvent, info);
                this.startEvent = this.lastMoveEvent;
            }
            onMove && onMove(this.lastMoveEvent, info);
        };
        this.handlePointerMove = (event, info)=>{
            this.lastMoveEvent = event;
            this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
            // Throttle mouse move event to once per frame
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].update(this.updatePoint, true);
        };
        this.handlePointerUp = (event, info)=>{
            this.end();
            const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
            if (this.dragSnapToOrigin) resumeAnimation && resumeAnimation();
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            const panInfo = getPanInfo(event.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
            if (this.startEvent && onEnd) {
                onEnd(event, panInfo);
            }
            onSessionEnd && onSessionEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimaryPointer"])(event)) return;
        this.dragSnapToOrigin = dragSnapToOrigin;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        this.contextWindow = contextWindow || window;
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractEventInfo"])(event);
        const initialInfo = transformPoint(info, this.transformPagePoint);
        const { point } = initialInfo;
        const { timestamp } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"];
        this.history = [
            {
                ...point,
                timestamp
            }
        ];
        const { onSessionStart } = handlers;
        onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(this.contextWindow, "pointermove", this.handlePointerMove), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(this.contextWindow, "pointerup", this.handlePointerUp), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(this.contextWindow, "pointercancel", this.handlePointerUp));
    }
    updateHandlers(handlers) {
        this.handlers = handlers;
    }
    end() {
        this.removeListeners && this.removeListeners();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelFrame"])(this.updatePoint);
    }
}
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? {
        point: transformPagePoint(info.point)
    } : info;
}
function subtractPoint(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}
function getPanInfo({ point }, history) {
    return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity(history, 0.1)
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
    if (history.length < 2) {
        return {
            x: 0,
            y: 0
        };
    }
    let i = history.length - 1;
    let timestampedPoint = null;
    const lastPoint = lastDevicePoint(history);
    while(i >= 0){
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp > (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return {
            x: 0,
            y: 0
        };
    }
    const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(lastPoint.timestamp - timestampedPoint.timestamp);
    if (time === 0) {
        return {
            x: 0,
            y: 0
        };
    }
    const currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "applyConstraints": ()=>applyConstraints,
    "calcOrigin": ()=>calcOrigin,
    "calcRelativeAxisConstraints": ()=>calcRelativeAxisConstraints,
    "calcRelativeConstraints": ()=>calcRelativeConstraints,
    "calcViewportAxisConstraints": ()=>calcViewportAxisConstraints,
    "calcViewportConstraints": ()=>calcViewportConstraints,
    "defaultElastic": ()=>defaultElastic,
    "rebaseAxisConstraints": ()=>rebaseAxisConstraints,
    "resolveAxisElastic": ()=>resolveAxisElastic,
    "resolveDragElastic": ()=>resolveDragElastic,
    "resolvePointElastic": ()=>resolvePointElastic
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/progress.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$calc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */ function applyConstraints(point, { min, max }, elastic) {
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(min, point, elastic.min) : Math.max(point, min);
    } else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */ function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined ? axis.max + max - (axis.max - axis.min) : undefined
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */ function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */ function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    let min = constraintsAxis.min - layoutAxis.min;
    let max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
        [min, max] = [
            max,
            min
        ];
    }
    return {
        min,
        max
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */ function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
    };
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */ function calcOrigin(source, target) {
    let origin = 0.5;
    const sourceLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$calc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcLength"])(source);
    const targetLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$calc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcLength"])(target);
    if (targetLength > sourceLength) {
        origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progress"])(target.min, target.max - sourceLength, source.min);
    } else if (sourceLength > targetLength) {
        origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progress"])(source.min, source.max - targetLength, target.min);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, 1, origin);
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */ function rebaseAxisConstraints(layout, constraints) {
    const relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
const defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */ function resolveDragElastic(dragElastic = defaultElastic) {
    if (dragElastic === false) {
        dragElastic = 0;
    } else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom")
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel)
    };
}
function resolvePointElastic(dragElastic, label) {
    return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "VisualElementDragControls": ()=>VisualElementDragControls,
    "elementDragControls": ()=>elementDragControls
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$pan$2f$PanSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$measure$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/projection/utils/measure.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/event-info.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-dom-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$calc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$interfaces$2f$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$get$2d$context$2d$window$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/get-context-window.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const elementDragControls = new WeakMap();
/**
 *
 */ // let latestPointerEvent: PointerEvent
class VisualElementDragControls {
    constructor(visualElement){
        // This is a reference to the global drag gesture lock, ensuring only one component
        // can "capture" the drag of one or both axes.
        // TODO: Look into moving this into pansession?
        this.openGlobalLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = {
            x: 0,
            y: 0
        };
        /**
         * The permitted boundaries of travel, in pixels.
         */ this.constraints = false;
        this.hasMutatedConstraints = false;
        /**
         * The per-axis resolved elastic values.
         */ this.elastic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBox"])();
        this.visualElement = visualElement;
    }
    start(originEvent, { snapToCursor = false } = {}) {
        /**
         * Don't start dragging if this component is exiting
         */ const { presenceContext } = this.visualElement;
        if (presenceContext && presenceContext.isPresent === false) return;
        const onSessionStart = (event)=>{
            const { dragSnapToOrigin } = this.getProps();
            // Stop or pause any animations on both axis values immediately. This allows the user to throw and catch
            // the component.
            dragSnapToOrigin ? this.pauseAnimation() : this.stopAnimation();
            if (snapToCursor) {
                this.snapToCursor((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractEventInfo"])(event, "page").point);
            }
        };
        const onStart = (event, info)=>{
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            const { drag, dragPropagation, onDragStart } = this.getProps();
            if (drag && !dragPropagation) {
                if (this.openGlobalLock) this.openGlobalLock();
                this.openGlobalLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalLock"])(drag);
                // If we don 't have the lock, don't start dragging
                if (!this.openGlobalLock) return;
            }
            this.isDragging = true;
            this.currentDirection = null;
            this.resolveConstraints();
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = true;
                this.visualElement.projection.target = undefined;
            }
            /**
             * Record gesture origin
             */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
                let current = this.getAxisMotionValue(axis).get() || 0;
                /**
                 * If the MotionValue is a percentage value convert to px
                 */ if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"].test(current)) {
                    const { projection } = this.visualElement;
                    if (projection && projection.layout) {
                        const measuredAxis = projection.layout.layoutBox[axis];
                        if (measuredAxis) {
                            const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$calc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcLength"])(measuredAxis);
                            current = length * (parseFloat(current) / 100);
                        }
                    }
                }
                this.originPoint[axis] = current;
            });
            // Fire onDragStart event
            if (onDragStart) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>onDragStart(event, info));
            }
            const { animationState } = this.visualElement;
            animationState && animationState.setActive("whileDrag", true);
        };
        const onMove = (event, info)=>{
            // latestPointerEvent = event
            const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !this.openGlobalLock) return;
            const { offset } = info;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && this.currentDirection === null) {
                this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (this.currentDirection !== null) {
                    onDirectionLock && onDirectionLock(this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            this.updateAxis("x", info.point, offset);
            this.updateAxis("y", info.point, offset);
            /**
             * Ideally we would leave the renderer to fire naturally at the end of
             * this frame but if the element is about to change layout as the result
             * of a re-render we want to ensure the browser can read the latest
             * bounding box to ensure the pointer and element don't fall out of sync.
             */ this.visualElement.render();
            /**
             * This must fire after the render call as it might trigger a state
             * change which itself might trigger a layout update.
             */ onDrag && onDrag(event, info);
        };
        const onSessionEnd = (event, info)=>this.stop(event, info);
        const resumeAnimation = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
                var _a;
                return this.getAnimationState(axis) === "paused" && ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
            });
        const { dragSnapToOrigin } = this.getProps();
        this.panSession = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$pan$2f$PanSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanSession"](originEvent, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd,
            resumeAnimation
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin,
            contextWindow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$get$2d$context$2d$window$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContextWindow"])(this.visualElement)
        });
    }
    stop(event, info) {
        const isDragging = this.isDragging;
        this.cancel();
        if (!isDragging) return;
        const { velocity } = info;
        this.startAnimation(velocity);
        const { onDragEnd } = this.getProps();
        if (onDragEnd) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>onDragEnd(event, info));
        }
    }
    cancel() {
        this.isDragging = false;
        const { projection, animationState } = this.visualElement;
        if (projection) {
            projection.isAnimationBlocked = false;
        }
        this.panSession && this.panSession.end();
        this.panSession = undefined;
        const { dragPropagation } = this.getProps();
        if (!dragPropagation && this.openGlobalLock) {
            this.openGlobalLock();
            this.openGlobalLock = null;
        }
        animationState && animationState.setActive("whileDrag", false);
    }
    updateAxis(axis, _point, offset) {
        const { drag } = this.getProps();
        // If we're not dragging this axis, do an early return.
        if (!offset || !shouldDrag(axis, drag, this.currentDirection)) return;
        const axisValue = this.getAxisMotionValue(axis);
        let next = this.originPoint[axis] + offset[axis];
        // Apply constraints
        if (this.constraints && this.constraints[axis]) {
            next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyConstraints"])(next, this.constraints[axis], this.elastic[axis]);
        }
        axisValue.set(next);
    }
    resolveConstraints() {
        var _a;
        const { dragConstraints, dragElastic } = this.getProps();
        const layout = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
        const prevConstraints = this.constraints;
        if (dragConstraints && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        } else {
            if (dragConstraints && layout) {
                this.constraints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcRelativeConstraints"])(layout.layoutBox, dragConstraints);
            } else {
                this.constraints = false;
            }
        }
        this.elastic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveDragElastic"])(dragElastic);
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative.
         */ if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
                if (this.constraints !== false && this.getAxisMotionValue(axis)) {
                    this.constraints[axis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rebaseAxisConstraints"])(layout.layoutBox[axis], this.constraints[axis]);
                }
            });
        }
    }
    resolveRefConstraints() {
        const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
        if (!constraints || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(constraints)) return false;
        const constraintsElement = constraints.current;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        const { projection } = this.visualElement;
        // TODO
        if (!projection || !projection.layout) return false;
        const constraintsBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$measure$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measurePageBox"])(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        let measuredConstraints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcViewportConstraints"])(projection.layout.layoutBox, constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */ if (onMeasureDragConstraints) {
            const userConstraints = onMeasureDragConstraints((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertBoxToBoundingBox"])(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertBoundingBoxToBox"])(userConstraints);
            }
        }
        return measuredConstraints;
    }
    startAnimation(velocity) {
        const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
        const constraints = this.constraints || {};
        const momentumAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
            if (!shouldDrag(axis, drag, this.currentDirection)) {
                return;
            }
            let transition = constraints && constraints[axis] || {};
            if (dragSnapToOrigin) transition = {
                min: 0,
                max: 0
            };
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */ const bounceStiffness = dragElastic ? 200 : 1000000;
            const bounceDamping = dragElastic ? 40 : 10000000;
            const inertia = {
                type: "inertia",
                velocity: dragMomentum ? velocity[axis] : 0,
                bounceStiffness,
                bounceDamping,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...dragTransition,
                ...transition
            };
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return this.startAxisValueAnimation(axis, inertia);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
        const axisValue = this.getAxisMotionValue(axis);
        return axisValue.start((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$interfaces$2f$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animateMotionValue"])(axis, axisValue, 0, transition, this.visualElement));
    }
    stopAnimation() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>this.getAxisMotionValue(axis).stop());
    }
    pauseAnimation() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
            var _a;
            return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause();
        });
    }
    getAnimationState(axis) {
        var _a;
        return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
    }
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */ getAxisMotionValue(axis) {
        const dragKey = `_drag${axis.toUpperCase()}`;
        const props = this.visualElement.getProps();
        const externalMotionValue = props[dragKey];
        return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : undefined) || 0);
    }
    snapToCursor(point) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
            const { drag } = this.getProps();
            // If we're not dragging this axis, do an early return.
            if (!shouldDrag(axis, drag, this.currentDirection)) return;
            const { projection } = this.visualElement;
            const axisValue = this.getAxisMotionValue(axis);
            if (projection && projection.layout) {
                const { min, max } = projection.layout.layoutBox[axis];
                axisValue.set(point[axis] - (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(min, max, 0.5));
            }
        });
    }
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */ scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const { drag, dragConstraints } = this.getProps();
        const { projection } = this.visualElement;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(dragConstraints) || !projection || !this.constraints) return;
        /**
         * Stop current animations as there can be visual glitching if we try to do
         * this mid-animation
         */ this.stopAnimation();
        /**
         * Record the relative position of the dragged element relative to the
         * constraints box and save as a progress value.
         */ const boxProgress = {
            x: 0,
            y: 0
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
            const axisValue = this.getAxisMotionValue(axis);
            if (axisValue && this.constraints !== false) {
                const latest = axisValue.get();
                boxProgress[axis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcOrigin"])({
                    min: latest,
                    max: latest
                }, this.constraints[axis]);
            }
        });
        /**
         * Update the layout of this element and resolve the latest drag constraints
         */ const { transformTemplate } = this.visualElement.getProps();
        this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        projection.root && projection.root.updateScroll();
        projection.updateLayout();
        this.resolveConstraints();
        /**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
            if (!shouldDrag(axis, drag, null)) return;
            /**
             * Calculate a new transform based on the previous box progress
             */ const axisValue = this.getAxisMotionValue(axis);
            const { min, max } = this.constraints[axis];
            axisValue.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(min, max, boxProgress[axis]));
        });
    }
    addListeners() {
        if (!this.visualElement.current) return;
        elementDragControls.set(this.visualElement, this);
        const element = this.visualElement.current;
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */ const stopPointerListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(element, "pointerdown", (event)=>{
            const { drag, dragListener = true } = this.getProps();
            drag && dragListener && this.start(event);
        });
        const measureDragConstraints = ()=>{
            const { dragConstraints } = this.getProps();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(dragConstraints)) {
                this.constraints = this.resolveRefConstraints();
            }
        };
        const { projection } = this.visualElement;
        const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
        if (projection && !projection.layout) {
            projection.root && projection.root.updateScroll();
            projection.updateLayout();
        }
        measureDragConstraints();
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */ const stopResizeListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDomEvent"])(window, "resize", ()=>this.scalePositionWithinConstraints());
        /**
         * If the element's layout changes, calculate the delta and apply that to
         * the drag gesture's origin point.
         */ const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged })=>{
            if (this.isDragging && hasLayoutChanged) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$each$2d$axis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachAxis"])((axis)=>{
                    const motionValue = this.getAxisMotionValue(axis);
                    if (!motionValue) return;
                    this.originPoint[axis] += delta[axis].translate;
                    motionValue.set(motionValue.get() + delta[axis].translate);
                });
                this.visualElement.render();
            }
        });
        return ()=>{
            stopResizeListener();
            stopPointerListener();
            stopMeasureLayoutListener();
            stopLayoutUpdateListener && stopLayoutUpdateListener();
        };
    }
    getProps() {
        const props = this.visualElement.getProps();
        const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$utils$2f$constraints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultElastic"], dragMomentum = true } = props;
        return {
            ...props,
            drag,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum
        };
    }
}
function shouldDrag(direction, drag, currentDirection) {
    return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */ function getCurrentDirection(offset, lockThreshold = 10) {
    let direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    } else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/index.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "DragGesture": ()=>DragGesture
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$VisualElementDragControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
class DragGesture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    constructor(node){
        super(node);
        this.removeGroupControls = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        this.removeListeners = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        this.controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$VisualElementDragControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualElementDragControls"](node);
    }
    mount() {
        // If we've been provided a DragControls for manual control over the drag gesture,
        // subscribe this component to it on mount.
        const { dragControls } = this.node.getProps();
        if (dragControls) {
            this.removeGroupControls = dragControls.subscribe(this.controls);
        }
        this.removeListeners = this.controls.addListeners() || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
    }
    unmount() {
        this.removeGroupControls();
        this.removeListeners();
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/pan/index.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "PanGesture": ()=>PanGesture
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$pan$2f$PanSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$get$2d$context$2d$window$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/utils/get-context-window.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.2.3_@emotion+is-prop-valid@1.2.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
const asyncHandler = (handler)=>(event, info)=>{
        if (handler) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>handler(event, info));
        }
    };
class PanGesture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    constructor(){
        super(...arguments);
        this.removePointerDownListener = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
    }
    onPointerDown(pointerDownEvent) {
        this.session = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$pan$2f$PanSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanSession"](pointerDownEvent, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$get$2d$context$2d$window$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContextWindow"])(this.node)
        });
    }
    createPanHandlers() {
        const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
        return {
            onSessionStart: asyncHandler(onPanSessionStart),
            onStart: asyncHandler(onPanStart),
            onMove: onPan,
            onEnd: (event, info)=>{
                delete this.session;
                if (onPanEnd) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>onPanEnd(event, info));
                }
            }
        };
    }
    mount() {
        this.removePointerDownListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$2$2e$3_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$2$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$pointer$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPointerEvent"])(this.node.current, "pointerdown", (event)=>this.onPointerDown(event));
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
        this.removePointerDownListener();
        this.session && this.session.end();
    }
}
;

})()),
}]);

//# sourceMappingURL=394a6_framer-motion_dist_es_gestures_0cfeb9._.js.map