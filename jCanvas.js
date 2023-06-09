/**
 * @license jCanvas v21.0.1
 * Copyright 2017 Caleb Evans
 * Released under the MIT license
 */
!(function (a, b, c) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = function (a, b) {
              return c(a, b);
          })
        : c(a, b);
})("undefined" != typeof window ? window.jQuery : {}, "undefined" != typeof window ? window : this, function (a, b) {
    "use strict";
    function c(a) {
        var b,
            c = this;
        for (b in a) Object.prototype.hasOwnProperty.call(a, b) && (c[b] = a[b]);
        return c;
    }
    function d() {
        ra(this, d.baseDefaults);
    }
    function e(a) {
        return "string" === ta(a);
    }
    function f(a) {
        return "function" === ta(a);
    }
    function g(a) {
        return !isNaN(pa(a)) && !isNaN(qa(a));
    }
    function h(a) {
        return a && a.getContext ? a.getContext("2d") : null;
    }
    function i(a) {
        var b, c;
        for (b in a) Object.prototype.hasOwnProperty.call(a, b) && ((c = a[b]), "string" === ta(c) && g(c) && "text" !== b && (a[b] = qa(c)));
        void 0 !== a.text && (a.text = String(a.text));
    }
    function j(a) {
        return (a = ra({}, a)), (a.masks = a.masks.slice(0)), a;
    }
    function k(a, b) {
        var c;
        a.save(), (c = j(b.transforms)), b.savedTransforms.push(c);
    }
    function l(a, b) {
        0 === b.savedTransforms.length ? (b.transforms = j(Fa)) : (a.restore(), (b.transforms = b.savedTransforms.pop()));
    }
    function m(a, b, c, d) {
        c[d] && (f(c[d]) ? (b[d] = c[d].call(a, c)) : (b[d] = c[d]));
    }
    function n(a, b, c) {
        m(a, b, c, "fillStyle"),
            m(a, b, c, "strokeStyle"),
            (b.lineWidth = c.strokeWidth),
            c.rounded ? (b.lineCap = b.lineJoin = "round") : ((b.lineCap = c.strokeCap), (b.lineJoin = c.strokeJoin), (b.miterLimit = c.miterLimit)),
            c.strokeDash || (c.strokeDash = []),
            b.setLineDash && b.setLineDash(c.strokeDash),
            (b.webkitLineDash = c.strokeDash),
            (b.lineDashOffset = b.webkitLineDashOffset = b.mozDashOffset = c.strokeDashOffset),
            (b.shadowOffsetX = c.shadowX),
            (b.shadowOffsetY = c.shadowY),
            (b.shadowBlur = c.shadowBlur),
            (b.shadowColor = c.shadowColor),
            (b.globalAlpha = c.opacity),
            (b.globalCompositeOperation = c.compositing),
            c.imageSmoothing && (b.imageSmoothingEnabled = c.imageSmoothing);
    }
    function o(a, b, c) {
        c.mask && (c.autosave && k(a, b), a.clip(), b.transforms.masks.push(c._args));
    }
    function p(a, b) {
        b._transformed && a.restore();
    }
    function q(a, b, c) {
        var d;
        c.closed && b.closePath(),
            c.shadowStroke && 0 !== c.strokeWidth
                ? (b.stroke(), b.fill(), (b.shadowColor = "transparent"), (b.shadowBlur = 0), b.stroke())
                : (b.fill(), "transparent" !== c.fillStyle && (b.shadowColor = "transparent"), 0 !== c.strokeWidth && b.stroke()),
            c.closed || b.closePath(),
            p(b, c),
            c.mask && ((d = s(a)), o(b, d, c));
    }
    function r(a, b, c, d, e) {
        (c._toRad = c.inDegrees ? va / 180 : 1),
            (c._transformed = !0),
            b.save(),
            c.fromCenter || c._centered || void 0 === d || (void 0 === e && (e = d), (c.x += d / 2), (c.y += e / 2), (c._centered = !0)),
            c.rotate && S(b, c, null),
            (1 === c.scale && 1 === c.scaleX && 1 === c.scaleY) || T(b, c, null),
            (c.translate || c.translateX || c.translateY) && U(b, c, null);
    }
    function s(b) {
        var c,
            d = Ea.dataCache;
        return (
            d._canvas === b && d._data
                ? (c = d._data)
                : ((c = a.data(b, "jCanvas")),
                  c ||
                      ((c = {
                          canvas: b,
                          layers: [],
                          layer: { names: {}, groups: {} },
                          eventHooks: {},
                          intersecting: [],
                          lastIntersected: null,
                          cursor: a(b).css("cursor"),
                          drag: { layer: null, dragging: !1 },
                          event: { type: null, x: null, y: null },
                          events: {},
                          transforms: j(Fa),
                          savedTransforms: [],
                          animating: !1,
                          animated: null,
                          pixelRatio: 1,
                          scaled: !1,
                          redrawOnMousemove: !1,
                      }),
                      a.data(b, "jCanvas", c)),
                  (d._canvas = b),
                  (d._data = c)),
            c
        );
    }
    function t(a, b, c) {
        var d;
        for (d in Ia.events) Object.prototype.hasOwnProperty.call(Ia.events, d) && (c[d] || (c.cursors && c.cursors[d])) && v(a, b, c, d);
        b.events.mouseout ||
            (a.bind("mouseout.jCanvas", function () {
                var c,
                    d = b.drag.layer;
                for (d && ((b.drag = {}), G(a, b, d, "dragcancel")), c = 0; c < b.layers.length; c += 1) (d = b.layers[c]), d._hovered && a.triggerLayerEvent(b.layers[c], "mouseout");
                a.drawLayers();
            }),
            (b.events.mouseout = !0));
    }
    function u(a, b, c, d) {
        Ia.events[d](a, b), (c._event = !0);
    }
    function v(a, b, c, d) {
        u(a, b, c, d), ("mouseover" !== d && "mouseout" !== d && "mousemove" !== d) || (b.redrawOnMousemove = !0);
    }
    function w(a, b, c) {
        var d, e, f;
        if (c.draggable || c.cursors) {
            for (d = ["mousedown", "mousemove", "mouseup"], f = 0; f < d.length; f += 1) (e = d[f]), u(a, b, c, e);
            c._event = !0;
        }
    }
    function x(a, b, c, d) {
        var f = b.layer.names;
        d ? void 0 !== d.name && e(c.name) && c.name !== d.name && delete f[c.name] : (d = c), e(d.name) && (f[d.name] = c);
    }
    function y(a, b, c, d) {
        var e,
            f,
            g,
            h,
            i,
            j = b.layer.groups;
        if (d) {
            if (void 0 !== d.groups && null !== c.groups)
                for (g = 0; g < c.groups.length; g += 1)
                    if (((f = c.groups[g]), (e = j[f]))) {
                        for (i = 0; i < e.length; i += 1)
                            if (e[i] === c) {
                                (h = i), e.splice(i, 1);
                                break;
                            }
                        0 === e.length && delete j[f];
                    }
        } else d = c;
        if (void 0 !== d.groups && null !== d.groups) for (g = 0; g < d.groups.length; g += 1) (f = d.groups[g]), (e = j[f]), e || ((e = j[f] = []), (e.name = f)), void 0 === h && (h = e.length), e.splice(h, 0, c);
    }
    function z(a) {
        var b, c, d, e;
        for (b = null, c = a.intersecting.length - 1; c >= 0; c -= 1)
            if (((b = a.intersecting[c]), b._masks)) {
                for (e = b._masks.length - 1; e >= 0; e -= 1)
                    if (((d = b._masks[e]), !d.intersects)) {
                        b.intersects = !1;
                        break;
                    }
                if (b.intersects && !b.intangible) break;
            }
        return b && b.intangible && (b = null), b;
    }
    function A(a, b, c, d) {
        c && c.visible && c._method && ((c._next = d || null), c._method && c._method.call(a, c));
    }
    function B(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m;
        if (((g = b.drag), (e = g.layer), (h = (e && e.dragGroups) || []), (d = b.layers), "mousemove" === c || "touchmove" === c)) {
            if (
                (g.dragging ||
                    ((g.dragging = !0), (e.dragging = !0), e.bringToFront && (d.splice(e.index, 1), (e.index = d.push(e))), (e._startX = e.x), (e._startY = e.y), (e._endX = e._eventX), (e._endY = e._eventY), G(a, b, e, "dragstart")),
                g.dragging)
            )
                for (
                    l = e._eventX - (e._endX - e._startX),
                        m = e._eventY - (e._endY - e._startY),
                        e.updateDragX && (l = e.updateDragX.call(a[0], e, l)),
                        e.updateDragY && (m = e.updateDragY.call(a[0], e, m)),
                        e.dx = l - e.x,
                        e.dy = m - e.y,
                        "y" !== e.restrictDragToAxis && (e.x = l),
                        "x" !== e.restrictDragToAxis && (e.y = m),
                        G(a, b, e, "drag"),
                        k = 0;
                    k < h.length;
                    k += 1
                )
                    if (((j = h[k]), (i = b.layer.groups[j]), e.groups && i))
                        for (f = 0; f < i.length; f += 1)
                            i[f] !== e && ("y" !== e.restrictDragToAxis && "y" !== i[f].restrictDragToAxis && (i[f].x += e.dx), "x" !== e.restrictDragToAxis && "x" !== i[f].restrictDragToAxis && (i[f].y += e.dy));
        } else ("mouseup" !== c && "touchend" !== c) || (g.dragging && ((e.dragging = !1), (g.dragging = !1), (b.redrawOnMousemove = b.originalRedrawOnMousemove), G(a, b, e, "dragstop")), (b.drag = {}));
    }
    function C(b, c, d) {
        var e;
        c.cursors && (e = c.cursors[d]), -1 !== a.inArray(e, Ga.cursors) && (e = Ga.prefix + e), e && b.css({ cursor: e });
    }
    function D(a, b) {
        a.css({ cursor: b.cursor });
    }
    function E(a, b, c, d, e) {
        d[c] && b._running && !b._running[c] && ((b._running[c] = !0), d[c].call(a[0], b, e), (b._running[c] = !1));
    }
    function F(b, c) {
        return !(b.disableEvents || (b.intangible && -1 !== a.inArray(c, Ha)));
    }
    function G(a, b, c, d, e) {
        F(c, d) && ("mouseout" !== d && C(a, c, d), E(a, c, d, c, e), E(a, c, d, b.eventHooks, e), E(a, c, d, Ia.eventHooks, e));
    }
    function H(b, d, f, g) {
        var h,
            j,
            k,
            l = d._layer ? f : d;
        return (
            (d._args = f),
            (d.draggable || d.dragGroups) && ((d.layer = !0), (d.draggable = !0)),
            d._method || (g ? (d._method = g) : d.method ? (d._method = a.fn[d.method]) : d.type && (d._method = a.fn[Da.drawings[d.type]])),
            d.layer && !d._layer
                ? ((h = a(b)),
                  (j = s(b)),
                  (k = j.layers),
                  (null === l.name || (e(l.name) && void 0 === j.layer.names[l.name])) &&
                      (i(d),
                      (l = new c(d)),
                      (l.canvas = b),
                      (l.layer = !0),
                      (l._layer = !0),
                      (l._running = {}),
                      null !== l.data ? (l.data = ra({}, l.data)) : (l.data = {}),
                      null !== l.groups ? (l.groups = l.groups.slice(0)) : (l.groups = []),
                      x(h, j, l),
                      y(h, j, l),
                      t(h, j, l),
                      w(h, j, l),
                      (d._event = l._event),
                      l._method === a.fn.drawText && h.measureText(l),
                      null === l.index && (l.index = k.length),
                      k.splice(l.index, 0, l),
                      (d._args = l),
                      G(h, j, l, "add")))
                : d.layer || i(d),
            l
        );
    }
    function I(a) {
        var b, c;
        for (c = 0; c < Ga.props.length; c += 1) (b = Ga.props[c]), (a[b] = a["_" + b]);
    }
    function J(a, b) {
        var c, d;
        for (d = 0; d < Ga.props.length; d += 1) (c = Ga.props[d]), void 0 !== a[c] && ((a["_" + c] = a[c]), (Ga.propsObj[c] = !0), b && delete a[c]);
    }
    function K(a, b, c) {
        var d, e, g, h;
        for (d in c)
            if (Object.prototype.hasOwnProperty.call(c, d) && ((e = c[d]), f(e) && (c[d] = e.call(a, b, d)), "object" === ta(e) && ua(e))) {
                for (g in e) Object.prototype.hasOwnProperty.call(e, g) && ((h = e[g]), void 0 !== b[d] && ((b[d + "." + g] = b[d][g]), (c[d + "." + g] = h)));
                delete c[d];
            }
        return c;
    }
    function L(a) {
        var b;
        for (b in a) Object.prototype.hasOwnProperty.call(a, b) && -1 !== b.indexOf(".") && delete a[b];
    }
    function M(b) {
        var c,
            d,
            e = [],
            f = 1;
        return (
            "transparent" === b ? (b = "rgba(0, 0, 0, 0)") : b.match(/^([a-z]+|#[0-9a-f]+)$/gi) && ((d = ka.head), (c = d.style.color), (d.style.color = b), (b = a.css(d, "color")), (d.style.color = c)),
            b.match(/^rgb/gi) && ((e = b.match(/(\d+(\.\d+)?)/gi)), b.match(/%/gi) && (f = 2.55), (e[0] *= f), (e[1] *= f), (e[2] *= f), void 0 !== e[3] ? (e[3] = qa(e[3])) : (e[3] = 1)),
            e
        );
    }
    function N(a) {
        var b,
            c = 3;
        for ("array" !== ta(a.start) && ((a.start = M(a.start)), (a.end = M(a.end))), a.now = [], (1 === a.start[3] && 1 === a.end[3]) || (c = 4), b = 0; b < c; b += 1)
            (a.now[b] = a.start[b] + (a.end[b] - a.start[b]) * a.pos), b < 3 && (a.now[b] = wa(a.now[b]));
        1 !== a.start[3] || 1 !== a.end[3] ? (a.now = "rgba(" + a.now.join(",") + ")") : (a.now.slice(0, 3), (a.now = "rgb(" + a.now.join(",") + ")")), a.elem.nodeName ? (a.elem.style[a.prop] = a.now) : (a.elem[a.prop] = a.now);
    }
    function O(a) {
        return Da.touchEvents[a] && (a = Da.touchEvents[a]), a;
    }
    function P(a) {
        return Da.mouseEvents[a] && (a = Da.mouseEvents[a]), a;
    }
    function Q(a) {
        Ia.events[a] = function (b, c) {
            function d(a) {
                (g.x = a.offsetX), (g.y = a.offsetY), (g.type = e), (g.event = a), ("mousemove" !== a.type || c.redrawOnMousemove || c.drag.dragging) && b.drawLayers({ resetFire: !0 }), a.preventDefault();
            }
            var e, f, g;
            (g = c.event), (e = "mouseover" === a || "mouseout" === a ? "mousemove" : a), (f = O(e)), c.events[e] || (f !== e ? b.bind(e + ".jCanvas " + f + ".jCanvas", d) : b.bind(e + ".jCanvas", d), (c.events[e] = !0));
        };
    }
    function R(a, b, c) {
        var d, e, f, g, h, i, j, k;
        (d = c._args) &&
            ((e = s(a)),
            (f = e.event),
            null !== f.x && null !== f.y && ((i = f.x * e.pixelRatio), (j = f.y * e.pixelRatio), (g = b.isPointInPath(i, j) || (b.isPointInStroke && b.isPointInStroke(i, j)))),
            (h = e.transforms),
            (d.eventX = f.x),
            (d.eventY = f.y),
            (d.event = f.event),
            (k = e.transforms.rotate),
            (i = d.eventX),
            (j = d.eventY),
            0 !== k ? ((d._eventX = i * za(-k) - j * ya(-k)), (d._eventY = j * za(-k) + i * ya(-k))) : ((d._eventX = i), (d._eventY = j)),
            (d._eventX /= h.scaleX),
            (d._eventY /= h.scaleY),
            g && e.intersecting.push(d),
            (d.intersects = Boolean(g)));
    }
    function S(a, b, c) {
        (b._toRad = b.inDegrees ? va / 180 : 1), a.translate(b.x, b.y), a.rotate(b.rotate * b._toRad), a.translate(-b.x, -b.y), c && (c.rotate += b.rotate * b._toRad);
    }
    function T(a, b, c) {
        1 !== b.scale && (b.scaleX = b.scaleY = b.scale), a.translate(b.x, b.y), a.scale(b.scaleX, b.scaleY), a.translate(-b.x, -b.y), c && ((c.scaleX *= b.scaleX), (c.scaleY *= b.scaleY));
    }
    function U(a, b, c) {
        b.translate && (b.translateX = b.translateY = b.translate), a.translate(b.translateX, b.translateY), c && ((c.translateX += b.translateX), (c.translateY += b.translateY));
    }
    function V(a) {
        for (; a < 0; ) a += 2 * va;
        return a;
    }
    function W(a, b) {
        return a.x + a.radius * za(b);
    }
    function X(a, b) {
        return a.y + a.radius * ya(b);
    }
    function Y(a, b, c, d) {
        var e, f, g, h, i, j, k, l, m, n, o;
        c === d ? ((m = 0), (n = 0)) : ((m = c.x), (n = c.y)),
            d.inDegrees || 360 !== d.end || (d.end = 2 * va),
            (d.start *= c._toRad),
            (d.end *= c._toRad),
            (d.start -= va / 2),
            (d.end -= va / 2),
            (o = va / 180),
            d.ccw && (o *= -1),
            (e = W(d, d.start + o)),
            (f = X(d, d.start + o)),
            (g = W(d, d.start)),
            (h = X(d, d.start)),
            $(a, b, c, d, e, f, g, h),
            b.arc(d.x + m, d.y + n, d.radius, d.start, d.end, d.ccw),
            (i = W(d, d.end + o)),
            (j = X(d, d.end + o)),
            (k = W(d, d.end)),
            (l = X(d, d.end)),
            _(a, b, c, d, k, l, i, j);
    }
    function Z(a, b, c, d, e, f, g, h) {
        var i, j, k, l, m, n, o;
        d.arrowRadius &&
            !c.closed &&
            ((o = Aa(h - f, g - e)),
            (o -= va),
            (m = c.strokeWidth * za(o)),
            (n = c.strokeWidth * ya(o)),
            (i = g + d.arrowRadius * za(o + d.arrowAngle / 2)),
            (j = h + d.arrowRadius * ya(o + d.arrowAngle / 2)),
            (k = g + d.arrowRadius * za(o - d.arrowAngle / 2)),
            (l = h + d.arrowRadius * ya(o - d.arrowAngle / 2)),
            b.moveTo(i - m, j - n),
            b.lineTo(g - m, h - n),
            b.lineTo(k - m, l - n),
            b.moveTo(g - m, h - n),
            b.lineTo(g + m, h + n),
            b.moveTo(g, h));
    }
    function $(a, b, c, d, e, f, g, h) {
        d._arrowAngleConverted || ((d.arrowAngle *= c._toRad), (d._arrowAngleConverted = !0)), d.startArrow && Z(a, b, c, d, e, f, g, h);
    }
    function _(a, b, c, d, e, f, g, h) {
        d._arrowAngleConverted || ((d.arrowAngle *= c._toRad), (d._arrowAngleConverted = !0)), d.endArrow && Z(a, b, c, d, e, f, g, h);
    }
    function aa(a, b, c, d) {
        var e, f, g;
        for (e = 2, $(a, b, c, d, d.x2 + c.x, d.y2 + c.y, d.x1 + c.x, d.y1 + c.y), void 0 !== d.x1 && void 0 !== d.y1 && b.moveTo(d.x1 + c.x, d.y1 + c.y); ; ) {
            if (((f = d["x" + e]), (g = d["y" + e]), void 0 === f || void 0 === g)) break;
            b.lineTo(f + c.x, g + c.y), (e += 1);
        }
        (e -= 1), _(a, b, c, d, d["x" + (e - 1)] + c.x, d["y" + (e - 1)] + c.y, d["x" + e] + c.x, d["y" + e] + c.y);
    }
    function ba(a, b, c, d) {
        var e, f, g, h, i;
        for (e = 2, $(a, b, c, d, d.cx1 + c.x, d.cy1 + c.y, d.x1 + c.x, d.y1 + c.y), void 0 !== d.x1 && void 0 !== d.y1 && b.moveTo(d.x1 + c.x, d.y1 + c.y); ; ) {
            if (((f = d["x" + e]), (g = d["y" + e]), (h = d["cx" + (e - 1)]), (i = d["cy" + (e - 1)]), void 0 === f || void 0 === g || void 0 === h || void 0 === i)) break;
            b.quadraticCurveTo(h + c.x, i + c.y, f + c.x, g + c.y), (e += 1);
        }
        (e -= 1), _(a, b, c, d, d["cx" + (e - 1)] + c.x, d["cy" + (e - 1)] + c.y, d["x" + e] + c.x, d["y" + e] + c.y);
    }
    function ca(a, b, c, d) {
        var e, f, g, h, i, j, k, l;
        for (e = 2, f = 1, $(a, b, c, d, d.cx1 + c.x, d.cy1 + c.y, d.x1 + c.x, d.y1 + c.y), void 0 !== d.x1 && void 0 !== d.y1 && b.moveTo(d.x1 + c.x, d.y1 + c.y); ; ) {
            if (((g = d["x" + e]), (h = d["y" + e]), (i = d["cx" + f]), (j = d["cy" + f]), (k = d["cx" + (f + 1)]), (l = d["cy" + (f + 1)]), void 0 === g || void 0 === h || void 0 === i || void 0 === j || void 0 === k || void 0 === l))
                break;
            b.bezierCurveTo(i + c.x, j + c.y, k + c.x, l + c.y, g + c.x, h + c.y), (e += 1), (f += 2);
        }
        (e -= 1), (f -= 2), _(a, b, c, d, d["cx" + (f + 1)] + c.x, d["cy" + (f + 1)] + c.y, d["x" + e] + c.x, d["y" + e] + c.y);
    }
    function da(a, b, c) {
        return (b *= a._toRad), (b -= va / 2), c * za(b);
    }
    function ea(a, b, c) {
        return (b *= a._toRad), (b -= va / 2), c * ya(b);
    }
    function fa(a, b, c, d) {
        var e, f, g, h, i, j, k, l, m, n, o;
        for (
            c === d ? ((h = 0), (i = 0)) : ((h = c.x), (i = c.y)), e = 1, j = l = n = d.x + h, k = m = o = d.y + i, $(a, b, c, d, j + da(c, d.a1, d.l1), k + ea(c, d.a1, d.l1), j, k), void 0 !== d.x && void 0 !== d.y && b.moveTo(j, k);
            ;

        ) {
            if (((f = d["a" + e]), (g = d["l" + e]), void 0 === f || void 0 === g)) break;
            (l = n), (m = o), (n += da(c, f, g)), (o += ea(c, f, g)), b.lineTo(n, o), (e += 1);
        }
        _(a, b, c, d, l, m, n, o);
    }
    function ga(a, b, c) {
        isNaN(pa(c.fontSize)) || (c.fontSize += "px"), (b.font = c.fontStyle + " " + c.fontSize + " " + c.fontFamily);
    }
    function ha(b, c, d, e) {
        var f,
            g,
            h,
            i = Ea.propCache;
        if (i.text === d.text && i.fontStyle === d.fontStyle && i.fontSize === d.fontSize && i.fontFamily === d.fontFamily && i.maxWidth === d.maxWidth && i.lineHeight === d.lineHeight) (d.width = i.width), (d.height = i.height);
        else {
            for (d.width = c.measureText(e[0]).width, h = 1; h < e.length; h += 1) (g = c.measureText(e[h]).width) > d.width && (d.width = g);
            (f = b.style.fontSize), (b.style.fontSize = d.fontSize), (d.height = qa(a.css(b, "fontSize")) * e.length * d.lineHeight), (b.style.fontSize = f);
        }
    }
    function ia(a, b) {
        var c,
            d,
            e,
            f,
            g,
            h,
            i = String(b.text),
            j = b.maxWidth,
            k = i.split("\n"),
            l = [];
        for (e = 0; e < k.length; e += 1) {
            if (((f = k[e]), (g = f.split(" ")), (c = []), (d = ""), 1 === g.length || a.measureText(f).width < j)) c = [f];
            else {
                for (h = 0; h < g.length; h += 1) a.measureText(d + g[h]).width > j && ("" !== d && c.push(d), (d = "")), (d += g[h]), h !== g.length - 1 && (d += " ");
                c.push(d);
            }
            l = l.concat(
                c
                    .join("\n")
                    .replace(/((\n))|($)/gi, "$2")
                    .split("\n")
            );
        }
        return l;
    }
    var ja,
        ka = b.document,
        la = b.Image,
        ma = b.Array,
        na = b.getComputedStyle,
        oa = b.Math,
        pa = b.Number,
        qa = b.parseFloat,
        ra = a.extend,
        sa = a.inArray,
        ta = function (a) {
            return Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
        },
        ua = a.isPlainObject,
        va = oa.PI,
        wa = oa.round,
        xa = oa.abs,
        ya = oa.sin,
        za = oa.cos,
        Aa = oa.atan2,
        Ba = ma.prototype.slice,
        Ca = a.event.fix,
        Da = {},
        Ea = { dataCache: {}, propCache: {}, imageCache: {} },
        Fa = { rotate: 0, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, masks: [] },
        Ga = {},
        Ha = ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "touchstart", "touchmove", "touchend"],
        Ia = { events: {}, eventHooks: {}, future: {} };
    (d.baseDefaults = {
        align: "center",
        arrowAngle: 90,
        arrowRadius: 0,
        autosave: !0,
        baseline: "middle",
        bringToFront: !1,
        ccw: !1,
        closed: !1,
        compositing: "source-over",
        concavity: 0,
        cornerRadius: 0,
        count: 1,
        cropFromCenter: !0,
        crossOrigin: null,
        cursors: null,
        disableEvents: !1,
        draggable: !1,
        dragGroups: null,
        groups: null,
        data: null,
        dx: null,
        dy: null,
        end: 360,
        eventX: null,
        eventY: null,
        fillStyle: "transparent",
        fontStyle: "normal",
        fontSize: "12pt",
        fontFamily: "sans-serif",
        fromCenter: !0,
        height: null,
        imageSmoothing: !0,
        inDegrees: !0,
        intangible: !1,
        index: null,
        letterSpacing: null,
        lineHeight: 1,
        layer: !1,
        mask: !1,
        maxWidth: null,
        miterLimit: 10,
        name: null,
        opacity: 1,
        r1: null,
        r2: null,
        radius: 0,
        repeat: "repeat",
        respectAlign: !1,
        restrictDragToAxis: null,
        rotate: 0,
        rounded: !1,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        shadowBlur: 0,
        shadowColor: "transparent",
        shadowStroke: !1,
        shadowX: 0,
        shadowY: 0,
        sHeight: null,
        sides: 0,
        source: "",
        spread: 0,
        start: 0,
        strokeCap: "butt",
        strokeDash: null,
        strokeDashOffset: 0,
        strokeJoin: "miter",
        strokeStyle: "transparent",
        strokeWidth: 1,
        sWidth: null,
        sx: null,
        sy: null,
        text: "",
        translate: 0,
        translateX: 0,
        translateY: 0,
        type: null,
        visible: !0,
        width: null,
        x: 0,
        y: 0,
    }),
        (ja = new d()),
        (c.prototype = ja),
        (Ia.extend = function (b) {
            return (
                b.name &&
                    (b.props && ra(ja, b.props),
                    (a.fn[b.name] = function a(d) {
                        var e,
                            f,
                            g,
                            i,
                            j = this;
                        for (f = 0; f < j.length; f += 1) (e = j[f]), (g = h(e)) && ((i = new c(d)), H(e, i, d, a), n(e, g, i), b.fn.call(e, g, i));
                        return j;
                    }),
                    b.type && (Da.drawings[b.type] = b.name)),
                a.fn[b.name]
            );
        }),
        (a.fn.getEventHooks = function () {
            var a,
                b,
                c = this,
                d = {};
            return 0 !== c.length && ((a = c[0]), (b = s(a)), (d = b.eventHooks)), d;
        }),
        (a.fn.setEventHooks = function (a) {
            var b,
                c,
                d = this;
            for (b = 0; b < d.length; b += 1) (c = s(d[b])), ra(c.eventHooks, a);
            return d;
        }),
        (a.fn.getLayers = function (a) {
            var b,
                c,
                d,
                e,
                g,
                h = this,
                i = [];
            if (0 !== h.length)
                if (((b = h[0]), (c = s(b)), (d = c.layers), f(a))) for (g = 0; g < d.length; g += 1) (e = d[g]), a.call(b, e) && i.push(e);
                else i = d;
            return i;
        }),
        (a.fn.getLayer = function (a) {
            var b,
                c,
                d,
                f,
                g,
                h,
                i = this;
            if (0 !== i.length)
                if (((b = i[0]), (c = s(b)), (d = c.layers), (h = ta(a)), a && a.layer)) f = a;
                else if ("number" === h) a < 0 && (a = d.length + a), (f = d[a]);
                else if ("regexp" === h) {
                    for (g = 0; g < d.length; g += 1)
                        if (e(d[g].name) && d[g].name.match(a)) {
                            f = d[g];
                            break;
                        }
                } else f = c.layer.names[a];
            return f;
        }),
        (a.fn.getLayerGroup = function (a) {
            var b,
                c,
                d,
                e,
                f,
                g = this,
                h = ta(a);
            if (0 !== g.length)
                if (((b = g[0]), "array" === h)) f = a;
                else if ("regexp" === h) {
                    (c = s(b)), (d = c.layer.groups);
                    for (e in d)
                        if (e.match(a)) {
                            f = d[e];
                            break;
                        }
                } else (c = s(b)), (f = c.layer.groups[a]);
            return f;
        }),
        (a.fn.getLayerIndex = function (a) {
            var b = this,
                c = b.getLayers(),
                d = b.getLayer(a);
            return sa(d, c);
        }),
        (a.fn.setLayer = function (b, c) {
            var d,
                e,
                f,
                h,
                j,
                k,
                l,
                m = this;
            for (e = 0; e < m.length; e += 1)
                if (((d = a(m[e])), (f = s(m[e])), (h = a(m[e]).getLayer(b)))) {
                    x(d, f, h, c), y(d, f, h, c), i(c);
                    for (j in c)
                        Object.prototype.hasOwnProperty.call(c, j) &&
                            ((k = c[j]),
                            (l = ta(k)),
                            "object" === l && ua(k)
                                ? ((h[j] = ra({}, k)), i(h[j]))
                                : "array" === l
                                ? (h[j] = k.slice(0))
                                : "string" === l
                                ? 0 === k.indexOf("+=")
                                    ? (h[j] += qa(k.substr(2)))
                                    : 0 === k.indexOf("-=")
                                    ? (h[j] -= qa(k.substr(2)))
                                    : !isNaN(k) && g(k) && "text" !== j
                                    ? (h[j] = qa(k))
                                    : (h[j] = k)
                                : (h[j] = k));
                    t(d, f, h), w(d, f, h), !1 === a.isEmptyObject(c) && G(d, f, h, "change", c);
                }
            return m;
        }),
        (a.fn.setLayers = function (b, c) {
            var d,
                e,
                f,
                g,
                h = this;
            for (e = 0; e < h.length; e += 1) for (d = a(h[e]), f = d.getLayers(c), g = 0; g < f.length; g += 1) d.setLayer(f[g], b);
            return h;
        }),
        (a.fn.setLayerGroup = function (b, c) {
            var d,
                e,
                f,
                g,
                h = this;
            for (e = 0; e < h.length; e += 1) if (((d = a(h[e])), (f = d.getLayerGroup(b)))) for (g = 0; g < f.length; g += 1) d.setLayer(f[g], c);
            return h;
        }),
        (a.fn.moveLayer = function (b, c) {
            var d,
                e,
                f,
                g,
                h,
                i = this;
            for (e = 0; e < i.length; e += 1)
                (d = a(i[e])), (f = s(i[e])), (g = f.layers), (h = d.getLayer(b)) && ((h.index = sa(h, g)), g.splice(h.index, 1), g.splice(c, 0, h), c < 0 && (c = g.length + c), (h.index = c), G(d, f, h, "move"));
            return i;
        }),
        (a.fn.removeLayer = function (b) {
            var c,
                d,
                e,
                f,
                g,
                h = this;
            for (d = 0; d < h.length; d += 1)
                (c = a(h[d])), (e = s(h[d])), (f = c.getLayers()), (g = c.getLayer(b)) && ((g.index = sa(g, f)), f.splice(g.index, 1), delete g._layer, x(c, e, g, { name: null }), y(c, e, g, { groups: null }), G(c, e, g, "remove"));
            return h;
        }),
        (a.fn.removeLayers = function (b) {
            var c,
                d,
                e,
                f,
                g,
                h,
                i = this;
            for (d = 0; d < i.length; d += 1) {
                for (c = a(i[d]), e = s(i[d]), f = c.getLayers(b).slice(0), h = 0; h < f.length; h += 1) (g = f[h]), c.removeLayer(g);
                (e.layer.names = {}), (e.layer.groups = {});
            }
            return i;
        }),
        (a.fn.removeLayerGroup = function (b) {
            var c,
                d,
                e,
                f,
                g = this;
            if (void 0 !== b) for (d = 0; d < g.length; d += 1) if (((c = a(g[d])), (e = c.getLayerGroup(b)))) for (e = e.slice(0), f = 0; f < e.length; f += 1) c.removeLayer(e[f]);
            return g;
        }),
        (a.fn.addLayerToGroup = function (b, c) {
            var d,
                e,
                f,
                g = this,
                h = [c];
            for (e = 0; e < g.length; e += 1) (d = a(g[e])), (f = d.getLayer(b)), f.groups && ((h = f.groups.slice(0)), -1 === sa(c, f.groups) && h.push(c)), d.setLayer(f, { groups: h });
            return g;
        }),
        (a.fn.removeLayerFromGroup = function (b, c) {
            var d,
                e,
                f,
                g,
                h = this,
                i = [];
            for (e = 0; e < h.length; e += 1) (d = a(h[e])), (f = d.getLayer(b)), f.groups && -1 !== (g = sa(c, f.groups)) && ((i = f.groups.slice(0)), i.splice(g, 1), d.setLayer(f, { groups: i }));
            return h;
        }),
        (Ga.cursors = ["grab", "grabbing", "zoom-in", "zoom-out"]),
        (Ga.prefix = (function () {
            var a = na(ka.documentElement, "");
            return (
                "-" +
                (Ba.call(a)
                    .join("")
                    .match(/-(moz|webkit|ms)-/) ||
                    ("" === a.OLink && ["", "o"]))[1] +
                "-"
            );
        })()),
        (a.fn.triggerLayerEvent = function (b, c) {
            var d,
                e,
                f,
                g = this;
            for (e = 0; e < g.length; e += 1) (d = a(g[e])), (f = s(g[e])), (b = d.getLayer(b)) && G(d, f, b, c);
            return g;
        }),
        (a.fn.drawLayer = function (b) {
            var c,
                d,
                e,
                f,
                g = this;
            for (c = 0; c < g.length; c += 1) (e = a(g[c])), (d = h(g[c])) && ((f = e.getLayer(b)), A(e, d, f));
            return g;
        }),
        (a.fn.drawLayers = function (b) {
            var c,
                d,
                e,
                f,
                g,
                i,
                k,
                l,
                m,
                n,
                o,
                p,
                q,
                r = this,
                t = b || {};
            for (l = t.index, l || (l = 0), d = 0; d < r.length; d += 1)
                if (((c = a(r[d])), (e = h(r[d])))) {
                    for (n = s(r[d]), !1 !== t.clear && c.clearCanvas(), t.complete && (n.drawLayersComplete = t.complete), f = n.layers, k = l; k < f.length; k += 1)
                        if (((g = f[k]), (g.index = k), t.resetFire && (g._fired = !1), A(c, e, g, k + 1), (g._masks = n.transforms.masks.slice(0)), g._method === a.fn.drawImage && g.visible)) {
                            q = !0;
                            break;
                        }
                    if (q) continue;
                    (m = k),
                        t.complete && (t.complete.call(r[d]), delete n.drawLayersComplete),
                        (g = z(n)),
                        (o = n.event),
                        (p = o.type),
                        n.drag.layer && B(c, n, p),
                        (i = n.lastIntersected),
                        null === i || g === i || !i._hovered || i._fired || n.drag.dragging || ((n.lastIntersected = null), (i._fired = !0), (i._hovered = !1), G(c, n, i, "mouseout"), D(c, n)),
                        g &&
                            (g[p] || (p = P(p)),
                            g._event &&
                                g.intersects &&
                                ((n.lastIntersected = g),
                                (g.mouseover || g.mouseout || g.cursors) && !n.drag.dragging && (g._hovered || g._fired || ((g._fired = !0), (g._hovered = !0), G(c, n, g, "mouseover"))),
                                g._fired || ((g._fired = !0), (o.type = null), G(c, n, g, p)),
                                !g.draggable || g.disableEvents || ("mousedown" !== p && "touchstart" !== p) || ((n.drag.layer = g), (n.originalRedrawOnMousemove = n.redrawOnMousemove), (n.redrawOnMousemove = !0)))),
                        null !== g || n.drag.dragging || D(c, n),
                        m === f.length && ((n.intersecting.length = 0), (n.transforms = j(Fa)), (n.savedTransforms.length = 0));
                }
            return r;
        }),
        (a.fn.addLayer = function (a) {
            var b,
                d,
                e = this;
            for (b = 0; b < e.length; b += 1) h(e[b]) && ((d = new c(a)), (d.layer = !0), H(e[b], d, a));
            return e;
        }),
        (Ga.props = ["width", "height", "opacity", "lineHeight"]),
        (Ga.propsObj = {}),
        (a.fn.animateLayer = function () {
            var b,
                c,
                d,
                e,
                g,
                i = this,
                j = Ba.call(arguments, 0);
            for (
                "object" === ta(j[2])
                    ? (j.splice(2, 0, j[2].duration || null), j.splice(3, 0, j[3].easing || null), j.splice(4, 0, j[4].complete || null), j.splice(5, 0, j[5].step || null))
                    : (void 0 === j[2] ? (j.splice(2, 0, null), j.splice(3, 0, null), j.splice(4, 0, null)) : f(j[2]) && (j.splice(2, 0, null), j.splice(3, 0, null)),
                      void 0 === j[3] ? ((j[3] = null), j.splice(4, 0, null)) : f(j[3]) && j.splice(3, 0, null)),
                    c = 0;
                c < i.length;
                c += 1
            )
                (b = a(i[c])),
                    h(i[c]) &&
                        ((d = s(i[c])),
                        (e = b.getLayer(j[0])) &&
                            e._method !== a.fn.draw &&
                            ((g = ra({}, j[1])),
                            (g = K(i[c], e, g)),
                            J(g, !0),
                            J(e),
                            (e.style = Ga.propsObj),
                            a(e).animate(g, {
                                duration: j[2],
                                easing: a.easing[j[3]] ? j[3] : null,
                                complete: (function (a, b, c) {
                                    return function () {
                                        I(c), L(c), (b.animating && b.animated !== c) || a.drawLayers(), (c._animating = !1), (b.animating = !1), (b.animated = null), j[4] && j[4].call(a[0], c), G(a, b, c, "animateend");
                                    };
                                })(b, d, e),
                                step: (function (a, b, c) {
                                    return function (d, e) {
                                        var f,
                                            g,
                                            h,
                                            i = !1;
                                        "_" === e.prop[0] && ((i = !0), (e.prop = e.prop.replace("_", "")), (c[e.prop] = c["_" + e.prop])),
                                            -1 !== e.prop.indexOf(".") && ((f = e.prop.split(".")), (g = f[0]), (h = f[1]), c[g] && (c[g][h] = e.now)),
                                            c._pos !== e.pos && ((c._pos = e.pos), c._animating || b.animating || ((c._animating = !0), (b.animating = !0), (b.animated = c)), (b.animating && b.animated !== c) || a.drawLayers()),
                                            j[5] && j[5].call(a[0], d, e, c),
                                            G(a, b, c, "animate", e),
                                            i && (e.prop = "_" + e.prop);
                                    };
                                })(b, d, e),
                            }),
                            G(b, d, e, "animatestart")));
            return i;
        }),
        (a.fn.animateLayerGroup = function (b) {
            var c,
                d,
                e,
                f,
                g = this,
                h = Ba.call(arguments, 0);
            for (d = 0; d < g.length; d += 1) if (((c = a(g[d])), (e = c.getLayerGroup(b)))) for (f = 0; f < e.length; f += 1) (h[0] = e[f]), c.animateLayer.apply(c, h);
            return g;
        }),
        (a.fn.delayLayer = function (b, c) {
            var d,
                e,
                f,
                g,
                h = this;
            for (c = c || 0, e = 0; e < h.length; e += 1) (d = a(h[e])), (f = s(h[e])), (g = d.getLayer(b)) && (a(g).delay(c), G(d, f, g, "delay"));
            return h;
        }),
        (a.fn.delayLayerGroup = function (b, c) {
            var d,
                e,
                f,
                g,
                h,
                i = this;
            for (c = c || 0, e = 0; e < i.length; e += 1) if (((d = a(i[e])), (f = d.getLayerGroup(b)))) for (h = 0; h < f.length; h += 1) (g = f[h]), d.delayLayer(g, c);
            return i;
        }),
        (a.fn.stopLayer = function (b, c) {
            var d,
                e,
                f,
                g,
                h = this;
            for (e = 0; e < h.length; e += 1) (d = a(h[e])), (f = s(h[e])), (g = d.getLayer(b)) && (a(g).stop(c), G(d, f, g, "stop"));
            return h;
        }),
        (a.fn.stopLayerGroup = function (b, c) {
            var d,
                e,
                f,
                g,
                h,
                i = this;
            for (e = 0; e < i.length; e += 1) if (((d = a(i[e])), (f = d.getLayerGroup(b)))) for (h = 0; h < f.length; h += 1) (g = f[h]), d.stopLayer(g, c);
            return i;
        }),
        (function (b) {
            var c;
            for (c = 0; c < b.length; c += 1) a.fx.step[b[c]] = N;
        })(["color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "fillStyle", "outlineColor", "strokeStyle", "shadowColor"]),
        (Da.touchEvents = { mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove" }),
        (Da.mouseEvents = { touchstart: "mousedown", touchend: "mouseup", touchmove: "mousemove" }),
        (function (a) {
            var b;
            for (b = 0; b < a.length; b += 1) Q(a[b]);
        })(["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "touchstart", "touchmove", "touchend", "pointerdown", "pointermove", "pointerup", "contextmenu"]),
        (a.event.fix = function (b) {
            var c, d, e;
            if (((b = Ca.call(a.event, b)), (d = b.originalEvent)))
                if (((e = d.changedTouches), void 0 !== b.pageX && void 0 === b.offsetX))
                    try {
                        (c = a(b.currentTarget).offset()), c && ((b.offsetX = b.pageX - c.left), (b.offsetY = b.pageY - c.top));
                    } catch (a) {}
                else if (e)
                    try {
                        (c = a(b.currentTarget).offset()), c && ((b.offsetX = e[0].pageX - c.left), (b.offsetY = e[0].pageY - c.top));
                    } catch (a) {}
            return b;
        }),
        (Da.drawings = {
            arc: "drawArc",
            bezier: "drawBezier",
            ellipse: "drawEllipse",
            function: "draw",
            image: "drawImage",
            line: "drawLine",
            path: "drawPath",
            polygon: "drawPolygon",
            slice: "drawSlice",
            quadratic: "drawQuadratic",
            rectangle: "drawRect",
            text: "drawText",
            vector: "drawVector",
            save: "saveCanvas",
            restore: "restoreCanvas",
            rotate: "rotateCanvas",
            scale: "scaleCanvas",
            translate: "translateCanvas",
        }),
        (a.fn.draw = function a(b) {
            var d,
                e,
                f = this,
                g = new c(b);
            if (Da.drawings[g.type] && "function" !== g.type) f[Da.drawings[g.type]](b);
            else for (d = 0; d < f.length; d += 1) (e = h(f[d])) && ((g = new c(b)), H(f[d], g, b, a), g.visible && g.fn && g.fn.call(f[d], e, g));
            return f;
        }),
        (a.fn.clearCanvas = function a(b) {
            var d,
                e,
                f = this,
                g = new c(b);
            for (d = 0; d < f.length; d += 1)
                (e = h(f[d])) &&
                    (null === g.width || null === g.height
                        ? (e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, f[d].width, f[d].height), e.restore())
                        : (H(f[d], g, b, a), r(f[d], e, g, g.width, g.height), e.clearRect(g.x - g.width / 2, g.y - g.height / 2, g.width, g.height), p(e, g)));
            return f;
        }),
        (a.fn.saveCanvas = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j = this;
            for (d = 0; d < j.length; d += 1) if ((e = h(j[d]))) for (g = s(j[d]), f = new c(b), H(j[d], f, b, a), i = 0; i < f.count; i += 1) k(e, g);
            return j;
        }),
        (a.fn.restoreCanvas = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j = this;
            for (d = 0; d < j.length; d += 1) if ((e = h(j[d]))) for (g = s(j[d]), f = new c(b), H(j[d], f, b, a), i = 0; i < f.count; i += 1) l(e, g);
            return j;
        }),
        (a.fn.rotateCanvas = function a(b) {
            var d,
                e,
                f,
                g,
                i = this;
            for (d = 0; d < i.length; d += 1) (e = h(i[d])) && ((g = s(i[d])), (f = new c(b)), H(i[d], f, b, a), f.autosave && k(e, g), S(e, f, g.transforms));
            return i;
        }),
        (a.fn.scaleCanvas = function a(b) {
            var d,
                e,
                f,
                g,
                i = this;
            for (d = 0; d < i.length; d += 1) (e = h(i[d])) && ((g = s(i[d])), (f = new c(b)), H(i[d], f, b, a), f.autosave && k(e, g), T(e, f, g.transforms));
            return i;
        }),
        (a.fn.translateCanvas = function a(b) {
            var d,
                e,
                f,
                g,
                i = this;
            for (d = 0; d < i.length; d += 1) (e = h(i[d])) && ((g = s(i[d])), (f = new c(b)), H(i[d], f, b, a), f.autosave && k(e, g), U(e, f, g.transforms));
            return i;
        }),
        (a.fn.drawRect = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j,
                k,
                l,
                m,
                o = this;
            for (d = 0; d < o.length; d += 1)
                (e = h(o[d])) &&
                    ((f = new c(b)),
                    H(o[d], f, b, a),
                    f.visible &&
                        (r(o[d], e, f, f.width, f.height),
                        n(o[d], e, f),
                        e.beginPath(),
                        f.width &&
                            f.height &&
                            ((g = f.x - f.width / 2),
                            (i = f.y - f.height / 2),
                            (l = xa(f.cornerRadius)),
                            l
                                ? ((j = f.x + f.width / 2),
                                  (k = f.y + f.height / 2),
                                  f.width < 0 && ((m = g), (g = j), (j = m)),
                                  f.height < 0 && ((m = i), (i = k), (k = m)),
                                  j - g - 2 * l < 0 && (l = (j - g) / 2),
                                  k - i - 2 * l < 0 && (l = (k - i) / 2),
                                  e.moveTo(g + l, i),
                                  e.lineTo(j - l, i),
                                  e.arc(j - l, i + l, l, (3 * va) / 2, 2 * va, !1),
                                  e.lineTo(j, k - l),
                                  e.arc(j - l, k - l, l, 0, va / 2, !1),
                                  e.lineTo(g + l, k),
                                  e.arc(g + l, k - l, l, va / 2, va, !1),
                                  e.lineTo(g, i + l),
                                  e.arc(g + l, i + l, l, va, (3 * va) / 2, !1),
                                  (f.closed = !0))
                                : e.rect(g, i, f.width, f.height)),
                        R(o[d], e, f),
                        q(o[d], e, f)));
            return o;
        }),
        (a.fn.drawArc = function a(b) {
            var d,
                e,
                f,
                g = this;
            for (d = 0; d < g.length; d += 1) (e = h(g[d])) && ((f = new c(b)), H(g[d], f, b, a), f.visible && (r(g[d], e, f, 2 * f.radius), n(g[d], e, f), e.beginPath(), Y(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f)));
            return g;
        }),
        (a.fn.drawEllipse = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j = this;
            for (d = 0; d < j.length; d += 1)
                (e = h(j[d])) &&
                    ((f = new c(b)),
                    H(j[d], f, b, a),
                    f.visible &&
                        (r(j[d], e, f, f.width, f.height),
                        n(j[d], e, f),
                        (g = f.width * (4 / 3)),
                        (i = f.height),
                        e.beginPath(),
                        e.moveTo(f.x, f.y - i / 2),
                        e.bezierCurveTo(f.x - g / 2, f.y - i / 2, f.x - g / 2, f.y + i / 2, f.x, f.y + i / 2),
                        e.bezierCurveTo(f.x + g / 2, f.y + i / 2, f.x + g / 2, f.y - i / 2, f.x, f.y - i / 2),
                        R(j[d], e, f),
                        (f.closed = !0),
                        q(j[d], e, f)));
            return j;
        }),
        (a.fn.drawPolygon = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j,
                k,
                l,
                m,
                o,
                p = this;
            for (d = 0; d < p.length; d += 1)
                if ((e = h(p[d])) && ((f = new c(b)), H(p[d], f, b, a), f.visible)) {
                    for (r(p[d], e, f, 2 * f.radius), n(p[d], e, f), i = (2 * va) / f.sides, j = i / 2, g = j + va / 2, k = f.radius * za(j), e.beginPath(), o = 0; o < f.sides; o += 1)
                        (l = f.x + f.radius * za(g)), (m = f.y + f.radius * ya(g)), e.lineTo(l, m), f.concavity && ((l = f.x + (k + -k * f.concavity) * za(g + j)), (m = f.y + (k + -k * f.concavity) * ya(g + j)), e.lineTo(l, m)), (g += i);
                    R(p[d], e, f), (f.closed = !0), q(p[d], e, f);
                }
            return p;
        }),
        (a.fn.drawSlice = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j,
                k = this;
            for (d = 0; d < k.length; d += 1)
                (e = h(k[d])) &&
                    ((f = new c(b)),
                    H(k[d], f, b, a),
                    f.visible &&
                        (r(k[d], e, f, 2 * f.radius),
                        n(k[d], e, f),
                        (f.start *= f._toRad),
                        (f.end *= f._toRad),
                        (f.start -= va / 2),
                        (f.end -= va / 2),
                        (f.start = V(f.start)),
                        (f.end = V(f.end)),
                        f.end < f.start && (f.end += 2 * va),
                        (g = (f.start + f.end) / 2),
                        (i = f.radius * f.spread * za(g)),
                        (j = f.radius * f.spread * ya(g)),
                        (f.x += i),
                        (f.y += j),
                        e.beginPath(),
                        e.arc(f.x, f.y, f.radius, f.start, f.end, f.ccw),
                        e.lineTo(f.x, f.y),
                        R(k[d], e, f),
                        (f.closed = !0),
                        q(k[d], e, f)));
            return k;
        }),
        (a.fn.drawLine = function a(b) {
            var d,
                e,
                f,
                g = this;
            for (d = 0; d < g.length; d += 1) (e = h(g[d])) && ((f = new c(b)), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), aa(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f)));
            return g;
        }),
        (a.fn.drawQuadratic = function a(b) {
            var d,
                e,
                f,
                g = this;
            for (d = 0; d < g.length; d += 1) (e = h(g[d])) && ((f = new c(b)), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), ba(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f)));
            return g;
        }),
        (a.fn.drawBezier = function a(b) {
            var d,
                e,
                f,
                g = this;
            for (d = 0; d < g.length; d += 1) (e = h(g[d])) && ((f = new c(b)), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), ca(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f)));
            return g;
        }),
        (a.fn.drawVector = function a(b) {
            var d,
                e,
                f,
                g = this;
            for (d = 0; d < g.length; d += 1) (e = h(g[d])) && ((f = new c(b)), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), fa(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f)));
            return g;
        }),
        (a.fn.drawPath = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j = this;
            for (d = 0; d < j.length; d += 1)
                if ((e = h(j[d])) && ((f = new c(b)), H(j[d], f, b, a), f.visible)) {
                    for (r(j[d], e, f), n(j[d], e, f), e.beginPath(), g = 1; ; ) {
                        if (void 0 === (i = f["p" + g])) break;
                        (i = new c(i)),
                            "line" === i.type ? aa(j[d], e, f, i) : "quadratic" === i.type ? ba(j[d], e, f, i) : "bezier" === i.type ? ca(j[d], e, f, i) : "vector" === i.type ? fa(j[d], e, f, i) : "arc" === i.type && Y(j[d], e, f, i),
                            (g += 1);
                    }
                    R(j[d], e, f), q(j[d], e, f);
                }
            return j;
        }),
        (a.fn.drawText = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j,
                k,
                l,
                m,
                o,
                q,
                s,
                t,
                u,
                v = this;
            for (d = 0; d < v.length; d += 1)
                if ((e = h(v[d])) && ((f = new c(b)), H(v[d], f, b, a), f.visible)) {
                    if (
                        ((e.textBaseline = f.baseline),
                        (e.textAlign = f.align),
                        ga(v[d], e, f),
                        (i = null !== f.maxWidth ? ia(e, f) : f.text.toString().split("\n")),
                        ha(v[d], e, f, i),
                        g && ((g.width = f.width), (g.height = f.height)),
                        r(v[d], e, f, f.width, f.height),
                        n(v[d], e, f),
                        (t = f.x),
                        "left" === f.align ? (f.respectAlign ? (f.x += f.width / 2) : (t -= f.width / 2)) : "right" === f.align && (f.respectAlign ? (f.x -= f.width / 2) : (t += f.width / 2)),
                        f.radius)
                    )
                        for (l = qa(f.fontSize), null === f.letterSpacing && (f.letterSpacing = l / 500), k = 0; k < i.length; k += 1) {
                            for (e.save(), e.translate(f.x, f.y), j = i[k], f.flipArcText && ((o = j.split("")), o.reverse(), (j = o.join(""))), m = j.length, e.rotate((-va * f.letterSpacing * (m - 1)) / 2), s = 0; s < m; s += 1)
                                (q = j[s]),
                                    0 !== s && e.rotate(va * f.letterSpacing),
                                    e.save(),
                                    e.translate(0, -f.radius),
                                    f.flipArcText && e.scale(-1, -1),
                                    e.fillText(q, 0, 0),
                                    "transparent" !== f.fillStyle && (e.shadowColor = "transparent"),
                                    0 !== f.strokeWidth && e.strokeText(q, 0, 0),
                                    e.restore();
                            (f.radius -= l), (f.letterSpacing += l / (1e3 * va)), e.restore();
                        }
                    else
                        for (k = 0; k < i.length; k += 1)
                            (j = i[k]),
                                (u = f.y + (k * f.height) / i.length - ((i.length - 1) * f.height) / i.length / 2),
                                (e.shadowColor = f.shadowColor),
                                e.fillText(j, t, u),
                                "transparent" !== f.fillStyle && (e.shadowColor = "transparent"),
                                0 !== f.strokeWidth && e.strokeText(j, t, u);
                    (u = 0),
                        "top" === f.baseline ? (u += f.height / 2) : "bottom" === f.baseline && (u -= f.height / 2),
                        f._event && (e.beginPath(), e.rect(f.x - f.width / 2, f.y - f.height / 2 + u, f.width, f.height), R(v[d], e, f), e.closePath()),
                        p(e, f);
                }
            return (Ea.propCache = f), v;
        }),
        (a.fn.measureText = function (a) {
            var b,
                d,
                e,
                f = this;
            return (d = f.getLayer(a)), (!d || (d && !d._layer)) && (d = new c(a)), (b = h(f[0])), b && (ga(f[0], b, d), (e = null !== d.maxWidth ? ia(b, d) : d.text.split("\n")), ha(f[0], b, d, e)), d;
        }),
        (a.fn.drawImage = function b(d) {
            function e(a, b, c, d, e) {
                null === d.width && null === d.sWidth && (d.width = d.sWidth = q.width),
                    null === d.height && null === d.sHeight && (d.height = d.sHeight = q.height),
                    e && ((e.width = d.width), (e.height = d.height)),
                    null !== d.sWidth && null !== d.sHeight && null !== d.sx && null !== d.sy
                        ? (null === d.width && (d.width = d.sWidth),
                          null === d.height && (d.height = d.sHeight),
                          d.cropFromCenter && ((d.sx += d.sWidth / 2), (d.sy += d.sHeight / 2)),
                          d.sy - d.sHeight / 2 < 0 && (d.sy = d.sHeight / 2),
                          d.sy + d.sHeight / 2 > q.height && (d.sy = q.height - d.sHeight / 2),
                          d.sx - d.sWidth / 2 < 0 && (d.sx = d.sWidth / 2),
                          d.sx + d.sWidth / 2 > q.width && (d.sx = q.width - d.sWidth / 2),
                          r(a, b, d, d.width, d.height),
                          n(a, b, d),
                          b.drawImage(q, d.sx - d.sWidth / 2, d.sy - d.sHeight / 2, d.sWidth, d.sHeight, d.x - d.width / 2, d.y - d.height / 2, d.width, d.height))
                        : (r(a, b, d, d.width, d.height), n(a, b, d), b.drawImage(q, d.x - d.width / 2, d.y - d.height / 2, d.width, d.height)),
                    b.beginPath(),
                    b.rect(d.x - d.width / 2, d.y - d.height / 2, d.width, d.height),
                    R(a, b, d),
                    b.closePath(),
                    p(b, d),
                    o(b, c, d);
            }
            function f(b, c, d, f, g) {
                return function () {
                    var h = a(b);
                    if ((e(b, c, d, f, g), f.layer ? G(h, d, g, "load") : f.load && f.load.call(h[0], g), f.layer && ((g._masks = d.transforms.masks.slice(0)), f._next))) {
                        var i = d.drawLayersComplete;
                        delete d.drawLayersComplete, h.drawLayers({ clear: !1, resetFire: !0, index: f._next, complete: i });
                    }
                };
            }
            var g,
                i,
                j,
                k,
                l,
                m,
                q,
                t,
                u,
                v = this,
                w = Ea.imageCache;
            for (i = 0; i < v.length; i += 1)
                (g = v[i]),
                    (j = h(v[i])) &&
                        ((k = s(v[i])),
                        (l = new c(d)),
                        (m = H(v[i], l, d, b)),
                        l.visible &&
                            ((u = l.source),
                            (t = u.getContext),
                            u.src || t ? (q = u) : u && (w[u] && w[u].complete ? (q = w[u]) : ((q = new la()), u.match(/^data:/i) || (q.crossOrigin = l.crossOrigin), (q.src = u), (w[u] = q))),
                            q && (q.complete || t ? f(g, j, k, l, m)() : ((q.onload = f(g, j, k, l, m)), (q.src = q.src)))));
            return v;
        }),
        (a.fn.createPattern = function (b) {
            function d() {
                (k = e.createPattern(i, g.repeat)), g.load && g.load.call(m[0], k);
            }
            var e,
                g,
                i,
                j,
                k,
                l,
                m = this;
            return (
                (e = h(m[0])),
                e
                    ? ((g = new c(b)),
                      (l = g.source),
                      f(l)
                          ? ((i = a("<canvas />")[0]), (i.width = g.width), (i.height = g.height), (j = h(i)), l.call(i, j), d())
                          : ((j = l.getContext), l.src || j ? (i = l) : ((i = new la()), l.match(/^data:/i) || (i.crossOrigin = g.crossOrigin), (i.src = l)), i.complete || j ? d() : ((i.onload = d), (i.src = i.src))))
                    : (k = null),
                k
            );
        }),
        (a.fn.createGradient = function (a) {
            var b,
                d,
                e,
                f,
                g,
                i,
                j,
                k,
                l,
                m,
                n = this,
                o = [];
            if (((d = new c(a)), (b = h(n[0])))) {
                for (
                    d.x1 = d.x1 || 0,
                        d.y1 = d.y1 || 0,
                        d.x2 = d.x2 || 0,
                        d.y2 = d.y2 || 0,
                        e = null !== d.r1 && null !== d.r2 ? b.createRadialGradient(d.x1, d.y1, d.r1, d.x2, d.y2, d.r2) : b.createLinearGradient(d.x1, d.y1, d.x2, d.y2),
                        j = 1;
                    void 0 !== d["c" + j];
                    j += 1
                )
                    void 0 !== d["s" + j] ? o.push(d["s" + j]) : o.push(null);
                for (f = o.length, null === o[0] && (o[0] = 0), null === o[f - 1] && (o[f - 1] = 1), j = 0; j < f; j += 1) {
                    if (null !== o[j]) {
                        for (l = 1, m = 0, g = o[j], k = j + 1; k < f; k += 1) {
                            if (null !== o[k]) {
                                i = o[k];
                                break;
                            }
                            l += 1;
                        }
                        g > i && (o[k] = o[j]);
                    } else null === o[j] && ((m += 1), (o[j] = g + m * ((i - g) / l)));
                    e.addColorStop(o[j], d["c" + (j + 1)]);
                }
            } else e = null;
            return e;
        }),
        (a.fn.setPixels = function a(b) {
            var d,
                e,
                f,
                g,
                i,
                j,
                k,
                l,
                m,
                n,
                o = this;
            for (e = 0; e < o.length; e += 1)
                if (
                    ((d = o[e]),
                    (f = h(d)),
                    (g = s(o[e])),
                    f &&
                        ((i = new c(b)),
                        H(d, i, b, a),
                        r(o[e], f, i, i.width, i.height),
                        (null !== i.width && null !== i.height) || ((i.width = d.width), (i.height = d.height), (i.x = i.width / 2), (i.y = i.height / 2)),
                        0 !== i.width && 0 !== i.height))
                ) {
                    if (((k = f.getImageData((i.x - i.width / 2) * g.pixelRatio, (i.y - i.height / 2) * g.pixelRatio, i.width * g.pixelRatio, i.height * g.pixelRatio)), (l = k.data), (n = l.length), i.each))
                        for (m = 0; m < n; m += 4) (j = { r: l[m], g: l[m + 1], b: l[m + 2], a: l[m + 3] }), i.each.call(d, j, i), (l[m] = j.r), (l[m + 1] = j.g), (l[m + 2] = j.b), (l[m + 3] = j.a);
                    f.putImageData(k, (i.x - i.width / 2) * g.pixelRatio, (i.y - i.height / 2) * g.pixelRatio), f.restore();
                }
            return o;
        }),
        (a.fn.getCanvasImage = function (a, b) {
            var c,
                d = this,
                e = null;
            return 0 !== d.length && ((c = d[0]), c.toDataURL && (void 0 === b && (b = 1), (e = c.toDataURL("image/" + a, b)))), e;
        }),
        (a.fn.detectPixelRatio = function (a) {
            var c,
                d,
                e,
                f,
                g,
                i,
                j,
                k,
                l,
                m = this;
            for (d = 0; d < m.length; d += 1)
                (c = m[d]),
                    (e = h(c)),
                    (l = s(m[d])),
                    l.scaled ||
                        ((f = b.devicePixelRatio || 1),
                        (g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1),
                        (i = f / g),
                        1 !== i && ((j = c.width), (k = c.height), (c.width = j * i), (c.height = k * i), (c.style.width = j + "px"), (c.style.height = k + "px"), e.scale(i, i)),
                        (l.pixelRatio = i),
                        (l.scaled = !0),
                        a && a.call(c, i));
            return m;
        }),
        (Ia.clearCache = function () {
            var a;
            for (a in Ea) Object.prototype.hasOwnProperty.call(Ea, a) && (Ea[a] = {});
        }),
        (a.support.canvas = void 0 !== a("<canvas />")[0].getContext),
        ra(Ia, { defaults: ja, setGlobalProps: n, transformShape: r, detectEvents: R, closePath: q, setCanvasFont: ga, measureText: ha }),
        (a.jCanvas = Ia),
        (a.jCanvasObject = c);
});
