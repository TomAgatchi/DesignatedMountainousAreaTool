/* Mapbox GL JS is licensed under the 3-Clause BSD License. Full text of license: https://github.com/mapbox/mapbox-gl-js/blob/v0.48.0/LICENSE.txt */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global.mapboxgl = factory());
}(this, (function () { 'use strict';

/* eslint-disable */

var shared, worker, mapboxgl;
// define gets called three times: one for each chunk. we rely on the order
// they're imported to know which is which
function define(_, chunk) {
if (!shared) {
    shared = chunk;
} else if (!worker) {
    worker = chunk;
} else {
    var workerBundleString = 'var sharedChunk = {}; (' + shared + ')(sharedChunk); (' + worker + ')(sharedChunk);'

    var sharedChunk = {};
    shared(sharedChunk);
    mapboxgl = chunk(sharedChunk);
    mapboxgl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], { type: 'text/javascript' }));
}
}


define(["exports"],function(t){
	
"use strict";

function e(t, e) {
    return t(e = {
        exports: {}
    }, e.exports), e.exports
}
var r = n;

function n(t, e, r, n) {
    this.cx = 3 * t, this.bx = 3 * (r - t) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (n - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = t, this.p1y = n, this.p2x = r, this.p2y = n;
}
n.prototype.sampleCurveX = function(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t
}, n.prototype.sampleCurveY = function(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t
}, n.prototype.sampleCurveDerivativeX = function(t) {
    return (3 * this.ax * t + 2 * this.bx) * t + this.cx
}, n.prototype.solveCurveX = function(t, e) {
    var r, n, i, a, o;
    for (void 0 === e && (e = 1e-6), i = t, o = 0; o < 8; o++) {
        if (a = this.sampleCurveX(i) - t, Math.abs(a) < e) return i;
        var s = this.sampleCurveDerivativeX(i);
        if (Math.abs(s) < 1e-6) break;
        i -= a / s;
    }
    if ((i = t) < (r = 0)) return r;
    if (i > (n = 1)) return n;
    for (; r < n;) {
        if (a = this.sampleCurveX(i), Math.abs(a - t) < e) return i;
        t > a ? r = i : n = i, i = .5 * (n - r) + r;
    }
    return i
}, n.prototype.solve = function(t, e) {
    return this.sampleCurveY(this.solveCurveX(t, e))
};
var i = function(t, e, r) {
    this.column = t, this.row = e, this.zoom = r;
};
i.prototype.clone = function() {
    return new i(this.column, this.row, this.zoom)
}, i.prototype.zoomTo = function(t) {
    return this.clone()._zoomTo(t)
}, i.prototype.sub = function(t) {
    return this.clone()._sub(t)
}, i.prototype._zoomTo = function(t) {
    var e = Math.pow(2, t - this.zoom);
    return this.column *= e, this.row *= e, this.zoom = t, this
}, i.prototype._sub = function(t) {
    return t = t.zoomTo(this.zoom), this.column -= t.column, this.row -= t.row, this
};
var a = o;

function o(t, e) {
    this.x = t, this.y = e;
}

function s(t, e) {
    if (Array.isArray(t)) {
        if (!Array.isArray(e) || t.length !== e.length) return !1;
        for (var r = 0; r < t.length; r++)
            if (!s(t[r], e[r])) return !1;
        return !0
    }
    if ("object" == typeof t && null !== t && null !== e) {
        if ("object" != typeof e) return !1;
        if (Object.keys(t).length !== Object.keys(e).length) return !1;
        for (var n in t)
            if (!s(t[n], e[n])) return !1;
        return !0
    }
    return t === e
}

function u(t, e, n, i) {
    var a = new r(t, e, n, i);
    return function(t) {
        return a.solve(t)
    }
}
o.prototype = {
    clone: function() {
        return new o(this.x, this.y)
    },
    add: function(t) {
        return this.clone()._add(t)
    },
    sub: function(t) {
        return this.clone()._sub(t)
    },
    multByPoint: function(t) {
        return this.clone()._multByPoint(t)
    },
    divByPoint: function(t) {
        return this.clone()._divByPoint(t)
    },
    mult: function(t) {
        return this.clone()._mult(t)
    },
    div: function(t) {
        return this.clone()._div(t)
    },
    rotate: function(t) {
        return this.clone()._rotate(t)
    },
    rotateAround: function(t, e) {
        return this.clone()._rotateAround(t, e)
    },
    matMult: function(t) {
        return this.clone()._matMult(t)
    },
    unit: function() {
        return this.clone()._unit()
    },
    perp: function() {
        return this.clone()._perp()
    },
    round: function() {
        return this.clone()._round()
    },
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    equals: function(t) {
        return this.x === t.x && this.y === t.y
    },
    dist: function(t) {
        return Math.sqrt(this.distSqr(t))
    },
    distSqr: function(t) {
        var e = t.x - this.x,
            r = t.y - this.y;
        return e * e + r * r
    },
    angle: function() {
        return Math.atan2(this.y, this.x)
    },
    angleTo: function(t) {
        return Math.atan2(this.y - t.y, this.x - t.x)
    },
    angleWith: function(t) {
        return this.angleWithSep(t.x, t.y)
    },
    angleWithSep: function(t, e) {
        return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e)
    },
    _matMult: function(t) {
        var e = t[0] * this.x + t[1] * this.y,
            r = t[2] * this.x + t[3] * this.y;
        return this.x = e, this.y = r, this
    },
    _add: function(t) {
        return this.x += t.x, this.y += t.y, this
    },
    _sub: function(t) {
        return this.x -= t.x, this.y -= t.y, this
    },
    _mult: function(t) {
        return this.x *= t, this.y *= t, this
    },
    _div: function(t) {
        return this.x /= t, this.y /= t, this
    },
    _multByPoint: function(t) {
        return this.x *= t.x, this.y *= t.y, this
    },
    _divByPoint: function(t) {
        return this.x /= t.x, this.y /= t.y, this
    },
    _unit: function() {
        return this._div(this.mag()), this
    },
    _perp: function() {
        var t = this.y;
        return this.y = this.x, this.x = -t, this
    },
    _rotate: function(t) {
        var e = Math.cos(t),
            r = Math.sin(t),
            n = e * this.x - r * this.y,
            i = r * this.x + e * this.y;
        return this.x = n, this.y = i, this
    },
    _rotateAround: function(t, e) {
        var r = Math.cos(t),
            n = Math.sin(t),
            i = e.x + r * (this.x - e.x) - n * (this.y - e.y),
            a = e.y + n * (this.x - e.x) + r * (this.y - e.y);
        return this.x = i, this.y = a, this
    },
    _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    }
}, o.convert = function(t) {
    return t instanceof o ? t : Array.isArray(t) ? new o(t[0], t[1]) : t
};
var l = u(.25, .1, .25, 1);

function p(t, e, r) {
    return Math.min(r, Math.max(e, t))
}

function h(t) {
    for (var e = [], r = arguments.length - 1; r-- > 0;) e[r] = arguments[r + 1];
    for (var n = 0, i = e; n < i.length; n += 1) {
        var a = i[n];
        for (var o in a) t[o] = a[o];
    }
    return t
}
var c = 1;

function f() {
    return c++
}

function y(t, e) {
    t.forEach(function(t) {
        e[t] && (e[t] = e[t].bind(e));
    });
}

function d(t, e) {
    return -1 !== t.indexOf(e, t.length - e.length)
}

function m(t, e, r) {
    var n = {};
    for (var i in t) n[i] = e.call(r || this, t[i], i, t);
    return n
}

function v(t, e, r) {
    var n = {};
    for (var i in t) e.call(r || this, t[i], i, t) && (n[i] = t[i]);
    return n
}

function g(t) {
    return Array.isArray(t) ? t.map(g) : "object" == typeof t && t ? m(t, g) : t
}
var x = {};

function b(t) {
    x[t] || ("undefined" != typeof console && console.warn(t), x[t] = !0);
}

function w(t, e, r) {
    return (r.y - t.y) * (e.x - t.x) > (e.y - t.y) * (r.x - t.x)
}

function _(t) {
    for (var e = 0, r = 0, n = t.length, i = n - 1, a = void 0, o = void 0; r < n; i = r++) a = t[r], e += ((o = t[i]).x - a.x) * (a.y + o.y);
    return e
}
var A = self.performance && self.performance.now ? self.performance.now.bind(self.performance) : Date.now.bind(Date),
    k = self.requestAnimationFrame || self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame || self.msRequestAnimationFrame,
    S = self.cancelAnimationFrame || self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame || self.msCancelAnimationFrame,
    z = {
        now: A,
        frame: function(t) {
            var e = k(t);
            return {
                cancel: function() {
                    return S(e)
                }
            }
        },
        getImageData: function(t) {
            var e = self.document.createElement("canvas"),
                r = e.getContext("2d");
            if (!r) throw new Error("failed to create canvas 2d context");
            return e.width = t.width, e.height = t.height, r.drawImage(t, 0, 0, t.width, t.height), r.getImageData(0, 0, t.width, t.height)
        },
        resolveURL: function(t) {
            var e = self.document.createElement("a");
            return e.href = t, e.href
        },
        hardwareConcurrency: self.navigator.hardwareConcurrency || 4,
        get devicePixelRatio() {
            return self.devicePixelRatio
        },
        supportsWebp: !1
    };
if (self.document) {
    var M = self.document.createElement("img");
    M.onload = function() {
        z.supportsWebp = !0;
    }, M.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=";
}
var B = {
    Unknown: "Unknown",
    Style: "Style",
    Source: "Source",
    Tile: "Tile",
    Glyphs: "Glyphs",
    SpriteImage: "SpriteImage",
    SpriteJSON: "SpriteJSON",
    Image: "Image"
};
"function" == typeof Object.freeze && Object.freeze(B);
var I = function(t) {
    function e(e, r, n) {
        t.call(this, e), this.status = r, this.url = n, this.name = this.constructor.name, this.message = e;
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.toString = function() {
        return this.name + ": " + this.message + " (" + this.status + "): " + this.url
    }, e
}(Error);

function V(t) {
    var e = new self.XMLHttpRequest;
    for (var r in e.open(t.method || "GET", t.url, !0), t.headers) e.setRequestHeader(r, t.headers[r]);
    return e.withCredentials = "include" === t.credentials, e
}
var C = function(t, e) {
    var r = V(t);
    return r.responseType = "arraybuffer", r.onerror = function() {
        e(new Error(r.statusText));
    }, r.onload = function() {
        var n = r.response;
        if (0 === n.byteLength && 200 === r.status) return e(new Error("http status 200 returned without content."));
        r.status >= 200 && r.status < 300 && r.response ? e(null, {
            data: n,
            cacheControl: r.getResponseHeader("Cache-Control"),
            expires: r.getResponseHeader("Expires")
        }) : e(new I(r.statusText, r.status, t.url));
    }, r.send(), {
        cancel: function() {
            return r.abort()
        }
    }
};

function T(t, e, r) {
    r[t] && -1 !== r[t].indexOf(e) || (r[t] = r[t] || [], r[t].push(e));
}

function E(t, e, r) {
    if (r && r[t]) {
        var n = r[t].indexOf(e); - 1 !== n && r[t].splice(n, 1);
    }
}
var P = function(t, e) {
        void 0 === e && (e = {}), h(this, e), this.type = t;
    },
    F = function(t) {
        function e(e, r) {
            void 0 === r && (r = {}), t.call(this, "error", h({
                error: e
            }, r));
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(P),
    L = function() {};
L.prototype.on = function(t, e) {
    return this._listeners = this._listeners || {}, T(t, e, this._listeners), this
}, L.prototype.off = function(t, e) {
    return E(t, e, this._listeners), E(t, e, this._oneTimeListeners), this
}, L.prototype.once = function(t, e) {
    return this._oneTimeListeners = this._oneTimeListeners || {}, T(t, e, this._oneTimeListeners), this
}, L.prototype.fire = function(t) {
    "string" == typeof t && (t = new P(t, arguments[1] || {}));
    var e = t.type;
    if (this.listens(e)) {
        t.target = this;
        for (var r = 0, n = this._listeners && this._listeners[e] ? this._listeners[e].slice() : []; r < n.length; r += 1) {
            n[r].call(this, t);
        }
        for (var i = 0, a = this._oneTimeListeners && this._oneTimeListeners[e] ? this._oneTimeListeners[e].slice() : []; i < a.length; i += 1) {
            var o = a[i];
            E(e, o, this._oneTimeListeners), o.call(this, t);
        }
        var s = this._eventedParent;
        s && (h(t, "function" == typeof this._eventedParentData ? this._eventedParentData() : this._eventedParentData), s.fire(t));
    } else t instanceof F && console.error(t.error);
    return this
}, L.prototype.listens = function(t) {
    return this._listeners && this._listeners[t] && this._listeners[t].length > 0 || this._oneTimeListeners && this._oneTimeListeners[t] && this._oneTimeListeners[t].length > 0 || this._eventedParent && this._eventedParent.listens(t)
}, L.prototype.setEventedParent = function(t, e) {
    return this._eventedParent = t, this._eventedParentData = e, this
};
var O = {
        $version: 8,
        $root: {
            version: {
                required: !0,
                type: "enum",
                values: [8]
            },
            name: {
                type: "string"
            },
            metadata: {
                type: "*"
            },
            center: {
                type: "array",
                value: "number"
            },
            zoom: {
                type: "number"
            },
            bearing: {
                type: "number",
                default: 0,
                period: 360,
                units: "degrees"
            },
            pitch: {
                type: "number",
                default: 0,
                units: "degrees"
            },
            light: {
                type: "light"
            },
            sources: {
                required: !0,
                type: "sources"
            },
            sprite: {
                type: "string"
            },
            glyphs: {
                type: "string"
            },
            transition: {
                type: "transition"
            },
            layers: {
                required: !0,
                type: "array",
                value: "layer"
            }
        },
        sources: {
            "*": {
                type: "source"
            }
        },
        source: ["source_vector", "source_raster", "source_raster_dem", "source_geojson", "source_video", "source_image"],
        source_vector: {
            type: {
                required: !0,
                type: "enum",
                values: {
                    vector: {}
                }
            },
            url: {
                type: "string"
            },
            tiles: {
                type: "array",
                value: "string"
            },
            bounds: {
                type: "array",
                value: "number",
                length: 4,
                default: [-180, -85.051129, 180, 85.051129]
            },
            scheme: {
                type: "enum",
                values: {
                    xyz: {},
                    tms: {}
                },
                default: "xyz"
            },
            minzoom: {
                type: "number",
                default: 0
            },
            maxzoom: {
                type: "number",
                default: 22
            },
            attribution: {
                type: "string"
            },
            "*": {
                type: "*"
            }
        },
        source_raster: {
            type: {
                required: !0,
                type: "enum",
                values: {
                    raster: {}
                }
            },
            url: {
                type: "string"
            },
            tiles: {
                type: "array",
                value: "string"
            },
            bounds: {
                type: "array",
                value: "number",
                length: 4,
                default: [-180, -85.051129, 180, 85.051129]
            },
            minzoom: {
                type: "number",
                default: 0
            },
            maxzoom: {
                type: "number",
                default: 22
            },
            tileSize: {
                type: "number",
                default: 512,
                units: "pixels"
            },
            scheme: {
                type: "enum",
                values: {
                    xyz: {},
                    tms: {}
                },
                default: "xyz"
            },
            attribution: {
                type: "string"
            },
            "*": {
                type: "*"
            }
        },
        source_raster_dem: {
            type: {
                required: !0,
                type: "enum",
                values: {
                    "raster-dem": {}
                }
            },
            url: {
                type: "string"
            },
            tiles: {
                type: "array",
                value: "string"
            },
            bounds: {
                type: "array",
                value: "number",
                length: 4,
                default: [-180, -85.051129, 180, 85.051129]
            },
            minzoom: {
                type: "number",
                default: 0
            },
            maxzoom: {
                type: "number",
                default: 22
            },
            tileSize: {
                type: "number",
                default: 512,
                units: "pixels"
            },
            attribution: {
                type: "string"
            },
            encoding: {
                type: "enum",
                values: {
                    terrarium: {},
                    mapbox: {}
                },
                default: "mapbox"
            },
            "*": {
                type: "*"
            }
        },
        source_geojson: {
            type: {
                required: !0,
                type: "enum",
                values: {
                    geojson: {}
                }
            },
            data: {
                type: "*"
            },
            maxzoom: {
                type: "number",
                default: 18
            },
            attribution: {
                type: "string"
            },
            buffer: {
                type: "number",
                default: 128,
                maximum: 512,
                minimum: 0
            },
            tolerance: {
                type: "number",
                default: .375
            },
            cluster: {
                type: "boolean",
                default: !1
            },
            clusterRadius: {
                type: "number",
                default: 50,
                minimum: 0
            },
            clusterMaxZoom: {
                type: "number"
            },
            lineMetrics: {
                type: "boolean",
                default: !1
            },
            generateId: {
                type: "boolean",
                default: !1
            }
        },
        source_video: {
            type: {
                required: !0,
                type: "enum",
                values: {
                    video: {}
                }
            },
            urls: {
                required: !0,
                type: "array",
                value: "string"
            },
            coordinates: {
                required: !0,
                type: "array",
                length: 4,
                value: {
                    type: "array",
                    length: 2,
                    value: "number"
                }
            }
        },
        source_image: {
            type: {
                required: !0,
                type: "enum",
                values: {
                    image: {}
                }
            },
            url: {
                required: !0,
                type: "string"
            },
            coordinates: {
                required: !0,
                type: "array",
                length: 4,
                value: {
                    type: "array",
                    length: 2,
                    value: "number"
                }
            }
        },
        layer: {
            id: {
                type: "string",
                required: !0
            },
            type: {
                type: "enum",
                values: {
                    fill: {},
                    line: {},
                    symbol: {},
                    circle: {},
                    heatmap: {},
                    "fill-extrusion": {},
                    raster: {},
                    hillshade: {},
                    background: {}
                },
                required: !0
            },
            metadata: {
                type: "*"
            },
            source: {
                type: "string"
            },
            "source-layer": {
                type: "string"
            },
            minzoom: {
                type: "number",
                minimum: 0,
                maximum: 24
            },
            maxzoom: {
                type: "number",
                minimum: 0,
                maximum: 24
            },
            filter: {
                type: "filter"
            },
            layout: {
                type: "layout"
            },
            paint: {
                type: "paint"
            }
        },
        layout: ["layout_fill", "layout_line", "layout_circle", "layout_heatmap", "layout_fill-extrusion", "layout_symbol", "layout_raster", "layout_hillshade", "layout_background"],
        layout_background: {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_fill: {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_circle: {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_heatmap: {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_line: {
            "line-cap": {
                type: "enum",
                values: {
                    butt: {},
                    round: {},
                    square: {}
                },
                default: "butt",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-join": {
                type: "enum",
                values: {
                    bevel: {},
                    round: {},
                    miter: {}
                },
                default: "miter",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "line-miter-limit": {
                type: "number",
                default: 2,
                requires: [{
                    "line-join": "miter"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-round-limit": {
                type: "number",
                default: 1.05,
                requires: [{
                    "line-join": "round"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_symbol: {
            "symbol-placement": {
                type: "enum",
                values: {
                    point: {},
                    line: {},
                    "line-center": {}
                },
                default: "point",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "symbol-spacing": {
                type: "number",
                default: 250,
                minimum: 1,
                units: "pixels",
                requires: [{
                    "symbol-placement": "line"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "symbol-avoid-edges": {
                type: "boolean",
                default: !1,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-allow-overlap": {
                type: "boolean",
                default: !1,
                requires: ["icon-image"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-ignore-placement": {
                type: "boolean",
                default: !1,
                requires: ["icon-image"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-optional": {
                type: "boolean",
                default: !1,
                requires: ["icon-image", "text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-rotation-alignment": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {},
                    auto: {}
                },
                default: "auto",
                requires: ["icon-image"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-size": {
                type: "number",
                default: 1,
                minimum: 0,
                units: "factor of the original icon size",
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-text-fit": {
                type: "enum",
                values: {
                    none: {},
                    width: {},
                    height: {},
                    both: {}
                },
                default: "none",
                requires: ["icon-image", "text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-text-fit-padding": {
                type: "array",
                value: "number",
                length: 4,
                default: [0, 0, 0, 0],
                units: "pixels",
                requires: ["icon-image", "text-field", {
                    "icon-text-fit": ["both", "width", "height"]
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-image": {
                type: "string",
                tokens: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-rotate": {
                type: "number",
                default: 0,
                period: 360,
                units: "degrees",
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-padding": {
                type: "number",
                default: 2,
                minimum: 0,
                units: "pixels",
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-keep-upright": {
                type: "boolean",
                default: !1,
                requires: ["icon-image", {
                    "icon-rotation-alignment": "map"
                }, {
                    "symbol-placement": ["line", "line-center"]
                }],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-offset": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-anchor": {
                type: "enum",
                values: {
                    center: {},
                    left: {},
                    right: {},
                    top: {},
                    bottom: {},
                    "top-left": {},
                    "top-right": {},
                    "bottom-left": {},
                    "bottom-right": {}
                },
                default: "center",
                requires: ["icon-image"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "icon-pitch-alignment": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {},
                    auto: {}
                },
                default: "auto",
                requires: ["icon-image"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-pitch-alignment": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {},
                    auto: {}
                },
                default: "auto",
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-rotation-alignment": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {},
                    auto: {}
                },
                default: "auto",
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-field": {
                type: "formatted",
                default: "",
                tokens: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-font": {
                type: "array",
                value: "string",
                default: ["Open Sans Regular", "Arial Unicode MS Regular"],
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-size": {
                type: "number",
                default: 16,
                minimum: 0,
                units: "pixels",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-max-width": {
                type: "number",
                default: 10,
                minimum: 0,
                units: "ems",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-line-height": {
                type: "number",
                default: 1.2,
                units: "ems",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-letter-spacing": {
                type: "number",
                default: 0,
                units: "ems",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-justify": {
                type: "enum",
                values: {
                    left: {},
                    center: {},
                    right: {}
                },
                default: "center",
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-anchor": {
                type: "enum",
                values: {
                    center: {},
                    left: {},
                    right: {},
                    top: {},
                    bottom: {},
                    "top-left": {},
                    "top-right": {},
                    "bottom-left": {},
                    "bottom-right": {}
                },
                default: "center",
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-max-angle": {
                type: "number",
                default: 45,
                units: "degrees",
                requires: ["text-field", {
                    "symbol-placement": ["line", "line-center"]
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-rotate": {
                type: "number",
                default: 0,
                period: 360,
                units: "degrees",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-padding": {
                type: "number",
                default: 2,
                minimum: 0,
                units: "pixels",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-keep-upright": {
                type: "boolean",
                default: !0,
                requires: ["text-field", {
                    "text-rotation-alignment": "map"
                }, {
                    "symbol-placement": ["line", "line-center"]
                }],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-transform": {
                type: "enum",
                values: {
                    none: {},
                    uppercase: {},
                    lowercase: {}
                },
                default: "none",
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-offset": {
                type: "array",
                value: "number",
                units: "ems",
                length: 2,
                default: [0, 0],
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature"]
                },
                "property-type": "data-driven"
            },
            "text-allow-overlap": {
                type: "boolean",
                default: !1,
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-ignore-placement": {
                type: "boolean",
                default: !1,
                requires: ["text-field"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-optional": {
                type: "boolean",
                default: !1,
                requires: ["text-field", "icon-image"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_raster: {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        layout_hillshade: {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        filter: {
            type: "array",
            value: "*"
        },
        filter_operator: {
            type: "enum",
            values: {
                "==": {},
                "!=": {},
                ">": {},
                ">=": {},
                "<": {},
                "<=": {},
                in: {},
                "!in": {},
                all: {},
                any: {},
                none: {},
                has: {},
                "!has": {}
            }
        },
        geometry_type: {
            type: "enum",
            values: {
                Point: {},
                LineString: {},
                Polygon: {}
            }
        },
        function_stop: {
            type: "array",
            minimum: 0,
            maximum: 22,
            value: ["number", "color"],
            length: 2
        },
        expression: {
            type: "array",
            value: "*",
            minimum: 1
        },
        expression_name: {
            type: "enum",
            values: {
                let: {
                    group: "Variable binding"
                },
                var: {
                    group: "Variable binding"
                },
                literal: {
                    group: "Types"
                },
                array: {
                    group: "Types"
                },
                at: {
                    group: "Lookup"
                },
                case: {
                    group: "Decision"
                },
                match: {
                    group: "Decision"
                },
                coalesce: {
                    group: "Decision"
                },
                step: {
                    group: "Ramps, scales, curves"
                },
                interpolate: {
                    group: "Ramps, scales, curves"
                },
                ln2: {
                    group: "Math"
                },
                pi: {
                    group: "Math"
                },
                e: {
                    group: "Math"
                },
                typeof: {
                    group: "Types"
                },
                string: {
                    group: "Types"
                },
                number: {
                    group: "Types"
                },
                boolean: {
                    group: "Types"
                },
                object: {
                    group: "Types"
                },
                collator: {
                    group: "Types"
                },
                format: {
                    group: "Types"
                },
                "to-string": {
                    group: "Types"
                },
                "to-number": {
                    group: "Types"
                },
                "to-boolean": {
                    group: "Types"
                },
                "to-rgba": {
                    group: "Color"
                },
                "to-color": {
                    group: "Types"
                },
                rgb: {
                    group: "Color"
                },
                rgba: {
                    group: "Color"
                },
                get: {
                    group: "Lookup"
                },
                has: {
                    group: "Lookup"
                },
                length: {
                    group: "Lookup"
                },
                properties: {
                    group: "Feature data"
                },
                "feature-state": {
                    group: "Feature data"
                },
                "geometry-type": {
                    group: "Feature data"
                },
                id: {
                    group: "Feature data"
                },
                zoom: {
                    group: "Zoom"
                },
                "heatmap-density": {
                    group: "Heatmap"
                },
                "line-progress": {
                    group: "Heatmap"
                },
                "+": {
                    group: "Math"
                },
                "*": {
                    group: "Math"
                },
                "-": {
                    group: "Math"
                },
                "/": {
                    group: "Math"
                },
                "%": {
                    group: "Math"
                },
                "^": {
                    group: "Math"
                },
                sqrt: {
                    group: "Math"
                },
                log10: {
                    group: "Math"
                },
                ln: {
                    group: "Math"
                },
                log2: {
                    group: "Math"
                },
                sin: {
                    group: "Math"
                },
                cos: {
                    group: "Math"
                },
                tan: {
                    group: "Math"
                },
                asin: {
                    group: "Math"
                },
                acos: {
                    group: "Math"
                },
                atan: {
                    group: "Math"
                },
                min: {
                    group: "Math"
                },
                max: {
                    group: "Math"
                },
                round: {
                    group: "Math"
                },
                abs: {
                    group: "Math"
                },
                ceil: {
                    group: "Math"
                },
                floor: {
                    group: "Math"
                },
                "==": {
                    group: "Decision"
                },
                "!=": {
                    group: "Decision"
                },
                ">": {
                    group: "Decision"
                },
                "<": {
                    group: "Decision"
                },
                ">=": {
                    group: "Decision"
                },
                "<=": {
                    group: "Decision"
                },
                all: {
                    group: "Decision"
                },
                any: {
                    group: "Decision"
                },
                "!": {
                    group: "Decision"
                },
                "is-supported-script": {
                    group: "String"
                },
                upcase: {
                    group: "String"
                },
                downcase: {
                    group: "String"
                },
                concat: {
                    group: "String"
                },
                "resolved-locale": {
                    group: "String"
                }
            }
        },
        light: {
            anchor: {
                type: "enum",
                default: "viewport",
                values: {
                    map: {},
                    viewport: {}
                },
                "property-type": "data-constant",
                transition: !1,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                }
            },
            position: {
                type: "array",
                default: [1.15, 210, 30],
                length: 3,
                value: "number",
                "property-type": "data-constant",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                }
            },
            color: {
                type: "color",
                "property-type": "data-constant",
                default: "#ffffff",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0
            },
            intensity: {
                type: "number",
                "property-type": "data-constant",
                default: .5,
                minimum: 0,
                maximum: 1,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                transition: !0
            }
        },
        paint: ["paint_fill", "paint_line", "paint_circle", "paint_heatmap", "paint_fill-extrusion", "paint_symbol", "paint_raster", "paint_hillshade", "paint_background"],
        paint_fill: {
            "fill-antialias": {
                type: "boolean",
                default: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                requires: [{
                    "!": "fill-pattern"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-outline-color": {
                type: "color",
                transition: !0,
                requires: [{
                    "!": "fill-pattern"
                }, {
                    "fill-antialias": !0
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-translate-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                requires: ["fill-translate"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-pattern": {
                type: "string",
                transition: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "cross-faded"
            }
        },
        paint_line: {
            "line-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                requires: [{
                    "!": "line-pattern"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-translate-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                requires: ["line-translate"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "line-width": {
                type: "number",
                default: 1,
                minimum: 0,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-gap-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-offset": {
                type: "number",
                default: 0,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-blur": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "line-dasharray": {
                type: "array",
                value: "number",
                minimum: 0,
                transition: !0,
                units: "line widths",
                requires: [{
                    "!": "line-pattern"
                }],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "cross-faded"
            },
            "line-pattern": {
                type: "string",
                transition: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "cross-faded"
            },
            "line-gradient": {
                type: "color",
                transition: !1,
                requires: [{
                    "!": "line-dasharray"
                }, {
                    "!": "line-pattern"
                }, {
                    source: "geojson",
                    has: {
                        lineMetrics: !0
                    }
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["line-progress"]
                },
                "property-type": "color-ramp"
            }
        },
        paint_circle: {
            "circle-radius": {
                type: "number",
                default: 5,
                minimum: 0,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-blur": {
                type: "number",
                default: 0,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-translate-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                requires: ["circle-translate"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-pitch-scale": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-pitch-alignment": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "viewport",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "circle-stroke-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-stroke-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "circle-stroke-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            }
        },
        paint_heatmap: {
            "heatmap-radius": {
                type: "number",
                default: 30,
                minimum: 1,
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "heatmap-weight": {
                type: "number",
                default: 1,
                minimum: 0,
                transition: !1,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "heatmap-intensity": {
                type: "number",
                default: 1,
                minimum: 0,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "heatmap-color": {
                type: "color",
                default: ["interpolate", ["linear"],
                    ["heatmap-density"], 0, "rgba(0, 0, 255, 0)", .1, "royalblue", .3, "cyan", .5, "lime", .7, "yellow", 1, "red"
                ],
                transition: !1,
                expression: {
                    interpolated: !0,
                    parameters: ["heatmap-density"]
                },
                "property-type": "color-ramp"
            },
            "heatmap-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        paint_symbol: {
            "icon-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-halo-color": {
                type: "color",
                default: "rgba(0, 0, 0, 0)",
                transition: !0,
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-halo-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-halo-blur": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "icon-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                requires: ["icon-image"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "icon-translate-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                requires: ["icon-image", "icon-translate"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-halo-color": {
                type: "color",
                default: "rgba(0, 0, 0, 0)",
                transition: !0,
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-halo-width": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-halo-blur": {
                type: "number",
                default: 0,
                minimum: 0,
                transition: !0,
                units: "pixels",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "text-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                requires: ["text-field"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "text-translate-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                requires: ["text-field", "text-translate"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        paint_raster: {
            "raster-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-hue-rotate": {
                type: "number",
                default: 0,
                period: 360,
                transition: !0,
                units: "degrees",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-brightness-min": {
                type: "number",
                default: 0,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-brightness-max": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-saturation": {
                type: "number",
                default: 0,
                minimum: -1,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-contrast": {
                type: "number",
                default: 0,
                minimum: -1,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-resampling": {
                type: "enum",
                values: {
                    linear: {},
                    nearest: {}
                },
                default: "linear",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "raster-fade-duration": {
                type: "number",
                default: 300,
                minimum: 0,
                transition: !1,
                units: "milliseconds",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        paint_hillshade: {
            "hillshade-illumination-direction": {
                type: "number",
                default: 335,
                minimum: 0,
                maximum: 359,
                transition: !1,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-illumination-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "viewport",
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-exaggeration": {
                type: "number",
                default: .5,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-shadow-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-highlight-color": {
                type: "color",
                default: "#FFFFFF",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "hillshade-accent-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        paint_background: {
            "background-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                requires: [{
                    "!": "background-pattern"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "background-pattern": {
                type: "string",
                transition: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "cross-faded"
            },
            "background-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            }
        },
        transition: {
            duration: {
                type: "number",
                default: 300,
                minimum: 0,
                units: "milliseconds"
            },
            delay: {
                type: "number",
                default: 0,
                minimum: 0,
                units: "milliseconds"
            }
        },
        "layout_fill-extrusion": {
            visibility: {
                type: "enum",
                values: {
                    visible: {},
                    none: {}
                },
                default: "visible",
                "property-type": "constant"
            }
        },
        function: {
            expression: {
                type: "expression"
            },
            stops: {
                type: "array",
                value: "function_stop"
            },
            base: {
                type: "number",
                default: 1,
                minimum: 0
            },
            property: {
                type: "string",
                default: "$zoom"
            },
            type: {
                type: "enum",
                values: {
                    identity: {},
                    exponential: {},
                    interval: {},
                    categorical: {}
                },
                default: "exponential"
            },
            colorSpace: {
                type: "enum",
                values: {
                    rgb: {},
                    lab: {},
                    hcl: {}
                },
                default: "rgb"
            },
            default: {
                type: "*",
                required: !1
            }
        },
        "paint_fill-extrusion": {
            "fill-extrusion-opacity": {
                type: "number",
                default: 1,
                minimum: 0,
                maximum: 1,
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-extrusion-color": {
                type: "color",
                default: "#000000",
                transition: !0,
                requires: [{
                    "!": "fill-extrusion-pattern"
                }],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-extrusion-translate": {
                type: "array",
                value: "number",
                length: 2,
                default: [0, 0],
                transition: !0,
                units: "pixels",
                expression: {
                    interpolated: !0,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-extrusion-translate-anchor": {
                type: "enum",
                values: {
                    map: {},
                    viewport: {}
                },
                default: "map",
                requires: ["fill-extrusion-translate"],
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "data-constant"
            },
            "fill-extrusion-pattern": {
                type: "string",
                transition: !0,
                expression: {
                    interpolated: !1,
                    parameters: ["zoom"]
                },
                "property-type": "cross-faded"
            },
            "fill-extrusion-height": {
                type: "number",
                default: 0,
                minimum: 0,
                units: "meters",
                transition: !0,
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            },
            "fill-extrusion-base": {
                type: "number",
                default: 0,
                minimum: 0,
                units: "meters",
                transition: !0,
                requires: ["fill-extrusion-height"],
                expression: {
                    interpolated: !0,
                    parameters: ["zoom", "feature", "feature-state"]
                },
                "property-type": "data-driven"
            }
        },
        "property-type": {
            "data-driven": {
                type: "property-type"
            },
            "cross-faded": {
                type: "property-type"
            },
            "cross-faded-data-driven": {
                type: "property-type"
            },
            "color-ramp": {
                type: "property-type"
            },
            "data-constant": {
                type: "property-type"
            },
            constant: {
                type: "property-type"
            }
        }
    },
    D = function(t, e, r, n) {
        this.message = (t ? t + ": " : "") + r, n && (this.identifier = n), null != e && e.__line__ && (this.line = e.__line__);
    };

function q(t) {
    var e = t.key,
        r = t.value;
    return r ? [new D(e, r, "constants have been deprecated as of v8")] : []
}

function j(t) {
    for (var e = [], r = arguments.length - 1; r-- > 0;) e[r] = arguments[r + 1];
    for (var n = 0, i = e; n < i.length; n += 1) {
        var a = i[n];
        for (var o in a) t[o] = a[o];
    }
    return t
}

function U(t) {
    return t instanceof Number || t instanceof String || t instanceof Boolean ? t.valueOf() : t
}

function R(t) {
    return Array.isArray(t) ? t.map(R) : U(t)
}
var N = function(t) {
        function e(e, r) {
            t.call(this, r), this.message = r, this.key = e;
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(Error),
    Z = function(t, e) {
        void 0 === e && (e = []), this.parent = t, this.bindings = {};
        for (var r = 0, n = e; r < n.length; r += 1) {
            var i = n[r],
                a = i[0],
                o = i[1];
            this.bindings[a] = o;
        }
    };
Z.prototype.concat = function(t) {
    return new Z(this, t)
}, Z.prototype.get = function(t) {
    if (this.bindings[t]) return this.bindings[t];
    if (this.parent) return this.parent.get(t);
    throw new Error(t + " not found in scope.")
}, Z.prototype.has = function(t) {
    return !!this.bindings[t] || !!this.parent && this.parent.has(t)
};
var H = {
        kind: "null"
    },
    X = {
        kind: "number"
    },
    J = {
        kind: "string"
    },
    G = {
        kind: "boolean"
    },
    K = {
        kind: "color"
    },
    Y = {
        kind: "object"
    },
    $ = {
        kind: "value"
    },
    W = {
        kind: "collator"
    },
    Q = {
        kind: "formatted"
    };

function tt(t, e) {
    return {
        kind: "array",
        itemType: t,
        N: e
    }
}

function et(t) {
    if ("array" === t.kind) {
        var e = et(t.itemType);
        return "number" == typeof t.N ? "array<" + e + ", " + t.N + ">" : "value" === t.itemType.kind ? "array" : "array<" + e + ">"
    }
    return t.kind
}
var rt = [H, X, J, G, K, Q, Y, tt($)];

function nt(t, e) {
    if ("error" === e.kind) return null;
    if ("array" === t.kind) {
        if ("array" === e.kind && !nt(t.itemType, e.itemType) && ("number" != typeof t.N || t.N === e.N)) return null
    } else {
        if (t.kind === e.kind) return null;
        if ("value" === t.kind)
            for (var r = 0, n = rt; r < n.length; r += 1) {
                if (!nt(n[r], e)) return null
            }
    }
    return "Expected " + et(t) + " but found " + et(e) + " instead."
}
var it = e(function(t, e) {
        var r = {
            transparent: [0, 0, 0, 0],
            aliceblue: [240, 248, 255, 1],
            antiquewhite: [250, 235, 215, 1],
            aqua: [0, 255, 255, 1],
            aquamarine: [127, 255, 212, 1],
            azure: [240, 255, 255, 1],
            beige: [245, 245, 220, 1],
            bisque: [255, 228, 196, 1],
            black: [0, 0, 0, 1],
            blanchedalmond: [255, 235, 205, 1],
            blue: [0, 0, 255, 1],
            blueviolet: [138, 43, 226, 1],
            brown: [165, 42, 42, 1],
            burlywood: [222, 184, 135, 1],
            cadetblue: [95, 158, 160, 1],
            chartreuse: [127, 255, 0, 1],
            chocolate: [210, 105, 30, 1],
            coral: [255, 127, 80, 1],
            cornflowerblue: [100, 149, 237, 1],
            cornsilk: [255, 248, 220, 1],
            crimson: [220, 20, 60, 1],
            cyan: [0, 255, 255, 1],
            darkblue: [0, 0, 139, 1],
            darkcyan: [0, 139, 139, 1],
            darkgoldenrod: [184, 134, 11, 1],
            darkgray: [169, 169, 169, 1],
            darkgreen: [0, 100, 0, 1],
            darkgrey: [169, 169, 169, 1],
            darkkhaki: [189, 183, 107, 1],
            darkmagenta: [139, 0, 139, 1],
            darkolivegreen: [85, 107, 47, 1],
            darkorange: [255, 140, 0, 1],
            darkorchid: [153, 50, 204, 1],
            darkred: [139, 0, 0, 1],
            darksalmon: [233, 150, 122, 1],
            darkseagreen: [143, 188, 143, 1],
            darkslateblue: [72, 61, 139, 1],
            darkslategray: [47, 79, 79, 1],
            darkslategrey: [47, 79, 79, 1],
            darkturquoise: [0, 206, 209, 1],
            darkviolet: [148, 0, 211, 1],
            deeppink: [255, 20, 147, 1],
            deepskyblue: [0, 191, 255, 1],
            dimgray: [105, 105, 105, 1],
            dimgrey: [105, 105, 105, 1],
            dodgerblue: [30, 144, 255, 1],
            firebrick: [178, 34, 34, 1],
            floralwhite: [255, 250, 240, 1],
            forestgreen: [34, 139, 34, 1],
            fuchsia: [255, 0, 255, 1],
            gainsboro: [220, 220, 220, 1],
            ghostwhite: [248, 248, 255, 1],
            gold: [255, 215, 0, 1],
            goldenrod: [218, 165, 32, 1],
            gray: [128, 128, 128, 1],
            green: [0, 128, 0, 1],
            greenyellow: [173, 255, 47, 1],
            grey: [128, 128, 128, 1],
            honeydew: [240, 255, 240, 1],
            hotpink: [255, 105, 180, 1],
            indianred: [205, 92, 92, 1],
            indigo: [75, 0, 130, 1],
            ivory: [255, 255, 240, 1],
            khaki: [240, 230, 140, 1],
            lavender: [230, 230, 250, 1],
            lavenderblush: [255, 240, 245, 1],
            lawngreen: [124, 252, 0, 1],
            lemonchiffon: [255, 250, 205, 1],
            lightblue: [173, 216, 230, 1],
            lightcoral: [240, 128, 128, 1],
            lightcyan: [224, 255, 255, 1],
            lightgoldenrodyellow: [250, 250, 210, 1],
            lightgray: [211, 211, 211, 1],
            lightgreen: [144, 238, 144, 1],
            lightgrey: [211, 211, 211, 1],
            lightpink: [255, 182, 193, 1],
            lightsalmon: [255, 160, 122, 1],
            lightseagreen: [32, 178, 170, 1],
            lightskyblue: [135, 206, 250, 1],
            lightslategray: [119, 136, 153, 1],
            lightslategrey: [119, 136, 153, 1],
            lightsteelblue: [176, 196, 222, 1],
            lightyellow: [255, 255, 224, 1],
            lime: [0, 255, 0, 1],
            limegreen: [50, 205, 50, 1],
            linen: [250, 240, 230, 1],
            magenta: [255, 0, 255, 1],
            maroon: [128, 0, 0, 1],
            mediumaquamarine: [102, 205, 170, 1],
            mediumblue: [0, 0, 205, 1],
            mediumorchid: [186, 85, 211, 1],
            mediumpurple: [147, 112, 219, 1],
            mediumseagreen: [60, 179, 113, 1],
            mediumslateblue: [123, 104, 238, 1],
            mediumspringgreen: [0, 250, 154, 1],
            mediumturquoise: [72, 209, 204, 1],
            mediumvioletred: [199, 21, 133, 1],
            midnightblue: [25, 25, 112, 1],
            mintcream: [245, 255, 250, 1],
            mistyrose: [255, 228, 225, 1],
            moccasin: [255, 228, 181, 1],
            navajowhite: [255, 222, 173, 1],
            navy: [0, 0, 128, 1],
            oldlace: [253, 245, 230, 1],
            olive: [128, 128, 0, 1],
            olivedrab: [107, 142, 35, 1],
            orange: [255, 165, 0, 1],
            orangered: [255, 69, 0, 1],
            orchid: [218, 112, 214, 1],
            palegoldenrod: [238, 232, 170, 1],
            palegreen: [152, 251, 152, 1],
            paleturquoise: [175, 238, 238, 1],
            palevioletred: [219, 112, 147, 1],
            papayawhip: [255, 239, 213, 1],
            peachpuff: [255, 218, 185, 1],
            peru: [205, 133, 63, 1],
            pink: [255, 192, 203, 1],
            plum: [221, 160, 221, 1],
            powderblue: [176, 224, 230, 1],
            purple: [128, 0, 128, 1],
            rebeccapurple: [102, 51, 153, 1],
            red: [255, 0, 0, 1],
            rosybrown: [188, 143, 143, 1],
            royalblue: [65, 105, 225, 1],
            saddlebrown: [139, 69, 19, 1],
            salmon: [250, 128, 114, 1],
            sandybrown: [244, 164, 96, 1],
            seagreen: [46, 139, 87, 1],
            seashell: [255, 245, 238, 1],
            sienna: [160, 82, 45, 1],
            silver: [192, 192, 192, 1],
            skyblue: [135, 206, 235, 1],
            slateblue: [106, 90, 205, 1],
            slategray: [112, 128, 144, 1],
            slategrey: [112, 128, 144, 1],
            snow: [255, 250, 250, 1],
            springgreen: [0, 255, 127, 1],
            steelblue: [70, 130, 180, 1],
            tan: [210, 180, 140, 1],
            teal: [0, 128, 128, 1],
            thistle: [216, 191, 216, 1],
            tomato: [255, 99, 71, 1],
            turquoise: [64, 224, 208, 1],
            violet: [238, 130, 238, 1],
            wheat: [245, 222, 179, 1],
            white: [255, 255, 255, 1],
            whitesmoke: [245, 245, 245, 1],
            yellow: [255, 255, 0, 1],
            yellowgreen: [154, 205, 50, 1]
        };

        function n(t) {
            return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t
        }

        function i(t) {
            return t < 0 ? 0 : t > 1 ? 1 : t
        }

        function a(t) {
            return "%" === t[t.length - 1] ? n(parseFloat(t) / 100 * 255) : n(parseInt(t))
        }

        function o(t) {
            return "%" === t[t.length - 1] ? i(parseFloat(t) / 100) : i(parseFloat(t))
        }

        function s(t, e, r) {
            return r < 0 ? r += 1 : r > 1 && (r -= 1), 6 * r < 1 ? t + (e - t) * r * 6 : 2 * r < 1 ? e : 3 * r < 2 ? t + (e - t) * (2 / 3 - r) * 6 : t
        }
        try {
            e.parseCSSColor = function(t) {
                var e, i = t.replace(/ /g, "").toLowerCase();
                if (i in r) return r[i].slice();
                if ("#" === i[0]) return 4 === i.length ? (e = parseInt(i.substr(1), 16)) >= 0 && e <= 4095 ? [(3840 & e) >> 4 | (3840 & e) >> 8, 240 & e | (240 & e) >> 4, 15 & e | (15 & e) << 4, 1] : null : 7 === i.length && (e = parseInt(i.substr(1), 16)) >= 0 && e <= 16777215 ? [(16711680 & e) >> 16, (65280 & e) >> 8, 255 & e, 1] : null;
                var u = i.indexOf("("),
                    l = i.indexOf(")");
                if (-1 !== u && l + 1 === i.length) {
                    var p = i.substr(0, u),
                        h = i.substr(u + 1, l - (u + 1)).split(","),
                        c = 1;
                    switch (p) {
                        case "rgba":
                            if (4 !== h.length) return null;
                            c = o(h.pop());
                        case "rgb":
                            return 3 !== h.length ? null : [a(h[0]), a(h[1]), a(h[2]), c];
                        case "hsla":
                            if (4 !== h.length) return null;
                            c = o(h.pop());
                        case "hsl":
                            if (3 !== h.length) return null;
                            var f = (parseFloat(h[0]) % 360 + 360) % 360 / 360,
                                y = o(h[1]),
                                d = o(h[2]),
                                m = d <= .5 ? d * (y + 1) : d + y - d * y,
                                v = 2 * d - m;
                            return [n(255 * s(v, m, f + 1 / 3)), n(255 * s(v, m, f)), n(255 * s(v, m, f - 1 / 3)), c];
                        default:
                            return null
                    }
                }
                return null
            };
        } catch (t) {}
    }).parseCSSColor,
    at = function(t, e, r, n) {
        void 0 === n && (n = 1), this.r = t, this.g = e, this.b = r, this.a = n;
    };
at.parse = function(t) {
    if (t) {
        if (t instanceof at) return t;
        if ("string" == typeof t) {
            var e = it(t);
            if (e) return new at(e[0] / 255 * e[3], e[1] / 255 * e[3], e[2] / 255 * e[3], e[3])
        }
    }
}, at.prototype.toString = function() {
    var t = this.toArray(),
        e = t[0],
        r = t[1],
        n = t[2],
        i = t[3];
    return "rgba(" + Math.round(e) + "," + Math.round(r) + "," + Math.round(n) + "," + i + ")"
}, at.prototype.toArray = function() {
    var t = this.r,
        e = this.g,
        r = this.b,
        n = this.a;
    return 0 === n ? [0, 0, 0, 0] : [255 * t / n, 255 * e / n, 255 * r / n, n]
}, at.black = new at(0, 0, 0, 1), at.white = new at(1, 1, 1, 1), at.transparent = new at(0, 0, 0, 0);
var ot = function(t, e, r) {
    this.sensitivity = t ? e ? "variant" : "case" : e ? "accent" : "base", this.locale = r, this.collator = new Intl.Collator(this.locale ? this.locale : [], {
        sensitivity: this.sensitivity,
        usage: "search"
    });
};
ot.prototype.compare = function(t, e) {
    return this.collator.compare(t, e)
}, ot.prototype.resolvedLocale = function() {
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale
};
var st = function(t, e, r) {
    this.type = W, this.locale = r, this.caseSensitive = t, this.diacriticSensitive = e;
};

function ut(t, e, r, n) {
    return "number" == typeof t && t >= 0 && t <= 255 && "number" == typeof e && e >= 0 && e <= 255 && "number" == typeof r && r >= 0 && r <= 255 ? void 0 === n || "number" == typeof n && n >= 0 && n <= 1 ? null : "Invalid rgba value [" + [t, e, r, n].join(", ") + "]: 'a' must be between 0 and 1." : "Invalid rgba value [" + ("number" == typeof n ? [t, e, r, n] : [t, e, r]).join(", ") + "]: 'r', 'g', and 'b' must be between 0 and 255."
}

function lt(t) {
    if (null === t) return H;
    if ("string" == typeof t) return J;
    if ("boolean" == typeof t) return G;
    if ("number" == typeof t) return X;
    if (t instanceof at) return K;
    if (t instanceof ot) return W;
    if (Array.isArray(t)) {
        for (var e, r = t.length, n = 0, i = t; n < i.length; n += 1) {
            var a = lt(i[n]);
            if (e) {
                if (e === a) continue;
                e = $;
                break
            }
            e = a;
        }
        return tt(e || $, r)
    }
    return Y
}
st.parse = function(t, e) {
    if (2 !== t.length) return e.error("Expected one argument.");
    var r = t[1];
    if ("object" != typeof r || Array.isArray(r)) return e.error("Collator options argument must be an object.");
    var n = e.parse(void 0 !== r["case-sensitive"] && r["case-sensitive"], 1, G);
    if (!n) return null;
    var i = e.parse(void 0 !== r["diacritic-sensitive"] && r["diacritic-sensitive"], 1, G);
    if (!i) return null;
    var a = null;
    return r.locale && !(a = e.parse(r.locale, 1, J)) ? null : new st(n, i, a)
}, st.prototype.evaluate = function(t) {
    return new ot(this.caseSensitive.evaluate(t), this.diacriticSensitive.evaluate(t), this.locale ? this.locale.evaluate(t) : null)
}, st.prototype.eachChild = function(t) {
    t(this.caseSensitive), t(this.diacriticSensitive), this.locale && t(this.locale);
}, st.prototype.possibleOutputs = function() {
    return [void 0]
}, st.prototype.serialize = function() {
    var t = {};
    return t["case-sensitive"] = this.caseSensitive.serialize(), t["diacritic-sensitive"] = this.diacriticSensitive.serialize(), this.locale && (t.locale = this.locale.serialize()), ["collator", t]
};
var pt = function(t, e, r) {
        this.text = t, this.scale = e, this.fontStack = r;
    },
    ht = function(t) {
        this.sections = t;
    };
ht.prototype.toString = function() {
    return this.sections.map(function(t) {
        return t.text
    }).join("")
}, ht.prototype.serialize = function() {
    for (var t = ["format"], e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t.push(n.text);
        var i = n.fontStack ? ["literal", n.fontStack.split(",")] : null;
        t.push({
            "text-font": i,
            "font-scale": n.scale
        });
    }
    return t
};
var ct = function(t) {
    this.type = Q, this.sections = t;
};
ct.parse = function(t, e) {
    if (t.length < 3) return e.error("Expected at least two arguments.");
    if ((t.length - 1) % 2 != 0) return e.error("Expected an even number of arguments.");
    for (var r = [], n = 1; n < t.length - 1; n += 2) {
        var i = e.parse(t[n], 1, $);
        if (!i) return null;
        var a = i.type.kind;
        if ("string" !== a && "value" !== a && "null" !== a) return e.error("Formatted text type must be 'string', 'value', or 'null'.");
        var o = t[n + 1];
        if ("object" != typeof o || Array.isArray(o)) return e.error("Format options argument must be an object.");
        var s = null;
        if (o["font-scale"] && !(s = e.parse(o["font-scale"], 1, X))) return null;
        var u = null;
        if (o["text-font"] && !(u = e.parse(o["text-font"], 1, tt(J)))) return null;
        r.push({
            text: i,
            scale: s,
            font: u
        });
    }
    return new ct(r)
}, ct.prototype.evaluate = function(t) {
    return new ht(this.sections.map(function(e) {
        return new pt(e.text.evaluate(t) || "", e.scale ? e.scale.evaluate(t) : null, e.font ? e.font.evaluate(t).join(",") : null)
    }))
}, ct.prototype.eachChild = function(t) {
    for (var e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t(n.text), n.scale && t(n.scale), n.font && t(n.font);
    }
}, ct.prototype.possibleOutputs = function() {
    return [void 0]
}, ct.prototype.serialize = function() {
    for (var t = ["format"], e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t.push(n.text.serialize());
        var i = {};
        n.scale && (i["font-scale"] = n.scale.serialize()), n.font && (i["text-font"] = n.font.serialize()), t.push(i);
    }
    return t
};
var ft = function(t, e) {
    this.type = t, this.value = e;
};
ft.parse = function(t, e) {
    if (2 !== t.length) return e.error("'literal' expression requires exactly one argument, but found " + (t.length - 1) + " instead.");
    if (! function t(e) {
            if (null === e) return !0;
            if ("string" == typeof e) return !0;
            if ("boolean" == typeof e) return !0;
            if ("number" == typeof e) return !0;
            if (e instanceof at) return !0;
            if (e instanceof ot) return !0;
            if (Array.isArray(e)) {
                for (var r = 0, n = e; r < n.length; r += 1)
                    if (!t(n[r])) return !1;
                return !0
            }
            if ("object" == typeof e) {
                for (var i in e)
                    if (!t(e[i])) return !1;
                return !0
            }
            return !1
        }(t[1])) return e.error("invalid value");
    var r = t[1],
        n = lt(r),
        i = e.expectedType;
    return "array" !== n.kind || 0 !== n.N || !i || "array" !== i.kind || "number" == typeof i.N && 0 !== i.N || (n = i), new ft(n, r)
}, ft.prototype.evaluate = function() {
    return this.value
}, ft.prototype.eachChild = function() {}, ft.prototype.possibleOutputs = function() {
    return [this.value]
}, ft.prototype.serialize = function() {
    return "array" === this.type.kind || "object" === this.type.kind ? ["literal", this.value] : this.value instanceof at ? ["rgba"].concat(this.value.toArray()) : this.value instanceof ht ? this.value.serialize() : this.value
};
var yt = function(t) {
    this.name = "ExpressionEvaluationError", this.message = t;
};
yt.prototype.toJSON = function() {
    return this.message
};
var dt = {
        string: J,
        number: X,
        boolean: G,
        object: Y
    },
    mt = function(t, e) {
        this.type = t, this.args = e;
    };
mt.parse = function(t, e) {
    if (t.length < 2) return e.error("Expected at least one argument.");
    for (var r = t[0], n = dt[r], i = [], a = 1; a < t.length; a++) {
        var o = e.parse(t[a], a, $);
        if (!o) return null;
        i.push(o);
    }
    return new mt(n, i)
}, mt.prototype.evaluate = function(t) {
    for (var e = 0; e < this.args.length; e++) {
        var r = this.args[e].evaluate(t);
        if (!nt(this.type, lt(r))) return r;
        if (e === this.args.length - 1) throw new yt("Expected value to be of type " + et(this.type) + ", but found " + et(lt(r)) + " instead.")
    }
    return null
}, mt.prototype.eachChild = function(t) {
    this.args.forEach(t);
}, mt.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.args.map(function(t) {
        return t.possibleOutputs()
    }));
    var t;
}, mt.prototype.serialize = function() {
    return [this.type.kind].concat(this.args.map(function(t) {
        return t.serialize()
    }))
};
var vt = {
        string: J,
        number: X,
        boolean: G
    },
    gt = function(t, e) {
        this.type = t, this.input = e;
    };
gt.parse = function(t, e) {
    if (t.length < 2 || t.length > 4) return e.error("Expected 1, 2, or 3 arguments, but found " + (t.length - 1) + " instead.");
    var r, n;
    if (t.length > 2) {
        var i = t[1];
        if ("string" != typeof i || !(i in vt)) return e.error('The item type argument of "array" must be one of string, number, boolean', 1);
        r = vt[i];
    } else r = $;
    if (t.length > 3) {
        if ("number" != typeof t[2] || t[2] < 0 || t[2] !== Math.floor(t[2])) return e.error('The length argument to "array" must be a positive integer literal', 2);
        n = t[2];
    }
    var a = tt(r, n),
        o = e.parse(t[t.length - 1], t.length - 1, $);
    return o ? new gt(a, o) : null
}, gt.prototype.evaluate = function(t) {
    var e = this.input.evaluate(t);
    if (nt(this.type, lt(e))) throw new yt("Expected value to be of type " + et(this.type) + ", but found " + et(lt(e)) + " instead.");
    return e
}, gt.prototype.eachChild = function(t) {
    t(this.input);
}, gt.prototype.possibleOutputs = function() {
    return this.input.possibleOutputs()
}, gt.prototype.serialize = function() {
    var t = ["array"],
        e = this.type.itemType;
    if ("string" === e.kind || "number" === e.kind || "boolean" === e.kind) {
        t.push(e.kind);
        var r = this.type.N;
        "number" == typeof r && t.push(r);
    }
    return t.push(this.input.serialize()), t
};
var xt = {
        "to-number": X,
        "to-color": K
    },
    bt = function(t, e) {
        this.type = t, this.args = e;
    };
bt.parse = function(t, e) {
    if (t.length < 2) return e.error("Expected at least one argument.");
    for (var r = t[0], n = xt[r], i = [], a = 1; a < t.length; a++) {
        var o = e.parse(t[a], a, $);
        if (!o) return null;
        i.push(o);
    }
    return new bt(n, i)
}, bt.prototype.evaluate = function(t) {
    if ("color" === this.type.kind) {
        for (var e, r, n = 0, i = this.args; n < i.length; n += 1) {
            if (r = null, "string" == typeof(e = i[n].evaluate(t))) {
                var a = t.parseColor(e);
                if (a) return a
            } else if (Array.isArray(e) && !(r = e.length < 3 || e.length > 4 ? "Invalid rbga value " + JSON.stringify(e) + ": expected an array containing either three or four numeric values." : ut(e[0], e[1], e[2], e[3]))) return new at(e[0] / 255, e[1] / 255, e[2] / 255, e[3])
        }
        throw new yt(r || "Could not parse color from value '" + ("string" == typeof e ? e : JSON.stringify(e)) + "'")
    }
    if ("formatted" === this.type.kind) {
        for (var o, s = 0, u = this.args; s < u.length; s += 1) {
            if ("string" == typeof(o = u[s].evaluate(t))) return new ht([new pt(o, null, null)])
        }
        throw new yt("Could not parse formatted text from value '" + ("string" == typeof o ? o : JSON.stringify(o)) + "'")
    }
    for (var l = null, p = 0, h = this.args; p < h.length; p += 1) {
        if (null !== (l = h[p].evaluate(t))) {
            var c = Number(l);
            if (!isNaN(c)) return c
        }
    }
    throw new yt("Could not convert " + JSON.stringify(l) + " to number.")
}, bt.prototype.eachChild = function(t) {
    this.args.forEach(t);
}, bt.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.args.map(function(t) {
        return t.possibleOutputs()
    }));
    var t;
}, bt.prototype.serialize = function() {
    var t = ["to-" + this.type.kind];
    return this.eachChild(function(e) {
        t.push(e.serialize());
    }), t
};
var wt = ["Unknown", "Point", "LineString", "Polygon"],
    _t = function() {
        this._parseColorCache = {};
    };
_t.prototype.id = function() {
    return this.feature && "id" in this.feature ? this.feature.id : null
}, _t.prototype.geometryType = function() {
    return this.feature ? "number" == typeof this.feature.type ? wt[this.feature.type] : this.feature.type : null
}, _t.prototype.properties = function() {
    return this.feature && this.feature.properties || {}
}, _t.prototype.parseColor = function(t) {
    var e = this._parseColorCache[t];
    return e || (e = this._parseColorCache[t] = at.parse(t)), e
};
var At = function(t, e, r, n) {
    this.name = t, this.type = e, this._evaluate = r, this.args = n;
};

function kt(t) {
    if (t instanceof At) {
        if ("get" === t.name && 1 === t.args.length) return !1;
        if ("feature-state" === t.name) return !1;
        if ("has" === t.name && 1 === t.args.length) return !1;
        if ("properties" === t.name || "geometry-type" === t.name || "id" === t.name) return !1;
        if (/^filter-/.test(t.name)) return !1
    }
    var e = !0;
    return t.eachChild(function(t) {
        e && !kt(t) && (e = !1);
    }), e
}

function St(t) {
    if (t instanceof At && "feature-state" === t.name) return !1;
    var e = !0;
    return t.eachChild(function(t) {
        e && !St(t) && (e = !1);
    }), e
}

function zt(t, e) {
    if (t instanceof At && e.indexOf(t.name) >= 0) return !1;
    var r = !0;
    return t.eachChild(function(t) {
        r && !zt(t, e) && (r = !1);
    }), r
}
At.prototype.evaluate = function(t) {
    return this._evaluate(t, this.args)
}, At.prototype.eachChild = function(t) {
    this.args.forEach(t);
}, At.prototype.possibleOutputs = function() {
    return [void 0]
}, At.prototype.serialize = function() {
    return [this.name].concat(this.args.map(function(t) {
        return t.serialize()
    }))
}, At.parse = function(t, e) {
    var r = t[0],
        n = At.definitions[r];
    if (!n) return e.error('Unknown expression "' + r + '". If you wanted a literal array, use ["literal", [...]].', 0);
    for (var i = Array.isArray(n) ? n[0] : n.type, a = Array.isArray(n) ? [
            [n[1], n[2]]
        ] : n.overloads, o = a.filter(function(e) {
            var r = e[0];
            return !Array.isArray(r) || r.length === t.length - 1
        }), s = null, u = 0, l = o; u < l.length; u += 1) {
        var p = l[u],
            h = p[0],
            c = p[1];
        s = new Bt(e.registry, e.path, null, e.scope);
        for (var f = [], y = !1, d = 1; d < t.length; d++) {
            var m = t[d],
                v = Array.isArray(h) ? h[d - 1] : h.type,
                g = s.parse(m, 1 + f.length, v);
            if (!g) {
                y = !0;
                break
            }
            f.push(g);
        }
        if (!y)
            if (Array.isArray(h) && h.length !== f.length) s.error("Expected " + h.length + " arguments, but found " + f.length + " instead.");
            else {
                for (var x = 0; x < f.length; x++) {
                    var b = Array.isArray(h) ? h[x] : h.type,
                        w = f[x];
                    s.concat(x + 1).checkSubtype(b, w.type);
                }
                if (0 === s.errors.length) return new At(r, i, c, f)
            }
    }
    if (1 === o.length) e.errors.push.apply(e.errors, s.errors);
    else {
        for (var _ = (o.length ? o : a).map(function(t) {
                var e, r = t[0];
                return e = r, Array.isArray(e) ? "(" + e.map(et).join(", ") + ")" : "(" + et(e.type) + "...)"
            }).join(" | "), A = [], k = 1; k < t.length; k++) {
            var S = e.parse(t[k], 1 + A.length);
            if (!S) return null;
            A.push(et(S.type));
        }
        e.error("Expected arguments of type " + _ + ", but found (" + A.join(", ") + ") instead.");
    }
    return null
}, At.register = function(t, e) {
    for (var r in At.definitions = e, e) t[r] = At;
};
var Mt = function(t, e) {
    this.type = e.type, this.name = t, this.boundExpression = e;
};
Mt.parse = function(t, e) {
    if (2 !== t.length || "string" != typeof t[1]) return e.error("'var' expression requires exactly one string literal argument.");
    var r = t[1];
    return e.scope.has(r) ? new Mt(r, e.scope.get(r)) : e.error('Unknown variable "' + r + '". Make sure "' + r + '" has been bound in an enclosing "let" expression before using it.', 1)
}, Mt.prototype.evaluate = function(t) {
    return this.boundExpression.evaluate(t)
}, Mt.prototype.eachChild = function() {}, Mt.prototype.possibleOutputs = function() {
    return [void 0]
}, Mt.prototype.serialize = function() {
    return ["var", this.name]
};
var Bt = function(t, e, r, n, i) {
    void 0 === e && (e = []), void 0 === n && (n = new Z), void 0 === i && (i = []), this.registry = t, this.path = e, this.key = e.map(function(t) {
        return "[" + t + "]"
    }).join(""), this.scope = n, this.errors = i, this.expectedType = r;
};

function It(t, e) {
    for (var r, n, i = 0, a = t.length - 1, o = 0; i <= a;) {
        if (r = t[o = Math.floor((i + a) / 2)], n = t[o + 1], e === r || e > r && e < n) return o;
        if (r < e) i = o + 1;
        else {
            if (!(r > e)) throw new yt("Input is not a number.");
            a = o - 1;
        }
    }
    return Math.max(o - 1, 0)
}
Bt.prototype.parse = function(t, e, r, n, i) {
    return void 0 === i && (i = {}), e ? this.concat(e, r, n)._parse(t, i) : this._parse(t, i)
}, Bt.prototype._parse = function(t, e) {
    if (null !== t && "string" != typeof t && "boolean" != typeof t && "number" != typeof t || (t = ["literal", t]), Array.isArray(t)) {
        if (0 === t.length) return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
        var r = t[0];
        if ("string" != typeof r) return this.error("Expression name must be a string, but found " + typeof r + ' instead. If you wanted a literal array, use ["literal", [...]].', 0), null;
        var n = this.registry[r];
        if (n) {
            var i = n.parse(t, this);
            if (!i) return null;
            if (this.expectedType) {
                var a = this.expectedType,
                    o = i.type;
                if ("string" !== a.kind && "number" !== a.kind && "boolean" !== a.kind && "object" !== a.kind || "value" !== o.kind)
                    if ("array" === a.kind && "value" === o.kind) e.omitTypeAnnotations || (i = new gt(a, i));
                    else if ("color" !== a.kind || "value" !== o.kind && "string" !== o.kind)
                    if ("formatted" !== a.kind || "value" !== o.kind && "string" !== o.kind) {
                        if (this.checkSubtype(this.expectedType, i.type)) return null
                    } else e.omitTypeAnnotations || (i = new bt(a, [i]));
                else e.omitTypeAnnotations || (i = new bt(a, [i]));
                else e.omitTypeAnnotations || (i = new mt(a, [i]));
            }
            if (!(i instanceof ft) && function t(e) {
                    if (e instanceof Mt) return t(e.boundExpression);
                    if (e instanceof At && "error" === e.name) return !1;
                    if (e instanceof st) return !1;
                    var r = e instanceof bt || e instanceof mt || e instanceof gt;
                    var n = !0;
                    e.eachChild(function(e) {
                        n = r ? n && t(e) : n && e instanceof ft;
                    });
                    if (!n) return !1;
                    return kt(e) && zt(e, ["zoom", "heatmap-density", "line-progress", "is-supported-script"])
                }(i)) {
                var s = new _t;
                try {
                    i = new ft(i.type, i.evaluate(s));
                } catch (t) {
                    return this.error(t.message), null
                }
            }
            return i
        }
        return this.error('Unknown expression "' + r + '". If you wanted a literal array, use ["literal", [...]].', 0)
    }
    return void 0 === t ? this.error("'undefined' value invalid. Use null instead.") : "object" == typeof t ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error("Expected an array, but found " + typeof t + " instead.")
}, Bt.prototype.concat = function(t, e, r) {
    var n = "number" == typeof t ? this.path.concat(t) : this.path,
        i = r ? this.scope.concat(r) : this.scope;
    return new Bt(this.registry, n, e || null, i, this.errors)
}, Bt.prototype.error = function(t) {
    for (var e = [], r = arguments.length - 1; r-- > 0;) e[r] = arguments[r + 1];
    var n = "" + this.key + e.map(function(t) {
        return "[" + t + "]"
    }).join("");
    this.errors.push(new N(n, t));
}, Bt.prototype.checkSubtype = function(t, e) {
    var r = nt(t, e);
    return r && this.error(r), r
};
var Vt = function(t, e, r) {
    this.type = t, this.input = e, this.labels = [], this.outputs = [];
    for (var n = 0, i = r; n < i.length; n += 1) {
        var a = i[n],
            o = a[0],
            s = a[1];
        this.labels.push(o), this.outputs.push(s);
    }
};

function Ct(t, e, r) {
    return t * (1 - r) + e * r
}
Vt.parse = function(t, e) {
    var r = t[1],
        n = t.slice(2);
    if (t.length - 1 < 4) return e.error("Expected at least 4 arguments, but found only " + (t.length - 1) + ".");
    if ((t.length - 1) % 2 != 0) return e.error("Expected an even number of arguments.");
    if (!(r = e.parse(r, 1, X))) return null;
    var i = [],
        a = null;
    e.expectedType && "value" !== e.expectedType.kind && (a = e.expectedType), n.unshift(-1 / 0);
    for (var o = 0; o < n.length; o += 2) {
        var s = n[o],
            u = n[o + 1],
            l = o + 1,
            p = o + 2;
        if ("number" != typeof s) return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', l);
        if (i.length && i[i.length - 1][0] >= s) return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', l);
        var h = e.parse(u, p, a);
        if (!h) return null;
        a = a || h.type, i.push([s, h]);
    }
    return new Vt(a, r, i)
}, Vt.prototype.evaluate = function(t) {
    var e = this.labels,
        r = this.outputs;
    if (1 === e.length) return r[0].evaluate(t);
    var n = this.input.evaluate(t);
    if (n <= e[0]) return r[0].evaluate(t);
    var i = e.length;
    return n >= e[i - 1] ? r[i - 1].evaluate(t) : r[It(e, n)].evaluate(t)
}, Vt.prototype.eachChild = function(t) {
    t(this.input);
    for (var e = 0, r = this.outputs; e < r.length; e += 1) {
        t(r[e]);
    }
}, Vt.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.outputs.map(function(t) {
        return t.possibleOutputs()
    }));
    var t;
}, Vt.prototype.serialize = function() {
    for (var t = ["step", this.input.serialize()], e = 0; e < this.labels.length; e++) e > 0 && t.push(this.labels[e]), t.push(this.outputs[e].serialize());
    return t
};
var Tt = Object.freeze({
        number: Ct,
        color: function(t, e, r) {
            return new at(Ct(t.r, e.r, r), Ct(t.g, e.g, r), Ct(t.b, e.b, r), Ct(t.a, e.a, r))
        },
        array: function(t, e, r) {
            return t.map(function(t, n) {
                return Ct(t, e[n], r)
            })
        }
    }),
    Et = function(t, e, r, n) {
        this.type = t, this.interpolation = e, this.input = r, this.labels = [], this.outputs = [];
        for (var i = 0, a = n; i < a.length; i += 1) {
            var o = a[i],
                s = o[0],
                u = o[1];
            this.labels.push(s), this.outputs.push(u);
        }
    };

function Pt(t, e, r, n) {
    var i = n - r,
        a = t - r;
    return 0 === i ? 0 : 1 === e ? a / i : (Math.pow(e, a) - 1) / (Math.pow(e, i) - 1)
}
Et.interpolationFactor = function(t, e, n, i) {
    var a = 0;
    if ("exponential" === t.name) a = Pt(e, t.base, n, i);
    else if ("linear" === t.name) a = Pt(e, 1, n, i);
    else if ("cubic-bezier" === t.name) {
        var o = t.controlPoints;
        a = new r(o[0], o[1], o[2], o[3]).solve(Pt(e, 1, n, i));
    }
    return a
}, Et.parse = function(t, e) {
    var r = t[1],
        n = t[2],
        i = t.slice(3);
    if (!Array.isArray(r) || 0 === r.length) return e.error("Expected an interpolation type expression.", 1);
    if ("linear" === r[0]) r = {
        name: "linear"
    };
    else if ("exponential" === r[0]) {
        var a = r[1];
        if ("number" != typeof a) return e.error("Exponential interpolation requires a numeric base.", 1, 1);
        r = {
            name: "exponential",
            base: a
        };
    } else {
        if ("cubic-bezier" !== r[0]) return e.error("Unknown interpolation type " + String(r[0]), 1, 0);
        var o = r.slice(1);
        if (4 !== o.length || o.some(function(t) {
                return "number" != typeof t || t < 0 || t > 1
            })) return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
        r = {
            name: "cubic-bezier",
            controlPoints: o
        };
    }
    if (t.length - 1 < 4) return e.error("Expected at least 4 arguments, but found only " + (t.length - 1) + ".");
    if ((t.length - 1) % 2 != 0) return e.error("Expected an even number of arguments.");
    if (!(n = e.parse(n, 2, X))) return null;
    var s = [],
        u = null;
    e.expectedType && "value" !== e.expectedType.kind && (u = e.expectedType);
    for (var l = 0; l < i.length; l += 2) {
        var p = i[l],
            h = i[l + 1],
            c = l + 3,
            f = l + 4;
        if ("number" != typeof p) return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', c);
        if (s.length && s[s.length - 1][0] >= p) return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', c);
        var y = e.parse(h, f, u);
        if (!y) return null;
        u = u || y.type, s.push([p, y]);
    }
    return "number" === u.kind || "color" === u.kind || "array" === u.kind && "number" === u.itemType.kind && "number" == typeof u.N ? new Et(u, r, n, s) : e.error("Type " + et(u) + " is not interpolatable.")
}, Et.prototype.evaluate = function(t) {
    var e = this.labels,
        r = this.outputs;
    if (1 === e.length) return r[0].evaluate(t);
    var n = this.input.evaluate(t);
    if (n <= e[0]) return r[0].evaluate(t);
    var i = e.length;
    if (n >= e[i - 1]) return r[i - 1].evaluate(t);
    var a = It(e, n),
        o = e[a],
        s = e[a + 1],
        u = Et.interpolationFactor(this.interpolation, n, o, s),
        l = r[a].evaluate(t),
        p = r[a + 1].evaluate(t);
    return Tt[this.type.kind.toLowerCase()](l, p, u)
}, Et.prototype.eachChild = function(t) {
    t(this.input);
    for (var e = 0, r = this.outputs; e < r.length; e += 1) {
        t(r[e]);
    }
}, Et.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.outputs.map(function(t) {
        return t.possibleOutputs()
    }));
    var t;
}, Et.prototype.serialize = function() {
    for (var t = ["interpolate", "linear" === this.interpolation.name ? ["linear"] : "exponential" === this.interpolation.name ? 1 === this.interpolation.base ? ["linear"] : ["exponential", this.interpolation.base] : ["cubic-bezier"].concat(this.interpolation.controlPoints), this.input.serialize()], e = 0; e < this.labels.length; e++) t.push(this.labels[e], this.outputs[e].serialize());
    return t
};
var Ft = function(t, e) {
    this.type = t, this.args = e;
};
Ft.parse = function(t, e) {
    if (t.length < 2) return e.error("Expectected at least one argument.");
    var r = null,
        n = e.expectedType;
    n && "value" !== n.kind && (r = n);
    for (var i = [], a = 0, o = t.slice(1); a < o.length; a += 1) {
        var s = o[a],
            u = e.parse(s, 1 + i.length, r, void 0, {
                omitTypeAnnotations: !0
            });
        if (!u) return null;
        r = r || u.type, i.push(u);
    }
    var l = n && i.some(function(t) {
        return nt(n, t.type)
    });
    return new Ft(l ? $ : r, i)
}, Ft.prototype.evaluate = function(t) {
    for (var e = null, r = 0, n = this.args; r < n.length; r += 1) {
        if (null !== (e = n[r].evaluate(t))) break
    }
    return e
}, Ft.prototype.eachChild = function(t) {
    this.args.forEach(t);
}, Ft.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.args.map(function(t) {
        return t.possibleOutputs()
    }));
    var t;
}, Ft.prototype.serialize = function() {
    var t = ["coalesce"];
    return this.eachChild(function(e) {
        t.push(e.serialize());
    }), t
};
var Lt = function(t, e) {
    this.type = e.type, this.bindings = [].concat(t), this.result = e;
};
Lt.prototype.evaluate = function(t) {
    return this.result.evaluate(t)
}, Lt.prototype.eachChild = function(t) {
    for (var e = 0, r = this.bindings; e < r.length; e += 1) {
        t(r[e][1]);
    }
    t(this.result);
}, Lt.parse = function(t, e) {
    if (t.length < 4) return e.error("Expected at least 3 arguments, but found " + (t.length - 1) + " instead.");
    for (var r = [], n = 1; n < t.length - 1; n += 2) {
        var i = t[n];
        if ("string" != typeof i) return e.error("Expected string, but found " + typeof i + " instead.", n);
        if (/[^a-zA-Z0-9_]/.test(i)) return e.error("Variable names must contain only alphanumeric characters or '_'.", n);
        var a = e.parse(t[n + 1], n + 1);
        if (!a) return null;
        r.push([i, a]);
    }
    var o = e.parse(t[t.length - 1], t.length - 1, void 0, r);
    return o ? new Lt(r, o) : null
}, Lt.prototype.possibleOutputs = function() {
    return this.result.possibleOutputs()
}, Lt.prototype.serialize = function() {
    for (var t = ["let"], e = 0, r = this.bindings; e < r.length; e += 1) {
        var n = r[e],
            i = n[0],
            a = n[1];
        t.push(i, a.serialize());
    }
    return t.push(this.result.serialize()), t
};
var Ot = function(t, e, r) {
    this.type = t, this.index = e, this.input = r;
};
Ot.parse = function(t, e) {
    if (3 !== t.length) return e.error("Expected 2 arguments, but found " + (t.length - 1) + " instead.");
    var r = e.parse(t[1], 1, X),
        n = e.parse(t[2], 2, tt(e.expectedType || $));
    if (!r || !n) return null;
    var i = n.type;
    return new Ot(i.itemType, r, n)
}, Ot.prototype.evaluate = function(t) {
    var e = this.index.evaluate(t),
        r = this.input.evaluate(t);
    if (e < 0) throw new yt("Array index out of bounds: " + e + " < 0.");
    if (e >= r.length) throw new yt("Array index out of bounds: " + e + " > " + (r.length - 1) + ".");
    if (e !== Math.floor(e)) throw new yt("Array index must be an integer, but found " + e + " instead.");
    return r[e]
}, Ot.prototype.eachChild = function(t) {
    t(this.index), t(this.input);
}, Ot.prototype.possibleOutputs = function() {
    return [void 0]
}, Ot.prototype.serialize = function() {
    return ["at", this.index.serialize(), this.input.serialize()]
};
var Dt = function(t, e, r, n, i, a) {
    this.inputType = t, this.type = e, this.input = r, this.cases = n, this.outputs = i, this.otherwise = a;
};
Dt.parse = function(t, e) {
    if (t.length < 5) return e.error("Expected at least 4 arguments, but found only " + (t.length - 1) + ".");
    if (t.length % 2 != 1) return e.error("Expected an even number of arguments.");
    var r, n;
    e.expectedType && "value" !== e.expectedType.kind && (n = e.expectedType);
    for (var i = {}, a = [], o = 2; o < t.length - 1; o += 2) {
        var s = t[o],
            u = t[o + 1];
        Array.isArray(s) || (s = [s]);
        var l = e.concat(o);
        if (0 === s.length) return l.error("Expected at least one branch label.");
        for (var p = 0, h = s; p < h.length; p += 1) {
            var c = h[p];
            if ("number" != typeof c && "string" != typeof c) return l.error("Branch labels must be numbers or strings.");
            if ("number" == typeof c && Math.abs(c) > Number.MAX_SAFE_INTEGER) return l.error("Branch labels must be integers no larger than " + Number.MAX_SAFE_INTEGER + ".");
            if ("number" == typeof c && Math.floor(c) !== c) return l.error("Numeric branch labels must be integer values.");
            if (r) {
                if (l.checkSubtype(r, lt(c))) return null
            } else r = lt(c);
            if (void 0 !== i[String(c)]) return l.error("Branch labels must be unique.");
            i[String(c)] = a.length;
        }
        var f = e.parse(u, o, n);
        if (!f) return null;
        n = n || f.type, a.push(f);
    }
    var y = e.parse(t[1], 1, $);
    if (!y) return null;
    var d = e.parse(t[t.length - 1], t.length - 1, n);
    return d ? "value" !== y.type.kind && e.concat(1).checkSubtype(r, y.type) ? null : new Dt(r, n, y, i, a, d) : null
}, Dt.prototype.evaluate = function(t) {
    var e = this.input.evaluate(t);
    return (lt(e) === this.inputType && this.outputs[this.cases[e]] || this.otherwise).evaluate(t)
}, Dt.prototype.eachChild = function(t) {
    t(this.input), this.outputs.forEach(t), t(this.otherwise);
}, Dt.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.outputs.map(function(t) {
        return t.possibleOutputs()
    })).concat(this.otherwise.possibleOutputs());
    var t;
}, Dt.prototype.serialize = function() {
    for (var t = this, e = ["match", this.input.serialize()], r = [], n = {}, i = 0, a = Object.keys(this.cases).sort(); i < a.length; i += 1) {
        var o = a[i],
            s = n[t.cases[o]];
        void 0 === s ? (n[t.cases[o]] = r.length, r.push([t.cases[o],
            [o]
        ])) : r[s][1].push(o);
    }
    for (var u = function(e) {
            return "number" === t.inputType.kind ? Number(e) : e
        }, l = 0, p = r; l < p.length; l += 1) {
        var h = p[l],
            c = h[0],
            f = h[1];
        1 === f.length ? e.push(u(f[0])) : e.push(f.map(u)), e.push(t.outputs[c].serialize());
    }
    return e.push(this.otherwise.serialize()), e
};
var qt = function(t, e, r) {
    this.type = t, this.branches = e, this.otherwise = r;
};

function jt(t, e) {
    return "==" === t || "!=" === t ? "boolean" === e.kind || "string" === e.kind || "number" === e.kind || "null" === e.kind || "value" === e.kind : "string" === e.kind || "number" === e.kind || "value" === e.kind
}

function Ut(t, e, r, n) {
    return 0 === n.compare(e, r)
}

function Rt(t, e, r) {
    var n = "==" !== t && "!=" !== t;
    return function() {
        function i(t, e, r) {
            this.type = G, this.lhs = t, this.rhs = e, this.collator = r, this.hasUntypedArgument = "value" === t.type.kind || "value" === e.type.kind;
        }
        return i.parse = function(t, e) {
            if (3 !== t.length && 4 !== t.length) return e.error("Expected two or three arguments.");
            var r = t[0],
                a = e.parse(t[1], 1, $);
            if (!a) return null;
            if (!jt(r, a.type)) return e.concat(1).error('"' + r + "\" comparisons are not supported for type '" + et(a.type) + "'.");
            var o = e.parse(t[2], 2, $);
            if (!o) return null;
            if (!jt(r, o.type)) return e.concat(2).error('"' + r + "\" comparisons are not supported for type '" + et(o.type) + "'.");
            if (a.type.kind !== o.type.kind && "value" !== a.type.kind && "value" !== o.type.kind) return e.error("Cannot compare types '" + et(a.type) + "' and '" + et(o.type) + "'.");
            n && ("value" === a.type.kind && "value" !== o.type.kind ? a = new mt(o.type, [a]) : "value" !== a.type.kind && "value" === o.type.kind && (o = new mt(a.type, [o])));
            var s = null;
            if (4 === t.length) {
                if ("string" !== a.type.kind && "string" !== o.type.kind && "value" !== a.type.kind && "value" !== o.type.kind) return e.error("Cannot use collator to compare non-string types.");
                if (!(s = e.parse(t[3], 3, W))) return null
            }
            return new i(a, o, s)
        }, i.prototype.evaluate = function(i) {
            var a = this.lhs.evaluate(i),
                o = this.rhs.evaluate(i);
            if (n && this.hasUntypedArgument) {
                var s = lt(a),
                    u = lt(o);
                if (s.kind !== u.kind || "string" !== s.kind && "number" !== s.kind) throw new yt('Expected arguments for "' + t + '" to be (string, string) or (number, number), but found (' + s.kind + ", " + u.kind + ") instead.")
            }
            if (this.collator && !n && this.hasUntypedArgument) {
                var l = lt(a),
                    p = lt(o);
                if ("string" !== l.kind || "string" !== p.kind) return e(i, a, o)
            }
            return this.collator ? r(i, a, o, this.collator.evaluate(i)) : e(i, a, o)
        }, i.prototype.eachChild = function(t) {
            t(this.lhs), t(this.rhs), this.collator && t(this.collator);
        }, i.prototype.possibleOutputs = function() {
            return [!0, !1]
        }, i.prototype.serialize = function() {
            var e = [t];
            return this.eachChild(function(t) {
                e.push(t.serialize());
            }), e
        }, i
    }()
}
qt.parse = function(t, e) {
    if (t.length < 4) return e.error("Expected at least 3 arguments, but found only " + (t.length - 1) + ".");
    if (t.length % 2 != 0) return e.error("Expected an odd number of arguments.");
    var r;
    e.expectedType && "value" !== e.expectedType.kind && (r = e.expectedType);
    for (var n = [], i = 1; i < t.length - 1; i += 2) {
        var a = e.parse(t[i], i, G);
        if (!a) return null;
        var o = e.parse(t[i + 1], i + 1, r);
        if (!o) return null;
        n.push([a, o]), r = r || o.type;
    }
    var s = e.parse(t[t.length - 1], t.length - 1, r);
    return s ? new qt(r, n, s) : null
}, qt.prototype.evaluate = function(t) {
    for (var e = 0, r = this.branches; e < r.length; e += 1) {
        var n = r[e],
            i = n[0],
            a = n[1];
        if (i.evaluate(t)) return a.evaluate(t)
    }
    return this.otherwise.evaluate(t)
}, qt.prototype.eachChild = function(t) {
    for (var e = 0, r = this.branches; e < r.length; e += 1) {
        var n = r[e],
            i = n[0],
            a = n[1];
        t(i), t(a);
    }
    t(this.otherwise);
}, qt.prototype.possibleOutputs = function() {
    return (t = []).concat.apply(t, this.branches.map(function(t) {
        t[0];
        return t[1].possibleOutputs()
    })).concat(this.otherwise.possibleOutputs());
    var t;
}, qt.prototype.serialize = function() {
    var t = ["case"];
    return this.eachChild(function(e) {
        t.push(e.serialize());
    }), t
};
var Nt = Rt("==", function(t, e, r) {
        return e === r
    }, Ut),
    Zt = Rt("!=", function(t, e, r) {
        return e !== r
    }, function(t, e, r, n) {
        return !Ut(0, e, r, n)
    }),
    Ht = Rt("<", function(t, e, r) {
        return e < r
    }, function(t, e, r, n) {
        return n.compare(e, r) < 0
    }),
    Xt = Rt(">", function(t, e, r) {
        return e > r
    }, function(t, e, r, n) {
        return n.compare(e, r) > 0
    }),
    Jt = Rt("<=", function(t, e, r) {
        return e <= r
    }, function(t, e, r, n) {
        return n.compare(e, r) <= 0
    }),
    Gt = Rt(">=", function(t, e, r) {
        return e >= r
    }, function(t, e, r, n) {
        return n.compare(e, r) >= 0
    }),
    Kt = function(t) {
        this.type = X, this.input = t;
    };
Kt.parse = function(t, e) {
    if (2 !== t.length) return e.error("Expected 1 argument, but found " + (t.length - 1) + " instead.");
    var r = e.parse(t[1], 1);
    return r ? "array" !== r.type.kind && "string" !== r.type.kind && "value" !== r.type.kind ? e.error("Expected argument of type string or array, but found " + et(r.type) + " instead.") : new Kt(r) : null
}, Kt.prototype.evaluate = function(t) {
    var e = this.input.evaluate(t);
    if ("string" == typeof e) return e.length;
    if (Array.isArray(e)) return e.length;
    throw new yt("Expected value to be of type string or array, but found " + et(lt(e)) + " instead.")
}, Kt.prototype.eachChild = function(t) {
    t(this.input);
}, Kt.prototype.possibleOutputs = function() {
    return [void 0]
}, Kt.prototype.serialize = function() {
    var t = ["length"];
    return this.eachChild(function(e) {
        t.push(e.serialize());
    }), t
};
var Yt = {
    "==": Nt,
    "!=": Zt,
    ">": Xt,
    "<": Ht,
    ">=": Gt,
    "<=": Jt,
    array: gt,
    at: Ot,
    boolean: mt,
    case: qt,
    coalesce: Ft,
    collator: st,
    format: ct,
    interpolate: Et,
    length: Kt,
    let: Lt,
    literal: ft,
    match: Dt,
    number: mt,
    object: mt,
    step: Vt,
    string: mt,
    "to-color": bt,
    "to-number": bt,
    var: Mt
};

function $t(t, e) {
    var r = e[0],
        n = e[1],
        i = e[2],
        a = e[3];
    r = r.evaluate(t), n = n.evaluate(t), i = i.evaluate(t);
    var o = a ? a.evaluate(t) : 1,
        s = ut(r, n, i, o);
    if (s) throw new yt(s);
    return new at(r / 255 * o, n / 255 * o, i / 255 * o, o)
}

function Wt(t, e) {
    return t in e
}

function Qt(t, e) {
    var r = e[t];
    return void 0 === r ? null : r
}

function te(t) {
    return {
        type: t
    }
}

function ee(t) {
    return {
        result: "success",
        value: t
    }
}

function re(t) {
    return {
        result: "error",
        value: t
    }
}

function ne(t) {
    return "data-driven" === t["property-type"] || "cross-faded-data-driven" === t["property-type"]
}

function ie(t) {
    return !!t.expression && t.expression.parameters.indexOf("zoom") > -1
}

function ae(t) {
    return !!t.expression && t.expression.interpolated
}
At.register(Yt, {
    error: [{
            kind: "error"
        },
        [J],
        function(t, e) {
            var r = e[0];
            throw new yt(r.evaluate(t))
        }
    ],
    typeof: [J, [$], function(t, e) {
        return et(lt(e[0].evaluate(t)))
    }],
    "to-string": [J, [$], function(t, e) {
        var r = e[0],
            n = typeof(r = r.evaluate(t));
        return null === r ? "" : "string" === n || "number" === n || "boolean" === n ? String(r) : r instanceof at || r instanceof ht ? r.toString() : JSON.stringify(r)
    }],
    "to-boolean": [G, [$], function(t, e) {
        var r = e[0];
        return Boolean(r.evaluate(t))
    }],
    "to-rgba": [tt(X, 4), [K], function(t, e) {
        return e[0].evaluate(t).toArray()
    }],
    rgb: [K, [X, X, X], $t],
    rgba: [K, [X, X, X, X], $t],
    has: {
        type: G,
        overloads: [
            [
                [J],
                function(t, e) {
                    return Wt(e[0].evaluate(t), t.properties())
                }
            ],
            [
                [J, Y],
                function(t, e) {
                    var r = e[0],
                        n = e[1];
                    return Wt(r.evaluate(t), n.evaluate(t))
                }
            ]
        ]
    },
    get: {
        type: $,
        overloads: [
            [
                [J],
                function(t, e) {
                    return Qt(e[0].evaluate(t), t.properties())
                }
            ],
            [
                [J, Y],
                function(t, e) {
                    var r = e[0],
                        n = e[1];
                    return Qt(r.evaluate(t), n.evaluate(t))
                }
            ]
        ]
    },
    "feature-state": [$, [J], function(t, e) {
        return Qt(e[0].evaluate(t), t.featureState || {})
    }],
    properties: [Y, [], function(t) {
        return t.properties()
    }],
    "geometry-type": [J, [], function(t) {
        return t.geometryType()
    }],
    id: [$, [], function(t) {
        return t.id()
    }],
    zoom: [X, [], function(t) {
        return t.globals.zoom
    }],
    "heatmap-density": [X, [], function(t) {
        return t.globals.heatmapDensity || 0
    }],
    "line-progress": [X, [], function(t) {
        return t.globals.lineProgress || 0
    }],
    "+": [X, te(X), function(t, e) {
        for (var r = 0, n = 0, i = e; n < i.length; n += 1) {
            r += i[n].evaluate(t);
        }
        return r
    }],
    "*": [X, te(X), function(t, e) {
        for (var r = 1, n = 0, i = e; n < i.length; n += 1) {
            r *= i[n].evaluate(t);
        }
        return r
    }],
    "-": {
        type: X,
        overloads: [
            [
                [X, X],
                function(t, e) {
                    var r = e[0],
                        n = e[1];
                    return r.evaluate(t) - n.evaluate(t)
                }
            ],
            [
                [X],
                function(t, e) {
                    return -e[0].evaluate(t)
                }
            ]
        ]
    },
    "/": [X, [X, X], function(t, e) {
        var r = e[0],
            n = e[1];
        return r.evaluate(t) / n.evaluate(t)
    }],
    "%": [X, [X, X], function(t, e) {
        var r = e[0],
            n = e[1];
        return r.evaluate(t) % n.evaluate(t)
    }],
    ln2: [X, [], function() {
        return Math.LN2
    }],
    pi: [X, [], function() {
        return Math.PI
    }],
    e: [X, [], function() {
        return Math.E
    }],
    "^": [X, [X, X], function(t, e) {
        var r = e[0],
            n = e[1];
        return Math.pow(r.evaluate(t), n.evaluate(t))
    }],
    sqrt: [X, [X], function(t, e) {
        var r = e[0];
        return Math.sqrt(r.evaluate(t))
    }],
    log10: [X, [X], function(t, e) {
        var r = e[0];
        return Math.log10(r.evaluate(t))
    }],
    ln: [X, [X], function(t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t))
    }],
    log2: [X, [X], function(t, e) {
        var r = e[0];
        return Math.log2(r.evaluate(t))
    }],
    sin: [X, [X], function(t, e) {
        var r = e[0];
        return Math.sin(r.evaluate(t))
    }],
    cos: [X, [X], function(t, e) {
        var r = e[0];
        return Math.cos(r.evaluate(t))
    }],
    tan: [X, [X], function(t, e) {
        var r = e[0];
        return Math.tan(r.evaluate(t))
    }],
    asin: [X, [X], function(t, e) {
        var r = e[0];
        return Math.asin(r.evaluate(t))
    }],
    acos: [X, [X], function(t, e) {
        var r = e[0];
        return Math.acos(r.evaluate(t))
    }],
    atan: [X, [X], function(t, e) {
        var r = e[0];
        return Math.atan(r.evaluate(t))
    }],
    min: [X, te(X), function(t, e) {
        return Math.min.apply(Math, e.map(function(e) {
            return e.evaluate(t)
        }))
    }],
    max: [X, te(X), function(t, e) {
        return Math.max.apply(Math, e.map(function(e) {
            return e.evaluate(t)
        }))
    }],
    abs: [X, [X], function(t, e) {
        var r = e[0];
        return Math.abs(r.evaluate(t))
    }],
    round: [X, [X], function(t, e) {
        var r = e[0].evaluate(t);
        return r < 0 ? -Math.round(-r) : Math.round(r)
    }],
    floor: [X, [X], function(t, e) {
        var r = e[0];
        return Math.floor(r.evaluate(t))
    }],
    ceil: [X, [X], function(t, e) {
        var r = e[0];
        return Math.ceil(r.evaluate(t))
    }],
    "filter-==": [G, [J, $], function(t, e) {
        var r = e[0],
            n = e[1];
        return t.properties()[r.value] === n.value
    }],
    "filter-id-==": [G, [$], function(t, e) {
        var r = e[0];
        return t.id() === r.value
    }],
    "filter-type-==": [G, [J], function(t, e) {
        var r = e[0];
        return t.geometryType() === r.value
    }],
    "filter-<": [G, [J, $], function(t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return typeof i == typeof a && i < a
    }],
    "filter-id-<": [G, [$], function(t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return typeof n == typeof i && n < i
    }],
    "filter->": [G, [J, $], function(t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return typeof i == typeof a && i > a
    }],
    "filter-id->": [G, [$], function(t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return typeof n == typeof i && n > i
    }],
    "filter-<=": [G, [J, $], function(t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return typeof i == typeof a && i <= a
    }],
    "filter-id-<=": [G, [$], function(t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return typeof n == typeof i && n <= i
    }],
    "filter->=": [G, [J, $], function(t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return typeof i == typeof a && i >= a
    }],
    "filter-id->=": [G, [$], function(t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return typeof n == typeof i && n >= i
    }],
    "filter-has": [G, [$], function(t, e) {
        return e[0].value in t.properties()
    }],
    "filter-has-id": [G, [], function(t) {
        return null !== t.id()
    }],
    "filter-type-in": [G, [tt(J)], function(t, e) {
        return e[0].value.indexOf(t.geometryType()) >= 0
    }],
    "filter-id-in": [G, [tt($)], function(t, e) {
        return e[0].value.indexOf(t.id()) >= 0
    }],
    "filter-in-small": [G, [J, tt($)], function(t, e) {
        var r = e[0];
        return e[1].value.indexOf(t.properties()[r.value]) >= 0
    }],
    "filter-in-large": [G, [J, tt($)], function(t, e) {
        var r = e[0],
            n = e[1];
        return function(t, e, r, n) {
            for (; r <= n;) {
                var i = r + n >> 1;
                if (e[i] === t) return !0;
                e[i] > t ? n = i - 1 : r = i + 1;
            }
            return !1
        }(t.properties()[r.value], n.value, 0, n.value.length - 1)
    }],
    all: {
        type: G,
        overloads: [
            [
                [G, G],
                function(t, e) {
                    var r = e[0],
                        n = e[1];
                    return r.evaluate(t) && n.evaluate(t)
                }
            ],
            [te(G), function(t, e) {
                for (var r = 0, n = e; r < n.length; r += 1) {
                    if (!n[r].evaluate(t)) return !1
                }
                return !0
            }]
        ]
    },
    any: {
        type: G,
        overloads: [
            [
                [G, G],
                function(t, e) {
                    var r = e[0],
                        n = e[1];
                    return r.evaluate(t) || n.evaluate(t)
                }
            ],
            [te(G), function(t, e) {
                for (var r = 0, n = e; r < n.length; r += 1) {
                    if (n[r].evaluate(t)) return !0
                }
                return !1
            }]
        ]
    },
    "!": [G, [G], function(t, e) {
        return !e[0].evaluate(t)
    }],
    "is-supported-script": [G, [J], function(t, e) {
        var r = e[0],
            n = t.globals && t.globals.isSupportedScript;
        return !n || n(r.evaluate(t))
    }],
    upcase: [J, [J], function(t, e) {
        return e[0].evaluate(t).toUpperCase()
    }],
    downcase: [J, [J], function(t, e) {
        return e[0].evaluate(t).toLowerCase()
    }],
    concat: [J, te(J), function(t, e) {
        return e.map(function(e) {
            return e.evaluate(t)
        }).join("")
    }],
    "resolved-locale": [J, [W], function(t, e) {
        return e[0].evaluate(t).resolvedLocale()
    }]
});
var oe = .95047,
    se = 1,
    ue = 1.08883,
    le = 4 / 29,
    pe = 6 / 29,
    he = 3 * pe * pe,
    ce = pe * pe * pe,
    fe = Math.PI / 180,
    ye = 180 / Math.PI;

function de(t) {
    return t > ce ? Math.pow(t, 1 / 3) : t / he + le
}

function me(t) {
    return t > pe ? t * t * t : he * (t - le)
}

function ve(t) {
    return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
}

function ge(t) {
    return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
}

function xe(t) {
    var e = ge(t.r),
        r = ge(t.g),
        n = ge(t.b),
        i = de((.4124564 * e + .3575761 * r + .1804375 * n) / oe),
        a = de((.2126729 * e + .7151522 * r + .072175 * n) / se);
    return {
        l: 116 * a - 16,
        a: 500 * (i - a),
        b: 200 * (a - de((.0193339 * e + .119192 * r + .9503041 * n) / ue)),
        alpha: t.a
    }
}

function be(t) {
    var e = (t.l + 16) / 116,
        r = isNaN(t.a) ? e : e + t.a / 500,
        n = isNaN(t.b) ? e : e - t.b / 200;
    return e = se * me(e), r = oe * me(r), n = ue * me(n), new at(ve(3.2404542 * r - 1.5371385 * e - .4985314 * n), ve(-.969266 * r + 1.8760108 * e + .041556 * n), ve(.0556434 * r - .2040259 * e + 1.0572252 * n), t.alpha)
}
var we = {
        forward: xe,
        reverse: be,
        interpolate: function(t, e, r) {
            return {
                l: Ct(t.l, e.l, r),
                a: Ct(t.a, e.a, r),
                b: Ct(t.b, e.b, r),
                alpha: Ct(t.alpha, e.alpha, r)
            }
        }
    },
    _e = {
        forward: function(t) {
            var e = xe(t),
                r = e.l,
                n = e.a,
                i = e.b,
                a = Math.atan2(i, n) * ye;
            return {
                h: a < 0 ? a + 360 : a,
                c: Math.sqrt(n * n + i * i),
                l: r,
                alpha: t.a
            }
        },
        reverse: function(t) {
            var e = t.h * fe,
                r = t.c;
            return be({
                l: t.l,
                a: Math.cos(e) * r,
                b: Math.sin(e) * r,
                alpha: t.alpha
            })
        },
        interpolate: function(t, e, r) {
            return {
                h: function(t, e, r) {
                    var n = e - t;
                    return t + r * (n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n)
                }(t.h, e.h, r),
                c: Ct(t.c, e.c, r),
                l: Ct(t.l, e.l, r),
                alpha: Ct(t.alpha, e.alpha, r)
            }
        }
    },
    Ae = Object.freeze({
        lab: we,
        hcl: _e
    });

function ke(t) {
    return t instanceof Number ? "number" : t instanceof String ? "string" : t instanceof Boolean ? "boolean" : Array.isArray(t) ? "array" : null === t ? "null" : typeof t
}

function Se(t) {
    return "object" == typeof t && null !== t && !Array.isArray(t)
}

function ze(t) {
    return t
}

function Me(t, e, r) {
    return void 0 !== t ? t : void 0 !== e ? e : void 0 !== r ? r : void 0
}

function Be(t, e, r, n, i) {
    return Me(typeof r === i ? n[r] : void 0, t.default, e.default)
}

function Ie(t, e, r) {
    if ("number" !== ke(r)) return Me(t.default, e.default);
    var n = t.stops.length;
    if (1 === n) return t.stops[0][1];
    if (r <= t.stops[0][0]) return t.stops[0][1];
    if (r >= t.stops[n - 1][0]) return t.stops[n - 1][1];
    var i = Te(t.stops, r);
    return t.stops[i][1]
}

function Ve(t, e, r) {
    var n = void 0 !== t.base ? t.base : 1;
    if ("number" !== ke(r)) return Me(t.default, e.default);
    var i = t.stops.length;
    if (1 === i) return t.stops[0][1];
    if (r <= t.stops[0][0]) return t.stops[0][1];
    if (r >= t.stops[i - 1][0]) return t.stops[i - 1][1];
    var a = Te(t.stops, r),
        o = function(t, e, r, n) {
            var i = n - r,
                a = t - r;
            return 0 === i ? 0 : 1 === e ? a / i : (Math.pow(e, a) - 1) / (Math.pow(e, i) - 1)
        }(r, n, t.stops[a][0], t.stops[a + 1][0]),
        s = t.stops[a][1],
        u = t.stops[a + 1][1],
        l = Tt[e.type] || ze;
    if (t.colorSpace && "rgb" !== t.colorSpace) {
        var p = Ae[t.colorSpace];
        l = function(t, e) {
            return p.reverse(p.interpolate(p.forward(t), p.forward(e), o))
        };
    }
    return "function" == typeof s.evaluate ? {
        evaluate: function() {
            for (var t = [], e = arguments.length; e--;) t[e] = arguments[e];
            var r = s.evaluate.apply(void 0, t),
                n = u.evaluate.apply(void 0, t);
            if (void 0 !== r && void 0 !== n) return l(r, n, o)
        }
    } : l(s, u, o)
}

function Ce(t, e, r) {
    return "color" === e.type ? r = at.parse(r) : ke(r) === e.type || "enum" === e.type && e.values[r] || (r = void 0), Me(r, t.default, e.default)
}

function Te(t, e) {
    for (var r, n, i = 0, a = t.length - 1, o = 0; i <= a;) {
        if (r = t[o = Math.floor((i + a) / 2)][0], n = t[o + 1][0], e === r || e > r && e < n) return o;
        r < e ? i = o + 1 : r > e && (a = o - 1);
    }
    return Math.max(o - 1, 0)
}
var Ee = function(t, e) {
    var r;
    this.expression = t, this._warningHistory = {}, this._defaultValue = "color" === (r = e).type && Se(r.default) ? new at(0, 0, 0, 0) : "color" === r.type ? at.parse(r.default) || null : void 0 === r.default ? null : r.default, "enum" === e.type && (this._enumValues = e.values);
};

function Pe(t) {
    return Array.isArray(t) && t.length > 0 && "string" == typeof t[0] && t[0] in Yt
}

function Fe(t, e) {
    var r = new Bt(Yt, [], function(t) {
            var e = {
                color: K,
                string: J,
                number: X,
                enum: J,
                boolean: G
            };
            if ("array" === t.type) return tt(e[t.value] || $, t.length);
            return e[t.type] || null
        }(e)),
        n = r.parse(t);
    return n ? ee(new Ee(n, e)) : re(r.errors)
}
Ee.prototype.evaluateWithoutErrorHandling = function(t, e, r) {
    return this._evaluator || (this._evaluator = new _t), this._evaluator.globals = t, this._evaluator.feature = e, this._evaluator.featureState = r, this.expression.evaluate(this._evaluator)
}, Ee.prototype.evaluate = function(t, e, r) {
    this._evaluator || (this._evaluator = new _t), this._evaluator.globals = t, this._evaluator.feature = e, this._evaluator.featureState = r;
    try {
        var n = this.expression.evaluate(this._evaluator);
        if (null == n) return this._defaultValue;
        if (this._enumValues && !(n in this._enumValues)) throw new yt("Expected value to be one of " + Object.keys(this._enumValues).map(function(t) {
            return JSON.stringify(t)
        }).join(", ") + ", but found " + JSON.stringify(n) + " instead.");
        return n
    } catch (t) {
        return this._warningHistory[t.message] || (this._warningHistory[t.message] = !0, "undefined" != typeof console && console.warn(t.message)), this._defaultValue
    }
};
var Le = function(t, e) {
    this.kind = t, this._styleExpression = e, this.isStateDependent = "constant" !== t && !St(e.expression);
};
Le.prototype.evaluateWithoutErrorHandling = function(t, e, r) {
    return this._styleExpression.evaluateWithoutErrorHandling(t, e, r)
}, Le.prototype.evaluate = function(t, e, r) {
    return this._styleExpression.evaluate(t, e, r)
};
var Oe = function(t, e, r) {
    this.kind = t, this.zoomStops = r.labels, this._styleExpression = e, this.isStateDependent = "camera" !== t && !St(e.expression), r instanceof Et && (this._interpolationType = r.interpolation);
};

function De(t, e) {
    if ("error" === (t = Fe(t, e)).result) return t;
    var r = t.value.expression,
        n = kt(r);
    if (!n && !ne(e)) return re([new N("", "data expressions not supported")]);
    var i = zt(r, ["zoom"]);
    if (!i && !ie(e)) return re([new N("", "zoom expressions not supported")]);
    var a = function t(e) {
        var r = null;
        if (e instanceof Lt) r = t(e.result);
        else if (e instanceof Ft)
            for (var n = 0, i = e.args; n < i.length; n += 1) {
                var a = i[n];
                if (r = t(a)) break
            } else(e instanceof Vt || e instanceof Et) && e.input instanceof At && "zoom" === e.input.name && (r = e);
        if (r instanceof N) return r;
        e.eachChild(function(e) {
            var n = t(e);
            n instanceof N ? r = n : !r && n ? r = new N("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : r && n && r !== n && (r = new N("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
        });
        return r
    }(r);
    return a || i ? a instanceof N ? re([a]) : a instanceof Et && !ae(e) ? re([new N("", '"interpolate" expressions cannot be used with this property')]) : ee(a ? new Oe(n ? "camera" : "composite", t.value, a) : new Le(n ? "constant" : "source", t.value)) : re([new N("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')])
}
Oe.prototype.evaluateWithoutErrorHandling = function(t, e, r) {
    return this._styleExpression.evaluateWithoutErrorHandling(t, e, r)
}, Oe.prototype.evaluate = function(t, e, r) {
    return this._styleExpression.evaluate(t, e, r)
}, Oe.prototype.interpolationFactor = function(t, e, r) {
    return this._interpolationType ? Et.interpolationFactor(this._interpolationType, t, e, r) : 0
};
var qe = function(t, e) {
    this._parameters = t, this._specification = e, j(this, function t(e, r) {
        var n, i, a, o = "color" === r.type,
            s = e.stops && "object" == typeof e.stops[0][0],
            u = s || void 0 !== e.property,
            l = s || !u,
            p = e.type || (ae(r) ? "exponential" : "interval");
        if (o && ((e = j({}, e)).stops && (e.stops = e.stops.map(function(t) {
                return [t[0], at.parse(t[1])]
            })), e.default ? e.default = at.parse(e.default) : e.default = at.parse(r.default)), e.colorSpace && "rgb" !== e.colorSpace && !Ae[e.colorSpace]) throw new Error("Unknown color space: " + e.colorSpace);
        if ("exponential" === p) n = Ve;
        else if ("interval" === p) n = Ie;
        else if ("categorical" === p) {
            n = Be, i = Object.create(null);
            for (var h = 0, c = e.stops; h < c.length; h += 1) {
                var f = c[h];
                i[f[0]] = f[1];
            }
            a = typeof e.stops[0][0];
        } else {
            if ("identity" !== p) throw new Error('Unknown function type "' + p + '"');
            n = Ce;
        }
        if (s) {
            for (var y = {}, d = [], m = 0; m < e.stops.length; m++) {
                var v = e.stops[m],
                    g = v[0].zoom;
                void 0 === y[g] && (y[g] = {
                    zoom: g,
                    type: e.type,
                    property: e.property,
                    default: e.default,
                    stops: []
                }, d.push(g)), y[g].stops.push([v[0].value, v[1]]);
            }
            for (var x = [], b = 0, w = d; b < w.length; b += 1) {
                var _ = w[b];
                x.push([y[_].zoom, t(y[_], r)]);
            }
            return {
                kind: "composite",
                interpolationFactor: Et.interpolationFactor.bind(void 0, {
                    name: "linear"
                }),
                zoomStops: x.map(function(t) {
                    return t[0]
                }),
                evaluate: function(t, n) {
                    var i = t.zoom;
                    return Ve({
                        stops: x,
                        base: e.base
                    }, r, i).evaluate(i, n)
                }
            }
        }
        return l ? {
            kind: "camera",
            interpolationFactor: "exponential" === p ? Et.interpolationFactor.bind(void 0, {
                name: "exponential",
                base: void 0 !== e.base ? e.base : 1
            }) : function() {
                return 0
            },
            zoomStops: e.stops.map(function(t) {
                return t[0]
            }),
            evaluate: function(t) {
                var o = t.zoom;
                return n(e, r, o, i, a)
            }
        } : {
            kind: "source",
            evaluate: function(t, o) {
                var s = o && o.properties ? o.properties[e.property] : void 0;
                return void 0 === s ? Me(e.default, r.default) : n(e, r, s, i, a)
            }
        }
    }(this._parameters, this._specification));
};

function je(t, e) {
    if (Se(t)) return new qe(t, e);
    if (Pe(t)) {
        var r = De(t, e);
        if ("error" === r.result) throw new Error(r.value.map(function(t) {
            return t.key + ": " + t.message
        }).join(", "));
        return r.value
    }
    var n = t;
    return "string" == typeof t && "color" === e.type && (n = at.parse(t)), {
        kind: "constant",
        evaluate: function() {
            return n
        }
    }
}

function Ue(t) {
    var e = t.key,
        r = t.value,
        n = t.valueSpec || {},
        i = t.objectElementValidators || {},
        a = t.style,
        o = t.styleSpec,
        s = [],
        u = ke(r);
    if ("object" !== u) return [new D(e, r, "object expected, " + u + " found")];
    for (var l in r) {
        var p = l.split(".")[0],
            h = n[p] || n["*"],
            c = void 0;
        if (i[p]) c = i[p];
        else if (n[p]) c = hr;
        else if (i["*"]) c = i["*"];
        else {
            if (!n["*"]) {
                s.push(new D(e, r[l], 'unknown property "' + l + '"'));
                continue
            }
            c = hr;
        }
        s = s.concat(c({
            key: (e ? e + "." : e) + l,
            value: r[l],
            valueSpec: h,
            style: a,
            styleSpec: o,
            object: r,
            objectKey: l
        }, r));
    }
    for (var f in n) i[f] || n[f].required && void 0 === n[f].default && void 0 === r[f] && s.push(new D(e, r, 'missing required property "' + f + '"'));
    return s
}

function Re(t) {
    var e = t.value,
        r = t.valueSpec,
        n = t.style,
        i = t.styleSpec,
        a = t.key,
        o = t.arrayElementValidator || hr;
    if ("array" !== ke(e)) return [new D(a, e, "array expected, " + ke(e) + " found")];
    if (r.length && e.length !== r.length) return [new D(a, e, "array length " + r.length + " expected, length " + e.length + " found")];
    if (r["min-length"] && e.length < r["min-length"]) return [new D(a, e, "array length at least " + r["min-length"] + " expected, length " + e.length + " found")];
    var s = {
        type: r.value
    };
    i.$version < 7 && (s.function = r.function), "object" === ke(r.value) && (s = r.value);
    for (var u = [], l = 0; l < e.length; l++) u = u.concat(o({
        array: e,
        arrayIndex: l,
        value: e[l],
        valueSpec: s,
        style: n,
        styleSpec: i,
        key: a + "[" + l + "]"
    }));
    return u
}

function Ne(t) {
    var e = t.key,
        r = t.value,
        n = t.valueSpec,
        i = ke(r);
    return "number" !== i ? [new D(e, r, "number expected, " + i + " found")] : "minimum" in n && r < n.minimum ? [new D(e, r, r + " is less than the minimum value " + n.minimum)] : "maximum" in n && r > n.maximum ? [new D(e, r, r + " is greater than the maximum value " + n.maximum)] : []
}

function Ze(t) {
    var e, r, n, i = t.valueSpec,
        a = U(t.value.type),
        o = {},
        s = "categorical" !== a && void 0 === t.value.property,
        u = !s,
        l = "array" === ke(t.value.stops) && "array" === ke(t.value.stops[0]) && "object" === ke(t.value.stops[0][0]),
        p = Ue({
            key: t.key,
            value: t.value,
            valueSpec: t.styleSpec.function,
            style: t.style,
            styleSpec: t.styleSpec,
            objectElementValidators: {
                stops: function(t) {
                    if ("identity" === a) return [new D(t.key, t.value, 'identity function may not have a "stops" property')];
                    var e = [],
                        r = t.value;
                    e = e.concat(Re({
                        key: t.key,
                        value: r,
                        valueSpec: t.valueSpec,
                        style: t.style,
                        styleSpec: t.styleSpec,
                        arrayElementValidator: h
                    })), "array" === ke(r) && 0 === r.length && e.push(new D(t.key, r, "array must have at least one stop"));
                    return e
                },
                default: function(t) {
                    return hr({
                        key: t.key,
                        value: t.value,
                        valueSpec: i,
                        style: t.style,
                        styleSpec: t.styleSpec
                    })
                }
            }
        });
    return "identity" === a && s && p.push(new D(t.key, t.value, 'missing required property "property"')), "identity" === a || t.value.stops || p.push(new D(t.key, t.value, 'missing required property "stops"')), "exponential" === a && t.valueSpec.expression && !ae(t.valueSpec) && p.push(new D(t.key, t.value, "exponential functions not supported")), t.styleSpec.$version >= 8 && (u && !ne(t.valueSpec) ? p.push(new D(t.key, t.value, "property functions not supported")) : s && !ie(t.valueSpec) && p.push(new D(t.key, t.value, "zoom functions not supported"))), "categorical" !== a && !l || void 0 !== t.value.property || p.push(new D(t.key, t.value, '"property" property is required')), p;

    function h(t) {
        var e = [],
            a = t.value,
            s = t.key;
        if ("array" !== ke(a)) return [new D(s, a, "array expected, " + ke(a) + " found")];
        if (2 !== a.length) return [new D(s, a, "array length 2 expected, length " + a.length + " found")];
        if (l) {
            if ("object" !== ke(a[0])) return [new D(s, a, "object expected, " + ke(a[0]) + " found")];
            if (void 0 === a[0].zoom) return [new D(s, a, "object stop key must have zoom")];
            if (void 0 === a[0].value) return [new D(s, a, "object stop key must have value")];
            if (n && n > U(a[0].zoom)) return [new D(s, a[0].zoom, "stop zoom values must appear in ascending order")];
            U(a[0].zoom) !== n && (n = U(a[0].zoom), r = void 0, o = {}), e = e.concat(Ue({
                key: s + "[0]",
                value: a[0],
                valueSpec: {
                    zoom: {}
                },
                style: t.style,
                styleSpec: t.styleSpec,
                objectElementValidators: {
                    zoom: Ne,
                    value: c
                }
            }));
        } else e = e.concat(c({
            key: s + "[0]",
            value: a[0],
            valueSpec: {},
            style: t.style,
            styleSpec: t.styleSpec
        }, a));
        return e.concat(hr({
            key: s + "[1]",
            value: a[1],
            valueSpec: i,
            style: t.style,
            styleSpec: t.styleSpec
        }))
    }

    function c(t, n) {
        var s = ke(t.value),
            u = U(t.value),
            l = null !== t.value ? t.value : n;
        if (e) {
            if (s !== e) return [new D(t.key, l, s + " stop domain type must match previous stop domain type " + e)]
        } else e = s;
        if ("number" !== s && "string" !== s && "boolean" !== s) return [new D(t.key, l, "stop domain value must be a number, string, or boolean")];
        if ("number" !== s && "categorical" !== a) {
            var p = "number expected, " + s + " found";
            return ne(i) && void 0 === a && (p += '\nIf you intended to use a categorical function, specify `"type": "categorical"`.'), [new D(t.key, l, p)]
        }
        return "categorical" !== a || "number" !== s || isFinite(u) && Math.floor(u) === u ? "categorical" !== a && "number" === s && void 0 !== r && u < r ? [new D(t.key, l, "stop domain values must appear in ascending order")] : (r = u, "categorical" === a && u in o ? [new D(t.key, l, "stop domain values must be unique")] : (o[u] = !0, [])) : [new D(t.key, l, "integer expected, found " + u)]
    }
}

function He(t) {
    var e = ("property" === t.expressionContext ? De : Fe)(R(t.value), t.valueSpec);
    return "error" === e.result ? e.value.map(function(e) {
        return new D("" + t.key + e.key, t.value, e.message)
    }) : "property" === t.expressionContext && "text-font" === t.propertyKey && -1 !== e.value._styleExpression.expression.possibleOutputs().indexOf(void 0) ? [new D(t.key, t.value, 'Invalid data expression for "text-font". Output values must be contained as literals within the expression.')] : "property" !== t.expressionContext || "layout" !== t.propertyType || St(e.value._styleExpression.expression) ? [] : [new D(t.key, t.value, '"feature-state" data expressions are not supported with layout properties.')]
}

function Xe(t) {
    var e = t.key,
        r = t.value,
        n = t.valueSpec,
        i = [];
    return Array.isArray(n.values) ? -1 === n.values.indexOf(U(r)) && i.push(new D(e, r, "expected one of [" + n.values.join(", ") + "], " + JSON.stringify(r) + " found")) : -1 === Object.keys(n.values).indexOf(U(r)) && i.push(new D(e, r, "expected one of [" + Object.keys(n.values).join(", ") + "], " + JSON.stringify(r) + " found")), i
}

function Je(t) {
    if (!Array.isArray(t) || 0 === t.length) return !1;
    switch (t[0]) {
        case "has":
            return t.length >= 2 && "$id" !== t[1] && "$type" !== t[1];
        case "in":
        case "!in":
        case "!has":
        case "none":
            return !1;
        case "==":
        case "!=":
        case ">":
        case ">=":
        case "<":
        case "<=":
            return 3 !== t.length || Array.isArray(t[1]) || Array.isArray(t[2]);
        case "any":
        case "all":
            for (var e = 0, r = t.slice(1); e < r.length; e += 1) {
                var n = r[e];
                if (!Je(n) && "boolean" != typeof n) return !1
            }
            return !0;
        default:
            return !0
    }
}
qe.deserialize = function(t) {
    return new qe(t._parameters, t._specification)
}, qe.serialize = function(t) {
    return {
        _parameters: t._parameters,
        _specification: t._specification
    }
};
var Ge = {
    type: "boolean",
    default: !1,
    transition: !1,
    "property-type": "data-driven",
    expression: {
        interpolated: !1,
        parameters: ["zoom", "feature"]
    }
};

function Ke(t) {
    if (!t) return function() {
        return !0
    };
    Je(t) || (t = $e(t));
    var e = Fe(t, Ge);
    if ("error" === e.result) throw new Error(e.value.map(function(t) {
        return t.key + ": " + t.message
    }).join(", "));
    return function(t, r) {
        return e.value.evaluate(t, r)
    }
}

function Ye(t, e) {
    return t < e ? -1 : t > e ? 1 : 0
}

function $e(t) {
    if (!t) return !0;
    var e, r = t[0];
    return t.length <= 1 ? "any" !== r : "==" === r ? We(t[1], t[2], "==") : "!=" === r ? er(We(t[1], t[2], "==")) : "<" === r || ">" === r || "<=" === r || ">=" === r ? We(t[1], t[2], r) : "any" === r ? (e = t.slice(1), ["any"].concat(e.map($e))) : "all" === r ? ["all"].concat(t.slice(1).map($e)) : "none" === r ? ["all"].concat(t.slice(1).map($e).map(er)) : "in" === r ? Qe(t[1], t.slice(2)) : "!in" === r ? er(Qe(t[1], t.slice(2))) : "has" === r ? tr(t[1]) : "!has" !== r || er(tr(t[1]))
}

function We(t, e, r) {
    switch (t) {
        case "$type":
            return ["filter-type-" + r, e];
        case "$id":
            return ["filter-id-" + r, e];
        default:
            return ["filter-" + r, t, e]
    }
}

function Qe(t, e) {
    if (0 === e.length) return !1;
    switch (t) {
        case "$type":
            return ["filter-type-in", ["literal", e]];
        case "$id":
            return ["filter-id-in", ["literal", e]];
        default:
            return e.length > 200 && !e.some(function(t) {
                return typeof t != typeof e[0]
            }) ? ["filter-in-large", t, ["literal", e.sort(Ye)]] : ["filter-in-small", t, ["literal", e]]
    }
}

function tr(t) {
    switch (t) {
        case "$type":
            return !0;
        case "$id":
            return ["filter-has-id"];
        default:
            return ["filter-has", t]
    }
}

function er(t) {
    return ["!", t]
}

function rr(t) {
    return Je(R(t.value)) ? He(j({}, t, {
        expressionContext: "filter",
        valueSpec: {
            value: "boolean"
        }
    })) : function t(e) {
        var r = e.value;
        var n = e.key;
        if ("array" !== ke(r)) return [new D(n, r, "array expected, " + ke(r) + " found")];
        var i = e.styleSpec;
        var a;
        var o = [];
        if (r.length < 1) return [new D(n, r, "filter array must have at least 1 element")];
        o = o.concat(Xe({
            key: n + "[0]",
            value: r[0],
            valueSpec: i.filter_operator,
            style: e.style,
            styleSpec: e.styleSpec
        }));
        switch (U(r[0])) {
            case "<":
            case "<=":
            case ">":
            case ">=":
                r.length >= 2 && "$type" === U(r[1]) && o.push(new D(n, r, '"$type" cannot be use with operator "' + r[0] + '"'));
            case "==":
            case "!=":
                3 !== r.length && o.push(new D(n, r, 'filter array for operator "' + r[0] + '" must have 3 elements'));
            case "in":
            case "!in":
                r.length >= 2 && "string" !== (a = ke(r[1])) && o.push(new D(n + "[1]", r[1], "string expected, " + a + " found"));
                for (var s = 2; s < r.length; s++) a = ke(r[s]), "$type" === U(r[1]) ? o = o.concat(Xe({
                    key: n + "[" + s + "]",
                    value: r[s],
                    valueSpec: i.geometry_type,
                    style: e.style,
                    styleSpec: e.styleSpec
                })) : "string" !== a && "number" !== a && "boolean" !== a && o.push(new D(n + "[" + s + "]", r[s], "string, number, or boolean expected, " + a + " found"));
                break;
            case "any":
            case "all":
            case "none":
                for (var u = 1; u < r.length; u++) o = o.concat(t({
                    key: n + "[" + u + "]",
                    value: r[u],
                    style: e.style,
                    styleSpec: e.styleSpec
                }));
                break;
            case "has":
            case "!has":
                a = ke(r[1]), 2 !== r.length ? o.push(new D(n, r, 'filter array for "' + r[0] + '" operator must have 2 elements')) : "string" !== a && o.push(new D(n + "[1]", r[1], "string expected, " + a + " found"));
        }
        return o
    }(t)
}

function nr(t, e) {
    var r = t.key,
        n = t.style,
        i = t.styleSpec,
        a = t.value,
        o = t.objectKey,
        s = i[e + "_" + t.layerType];
    if (!s) return [];
    var u = o.match(/^(.*)-transition$/);
    if ("paint" === e && u && s[u[1]] && s[u[1]].transition) return hr({
        key: r,
        value: a,
        valueSpec: i.transition,
        style: n,
        styleSpec: i
    });
    var l, p = t.valueSpec || s[o];
    if (!p) return [new D(r, a, 'unknown property "' + o + '"')];
    if ("string" === ke(a) && ne(p) && !p.tokens && (l = /^{([^}]+)}$/.exec(a))) return [new D(r, a, '"' + o + '" does not support interpolation syntax\nUse an identity property function instead: `{ "type": "identity", "property": ' + JSON.stringify(l[1]) + " }`.")];
    var h = [];
    return "symbol" === t.layerType && ("text-field" === o && n && !n.glyphs && h.push(new D(r, a, 'use of "text-field" requires a style "glyphs" property')), "text-font" === o && Se(R(a)) && "identity" === U(a.type) && h.push(new D(r, a, '"text-font" does not support identity functions'))), h.concat(hr({
        key: t.key,
        value: a,
        valueSpec: p,
        style: n,
        styleSpec: i,
        expressionContext: "property",
        propertyType: e,
        propertyKey: o
    }))
}

function ir(t) {
    return nr(t, "paint")
}

function ar(t) {
    return nr(t, "layout")
}

function or(t) {
    var e = [],
        r = t.value,
        n = t.key,
        i = t.style,
        a = t.styleSpec;
    r.type || r.ref || e.push(new D(n, r, 'either "type" or "ref" is required'));
    var o, s = U(r.type),
        u = U(r.ref);
    if (r.id)
        for (var l = U(r.id), p = 0; p < t.arrayIndex; p++) {
            var h = i.layers[p];
            U(h.id) === l && e.push(new D(n, r.id, 'duplicate layer id "' + r.id + '", previously used at line ' + h.id.__line__));
        }
    if ("ref" in r)["type", "source", "source-layer", "filter", "layout"].forEach(function(t) {
        t in r && e.push(new D(n, r[t], '"' + t + '" is prohibited for ref layers'));
    }), i.layers.forEach(function(t) {
        U(t.id) === u && (o = t);
    }), o ? o.ref ? e.push(new D(n, r.ref, "ref cannot reference another ref layer")) : s = U(o.type) : e.push(new D(n, r.ref, 'ref layer "' + u + '" not found'));
    else if ("background" !== s)
        if (r.source) {
            var c = i.sources && i.sources[r.source],
                f = c && U(c.type);
            c ? "vector" === f && "raster" === s ? e.push(new D(n, r.source, 'layer "' + r.id + '" requires a raster source')) : "raster" === f && "raster" !== s ? e.push(new D(n, r.source, 'layer "' + r.id + '" requires a vector source')) : "vector" !== f || r["source-layer"] ? "raster-dem" === f && "hillshade" !== s ? e.push(new D(n, r.source, "raster-dem source can only be used with layer type 'hillshade'.")) : "line" !== s || !r.paint || !r.paint["line-gradient"] || "geojson" === f && c.lineMetrics || e.push(new D(n, r, 'layer "' + r.id + '" specifies a line-gradient, which requires a GeoJSON source with `lineMetrics` enabled.')) : e.push(new D(n, r, 'layer "' + r.id + '" must specify a "source-layer"')) : e.push(new D(n, r.source, 'source "' + r.source + '" not found'));
        } else e.push(new D(n, r, 'missing required property "source"'));
    return e = e.concat(Ue({
        key: n,
        value: r,
        valueSpec: a.layer,
        style: t.style,
        styleSpec: t.styleSpec,
        objectElementValidators: {
            "*": function() {
                return []
            },
            type: function() {
                return hr({
                    key: n + ".type",
                    value: r.type,
                    valueSpec: a.layer.type,
                    style: t.style,
                    styleSpec: t.styleSpec,
                    object: r,
                    objectKey: "type"
                })
            },
            filter: rr,
            layout: function(t) {
                return Ue({
                    layer: r,
                    key: t.key,
                    value: t.value,
                    style: t.style,
                    styleSpec: t.styleSpec,
                    objectElementValidators: {
                        "*": function(t) {
                            return ar(j({
                                layerType: s
                            }, t))
                        }
                    }
                })
            },
            paint: function(t) {
                return Ue({
                    layer: r,
                    key: t.key,
                    value: t.value,
                    style: t.style,
                    styleSpec: t.styleSpec,
                    objectElementValidators: {
                        "*": function(t) {
                            return ir(j({
                                layerType: s
                            }, t))
                        }
                    }
                })
            }
        }
    }))
}

function sr(t) {
    var e = t.value,
        r = t.key,
        n = t.styleSpec,
        i = t.style;
    if (!e.type) return [new D(r, e, '"type" is required')];
    var a = U(e.type),
        o = [];
    switch (a) {
        case "vector":
        case "raster":
        case "raster-dem":
            if (o = o.concat(Ue({
                    key: r,
                    value: e,
                    valueSpec: n["source_" + a.replace("-", "_")],
                    style: t.style,
                    styleSpec: n
                })), "url" in e)
                for (var s in e)["type", "url", "tileSize"].indexOf(s) < 0 && o.push(new D(r + "." + s, e[s], 'a source with a "url" property may not include a "' + s + '" property'));
            return o;
        case "geojson":
            return Ue({
                key: r,
                value: e,
                valueSpec: n.source_geojson,
                style: i,
                styleSpec: n
            });
        case "video":
            return Ue({
                key: r,
                value: e,
                valueSpec: n.source_video,
                style: i,
                styleSpec: n
            });
        case "image":
            return Ue({
                key: r,
                value: e,
                valueSpec: n.source_image,
                style: i,
                styleSpec: n
            });
        case "canvas":
            return o.push(new D(r, null, "Please use runtime APIs to add canvas sources, rather than including them in stylesheets.", "source.canvas")), o;
        default:
            return Xe({
                key: r + ".type",
                value: e.type,
                valueSpec: {
                    values: ["vector", "raster", "raster-dem", "geojson", "video", "image"]
                },
                style: i,
                styleSpec: n
            })
    }
}

function ur(t) {
    var e = t.value,
        r = t.styleSpec,
        n = r.light,
        i = t.style,
        a = [],
        o = ke(e);
    if (void 0 === e) return a;
    if ("object" !== o) return a = a.concat([new D("light", e, "object expected, " + o + " found")]);
    for (var s in e) {
        var u = s.match(/^(.*)-transition$/);
        a = u && n[u[1]] && n[u[1]].transition ? a.concat(hr({
            key: s,
            value: e[s],
            valueSpec: r.transition,
            style: i,
            styleSpec: r
        })) : n[s] ? a.concat(hr({
            key: s,
            value: e[s],
            valueSpec: n[s],
            style: i,
            styleSpec: r
        })) : a.concat([new D(s, e[s], 'unknown property "' + s + '"')]);
    }
    return a
}

function lr(t) {
    var e = t.value,
        r = t.key,
        n = ke(e);
    return "string" !== n ? [new D(r, e, "string expected, " + n + " found")] : []
}
var pr = {
    "*": function() {
        return []
    },
    array: Re,
    boolean: function(t) {
        var e = t.value,
            r = t.key,
            n = ke(e);
        return "boolean" !== n ? [new D(r, e, "boolean expected, " + n + " found")] : []
    },
    number: Ne,
    color: function(t) {
        var e = t.key,
            r = t.value,
            n = ke(r);
        return "string" !== n ? [new D(e, r, "color expected, " + n + " found")] : null === it(r) ? [new D(e, r, 'color expected, "' + r + '" found')] : []
    },
    constants: q,
    enum: Xe,
    filter: rr,
    function: Ze,
    layer: or,
    object: Ue,
    source: sr,
    light: ur,
    string: lr,
    formatted: function(t) {
        return 0 === lr(t).length ? [] : He(t)
    }
};

function hr(t) {
    var e = t.value,
        r = t.valueSpec,
        n = t.styleSpec;
    return r.expression && Se(U(e)) ? Ze(t) : r.expression && Pe(R(e)) ? He(t) : r.type && pr[r.type] ? pr[r.type](t) : Ue(j({}, t, {
        valueSpec: r.type ? n[r.type] : r
    }))
}

function cr(t) {
    var e = t.value,
        r = t.key,
        n = lr(t);
    return n.length ? n : (-1 === e.indexOf("{fontstack}") && n.push(new D(r, e, '"glyphs" url must include a "{fontstack}" token')), -1 === e.indexOf("{range}") && n.push(new D(r, e, '"glyphs" url must include a "{range}" token')), n)
}

function fr(t, e) {
    e = e || O;
    var r = [];
    return r = r.concat(hr({
        key: "",
        value: t,
        valueSpec: e.$root,
        styleSpec: e,
        style: t,
        objectElementValidators: {
            glyphs: cr,
            "*": function() {
                return []
            }
        }
    })), t.constants && (r = r.concat(q({
        key: "constants",
        value: t.constants,
        style: t,
        styleSpec: e
    }))), yr(r)
}

function yr(t) {
    return [].concat(t).sort(function(t, e) {
        return t.line - e.line
    })
}

function dr(t) {
    return function() {
        return yr(t.apply(this, arguments))
    }
}
fr.source = dr(sr), fr.light = dr(ur), fr.layer = dr(or), fr.filter = dr(rr), fr.paintProperty = dr(ir), fr.layoutProperty = dr(ar);
var mr = fr,
    vr = fr.light,
    gr = fr.paintProperty,
    xr = fr.layoutProperty;

function br(t, e) {
    var r = !1;
    if (e && e.length)
        for (var n = 0, i = e; n < i.length; n += 1) {
            var a = i[n];
            t.fire(new F(new Error(a.message))), r = !0;
        }
    return r
}
var wr = Ar,
    _r = 3;

function Ar(t, e, r) {
    var n = this.cells = [];
    if (t instanceof ArrayBuffer) {
        this.arrayBuffer = t;
        var i = new Int32Array(this.arrayBuffer);
        t = i[0], e = i[1], r = i[2], this.d = e + 2 * r;
        for (var a = 0; a < this.d * this.d; a++) {
            var o = i[_r + a],
                s = i[_r + a + 1];
            n.push(o === s ? null : i.subarray(o, s));
        }
        var u = i[_r + n.length],
            l = i[_r + n.length + 1];
        this.keys = i.subarray(u, l), this.bboxes = i.subarray(l), this.insert = this._insertReadonly;
    } else {
        this.d = e + 2 * r;
        for (var p = 0; p < this.d * this.d; p++) n.push([]);
        this.keys = [], this.bboxes = [];
    }
    this.n = e, this.extent = t, this.padding = r, this.scale = e / t, this.uid = 0;
    var h = r / e * t;
    this.min = -h, this.max = t + h;
}
Ar.prototype.insert = function(t, e, r, n, i) {
    this._forEachCell(e, r, n, i, this._insertCell, this.uid++), this.keys.push(t), this.bboxes.push(e), this.bboxes.push(r), this.bboxes.push(n), this.bboxes.push(i);
}, Ar.prototype._insertReadonly = function() {
    throw "Cannot insert into a GridIndex created from an ArrayBuffer."
}, Ar.prototype._insertCell = function(t, e, r, n, i, a) {
    this.cells[i].push(a);
}, Ar.prototype.query = function(t, e, r, n) {
    var i = this.min,
        a = this.max;
    if (t <= i && e <= i && a <= r && a <= n) return Array.prototype.slice.call(this.keys);
    var o = [];
    return this._forEachCell(t, e, r, n, this._queryCell, o, {}), o
}, Ar.prototype._queryCell = function(t, e, r, n, i, a, o) {
    var s = this.cells[i];
    if (null !== s)
        for (var u = this.keys, l = this.bboxes, p = 0; p < s.length; p++) {
            var h = s[p];
            if (void 0 === o[h]) {
                var c = 4 * h;
                t <= l[c + 2] && e <= l[c + 3] && r >= l[c + 0] && n >= l[c + 1] ? (o[h] = !0, a.push(u[h])) : o[h] = !1;
            }
        }
}, Ar.prototype._forEachCell = function(t, e, r, n, i, a, o) {
    for (var s = this._convertToCellCoord(t), u = this._convertToCellCoord(e), l = this._convertToCellCoord(r), p = this._convertToCellCoord(n), h = s; h <= l; h++)
        for (var c = u; c <= p; c++) {
            var f = this.d * c + h;
            if (i.call(this, t, e, r, n, f, a, o)) return
        }
}, Ar.prototype._convertToCellCoord = function(t) {
    return Math.max(0, Math.min(this.d - 1, Math.floor(t * this.scale) + this.padding))
}, Ar.prototype.toArrayBuffer = function() {
    if (this.arrayBuffer) return this.arrayBuffer;
    for (var t = this.cells, e = _r + this.cells.length + 1 + 1, r = 0, n = 0; n < this.cells.length; n++) r += this.cells[n].length;
    var i = new Int32Array(e + r + this.keys.length + this.bboxes.length);
    i[0] = this.extent, i[1] = this.n, i[2] = this.padding;
    for (var a = e, o = 0; o < t.length; o++) {
        var s = t[o];
        i[_r + o] = a, i.set(s, a), a += s.length;
    }
    return i[_r + t.length] = a, i.set(this.keys, a), a += this.keys.length, i[_r + t.length + 1] = a, i.set(this.bboxes, a), a += this.bboxes.length, i.buffer
};
var kr = self.ImageData,
    Sr = {};

function zr(t, e, r) {
    void 0 === r && (r = {}), Object.defineProperty(e, "_classRegistryKey", {
        value: t,
        writeable: !1
    }), Sr[t] = {
        klass: e,
        omit: r.omit || [],
        shallow: r.shallow || []
    };
}
for (var Mr in zr("Object", Object), wr.serialize = function(t, e) {
        var r = t.toArrayBuffer();
        return e && e.push(r), r
    }, wr.deserialize = function(t) {
        return new wr(t)
    }, zr("Grid", wr), zr("Color", at), zr("Error", Error), zr("StylePropertyFunction", qe), zr("StyleExpression", Ee, {
        omit: ["_evaluator"]
    }), zr("ZoomDependentExpression", Oe), zr("ZoomConstantExpression", Le), zr("CompoundExpression", At, {
        omit: ["_evaluate"]
    }), Yt) Yt[Mr]._classRegistryKey || zr("Expression_" + Mr, Yt[Mr]);

function Br(t, e) {
    if (null == t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || t instanceof Boolean || t instanceof Number || t instanceof String || t instanceof Date || t instanceof RegExp) return t;
    if (t instanceof ArrayBuffer) return e && e.push(t), t;
    if (ArrayBuffer.isView(t)) {
        var r = t;
        return e && e.push(r.buffer), r
    }
    if (t instanceof kr) return e && e.push(t.data.buffer), t;
    if (Array.isArray(t)) {
        for (var n = [], i = 0, a = t; i < a.length; i += 1) {
            var o = a[i];
            n.push(Br(o, e));
        }
        return n
    }
    if ("object" == typeof t) {
        var s = t.constructor,
            u = s._classRegistryKey;
        if (!u) throw new Error("can't serialize object of unregistered class");
        var l = {};
        if (s.serialize) l._serialized = s.serialize(t, e);
        else {
            for (var p in t)
                if (t.hasOwnProperty(p) && !(Sr[u].omit.indexOf(p) >= 0)) {
                    var h = t[p];
                    l[p] = Sr[u].shallow.indexOf(p) >= 0 ? h : Br(h, e);
                }
            t instanceof Error && (l.message = t.message);
        }
        return {
            name: u,
            properties: l
        }
    }
    throw new Error("can't serialize object of type " + typeof t)
}

function Ir(t) {
    if (null == t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || t instanceof Boolean || t instanceof Number || t instanceof String || t instanceof Date || t instanceof RegExp || t instanceof ArrayBuffer || ArrayBuffer.isView(t) || t instanceof kr) return t;
    if (Array.isArray(t)) return t.map(function(t) {
        return Ir(t)
    });
    if ("object" == typeof t) {
        var e = t,
            r = e.name,
            n = e.properties;
        if (!r) throw new Error("can't deserialize object of anonymous class");
        var i = Sr[r].klass;
        if (!i) throw new Error("can't deserialize unregistered class " + r);
        if (i.deserialize) return i.deserialize(n._serialized);
        for (var a = Object.create(i.prototype), o = 0, s = Object.keys(n); o < s.length; o += 1) {
            var u = s[o];
            a[u] = Sr[r].shallow.indexOf(u) >= 0 ? n[u] : Ir(n[u]);
        }
        return a
    }
    throw new Error("can't deserialize object of type " + typeof t)
}
var Vr = function() {
    this.first = !0;
};
Vr.prototype.update = function(t, e) {
    var r = Math.floor(t);
    return this.first ? (this.first = !1, this.lastIntegerZoom = r, this.lastIntegerZoomTime = 0, this.lastZoom = t, this.lastFloorZoom = r, !0) : (this.lastFloorZoom > r ? (this.lastIntegerZoom = r + 1, this.lastIntegerZoomTime = e) : this.lastFloorZoom < r && (this.lastIntegerZoom = r, this.lastIntegerZoomTime = e), t !== this.lastZoom && (this.lastZoom = t, this.lastFloorZoom = r, !0))
};
var Cr = {
    "Latin-1 Supplement": function(t) {
        return t >= 128 && t <= 255
    },
    Arabic: function(t) {
        return t >= 1536 && t <= 1791
    },
    "Arabic Supplement": function(t) {
        return t >= 1872 && t <= 1919
    },
    "Arabic Extended-A": function(t) {
        return t >= 2208 && t <= 2303
    },
    "Hangul Jamo": function(t) {
        return t >= 4352 && t <= 4607
    },
    "Unified Canadian Aboriginal Syllabics": function(t) {
        return t >= 5120 && t <= 5759
    },
    Khmer: function(t) {
        return t >= 6016 && t <= 6143
    },
    "Unified Canadian Aboriginal Syllabics Extended": function(t) {
        return t >= 6320 && t <= 6399
    },
    "General Punctuation": function(t) {
        return t >= 8192 && t <= 8303
    },
    "Letterlike Symbols": function(t) {
        return t >= 8448 && t <= 8527
    },
    "Number Forms": function(t) {
        return t >= 8528 && t <= 8591
    },
    "Miscellaneous Technical": function(t) {
        return t >= 8960 && t <= 9215
    },
    "Control Pictures": function(t) {
        return t >= 9216 && t <= 9279
    },
    "Optical Character Recognition": function(t) {
        return t >= 9280 && t <= 9311
    },
    "Enclosed Alphanumerics": function(t) {
        return t >= 9312 && t <= 9471
    },
    "Geometric Shapes": function(t) {
        return t >= 9632 && t <= 9727
    },
    "Miscellaneous Symbols": function(t) {
        return t >= 9728 && t <= 9983
    },
    "Miscellaneous Symbols and Arrows": function(t) {
        return t >= 11008 && t <= 11263
    },
    "CJK Radicals Supplement": function(t) {
        return t >= 11904 && t <= 12031
    },
    "Kangxi Radicals": function(t) {
        return t >= 12032 && t <= 12255
    },
    "Ideographic Description Characters": function(t) {
        return t >= 12272 && t <= 12287
    },
    "CJK Symbols and Punctuation": function(t) {
        return t >= 12288 && t <= 12351
    },
    Hiragana: function(t) {
        return t >= 12352 && t <= 12447
    },
    Katakana: function(t) {
        return t >= 12448 && t <= 12543
    },
    Bopomofo: function(t) {
        return t >= 12544 && t <= 12591
    },
    "Hangul Compatibility Jamo": function(t) {
        return t >= 12592 && t <= 12687
    },
    Kanbun: function(t) {
        return t >= 12688 && t <= 12703
    },
    "Bopomofo Extended": function(t) {
        return t >= 12704 && t <= 12735
    },
    "CJK Strokes": function(t) {
        return t >= 12736 && t <= 12783
    },
    "Katakana Phonetic Extensions": function(t) {
        return t >= 12784 && t <= 12799
    },
    "Enclosed CJK Letters and Months": function(t) {
        return t >= 12800 && t <= 13055
    },
    "CJK Compatibility": function(t) {
        return t >= 13056 && t <= 13311
    },
    "CJK Unified Ideographs Extension A": function(t) {
        return t >= 13312 && t <= 19903
    },
    "Yijing Hexagram Symbols": function(t) {
        return t >= 19904 && t <= 19967
    },
    "CJK Unified Ideographs": function(t) {
        return t >= 19968 && t <= 40959
    },
    "Yi Syllables": function(t) {
        return t >= 40960 && t <= 42127
    },
    "Yi Radicals": function(t) {
        return t >= 42128 && t <= 42191
    },
    "Hangul Jamo Extended-A": function(t) {
        return t >= 43360 && t <= 43391
    },
    "Hangul Syllables": function(t) {
        return t >= 44032 && t <= 55215
    },
    "Hangul Jamo Extended-B": function(t) {
        return t >= 55216 && t <= 55295
    },
    "Private Use Area": function(t) {
        return t >= 57344 && t <= 63743
    },
    "CJK Compatibility Ideographs": function(t) {
        return t >= 63744 && t <= 64255
    },
    "Arabic Presentation Forms-A": function(t) {
        return t >= 64336 && t <= 65023
    },
    "Vertical Forms": function(t) {
        return t >= 65040 && t <= 65055
    },
    "CJK Compatibility Forms": function(t) {
        return t >= 65072 && t <= 65103
    },
    "Small Form Variants": function(t) {
        return t >= 65104 && t <= 65135
    },
    "Arabic Presentation Forms-B": function(t) {
        return t >= 65136 && t <= 65279
    },
    "Halfwidth and Fullwidth Forms": function(t) {
        return t >= 65280 && t <= 65519
    }
};

function Tr(t) {
    for (var e = 0, r = t; e < r.length; e += 1) {
        if (Pr(r[e].charCodeAt(0))) return !0
    }
    return !1
}

function Er(t) {
    return !Cr.Arabic(t) && (!Cr["Arabic Supplement"](t) && (!Cr["Arabic Extended-A"](t) && (!Cr["Arabic Presentation Forms-A"](t) && !Cr["Arabic Presentation Forms-B"](t))))
}

function Pr(t) {
    return 746 === t || 747 === t || !(t < 4352) && (!!Cr["Bopomofo Extended"](t) || (!!Cr.Bopomofo(t) || (!(!Cr["CJK Compatibility Forms"](t) || t >= 65097 && t <= 65103) || (!!Cr["CJK Compatibility Ideographs"](t) || (!!Cr["CJK Compatibility"](t) || (!!Cr["CJK Radicals Supplement"](t) || (!!Cr["CJK Strokes"](t) || (!(!Cr["CJK Symbols and Punctuation"](t) || t >= 12296 && t <= 12305 || t >= 12308 && t <= 12319 || 12336 === t) || (!!Cr["CJK Unified Ideographs Extension A"](t) || (!!Cr["CJK Unified Ideographs"](t) || (!!Cr["Enclosed CJK Letters and Months"](t) || (!!Cr["Hangul Compatibility Jamo"](t) || (!!Cr["Hangul Jamo Extended-A"](t) || (!!Cr["Hangul Jamo Extended-B"](t) || (!!Cr["Hangul Jamo"](t) || (!!Cr["Hangul Syllables"](t) || (!!Cr.Hiragana(t) || (!!Cr["Ideographic Description Characters"](t) || (!!Cr.Kanbun(t) || (!!Cr["Kangxi Radicals"](t) || (!!Cr["Katakana Phonetic Extensions"](t) || (!(!Cr.Katakana(t) || 12540 === t) || (!(!Cr["Halfwidth and Fullwidth Forms"](t) || 65288 === t || 65289 === t || 65293 === t || t >= 65306 && t <= 65310 || 65339 === t || 65341 === t || 65343 === t || t >= 65371 && t <= 65503 || 65507 === t || t >= 65512 && t <= 65519) || (!(!Cr["Small Form Variants"](t) || t >= 65112 && t <= 65118 || t >= 65123 && t <= 65126) || (!!Cr["Unified Canadian Aboriginal Syllabics"](t) || (!!Cr["Unified Canadian Aboriginal Syllabics Extended"](t) || (!!Cr["Vertical Forms"](t) || (!!Cr["Yijing Hexagram Symbols"](t) || (!!Cr["Yi Syllables"](t) || !!Cr["Yi Radicals"](t))))))))))))))))))))))))))))))
}

function Fr(t) {
    return !(Pr(t) || function(t) {
        return !!(Cr["Latin-1 Supplement"](t) && (167 === t || 169 === t || 174 === t || 177 === t || 188 === t || 189 === t || 190 === t || 215 === t || 247 === t) || Cr["General Punctuation"](t) && (8214 === t || 8224 === t || 8225 === t || 8240 === t || 8241 === t || 8251 === t || 8252 === t || 8258 === t || 8263 === t || 8264 === t || 8265 === t || 8273 === t) || Cr["Letterlike Symbols"](t) || Cr["Number Forms"](t) || Cr["Miscellaneous Technical"](t) && (t >= 8960 && t <= 8967 || t >= 8972 && t <= 8991 || t >= 8996 && t <= 9e3 || 9003 === t || t >= 9085 && t <= 9114 || t >= 9150 && t <= 9165 || 9167 === t || t >= 9169 && t <= 9179 || t >= 9186 && t <= 9215) || Cr["Control Pictures"](t) && 9251 !== t || Cr["Optical Character Recognition"](t) || Cr["Enclosed Alphanumerics"](t) || Cr["Geometric Shapes"](t) || Cr["Miscellaneous Symbols"](t) && !(t >= 9754 && t <= 9759) || Cr["Miscellaneous Symbols and Arrows"](t) && (t >= 11026 && t <= 11055 || t >= 11088 && t <= 11097 || t >= 11192 && t <= 11243) || Cr["CJK Symbols and Punctuation"](t) || Cr.Katakana(t) || Cr["Private Use Area"](t) || Cr["CJK Compatibility Forms"](t) || Cr["Small Form Variants"](t) || Cr["Halfwidth and Fullwidth Forms"](t) || 8734 === t || 8756 === t || 8757 === t || t >= 9984 && t <= 10087 || t >= 10102 && t <= 10131 || 65532 === t || 65533 === t)
    }(t))
}

function Lr(t, e) {
    return !(!e && (t >= 1424 && t <= 2303 || Cr["Arabic Presentation Forms-A"](t) || Cr["Arabic Presentation Forms-B"](t))) && !(t >= 2304 && t <= 3583 || t >= 3840 && t <= 4255 || Cr.Khmer(t))
}
var Or, Dr = !1,
    qr = null,
    jr = !1,
    Ur = new L,
    Rr = {
        applyArabicShaping: null,
        processBidirectionalText: null,
        processStyledBidirectionalText: null,
        isLoaded: function() {
            return jr || null != Rr.applyArabicShaping
        }
    },
    Nr = function(t, e) {
        this.zoom = t, e ? (this.now = e.now, this.fadeDuration = e.fadeDuration, this.zoomHistory = e.zoomHistory, this.transition = e.transition) : (this.now = 0, this.fadeDuration = 0, this.zoomHistory = new Vr, this.transition = {});
    };
Nr.prototype.isSupportedScript = function(t) {
    return function(t, e) {
        for (var r = 0, n = t; r < n.length; r += 1)
            if (!Lr(n[r].charCodeAt(0), e)) return !1;
        return !0
    }(t, Rr.isLoaded())
}, Nr.prototype.crossFadingFactor = function() {
    return 0 === this.fadeDuration ? 1 : Math.min((this.now - this.zoomHistory.lastIntegerZoomTime) / this.fadeDuration, 1)
};
var Zr = function(t, e) {
    this.property = t, this.value = e, this.expression = je(void 0 === e ? t.specification.default : e, t.specification);
};
Zr.prototype.isDataDriven = function() {
    return "source" === this.expression.kind || "composite" === this.expression.kind
}, Zr.prototype.possiblyEvaluate = function(t) {
    return this.property.possiblyEvaluate(this, t)
};
var Hr = function(t) {
    this.property = t, this.value = new Zr(t, void 0);
};
Hr.prototype.transitioned = function(t, e) {
    return new Jr(this.property, this.value, e, h({}, t.transition, this.transition), t.now)
}, Hr.prototype.untransitioned = function() {
    return new Jr(this.property, this.value, null, {}, 0)
};
var Xr = function(t) {
    this._properties = t, this._values = Object.create(t.defaultTransitionablePropertyValues);
};
Xr.prototype.getValue = function(t) {
    return g(this._values[t].value.value)
}, Xr.prototype.setValue = function(t, e) {
    this._values.hasOwnProperty(t) || (this._values[t] = new Hr(this._values[t].property)), this._values[t].value = new Zr(this._values[t].property, null === e ? void 0 : g(e));
}, Xr.prototype.getTransition = function(t) {
    return g(this._values[t].transition)
}, Xr.prototype.setTransition = function(t, e) {
    this._values.hasOwnProperty(t) || (this._values[t] = new Hr(this._values[t].property)), this._values[t].transition = g(e) || void 0;
}, Xr.prototype.serialize = function() {
    for (var t = {}, e = 0, r = Object.keys(this._values); e < r.length; e += 1) {
        var n = r[e],
            i = this.getValue(n);
        void 0 !== i && (t[n] = i);
        var a = this.getTransition(n);
        void 0 !== a && (t[n + "-transition"] = a);
    }
    return t
}, Xr.prototype.transitioned = function(t, e) {
    for (var r = new Gr(this._properties), n = 0, i = Object.keys(this._values); n < i.length; n += 1) {
        var a = i[n];
        r._values[a] = this._values[a].transitioned(t, e._values[a]);
    }
    return r
}, Xr.prototype.untransitioned = function() {
    for (var t = new Gr(this._properties), e = 0, r = Object.keys(this._values); e < r.length; e += 1) {
        var n = r[e];
        t._values[n] = this._values[n].untransitioned();
    }
    return t
};
var Jr = function(t, e, r, n, i) {
    this.property = t, this.value = e, this.begin = i + n.delay || 0, this.end = this.begin + n.duration || 0, t.specification.transition && (n.delay || n.duration) && (this.prior = r);
};
Jr.prototype.possiblyEvaluate = function(t) {
    var e = t.now || 0,
        r = this.value.possiblyEvaluate(t),
        n = this.prior;
    if (n) {
        if (e > this.end) return this.prior = null, r;
        if (this.value.isDataDriven()) return this.prior = null, r;
        if (e < this.begin) return n.possiblyEvaluate(t);
        var i = (e - this.begin) / (this.end - this.begin);
        return this.property.interpolate(n.possiblyEvaluate(t), r, function(t) {
            if (t <= 0) return 0;
            if (t >= 1) return 1;
            var e = t * t,
                r = e * t;
            return 4 * (t < .5 ? r : 3 * (t - e) + r - .75)
        }(i))
    }
    return r
};
var Gr = function(t) {
    this._properties = t, this._values = Object.create(t.defaultTransitioningPropertyValues);
};
Gr.prototype.possiblyEvaluate = function(t) {
    for (var e = new $r(this._properties), r = 0, n = Object.keys(this._values); r < n.length; r += 1) {
        var i = n[r];
        e._values[i] = this._values[i].possiblyEvaluate(t);
    }
    return e
}, Gr.prototype.hasTransition = function() {
    for (var t = 0, e = Object.keys(this._values); t < e.length; t += 1) {
        var r = e[t];
        if (this._values[r].prior) return !0
    }
    return !1
};
var Kr = function(t) {
    this._properties = t, this._values = Object.create(t.defaultPropertyValues);
};
Kr.prototype.getValue = function(t) {
    return g(this._values[t].value)
}, Kr.prototype.setValue = function(t, e) {
    this._values[t] = new Zr(this._values[t].property, null === e ? void 0 : g(e));
}, Kr.prototype.serialize = function() {
    for (var t = {}, e = 0, r = Object.keys(this._values); e < r.length; e += 1) {
        var n = r[e],
            i = this.getValue(n);
        void 0 !== i && (t[n] = i);
    }
    return t
}, Kr.prototype.possiblyEvaluate = function(t) {
    for (var e = new $r(this._properties), r = 0, n = Object.keys(this._values); r < n.length; r += 1) {
        var i = n[r];
        e._values[i] = this._values[i].possiblyEvaluate(t);
    }
    return e
};
var Yr = function(t, e, r) {
    this.property = t, this.value = e, this.globals = r;
};
Yr.prototype.isConstant = function() {
    return "constant" === this.value.kind
}, Yr.prototype.constantOr = function(t) {
    return "constant" === this.value.kind ? this.value.value : t
}, Yr.prototype.evaluate = function(t, e) {
    return this.property.evaluate(this.value, this.globals, t, e)
};
var $r = function(t) {
    this._properties = t, this._values = Object.create(t.defaultPossiblyEvaluatedValues);
};
$r.prototype.get = function(t) {
    return this._values[t]
};
var Wr = function(t) {
    this.specification = t;
};
Wr.prototype.possiblyEvaluate = function(t, e) {
    return t.expression.evaluate(e)
}, Wr.prototype.interpolate = function(t, e, r) {
    var n = Tt[this.specification.type];
    return n ? n(t, e, r) : t
};
var Qr = function(t) {
    this.specification = t;
};
Qr.prototype.possiblyEvaluate = function(t, e) {
    return "constant" === t.expression.kind || "camera" === t.expression.kind ? new Yr(this, {
        kind: "constant",
        value: t.expression.evaluate(e)
    }, e) : new Yr(this, t.expression, e)
}, Qr.prototype.interpolate = function(t, e, r) {
    if ("constant" !== t.value.kind || "constant" !== e.value.kind) return t;
    if (void 0 === t.value.value || void 0 === e.value.value) return new Yr(this, {
        kind: "constant",
        value: void 0
    }, t.globals);
    var n = Tt[this.specification.type];
    return n ? new Yr(this, {
        kind: "constant",
        value: n(t.value.value, e.value.value, r)
    }, t.globals) : t
}, Qr.prototype.evaluate = function(t, e, r, n) {
    return "constant" === t.kind ? t.value : t.evaluate(e, r, n)
};
var tn = function(t) {
    this.specification = t;
};
tn.prototype.possiblyEvaluate = function(t, e) {
    if (void 0 !== t.value) {
        if ("constant" === t.expression.kind) {
            var r = t.expression.evaluate(e);
            return this._calculate(r, r, r, e)
        }
        return this._calculate(t.expression.evaluate(new Nr(Math.floor(e.zoom - 1), e)), t.expression.evaluate(new Nr(Math.floor(e.zoom), e)), t.expression.evaluate(new Nr(Math.floor(e.zoom + 1), e)), e)
    }
}, tn.prototype._calculate = function(t, e, r, n) {
    var i = n.zoom,
        a = i - Math.floor(i),
        o = n.crossFadingFactor();
    return i > n.zoomHistory.lastIntegerZoom ? {
        from: t,
        to: e,
        fromScale: 2,
        toScale: 1,
        t: a + (1 - a) * o
    } : {
        from: r,
        to: e,
        fromScale: .5,
        toScale: 1,
        t: 1 - (1 - o) * a
    }
}, tn.prototype.interpolate = function(t) {
    return t
};
var en = function(t) {
    this.specification = t;
};
en.prototype.possiblyEvaluate = function(t, e) {
    return !!t.expression.evaluate(e)
}, en.prototype.interpolate = function() {
    return !1
};
var rn = function(t) {
    for (var e in this.properties = t, this.defaultPropertyValues = {}, this.defaultTransitionablePropertyValues = {}, this.defaultTransitioningPropertyValues = {}, this.defaultPossiblyEvaluatedValues = {}, t) {
        var r = t[e],
            n = this.defaultPropertyValues[e] = new Zr(r, void 0),
            i = this.defaultTransitionablePropertyValues[e] = new Hr(r);
        this.defaultTransitioningPropertyValues[e] = i.untransitioned(), this.defaultPossiblyEvaluatedValues[e] = n.possiblyEvaluate({});
    }
};
zr("DataDrivenProperty", Qr), zr("DataConstantProperty", Wr), zr("CrossFadedProperty", tn), zr("ColorRampProperty", en);
var nn = function(t) {
        function e(e, r) {
            for (var n in t.call(this), this.id = e.id, this.metadata = e.metadata, this.type = e.type, this.minzoom = e.minzoom, this.maxzoom = e.maxzoom, this.visibility = "visible", "background" !== e.type && (this.source = e.source, this.sourceLayer = e["source-layer"], this.filter = e.filter), this._featureFilter = function() {
                    return !0
                }, r.layout && (this._unevaluatedLayout = new Kr(r.layout)), this._transitionablePaint = new Xr(r.paint), e.paint) this.setPaintProperty(n, e.paint[n], {
                validate: !1
            });
            for (var i in e.layout) this.setLayoutProperty(i, e.layout[i], {
                validate: !1
            });
            this._transitioningPaint = this._transitionablePaint.untransitioned();
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getLayoutProperty = function(t) {
            return "visibility" === t ? this.visibility : this._unevaluatedLayout.getValue(t)
        }, e.prototype.setLayoutProperty = function(t, e, r) {
            if (null != e) {
                var n = "layers." + this.id + ".layout." + t;
                if (this._validate(xr, n, t, e, r)) return
            }
            "visibility" !== t ? this._unevaluatedLayout.setValue(t, e) : this.visibility = "none" === e ? e : "visible";
        }, e.prototype.getPaintProperty = function(t) {
            return d(t, "-transition") ? this._transitionablePaint.getTransition(t.slice(0, -"-transition".length)) : this._transitionablePaint.getValue(t)
        }, e.prototype.setPaintProperty = function(t, e, r) {
            if (null != e) {
                var n = "layers." + this.id + ".paint." + t;
                if (this._validate(gr, n, t, e, r)) return !1
            }
            if (d(t, "-transition")) return this._transitionablePaint.setTransition(t.slice(0, -"-transition".length), e || void 0), !1;
            var i = this._transitionablePaint._values[t].value.isDataDriven();
            this._transitionablePaint.setValue(t, e);
            var a = this._transitionablePaint._values[t].value.isDataDriven();
            return this._handleSpecialPaintPropertyUpdate(t), a || i
        }, e.prototype._handleSpecialPaintPropertyUpdate = function(t) {}, e.prototype.isHidden = function(t) {
            return !!(this.minzoom && t < this.minzoom) || (!!(this.maxzoom && t >= this.maxzoom) || "none" === this.visibility)
        }, e.prototype.updateTransitions = function(t) {
            this._transitioningPaint = this._transitionablePaint.transitioned(t, this._transitioningPaint);
        }, e.prototype.hasTransition = function() {
            return this._transitioningPaint.hasTransition()
        }, e.prototype.recalculate = function(t) {
            this._unevaluatedLayout && (this.layout = this._unevaluatedLayout.possiblyEvaluate(t)), this.paint = this._transitioningPaint.possiblyEvaluate(t);
        }, e.prototype.serialize = function() {
            var t = {
                id: this.id,
                type: this.type,
                source: this.source,
                "source-layer": this.sourceLayer,
                metadata: this.metadata,
                minzoom: this.minzoom,
                maxzoom: this.maxzoom,
                filter: this.filter,
                layout: this._unevaluatedLayout && this._unevaluatedLayout.serialize(),
                paint: this._transitionablePaint && this._transitionablePaint.serialize()
            };
            return "none" === this.visibility && (t.layout = t.layout || {}, t.layout.visibility = "none"), v(t, function(t, e) {
                return !(void 0 === t || "layout" === e && !Object.keys(t).length || "paint" === e && !Object.keys(t).length)
            })
        }, e.prototype._validate = function(t, e, r, n, i) {
            return (!i || !1 !== i.validate) && br(this, t.call(mr, {
                key: e,
                layerType: this.type,
                objectKey: r,
                value: n,
                styleSpec: O,
                style: {
                    glyphs: !0,
                    sprite: !0
                }
            }))
        }, e.prototype.hasOffscreenPass = function() {
            return !1
        }, e.prototype.resize = function() {}, e.prototype.isStateDependent = function() {
            for (var t in this.paint._values) {
                var e = this.paint.get(t);
                if (e instanceof Yr && ne(e.property.specification) && (("source" === e.value.kind || "composite" === e.value.kind) && e.value.isStateDependent)) return !0
            }
            return !1
        }, e
    }(L),
    an = {
        Int8: Int8Array,
        Uint8: Uint8Array,
        Int16: Int16Array,
        Uint16: Uint16Array,
        Int32: Int32Array,
        Uint32: Uint32Array,
        Float32: Float32Array
    },
    on = function(t, e) {
        this._structArray = t, this._pos1 = e * this.size, this._pos2 = this._pos1 / 2, this._pos4 = this._pos1 / 4, this._pos8 = this._pos1 / 8;
    },
    sn = function() {
        this.isTransferred = !1, this.capacity = -1, this.resize(0);
    };

function un(t, e) {
    void 0 === e && (e = 1);
    var r = 0,
        n = 0;
    return {
        members: t.map(function(t) {
            var i, a = (i = t.type, an[i].BYTES_PER_ELEMENT),
                o = r = ln(r, Math.max(e, a)),
                s = t.components || 1;
            return n = Math.max(n, a), r += a * s, {
                name: t.name,
                type: t.type,
                components: s,
                offset: o
            }
        }),
        size: ln(r, Math.max(n, e)),
        alignment: e
    }
}

function ln(t, e) {
    return Math.ceil(t / e) * e
}
sn.serialize = function(t, e) {
    return t._trim(), e && (t.isTransferred = !0, e.push(t.arrayBuffer)), {
        length: t.length,
        arrayBuffer: t.arrayBuffer
    }
}, sn.deserialize = function(t) {
    var e = Object.create(this.prototype);
    return e.arrayBuffer = t.arrayBuffer, e.length = t.length, e.capacity = t.arrayBuffer.byteLength / e.bytesPerElement, e._refreshViews(), e
}, sn.prototype._trim = function() {
    this.length !== this.capacity && (this.capacity = this.length, this.arrayBuffer = this.arrayBuffer.slice(0, this.length * this.bytesPerElement), this._refreshViews());
}, sn.prototype.clear = function() {
    this.length = 0;
}, sn.prototype.resize = function(t) {
    this.reserve(t), this.length = t;
}, sn.prototype.reserve = function(t) {
    if (t > this.capacity) {
        this.capacity = Math.max(t, Math.floor(5 * this.capacity), 128), this.arrayBuffer = new ArrayBuffer(this.capacity * this.bytesPerElement);
        var e = this.uint8;
        this._refreshViews(), e && this.uint8.set(e);
    }
}, sn.prototype._refreshViews = function() {
    throw new Error("_refreshViews() must be implemented by each concrete StructArray layout")
};
var pn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e) {
        var r = this.length;
        this.resize(r + 1);
        var n = 2 * r;
        return this.int16[n + 0] = t, this.int16[n + 1] = e, r
    }, e.prototype.emplace = function(t, e, r) {
        var n = 2 * t;
        return this.int16[n + 0] = e, this.int16[n + 1] = r, t
    }, e
}(sn);
pn.prototype.bytesPerElement = 4, zr("StructArrayLayout2i4", pn);
var hn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n) {
        var i = this.length;
        this.resize(i + 1);
        var a = 4 * i;
        return this.int16[a + 0] = t, this.int16[a + 1] = e, this.int16[a + 2] = r, this.int16[a + 3] = n, i
    }, e.prototype.emplace = function(t, e, r, n, i) {
        var a = 4 * t;
        return this.int16[a + 0] = e, this.int16[a + 1] = r, this.int16[a + 2] = n, this.int16[a + 3] = i, t
    }, e
}(sn);
hn.prototype.bytesPerElement = 8, zr("StructArrayLayout4i8", hn);
var cn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n, i, a) {
        var o = this.length;
        this.resize(o + 1);
        var s = 6 * o;
        return this.int16[s + 0] = t, this.int16[s + 1] = e, this.int16[s + 2] = r, this.int16[s + 3] = n, this.int16[s + 4] = i, this.int16[s + 5] = a, o
    }, e.prototype.emplace = function(t, e, r, n, i, a, o) {
        var s = 6 * t;
        return this.int16[s + 0] = e, this.int16[s + 1] = r, this.int16[s + 2] = n, this.int16[s + 3] = i, this.int16[s + 4] = a, this.int16[s + 5] = o, t
    }, e
}(sn);
cn.prototype.bytesPerElement = 12, zr("StructArrayLayout2i4i12", cn);
var fn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n, i, a, o, s) {
        var u = this.length;
        this.resize(u + 1);
        var l = 6 * u,
            p = 12 * u;
        return this.int16[l + 0] = t, this.int16[l + 1] = e, this.int16[l + 2] = r, this.int16[l + 3] = n, this.uint8[p + 8] = i, this.uint8[p + 9] = a, this.uint8[p + 10] = o, this.uint8[p + 11] = s, u
    }, e.prototype.emplace = function(t, e, r, n, i, a, o, s, u) {
        var l = 6 * t,
            p = 12 * t;
        return this.int16[l + 0] = e, this.int16[l + 1] = r, this.int16[l + 2] = n, this.int16[l + 3] = i, this.uint8[p + 8] = a, this.uint8[p + 9] = o, this.uint8[p + 10] = s, this.uint8[p + 11] = u, t
    }, e
}(sn);
fn.prototype.bytesPerElement = 12, zr("StructArrayLayout4i4ub12", fn);
var yn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n, i, a, o, s) {
        var u = this.length;
        this.resize(u + 1);
        var l = 8 * u;
        return this.int16[l + 0] = t, this.int16[l + 1] = e, this.int16[l + 2] = r, this.int16[l + 3] = n, this.uint16[l + 4] = i, this.uint16[l + 5] = a, this.uint16[l + 6] = o, this.uint16[l + 7] = s, u
    }, e.prototype.emplace = function(t, e, r, n, i, a, o, s, u) {
        var l = 8 * t;
        return this.int16[l + 0] = e, this.int16[l + 1] = r, this.int16[l + 2] = n, this.int16[l + 3] = i, this.uint16[l + 4] = a, this.uint16[l + 5] = o, this.uint16[l + 6] = s, this.uint16[l + 7] = u, t
    }, e
}(sn);
yn.prototype.bytesPerElement = 16, zr("StructArrayLayout4i4ui16", yn);
var dn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r) {
        var n = this.length;
        this.resize(n + 1);
        var i = 3 * n;
        return this.float32[i + 0] = t, this.float32[i + 1] = e, this.float32[i + 2] = r, n
    }, e.prototype.emplace = function(t, e, r, n) {
        var i = 3 * t;
        return this.float32[i + 0] = e, this.float32[i + 1] = r, this.float32[i + 2] = n, t
    }, e
}(sn);
dn.prototype.bytesPerElement = 12, zr("StructArrayLayout3f12", dn);
var mn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t) {
        var e = this.length;
        this.resize(e + 1);
        var r = 1 * e;
        return this.uint32[r + 0] = t, e
    }, e.prototype.emplace = function(t, e) {
        var r = 1 * t;
        return this.uint32[r + 0] = e, t
    }, e
}(sn);
mn.prototype.bytesPerElement = 4, zr("StructArrayLayout1ul4", mn);
var vn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n, i, a, o, s, u, l, p) {
        var h = this.length;
        this.resize(h + 1);
        var c = 12 * h,
            f = 6 * h;
        return this.int16[c + 0] = t, this.int16[c + 1] = e, this.int16[c + 2] = r, this.int16[c + 3] = n, this.int16[c + 4] = i, this.int16[c + 5] = a, this.uint32[f + 3] = o, this.uint16[c + 8] = s, this.uint16[c + 9] = u, this.int16[c + 10] = l, this.int16[c + 11] = p, h
    }, e.prototype.emplace = function(t, e, r, n, i, a, o, s, u, l, p, h) {
        var c = 12 * t,
            f = 6 * t;
        return this.int16[c + 0] = e, this.int16[c + 1] = r, this.int16[c + 2] = n, this.int16[c + 3] = i, this.int16[c + 4] = a, this.int16[c + 5] = o, this.uint32[f + 3] = s, this.uint16[c + 8] = u, this.uint16[c + 9] = l, this.int16[c + 10] = p, this.int16[c + 11] = h, t
    }, e
}(sn);
vn.prototype.bytesPerElement = 24, zr("StructArrayLayout6i1ul2ui2i24", vn);
var gn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n, i, a) {
        var o = this.length;
        this.resize(o + 1);
        var s = 6 * o;
        return this.int16[s + 0] = t, this.int16[s + 1] = e, this.int16[s + 2] = r, this.int16[s + 3] = n, this.int16[s + 4] = i, this.int16[s + 5] = a, o
    }, e.prototype.emplace = function(t, e, r, n, i, a, o) {
        var s = 6 * t;
        return this.int16[s + 0] = e, this.int16[s + 1] = r, this.int16[s + 2] = n, this.int16[s + 3] = i, this.int16[s + 4] = a, this.int16[s + 5] = o, t
    }, e
}(sn);
gn.prototype.bytesPerElement = 12, zr("StructArrayLayout2i2i2i12", gn);
var xn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e) {
        var r = this.length;
        this.resize(r + 1);
        var n = 4 * r;
        return this.uint8[n + 0] = t, this.uint8[n + 1] = e, r
    }, e.prototype.emplace = function(t, e, r) {
        var n = 4 * t;
        return this.uint8[n + 0] = e, this.uint8[n + 1] = r, t
    }, e
}(sn);
xn.prototype.bytesPerElement = 4, zr("StructArrayLayout2ub4", xn);
var bn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n, i, a, o, s, u, l, p, h, c, f) {
        var y = this.length;
        this.resize(y + 1);
        var d = 20 * y,
            m = 10 * y,
            v = 40 * y;
        return this.int16[d + 0] = t, this.int16[d + 1] = e, this.uint16[d + 2] = r, this.uint16[d + 3] = n, this.uint32[m + 2] = i, this.uint32[m + 3] = a, this.uint32[m + 4] = o, this.uint16[d + 10] = s, this.uint16[d + 11] = u, this.uint16[d + 12] = l, this.float32[m + 7] = p, this.float32[m + 8] = h, this.uint8[v + 36] = c, this.uint8[v + 37] = f, y
    }, e.prototype.emplace = function(t, e, r, n, i, a, o, s, u, l, p, h, c, f, y) {
        var d = 20 * t,
            m = 10 * t,
            v = 40 * t;
        return this.int16[d + 0] = e, this.int16[d + 1] = r, this.uint16[d + 2] = n, this.uint16[d + 3] = i, this.uint32[m + 2] = a, this.uint32[m + 3] = o, this.uint32[m + 4] = s, this.uint16[d + 10] = u, this.uint16[d + 11] = l, this.uint16[d + 12] = p, this.float32[m + 7] = h, this.float32[m + 8] = c, this.uint8[v + 36] = f, this.uint8[v + 37] = y, t
    }, e
}(sn);
bn.prototype.bytesPerElement = 40, zr("StructArrayLayout2i2ui3ul3ui2f2ub40", bn);
var wn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t) {
        var e = this.length;
        this.resize(e + 1);
        var r = 1 * e;
        return this.float32[r + 0] = t, e
    }, e.prototype.emplace = function(t, e) {
        var r = 1 * t;
        return this.float32[r + 0] = e, t
    }, e
}(sn);
wn.prototype.bytesPerElement = 4, zr("StructArrayLayout1f4", wn);
var _n = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r) {
        var n = this.length;
        this.resize(n + 1);
        var i = 3 * n;
        return this.int16[i + 0] = t, this.int16[i + 1] = e, this.int16[i + 2] = r, n
    }, e.prototype.emplace = function(t, e, r, n) {
        var i = 3 * t;
        return this.int16[i + 0] = e, this.int16[i + 1] = r, this.int16[i + 2] = n, t
    }, e
}(sn);
_n.prototype.bytesPerElement = 6, zr("StructArrayLayout3i6", _n);
var An = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r) {
        var n = this.length;
        this.resize(n + 1);
        var i = 2 * n,
            a = 4 * n;
        return this.uint32[i + 0] = t, this.uint16[a + 2] = e, this.uint16[a + 3] = r, n
    }, e.prototype.emplace = function(t, e, r, n) {
        var i = 2 * t,
            a = 4 * t;
        return this.uint32[i + 0] = e, this.uint16[a + 2] = r, this.uint16[a + 3] = n, t
    }, e
}(sn);
An.prototype.bytesPerElement = 8, zr("StructArrayLayout1ul2ui8", An);
var kn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r) {
        var n = this.length;
        this.resize(n + 1);
        var i = 3 * n;
        return this.uint16[i + 0] = t, this.uint16[i + 1] = e, this.uint16[i + 2] = r, n
    }, e.prototype.emplace = function(t, e, r, n) {
        var i = 3 * t;
        return this.uint16[i + 0] = e, this.uint16[i + 1] = r, this.uint16[i + 2] = n, t
    }, e
}(sn);
kn.prototype.bytesPerElement = 6, zr("StructArrayLayout3ui6", kn);
var Sn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e) {
        var r = this.length;
        this.resize(r + 1);
        var n = 2 * r;
        return this.uint16[n + 0] = t, this.uint16[n + 1] = e, r
    }, e.prototype.emplace = function(t, e, r) {
        var n = 2 * t;
        return this.uint16[n + 0] = e, this.uint16[n + 1] = r, t
    }, e
}(sn);
Sn.prototype.bytesPerElement = 4, zr("StructArrayLayout2ui4", Sn);
var zn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e) {
        var r = this.length;
        this.resize(r + 1);
        var n = 2 * r;
        return this.float32[n + 0] = t, this.float32[n + 1] = e, r
    }, e.prototype.emplace = function(t, e, r) {
        var n = 2 * t;
        return this.float32[n + 0] = e, this.float32[n + 1] = r, t
    }, e
}(sn);
zn.prototype.bytesPerElement = 8, zr("StructArrayLayout2f8", zn);
var Mn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function() {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
    }, e.prototype.emplaceBack = function(t, e, r, n) {
        var i = this.length;
        this.resize(i + 1);
        var a = 4 * i;
        return this.float32[a + 0] = t, this.float32[a + 1] = e, this.float32[a + 2] = r, this.float32[a + 3] = n, i
    }, e.prototype.emplace = function(t, e, r, n, i) {
        var a = 4 * t;
        return this.float32[a + 0] = e, this.float32[a + 1] = r, this.float32[a + 2] = n, this.float32[a + 3] = i, t
    }, e
}(sn);
Mn.prototype.bytesPerElement = 16, zr("StructArrayLayout4f16", Mn);
var Bn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
    var r = {
        anchorPointX: {
            configurable: !0
        },
        anchorPointY: {
            configurable: !0
        },
        x1: {
            configurable: !0
        },
        y1: {
            configurable: !0
        },
        x2: {
            configurable: !0
        },
        y2: {
            configurable: !0
        },
        featureIndex: {
            configurable: !0
        },
        sourceLayerIndex: {
            configurable: !0
        },
        bucketIndex: {
            configurable: !0
        },
        radius: {
            configurable: !0
        },
        signedDistanceFromAnchor: {
            configurable: !0
        },
        anchorPoint: {
            configurable: !0
        }
    };
    return r.anchorPointX.get = function() {
        return this._structArray.int16[this._pos2 + 0]
    }, r.anchorPointX.set = function(t) {
        this._structArray.int16[this._pos2 + 0] = t;
    }, r.anchorPointY.get = function() {
        return this._structArray.int16[this._pos2 + 1]
    }, r.anchorPointY.set = function(t) {
        this._structArray.int16[this._pos2 + 1] = t;
    }, r.x1.get = function() {
        return this._structArray.int16[this._pos2 + 2]
    }, r.x1.set = function(t) {
        this._structArray.int16[this._pos2 + 2] = t;
    }, r.y1.get = function() {
        return this._structArray.int16[this._pos2 + 3]
    }, r.y1.set = function(t) {
        this._structArray.int16[this._pos2 + 3] = t;
    }, r.x2.get = function() {
        return this._structArray.int16[this._pos2 + 4]
    }, r.x2.set = function(t) {
        this._structArray.int16[this._pos2 + 4] = t;
    }, r.y2.get = function() {
        return this._structArray.int16[this._pos2 + 5]
    }, r.y2.set = function(t) {
        this._structArray.int16[this._pos2 + 5] = t;
    }, r.featureIndex.get = function() {
        return this._structArray.uint32[this._pos4 + 3]
    }, r.featureIndex.set = function(t) {
        this._structArray.uint32[this._pos4 + 3] = t;
    }, r.sourceLayerIndex.get = function() {
        return this._structArray.uint16[this._pos2 + 8]
    }, r.sourceLayerIndex.set = function(t) {
        this._structArray.uint16[this._pos2 + 8] = t;
    }, r.bucketIndex.get = function() {
        return this._structArray.uint16[this._pos2 + 9]
    }, r.bucketIndex.set = function(t) {
        this._structArray.uint16[this._pos2 + 9] = t;
    }, r.radius.get = function() {
        return this._structArray.int16[this._pos2 + 10]
    }, r.radius.set = function(t) {
        this._structArray.int16[this._pos2 + 10] = t;
    }, r.signedDistanceFromAnchor.get = function() {
        return this._structArray.int16[this._pos2 + 11]
    }, r.signedDistanceFromAnchor.set = function(t) {
        this._structArray.int16[this._pos2 + 11] = t;
    }, r.anchorPoint.get = function() {
        return new a(this.anchorPointX, this.anchorPointY)
    }, Object.defineProperties(e.prototype, r), e
}(on);
Bn.prototype.size = 24;
var In = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function(t) {
        return new Bn(this, t)
    }, e
}(vn);
zr("CollisionBoxArray", In);
var Vn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
    var r = {
        anchorX: {
            configurable: !0
        },
        anchorY: {
            configurable: !0
        },
        glyphStartIndex: {
            configurable: !0
        },
        numGlyphs: {
            configurable: !0
        },
        vertexStartIndex: {
            configurable: !0
        },
        lineStartIndex: {
            configurable: !0
        },
        lineLength: {
            configurable: !0
        },
        segment: {
            configurable: !0
        },
        lowerSize: {
            configurable: !0
        },
        upperSize: {
            configurable: !0
        },
        lineOffsetX: {
            configurable: !0
        },
        lineOffsetY: {
            configurable: !0
        },
        writingMode: {
            configurable: !0
        },
        hidden: {
            configurable: !0
        }
    };
    return r.anchorX.get = function() {
        return this._structArray.int16[this._pos2 + 0]
    }, r.anchorX.set = function(t) {
        this._structArray.int16[this._pos2 + 0] = t;
    }, r.anchorY.get = function() {
        return this._structArray.int16[this._pos2 + 1]
    }, r.anchorY.set = function(t) {
        this._structArray.int16[this._pos2 + 1] = t;
    }, r.glyphStartIndex.get = function() {
        return this._structArray.uint16[this._pos2 + 2]
    }, r.glyphStartIndex.set = function(t) {
        this._structArray.uint16[this._pos2 + 2] = t;
    }, r.numGlyphs.get = function() {
        return this._structArray.uint16[this._pos2 + 3]
    }, r.numGlyphs.set = function(t) {
        this._structArray.uint16[this._pos2 + 3] = t;
    }, r.vertexStartIndex.get = function() {
        return this._structArray.uint32[this._pos4 + 2]
    }, r.vertexStartIndex.set = function(t) {
        this._structArray.uint32[this._pos4 + 2] = t;
    }, r.lineStartIndex.get = function() {
        return this._structArray.uint32[this._pos4 + 3]
    }, r.lineStartIndex.set = function(t) {
        this._structArray.uint32[this._pos4 + 3] = t;
    }, r.lineLength.get = function() {
        return this._structArray.uint32[this._pos4 + 4]
    }, r.lineLength.set = function(t) {
        this._structArray.uint32[this._pos4 + 4] = t;
    }, r.segment.get = function() {
        return this._structArray.uint16[this._pos2 + 10]
    }, r.segment.set = function(t) {
        this._structArray.uint16[this._pos2 + 10] = t;
    }, r.lowerSize.get = function() {
        return this._structArray.uint16[this._pos2 + 11]
    }, r.lowerSize.set = function(t) {
        this._structArray.uint16[this._pos2 + 11] = t;
    }, r.upperSize.get = function() {
        return this._structArray.uint16[this._pos2 + 12]
    }, r.upperSize.set = function(t) {
        this._structArray.uint16[this._pos2 + 12] = t;
    }, r.lineOffsetX.get = function() {
        return this._structArray.float32[this._pos4 + 7]
    }, r.lineOffsetX.set = function(t) {
        this._structArray.float32[this._pos4 + 7] = t;
    }, r.lineOffsetY.get = function() {
        return this._structArray.float32[this._pos4 + 8]
    }, r.lineOffsetY.set = function(t) {
        this._structArray.float32[this._pos4 + 8] = t;
    }, r.writingMode.get = function() {
        return this._structArray.uint8[this._pos1 + 36]
    }, r.writingMode.set = function(t) {
        this._structArray.uint8[this._pos1 + 36] = t;
    }, r.hidden.get = function() {
        return this._structArray.uint8[this._pos1 + 37]
    }, r.hidden.set = function(t) {
        this._structArray.uint8[this._pos1 + 37] = t;
    }, Object.defineProperties(e.prototype, r), e
}(on);
Vn.prototype.size = 40;
var Cn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function(t) {
        return new Vn(this, t)
    }, e
}(bn);
zr("PlacedSymbolArray", Cn);
var Tn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
    var r = {
        offsetX: {
            configurable: !0
        }
    };
    return r.offsetX.get = function() {
        return this._structArray.float32[this._pos4 + 0]
    }, r.offsetX.set = function(t) {
        this._structArray.float32[this._pos4 + 0] = t;
    }, Object.defineProperties(e.prototype, r), e
}(on);
Tn.prototype.size = 4;
var En = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getoffsetX = function(t) {
        return this.float32[1 * t + 0]
    }, e.prototype.get = function(t) {
        return new Tn(this, t)
    }, e
}(wn);
zr("GlyphOffsetArray", En);
var Pn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
    var r = {
        x: {
            configurable: !0
        },
        y: {
            configurable: !0
        },
        tileUnitDistanceFromAnchor: {
            configurable: !0
        }
    };
    return r.x.get = function() {
        return this._structArray.int16[this._pos2 + 0]
    }, r.x.set = function(t) {
        this._structArray.int16[this._pos2 + 0] = t;
    }, r.y.get = function() {
        return this._structArray.int16[this._pos2 + 1]
    }, r.y.set = function(t) {
        this._structArray.int16[this._pos2 + 1] = t;
    }, r.tileUnitDistanceFromAnchor.get = function() {
        return this._structArray.int16[this._pos2 + 2]
    }, r.tileUnitDistanceFromAnchor.set = function(t) {
        this._structArray.int16[this._pos2 + 2] = t;
    }, Object.defineProperties(e.prototype, r), e
}(on);
Pn.prototype.size = 6;
var Fn = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getx = function(t) {
        return this.int16[3 * t + 0]
    }, e.prototype.gety = function(t) {
        return this.int16[3 * t + 1]
    }, e.prototype.gettileUnitDistanceFromAnchor = function(t) {
        return this.int16[3 * t + 2]
    }, e.prototype.get = function(t) {
        return new Pn(this, t)
    }, e
}(_n);
zr("SymbolLineVertexArray", Fn);
var Ln = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
    var r = {
        featureIndex: {
            configurable: !0
        },
        sourceLayerIndex: {
            configurable: !0
        },
        bucketIndex: {
            configurable: !0
        }
    };
    return r.featureIndex.get = function() {
        return this._structArray.uint32[this._pos4 + 0]
    }, r.featureIndex.set = function(t) {
        this._structArray.uint32[this._pos4 + 0] = t;
    }, r.sourceLayerIndex.get = function() {
        return this._structArray.uint16[this._pos2 + 2]
    }, r.sourceLayerIndex.set = function(t) {
        this._structArray.uint16[this._pos2 + 2] = t;
    }, r.bucketIndex.get = function() {
        return this._structArray.uint16[this._pos2 + 3]
    }, r.bucketIndex.set = function(t) {
        this._structArray.uint16[this._pos2 + 3] = t;
    }, Object.defineProperties(e.prototype, r), e
}(on);
Ln.prototype.size = 8;
var On = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function(t) {
        return new Ln(this, t)
    }, e
}(An);
zr("FeatureIndexArray", On);
var Dn = un([{
        name: "a_pos",
        components: 2,
        type: "Int16"
    }], 4),
    qn = Dn.members,
    jn = (Dn.size, Dn.alignment, function(t) {
        void 0 === t && (t = []), this.segments = t;
    });
jn.prototype.prepareSegment = function(t, e, r) {
    var n = this.segments[this.segments.length - 1];
    return t > jn.MAX_VERTEX_ARRAY_LENGTH && b("Max vertices per segment is " + jn.MAX_VERTEX_ARRAY_LENGTH + ": bucket requested " + t), (!n || n.vertexLength + t > jn.MAX_VERTEX_ARRAY_LENGTH) && (n = {
        vertexOffset: e.length,
        primitiveOffset: r.length,
        vertexLength: 0,
        primitiveLength: 0
    }, this.segments.push(n)), n
}, jn.prototype.get = function() {
    return this.segments
}, jn.prototype.destroy = function() {
    for (var t = 0, e = this.segments; t < e.length; t += 1) {
        var r = e[t];
        for (var n in r.vaos) r.vaos[n].destroy();
    }
}, jn.MAX_VERTEX_ARRAY_LENGTH = Math.pow(2, 16) - 1, zr("SegmentVector", jn);
var Un = function(t, e) {
    return 256 * (t = p(Math.floor(t), 0, 255)) + (e = p(Math.floor(e), 0, 255))
};

function Rn(t) {
    return [Un(255 * t.r, 255 * t.g), Un(255 * t.b, 255 * t.a)]
}
var Nn = function(t, e, r) {
    this.value = t, this.name = e, this.type = r, this.statistics = {
        max: -1 / 0
    };
};
Nn.prototype.defines = function() {
    return ["#define HAS_UNIFORM_u_" + this.name]
}, Nn.prototype.populatePaintArray = function() {}, Nn.prototype.updatePaintArray = function() {}, Nn.prototype.upload = function() {}, Nn.prototype.destroy = function() {}, Nn.prototype.setUniforms = function(t, e, r, n) {
    var i = n.constantOr(this.value),
        a = t.gl;
    "color" === this.type ? a.uniform4f(e.uniforms["u_" + this.name], i.r, i.g, i.b, i.a) : a.uniform1f(e.uniforms["u_" + this.name], i);
};
var Zn = function(t, e, r) {
    this.expression = t, this.name = e, this.type = r, this.statistics = {
        max: -1 / 0
    };
    var n = "color" === r ? zn : wn;
    this.paintVertexAttributes = [{
        name: "a_" + e,
        type: "Float32",
        components: "color" === r ? 2 : 1,
        offset: 0
    }], this.paintVertexArray = new n;
};
Zn.prototype.defines = function() {
    return []
}, Zn.prototype.populatePaintArray = function(t, e) {
    var r = this.paintVertexArray,
        n = r.length;
    r.reserve(t);
    var i = this.expression.evaluate(new Nr(0), e, {});
    if ("color" === this.type)
        for (var a = Rn(i), o = n; o < t; o++) r.emplaceBack(a[0], a[1]);
    else {
        for (var s = n; s < t; s++) r.emplaceBack(i);
        this.statistics.max = Math.max(this.statistics.max, i);
    }
}, Zn.prototype.updatePaintArray = function(t, e, r, n) {
    var i = this.paintVertexArray,
        a = this.expression.evaluate({
            zoom: 0
        }, r, n);
    if ("color" === this.type)
        for (var o = Rn(a), s = t; s < e; s++) i.emplace(s, o[0], o[1]);
    else {
        for (var u = t; u < e; u++) i.emplace(u, a);
        this.statistics.max = Math.max(this.statistics.max, a);
    }
}, Zn.prototype.upload = function(t) {
    this.paintVertexArray && this.paintVertexArray.arrayBuffer && (this.paintVertexBuffer && this.paintVertexBuffer.buffer ? this.paintVertexBuffer.updateData(this.paintVertexArray) : this.paintVertexBuffer = t.createVertexBuffer(this.paintVertexArray, this.paintVertexAttributes, this.expression.isStateDependent));
}, Zn.prototype.destroy = function() {
    this.paintVertexBuffer && this.paintVertexBuffer.destroy();
}, Zn.prototype.setUniforms = function(t, e) {
    t.gl.uniform1f(e.uniforms["a_" + this.name + "_t"], 0);
};
var Hn = function(t, e, r, n, i) {
    this.expression = t, this.name = e, this.type = r, this.useIntegerZoom = n, this.zoom = i, this.statistics = {
        max: -1 / 0
    };
    var a = "color" === r ? Mn : zn;
    this.paintVertexAttributes = [{
        name: "a_" + e,
        type: "Float32",
        components: "color" === r ? 4 : 2,
        offset: 0
    }], this.paintVertexArray = new a;
};
Hn.prototype.defines = function() {
    return []
}, Hn.prototype.populatePaintArray = function(t, e) {
    var r = this.paintVertexArray,
        n = r.length;
    r.reserve(t);
    var i = this.expression.evaluate(new Nr(this.zoom), e, {}),
        a = this.expression.evaluate(new Nr(this.zoom + 1), e, {});
    if ("color" === this.type)
        for (var o = Rn(i), s = Rn(a), u = n; u < t; u++) r.emplaceBack(o[0], o[1], s[0], s[1]);
    else {
        for (var l = n; l < t; l++) r.emplaceBack(i, a);
        this.statistics.max = Math.max(this.statistics.max, i, a);
    }
}, Hn.prototype.updatePaintArray = function(t, e, r, n) {
    var i = this.paintVertexArray,
        a = this.expression.evaluate({
            zoom: this.zoom
        }, r, n),
        o = this.expression.evaluate({
            zoom: this.zoom + 1
        }, r, n);
    if ("color" === this.type)
        for (var s = Rn(a), u = Rn(o), l = t; l < e; l++) i.emplace(l, s[0], s[1], u[0], u[1]);
    else {
        for (var p = t; p < e; p++) i.emplace(p, a, o);
        this.statistics.max = Math.max(this.statistics.max, a, o);
    }
}, Hn.prototype.upload = function(t) {
    this.paintVertexArray && this.paintVertexArray.arrayBuffer && (this.paintVertexBuffer && this.paintVertexBuffer.buffer ? this.paintVertexBuffer.updateData(this.paintVertexArray) : this.paintVertexBuffer = t.createVertexBuffer(this.paintVertexArray, this.paintVertexAttributes, this.expression.isStateDependent));
}, Hn.prototype.destroy = function() {
    this.paintVertexBuffer && this.paintVertexBuffer.destroy();
}, Hn.prototype.interpolationFactor = function(t) {
    return this.useIntegerZoom ? this.expression.interpolationFactor(Math.floor(t), this.zoom, this.zoom + 1) : this.expression.interpolationFactor(t, this.zoom, this.zoom + 1)
}, Hn.prototype.setUniforms = function(t, e, r) {
    t.gl.uniform1f(e.uniforms["a_" + this.name + "_t"], this.interpolationFactor(r.zoom));
};
var Xn = function() {
    this.binders = {}, this.cacheKey = "", this._buffers = [], this._idMap = {}, this._bufferOffset = 0;
};
Xn.createDynamic = function(t, e, r) {
    var n = new Xn,
        i = [];
    for (var a in t.paint._values)
        if (r(a)) {
            var o = t.paint.get(a);
            if (o instanceof Yr && ne(o.property.specification)) {
                var s = Gn(a, t.type),
                    u = o.property.specification.type,
                    l = o.property.useIntegerZoom;
                "constant" === o.value.kind ? (n.binders[a] = new Nn(o.value, s, u), i.push("/u_" + s)) : "source" === o.value.kind ? (n.binders[a] = new Zn(o.value, s, u), i.push("/a_" + s)) : (n.binders[a] = new Hn(o.value, s, u, l, e), i.push("/z_" + s));
            }
        }
    return n.cacheKey = i.sort().join(""), n
}, Xn.prototype.populatePaintArrays = function(t, e, r) {
    for (var n in this.binders) this.binders[n].populatePaintArray(t, e);
    if (e.id) {
        var i = String(e.id);
        this._idMap[i] = this._idMap[i] || [], this._idMap[i].push({
            index: r,
            start: this._bufferOffset,
            end: t
        });
    }
    this._bufferOffset = t;
}, Xn.prototype.updatePaintArrays = function(t, e, r) {
    var n = !1;
    for (var i in t) {
        var a = this._idMap[i];
        if (a)
            for (var o = t[i], s = 0, u = a; s < u.length; s += 1) {
                var l = u[s],
                    p = e.feature(l.index);
                for (var h in this.binders) {
                    var c = this.binders[h];
                    if (!(c instanceof Nn) && !0 === c.expression.isStateDependent) {
                        var f = r.paint.get(h);
                        c.expression = f.value, c.updatePaintArray(l.start, l.end, p, o), n = !0;
                    }
                }
            }
    }
    return n
}, Xn.prototype.defines = function() {
    var t = [];
    for (var e in this.binders) t.push.apply(t, this.binders[e].defines());
    return t
}, Xn.prototype.setUniforms = function(t, e, r, n) {
    for (var i in this.binders) {
        this.binders[i].setUniforms(t, e, n, r.get(i));
    }
}, Xn.prototype.getPaintVertexBuffers = function() {
    return this._buffers
}, Xn.prototype.upload = function(t) {
    for (var e in this.binders) this.binders[e].upload(t);
    var r = [];
    for (var n in this.binders) {
        var i = this.binders[n];
        (i instanceof Zn || i instanceof Hn) && i.paintVertexBuffer && r.push(i.paintVertexBuffer);
    }
    this._buffers = r;
}, Xn.prototype.destroy = function() {
    for (var t in this.binders) this.binders[t].destroy();
};
var Jn = function(t, e, r, n) {
    void 0 === n && (n = function() {
        return !0
    }), this.programConfigurations = {};
    for (var i = 0, a = e; i < a.length; i += 1) {
        var o = a[i];
        this.programConfigurations[o.id] = Xn.createDynamic(o, r, n), this.programConfigurations[o.id].layoutAttributes = t;
    }
    this.needsUpload = !1;
};

function Gn(t, e) {
    return {
        "text-opacity": "opacity",
        "icon-opacity": "opacity",
        "text-color": "fill_color",
        "icon-color": "fill_color",
        "text-halo-color": "halo_color",
        "icon-halo-color": "halo_color",
        "text-halo-blur": "halo_blur",
        "icon-halo-blur": "halo_blur",
        "text-halo-width": "halo_width",
        "icon-halo-width": "halo_width",
        "line-gap-width": "gapwidth"
    } [t] || t.replace(e + "-", "").replace(/-/g, "_")
}
Jn.prototype.populatePaintArrays = function(t, e, r) {
    for (var n in this.programConfigurations) this.programConfigurations[n].populatePaintArrays(t, e, r);
    this.needsUpload = !0;
}, Jn.prototype.updatePaintArrays = function(t, e, r) {
    for (var n = 0, i = r; n < i.length; n += 1) {
        var a = i[n];
        this.needsUpload = this.programConfigurations[a.id].updatePaintArrays(t, e, a) || this.needsUpload;
    }
}, Jn.prototype.get = function(t) {
    return this.programConfigurations[t]
}, Jn.prototype.upload = function(t) {
    if (this.needsUpload) {
        for (var e in this.programConfigurations) this.programConfigurations[e].upload(t);
        this.needsUpload = !1;
    }
}, Jn.prototype.destroy = function() {
    for (var t in this.programConfigurations) this.programConfigurations[t].destroy();
}, zr("ConstantBinder", Nn), zr("SourceExpressionBinder", Zn), zr("CompositeExpressionBinder", Hn), zr("ProgramConfiguration", Xn, {
    omit: ["_buffers"]
}), zr("ProgramConfigurationSet", Jn);
var Kn = 8192;
var Yn, $n = (Yn = 16, {
    min: -1 * Math.pow(2, Yn - 1),
    max: Math.pow(2, Yn - 1) - 1
});

function Wn(t) {
    for (var e = Kn / t.extent, r = t.loadGeometry(), n = 0; n < r.length; n++)
        for (var i = r[n], a = 0; a < i.length; a++) {
            var o = i[a];
            o.x = Math.round(o.x * e), o.y = Math.round(o.y * e), (o.x < $n.min || o.x > $n.max || o.y < $n.min || o.y > $n.max) && b("Geometry exceeds allowed extent, reduce your vector tile buffer size");
        }
    return r
}

function Qn(t, e, r, n, i) {
    t.emplaceBack(2 * e + (n + 1) / 2, 2 * r + (i + 1) / 2);
}
var ti = function(t) {
    this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function(t) {
        return t.id
    }), this.index = t.index, this.layoutVertexArray = new pn, this.indexArray = new kn, this.segments = new jn, this.programConfigurations = new Jn(qn, t.layers, t.zoom);
};

function ei(t, e, r) {
    for (var n = 0; n < t.length; n++) {
        var i = t[n];
        if (pi(i, e)) return !0;
        if (si(e, i, r)) return !0
    }
    return !1
}

function ri(t, e) {
    if (1 === t.length && 1 === t[0].length) return li(e, t[0][0]);
    for (var r = 0; r < e.length; r++)
        for (var n = e[r], i = 0; i < n.length; i++)
            if (li(t, n[i])) return !0;
    for (var a = 0; a < t.length; a++) {
        for (var o = t[a], s = 0; s < o.length; s++)
            if (li(e, o[s])) return !0;
        for (var u = 0; u < e.length; u++)
            if (ai(o, e[u])) return !0
    }
    return !1
}

function ni(t, e, r) {
    for (var n = 0; n < e.length; n++)
        for (var i = e[n], a = 0; a < t.length; a++) {
            var o = t[a];
            if (o.length >= 3)
                for (var s = 0; s < i.length; s++)
                    if (pi(o, i[s])) return !0;
            if (ii(o, i, r)) return !0
        }
    return !1
}

function ii(t, e, r) {
    if (t.length > 1) {
        if (ai(t, e)) return !0;
        for (var n = 0; n < e.length; n++)
            if (si(e[n], t, r)) return !0
    }
    for (var i = 0; i < t.length; i++)
        if (si(t[i], e, r)) return !0;
    return !1
}

function ai(t, e) {
    if (0 === t.length || 0 === e.length) return !1;
    for (var r = 0; r < t.length - 1; r++)
        for (var n = t[r], i = t[r + 1], a = 0; a < e.length - 1; a++) {
            if (oi(n, i, e[a], e[a + 1])) return !0
        }
    return !1
}

function oi(t, e, r, n) {
    return w(t, r, n) !== w(e, r, n) && w(t, e, r) !== w(t, e, n)
}

function si(t, e, r) {
    var n = r * r;
    if (1 === e.length) return t.distSqr(e[0]) < n;
    for (var i = 1; i < e.length; i++) {
        if (ui(t, e[i - 1], e[i]) < n) return !0
    }
    return !1
}

function ui(t, e, r) {
    var n = e.distSqr(r);
    if (0 === n) return t.distSqr(e);
    var i = ((t.x - e.x) * (r.x - e.x) + (t.y - e.y) * (r.y - e.y)) / n;
    return i < 0 ? t.distSqr(e) : i > 1 ? t.distSqr(r) : t.distSqr(r.sub(e)._mult(i)._add(e))
}

function li(t, e) {
    for (var r, n, i, a = !1, o = 0; o < t.length; o++)
        for (var s = 0, u = (r = t[o]).length - 1; s < r.length; u = s++) n = r[s], i = r[u], n.y > e.y != i.y > e.y && e.x < (i.x - n.x) * (e.y - n.y) / (i.y - n.y) + n.x && (a = !a);
    return a
}

function pi(t, e) {
    for (var r = !1, n = 0, i = t.length - 1; n < t.length; i = n++) {
        var a = t[n],
            o = t[i];
        a.y > e.y != o.y > e.y && e.x < (o.x - a.x) * (e.y - a.y) / (o.y - a.y) + a.x && (r = !r);
    }
    return r
}

function hi(t, e, r) {
    var n = e.paint.get(t).value;
    return "constant" === n.kind ? n.value : r.programConfigurations.get(e.id).binders[t].statistics.max
}

function ci(t) {
    return Math.sqrt(t[0] * t[0] + t[1] * t[1])
}

function fi(t, e, r, n, i) {
    if (!e[0] && !e[1]) return t;
    var o = a.convert(e);
    "viewport" === r && o._rotate(-n);
    for (var s = [], u = 0; u < t.length; u++) {
        for (var l = t[u], p = [], h = 0; h < l.length; h++) p.push(l[h].sub(o._mult(i)));
        s.push(p);
    }
    return s
}
ti.prototype.populate = function(t, e) {
    for (var r = 0, n = t; r < n.length; r += 1) {
        var i = n[r],
            a = i.feature,
            o = i.index,
            s = i.sourceLayerIndex;
        if (this.layers[0]._featureFilter(new Nr(this.zoom), a)) {
            var u = Wn(a);
            this.addFeature(a, u, o), e.featureIndex.insert(a, u, o, s, this.index);
        }
    }
}, ti.prototype.update = function(t, e) {
    this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers);
}, ti.prototype.isEmpty = function() {
    return 0 === this.layoutVertexArray.length
}, ti.prototype.uploadPending = function() {
    return !this.uploaded || this.programConfigurations.needsUpload
}, ti.prototype.upload = function(t) {
    this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, qn), this.indexBuffer = t.createIndexBuffer(this.indexArray)), this.programConfigurations.upload(t), this.uploaded = !0;
}, ti.prototype.destroy = function() {
    this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy());
}, ti.prototype.addFeature = function(t, e, r) {
    for (var n = 0, i = e; n < i.length; n += 1)
        for (var a = 0, o = i[n]; a < o.length; a += 1) {
            var s = o[a],
                u = s.x,
                l = s.y;
            if (!(u < 0 || u >= Kn || l < 0 || l >= Kn)) {
                var p = this.segments.prepareSegment(4, this.layoutVertexArray, this.indexArray),
                    h = p.vertexLength;
                Qn(this.layoutVertexArray, u, l, -1, -1), Qn(this.layoutVertexArray, u, l, 1, -1), Qn(this.layoutVertexArray, u, l, 1, 1), Qn(this.layoutVertexArray, u, l, -1, 1), this.indexArray.emplaceBack(h, h + 1, h + 2), this.indexArray.emplaceBack(h, h + 3, h + 2), p.vertexLength += 4, p.primitiveLength += 2;
            }
        }
    this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, t, r);
}, zr("CircleBucket", ti, {
    omit: ["layers"]
});
var yi = {
        paint: new rn({
            "circle-radius": new Qr(O.paint_circle["circle-radius"]),
            "circle-color": new Qr(O.paint_circle["circle-color"]),
            "circle-blur": new Qr(O.paint_circle["circle-blur"]),
            "circle-opacity": new Qr(O.paint_circle["circle-opacity"]),
            "circle-translate": new Wr(O.paint_circle["circle-translate"]),
            "circle-translate-anchor": new Wr(O.paint_circle["circle-translate-anchor"]),
            "circle-pitch-scale": new Wr(O.paint_circle["circle-pitch-scale"]),
            "circle-pitch-alignment": new Wr(O.paint_circle["circle-pitch-alignment"]),
            "circle-stroke-width": new Qr(O.paint_circle["circle-stroke-width"]),
            "circle-stroke-color": new Qr(O.paint_circle["circle-stroke-color"]),
            "circle-stroke-opacity": new Qr(O.paint_circle["circle-stroke-opacity"])
        })
    },
    di = "undefined" != typeof Float32Array ? Float32Array : Array;
Math.PI;

function mi() {
    var t = new di(9);
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
}

function vi() {
    var t = new di(3);
    return t[0] = 0, t[1] = 0, t[2] = 0, t
}

function gi(t) {
    var e = t[0],
        r = t[1],
        n = t[2];
    return Math.sqrt(e * e + r * r + n * n)
}

function xi(t, e, r) {
    var n = new di(3);
    return n[0] = t, n[1] = e, n[2] = r, n
}

function bi(t, e) {
    var r = e[0],
        n = e[1],
        i = e[2],
        a = r * r + n * n + i * i;
    return a > 0 && (a = 1 / Math.sqrt(a), t[0] = e[0] * a, t[1] = e[1] * a, t[2] = e[2] * a), t
}

function wi(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
}

function _i(t, e, r) {
    var n = e[0],
        i = e[1],
        a = e[2],
        o = r[0],
        s = r[1],
        u = r[2];
    return t[0] = i * u - a * s, t[1] = a * o - n * u, t[2] = n * s - i * o, t
}
var Ai, ki = gi,
    Si = (Ai = vi(), function(t, e, r, n, i, a) {
        var o, s;
        for (e || (e = 3), r || (r = 0), s = n ? Math.min(n * e + r, t.length) : t.length, o = r; o < s; o += e) Ai[0] = t[o], Ai[1] = t[o + 1], Ai[2] = t[o + 2], i(Ai, Ai, a), t[o] = Ai[0], t[o + 1] = Ai[1], t[o + 2] = Ai[2];
        return t
    });

function zi() {
    var t = new di(4);
    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t
}

function Mi(t, e) {
    var r = e[0],
        n = e[1],
        i = e[2],
        a = e[3],
        o = r * r + n * n + i * i + a * a;
    return o > 0 && (o = 1 / Math.sqrt(o), t[0] = r * o, t[1] = n * o, t[2] = i * o, t[3] = a * o), t
}

function Bi(t, e, r) {
    var n = e[0],
        i = e[1],
        a = e[2],
        o = e[3];
    return t[0] = r[0] * n + r[4] * i + r[8] * a + r[12] * o, t[1] = r[1] * n + r[5] * i + r[9] * a + r[13] * o, t[2] = r[2] * n + r[6] * i + r[10] * a + r[14] * o, t[3] = r[3] * n + r[7] * i + r[11] * a + r[15] * o, t
}
var Ii = function() {
    var t = zi();
    return function(e, r, n, i, a, o) {
        var s, u;
        for (r || (r = 4), n || (n = 0), u = i ? Math.min(i * r + n, e.length) : e.length, s = n; s < u; s += r) t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], t[3] = e[s + 3], a(t, t, o), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2], e[s + 3] = t[3];
        return e
    }
}();

function Vi() {
    var t = new di(4);
    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t
}

function Ci(t, e, r, n) {
    var i, a, o, s, u, l = e[0],
        p = e[1],
        h = e[2],
        c = e[3],
        f = r[0],
        y = r[1],
        d = r[2],
        m = r[3];
    return (a = l * f + p * y + h * d + c * m) < 0 && (a = -a, f = -f, y = -y, d = -d, m = -m), 1 - a > 1e-6 ? (i = Math.acos(a), o = Math.sin(i), s = Math.sin((1 - n) * i) / o, u = Math.sin(n * i) / o) : (s = 1 - n, u = n), t[0] = s * l + u * f, t[1] = s * p + u * y, t[2] = s * h + u * d, t[3] = s * c + u * m, t
}
var Ti, Ei, Pi, Fi, Li, Oi, Di = Mi;
Ti = vi(), Ei = xi(1, 0, 0), Pi = xi(0, 1, 0), Fi = Vi(), Li = Vi(), Oi = mi();
! function() {
    var t, e = ((t = new di(2))[0] = 0, t[1] = 0, t);
}();
var qi = function(t) {
    function e(e) {
        t.call(this, e, yi);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createBucket = function(t) {
        return new ti(t)
    }, e.prototype.queryRadius = function(t) {
        var e = t;
        return hi("circle-radius", this, e) + hi("circle-stroke-width", this, e) + ci(this.paint.get("circle-translate"))
    }, e.prototype.queryIntersectsFeature = function(t, e, r, n, i, a, o, s) {
        for (var u = fi(t, this.paint.get("circle-translate"), this.paint.get("circle-translate-anchor"), a.angle, o), l = this.paint.get("circle-radius").evaluate(e, r) + this.paint.get("circle-stroke-width").evaluate(e, r), p = "map" === this.paint.get("circle-pitch-alignment"), h = p ? u : function(t, e, r) {
                return t.map(function(t) {
                    return t.map(function(t) {
                        return ji(t, e, r)
                    })
                })
            }(u, s, a), c = p ? l * o : l, f = 0, y = n; f < y.length; f += 1)
            for (var d = 0, m = y[f]; d < m.length; d += 1) {
                var v = m[d],
                    g = p ? v : ji(v, s, a),
                    x = c,
                    b = Bi([], [v.x, v.y, 0, 1], s);
                if ("viewport" === this.paint.get("circle-pitch-scale") && "map" === this.paint.get("circle-pitch-alignment") ? x *= b[3] / a.cameraToCenterDistance : "map" === this.paint.get("circle-pitch-scale") && "viewport" === this.paint.get("circle-pitch-alignment") && (x *= a.cameraToCenterDistance / b[3]), ei(h, g, x)) return !0
            }
        return !1
    }, e
}(nn);

function ji(t, e, r) {
    var n = Bi([], [t.x, t.y, 0, 1], e);
    return new a((n[0] / n[3] + 1) * r.width * .5, (n[1] / n[3] + 1) * r.height * .5)
}
var Ui = function(t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
}(ti);

function Ri(t, e, r, n) {
    var i = e.width,
        a = e.height;
    if (n) {
        if (n.length !== i * a * r) throw new RangeError("mismatched image size")
    } else n = new Uint8Array(i * a * r);
    return t.width = i, t.height = a, t.data = n, t
}

function Ni(t, e, r) {
    var n = e.width,
        i = e.height;
    if (n !== t.width || i !== t.height) {
        var a = Ri({}, {
            width: n,
            height: i
        }, r);
        Zi(t, a, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            width: Math.min(t.width, n),
            height: Math.min(t.height, i)
        }, r), t.width = n, t.height = i, t.data = a.data;
    }
}

function Zi(t, e, r, n, i, a) {
    if (0 === i.width || 0 === i.height) return e;
    if (i.width > t.width || i.height > t.height || r.x > t.width - i.width || r.y > t.height - i.height) throw new RangeError("out of range source coordinates for image copy");
    if (i.width > e.width || i.height > e.height || n.x > e.width - i.width || n.y > e.height - i.height) throw new RangeError("out of range destination coordinates for image copy");
    for (var o = t.data, s = e.data, u = 0; u < i.height; u++)
        for (var l = ((r.y + u) * t.width + r.x) * a, p = ((n.y + u) * e.width + n.x) * a, h = 0; h < i.width * a; h++) s[p + h] = o[l + h];
    return e
}
zr("HeatmapBucket", Ui, {
    omit: ["layers"]
});
var Hi = function(t, e) {
    Ri(this, t, 1, e);
};
Hi.prototype.resize = function(t) {
    Ni(this, t, 1);
}, Hi.prototype.clone = function() {
    return new Hi({
        width: this.width,
        height: this.height
    }, new Uint8Array(this.data))
}, Hi.copy = function(t, e, r, n, i) {
    Zi(t, e, r, n, i, 1);
};
var Xi = function(t, e) {
    Ri(this, t, 4, e);
};
Xi.prototype.resize = function(t) {
    Ni(this, t, 4);
}, Xi.prototype.clone = function() {
    return new Xi({
        width: this.width,
        height: this.height
    }, new Uint8Array(this.data))
}, Xi.copy = function(t, e, r, n, i) {
    Zi(t, e, r, n, i, 4);
}, zr("AlphaImage", Hi), zr("RGBAImage", Xi);
var Ji = {
    paint: new rn({
        "heatmap-radius": new Qr(O.paint_heatmap["heatmap-radius"]),
        "heatmap-weight": new Qr(O.paint_heatmap["heatmap-weight"]),
        "heatmap-intensity": new Wr(O.paint_heatmap["heatmap-intensity"]),
        "heatmap-color": new en(O.paint_heatmap["heatmap-color"]),
        "heatmap-opacity": new Wr(O.paint_heatmap["heatmap-opacity"])
    })
};

function Gi(t, e) {
    for (var r = new Uint8Array(1024), n = {}, i = 0, a = 0; i < 256; i++, a += 4) {
        n[e] = i / 255;
        var o = t.evaluate(n);
        r[a + 0] = Math.floor(255 * o.r / o.a), r[a + 1] = Math.floor(255 * o.g / o.a), r[a + 2] = Math.floor(255 * o.b / o.a), r[a + 3] = Math.floor(255 * o.a);
    }
    return new Xi({
        width: 256,
        height: 1
    }, r)
}
var Ki = function(t) {
        function e(e) {
            t.call(this, e, Ji), this._updateColorRamp();
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createBucket = function(t) {
            return new Ui(t)
        }, e.prototype._handleSpecialPaintPropertyUpdate = function(t) {
            "heatmap-color" === t && this._updateColorRamp();
        }, e.prototype._updateColorRamp = function() {
            var t = this._transitionablePaint._values["heatmap-color"].value.expression;
            this.colorRamp = Gi(t, "heatmapDensity"), this.colorRampTexture = null;
        }, e.prototype.resize = function() {
            this.heatmapFbo && (this.heatmapFbo.destroy(), this.heatmapFbo = null);
        }, e.prototype.queryRadius = function() {
            return 0
        }, e.prototype.queryIntersectsFeature = function() {
            return !1
        }, e.prototype.hasOffscreenPass = function() {
            return 0 !== this.paint.get("heatmap-opacity") && "none" !== this.visibility
        }, e
    }(nn),
    Yi = {
        paint: new rn({
            "hillshade-illumination-direction": new Wr(O.paint_hillshade["hillshade-illumination-direction"]),
            "hillshade-illumination-anchor": new Wr(O.paint_hillshade["hillshade-illumination-anchor"]),
            "hillshade-exaggeration": new Wr(O.paint_hillshade["hillshade-exaggeration"]),
            "hillshade-shadow-color": new Wr(O.paint_hillshade["hillshade-shadow-color"]),
            "hillshade-highlight-color": new Wr(O.paint_hillshade["hillshade-highlight-color"]),
            "hillshade-accent-color": new Wr(O.paint_hillshade["hillshade-accent-color"])
        })
    },
    $i = function(t) {
        function e(e) {
            t.call(this, e, Yi);
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.hasOffscreenPass = function() {
            return 0 !== this.paint.get("hillshade-exaggeration") && "none" !== this.visibility
        }, e
    }(nn),
    Wi = un([{
        name: "a_pos",
        components: 2,
        type: "Int16"
    }], 4),
    Qi = Wi.members,
    ta = (Wi.size, Wi.alignment, ra),
    ea = ra;

function ra(t, e, r) {
    r = r || 2;
    var n, i, a, o, s, u, l, p = e && e.length,
        h = p ? e[0] * r : t.length,
        c = na(t, 0, h, r, !0),
        f = [];
    if (!c) return f;
    if (p && (c = function(t, e, r, n) {
            var i, a, o, s, u, l = [];
            for (i = 0, a = e.length; i < a; i++) o = e[i] * n, s = i < a - 1 ? e[i + 1] * n : t.length, (u = na(t, o, s, n, !1)) === u.next && (u.steiner = !0), l.push(fa(u));
            for (l.sort(pa), i = 0; i < l.length; i++) ha(l[i], r), r = ia(r, r.next);
            return r
        }(t, e, c, r)), t.length > 80 * r) {
        n = a = t[0], i = o = t[1];
        for (var y = r; y < h; y += r)(s = t[y]) < n && (n = s), (u = t[y + 1]) < i && (i = u), s > a && (a = s), u > o && (o = u);
        l = 0 !== (l = Math.max(a - n, o - i)) ? 1 / l : 0;
    }
    return aa(c, f, r, n, i, l), f
}

function na(t, e, r, n, i) {
    var a, o;
    if (i === ka(t, e, r, n) > 0)
        for (a = e; a < r; a += n) o = wa(a, t[a], t[a + 1], o);
    else
        for (a = r - n; a >= e; a -= n) o = wa(a, t[a], t[a + 1], o);
    return o && va(o, o.next) && (_a(o), o = o.next), o
}

function ia(t, e) {
    if (!t) return t;
    e || (e = t);
    var r, n = t;
    do {
        if (r = !1, n.steiner || !va(n, n.next) && 0 !== ma(n.prev, n, n.next)) n = n.next;
        else {
            if (_a(n), (n = e = n.prev) === n.next) break;
            r = !0;
        }
    } while (r || n !== e);
    return e
}

function aa(t, e, r, n, i, a, o) {
    if (t) {
        !o && a && function(t, e, r, n) {
            var i = t;
            do {
                null === i.z && (i.z = ca(i.x, i.y, e, r, n)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
            } while (i !== t);
            i.prevZ.nextZ = null, i.prevZ = null,
                function(t) {
                    var e, r, n, i, a, o, s, u, l = 1;
                    do {
                        for (r = t, t = null, a = null, o = 0; r;) {
                            for (o++, n = r, s = 0, e = 0; e < l && (s++, n = n.nextZ); e++);
                            for (u = l; s > 0 || u > 0 && n;) 0 !== s && (0 === u || !n || r.z <= n.z) ? (i = r, r = r.nextZ, s--) : (i = n, n = n.nextZ, u--), a ? a.nextZ = i : t = i, i.prevZ = a, a = i;
                            r = n;
                        }
                        a.nextZ = null, l *= 2;
                    } while (o > 1)
                }(i);
        }(t, n, i, a);
        for (var s, u, l = t; t.prev !== t.next;)
            if (s = t.prev, u = t.next, a ? sa(t, n, i, a) : oa(t)) e.push(s.i / r), e.push(t.i / r), e.push(u.i / r), _a(t), t = u.next, l = u.next;
            else if ((t = u) === l) {
            o ? 1 === o ? aa(t = ua(t, e, r), e, r, n, i, a, 2) : 2 === o && la(t, e, r, n, i, a) : aa(ia(t), e, r, n, i, a, 1);
            break
        }
    }
}

function oa(t) {
    var e = t.prev,
        r = t,
        n = t.next;
    if (ma(e, r, n) >= 0) return !1;
    for (var i = t.next.next; i !== t.prev;) {
        if (ya(e.x, e.y, r.x, r.y, n.x, n.y, i.x, i.y) && ma(i.prev, i, i.next) >= 0) return !1;
        i = i.next;
    }
    return !0
}

function sa(t, e, r, n) {
    var i = t.prev,
        a = t,
        o = t.next;
    if (ma(i, a, o) >= 0) return !1;
    for (var s = i.x < a.x ? i.x < o.x ? i.x : o.x : a.x < o.x ? a.x : o.x, u = i.y < a.y ? i.y < o.y ? i.y : o.y : a.y < o.y ? a.y : o.y, l = i.x > a.x ? i.x > o.x ? i.x : o.x : a.x > o.x ? a.x : o.x, p = i.y > a.y ? i.y > o.y ? i.y : o.y : a.y > o.y ? a.y : o.y, h = ca(s, u, e, r, n), c = ca(l, p, e, r, n), f = t.prevZ, y = t.nextZ; f && f.z >= h && y && y.z <= c;) {
        if (f !== t.prev && f !== t.next && ya(i.x, i.y, a.x, a.y, o.x, o.y, f.x, f.y) && ma(f.prev, f, f.next) >= 0) return !1;
        if (f = f.prevZ, y !== t.prev && y !== t.next && ya(i.x, i.y, a.x, a.y, o.x, o.y, y.x, y.y) && ma(y.prev, y, y.next) >= 0) return !1;
        y = y.nextZ;
    }
    for (; f && f.z >= h;) {
        if (f !== t.prev && f !== t.next && ya(i.x, i.y, a.x, a.y, o.x, o.y, f.x, f.y) && ma(f.prev, f, f.next) >= 0) return !1;
        f = f.prevZ;
    }
    for (; y && y.z <= c;) {
        if (y !== t.prev && y !== t.next && ya(i.x, i.y, a.x, a.y, o.x, o.y, y.x, y.y) && ma(y.prev, y, y.next) >= 0) return !1;
        y = y.nextZ;
    }
    return !0
}

function ua(t, e, r) {
    var n = t;
    do {
        var i = n.prev,
            a = n.next.next;
        !va(i, a) && ga(i, n, n.next, a) && xa(i, a) && xa(a, i) && (e.push(i.i / r), e.push(n.i / r), e.push(a.i / r), _a(n), _a(n.next), n = t = a), n = n.next;
    } while (n !== t);
    return n
}

function la(t, e, r, n, i, a) {
    var o = t;
    do {
        for (var s = o.next.next; s !== o.prev;) {
            if (o.i !== s.i && da(o, s)) {
                var u = ba(o, s);
                return o = ia(o, o.next), u = ia(u, u.next), aa(o, e, r, n, i, a), void aa(u, e, r, n, i, a)
            }
            s = s.next;
        }
        o = o.next;
    } while (o !== t)
}

function pa(t, e) {
    return t.x - e.x
}

function ha(t, e) {
    if (e = function(t, e) {
            var r, n = e,
                i = t.x,
                a = t.y,
                o = -1 / 0;
            do {
                if (a <= n.y && a >= n.next.y && n.next.y !== n.y) {
                    var s = n.x + (a - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
                    if (s <= i && s > o) {
                        if (o = s, s === i) {
                            if (a === n.y) return n;
                            if (a === n.next.y) return n.next
                        }
                        r = n.x < n.next.x ? n : n.next;
                    }
                }
                n = n.next;
            } while (n !== e);
            if (!r) return null;
            if (i === o) return r.prev;
            var u, l = r,
                p = r.x,
                h = r.y,
                c = 1 / 0;
            n = r.next;
            for (; n !== l;) i >= n.x && n.x >= p && i !== n.x && ya(a < h ? i : o, a, p, h, a < h ? o : i, a, n.x, n.y) && ((u = Math.abs(a - n.y) / (i - n.x)) < c || u === c && n.x > r.x) && xa(n, t) && (r = n, c = u), n = n.next;
            return r
        }(t, e)) {
        var r = ba(e, t);
        ia(r, r.next);
    }
}

function ca(t, e, r, n, i) {
    return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * i) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * i) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
}

function fa(t) {
    var e = t,
        r = t;
    do {
        e.x < r.x && (r = e), e = e.next;
    } while (e !== t);
    return r
}

function ya(t, e, r, n, i, a, o, s) {
    return (i - o) * (e - s) - (t - o) * (a - s) >= 0 && (t - o) * (n - s) - (r - o) * (e - s) >= 0 && (r - o) * (a - s) - (i - o) * (n - s) >= 0
}

function da(t, e) {
    return t.next.i !== e.i && t.prev.i !== e.i && ! function(t, e) {
        var r = t;
        do {
            if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && ga(r, r.next, t, e)) return !0;
            r = r.next;
        } while (r !== t);
        return !1
    }(t, e) && xa(t, e) && xa(e, t) && function(t, e) {
        var r = t,
            n = !1,
            i = (t.x + e.x) / 2,
            a = (t.y + e.y) / 2;
        do {
            r.y > a != r.next.y > a && r.next.y !== r.y && i < (r.next.x - r.x) * (a - r.y) / (r.next.y - r.y) + r.x && (n = !n), r = r.next;
        } while (r !== t);
        return n
    }(t, e)
}

function ma(t, e, r) {
    return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y)
}

function va(t, e) {
    return t.x === e.x && t.y === e.y
}

function ga(t, e, r, n) {
    return !!(va(t, e) && va(r, n) || va(t, n) && va(r, e)) || ma(t, e, r) > 0 != ma(t, e, n) > 0 && ma(r, n, t) > 0 != ma(r, n, e) > 0
}

function xa(t, e) {
    return ma(t.prev, t, t.next) < 0 ? ma(t, e, t.next) >= 0 && ma(t, t.prev, e) >= 0 : ma(t, e, t.prev) < 0 || ma(t, t.next, e) < 0
}

function ba(t, e) {
    var r = new Aa(t.i, t.x, t.y),
        n = new Aa(e.i, e.x, e.y),
        i = t.next,
        a = e.prev;
    return t.next = e, e.prev = t, r.next = i, i.prev = r, n.next = r, r.prev = n, a.next = n, n.prev = a, n
}

function wa(t, e, r, n) {
    var i = new Aa(t, e, r);
    return n ? (i.next = n.next, i.prev = n, n.next.prev = i, n.next = i) : (i.prev = i, i.next = i), i
}

function _a(t) {
    t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ);
}

function Aa(t, e, r) {
    this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}

function ka(t, e, r, n) {
    for (var i = 0, a = e, o = r - n; a < r; a += n) i += (t[o] - t[a]) * (t[a + 1] + t[o + 1]), o = a;
    return i
}
ra.deviation = function(t, e, r, n) {
    var i = e && e.length,
        a = i ? e[0] * r : t.length,
        o = Math.abs(ka(t, 0, a, r));
    if (i)
        for (var s = 0, u = e.length; s < u; s++) {
            var l = e[s] * r,
                p = s < u - 1 ? e[s + 1] * r : t.length;
            o -= Math.abs(ka(t, l, p, r));
        }
    var h = 0;
    for (s = 0; s < n.length; s += 3) {
        var c = n[s] * r,
            f = n[s + 1] * r,
            y = n[s + 2] * r;
        h += Math.abs((t[c] - t[y]) * (t[f + 1] - t[c + 1]) - (t[c] - t[f]) * (t[y + 1] - t[c + 1]));
    }
    return 0 === o && 0 === h ? 0 : Math.abs((h - o) / o)
}, ra.flatten = function(t) {
    for (var e = t[0][0].length, r = {
            vertices: [],
            holes: [],
            dimensions: e
        }, n = 0, i = 0; i < t.length; i++) {
        for (var a = 0; a < t[i].length; a++)
            for (var o = 0; o < e; o++) r.vertices.push(t[i][a][o]);
        i > 0 && (n += t[i - 1].length, r.holes.push(n));
    }
    return r
}, ta.default = ea;
var Sa = Ma,
    za = Ma;

function Ma(t, e, r, n, i) {
    ! function t(e, r, n, i, a) {
        for (; i > n;) {
            if (i - n > 600) {
                var o = i - n + 1,
                    s = r - n + 1,
                    u = Math.log(o),
                    l = .5 * Math.exp(2 * u / 3),
                    p = .5 * Math.sqrt(u * l * (o - l) / o) * (s - o / 2 < 0 ? -1 : 1),
                    h = Math.max(n, Math.floor(r - s * l / o + p)),
                    c = Math.min(i, Math.floor(r + (o - s) * l / o + p));
                t(e, r, h, c, a);
            }
            var f = e[r],
                y = n,
                d = i;
            for (Ba(e, n, r), a(e[i], f) > 0 && Ba(e, n, i); y < d;) {
                for (Ba(e, y, d), y++, d--; a(e[y], f) < 0;) y++;
                for (; a(e[d], f) > 0;) d--;
            }
            0 === a(e[n], f) ? Ba(e, n, d) : Ba(e, ++d, i), d <= r && (n = d + 1), r <= d && (i = d - 1);
        }
    }(t, e, r || 0, n || t.length - 1, i || Ia);
}

function Ba(t, e, r) {
    var n = t[e];
    t[e] = t[r], t[r] = n;
}

function Ia(t, e) {
    return t < e ? -1 : t > e ? 1 : 0
}

function Va(t, e) {
    var r = t.length;
    if (r <= 1) return [t];
    for (var n, i, a = [], o = 0; o < r; o++) {
        var s = _(t[o]);
        0 !== s && (t[o].area = Math.abs(s), void 0 === i && (i = s < 0), i === s < 0 ? (n && a.push(n), n = [t[o]]) : n.push(t[o]));
    }
    if (n && a.push(n), e > 1)
        for (var u = 0; u < a.length; u++) a[u].length <= e || (Sa(a[u], e, 1, a[u].length - 1, Ca), a[u] = a[u].slice(0, e));
    return a
}

function Ca(t, e) {
    return e.area - t.area
}
Sa.default = za;
var Ta = function(t) {
    this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function(t) {
        return t.id
    }), this.index = t.index, this.layoutVertexArray = new pn, this.indexArray = new kn, this.indexArray2 = new Sn, this.programConfigurations = new Jn(Qi, t.layers, t.zoom), this.segments = new jn, this.segments2 = new jn;
};
Ta.prototype.populate = function(t, e) {
    for (var r = 0, n = t; r < n.length; r += 1) {
        var i = n[r],
            a = i.feature,
            o = i.index,
            s = i.sourceLayerIndex;
        if (this.layers[0]._featureFilter(new Nr(this.zoom), a)) {
            var u = Wn(a);
            this.addFeature(a, u, o), e.featureIndex.insert(a, u, o, s, this.index);
        }
    }
}, Ta.prototype.update = function(t, e) {
    this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers);
}, Ta.prototype.isEmpty = function() {
    return 0 === this.layoutVertexArray.length
}, Ta.prototype.uploadPending = function() {
    return !this.uploaded || this.programConfigurations.needsUpload
}, Ta.prototype.upload = function(t) {
    this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, Qi), this.indexBuffer = t.createIndexBuffer(this.indexArray), this.indexBuffer2 = t.createIndexBuffer(this.indexArray2)), this.programConfigurations.upload(t), this.uploaded = !0;
}, Ta.prototype.destroy = function() {
    this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.indexBuffer2.destroy(), this.programConfigurations.destroy(), this.segments.destroy(), this.segments2.destroy());
}, Ta.prototype.addFeature = function(t, e, r) {
    for (var n = 0, i = Va(e, 500); n < i.length; n += 1) {
        for (var a = i[n], o = 0, s = 0, u = a; s < u.length; s += 1) {
            o += u[s].length;
        }
        for (var l = this.segments.prepareSegment(o, this.layoutVertexArray, this.indexArray), p = l.vertexLength, h = [], c = [], f = 0, y = a; f < y.length; f += 1) {
            var d = y[f];
            if (0 !== d.length) {
                d !== a[0] && c.push(h.length / 2);
                var m = this.segments2.prepareSegment(d.length, this.layoutVertexArray, this.indexArray2),
                    v = m.vertexLength;
                this.layoutVertexArray.emplaceBack(d[0].x, d[0].y), this.indexArray2.emplaceBack(v + d.length - 1, v), h.push(d[0].x), h.push(d[0].y);
                for (var g = 1; g < d.length; g++) this.layoutVertexArray.emplaceBack(d[g].x, d[g].y), this.indexArray2.emplaceBack(v + g - 1, v + g), h.push(d[g].x), h.push(d[g].y);
                m.vertexLength += d.length, m.primitiveLength += d.length;
            }
        }
        for (var x = ta(h, c), b = 0; b < x.length; b += 3) this.indexArray.emplaceBack(p + x[b], p + x[b + 1], p + x[b + 2]);
        l.vertexLength += o, l.primitiveLength += x.length / 3;
    }
    this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, t, r);
}, zr("FillBucket", Ta, {
    omit: ["layers"]
});
var Ea = {
        paint: new rn({
            "fill-antialias": new Wr(O.paint_fill["fill-antialias"]),
            "fill-opacity": new Qr(O.paint_fill["fill-opacity"]),
            "fill-color": new Qr(O.paint_fill["fill-color"]),
            "fill-outline-color": new Qr(O.paint_fill["fill-outline-color"]),
            "fill-translate": new Wr(O.paint_fill["fill-translate"]),
            "fill-translate-anchor": new Wr(O.paint_fill["fill-translate-anchor"]),
            "fill-pattern": new tn(O.paint_fill["fill-pattern"])
        })
    },
    Pa = function(t) {
        function e(e) {
            t.call(this, e, Ea);
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.recalculate = function(t) {
            this.paint = this._transitioningPaint.possiblyEvaluate(t);
            var e = this.paint._values["fill-outline-color"];
            "constant" === e.value.kind && void 0 === e.value.value && (this.paint._values["fill-outline-color"] = this.paint._values["fill-color"]);
        }, e.prototype.createBucket = function(t) {
            return new Ta(t)
        }, e.prototype.queryRadius = function() {
            return ci(this.paint.get("fill-translate"))
        }, e.prototype.queryIntersectsFeature = function(t, e, r, n, i, a, o) {
            return ri(fi(t, this.paint.get("fill-translate"), this.paint.get("fill-translate-anchor"), a.angle, o), n)
        }, e
    }(nn),
    Fa = un([{
        name: "a_pos",
        components: 2,
        type: "Int16"
    }, {
        name: "a_normal_ed",
        components: 4,
        type: "Int16"
    }], 4),
    La = Fa.members,
    Oa = (Fa.size, Fa.alignment, Math.pow(2, 13));

function Da(t, e, r, n, i, a, o, s) {
    t.emplaceBack(e, r, 2 * Math.floor(n * Oa) + o, i * Oa * 2, a * Oa * 2, Math.round(s));
}
var qa = function(t) {
    this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function(t) {
        return t.id
    }), this.index = t.index, this.layoutVertexArray = new cn, this.indexArray = new kn, this.programConfigurations = new Jn(La, t.layers, t.zoom), this.segments = new jn;
};

function ja(t, e) {
    return t.x === e.x && (t.x < 0 || t.x > Kn) || t.y === e.y && (t.y < 0 || t.y > Kn)
}

function Ua(t) {
    return t.every(function(t) {
        return t.x < 0
    }) || t.every(function(t) {
        return t.x > Kn
    }) || t.every(function(t) {
        return t.y < 0
    }) || t.every(function(t) {
        return t.y > Kn
    })
}
qa.prototype.populate = function(t, e) {
    for (var r = 0, n = t; r < n.length; r += 1) {
        var i = n[r],
            a = i.feature,
            o = i.index,
            s = i.sourceLayerIndex;
        if (this.layers[0]._featureFilter(new Nr(this.zoom), a)) {
            var u = Wn(a);
            this.addFeature(a, u, o), e.featureIndex.insert(a, u, o, s, this.index);
        }
    }
}, qa.prototype.update = function(t, e) {
    this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers);
}, qa.prototype.isEmpty = function() {
    return 0 === this.layoutVertexArray.length
}, qa.prototype.uploadPending = function() {
    return !this.uploaded || this.programConfigurations.needsUpload
}, qa.prototype.upload = function(t) {
    this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, La), this.indexBuffer = t.createIndexBuffer(this.indexArray)), this.programConfigurations.upload(t), this.uploaded = !0;
}, qa.prototype.destroy = function() {
    this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy());
}, qa.prototype.addFeature = function(t, e, r) {
    for (var n = 0, i = Va(e, 500); n < i.length; n += 1) {
        for (var a = i[n], o = 0, s = 0, u = a; s < u.length; s += 1) {
            o += u[s].length;
        }
        for (var l = this.segments.prepareSegment(4, this.layoutVertexArray, this.indexArray), p = 0, h = a; p < h.length; p += 1) {
            var c = h[p];
            if (0 !== c.length && !Ua(c))
                for (var f = 0, y = 0; y < c.length; y++) {
                    var d = c[y];
                    if (y >= 1) {
                        var m = c[y - 1];
                        if (!ja(d, m)) {
                            l.vertexLength + 4 > jn.MAX_VERTEX_ARRAY_LENGTH && (l = this.segments.prepareSegment(4, this.layoutVertexArray, this.indexArray));
                            var v = d.sub(m)._perp()._unit(),
                                g = m.dist(d);
                            f + g > 32768 && (f = 0), Da(this.layoutVertexArray, d.x, d.y, v.x, v.y, 0, 0, f), Da(this.layoutVertexArray, d.x, d.y, v.x, v.y, 0, 1, f), f += g, Da(this.layoutVertexArray, m.x, m.y, v.x, v.y, 0, 0, f), Da(this.layoutVertexArray, m.x, m.y, v.x, v.y, 0, 1, f);
                            var x = l.vertexLength;
                            this.indexArray.emplaceBack(x, x + 1, x + 2), this.indexArray.emplaceBack(x + 1, x + 2, x + 3), l.vertexLength += 4, l.primitiveLength += 2;
                        }
                    }
                }
        }
        l.vertexLength + o > jn.MAX_VERTEX_ARRAY_LENGTH && (l = this.segments.prepareSegment(o, this.layoutVertexArray, this.indexArray));
        for (var b = [], w = [], _ = l.vertexLength, A = 0, k = a; A < k.length; A += 1) {
            var S = k[A];
            if (0 !== S.length) {
                S !== a[0] && w.push(b.length / 2);
                for (var z = 0; z < S.length; z++) {
                    var M = S[z];
                    Da(this.layoutVertexArray, M.x, M.y, 0, 0, 1, 1, 0), b.push(M.x), b.push(M.y);
                }
            }
        }
        for (var B = ta(b, w), I = 0; I < B.length; I += 3) this.indexArray.emplaceBack(_ + B[I], _ + B[I + 1], _ + B[I + 2]);
        l.primitiveLength += B.length / 3, l.vertexLength += o;
    }
    this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, t, r);
}, zr("FillExtrusionBucket", qa, {
    omit: ["layers"]
});
var Ra = {
        paint: new rn({
            "fill-extrusion-opacity": new Wr(O["paint_fill-extrusion"]["fill-extrusion-opacity"]),
            "fill-extrusion-color": new Qr(O["paint_fill-extrusion"]["fill-extrusion-color"]),
            "fill-extrusion-translate": new Wr(O["paint_fill-extrusion"]["fill-extrusion-translate"]),
            "fill-extrusion-translate-anchor": new Wr(O["paint_fill-extrusion"]["fill-extrusion-translate-anchor"]),
            "fill-extrusion-pattern": new tn(O["paint_fill-extrusion"]["fill-extrusion-pattern"]),
            "fill-extrusion-height": new Qr(O["paint_fill-extrusion"]["fill-extrusion-height"]),
            "fill-extrusion-base": new Qr(O["paint_fill-extrusion"]["fill-extrusion-base"])
        })
    },
    Na = function(t) {
        function e(e) {
            t.call(this, e, Ra);
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createBucket = function(t) {
            return new qa(t)
        }, e.prototype.queryRadius = function() {
            return ci(this.paint.get("fill-extrusion-translate"))
        }, e.prototype.queryIntersectsFeature = function(t, e, r, n, i, a, o) {
            return ri(fi(t, this.paint.get("fill-extrusion-translate"), this.paint.get("fill-extrusion-translate-anchor"), a.angle, o), n)
        }, e.prototype.hasOffscreenPass = function() {
            return 0 !== this.paint.get("fill-extrusion-opacity") && "none" !== this.visibility
        }, e.prototype.resize = function() {
            this.viewportFrame && (this.viewportFrame.destroy(), this.viewportFrame = null);
        }, e
    }(nn),
    Za = un([{
        name: "a_pos_normal",
        components: 4,
        type: "Int16"
    }, {
        name: "a_data",
        components: 4,
        type: "Uint8"
    }], 4),
    Ha = Za.members,
    Xa = (Za.size, Za.alignment, Ja);

function Ja(t, e, r, n, i) {
    this.properties = {}, this.extent = r, this.type = 0, this._pbf = t, this._geometry = -1, this._keys = n, this._values = i, t.readFields(Ga, this, e);
}

function Ga(t, e, r) {
    1 == t ? e.id = r.readVarint() : 2 == t ? function(t, e) {
        var r = t.readVarint() + t.pos;
        for (; t.pos < r;) {
            var n = e._keys[t.readVarint()],
                i = e._values[t.readVarint()];
            e.properties[n] = i;
        }
    }(r, e) : 3 == t ? e.type = r.readVarint() : 4 == t && (e._geometry = r.pos);
}

function Ka(t) {
    for (var e, r, n = 0, i = 0, a = t.length, o = a - 1; i < a; o = i++) e = t[i], n += ((r = t[o]).x - e.x) * (e.y + r.y);
    return n
}
Ja.types = ["Unknown", "Point", "LineString", "Polygon"], Ja.prototype.loadGeometry = function() {
    var t = this._pbf;
    t.pos = this._geometry;
    for (var e, r = t.readVarint() + t.pos, n = 1, i = 0, o = 0, s = 0, u = []; t.pos < r;) {
        if (i <= 0) {
            var l = t.readVarint();
            n = 7 & l, i = l >> 3;
        }
        if (i--, 1 === n || 2 === n) o += t.readSVarint(), s += t.readSVarint(), 1 === n && (e && u.push(e), e = []), e.push(new a(o, s));
        else {
            if (7 !== n) throw new Error("unknown command " + n);
            e && e.push(e[0].clone());
        }
    }
    return e && u.push(e), u
}, Ja.prototype.bbox = function() {
    var t = this._pbf;
    t.pos = this._geometry;
    for (var e = t.readVarint() + t.pos, r = 1, n = 0, i = 0, a = 0, o = 1 / 0, s = -1 / 0, u = 1 / 0, l = -1 / 0; t.pos < e;) {
        if (n <= 0) {
            var p = t.readVarint();
            r = 7 & p, n = p >> 3;
        }
        if (n--, 1 === r || 2 === r)(i += t.readSVarint()) < o && (o = i), i > s && (s = i), (a += t.readSVarint()) < u && (u = a), a > l && (l = a);
        else if (7 !== r) throw new Error("unknown command " + r)
    }
    return [o, u, s, l]
}, Ja.prototype.toGeoJSON = function(t, e, r) {
    var n, i, a = this.extent * Math.pow(2, r),
        o = this.extent * t,
        s = this.extent * e,
        u = this.loadGeometry(),
        l = Ja.types[this.type];

    function p(t) {
        for (var e = 0; e < t.length; e++) {
            var r = t[e],
                n = 180 - 360 * (r.y + s) / a;
            t[e] = [360 * (r.x + o) / a - 180, 360 / Math.PI * Math.atan(Math.exp(n * Math.PI / 180)) - 90];
        }
    }
    switch (this.type) {
        case 1:
            var h = [];
            for (n = 0; n < u.length; n++) h[n] = u[n][0];
            p(u = h);
            break;
        case 2:
            for (n = 0; n < u.length; n++) p(u[n]);
            break;
        case 3:
            for (u = function(t) {
                    var e = t.length;
                    if (e <= 1) return [t];
                    for (var r, n, i = [], a = 0; a < e; a++) {
                        var o = Ka(t[a]);
                        0 !== o && (void 0 === n && (n = o < 0), n === o < 0 ? (r && i.push(r), r = [t[a]]) : r.push(t[a]));
                    }
                    r && i.push(r);
                    return i
                }(u), n = 0; n < u.length; n++)
                for (i = 0; i < u[n].length; i++) p(u[n][i]);
    }
    1 === u.length ? u = u[0] : l = "Multi" + l;
    var c = {
        type: "Feature",
        geometry: {
            type: l,
            coordinates: u
        },
        properties: this.properties
    };
    return "id" in this && (c.id = this.id), c
};
var Ya = $a;

function $a(t, e) {
    this.version = 1, this.name = null, this.extent = 4096, this.length = 0, this._pbf = t, this._keys = [], this._values = [], this._features = [], t.readFields(Wa, this, e), this.length = this._features.length;
}

function Wa(t, e, r) {
    15 === t ? e.version = r.readVarint() : 1 === t ? e.name = r.readString() : 5 === t ? e.extent = r.readVarint() : 2 === t ? e._features.push(r.pos) : 3 === t ? e._keys.push(r.readString()) : 4 === t && e._values.push(function(t) {
        var e = null,
            r = t.readVarint() + t.pos;
        for (; t.pos < r;) {
            var n = t.readVarint() >> 3;
            e = 1 === n ? t.readString() : 2 === n ? t.readFloat() : 3 === n ? t.readDouble() : 4 === n ? t.readVarint64() : 5 === n ? t.readVarint() : 6 === n ? t.readSVarint() : 7 === n ? t.readBoolean() : null;
        }
        return e
    }(r));
}

function Qa(t, e, r) {
    if (3 === t) {
        var n = new Ya(r, r.readVarint() + r.pos);
        n.length && (e[n.name] = n);
    }
}
$a.prototype.feature = function(t) {
    if (t < 0 || t >= this._features.length) throw new Error("feature index out of bounds");
    this._pbf.pos = this._features[t];
    var e = this._pbf.readVarint() + this._pbf.pos;
    return new Xa(this._pbf, e, this.extent, this._keys, this._values)
};
var to = {
        VectorTile: function(t, e) {
            this.layers = t.readFields(Qa, {}, e);
        },
        VectorTileFeature: Xa,
        VectorTileLayer: Ya
    },
    eo = to.VectorTileFeature.types,
    ro = 63,
    no = Math.cos(Math.PI / 180 * 37.5),
    io = .5,
    ao = Math.pow(2, 14) / io;

function oo(t, e, r, n, i, a, o) {
    t.emplaceBack(e.x, e.y, n ? 1 : 0, i ? 1 : -1, Math.round(ro * r.x) + 128, Math.round(ro * r.y) + 128, 1 + (0 === a ? 0 : a < 0 ? -1 : 1) | (o * io & 63) << 2, o * io >> 6);
}
var so = function(t) {
    this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function(t) {
        return t.id
    }), this.index = t.index, this.layoutVertexArray = new fn, this.indexArray = new kn, this.programConfigurations = new Jn(Ha, t.layers, t.zoom), this.segments = new jn;
};

function uo(t, e) {
    return (t / e.tileTotal * (e.end - e.start) + e.start) * (ao - 1)
}
so.prototype.populate = function(t, e) {
    for (var r = 0, n = t; r < n.length; r += 1) {
        var i = n[r],
            a = i.feature,
            o = i.index,
            s = i.sourceLayerIndex;
        if (this.layers[0]._featureFilter(new Nr(this.zoom), a)) {
            var u = Wn(a);
            this.addFeature(a, u, o), e.featureIndex.insert(a, u, o, s, this.index);
        }
    }
}, so.prototype.update = function(t, e) {
    this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers);
}, so.prototype.isEmpty = function() {
    return 0 === this.layoutVertexArray.length
}, so.prototype.uploadPending = function() {
    return !this.uploaded || this.programConfigurations.needsUpload
}, so.prototype.upload = function(t) {
    this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, Ha), this.indexBuffer = t.createIndexBuffer(this.indexArray)), this.programConfigurations.upload(t), this.uploaded = !0;
}, so.prototype.destroy = function() {
    this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy());
}, so.prototype.addFeature = function(t, e, r) {
    for (var n = this.layers[0].layout, i = n.get("line-join").evaluate(t, {}), a = n.get("line-cap"), o = n.get("line-miter-limit"), s = n.get("line-round-limit"), u = 0, l = e; u < l.length; u += 1) {
        var p = l[u];
        this.addLine(p, t, i, a, o, s, r);
    }
}, so.prototype.addLine = function(t, e, r, n, i, a, o) {
    var s = null;
    e.properties && e.properties.hasOwnProperty("mapbox_clip_start") && e.properties.hasOwnProperty("mapbox_clip_end") && (s = {
        start: e.properties.mapbox_clip_start,
        end: e.properties.mapbox_clip_end,
        tileTotal: void 0
    });
    for (var u = "Polygon" === eo[e.type], l = t.length; l >= 2 && t[l - 1].equals(t[l - 2]);) l--;
    for (var p = 0; p < l - 1 && t[p].equals(t[p + 1]);) p++;
    if (!(l < (u ? 3 : 2))) {
        s && (s.tileTotal = function(t, e, r) {
            for (var n, i, a = 0, o = e; o < r - 1; o++) n = t[o], i = t[o + 1], a += n.dist(i);
            return a
        }(t, p, l)), "bevel" === r && (i = 1.05);
        var h = Kn / (512 * this.overscaling) * 15,
            c = t[p],
            f = this.segments.prepareSegment(10 * l, this.layoutVertexArray, this.indexArray);
        this.distance = 0;
        var y, d, m, v = n,
            g = u ? "butt" : n,
            x = !0,
            b = void 0,
            w = void 0,
            _ = void 0,
            A = void 0;
        this.e1 = this.e2 = this.e3 = -1, u && (y = t[l - 2], A = c.sub(y)._unit()._perp());
        for (var k = p; k < l; k++)
            if (!(w = u && k === l - 1 ? t[p + 1] : t[k + 1]) || !t[k].equals(w)) {
                A && (_ = A), y && (b = y), y = t[k], A = w ? w.sub(y)._unit()._perp() : _;
                var S = (_ = _ || A).add(A);
                0 === S.x && 0 === S.y || S._unit();
                var z = S.x * A.x + S.y * A.y,
                    M = 0 !== z ? 1 / z : 1 / 0,
                    B = z < no && b && w;
                if (B && k > p) {
                    var I = y.dist(b);
                    if (I > 2 * h) {
                        var V = y.sub(y.sub(b)._mult(h / I)._round());
                        this.distance += V.dist(b), this.addCurrentVertex(V, this.distance, _.mult(1), 0, 0, !1, f, s), b = V;
                    }
                }
                var C = b && w,
                    T = C ? r : w ? v : g;
                if (C && "round" === T && (M < a ? T = "miter" : M <= 2 && (T = "fakeround")), "miter" === T && M > i && (T = "bevel"), "bevel" === T && (M > 2 && (T = "flipbevel"), M < i && (T = "miter")), b && (this.distance += y.dist(b)), "miter" === T) S._mult(M), this.addCurrentVertex(y, this.distance, S, 0, 0, !1, f, s);
                else if ("flipbevel" === T) {
                    if (M > 100) S = A.clone().mult(-1);
                    else {
                        var E = _.x * A.y - _.y * A.x > 0 ? -1 : 1,
                            P = M * _.add(A).mag() / _.sub(A).mag();
                        S._perp()._mult(P * E);
                    }
                    this.addCurrentVertex(y, this.distance, S, 0, 0, !1, f, s), this.addCurrentVertex(y, this.distance, S.mult(-1), 0, 0, !1, f, s);
                } else if ("bevel" === T || "fakeround" === T) {
                    var F = _.x * A.y - _.y * A.x > 0,
                        L = -Math.sqrt(M * M - 1);
                    if (F ? (m = 0, d = L) : (d = 0, m = L), x || this.addCurrentVertex(y, this.distance, _, d, m, !1, f, s), "fakeround" === T) {
                        for (var O = Math.floor(8 * (.5 - (z - .5))), D = void 0, q = 0; q < O; q++) D = A.mult((q + 1) / (O + 1))._add(_)._unit(), this.addPieSliceVertex(y, this.distance, D, F, f, s);
                        this.addPieSliceVertex(y, this.distance, S, F, f, s);
                        for (var j = O - 1; j >= 0; j--) D = _.mult((j + 1) / (O + 1))._add(A)._unit(), this.addPieSliceVertex(y, this.distance, D, F, f, s);
                    }
                    w && this.addCurrentVertex(y, this.distance, A, -d, -m, !1, f, s);
                } else "butt" === T ? (x || this.addCurrentVertex(y, this.distance, _, 0, 0, !1, f, s), w && this.addCurrentVertex(y, this.distance, A, 0, 0, !1, f, s)) : "square" === T ? (x || (this.addCurrentVertex(y, this.distance, _, 1, 1, !1, f, s), this.e1 = this.e2 = -1), w && this.addCurrentVertex(y, this.distance, A, -1, -1, !1, f, s)) : "round" === T && (x || (this.addCurrentVertex(y, this.distance, _, 0, 0, !1, f, s), this.addCurrentVertex(y, this.distance, _, 1, 1, !0, f, s), this.e1 = this.e2 = -1), w && (this.addCurrentVertex(y, this.distance, A, -1, -1, !0, f, s), this.addCurrentVertex(y, this.distance, A, 0, 0, !1, f, s)));
                if (B && k < l - 1) {
                    var U = y.dist(w);
                    if (U > 2 * h) {
                        var R = y.add(w.sub(y)._mult(h / U)._round());
                        this.distance += R.dist(y), this.addCurrentVertex(R, this.distance, A.mult(1), 0, 0, !1, f, s), y = R;
                    }
                }
                x = !1;
            }
        this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, e, o);
    }
}, so.prototype.addCurrentVertex = function(t, e, r, n, i, a, o, s) {
    var u, l = this.layoutVertexArray,
        p = this.indexArray;
    s && (e = uo(e, s)), u = r.clone(), n && u._sub(r.perp()._mult(n)), oo(l, t, u, a, !1, n, e), this.e3 = o.vertexLength++, this.e1 >= 0 && this.e2 >= 0 && (p.emplaceBack(this.e1, this.e2, this.e3), o.primitiveLength++), this.e1 = this.e2, this.e2 = this.e3, u = r.mult(-1), i && u._sub(r.perp()._mult(i)), oo(l, t, u, a, !0, -i, e), this.e3 = o.vertexLength++, this.e1 >= 0 && this.e2 >= 0 && (p.emplaceBack(this.e1, this.e2, this.e3), o.primitiveLength++), this.e1 = this.e2, this.e2 = this.e3, e > ao / 2 && !s && (this.distance = 0, this.addCurrentVertex(t, this.distance, r, n, i, a, o));
}, so.prototype.addPieSliceVertex = function(t, e, r, n, i, a) {
    r = r.mult(n ? -1 : 1);
    var o = this.layoutVertexArray,
        s = this.indexArray;
    a && (e = uo(e, a)), oo(o, t, r, !1, n, 0, e), this.e3 = i.vertexLength++, this.e1 >= 0 && this.e2 >= 0 && (s.emplaceBack(this.e1, this.e2, this.e3), i.primitiveLength++), n ? this.e2 = this.e3 : this.e1 = this.e3;
}, zr("LineBucket", so, {
    omit: ["layers"]
});
var lo = new rn({
        "line-cap": new Wr(O.layout_line["line-cap"]),
        "line-join": new Qr(O.layout_line["line-join"]),
        "line-miter-limit": new Wr(O.layout_line["line-miter-limit"]),
        "line-round-limit": new Wr(O.layout_line["line-round-limit"])
    }),
    po = {
        paint: new rn({
            "line-opacity": new Qr(O.paint_line["line-opacity"]),
            "line-color": new Qr(O.paint_line["line-color"]),
            "line-translate": new Wr(O.paint_line["line-translate"]),
            "line-translate-anchor": new Wr(O.paint_line["line-translate-anchor"]),
            "line-width": new Qr(O.paint_line["line-width"]),
            "line-gap-width": new Qr(O.paint_line["line-gap-width"]),
            "line-offset": new Qr(O.paint_line["line-offset"]),
            "line-blur": new Qr(O.paint_line["line-blur"]),
            "line-dasharray": new tn(O.paint_line["line-dasharray"]),
            "line-pattern": new tn(O.paint_line["line-pattern"]),
            "line-gradient": new en(O.paint_line["line-gradient"])
        }),
        layout: lo
    },
    ho = new(function(t) {
        function e() {
            t.apply(this, arguments);
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.possiblyEvaluate = function(e, r) {
            return r = new Nr(Math.floor(r.zoom), {
                now: r.now,
                fadeDuration: r.fadeDuration,
                zoomHistory: r.zoomHistory,
                transition: r.transition
            }), t.prototype.possiblyEvaluate.call(this, e, r)
        }, e.prototype.evaluate = function(e, r, n, i) {
            return r = h({}, r, {
                zoom: Math.floor(r.zoom)
            }), t.prototype.evaluate.call(this, e, r, n, i)
        }, e
    }(Qr))(po.paint.properties["line-width"].specification);
ho.useIntegerZoom = !0;
var co = function(t) {
    function e(e) {
        t.call(this, e, po);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._handleSpecialPaintPropertyUpdate = function(t) {
        "line-gradient" === t && this._updateGradient();
    }, e.prototype._updateGradient = function() {
        var t = this._transitionablePaint._values["line-gradient"].value.expression;
        this.gradient = Gi(t, "lineProgress"), this.gradientTexture = null;
    }, e.prototype.recalculate = function(e) {
        t.prototype.recalculate.call(this, e), this.paint._values["line-floorwidth"] = ho.possiblyEvaluate(this._transitioningPaint._values["line-width"].value, e);
    }, e.prototype.createBucket = function(t) {
        return new so(t)
    }, e.prototype.queryRadius = function(t) {
        var e = t,
            r = fo(hi("line-width", this, e), hi("line-gap-width", this, e)),
            n = hi("line-offset", this, e);
        return r / 2 + Math.abs(n) + ci(this.paint.get("line-translate"))
    }, e.prototype.queryIntersectsFeature = function(t, e, r, n, i, o, s) {
        var u = fi(t, this.paint.get("line-translate"), this.paint.get("line-translate-anchor"), o.angle, s),
            l = s / 2 * fo(this.paint.get("line-width").evaluate(e, r), this.paint.get("line-gap-width").evaluate(e, r)),
            p = this.paint.get("line-offset").evaluate(e, r);
        return p && (n = function(t, e) {
            for (var r = [], n = new a(0, 0), i = 0; i < t.length; i++) {
                for (var o = t[i], s = [], u = 0; u < o.length; u++) {
                    var l = o[u - 1],
                        p = o[u],
                        h = o[u + 1],
                        c = 0 === u ? n : p.sub(l)._unit()._perp(),
                        f = u === o.length - 1 ? n : h.sub(p)._unit()._perp(),
                        y = c._add(f)._unit(),
                        d = y.x * f.x + y.y * f.y;
                    y._mult(1 / d), s.push(y._mult(e)._add(p));
                }
                r.push(s);
            }
            return r
        }(n, p * s)), ni(u, n, l)
    }, e
}(nn);

function fo(t, e) {
    return e > 0 ? e + 2 * t : t
}
var yo = un([{
        name: "a_pos_offset",
        components: 4,
        type: "Int16"
    }, {
        name: "a_data",
        components: 4,
        type: "Uint16"
    }]),
    mo = un([{
        name: "a_projected_pos",
        components: 3,
        type: "Float32"
    }], 4),
    vo = (un([{
        name: "a_fade_opacity",
        components: 1,
        type: "Uint32"
    }], 4), un([{
        name: "a_placed",
        components: 2,
        type: "Uint8"
    }], 4)),
    go = (un([{
        type: "Int16",
        name: "anchorPointX"
    }, {
        type: "Int16",
        name: "anchorPointY"
    }, {
        type: "Int16",
        name: "x1"
    }, {
        type: "Int16",
        name: "y1"
    }, {
        type: "Int16",
        name: "x2"
    }, {
        type: "Int16",
        name: "y2"
    }, {
        type: "Uint32",
        name: "featureIndex"
    }, {
        type: "Uint16",
        name: "sourceLayerIndex"
    }, {
        type: "Uint16",
        name: "bucketIndex"
    }, {
        type: "Int16",
        name: "radius"
    }, {
        type: "Int16",
        name: "signedDistanceFromAnchor"
    }]), un([{
        name: "a_pos",
        components: 2,
        type: "Int16"
    }, {
        name: "a_anchor_pos",
        components: 2,
        type: "Int16"
    }, {
        name: "a_extrude",
        components: 2,
        type: "Int16"
    }], 4)),
    xo = un([{
        name: "a_pos",
        components: 2,
        type: "Int16"
    }, {
        name: "a_anchor_pos",
        components: 2,
        type: "Int16"
    }, {
        name: "a_extrude",
        components: 2,
        type: "Int16"
    }], 4);
un([{
    type: "Int16",
    name: "anchorX"
}, {
    type: "Int16",
    name: "anchorY"
}, {
    type: "Uint16",
    name: "glyphStartIndex"
}, {
    type: "Uint16",
    name: "numGlyphs"
}, {
    type: "Uint32",
    name: "vertexStartIndex"
}, {
    type: "Uint32",
    name: "lineStartIndex"
}, {
    type: "Uint32",
    name: "lineLength"
}, {
    type: "Uint16",
    name: "segment"
}, {
    type: "Uint16",
    name: "lowerSize"
}, {
    type: "Uint16",
    name: "upperSize"
}, {
    type: "Float32",
    name: "lineOffsetX"
}, {
    type: "Float32",
    name: "lineOffsetY"
}, {
    type: "Uint8",
    name: "writingMode"
}, {
    type: "Uint8",
    name: "hidden"
}]), un([{
    type: "Float32",
    name: "offsetX"
}]), un([{
    type: "Int16",
    name: "x"
}, {
    type: "Int16",
    name: "y"
}, {
    type: "Int16",
    name: "tileUnitDistanceFromAnchor"
}]);

function bo(t, e, r) {
    var n = e.layout.get("text-transform").evaluate(r, {});
    return "uppercase" === n ? t = t.toLocaleUpperCase() : "lowercase" === n && (t = t.toLocaleLowerCase()), Rr.applyArabicShaping && (t = Rr.applyArabicShaping(t)), t
}

function wo(t, e, r) {
    return t instanceof ht ? (t.sections.forEach(function(t) {
        t.text = bo(t.text, e, r);
    }), t) : bo(t, e, r)
}
var _o = {
    "!": "︕",
    "#": "＃",
    $: "＄",
    "%": "％",
    "&": "＆",
    "(": "︵",
    ")": "︶",
    "*": "＊",
    "+": "＋",
    ",": "︐",
    "-": "︲",
    ".": "・",
    "/": "／",
    ":": "︓",
    ";": "︔",
    "<": "︿",
    "=": "＝",
    ">": "﹀",
    "?": "︖",
    "@": "＠",
    "[": "﹇",
    "\\": "＼",
    "]": "﹈",
    "^": "＾",
    _: "︳",
    "`": "｀",
    "{": "︷",
    "|": "―",
    "}": "︸",
    "~": "～",
    "¢": "￠",
    "£": "￡",
    "¥": "￥",
    "¦": "￤",
    "¬": "￢",
    "¯": "￣",
    "–": "︲",
    "—": "︱",
    "‘": "﹃",
    "’": "﹄",
    "“": "﹁",
    "”": "﹂",
    "…": "︙",
    "‧": "・",
    "₩": "￦",
    "、": "︑",
    "。": "︒",
    "〈": "︿",
    "〉": "﹀",
    "《": "︽",
    "》": "︾",
    "「": "﹁",
    "」": "﹂",
    "『": "﹃",
    "』": "﹄",
    "【": "︻",
    "】": "︼",
    "〔": "︹",
    "〕": "︺",
    "〖": "︗",
    "〗": "︘",
    "！": "︕",
    "（": "︵",
    "）": "︶",
    "，": "︐",
    "－": "︲",
    "．": "・",
    "：": "︓",
    "；": "︔",
    "＜": "︿",
    "＞": "﹀",
    "？": "︖",
    "［": "﹇",
    "］": "﹈",
    "＿": "︳",
    "｛": "︷",
    "｜": "―",
    "｝": "︸",
    "｟": "︵",
    "｠": "︶",
    "｡": "︒",
    "｢": "﹁",
    "｣": "﹂"
};
var Ao = function(t) {
    function e(e, r, n, i) {
        t.call(this, e, r), this.angle = n, void 0 !== i && (this.segment = i);
    }
    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function() {
        return new e(this.x, this.y, this.angle, this.segment)
    }, e
}(a);

function ko(t, e) {
    var r = e.expression;
    if ("constant" === r.kind) return {
        functionType: "constant",
        layoutSize: r.evaluate(new Nr(t + 1))
    };
    if ("source" === r.kind) return {
        functionType: "source"
    };
    for (var n = r.zoomStops, i = 0; i < n.length && n[i] <= t;) i++;
    for (var a = i = Math.max(0, i - 1); a < n.length && n[a] < t + 1;) a++;
    a = Math.min(n.length - 1, a);
    var o = {
        min: n[i],
        max: n[a]
    };
    return "composite" === r.kind ? {
        functionType: "composite",
        zoomRange: o,
        propertyValue: e.value
    } : {
        functionType: "camera",
        layoutSize: r.evaluate(new Nr(t + 1)),
        zoomRange: o,
        sizeRange: {
            min: r.evaluate(new Nr(o.min)),
            max: r.evaluate(new Nr(o.max))
        },
        propertyValue: e.value
    }
}
zr("Anchor", Ao);
var So = to.VectorTileFeature.types,
    zo = [{
        name: "a_fade_opacity",
        components: 1,
        type: "Uint8",
        offset: 0
    }];

function Mo(t, e, r, n, i, a, o, s) {
    t.emplaceBack(e, r, Math.round(32 * n), Math.round(32 * i), a, o, s ? s[0] : 0, s ? s[1] : 0);
}

function Bo(t, e, r) {
    t.emplaceBack(e.x, e.y, r), t.emplaceBack(e.x, e.y, r), t.emplaceBack(e.x, e.y, r), t.emplaceBack(e.x, e.y, r);
}
var Io = function(t) {
    this.layoutVertexArray = new yn, this.indexArray = new kn, this.programConfigurations = t, this.segments = new jn, this.dynamicLayoutVertexArray = new dn, this.opacityVertexArray = new mn, this.placedSymbolArray = new Cn;
};
Io.prototype.upload = function(t, e, r, n) {
    r && (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, yo.members), this.indexBuffer = t.createIndexBuffer(this.indexArray, e), this.dynamicLayoutVertexBuffer = t.createVertexBuffer(this.dynamicLayoutVertexArray, mo.members, !0), this.opacityVertexBuffer = t.createVertexBuffer(this.opacityVertexArray, zo, !0), this.opacityVertexBuffer.itemSize = 1), (r || n) && this.programConfigurations.upload(t);
}, Io.prototype.destroy = function() {
    this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy(), this.dynamicLayoutVertexBuffer.destroy(), this.opacityVertexBuffer.destroy());
}, zr("SymbolBuffers", Io);
var Vo = function(t, e, r) {
    this.layoutVertexArray = new t, this.layoutAttributes = e, this.indexArray = new r, this.segments = new jn, this.collisionVertexArray = new xn;
};
Vo.prototype.upload = function(t) {
    this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, this.layoutAttributes), this.indexBuffer = t.createIndexBuffer(this.indexArray), this.collisionVertexBuffer = t.createVertexBuffer(this.collisionVertexArray, vo.members, !0);
}, Vo.prototype.destroy = function() {
    this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.segments.destroy(), this.collisionVertexBuffer.destroy());
}, zr("CollisionBuffers", Vo);
var Co = function(t) {
    this.collisionBoxArray = t.collisionBoxArray, this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function(t) {
        return t.id
    }), this.index = t.index, this.pixelRatio = t.pixelRatio, this.sourceLayerIndex = t.sourceLayerIndex;
    var e = this.layers[0]._unevaluatedLayout._values;
    this.textSizeData = ko(this.zoom, e["text-size"]), this.iconSizeData = ko(this.zoom, e["icon-size"]);
    var r = this.layers[0].layout;
    this.sortFeaturesByY = r.get("text-allow-overlap") || r.get("icon-allow-overlap") || r.get("text-ignore-placement") || r.get("icon-ignore-placement"), this.sourceID = t.sourceID;
};
Co.prototype.createArrays = function() {
    this.text = new Io(new Jn(yo.members, this.layers, this.zoom, function(t) {
        return /^text/.test(t)
    })), this.icon = new Io(new Jn(yo.members, this.layers, this.zoom, function(t) {
        return /^icon/.test(t)
    })), this.collisionBox = new Vo(gn, go.members, Sn), this.collisionCircle = new Vo(gn, xo.members, kn), this.glyphOffsetArray = new En, this.lineVertexArray = new Fn;
}, Co.prototype.calculateGlyphDependencies = function(t, e, r, n) {
    for (var i = 0; i < t.length; i++)
        if (e[t.charCodeAt(i)] = !0, r && n) {
            var a = _o[t.charAt(i)];
            a && (e[a.charCodeAt(0)] = !0);
        }
}, Co.prototype.populate = function(t, e) {
    var r = this.layers[0],
        n = r.layout,
        i = n.get("text-font"),
        a = n.get("text-field"),
        o = n.get("icon-image"),
        s = ("constant" !== a.value.kind || a.value.value.toString().length > 0) && ("constant" !== i.value.kind || i.value.value.length > 0),
        u = "constant" !== o.value.kind || o.value.value && o.value.value.length > 0;
    if (this.features = [], s || u) {
        for (var l = e.iconDependencies, p = e.glyphDependencies, h = new Nr(this.zoom), c = 0, f = t; c < f.length; c += 1) {
            var y = f[c],
                d = y.feature,
                m = y.index,
                v = y.sourceLayerIndex;
            if (r._featureFilter(h, d)) {
                var g = void 0;
                s && (g = wo(g = r.getValueAndResolveTokens("text-field", d), r, d));
                var x = void 0;
                if (u && (x = r.getValueAndResolveTokens("icon-image", d)), g || x) {
                    var b = {
                        text: g,
                        icon: x,
                        index: m,
                        sourceLayerIndex: v,
                        geometry: Wn(d),
                        properties: d.properties,
                        type: So[d.type]
                    };
                    if (void 0 !== d.id && (b.id = d.id), this.features.push(b), x && (l[x] = !0), g) {
                        var w = i.evaluate(d, {}).join(","),
                            _ = p[w] = p[w] || {},
                            A = "map" === n.get("text-rotation-alignment") && "point" !== n.get("symbol-placement");
                        if (g instanceof ht)
                            for (var k = 0, S = g.sections; k < S.length; k += 1) {
                                var z = S[k],
                                    M = Tr(g.toString()),
                                    B = z.fontStack || w,
                                    I = p[B] = p[B] || {};
                                this.calculateGlyphDependencies(z.text, I, A, M);
                            } else {
                                var V = Tr(g);
                                this.calculateGlyphDependencies(g, _, A, V);
                            }
                    }
                }
            }
        }
        "line" === n.get("symbol-placement") && (this.features = function(t) {
            var e = {},
                r = {},
                n = [],
                i = 0;

            function a(e) {
                n.push(t[e]), i++;
            }

            function o(t, e, i) {
                var a = r[t];
                return delete r[t], r[e] = a, n[a].geometry[0].pop(), n[a].geometry[0] = n[a].geometry[0].concat(i[0]), a
            }

            function s(t, r, i) {
                var a = e[r];
                return delete e[r], e[t] = a, n[a].geometry[0].shift(), n[a].geometry[0] = i[0].concat(n[a].geometry[0]), a
            }

            function u(t, e, r) {
                var n = r ? e[0][e[0].length - 1] : e[0][0];
                return t + ":" + n.x + ":" + n.y
            }
            for (var l = 0; l < t.length; l++) {
                var p = t[l],
                    h = p.geometry,
                    c = p.text instanceof ht ? p.text.toString() : p.text;
                if (c) {
                    var f = u(c, h),
                        y = u(c, h, !0);
                    if (f in r && y in e && r[f] !== e[y]) {
                        var d = s(f, y, h),
                            m = o(f, y, n[d].geometry);
                        delete e[f], delete r[y], r[u(c, n[m].geometry, !0)] = m, n[d].geometry = null;
                    } else f in r ? o(f, y, h) : y in e ? s(f, y, h) : (a(l), e[f] = i - 1, r[y] = i - 1);
                } else a(l);
            }
            return n.filter(function(t) {
                return t.geometry
            })
        }(this.features));
    }
}, Co.prototype.update = function(t, e) {
    this.stateDependentLayers.length && (this.text.programConfigurations.updatePaintArrays(t, e, this.layers), this.icon.programConfigurations.updatePaintArrays(t, e, this.layers));
}, Co.prototype.isEmpty = function() {
    return 0 === this.symbolInstances.length
}, Co.prototype.uploadPending = function() {
    return !this.uploaded || this.text.programConfigurations.needsUpload || this.icon.programConfigurations.needsUpload
}, Co.prototype.upload = function(t) {
    this.uploaded || (this.collisionBox.upload(t), this.collisionCircle.upload(t)), this.text.upload(t, this.sortFeaturesByY, !this.uploaded, this.text.programConfigurations.needsUpload), this.icon.upload(t, this.sortFeaturesByY, !this.uploaded, this.icon.programConfigurations.needsUpload), this.uploaded = !0;
}, Co.prototype.destroy = function() {
    this.text.destroy(), this.icon.destroy(), this.collisionBox.destroy(), this.collisionCircle.destroy();
}, Co.prototype.addToLineVertexArray = function(t, e) {
    var r = this.lineVertexArray.length;
    if (void 0 !== t.segment) {
        for (var n = t.dist(e[t.segment + 1]), i = t.dist(e[t.segment]), a = {}, o = t.segment + 1; o < e.length; o++) a[o] = {
            x: e[o].x,
            y: e[o].y,
            tileUnitDistanceFromAnchor: n
        }, o < e.length - 1 && (n += e[o + 1].dist(e[o]));
        for (var s = t.segment || 0; s >= 0; s--) a[s] = {
            x: e[s].x,
            y: e[s].y,
            tileUnitDistanceFromAnchor: i
        }, s > 0 && (i += e[s - 1].dist(e[s]));
        for (var u = 0; u < e.length; u++) {
            var l = a[u];
            this.lineVertexArray.emplaceBack(l.x, l.y, l.tileUnitDistanceFromAnchor);
        }
    }
    return {
        lineStartIndex: r,
        lineLength: this.lineVertexArray.length - r
    }
}, Co.prototype.addSymbols = function(t, e, r, n, i, a, o, s, u, l) {
    for (var p = t.indexArray, h = t.layoutVertexArray, c = t.dynamicLayoutVertexArray, f = t.segments.prepareSegment(4 * e.length, t.layoutVertexArray, t.indexArray), y = this.glyphOffsetArray.length, d = f.vertexLength, m = 0, v = e; m < v.length; m += 1) {
        var g = v[m],
            x = g.tl,
            b = g.tr,
            w = g.bl,
            _ = g.br,
            A = g.tex,
            k = f.vertexLength,
            S = g.glyphOffset[1];
        Mo(h, s.x, s.y, x.x, S + x.y, A.x, A.y, r), Mo(h, s.x, s.y, b.x, S + b.y, A.x + A.w, A.y, r), Mo(h, s.x, s.y, w.x, S + w.y, A.x, A.y + A.h, r), Mo(h, s.x, s.y, _.x, S + _.y, A.x + A.w, A.y + A.h, r), Bo(c, s, 0), p.emplaceBack(k, k + 1, k + 2), p.emplaceBack(k + 1, k + 2, k + 3), f.vertexLength += 4, f.primitiveLength += 2, this.glyphOffsetArray.emplaceBack(g.glyphOffset[0]);
    }
    t.placedSymbolArray.emplaceBack(s.x, s.y, y, this.glyphOffsetArray.length - y, d, u, l, s.segment, r ? r[0] : 0, r ? r[1] : 0, n[0], n[1], o, !1), t.programConfigurations.populatePaintArrays(t.layoutVertexArray.length, a, a.index);
}, Co.prototype._addCollisionDebugVertex = function(t, e, r, n, i) {
    return e.emplaceBack(0, 0), t.emplaceBack(r.x, r.y, n.x, n.y, Math.round(i.x), Math.round(i.y))
}, Co.prototype.addCollisionDebugVertices = function(t, e, r, n, i, o, s, u) {
    var l = i.segments.prepareSegment(4, i.layoutVertexArray, i.indexArray),
        p = l.vertexLength,
        h = i.layoutVertexArray,
        c = i.collisionVertexArray;
    if (this._addCollisionDebugVertex(h, c, o, s.anchor, new a(t, e)), this._addCollisionDebugVertex(h, c, o, s.anchor, new a(r, e)), this._addCollisionDebugVertex(h, c, o, s.anchor, new a(r, n)), this._addCollisionDebugVertex(h, c, o, s.anchor, new a(t, n)), l.vertexLength += 4, u) {
        var f = i.indexArray;
        f.emplaceBack(p, p + 1, p + 2), f.emplaceBack(p, p + 2, p + 3), l.primitiveLength += 2;
    } else {
        var y = i.indexArray;
        y.emplaceBack(p, p + 1), y.emplaceBack(p + 1, p + 2), y.emplaceBack(p + 2, p + 3), y.emplaceBack(p + 3, p), l.primitiveLength += 4;
    }
}, Co.prototype.generateCollisionDebugBuffers = function() {
    for (var t = 0, e = this.symbolInstances; t < e.length; t += 1) {
        var r = e[t];
        r.textCollisionFeature = {
            boxStartIndex: r.textBoxStartIndex,
            boxEndIndex: r.textBoxEndIndex
        }, r.iconCollisionFeature = {
            boxStartIndex: r.iconBoxStartIndex,
            boxEndIndex: r.iconBoxEndIndex
        };
        for (var n = 0; n < 2; n++) {
            var i = r[0 === n ? "textCollisionFeature" : "iconCollisionFeature"];
            if (i)
                for (var a = i.boxStartIndex; a < i.boxEndIndex; a++) {
                    var o = this.collisionBoxArray.get(a),
                        s = o.x1,
                        u = o.y1,
                        l = o.x2,
                        p = o.y2,
                        h = o.radius > 0;
                    this.addCollisionDebugVertices(s, u, l, p, h ? this.collisionCircle : this.collisionBox, o.anchorPoint, r, h);
                }
        }
    }
}, Co.prototype.deserializeCollisionBoxes = function(t, e, r, n, i) {
    for (var a = {}, o = e; o < r; o++) {
        var s = t.get(o);
        if (0 === s.radius) {
            a.textBox = {
                x1: s.x1,
                y1: s.y1,
                x2: s.x2,
                y2: s.y2,
                anchorPointX: s.anchorPointX,
                anchorPointY: s.anchorPointY
            }, a.textFeatureIndex = s.featureIndex;
            break
        }
        a.textCircles || (a.textCircles = [], a.textFeatureIndex = s.featureIndex);
        a.textCircles.push(s.anchorPointX, s.anchorPointY, s.radius, s.signedDistanceFromAnchor, 1);
    }
    for (var u = n; u < i; u++) {
        var l = t.get(u);
        if (0 === l.radius) {
            a.iconBox = {
                x1: l.x1,
                y1: l.y1,
                x2: l.x2,
                y2: l.y2,
                anchorPointX: l.anchorPointX,
                anchorPointY: l.anchorPointY
            }, a.iconFeatureIndex = l.featureIndex;
            break
        }
    }
    return a
}, Co.prototype.hasTextData = function() {
    return this.text.segments.get().length > 0
}, Co.prototype.hasIconData = function() {
    return this.icon.segments.get().length > 0
}, Co.prototype.hasCollisionBoxData = function() {
    return this.collisionBox.segments.get().length > 0
}, Co.prototype.hasCollisionCircleData = function() {
    return this.collisionCircle.segments.get().length > 0
}, Co.prototype.sortFeatures = function(t) {
    var e = this;
    if (this.sortFeaturesByY && this.sortedAngle !== t && (this.sortedAngle = t, !(this.text.segments.get().length > 1 || this.icon.segments.get().length > 1))) {
        for (var r = [], n = 0; n < this.symbolInstances.length; n++) r.push(n);
        var i = Math.sin(t),
            a = Math.cos(t);
        r.sort(function(t, r) {
            var n = e.symbolInstances[t],
                o = e.symbolInstances[r];
            return (0 | Math.round(i * n.anchor.x + a * n.anchor.y)) - (0 | Math.round(i * o.anchor.x + a * o.anchor.y)) || o.featureIndex - n.featureIndex
        }), this.text.indexArray.clear(), this.icon.indexArray.clear(), this.featureSortOrder = [];
        for (var o = 0, s = r; o < s.length; o += 1) {
            var u = s[o],
                l = e.symbolInstances[u];
            e.featureSortOrder.push(l.featureIndex);
            for (var p = 0, h = l.placedTextSymbolIndices; p < h.length; p += 1)
                for (var c = h[p], f = e.text.placedSymbolArray.get(c), y = f.vertexStartIndex + 4 * f.numGlyphs, d = f.vertexStartIndex; d < y; d += 4) e.text.indexArray.emplaceBack(d, d + 1, d + 2), e.text.indexArray.emplaceBack(d + 1, d + 2, d + 3);
            var m = e.icon.placedSymbolArray.get(u);
            if (m.numGlyphs) {
                var v = m.vertexStartIndex;
                e.icon.indexArray.emplaceBack(v, v + 1, v + 2), e.icon.indexArray.emplaceBack(v + 1, v + 2, v + 3);
            }
        }
        this.text.indexBuffer && this.text.indexBuffer.updateData(this.text.indexArray), this.icon.indexBuffer && this.icon.indexBuffer.updateData(this.icon.indexArray);
    }
}, zr("SymbolBucket", Co, {
    omit: ["layers", "collisionBoxArray", "features", "compareText"],
    shallow: ["symbolInstances"]
}), Co.MAX_GLYPHS = 65535, Co.addDynamicAttributes = Bo;
var To = new rn({
        "symbol-placement": new Wr(O.layout_symbol["symbol-placement"]),
        "symbol-spacing": new Wr(O.layout_symbol["symbol-spacing"]),
        "symbol-avoid-edges": new Wr(O.layout_symbol["symbol-avoid-edges"]),
        "icon-allow-overlap": new Wr(O.layout_symbol["icon-allow-overlap"]),
        "icon-ignore-placement": new Wr(O.layout_symbol["icon-ignore-placement"]),
        "icon-optional": new Wr(O.layout_symbol["icon-optional"]),
        "icon-rotation-alignment": new Wr(O.layout_symbol["icon-rotation-alignment"]),
        "icon-size": new Qr(O.layout_symbol["icon-size"]),
        "icon-text-fit": new Wr(O.layout_symbol["icon-text-fit"]),
        "icon-text-fit-padding": new Wr(O.layout_symbol["icon-text-fit-padding"]),
        "icon-image": new Qr(O.layout_symbol["icon-image"]),
        "icon-rotate": new Qr(O.layout_symbol["icon-rotate"]),
        "icon-padding": new Wr(O.layout_symbol["icon-padding"]),
        "icon-keep-upright": new Wr(O.layout_symbol["icon-keep-upright"]),
        "icon-offset": new Qr(O.layout_symbol["icon-offset"]),
        "icon-anchor": new Qr(O.layout_symbol["icon-anchor"]),
        "icon-pitch-alignment": new Wr(O.layout_symbol["icon-pitch-alignment"]),
        "text-pitch-alignment": new Wr(O.layout_symbol["text-pitch-alignment"]),
        "text-rotation-alignment": new Wr(O.layout_symbol["text-rotation-alignment"]),
        "text-field": new Qr(O.layout_symbol["text-field"]),
        "text-font": new Qr(O.layout_symbol["text-font"]),
        "text-size": new Qr(O.layout_symbol["text-size"]),
        "text-max-width": new Qr(O.layout_symbol["text-max-width"]),
        "text-line-height": new Wr(O.layout_symbol["text-line-height"]),
        "text-letter-spacing": new Qr(O.layout_symbol["text-letter-spacing"]),
        "text-justify": new Qr(O.layout_symbol["text-justify"]),
        "text-anchor": new Qr(O.layout_symbol["text-anchor"]),
        "text-max-angle": new Wr(O.layout_symbol["text-max-angle"]),
        "text-rotate": new Qr(O.layout_symbol["text-rotate"]),
        "text-padding": new Wr(O.layout_symbol["text-padding"]),
        "text-keep-upright": new Wr(O.layout_symbol["text-keep-upright"]),
        "text-transform": new Qr(O.layout_symbol["text-transform"]),
        "text-offset": new Qr(O.layout_symbol["text-offset"]),
        "text-allow-overlap": new Wr(O.layout_symbol["text-allow-overlap"]),
        "text-ignore-placement": new Wr(O.layout_symbol["text-ignore-placement"]),
        "text-optional": new Wr(O.layout_symbol["text-optional"])
    }),
    Eo = {
        paint: new rn({
            "icon-opacity": new Qr(O.paint_symbol["icon-opacity"]),
            "icon-color": new Qr(O.paint_symbol["icon-color"]),
            "icon-halo-color": new Qr(O.paint_symbol["icon-halo-color"]),
            "icon-halo-width": new Qr(O.paint_symbol["icon-halo-width"]),
            "icon-halo-blur": new Qr(O.paint_symbol["icon-halo-blur"]),
            "icon-translate": new Wr(O.paint_symbol["icon-translate"]),
            "icon-translate-anchor": new Wr(O.paint_symbol["icon-translate-anchor"]),
            "text-opacity": new Qr(O.paint_symbol["text-opacity"]),
            "text-color": new Qr(O.paint_symbol["text-color"]),
            "text-halo-color": new Qr(O.paint_symbol["text-halo-color"]),
            "text-halo-width": new Qr(O.paint_symbol["text-halo-width"]),
            "text-halo-blur": new Qr(O.paint_symbol["text-halo-blur"]),
            "text-translate": new Wr(O.paint_symbol["text-translate"]),
            "text-translate-anchor": new Wr(O.paint_symbol["text-translate-anchor"])
        }),
        layout: To
    },
    Po = function(t) {
        function e(e) {
            t.call(this, e, Eo);
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.recalculate = function(e) {
            t.prototype.recalculate.call(this, e), "auto" === this.layout.get("icon-rotation-alignment") && ("point" !== this.layout.get("symbol-placement") ? this.layout._values["icon-rotation-alignment"] = "map" : this.layout._values["icon-rotation-alignment"] = "viewport"), "auto" === this.layout.get("text-rotation-alignment") && ("point" !== this.layout.get("symbol-placement") ? this.layout._values["text-rotation-alignment"] = "map" : this.layout._values["text-rotation-alignment"] = "viewport"), "auto" === this.layout.get("text-pitch-alignment") && (this.layout._values["text-pitch-alignment"] = this.layout.get("text-rotation-alignment")), "auto" === this.layout.get("icon-pitch-alignment") && (this.layout._values["icon-pitch-alignment"] = this.layout.get("icon-rotation-alignment"));
        }, e.prototype.getValueAndResolveTokens = function(t, e) {
            var r, n = this.layout.get(t).evaluate(e, {}),
                i = this._unevaluatedLayout._values[t];
            return i.isDataDriven() || Pe(i.value) ? n : (r = e.properties, n.replace(/{([^{}]+)}/g, function(t, e) {
                return e in r ? String(r[e]) : ""
            }))
        }, e.prototype.createBucket = function(t) {
            return new Co(t)
        }, e.prototype.queryRadius = function() {
            return 0
        }, e.prototype.queryIntersectsFeature = function() {
            return !1
        }, e
    }(nn),
    Fo = {
        paint: new rn({
            "background-color": new Wr(O.paint_background["background-color"]),
            "background-pattern": new tn(O.paint_background["background-pattern"]),
            "background-opacity": new Wr(O.paint_background["background-opacity"])
        })
    },
    Lo = function(t) {
        function e(e) {
            t.call(this, e, Fo);
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(nn),
    Oo = {
        paint: new rn({
            "raster-opacity": new Wr(O.paint_raster["raster-opacity"]),
            "raster-hue-rotate": new Wr(O.paint_raster["raster-hue-rotate"]),
            "raster-brightness-min": new Wr(O.paint_raster["raster-brightness-min"]),
            "raster-brightness-max": new Wr(O.paint_raster["raster-brightness-max"]),
            "raster-saturation": new Wr(O.paint_raster["raster-saturation"]),
            "raster-contrast": new Wr(O.paint_raster["raster-contrast"]),
            "raster-resampling": new Wr(O.paint_raster["raster-resampling"]),
            "raster-fade-duration": new Wr(O.paint_raster["raster-fade-duration"])
        })
    },
    Do = {
        circle: qi,
        heatmap: Ki,
        hillshade: $i,
        fill: Pa,
        "fill-extrusion": Na,
        line: co,
        symbol: Po,
        background: Lo,
        raster: function(t) {
            function e(e) {
                t.call(this, e, Oo);
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
        }(nn)
    };

function qo(t, e, r) {
    r = r || {}, this.w = t || 64, this.h = e || 64, this.autoResize = !!r.autoResize, this.shelves = [], this.freebins = [], this.stats = {}, this.bins = {}, this.maxId = 0;
}

function jo(t, e, r) {
    this.x = 0, this.y = t, this.w = this.free = e, this.h = r;
}
qo.prototype.pack = function(t, e) {
    t = [].concat(t), e = e || {};
    for (var r, n, i, a, o = [], s = 0; s < t.length; s++)
        if (r = t[s].w || t[s].width, n = t[s].h || t[s].height, i = t[s].id, r && n) {
            if (!(a = this.packOne(r, n, i))) continue;
            e.inPlace && (t[s].x = a.x, t[s].y = a.y, t[s].id = a.id), o.push(a);
        }
    return this.shrink(), o
}, qo.prototype.packOne = function(t, e, r) {
    var n, i, a, o, s, u, l, p, h = {
            freebin: -1,
            shelf: -1,
            waste: 1 / 0
        },
        c = 0;
    if ("string" == typeof r || "number" == typeof r) {
        if (n = this.getBin(r)) return this.ref(n), n;
        "number" == typeof r && (this.maxId = Math.max(r, this.maxId));
    } else r = ++this.maxId;
    for (o = 0; o < this.freebins.length; o++) {
        if (e === (n = this.freebins[o]).maxh && t === n.maxw) return this.allocFreebin(o, t, e, r);
        e > n.maxh || t > n.maxw || e <= n.maxh && t <= n.maxw && (a = n.maxw * n.maxh - t * e) < h.waste && (h.waste = a, h.freebin = o);
    }
    for (o = 0; o < this.shelves.length; o++)
        if (c += (i = this.shelves[o]).h, !(t > i.free)) {
            if (e === i.h) return this.allocShelf(o, t, e, r);
            e > i.h || e < i.h && (a = (i.h - e) * t) < h.waste && (h.freebin = -1, h.waste = a, h.shelf = o);
        }
    return -1 !== h.freebin ? this.allocFreebin(h.freebin, t, e, r) : -1 !== h.shelf ? this.allocShelf(h.shelf, t, e, r) : e <= this.h - c && t <= this.w ? (i = new jo(c, this.w, e), this.allocShelf(this.shelves.push(i) - 1, t, e, r)) : this.autoResize ? (s = u = this.h, ((l = p = this.w) <= s || t > l) && (p = 2 * Math.max(t, l)), (s < l || e > s) && (u = 2 * Math.max(e, s)), this.resize(p, u), this.packOne(t, e, r)) : null
}, qo.prototype.allocFreebin = function(t, e, r, n) {
    var i = this.freebins.splice(t, 1)[0];
    return i.id = n, i.w = e, i.h = r, i.refcount = 0, this.bins[n] = i, this.ref(i), i
}, qo.prototype.allocShelf = function(t, e, r, n) {
    var i = this.shelves[t].alloc(e, r, n);
    return this.bins[n] = i, this.ref(i), i
}, qo.prototype.shrink = function() {
    if (this.shelves.length > 0) {
        for (var t = 0, e = 0, r = 0; r < this.shelves.length; r++) {
            var n = this.shelves[r];
            e += n.h, t = Math.max(n.w - n.free, t);
        }
        this.resize(t, e);
    }
}, qo.prototype.getBin = function(t) {
    return this.bins[t]
}, qo.prototype.ref = function(t) {
    if (1 == ++t.refcount) {
        var e = t.h;
        this.stats[e] = 1 + (0 | this.stats[e]);
    }
    return t.refcount
}, qo.prototype.unref = function(t) {
    return 0 === t.refcount ? 0 : (0 == --t.refcount && (this.stats[t.h]--, delete this.bins[t.id], this.freebins.push(t)), t.refcount)
}, qo.prototype.clear = function() {
    this.shelves = [], this.freebins = [], this.stats = {}, this.bins = {}, this.maxId = 0;
}, qo.prototype.resize = function(t, e) {
    this.w = t, this.h = e;
    for (var r = 0; r < this.shelves.length; r++) this.shelves[r].resize(t);
    return !0
}, jo.prototype.alloc = function(t, e, r) {
    if (t > this.free || e > this.h) return null;
    var n = this.x;
    return this.x += t, this.free -= t, new function(t, e, r, n, i, a, o) {
        this.id = t, this.x = e, this.y = r, this.w = n, this.h = i, this.maxw = a || n, this.maxh = o || i, this.refcount = 0;
    }(r, n, this.y, t, e, t, this.h)
}, jo.prototype.resize = function(t) {
    return this.free += t - this.w, this.w = t, !0
};
var Uo = function(t, e) {
        var r = e.pixelRatio;
        this.paddedRect = t, this.pixelRatio = r;
    },
    Ro = {
        tl: {
            configurable: !0
        },
        br: {
            configurable: !0
        },
        displaySize: {
            configurable: !0
        }
    };
Ro.tl.get = function() {
    return [this.paddedRect.x + 1, this.paddedRect.y + 1]
}, Ro.br.get = function() {
    return [this.paddedRect.x + this.paddedRect.w - 1, this.paddedRect.y + this.paddedRect.h - 1]
}, Ro.displaySize.get = function() {
    return [(this.paddedRect.w - 2) / this.pixelRatio, (this.paddedRect.h - 2) / this.pixelRatio]
}, Object.defineProperties(Uo.prototype, Ro);
var No = function(t) {
    var e = {},
        r = new qo(0, 0, {
            autoResize: !0
        }),
        n = [];
    for (var i in t) {
        var a = t[i],
            o = {
                x: 0,
                y: 0,
                w: a.data.width + 2,
                h: a.data.height + 2
            };
        n.push(o), e[i] = new Uo(o, a);
    }
    r.pack(n, {
        inPlace: !0
    });
    var s = new Xi({
        width: r.w,
        height: r.h
    });
    for (var u in t) {
        var l = t[u],
            p = e[u].paddedRect;
        Xi.copy(l.data, s, {
            x: 0,
            y: 0
        }, {
            x: p.x + 1,
            y: p.y + 1
        }, l.data);
    }
    this.image = s, this.positions = e;
};
zr("ImagePosition", Uo), zr("ImageAtlas", No);
var Zo = self.HTMLImageElement,
    Ho = self.HTMLCanvasElement,
    Xo = self.HTMLVideoElement,
    Jo = self.ImageData,
    Go = function(t, e, r, n) {
        this.context = t, this.format = r, this.texture = t.gl.createTexture(), this.update(e, n);
    };
Go.prototype.update = function(t, e) {
    var r = t.width,
        n = t.height,
        i = !this.size || this.size[0] !== r || this.size[1] !== n,
        a = this.context,
        o = a.gl;
    this.useMipmap = Boolean(e && e.useMipmap), o.bindTexture(o.TEXTURE_2D, this.texture), i ? (this.size = [r, n], a.pixelStoreUnpack.set(1), this.format !== o.RGBA || e && !1 === e.premultiply || a.pixelStoreUnpackPremultiplyAlpha.set(!0), t instanceof Zo || t instanceof Ho || t instanceof Xo || t instanceof Jo ? o.texImage2D(o.TEXTURE_2D, 0, this.format, this.format, o.UNSIGNED_BYTE, t) : o.texImage2D(o.TEXTURE_2D, 0, this.format, r, n, 0, this.format, o.UNSIGNED_BYTE, t.data)) : t instanceof Zo || t instanceof Ho || t instanceof Xo || t instanceof Jo ? o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, o.RGBA, o.UNSIGNED_BYTE, t) : o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, r, n, o.RGBA, o.UNSIGNED_BYTE, t.data), this.useMipmap && this.isSizePowerOfTwo() && o.generateMipmap(o.TEXTURE_2D);
}, Go.prototype.bind = function(t, e, r) {
    var n = this.context.gl;
    n.bindTexture(n.TEXTURE_2D, this.texture), r !== n.LINEAR_MIPMAP_NEAREST || this.isSizePowerOfTwo() || (r = n.LINEAR), t !== this.filter && (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, r || t), this.filter = t), e !== this.wrap && (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, e), this.wrap = e);
}, Go.prototype.isSizePowerOfTwo = function() {
    return this.size[0] === this.size[1] && Math.log(this.size[0]) / Math.LN2 % 1 == 0
}, Go.prototype.destroy = function() {
    this.context.gl.deleteTexture(this.texture), this.texture = null;
};
var Ko = function(t, e, r, n, i) {
        var a, o, s = 8 * i - n - 1,
            u = (1 << s) - 1,
            l = u >> 1,
            p = -7,
            h = r ? i - 1 : 0,
            c = r ? -1 : 1,
            f = t[e + h];
        for (h += c, a = f & (1 << -p) - 1, f >>= -p, p += s; p > 0; a = 256 * a + t[e + h], h += c, p -= 8);
        for (o = a & (1 << -p) - 1, a >>= -p, p += n; p > 0; o = 256 * o + t[e + h], h += c, p -= 8);
        if (0 === a) a = 1 - l;
        else {
            if (a === u) return o ? NaN : 1 / 0 * (f ? -1 : 1);
            o += Math.pow(2, n), a -= l;
        }
        return (f ? -1 : 1) * o * Math.pow(2, a - n)
    },
    Yo = function(t, e, r, n, i, a) {
        var o, s, u, l = 8 * a - i - 1,
            p = (1 << l) - 1,
            h = p >> 1,
            c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            f = n ? 0 : a - 1,
            y = n ? 1 : -1,
            d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = p) : (o = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), (e += o + h >= 1 ? c / u : c * Math.pow(2, 1 - h)) * u >= 2 && (o++, u /= 2), o + h >= p ? (s = 0, o = p) : o + h >= 1 ? (s = (e * u - 1) * Math.pow(2, i), o += h) : (s = e * Math.pow(2, h - 1) * Math.pow(2, i), o = 0)); i >= 8; t[r + f] = 255 & s, f += y, s /= 256, i -= 8);
        for (o = o << i | s, l += i; l > 0; t[r + f] = 255 & o, f += y, o /= 256, l -= 8);
        t[r + f - y] |= 128 * d;
    },
    $o = Wo;

function Wo(t) {
    this.buf = ArrayBuffer.isView && ArrayBuffer.isView(t) ? t : new Uint8Array(t || 0), this.pos = 0, this.type = 0, this.length = this.buf.length;
}
Wo.Varint = 0, Wo.Fixed64 = 1, Wo.Bytes = 2, Wo.Fixed32 = 5;

function Qo(t) {
    return t.type === Wo.Bytes ? t.readVarint() + t.pos : t.pos + 1
}

function ts(t, e, r) {
    return r ? 4294967296 * e + (t >>> 0) : 4294967296 * (e >>> 0) + (t >>> 0)
}

function es(t, e, r) {
    var n = e <= 16383 ? 1 : e <= 2097151 ? 2 : e <= 268435455 ? 3 : Math.ceil(Math.log(e) / (7 * Math.LN2));
    r.realloc(n);
    for (var i = r.pos - 1; i >= t; i--) r.buf[i + n] = r.buf[i];
}

function rs(t, e) {
    for (var r = 0; r < t.length; r++) e.writeVarint(t[r]);
}

function ns(t, e) {
    for (var r = 0; r < t.length; r++) e.writeSVarint(t[r]);
}

function is(t, e) {
    for (var r = 0; r < t.length; r++) e.writeFloat(t[r]);
}

function as(t, e) {
    for (var r = 0; r < t.length; r++) e.writeDouble(t[r]);
}

function os(t, e) {
    for (var r = 0; r < t.length; r++) e.writeBoolean(t[r]);
}

function ss(t, e) {
    for (var r = 0; r < t.length; r++) e.writeFixed32(t[r]);
}

function us(t, e) {
    for (var r = 0; r < t.length; r++) e.writeSFixed32(t[r]);
}

function ls(t, e) {
    for (var r = 0; r < t.length; r++) e.writeFixed64(t[r]);
}

function ps(t, e) {
    for (var r = 0; r < t.length; r++) e.writeSFixed64(t[r]);
}

function hs(t, e) {
    return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) + 16777216 * t[e + 3]
}

function cs(t, e, r) {
    t[r] = e, t[r + 1] = e >>> 8, t[r + 2] = e >>> 16, t[r + 3] = e >>> 24;
}

function fs(t, e) {
    return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) + (t[e + 3] << 24)
}
Wo.prototype = {
    destroy: function() {
        this.buf = null;
    },
    readFields: function(t, e, r) {
        for (r = r || this.length; this.pos < r;) {
            var n = this.readVarint(),
                i = n >> 3,
                a = this.pos;
            this.type = 7 & n, t(i, e, this), this.pos === a && this.skip(n);
        }
        return e
    },
    readMessage: function(t, e) {
        return this.readFields(t, e, this.readVarint() + this.pos)
    },
    readFixed32: function() {
        var t = hs(this.buf, this.pos);
        return this.pos += 4, t
    },
    readSFixed32: function() {
        var t = fs(this.buf, this.pos);
        return this.pos += 4, t
    },
    readFixed64: function() {
        var t = hs(this.buf, this.pos) + 4294967296 * hs(this.buf, this.pos + 4);
        return this.pos += 8, t
    },
    readSFixed64: function() {
        var t = hs(this.buf, this.pos) + 4294967296 * fs(this.buf, this.pos + 4);
        return this.pos += 8, t
    },
    readFloat: function() {
        var t = Ko(this.buf, this.pos, !0, 23, 4);
        return this.pos += 4, t
    },
    readDouble: function() {
        var t = Ko(this.buf, this.pos, !0, 52, 8);
        return this.pos += 8, t
    },
    readVarint: function(t) {
        var e, r, n = this.buf;
        return e = 127 & (r = n[this.pos++]), r < 128 ? e : (e |= (127 & (r = n[this.pos++])) << 7, r < 128 ? e : (e |= (127 & (r = n[this.pos++])) << 14, r < 128 ? e : (e |= (127 & (r = n[this.pos++])) << 21, r < 128 ? e : function(t, e, r) {
            var n, i, a = r.buf;
            if (i = a[r.pos++], n = (112 & i) >> 4, i < 128) return ts(t, n, e);
            if (i = a[r.pos++], n |= (127 & i) << 3, i < 128) return ts(t, n, e);
            if (i = a[r.pos++], n |= (127 & i) << 10, i < 128) return ts(t, n, e);
            if (i = a[r.pos++], n |= (127 & i) << 17, i < 128) return ts(t, n, e);
            if (i = a[r.pos++], n |= (127 & i) << 24, i < 128) return ts(t, n, e);
            if (i = a[r.pos++], n |= (1 & i) << 31, i < 128) return ts(t, n, e);
            throw new Error("Expected varint not more than 10 bytes")
        }(e |= (15 & (r = n[this.pos])) << 28, t, this))))
    },
    readVarint64: function() {
        return this.readVarint(!0)
    },
    readSVarint: function() {
        var t = this.readVarint();
        return t % 2 == 1 ? (t + 1) / -2 : t / 2
    },
    readBoolean: function() {
        return Boolean(this.readVarint())
    },
    readString: function() {
        var t = this.readVarint() + this.pos,
            e = function(t, e, r) {
                var n = "",
                    i = e;
                for (; i < r;) {
                    var a, o, s, u = t[i],
                        l = null,
                        p = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                    if (i + p > r) break;
                    1 === p ? u < 128 && (l = u) : 2 === p ? 128 == (192 & (a = t[i + 1])) && (l = (31 & u) << 6 | 63 & a) <= 127 && (l = null) : 3 === p ? (a = t[i + 1], o = t[i + 2], 128 == (192 & a) && 128 == (192 & o) && ((l = (15 & u) << 12 | (63 & a) << 6 | 63 & o) <= 2047 || l >= 55296 && l <= 57343) && (l = null)) : 4 === p && (a = t[i + 1], o = t[i + 2], s = t[i + 3], 128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && ((l = (15 & u) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) <= 65535 || l >= 1114112) && (l = null)), null === l ? (l = 65533, p = 1) : l > 65535 && (l -= 65536, n += String.fromCharCode(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), n += String.fromCharCode(l), i += p;
                }
                return n
            }(this.buf, this.pos, t);
        return this.pos = t, e
    },
    readBytes: function() {
        var t = this.readVarint() + this.pos,
            e = this.buf.subarray(this.pos, t);
        return this.pos = t, e
    },
    readPackedVarint: function(t, e) {
        var r = Qo(this);
        for (t = t || []; this.pos < r;) t.push(this.readVarint(e));
        return t
    },
    readPackedSVarint: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readSVarint());
        return t
    },
    readPackedBoolean: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readBoolean());
        return t
    },
    readPackedFloat: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readFloat());
        return t
    },
    readPackedDouble: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readDouble());
        return t
    },
    readPackedFixed32: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readFixed32());
        return t
    },
    readPackedSFixed32: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readSFixed32());
        return t
    },
    readPackedFixed64: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readFixed64());
        return t
    },
    readPackedSFixed64: function(t) {
        var e = Qo(this);
        for (t = t || []; this.pos < e;) t.push(this.readSFixed64());
        return t
    },
    skip: function(t) {
        var e = 7 & t;
        if (e === Wo.Varint)
            for (; this.buf[this.pos++] > 127;);
        else if (e === Wo.Bytes) this.pos = this.readVarint() + this.pos;
        else if (e === Wo.Fixed32) this.pos += 4;
        else {
            if (e !== Wo.Fixed64){ console.log( "Error: Unimplemented type: " + e ); return }	//throw new Error("Unimplemented type: " + e);
            this.pos += 8;
        }
    },
    writeTag: function(t, e) {
        this.writeVarint(t << 3 | e);
    },
    realloc: function(t) {
        for (var e = this.length || 16; e < this.pos + t;) e *= 2;
        if (e !== this.length) {
            var r = new Uint8Array(e);
            r.set(this.buf), this.buf = r, this.length = e;
        }
    },
    finish: function() {
        return this.length = this.pos, this.pos = 0, this.buf.subarray(0, this.length)
    },
    writeFixed32: function(t) {
        this.realloc(4), cs(this.buf, t, this.pos), this.pos += 4;
    },
    writeSFixed32: function(t) {
        this.realloc(4), cs(this.buf, t, this.pos), this.pos += 4;
    },
    writeFixed64: function(t) {
        this.realloc(8), cs(this.buf, -1 & t, this.pos), cs(this.buf, Math.floor(t * (1 / 4294967296)), this.pos + 4), this.pos += 8;
    },
    writeSFixed64: function(t) {
        this.realloc(8), cs(this.buf, -1 & t, this.pos), cs(this.buf, Math.floor(t * (1 / 4294967296)), this.pos + 4), this.pos += 8;
    },
    writeVarint: function(t) {
        (t = +t || 0) > 268435455 || t < 0 ? function(t, e) {
            var r, n;
            t >= 0 ? (r = t % 4294967296 | 0, n = t / 4294967296 | 0) : (n = ~(-t / 4294967296), 4294967295 ^ (r = ~(-t % 4294967296)) ? r = r + 1 | 0 : (r = 0, n = n + 1 | 0));
            if (t >= 0x10000000000000000 || t < -0x10000000000000000) throw new Error("Given varint doesn't fit into 10 bytes");
            e.realloc(10),
                function(t, e, r) {
                    r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos] = 127 & t;
                }(r, 0, e),
                function(t, e) {
                    var r = (7 & t) << 4;
                    if (e.buf[e.pos++] |= r | ((t >>>= 3) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    e.buf[e.pos++] = 127 & t;
                }(n, e);
        }(t, this) : (this.realloc(4), this.buf[this.pos++] = 127 & t | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = t >>> 7 & 127))));
    },
    writeSVarint: function(t) {
        this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t);
    },
    writeBoolean: function(t) {
        this.writeVarint(Boolean(t));
    },
    writeString: function(t) {
        t = String(t), this.realloc(4 * t.length), this.pos++;
        var e = this.pos;
        this.pos = function(t, e, r) {
            for (var n, i, a = 0; a < e.length; a++) {
                if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
                    if (!i) {
                        n > 56319 || a + 1 === e.length ? (t[r++] = 239, t[r++] = 191, t[r++] = 189) : i = n;
                        continue
                    }
                    if (n < 56320) {
                        t[r++] = 239, t[r++] = 191, t[r++] = 189, i = n;
                        continue
                    }
                    n = i - 55296 << 10 | n - 56320 | 65536, i = null;
                } else i && (t[r++] = 239, t[r++] = 191, t[r++] = 189, i = null);
                n < 128 ? t[r++] = n : (n < 2048 ? t[r++] = n >> 6 | 192 : (n < 65536 ? t[r++] = n >> 12 | 224 : (t[r++] = n >> 18 | 240, t[r++] = n >> 12 & 63 | 128), t[r++] = n >> 6 & 63 | 128), t[r++] = 63 & n | 128);
            }
            return r
        }(this.buf, t, this.pos);
        var r = this.pos - e;
        r >= 128 && es(e, r, this), this.pos = e - 1, this.writeVarint(r), this.pos += r;
    },
    writeFloat: function(t) {
        this.realloc(4), Yo(this.buf, t, this.pos, !0, 23, 4), this.pos += 4;
    },
    writeDouble: function(t) {
        this.realloc(8), Yo(this.buf, t, this.pos, !0, 52, 8), this.pos += 8;
    },
    writeBytes: function(t) {
        var e = t.length;
        this.writeVarint(e), this.realloc(e);
        for (var r = 0; r < e; r++) this.buf[this.pos++] = t[r];
    },
    writeRawMessage: function(t, e) {
        this.pos++;
        var r = this.pos;
        t(e, this);
        var n = this.pos - r;
        n >= 128 && es(r, n, this), this.pos = r - 1, this.writeVarint(n), this.pos += n;
    },
    writeMessage: function(t, e, r) {
        this.writeTag(t, Wo.Bytes), this.writeRawMessage(e, r);
    },
    writePackedVarint: function(t, e) {
        this.writeMessage(t, rs, e);
    },
    writePackedSVarint: function(t, e) {
        this.writeMessage(t, ns, e);
    },
    writePackedBoolean: function(t, e) {
        this.writeMessage(t, os, e);
    },
    writePackedFloat: function(t, e) {
        this.writeMessage(t, is, e);
    },
    writePackedDouble: function(t, e) {
        this.writeMessage(t, as, e);
    },
    writePackedFixed32: function(t, e) {
        this.writeMessage(t, ss, e);
    },
    writePackedSFixed32: function(t, e) {
        this.writeMessage(t, us, e);
    },
    writePackedFixed64: function(t, e) {
        this.writeMessage(t, ls, e);
    },
    writePackedSFixed64: function(t, e) {
        this.writeMessage(t, ps, e);
    },
    writeBytesField: function(t, e) {
        this.writeTag(t, Wo.Bytes), this.writeBytes(e);
    },
    writeFixed32Field: function(t, e) {
        this.writeTag(t, Wo.Fixed32), this.writeFixed32(e);
    },
    writeSFixed32Field: function(t, e) {
        this.writeTag(t, Wo.Fixed32), this.writeSFixed32(e);
    },
    writeFixed64Field: function(t, e) {
        this.writeTag(t, Wo.Fixed64), this.writeFixed64(e);
    },
    writeSFixed64Field: function(t, e) {
        this.writeTag(t, Wo.Fixed64), this.writeSFixed64(e);
    },
    writeVarintField: function(t, e) {
        this.writeTag(t, Wo.Varint), this.writeVarint(e);
    },
    writeSVarintField: function(t, e) {
        this.writeTag(t, Wo.Varint), this.writeSVarint(e);
    },
    writeStringField: function(t, e) {
        this.writeTag(t, Wo.Bytes), this.writeString(e);
    },
    writeFloatField: function(t, e) {
        this.writeTag(t, Wo.Fixed32), this.writeFloat(e);
    },
    writeDoubleField: function(t, e) {
        this.writeTag(t, Wo.Fixed64), this.writeDouble(e);
    },
    writeBooleanField: function(t, e) {
        this.writeVarintField(t, Boolean(e));
    }
};
var ys = 3;

function ds(t, e, r) {
    1 === t && r.readMessage(ms, e);
}

function ms(t, e, r) {
    if (3 === t) {
        var n = r.readMessage(vs, {}),
            i = n.id,
            a = n.bitmap,
            o = n.width,
            s = n.height,
            u = n.left,
            l = n.top,
            p = n.advance;
        e.push({
            id: i,
            bitmap: new Hi({
                width: o + 2 * ys,
                height: s + 2 * ys
            }, a),
            metrics: {
                width: o,
                height: s,
                left: u,
                top: l,
                advance: p
            }
        });
    }
}

function vs(t, e, r) {
    1 === t ? e.id = r.readVarint() : 2 === t ? e.bitmap = r.readBytes() : 3 === t ? e.width = r.readVarint() : 4 === t ? e.height = r.readVarint() : 5 === t ? e.left = r.readSVarint() : 6 === t ? e.top = r.readSVarint() : 7 === t && (e.advance = r.readVarint());
}
var gs = ys,
    xs = function(t, e, r) {
        this.target = t, this.parent = e, this.mapId = r, this.callbacks = {}, this.callbackID = 0, y(["receive"], this), this.target.addEventListener("message", this.receive, !1);
    };

function bs(t, e, r) {
    var n = 2 * Math.PI * 6378137 / 256 / Math.pow(2, r);
    return [t * n - 2 * Math.PI * 6378137 / 2, e * n - 2 * Math.PI * 6378137 / 2]
}
xs.prototype.send = function(t, e, r, n) {
    var i = r ? this.mapId + ":" + this.callbackID++ : null;
    r && (this.callbacks[i] = r);
    var a = [];
    this.target.postMessage({
        targetMapId: n,
        sourceMapId: this.mapId,
        type: t,
        id: String(i),
        data: Br(e, a)
    }, a);
}, xs.prototype.receive = function(t) {
    var e, r = this,
        n = t.data,
        i = n.id;
    if (!n.targetMapId || this.mapId === n.targetMapId) {
        var a = function(t, e) {
            var n = [];
            r.target.postMessage({
                sourceMapId: r.mapId,
                type: "<response>",
                id: String(i),
                error: t ? Br(t) : null,
                data: Br(e, n)
            }, n);
        };
        if ("<response>" === n.type) e = this.callbacks[n.id], delete this.callbacks[n.id], e && n.error ? e(Ir(n.error)) : e && e(null, Ir(n.data));
        else if (void 0 !== n.id && this.parent[n.type]) this.parent[n.type](n.sourceMapId, Ir(n.data), a);
        else if (void 0 !== n.id && this.parent.getWorkerSource) {
            var o = n.type.split("."),
                s = Ir(n.data);
            this.parent.getWorkerSource(n.sourceMapId, o[0], s.source)[o[1]](s, a);
        } else this.parent[n.type](Ir(n.data));
    }
}, xs.prototype.remove = function() {
    this.target.removeEventListener("message", this.receive, !1);
};
var ws = function(t, e, r) {
    this.z = t, this.x = e, this.y = r, this.key = ks(0, t, e, r);
};
ws.prototype.equals = function(t) {
    return this.z === t.z && this.x === t.x && this.y === t.y
}, ws.prototype.url = function(t, e) {
    var r, n, i, a, o, s = (r = this.x, n = this.y, i = this.z, a = bs(256 * r, 256 * (n = Math.pow(2, i) - n - 1), i), o = bs(256 * (r + 1), 256 * (n + 1), i), a[0] + "," + a[1] + "," + o[0] + "," + o[1]),
        u = function(t, e, r) {
            for (var n, i = "", a = t; a > 0; a--) i += (e & (n = 1 << a - 1) ? 1 : 0) + (r & n ? 2 : 0);
            return i
        }(this.z, this.x, this.y);
    return t[(this.x + this.y) % t.length].replace("{prefix}", (this.x % 16).toString(16) + (this.y % 16).toString(16)).replace("{z}", String(this.z)).replace("{x}", String(this.x)).replace("{y}", String("tms" === e ? Math.pow(2, this.z) - this.y - 1 : this.y)).replace("{quadkey}", u).replace("{bbox-epsg-3857}", s)
};
var _s = function(t, e) {
        this.wrap = t, this.canonical = e, this.key = ks(t, e.z, e.x, e.y);
    },
    As = function(t, e, r, n, i) {
        this.overscaledZ = t, this.wrap = e, this.canonical = new ws(r, +n, +i), this.key = ks(e, t, n, i);
    };

function ks(t, e, r, n) {
    (t *= 2) < 0 && (t = -1 * t - 1);
    var i = 1 << e;
    return 32 * (i * i * t + i * n + r) + e
}
As.prototype.equals = function(t) {
    return this.overscaledZ === t.overscaledZ && this.wrap === t.wrap && this.canonical.equals(t.canonical)
}, As.prototype.scaledTo = function(t) {
    var e = this.canonical.z - t;
    return t > this.canonical.z ? new As(t, this.wrap, this.canonical.z, this.canonical.x, this.canonical.y) : new As(t, this.wrap, t, this.canonical.x >> e, this.canonical.y >> e)
}, As.prototype.isChildOf = function(t) {
    var e = this.canonical.z - t.canonical.z;
    return 0 === t.overscaledZ || t.overscaledZ < this.overscaledZ && t.canonical.x === this.canonical.x >> e && t.canonical.y === this.canonical.y >> e
}, As.prototype.children = function(t) {
    if (this.overscaledZ >= t) return [new As(this.overscaledZ + 1, this.wrap, this.canonical.z, this.canonical.x, this.canonical.y)];
    var e = this.canonical.z + 1,
        r = 2 * this.canonical.x,
        n = 2 * this.canonical.y;
    return [new As(e, this.wrap, e, r, n), new As(e, this.wrap, e, r + 1, n), new As(e, this.wrap, e, r, n + 1), new As(e, this.wrap, e, r + 1, n + 1)]
}, As.prototype.isLessThan = function(t) {
    return this.wrap < t.wrap || !(this.wrap > t.wrap) && (this.overscaledZ < t.overscaledZ || !(this.overscaledZ > t.overscaledZ) && (this.canonical.x < t.canonical.x || !(this.canonical.x > t.canonical.x) && this.canonical.y < t.canonical.y))
}, As.prototype.wrapped = function() {
    return new As(this.overscaledZ, 0, this.canonical.z, this.canonical.x, this.canonical.y)
}, As.prototype.unwrapTo = function(t) {
    return new As(this.overscaledZ, t, this.canonical.z, this.canonical.x, this.canonical.y)
}, As.prototype.overscaleFactor = function() {
    return Math.pow(2, this.overscaledZ - this.canonical.z)
}, As.prototype.toUnwrapped = function() {
    return new _s(this.wrap, this.canonical)
}, As.prototype.toString = function() {
    return this.overscaledZ + "/" + this.canonical.x + "/" + this.canonical.y
}, As.prototype.toCoordinate = function() {
    return new i(this.canonical.x + Math.pow(2, this.wrap), this.canonical.y, this.canonical.z)
}, zr("CanonicalTileID", ws), zr("OverscaledTileID", As, {
    omit: ["posMatrix"]
});
var Ss = function(t, e, r) {
    if (this.uid = t, e.height !== e.width) throw new RangeError("DEM tiles must be square");
    if (r && "mapbox" !== r && "terrarium" !== r) return b('"' + r + '" is not a valid encoding type. Valid types include "mapbox" and "terrarium".');
    var n = this.dim = e.height;
    this.border = Math.max(Math.ceil(e.height / 2), 1), this.stride = this.dim + 2 * this.border, this.data = new Int32Array(this.stride * this.stride);
    for (var i = e.data, a = "terrarium" === r ? this._unpackTerrarium : this._unpackMapbox, o = 0; o < n; o++)
        for (var s = 0; s < n; s++) {
            var u = 4 * (o * n + s);
            this.set(s, o, a(i[u], i[u + 1], i[u + 2]));
        }
    for (var l = 0; l < n; l++) this.set(-1, l, this.get(0, l)), this.set(n, l, this.get(n - 1, l)), this.set(l, -1, this.get(l, 0)), this.set(l, n, this.get(l, n - 1));
    this.set(-1, -1, this.get(0, 0)), this.set(n, -1, this.get(n - 1, 0)), this.set(-1, n, this.get(0, n - 1)), this.set(n, n, this.get(n - 1, n - 1));
};
Ss.prototype.set = function(t, e, r) {
    this.data[this._idx(t, e)] = r + 65536;
}, Ss.prototype.get = function(t, e) {
    return this.data[this._idx(t, e)] - 65536
}, Ss.prototype._idx = function(t, e) {
    if (t < -this.border || t >= this.dim + this.border || e < -this.border || e >= this.dim + this.border) throw new RangeError("out of range source coordinates for DEM data");
    return (e + this.border) * this.stride + (t + this.border)
}, Ss.prototype._unpackMapbox = function(t, e, r) {
    return (256 * t * 256 + 256 * e + r) / 10 - 1e4
}, Ss.prototype._unpackTerrarium = function(t, e, r) {
    return 256 * t + e + r / 256 - 32768
}, Ss.prototype.getPixels = function() {
    return new Xi({
        width: this.dim + 2 * this.border,
        height: this.dim + 2 * this.border
    }, new Uint8Array(this.data.buffer))
}, Ss.prototype.backfillBorder = function(t, e, r) {
    if (this.dim !== t.dim) throw new Error("dem dimension mismatch");
    var n = e * this.dim,
        i = e * this.dim + this.dim,
        a = r * this.dim,
        o = r * this.dim + this.dim;
    switch (e) {
        case -1:
            n = i - 1;
            break;
        case 1:
            i = n + 1;
    }
    switch (r) {
        case -1:
            a = o - 1;
            break;
        case 1:
            o = a + 1;
    }
    for (var s = p(n, -this.border, this.dim + this.border), u = p(i, -this.border, this.dim + this.border), l = p(a, -this.border, this.dim + this.border), h = p(o, -this.border, this.dim + this.border), c = -e * this.dim, f = -r * this.dim, y = l; y < h; y++)
        for (var d = s; d < u; d++) this.set(d, y, t.get(d + c, y + f));
}, zr("DEMData", Ss);
var zs = un([{
    name: "a_pos",
    type: "Int16",
    components: 2
}, {
    name: "a_texture_pos",
    type: "Int16",
    components: 2
}]);
var Ms = function(t) {
    this._stringToNumber = {}, this._numberToString = [];
    for (var e = 0; e < t.length; e++) {
        var r = t[e];
        this._stringToNumber[r] = e, this._numberToString[e] = r;
    }
};
Ms.prototype.encode = function(t) {
    return this._stringToNumber[t]
}, Ms.prototype.decode = function(t) {
    return this._numberToString[t]
};
var Bs = function(t, e, r, n) {
        this.type = "Feature", this._vectorTileFeature = t, t._z = e, t._x = r, t._y = n, this.properties = t.properties, null != t.id && (this.id = t.id);
    },
    Is = {
        geometry: {
            configurable: !0
        }
    };
Is.geometry.get = function() {
    return void 0 === this._geometry && (this._geometry = this._vectorTileFeature.toGeoJSON(this._vectorTileFeature._x, this._vectorTileFeature._y, this._vectorTileFeature._z).geometry), this._geometry
}, Is.geometry.set = function(t) {
    this._geometry = t;
}, Bs.prototype.toJSON = function() {
    var t = {
        geometry: this.geometry
    };
    for (var e in this) "_geometry" !== e && "_vectorTileFeature" !== e && (t[e] = this[e]);
    return t
}, Object.defineProperties(Bs.prototype, Is);
var Vs = function() {
    this.state = {}, this.stateChanges = {};
};
Vs.prototype.updateState = function(t, e, r) {
    e = String(e), this.stateChanges[t] = this.stateChanges[t] || {}, this.stateChanges[t][e] = this.stateChanges[t][e] || {}, h(this.stateChanges[t][e], r);
}, Vs.prototype.getState = function(t, e) {
    e = String(e);
    var r = this.state[t] || {},
        n = this.stateChanges[t] || {};
    return h({}, r[e], n[e])
}, Vs.prototype.initializeTileState = function(t, e) {
    t.setFeatureState(this.state, e);
}, Vs.prototype.coalesceChanges = function(t, e) {
    var r = {};
    for (var n in this.stateChanges) {
        this.state[n] = this.state[n] || {};
        var i = {};
        for (var a in this.stateChanges[n]) this.state[n][a] || (this.state[n][a] = {}), h(this.state[n][a], this.stateChanges[n][a]), i[a] = this.state[n][a];
        r[n] = i;
    }
    if (this.stateChanges = {}, 0 !== Object.keys(r).length)
        for (var o in t) {
            t[o].setFeatureState(r, e);
        }
};
var Cs = function(t, e, r) {
    this.tileID = t, this.x = t.canonical.x, this.y = t.canonical.y, this.z = t.canonical.z, this.grid = e || new wr(Kn, 16, 0), this.featureIndexArray = r || new On;
};

function Ts(t, e) {
    return e - t
}
Cs.prototype.insert = function(t, e, r, n, i) {
    var a = this.featureIndexArray.length;
    this.featureIndexArray.emplaceBack(r, n, i);
    for (var o = 0; o < e.length; o++) {
        for (var s = e[o], u = [1 / 0, 1 / 0, -1 / 0, -1 / 0], l = 0; l < s.length; l++) {
            var p = s[l];
            u[0] = Math.min(u[0], p.x), u[1] = Math.min(u[1], p.y), u[2] = Math.max(u[2], p.x), u[3] = Math.max(u[3], p.y);
        }
        u[0] < Kn && u[1] < Kn && u[2] >= 0 && u[3] >= 0 && this.grid.insert(a, u[0], u[1], u[2], u[3]);
    }
}, Cs.prototype.loadVTLayers = function() {
    return this.vtLayers || (this.vtLayers = new to.VectorTile(new $o(this.rawTileData)).layers, this.sourceLayerCoder = new Ms(this.vtLayers ? Object.keys(this.vtLayers).sort() : ["_geojsonTileLayer"])), this.vtLayers
}, Cs.prototype.query = function(t, e, r) {
    var n = this;
    this.loadVTLayers();
    for (var i = t.params || {}, a = Kn / t.tileSize / t.scale, o = Ke(i.filter), s = t.queryGeometry, u = t.queryPadding * a, l = 1 / 0, p = 1 / 0, h = -1 / 0, c = -1 / 0, f = 0; f < s.length; f++)
        for (var y = s[f], d = 0; d < y.length; d++) {
            var m = y[d];
            l = Math.min(l, m.x), p = Math.min(p, m.y), h = Math.max(h, m.x), c = Math.max(c, m.y);
        }
    var v = this.grid.query(l - u, p - u, h + u, c + u);
    v.sort(Ts);
    for (var g, x = {}, b = function(u) {
            var l = v[u];
            if (l !== g) {
                g = l;
                var p = n.featureIndexArray.get(l),
                    h = null;
                n.loadMatchingFeature(x, p.bucketIndex, p.sourceLayerIndex, p.featureIndex, o, i.layers, e, function(e, i) {
                    h || (h = Wn(e));
                    var o = {};
                    return e.id && (o = r.getState(i.sourceLayer || "_geojsonTileLayer", String(e.id))), i.queryIntersectsFeature(s, e, o, h, n.z, t.transform, a, t.posMatrix)
                });
            }
        }, w = 0; w < v.length; w++) b(w);
    return x
}, Cs.prototype.loadMatchingFeature = function(t, e, r, n, i, a, o, s) {
    var u = this.bucketLayerIDs[e];
    if (!a || function(t, e) {
            for (var r = 0; r < t.length; r++)
                if (e.indexOf(t[r]) >= 0) return !0;
            return !1
        }(a, u)) {
        var l = this.sourceLayerCoder.decode(r),
            p = this.vtLayers[l].feature(n);
        if (i(new Nr(this.tileID.overscaledZ), p))
            for (var h = 0; h < u.length; h++) {
                var c = u[h];
                if (!(a && a.indexOf(c) < 0)) {
                    var f = o[c];
                    if (f && (!s || s(p, f))) {
                        var y = new Bs(p, this.z, this.x, this.y);
                        y.layer = f.serialize();
                        var d = t[c];
                        void 0 === d && (d = t[c] = []), d.push({
                            featureIndex: n,
                            feature: y
                        });
                    }
                }
            }
    }
}, Cs.prototype.lookupSymbolFeatures = function(t, e, r, n, i, a) {
    var o = {};
    this.loadVTLayers();
    for (var s = Ke(n), u = 0, l = t; u < l.length; u += 1) {
        var p = l[u];
        this.loadMatchingFeature(o, e, r, p, s, i, a);
    }
    return o
}, Cs.prototype.hasLayer = function(t) {
    for (var e = 0, r = this.bucketLayerIDs; e < r.length; e += 1)
        for (var n = 0, i = r[e]; n < i.length; n += 1) {
            if (t === i[n]) return !0
        }
    return !1
}, zr("FeatureIndex", Cs, {
    omit: ["rawTileData", "sourceLayerCoder"]
});
var Es = function(t, e) {
    this.tileID = t, this.uid = f(), this.uses = 0, this.tileSize = e, this.buckets = {}, this.expirationTime = null, this.queryPadding = 0, this.hasSymbolBuckets = !1, this.expiredRequestCount = 0, this.state = "loading";
};
Es.prototype.registerFadeDuration = function(t) {
    var e = t + this.timeAdded;
    e < z.now() || this.fadeEndTime && e < this.fadeEndTime || (this.fadeEndTime = e);
}, Es.prototype.wasRequested = function() {
    return "errored" === this.state || "loaded" === this.state || "reloading" === this.state
}, Es.prototype.loadVectorData = function(t, e, r) {
    if (this.hasData() && this.unloadVectorData(), this.state = "loaded", t) {
        for (var n in t.featureIndex && (this.latestFeatureIndex = t.featureIndex, t.rawTileData ? (this.latestRawTileData = t.rawTileData, this.latestFeatureIndex.rawTileData = t.rawTileData) : this.latestRawTileData && (this.latestFeatureIndex.rawTileData = this.latestRawTileData)), this.collisionBoxArray = t.collisionBoxArray, this.buckets = function(t, e) {
                var r = {};
                if (!e) return r;
                for (var n = 0, i = t; n < i.length; n += 1) {
                    var a = i[n],
                        o = a.layerIds.map(function(t) {
                            return e.getLayer(t)
                        }).filter(Boolean);
                    if (0 !== o.length) {
                        a.layers = o, a.stateDependentLayers = o.filter(function(t) {
                            return t.isStateDependent()
                        });
                        for (var s = 0, u = o; s < u.length; s += 1) r[u[s].id] = a;
                    }
                }
                return r
            }(t.buckets, e.style), this.hasSymbolBuckets = !1, this.buckets) {
            var i = this.buckets[n];
            if (i instanceof Co) {
                if (this.hasSymbolBuckets = !0, !r) break;
                i.justReloaded = !0;
            }
        }
        for (var a in this.queryPadding = 0, this.buckets) {
            var o = this.buckets[a];
            this.queryPadding = Math.max(this.queryPadding, e.style.getLayer(a).queryRadius(o));
        }
        t.iconAtlasImage && (this.iconAtlasImage = t.iconAtlasImage), t.glyphAtlasImage && (this.glyphAtlasImage = t.glyphAtlasImage);
    } else this.collisionBoxArray = new In;
}, Es.prototype.unloadVectorData = function() {
    for (var t in this.buckets) this.buckets[t].destroy();
    this.buckets = {}, this.iconAtlasTexture && this.iconAtlasTexture.destroy(), this.glyphAtlasTexture && this.glyphAtlasTexture.destroy(), this.latestFeatureIndex = null, this.state = "unloaded";
}, Es.prototype.unloadDEMData = function() {
    this.dem = null, this.neighboringTiles = null, this.state = "unloaded";
}, Es.prototype.getBucket = function(t) {
    return this.buckets[t.id]
}, Es.prototype.upload = function(t) {
    for (var e in this.buckets) {
        var r = this.buckets[e];
        r.uploadPending() && r.upload(t);
    }
    var n = t.gl;
    this.iconAtlasImage && (this.iconAtlasTexture = new Go(t, this.iconAtlasImage, n.RGBA), this.iconAtlasImage = null), this.glyphAtlasImage && (this.glyphAtlasTexture = new Go(t, this.glyphAtlasImage, n.ALPHA), this.glyphAtlasImage = null);
}, Es.prototype.queryRenderedFeatures = function(t, e, r, n, i, a, o, s) {
    return this.latestFeatureIndex && this.latestFeatureIndex.rawTileData ? this.latestFeatureIndex.query({
        queryGeometry: r,
        scale: n,
        tileSize: this.tileSize,
        posMatrix: s,
        transform: a,
        params: i,
        queryPadding: this.queryPadding * o
    }, t, e) : {}
}, Es.prototype.querySourceFeatures = function(t, e) {
    if (this.latestFeatureIndex && this.latestFeatureIndex.rawTileData) {
        var r = this.latestFeatureIndex.loadVTLayers(),
            n = e ? e.sourceLayer : "",
            i = r._geojsonTileLayer || r[n];
        if (i)
            for (var a = Ke(e && e.filter), o = this.tileID.canonical, s = o.z, u = o.x, l = o.y, p = {
                    z: s,
                    x: u,
                    y: l
                }, h = 0; h < i.length; h++) {
                var c = i.feature(h);
                if (a(new Nr(this.tileID.overscaledZ), c)) {
                    var f = new Bs(c, s, u, l);
                    f.tile = p, t.push(f);
                }
            }
    }
}, Es.prototype.clearMask = function() {
    this.segments && (this.segments.destroy(), delete this.segments), this.maskedBoundsBuffer && (this.maskedBoundsBuffer.destroy(), delete this.maskedBoundsBuffer), this.maskedIndexBuffer && (this.maskedIndexBuffer.destroy(), delete this.maskedIndexBuffer);
}, Es.prototype.setMask = function(t, e) {
    if (!s(this.mask, t) && (this.mask = t, this.clearMask(), !s(t, {
            0: !0
        }))) {
        var r = new hn,
            n = new kn;
        this.segments = new jn, this.segments.prepareSegment(0, r, n);
        for (var i = Object.keys(t), o = 0; o < i.length; o++) {
            var u = t[i[o]],
                l = Kn >> u.z,
                p = new a(u.x * l, u.y * l),
                h = new a(p.x + l, p.y + l),
                c = this.segments.prepareSegment(4, r, n);
            r.emplaceBack(p.x, p.y, p.x, p.y), r.emplaceBack(h.x, p.y, h.x, p.y), r.emplaceBack(p.x, h.y, p.x, h.y), r.emplaceBack(h.x, h.y, h.x, h.y);
            var f = c.vertexLength;
            n.emplaceBack(f, f + 1, f + 2), n.emplaceBack(f + 1, f + 2, f + 3), c.vertexLength += 4, c.primitiveLength += 2;
        }
        this.maskedBoundsBuffer = e.createVertexBuffer(r, zs.members), this.maskedIndexBuffer = e.createIndexBuffer(n);
    }
}, Es.prototype.hasData = function() {
    return "loaded" === this.state || "reloading" === this.state || "expired" === this.state
}, Es.prototype.setExpiryData = function(t) {
    var e = this.expirationTime;
    if (t.cacheControl) {
        var r = function(t) {
            var e = {};
            if (t.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g, function(t, r, n, i) {
                    var a = n || i;
                    return e[r] = !a || a.toLowerCase(), ""
                }), e["max-age"]) {
                var r = parseInt(e["max-age"], 10);
                isNaN(r) ? delete e["max-age"] : e["max-age"] = r;
            }
            return e
        }(t.cacheControl);
        r["max-age"] && (this.expirationTime = Date.now() + 1e3 * r["max-age"]);
    } else t.expires && (this.expirationTime = new Date(t.expires).getTime());
    if (this.expirationTime) {
        var n = Date.now(),
            i = !1;
        if (this.expirationTime > n) i = !1;
        else if (e)
            if (this.expirationTime < e) i = !0;
            else {
                var a = this.expirationTime - e;
                a ? this.expirationTime = n + Math.max(a, 3e4) : i = !0;
            }
        else i = !0;
        i ? (this.expiredRequestCount++, this.state = "expired") : this.expiredRequestCount = 0;
    }
}, Es.prototype.getExpiryTimeout = function() {
    if (this.expirationTime) return this.expiredRequestCount ? 1e3 * (1 << Math.min(this.expiredRequestCount - 1, 31)) : Math.min(this.expirationTime - (new Date).getTime(), Math.pow(2, 31) - 1)
}, Es.prototype.setFeatureState = function(t, e) {
    if (this.latestFeatureIndex && this.latestFeatureIndex.rawTileData && 0 !== Object.keys(t).length) {
        var r = this.latestFeatureIndex.loadVTLayers();
        for (var n in this.buckets) {
            var i = this.buckets[n],
                a = i.layers[0].sourceLayer || "_geojsonTileLayer",
                o = r[a],
                s = t[a];
            o && s && 0 !== Object.keys(s).length && (i.update(s, o), e && e.style && (this.queryPadding = Math.max(this.queryPadding, e.style.getLayer(n).queryRadius(i))));
        }
    }
}, Es.prototype.holdingForFade = function() {
    return void 0 !== this.symbolFadeHoldUntil
}, Es.prototype.symbolFadeFinished = function() {
    return !this.symbolFadeHoldUntil || this.symbolFadeHoldUntil < z.now()
}, Es.prototype.clearFadeHold = function() {
    this.symbolFadeHoldUntil = void 0;
}, Es.prototype.setHoldDuration = function(t) {
    this.symbolFadeHoldUntil = z.now() + t;
};
var Ps = {
        horizontal: 1,
        vertical: 2,
        horizontalOnly: 3
    },
    Fs = function() {
        this.text = "", this.sectionIndex = [], this.sections = [];
    };
Fs.fromFeature = function(t, e) {
    var r = new Fs;
    if (t instanceof ht)
        for (var n = 0; n < t.sections.length; n++) {
            var i = t.sections[n];
            r.sections.push({
                scale: i.scale || 1,
                fontStack: i.fontStack || e
            }), r.text += i.text;
            for (var a = 0; a < i.text.length; a++) r.sectionIndex.push(n);
        } else {
            r.text = t, r.sections.push({
                scale: 1,
                fontStack: e
            });
            for (var o = 0; o < t.length; o++) r.sectionIndex.push(0);
        }
    return r
}, Fs.prototype.length = function() {
    return this.text.length
}, Fs.prototype.getSection = function(t) {
    return this.sections[this.sectionIndex[t]]
}, Fs.prototype.getCharCode = function(t) {
    return this.text.charCodeAt(t)
}, Fs.prototype.verticalizePunctuation = function() {
    this.text = function(t) {
        for (var e = "", r = 0; r < t.length; r++) {
            var n = t.charCodeAt(r + 1) || null,
                i = t.charCodeAt(r - 1) || null;
            n && Fr(n) && !_o[t[r + 1]] || i && Fr(i) && !_o[t[r - 1]] || !_o[t[r]] ? e += t[r] : e += _o[t[r]];
        }
        return e
    }(this.text);
}, Fs.prototype.trim = function() {
    for (var t = 0, e = 0; e < this.text.length && Ls[this.text.charCodeAt(e)]; e++) t++;
    for (var r = this.text.length, n = this.text.length - 1; n >= 0 && n >= t && Ls[this.text.charCodeAt(n)]; n--) r--;
    this.text = this.text.substring(t, r), this.sectionIndex = this.sectionIndex.slice(t, r);
}, Fs.prototype.substring = function(t, e) {
    var r = new Fs;
    return r.text = this.text.substring(t, e), r.sectionIndex = this.sectionIndex.slice(t, e), r.sections = this.sections, r
}, Fs.prototype.toString = function() {
    return this.text
}, Fs.prototype.getMaxScale = function() {
    var t = this;
    return this.sectionIndex.reduce(function(e, r) {
        return Math.max(e, t.sections[r].scale)
    }, 0)
};
var Ls = {
        9: !0,
        10: !0,
        11: !0,
        12: !0,
        13: !0,
        32: !0
    },
    Os = {};

function Ds(t, e, r, n) {
    var i = Math.pow(t - e, 2);
    return n ? t < e ? i / 2 : 2 * i : i + Math.abs(r) * r
}

function qs(t, e) {
    var r = 0;
    return 10 === t && (r -= 1e4), 40 !== t && 65288 !== t || (r += 50), 41 !== e && 65289 !== e || (r += 50), r
}

function js(t, e, r, n, i, a) {
    for (var o = null, s = Ds(e, r, i, a), u = 0, l = n; u < l.length; u += 1) {
        var p = l[u],
            h = Ds(e - p.x, r, i, a) + p.badness;
        h <= s && (o = p, s = h);
    }
    return {
        index: t,
        x: e,
        priorBreak: o,
        badness: s
    }
}

function Us(t, e, r, n) {
    if (!r) return [];
    if (!t) return [];
    for (var i, a = [], o = function(t, e, r, n) {
            for (var i = 0, a = 0; a < t.length(); a++) {
                var o = t.getSection(a),
                    s = n[o.fontStack],
                    u = s && s[t.getCharCode(a)];
                u && (i += u.metrics.advance * o.scale + e);
            }
            return i / Math.max(1, Math.ceil(i / r))
        }(t, e, r, n), s = 0, u = 0; u < t.length(); u++) {
        var l = t.getSection(u),
            p = t.getCharCode(u),
            h = n[l.fontStack],
            c = h && h[p];
        c && !Ls[p] && (s += c.metrics.advance * l.scale + e), u < t.length() - 1 && (Os[p] || !((i = p) < 11904) && (Cr["Bopomofo Extended"](i) || Cr.Bopomofo(i) || Cr["CJK Compatibility Forms"](i) || Cr["CJK Compatibility Ideographs"](i) || Cr["CJK Compatibility"](i) || Cr["CJK Radicals Supplement"](i) || Cr["CJK Strokes"](i) || Cr["CJK Symbols and Punctuation"](i) || Cr["CJK Unified Ideographs Extension A"](i) || Cr["CJK Unified Ideographs"](i) || Cr["Enclosed CJK Letters and Months"](i) || Cr["Halfwidth and Fullwidth Forms"](i) || Cr.Hiragana(i) || Cr["Ideographic Description Characters"](i) || Cr["Kangxi Radicals"](i) || Cr["Katakana Phonetic Extensions"](i) || Cr.Katakana(i) || Cr["Vertical Forms"](i) || Cr["Yi Radicals"](i) || Cr["Yi Syllables"](i))) && a.push(js(u + 1, s, o, a, qs(p, t.getCharCode(u + 1)), !1));
    }
    return function t(e) {
        return e ? t(e.priorBreak).concat(e.index) : []
    }(js(t.length(), s, o, a, 0, !0))
}

function Rs(t) {
    var e = .5,
        r = .5;
    switch (t) {
        case "right":
        case "top-right":
        case "bottom-right":
            e = 1;
            break;
        case "left":
        case "top-left":
        case "bottom-left":
            e = 0;
    }
    switch (t) {
        case "bottom":
        case "bottom-right":
        case "bottom-left":
            r = 1;
            break;
        case "top":
        case "top-right":
        case "top-left":
            r = 0;
    }
    return {
        horizontalAlign: e,
        verticalAlign: r
    }
}

function Ns(t, e, r, n, i) {
    if (i) {
        var a = t[n],
            o = e[a.fontStack],
            s = o && o[a.glyph];
        if (s)
            for (var u = s.metrics.advance * a.scale, l = (t[n].x + u) * i, p = r; p <= n; p++) t[p].x -= l;
    }
}
Os[10] = !0, Os[32] = !0, Os[38] = !0, Os[40] = !0, Os[41] = !0, Os[43] = !0, Os[45] = !0, Os[47] = !0, Os[173] = !0, Os[183] = !0, Os[8203] = !0, Os[8208] = !0, Os[8211] = !0, Os[8231] = !0, t.createCommonjsModule = e, t.Point = a, t.window = self, t.browser = z, t.uuid = function() {
    return function t(e) {
        return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, t)
    }()
}, t.validateUuid = function(t) {
    return !!t && /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)
}, t.storageAvailable = function(t) {
    try {
        var e = self[t];
        return e.setItem("_mapbox_test_", 1), e.removeItem("_mapbox_test_"), !0
    } catch (t) {
        return !1
    }
}, t.warnOnce = b, t.postData = function(t, e, r) {
    var n = V(h(t, {
        method: "POST"
    }));
    return n.onerror = function() {
        r(new Error(n.statusText));
    }, n.onload = function() {
        n.status >= 200 && n.status < 300 ? r(null, n.response) : r(new I(n.statusText, n.status, t.url));
    }, n.send(e), {
        cancel: function() {
            return n.abort()
        }
    }
}, t.getJSON = function(t, e) {
    var r = V(t);
    return r.setRequestHeader("Accept", "application/json"), r.onerror = function() {
        e(new Error(r.statusText));
    }, r.onload = function() {
        if (r.status >= 200 && r.status < 300 && r.response) {
            var n;
            try {
                n = JSON.parse(r.response);
            } catch (t) {
                return e(t)
            }
            e(null, n);
        } else 401 === r.status && t.url.match(/mapbox.com/) ? e(new I(r.statusText + ": you may have provided an invalid Mapbox access token. See https://www.mapbox.com/api-documentation/#access-tokens", r.status, t.url)) : e(new I(r.statusText, r.status, t.url));
    }, r.send(), {
        cancel: function() {
            return r.abort()
        }
    }
}, t.getImage = function(t, e) {
    return C(t, function(t, r) {
        if (t) e(t);
        else if (r) {
            var n = new self.Image,
                i = self.URL || self.webkitURL;
            n.onload = function() {
                e(null, n), i.revokeObjectURL(n.src);
            };
            var a = new self.Blob([new Uint8Array(r.data)], {
                type: "image/png"
            });
            n.cacheControl = r.cacheControl, n.expires = r.expires, n.src = r.data.byteLength ? i.createObjectURL(a) : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";
        }
    })
}, t.ResourceType = B, t.RGBAImage = Xi, t.ShelfPack = qo, t.ImagePosition = Uo, t.Texture = Go, t.getArrayBuffer = C, t.parseGlyphPBF = function(t) {
    return new $o(t).readFields(ds, [])
}, t.isChar = Cr, t.asyncAll = function(t, e, r) {
    if (!t.length) return r(null, []);
    var n = t.length,
        i = new Array(t.length),
        a = null;
    t.forEach(function(t, o) {
        e(t, function(t, e) {
            t && (a = t), i[o] = e, 0 == --n && r(a, i);
        });
    });
}, t.AlphaImage = Hi, t.styleSpec = O, t.endsWith = d, t.extend = h, t.sphericalToCartesian = function(t) {
    var e = t[0],
        r = t[1],
        n = t[2];
    return r += 90, r *= Math.PI / 180, n *= Math.PI / 180, {
        x: e * Math.cos(r) * Math.sin(n),
        y: e * Math.sin(r) * Math.sin(n),
        z: e * Math.cos(n)
    }
}, t.Evented = L, t.validateStyle = mr, t.validateLight = vr, t.emitValidationErrors = br, t.Color = at, t.number = Ct, t.Properties = rn, t.Transitionable = Xr, t.Transitioning = Gr, t.PossiblyEvaluated = $r, t.DataConstantProperty = Wr, t.uniqueId = f, t.Actor = xs, t.pick = function(t, e) {
    for (var r = {}, n = 0; n < e.length; n++) {
        var i = e[n];
        i in t && (r[i] = t[i]);
    }
    return r
}, t.wrap = function(t, e, r) {
    var n = r - e,
        i = ((t - e) % n + n) % n + e;
    return i === e ? r : i
}, t.clamp = p, t.Event = P, t.ErrorEvent = F, t.OverscaledTileID = As, t.EXTENT = Kn, t.getCoordinatesCenter = function(t) {
    for (var e = 1 / 0, r = 1 / 0, n = -1 / 0, a = -1 / 0, o = 0; o < t.length; o++) e = Math.min(e, t[o].column), r = Math.min(r, t[o].row), n = Math.max(n, t[o].column), a = Math.max(a, t[o].row);
    var s = n - e,
        u = a - r,
        l = Math.max(s, u),
        p = Math.max(0, Math.floor(-Math.log(l) / Math.LN2));
    return new i((e + n) / 2, (r + a) / 2, 0).zoomTo(p)
}, t.CanonicalTileID = ws, t.StructArrayLayout4i8 = hn, t.rasterBoundsAttributes = zs, t.getVideo = function(t, e) {
    var r, n, i = self.document.createElement("video");
    i.muted = !0, i.onloadstart = function() {
        e(null, i);
    };
    for (var a = 0; a < t.length; a++) {
        var o = self.document.createElement("source");
        r = t[a], n = void 0, (n = self.document.createElement("a")).href = r, (n.protocol !== self.document.location.protocol || n.host !== self.document.location.host) && (i.crossOrigin = "Anonymous"), o.src = t[a], i.appendChild(o);
    }
    return {
        cancel: function() {}
    }
}, t.ValidationError = D, t.bindAll = y, t.deepEqual = s, t.Tile = Es, t.Coordinate = i, t.keysDifference = function(t, e) {
    var r = [];
    for (var n in t) n in e || r.push(n);
    return r
}, t.SourceFeatureState = Vs, t.refProperties = ["type", "source", "source-layer", "minzoom", "maxzoom", "filter", "layout"], t.create = function() {
    var t = new di(16);
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
}, t.identity = function(t) {
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
}, t.invert = function(t, e) {
    var r = e[0],
        n = e[1],
        i = e[2],
        a = e[3],
        o = e[4],
        s = e[5],
        u = e[6],
        l = e[7],
        p = e[8],
        h = e[9],
        c = e[10],
        f = e[11],
        y = e[12],
        d = e[13],
        m = e[14],
        v = e[15],
        g = r * s - n * o,
        x = r * u - i * o,
        b = r * l - a * o,
        w = n * u - i * s,
        _ = n * l - a * s,
        A = i * l - a * u,
        k = p * d - h * y,
        S = p * m - c * y,
        z = p * v - f * y,
        M = h * m - c * d,
        B = h * v - f * d,
        I = c * v - f * m,
        V = g * I - x * B + b * M + w * z - _ * S + A * k;
    return V ? (V = 1 / V, t[0] = (s * I - u * B + l * M) * V, t[1] = (i * B - n * I - a * M) * V, t[2] = (d * A - m * _ + v * w) * V, t[3] = (c * _ - h * A - f * w) * V, t[4] = (u * z - o * I - l * S) * V, t[5] = (r * I - i * z + a * S) * V, t[6] = (m * b - y * A - v * x) * V, t[7] = (p * A - c * b + f * x) * V, t[8] = (o * B - s * z + l * k) * V, t[9] = (n * z - r * B - a * k) * V, t[10] = (y * _ - d * b + v * g) * V, t[11] = (h * b - p * _ - f * g) * V, t[12] = (s * S - o * M - u * k) * V, t[13] = (r * M - n * S + i * k) * V, t[14] = (d * x - y * w - m * g) * V, t[15] = (p * w - h * x + c * g) * V, t) : null
}, t.multiply = function(t, e, r) {
    var n = e[0],
        i = e[1],
        a = e[2],
        o = e[3],
        s = e[4],
        u = e[5],
        l = e[6],
        p = e[7],
        h = e[8],
        c = e[9],
        f = e[10],
        y = e[11],
        d = e[12],
        m = e[13],
        v = e[14],
        g = e[15],
        x = r[0],
        b = r[1],
        w = r[2],
        _ = r[3];
    return t[0] = x * n + b * s + w * h + _ * d, t[1] = x * i + b * u + w * c + _ * m, t[2] = x * a + b * l + w * f + _ * v, t[3] = x * o + b * p + w * y + _ * g, x = r[4], b = r[5], w = r[6], _ = r[7], t[4] = x * n + b * s + w * h + _ * d, t[5] = x * i + b * u + w * c + _ * m, t[6] = x * a + b * l + w * f + _ * v, t[7] = x * o + b * p + w * y + _ * g, x = r[8], b = r[9], w = r[10], _ = r[11], t[8] = x * n + b * s + w * h + _ * d, t[9] = x * i + b * u + w * c + _ * m, t[10] = x * a + b * l + w * f + _ * v, t[11] = x * o + b * p + w * y + _ * g, x = r[12], b = r[13], w = r[14], _ = r[15], t[12] = x * n + b * s + w * h + _ * d, t[13] = x * i + b * u + w * c + _ * m, t[14] = x * a + b * l + w * f + _ * v, t[15] = x * o + b * p + w * y + _ * g, t
}, t.translate = function(t, e, r) {
    var n, i, a, o, s, u, l, p, h, c, f, y, d = r[0],
        m = r[1],
        v = r[2];
    return e === t ? (t[12] = e[0] * d + e[4] * m + e[8] * v + e[12], t[13] = e[1] * d + e[5] * m + e[9] * v + e[13], t[14] = e[2] * d + e[6] * m + e[10] * v + e[14], t[15] = e[3] * d + e[7] * m + e[11] * v + e[15]) : (n = e[0], i = e[1], a = e[2], o = e[3], s = e[4], u = e[5], l = e[6], p = e[7], h = e[8], c = e[9], f = e[10], y = e[11], t[0] = n, t[1] = i, t[2] = a, t[3] = o, t[4] = s, t[5] = u, t[6] = l, t[7] = p, t[8] = h, t[9] = c, t[10] = f, t[11] = y, t[12] = n * d + s * m + h * v + e[12], t[13] = i * d + u * m + c * v + e[13], t[14] = a * d + l * m + f * v + e[14], t[15] = o * d + p * m + y * v + e[15]), t
}, t.scale = function(t, e, r) {
    var n = r[0],
        i = r[1],
        a = r[2];
    return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * i, t[5] = e[5] * i, t[6] = e[6] * i, t[7] = e[7] * i, t[8] = e[8] * a, t[9] = e[9] * a, t[10] = e[10] * a, t[11] = e[11] * a, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
}, t.rotateX = function(t, e, r) {
    var n = Math.sin(r),
        i = Math.cos(r),
        a = e[4],
        o = e[5],
        s = e[6],
        u = e[7],
        l = e[8],
        p = e[9],
        h = e[10],
        c = e[11];
    return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = a * i + l * n, t[5] = o * i + p * n, t[6] = s * i + h * n, t[7] = u * i + c * n, t[8] = l * i - a * n, t[9] = p * i - o * n, t[10] = h * i - s * n, t[11] = c * i - u * n, t
}, t.rotateZ = function(t, e, r) {
    var n = Math.sin(r),
        i = Math.cos(r),
        a = e[0],
        o = e[1],
        s = e[2],
        u = e[3],
        l = e[4],
        p = e[5],
        h = e[6],
        c = e[7];
    return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = a * i + l * n, t[1] = o * i + p * n, t[2] = s * i + h * n, t[3] = u * i + c * n, t[4] = l * i - a * n, t[5] = p * i - o * n, t[6] = h * i - s * n, t[7] = c * i - u * n, t
}, t.perspective = function(t, e, r, n, i) {
    var a = 1 / Math.tan(e / 2),
        o = 1 / (n - i);
    return t[0] = a / r, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (i + n) * o, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * i * n * o, t[15] = 0, t
}, t.ortho = function(t, e, r, n, i, a, o) {
    var s = 1 / (e - r),
        u = 1 / (n - i),
        l = 1 / (a - o);
    return t[0] = -2 * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * u, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * l, t[11] = 0, t[12] = (e + r) * s, t[13] = (i + n) * u, t[14] = (o + a) * l, t[15] = 1, t
}, t.create$1 = zi, t.normalize = Mi, t.transformMat4 = Bi, t.forEach = Ii, t.getSizeData = ko, t.evaluateSizeForFeature = function(t, e, r) {
    var n = e;
    return "source" === t.functionType ? r.lowerSize / 10 : "composite" === t.functionType ? Ct(r.lowerSize / 10, r.upperSize / 10, n.uSizeT) : n.uSize
}, t.evaluateSizeForZoom = function(t, e, r) {
    if ("constant" === t.functionType) return {
        uSizeT: 0,
        uSize: t.layoutSize
    };
    if ("source" === t.functionType) return {
        uSizeT: 0,
        uSize: 0
    };
    if ("camera" === t.functionType) {
        var n = t.propertyValue,
            i = t.zoomRange,
            a = t.sizeRange,
            o = p(je(n, r.specification).interpolationFactor(e, i.min, i.max), 0, 1);
        return {
            uSizeT: 0,
            uSize: a.min + o * (a.max - a.min)
        }
    }
    var s = t.propertyValue,
        u = t.zoomRange;
    return {
        uSizeT: p(je(s, r.specification).interpolationFactor(e, u.min, u.max), 0, 1),
        uSize: 0
    }
}, t.addDynamicAttributes = Bo, t.properties = Eo, t.WritingMode = Ps, t.multiPolygonIntersectsBufferedPoint = ei, t.multiPolygonIntersectsMultiPolygon = ri, t.multiPolygonIntersectsBufferedMultiLine = ni, t.polygonIntersectsPolygon = function(t, e) {
    for (var r = 0; r < t.length; r++)
        if (pi(e, t[r])) return !0;
    for (var n = 0; n < e.length; n++)
        if (pi(t, e[n])) return !0;
    return !!ai(t, e)
}, t.distToSegmentSquared = ui, t.StyleLayer = nn, t.createStyleLayer = function(t) {
    return new Do[t.type](t)
}, t.clone = g, t.filterObject = v, t.mapObject = m, t.registerForPluginAvailability = function(t) {
    return qr ? t({
        pluginURL: qr,
        completionCallback: Or
    }) : Ur.once("pluginAvailable", t), t
}, t.evented = Ur, t.ZoomHistory = Vr, t.createLayout = un, t.ProgramConfiguration = Xn, t.create$2 = mi, t.fromRotation = function(t, e) {
    var r = Math.sin(e),
        n = Math.cos(e);
    return t[0] = n, t[1] = r, t[2] = 0, t[3] = -r, t[4] = n, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
}, t.create$3 = vi, t.length = gi, t.fromValues = xi, t.normalize$1 = bi, t.dot = wi, t.cross = _i, t.transformMat3 = function(t, e, r) {
    var n = e[0],
        i = e[1],
        a = e[2];
    return t[0] = n * r[0] + i * r[3] + a * r[6], t[1] = n * r[1] + i * r[4] + a * r[7], t[2] = n * r[2] + i * r[5] + a * r[8], t
}, t.len = ki, t.forEach$1 = Si, t.StructArrayLayout2i4 = pn, t.UnwrappedTileID = _s, t.create$4 = function() {
    var t = new di(4);
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
}, t.rotate = function(t, e, r) {
    var n = e[0],
        i = e[1],
        a = e[2],
        o = e[3],
        s = Math.sin(r),
        u = Math.cos(r);
    return t[0] = n * u + a * s, t[1] = i * u + o * s, t[2] = n * -s + a * u, t[3] = i * -s + o * u, t
}, t.ease = l, t.bezier = u, t.EvaluationParameters = Nr, t.setRTLTextPlugin = function(t, e) {
    if (Dr) throw new Error("setRTLTextPlugin cannot be called multiple times.");
    Dr = !0, qr = z.resolveURL(t), Or = function(t) {
        t ? (Dr = !1, qr = null, e && e(t)) : jr = !0;
    }, Ur.fire(new P("pluginAvailable", {
        pluginURL: qr,
        completionCallback: Or
    }));
}, t.values = function(t) {
    var e = [];
    for (var r in t) e.push(t[r]);
    return e
}, t.featureFilter = Ke, t.Anchor = Ao, t.register = zr, t.GLYPH_PBF_BORDER = gs, t.shapeText = function(t, e, r, n, i, a, o, s, u, l, p) {
    var h = Fs.fromFeature(t, r);
    p === Ps.vertical && h.verticalizePunctuation();
    var c, f = [],
        y = {
            positionedGlyphs: f,
            text: h,
            top: u[1],
            bottom: u[1],
            left: u[0],
            right: u[0],
            writingMode: p
        },
        d = Rr.processBidirectionalText,
        m = Rr.processStyledBidirectionalText;
    if (d && 1 === h.sections.length) {
        c = [];
        for (var v = 0, g = d(h.toString(), Us(h, s, n, e)); v < g.length; v += 1) {
            var x = g[v],
                b = new Fs;
            b.text = x, b.sections = h.sections;
            for (var w = 0; w < x.length; w++) b.sectionIndex.push(0);
            c.push(b);
        }
    } else if (m) {
        c = [];
        for (var _ = 0, A = m(h.text, h.sectionIndex, Us(h, s, n, e)); _ < A.length; _ += 1) {
            var k = A[_],
                S = new Fs;
            S.text = k[0], S.sectionIndex = k[1], S.sections = h.sections, c.push(S);
        }
    } else c = function(t, e) {
        for (var r = [], n = t.text, i = 0, a = 0, o = e; a < o.length; a += 1) {
            var s = o[a];
            r.push(t.substring(i, s)), i = s;
        }
        return i < n.length && r.push(t.substring(i, n.length)), r
    }(h, Us(h, s, n, e));
    return function(t, e, r, n, i, a, o, s, u) {
        for (var l = 0, p = -17, h = 0, c = t.positionedGlyphs, f = "right" === a ? 1 : "left" === a ? 0 : .5, y = 0, d = r; y < d.length; y += 1) {
            var m = d[y];
            m.trim();
            var v = m.getMaxScale();
            if (m.length()) {
                for (var g = c.length, x = 0; x < m.length(); x++) {
                    var b = m.getSection(x),
                        w = m.getCharCode(x),
                        _ = 24 * (v - b.scale),
                        A = e[b.fontStack],
                        k = A && A[w];
                    k && (Pr(w) && o !== Ps.horizontal ? (c.push({
                        glyph: w,
                        x: l,
                        y: _,
                        vertical: !0,
                        scale: b.scale,
                        fontStack: b.fontStack
                    }), l += u * b.scale + s) : (c.push({
                        glyph: w,
                        x: l,
                        y: p + _,
                        vertical: !1,
                        scale: b.scale,
                        fontStack: b.fontStack
                    }), l += k.metrics.advance * b.scale + s));
                }
                if (c.length !== g) {
                    var S = l - s;
                    h = Math.max(S, h), Ns(c, e, g, c.length - 1, f);
                }
                l = 0, p += n * v;
            } else p += n;
        }
        var z = Rs(i),
            M = z.horizontalAlign,
            B = z.verticalAlign;
        ! function(t, e, r, n, i, a, o) {
            for (var s = (e - r) * i, u = (-n * o + .5) * a, l = 0; l < t.length; l++) t[l].x += s, t[l].y += u;
        }(c, f, M, B, h, n, r.length);
        var I = p - -17;
        t.top += -B * I, t.bottom = t.top + I, t.left += -M * h, t.right = t.left + h;
    }(y, e, c, i, a, o, p, s, l), !!f.length && (y.text = y.text.toString(), y)
}, t.shapeIcon = function(t, e, r) {
    var n = Rs(r),
        i = n.horizontalAlign,
        a = n.verticalAlign,
        o = e[0],
        s = e[1],
        u = o - t.displaySize[0] * i,
        l = u + t.displaySize[0],
        p = s - t.displaySize[1] * a;
    return {
        image: t,
        top: p,
        bottom: p + t.displaySize[1],
        left: u,
        right: l
    }
}, t.allowsVerticalWritingMode = Tr, t.allowsLetterSpacing = function(t) {
    for (var e = 0, r = t; e < r.length; e += 1)
        if (!Er(r[e].charCodeAt(0))) return !1;
    return !0
}, t.classifyRings = Va, t.SymbolBucket = Co, t.Formatted = ht, t.FeatureIndex = Cs, t.CollisionBoxArray = In, t.DictionaryCoder = Ms, t.ImageAtlas = No, t.mvt = to, t.Protobuf = $o, t.DEMData = Ss, t.vectorTile = to, t.Point$1 = a, t.pbf = $o, t.plugin = Rr;
	});

define(["./shared.js"],function(e){
	
	"use strict";

	function t(e) {
	    var r = typeof e;
	    if ("number" === r || "boolean" === r || "string" === r || null == e) return JSON.stringify(e);
	    if (Array.isArray(e)) {
	        for (var n = "[", i = 0, o = e; i < o.length; i += 1) {
	            n += t(o[i]) + ",";
	        }
	        return n + "]"
	    }
	    for (var a = Object.keys(e).sort(), s = "{", l = 0; l < a.length; l++) s += JSON.stringify(a[l]) + ":" + t(e[a[l]]) + ",";
	    return s + "}"
	}

	function r(r) {
	    for (var n = "", i = 0, o = e.refProperties; i < o.length; i += 1) {
	        n += "/" + t(r[o[i]]);
	    }
	    return n
	}
	var n = function(e) {
	    e && this.replace(e);
	};

	function i(e, t, r, n, i) {
	    if (void 0 === t.segment) return !0;
	    for (var o = t, a = t.segment + 1, s = 0; s > -r / 2;) {
	        if (--a < 0) return !1;
	        s -= e[a].dist(o), o = e[a];
	    }
	    s += e[a].dist(e[a + 1]), a++;
	    for (var l = [], u = 0; s < r / 2;) {
	        var h = e[a - 1],
	            c = e[a],
	            f = e[a + 1];
	        if (!f) return !1;
	        var p = h.angleTo(c) - c.angleTo(f);
	        for (p = Math.abs((p + 3 * Math.PI) % (2 * Math.PI) - Math.PI), l.push({
	                distance: s,
	                angleDelta: p
	            }), u += p; s - l[0].distance > n;) u -= l.shift().angleDelta;
	        if (u > i) return !1;
	        a++, s += c.dist(f);
	    }
	    return !0
	}

	function o(e) {
	    for (var t = 0, r = 0; r < e.length - 1; r++) t += e[r].dist(e[r + 1]);
	    return t
	}

	function a(e, t, r) {
	    return e ? .6 * t * r : 0
	}

	function s(e, t) {
	    return Math.max(e ? e.right - e.left : 0, t ? t.right - t.left : 0)
	}

	function l(t, r, n, l, u, h) {
	    for (var c = a(n, u, h), f = s(n, l) * h, p = 0, d = o(t) / 2, g = 0; g < t.length - 1; g++) {
	        var m = t[g],
	            v = t[g + 1],
	            y = m.dist(v);
	        if (p + y > d) {
	            var x = (d - p) / y,
	                w = e.number(m.x, v.x, x),
	                S = e.number(m.y, v.y, x),
	                M = new e.Anchor(w, S, v.angleTo(m), g);
	            return M._round(), !c || i(t, M, f, c, r) ? M : void 0
	        }
	        p += y;
	    }
	}

	function u(t, r, n, l, u, h, c, f, p) {
	    var d = a(l, h, c),
	        g = s(l, u),
	        m = g * c,
	        v = 0 === t[0].x || t[0].x === p || 0 === t[0].y || t[0].y === p;
	    return r - m < r / 4 && (r = m + r / 4),
	        function t(r, n, a, s, l, u, h, c, f) {
	            var p = u / 2;
	            var d = o(r);
	            var g = 0,
	                m = n - a;
	            var v = [];
	            for (var y = 0; y < r.length - 1; y++) {
	                for (var x = r[y], w = r[y + 1], S = x.dist(w), M = w.angleTo(x); m + a < g + S;) {
	                    var b = ((m += a) - g) / S,
	                        P = e.number(x.x, w.x, b),
	                        _ = e.number(x.y, w.y, b);
	                    if (P >= 0 && P < f && _ >= 0 && _ < f && m - p >= 0 && m + p <= d) {
	                        var I = new e.Anchor(P, _, M, y);
	                        I._round(), s && !i(r, I, u, s, l) || v.push(I);
	                    }
	                }
	                g += S;
	            }
	            c || v.length || h || (v = t(r, g / 2, a, s, l, u, h, !0, f));
	            return v
	        }(t, v ? r / 2 * f % r : (g / 2 + 2 * h) * c * f % r, r, d, n, m, v, !1, p)
	}
	n.prototype.replace = function(e) {
	    this._layerConfigs = {}, this._layers = {}, this.update(e, []);
	}, n.prototype.update = function(t, n) {
	    for (var i = this, o = 0, a = t; o < a.length; o += 1) {
	        var s = a[o];
	        i._layerConfigs[s.id] = s;
	        var l = i._layers[s.id] = e.createStyleLayer(s);
	        l._featureFilter = e.featureFilter(l.filter);
	    }
	    for (var u = 0, h = n; u < h.length; u += 1) {
	        var c = h[u];
	        delete i._layerConfigs[c], delete i._layers[c];
	    }
	    this.familiesBySource = {};
	    for (var f = 0, p = function(e) {
	            for (var t = {}, n = 0; n < e.length; n++) {
	                var i = r(e[n]),
	                    o = t[i];
	                o || (o = t[i] = []), o.push(e[n]);
	            }
	            var a = [];
	            for (var s in t) a.push(t[s]);
	            return a
	        }(e.values(this._layerConfigs)); f < p.length; f += 1) {
	        var d = p[f].map(function(e) {
	                return i._layers[e.id]
	            }),
	            g = d[0];
	        if ("none" !== g.visibility) {
	            var m = g.source || "",
	                v = i.familiesBySource[m];
	            v || (v = i.familiesBySource[m] = {});
	            var y = g.sourceLayer || "_geojsonTileLayer",
	                x = v[y];
	            x || (x = v[y] = []), x.push(d);
	        }
	    }
	};
	var h = function() {
	    this.opacity = 0, this.targetOpacity = 0, this.time = 0;
	};
	h.prototype.clone = function() {
	    var e = new h;
	    return e.opacity = this.opacity, e.targetOpacity = this.targetOpacity, e.time = this.time, e
	}, e.register("OpacityState", h);
	var c = function(t, r, n, i, o, a, s, l, u, h, c, f) {
	    var p = s.top * l - u,
	        d = s.bottom * l + u,
	        g = s.left * l - u,
	        m = s.right * l + u;
	    if (this.boxStartIndex = t.length, h) {
	        var v = d - p,
	            y = m - g;
	        v > 0 && (v = Math.max(10 * l, v), this._addLineCollisionCircles(t, r, n, n.segment, y, v, i, o, a, c));
	    } else {
	        if (f) {
	            var x = new e.Point(g, p),
	                w = new e.Point(m, p),
	                S = new e.Point(g, d),
	                M = new e.Point(m, d),
	                b = f * Math.PI / 180;
	            x._rotate(b), w._rotate(b), S._rotate(b), M._rotate(b), g = Math.min(x.x, w.x, S.x, M.x), m = Math.max(x.x, w.x, S.x, M.x), p = Math.min(x.y, w.y, S.y, M.y), d = Math.max(x.y, w.y, S.y, M.y);
	        }
	        t.emplaceBack(n.x, n.y, g, p, m, d, i, o, a, 0, 0);
	    }
	    this.boxEndIndex = t.length;
	};
	c.prototype._addLineCollisionCircles = function(e, t, r, n, i, o, a, s, l, u) {
	    var h = o / 2,
	        c = Math.floor(i / h) || 1,
	        f = 1 + .4 * Math.log(u) / Math.LN2,
	        p = Math.floor(c * f / 2),
	        d = -o / 2,
	        g = r,
	        m = n + 1,
	        v = d,
	        y = -i / 2,
	        x = y - i / 4;
	    do {
	        if (--m < 0) {
	            if (v > y) return;
	            m = 0;
	            break
	        }
	        v -= t[m].dist(g), g = t[m];
	    } while (v > x);
	    for (var w = t[m].dist(t[m + 1]), S = -p; S < c + p; S++) {
	        var M = S * h,
	            b = y + M;
	        if (M < 0 && (b += M), M > i && (b += M - i), !(b < v)) {
	            for (; v + w < b;) {
	                if (v += w, ++m + 1 >= t.length) return;
	                w = t[m].dist(t[m + 1]);
	            }
	            var P = b - v,
	                _ = t[m],
	                I = t[m + 1].sub(_)._unit()._mult(P)._add(_)._round(),
	                T = Math.abs(b - d) < h ? 0 : .8 * (b - d);
	            e.emplaceBack(I.x, I.y, -o / 2, -o / 2, o / 2, o / 2, a, s, l, o / 2, T);
	        }
	    }
	};
	var f = d,
	    p = d;

	function d(e, t) {
	    if (!(this instanceof d)) return new d(e, t);
	    if (this.data = e || [], this.length = this.data.length, this.compare = t || g, this.length > 0)
	        for (var r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
	}

	function g(e, t) {
	    return e < t ? -1 : e > t ? 1 : 0
	}

	function m(t, r, n) {
	    void 0 === r && (r = 1), void 0 === n && (n = !1);
	    for (var i = 1 / 0, o = 1 / 0, a = -1 / 0, s = -1 / 0, l = t[0], u = 0; u < l.length; u++) {
	        var h = l[u];
	        (!u || h.x < i) && (i = h.x), (!u || h.y < o) && (o = h.y), (!u || h.x > a) && (a = h.x), (!u || h.y > s) && (s = h.y);
	    }
	    var c = a - i,
	        p = s - o,
	        d = Math.min(c, p),
	        g = d / 2,
	        m = new f(null, v);
	    if (0 === d) return new e.Point(i, o);
	    for (var x = i; x < a; x += d)
	        for (var w = o; w < s; w += d) m.push(new y(x + g, w + g, g, t));
	    for (var S = function(e) {
	            for (var t = 0, r = 0, n = 0, i = e[0], o = 0, a = i.length, s = a - 1; o < a; s = o++) {
	                var l = i[o],
	                    u = i[s],
	                    h = l.x * u.y - u.x * l.y;
	                r += (l.x + u.x) * h, n += (l.y + u.y) * h, t += 3 * h;
	            }
	            return new y(r / t, n / t, 0, e)
	        }(t), M = m.length; m.length;) {
	        var b = m.pop();
	        (b.d > S.d || !S.d) && (S = b, n && console.log("found best %d after %d probes", Math.round(1e4 * b.d) / 1e4, M)), b.max - S.d <= r || (g = b.h / 2, m.push(new y(b.p.x - g, b.p.y - g, g, t)), m.push(new y(b.p.x + g, b.p.y - g, g, t)), m.push(new y(b.p.x - g, b.p.y + g, g, t)), m.push(new y(b.p.x + g, b.p.y + g, g, t)), M += 4);
	    }
	    return n && (console.log("num probes: " + M), console.log("best distance: " + S.d)), S.p
	}

	function v(e, t) {
	    return t.max - e.max
	}

	function y(t, r, n, i) {
	    this.p = new e.Point(t, r), this.h = n, this.d = function(t, r) {
	        for (var n = !1, i = 1 / 0, o = 0; o < r.length; o++)
	            for (var a = r[o], s = 0, l = a.length, u = l - 1; s < l; u = s++) {
	                var h = a[s],
	                    c = a[u];
	                h.y > t.y != c.y > t.y && t.x < (c.x - h.x) * (t.y - h.y) / (c.y - h.y) + h.x && (n = !n), i = Math.min(i, e.distToSegmentSquared(t, h, c));
	            }
	        return (n ? 1 : -1) * Math.sqrt(i)
	    }(this.p, i), this.max = this.d + this.h * Math.SQRT2;
	}

	function x(t, r, n, i, o, a) {
	    t.createArrays(), t.symbolInstances = [];
	    var s = 512 * t.overscaling;
	    t.tilePixelRatio = e.EXTENT / s, t.compareText = {}, t.iconsNeedLinear = !1;
	    var l = t.layers[0].layout,
	        u = t.layers[0]._unevaluatedLayout._values,
	        h = {};
	    if ("composite" === t.textSizeData.functionType) {
	        var c = t.textSizeData.zoomRange,
	            f = c.min,
	            p = c.max;
	        h.compositeTextSizes = [u["text-size"].possiblyEvaluate(new e.EvaluationParameters(f)), u["text-size"].possiblyEvaluate(new e.EvaluationParameters(p))];
	    }
	    if ("composite" === t.iconSizeData.functionType) {
	        var d = t.iconSizeData.zoomRange,
	            g = d.min,
	            m = d.max;
	        h.compositeIconSizes = [u["icon-size"].possiblyEvaluate(new e.EvaluationParameters(g)), u["icon-size"].possiblyEvaluate(new e.EvaluationParameters(m))];
	    }
	    h.layoutTextSize = u["text-size"].possiblyEvaluate(new e.EvaluationParameters(t.zoom + 1)), h.layoutIconSize = u["icon-size"].possiblyEvaluate(new e.EvaluationParameters(t.zoom + 1)), h.textMaxSize = u["text-size"].possiblyEvaluate(new e.EvaluationParameters(18));
	    for (var v = 24 * l.get("text-line-height"), y = "map" === l.get("text-rotation-alignment") && "point" !== l.get("symbol-placement"), x = l.get("text-keep-upright"), S = 0, M = t.features; S < M.length; S += 1) {
	        var b = M[S],
	            P = l.get("text-font").evaluate(b, {}).join(","),
	            _ = n,
	            I = {},
	            T = b.text;
	        if (T) {
	            var k = T instanceof e.Formatted ? T.toString() : T,
	                z = l.get("text-offset").evaluate(b, {}).map(function(e) {
	                    return 24 * e
	                }),
	                L = 24 * l.get("text-letter-spacing").evaluate(b, {}),
	                E = e.allowsLetterSpacing(k) ? L : 0,
	                D = l.get("text-anchor").evaluate(b, {}),
	                O = l.get("text-justify").evaluate(b, {}),
	                C = "point" === l.get("symbol-placement") ? 24 * l.get("text-max-width").evaluate(b, {}) : 0;
	            I.horizontal = e.shapeText(T, r, P, C, v, D, O, E, z, 24, e.WritingMode.horizontal), e.allowsVerticalWritingMode(k) && y && x && (I.vertical = e.shapeText(T, r, P, C, v, D, O, E, z, 24, e.WritingMode.vertical));
	        }
	        var N = void 0;
	        if (b.icon) {
	            var A = i[b.icon];
	            A && (N = e.shapeIcon(o[b.icon], l.get("icon-offset").evaluate(b, {}), l.get("icon-anchor").evaluate(b, {})), void 0 === t.sdfIcons ? t.sdfIcons = A.sdf : t.sdfIcons !== A.sdf && e.warnOnce("Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer"), A.pixelRatio !== t.pixelRatio ? t.iconsNeedLinear = !0 : 0 !== l.get("icon-rotate").constantOr(1) && (t.iconsNeedLinear = !0));
	        }(I.horizontal || N) && w(t, b, I, N, _, h);
	    }
	    a && t.generateCollisionDebugBuffers();
	}

	function w(t, r, n, i, o, a) {
	    var s = a.layoutTextSize.evaluate(r, {}),
	        f = a.layoutIconSize.evaluate(r, {}),
	        p = a.textMaxSize.evaluate(r, {});
	    void 0 === p && (p = s);
	    var d = t.layers[0].layout,
	        g = d.get("text-offset").evaluate(r, {}),
	        v = d.get("icon-offset").evaluate(r, {}),
	        y = s / 24,
	        x = t.tilePixelRatio * y,
	        w = t.tilePixelRatio * p / 24,
	        b = t.tilePixelRatio * f,
	        P = t.tilePixelRatio * d.get("symbol-spacing"),
	        _ = d.get("text-padding") * t.tilePixelRatio,
	        I = d.get("icon-padding") * t.tilePixelRatio,
	        T = d.get("text-max-angle") / 180 * Math.PI,
	        k = "map" === d.get("text-rotation-alignment") && "point" !== d.get("symbol-placement"),
	        z = "map" === d.get("icon-rotation-alignment") && "point" !== d.get("symbol-placement"),
	        L = d.get("symbol-placement"),
	        E = P / 2,
	        D = function(s, l) {
	            l.x < 0 || l.x >= e.EXTENT || l.y < 0 || l.y >= e.EXTENT || t.symbolInstances.push(function(t, r, n, i, o, a, s, l, u, f, p, d, g, m, v, y, x, w, M, b, P) {
	                var _, I, T = t.addToLineVertexArray(r, n),
	                    k = 0,
	                    z = 0,
	                    L = 0,
	                    E = i.horizontal ? i.horizontal.text : "",
	                    D = [];
	                if (i.horizontal) {
	                    var O = a.layout.get("text-rotate").evaluate(M, {});
	                    _ = new c(s, n, r, l, u, f, i.horizontal, p, d, g, t.overscaling, O), z += S(t, r, i.horizontal, a, g, M, m, T, i.vertical ? e.WritingMode.horizontal : e.WritingMode.horizontalOnly, D, b, P), i.vertical && (L += S(t, r, i.vertical, a, g, M, m, T, e.WritingMode.vertical, D, b, P));
	                }
	                var C = _ ? _.boxStartIndex : t.collisionBoxArray.length,
	                    N = _ ? _.boxEndIndex : t.collisionBoxArray.length;
	                if (o) {
	                    var A = function(t, r, n, i, o, a) {
	                            var s, l, u, h, c = r.image,
	                                f = n.layout,
	                                p = r.top - 1 / c.pixelRatio,
	                                d = r.left - 1 / c.pixelRatio,
	                                g = r.bottom + 1 / c.pixelRatio,
	                                m = r.right + 1 / c.pixelRatio;
	                            if ("none" !== f.get("icon-text-fit") && o) {
	                                var v = m - d,
	                                    y = g - p,
	                                    x = f.get("text-size").evaluate(a, {}) / 24,
	                                    w = o.left * x,
	                                    S = o.right * x,
	                                    M = o.top * x,
	                                    b = S - w,
	                                    P = o.bottom * x - M,
	                                    _ = f.get("icon-text-fit-padding")[0],
	                                    I = f.get("icon-text-fit-padding")[1],
	                                    T = f.get("icon-text-fit-padding")[2],
	                                    k = f.get("icon-text-fit-padding")[3],
	                                    z = "width" === f.get("icon-text-fit") ? .5 * (P - y) : 0,
	                                    L = "height" === f.get("icon-text-fit") ? .5 * (b - v) : 0,
	                                    E = "width" === f.get("icon-text-fit") || "both" === f.get("icon-text-fit") ? b : v,
	                                    D = "height" === f.get("icon-text-fit") || "both" === f.get("icon-text-fit") ? P : y;
	                                s = new e.Point(w + L - k, M + z - _), l = new e.Point(w + L + I + E, M + z - _), u = new e.Point(w + L + I + E, M + z + T + D), h = new e.Point(w + L - k, M + z + T + D);
	                            } else s = new e.Point(d, p), l = new e.Point(m, p), u = new e.Point(m, g), h = new e.Point(d, g);
	                            var O = n.layout.get("icon-rotate").evaluate(a, {}) * Math.PI / 180;
	                            if (O) {
	                                var C = Math.sin(O),
	                                    N = Math.cos(O),
	                                    A = [N, -C, C, N];
	                                s._matMult(A), l._matMult(A), h._matMult(A), u._matMult(A);
	                            }
	                            return [{
	                                tl: s,
	                                tr: l,
	                                bl: h,
	                                br: u,
	                                tex: c.paddedRect,
	                                writingMode: void 0,
	                                glyphOffset: [0, 0]
	                            }]
	                        }(0, o, a, 0, i.horizontal, M),
	                        B = a.layout.get("icon-rotate").evaluate(M, {});
	                    I = new c(s, n, r, l, u, f, o, v, y, !1, t.overscaling, B), k = 4 * A.length;
	                    var R = t.iconSizeData,
	                        F = null;
	                    "source" === R.functionType ? F = [10 * a.layout.get("icon-size").evaluate(M, {})] : "composite" === R.functionType && (F = [10 * P.compositeIconSizes[0].evaluate(M, {}), 10 * P.compositeIconSizes[1].evaluate(M, {})]), t.addSymbols(t.icon, A, F, w, x, M, !1, r, T.lineStartIndex, T.lineLength);
	                }
	                var G = I ? I.boxStartIndex : t.collisionBoxArray.length,
	                    J = I ? I.boxEndIndex : t.collisionBoxArray.length;
	                t.glyphOffsetArray.length >= e.SymbolBucket.MAX_GLYPHS && e.warnOnce("Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907");
	                var X = new h,
	                    V = new h;
	                return {
	                    key: E,
	                    textBoxStartIndex: C,
	                    textBoxEndIndex: N,
	                    iconBoxStartIndex: G,
	                    iconBoxEndIndex: J,
	                    textOffset: m,
	                    iconOffset: w,
	                    anchor: r,
	                    line: n,
	                    featureIndex: l,
	                    numGlyphVertices: z,
	                    numVerticalGlyphVertices: L,
	                    numIconVertices: k,
	                    textOpacityState: X,
	                    iconOpacityState: V,
	                    isDuplicate: !1,
	                    placedTextSymbolIndices: D,
	                    crossTileID: 0
	                }
	            }(t, l, s, n, i, t.layers[0], t.collisionBoxArray, r.index, r.sourceLayerIndex, t.index, x, _, k, g, b, I, z, v, r, o, a));
	        };
	    if ("line" === L)
	        for (var O = 0, C = function(t, r, n, i, o) {
	                for (var a = [], s = 0; s < t.length; s++)
	                    for (var l = t[s], u = void 0, h = 0; h < l.length - 1; h++) {
	                        var c = l[h],
	                            f = l[h + 1];
	                        c.x < r && f.x < r || (c.x < r ? c = new e.Point(r, c.y + (f.y - c.y) * ((r - c.x) / (f.x - c.x)))._round() : f.x < r && (f = new e.Point(r, c.y + (f.y - c.y) * ((r - c.x) / (f.x - c.x)))._round()), c.y < n && f.y < n || (c.y < n ? c = new e.Point(c.x + (f.x - c.x) * ((n - c.y) / (f.y - c.y)), n)._round() : f.y < n && (f = new e.Point(c.x + (f.x - c.x) * ((n - c.y) / (f.y - c.y)), n)._round()), c.x >= i && f.x >= i || (c.x >= i ? c = new e.Point(i, c.y + (f.y - c.y) * ((i - c.x) / (f.x - c.x)))._round() : f.x >= i && (f = new e.Point(i, c.y + (f.y - c.y) * ((i - c.x) / (f.x - c.x)))._round()), c.y >= o && f.y >= o || (c.y >= o ? c = new e.Point(c.x + (f.x - c.x) * ((o - c.y) / (f.y - c.y)), o)._round() : f.y >= o && (f = new e.Point(c.x + (f.x - c.x) * ((o - c.y) / (f.y - c.y)), o)._round()), u && c.equals(u[u.length - 1]) || (u = [c], a.push(u)), u.push(f)))));
	                    }
	                return a
	            }(r.geometry, 0, 0, e.EXTENT, e.EXTENT); O < C.length; O += 1)
	            for (var N = C[O], A = 0, B = u(N, P, T, n.vertical || n.horizontal, i, 24, w, t.overscaling, e.EXTENT); A < B.length; A += 1) {
	                var R = B[A],
	                    F = n.horizontal;
	                F && M(t, F.text, E, R) || D(N, R);
	            } else if ("line-center" === L)
	                for (var G = 0, J = r.geometry; G < J.length; G += 1) {
	                    var X = J[G];
	                    if (X.length > 1) {
	                        var V = l(X, T, n.vertical || n.horizontal, i, 24, w);
	                        V && D(X, V);
	                    }
	                } else if ("Polygon" === r.type)
	                    for (var Z = 0, j = e.classifyRings(r.geometry, 0); Z < j.length; Z += 1) {
	                        var W = j[Z],
	                            Y = m(W, 16);
	                        D(W[0], new e.Anchor(Y.x, Y.y, 0));
	                    } else if ("LineString" === r.type)
	                        for (var q = 0, U = r.geometry; q < U.length; q += 1) {
	                            var H = U[q];
	                            D(H, new e.Anchor(H[0].x, H[0].y, 0));
	                        } else if ("Point" === r.type)
	                            for (var Q = 0, $ = r.geometry; Q < $.length; Q += 1)
	                                for (var K = 0, ee = $[Q]; K < ee.length; K += 1) {
	                                    var te = ee[K];
	                                    D([te], new e.Anchor(te.x, te.y, 0));
	                                }
	}

	function S(t, r, n, i, o, a, s, l, u, h, c, f) {
	    var p = function(t, r, n, i, o, a) {
	            for (var s = n.layout.get("text-rotate").evaluate(o, {}) * Math.PI / 180, l = n.layout.get("text-offset").evaluate(o, {}).map(function(e) {
	                    return 24 * e
	                }), u = r.positionedGlyphs, h = [], c = 0; c < u.length; c++) {
	                var f = u[c],
	                    p = a[f.fontStack],
	                    d = p && p[f.glyph];
	                if (d) {
	                    var g = d.rect;
	                    if (g) {
	                        var m = e.GLYPH_PBF_BORDER + 1,
	                            v = d.metrics.advance * f.scale / 2,
	                            y = i ? [f.x + v, f.y] : [0, 0],
	                            x = i ? [0, 0] : [f.x + v + l[0], f.y + l[1]],
	                            w = (d.metrics.left - m) * f.scale - v + x[0],
	                            S = (-d.metrics.top - m) * f.scale + x[1],
	                            M = w + g.w * f.scale,
	                            b = S + g.h * f.scale,
	                            P = new e.Point(w, S),
	                            _ = new e.Point(M, S),
	                            I = new e.Point(w, b),
	                            T = new e.Point(M, b);
	                        if (i && f.vertical) {
	                            var k = new e.Point(-v, v),
	                                z = -Math.PI / 2,
	                                L = new e.Point(5, 0);
	                            P._rotateAround(z, k)._add(L), _._rotateAround(z, k)._add(L), I._rotateAround(z, k)._add(L), T._rotateAround(z, k)._add(L);
	                        }
	                        if (s) {
	                            var E = Math.sin(s),
	                                D = Math.cos(s),
	                                O = [D, -E, E, D];
	                            P._matMult(O), _._matMult(O), I._matMult(O), T._matMult(O);
	                        }
	                        h.push({
	                            tl: P,
	                            tr: _,
	                            bl: I,
	                            br: T,
	                            tex: g,
	                            writingMode: r.writingMode,
	                            glyphOffset: y
	                        });
	                    }
	                }
	            }
	            return h
	        }(0, n, i, o, a, c),
	        d = t.textSizeData,
	        g = null;
	    return "source" === d.functionType ? g = [10 * i.layout.get("text-size").evaluate(a, {})] : "composite" === d.functionType && (g = [10 * f.compositeTextSizes[0].evaluate(a, {}), 10 * f.compositeTextSizes[1].evaluate(a, {})]), t.addSymbols(t.text, p, g, s, o, a, u, r, l.lineStartIndex, l.lineLength), h.push(t.text.placedSymbolArray.length - 1), 4 * p.length
	}

	function M(e, t, r, n) {
	    var i = e.compareText;
	    if (t in i) {
	        for (var o = i[t], a = o.length - 1; a >= 0; a--)
	            if (n.dist(o[a]) < r) return !0
	    } else i[t] = [];
	    return i[t].push(n), !1
	}
	d.prototype = {
	    push: function(e) {
	        this.data.push(e), this.length++, this._up(this.length - 1);
	    },
	    pop: function() {
	        if (0 !== this.length) {
	            var e = this.data[0];
	            return this.length--, this.length > 0 && (this.data[0] = this.data[this.length], this._down(0)), this.data.pop(), e
	        }
	    },
	    peek: function() {
	        return this.data[0]
	    },
	    _up: function(e) {
	        for (var t = this.data, r = this.compare, n = t[e]; e > 0;) {
	            var i = e - 1 >> 1,
	                o = t[i];
	            if (r(n, o) >= 0) break;
	            t[e] = o, e = i;
	        }
	        t[e] = n;
	    },
	    _down: function(e) {
	        for (var t = this.data, r = this.compare, n = this.length >> 1, i = t[e]; e < n;) {
	            var o = 1 + (e << 1),
	                a = o + 1,
	                s = t[o];
	            if (a < this.length && r(t[a], s) < 0 && (o = a, s = t[a]), r(s, i) >= 0) break;
	            t[e] = s, e = o;
	        }
	        t[e] = i;
	    }
	}, f.default = p;
	var b = function(t) {
	    var r = {},
	        n = new e.ShelfPack(0, 0, {
	            autoResize: !0
	        }),
	        i = [];
	    for (var o in t) {
	        var a = t[o],
	            s = r[o] = {};
	        for (var l in a) {
	            var u = a[+l];
	            if (u && 0 !== u.bitmap.width && 0 !== u.bitmap.height) {
	                var h = {
	                    x: 0,
	                    y: 0,
	                    w: u.bitmap.width + 2,
	                    h: u.bitmap.height + 2
	                };
	                i.push(h), s[l] = {
	                    rect: h,
	                    metrics: u.metrics
	                };
	            }
	        }
	    }
	    n.pack(i, {
	        inPlace: !0
	    });
	    var c = new e.AlphaImage({
	        width: n.w,
	        height: n.h
	    });
	    for (var f in t) {
	        var p = t[f];
	        for (var d in p) {
	            var g = p[+d];
	            if (g && 0 !== g.bitmap.width && 0 !== g.bitmap.height) {
	                var m = r[f][d].rect;
	                e.AlphaImage.copy(g.bitmap, c, {
	                    x: 0,
	                    y: 0
	                }, {
	                    x: m.x + 1,
	                    y: m.y + 1
	                }, g.bitmap);
	            }
	        }
	    }
	    this.image = c, this.positions = r;
	};
	e.register("GlyphAtlas", b);
	var P = function(t) {
	    this.tileID = new e.OverscaledTileID(t.tileID.overscaledZ, t.tileID.wrap, t.tileID.canonical.z, t.tileID.canonical.x, t.tileID.canonical.y), this.uid = t.uid, this.zoom = t.zoom, this.pixelRatio = t.pixelRatio, this.tileSize = t.tileSize, this.source = t.source, this.overscaling = this.tileID.overscaleFactor(), this.showCollisionBoxes = t.showCollisionBoxes, this.collectResourceTiming = !!t.collectResourceTiming;
	};

	function _(t, r) {
	    for (var n = new e.EvaluationParameters(r), i = 0, o = t; i < o.length; i += 1) {
	        o[i].recalculate(n);
	    }
	}
	P.prototype.parse = function(t, r, n, i) {
	    var o = this;
	    this.status = "parsing", this.data = t, this.collisionBoxArray = new e.CollisionBoxArray;
	    var a = new e.DictionaryCoder(Object.keys(t.layers).sort()),
	        s = new e.FeatureIndex(this.tileID);
	    s.bucketLayerIDs = [];
	    var l, u, h, c = {},
	        f = {
	            featureIndex: s,
	            iconDependencies: {},
	            glyphDependencies: {}
	        },
	        p = r.familiesBySource[this.source];
	    for (var d in p) {
	        var g = t.layers[d];
	        if (g) {
	            1 === g.version && e.warnOnce('Vector tile source "' + o.source + '" layer "' + d + '" does not use vector tile spec v2 and therefore may have some rendering errors.');
	            for (var m = a.encode(d), v = [], y = 0; y < g.length; y++) {
	                var w = g.feature(y);
	                v.push({
	                    feature: w,
	                    index: y,
	                    sourceLayerIndex: m
	                });
	            }
	            for (var S = 0, M = p[d]; S < M.length; S += 1) {
	                var P = M[S],
	                    I = P[0];
	                if (!(I.minzoom && o.zoom < Math.floor(I.minzoom)))
	                    if (!(I.maxzoom && o.zoom >= I.maxzoom))
	                        if ("none" !== I.visibility) _(P, o.zoom), (c[I.id] = I.createBucket({
	                            index: s.bucketLayerIDs.length,
	                            layers: P,
	                            zoom: o.zoom,
	                            pixelRatio: o.pixelRatio,
	                            overscaling: o.overscaling,
	                            collisionBoxArray: o.collisionBoxArray,
	                            sourceLayerIndex: m,
	                            sourceID: o.source
	                        })).populate(v, f), s.bucketLayerIDs.push(P.map(function(e) {
	                            return e.id
	                        }));
	            }
	        }
	    }
	    var T = e.mapObject(f.glyphDependencies, function(e) {
	        return Object.keys(e).map(Number)
	    });
	    Object.keys(T).length ? n.send("getGlyphs", {
	        uid: this.uid,
	        stacks: T
	    }, function(e, t) {
	        l || (l = e, u = t, z.call(o));
	    }) : u = {};
	    var k = Object.keys(f.iconDependencies);

	    function z() {
	        if (l) return i(l);
	        if (u && h) {
	            var t = new b(u),
	                r = new e.ImageAtlas(h);
	            for (var n in c) {
	                var o = c[n];
	                o instanceof e.SymbolBucket && (_(o.layers, this.zoom), x(o, u, t.positions, h, r.positions, this.showCollisionBoxes));
	            }
	            this.status = "done", i(null, {
	                buckets: e.values(c).filter(function(e) {
	                    return !e.isEmpty()
	                }),
	                featureIndex: s,
	                collisionBoxArray: this.collisionBoxArray,
	                glyphAtlasImage: t.image,
	                iconAtlasImage: r.image
	            });
	        }
	    }
	    k.length ? n.send("getImages", {
	        icons: k
	    }, function(e, t) {
	        l || (l = e, h = t, z.call(o));
	    }) : h = {}, z.call(this);
	};
	var I = "undefined" != typeof performance,
	    T = {
	        getEntriesByName: function(e) {
	            return !!(I && performance && performance.getEntriesByName) && performance.getEntriesByName(e)
	        },
	        mark: function(e) {
	            return !!(I && performance && performance.mark) && performance.mark(e)
	        },
	        measure: function(e, t, r) {
	            return !!(I && performance && performance.measure) && performance.measure(e, t, r)
	        },
	        clearMarks: function(e) {
	            return !!(I && performance && performance.clearMarks) && performance.clearMarks(e)
	        },
	        clearMeasures: function(e) {
	            return !!(I && performance && performance.clearMeasures) && performance.clearMeasures(e)
	        }
	    },
	    k = function(e) {
	        this._marks = {
	            start: [e.url, "start"].join("#"),
	            end: [e.url, "end"].join("#"),
	            measure: e.url.toString()
	        }, T.mark(this._marks.start);
	    };

	function z(t, r) {
	    var n = e.getArrayBuffer(t.request, function(t, n) {
	        t ? r(t) : n && r(null, {
	            vectorTile: new e.mvt.VectorTile(new e.Protobuf(n.data)),
	            rawData: n.data,
	            cacheControl: n.cacheControl,
	            expires: n.expires
	        });
	    });
	    return function() {
	        n.cancel(), r();
	    }
	}
	k.prototype.finish = function() {
	    T.mark(this._marks.end);
	    var e = T.getEntriesByName(this._marks.measure);
	    return 0 === e.length && (T.measure(this._marks.measure, this._marks.start, this._marks.end), e = T.getEntriesByName(this._marks.measure), T.clearMarks(this._marks.start), T.clearMarks(this._marks.end), T.clearMeasures(this._marks.measure)), e
	}, T.Performance = k;
	var L = function(e, t, r) {
	    this.actor = e, this.layerIndex = t, this.loadVectorData = r || z, this.loading = {}, this.loaded = {};
	};
	L.prototype.loadTile = function(t, r) {
	    var n = this,
	        i = t.uid;
	    this.loading || (this.loading = {});
	    var o = !!(t && t.request && t.request.collectResourceTiming) && new T.Performance(t.request),
	        a = this.loading[i] = new P(t);
	    a.abort = this.loadVectorData(t, function(t, s) {
	        if (delete n.loading[i], t || !s) return r(t);
	        var l = s.rawData,
	            u = {};
	        s.expires && (u.expires = s.expires), s.cacheControl && (u.cacheControl = s.cacheControl);
	        var h = {};
	        if (o) {
	            var c = o.finish();
	            c && (h.resourceTiming = JSON.parse(JSON.stringify(c)));
	        }
	        a.vectorTile = s.vectorTile, a.parse(s.vectorTile, n.layerIndex, n.actor, function(t, n) {
	            if (t || !n) return r(t);
	            r(null, e.extend({
	                rawTileData: l.slice(0)
	            }, n, u, h));
	        }), n.loaded = n.loaded || {}, n.loaded[i] = a;
	    });
	}, L.prototype.reloadTile = function(e, t) {
	    var r = this.loaded,
	        n = e.uid,
	        i = this;
	    if (r && r[n]) {
	        var o = r[n];
	        o.showCollisionBoxes = e.showCollisionBoxes;
	        var a = function(e, r) {
	            var n = o.reloadCallback;
	            n && (delete o.reloadCallback, o.parse(o.vectorTile, i.layerIndex, i.actor, n)), t(e, r);
	        };
	        "parsing" === o.status ? o.reloadCallback = a : "done" === o.status && o.parse(o.vectorTile, this.layerIndex, this.actor, a);
	    }
	}, L.prototype.abortTile = function(e, t) {
	    var r = this.loading,
	        n = e.uid;
	    r && r[n] && r[n].abort && (r[n].abort(), delete r[n]), t();
	}, L.prototype.removeTile = function(e, t) {
	    var r = this.loaded,
	        n = e.uid;
	    r && r[n] && delete r[n], t();
	};
	var E = function() {
	    this.loaded = {};
	};
	E.prototype.loadTile = function(t, r) {
	    var n = t.uid,
	        i = t.encoding,
	        o = t.rawImageData,
	        a = new e.DEMData(n, o, i);
	    this.loaded = this.loaded || {}, this.loaded[n] = a, r(null, a);
	}, E.prototype.removeTile = function(e) {
	    var t = this.loaded,
	        r = e.uid;
	    t && t[r] && delete t[r];
	};
	var D = {
	    RADIUS: 6378137,
	    FLATTENING: 1 / 298.257223563,
	    POLAR_RADIUS: 6356752.3142
	};

	function O(e) {
	    var t = 0;
	    if (e && e.length > 0) {
	        t += Math.abs(C(e[0]));
	        for (var r = 1; r < e.length; r++) t -= Math.abs(C(e[r]));
	    }
	    return t
	}

	function C(e) {
	    var t, r, n, i, o, a, s = 0,
	        l = e.length;
	    if (l > 2) {
	        for (a = 0; a < l; a++) a === l - 2 ? (n = l - 2, i = l - 1, o = 0) : a === l - 1 ? (n = l - 1, i = 0, o = 1) : (n = a, i = a + 1, o = a + 2), t = e[n], r = e[i], s += (N(e[o][0]) - N(t[0])) * Math.sin(N(r[1]));
	        s = s * D.RADIUS * D.RADIUS / 2;
	    }
	    return s
	}

	function N(e) {
	    return e * Math.PI / 180
	}
	var A = {
	        geometry: function e(t) {
	            var r, n = 0;
	            switch (t.type) {
	                case "Polygon":
	                    return O(t.coordinates);
	                case "MultiPolygon":
	                    for (r = 0; r < t.coordinates.length; r++) n += O(t.coordinates[r]);
	                    return n;
	                case "Point":
	                case "MultiPoint":
	                case "LineString":
	                case "MultiLineString":
	                    return 0;
	                case "GeometryCollection":
	                    for (r = 0; r < t.geometries.length; r++) n += e(t.geometries[r]);
	                    return n
	            }
	        },
	        ring: C
	    },
	    B = function e(t, r) {
	        switch (t && t.type || null) {
	            case "FeatureCollection":
	                return t.features = t.features.map(R(e, r)), t;
	            case "Feature":
	                return t.geometry = e(t.geometry, r), t;
	            case "Polygon":
	            case "MultiPolygon":
	                return function(e, t) {
	                    "Polygon" === e.type ? e.coordinates = F(e.coordinates, t) : "MultiPolygon" === e.type && (e.coordinates = e.coordinates.map(R(F, t)));
	                    return e
	                }(t, r);
	            default:
	                return t
	        }
	    };

	function R(e, t) {
	    return function(r) {
	        return e(r, t)
	    }
	}

	function F(e, t) {
	    t = !!t, e[0] = G(e[0], t);
	    for (var r = 1; r < e.length; r++) e[r] = G(e[r], !t);
	    return e
	}

	function G(e, t) {
	    return function(e) {
	        return A.ring(e) >= 0
	    }(e) === t ? e : e.reverse()
	}
	var J = e.mvt.VectorTileFeature.prototype.toGeoJSON,
	    X = function(t) {
	        this._feature = t, this.extent = e.EXTENT, this.type = t.type, this.properties = t.tags, "id" in t && !isNaN(t.id) && (this.id = parseInt(t.id, 10));
	    };
	X.prototype.loadGeometry = function() {
	    if (1 === this._feature.type) {
	        for (var t = [], r = 0, n = this._feature.geometry; r < n.length; r += 1) {
	            var i = n[r];
	            t.push([new e.Point(i[0], i[1])]);
	        }
	        return t
	    }
	    for (var o = [], a = 0, s = this._feature.geometry; a < s.length; a += 1) {
	        for (var l = [], u = 0, h = s[a]; u < h.length; u += 1) {
	            var c = h[u];
	            l.push(new e.Point(c[0], c[1]));
	        }
	        o.push(l);
	    }
	    return o
	}, X.prototype.toGeoJSON = function(e, t, r) {
	    return J.call(this, e, t, r)
	};
	var V = function(t) {
	    this.layers = {
	        _geojsonTileLayer: this
	    }, this.name = "_geojsonTileLayer", this.extent = e.EXTENT, this.length = t.length, this._features = t;
	};
	V.prototype.feature = function(e) {
	    return new X(this._features[e])
	};
	var Z = e.vectorTile.VectorTileFeature,
	    j = W;

	function W(e, t) {
	    this.options = t || {}, this.features = e, this.length = e.length;
	}

	function Y(e, t) {
	    this.id = "number" == typeof e.id ? e.id : void 0, this.type = e.type, this.rawGeometry = 1 === e.type ? [e.geometry] : e.geometry, this.properties = e.tags, this.extent = t || 4096;
	}
	W.prototype.feature = function(e) {
	    return new Y(this.features[e], this.options.extent)
	}, Y.prototype.loadGeometry = function() {
	    var t = this.rawGeometry;
	    this.geometry = [];
	    for (var r = 0; r < t.length; r++) {
	        for (var n = t[r], i = [], o = 0; o < n.length; o++) i.push(new e.Point$1(n[o][0], n[o][1]));
	        this.geometry.push(i);
	    }
	    return this.geometry
	}, Y.prototype.bbox = function() {
	    this.geometry || this.loadGeometry();
	    for (var e = this.geometry, t = 1 / 0, r = -1 / 0, n = 1 / 0, i = -1 / 0, o = 0; o < e.length; o++)
	        for (var a = e[o], s = 0; s < a.length; s++) {
	            var l = a[s];
	            t = Math.min(t, l.x), r = Math.max(r, l.x), n = Math.min(n, l.y), i = Math.max(i, l.y);
	        }
	    return [t, n, r, i]
	}, Y.prototype.toGeoJSON = Z.prototype.toGeoJSON;
	var q = $,
	    U = $,
	    H = function(e, t) {
	        t = t || {};
	        var r = {};
	        for (var n in e) r[n] = new j(e[n].features, t), r[n].name = n, r[n].version = t.version, r[n].extent = t.extent;
	        return $({
	            layers: r
	        })
	    },
	    Q = j;

	function $(t) {
	    var r = new e.pbf;
	    return function(e, t) {
	        for (var r in e.layers) t.writeMessage(3, K, e.layers[r]);
	    }(t, r), r.finish()
	}

	function K(e, t) {
	    var r;
	    t.writeVarintField(15, e.version || 1), t.writeStringField(1, e.name || ""), t.writeVarintField(5, e.extent || 4096);
	    var n = {
	        keys: [],
	        values: [],
	        keycache: {},
	        valuecache: {}
	    };
	    for (r = 0; r < e.length; r++) n.feature = e.feature(r), t.writeMessage(2, ee, n);
	    var i = n.keys;
	    for (r = 0; r < i.length; r++) t.writeStringField(3, i[r]);
	    var o = n.values;
	    for (r = 0; r < o.length; r++) t.writeMessage(4, oe, o[r]);
	}

	function ee(e, t) {
	    var r = e.feature;
	    void 0 !== r.id && t.writeVarintField(1, r.id), t.writeMessage(2, te, e), t.writeVarintField(3, r.type), t.writeMessage(4, ie, r);
	}

	function te(e, t) {
	    var r = e.feature,
	        n = e.keys,
	        i = e.values,
	        o = e.keycache,
	        a = e.valuecache;
	    for (var s in r.properties) {
	        var l = o[s];
	        void 0 === l && (n.push(s), l = n.length - 1, o[s] = l), t.writeVarint(l);
	        var u = r.properties[s],
	            h = typeof u;
	        "string" !== h && "boolean" !== h && "number" !== h && (u = JSON.stringify(u));
	        var c = h + ":" + u,
	            f = a[c];
	        void 0 === f && (i.push(u), f = i.length - 1, a[c] = f), t.writeVarint(f);
	    }
	}

	function re(e, t) {
	    return (t << 3) + (7 & e)
	}

	function ne(e) {
	    return e << 1 ^ e >> 31
	}

	function ie(e, t) {
	    for (var r = e.loadGeometry(), n = e.type, i = 0, o = 0, a = r.length, s = 0; s < a; s++) {
	        var l = r[s],
	            u = 1;
	        1 === n && (u = l.length), t.writeVarint(re(1, u));
	        for (var h = 3 === n ? l.length - 1 : l.length, c = 0; c < h; c++) {
	            1 === c && 1 !== n && t.writeVarint(re(2, h - 1));
	            var f = l[c].x - i,
	                p = l[c].y - o;
	            t.writeVarint(ne(f)), t.writeVarint(ne(p)), i += f, o += p;
	        }
	        3 === n && t.writeVarint(re(7, 0));
	    }
	}

	function oe(e, t) {
	    var r = typeof e;
	    "string" === r ? t.writeStringField(1, e) : "boolean" === r ? t.writeBooleanField(7, e) : "number" === r && (e % 1 != 0 ? t.writeDoubleField(3, e) : e < 0 ? t.writeSVarintField(6, e) : t.writeVarintField(5, e));
	}

	function ae(e, t, r, n, i, o) {
	    if (!(i - n <= r)) {
	        var a = Math.floor((n + i) / 2);
	        ! function e(t, r, n, i, o, a) {
	            for (; o > i;) {
	                if (o - i > 600) {
	                    var s = o - i + 1,
	                        l = n - i + 1,
	                        u = Math.log(s),
	                        h = .5 * Math.exp(2 * u / 3),
	                        c = .5 * Math.sqrt(u * h * (s - h) / s) * (l - s / 2 < 0 ? -1 : 1),
	                        f = Math.max(i, Math.floor(n - l * h / s + c)),
	                        p = Math.min(o, Math.floor(n + (s - l) * h / s + c));
	                    e(t, r, n, f, p, a);
	                }
	                var d = r[2 * n + a],
	                    g = i,
	                    m = o;
	                for (se(t, r, i, n), r[2 * o + a] > d && se(t, r, i, o); g < m;) {
	                    for (se(t, r, g, m), g++, m--; r[2 * g + a] < d;) g++;
	                    for (; r[2 * m + a] > d;) m--;
	                }
	                r[2 * i + a] === d ? se(t, r, i, m) : se(t, r, ++m, o), m <= n && (i = m + 1), n <= m && (o = m - 1);
	            }
	        }(e, t, a, n, i, o % 2), ae(e, t, r, n, a - 1, o + 1), ae(e, t, r, a + 1, i, o + 1);
	    }
	}

	function se(e, t, r, n) {
	    le(e, r, n), le(t, 2 * r, 2 * n), le(t, 2 * r + 1, 2 * n + 1);
	}

	function le(e, t, r) {
	    var n = e[t];
	    e[t] = e[r], e[r] = n;
	}

	function ue(e, t, r, n) {
	    var i = e - r,
	        o = t - n;
	    return i * i + o * o
	}

	function he(e, t, r, n, i) {
	    return new ce(e, t, r, n, i)
	}

	function ce(e, t, r, n, i) {
	    t = t || fe, r = r || pe, i = i || Array, this.nodeSize = n || 64, this.points = e, this.ids = new i(e.length), this.coords = new i(2 * e.length);
	    for (var o = 0; o < e.length; o++) this.ids[o] = o, this.coords[2 * o] = t(e[o]), this.coords[2 * o + 1] = r(e[o]);
	    ae(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
	}

	function fe(e) {
	    return e[0]
	}

	function pe(e) {
	    return e[1]
	}

	function de(e) {
	    this.options = we(Object.create(this.options), e), this.trees = new Array(this.options.maxZoom + 1);
	}

	function ge(e, t, r, n, i) {
	    return {
	        x: e,
	        y: t,
	        zoom: 1 / 0,
	        id: r,
	        parentId: -1,
	        numPoints: n,
	        properties: i
	    }
	}

	function me(e) {
	    return {
	        type: "Feature",
	        id: e.id,
	        properties: ve(e),
	        geometry: {
	            type: "Point",
	            coordinates: [(n = e.x, 360 * (n - .5)), (t = e.y, r = (180 - 360 * t) * Math.PI / 180, 360 * Math.atan(Math.exp(r)) / Math.PI - 90)]
	        }
	    };
	    var t, r, n;
	}

	function ve(e) {
	    var t = e.numPoints,
	        r = t >= 1e4 ? Math.round(t / 1e3) + "k" : t >= 1e3 ? Math.round(t / 100) / 10 + "k" : t;
	    return we(we({}, e.properties), {
	        cluster: !0,
	        cluster_id: e.id,
	        point_count: t,
	        point_count_abbreviated: r
	    })
	}

	function ye(e) {
	    return e / 360 + .5
	}

	function xe(e) {
	    var t = Math.sin(e * Math.PI / 180),
	        r = .5 - .25 * Math.log((1 + t) / (1 - t)) / Math.PI;
	    return r < 0 ? 0 : r > 1 ? 1 : r
	}

	function we(e, t) {
	    for (var r in t) e[r] = t[r];
	    return e
	}

	function Se(e) {
	    return e.x
	}

	function Me(e) {
	    return e.y
	}

	function be(e, t, r, n, i, o) {
	    var a = i - r,
	        s = o - n;
	    if (0 !== a || 0 !== s) {
	        var l = ((e - r) * a + (t - n) * s) / (a * a + s * s);
	        l > 1 ? (r = i, n = o) : l > 0 && (r += a * l, n += s * l);
	    }
	    return (a = e - r) * a + (s = t - n) * s
	}

	function Pe(e, t, r, n) {
	    var i = {
	        id: void 0 === e ? null : e,
	        type: t,
	        geometry: r,
	        tags: n,
	        minX: 1 / 0,
	        minY: 1 / 0,
	        maxX: -1 / 0,
	        maxY: -1 / 0
	    };
	    return function(e) {
	        var t = e.geometry,
	            r = e.type;
	        if ("Point" === r || "MultiPoint" === r || "LineString" === r) _e(e, t);
	        else if ("Polygon" === r || "MultiLineString" === r)
	            for (var n = 0; n < t.length; n++) _e(e, t[n]);
	        else if ("MultiPolygon" === r)
	            for (n = 0; n < t.length; n++)
	                for (var i = 0; i < t[n].length; i++) _e(e, t[n][i]);
	    }(i), i
	}

	function _e(e, t) {
	    for (var r = 0; r < t.length; r += 3) e.minX = Math.min(e.minX, t[r]), e.minY = Math.min(e.minY, t[r + 1]), e.maxX = Math.max(e.maxX, t[r]), e.maxY = Math.max(e.maxY, t[r + 1]);
	}

	function Ie(e, t, r, n) {
	    if (t.geometry) {
	        var i = t.geometry.coordinates,
	            o = t.geometry.type,
	            a = Math.pow(r.tolerance / ((1 << r.maxZoom) * r.extent), 2),
	            s = [],
	            l = t.id;
	        if (r.promoteId ? l = t.properties[r.promoteId] : r.generateId && (l = n || 0), "Point" === o) Te(i, s);
	        else if ("MultiPoint" === o)
	            for (var u = 0; u < i.length; u++) Te(i[u], s);
	        else if ("LineString" === o) ke(i, s, a, !1);
	        else if ("MultiLineString" === o) {
	            if (r.lineMetrics) {
	                for (u = 0; u < i.length; u++) s = [], ke(i[u], s, a, !1), e.push(Pe(l, "LineString", s, t.properties));
	                return
	            }
	            ze(i, s, a, !1);
	        } else if ("Polygon" === o) ze(i, s, a, !0);
	        else {
	            if ("MultiPolygon" !== o) {
	                if ("GeometryCollection" === o) {
	                    for (u = 0; u < t.geometry.geometries.length; u++) Ie(e, {
	                        id: l,
	                        geometry: t.geometry.geometries[u],
	                        properties: t.properties
	                    }, r, n);
	                    return
	                }
	                throw new Error("Input data is not a valid GeoJSON object.")
	            }
	            for (u = 0; u < i.length; u++) {
	                var h = [];
	                ze(i[u], h, a, !0), s.push(h);
	            }
	        }
	        e.push(Pe(l, o, s, t.properties));
	    }
	}

	function Te(e, t) {
	    t.push(Le(e[0])), t.push(Ee(e[1])), t.push(0);
	}

	function ke(e, t, r, n) {
	    for (var i, o, a = 0, s = 0; s < e.length; s++) {
	        var l = Le(e[s][0]),
	            u = Ee(e[s][1]);
	        t.push(l), t.push(u), t.push(0), s > 0 && (a += n ? (i * u - l * o) / 2 : Math.sqrt(Math.pow(l - i, 2) + Math.pow(u - o, 2))), i = l, o = u;
	    }
	    var h = t.length - 3;
	    t[2] = 1,
	        function e(t, r, n, i) {
	            for (var o, a = i, s = n - r >> 1, l = n - r, u = t[r], h = t[r + 1], c = t[n], f = t[n + 1], p = r + 3; p < n; p += 3) {
	                var d = be(t[p], t[p + 1], u, h, c, f);
	                if (d > a) o = p, a = d;
	                else if (d === a) {
	                    var g = Math.abs(p - s);
	                    g < l && (o = p, l = g);
	                }
	            }
	            a > i && (o - r > 3 && e(t, r, o, i), t[o + 2] = a, n - o > 3 && e(t, o, n, i));
	        }(t, 0, h, r), t[h + 2] = 1, t.size = Math.abs(a), t.start = 0, t.end = t.size;
	}

	function ze(e, t, r, n) {
	    for (var i = 0; i < e.length; i++) {
	        var o = [];
	        ke(e[i], o, r, n), t.push(o);
	    }
	}

	function Le(e) {
	    return e / 360 + .5
	}

	function Ee(e) {
	    var t = Math.sin(e * Math.PI / 180),
	        r = .5 - .25 * Math.log((1 + t) / (1 - t)) / Math.PI;
	    return r < 0 ? 0 : r > 1 ? 1 : r
	}

	function De(e, t, r, n, i, o, a, s) {
	    if (n /= t, o >= (r /= t) && a < n) return e;
	    if (a < r || o >= n) return null;
	    for (var l = [], u = 0; u < e.length; u++) {
	        var h = e[u],
	            c = h.geometry,
	            f = h.type,
	            p = 0 === i ? h.minX : h.minY,
	            d = 0 === i ? h.maxX : h.maxY;
	        if (p >= r && d < n) l.push(h);
	        else if (!(d < r || p >= n)) {
	            var g = [];
	            if ("Point" === f || "MultiPoint" === f) Oe(c, g, r, n, i);
	            else if ("LineString" === f) Ce(c, g, r, n, i, !1, s.lineMetrics);
	            else if ("MultiLineString" === f) Ae(c, g, r, n, i, !1);
	            else if ("Polygon" === f) Ae(c, g, r, n, i, !0);
	            else if ("MultiPolygon" === f)
	                for (var m = 0; m < c.length; m++) {
	                    var v = [];
	                    Ae(c[m], v, r, n, i, !0), v.length && g.push(v);
	                }
	            if (g.length) {
	                if (s.lineMetrics && "LineString" === f) {
	                    for (m = 0; m < g.length; m++) l.push(Pe(h.id, f, g[m], h.tags));
	                    continue
	                }
	                "LineString" !== f && "MultiLineString" !== f || (1 === g.length ? (f = "LineString", g = g[0]) : f = "MultiLineString"), "Point" !== f && "MultiPoint" !== f || (f = 3 === g.length ? "Point" : "MultiPoint"), l.push(Pe(h.id, f, g, h.tags));
	            }
	        }
	    }
	    return l.length ? l : null
	}

	function Oe(e, t, r, n, i) {
	    for (var o = 0; o < e.length; o += 3) {
	        var a = e[o + i];
	        a >= r && a <= n && (t.push(e[o]), t.push(e[o + 1]), t.push(e[o + 2]));
	    }
	}

	function Ce(e, t, r, n, i, o, a) {
	    for (var s, l, u = Ne(e), h = 0 === i ? Re : Fe, c = e.start, f = 0; f < e.length - 3; f += 3) {
	        var p = e[f],
	            d = e[f + 1],
	            g = e[f + 2],
	            m = e[f + 3],
	            v = e[f + 4],
	            y = 0 === i ? p : d,
	            x = 0 === i ? m : v,
	            w = !1;
	        a && (s = Math.sqrt(Math.pow(p - m, 2) + Math.pow(d - v, 2))), y < r ? x >= r && (l = h(u, p, d, m, v, r), a && (u.start = c + s * l)) : y >= n ? x < n && (l = h(u, p, d, m, v, n), a && (u.start = c + s * l)) : Be(u, p, d, g), x < r && y >= r && (l = h(u, p, d, m, v, r), w = !0), x > n && y <= n && (l = h(u, p, d, m, v, n), w = !0), !o && w && (a && (u.end = c + s * l), t.push(u), u = Ne(e)), a && (c += s);
	    }
	    var S = e.length - 3;
	    p = e[S], d = e[S + 1], g = e[S + 2], (y = 0 === i ? p : d) >= r && y <= n && Be(u, p, d, g), S = u.length - 3, o && S >= 3 && (u[S] !== u[0] || u[S + 1] !== u[1]) && Be(u, u[0], u[1], u[2]), u.length && t.push(u);
	}

	function Ne(e) {
	    var t = [];
	    return t.size = e.size, t.start = e.start, t.end = e.end, t
	}

	function Ae(e, t, r, n, i, o) {
	    for (var a = 0; a < e.length; a++) Ce(e[a], t, r, n, i, o, !1);
	}

	function Be(e, t, r, n) {
	    e.push(t), e.push(r), e.push(n);
	}

	function Re(e, t, r, n, i, o) {
	    var a = (o - t) / (n - t);
	    return e.push(o), e.push(r + (i - r) * a), e.push(1), a
	}

	function Fe(e, t, r, n, i, o) {
	    var a = (o - r) / (i - r);
	    return e.push(t + (n - t) * a), e.push(o), e.push(1), a
	}

	function Ge(e, t) {
	    for (var r = [], n = 0; n < e.length; n++) {
	        var i, o = e[n],
	            a = o.type;
	        if ("Point" === a || "MultiPoint" === a || "LineString" === a) i = Je(o.geometry, t);
	        else if ("MultiLineString" === a || "Polygon" === a) {
	            i = [];
	            for (var s = 0; s < o.geometry.length; s++) i.push(Je(o.geometry[s], t));
	        } else if ("MultiPolygon" === a)
	            for (i = [], s = 0; s < o.geometry.length; s++) {
	                for (var l = [], u = 0; u < o.geometry[s].length; u++) l.push(Je(o.geometry[s][u], t));
	                i.push(l);
	            }
	        r.push(Pe(o.id, a, i, o.tags));
	    }
	    return r
	}

	function Je(e, t) {
	    var r = [];
	    r.size = e.size, void 0 !== e.start && (r.start = e.start, r.end = e.end);
	    for (var n = 0; n < e.length; n += 3) r.push(e[n] + t, e[n + 1], e[n + 2]);
	    return r
	}

	function Xe(e, t) {
	    if (e.transformed) return e;
	    var r, n, i, o = 1 << e.z,
	        a = e.x,
	        s = e.y;
	    for (r = 0; r < e.features.length; r++) {
	        var l = e.features[r],
	            u = l.geometry,
	            h = l.type;
	        if (l.geometry = [], 1 === h)
	            for (n = 0; n < u.length; n += 2) l.geometry.push(Ve(u[n], u[n + 1], t, o, a, s));
	        else
	            for (n = 0; n < u.length; n++) {
	                var c = [];
	                for (i = 0; i < u[n].length; i += 2) c.push(Ve(u[n][i], u[n][i + 1], t, o, a, s));
	                l.geometry.push(c);
	            }
	    }
	    return e.transformed = !0, e
	}

	function Ve(e, t, r, n, i, o) {
	    return [Math.round(r * (e * n - i)), Math.round(r * (t * n - o))]
	}

	function Ze(e, t, r, n, i) {
	    for (var o = t === i.maxZoom ? 0 : i.tolerance / ((1 << t) * i.extent), a = {
	            features: [],
	            numPoints: 0,
	            numSimplified: 0,
	            numFeatures: 0,
	            source: null,
	            x: r,
	            y: n,
	            z: t,
	            transformed: !1,
	            minX: 2,
	            minY: 1,
	            maxX: -1,
	            maxY: 0
	        }, s = 0; s < e.length; s++) {
	        a.numFeatures++, je(a, e[s], o, i);
	        var l = e[s].minX,
	            u = e[s].minY,
	            h = e[s].maxX,
	            c = e[s].maxY;
	        l < a.minX && (a.minX = l), u < a.minY && (a.minY = u), h > a.maxX && (a.maxX = h), c > a.maxY && (a.maxY = c);
	    }
	    return a
	}

	function je(e, t, r, n) {
	    var i = t.geometry,
	        o = t.type,
	        a = [];
	    if ("Point" === o || "MultiPoint" === o)
	        for (var s = 0; s < i.length; s += 3) a.push(i[s]), a.push(i[s + 1]), e.numPoints++, e.numSimplified++;
	    else if ("LineString" === o) We(a, i, e, r, !1, !1);
	    else if ("MultiLineString" === o || "Polygon" === o)
	        for (s = 0; s < i.length; s++) We(a, i[s], e, r, "Polygon" === o, 0 === s);
	    else if ("MultiPolygon" === o)
	        for (var l = 0; l < i.length; l++) {
	            var u = i[l];
	            for (s = 0; s < u.length; s++) We(a, u[s], e, r, !0, 0 === s);
	        }
	    if (a.length) {
	        var h = t.tags || null;
	        if ("LineString" === o && n.lineMetrics) {
	            for (var c in h = {}, t.tags) h[c] = t.tags[c];
	            h.mapbox_clip_start = i.start / i.size, h.mapbox_clip_end = i.end / i.size;
	        }
	        var f = {
	            geometry: a,
	            type: "Polygon" === o || "MultiPolygon" === o ? 3 : "LineString" === o || "MultiLineString" === o ? 2 : 1,
	            tags: h
	        };
	        null !== t.id && (f.id = t.id), e.features.push(f);
	    }
	}

	function We(e, t, r, n, i, o) {
	    var a = n * n;
	    if (n > 0 && t.size < (i ? a : n)) r.numPoints += t.length / 3;
	    else {
	        for (var s = [], l = 0; l < t.length; l += 3)(0 === n || t[l + 2] > a) && (r.numSimplified++, s.push(t[l]), s.push(t[l + 1])), r.numPoints++;
	        i && function(e, t) {
	            for (var r = 0, n = 0, i = e.length, o = i - 2; n < i; o = n, n += 2) r += (e[n] - e[o]) * (e[n + 1] + e[o + 1]);
	            if (r > 0 === t)
	                for (n = 0, i = e.length; n < i / 2; n += 2) {
	                    var a = e[n],
	                        s = e[n + 1];
	                    e[n] = e[i - 2 - n], e[n + 1] = e[i - 1 - n], e[i - 2 - n] = a, e[i - 1 - n] = s;
	                }
	        }(s, o), e.push(s);
	    }
	}

	function Ye(e, t) {
	    var r = (t = this.options = function(e, t) {
	        for (var r in t) e[r] = t[r];
	        return e
	    }(Object.create(this.options), t)).debug;
	    if (r && console.time("preprocess data"), t.maxZoom < 0 || t.maxZoom > 24) throw new Error("maxZoom should be in the 0-24 range");
	    if (t.promoteId && t.generateId) throw new Error("promoteId and generateId cannot be used together.");
	    var n = function(e, t) {
	        var r = [];
	        if ("FeatureCollection" === e.type)
	            for (var n = 0; n < e.features.length; n++) Ie(r, e.features[n], t, n);
	        else "Feature" === e.type ? Ie(r, e, t) : Ie(r, {
	            geometry: e
	        }, t);
	        return r
	    }(e, t);
	    this.tiles = {}, this.tileCoords = [], r && (console.timeEnd("preprocess data"), console.log("index: maxZoom: %d, maxPoints: %d", t.indexMaxZoom, t.indexMaxPoints), console.time("generate tiles"), this.stats = {}, this.total = 0), (n = function(e, t) {
	        var r = t.buffer / t.extent,
	            n = e,
	            i = De(e, 1, -1 - r, r, 0, -1, 2, t),
	            o = De(e, 1, 1 - r, 2 + r, 0, -1, 2, t);
	        return (i || o) && (n = De(e, 1, -r, 1 + r, 0, -1, 2, t) || [], i && (n = Ge(i, 1).concat(n)), o && (n = n.concat(Ge(o, -1)))), n
	    }(n, t)).length && this.splitTile(n, 0, 0, 0), r && (n.length && console.log("features: %d, points: %d", this.tiles[0].numFeatures, this.tiles[0].numPoints), console.timeEnd("generate tiles"), console.log("tiles generated:", this.total, JSON.stringify(this.stats)));
	}

	function qe(e, t, r) {
	    return 32 * ((1 << e) * r + t) + e
	}

	function Ue(e, t) {
	    var r = e.tileID.canonical;
	    if (!this._geoJSONIndex) return t(null, null);
	    var n = this._geoJSONIndex.getTile(r.z, r.x, r.y);
	    if (!n) return t(null, null);
	    var i = new V(n.features),
	        o = q(i);
	    0 === o.byteOffset && o.byteLength === o.buffer.byteLength || (o = new Uint8Array(o)), t(null, {
	        vectorTile: i,
	        rawData: o.buffer
	    });
	}
	q.fromVectorTileJs = U, q.fromGeojsonVt = H, q.GeoJSONWrapper = Q, ce.prototype = {
	    range: function(e, t, r, n) {
	        return function(e, t, r, n, i, o, a) {
	            for (var s, l, u = [0, e.length - 1, 0], h = []; u.length;) {
	                var c = u.pop(),
	                    f = u.pop(),
	                    p = u.pop();
	                if (f - p <= a)
	                    for (var d = p; d <= f; d++) s = t[2 * d], l = t[2 * d + 1], s >= r && s <= i && l >= n && l <= o && h.push(e[d]);
	                else {
	                    var g = Math.floor((p + f) / 2);
	                    s = t[2 * g], l = t[2 * g + 1], s >= r && s <= i && l >= n && l <= o && h.push(e[g]);
	                    var m = (c + 1) % 2;
	                    (0 === c ? r <= s : n <= l) && (u.push(p), u.push(g - 1), u.push(m)), (0 === c ? i >= s : o >= l) && (u.push(g + 1), u.push(f), u.push(m));
	                }
	            }
	            return h
	        }(this.ids, this.coords, e, t, r, n, this.nodeSize)
	    },
	    within: function(e, t, r) {
	        return function(e, t, r, n, i, o) {
	            for (var a = [0, e.length - 1, 0], s = [], l = i * i; a.length;) {
	                var u = a.pop(),
	                    h = a.pop(),
	                    c = a.pop();
	                if (h - c <= o)
	                    for (var f = c; f <= h; f++) ue(t[2 * f], t[2 * f + 1], r, n) <= l && s.push(e[f]);
	                else {
	                    var p = Math.floor((c + h) / 2),
	                        d = t[2 * p],
	                        g = t[2 * p + 1];
	                    ue(d, g, r, n) <= l && s.push(e[p]);
	                    var m = (u + 1) % 2;
	                    (0 === u ? r - i <= d : n - i <= g) && (a.push(c), a.push(p - 1), a.push(m)), (0 === u ? r + i >= d : n + i >= g) && (a.push(p + 1), a.push(h), a.push(m));
	                }
	            }
	            return s
	        }(this.ids, this.coords, e, t, r, this.nodeSize)
	    }
	}, de.prototype = {
	    options: {
	        minZoom: 0,
	        maxZoom: 16,
	        radius: 40,
	        extent: 512,
	        nodeSize: 64,
	        log: !1,
	        reduce: null,
	        initial: function() {
	            return {}
	        },
	        map: function(e) {
	            return e
	        }
	    },
	    load: function(e) {
	        var t = this.options.log;
	        t && console.time("total time");
	        var r = "prepare " + e.length + " points";
	        t && console.time(r), this.points = e;
	        for (var n, i, o, a = [], s = 0; s < e.length; s++) e[s].geometry && a.push((n = e[s], i = s, void 0, {
	            x: ye((o = n.geometry.coordinates)[0]),
	            y: xe(o[1]),
	            zoom: 1 / 0,
	            index: i,
	            parentId: -1
	        }));
	        this.trees[this.options.maxZoom + 1] = he(a, Se, Me, this.options.nodeSize, Float32Array), t && console.timeEnd(r);
	        for (var l = this.options.maxZoom; l >= this.options.minZoom; l--) {
	            var u = +Date.now();
	            a = this._cluster(a, l), this.trees[l] = he(a, Se, Me, this.options.nodeSize, Float32Array), t && console.log("z%d: %d clusters in %dms", l, a.length, +Date.now() - u);
	        }
	        return t && console.timeEnd("total time"), this
	    },
	    getClusters: function(e, t) {
	        var r = ((e[0] + 180) % 360 + 360) % 360 - 180,
	            n = Math.max(-90, Math.min(90, e[1])),
	            i = 180 === e[2] ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180,
	            o = Math.max(-90, Math.min(90, e[3]));
	        if (e[2] - e[0] >= 360) r = -180, i = 180;
	        else if (r > i) {
	            var a = this.getClusters([r, n, 180, o], t),
	                s = this.getClusters([-180, n, i, o], t);
	            return a.concat(s)
	        }
	        for (var l = this.trees[this._limitZoom(t)], u = l.range(ye(r), xe(o), ye(i), xe(n)), h = [], c = 0; c < u.length; c++) {
	            var f = l.points[u[c]];
	            h.push(f.numPoints ? me(f) : this.points[f.index]);
	        }
	        return h
	    },
	    getChildren: function(e) {
	        var t = e >> 5,
	            r = e % 32,
	            n = "No cluster with the specified id.",
	            i = this.trees[r];
	        if (!i) throw new Error(n);
	        var o = i.points[t];
	        if (!o) throw new Error(n);
	        for (var a = this.options.radius / (this.options.extent * Math.pow(2, r - 1)), s = i.within(o.x, o.y, a), l = [], u = 0; u < s.length; u++) {
	            var h = i.points[s[u]];
	            h.parentId === e && l.push(h.numPoints ? me(h) : this.points[h.index]);
	        }
	        if (0 === l.length) throw new Error(n);
	        return l
	    },
	    getLeaves: function(e, t, r) {
	        t = t || 10, r = r || 0;
	        var n = [];
	        return this._appendLeaves(n, e, t, r, 0), n
	    },
	    getTile: function(e, t, r) {
	        var n = this.trees[this._limitZoom(e)],
	            i = Math.pow(2, e),
	            o = this.options.extent,
	            a = this.options.radius / o,
	            s = (r - a) / i,
	            l = (r + 1 + a) / i,
	            u = {
	                features: []
	            };
	        return this._addTileFeatures(n.range((t - a) / i, s, (t + 1 + a) / i, l), n.points, t, r, i, u), 0 === t && this._addTileFeatures(n.range(1 - a / i, s, 1, l), n.points, i, r, i, u), t === i - 1 && this._addTileFeatures(n.range(0, s, a / i, l), n.points, -1, r, i, u), u.features.length ? u : null
	    },
	    getClusterExpansionZoom: function(e) {
	        for (var t = e % 32 - 1; t < this.options.maxZoom;) {
	            var r = this.getChildren(e);
	            if (t++, 1 !== r.length) break;
	            e = r[0].properties.cluster_id;
	        }
	        return t
	    },
	    _appendLeaves: function(e, t, r, n, i) {
	        for (var o = this.getChildren(t), a = 0; a < o.length; a++) {
	            var s = o[a].properties;
	            if (s && s.cluster ? i + s.point_count <= n ? i += s.point_count : i = this._appendLeaves(e, s.cluster_id, r, n, i) : i < n ? i++ : e.push(o[a]), e.length === r) break
	        }
	        return i
	    },
	    _addTileFeatures: function(e, t, r, n, i, o) {
	        for (var a = 0; a < e.length; a++) {
	            var s = t[e[a]],
	                l = {
	                    type: 1,
	                    geometry: [
	                        [Math.round(this.options.extent * (s.x * i - r)), Math.round(this.options.extent * (s.y * i - n))]
	                    ],
	                    tags: s.numPoints ? ve(s) : this.points[s.index].properties
	                },
	                u = s.numPoints ? s.id : this.points[s.index].id;
	            void 0 !== u && (l.id = u), o.features.push(l);
	        }
	    },
	    _limitZoom: function(e) {
	        return Math.max(this.options.minZoom, Math.min(e, this.options.maxZoom + 1))
	    },
	    _cluster: function(e, t) {
	        for (var r = [], n = this.options.radius / (this.options.extent * Math.pow(2, t)), i = 0; i < e.length; i++) {
	            var o = e[i];
	            if (!(o.zoom <= t)) {
	                o.zoom = t;
	                var a = this.trees[t + 1],
	                    s = a.within(o.x, o.y, n),
	                    l = o.numPoints || 1,
	                    u = o.x * l,
	                    h = o.y * l,
	                    c = null;
	                this.options.reduce && (c = this.options.initial(), this._accumulate(c, o));
	                for (var f = (i << 5) + (t + 1), p = 0; p < s.length; p++) {
	                    var d = a.points[s[p]];
	                    if (!(d.zoom <= t)) {
	                        d.zoom = t;
	                        var g = d.numPoints || 1;
	                        u += d.x * g, h += d.y * g, l += g, d.parentId = f, this.options.reduce && this._accumulate(c, d);
	                    }
	                }
	                1 === l ? r.push(o) : (o.parentId = f, r.push(ge(u / l, h / l, f, l, c)));
	            }
	        }
	        return r
	    },
	    _accumulate: function(e, t) {
	        var r = t.numPoints ? t.properties : this.options.map(this.points[t.index].properties);
	        this.options.reduce(e, r);
	    }
	}, Ye.prototype.options = {
	    maxZoom: 14,
	    indexMaxZoom: 5,
	    indexMaxPoints: 1e5,
	    tolerance: 3,
	    extent: 4096,
	    buffer: 64,
	    lineMetrics: !1,
	    promoteId: null,
	    generateId: !1,
	    debug: 0
	}, Ye.prototype.splitTile = function(e, t, r, n, i, o, a) {
	    for (var s = [e, t, r, n], l = this.options, u = l.debug; s.length;) {
	        n = s.pop(), r = s.pop(), t = s.pop(), e = s.pop();
	        var h = 1 << t,
	            c = qe(t, r, n),
	            f = this.tiles[c];
	        if (!f && (u > 1 && console.time("creation"), f = this.tiles[c] = Ze(e, t, r, n, l), this.tileCoords.push({
	                z: t,
	                x: r,
	                y: n
	            }), u)) {
	            u > 1 && (console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)", t, r, n, f.numFeatures, f.numPoints, f.numSimplified), console.timeEnd("creation"));
	            var p = "z" + t;
	            this.stats[p] = (this.stats[p] || 0) + 1, this.total++;
	        }
	        if (f.source = e, i) {
	            if (t === l.maxZoom || t === i) continue;
	            var d = 1 << i - t;
	            if (r !== Math.floor(o / d) || n !== Math.floor(a / d)) continue
	        } else if (t === l.indexMaxZoom || f.numPoints <= l.indexMaxPoints) continue;
	        if (f.source = null, 0 !== e.length) {
	            u > 1 && console.time("clipping");
	            var g, m, v, y, x, w, S = .5 * l.buffer / l.extent,
	                M = .5 - S,
	                b = .5 + S,
	                P = 1 + S;
	            g = m = v = y = null, x = De(e, h, r - S, r + b, 0, f.minX, f.maxX, l), w = De(e, h, r + M, r + P, 0, f.minX, f.maxX, l), e = null, x && (g = De(x, h, n - S, n + b, 1, f.minY, f.maxY, l), m = De(x, h, n + M, n + P, 1, f.minY, f.maxY, l), x = null), w && (v = De(w, h, n - S, n + b, 1, f.minY, f.maxY, l), y = De(w, h, n + M, n + P, 1, f.minY, f.maxY, l), w = null), u > 1 && console.timeEnd("clipping"), s.push(g || [], t + 1, 2 * r, 2 * n), s.push(m || [], t + 1, 2 * r, 2 * n + 1), s.push(v || [], t + 1, 2 * r + 1, 2 * n), s.push(y || [], t + 1, 2 * r + 1, 2 * n + 1);
	        }
	    }
	}, Ye.prototype.getTile = function(e, t, r) {
	    var n = this.options,
	        i = n.extent,
	        o = n.debug;
	    if (e < 0 || e > 24) return null;
	    var a = 1 << e,
	        s = qe(e, t = (t % a + a) % a, r);
	    if (this.tiles[s]) return Xe(this.tiles[s], i);
	    o > 1 && console.log("drilling down to z%d-%d-%d", e, t, r);
	    for (var l, u = e, h = t, c = r; !l && u > 0;) u--, h = Math.floor(h / 2), c = Math.floor(c / 2), l = this.tiles[qe(u, h, c)];
	    return l && l.source ? (o > 1 && console.log("found parent tile z%d-%d-%d", u, h, c), o > 1 && console.time("drilling down"), this.splitTile(l.source, u, h, c, e, t, r), o > 1 && console.timeEnd("drilling down"), this.tiles[s] ? Xe(this.tiles[s], i) : null) : null
	};
	var He = function(t) {
	        function r(e, r, n) {
	            t.call(this, e, r, Ue), n && (this.loadGeoJSON = n);
	        }
	        return t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.loadData = function(e, t) {
	            this._pendingCallback && this._pendingCallback(null, {
	                abandoned: !0
	            }), this._pendingCallback = t, this._pendingLoadDataParams = e, this._state && "Idle" !== this._state ? this._state = "NeedsLoadData" : (this._state = "Coalescing", this._loadData());
	        }, r.prototype._loadData = function() {
	            var e = this;
	            if (this._pendingCallback && this._pendingLoadDataParams) {
	                var t = this._pendingCallback,
	                    r = this._pendingLoadDataParams;
	                delete this._pendingCallback, delete this._pendingLoadDataParams;
	                var n = !!(r && r.request && r.request.collectResourceTiming) && new T.Performance(r.request);
	                this.loadGeoJSON(r, function(i, o) {
	                    if (i || !o) return t(i);
	                    if ("object" != typeof o) return t(new Error("Input data is not a valid GeoJSON object."));
	                    B(o, !0);
	                    try {
	                        e._geoJSONIndex = r.cluster ? (a = r.superclusterOptions, new de(a)).load(o.features) : function(e, t) {
	                            return new Ye(e, t)
	                        }(o, r.geojsonVtOptions);
	                    } catch (i) {
	                        return t(i)
	                    }
	                    e.loaded = {};
	                    var a, s = {};
	                    if (n) {
	                        var l = n.finish();
	                        l && (s.resourceTiming = {}, s.resourceTiming[r.source] = JSON.parse(JSON.stringify(l)));
	                    }
	                    t(null, s);
	                });
	            }
	        }, r.prototype.coalesce = function() {
	            "Coalescing" === this._state ? this._state = "Idle" : "NeedsLoadData" === this._state && (this._state = "Coalescing", this._loadData());
	        }, r.prototype.reloadTile = function(e, r) {
	            var n = this.loaded,
	                i = e.uid;
	            return n && n[i] ? t.prototype.reloadTile.call(this, e, r) : this.loadTile(e, r)
	        }, r.prototype.loadGeoJSON = function(t, r) {
	            if (t.request) e.getJSON(t.request, r);
	            else {
	                if ("string" != typeof t.data) return r(new Error("Input data is not a valid GeoJSON object."));
	                try {
	                    return r(null, JSON.parse(t.data))
	                } catch (e) {
	                    return r(new Error("Input data is not a valid GeoJSON object."))
	                }
	            }
	        }, r.prototype.removeSource = function(e, t) {
	            this._pendingCallback && this._pendingCallback(null, {
	                abandoned: !0
	            }), t();
	        }, r.prototype.getClusterExpansionZoom = function(e, t) {
	            t(null, this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));
	        }, r.prototype.getClusterChildren = function(e, t) {
	            t(null, this._geoJSONIndex.getChildren(e.clusterId));
	        }, r.prototype.getClusterLeaves = function(e, t) {
	            t(null, this._geoJSONIndex.getLeaves(e.clusterId, e.limit, e.offset));
	        }, r
	    }(L),
	    Qe = function(t) {
	        var r = this;
	        this.self = t, this.actor = new e.Actor(t, this), this.layerIndexes = {}, this.workerSourceTypes = {
	            vector: L,
	            geojson: He
	        }, this.workerSources = {}, this.demWorkerSources = {}, this.self.registerWorkerSource = function(e, t) {
	            if (r.workerSourceTypes[e]) throw new Error('Worker source with name "' + e + '" already registered.');
	            r.workerSourceTypes[e] = t;
	        }, this.self.registerRTLTextPlugin = function(t) {
	            if (e.plugin.isLoaded()) throw new Error("RTL text plugin already registered.");
	            e.plugin.applyArabicShaping = t.applyArabicShaping, e.plugin.processBidirectionalText = t.processBidirectionalText, e.plugin.processStyledBidirectionalText = t.processStyledBidirectionalText;
	        };
	    };
	return Qe.prototype.setLayers = function(e, t, r) {
	    this.getLayerIndex(e).replace(t), r();
	}, Qe.prototype.updateLayers = function(e, t, r) {
	    this.getLayerIndex(e).update(t.layers, t.removedIds), r();
	}, Qe.prototype.loadTile = function(e, t, r) {
	    this.getWorkerSource(e, t.type, t.source).loadTile(t, r);
	}, Qe.prototype.loadDEMTile = function(e, t, r) {
	    this.getDEMWorkerSource(e, t.source).loadTile(t, r);
	}, Qe.prototype.reloadTile = function(e, t, r) {
	    this.getWorkerSource(e, t.type, t.source).reloadTile(t, r);
	}, Qe.prototype.abortTile = function(e, t, r) {
	    this.getWorkerSource(e, t.type, t.source).abortTile(t, r);
	}, Qe.prototype.removeTile = function(e, t, r) {
	    this.getWorkerSource(e, t.type, t.source).removeTile(t, r);
	}, Qe.prototype.removeDEMTile = function(e, t) {
	    this.getDEMWorkerSource(e, t.source).removeTile(t);
	}, Qe.prototype.removeSource = function(e, t, r) {
	    if (this.workerSources[e] && this.workerSources[e][t.type] && this.workerSources[e][t.type][t.source]) {
	        var n = this.workerSources[e][t.type][t.source];
	        delete this.workerSources[e][t.type][t.source], void 0 !== n.removeSource ? n.removeSource(t, r) : r();
	    }
	}, Qe.prototype.loadWorkerSource = function(e, t, r) {
	    try {
	        this.self.importScripts(t.url), r();
	    } catch (e) {
	        r(e.toString());
	    }
	}, Qe.prototype.loadRTLTextPlugin = function(t, r, n) {
	    try {
	        e.plugin.isLoaded() || (this.self.importScripts(r), n(e.plugin.isLoaded() ? null : new Error("RTL Text Plugin failed to import scripts from " + r)));
	    } catch (e) {
	        n(e.toString());
	    }
	}, Qe.prototype.getLayerIndex = function(e) {
	    var t = this.layerIndexes[e];
	    return t || (t = this.layerIndexes[e] = new n), t
	}, Qe.prototype.getWorkerSource = function(e, t, r) {
	    var n = this;
	    if (this.workerSources[e] || (this.workerSources[e] = {}), this.workerSources[e][t] || (this.workerSources[e][t] = {}), !this.workerSources[e][t][r]) {
	        var i = {
	            send: function(t, r, i) {
	                n.actor.send(t, r, i, e);
	            }
	        };
	        this.workerSources[e][t][r] = new this.workerSourceTypes[t](i, this.getLayerIndex(e));
	    }
	    return this.workerSources[e][t][r]
	}, Qe.prototype.getDEMWorkerSource = function(e, t) {
	    return this.demWorkerSources[e] || (this.demWorkerSources[e] = {}), this.demWorkerSources[e][t] || (this.demWorkerSources[e][t] = new E), this.demWorkerSources[e][t]
	}, "undefined" != typeof WorkerGlobalScope && "undefined" != typeof self && self instanceof WorkerGlobalScope && new Qe(self), Qe
	});

define(["./shared.js"],function(t){
	
	"use strict";
	var e = t.createCommonjsModule(function(t) {
	        function e(t) {
	            return !!("undefined" != typeof window && "undefined" != typeof document && Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray && Function.prototype && Function.prototype.bind && Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions && "JSON" in window && "parse" in JSON && "stringify" in JSON && function() {
	                if (!("Worker" in window && "Blob" in window && "URL" in window)) return !1;
	                var t, e, i = new Blob([""], {
	                        type: "text/javascript"
	                    }),
	                    n = URL.createObjectURL(i);
	                try {
	                    e = new Worker(n), t = !0;
	                } catch (e) {
	                    t = !1;
	                }
	                e && e.terminate();
	                return URL.revokeObjectURL(n), t
	            }() && "Uint8ClampedArray" in window && ArrayBuffer.isView && function(t) {
	                void 0 === i[t] && (i[t] = function(t) {
	                    var i = document.createElement("canvas"),
	                        n = Object.create(e.webGLContextAttributes);
	                    return n.failIfMajorPerformanceCaveat = t, i.probablySupportsContext ? i.probablySupportsContext("webgl", n) || i.probablySupportsContext("experimental-webgl", n) : i.supportsContext ? i.supportsContext("webgl", n) || i.supportsContext("experimental-webgl", n) : i.getContext("webgl", n) || i.getContext("experimental-webgl", n)
	                }(t));
	                return i[t]
	            }(t && t.failIfMajorPerformanceCaveat))
	        }
	        t.exports ? t.exports = e : window && (window.mapboxgl = window.mapboxgl || {}, window.mapboxgl.supported = e);
	        var i = {};
	        e.webGLContextAttributes = {
	            antialias: !1,
	            alpha: !0,
	            stencil: !0,
	            depth: !0
	        };
	    }),
	    i = {
	        create: function(e, i, n) {
	            var o = t.window.document.createElement(e);
	            return i && (o.className = i), n && n.appendChild(o), o
	        },
	        createNS: function(e, i) {
	            return t.window.document.createElementNS(e, i)
	        }
	    },
	    n = t.window.document ? t.window.document.documentElement.style : null;

	function o(t) {
	    if (!n) return null;
	    for (var e = 0; e < t.length; e++)
	        if (t[e] in n) return t[e];
	    return t[0]
	}
	var r, a = o(["userSelect", "MozUserSelect", "WebkitUserSelect", "msUserSelect"]);
	i.disableDrag = function() {
	    n && a && (r = n[a], n[a] = "none");
	}, i.enableDrag = function() {
	    n && a && (n[a] = r);
	};
	var s = o(["transform", "WebkitTransform"]);
	i.setTransform = function(t, e) {
	    t.style[s] = e;
	};
	var l = !1;
	try {
	    var c = Object.defineProperty({}, "passive", {
	        get: function() {
	            l = !0;
	        }
	    });
	    t.window.addEventListener("test", c, c), t.window.removeEventListener("test", c, c);
	} catch (t) {
	    l = !1;
	}
	i.addEventListener = function(t, e, i, n) {
	    void 0 === n && (n = {}), "passive" in n && l ? t.addEventListener(e, i, n) : t.addEventListener(e, i, n.capture);
	}, i.removeEventListener = function(t, e, i, n) {
	    void 0 === n && (n = {}), "passive" in n && l ? t.removeEventListener(e, i, n) : t.removeEventListener(e, i, n.capture);
	};
	var h = function(e) {
	    e.preventDefault(), e.stopPropagation(), t.window.removeEventListener("click", h, !0);
	};
	i.suppressClick = function() {
	    t.window.addEventListener("click", h, !0), t.window.setTimeout(function() {
	        t.window.removeEventListener("click", h, !0);
	    }, 0);
	}, i.mousePos = function(e, i) {
	    var n = e.getBoundingClientRect();
	    return i = i.touches ? i.touches[0] : i, new t.Point(i.clientX - n.left - e.clientLeft, i.clientY - n.top - e.clientTop)
	}, i.touchPos = function(e, i) {
	    for (var n = e.getBoundingClientRect(), o = [], r = "touchend" === i.type ? i.changedTouches : i.touches, a = 0; a < r.length; a++) o.push(new t.Point(r[a].clientX - n.left - e.clientLeft, r[a].clientY - n.top - e.clientTop));
	    return o
	}, i.mouseButton = function(e) {
	    return void 0 !== t.window.InstallTrigger && 2 === e.button && e.ctrlKey && t.window.navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? 0 : e.button
	}, i.remove = function(t) {
	    t.parentNode && t.parentNode.removeChild(t);
	};
	var u = {
	        API_URL: "https://api.mapbox.com",	//"http://mapbox/",	//
	        EVENTS_URL: "https://events.mapbox.com/events/v2",
	        REQUIRE_ACCESS_TOKEN: false,	//!0,
	        ACCESS_TOKEN: null
	    },
	    p = "See https://www.mapbox.com/api-documentation/#access-tokens";

	function d(t, e) {
	    var i = b(u.API_URL);
	    if (t.protocol = i.protocol, t.authority = i.authority, "/" !== i.path && (t.path = "" + i.path + t.path), !u.REQUIRE_ACCESS_TOKEN) return w(t);
	    if (!(e = e || u.ACCESS_TOKEN)) throw new Error("An API access token is required to use Mapbox GL. " + p);
	    if ("s" === e[0]) throw new Error("Use a public access token (pk.*) with Mapbox GL, not a secret access token (sk.*). " + p);
	    return t.params.push("access_token=" + e), w(t)
	}

	function f(t) {
	    return 0 === t.indexOf("mapbox:")
	}
	var m = function(t, e) {
	        if (!f(t)) return t;
	        var i = b(t);
	        return i.path = "/fonts/v1" + i.path, d(i, e)
	    },
	    _ = function(t, e) {
	        if (!f(t)) return t;
	        var i = b(t);
	        return i.path = "/v4/" + i.authority + ".json", i.params.push("secure"), d(i, e)
	    },
	    g = function(t, e, i, n) {
	        var o = b(t);
	        return f(t) ? (o.path = "/styles/v1" + o.path + "/sprite" + e + i, d(o, n)) : (o.path += "" + e + i, w(o))
	    },
	    v = /(\.(png|jpg)\d*)(?=$)/,
	    y = function(e, i, n) {
	        if (!i || !f(i)) return e;
	        var o = b(e),
	            r = t.browser.devicePixelRatio >= 2 || 512 === n ? "@2x" : "",
	            a = t.browser.supportsWebp ? ".webp" : "$1";
	        return o.path = o.path.replace(v, "" + r + a),
	            function(t) {
	                for (var e = 0; e < t.length; e++) 0 === t[e].indexOf("access_token=tk.") && (t[e] = "access_token=" + (u.ACCESS_TOKEN || ""));
	            }(o.params), w(o)
	    };
	var x = /^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;

	function b(t) {
	    var e = t.match(x);
	    if (!e) throw new Error("Unable to parse URL object");
	    return {
	        protocol: e[1],
	        authority: e[2],
	        path: e[3] || "/",
	        params: e[4] ? e[4].split("&") : []
	    }
	}

	function w(t) {
	    var e = t.params.length ? "?" + t.params.join("&") : "";
	    return t.protocol + "://" + t.authority + t.path + e
	}
	var E = function() {
	    this.eventData = {
	        anonId: null,
	        lastSuccess: null,
	        accessToken: u.ACCESS_TOKEN
	    }, this.queue = [], this.pending = !1, this.pendingRequest = null;
	};
	E.prototype.postTurnstileEvent = function(e) {
	    u.ACCESS_TOKEN && Array.isArray(e) && e.some(function(t) {
	        return /(mapbox\.c)(n|om)/i.test(t)
	    }) && this.queueRequest(t.browser.now());
	}, E.prototype.queueRequest = function(t) {
	    this.queue.push(t), this.processRequests();
	}, E.prototype.processRequests = function() {
	    var e = this;
	    if (!this.pendingRequest && 0 !== this.queue.length) {
	        var i = "mapbox.turnstileEventData:" + (u.ACCESS_TOKEN || ""),
	            n = t.storageAvailable("localStorage"),
	            o = !!this.eventData.accessToken && this.eventData.accessToken !== u.ACCESS_TOKEN;
	        if (o && (this.eventData.anonId = this.eventData.lastSuccess = null), (!this.eventData.anonId || !this.eventData.lastSuccess) && n) try {
	            var r = t.window.localStorage.getItem(i);
	            r && (this.eventData = JSON.parse(r));
	        } catch (e) {
	            t.warnOnce("Unable to read from LocalStorage");
	        }
	        t.validateUuid(this.eventData.anonId) || (this.eventData.anonId = t.uuid(), o = !0);
	        var a = this.queue.shift();
	        if (this.eventData.lastSuccess) {
	            var s = new Date(this.eventData.lastSuccess),
	                l = new Date(a),
	                c = (a - this.eventData.lastSuccess) / 864e5;
	            o = o || c >= 1 || c < -1 || s.getDate() !== l.getDate();
	        }
	        if (!o) return this.processRequests();
	        var h = b(u.EVENTS_URL);
	        h.params.push("access_token=" + (u.ACCESS_TOKEN || ""));
	        var p = {
	                url: w(h),
	                headers: {
	                    "Content-Type": "text/plain"
	                }
	            },
	            d = JSON.stringify([{
	                event: "appUserTurnstile",
	                created: new Date(a).toISOString(),
	                sdkIdentifier: "mapbox-gl-js",
	                sdkVersion: "0.48.0",
	                "enabled.telemetry": !1,
	                userId: this.eventData.anonId
	            }]);
	        this.pendingRequest = t.postData(p, d, function(o) {
	            if (e.pendingRequest = null, !o) {
	                if (e.eventData.lastSuccess = a, e.eventData.accessToken = u.ACCESS_TOKEN, n) try {
	                    t.window.localStorage.setItem(i, JSON.stringify(e.eventData));
	                } catch (e) {
	                    t.warnOnce("Unable to write to LocalStorage");
	                }
	                e.processRequests();
	            }
	        });
	    }
	};
	var T = new E,
	    I = T.postTurnstileEvent.bind(T);
	var S = function() {
	    this.images = {}, this.loaded = !1, this.requestors = [], this.shelfPack = new t.ShelfPack(64, 64, {
	        autoResize: !0
	    }), this.patterns = {}, this.atlasImage = new t.RGBAImage({
	        width: 64,
	        height: 64
	    }), this.dirty = !0;
	};
	S.prototype.isLoaded = function() {
	    return this.loaded
	}, S.prototype.setLoaded = function(t) {
	    if (this.loaded !== t && (this.loaded = t, t)) {
	        for (var e = 0, i = this.requestors; e < i.length; e += 1) {
	            var n = i[e],
	                o = n.ids,
	                r = n.callback;
	            this._notify(o, r);
	        }
	        this.requestors = [];
	    }
	}, S.prototype.getImage = function(t) {
	    return this.images[t]
	}, S.prototype.addImage = function(t, e) {
	    this.images[t] = e;
	}, S.prototype.removeImage = function(t) {
	    delete this.images[t];
	    var e = this.patterns[t];
	    e && (this.shelfPack.unref(e.bin), delete this.patterns[t]);
	}, S.prototype.listImages = function() {
	    return Object.keys(this.images)
	}, S.prototype.getImages = function(t, e) {
	    var i = !0;
	    if (!this.isLoaded())
	        for (var n = 0, o = t; n < o.length; n += 1) {
	            var r = o[n];
	            this.images[r] || (i = !1);
	        }
	    this.isLoaded() || i ? this._notify(t, e) : this.requestors.push({
	        ids: t,
	        callback: e
	    });
	}, S.prototype._notify = function(t, e) {
	    for (var i = {}, n = 0, o = t; n < o.length; n += 1) {
	        var r = o[n],
	            a = this.images[r];
	        a && (i[r] = {
	            data: a.data.clone(),
	            pixelRatio: a.pixelRatio,
	            sdf: a.sdf
	        });
	    }
	    e(null, i);
	}, S.prototype.getPixelSize = function() {
	    return {
	        width: this.shelfPack.w,
	        height: this.shelfPack.h
	    }
	}, S.prototype.getPattern = function(e) {
	    var i = this.patterns[e];
	    if (i) return i.position;
	    var n = this.getImage(e);
	    if (!n) return null;
	    var o = n.data.width + 2,
	        r = n.data.height + 2,
	        a = this.shelfPack.packOne(o, r);
	    if (!a) return null;
	    this.atlasImage.resize(this.getPixelSize());
	    var s = n.data,
	        l = this.atlasImage,
	        c = a.x + 1,
	        h = a.y + 1,
	        u = s.width,
	        p = s.height;
	    t.RGBAImage.copy(s, l, {
	        x: 0,
	        y: 0
	    }, {
	        x: c,
	        y: h
	    }, {
	        width: u,
	        height: p
	    }), t.RGBAImage.copy(s, l, {
	        x: 0,
	        y: p - 1
	    }, {
	        x: c,
	        y: h - 1
	    }, {
	        width: u,
	        height: 1
	    }), t.RGBAImage.copy(s, l, {
	        x: 0,
	        y: 0
	    }, {
	        x: c,
	        y: h + p
	    }, {
	        width: u,
	        height: 1
	    }), t.RGBAImage.copy(s, l, {
	        x: u - 1,
	        y: 0
	    }, {
	        x: c - 1,
	        y: h
	    }, {
	        width: 1,
	        height: p
	    }), t.RGBAImage.copy(s, l, {
	        x: 0,
	        y: 0
	    }, {
	        x: c + u,
	        y: h
	    }, {
	        width: 1,
	        height: p
	    }), this.dirty = !0;
	    var d = new t.ImagePosition(a, n);
	    return this.patterns[e] = {
	        bin: a,
	        position: d
	    }, d
	}, S.prototype.bind = function(e) {
	    var i = e.gl;
	    this.atlasTexture ? this.dirty && (this.atlasTexture.update(this.atlasImage), this.dirty = !1) : this.atlasTexture = new t.Texture(e, this.atlasImage, i.RGBA), this.atlasTexture.bind(i.LINEAR, i.CLAMP_TO_EDGE);
	};
	var C = P,
	    z = 1e20;

	function P(t, e, i, n, o, r) {
	    this.fontSize = t || 24, this.buffer = void 0 === e ? 3 : e, this.cutoff = n || .25, this.fontFamily = o || "sans-serif", this.fontWeight = r || "normal", this.radius = i || 8;
	    var a = this.size = this.fontSize + 2 * this.buffer;
	    this.canvas = document.createElement("canvas"), this.canvas.width = this.canvas.height = a, this.ctx = this.canvas.getContext("2d"), this.ctx.font = this.fontWeight + " " + this.fontSize + "px " + this.fontFamily, this.ctx.textBaseline = "middle", this.ctx.fillStyle = "black", this.gridOuter = new Float64Array(a * a), this.gridInner = new Float64Array(a * a), this.f = new Float64Array(a), this.d = new Float64Array(a), this.z = new Float64Array(a + 1), this.v = new Int16Array(a), this.middle = Math.round(a / 2 * (navigator.userAgent.indexOf("Gecko/") >= 0 ? 1.2 : 1));
	}

	function A(t, e, i, n, o, r, a) {
	    for (var s = 0; s < e; s++) {
	        for (var l = 0; l < i; l++) n[l] = t[l * e + s];
	        for (D(n, o, r, a, i), l = 0; l < i; l++) t[l * e + s] = o[l];
	    }
	    for (l = 0; l < i; l++) {
	        for (s = 0; s < e; s++) n[s] = t[l * e + s];
	        for (D(n, o, r, a, e), s = 0; s < e; s++) t[l * e + s] = Math.sqrt(o[s]);
	    }
	}

	function D(t, e, i, n, o) {
	    i[0] = 0, n[0] = -z, n[1] = +z;
	    for (var r = 1, a = 0; r < o; r++) {
	        for (var s = (t[r] + r * r - (t[i[a]] + i[a] * i[a])) / (2 * r - 2 * i[a]); s <= n[a];) a--, s = (t[r] + r * r - (t[i[a]] + i[a] * i[a])) / (2 * r - 2 * i[a]);
	        i[++a] = r, n[a] = s, n[a + 1] = +z;
	    }
	    for (r = 0, a = 0; r < o; r++) {
	        for (; n[a + 1] < r;) a++;
	        e[r] = (r - i[a]) * (r - i[a]) + t[i[a]];
	    }
	}
	P.prototype.draw = function(t) {
	    this.ctx.clearRect(0, 0, this.size, this.size), this.ctx.fillText(t, this.buffer, this.middle);
	    for (var e = this.ctx.getImageData(0, 0, this.size, this.size), i = new Uint8ClampedArray(this.size * this.size), n = 0; n < this.size * this.size; n++) {
	        var o = e.data[4 * n + 3] / 255;
	        this.gridOuter[n] = 1 === o ? 0 : 0 === o ? z : Math.pow(Math.max(0, .5 - o), 2), this.gridInner[n] = 1 === o ? z : 0 === o ? 0 : Math.pow(Math.max(0, o - .5), 2);
	    }
	    for (A(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z), A(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z), n = 0; n < this.size * this.size; n++) {
	        var r = this.gridOuter[n] - this.gridInner[n];
	        i[n] = Math.max(0, Math.min(255, Math.round(255 - 255 * (r / this.radius + this.cutoff))));
	    }
	    return i
	};
	var R = function(t, e) {
	    this.requestTransform = t, this.localIdeographFontFamily = e, this.entries = {};
	};
	R.prototype.setURL = function(t) {
	    this.url = t;
	}, R.prototype.getGlyphs = function(e, i) {
	    var n = this,
	        o = [];
	    for (var r in e)
	        for (var a = 0, s = e[r]; a < s.length; a += 1) {
	            var l = s[a];
	            o.push({
	                stack: r,
	                id: l
	            });
	        }
	    t.asyncAll(o, function(t, e) {
	        var i = t.stack,
	            o = t.id,
	            r = n.entries[i];
	        r || (r = n.entries[i] = {
	            glyphs: {},
	            requests: {}
	        });
	        var a = r.glyphs[o];
	        if (void 0 === a)
	            if (a = n._tinySDF(r, i, o)) e(null, {
	                stack: i,
	                id: o,
	                glyph: a
	            });
	            else {
	                var s = Math.floor(o / 256);
	                if (256 * s > 65535) e(new Error("glyphs > 65535 not supported"));
	                else {
	                    var l = r.requests[s];
	                    l || (l = r.requests[s] = [], R.loadGlyphRange(i, s, n.url, n.requestTransform, function(t, e) {
	                        if (e)
	                            for (var i in e) r.glyphs[+i] = e[+i];
	                        for (var n = 0, o = l; n < o.length; n += 1) {
	                            (0, o[n])(t, e);
	                        }
	                        delete r.requests[s];
	                    })), l.push(function(t, n) {
	                        t ? e(t) : n && e(null, {
	                            stack: i,
	                            id: o,
	                            glyph: n[o] || null
	                        });
	                    });
	                }
	            }
	        else e(null, {
	            stack: i,
	            id: o,
	            glyph: a
	        });
	    }, function(t, e) {
	        if (t) i(t);
	        else if (e) {
	            for (var n = {}, o = 0, r = e; o < r.length; o += 1) {
	                var a = r[o],
	                    s = a.stack,
	                    l = a.id,
	                    c = a.glyph;
	                (n[s] || (n[s] = {}))[l] = c && {
	                    id: c.id,
	                    bitmap: c.bitmap.clone(),
	                    metrics: c.metrics
	                };
	            }
	            i(null, n);
	        }
	    });
	}, R.prototype._tinySDF = function(e, i, n) {
	    var o = this.localIdeographFontFamily;
	    if (o && (t.isChar["CJK Unified Ideographs"](n) || t.isChar["Hangul Syllables"](n))) {
	        var r = e.tinySDF;
	        if (!r) {
	            var a = "400";
	            /bold/i.test(i) ? a = "900" : /medium/i.test(i) ? a = "500" : /light/i.test(i) && (a = "200"), r = e.tinySDF = new R.TinySDF(24, 3, 8, .25, o, a);
	        }
	        return {
	            id: n,
	            bitmap: new t.AlphaImage({
	                width: 30,
	                height: 30
	            }, r.draw(String.fromCharCode(n))),
	            metrics: {
	                width: 24,
	                height: 24,
	                left: 0,
	                top: -8,
	                advance: 24
	            }
	        }
	    }
	}, R.loadGlyphRange = function(e, i, n, o, r) {
	    var a = 256 * i,
	        s = a + 255,
	        l = o(m(n).replace("{fontstack}", e).replace("{range}", a + "-" + s), t.ResourceType.Glyphs);
	    t.getArrayBuffer(l, function(e, i) {
	        if (e) r(e);
	        else if (i) {
	            for (var n = {}, o = 0, a = t.parseGlyphPBF(i.data); o < a.length; o += 1) {
	                var s = a[o];
	                n[s.id] = s;
	            }
	            r(null, n);
	        }
	    });
	}, R.TinySDF = C;
	var M = function() {
	    this.specification = t.styleSpec.light.position;
	};
	M.prototype.possiblyEvaluate = function(e, i) {
	    return t.sphericalToCartesian(e.expression.evaluate(i))
	}, M.prototype.interpolate = function(e, i, n) {
	    return {
	        x: t.number(e.x, i.x, n),
	        y: t.number(e.y, i.y, n),
	        z: t.number(e.z, i.z, n)
	    }
	};
	var L = new t.Properties({
	        anchor: new t.DataConstantProperty(t.styleSpec.light.anchor),
	        position: new M,
	        color: new t.DataConstantProperty(t.styleSpec.light.color),
	        intensity: new t.DataConstantProperty(t.styleSpec.light.intensity)
	    }),
	    k = function(e) {
	        function i(i) {
	            e.call(this), this._transitionable = new t.Transitionable(L), this.setLight(i), this._transitioning = this._transitionable.untransitioned();
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.getLight = function() {
	            return this._transitionable.serialize()
	        }, i.prototype.setLight = function(e) {
	            if (!this._validate(t.validateLight, e))
	                for (var i in e) {
	                    var n = e[i];
	                    t.endsWith(i, "-transition") ? this._transitionable.setTransition(i.slice(0, -"-transition".length), n) : this._transitionable.setValue(i, n);
	                }
	        }, i.prototype.updateTransitions = function(t) {
	            this._transitioning = this._transitionable.transitioned(t, this._transitioning);
	        }, i.prototype.hasTransition = function() {
	            return this._transitioning.hasTransition()
	        }, i.prototype.recalculate = function(t) {
	            this.properties = this._transitioning.possiblyEvaluate(t);
	        }, i.prototype._validate = function(e, i) {
	            return t.emitValidationErrors(this, e.call(t.validateStyle, t.extend({
	                value: i,
	                style: {
	                    glyphs: !0,
	                    sprite: !0
	                },
	                styleSpec: t.styleSpec
	            })))
	        }, i
	    }(t.Evented),
	    B = function(t, e) {
	        this.width = t, this.height = e, this.nextRow = 0, this.bytes = 4, this.data = new Uint8Array(this.width * this.height * this.bytes), this.positions = {};
	    };
	B.prototype.getDash = function(t, e) {
	    var i = t.join(",") + String(e);
	    return this.positions[i] || (this.positions[i] = this.addDash(t, e)), this.positions[i]
	}, B.prototype.addDash = function(e, i) {
	    var n = i ? 7 : 0,
	        o = 2 * n + 1;
	    if (this.nextRow + o > this.height) return t.warnOnce("LineAtlas out of space"), null;
	    for (var r = 0, a = 0; a < e.length; a++) r += e[a];
	    for (var s = this.width / r, l = s / 2, c = e.length % 2 == 1, h = -n; h <= n; h++)
	        for (var u = this.nextRow + n + h, p = this.width * u, d = c ? -e[e.length - 1] : 0, f = e[0], m = 1, _ = 0; _ < this.width; _++) {
	            for (; f < _ / s;) d = f, f += e[m], c && m === e.length - 1 && (f += e[0]), m++;
	            var g = Math.abs(_ - d * s),
	                v = Math.abs(_ - f * s),
	                y = Math.min(g, v),
	                x = m % 2 == 1,
	                b = void 0;
	            if (i) {
	                var w = n ? h / n * (l + 1) : 0;
	                if (x) {
	                    var E = l - Math.abs(w);
	                    b = Math.sqrt(y * y + E * E);
	                } else b = l - Math.sqrt(y * y + w * w);
	            } else b = (x ? 1 : -1) * y;
	            this.data[3 + 4 * (p + _)] = Math.max(0, Math.min(255, b + 128));
	        }
	    var T = {
	        y: (this.nextRow + n + .5) / this.height,
	        height: 2 * n / this.height,
	        width: r
	    };
	    return this.nextRow += o, this.dirty = !0, T
	}, B.prototype.bind = function(t) {
	    var e = t.gl;
	    this.texture ? (e.bindTexture(e.TEXTURE_2D, this.texture), this.dirty && (this.dirty = !1, e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, this.data))) : (this.texture = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, this.data));
	};
	var O = function e(i, n) {
	    this.workerPool = i, this.actors = [], this.currentActor = 0, this.id = t.uniqueId();
	    for (var o = this.workerPool.acquire(this.id), r = 0; r < o.length; r++) {
	        var a = o[r],
	            s = new e.Actor(a, n, this.id);
	        s.name = "Worker " + r, this.actors.push(s);
	    }
	};

	function F(e, i, n) {
	    var o = function(e, i) {
	        if (e) return n(e);
	        if (i) {
	            var o = t.pick(i, ["tiles", "minzoom", "maxzoom", "attribution", "mapbox_logo", "bounds"]);
	            i.vector_layers && (o.vectorLayers = i.vector_layers, o.vectorLayerIds = o.vectorLayers.map(function(t) {
	                return t.id
	            })), n(null, o);
	        }
	    };
	    return e.url ? t.getJSON(i(_(e.url), t.ResourceType.Source), o) : t.browser.frame(function() {
	        return o(null, e)
	    })
	}
	O.prototype.broadcast = function(e, i, n) {
	    n = n || function() {}, t.asyncAll(this.actors, function(t, n) {
	        t.send(e, i, n);
	    }, n);
	}, O.prototype.send = function(t, e, i, n) {
	    return ("number" != typeof n || isNaN(n)) && (n = this.currentActor = (this.currentActor + 1) % this.actors.length), this.actors[n].send(t, e, i), n
	}, O.prototype.remove = function() {
	    this.actors.forEach(function(t) {
	        t.remove();
	    }), this.actors = [], this.workerPool.release(this.id);
	}, O.Actor = t.Actor;
	var N = function(t, e) {
	    if (isNaN(t) || isNaN(e)) throw new Error("Invalid LngLat object: (" + t + ", " + e + ")");
	    if (this.lng = +t, this.lat = +e, this.lat > 90 || this.lat < -90) throw new Error("Invalid LngLat latitude value: must be between -90 and 90")
	};
	N.prototype.wrap = function() {
	    return new N(t.wrap(this.lng, -180, 180), this.lat)
	}, N.prototype.toArray = function() {
	    return [this.lng, this.lat]
	}, N.prototype.toString = function() {
	    return "LngLat(" + this.lng + ", " + this.lat + ")"
	}, N.prototype.toBounds = function(t) {
	    var e = 360 * t / 40075017,
	        i = e / Math.cos(Math.PI / 180 * this.lat);
	    return new U(new N(this.lng - i, this.lat - e), new N(this.lng + i, this.lat + e))
	}, N.convert = function(t) {
	    if (t instanceof N) return t;
	    if (Array.isArray(t) && (2 === t.length || 3 === t.length)) return new N(Number(t[0]), Number(t[1]));
	    if (!Array.isArray(t) && "object" == typeof t && null !== t) return new N(Number(t.lng), Number(t.lat));
	    throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]")
	};
	var U = function(t, e) {
	    t && (e ? this.setSouthWest(t).setNorthEast(e) : 4 === t.length ? this.setSouthWest([t[0], t[1]]).setNorthEast([t[2], t[3]]) : this.setSouthWest(t[0]).setNorthEast(t[1]));
	};
	U.prototype.setNorthEast = function(t) {
	    return this._ne = t instanceof N ? new N(t.lng, t.lat) : N.convert(t), this
	}, U.prototype.setSouthWest = function(t) {
	    return this._sw = t instanceof N ? new N(t.lng, t.lat) : N.convert(t), this
	}, U.prototype.extend = function(t) {
	    var e, i, n = this._sw,
	        o = this._ne;
	    if (t instanceof N) e = t, i = t;
	    else {
	        if (!(t instanceof U)) return Array.isArray(t) ? t.every(Array.isArray) ? this.extend(U.convert(t)) : this.extend(N.convert(t)) : this;
	        if (e = t._sw, i = t._ne, !e || !i) return this
	    }
	    return n || o ? (n.lng = Math.min(e.lng, n.lng), n.lat = Math.min(e.lat, n.lat), o.lng = Math.max(i.lng, o.lng), o.lat = Math.max(i.lat, o.lat)) : (this._sw = new N(e.lng, e.lat), this._ne = new N(i.lng, i.lat)), this
	}, U.prototype.getCenter = function() {
	    return new N((this._sw.lng + this._ne.lng) / 2, (this._sw.lat + this._ne.lat) / 2)
	}, U.prototype.getSouthWest = function() {
	    return this._sw
	}, U.prototype.getNorthEast = function() {
	    return this._ne
	}, U.prototype.getNorthWest = function() {
	    return new N(this.getWest(), this.getNorth())
	}, U.prototype.getSouthEast = function() {
	    return new N(this.getEast(), this.getSouth())
	}, U.prototype.getWest = function() {
	    return this._sw.lng
	}, U.prototype.getSouth = function() {
	    return this._sw.lat
	}, U.prototype.getEast = function() {
	    return this._ne.lng
	}, U.prototype.getNorth = function() {
	    return this._ne.lat
	}, U.prototype.toArray = function() {
	    return [this._sw.toArray(), this._ne.toArray()]
	}, U.prototype.toString = function() {
	    return "LngLatBounds(" + this._sw.toString() + ", " + this._ne.toString() + ")"
	}, U.prototype.isEmpty = function() {
	    return !(this._sw && this._ne)
	}, U.convert = function(t) {
	    return !t || t instanceof U ? t : new U(t)
	};
	var V = function(t, e, i) {
	    this.bounds = U.convert(this.validateBounds(t)), this.minzoom = e || 0, this.maxzoom = i || 24;
	};
	V.prototype.validateBounds = function(t) {
	    return Array.isArray(t) && 4 === t.length ? [Math.max(-180, t[0]), Math.max(-90, t[1]), Math.min(180, t[2]), Math.min(90, t[3])] : [-180, -90, 180, 90]
	}, V.prototype.contains = function(t) {
	    var e = Math.floor(this.lngX(this.bounds.getWest(), t.z)),
	        i = Math.floor(this.latY(this.bounds.getNorth(), t.z)),
	        n = Math.ceil(this.lngX(this.bounds.getEast(), t.z)),
	        o = Math.ceil(this.latY(this.bounds.getSouth(), t.z));
	    return t.x >= e && t.x < n && t.y >= i && t.y < o
	}, V.prototype.lngX = function(t, e) {
	    return (t + 180) * (Math.pow(2, e) / 360)
	}, V.prototype.latY = function(e, i) {
	    var n = t.clamp(Math.sin(Math.PI / 180 * e), -.9999, .9999),
	        o = Math.pow(2, i) / (2 * Math.PI);
	    return Math.pow(2, i - 1) + .5 * Math.log((1 + n) / (1 - n)) * -o
	};
	var Z = function(e) {
	        function i(i, n, o, r) {
	            if (e.call(this), this.id = i, this.dispatcher = o, this.type = "vector", this.minzoom = 0, this.maxzoom = 22, this.scheme = "xyz", this.tileSize = 512, this.reparseOverscaled = !0, this.isTileClipped = !0, t.extend(this, t.pick(n, ["url", "scheme", "tileSize"])), this._options = t.extend({
	                    type: "vector"
	                }, n), this._collectResourceTiming = n.collectResourceTiming, 512 !== this.tileSize) throw new Error("vector tile sources must have a tileSize of 512");
	            this.setEventedParent(r);
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function() {
	            var e = this;
	            this.fire(new t.Event("dataloading", {
	                dataType: "source"
	            })), this._tileJSONRequest = F(this._options, this.map._transformRequest, function(i, n) {
	                e._tileJSONRequest = null, i ? e.fire(new t.ErrorEvent(i)) : n && (t.extend(e, n), n.bounds && (e.tileBounds = new V(n.bounds, e.minzoom, e.maxzoom)), I(n.tiles), e.fire(new t.Event("data", {
	                    dataType: "source",
	                    sourceDataType: "metadata"
	                })), e.fire(new t.Event("data", {
	                    dataType: "source",
	                    sourceDataType: "content"
	                })));
	            });
	        }, i.prototype.hasTile = function(t) {
	            return !this.tileBounds || this.tileBounds.contains(t.canonical)
	        }, i.prototype.onAdd = function(t) {
	            this.map = t, this.load();
	        }, i.prototype.onRemove = function() {
	            this._tileJSONRequest && (this._tileJSONRequest.cancel(), this._tileJSONRequest = null);
	        }, i.prototype.serialize = function() {
	            return t.extend({}, this._options)
	        }, i.prototype.loadTile = function(e, i) {
	            var n = y(e.tileID.canonical.url(this.tiles, this.scheme), this.url),
	                o = {
	                    request: this.map._transformRequest(n, t.ResourceType.Tile),
	                    uid: e.uid,
	                    tileID: e.tileID,
	                    zoom: e.tileID.overscaledZ,
	                    tileSize: this.tileSize * e.tileID.overscaleFactor(),
	                    type: this.type,
	                    source: this.id,
	                    pixelRatio: t.browser.devicePixelRatio,
	                    showCollisionBoxes: this.map.showCollisionBoxes
	                };

	            function r(t, n) {
	                return e.aborted ? i(null) : t && 404 !== t.status ? i(t) : (n && n.resourceTiming && (e.resourceTiming = n.resourceTiming), this.map._refreshExpiredTiles && n && e.setExpiryData(n), e.loadVectorData(n, this.map.painter), i(null), void(e.reloadCallback && (this.loadTile(e, e.reloadCallback), e.reloadCallback = null)))
	            }
	            o.request.collectResourceTiming = this._collectResourceTiming, void 0 === e.workerID || "expired" === e.state ? e.workerID = this.dispatcher.send("loadTile", o, r.bind(this)) : "loading" === e.state ? e.reloadCallback = i : this.dispatcher.send("reloadTile", o, r.bind(this), e.workerID);
	        }, i.prototype.abortTile = function(t) {
	            this.dispatcher.send("abortTile", {
	                uid: t.uid,
	                type: this.type,
	                source: this.id
	            }, void 0, t.workerID);
	        }, i.prototype.unloadTile = function(t) {
	            t.unloadVectorData(), this.dispatcher.send("removeTile", {
	                uid: t.uid,
	                type: this.type,
	                source: this.id
	            }, void 0, t.workerID);
	        }, i.prototype.hasTransition = function() {
	            return !1
	        }, i
	    }(t.Evented),
	    j = function(e) {
	        function i(i, n, o, r) {
	            e.call(this), this.id = i, this.dispatcher = o, this.setEventedParent(r), this.type = "raster", this.minzoom = 0, this.maxzoom = 22, this.roundZoom = !0, this.scheme = "xyz", this.tileSize = 512, this._loaded = !1, this._options = t.extend({}, n), t.extend(this, t.pick(n, ["url", "scheme", "tileSize"]));
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function() {
	            var e = this;
	            this.fire(new t.Event("dataloading", {
	                dataType: "source"
	            })), this._tileJSONRequest = F(this._options, this.map._transformRequest, function(i, n) {
	                e._tileJSONRequest = null, i ? e.fire(new t.ErrorEvent(i)) : n && (t.extend(e, n), n.bounds && (e.tileBounds = new V(n.bounds, e.minzoom, e.maxzoom)), I(n.tiles), e.fire(new t.Event("data", {
	                    dataType: "source",
	                    sourceDataType: "metadata"
	                })), e.fire(new t.Event("data", {
	                    dataType: "source",
	                    sourceDataType: "content"
	                })));
	            });
	        }, i.prototype.onAdd = function(t) {
	            this.map = t, this.load();
	        }, i.prototype.onRemove = function() {
	            this._tileJSONRequest && (this._tileJSONRequest.cancel(), this._tileJSONRequest = null);
	        }, i.prototype.serialize = function() {
	            return t.extend({}, this._options)
	        }, i.prototype.hasTile = function(t) {
	            return !this.tileBounds || this.tileBounds.contains(t.canonical)
	        }, i.prototype.loadTile = function(e, i) {
	            var n = this,
	                o = y(e.tileID.canonical.url(this.tiles, this.scheme), this.url, this.tileSize);
	            e.request = t.getImage(this.map._transformRequest(o, t.ResourceType.Tile), function(o, r) {
	                if (delete e.request, e.aborted) e.state = "unloaded", i(null);
	                else if (o) e.state = "errored", i(o);
	                else if (r) {
	                    n.map._refreshExpiredTiles && e.setExpiryData(r), delete r.cacheControl, delete r.expires;
	                    var a = n.map.painter.context,
	                        s = a.gl;
	                    e.texture = n.map.painter.getTileTexture(r.width), e.texture ? e.texture.update(r, {
	                        useMipmap: !0
	                    }) : (e.texture = new t.Texture(a, r, s.RGBA, {
	                        useMipmap: !0
	                    }), e.texture.bind(s.LINEAR, s.CLAMP_TO_EDGE, s.LINEAR_MIPMAP_NEAREST), a.extTextureFilterAnisotropic && s.texParameterf(s.TEXTURE_2D, a.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, a.extTextureFilterAnisotropicMax)), e.state = "loaded", i(null);
	                }
	            });
	        }, i.prototype.abortTile = function(t, e) {
	            t.request && (t.request.cancel(), delete t.request), e();
	        }, i.prototype.unloadTile = function(t, e) {
	            t.texture && this.map.painter.saveTileTexture(t.texture), e();
	        }, i.prototype.hasTransition = function() {
	            return !1
	        }, i
	    }(t.Evented),
	    q = function(e) {
	        function i(i, n, o, r) {
	            e.call(this, i, n, o, r), this.type = "raster-dem", this.maxzoom = 22, this._options = t.extend({}, n), this.encoding = n.encoding || "mapbox";
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.serialize = function() {
	            return {
	                type: "raster-dem",
	                url: this.url,
	                tileSize: this.tileSize,
	                tiles: this.tiles,
	                bounds: this.bounds,
	                encoding: this.encoding
	            }
	        }, i.prototype.loadTile = function(e, i) {
	            var n = y(e.tileID.canonical.url(this.tiles, this.scheme), this.url, this.tileSize);
	            e.request = t.getImage(this.map._transformRequest(n, t.ResourceType.Tile), function(n, o) {
	                if (delete e.request, e.aborted) e.state = "unloaded", i(null);
	                else if (n) e.state = "errored", i(n);
	                else if (o) {
	                    this.map._refreshExpiredTiles && e.setExpiryData(o), delete o.cacheControl, delete o.expires;
	                    var r = t.browser.getImageData(o),
	                        a = {
	                            uid: e.uid,
	                            coord: e.tileID,
	                            source: this.id,
	                            rawImageData: r,
	                            encoding: this.encoding
	                        };
	                    e.workerID && "expired" !== e.state || (e.workerID = this.dispatcher.send("loadDEMTile", a, function(t, n) {
	                        t && (e.state = "errored", i(t));
	                        n && (e.dem = n, e.needsHillshadePrepare = !0, e.state = "loaded", i(null));
	                    }.bind(this)));
	                }
	            }.bind(this)), e.neighboringTiles = this._getNeighboringTiles(e.tileID);
	        }, i.prototype._getNeighboringTiles = function(e) {
	            var i = e.canonical,
	                n = Math.pow(2, i.z),
	                o = (i.x - 1 + n) % n,
	                r = 0 === i.x ? e.wrap - 1 : e.wrap,
	                a = (i.x + 1 + n) % n,
	                s = i.x + 1 === n ? e.wrap + 1 : e.wrap,
	                l = {};
	            return l[new t.OverscaledTileID(e.overscaledZ, r, i.z, o, i.y).key] = {
	                backfilled: !1
	            }, l[new t.OverscaledTileID(e.overscaledZ, s, i.z, a, i.y).key] = {
	                backfilled: !1
	            }, i.y > 0 && (l[new t.OverscaledTileID(e.overscaledZ, r, i.z, o, i.y - 1).key] = {
	                backfilled: !1
	            }, l[new t.OverscaledTileID(e.overscaledZ, e.wrap, i.z, i.x, i.y - 1).key] = {
	                backfilled: !1
	            }, l[new t.OverscaledTileID(e.overscaledZ, s, i.z, a, i.y - 1).key] = {
	                backfilled: !1
	            }), i.y + 1 < n && (l[new t.OverscaledTileID(e.overscaledZ, r, i.z, o, i.y + 1).key] = {
	                backfilled: !1
	            }, l[new t.OverscaledTileID(e.overscaledZ, e.wrap, i.z, i.x, i.y + 1).key] = {
	                backfilled: !1
	            }, l[new t.OverscaledTileID(e.overscaledZ, s, i.z, a, i.y + 1).key] = {
	                backfilled: !1
	            }), l
	        }, i.prototype.unloadTile = function(t) {
	            t.demTexture && this.map.painter.saveTileTexture(t.demTexture), t.fbo && (t.fbo.destroy(), delete t.fbo), t.dem && delete t.dem, delete t.neighboringTiles, t.state = "unloaded", this.dispatcher.send("removeDEMTile", {
	                uid: t.uid,
	                source: this.id
	            }, void 0, t.workerID);
	        }, i
	    }(j),
	    G = function(e) {
	        function i(i, n, o, r) {
	            e.call(this), this.id = i, this.type = "geojson", this.minzoom = 0, this.maxzoom = 18, this.tileSize = 512, this.isTileClipped = !0, this.reparseOverscaled = !0, this._removed = !1, this.dispatcher = o, this.setEventedParent(r), this._data = n.data, this._options = t.extend({}, n), this._collectResourceTiming = n.collectResourceTiming, this._resourceTiming = [], void 0 !== n.maxzoom && (this.maxzoom = n.maxzoom), n.type && (this.type = n.type), n.attribution && (this.attribution = n.attribution);
	            var a = t.EXTENT / this.tileSize;
	            this.workerOptions = t.extend({
	                source: this.id,
	                cluster: n.cluster || !1,
	                geojsonVtOptions: {
	                    buffer: (void 0 !== n.buffer ? n.buffer : 128) * a,
	                    tolerance: (void 0 !== n.tolerance ? n.tolerance : .375) * a,
	                    extent: t.EXTENT,
	                    maxZoom: this.maxzoom,
	                    lineMetrics: n.lineMetrics || !1,
	                    generateId: n.generateId || !1
	                },
	                superclusterOptions: {
	                    maxZoom: void 0 !== n.clusterMaxZoom ? Math.min(n.clusterMaxZoom, this.maxzoom - 1) : this.maxzoom - 1,
	                    extent: t.EXTENT,
	                    radius: (n.clusterRadius || 50) * a,
	                    log: !1
	                }
	            }, n.workerOptions);
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function() {
	            var e = this;
	            this.fire(new t.Event("dataloading", {
	                dataType: "source"
	            })), this._updateWorkerData(function(i) {
	                if (i) e.fire(new t.ErrorEvent(i));
	                else {
	                    var n = {
	                        dataType: "source",
	                        sourceDataType: "metadata"
	                    };
	                    e._collectResourceTiming && e._resourceTiming && e._resourceTiming.length > 0 && (n.resourceTiming = e._resourceTiming, e._resourceTiming = []), e.fire(new t.Event("data", n));
	                }
	            });
	        }, i.prototype.onAdd = function(t) {
	            this.map = t, this.load();
	        }, i.prototype.setData = function(e) {
	            var i = this;
	            return this._data = e, this.fire(new t.Event("dataloading", {
	                dataType: "source"
	            })), this._updateWorkerData(function(e) {
	                if (e) i.fire(new t.ErrorEvent(e));
	                else {
	                    var n = {
	                        dataType: "source",
	                        sourceDataType: "content"
	                    };
	                    i._collectResourceTiming && i._resourceTiming && i._resourceTiming.length > 0 && (n.resourceTiming = i._resourceTiming, i._resourceTiming = []), i.fire(new t.Event("data", n));
	                }
	            }), this
	        }, i.prototype.getClusterExpansionZoom = function(t, e) {
	            return this.dispatcher.send("geojson.getClusterExpansionZoom", {
	                clusterId: t,
	                source: this.id
	            }, e, this.workerID), this
	        }, i.prototype.getClusterChildren = function(t, e) {
	            return this.dispatcher.send("geojson.getClusterChildren", {
	                clusterId: t,
	                source: this.id
	            }, e, this.workerID), this
	        }, i.prototype.getClusterLeaves = function(t, e, i, n) {
	            return this.dispatcher.send("geojson.getClusterLeaves", {
	                source: this.id,
	                clusterId: t,
	                limit: e,
	                offset: i
	            }, n, this.workerID), this
	        }, i.prototype._updateWorkerData = function(e) {
	            var i = this,
	                n = t.extend({}, this.workerOptions),
	                o = this._data;
	            "string" == typeof o ? (n.request = this.map._transformRequest(t.browser.resolveURL(o), t.ResourceType.Source), n.request.collectResourceTiming = this._collectResourceTiming) : n.data = JSON.stringify(o), this.workerID = this.dispatcher.send(this.type + ".loadData", n, function(t, o) {
	                i._removed || o && o.abandoned || (i._loaded = !0, o && o.resourceTiming && o.resourceTiming[i.id] && (i._resourceTiming = o.resourceTiming[i.id].slice(0)), i.dispatcher.send(i.type + ".coalesce", {
	                    source: n.source
	                }, null, i.workerID), e(t));
	            }, this.workerID);
	        }, i.prototype.loadTile = function(e, i) {
	            var n = this,
	                o = void 0 === e.workerID ? "loadTile" : "reloadTile",
	                r = {
	                    type: this.type,
	                    uid: e.uid,
	                    tileID: e.tileID,
	                    zoom: e.tileID.overscaledZ,
	                    maxZoom: this.maxzoom,
	                    tileSize: this.tileSize,
	                    source: this.id,
	                    pixelRatio: t.browser.devicePixelRatio,
	                    showCollisionBoxes: this.map.showCollisionBoxes
	                };
	            e.workerID = this.dispatcher.send(o, r, function(t, r) {
	                return e.unloadVectorData(), e.aborted ? i(null) : t ? i(t) : (e.loadVectorData(r, n.map.painter, "reloadTile" === o), i(null))
	            }, this.workerID);
	        }, i.prototype.abortTile = function(t) {
	            t.aborted = !0;
	        }, i.prototype.unloadTile = function(t) {
	            t.unloadVectorData(), this.dispatcher.send("removeTile", {
	                uid: t.uid,
	                type: this.type,
	                source: this.id
	            }, null, t.workerID);
	        }, i.prototype.onRemove = function() {
	            this._removed = !0, this.dispatcher.send("removeSource", {
	                type: this.type,
	                source: this.id
	            }, null, this.workerID);
	        }, i.prototype.serialize = function() {
	            return t.extend({}, this._options, {
	                type: this.type,
	                data: this._data
	            })
	        }, i.prototype.hasTransition = function() {
	            return !1
	        }, i
	    }(t.Evented),
	    W = function() {
	        this.boundProgram = null, this.boundLayoutVertexBuffer = null, this.boundPaintVertexBuffers = [], this.boundIndexBuffer = null, this.boundVertexOffset = null, this.boundDynamicVertexBuffer = null, this.vao = null;
	    };
	W.prototype.bind = function(t, e, i, n, o, r, a, s) {
	    this.context = t;
	    for (var l = this.boundPaintVertexBuffers.length !== n.length, c = 0; !l && c < n.length; c++) this.boundPaintVertexBuffers[c] !== n[c] && (l = !0);
	    var h = !this.vao || this.boundProgram !== e || this.boundLayoutVertexBuffer !== i || l || this.boundIndexBuffer !== o || this.boundVertexOffset !== r || this.boundDynamicVertexBuffer !== a || this.boundDynamicVertexBuffer2 !== s;
	    !t.extVertexArrayObject || h ? this.freshBind(e, i, n, o, r, a, s) : (t.bindVertexArrayOES.set(this.vao), a && a.bind(), o && o.dynamicDraw && o.bind(), s && s.bind());
	}, W.prototype.freshBind = function(t, e, i, n, o, r, a) {
	    var s, l = t.numAttributes,
	        c = this.context,
	        h = c.gl;
	    if (c.extVertexArrayObject) this.vao && this.destroy(), this.vao = c.extVertexArrayObject.createVertexArrayOES(), c.bindVertexArrayOES.set(this.vao), s = 0, this.boundProgram = t, this.boundLayoutVertexBuffer = e, this.boundPaintVertexBuffers = i, this.boundIndexBuffer = n, this.boundVertexOffset = o, this.boundDynamicVertexBuffer = r, this.boundDynamicVertexBuffer2 = a;
	    else {
	        s = c.currentNumAttributes || 0;
	        for (var u = l; u < s; u++) h.disableVertexAttribArray(u);
	    }
	    e.enableAttributes(h, t);
	    for (var p = 0, d = i; p < d.length; p += 1) {
	        d[p].enableAttributes(h, t);
	    }
	    r && r.enableAttributes(h, t), a && a.enableAttributes(h, t), e.bind(), e.setVertexAttribPointers(h, t, o);
	    for (var f = 0, m = i; f < m.length; f += 1) {
	        var _ = m[f];
	        _.bind(), _.setVertexAttribPointers(h, t, o);
	    }
	    r && (r.bind(), r.setVertexAttribPointers(h, t, o)), n && n.bind(), a && (a.bind(), a.setVertexAttribPointers(h, t, o)), c.currentNumAttributes = l;
	}, W.prototype.destroy = function() {
	    this.vao && (this.context.extVertexArrayObject.deleteVertexArrayOES(this.vao), this.vao = null);
	};
	var X = function(e) {
	        function i(t, i, n, o) {
	            e.call(this), this.id = t, this.dispatcher = n, this.coordinates = i.coordinates, this.type = "image", this.minzoom = 0, this.maxzoom = 22, this.tileSize = 512, this.tiles = {}, this.setEventedParent(o), this.options = i;
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function() {
	            var e = this;
	            this.fire(new t.Event("dataloading", {
	                dataType: "source"
	            })), this.url = this.options.url, t.getImage(this.map._transformRequest(this.url, t.ResourceType.Image), function(i, n) {
	                i ? e.fire(new t.ErrorEvent(i)) : n && (e.image = t.browser.getImageData(n), e._finishLoading());
	            });
	        }, i.prototype._finishLoading = function() {
	            this.map && (this.setCoordinates(this.coordinates), this.fire(new t.Event("data", {
	                dataType: "source",
	                sourceDataType: "metadata"
	            })));
	        }, i.prototype.onAdd = function(t) {
	            this.map = t, this.load();
	        }, i.prototype.setCoordinates = function(e) {
	            this.coordinates = e;
	            var i = this.map,
	                n = e.map(function(t) {
	                    return i.transform.locationCoordinate(N.convert(t)).zoomTo(0)
	                }),
	                o = this.centerCoord = t.getCoordinatesCenter(n);
	            o.column = Math.floor(o.column), o.row = Math.floor(o.row), this.tileID = new t.CanonicalTileID(o.zoom, o.column, o.row), this.minzoom = this.maxzoom = o.zoom;
	            var r = n.map(function(e) {
	                var i = e.zoomTo(o.zoom);
	                return new t.Point(Math.round((i.column - o.column) * t.EXTENT), Math.round((i.row - o.row) * t.EXTENT))
	            });
	            return this._boundsArray = new t.StructArrayLayout4i8, this._boundsArray.emplaceBack(r[0].x, r[0].y, 0, 0), this._boundsArray.emplaceBack(r[1].x, r[1].y, t.EXTENT, 0), this._boundsArray.emplaceBack(r[3].x, r[3].y, 0, t.EXTENT), this._boundsArray.emplaceBack(r[2].x, r[2].y, t.EXTENT, t.EXTENT), this.boundsBuffer && (this.boundsBuffer.destroy(), delete this.boundsBuffer), this.fire(new t.Event("data", {
	                dataType: "source",
	                sourceDataType: "content"
	            })), this
	        }, i.prototype.prepare = function() {
	            if (0 !== Object.keys(this.tiles).length && this.image) {
	                var e = this.map.painter.context,
	                    i = e.gl;
	                for (var n in this.boundsBuffer || (this.boundsBuffer = e.createVertexBuffer(this._boundsArray, t.rasterBoundsAttributes.members)), this.boundsVAO || (this.boundsVAO = new W), this.texture || (this.texture = new t.Texture(e, this.image, i.RGBA), this.texture.bind(i.LINEAR, i.CLAMP_TO_EDGE)), this.tiles) {
	                    var o = this.tiles[n];
	                    "loaded" !== o.state && (o.state = "loaded", o.texture = this.texture);
	                }
	            }
	        }, i.prototype.loadTile = function(t, e) {
	            this.tileID && this.tileID.equals(t.tileID.canonical) ? (this.tiles[String(t.tileID.wrap)] = t, t.buckets = {}, e(null)) : (t.state = "errored", e(null));
	        }, i.prototype.serialize = function() {
	            return {
	                type: "image",
	                url: this.options.url,
	                coordinates: this.coordinates
	            }
	        }, i.prototype.hasTransition = function() {
	            return !1
	        }, i
	    }(t.Evented),
	    H = function(e) {
	        function i(t, i, n, o) {
	            e.call(this, t, i, n, o), this.roundZoom = !0, this.type = "video", this.options = i;
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function() {
	            var e = this,
	                i = this.options;
	            this.urls = [];
	            for (var n = 0, o = i.urls; n < o.length; n += 1) {
	                var r = o[n];
	                e.urls.push(e.map._transformRequest(r, t.ResourceType.Source).url);
	            }
	            t.getVideo(this.urls, function(i, n) {
	                i ? e.fire(new t.ErrorEvent(i)) : n && (e.video = n, e.video.loop = !0, e.video.addEventListener("playing", function() {
	                    e.map._rerender();
	                }), e.map && e.video.play(), e._finishLoading());
	            });
	        }, i.prototype.getVideo = function() {
	            return this.video
	        }, i.prototype.onAdd = function(t) {
	            this.map || (this.map = t, this.load(), this.video && (this.video.play(), this.setCoordinates(this.coordinates)));
	        }, i.prototype.prepare = function() {
	            if (!(0 === Object.keys(this.tiles).length || this.video.readyState < 2)) {
	                var e = this.map.painter.context,
	                    i = e.gl;
	                for (var n in this.boundsBuffer || (this.boundsBuffer = e.createVertexBuffer(this._boundsArray, t.rasterBoundsAttributes.members)), this.boundsVAO || (this.boundsVAO = new W), this.texture ? this.video.paused || (this.texture.bind(i.LINEAR, i.CLAMP_TO_EDGE), i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, i.RGBA, i.UNSIGNED_BYTE, this.video)) : (this.texture = new t.Texture(e, this.video, i.RGBA), this.texture.bind(i.LINEAR, i.CLAMP_TO_EDGE)), this.tiles) {
	                    var o = this.tiles[n];
	                    "loaded" !== o.state && (o.state = "loaded", o.texture = this.texture);
	                }
	            }
	        }, i.prototype.serialize = function() {
	            return {
	                type: "video",
	                urls: this.urls,
	                coordinates: this.coordinates
	            }
	        }, i.prototype.hasTransition = function() {
	            return this.video && !this.video.paused
	        }, i
	    }(X),
	    K = function(e) {
	        function i(i, n, o, r) {
	            e.call(this, i, n, o, r), n.coordinates ? Array.isArray(n.coordinates) && 4 === n.coordinates.length && !n.coordinates.some(function(t) {
	                return !Array.isArray(t) || 2 !== t.length || t.some(function(t) {
	                    return "number" != typeof t
	                })
	            }) || this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, '"coordinates" property must be an array of 4 longitude/latitude array pairs'))) : this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, 'missing required property "coordinates"'))), n.animate && "boolean" != typeof n.animate && this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, 'optional "animate" property must be a boolean value'))), n.canvas ? "string" == typeof n.canvas || n.canvas instanceof t.window.HTMLCanvasElement || this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, '"canvas" must be either a string representing the ID of the canvas element from which to read, or an HTMLCanvasElement instance'))) : this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, 'missing required property "canvas"'))), this.options = n, this.animate = void 0 === n.animate || n.animate;
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function() {
	            this.canvas || (this.canvas = this.options.canvas instanceof t.window.HTMLCanvasElement ? this.options.canvas : t.window.document.getElementById(this.options.canvas)), this.width = this.canvas.width, this.height = this.canvas.height, this._hasInvalidDimensions() ? this.fire(new t.ErrorEvent(new Error("Canvas dimensions cannot be less than or equal to zero."))) : (this.play = function() {
	                this._playing = !0, this.map._rerender();
	            }, this.pause = function() {
	                this._playing = !1;
	            }, this._finishLoading());
	        }, i.prototype.getCanvas = function() {
	            return this.canvas
	        }, i.prototype.onAdd = function(t) {
	            this.map = t, this.load(), this.canvas && this.animate && this.play();
	        }, i.prototype.onRemove = function() {
	            this.pause();
	        }, i.prototype.prepare = function() {
	            var e = !1;
	            if (this.canvas.width !== this.width && (this.width = this.canvas.width, e = !0), this.canvas.height !== this.height && (this.height = this.canvas.height, e = !0), !this._hasInvalidDimensions() && 0 !== Object.keys(this.tiles).length) {
	                var i = this.map.painter.context,
	                    n = i.gl;
	                for (var o in this.boundsBuffer || (this.boundsBuffer = i.createVertexBuffer(this._boundsArray, t.rasterBoundsAttributes.members)), this.boundsVAO || (this.boundsVAO = new W), this.texture ? e ? this.texture.update(this.canvas) : this._playing && (this.texture.bind(n.LINEAR, n.CLAMP_TO_EDGE), n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, n.RGBA, n.UNSIGNED_BYTE, this.canvas)) : (this.texture = new t.Texture(i, this.canvas, n.RGBA), this.texture.bind(n.LINEAR, n.CLAMP_TO_EDGE)), this.tiles) {
	                    var r = this.tiles[o];
	                    "loaded" !== r.state && (r.state = "loaded", r.texture = this.texture);
	                }
	            }
	        }, i.prototype.serialize = function() {
	            return {
	                type: "canvas",
	                coordinates: this.coordinates
	            }
	        }, i.prototype.hasTransition = function() {
	            return this._playing
	        }, i.prototype._hasInvalidDimensions = function() {
	            for (var t = 0, e = [this.canvas.width, this.canvas.height]; t < e.length; t += 1) {
	                var i = e[t];
	                if (isNaN(i) || i <= 0) return !0
	            }
	            return !1
	        }, i
	    }(X),
	    Y = {
	        vector: Z,
	        raster: j,
	        "raster-dem": q,
	        geojson: G,
	        video: H,
	        image: X,
	        canvas: K
	    },
	    J = function(e, i, n, o) {
	        var r = new Y[i.type](e, i, n, o);
	        if (r.id !== e) throw new Error("Expected Source id to be " + e + " instead of " + r.id);
	        return t.bindAll(["load", "abort", "unload", "serialize", "prepare"], r), r
	    };

	function Q(t, e, i, n, o) {
	    var r = o.maxPitchScaleFactor(),
	        a = t.tilesIn(i, r);
	    a.sort($);
	    for (var s = [], l = 0, c = a; l < c.length; l += 1) {
	        var h = c[l];
	        s.push({
	            wrappedTileID: h.tileID.wrapped().key,
	            queryResults: h.tile.queryRenderedFeatures(e, t._state, h.queryGeometry, h.scale, n, o, r, t.transform.calculatePosMatrix(h.tileID.toUnwrapped()))
	        });
	    }
	    var u = function(t) {
	        for (var e = {}, i = {}, n = 0, o = t; n < o.length; n += 1) {
	            var r = o[n],
	                a = r.queryResults,
	                s = r.wrappedTileID,
	                l = i[s] = i[s] || {};
	            for (var c in a)
	                for (var h = a[c], u = l[c] = l[c] || {}, p = e[c] = e[c] || [], d = 0, f = h; d < f.length; d += 1) {
	                    var m = f[d];
	                    u[m.featureIndex] || (u[m.featureIndex] = !0, p.push(m.feature));
	                }
	        }
	        return e
	    }(s);
	    for (var p in u) u[p].forEach(function(e) {
	        var i = t.getFeatureState(e.layer["source-layer"], e.id);
	        e.source = e.layer.source, e.layer["source-layer"] && (e.sourceLayer = e.layer["source-layer"]), e.state = i;
	    });
	    return u
	}

	function $(t, e) {
	    var i = t.tileID,
	        n = e.tileID;
	    return i.overscaledZ - n.overscaledZ || i.canonical.y - n.canonical.y || i.wrap - n.wrap || i.canonical.x - n.canonical.x
	}
	var tt = function(t, e) {
	    this.max = t, this.onRemove = e, this.reset();
	};
	tt.prototype.reset = function() {
	    for (var t in this.data)
	        for (var e = 0, i = this.data[t]; e < i.length; e += 1) {
	            var n = i[e];
	            n.timeout && clearTimeout(n.timeout), this.onRemove(n.value);
	        }
	    return this.data = {}, this.order = [], this
	}, tt.prototype.add = function(t, e, i) {
	    var n = this,
	        o = t.wrapped().key;
	    void 0 === this.data[o] && (this.data[o] = []);
	    var r = {
	        value: e,
	        timeout: void 0
	    };
	    if (void 0 !== i && (r.timeout = setTimeout(function() {
	            n.remove(t, r);
	        }, i)), this.data[o].push(r), this.order.push(o), this.order.length > this.max) {
	        var a = this._getAndRemoveByKey(this.order[0]);
	        a && this.onRemove(a);
	    }
	    return this
	}, tt.prototype.has = function(t) {
	    return t.wrapped().key in this.data
	}, tt.prototype.getAndRemove = function(t) {
	    return this.has(t) ? this._getAndRemoveByKey(t.wrapped().key) : null
	}, tt.prototype._getAndRemoveByKey = function(t) {
	    var e = this.data[t].shift();
	    return e.timeout && clearTimeout(e.timeout), 0 === this.data[t].length && delete this.data[t], this.order.splice(this.order.indexOf(t), 1), e.value
	}, tt.prototype.get = function(t) {
	    return this.has(t) ? this.data[t.wrapped().key][0].value : null
	}, tt.prototype.remove = function(t, e) {
	    if (!this.has(t)) return this;
	    var i = t.wrapped().key,
	        n = void 0 === e ? 0 : this.data[i].indexOf(e),
	        o = this.data[i][n];
	    return this.data[i].splice(n, 1), o.timeout && clearTimeout(o.timeout), 0 === this.data[i].length && delete this.data[i], this.onRemove(o.value), this.order.splice(this.order.indexOf(i), 1), this
	}, tt.prototype.setMaxSize = function(t) {
	    for (this.max = t; this.order.length > this.max;) {
	        var e = this._getAndRemoveByKey(this.order[0]);
	        e && this.onRemove(e);
	    }
	    return this
	};
	var et = function(t, e, i) {
	    this.context = t;
	    var n = t.gl;
	    this.buffer = n.createBuffer(), this.dynamicDraw = Boolean(i), this.unbindVAO(), t.bindElementBuffer.set(this.buffer), n.bufferData(n.ELEMENT_ARRAY_BUFFER, e.arrayBuffer, this.dynamicDraw ? n.DYNAMIC_DRAW : n.STATIC_DRAW), this.dynamicDraw || delete e.arrayBuffer;
	};
	et.prototype.unbindVAO = function() {
	    this.context.extVertexArrayObject && this.context.bindVertexArrayOES.set(null);
	}, et.prototype.bind = function() {
	    this.context.bindElementBuffer.set(this.buffer);
	}, et.prototype.updateData = function(t) {
	    var e = this.context.gl;
	    this.unbindVAO(), this.bind(), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, t.arrayBuffer);
	}, et.prototype.destroy = function() {
	    var t = this.context.gl;
	    this.buffer && (t.deleteBuffer(this.buffer), delete this.buffer);
	};
	var it = {
	        Int8: "BYTE",
	        Uint8: "UNSIGNED_BYTE",
	        Int16: "SHORT",
	        Uint16: "UNSIGNED_SHORT",
	        Int32: "INT",
	        Uint32: "UNSIGNED_INT",
	        Float32: "FLOAT"
	    },
	    nt = function(t, e, i, n) {
	        this.length = e.length, this.attributes = i, this.itemSize = e.bytesPerElement, this.dynamicDraw = n, this.context = t;
	        var o = t.gl;
	        this.buffer = o.createBuffer(), t.bindVertexBuffer.set(this.buffer), o.bufferData(o.ARRAY_BUFFER, e.arrayBuffer, this.dynamicDraw ? o.DYNAMIC_DRAW : o.STATIC_DRAW), this.dynamicDraw || delete e.arrayBuffer;
	    };
	nt.prototype.bind = function() {
	    this.context.bindVertexBuffer.set(this.buffer);
	}, nt.prototype.updateData = function(t) {
	    var e = this.context.gl;
	    this.bind(), e.bufferSubData(e.ARRAY_BUFFER, 0, t.arrayBuffer);
	}, nt.prototype.enableAttributes = function(t, e) {
	    for (var i = 0; i < this.attributes.length; i++) {
	        var n = this.attributes[i],
	            o = e.attributes[n.name];
	        void 0 !== o && t.enableVertexAttribArray(o);
	    }
	}, nt.prototype.setVertexAttribPointers = function(t, e, i) {
	    for (var n = 0; n < this.attributes.length; n++) {
	        var o = this.attributes[n],
	            r = e.attributes[o.name];
	        void 0 !== r && t.vertexAttribPointer(r, o.components, t[it[o.type]], !1, this.itemSize, o.offset + this.itemSize * (i || 0));
	    }
	}, nt.prototype.destroy = function() {
	    var t = this.context.gl;
	    this.buffer && (t.deleteBuffer(this.buffer), delete this.buffer);
	};
	var ot = function(e) {
	    this.context = e, this.current = t.Color.transparent;
	};
	ot.prototype.get = function() {
	    return this.current
	}, ot.prototype.set = function(t) {
	    var e = this.current;
	    t.r === e.r && t.g === e.g && t.b === e.b && t.a === e.a || (this.context.gl.clearColor(t.r, t.g, t.b, t.a), this.current = t);
	};
	var rt = function(t) {
	    this.context = t, this.current = 1;
	};
	rt.prototype.get = function() {
	    return this.current
	}, rt.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.clearDepth(t), this.current = t);
	};
	var at = function(t) {
	    this.context = t, this.current = 0;
	};
	at.prototype.get = function() {
	    return this.current
	}, at.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.clearStencil(t), this.current = t);
	};
	var st = function(t) {
	    this.context = t, this.current = [!0, !0, !0, !0];
	};
	st.prototype.get = function() {
	    return this.current
	}, st.prototype.set = function(t) {
	    var e = this.current;
	    t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] || (this.context.gl.colorMask(t[0], t[1], t[2], t[3]), this.current = t);
	};
	var lt = function(t) {
	    this.context = t, this.current = !0;
	};
	lt.prototype.get = function() {
	    return this.current
	}, lt.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.depthMask(t), this.current = t);
	};
	var ct = function(t) {
	    this.context = t, this.current = 255;
	};
	ct.prototype.get = function() {
	    return this.current
	}, ct.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.stencilMask(t), this.current = t);
	};
	var ht = function(t) {
	    this.context = t, this.current = {
	        func: t.gl.ALWAYS,
	        ref: 0,
	        mask: 255
	    };
	};
	ht.prototype.get = function() {
	    return this.current
	}, ht.prototype.set = function(t) {
	    var e = this.current;
	    t.func === e.func && t.ref === e.ref && t.mask === e.mask || (this.context.gl.stencilFunc(t.func, t.ref, t.mask), this.current = t);
	};
	var ut = function(t) {
	    this.context = t;
	    var e = this.context.gl;
	    this.current = [e.KEEP, e.KEEP, e.KEEP];
	};
	ut.prototype.get = function() {
	    return this.current
	}, ut.prototype.set = function(t) {
	    var e = this.current;
	    t[0] === e[0] && t[1] === e[1] && t[2] === e[2] || (this.context.gl.stencilOp(t[0], t[1], t[2]), this.current = t);
	};
	var pt = function(t) {
	    this.context = t, this.current = !1;
	};
	pt.prototype.get = function() {
	    return this.current
	}, pt.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        t ? e.enable(e.STENCIL_TEST) : e.disable(e.STENCIL_TEST), this.current = t;
	    }
	};
	var dt = function(t) {
	    this.context = t, this.current = [0, 1];
	};
	dt.prototype.get = function() {
	    return this.current
	}, dt.prototype.set = function(t) {
	    var e = this.current;
	    t[0] === e[0] && t[1] === e[1] || (this.context.gl.depthRange(t[0], t[1]), this.current = t);
	};
	var ft = function(t) {
	    this.context = t, this.current = !1;
	};
	ft.prototype.get = function() {
	    return this.current
	}, ft.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        t ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST), this.current = t;
	    }
	};
	var mt = function(t) {
	    this.context = t, this.current = t.gl.LESS;
	};
	mt.prototype.get = function() {
	    return this.current
	}, mt.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.depthFunc(t), this.current = t);
	};
	var _t = function(t) {
	    this.context = t, this.current = !1;
	};
	_t.prototype.get = function() {
	    return this.current
	}, _t.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        t ? e.enable(e.BLEND) : e.disable(e.BLEND), this.current = t;
	    }
	};
	var gt = function(t) {
	    this.context = t;
	    var e = this.context.gl;
	    this.current = [e.ONE, e.ZERO];
	};
	gt.prototype.get = function() {
	    return this.current
	}, gt.prototype.set = function(t) {
	    var e = this.current;
	    t[0] === e[0] && t[1] === e[1] || (this.context.gl.blendFunc(t[0], t[1]), this.current = t);
	};
	var vt = function(e) {
	    this.context = e, this.current = t.Color.transparent;
	};
	vt.prototype.get = function() {
	    return this.current
	}, vt.prototype.set = function(t) {
	    var e = this.current;
	    t.r === e.r && t.g === e.g && t.b === e.b && t.a === e.a || (this.context.gl.blendColor(t.r, t.g, t.b, t.a), this.current = t);
	};
	var yt = function(t) {
	    this.context = t, this.current = null;
	};
	yt.prototype.get = function() {
	    return this.current
	}, yt.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.useProgram(t), this.current = t);
	};
	var xt = function(t) {
	    this.context = t, this.current = t.gl.TEXTURE0;
	};
	xt.prototype.get = function() {
	    return this.current
	}, xt.prototype.set = function(t) {
	    this.current !== t && (this.context.gl.activeTexture(t), this.current = t);
	};
	var bt = function(t) {
	    this.context = t;
	    var e = this.context.gl;
	    this.current = [0, 0, e.drawingBufferWidth, e.drawingBufferHeight];
	};
	bt.prototype.get = function() {
	    return this.current
	}, bt.prototype.set = function(t) {
	    var e = this.current;
	    t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] || (this.context.gl.viewport(t[0], t[1], t[2], t[3]), this.current = t);
	};
	var wt = function(t) {
	    this.context = t, this.current = null;
	};
	wt.prototype.get = function() {
	    return this.current
	}, wt.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        e.bindFramebuffer(e.FRAMEBUFFER, t), this.current = t;
	    }
	};
	var Et = function(t) {
	    this.context = t, this.current = null;
	};
	Et.prototype.get = function() {
	    return this.current
	}, Et.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        e.bindRenderbuffer(e.RENDERBUFFER, t), this.current = t;
	    }
	};
	var Tt = function(t) {
	    this.context = t, this.current = null;
	};
	Tt.prototype.get = function() {
	    return this.current
	}, Tt.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        e.bindTexture(e.TEXTURE_2D, t), this.current = t;
	    }
	};
	var It = function(t) {
	    this.context = t, this.current = null;
	};
	It.prototype.get = function() {
	    return this.current
	}, It.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        e.bindBuffer(e.ARRAY_BUFFER, t), this.current = t;
	    }
	};
	var St = function(t) {
	    this.context = t, this.current = null;
	};
	St.prototype.get = function() {
	    return this.current
	}, St.prototype.set = function(t) {
	    var e = this.context.gl;
	    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t), this.current = t;
	};
	var Ct = function(t) {
	    this.context = t, this.current = null;
	};
	Ct.prototype.get = function() {
	    return this.current
	}, Ct.prototype.set = function(t) {
	    this.current !== t && this.context.extVertexArrayObject && (this.context.extVertexArrayObject.bindVertexArrayOES(t), this.current = t);
	};
	var zt = function(t) {
	    this.context = t, this.current = 4;
	};
	zt.prototype.get = function() {
	    return this.current
	}, zt.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        e.pixelStorei(e.UNPACK_ALIGNMENT, t), this.current = t;
	    }
	};
	var Pt = function(t) {
	    this.context = t, this.current = !1;
	};
	Pt.prototype.get = function() {
	    return this.current
	}, Pt.prototype.set = function(t) {
	    if (this.current !== t) {
	        var e = this.context.gl;
	        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t), this.current = t;
	    }
	};
	var At = function(t, e) {
	    this.context = t, this.current = null, this.parent = e;
	};
	At.prototype.get = function() {
	    return this.current
	};
	var Dt = function(t) {
	        function e(e, i) {
	            t.call(this, e, i), this.dirty = !1;
	        }
	        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function(t) {
	            if (this.dirty || this.current !== t) {
	                var e = this.context.gl;
	                this.context.bindFramebuffer.set(this.parent), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0), this.current = t, this.dirty = !1;
	            }
	        }, e.prototype.setDirty = function() {
	            this.dirty = !0;
	        }, e
	    }(At),
	    Rt = function(t) {
	        function e() {
	            t.apply(this, arguments);
	        }
	        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function(t) {
	            if (this.current !== t) {
	                var e = this.context.gl;
	                this.context.bindFramebuffer.set(this.parent), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, t), this.current = t;
	            }
	        }, e
	    }(At),
	    Mt = function(t, e, i) {
	        this.context = t, this.width = e, this.height = i;
	        var n = t.gl,
	            o = this.framebuffer = n.createFramebuffer();
	        this.colorAttachment = new Dt(t, o), this.depthAttachment = new Rt(t, o);
	    };
	Mt.prototype.destroy = function() {
	    var t = this.context.gl,
	        e = this.colorAttachment.get();
	    e && t.deleteTexture(e);
	    var i = this.depthAttachment.get();
	    i && t.deleteRenderbuffer(i), t.deleteFramebuffer(this.framebuffer);
	};
	var Lt = function(t, e, i) {
	    this.func = t, this.mask = e, this.range = i;
	};
	Lt.ReadOnly = !1, Lt.ReadWrite = !0, Lt.disabled = new Lt(519, Lt.ReadOnly, [0, 1]);
	var kt = function(t, e, i, n, o, r) {
	    this.test = t, this.ref = e, this.mask = i, this.fail = n, this.depthFail = o, this.pass = r;
	};
	kt.disabled = new kt({
	    func: 519,
	    mask: 0
	}, 0, 0, 7680, 7680, 7680);
	var Bt = function(t, e, i) {
	    this.blendFunction = t, this.blendColor = e, this.mask = i;
	};
	Bt.Replace = [1, 0], Bt.disabled = new Bt(Bt.Replace, t.Color.transparent, [!1, !1, !1, !1]), Bt.unblended = new Bt(Bt.Replace, t.Color.transparent, [!0, !0, !0, !0]), Bt.alphaBlended = new Bt([1, 771], t.Color.transparent, [!0, !0, !0, !0]);
	var Ot = function(t) {
	    this.gl = t, this.extVertexArrayObject = this.gl.getExtension("OES_vertex_array_object"), this.clearColor = new ot(this), this.clearDepth = new rt(this), this.clearStencil = new at(this), this.colorMask = new st(this), this.depthMask = new lt(this), this.stencilMask = new ct(this), this.stencilFunc = new ht(this), this.stencilOp = new ut(this), this.stencilTest = new pt(this), this.depthRange = new dt(this), this.depthTest = new ft(this), this.depthFunc = new mt(this), this.blend = new _t(this), this.blendFunc = new gt(this), this.blendColor = new vt(this), this.program = new yt(this), this.activeTexture = new xt(this), this.viewport = new bt(this), this.bindFramebuffer = new wt(this), this.bindRenderbuffer = new Et(this), this.bindTexture = new Tt(this), this.bindVertexBuffer = new It(this), this.bindElementBuffer = new St(this), this.bindVertexArrayOES = this.extVertexArrayObject && new Ct(this), this.pixelStoreUnpack = new zt(this), this.pixelStoreUnpackPremultiplyAlpha = new Pt(this), this.extTextureFilterAnisotropic = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), this.extTextureFilterAnisotropic && (this.extTextureFilterAnisotropicMax = t.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT)), this.extTextureHalfFloat = t.getExtension("OES_texture_half_float"), this.extTextureHalfFloat && t.getExtension("OES_texture_half_float_linear");
	};
	Ot.prototype.createIndexBuffer = function(t, e) {
	    return new et(this, t, e)
	}, Ot.prototype.createVertexBuffer = function(t, e, i) {
	    return new nt(this, t, e, i)
	}, Ot.prototype.createRenderbuffer = function(t, e, i) {
	    var n = this.gl,
	        o = n.createRenderbuffer();
	    return this.bindRenderbuffer.set(o), n.renderbufferStorage(n.RENDERBUFFER, t, e, i), this.bindRenderbuffer.set(null), o
	}, Ot.prototype.createFramebuffer = function(t, e) {
	    return new Mt(this, t, e)
	}, Ot.prototype.clear = function(t) {
	    var e = t.color,
	        i = t.depth,
	        n = this.gl,
	        o = 0;
	    e && (o |= n.COLOR_BUFFER_BIT, this.clearColor.set(e), this.colorMask.set([!0, !0, !0, !0])), void 0 !== i && (o |= n.DEPTH_BUFFER_BIT, this.clearDepth.set(i), this.depthMask.set(!0)), n.clear(o);
	}, Ot.prototype.setDepthMode = function(t) {
	    t.func !== this.gl.ALWAYS || t.mask ? (this.depthTest.set(!0), this.depthFunc.set(t.func), this.depthMask.set(t.mask), this.depthRange.set(t.range)) : this.depthTest.set(!1);
	}, Ot.prototype.setStencilMode = function(t) {
	    t.test.func !== this.gl.ALWAYS || t.mask ? (this.stencilTest.set(!0), this.stencilMask.set(t.mask), this.stencilOp.set([t.fail, t.depthFail, t.pass]), this.stencilFunc.set({
	        func: t.test.func,
	        ref: t.ref,
	        mask: t.test.mask
	    })) : this.stencilTest.set(!1);
	}, Ot.prototype.setColorMode = function(e) {
	    t.deepEqual(e.blendFunction, Bt.Replace) ? this.blend.set(!1) : (this.blend.set(!0), this.blendFunc.set(e.blendFunction), this.blendColor.set(e.blendColor)), this.colorMask.set(e.mask);
	};
	var Ft = function(e) {
	    function i(i, n, o) {
	        var r = this;
	        e.call(this), this.id = i, this.dispatcher = o, this.on("data", function(t) {
	            "source" === t.dataType && "metadata" === t.sourceDataType && (r._sourceLoaded = !0), r._sourceLoaded && !r._paused && "source" === t.dataType && "content" === t.sourceDataType && (r.reload(), r.transform && r.update(r.transform));
	        }), this.on("error", function() {
	            r._sourceErrored = !0;
	        }), this._source = J(i, n, o, this), this._tiles = {}, this._cache = new tt(0, this._unloadTile.bind(this)), this._timers = {}, this._cacheTimers = {}, this._maxTileCacheSize = null, this._coveredTiles = {}, this._state = new t.SourceFeatureState;
	    }
	    return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.onAdd = function(t) {
	        this.map = t, this._maxTileCacheSize = t ? t._maxTileCacheSize : null, this._source && this._source.onAdd && this._source.onAdd(t);
	    }, i.prototype.onRemove = function(t) {
	        this._source && this._source.onRemove && this._source.onRemove(t);
	    }, i.prototype.loaded = function() {
	        if (this._sourceErrored) return !0;
	        if (!this._sourceLoaded) return !1;
	        for (var t in this._tiles) {
	            var e = this._tiles[t];
	            if ("loaded" !== e.state && "errored" !== e.state) return !1
	        }
	        return !0
	    }, i.prototype.getSource = function() {
	        return this._source
	    }, i.prototype.pause = function() {
	        this._paused = !0;
	    }, i.prototype.resume = function() {
	        if (this._paused) {
	            var t = this._shouldReloadOnResume;
	            this._paused = !1, this._shouldReloadOnResume = !1, t && this.reload(), this.transform && this.update(this.transform);
	        }
	    }, i.prototype._loadTile = function(t, e) {
	        return this._source.loadTile(t, e)
	    }, i.prototype._unloadTile = function(t) {
	        if (this._source.unloadTile) return this._source.unloadTile(t, function() {})
	    }, i.prototype._abortTile = function(t) {
	        if (this._source.abortTile) return this._source.abortTile(t, function() {})
	    }, i.prototype.serialize = function() {
	        return this._source.serialize()
	    }, i.prototype.prepare = function(t) {
	        for (var e in this._source.prepare && this._source.prepare(), this._state.coalesceChanges(this._tiles, this.map ? this.map.painter : null), this._tiles) this._tiles[e].upload(t);
	    }, i.prototype.getIds = function() {
	        return Object.keys(this._tiles).map(Number).sort(Ut)
	    }, i.prototype.getRenderableIds = function(e) {
	        var i = this,
	            n = [];
	        for (var o in i._tiles) i._isIdRenderable(+o, e) && n.push(+o);
	        return e ? n.sort(function(e, n) {
	            var o = i._tiles[e].tileID,
	                r = i._tiles[n].tileID,
	                a = new t.Point(o.canonical.x, o.canonical.y)._rotate(i.transform.angle),
	                s = new t.Point(r.canonical.x, r.canonical.y)._rotate(i.transform.angle);
	            return o.overscaledZ - r.overscaledZ || s.y - a.y || s.x - a.x
	        }) : n.sort(Ut)
	    }, i.prototype.hasRenderableParent = function(t) {
	        var e = this.findLoadedParent(t, 0);
	        return !!e && this._isIdRenderable(e.tileID.key)
	    }, i.prototype._isIdRenderable = function(t, e) {
	        return this._tiles[t] && this._tiles[t].hasData() && !this._coveredTiles[t] && (e || !this._tiles[t].holdingForFade())
	    }, i.prototype.reload = function() {
	        if (this._paused) this._shouldReloadOnResume = !0;
	        else
	            for (var t in this._cache.reset(), this._tiles) "errored" !== this._tiles[t].state && this._reloadTile(t, "reloading");
	    }, i.prototype._reloadTile = function(t, e) {
	        var i = this._tiles[t];
	        i && ("loading" !== i.state && (i.state = e), this._loadTile(i, this._tileLoaded.bind(this, i, t, e)));
	    }, i.prototype._tileLoaded = function(e, i, n, o) {
	        if (o) return e.state = "errored", void(404 !== o.status ? this._source.fire(new t.ErrorEvent(o, {
	            tile: e
	        })) : this.update(this.transform));
	        e.timeAdded = t.browser.now(), "expired" === n && (e.refreshedUponExpiration = !0), this._setTileReloadTimer(i, e), "raster-dem" === this.getSource().type && e.dem && this._backfillDEM(e), this._state.initializeTileState(e, this.map ? this.map.painter : null), this._source.fire(new t.Event("data", {
	            dataType: "source",
	            tile: e,
	            coord: e.tileID
	        })), this.map && (this.map.painter.tileExtentVAO.vao = null);
	    }, i.prototype._backfillDEM = function(t) {
	        for (var e = this.getRenderableIds(), i = 0; i < e.length; i++) {
	            var n = e[i];
	            if (t.neighboringTiles && t.neighboringTiles[n]) {
	                var o = this.getTileByID(n);
	                r(t, o), r(o, t);
	            }
	        }

	        function r(t, e) {
	            t.needsHillshadePrepare = !0;
	            var i = e.tileID.canonical.x - t.tileID.canonical.x,
	                n = e.tileID.canonical.y - t.tileID.canonical.y,
	                o = Math.pow(2, t.tileID.canonical.z),
	                r = e.tileID.key;
	            0 === i && 0 === n || Math.abs(n) > 1 || (Math.abs(i) > 1 && (1 === Math.abs(i + o) ? i += o : 1 === Math.abs(i - o) && (i -= o)), e.dem && t.dem && (t.dem.backfillBorder(e.dem, i, n), t.neighboringTiles && t.neighboringTiles[r] && (t.neighboringTiles[r].backfilled = !0)));
	        }
	    }, i.prototype.getTile = function(t) {
	        return this.getTileByID(t.key)
	    }, i.prototype.getTileByID = function(t) {
	        return this._tiles[t]
	    }, i.prototype.getZoom = function(t) {
	        return t.zoom + t.scaleZoom(t.tileSize / this._source.tileSize)
	    }, i.prototype._retainLoadedChildren = function(t, e, i, n) {
	        for (var o in this._tiles) {
	            var r = this._tiles[o];
	            if (!(n[o] || !r.hasData() || r.tileID.overscaledZ <= e || r.tileID.overscaledZ > i)) {
	                for (var a = r.tileID; r && r.tileID.overscaledZ > e + 1;) {
	                    var s = r.tileID.scaledTo(r.tileID.overscaledZ - 1);
	                    (r = this._tiles[s.key]) && r.hasData() && (a = s);
	                }
	                for (var l = a; l.overscaledZ > e;)
	                    if (t[(l = l.scaledTo(l.overscaledZ - 1)).key]) {
	                        n[a.key] = a;
	                        break
	                    }
	            }
	        }
	    }, i.prototype.findLoadedParent = function(t, e) {
	        for (var i = t.overscaledZ - 1; i >= e; i--) {
	            var n = t.scaledTo(i);
	            if (!n) return;
	            var o = String(n.key),
	                r = this._tiles[o];
	            if (r && r.hasData()) return r;
	            if (this._cache.has(n)) return this._cache.get(n)
	        }
	    }, i.prototype.updateCacheSize = function(t) {
	        var e = (Math.ceil(t.width / this._source.tileSize) + 1) * (Math.ceil(t.height / this._source.tileSize) + 1),
	            i = Math.floor(5 * e),
	            n = "number" == typeof this._maxTileCacheSize ? Math.min(this._maxTileCacheSize, i) : i;
	        this._cache.setMaxSize(n);
	    }, i.prototype.handleWrapJump = function(t) {
	        var e = (t - (void 0 === this._prevLng ? t : this._prevLng)) / 360,
	            i = Math.round(e);
	        if (this._prevLng = t, i) {
	            var n = {};
	            for (var o in this._tiles) {
	                var r = this._tiles[o];
	                r.tileID = r.tileID.unwrapTo(r.tileID.wrap + i), n[r.tileID.key] = r;
	            }
	            for (var a in this._tiles = n, this._timers) clearTimeout(this._timers[a]), delete this._timers[a];
	            for (var s in this._tiles) {
	                var l = this._tiles[s];
	                this._setTileReloadTimer(s, l);
	            }
	        }
	    }, i.prototype.update = function(e) {
	        var n = this;
	        if (this.transform = e, this._sourceLoaded && !this._paused) {
	            var o;
	            this.updateCacheSize(e), this.handleWrapJump(this.transform.center.lng), this._coveredTiles = {}, this.used ? this._source.tileID ? o = e.getVisibleUnwrappedCoordinates(this._source.tileID).map(function(e) {
	                return new t.OverscaledTileID(e.canonical.z, e.wrap, e.canonical.z, e.canonical.x, e.canonical.y)
	            }) : (o = e.coveringTiles({
	                tileSize: this._source.tileSize,
	                minzoom: this._source.minzoom,
	                maxzoom: this._source.maxzoom,
	                roundZoom: this._source.roundZoom,
	                reparseOverscaled: this._source.reparseOverscaled
	            }), this._source.hasTile && (o = o.filter(function(t) {
	                return n._source.hasTile(t)
	            }))) : o = [];
	            var r = (this._source.roundZoom ? Math.round : Math.floor)(this.getZoom(e)),
	                a = Math.max(r - i.maxOverzooming, this._source.minzoom),
	                s = Math.max(r + i.maxUnderzooming, this._source.minzoom),
	                l = this._updateRetainedTiles(o, r);
	            if (Vt(this._source.type)) {
	                for (var c = {}, h = {}, u = 0, p = Object.keys(l); u < p.length; u += 1) {
	                    var d = p[u],
	                        f = l[d],
	                        m = n._tiles[d];
	                    if (m && !(m.fadeEndTime && m.fadeEndTime <= t.browser.now())) {
	                        var _ = n.findLoadedParent(f, a);
	                        _ && (n._addTile(_.tileID), c[_.tileID.key] = _.tileID), h[d] = f;
	                    }
	                }
	                for (var g in this._retainLoadedChildren(h, r, s, l), c) l[g] || (n._coveredTiles[g] = !0, l[g] = c[g]);
	            }
	            for (var v in l) n._tiles[v].clearFadeHold();
	            for (var y = 0, x = t.keysDifference(this._tiles, l); y < x.length; y += 1) {
	                var b = x[y],
	                    w = n._tiles[b];
	                w.hasSymbolBuckets && !w.holdingForFade() ? w.setHoldDuration(n.map._fadeDuration) : w.hasSymbolBuckets && !w.symbolFadeFinished() || n._removeTile(b);
	            }
	        }
	    }, i.prototype.releaseSymbolFadeTiles = function() {
	        for (var t in this._tiles) this._tiles[t].holdingForFade() && this._removeTile(t);
	    }, i.prototype._updateRetainedTiles = function(t, e) {
	        for (var n = {}, o = {}, r = Math.max(e - i.maxOverzooming, this._source.minzoom), a = Math.max(e + i.maxUnderzooming, this._source.minzoom), s = {}, l = 0, c = t; l < c.length; l += 1) {
	            var h = c[l],
	                u = this._addTile(h);
	            n[h.key] = h, u.hasData() || e < this._source.maxzoom && (s[h.key] = h);
	        }
	        this._retainLoadedChildren(s, e, a, n);
	        for (var p = 0, d = t; p < d.length; p += 1) {
	            var f = d[p],
	                m = this._tiles[f.key];
	            if (!m.hasData()) {
	                if (e + 1 > this._source.maxzoom) {
	                    var _ = f.children(this._source.maxzoom)[0],
	                        g = this.getTile(_);
	                    if (g && g.hasData()) {
	                        n[_.key] = _;
	                        continue
	                    }
	                } else {
	                    var v = f.children(this._source.maxzoom);
	                    if (n[v[0].key] && n[v[1].key] && n[v[2].key] && n[v[3].key]) continue
	                }
	                for (var y = m.wasRequested(), x = f.overscaledZ - 1; x >= r; --x) {
	                    var b = f.scaledTo(x);
	                    if (o[b.key]) break;
	                    if (o[b.key] = !0, !(m = this.getTile(b)) && y && (m = this._addTile(b)), m && (n[b.key] = b, y = m.wasRequested(), m.hasData())) break
	                }
	            }
	        }
	        return n
	    }, i.prototype._addTile = function(e) {
	        var i = this._tiles[e.key];
	        if (i) return i;
	        (i = this._cache.getAndRemove(e)) && (this._setTileReloadTimer(e.key, i), i.tileID = e, this._state.initializeTileState(i, this.map ? this.map.painter : null), this._cacheTimers[e.key] && (clearTimeout(this._cacheTimers[e.key]), delete this._cacheTimers[e.key], this._setTileReloadTimer(e.key, i)));
	        var n = Boolean(i);
	        return n || (i = new t.Tile(e, this._source.tileSize * e.overscaleFactor()), this._loadTile(i, this._tileLoaded.bind(this, i, e.key, i.state))), i ? (i.uses++, this._tiles[e.key] = i, n || this._source.fire(new t.Event("dataloading", {
	            tile: i,
	            coord: i.tileID,
	            dataType: "source"
	        })), i) : null
	    }, i.prototype._setTileReloadTimer = function(t, e) {
	        var i = this;
	        t in this._timers && (clearTimeout(this._timers[t]), delete this._timers[t]);
	        var n = e.getExpiryTimeout();
	        n && (this._timers[t] = setTimeout(function() {
	            i._reloadTile(t, "expired"), delete i._timers[t];
	        }, n));
	    }, i.prototype._removeTile = function(t) {
	        var e = this._tiles[t];
	        e && (e.uses--, delete this._tiles[t], this._timers[t] && (clearTimeout(this._timers[t]), delete this._timers[t]), e.uses > 0 || (e.hasData() ? this._cache.add(e.tileID, e, e.getExpiryTimeout()) : (e.aborted = !0, this._abortTile(e), this._unloadTile(e))));
	    }, i.prototype.clearTiles = function() {
	        for (var t in this._shouldReloadOnResume = !1, this._paused = !1, this._tiles) this._removeTile(t);
	        this._cache.reset();
	    }, i.prototype.tilesIn = function(e, i) {
	        for (var n = [], o = this.getIds(), r = 1 / 0, a = 1 / 0, s = -1 / 0, l = -1 / 0, c = e[0].zoom, h = 0; h < e.length; h++) {
	            var u = e[h];
	            r = Math.min(r, u.column), a = Math.min(a, u.row), s = Math.max(s, u.column), l = Math.max(l, u.row);
	        }
	        for (var p = 0; p < o.length; p++) {
	            var d = this._tiles[o[p]];
	            if (!d.holdingForFade()) {
	                var f = d.tileID,
	                    m = Math.pow(2, this.transform.zoom - d.tileID.overscaledZ),
	                    _ = i * d.queryPadding * t.EXTENT / d.tileSize / m,
	                    g = [Nt(f, new t.Coordinate(r, a, c)), Nt(f, new t.Coordinate(s, l, c))];
	                if (g[0].x - _ < t.EXTENT && g[0].y - _ < t.EXTENT && g[1].x + _ >= 0 && g[1].y + _ >= 0) {
	                    for (var v = [], y = 0; y < e.length; y++) v.push(Nt(f, e[y]));
	                    n.push({
	                        tile: d,
	                        tileID: f,
	                        queryGeometry: [v],
	                        scale: m
	                    });
	                }
	            }
	        }
	        return n
	    }, i.prototype.getVisibleCoordinates = function(t) {
	        for (var e = this, i = this.getRenderableIds(t).map(function(t) {
	                return e._tiles[t].tileID
	            }), n = 0, o = i; n < o.length; n += 1) {
	            var r = o[n];
	            r.posMatrix = e.transform.calculatePosMatrix(r.toUnwrapped());
	        }
	        return i
	    }, i.prototype.hasTransition = function() {
	        if (this._source.hasTransition()) return !0;
	        if (Vt(this._source.type))
	            for (var e in this._tiles) {
	                var i = this._tiles[e];
	                if (void 0 !== i.fadeEndTime && i.fadeEndTime >= t.browser.now()) return !0
	            }
	        return !1
	    }, i.prototype.setFeatureState = function(t, e, i) {
	        t = t || "_geojsonTileLayer", this._state.updateState(t, e, i);
	    }, i.prototype.getFeatureState = function(t, e) {
	        return t = t || "_geojsonTileLayer", this._state.getState(t, e)
	    }, i
	}(t.Evented);

	function Nt(e, i) {
	    var n = i.zoomTo(e.canonical.z);
	    return new t.Point((n.column - (e.canonical.x + e.wrap * Math.pow(2, e.canonical.z))) * t.EXTENT, (n.row - e.canonical.y) * t.EXTENT)
	}

	function Ut(t, e) {
	    return t % 32 - e % 32 || e - t
	}

	function Vt(t) {
	    return "raster" === t || "image" === t || "video" === t
	}

	function Zt() {
	    return new t.window.Worker(_n.workerUrl)
	}
	Ft.maxOverzooming = 10, Ft.maxUnderzooming = 3;
	var jt, qt = function() {
	    this.active = {};
	};

	function Gt(e, i) {
	    var n = {};
	    for (var o in e) "ref" !== o && (n[o] = e[o]);
	    return t.refProperties.forEach(function(t) {
	        t in i && (n[t] = i[t]);
	    }), n
	}

	function Wt(t) {
	    t = t.slice();
	    for (var e = Object.create(null), i = 0; i < t.length; i++) e[t[i].id] = t[i];
	    for (var n = 0; n < t.length; n++) "ref" in t[n] && (t[n] = Gt(t[n], e[t[n].ref]));
	    return t
	}
	qt.prototype.acquire = function(t) {
	    if (!this.workers)
	        for (this.workers = []; this.workers.length < qt.workerCount;) this.workers.push(new Zt);
	    return this.active[t] = !0, this.workers.slice()
	}, qt.prototype.release = function(t) {
	    delete this.active[t], 0 === Object.keys(this.active).length && (this.workers.forEach(function(t) {
	        t.terminate();
	    }), this.workers = null);
	}, qt.workerCount = Math.max(Math.floor(t.browser.hardwareConcurrency / 2), 1);
	var Xt = {
	    setStyle: "setStyle",
	    addLayer: "addLayer",
	    removeLayer: "removeLayer",
	    setPaintProperty: "setPaintProperty",
	    setLayoutProperty: "setLayoutProperty",
	    setFilter: "setFilter",
	    addSource: "addSource",
	    removeSource: "removeSource",
	    setGeoJSONSourceData: "setGeoJSONSourceData",
	    setLayerZoomRange: "setLayerZoomRange",
	    setLayerProperty: "setLayerProperty",
	    setCenter: "setCenter",
	    setZoom: "setZoom",
	    setBearing: "setBearing",
	    setPitch: "setPitch",
	    setSprite: "setSprite",
	    setGlyphs: "setGlyphs",
	    setTransition: "setTransition",
	    setLight: "setLight"
	};

	function Ht(t, e, i) {
	    i.push({
	        command: Xt.addSource,
	        args: [t, e[t]]
	    });
	}

	function Kt(t, e, i) {
	    e.push({
	        command: Xt.removeSource,
	        args: [t]
	    }), i[t] = !0;
	}

	function Yt(t, e, i, n) {
	    Kt(t, i, n), Ht(t, e, i);
	}

	function Jt(e, i, n) {
	    var o;
	    for (o in e[n])
	        if (e[n].hasOwnProperty(o) && "data" !== o && !t.deepEqual(e[n][o], i[n][o])) return !1;
	    for (o in i[n])
	        if (i[n].hasOwnProperty(o) && "data" !== o && !t.deepEqual(e[n][o], i[n][o])) return !1;
	    return !0
	}

	function Qt(e, i, n, o, r, a) {
	    var s;
	    for (s in i = i || {}, e = e || {}) e.hasOwnProperty(s) && (t.deepEqual(e[s], i[s]) || n.push({
	        command: a,
	        args: [o, s, i[s], r]
	    }));
	    for (s in i) i.hasOwnProperty(s) && !e.hasOwnProperty(s) && (t.deepEqual(e[s], i[s]) || n.push({
	        command: a,
	        args: [o, s, i[s], r]
	    }));
	}

	function $t(t) {
	    return t.id
	}

	function te(t, e) {
	    return t[e.id] = e, t
	}

	function ee(e, i) {
	    if (!e) return [{
	        command: Xt.setStyle,
	        args: [i]
	    }];
	    var n = [];
	    try {
	        if (!t.deepEqual(e.version, i.version)) return [{
	            command: Xt.setStyle,
	            args: [i]
	        }];
	        t.deepEqual(e.center, i.center) || n.push({
	            command: Xt.setCenter,
	            args: [i.center]
	        }), t.deepEqual(e.zoom, i.zoom) || n.push({
	            command: Xt.setZoom,
	            args: [i.zoom]
	        }), t.deepEqual(e.bearing, i.bearing) || n.push({
	            command: Xt.setBearing,
	            args: [i.bearing]
	        }), t.deepEqual(e.pitch, i.pitch) || n.push({
	            command: Xt.setPitch,
	            args: [i.pitch]
	        }), t.deepEqual(e.sprite, i.sprite) || n.push({
	            command: Xt.setSprite,
	            args: [i.sprite]
	        }), t.deepEqual(e.glyphs, i.glyphs) || n.push({
	            command: Xt.setGlyphs,
	            args: [i.glyphs]
	        }), t.deepEqual(e.transition, i.transition) || n.push({
	            command: Xt.setTransition,
	            args: [i.transition]
	        }), t.deepEqual(e.light, i.light) || n.push({
	            command: Xt.setLight,
	            args: [i.light]
	        });
	        var o = {},
	            r = [];
	        ! function(e, i, n, o) {
	            var r;
	            for (r in i = i || {}, e = e || {}) e.hasOwnProperty(r) && (i.hasOwnProperty(r) || Kt(r, n, o));
	            for (r in i) i.hasOwnProperty(r) && (e.hasOwnProperty(r) ? t.deepEqual(e[r], i[r]) || ("geojson" === e[r].type && "geojson" === i[r].type && Jt(e, i, r) ? n.push({
	                command: Xt.setGeoJSONSourceData,
	                args: [r, i[r].data]
	            }) : Yt(r, i, n, o)) : Ht(r, i, n));
	        }(e.sources, i.sources, r, o);
	        var a = [];
	        e.layers && e.layers.forEach(function(t) {
	                o[t.source] ? n.push({
	                    command: Xt.removeLayer,
	                    args: [t.id]
	                }) : a.push(t);
	            }), n = n.concat(r),
	            function(e, i, n) {
	                i = i || [];
	                var o, r, a, s, l, c, h, u = (e = e || []).map($t),
	                    p = i.map($t),
	                    d = e.reduce(te, {}),
	                    f = i.reduce(te, {}),
	                    m = u.slice(),
	                    _ = Object.create(null);
	                for (o = 0, r = 0; o < u.length; o++) a = u[o], f.hasOwnProperty(a) ? r++ : (n.push({
	                    command: Xt.removeLayer,
	                    args: [a]
	                }), m.splice(m.indexOf(a, r), 1));
	                for (o = 0, r = 0; o < p.length; o++) a = p[p.length - 1 - o], m[m.length - 1 - o] !== a && (d.hasOwnProperty(a) ? (n.push({
	                    command: Xt.removeLayer,
	                    args: [a]
	                }), m.splice(m.lastIndexOf(a, m.length - r), 1)) : r++, c = m[m.length - o], n.push({
	                    command: Xt.addLayer,
	                    args: [f[a], c]
	                }), m.splice(m.length - o, 0, a), _[a] = !0);
	                for (o = 0; o < p.length; o++)
	                    if (s = d[a = p[o]], l = f[a], !_[a] && !t.deepEqual(s, l))
	                        if (t.deepEqual(s.source, l.source) && t.deepEqual(s["source-layer"], l["source-layer"]) && t.deepEqual(s.type, l.type)) {
	                            for (h in Qt(s.layout, l.layout, n, a, null, Xt.setLayoutProperty), Qt(s.paint, l.paint, n, a, null, Xt.setPaintProperty), t.deepEqual(s.filter, l.filter) || n.push({
	                                    command: Xt.setFilter,
	                                    args: [a, l.filter]
	                                }), t.deepEqual(s.minzoom, l.minzoom) && t.deepEqual(s.maxzoom, l.maxzoom) || n.push({
	                                    command: Xt.setLayerZoomRange,
	                                    args: [a, l.minzoom, l.maxzoom]
	                                }), s) s.hasOwnProperty(h) && "layout" !== h && "paint" !== h && "filter" !== h && "metadata" !== h && "minzoom" !== h && "maxzoom" !== h && (0 === h.indexOf("paint.") ? Qt(s[h], l[h], n, a, h.slice(6), Xt.setPaintProperty) : t.deepEqual(s[h], l[h]) || n.push({
	                                command: Xt.setLayerProperty,
	                                args: [a, h, l[h]]
	                            }));
	                            for (h in l) l.hasOwnProperty(h) && !s.hasOwnProperty(h) && "layout" !== h && "paint" !== h && "filter" !== h && "metadata" !== h && "minzoom" !== h && "maxzoom" !== h && (0 === h.indexOf("paint.") ? Qt(s[h], l[h], n, a, h.slice(6), Xt.setPaintProperty) : t.deepEqual(s[h], l[h]) || n.push({
	                                command: Xt.setLayerProperty,
	                                args: [a, h, l[h]]
	                            }));
	                        } else n.push({
	                            command: Xt.removeLayer,
	                            args: [a]
	                        }), c = m[m.lastIndexOf(a) + 1], n.push({
	                            command: Xt.addLayer,
	                            args: [l, c]
	                        });
	            }(a, i.layers, n);
	    } catch (t) {
	        console.warn("Unable to compute style diff:", t), n = [{
	            command: Xt.setStyle,
	            args: [i]
	        }];
	    }
	    return n
	}
	var ie = function(t, e, i) {
	    var n = this.boxCells = [],
	        o = this.circleCells = [];
	    this.xCellCount = Math.ceil(t / i), this.yCellCount = Math.ceil(e / i);
	    for (var r = 0; r < this.xCellCount * this.yCellCount; r++) n.push([]), o.push([]);
	    this.circleKeys = [], this.boxKeys = [], this.bboxes = [], this.circles = [], this.width = t, this.height = e, this.xScale = this.xCellCount / t, this.yScale = this.yCellCount / e, this.boxUid = 0, this.circleUid = 0;
	};
	ie.prototype.keysLength = function() {
	    return this.boxKeys.length + this.circleKeys.length
	}, ie.prototype.insert = function(t, e, i, n, o) {
	    this._forEachCell(e, i, n, o, this._insertBoxCell, this.boxUid++), this.boxKeys.push(t), this.bboxes.push(e), this.bboxes.push(i), this.bboxes.push(n), this.bboxes.push(o);
	}, ie.prototype.insertCircle = function(t, e, i, n) {
	    this._forEachCell(e - n, i - n, e + n, i + n, this._insertCircleCell, this.circleUid++), this.circleKeys.push(t), this.circles.push(e), this.circles.push(i), this.circles.push(n);
	}, ie.prototype._insertBoxCell = function(t, e, i, n, o, r) {
	    this.boxCells[o].push(r);
	}, ie.prototype._insertCircleCell = function(t, e, i, n, o, r) {
	    this.circleCells[o].push(r);
	}, ie.prototype._query = function(t, e, i, n, o, r) {
	    if (i < 0 || t > this.width || n < 0 || e > this.height) return !o && [];
	    var a = [];
	    if (t <= 0 && e <= 0 && this.width <= i && this.height <= n) {
	        if (o) return !0;
	        for (var s = 0; s < this.boxKeys.length; s++) a.push({
	            key: this.boxKeys[s],
	            x1: this.bboxes[4 * s],
	            y1: this.bboxes[4 * s + 1],
	            x2: this.bboxes[4 * s + 2],
	            y2: this.bboxes[4 * s + 3]
	        });
	        for (var l = 0; l < this.circleKeys.length; l++) {
	            var c = this.circles[3 * l],
	                h = this.circles[3 * l + 1],
	                u = this.circles[3 * l + 2];
	            a.push({
	                key: this.circleKeys[l],
	                x1: c - u,
	                y1: h - u,
	                x2: c + u,
	                y2: h + u
	            });
	        }
	        return r ? a.filter(r) : a
	    }
	    var p = {
	        hitTest: o,
	        seenUids: {
	            box: {},
	            circle: {}
	        }
	    };
	    return this._forEachCell(t, e, i, n, this._queryCell, a, p, r), o ? a.length > 0 : a
	}, ie.prototype._queryCircle = function(t, e, i, n, o) {
	    var r = t - i,
	        a = t + i,
	        s = e - i,
	        l = e + i;
	    if (a < 0 || r > this.width || l < 0 || s > this.height) return !n && [];
	    var c = [],
	        h = {
	            hitTest: n,
	            circle: {
	                x: t,
	                y: e,
	                radius: i
	            },
	            seenUids: {
	                box: {},
	                circle: {}
	            }
	        };
	    return this._forEachCell(r, s, a, l, this._queryCellCircle, c, h, o), n ? c.length > 0 : c
	}, ie.prototype.query = function(t, e, i, n, o) {
	    return this._query(t, e, i, n, !1, o)
	}, ie.prototype.hitTest = function(t, e, i, n, o) {
	    return this._query(t, e, i, n, !0, o)
	}, ie.prototype.hitTestCircle = function(t, e, i, n) {
	    return this._queryCircle(t, e, i, !0, n)
	}, ie.prototype._queryCell = function(t, e, i, n, o, r, a, s) {
	    var l = a.seenUids,
	        c = this.boxCells[o];
	    if (null !== c)
	        for (var h = this.bboxes, u = 0, p = c; u < p.length; u += 1) {
	            var d = p[u];
	            if (!l.box[d]) {
	                l.box[d] = !0;
	                var f = 4 * d;
	                if (t <= h[f + 2] && e <= h[f + 3] && i >= h[f + 0] && n >= h[f + 1] && (!s || s(this.boxKeys[d]))) {
	                    if (a.hitTest) return r.push(!0), !0;
	                    r.push({
	                        key: this.boxKeys[d],
	                        x1: h[f],
	                        y1: h[f + 1],
	                        x2: h[f + 2],
	                        y2: h[f + 3]
	                    });
	                }
	            }
	        }
	    var m = this.circleCells[o];
	    if (null !== m)
	        for (var _ = this.circles, g = 0, v = m; g < v.length; g += 1) {
	            var y = v[g];
	            if (!l.circle[y]) {
	                l.circle[y] = !0;
	                var x = 3 * y;
	                if (this._circleAndRectCollide(_[x], _[x + 1], _[x + 2], t, e, i, n) && (!s || s(this.circleKeys[y]))) {
	                    if (a.hitTest) return r.push(!0), !0;
	                    var b = _[x],
	                        w = _[x + 1],
	                        E = _[x + 2];
	                    r.push({
	                        key: this.circleKeys[y],
	                        x1: b - E,
	                        y1: w - E,
	                        x2: b + E,
	                        y2: w + E
	                    });
	                }
	            }
	        }
	}, ie.prototype._queryCellCircle = function(t, e, i, n, o, r, a, s) {
	    var l = a.circle,
	        c = a.seenUids,
	        h = this.boxCells[o];
	    if (null !== h)
	        for (var u = this.bboxes, p = 0, d = h; p < d.length; p += 1) {
	            var f = d[p];
	            if (!c.box[f]) {
	                c.box[f] = !0;
	                var m = 4 * f;
	                if (this._circleAndRectCollide(l.x, l.y, l.radius, u[m + 0], u[m + 1], u[m + 2], u[m + 3]) && (!s || s(this.boxKeys[f]))) return r.push(!0), !0
	            }
	        }
	    var _ = this.circleCells[o];
	    if (null !== _)
	        for (var g = this.circles, v = 0, y = _; v < y.length; v += 1) {
	            var x = y[v];
	            if (!c.circle[x]) {
	                c.circle[x] = !0;
	                var b = 3 * x;
	                if (this._circlesCollide(g[b], g[b + 1], g[b + 2], l.x, l.y, l.radius) && (!s || s(this.circleKeys[x]))) return r.push(!0), !0
	            }
	        }
	}, ie.prototype._forEachCell = function(t, e, i, n, o, r, a, s) {
	    for (var l = this._convertToXCellCoord(t), c = this._convertToYCellCoord(e), h = this._convertToXCellCoord(i), u = this._convertToYCellCoord(n), p = l; p <= h; p++)
	        for (var d = c; d <= u; d++) {
	            var f = this.xCellCount * d + p;
	            if (o.call(this, t, e, i, n, f, r, a, s)) return
	        }
	}, ie.prototype._convertToXCellCoord = function(t) {
	    return Math.max(0, Math.min(this.xCellCount - 1, Math.floor(t * this.xScale)))
	}, ie.prototype._convertToYCellCoord = function(t) {
	    return Math.max(0, Math.min(this.yCellCount - 1, Math.floor(t * this.yScale)))
	}, ie.prototype._circlesCollide = function(t, e, i, n, o, r) {
	    var a = n - t,
	        s = o - e,
	        l = i + r;
	    return l * l > a * a + s * s
	}, ie.prototype._circleAndRectCollide = function(t, e, i, n, o, r, a) {
	    var s = (r - n) / 2,
	        l = Math.abs(t - (n + s));
	    if (l > s + i) return !1;
	    var c = (a - o) / 2,
	        h = Math.abs(e - (o + c));
	    if (h > c + i) return !1;
	    if (l <= s || h <= c) return !0;
	    var u = l - s,
	        p = h - c;
	    return u * u + p * p <= i * i
	};
	var ne = t.properties.layout;

	function oe(e, i, n, o, r) {
	    var a = t.identity(new Float32Array(16));
	    return i ? (t.identity(a), t.scale(a, a, [1 / r, 1 / r, 1]), n || t.rotateZ(a, a, o.angle)) : (t.scale(a, a, [o.width / 2, -o.height / 2, 1]), t.translate(a, a, [1, -1, 0]), t.multiply(a, a, e)), a
	}

	function re(e, i, n, o, r) {
	    var a = t.identity(new Float32Array(16));
	    return i ? (t.multiply(a, a, e), t.scale(a, a, [r, r, 1]), n || t.rotateZ(a, a, -o.angle)) : (t.scale(a, a, [1, -1, 1]), t.translate(a, a, [-1, -1, 0]), t.scale(a, a, [2 / o.width, 2 / o.height, 1])), a
	}

	function ae(e, i) {
	    var n = [e.x, e.y, 0, 1];
	    _e(n, n, i);
	    var o = n[3];
	    return {
	        point: new t.Point(n[0] / o, n[1] / o),
	        signedDistanceFromCamera: o
	    }
	}

	function se(t, e) {
	    var i = t[0] / t[3],
	        n = t[1] / t[3];
	    return i >= -e[0] && i <= e[0] && n >= -e[1] && n <= e[1]
	}

	function le(e, i, n, o, r, a, s, l) {
	    var c = o ? e.textSizeData : e.iconSizeData,
	        h = t.evaluateSizeForZoom(c, n.transform.zoom, ne.properties[o ? "text-size" : "icon-size"]),
	        u = [256 / n.width * 2 + 1, 256 / n.height * 2 + 1],
	        p = o ? e.text.dynamicLayoutVertexArray : e.icon.dynamicLayoutVertexArray;
	    p.clear();
	    for (var d = e.lineVertexArray, f = o ? e.text.placedSymbolArray : e.icon.placedSymbolArray, m = n.transform.width / n.transform.height, _ = !1, g = 0; g < f.length; g++) {
	        var v = f.get(g);
	        if (v.hidden || v.writingMode === t.WritingMode.vertical && !_) me(v.numGlyphs, p);
	        else {
	            _ = !1;
	            var y = [v.anchorX, v.anchorY, 0, 1];
	            if (t.transformMat4(y, y, i), se(y, u)) {
	                var x = .5 + y[3] / n.transform.cameraToCenterDistance * .5,
	                    b = t.evaluateSizeForFeature(c, h, v),
	                    w = s ? b * x : b / x,
	                    E = new t.Point(v.anchorX, v.anchorY),
	                    T = ae(E, r).point,
	                    I = {},
	                    S = ue(v, w, !1, l, i, r, a, e.glyphOffsetArray, d, p, T, E, I, m);
	                _ = S.useVertical, (S.notEnoughRoom || _ || S.needsFlipping && ue(v, w, !0, l, i, r, a, e.glyphOffsetArray, d, p, T, E, I, m).notEnoughRoom) && me(v.numGlyphs, p);
	            } else me(v.numGlyphs, p);
	        }
	    }
	    o ? e.text.dynamicLayoutVertexBuffer.updateData(p) : e.icon.dynamicLayoutVertexBuffer.updateData(p);
	}

	function ce(t, e, i, n, o, r, a, s, l, c, h, u) {
	    var p = s.glyphStartIndex + s.numGlyphs,
	        d = s.lineStartIndex,
	        f = s.lineStartIndex + s.lineLength,
	        m = e.getoffsetX(s.glyphStartIndex),
	        _ = e.getoffsetX(p - 1),
	        g = de(t * m, i, n, o, r, a, s.segment, d, f, l, c, h, u);
	    if (!g) return null;
	    var v = de(t * _, i, n, o, r, a, s.segment, d, f, l, c, h, u);
	    return v ? {
	        first: g,
	        last: v
	    } : null
	}

	function he(e, i, n, o) {
	    if (e === t.WritingMode.horizontal && Math.abs(n.y - i.y) > Math.abs(n.x - i.x) * o) return {
	        useVertical: !0
	    };
	    return (e === t.WritingMode.vertical ? i.y < n.y : i.x > n.x) ? {
	        needsFlipping: !0
	    } : null
	}

	function ue(e, i, n, o, r, a, s, l, c, h, u, p, d, f) {
	    var m, _ = i / 24,
	        g = e.lineOffsetX * i,
	        v = e.lineOffsetY * i;
	    if (e.numGlyphs > 1) {
	        var y = e.glyphStartIndex + e.numGlyphs,
	            x = e.lineStartIndex,
	            b = e.lineStartIndex + e.lineLength,
	            w = ce(_, l, g, v, n, u, p, e, c, a, d, !1);
	        if (!w) return {
	            notEnoughRoom: !0
	        };
	        var E = ae(w.first.point, s).point,
	            T = ae(w.last.point, s).point;
	        if (o && !n) {
	            var I = he(e.writingMode, E, T, f);
	            if (I) return I
	        }
	        m = [w.first];
	        for (var S = e.glyphStartIndex + 1; S < y - 1; S++) m.push(de(_ * l.getoffsetX(S), g, v, n, u, p, e.segment, x, b, c, a, d, !1));
	        m.push(w.last);
	    } else {
	        if (o && !n) {
	            var C = ae(p, r).point,
	                z = e.lineStartIndex + e.segment + 1,
	                P = new t.Point(c.getx(z), c.gety(z)),
	                A = ae(P, r),
	                D = A.signedDistanceFromCamera > 0 ? A.point : pe(p, P, C, 1, r),
	                R = he(e.writingMode, C, D, f);
	            if (R) return R
	        }
	        var M = de(_ * l.getoffsetX(e.glyphStartIndex), g, v, n, u, p, e.segment, e.lineStartIndex, e.lineStartIndex + e.lineLength, c, a, d, !1);
	        if (!M) return {
	            notEnoughRoom: !0
	        };
	        m = [M];
	    }
	    for (var L = 0, k = m; L < k.length; L += 1) {
	        var B = k[L];
	        t.addDynamicAttributes(h, B.point, B.angle);
	    }
	    return {}
	}

	function pe(t, e, i, n, o) {
	    var r = ae(t.add(t.sub(e)._unit()), o).point,
	        a = i.sub(r);
	    return i.add(a._mult(n / a.mag()))
	}

	function de(e, i, n, o, r, a, s, l, c, h, u, p, d) {
	    var f = o ? e - i : e + i,
	        m = f > 0 ? 1 : -1,
	        _ = 0;
	    o && (m *= -1, _ = Math.PI), m < 0 && (_ += Math.PI);
	    for (var g = m > 0 ? l + s : l + s + 1, v = g, y = r, x = r, b = 0, w = 0, E = Math.abs(f); b + w <= E;) {
	        if ((g += m) < l || g >= c) return null;
	        if (x = y, void 0 === (y = p[g])) {
	            var T = new t.Point(h.getx(g), h.gety(g)),
	                I = ae(T, u);
	            if (I.signedDistanceFromCamera > 0) y = p[g] = I.point;
	            else {
	                var S = g - m;
	                y = pe(0 === b ? a : new t.Point(h.getx(S), h.gety(S)), T, x, E - b + 1, u);
	            }
	        }
	        b += w, w = x.dist(y);
	    }
	    var C = (E - b) / w,
	        z = y.sub(x),
	        P = z.mult(C)._add(x);
	    return P._add(z._unit()._perp()._mult(n * m)), {
	        point: P,
	        angle: _ + Math.atan2(y.y - x.y, y.x - x.x),
	        tileDistance: d ? {
	            prevTileDistance: g - m === v ? 0 : h.gettileUnitDistanceFromAnchor(g - m),
	            lastSegmentViewportDistance: E - b
	        } : null
	    }
	}
	var fe = new Float32Array([-1 / 0, -1 / 0, 0, -1 / 0, -1 / 0, 0, -1 / 0, -1 / 0, 0, -1 / 0, -1 / 0, 0]);

	function me(t, e) {
	    for (var i = 0; i < t; i++) {
	        var n = e.length;
	        e.resize(n + 4), e.float32.set(fe, 3 * n);
	    }
	}

	function _e(t, e, i) {
	    var n = e[0],
	        o = e[1];
	    return t[0] = i[0] * n + i[4] * o + i[12], t[1] = i[1] * n + i[5] * o + i[13], t[3] = i[3] * n + i[7] * o + i[15], t
	}
	var ge = function(t, e, i) {
	    void 0 === e && (e = new ie(t.width + 200, t.height + 200, 25)), void 0 === i && (i = new ie(t.width + 200, t.height + 200, 25)), this.transform = t, this.grid = e, this.ignoredGrid = i, this.pitchfactor = Math.cos(t._pitch) * t.cameraToCenterDistance, this.screenRightBoundary = t.width + 100, this.screenBottomBoundary = t.height + 100, this.gridRightBoundary = t.width + 200, this.gridBottomBoundary = t.height + 200;
	};

	function ve(t, e, i) {
	    t[e + 4] = i ? 1 : 0;
	}

	function ye(e, i, n) {
	    return i * (t.EXTENT / (e.tileSize * Math.pow(2, n - e.tileID.overscaledZ)))
	}
	ge.prototype.placeCollisionBox = function(t, e, i, n, o) {
	    var r = this.projectAndGetPerspectiveRatio(n, t.anchorPointX, t.anchorPointY),
	        a = i * r.perspectiveRatio,
	        s = t.x1 * a + r.point.x,
	        l = t.y1 * a + r.point.y,
	        c = t.x2 * a + r.point.x,
	        h = t.y2 * a + r.point.y;
	    return !this.isInsideGrid(s, l, c, h) || !e && this.grid.hitTest(s, l, c, h, o) ? {
	        box: [],
	        offscreen: !1
	    } : {
	        box: [s, l, c, h],
	        offscreen: this.isOffscreen(s, l, c, h)
	    }
	}, ge.prototype.approximateTileDistance = function(t, e, i, n, o) {
	    var r = o ? 1 : n / this.pitchfactor,
	        a = t.lastSegmentViewportDistance * i;
	    return t.prevTileDistance + a + (r - 1) * a * Math.abs(Math.sin(e))
	}, ge.prototype.placeCollisionCircles = function(e, i, n, o, r, a, s, l, c, h, u, p, d, f) {
	    var m = [],
	        _ = this.projectAnchor(h, a.anchorX, a.anchorY),
	        g = c / 24,
	        v = a.lineOffsetX * c,
	        y = a.lineOffsetY * c,
	        x = new t.Point(a.anchorX, a.anchorY),
	        b = ce(g, l, v, y, !1, ae(x, u).point, x, a, s, u, {}, !0),
	        w = !1,
	        E = !1,
	        T = !0,
	        I = _.perspectiveRatio * o,
	        S = 1 / (o * n),
	        C = 0,
	        z = 0;
	    b && (C = this.approximateTileDistance(b.first.tileDistance, b.first.angle, S, _.cameraDistance, d), z = this.approximateTileDistance(b.last.tileDistance, b.last.angle, S, _.cameraDistance, d));
	    for (var P = 0; P < e.length; P += 5) {
	        var A = e[P],
	            D = e[P + 1],
	            R = e[P + 2],
	            M = e[P + 3];
	        if (!b || M < -C || M > z) ve(e, P, !1);
	        else {
	            var L = this.projectPoint(h, A, D),
	                k = R * I;
	            if (m.length > 0) {
	                var B = L.x - m[m.length - 4],
	                    O = L.y - m[m.length - 3];
	                if (k * k * 2 > B * B + O * O)
	                    if (P + 8 < e.length) {
	                        var F = e[P + 8];
	                        if (F > -C && F < z) {
	                            ve(e, P, !1);
	                            continue
	                        }
	                    }
	            }
	            var N = P / 5;
	            m.push(L.x, L.y, k, N), ve(e, P, !0);
	            var U = L.x - k,
	                V = L.y - k,
	                Z = L.x + k,
	                j = L.y + k;
	            if (T = T && this.isOffscreen(U, V, Z, j), E = E || this.isInsideGrid(U, V, Z, j), !i && this.grid.hitTestCircle(L.x, L.y, k, f)) {
	                if (!p) return {
	                    circles: [],
	                    offscreen: !1
	                };
	                w = !0;
	            }
	        }
	    }
	    return {
	        circles: w || !E ? [] : m,
	        offscreen: T
	    }
	}, ge.prototype.queryRenderedSymbols = function(e) {
	    if (0 === e.length || 0 === this.grid.keysLength() && 0 === this.ignoredGrid.keysLength()) return {};
	    for (var i = [], n = 1 / 0, o = 1 / 0, r = -1 / 0, a = -1 / 0, s = 0, l = e; s < l.length; s += 1) {
	        var c = l[s],
	            h = new t.Point(c.x + 100, c.y + 100);
	        n = Math.min(n, h.x), o = Math.min(o, h.y), r = Math.max(r, h.x), a = Math.max(a, h.y), i.push(h);
	    }
	    for (var u = {}, p = {}, d = 0, f = this.grid.query(n, o, r, a).concat(this.ignoredGrid.query(n, o, r, a)); d < f.length; d += 1) {
	        var m = f[d],
	            _ = m.key;
	        if (void 0 === u[_.bucketInstanceId] && (u[_.bucketInstanceId] = {}), !u[_.bucketInstanceId][_.featureIndex]) {
	            var g = [new t.Point(m.x1, m.y1), new t.Point(m.x2, m.y1), new t.Point(m.x2, m.y2), new t.Point(m.x1, m.y2)];
	            t.polygonIntersectsPolygon(i, g) && (u[_.bucketInstanceId][_.featureIndex] = !0, void 0 === p[_.bucketInstanceId] && (p[_.bucketInstanceId] = []), p[_.bucketInstanceId].push(_.featureIndex));
	        }
	    }
	    return p
	}, ge.prototype.insertCollisionBox = function(t, e, i, n, o) {
	    var r = {
	        bucketInstanceId: i,
	        featureIndex: n,
	        collisionGroupID: o
	    };
	    (e ? this.ignoredGrid : this.grid).insert(r, t[0], t[1], t[2], t[3]);
	}, ge.prototype.insertCollisionCircles = function(t, e, i, n, o) {
	    for (var r = e ? this.ignoredGrid : this.grid, a = {
	            bucketInstanceId: i,
	            featureIndex: n,
	            collisionGroupID: o
	        }, s = 0; s < t.length; s += 4) r.insertCircle(a, t[s], t[s + 1], t[s + 2]);
	}, ge.prototype.projectAnchor = function(t, e, i) {
	    var n = [e, i, 0, 1];
	    return _e(n, n, t), {
	        perspectiveRatio: .5 + this.transform.cameraToCenterDistance / n[3] * .5,
	        cameraDistance: n[3]
	    }
	}, ge.prototype.projectPoint = function(e, i, n) {
	    var o = [i, n, 0, 1];
	    return _e(o, o, e), new t.Point((o[0] / o[3] + 1) / 2 * this.transform.width + 100, (-o[1] / o[3] + 1) / 2 * this.transform.height + 100)
	}, ge.prototype.projectAndGetPerspectiveRatio = function(e, i, n) {
	    var o = [i, n, 0, 1];
	    return _e(o, o, e), {
	        point: new t.Point((o[0] / o[3] + 1) / 2 * this.transform.width + 100, (-o[1] / o[3] + 1) / 2 * this.transform.height + 100),
	        perspectiveRatio: .5 + this.transform.cameraToCenterDistance / o[3] * .5
	    }
	}, ge.prototype.isOffscreen = function(t, e, i, n) {
	    return i < 100 || t >= this.screenRightBoundary || n < 100 || e > this.screenBottomBoundary
	}, ge.prototype.isInsideGrid = function(t, e, i, n) {
	    return i >= 0 && t < this.gridRightBoundary && n >= 0 && e < this.gridBottomBoundary
	};
	var xe = function(t, e, i, n) {
	    this.opacity = t ? Math.max(0, Math.min(1, t.opacity + (t.placed ? e : -e))) : n && i ? 1 : 0, this.placed = i;
	};
	xe.prototype.isHidden = function() {
	    return 0 === this.opacity && !this.placed
	};
	var be = function(t, e, i, n, o) {
	    this.text = new xe(t ? t.text : null, e, i, o), this.icon = new xe(t ? t.icon : null, e, n, o);
	};
	be.prototype.isHidden = function() {
	    return this.text.isHidden() && this.icon.isHidden()
	};
	var we = function(t, e, i) {
	        this.text = t, this.icon = e, this.skipFade = i;
	    },
	    Ee = function(t) {
	        this.crossSourceCollisions = t, this.maxGroupID = 0, this.collisionGroups = {};
	    };
	Ee.prototype.get = function(t) {
	    if (this.crossSourceCollisions) return {
	        ID: 0,
	        predicate: null
	    };
	    if (!this.collisionGroups[t]) {
	        var e = ++this.maxGroupID;
	        this.collisionGroups[t] = {
	            ID: e,
	            predicate: function(t) {
	                return t.collisionGroupID === e
	            }
	        };
	    }
	    return this.collisionGroups[t]
	};
	var Te = function(t, e, i) {
	    this.transform = t.clone(), this.collisionIndex = new ge(this.transform), this.placements = {}, this.opacities = {}, this.stale = !1, this.fadeDuration = e, this.retainedQueryData = {}, this.collisionGroups = new Ee(i);
	};

	function Ie(t, e, i) {
	    t.emplaceBack(e ? 1 : 0, i ? 1 : 0), t.emplaceBack(e ? 1 : 0, i ? 1 : 0), t.emplaceBack(e ? 1 : 0, i ? 1 : 0), t.emplaceBack(e ? 1 : 0, i ? 1 : 0);
	}
	Te.prototype.placeLayerTile = function(e, i, n, o) {
	    var r = i.getBucket(e),
	        a = i.latestFeatureIndex;
	    if (r && a && e.id === r.layerIds[0]) {
	        var s = i.collisionBoxArray,
	            l = r.layers[0].layout,
	            c = Math.pow(2, this.transform.zoom - i.tileID.overscaledZ),
	            h = i.tileSize / t.EXTENT,
	            u = this.transform.calculatePosMatrix(i.tileID.toUnwrapped()),
	            p = oe(u, "map" === l.get("text-pitch-alignment"), "map" === l.get("text-rotation-alignment"), this.transform, ye(i, 1, this.transform.zoom)),
	            d = oe(u, "map" === l.get("icon-pitch-alignment"), "map" === l.get("icon-rotation-alignment"), this.transform, ye(i, 1, this.transform.zoom));
	        this.retainedQueryData[r.bucketInstanceId] = new function(t, e, i, n, o) {
	            this.bucketInstanceId = t, this.featureIndex = e, this.sourceLayerIndex = i, this.bucketIndex = n, this.tileID = o;
	        }(r.bucketInstanceId, a, r.sourceLayerIndex, r.index, i.tileID), this.placeLayerBucket(r, u, p, d, c, h, n, i.holdingForFade(), o, s);
	    }
	}, Te.prototype.placeLayerBucket = function(e, i, n, o, r, a, s, l, c, h) {
	    for (var u = e.layers[0].layout, p = t.evaluateSizeForZoom(e.textSizeData, this.transform.zoom, t.properties.layout.properties["text-size"]), d = u.get("text-optional"), f = u.get("icon-optional"), m = this.collisionGroups.get(e.sourceID), _ = 0, g = e.symbolInstances; _ < g.length; _ += 1) {
	        var v = g[_];
	        if (!c[v.crossTileID]) {
	            if (l) {
	                this.placements[v.crossTileID] = new we(!1, !1, !1);
	                continue
	            }
	            var y = !1,
	                x = !1,
	                b = !0,
	                w = null,
	                E = null,
	                T = null,
	                I = 0,
	                S = 0;
	            v.collisionArrays || (v.collisionArrays = e.deserializeCollisionBoxes(h, v.textBoxStartIndex, v.textBoxEndIndex, v.iconBoxStartIndex, v.iconBoxEndIndex)), v.collisionArrays.textFeatureIndex && (I = v.collisionArrays.textFeatureIndex), v.collisionArrays.textBox && (y = (w = this.collisionIndex.placeCollisionBox(v.collisionArrays.textBox, u.get("text-allow-overlap"), a, i, m.predicate)).box.length > 0, b = b && w.offscreen);
	            var C = v.collisionArrays.textCircles;
	            if (C) {
	                var z = e.text.placedSymbolArray.get(v.placedTextSymbolIndices[0]),
	                    P = t.evaluateSizeForFeature(e.textSizeData, p, z);
	                E = this.collisionIndex.placeCollisionCircles(C, u.get("text-allow-overlap"), r, a, v.key, z, e.lineVertexArray, e.glyphOffsetArray, P, i, n, s, "map" === u.get("text-pitch-alignment"), m.predicate), y = u.get("text-allow-overlap") || E.circles.length > 0, b = b && E.offscreen;
	            }
	            v.collisionArrays.iconFeatureIndex && (S = v.collisionArrays.iconFeatureIndex), v.collisionArrays.iconBox && (x = (T = this.collisionIndex.placeCollisionBox(v.collisionArrays.iconBox, u.get("icon-allow-overlap"), a, i, m.predicate)).box.length > 0, b = b && T.offscreen);
	            var A = d || 0 === v.numGlyphVertices && 0 === v.numVerticalGlyphVertices,
	                D = f || 0 === v.numIconVertices;
	            A || D ? D ? A || (x = x && y) : y = x && y : x = y = x && y, y && w && this.collisionIndex.insertCollisionBox(w.box, u.get("text-ignore-placement"), e.bucketInstanceId, I, m.ID), x && T && this.collisionIndex.insertCollisionBox(T.box, u.get("icon-ignore-placement"), e.bucketInstanceId, S, m.ID), y && E && this.collisionIndex.insertCollisionCircles(E.circles, u.get("text-ignore-placement"), e.bucketInstanceId, I, m.ID), this.placements[v.crossTileID] = new we(y, x, b || e.justReloaded), c[v.crossTileID] = !0;
	        }
	    }
	    e.justReloaded = !1;
	}, Te.prototype.commit = function(t, e) {
	    this.commitTime = e;
	    var i = !1,
	        n = t && 0 !== this.fadeDuration ? (this.commitTime - t.commitTime) / this.fadeDuration : 1,
	        o = t ? t.opacities : {};
	    for (var r in this.placements) {
	        var a = this.placements[r],
	            s = o[r];
	        s ? (this.opacities[r] = new be(s, n, a.text, a.icon), i = i || a.text !== s.text.placed || a.icon !== s.icon.placed) : (this.opacities[r] = new be(null, n, a.text, a.icon, a.skipFade), i = i || a.text || a.icon);
	    }
	    for (var l in o) {
	        var c = o[l];
	        if (!this.opacities[l]) {
	            var h = new be(c, n, !1, !1);
	            h.isHidden() || (this.opacities[l] = h, i = i || c.text.placed || c.icon.placed);
	        }
	    }
	    i ? this.lastPlacementChangeTime = e : "number" != typeof this.lastPlacementChangeTime && (this.lastPlacementChangeTime = t ? t.lastPlacementChangeTime : e);
	}, Te.prototype.updateLayerOpacities = function(t, e) {
	    for (var i = {}, n = 0, o = e; n < o.length; n += 1) {
	        var r = o[n],
	            a = r.getBucket(t);
	        a && r.latestFeatureIndex && t.id === a.layerIds[0] && this.updateBucketOpacities(a, i, r.collisionBoxArray);
	    }
	}, Te.prototype.updateBucketOpacities = function(t, e, i) {
	    t.hasTextData() && t.text.opacityVertexArray.clear(), t.hasIconData() && t.icon.opacityVertexArray.clear(), t.hasCollisionBoxData() && t.collisionBox.collisionVertexArray.clear(), t.hasCollisionCircleData() && t.collisionCircle.collisionVertexArray.clear();
	    for (var n = t.layers[0].layout, o = new be(null, 0, !1, !1, !0), r = new be(null, 0, n.get("text-allow-overlap"), n.get("icon-allow-overlap"), !0), a = 0; a < t.symbolInstances.length; a++) {
	        var s = t.symbolInstances[a],
	            l = e[s.crossTileID],
	            c = this.opacities[s.crossTileID];
	        l ? c = o : c || (c = r, this.opacities[s.crossTileID] = c), e[s.crossTileID] = !0;
	        var h = s.numGlyphVertices > 0 || s.numVerticalGlyphVertices > 0,
	            u = s.numIconVertices > 0;
	        if (h) {
	            for (var p = Me(c.text), d = (s.numGlyphVertices + s.numVerticalGlyphVertices) / 4, f = 0; f < d; f++) t.text.opacityVertexArray.emplaceBack(p);
	            for (var m = 0, _ = s.placedTextSymbolIndices; m < _.length; m += 1) {
	                var g = _[m];
	                t.text.placedSymbolArray.get(g).hidden = c.text.isHidden();
	            }
	        }
	        if (u) {
	            for (var v = Me(c.icon), y = 0; y < s.numIconVertices / 4; y++) t.icon.opacityVertexArray.emplaceBack(v);
	            t.icon.placedSymbolArray.get(a).hidden = c.icon.isHidden();
	        }
	        s.collisionArrays || (s.collisionArrays = t.deserializeCollisionBoxes(i, s.textBoxStartIndex, s.textBoxEndIndex, s.iconBoxStartIndex, s.iconBoxEndIndex));
	        var x = s.collisionArrays;
	        if (x) {
	            x.textBox && t.hasCollisionBoxData() && Ie(t.collisionBox.collisionVertexArray, c.text.placed, !1), x.iconBox && t.hasCollisionBoxData() && Ie(t.collisionBox.collisionVertexArray, c.icon.placed, !1);
	            var b = x.textCircles;
	            if (b && t.hasCollisionCircleData())
	                for (var w = 0; w < b.length; w += 5) {
	                    var E = l || 0 === b[w + 4];
	                    Ie(t.collisionCircle.collisionVertexArray, c.text.placed, E);
	                }
	        }
	    }
	    t.sortFeatures(this.transform.angle), this.retainedQueryData[t.bucketInstanceId] && (this.retainedQueryData[t.bucketInstanceId].featureSortOrder = t.featureSortOrder), t.hasTextData() && t.text.opacityVertexBuffer && t.text.opacityVertexBuffer.updateData(t.text.opacityVertexArray), t.hasIconData() && t.icon.opacityVertexBuffer && t.icon.opacityVertexBuffer.updateData(t.icon.opacityVertexArray), t.hasCollisionBoxData() && t.collisionBox.collisionVertexBuffer && t.collisionBox.collisionVertexBuffer.updateData(t.collisionBox.collisionVertexArray), t.hasCollisionCircleData() && t.collisionCircle.collisionVertexBuffer && t.collisionCircle.collisionVertexBuffer.updateData(t.collisionCircle.collisionVertexArray);
	}, Te.prototype.symbolFadeChange = function(t) {
	    return 0 === this.fadeDuration ? 1 : (t - this.commitTime) / this.fadeDuration
	}, Te.prototype.hasTransitions = function(t) {
	    return this.stale || t - this.lastPlacementChangeTime < this.fadeDuration
	}, Te.prototype.stillRecent = function(t) {
	    return "undefined" !== this.commitTime && this.commitTime + this.fadeDuration > t
	}, Te.prototype.setStale = function() {
	    this.stale = !0;
	};
	var Se = Math.pow(2, 25),
	    Ce = Math.pow(2, 24),
	    ze = Math.pow(2, 17),
	    Pe = Math.pow(2, 16),
	    Ae = Math.pow(2, 9),
	    De = Math.pow(2, 8),
	    Re = Math.pow(2, 1);

	function Me(t) {
	    if (0 === t.opacity && !t.placed) return 0;
	    if (1 === t.opacity && t.placed) return 4294967295;
	    var e = t.placed ? 1 : 0,
	        i = Math.floor(127 * t.opacity);
	    return i * Se + e * Ce + i * ze + e * Pe + i * Ae + e * De + i * Re + e
	}
	var Le = function() {
	    this._currentTileIndex = 0, this._seenCrossTileIDs = {};
	};
	Le.prototype.continuePlacement = function(t, e, i, n, o) {
	    for (; this._currentTileIndex < t.length;) {
	        var r = t[this._currentTileIndex];
	        if (e.placeLayerTile(n, r, i, this._seenCrossTileIDs), this._currentTileIndex++, o()) return !0
	    }
	};
	var ke = function(t, e, i, n, o, r) {
	    this.placement = new Te(t, o, r), this._currentPlacementIndex = e.length - 1, this._forceFullPlacement = i, this._showCollisionBoxes = n, this._done = !1;
	};
	ke.prototype.isDone = function() {
	    return this._done
	}, ke.prototype.continuePlacement = function(e, i, n) {
	    for (var o = this, r = t.browser.now(), a = function() {
	            var e = t.browser.now() - r;
	            return !o._forceFullPlacement && e > 2
	        }; this._currentPlacementIndex >= 0;) {
	        var s = i[e[o._currentPlacementIndex]],
	            l = o.placement.collisionIndex.transform.zoom;
	        if ("symbol" === s.type && (!s.minzoom || s.minzoom <= l) && (!s.maxzoom || s.maxzoom > l)) {
	            if (o._inProgressLayer || (o._inProgressLayer = new Le), o._inProgressLayer.continuePlacement(n[s.source], o.placement, o._showCollisionBoxes, s, a)) return;
	            delete o._inProgressLayer;
	        }
	        o._currentPlacementIndex--;
	    }
	    this._done = !0;
	}, ke.prototype.commit = function(t, e) {
	    return this.placement.commit(t, e), this.placement
	};
	var Be = 512 / t.EXTENT / 2,
	    Oe = function(t, e, i) {
	        this.tileID = t, this.indexedSymbolInstances = {}, this.bucketInstanceId = i;
	        for (var n = 0, o = e; n < o.length; n += 1) {
	            var r = o[n],
	                a = r.key;
	            this.indexedSymbolInstances[a] || (this.indexedSymbolInstances[a] = []), this.indexedSymbolInstances[a].push({
	                crossTileID: r.crossTileID,
	                coord: this.getScaledCoordinates(r, t)
	            });
	        }
	    };
	Oe.prototype.getScaledCoordinates = function(e, i) {
	    var n = i.canonical.z - this.tileID.canonical.z,
	        o = Be / Math.pow(2, n),
	        r = e.anchor;
	    return {
	        x: Math.floor((i.canonical.x * t.EXTENT + r.x) * o),
	        y: Math.floor((i.canonical.y * t.EXTENT + r.y) * o)
	    }
	}, Oe.prototype.findMatches = function(t, e, i) {
	    for (var n = this.tileID.canonical.z < e.canonical.z ? 1 : Math.pow(2, this.tileID.canonical.z - e.canonical.z), o = 0, r = t; o < r.length; o += 1) {
	        var a = r[o];
	        if (!a.crossTileID) {
	            var s = this.indexedSymbolInstances[a.key];
	            if (s)
	                for (var l = this.getScaledCoordinates(a, e), c = 0, h = s; c < h.length; c += 1) {
	                    var u = h[c];
	                    if (Math.abs(u.coord.x - l.x) <= n && Math.abs(u.coord.y - l.y) <= n && !i[u.crossTileID]) {
	                        i[u.crossTileID] = !0, a.crossTileID = u.crossTileID;
	                        break
	                    }
	                }
	        }
	    }
	};
	var Fe = function() {
	    this.maxCrossTileID = 0;
	};
	Fe.prototype.generate = function() {
	    return ++this.maxCrossTileID
	};
	var Ne = function() {
	    this.indexes = {}, this.usedCrossTileIDs = {}, this.lng = 0;
	};
	Ne.prototype.handleWrapJump = function(t) {
	    var e = Math.round((t - this.lng) / 360);
	    if (0 !== e)
	        for (var i in this.indexes) {
	            var n = this.indexes[i],
	                o = {};
	            for (var r in n) {
	                var a = n[r];
	                a.tileID = a.tileID.unwrapTo(a.tileID.wrap + e), o[a.tileID.key] = a;
	            }
	            this.indexes[i] = o;
	        }
	    this.lng = t;
	}, Ne.prototype.addBucket = function(t, e, i) {
	    if (this.indexes[t.overscaledZ] && this.indexes[t.overscaledZ][t.key]) {
	        if (this.indexes[t.overscaledZ][t.key].bucketInstanceId === e.bucketInstanceId) return !1;
	        this.removeBucketCrossTileIDs(t.overscaledZ, this.indexes[t.overscaledZ][t.key]);
	    }
	    for (var n = 0, o = e.symbolInstances; n < o.length; n += 1) {
	        o[n].crossTileID = 0;
	    }
	    this.usedCrossTileIDs[t.overscaledZ] || (this.usedCrossTileIDs[t.overscaledZ] = {});
	    var r = this.usedCrossTileIDs[t.overscaledZ];
	    for (var a in this.indexes) {
	        var s = this.indexes[a];
	        if (Number(a) > t.overscaledZ)
	            for (var l in s) {
	                var c = s[l];
	                c.tileID.isChildOf(t) && c.findMatches(e.symbolInstances, t, r);
	            } else {
	                var h = s[t.scaledTo(Number(a)).key];
	                h && h.findMatches(e.symbolInstances, t, r);
	            }
	    }
	    for (var u = 0, p = e.symbolInstances; u < p.length; u += 1) {
	        var d = p[u];
	        d.crossTileID || (d.crossTileID = i.generate(), r[d.crossTileID] = !0);
	    }
	    return void 0 === this.indexes[t.overscaledZ] && (this.indexes[t.overscaledZ] = {}), this.indexes[t.overscaledZ][t.key] = new Oe(t, e.symbolInstances, e.bucketInstanceId), !0
	}, Ne.prototype.removeBucketCrossTileIDs = function(t, e) {
	    for (var i in e.indexedSymbolInstances)
	        for (var n = 0, o = e.indexedSymbolInstances[i]; n < o.length; n += 1) {
	            var r = o[n];
	            delete this.usedCrossTileIDs[t][r.crossTileID];
	        }
	}, Ne.prototype.removeStaleBuckets = function(t) {
	    var e = !1;
	    for (var i in this.indexes) {
	        var n = this.indexes[i];
	        for (var o in n) t[n[o].bucketInstanceId] || (this.removeBucketCrossTileIDs(i, n[o]), delete n[o], e = !0);
	    }
	    return e
	};
	var Ue = function() {
	    this.layerIndexes = {}, this.crossTileIDs = new Fe, this.maxBucketInstanceId = 0, this.bucketsInCurrentPlacement = {};
	};
	Ue.prototype.addLayer = function(t, e, i) {
	    var n = this.layerIndexes[t.id];
	    void 0 === n && (n = this.layerIndexes[t.id] = new Ne);
	    var o = !1,
	        r = {};
	    n.handleWrapJump(i);
	    for (var a = 0, s = e; a < s.length; a += 1) {
	        var l = s[a],
	            c = l.getBucket(t);
	        c && t.id === c.layerIds[0] && (c.bucketInstanceId || (c.bucketInstanceId = ++this.maxBucketInstanceId), n.addBucket(l.tileID, c, this.crossTileIDs) && (o = !0), r[c.bucketInstanceId] = !0);
	    }
	    return n.removeStaleBuckets(r) && (o = !0), o
	}, Ue.prototype.pruneUnusedLayers = function(t) {
	    var e = {};
	    for (var i in t.forEach(function(t) {
	            e[t] = !0;
	        }), this.layerIndexes) e[i] || delete this.layerIndexes[i];
	};
	var Ve = function(e, i) {
	        return t.emitValidationErrors(e, i && i.filter(function(t) {
	            return "source.canvas" !== t.identifier
	        }))
	    },
	    Ze = t.pick(Xt, ["addLayer", "removeLayer", "setPaintProperty", "setLayoutProperty", "setFilter", "addSource", "removeSource", "setLayerZoomRange", "setLight", "setTransition", "setGeoJSONSourceData"]),
	    je = t.pick(Xt, ["setCenter", "setZoom", "setBearing", "setPitch"]),
	    qe = function(e) {
	        function i(n, o) {
	            var r = this;
	            void 0 === o && (o = {}), e.call(this), this.map = n, this.dispatcher = new O((jt || (jt = new qt), jt), this), this.imageManager = new S, this.glyphManager = new R(n._transformRequest, o.localIdeographFontFamily), this.lineAtlas = new B(256, 512), this.crossTileSymbolIndex = new Ue, this._layers = {}, this._order = [], this.sourceCaches = {}, this.zoomHistory = new t.ZoomHistory, this._loaded = !1, this._resetUpdates();
	            var a = this;
	            this._rtlTextPluginCallback = i.registerForPluginAvailability(function(t) {
	                for (var e in a.dispatcher.broadcast("loadRTLTextPlugin", t.pluginURL, t.completionCallback), a.sourceCaches) a.sourceCaches[e].reload();
	            }), this.on("data", function(t) {
	                if ("source" === t.dataType && "metadata" === t.sourceDataType) {
	                    var e = r.sourceCaches[t.sourceId];
	                    if (e) {
	                        var i = e.getSource();
	                        if (i && i.vectorLayerIds)
	                            for (var n in r._layers) {
	                                var o = r._layers[n];
	                                o.source === i.id && r._validateLayer(o);
	                            }
	                    }
	                }
	            });
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.loadURL = function(e, i) {
	            var n = this;
	            void 0 === i && (i = {}), this.fire(new t.Event("dataloading", {
	                dataType: "style"
	            }));
	            var o = "boolean" == typeof i.validate ? i.validate : !f(e);
	            e = function(t, e) {
	                if (!f(t)) return t;
	                var i = b(t);
	                return i.path = "/styles/v1" + i.path, d(i, e)
	            }(e, i.accessToken);
	            var r = this.map._transformRequest(e, t.ResourceType.Style);
	            this._request = t.getJSON(r, function(e, i) {
	                n._request = null, e ? n.fire(new t.ErrorEvent(e)) : i && n._load(i, o);
	            });
	        }, i.prototype.loadJSON = function(e, i) {
	            var n = this;
	            void 0 === i && (i = {}), this.fire(new t.Event("dataloading", {
	                dataType: "style"
	            })), this._request = t.browser.frame(function() {
	                n._request = null, n._load(e, !1 !== i.validate);
	            });
	        }, i.prototype._load = function(e, i) {
	            var n = this;
	            if (!i || !Ve(this, t.validateStyle(e))) {
	                for (var o in this._loaded = !0, this.stylesheet = e, e.sources) n.addSource(o, e.sources[o], {
	                    validate: !1
	                });
	                e.sprite ? this._spriteRequest = function(e, i, n) {
	                    var o, r, a, s = t.browser.devicePixelRatio > 1 ? "@2x" : "",
	                        l = t.getJSON(i(g(e, s, ".json"), t.ResourceType.SpriteJSON), function(t, e) {
	                            l = null, a || (a = t, o = e, h());
	                        }),
	                        c = t.getImage(i(g(e, s, ".png"), t.ResourceType.SpriteImage), function(t, e) {
	                            c = null, a || (a = t, r = e, h());
	                        });

	                    function h() {
	                        if (a) n(a);
	                        else if (o && r) {
	                            var e = t.browser.getImageData(r),
	                                i = {};
	                            for (var s in o) {
	                                var l = o[s],
	                                    c = l.width,
	                                    h = l.height,
	                                    u = l.x,
	                                    p = l.y,
	                                    d = l.sdf,
	                                    f = l.pixelRatio,
	                                    m = new t.RGBAImage({
	                                        width: c,
	                                        height: h
	                                    });
	                                t.RGBAImage.copy(e, m, {
	                                    x: u,
	                                    y: p
	                                }, {
	                                    x: 0,
	                                    y: 0
	                                }, {
	                                    width: c,
	                                    height: h
	                                }), i[s] = {
	                                    data: m,
	                                    pixelRatio: f,
	                                    sdf: d
	                                };
	                            }
	                            n(null, i);
	                        }
	                    }
	                    return {
	                        cancel: function() {
	                            l && (l.cancel(), l = null), c && (c.cancel(), c = null);
	                        }
	                    }
	                }(e.sprite, this.map._transformRequest, function(e, i) {
	                    if (n._spriteRequest = null, e) n.fire(new t.ErrorEvent(e));
	                    else if (i)
	                        for (var o in i) n.imageManager.addImage(o, i[o]);
	                    n.imageManager.setLoaded(!0), n.fire(new t.Event("data", {
	                        dataType: "style"
	                    }));
	                }) : this.imageManager.setLoaded(!0), this.glyphManager.setURL(e.glyphs);
	                var r = Wt(this.stylesheet.layers);
	                this._order = r.map(function(t) {
	                    return t.id
	                }), this._layers = {};
	                for (var a = 0, s = r; a < s.length; a += 1) {
	                    var l = s[a];
	                    (l = t.createStyleLayer(l)).setEventedParent(n, {
	                        layer: {
	                            id: l.id
	                        }
	                    }), n._layers[l.id] = l;
	                }
	                this.dispatcher.broadcast("setLayers", this._serializeLayers(this._order)), this.light = new k(this.stylesheet.light), this.fire(new t.Event("data", {
	                    dataType: "style"
	                })), this.fire(new t.Event("style.load"));
	            }
	        }, i.prototype._validateLayer = function(e) {
	            var i = this.sourceCaches[e.source];
	            if (i) {
	                var n = e.sourceLayer;
	                if (n) {
	                    var o = i.getSource();
	                    ("geojson" === o.type || o.vectorLayerIds && -1 === o.vectorLayerIds.indexOf(n)) && this.fire(new t.ErrorEvent(new Error('Source layer "' + n + '" does not exist on source "' + o.id + '" as specified by style layer "' + e.id + '"')));
	                }
	            }
	        }, i.prototype.loaded = function() {
	            if (!this._loaded) return !1;
	            if (Object.keys(this._updatedSources).length) return !1;
	            for (var t in this.sourceCaches)
	                if (!this.sourceCaches[t].loaded()) return !1;
	            return !!this.imageManager.isLoaded()
	        }, i.prototype._serializeLayers = function(t) {
	            var e = this;
	            return t.map(function(t) {
	                return e._layers[t].serialize()
	            })
	        }, i.prototype.hasTransitions = function() {
	            if (this.light && this.light.hasTransition()) return !0;
	            for (var t in this.sourceCaches)
	                if (this.sourceCaches[t].hasTransition()) return !0;
	            for (var e in this._layers)
	                if (this._layers[e].hasTransition()) return !0;
	            return !1
	        }, i.prototype._checkLoaded = function() {
	            if (!this._loaded) throw new Error("Style is not done loading")
	        }, i.prototype.update = function(e) {
	            if (this._loaded) {
	                if (this._changed) {
	                    var i = Object.keys(this._updatedLayers),
	                        n = Object.keys(this._removedLayers);
	                    for (var o in (i.length || n.length) && this._updateWorkerLayers(i, n), this._updatedSources) {
	                        var r = this._updatedSources[o];
	                        "reload" === r ? this._reloadSource(o) : "clear" === r && this._clearSource(o);
	                    }
	                    for (var a in this._updatedPaintProps) this._layers[a].updateTransitions(e);
	                    this.light.updateTransitions(e), this._resetUpdates(), this.fire(new t.Event("data", {
	                        dataType: "style"
	                    }));
	                }
	                for (var s in this.sourceCaches) this.sourceCaches[s].used = !1;
	                for (var l = 0, c = this._order; l < c.length; l += 1) {
	                    var h = c[l],
	                        u = this._layers[h];
	                    u.recalculate(e), !u.isHidden(e.zoom) && u.source && (this.sourceCaches[u.source].used = !0);
	                }
	                this.light.recalculate(e), this.z = e.zoom;
	            }
	        }, i.prototype._updateWorkerLayers = function(t, e) {
	            this.dispatcher.broadcast("updateLayers", {
	                layers: this._serializeLayers(t),
	                removedIds: e
	            });
	        }, i.prototype._resetUpdates = function() {
	            this._changed = !1, this._updatedLayers = {}, this._removedLayers = {}, this._updatedSources = {}, this._updatedPaintProps = {};
	        }, i.prototype.setState = function(e) {
	            var i = this;
	            if (this._checkLoaded(), Ve(this, t.validateStyle(e))) return !1;
	            (e = t.clone(e)).layers = Wt(e.layers);
	            var n = ee(this.serialize(), e).filter(function(t) {
	                return !(t.command in je)
	            });
	            if (0 === n.length) return !1;
	            var o = n.filter(function(t) {
	                return !(t.command in Ze)
	            });
	            if (o.length > 0) throw new Error("Unimplemented: " + o.map(function(t) {
	                return t.command
	            }).join(", ") + ".");
	            return n.forEach(function(t) {
	                "setTransition" !== t.command && i[t.command].apply(i, t.args);
	            }), this.stylesheet = e, !0
	        }, i.prototype.addImage = function(e, i) {
	            if (this.getImage(e)) return this.fire(new t.ErrorEvent(new Error("An image with this name already exists.")));
	            this.imageManager.addImage(e, i), this.fire(new t.Event("data", {
	                dataType: "style"
	            }));
	        }, i.prototype.getImage = function(t) {
	            return this.imageManager.getImage(t)
	        }, i.prototype.removeImage = function(e) {
	            if (!this.getImage(e)) return this.fire(new t.ErrorEvent(new Error("No image with this name exists.")));
	            this.imageManager.removeImage(e), this.fire(new t.Event("data", {
	                dataType: "style"
	            }));
	        }, i.prototype.listImages = function() {
	            return this._checkLoaded(), this.imageManager.listImages()
	        }, i.prototype.addSource = function(e, i, n) {
	            var o = this;
	            if (this._checkLoaded(), void 0 !== this.sourceCaches[e]) throw new Error("There is already a source with this ID");
	            if (!i.type) throw new Error("The type property must be defined, but the only the following properties were given: " + Object.keys(i).join(", ") + ".");
	            if (!(["vector", "raster", "geojson", "video", "image"].indexOf(i.type) >= 0) || !this._validate(t.validateStyle.source, "sources." + e, i, null, n)) {
	                this.map && this.map._collectResourceTiming && (i.collectResourceTiming = !0);
	                var r = this.sourceCaches[e] = new Ft(e, i, this.dispatcher);
	                r.style = this, r.setEventedParent(this, function() {
	                    return {
	                        isSourceLoaded: o.loaded(),
	                        source: r.serialize(),
	                        sourceId: e
	                    }
	                }), r.onAdd(this.map), this._changed = !0;
	            }
	        }, i.prototype.removeSource = function(e) {
	            if (this._checkLoaded(), void 0 === this.sourceCaches[e]) throw new Error("There is no source with this ID");
	            for (var i in this._layers)
	                if (this._layers[i].source === e) return this.fire(new t.ErrorEvent(new Error('Source "' + e + '" cannot be removed while layer "' + i + '" is using it.')));
	            var n = this.sourceCaches[e];
	            delete this.sourceCaches[e], delete this._updatedSources[e], n.fire(new t.Event("data", {
	                sourceDataType: "metadata",
	                dataType: "source",
	                sourceId: e
	            })), n.setEventedParent(null), n.clearTiles(), n.onRemove && n.onRemove(this.map), this._changed = !0;
	        }, i.prototype.setGeoJSONSourceData = function(t, e) {
	            this._checkLoaded(), this.sourceCaches[t].getSource().setData(e), this._changed = !0;
	        }, i.prototype.getSource = function(t) {
	            return this.sourceCaches[t] && this.sourceCaches[t].getSource()
	        }, i.prototype.addLayer = function(e, i, n) {
	            this._checkLoaded();
	            var o = e.id;
	            if (this.getLayer(o)) this.fire(new t.ErrorEvent(new Error('Layer with id "' + o + '" already exists on this map')));
	            else if ("object" == typeof e.source && (this.addSource(o, e.source), e = t.clone(e), e = t.extend(e, {
	                    source: o
	                })), !this._validate(t.validateStyle.layer, "layers." + o, e, {
	                    arrayIndex: -1
	                }, n)) {
	                var r = t.createStyleLayer(e);
	                this._validateLayer(r), r.setEventedParent(this, {
	                    layer: {
	                        id: o
	                    }
	                });
	                var a = i ? this._order.indexOf(i) : this._order.length;
	                if (i && -1 === a) this.fire(new t.ErrorEvent(new Error('Layer with id "' + i + '" does not exist on this map.')));
	                else {
	                    if (this._order.splice(a, 0, o), this._layerOrderChanged = !0, this._layers[o] = r, this._removedLayers[o] && r.source) {
	                        var s = this._removedLayers[o];
	                        delete this._removedLayers[o], s.type !== r.type ? this._updatedSources[r.source] = "clear" : (this._updatedSources[r.source] = "reload", this.sourceCaches[r.source].pause());
	                    }
	                    this._updateLayer(r);
	                }
	            }
	        }, i.prototype.moveLayer = function(e, i) {
	            if (this._checkLoaded(), this._changed = !0, this._layers[e]) {
	                if (e !== i) {
	                    var n = this._order.indexOf(e);
	                    this._order.splice(n, 1);
	                    var o = i ? this._order.indexOf(i) : this._order.length;
	                    i && -1 === o ? this.fire(new t.ErrorEvent(new Error('Layer with id "' + i + '" does not exist on this map.'))) : (this._order.splice(o, 0, e), this._layerOrderChanged = !0);
	                }
	            } else this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be moved.")));
	        }, i.prototype.removeLayer = function(e) {
	            this._checkLoaded();
	            var i = this._layers[e];
	            if (i) {
	                i.setEventedParent(null);
	                var n = this._order.indexOf(e);
	                this._order.splice(n, 1), this._layerOrderChanged = !0, this._changed = !0, this._removedLayers[e] = i, delete this._layers[e], delete this._updatedLayers[e], delete this._updatedPaintProps[e];
	            } else this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be removed.")));
	        }, i.prototype.getLayer = function(t) {
	            return this._layers[t]
	        }, i.prototype.setLayerZoomRange = function(e, i, n) {
	            this._checkLoaded();
	            var o = this.getLayer(e);
	            o ? o.minzoom === i && o.maxzoom === n || (null != i && (o.minzoom = i), null != n && (o.maxzoom = n), this._updateLayer(o)) : this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot have zoom extent.")));
	        }, i.prototype.setFilter = function(e, i) {
	            this._checkLoaded();
	            var n = this.getLayer(e);
	            if (n) {
	                if (!t.deepEqual(n.filter, i)) return null == i ? (n.filter = void 0, void this._updateLayer(n)) : void(this._validate(t.validateStyle.filter, "layers." + n.id + ".filter", i) || (n.filter = t.clone(i), this._updateLayer(n)))
	            } else this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be filtered.")));
	        }, i.prototype.getFilter = function(e) {
	            return t.clone(this.getLayer(e).filter)
	        }, i.prototype.setLayoutProperty = function(e, i, n) {
	            this._checkLoaded();
	            var o = this.getLayer(e);
	            o ? t.deepEqual(o.getLayoutProperty(i), n) || (o.setLayoutProperty(i, n), this._updateLayer(o)) : this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be styled.")));
	        }, i.prototype.getLayoutProperty = function(t, e) {
	            return this.getLayer(t).getLayoutProperty(e)
	        }, i.prototype.setPaintProperty = function(e, i, n) {
	            this._checkLoaded();
	            var o = this.getLayer(e);
	            o ? t.deepEqual(o.getPaintProperty(i), n) || (o.setPaintProperty(i, n) && this._updateLayer(o), this._changed = !0, this._updatedPaintProps[e] = !0) : this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be styled.")));
	        }, i.prototype.getPaintProperty = function(t, e) {
	            return this.getLayer(t).getPaintProperty(e)
	        }, i.prototype.setFeatureState = function(e, i) {
	            this._checkLoaded();
	            var n = e.source,
	                o = e.sourceLayer,
	                r = this.sourceCaches[n];
	            void 0 !== r ? "vector" !== r.getSource().type || o ? null != e.id && "" !== e.id ? r.setFeatureState(o, e.id, i) : this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided."))) : this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types."))) : this.fire(new t.ErrorEvent(new Error("The source '" + n + "' does not exist in the map's style.")));
	        }, i.prototype.getFeatureState = function(e) {
	            this._checkLoaded();
	            var i = e.source,
	                n = e.sourceLayer,
	                o = this.sourceCaches[i];
	            if (void 0 !== o) {
	                if ("vector" !== o.getSource().type || n) return o.getFeatureState(n, e.id);
	                this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));
	            } else this.fire(new t.ErrorEvent(new Error("The source '" + i + "' does not exist in the map's style.")));
	        }, i.prototype.getTransition = function() {
	            return t.extend({
	                duration: 300,
	                delay: 0
	            }, this.stylesheet && this.stylesheet.transition)
	        }, i.prototype.serialize = function() {
	            var e = this;
	            return t.filterObject({
	                version: this.stylesheet.version,
	                name: this.stylesheet.name,
	                metadata: this.stylesheet.metadata,
	                light: this.stylesheet.light,
	                center: this.stylesheet.center,
	                zoom: this.stylesheet.zoom,
	                bearing: this.stylesheet.bearing,
	                pitch: this.stylesheet.pitch,
	                sprite: this.stylesheet.sprite,
	                glyphs: this.stylesheet.glyphs,
	                transition: this.stylesheet.transition,
	                sources: t.mapObject(this.sourceCaches, function(t) {
	                    return t.serialize()
	                }),
	                layers: this._order.map(function(t) {
	                    return e._layers[t].serialize()
	                })
	            }, function(t) {
	                return void 0 !== t
	            })
	        }, i.prototype._updateLayer = function(t) {
	            this._updatedLayers[t.id] = !0, t.source && !this._updatedSources[t.source] && (this._updatedSources[t.source] = "reload", this.sourceCaches[t.source].pause()), this._changed = !0;
	        }, i.prototype._flattenRenderedFeatures = function(t) {
	            for (var e = [], i = this._order.length - 1; i >= 0; i--)
	                for (var n = this._order[i], o = 0, r = t; o < r.length; o += 1) {
	                    var a = r[o][n];
	                    if (a)
	                        for (var s = 0, l = a; s < l.length; s += 1) {
	                            var c = l[s];
	                            e.push(c);
	                        }
	                }
	            return e
	        }, i.prototype.queryRenderedFeatures = function(e, i, n) {
	            i && i.filter && this._validate(t.validateStyle.filter, "queryRenderedFeatures.filter", i.filter);
	            var o = {};
	            if (i && i.layers) {
	                if (!Array.isArray(i.layers)) return this.fire(new t.ErrorEvent(new Error("parameters.layers must be an Array."))), [];
	                for (var r = 0, a = i.layers; r < a.length; r += 1) {
	                    var s = a[r],
	                        l = this._layers[s];
	                    if (!l) return this.fire(new t.ErrorEvent(new Error("The layer '" + s + "' does not exist in the map's style and cannot be queried for features."))), [];
	                    o[l.source] = !0;
	                }
	            }
	            var c = [],
	                h = e.map(function(t) {
	                    return n.pointCoordinate(t)
	                });
	            for (var u in this.sourceCaches) i.layers && !o[u] || c.push(Q(this.sourceCaches[u], this._layers, h, i, n));
	            return this.placement && c.push(function(t, e, i, n, o, r) {
	                for (var a = {}, s = o.queryRenderedSymbols(i), l = [], c = 0, h = Object.keys(s).map(Number); c < h.length; c += 1) {
	                    var u = h[c];
	                    l.push(r[u]);
	                }
	                l.sort($);
	                for (var p = function() {
	                        var e = f[d],
	                            i = e.featureIndex.lookupSymbolFeatures(s[e.bucketInstanceId], e.bucketIndex, e.sourceLayerIndex, n.filter, n.layers, t);
	                        for (var o in i) {
	                            var r = a[o] = a[o] || [],
	                                l = i[o];
	                            l.sort(function(t, i) {
	                                var n = e.featureSortOrder;
	                                if (n) {
	                                    var o = n.indexOf(t.featureIndex);
	                                    return n.indexOf(i.featureIndex) - o
	                                }
	                                return i.featureIndex - t.featureIndex
	                            });
	                            for (var c = 0, h = l; c < h.length; c += 1) {
	                                var u = h[c];
	                                r.push(u.feature);
	                            }
	                        }
	                    }, d = 0, f = l; d < f.length; d += 1) p();
	                var m = function(i) {
	                    a[i].forEach(function(n) {
	                        var o = t[i],
	                            r = e[o.source].getFeatureState(n.layer["source-layer"], n.id);
	                        n.source = n.layer.source, n.layer["source-layer"] && (n.sourceLayer = n.layer["source-layer"]), n.state = r;
	                    });
	                };
	                for (var _ in a) m(_);
	                return a
	            }(this._layers, this.sourceCaches, e, i, this.placement.collisionIndex, this.placement.retainedQueryData)), this._flattenRenderedFeatures(c)
	        }, i.prototype.querySourceFeatures = function(e, i) {
	            i && i.filter && this._validate(t.validateStyle.filter, "querySourceFeatures.filter", i.filter);
	            var n = this.sourceCaches[e];
	            return n ? function(t, e) {
	                for (var i = t.getRenderableIds().map(function(e) {
	                        return t.getTileByID(e)
	                    }), n = [], o = {}, r = 0; r < i.length; r++) {
	                    var a = i[r],
	                        s = a.tileID.canonical.key;
	                    o[s] || (o[s] = !0, a.querySourceFeatures(n, e));
	                }
	                return n
	            }(n, i) : []
	        }, i.prototype.addSourceType = function(t, e, n) {
	            return i.getSourceType(t) ? n(new Error('A source type called "' + t + '" already exists.')) : (i.setSourceType(t, e), e.workerSourceURL ? void this.dispatcher.broadcast("loadWorkerSource", {
	                name: t,
	                url: e.workerSourceURL
	            }, n) : n(null, null))
	        }, i.prototype.getLight = function() {
	            return this.light.getLight()
	        }, i.prototype.setLight = function(e) {
	            this._checkLoaded();
	            var i = this.light.getLight(),
	                n = !1;
	            for (var o in e)
	                if (!t.deepEqual(e[o], i[o])) {
	                    n = !0;
	                    break
	                }
	            if (n) {
	                var r = {
	                    now: t.browser.now(),
	                    transition: t.extend({
	                        duration: 300,
	                        delay: 0
	                    }, this.stylesheet.transition)
	                };
	                this.light.setLight(e), this.light.updateTransitions(r);
	            }
	        }, i.prototype._validate = function(e, i, n, o, r) {
	            return (!r || !1 !== r.validate) && Ve(this, e.call(t.validateStyle, t.extend({
	                key: i,
	                style: this.serialize(),
	                value: n,
	                styleSpec: t.styleSpec
	            }, o)))
	        }, i.prototype._remove = function() {
	            for (var e in this._request && (this._request.cancel(), this._request = null), this._spriteRequest && (this._spriteRequest.cancel(), this._spriteRequest = null), t.evented.off("pluginAvailable", this._rtlTextPluginCallback), this.sourceCaches) this.sourceCaches[e].clearTiles();
	            this.dispatcher.remove();
	        }, i.prototype._clearSource = function(t) {
	            this.sourceCaches[t].clearTiles();
	        }, i.prototype._reloadSource = function(t) {
	            this.sourceCaches[t].resume(), this.sourceCaches[t].reload();
	        }, i.prototype._updateSources = function(t) {
	            for (var e in this.sourceCaches) this.sourceCaches[e].update(t);
	        }, i.prototype._generateCollisionBoxes = function() {
	            for (var t in this.sourceCaches) this._reloadSource(t);
	        }, i.prototype._updatePlacement = function(e, i, n, o) {
	            for (var r = !1, a = !1, s = {}, l = 0, c = this._order; l < c.length; l += 1) {
	                var h = c[l],
	                    u = this._layers[h];
	                if ("symbol" === u.type) {
	                    if (!s[u.source]) {
	                        var p = this.sourceCaches[u.source];
	                        s[u.source] = p.getRenderableIds(!0).map(function(t) {
	                            return p.getTileByID(t)
	                        }).sort(function(t, e) {
	                            return e.tileID.overscaledZ - t.tileID.overscaledZ || (t.tileID.isLessThan(e.tileID) ? -1 : 1)
	                        });
	                    }
	                    var d = this.crossTileSymbolIndex.addLayer(u, s[u.source], e.center.lng);
	                    r = r || d;
	                }
	            }
	            this.crossTileSymbolIndex.pruneUnusedLayers(this._order);
	            var f = this._layerOrderChanged;
	            if ((f || !this.pauseablePlacement || this.pauseablePlacement.isDone() && !this.placement.stillRecent(t.browser.now())) && (this.pauseablePlacement = new ke(e, this._order, f, i, n, o), this._layerOrderChanged = !1), this.pauseablePlacement.isDone() ? this.placement.setStale() : (this.pauseablePlacement.continuePlacement(this._order, this._layers, s), this.pauseablePlacement.isDone() && (this.placement = this.pauseablePlacement.commit(this.placement, t.browser.now()), a = !0), r && this.pauseablePlacement.placement.setStale()), a || r)
	                for (var m = 0, _ = this._order; m < _.length; m += 1) {
	                    var g = _[m],
	                        v = this._layers[g];
	                    "symbol" === v.type && this.placement.updateLayerOpacities(v, s[v.source]);
	                }
	            return !this.pauseablePlacement.isDone() || this.placement.hasTransitions(t.browser.now())
	        }, i.prototype._releaseSymbolFadeTiles = function() {
	            for (var t in this.sourceCaches) this.sourceCaches[t].releaseSymbolFadeTiles();
	        }, i.prototype.getImages = function(t, e, i) {
	            this.imageManager.getImages(e.icons, i);
	        }, i.prototype.getGlyphs = function(t, e, i) {
	            this.glyphManager.getGlyphs(e.stacks, i);
	        }, i
	    }(t.Evented);
	qe.getSourceType = function(t) {
	    return Y[t]
	}, qe.setSourceType = function(t, e) {
	    Y[t] = e;
	}, qe.registerForPluginAvailability = t.registerForPluginAvailability;
	var Ge = t.createLayout([{
	        name: "a_pos",
	        type: "Int16",
	        components: 2
	    }]),
	    We = {
	        prelude: {
	            fragmentSource: "#ifdef GL_ES\nprecision mediump float;\n#else\n\n#if !defined(lowp)\n#define lowp\n#endif\n\n#if !defined(mediump)\n#define mediump\n#endif\n\n#if !defined(highp)\n#define highp\n#endif\n\n#endif\n",
	            vertexSource: "#ifdef GL_ES\nprecision highp float;\n#else\n\n#if !defined(lowp)\n#define lowp\n#endif\n\n#if !defined(mediump)\n#define mediump\n#endif\n\n#if !defined(highp)\n#define highp\n#endif\n\n#endif\n\n// Unpack a pair of values that have been packed into a single float.\n// The packed values are assumed to be 8-bit unsigned integers, and are\n// packed like so:\n// packedValue = floor(input[0]) * 256 + input[1],\nvec2 unpack_float(const float packedValue) {\n    int packedIntValue = int(packedValue);\n    int v0 = packedIntValue / 256;\n    return vec2(v0, packedIntValue - v0 * 256);\n}\n\nvec2 unpack_opacity(const float packedOpacity) {\n    int intOpacity = int(packedOpacity) / 2;\n    return vec2(float(intOpacity) / 127.0, mod(packedOpacity, 2.0));\n}\n\n// To minimize the number of attributes needed, we encode a 4-component\n// color into a pair of floats (i.e. a vec2) as follows:\n// [ floor(color.r * 255) * 256 + color.g * 255,\n//   floor(color.b * 255) * 256 + color.g * 255 ]\nvec4 decode_color(const vec2 encodedColor) {\n    return vec4(\n        unpack_float(encodedColor[0]) / 255.0,\n        unpack_float(encodedColor[1]) / 255.0\n    );\n}\n\n// Unpack a pair of paint values and interpolate between them.\nfloat unpack_mix_vec2(const vec2 packedValue, const float t) {\n    return mix(packedValue[0], packedValue[1], t);\n}\n\n// Unpack a pair of paint values and interpolate between them.\nvec4 unpack_mix_vec4(const vec4 packedColors, const float t) {\n    vec4 minColor = decode_color(vec2(packedColors[0], packedColors[1]));\n    vec4 maxColor = decode_color(vec2(packedColors[2], packedColors[3]));\n    return mix(minColor, maxColor, t);\n}\n\n// The offset depends on how many pixels are between the world origin and the edge of the tile:\n// vec2 offset = mod(pixel_coord, size)\n//\n// At high zoom levels there are a ton of pixels between the world origin and the edge of the tile.\n// The glsl spec only guarantees 16 bits of precision for highp floats. We need more than that.\n//\n// The pixel_coord is passed in as two 16 bit values:\n// pixel_coord_upper = floor(pixel_coord / 2^16)\n// pixel_coord_lower = mod(pixel_coord, 2^16)\n//\n// The offset is calculated in a series of steps that should preserve this precision:\nvec2 get_pattern_pos(const vec2 pixel_coord_upper, const vec2 pixel_coord_lower,\n    const vec2 pattern_size, const float tile_units_to_pixels, const vec2 pos) {\n\n    vec2 offset = mod(mod(mod(pixel_coord_upper, pattern_size) * 256.0, pattern_size) * 256.0 + pixel_coord_lower, pattern_size);\n    return (tile_units_to_pixels * pos + offset) / pattern_size;\n}\n"
	        },
	        background: {
	            fragmentSource: "uniform vec4 u_color;\nuniform float u_opacity;\n\nvoid main() {\n    gl_FragColor = u_color * u_opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "attribute vec2 a_pos;\n\nuniform mat4 u_matrix;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n}\n"
	        },
	        backgroundPattern: {
	            fragmentSource: "uniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform vec2 u_texsize;\nuniform float u_mix;\nuniform float u_opacity;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\n\nvoid main() {\n    vec2 imagecoord = mod(v_pos_a, 1.0);\n    vec2 pos = mix(u_pattern_tl_a / u_texsize, u_pattern_br_a / u_texsize, imagecoord);\n    vec4 color1 = texture2D(u_image, pos);\n\n    vec2 imagecoord_b = mod(v_pos_b, 1.0);\n    vec2 pos2 = mix(u_pattern_tl_b / u_texsize, u_pattern_br_b / u_texsize, imagecoord_b);\n    vec4 color2 = texture2D(u_image, pos2);\n\n    gl_FragColor = mix(color1, color2, u_mix) * u_opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_pattern_size_a;\nuniform vec2 u_pattern_size_b;\nuniform vec2 u_pixel_coord_upper;\nuniform vec2 u_pixel_coord_lower;\nuniform float u_scale_a;\nuniform float u_scale_b;\nuniform float u_tile_units_to_pixels;\n\nattribute vec2 a_pos;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n\n    v_pos_a = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_a * u_pattern_size_a, u_tile_units_to_pixels, a_pos);\n    v_pos_b = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_b * u_pattern_size_b, u_tile_units_to_pixels, a_pos);\n}\n"
	        },
	        circle: {
	            fragmentSource: "#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\n\nvarying vec3 v_data;\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize mediump float radius\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize highp vec4 stroke_color\n    #pragma mapbox: initialize mediump float stroke_width\n    #pragma mapbox: initialize lowp float stroke_opacity\n\n    vec2 extrude = v_data.xy;\n    float extrude_length = length(extrude);\n\n    lowp float antialiasblur = v_data.z;\n    float antialiased_blur = -max(blur, antialiasblur);\n\n    float opacity_t = smoothstep(0.0, antialiased_blur, extrude_length - 1.0);\n\n    float color_t = stroke_width < 0.01 ? 0.0 : smoothstep(\n        antialiased_blur,\n        0.0,\n        extrude_length - radius / (radius + stroke_width)\n    );\n\n    gl_FragColor = opacity_t * mix(color * opacity, stroke_color * stroke_opacity, color_t);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform bool u_scale_with_map;\nuniform bool u_pitch_with_map;\nuniform vec2 u_extrude_scale;\nuniform highp float u_camera_to_center_distance;\n\nattribute vec2 a_pos;\n\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\n\nvarying vec3 v_data;\n\nvoid main(void) {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize mediump float radius\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize highp vec4 stroke_color\n    #pragma mapbox: initialize mediump float stroke_width\n    #pragma mapbox: initialize lowp float stroke_opacity\n\n    // unencode the extrusion vector that we snuck into the a_pos vector\n    vec2 extrude = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);\n\n    // multiply a_pos by 0.5, since we had it * 2 in order to sneak\n    // in extrusion data\n    vec2 circle_center = floor(a_pos * 0.5);\n    if (u_pitch_with_map) {\n        vec2 corner_position = circle_center;\n        if (u_scale_with_map) {\n            corner_position += extrude * (radius + stroke_width) * u_extrude_scale;\n        } else {\n            // Pitching the circle with the map effectively scales it with the map\n            // To counteract the effect for pitch-scale: viewport, we rescale the\n            // whole circle based on the pitch scaling effect at its central point\n            vec4 projected_center = u_matrix * vec4(circle_center, 0, 1);\n            corner_position += extrude * (radius + stroke_width) * u_extrude_scale * (projected_center.w / u_camera_to_center_distance);\n        }\n\n        gl_Position = u_matrix * vec4(corner_position, 0, 1);\n    } else {\n        gl_Position = u_matrix * vec4(circle_center, 0, 1);\n\n        if (u_scale_with_map) {\n            gl_Position.xy += extrude * (radius + stroke_width) * u_extrude_scale * u_camera_to_center_distance;\n        } else {\n            gl_Position.xy += extrude * (radius + stroke_width) * u_extrude_scale * gl_Position.w;\n        }\n    }\n\n    // This is a minimum blur distance that serves as a faux-antialiasing for\n    // the circle. since blur is a ratio of the circle's size and the intent is\n    // to keep the blur at roughly 1px, the two are inversely related.\n    lowp float antialiasblur = 1.0 / DEVICE_PIXEL_RATIO / (radius + stroke_width);\n\n    v_data = vec3(extrude.x, extrude.y, antialiasblur);\n}\n"
	        },
	        clippingMask: {
	            fragmentSource: "void main() {\n    gl_FragColor = vec4(1.0);\n}\n",
	            vertexSource: "attribute vec2 a_pos;\n\nuniform mat4 u_matrix;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n}\n"
	        },
	        heatmap: {
	            fragmentSource: "#pragma mapbox: define highp float weight\n\nuniform highp float u_intensity;\nvarying vec2 v_extrude;\n\n// Gaussian kernel coefficient: 1 / sqrt(2 * PI)\n#define GAUSS_COEF 0.3989422804014327\n\nvoid main() {\n    #pragma mapbox: initialize highp float weight\n\n    // Kernel density estimation with a Gaussian kernel of size 5x5\n    float d = -0.5 * 3.0 * 3.0 * dot(v_extrude, v_extrude);\n    float val = weight * u_intensity * GAUSS_COEF * exp(d);\n\n    gl_FragColor = vec4(val, 1.0, 1.0, 1.0);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "#pragma mapbox: define highp float weight\n#pragma mapbox: define mediump float radius\n\nuniform mat4 u_matrix;\nuniform float u_extrude_scale;\nuniform float u_opacity;\nuniform float u_intensity;\n\nattribute vec2 a_pos;\n\nvarying vec2 v_extrude;\n\n// Effective \"0\" in the kernel density texture to adjust the kernel size to;\n// this empirically chosen number minimizes artifacts on overlapping kernels\n// for typical heatmap cases (assuming clustered source)\nconst highp float ZERO = 1.0 / 255.0 / 16.0;\n\n// Gaussian kernel coefficient: 1 / sqrt(2 * PI)\n#define GAUSS_COEF 0.3989422804014327\n\nvoid main(void) {\n    #pragma mapbox: initialize highp float weight\n    #pragma mapbox: initialize mediump float radius\n\n    // unencode the extrusion vector that we snuck into the a_pos vector\n    vec2 unscaled_extrude = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);\n\n    // This 'extrude' comes in ranging from [-1, -1], to [1, 1].  We'll use\n    // it to produce the vertices of a square mesh framing the point feature\n    // we're adding to the kernel density texture.  We'll also pass it as\n    // a varying, so that the fragment shader can determine the distance of\n    // each fragment from the point feature.\n    // Before we do so, we need to scale it up sufficiently so that the\n    // kernel falls effectively to zero at the edge of the mesh.\n    // That is, we want to know S such that\n    // weight * u_intensity * GAUSS_COEF * exp(-0.5 * 3.0^2 * S^2) == ZERO\n    // Which solves to:\n    // S = sqrt(-2.0 * log(ZERO / (weight * u_intensity * GAUSS_COEF))) / 3.0\n    float S = sqrt(-2.0 * log(ZERO / weight / u_intensity / GAUSS_COEF)) / 3.0;\n\n    // Pass the varying in units of radius\n    v_extrude = S * unscaled_extrude;\n\n    // Scale by radius and the zoom-based scale factor to produce actual\n    // mesh position\n    vec2 extrude = v_extrude * radius * u_extrude_scale;\n\n    // multiply a_pos by 0.5, since we had it * 2 in order to sneak\n    // in extrusion data\n    vec4 pos = vec4(floor(a_pos * 0.5) + extrude, 0, 1);\n\n    gl_Position = u_matrix * pos;\n}\n"
	        },
	        heatmapTexture: {
	            fragmentSource: "uniform sampler2D u_image;\nuniform sampler2D u_color_ramp;\nuniform float u_opacity;\nvarying vec2 v_pos;\n\nvoid main() {\n    float t = texture2D(u_image, v_pos).r;\n    vec4 color = texture2D(u_color_ramp, vec2(t, 0.5));\n    gl_FragColor = color * u_opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(0.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_world;\nattribute vec2 a_pos;\nvarying vec2 v_pos;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos * u_world, 0, 1);\n\n    v_pos.x = a_pos.x;\n    v_pos.y = 1.0 - a_pos.y;\n}\n"
	        },
	        collisionBox: {
	            fragmentSource: "\nvarying float v_placed;\nvarying float v_notUsed;\n\nvoid main() {\n\n    float alpha = 0.5;\n\n    // Red = collision, hide label\n    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0) * alpha;\n\n    // Blue = no collision, label is showing\n    if (v_placed > 0.5) {\n        gl_FragColor = vec4(0.0, 0.0, 1.0, 0.5) * alpha;\n    }\n\n    if (v_notUsed > 0.5) {\n        // This box not used, fade it out\n        gl_FragColor *= .1;\n    }\n}",
	            vertexSource: "attribute vec2 a_pos;\nattribute vec2 a_anchor_pos;\nattribute vec2 a_extrude;\nattribute vec2 a_placed;\n\nuniform mat4 u_matrix;\nuniform vec2 u_extrude_scale;\nuniform float u_camera_to_center_distance;\n\nvarying float v_placed;\nvarying float v_notUsed;\n\nvoid main() {\n    vec4 projectedPoint = u_matrix * vec4(a_anchor_pos, 0, 1);\n    highp float camera_to_anchor_distance = projectedPoint.w;\n    highp float collision_perspective_ratio = clamp(\n        0.5 + 0.5 * (u_camera_to_center_distance / camera_to_anchor_distance),\n        0.0, // Prevents oversized near-field boxes in pitched/overzoomed tiles\n        4.0);\n\n    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);\n    gl_Position.xy += a_extrude * u_extrude_scale * gl_Position.w * collision_perspective_ratio;\n\n    v_placed = a_placed.x;\n    v_notUsed = a_placed.y;\n}\n"
	        },
	        collisionCircle: {
	            fragmentSource: "uniform float u_overscale_factor;\n\nvarying float v_placed;\nvarying float v_notUsed;\nvarying float v_radius;\nvarying vec2 v_extrude;\nvarying vec2 v_extrude_scale;\n\nvoid main() {\n    float alpha = 0.5;\n\n    // Red = collision, hide label\n    vec4 color = vec4(1.0, 0.0, 0.0, 1.0) * alpha;\n\n    // Blue = no collision, label is showing\n    if (v_placed > 0.5) {\n        color = vec4(0.0, 0.0, 1.0, 0.5) * alpha;\n    }\n\n    if (v_notUsed > 0.5) {\n        // This box not used, fade it out\n        color *= .2;\n    }\n\n    float extrude_scale_length = length(v_extrude_scale);\n    float extrude_length = length(v_extrude) * extrude_scale_length;\n    float stroke_width = 15.0 * extrude_scale_length / u_overscale_factor;\n    float radius = v_radius * extrude_scale_length;\n\n    float distance_to_edge = abs(extrude_length - radius);\n    float opacity_t = smoothstep(-stroke_width, 0.0, -distance_to_edge);\n\n    gl_FragColor = opacity_t * color;\n}\n",
	            vertexSource: "attribute vec2 a_pos;\nattribute vec2 a_anchor_pos;\nattribute vec2 a_extrude;\nattribute vec2 a_placed;\n\nuniform mat4 u_matrix;\nuniform vec2 u_extrude_scale;\nuniform float u_camera_to_center_distance;\n\nvarying float v_placed;\nvarying float v_notUsed;\nvarying float v_radius;\n\nvarying vec2 v_extrude;\nvarying vec2 v_extrude_scale;\n\nvoid main() {\n    vec4 projectedPoint = u_matrix * vec4(a_anchor_pos, 0, 1);\n    highp float camera_to_anchor_distance = projectedPoint.w;\n    highp float collision_perspective_ratio = clamp(\n        0.5 + 0.5 * (u_camera_to_center_distance / camera_to_anchor_distance),\n        0.0, // Prevents oversized near-field circles in pitched/overzoomed tiles\n        4.0);\n\n    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);\n\n    highp float padding_factor = 1.2; // Pad the vertices slightly to make room for anti-alias blur\n    gl_Position.xy += a_extrude * u_extrude_scale * padding_factor * gl_Position.w * collision_perspective_ratio;\n\n    v_placed = a_placed.x;\n    v_notUsed = a_placed.y;\n    v_radius = abs(a_extrude.y); // We don't pitch the circles, so both units of the extrusion vector are equal in magnitude to the radius\n\n    v_extrude = a_extrude * padding_factor;\n    v_extrude_scale = u_extrude_scale * u_camera_to_center_distance * collision_perspective_ratio;\n}\n"
	        },
	        debug: {
	            fragmentSource: "uniform highp vec4 u_color;\n\nvoid main() {\n    gl_FragColor = u_color;\n}\n",
	            vertexSource: "attribute vec2 a_pos;\n\nuniform mat4 u_matrix;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n}\n"
	        },
	        fill: {
	            fragmentSource: "#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize lowp float opacity\n\n    gl_FragColor = color * opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "attribute vec2 a_pos;\n\nuniform mat4 u_matrix;\n\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize lowp float opacity\n\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n}\n"
	        },
	        fillOutline: {
	            fragmentSource: "#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\n\nvarying vec2 v_pos;\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 outline_color\n    #pragma mapbox: initialize lowp float opacity\n\n    float dist = length(v_pos - gl_FragCoord.xy);\n    float alpha = 1.0 - smoothstep(0.0, 1.0, dist);\n    gl_FragColor = outline_color * (alpha * opacity);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "attribute vec2 a_pos;\n\nuniform mat4 u_matrix;\nuniform vec2 u_world;\n\nvarying vec2 v_pos;\n\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 outline_color\n    #pragma mapbox: initialize lowp float opacity\n\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    v_pos = (gl_Position.xy / gl_Position.w + 1.0) / 2.0 * u_world;\n}\n"
	        },
	        fillOutlinePattern: {
	            fragmentSource: "uniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform vec2 u_texsize;\nuniform float u_mix;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\nvarying vec2 v_pos;\n\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize lowp float opacity\n\n    vec2 imagecoord = mod(v_pos_a, 1.0);\n    vec2 pos = mix(u_pattern_tl_a / u_texsize, u_pattern_br_a / u_texsize, imagecoord);\n    vec4 color1 = texture2D(u_image, pos);\n\n    vec2 imagecoord_b = mod(v_pos_b, 1.0);\n    vec2 pos2 = mix(u_pattern_tl_b / u_texsize, u_pattern_br_b / u_texsize, imagecoord_b);\n    vec4 color2 = texture2D(u_image, pos2);\n\n    // find distance to outline for alpha interpolation\n\n    float dist = length(v_pos - gl_FragCoord.xy);\n    float alpha = 1.0 - smoothstep(0.0, 1.0, dist);\n\n\n    gl_FragColor = mix(color1, color2, u_mix) * alpha * opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_world;\nuniform vec2 u_pattern_size_a;\nuniform vec2 u_pattern_size_b;\nuniform vec2 u_pixel_coord_upper;\nuniform vec2 u_pixel_coord_lower;\nuniform float u_scale_a;\nuniform float u_scale_b;\nuniform float u_tile_units_to_pixels;\n\nattribute vec2 a_pos;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\nvarying vec2 v_pos;\n\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize lowp float opacity\n\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n\n    v_pos_a = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_a * u_pattern_size_a, u_tile_units_to_pixels, a_pos);\n    v_pos_b = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_b * u_pattern_size_b, u_tile_units_to_pixels, a_pos);\n\n    v_pos = (gl_Position.xy / gl_Position.w + 1.0) / 2.0 * u_world;\n}\n"
	        },
	        fillPattern: {
	            fragmentSource: "uniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform vec2 u_texsize;\nuniform float u_mix;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\n\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize lowp float opacity\n\n    vec2 imagecoord = mod(v_pos_a, 1.0);\n    vec2 pos = mix(u_pattern_tl_a / u_texsize, u_pattern_br_a / u_texsize, imagecoord);\n    vec4 color1 = texture2D(u_image, pos);\n\n    vec2 imagecoord_b = mod(v_pos_b, 1.0);\n    vec2 pos2 = mix(u_pattern_tl_b / u_texsize, u_pattern_br_b / u_texsize, imagecoord_b);\n    vec4 color2 = texture2D(u_image, pos2);\n\n    gl_FragColor = mix(color1, color2, u_mix) * opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_pattern_size_a;\nuniform vec2 u_pattern_size_b;\nuniform vec2 u_pixel_coord_upper;\nuniform vec2 u_pixel_coord_lower;\nuniform float u_scale_a;\nuniform float u_scale_b;\nuniform float u_tile_units_to_pixels;\n\nattribute vec2 a_pos;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\n\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize lowp float opacity\n\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n\n    v_pos_a = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_a * u_pattern_size_a, u_tile_units_to_pixels, a_pos);\n    v_pos_b = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_b * u_pattern_size_b, u_tile_units_to_pixels, a_pos);\n}\n"
	        },
	        fillExtrusion: {
	            fragmentSource: "varying vec4 v_color;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define highp vec4 color\n\nvoid main() {\n    #pragma mapbox: initialize lowp float base\n    #pragma mapbox: initialize lowp float height\n    #pragma mapbox: initialize highp vec4 color\n\n    gl_FragColor = v_color;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec3 u_lightcolor;\nuniform lowp vec3 u_lightpos;\nuniform lowp float u_lightintensity;\n\nattribute vec2 a_pos;\nattribute vec4 a_normal_ed;\n\nvarying vec4 v_color;\n\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n\n#pragma mapbox: define highp vec4 color\n\nvoid main() {\n    #pragma mapbox: initialize lowp float base\n    #pragma mapbox: initialize lowp float height\n    #pragma mapbox: initialize highp vec4 color\n\n    vec3 normal = a_normal_ed.xyz;\n\n    base = max(0.0, base);\n    height = max(0.0, height);\n\n    float t = mod(normal.x, 2.0);\n\n    gl_Position = u_matrix * vec4(a_pos, t > 0.0 ? height : base, 1);\n\n    // Relative luminance (how dark/bright is the surface color?)\n    float colorvalue = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;\n\n    v_color = vec4(0.0, 0.0, 0.0, 1.0);\n\n    // Add slight ambient lighting so no extrusions are totally black\n    vec4 ambientlight = vec4(0.03, 0.03, 0.03, 1.0);\n    color += ambientlight;\n\n    // Calculate cos(theta), where theta is the angle between surface normal and diffuse light ray\n    float directional = clamp(dot(normal / 16384.0, u_lightpos), 0.0, 1.0);\n\n    // Adjust directional so that\n    // the range of values for highlight/shading is narrower\n    // with lower light intensity\n    // and with lighter/brighter surface colors\n    directional = mix((1.0 - u_lightintensity), max((1.0 - colorvalue + u_lightintensity), 1.0), directional);\n\n    // Add gradient along z axis of side surfaces\n    if (normal.y != 0.0) {\n        directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);\n    }\n\n    // Assign final color based on surface + ambient light color, diffuse light directional, and light color\n    // with lower bounds adjusted to hue of light\n    // so that shading is tinted with the complementary (opposite) color to the light color\n    v_color.r += clamp(color.r * directional * u_lightcolor.r, mix(0.0, 0.3, 1.0 - u_lightcolor.r), 1.0);\n    v_color.g += clamp(color.g * directional * u_lightcolor.g, mix(0.0, 0.3, 1.0 - u_lightcolor.g), 1.0);\n    v_color.b += clamp(color.b * directional * u_lightcolor.b, mix(0.0, 0.3, 1.0 - u_lightcolor.b), 1.0);\n}\n"
	        },
	        fillExtrusionPattern: {
	            fragmentSource: "uniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform vec2 u_texsize;\nuniform float u_mix;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\nvarying vec4 v_lighting;\n\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n\nvoid main() {\n    #pragma mapbox: initialize lowp float base\n    #pragma mapbox: initialize lowp float height\n\n    vec2 imagecoord = mod(v_pos_a, 1.0);\n    vec2 pos = mix(u_pattern_tl_a / u_texsize, u_pattern_br_a / u_texsize, imagecoord);\n    vec4 color1 = texture2D(u_image, pos);\n\n    vec2 imagecoord_b = mod(v_pos_b, 1.0);\n    vec2 pos2 = mix(u_pattern_tl_b / u_texsize, u_pattern_br_b / u_texsize, imagecoord_b);\n    vec4 color2 = texture2D(u_image, pos2);\n\n    vec4 mixedColor = mix(color1, color2, u_mix);\n\n    gl_FragColor = mixedColor * v_lighting;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_pattern_size_a;\nuniform vec2 u_pattern_size_b;\nuniform vec2 u_pixel_coord_upper;\nuniform vec2 u_pixel_coord_lower;\nuniform float u_scale_a;\nuniform float u_scale_b;\nuniform float u_tile_units_to_pixels;\nuniform float u_height_factor;\n\nuniform vec3 u_lightcolor;\nuniform lowp vec3 u_lightpos;\nuniform lowp float u_lightintensity;\n\nattribute vec2 a_pos;\nattribute vec4 a_normal_ed;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\nvarying vec4 v_lighting;\nvarying float v_directional;\n\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n\nvoid main() {\n    #pragma mapbox: initialize lowp float base\n    #pragma mapbox: initialize lowp float height\n\n    vec3 normal = a_normal_ed.xyz;\n    float edgedistance = a_normal_ed.w;\n\n    base = max(0.0, base);\n    height = max(0.0, height);\n\n    float t = mod(normal.x, 2.0);\n    float z = t > 0.0 ? height : base;\n\n    gl_Position = u_matrix * vec4(a_pos, z, 1);\n\n    vec2 pos = normal.x == 1.0 && normal.y == 0.0 && normal.z == 16384.0\n        ? a_pos // extrusion top\n        : vec2(edgedistance, z * u_height_factor); // extrusion side\n\n    v_pos_a = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_a * u_pattern_size_a, u_tile_units_to_pixels, pos);\n    v_pos_b = get_pattern_pos(u_pixel_coord_upper, u_pixel_coord_lower, u_scale_b * u_pattern_size_b, u_tile_units_to_pixels, pos);\n\n    v_lighting = vec4(0.0, 0.0, 0.0, 1.0);\n    float directional = clamp(dot(normal / 16383.0, u_lightpos), 0.0, 1.0);\n    directional = mix((1.0 - u_lightintensity), max((0.5 + u_lightintensity), 1.0), directional);\n\n    if (normal.y != 0.0) {\n        directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);\n    }\n\n    v_lighting.rgb += clamp(directional * u_lightcolor, mix(vec3(0.0), vec3(0.3), 1.0 - u_lightcolor), vec3(1.0));\n}\n"
	        },
	        extrusionTexture: {
	            fragmentSource: "uniform sampler2D u_image;\nuniform float u_opacity;\nvarying vec2 v_pos;\n\nvoid main() {\n    gl_FragColor = texture2D(u_image, v_pos) * u_opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(0.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_world;\nattribute vec2 a_pos;\nvarying vec2 v_pos;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos * u_world, 0, 1);\n\n    v_pos.x = a_pos.x;\n    v_pos.y = 1.0 - a_pos.y;\n}\n"
	        },
	        hillshadePrepare: {
	            fragmentSource: "#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform sampler2D u_image;\nvarying vec2 v_pos;\nuniform vec2 u_dimension;\nuniform float u_zoom;\nuniform float u_maxzoom;\n\nfloat getElevation(vec2 coord, float bias) {\n    // Convert encoded elevation value to meters\n    vec4 data = texture2D(u_image, coord) * 255.0;\n    return (data.r + data.g * 256.0 + data.b * 256.0 * 256.0) / 4.0;\n}\n\nvoid main() {\n    vec2 epsilon = 1.0 / u_dimension;\n\n    // queried pixels:\n    // +-----------+\n    // |   |   |   |\n    // | a | b | c |\n    // |   |   |   |\n    // +-----------+\n    // |   |   |   |\n    // | d | e | f |\n    // |   |   |   |\n    // +-----------+\n    // |   |   |   |\n    // | g | h | i |\n    // |   |   |   |\n    // +-----------+\n\n    float a = getElevation(v_pos + vec2(-epsilon.x, -epsilon.y), 0.0);\n    float b = getElevation(v_pos + vec2(0, -epsilon.y), 0.0);\n    float c = getElevation(v_pos + vec2(epsilon.x, -epsilon.y), 0.0);\n    float d = getElevation(v_pos + vec2(-epsilon.x, 0), 0.0);\n    float e = getElevation(v_pos, 0.0);\n    float f = getElevation(v_pos + vec2(epsilon.x, 0), 0.0);\n    float g = getElevation(v_pos + vec2(-epsilon.x, epsilon.y), 0.0);\n    float h = getElevation(v_pos + vec2(0, epsilon.y), 0.0);\n    float i = getElevation(v_pos + vec2(epsilon.x, epsilon.y), 0.0);\n\n    // here we divide the x and y slopes by 8 * pixel size\n    // where pixel size (aka meters/pixel) is:\n    // circumference of the world / (pixels per tile * number of tiles)\n    // which is equivalent to: 8 * 40075016.6855785 / (512 * pow(2, u_zoom))\n    // which can be reduced to: pow(2, 19.25619978527 - u_zoom)\n    // we want to vertically exaggerate the hillshading though, because otherwise\n    // it is barely noticeable at low zooms. to do this, we multiply this by some\n    // scale factor pow(2, (u_zoom - u_maxzoom) * a) where a is an arbitrary value\n    // Here we use a=0.3 which works out to the expression below. see \n    // nickidlugash's awesome breakdown for more info\n    // https://github.com/mapbox/mapbox-gl-js/pull/5286#discussion_r148419556\n    float exaggeration = u_zoom < 2.0 ? 0.4 : u_zoom < 4.5 ? 0.35 : 0.3;\n\n    vec2 deriv = vec2(\n        (c + f + f + i) - (a + d + d + g),\n        (g + h + h + i) - (a + b + b + c)\n    ) /  pow(2.0, (u_zoom - u_maxzoom) * exaggeration + 19.2562 - u_zoom);\n\n    gl_FragColor = clamp(vec4(\n        deriv.x / 2.0 + 0.5,\n        deriv.y / 2.0 + 0.5,\n        1.0,\n        1.0), 0.0, 1.0);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\n\nattribute vec2 a_pos;\nattribute vec2 a_texture_pos;\n\nvarying vec2 v_pos;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    v_pos = (a_texture_pos / 8192.0) / 2.0 + 0.25;\n}\n"
	        },
	        hillshade: {
	            fragmentSource: "uniform sampler2D u_image;\nvarying vec2 v_pos;\n\nuniform vec2 u_latrange;\nuniform vec2 u_light;\nuniform vec4 u_shadow;\nuniform vec4 u_highlight;\nuniform vec4 u_accent;\n\n#define PI 3.141592653589793\n\nvoid main() {\n    vec4 pixel = texture2D(u_image, v_pos);\n\n    vec2 deriv = ((pixel.rg * 2.0) - 1.0);\n\n    // We divide the slope by a scale factor based on the cosin of the pixel's approximate latitude\n    // to account for mercator projection distortion. see #4807 for details\n    float scaleFactor = cos(radians((u_latrange[0] - u_latrange[1]) * (1.0 - v_pos.y) + u_latrange[1]));\n    // We also multiply the slope by an arbitrary z-factor of 1.25\n    float slope = atan(1.25 * length(deriv) / scaleFactor);\n    float aspect = deriv.x != 0.0 ? atan(deriv.y, -deriv.x) : PI / 2.0 * (deriv.y > 0.0 ? 1.0 : -1.0);\n\n    float intensity = u_light.x;\n    // We add PI to make this property match the global light object, which adds PI/2 to the light's azimuthal\n    // position property to account for 0deg corresponding to north/the top of the viewport in the style spec\n    // and the original shader was written to accept (-illuminationDirection - 90) as the azimuthal.\n    float azimuth = u_light.y + PI;\n\n    // We scale the slope exponentially based on intensity, using a calculation similar to\n    // the exponential interpolation function in the style spec:\n    // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/expression/definitions/interpolate.js#L217-L228\n    // so that higher intensity values create more opaque hillshading.\n    float base = 1.875 - intensity * 1.75;\n    float maxValue = 0.5 * PI;\n    float scaledSlope = intensity != 0.5 ? ((pow(base, slope) - 1.0) / (pow(base, maxValue) - 1.0)) * maxValue : slope;\n\n    // The accent color is calculated with the cosine of the slope while the shade color is calculated with the sine\n    // so that the accent color's rate of change eases in while the shade color's eases out.\n    float accent = cos(scaledSlope);\n    // We multiply both the accent and shade color by a clamped intensity value\n    // so that intensities >= 0.5 do not additionally affect the color values\n    // while intensity values < 0.5 make the overall color more transparent.\n    vec4 accent_color = (1.0 - accent) * u_accent * clamp(intensity * 2.0, 0.0, 1.0);\n    float shade = abs(mod((aspect + azimuth) / PI + 0.5, 2.0) - 1.0);\n    vec4 shade_color = mix(u_shadow, u_highlight, shade) * sin(scaledSlope) * clamp(intensity * 2.0, 0.0, 1.0);\n    gl_FragColor = accent_color * (1.0 - shade_color.a) + shade_color;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\n\nattribute vec2 a_pos;\nattribute vec2 a_texture_pos;\n\nvarying vec2 v_pos;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    v_pos = a_texture_pos / 8192.0;\n}\n"
	        },
	        line: {
	            fragmentSource: "#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n\nvarying vec2 v_width2;\nvarying vec2 v_normal;\nvarying float v_gamma_scale;\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * v_width2.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_width2.t) or when fading out\n    // (v_width2.s)\n    float blur2 = (blur + 1.0 / DEVICE_PIXEL_RATIO) * v_gamma_scale;\n    float alpha = clamp(min(dist - (v_width2.t - blur2), v_width2.s - dist) / blur2, 0.0, 1.0);\n\n    gl_FragColor = color * (alpha * opacity);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "\n\n// the distance over which the line edge fades out.\n// Retina devices need a smaller distance to avoid aliasing.\n#define ANTIALIASING 1.0 / DEVICE_PIXEL_RATIO / 2.0\n\n// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\nattribute vec4 a_pos_normal;\nattribute vec4 a_data;\n\nuniform mat4 u_matrix;\nuniform mediump float u_ratio;\nuniform vec2 u_gl_units_to_pixels;\n\nvarying vec2 v_normal;\nvarying vec2 v_width2;\nvarying float v_gamma_scale;\nvarying highp float v_linesofar;\n\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize mediump float gapwidth\n    #pragma mapbox: initialize lowp float offset\n    #pragma mapbox: initialize mediump float width\n\n    vec2 a_extrude = a_data.xy - 128.0;\n    float a_direction = mod(a_data.z, 4.0) - 1.0;\n\n    v_linesofar = (floor(a_data.z / 4.0) + a_data.w * 64.0) * 2.0;\n\n    vec2 pos = a_pos_normal.xy;\n\n    // x is 1 if it's a round cap, 0 otherwise\n    // y is 1 if the normal points up, and -1 if it points down\n    mediump vec2 normal = a_pos_normal.zw;\n    v_normal = normal;\n\n    // these transformations used to be applied in the JS and native code bases.\n    // moved them into the shader for clarity and simplicity.\n    gapwidth = gapwidth / 2.0;\n    float halfwidth = width / 2.0;\n    offset = -1.0 * offset;\n\n    float inset = gapwidth + (gapwidth > 0.0 ? ANTIALIASING : 0.0);\n    float outset = gapwidth + halfwidth * (gapwidth > 0.0 ? 2.0 : 1.0) + (halfwidth == 0.0 ? 0.0 : ANTIALIASING);\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    mediump vec2 dist = outset * a_extrude * scale;\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    mediump float u = 0.5 * a_direction;\n    mediump float t = 1.0 - abs(u);\n    mediump vec2 offset2 = offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    vec4 projected_extrude = u_matrix * vec4(dist / u_ratio, 0.0, 0.0);\n    gl_Position = u_matrix * vec4(pos + offset2 / u_ratio, 0.0, 1.0) + projected_extrude;\n\n    // calculate how much the perspective view squishes or stretches the extrude\n    float extrude_length_without_perspective = length(dist);\n    float extrude_length_with_perspective = length(projected_extrude.xy / gl_Position.w * u_gl_units_to_pixels);\n    v_gamma_scale = extrude_length_without_perspective / extrude_length_with_perspective;\n\n    v_width2 = vec2(outset, inset);\n}\n"
	        },
	        lineGradient: {
	            fragmentSource: "\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n\nuniform sampler2D u_image;\n\nvarying vec2 v_width2;\nvarying vec2 v_normal;\nvarying float v_gamma_scale;\nvarying highp float v_lineprogress;\n\nvoid main() {\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * v_width2.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_width2.t) or when fading out\n    // (v_width2.s)\n    float blur2 = (blur + 1.0 / DEVICE_PIXEL_RATIO) * v_gamma_scale;\n    float alpha = clamp(min(dist - (v_width2.t - blur2), v_width2.s - dist) / blur2, 0.0, 1.0);\n\n    // For gradient lines, v_lineprogress is the ratio along the entire line,\n    // scaled to [0, 2^15), and the gradient ramp is stored in a texture.\n    vec4 color = texture2D(u_image, vec2(v_lineprogress, 0.5));\n\n    gl_FragColor = color * (alpha * opacity);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "\n// the attribute conveying progress along a line is scaled to [0, 2^15)\n#define MAX_LINE_DISTANCE 32767.0\n\n// the distance over which the line edge fades out.\n// Retina devices need a smaller distance to avoid aliasing.\n#define ANTIALIASING 1.0 / DEVICE_PIXEL_RATIO / 2.0\n\n// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\nattribute vec4 a_pos_normal;\nattribute vec4 a_data;\n\nuniform mat4 u_matrix;\nuniform mediump float u_ratio;\nuniform vec2 u_gl_units_to_pixels;\n\nvarying vec2 v_normal;\nvarying vec2 v_width2;\nvarying float v_gamma_scale;\nvarying highp float v_lineprogress;\n\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n\nvoid main() {\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize mediump float gapwidth\n    #pragma mapbox: initialize lowp float offset\n    #pragma mapbox: initialize mediump float width\n\n    vec2 a_extrude = a_data.xy - 128.0;\n    float a_direction = mod(a_data.z, 4.0) - 1.0;\n\n    v_lineprogress = (floor(a_data.z / 4.0) + a_data.w * 64.0) * 2.0 / MAX_LINE_DISTANCE;\n\n    vec2 pos = a_pos_normal.xy;\n\n    // x is 1 if it's a round cap, 0 otherwise\n    // y is 1 if the normal points up, and -1 if it points down\n    mediump vec2 normal = a_pos_normal.zw;\n    v_normal = normal;\n\n    // these transformations used to be applied in the JS and native code bases.\n    // moved them into the shader for clarity and simplicity.\n    gapwidth = gapwidth / 2.0;\n    float halfwidth = width / 2.0;\n    offset = -1.0 * offset;\n\n    float inset = gapwidth + (gapwidth > 0.0 ? ANTIALIASING : 0.0);\n    float outset = gapwidth + halfwidth * (gapwidth > 0.0 ? 2.0 : 1.0) + (halfwidth == 0.0 ? 0.0 : ANTIALIASING);\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    mediump vec2 dist = outset * a_extrude * scale;\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    mediump float u = 0.5 * a_direction;\n    mediump float t = 1.0 - abs(u);\n    mediump vec2 offset2 = offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    vec4 projected_extrude = u_matrix * vec4(dist / u_ratio, 0.0, 0.0);\n    gl_Position = u_matrix * vec4(pos + offset2 / u_ratio, 0.0, 1.0) + projected_extrude;\n\n    // calculate how much the perspective view squishes or stretches the extrude\n    float extrude_length_without_perspective = length(dist);\n    float extrude_length_with_perspective = length(projected_extrude.xy / gl_Position.w * u_gl_units_to_pixels);\n    v_gamma_scale = extrude_length_without_perspective / extrude_length_with_perspective;\n\n    v_width2 = vec2(outset, inset);\n}\n"
	        },
	        linePattern: {
	            fragmentSource: "uniform vec2 u_pattern_size_a;\nuniform vec2 u_pattern_size_b;\nuniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform vec2 u_texsize;\nuniform float u_fade;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_normal;\nvarying vec2 v_width2;\nvarying float v_linesofar;\nvarying float v_gamma_scale;\n\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n\nvoid main() {\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * v_width2.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_width2.t) or when fading out\n    // (v_width2.s)\n    float blur2 = (blur + 1.0 / DEVICE_PIXEL_RATIO) * v_gamma_scale;\n    float alpha = clamp(min(dist - (v_width2.t - blur2), v_width2.s - dist) / blur2, 0.0, 1.0);\n\n    float x_a = mod(v_linesofar / u_pattern_size_a.x, 1.0);\n    float x_b = mod(v_linesofar / u_pattern_size_b.x, 1.0);\n\n    // v_normal.y is 0 at the midpoint of the line, -1 at the lower edge, 1 at the upper edge\n    // we clamp the line width outset to be between 0 and half the pattern height plus padding (2.0)\n    // to ensure we don't sample outside the designated symbol on the sprite sheet.\n    // 0.5 is added to shift the component to be bounded between 0 and 1 for interpolation of\n    // the texture coordinate\n    float y_a = 0.5 + (v_normal.y * clamp(v_width2.s, 0.0, (u_pattern_size_a.y + 2.0) / 2.0) / u_pattern_size_a.y);\n    float y_b = 0.5 + (v_normal.y * clamp(v_width2.s, 0.0, (u_pattern_size_b.y + 2.0) / 2.0) / u_pattern_size_b.y);\n    vec2 pos_a = mix(u_pattern_tl_a / u_texsize, u_pattern_br_a / u_texsize, vec2(x_a, y_a));\n    vec2 pos_b = mix(u_pattern_tl_b / u_texsize, u_pattern_br_b / u_texsize, vec2(x_b, y_b));\n\n    vec4 color = mix(texture2D(u_image, pos_a), texture2D(u_image, pos_b), u_fade);\n\n    gl_FragColor = color * alpha * opacity;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\n// We scale the distance before adding it to the buffers so that we can store\n// long distances for long segments. Use this value to unscale the distance.\n#define LINE_DISTANCE_SCALE 2.0\n\n// the distance over which the line edge fades out.\n// Retina devices need a smaller distance to avoid aliasing.\n#define ANTIALIASING 1.0 / DEVICE_PIXEL_RATIO / 2.0\n\nattribute vec4 a_pos_normal;\nattribute vec4 a_data;\n\nuniform mat4 u_matrix;\nuniform mediump float u_ratio;\nuniform vec2 u_gl_units_to_pixels;\n\nvarying vec2 v_normal;\nvarying vec2 v_width2;\nvarying float v_linesofar;\nvarying float v_gamma_scale;\n\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define mediump float width\n\nvoid main() {\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize lowp float offset\n    #pragma mapbox: initialize mediump float gapwidth\n    #pragma mapbox: initialize mediump float width\n\n    vec2 a_extrude = a_data.xy - 128.0;\n    float a_direction = mod(a_data.z, 4.0) - 1.0;\n    float a_linesofar = (floor(a_data.z / 4.0) + a_data.w * 64.0) * LINE_DISTANCE_SCALE;\n\n    vec2 pos = a_pos_normal.xy;\n\n    // x is 1 if it's a round cap, 0 otherwise\n    // y is 1 if the normal points up, and -1 if it points down\n    mediump vec2 normal = a_pos_normal.zw;\n    v_normal = normal;\n\n    // these transformations used to be applied in the JS and native code bases.\n    // moved them into the shader for clarity and simplicity.\n    gapwidth = gapwidth / 2.0;\n    float halfwidth = width / 2.0;\n    offset = -1.0 * offset;\n\n    float inset = gapwidth + (gapwidth > 0.0 ? ANTIALIASING : 0.0);\n    float outset = gapwidth + halfwidth * (gapwidth > 0.0 ? 2.0 : 1.0) + (halfwidth == 0.0 ? 0.0 : ANTIALIASING);\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    mediump vec2 dist = outset * a_extrude * scale;\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    mediump float u = 0.5 * a_direction;\n    mediump float t = 1.0 - abs(u);\n    mediump vec2 offset2 = offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    vec4 projected_extrude = u_matrix * vec4(dist / u_ratio, 0.0, 0.0);\n    gl_Position = u_matrix * vec4(pos + offset2 / u_ratio, 0.0, 1.0) + projected_extrude;\n\n    // calculate how much the perspective view squishes or stretches the extrude\n    float extrude_length_without_perspective = length(dist);\n    float extrude_length_with_perspective = length(projected_extrude.xy / gl_Position.w * u_gl_units_to_pixels);\n    v_gamma_scale = extrude_length_without_perspective / extrude_length_with_perspective;\n\n    v_linesofar = a_linesofar;\n    v_width2 = vec2(outset, inset);\n}\n"
	        },
	        lineSDF: {
	            fragmentSource: "\nuniform sampler2D u_image;\nuniform float u_sdfgamma;\nuniform float u_mix;\n\nvarying vec2 v_normal;\nvarying vec2 v_width2;\nvarying vec2 v_tex_a;\nvarying vec2 v_tex_b;\nvarying float v_gamma_scale;\n\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize mediump float width\n    #pragma mapbox: initialize lowp float floorwidth\n\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * v_width2.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_width2.t) or when fading out\n    // (v_width2.s)\n    float blur2 = (blur + 1.0 / DEVICE_PIXEL_RATIO) * v_gamma_scale;\n    float alpha = clamp(min(dist - (v_width2.t - blur2), v_width2.s - dist) / blur2, 0.0, 1.0);\n\n    float sdfdist_a = texture2D(u_image, v_tex_a).a;\n    float sdfdist_b = texture2D(u_image, v_tex_b).a;\n    float sdfdist = mix(sdfdist_a, sdfdist_b, u_mix);\n    alpha *= smoothstep(0.5 - u_sdfgamma / floorwidth, 0.5 + u_sdfgamma / floorwidth, sdfdist);\n\n    gl_FragColor = color * (alpha * opacity);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\n// We scale the distance before adding it to the buffers so that we can store\n// long distances for long segments. Use this value to unscale the distance.\n#define LINE_DISTANCE_SCALE 2.0\n\n// the distance over which the line edge fades out.\n// Retina devices need a smaller distance to avoid aliasing.\n#define ANTIALIASING 1.0 / DEVICE_PIXEL_RATIO / 2.0\n\nattribute vec4 a_pos_normal;\nattribute vec4 a_data;\n\nuniform mat4 u_matrix;\nuniform mediump float u_ratio;\nuniform vec2 u_patternscale_a;\nuniform float u_tex_y_a;\nuniform vec2 u_patternscale_b;\nuniform float u_tex_y_b;\nuniform vec2 u_gl_units_to_pixels;\n\nvarying vec2 v_normal;\nvarying vec2 v_width2;\nvarying vec2 v_tex_a;\nvarying vec2 v_tex_b;\nvarying float v_gamma_scale;\n\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 color\n    #pragma mapbox: initialize lowp float blur\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize mediump float gapwidth\n    #pragma mapbox: initialize lowp float offset\n    #pragma mapbox: initialize mediump float width\n    #pragma mapbox: initialize lowp float floorwidth\n\n    vec2 a_extrude = a_data.xy - 128.0;\n    float a_direction = mod(a_data.z, 4.0) - 1.0;\n    float a_linesofar = (floor(a_data.z / 4.0) + a_data.w * 64.0) * LINE_DISTANCE_SCALE;\n\n    vec2 pos = a_pos_normal.xy;\n\n    // x is 1 if it's a round cap, 0 otherwise\n    // y is 1 if the normal points up, and -1 if it points down\n    mediump vec2 normal = a_pos_normal.zw;\n    v_normal = normal;\n\n    // these transformations used to be applied in the JS and native code bases.\n    // moved them into the shader for clarity and simplicity.\n    gapwidth = gapwidth / 2.0;\n    float halfwidth = width / 2.0;\n    offset = -1.0 * offset;\n\n    float inset = gapwidth + (gapwidth > 0.0 ? ANTIALIASING : 0.0);\n    float outset = gapwidth + halfwidth * (gapwidth > 0.0 ? 2.0 : 1.0) + (halfwidth == 0.0 ? 0.0 : ANTIALIASING);\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    mediump vec2 dist =outset * a_extrude * scale;\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    mediump float u = 0.5 * a_direction;\n    mediump float t = 1.0 - abs(u);\n    mediump vec2 offset2 = offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    vec4 projected_extrude = u_matrix * vec4(dist / u_ratio, 0.0, 0.0);\n    gl_Position = u_matrix * vec4(pos + offset2 / u_ratio, 0.0, 1.0) + projected_extrude;\n\n    // calculate how much the perspective view squishes or stretches the extrude\n    float extrude_length_without_perspective = length(dist);\n    float extrude_length_with_perspective = length(projected_extrude.xy / gl_Position.w * u_gl_units_to_pixels);\n    v_gamma_scale = extrude_length_without_perspective / extrude_length_with_perspective;\n\n    v_tex_a = vec2(a_linesofar * u_patternscale_a.x / floorwidth, normal.y * u_patternscale_a.y + u_tex_y_a);\n    v_tex_b = vec2(a_linesofar * u_patternscale_b.x / floorwidth, normal.y * u_patternscale_b.y + u_tex_y_b);\n\n    v_width2 = vec2(outset, inset);\n}\n"
	        },
	        raster: {
	            fragmentSource: "uniform float u_fade_t;\nuniform float u_opacity;\nuniform sampler2D u_image0;\nuniform sampler2D u_image1;\nvarying vec2 v_pos0;\nvarying vec2 v_pos1;\n\nuniform float u_brightness_low;\nuniform float u_brightness_high;\n\nuniform float u_saturation_factor;\nuniform float u_contrast_factor;\nuniform vec3 u_spin_weights;\n\nvoid main() {\n\n    // read and cross-fade colors from the main and parent tiles\n    vec4 color0 = texture2D(u_image0, v_pos0);\n    vec4 color1 = texture2D(u_image1, v_pos1);\n    if (color0.a > 0.0) {\n        color0.rgb = color0.rgb / color0.a;\n    }\n    if (color1.a > 0.0) {\n        color1.rgb = color1.rgb / color1.a;\n    }\n    vec4 color = mix(color0, color1, u_fade_t);\n    color.a *= u_opacity;\n    vec3 rgb = color.rgb;\n\n    // spin\n    rgb = vec3(\n        dot(rgb, u_spin_weights.xyz),\n        dot(rgb, u_spin_weights.zxy),\n        dot(rgb, u_spin_weights.yzx));\n\n    // saturation\n    float average = (color.r + color.g + color.b) / 3.0;\n    rgb += (average - rgb) * u_saturation_factor;\n\n    // contrast\n    rgb = (rgb - 0.5) * u_contrast_factor + 0.5;\n\n    // brightness\n    vec3 u_high_vec = vec3(u_brightness_low, u_brightness_low, u_brightness_low);\n    vec3 u_low_vec = vec3(u_brightness_high, u_brightness_high, u_brightness_high);\n\n    gl_FragColor = vec4(mix(u_high_vec, u_low_vec, rgb) * color.a, color.a);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "uniform mat4 u_matrix;\nuniform vec2 u_tl_parent;\nuniform float u_scale_parent;\nuniform float u_buffer_scale;\n\nattribute vec2 a_pos;\nattribute vec2 a_texture_pos;\n\nvarying vec2 v_pos0;\nvarying vec2 v_pos1;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    // We are using Int16 for texture position coordinates to give us enough precision for\n    // fractional coordinates. We use 8192 to scale the texture coordinates in the buffer\n    // as an arbitrarily high number to preserve adequate precision when rendering.\n    // This is also the same value as the EXTENT we are using for our tile buffer pos coordinates,\n    // so math for modifying either is consistent.\n    v_pos0 = (((a_texture_pos / 8192.0) - 0.5) / u_buffer_scale ) + 0.5;\n    v_pos1 = (v_pos0 * u_scale_parent) + u_tl_parent;\n}\n"
	        },
	        symbolIcon: {
	            fragmentSource: "uniform sampler2D u_texture;\n\n#pragma mapbox: define lowp float opacity\n\nvarying vec2 v_tex;\nvarying float v_fade_opacity;\n\nvoid main() {\n    #pragma mapbox: initialize lowp float opacity\n\n    lowp float alpha = opacity * v_fade_opacity;\n    gl_FragColor = texture2D(u_texture, v_tex) * alpha;\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "const float PI = 3.141592653589793;\n\nattribute vec4 a_pos_offset;\nattribute vec4 a_data;\nattribute vec3 a_projected_pos;\nattribute float a_fade_opacity;\n\nuniform bool u_is_size_zoom_constant;\nuniform bool u_is_size_feature_constant;\nuniform highp float u_size_t; // used to interpolate between zoom stops when size is a composite function\nuniform highp float u_size; // used when size is both zoom and feature constant\nuniform highp float u_camera_to_center_distance;\nuniform highp float u_pitch;\nuniform bool u_rotate_symbol;\nuniform highp float u_aspect_ratio;\nuniform float u_fade_change;\n\n#pragma mapbox: define lowp float opacity\n\nuniform mat4 u_matrix;\nuniform mat4 u_label_plane_matrix;\nuniform mat4 u_gl_coord_matrix;\n\nuniform bool u_is_text;\nuniform bool u_pitch_with_map;\n\nuniform vec2 u_texsize;\n\nvarying vec2 v_tex;\nvarying float v_fade_opacity;\n\nvoid main() {\n    #pragma mapbox: initialize lowp float opacity\n\n    vec2 a_pos = a_pos_offset.xy;\n    vec2 a_offset = a_pos_offset.zw;\n\n    vec2 a_tex = a_data.xy;\n    vec2 a_size = a_data.zw;\n\n    highp float segment_angle = -a_projected_pos[2];\n\n    float size;\n    if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {\n        size = mix(a_size[0], a_size[1], u_size_t) / 10.0;\n    } else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {\n        size = a_size[0] / 10.0;\n    } else if (!u_is_size_zoom_constant && u_is_size_feature_constant) {\n        size = u_size;\n    } else {\n        size = u_size;\n    }\n\n    vec4 projectedPoint = u_matrix * vec4(a_pos, 0, 1);\n    highp float camera_to_anchor_distance = projectedPoint.w;\n    // See comments in symbol_sdf.vertex\n    highp float distance_ratio = u_pitch_with_map ?\n        camera_to_anchor_distance / u_camera_to_center_distance :\n        u_camera_to_center_distance / camera_to_anchor_distance;\n    highp float perspective_ratio = clamp(\n            0.5 + 0.5 * distance_ratio,\n            0.0, // Prevents oversized near-field symbols in pitched/overzoomed tiles\n            4.0);\n\n    size *= perspective_ratio;\n\n    float fontScale = u_is_text ? size / 24.0 : size;\n\n    highp float symbol_rotation = 0.0;\n    if (u_rotate_symbol) {\n        // See comments in symbol_sdf.vertex\n        vec4 offsetProjectedPoint = u_matrix * vec4(a_pos + vec2(1, 0), 0, 1);\n\n        vec2 a = projectedPoint.xy / projectedPoint.w;\n        vec2 b = offsetProjectedPoint.xy / offsetProjectedPoint.w;\n\n        symbol_rotation = atan((b.y - a.y) / u_aspect_ratio, b.x - a.x);\n    }\n\n    highp float angle_sin = sin(segment_angle + symbol_rotation);\n    highp float angle_cos = cos(segment_angle + symbol_rotation);\n    mat2 rotation_matrix = mat2(angle_cos, -1.0 * angle_sin, angle_sin, angle_cos);\n\n    vec4 projected_pos = u_label_plane_matrix * vec4(a_projected_pos.xy, 0.0, 1.0);\n    gl_Position = u_gl_coord_matrix * vec4(projected_pos.xy / projected_pos.w + rotation_matrix * (a_offset / 32.0 * fontScale), 0.0, 1.0);\n\n    v_tex = a_tex / u_texsize;\n    vec2 fade_opacity = unpack_opacity(a_fade_opacity);\n    float fade_change = fade_opacity[1] > 0.5 ? u_fade_change : -u_fade_change;\n    v_fade_opacity = max(0.0, min(1.0, fade_opacity[0] + fade_change));\n}\n"
	        },
	        symbolSDF: {
	            fragmentSource: "#define SDF_PX 8.0\n#define EDGE_GAMMA 0.105/DEVICE_PIXEL_RATIO\n\nuniform bool u_is_halo;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\n\nuniform sampler2D u_texture;\nuniform highp float u_gamma_scale;\nuniform bool u_is_text;\n\nvarying vec2 v_data0;\nvarying vec3 v_data1;\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 fill_color\n    #pragma mapbox: initialize highp vec4 halo_color\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize lowp float halo_width\n    #pragma mapbox: initialize lowp float halo_blur\n\n    vec2 tex = v_data0.xy;\n    float gamma_scale = v_data1.x;\n    float size = v_data1.y;\n    float fade_opacity = v_data1[2];\n\n    float fontScale = u_is_text ? size / 24.0 : size;\n\n    lowp vec4 color = fill_color;\n    highp float gamma = EDGE_GAMMA / (fontScale * u_gamma_scale);\n    lowp float buff = (256.0 - 64.0) / 256.0;\n    if (u_is_halo) {\n        color = halo_color;\n        gamma = (halo_blur * 1.19 / SDF_PX + EDGE_GAMMA) / (fontScale * u_gamma_scale);\n        buff = (6.0 - halo_width / fontScale) / SDF_PX;\n    }\n\n    lowp float dist = texture2D(u_texture, tex).a;\n    highp float gamma_scaled = gamma * gamma_scale;\n    highp float alpha = smoothstep(buff - gamma_scaled, buff + gamma_scaled, dist);\n\n    gl_FragColor = color * (alpha * opacity * fade_opacity);\n\n#ifdef OVERDRAW_INSPECTOR\n    gl_FragColor = vec4(1.0);\n#endif\n}\n",
	            vertexSource: "const float PI = 3.141592653589793;\n\nattribute vec4 a_pos_offset;\nattribute vec4 a_data;\nattribute vec3 a_projected_pos;\nattribute float a_fade_opacity;\n\n// contents of a_size vary based on the type of property value\n// used for {text,icon}-size.\n// For constants, a_size is disabled.\n// For source functions, we bind only one value per vertex: the value of {text,icon}-size evaluated for the current feature.\n// For composite functions:\n// [ text-size(lowerZoomStop, feature),\n//   text-size(upperZoomStop, feature) ]\nuniform bool u_is_size_zoom_constant;\nuniform bool u_is_size_feature_constant;\nuniform highp float u_size_t; // used to interpolate between zoom stops when size is a composite function\nuniform highp float u_size; // used when size is both zoom and feature constant\n\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\n\nuniform mat4 u_matrix;\nuniform mat4 u_label_plane_matrix;\nuniform mat4 u_gl_coord_matrix;\n\nuniform bool u_is_text;\nuniform bool u_pitch_with_map;\nuniform highp float u_pitch;\nuniform bool u_rotate_symbol;\nuniform highp float u_aspect_ratio;\nuniform highp float u_camera_to_center_distance;\nuniform float u_fade_change;\n\nuniform vec2 u_texsize;\n\nvarying vec2 v_data0;\nvarying vec3 v_data1;\n\nvoid main() {\n    #pragma mapbox: initialize highp vec4 fill_color\n    #pragma mapbox: initialize highp vec4 halo_color\n    #pragma mapbox: initialize lowp float opacity\n    #pragma mapbox: initialize lowp float halo_width\n    #pragma mapbox: initialize lowp float halo_blur\n\n    vec2 a_pos = a_pos_offset.xy;\n    vec2 a_offset = a_pos_offset.zw;\n\n    vec2 a_tex = a_data.xy;\n    vec2 a_size = a_data.zw;\n\n    highp float segment_angle = -a_projected_pos[2];\n    float size;\n\n    if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {\n        size = mix(a_size[0], a_size[1], u_size_t) / 10.0;\n    } else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {\n        size = a_size[0] / 10.0;\n    } else if (!u_is_size_zoom_constant && u_is_size_feature_constant) {\n        size = u_size;\n    } else {\n        size = u_size;\n    }\n\n    vec4 projectedPoint = u_matrix * vec4(a_pos, 0, 1);\n    highp float camera_to_anchor_distance = projectedPoint.w;\n    // If the label is pitched with the map, layout is done in pitched space,\n    // which makes labels in the distance smaller relative to viewport space.\n    // We counteract part of that effect by multiplying by the perspective ratio.\n    // If the label isn't pitched with the map, we do layout in viewport space,\n    // which makes labels in the distance larger relative to the features around\n    // them. We counteract part of that effect by dividing by the perspective ratio.\n    highp float distance_ratio = u_pitch_with_map ?\n        camera_to_anchor_distance / u_camera_to_center_distance :\n        u_camera_to_center_distance / camera_to_anchor_distance;\n    highp float perspective_ratio = clamp(\n        0.5 + 0.5 * distance_ratio,\n        0.0, // Prevents oversized near-field symbols in pitched/overzoomed tiles\n        4.0);\n\n    size *= perspective_ratio;\n\n    float fontScale = u_is_text ? size / 24.0 : size;\n\n    highp float symbol_rotation = 0.0;\n    if (u_rotate_symbol) {\n        // Point labels with 'rotation-alignment: map' are horizontal with respect to tile units\n        // To figure out that angle in projected space, we draw a short horizontal line in tile\n        // space, project it, and measure its angle in projected space.\n        vec4 offsetProjectedPoint = u_matrix * vec4(a_pos + vec2(1, 0), 0, 1);\n\n        vec2 a = projectedPoint.xy / projectedPoint.w;\n        vec2 b = offsetProjectedPoint.xy / offsetProjectedPoint.w;\n\n        symbol_rotation = atan((b.y - a.y) / u_aspect_ratio, b.x - a.x);\n    }\n\n    highp float angle_sin = sin(segment_angle + symbol_rotation);\n    highp float angle_cos = cos(segment_angle + symbol_rotation);\n    mat2 rotation_matrix = mat2(angle_cos, -1.0 * angle_sin, angle_sin, angle_cos);\n\n    vec4 projected_pos = u_label_plane_matrix * vec4(a_projected_pos.xy, 0.0, 1.0);\n    gl_Position = u_gl_coord_matrix * vec4(projected_pos.xy / projected_pos.w + rotation_matrix * (a_offset / 32.0 * fontScale), 0.0, 1.0);\n    float gamma_scale = gl_Position.w;\n\n    vec2 tex = a_tex / u_texsize;\n    vec2 fade_opacity = unpack_opacity(a_fade_opacity);\n    float fade_change = fade_opacity[1] > 0.5 ? u_fade_change : -u_fade_change;\n    float interpolated_fade_opacity = max(0.0, min(1.0, fade_opacity[0] + fade_change));\n\n    v_data0 = vec2(tex.x, tex.y);\n    v_data1 = vec3(gamma_scale, size, interpolated_fade_opacity);\n}\n"
	        }
	    },
	    Xe = /#pragma mapbox: ([\w]+) ([\w]+) ([\w]+) ([\w]+)/g,
	    He = function(t) {
	        var e = We[t],
	            i = {};
	        e.fragmentSource = e.fragmentSource.replace(Xe, function(t, e, n, o, r) {
	            return i[r] = !0, "define" === e ? "\n#ifndef HAS_UNIFORM_u_" + r + "\nvarying " + n + " " + o + " " + r + ";\n#else\nuniform " + n + " " + o + " u_" + r + ";\n#endif\n" : "\n#ifdef HAS_UNIFORM_u_" + r + "\n    " + n + " " + o + " " + r + " = u_" + r + ";\n#endif\n"
	        }), e.vertexSource = e.vertexSource.replace(Xe, function(t, e, n, o, r) {
	            var a = "float" === o ? "vec2" : "vec4";
	            return i[r] ? "define" === e ? "\n#ifndef HAS_UNIFORM_u_" + r + "\nuniform lowp float a_" + r + "_t;\nattribute " + n + " " + a + " a_" + r + ";\nvarying " + n + " " + o + " " + r + ";\n#else\nuniform " + n + " " + o + " u_" + r + ";\n#endif\n" : "\n#ifndef HAS_UNIFORM_u_" + r + "\n    " + r + " = unpack_mix_" + a + "(a_" + r + ", a_" + r + "_t);\n#else\n    " + n + " " + o + " " + r + " = u_" + r + ";\n#endif\n" : "define" === e ? "\n#ifndef HAS_UNIFORM_u_" + r + "\nuniform lowp float a_" + r + "_t;\nattribute " + n + " " + a + " a_" + r + ";\n#else\nuniform " + n + " " + o + " u_" + r + ";\n#endif\n" : "\n#ifndef HAS_UNIFORM_u_" + r + "\n    " + n + " " + o + " " + r + " = unpack_mix_" + a + "(a_" + r + ", a_" + r + "_t);\n#else\n    " + n + " " + o + " " + r + " = u_" + r + ";\n#endif\n"
	        });
	    };
	for (var Ke in We) He(Ke);
	var Ye = We,
	    Je = function(e, i, n, o) {
	        var r = e.gl;
	        this.program = r.createProgram();
	        var a = n.defines().concat("#define DEVICE_PIXEL_RATIO " + t.browser.devicePixelRatio.toFixed(1));
	        o && a.push("#define OVERDRAW_INSPECTOR;");
	        var s = a.concat(Ye.prelude.fragmentSource, i.fragmentSource).join("\n"),
	            l = a.concat(Ye.prelude.vertexSource, i.vertexSource).join("\n"),
	            c = r.createShader(r.FRAGMENT_SHADER);
	        r.shaderSource(c, s), r.compileShader(c), r.attachShader(this.program, c);
	        var h = r.createShader(r.VERTEX_SHADER);
	        r.shaderSource(h, l), r.compileShader(h), r.attachShader(this.program, h);
	        for (var u = n.layoutAttributes || [], p = 0; p < u.length; p++) r.bindAttribLocation(this.program, p, u[p].name);
	        r.linkProgram(this.program), this.numAttributes = r.getProgramParameter(this.program, r.ACTIVE_ATTRIBUTES), this.attributes = {}, this.uniforms = {};
	        for (var d = 0; d < this.numAttributes; d++) {
	            var f = r.getActiveAttrib(this.program, d);
	            f && (this.attributes[f.name] = r.getAttribLocation(this.program, f.name));
	        }
	        for (var m = r.getProgramParameter(this.program, r.ACTIVE_UNIFORMS), _ = 0; _ < m; _++) {
	            var g = r.getActiveUniform(this.program, _);
	            g && (this.uniforms[g.name] = r.getUniformLocation(this.program, g.name));
	        }
	    };

	function Qe(e, i) {
	    for (var n = e.sort(function(t, e) {
	            return t.tileID.isLessThan(e.tileID) ? -1 : e.tileID.isLessThan(t.tileID) ? 1 : 0
	        }), o = 0; o < n.length; o++) {
	        var r = {},
	            a = n[o],
	            s = n.slice(o + 1);
	        $e(a.tileID.wrapped(), a.tileID, s, new t.OverscaledTileID(0, a.tileID.wrap + 1, 0, 0, 0), r), a.setMask(r, i);
	    }
	}

	function $e(e, i, n, o, r) {
	    for (var a = 0; a < n.length; a++) {
	        var s = n[a];
	        if (o.isLessThan(s.tileID)) break;
	        if (i.key === s.tileID.key) return;
	        if (s.tileID.isChildOf(i)) {
	            for (var l = i.children(1 / 0), c = 0; c < l.length; c++) {
	                $e(e, l[c], n.slice(a), o, r);
	            }
	            return
	        }
	    }
	    var h = i.overscaledZ - e.overscaledZ,
	        u = new t.CanonicalTileID(h, i.canonical.x - (e.canonical.x << h), i.canonical.y - (e.canonical.y << h));
	    r[u.key] = r[u.key] || u;
	}

	function ti(t, e, i, n, o) {
	    var r = t.context,
	        a = r.gl,
	        s = o ? t.useProgram("collisionCircle") : t.useProgram("collisionBox");
	    r.setDepthMode(Lt.disabled), r.setStencilMode(kt.disabled), r.setColorMode(t.colorModeForRenderPass());
	    for (var l = 0; l < n.length; l++) {
	        var c = n[l],
	            h = e.getTile(c),
	            u = h.getBucket(i);
	        if (u) {
	            var p = o ? u.collisionCircle : u.collisionBox;
	            if (p) {
	                a.uniformMatrix4fv(s.uniforms.u_matrix, !1, c.posMatrix), a.uniform1f(s.uniforms.u_camera_to_center_distance, t.transform.cameraToCenterDistance);
	                var d = ye(h, 1, t.transform.zoom),
	                    f = Math.pow(2, t.transform.zoom - h.tileID.overscaledZ);
	                a.uniform1f(s.uniforms.u_pixels_to_tile_units, d), a.uniform2f(s.uniforms.u_extrude_scale, t.transform.pixelsToGLUnits[0] / (d * f), t.transform.pixelsToGLUnits[1] / (d * f)), a.uniform1f(s.uniforms.u_overscale_factor, h.tileID.overscaleFactor()), s.draw(r, o ? a.TRIANGLES : a.LINES, i.id, p.layoutVertexBuffer, p.indexBuffer, p.segments, null, p.collisionVertexBuffer, null);
	            }
	        }
	    }
	}
	Je.prototype.draw = function(t, e, i, n, o, r, a, s, l) {
	    for (var c, h = t.gl, u = (c = {}, c[h.LINES] = 2, c[h.TRIANGLES] = 3, c)[e], p = 0, d = r.get(); p < d.length; p += 1) {
	        var f = d[p],
	            m = f.vaos || (f.vaos = {});
	        (m[i] || (m[i] = new W)).bind(t, this, n, a ? a.getPaintVertexBuffers() : [], o, f.vertexOffset, s, l), h.drawElements(e, f.primitiveLength * u, h.UNSIGNED_SHORT, f.primitiveOffset * u * 2);
	    }
	};
	var ei = t.identity(new Float32Array(16)),
	    ii = t.properties.layout;

	function ni(t, e, i, n, o, r, a, s, l, c) {
	    var h, u = t.context,
	        p = u.gl,
	        d = t.transform,
	        f = "map" === s,
	        m = "map" === l,
	        _ = f && "point" !== i.layout.get("symbol-placement"),
	        g = f && !m && !_,
	        v = m;
	    u.setDepthMode(v ? t.depthModeForSublayer(0, Lt.ReadOnly) : Lt.disabled);
	    for (var y = 0, x = n; y < x.length; y += 1) {
	        var b = x[y],
	            w = e.getTile(b),
	            E = w.getBucket(i);
	        if (E) {
	            var T = o ? E.text : E.icon;
	            if (T && T.segments.get().length) {
	                var I = T.programConfigurations.get(i.id),
	                    S = o || E.sdfIcons,
	                    C = o ? E.textSizeData : E.iconSizeData;
	                if (h || (h = t.useProgram(S ? "symbolSDF" : "symbolIcon", I), I.setUniforms(t.context, h, i.paint, {
	                        zoom: t.transform.zoom
	                    }), oi(h, t, i, o, g, m, C)), u.activeTexture.set(p.TEXTURE0), p.uniform1i(h.uniforms.u_texture, 0), o) w.glyphAtlasTexture.bind(p.LINEAR, p.CLAMP_TO_EDGE), p.uniform2fv(h.uniforms.u_texsize, w.glyphAtlasTexture.size);
	                else {
	                    var z = 1 !== i.layout.get("icon-size").constantOr(0) || E.iconsNeedLinear,
	                        P = m || 0 !== d.pitch;
	                    w.iconAtlasTexture.bind(S || t.options.rotating || t.options.zooming || z || P ? p.LINEAR : p.NEAREST, p.CLAMP_TO_EDGE), p.uniform2fv(h.uniforms.u_texsize, w.iconAtlasTexture.size);
	                }
	                p.uniformMatrix4fv(h.uniforms.u_matrix, !1, t.translatePosMatrix(b.posMatrix, w, r, a));
	                var A = ye(w, 1, t.transform.zoom),
	                    D = oe(b.posMatrix, m, f, t.transform, A),
	                    R = re(b.posMatrix, m, f, t.transform, A);
	                p.uniformMatrix4fv(h.uniforms.u_gl_coord_matrix, !1, t.translatePosMatrix(R, w, r, a, !0)), _ ? (p.uniformMatrix4fv(h.uniforms.u_label_plane_matrix, !1, ei), le(E, b.posMatrix, t, o, D, R, m, c)) : p.uniformMatrix4fv(h.uniforms.u_label_plane_matrix, !1, D), p.uniform1f(h.uniforms.u_fade_change, t.options.fadeDuration ? t.symbolFadeChange : 1), ri(h, I, t, i, w, T, o, S, m);
	            }
	        }
	    }
	}

	function oi(e, i, n, o, r, a, s) {
	    var l = i.context.gl,
	        c = i.transform;
	    l.uniform1i(e.uniforms.u_pitch_with_map, a ? 1 : 0), l.uniform1f(e.uniforms.u_is_text, o ? 1 : 0), l.uniform1f(e.uniforms.u_pitch, c.pitch / 360 * 2 * Math.PI);
	    var h = "constant" === s.functionType || "source" === s.functionType,
	        u = "constant" === s.functionType || "camera" === s.functionType;
	    l.uniform1i(e.uniforms.u_is_size_zoom_constant, h ? 1 : 0), l.uniform1i(e.uniforms.u_is_size_feature_constant, u ? 1 : 0), l.uniform1f(e.uniforms.u_camera_to_center_distance, c.cameraToCenterDistance);
	    var p = t.evaluateSizeForZoom(s, c.zoom, ii.properties[o ? "text-size" : "icon-size"]);
	    void 0 !== p.uSizeT && l.uniform1f(e.uniforms.u_size_t, p.uSizeT), void 0 !== p.uSize && l.uniform1f(e.uniforms.u_size, p.uSize), l.uniform1f(e.uniforms.u_aspect_ratio, c.width / c.height), l.uniform1i(e.uniforms.u_rotate_symbol, r ? 1 : 0);
	}

	function ri(t, e, i, n, o, r, a, s, l) {
	    var c = i.context,
	        h = c.gl,
	        u = i.transform;
	    if (s) {
	        var p = 0 !== n.paint.get(a ? "text-halo-width" : "icon-halo-width").constantOr(1),
	            d = l ? Math.cos(u._pitch) * u.cameraToCenterDistance : 1;
	        h.uniform1f(t.uniforms.u_gamma_scale, d), p && (h.uniform1f(t.uniforms.u_is_halo, 1), ai(r, n, c, t)), h.uniform1f(t.uniforms.u_is_halo, 0);
	    }
	    ai(r, n, c, t);
	}

	function ai(t, e, i, n) {
	    n.draw(i, i.gl.TRIANGLES, e.id, t.layoutVertexBuffer, t.indexBuffer, t.segments, t.programConfigurations.get(e.id), t.dynamicLayoutVertexBuffer, t.opacityVertexBuffer);
	}

	function si(e, i, n, o, r, a, s, l, c) {
	    var h, u, p, d, f = i.context,
	        m = f.gl,
	        _ = r.paint.get("line-dasharray"),
	        g = r.paint.get("line-pattern");
	    if (l || c) {
	        var v = 1 / ye(n, 1, i.transform.tileZoom);
	        if (_) {
	            h = i.lineAtlas.getDash(_.from, "round" === r.layout.get("line-cap")), u = i.lineAtlas.getDash(_.to, "round" === r.layout.get("line-cap"));
	            var y = h.width * _.fromScale,
	                x = u.width * _.toScale;
	            m.uniform2f(e.uniforms.u_patternscale_a, v / y, -h.height / 2), m.uniform2f(e.uniforms.u_patternscale_b, v / x, -u.height / 2), m.uniform1f(e.uniforms.u_sdfgamma, i.lineAtlas.width / (256 * Math.min(y, x) * t.browser.devicePixelRatio) / 2);
	        } else if (g) {
	            if (p = i.imageManager.getPattern(g.from), d = i.imageManager.getPattern(g.to), !p || !d) return;
	            m.uniform2f(e.uniforms.u_pattern_size_a, p.displaySize[0] * g.fromScale / v, p.displaySize[1]), m.uniform2f(e.uniforms.u_pattern_size_b, d.displaySize[0] * g.toScale / v, d.displaySize[1]);
	            var b = i.imageManager.getPixelSize(),
	                w = b.width,
	                E = b.height;
	            m.uniform2fv(e.uniforms.u_texsize, [w, E]);
	        }
	        m.uniform2f(e.uniforms.u_gl_units_to_pixels, 1 / i.transform.pixelsToGLUnits[0], 1 / i.transform.pixelsToGLUnits[1]);
	    }
	    l && (_ ? (m.uniform1i(e.uniforms.u_image, 0), f.activeTexture.set(m.TEXTURE0), i.lineAtlas.bind(f), m.uniform1f(e.uniforms.u_tex_y_a, h.y), m.uniform1f(e.uniforms.u_tex_y_b, u.y), m.uniform1f(e.uniforms.u_mix, _.t)) : g && (m.uniform1i(e.uniforms.u_image, 0), f.activeTexture.set(m.TEXTURE0), i.imageManager.bind(f), m.uniform2fv(e.uniforms.u_pattern_tl_a, p.tl), m.uniform2fv(e.uniforms.u_pattern_br_a, p.br), m.uniform2fv(e.uniforms.u_pattern_tl_b, d.tl), m.uniform2fv(e.uniforms.u_pattern_br_b, d.br), m.uniform1f(e.uniforms.u_fade, g.t))), f.setStencilMode(i.stencilModeForClipping(a));
	    var T = i.translatePosMatrix(a.posMatrix, n, r.paint.get("line-translate"), r.paint.get("line-translate-anchor"));
	    if (m.uniformMatrix4fv(e.uniforms.u_matrix, !1, T), m.uniform1f(e.uniforms.u_ratio, 1 / ye(n, 1, i.transform.zoom)), r.paint.get("line-gradient")) {
	        f.activeTexture.set(m.TEXTURE0);
	        var I = r.gradientTexture;
	        if (!r.gradient) return;
	        I || (I = r.gradientTexture = new t.Texture(f, r.gradient, m.RGBA)), I.bind(m.LINEAR, m.CLAMP_TO_EDGE), m.uniform1i(e.uniforms.u_image, 0);
	    }
	    e.draw(f, m.TRIANGLES, r.id, o.layoutVertexBuffer, o.indexBuffer, o.segments, s);
	}
	var li = function(t, e) {
	        if (!t) return !1;
	        var i = e.imageManager.getPattern(t.from),
	            n = e.imageManager.getPattern(t.to);
	        return !i || !n
	    },
	    ci = function(t, e, i) {
	        var n = e.context,
	            o = n.gl,
	            r = e.imageManager.getPattern(t.from),
	            a = e.imageManager.getPattern(t.to);
	        o.uniform1i(i.uniforms.u_image, 0), o.uniform2fv(i.uniforms.u_pattern_tl_a, r.tl), o.uniform2fv(i.uniforms.u_pattern_br_a, r.br), o.uniform2fv(i.uniforms.u_pattern_tl_b, a.tl), o.uniform2fv(i.uniforms.u_pattern_br_b, a.br);
	        var s = e.imageManager.getPixelSize(),
	            l = s.width,
	            c = s.height;
	        o.uniform2fv(i.uniforms.u_texsize, [l, c]), o.uniform1f(i.uniforms.u_mix, t.t), o.uniform2fv(i.uniforms.u_pattern_size_a, r.displaySize), o.uniform2fv(i.uniforms.u_pattern_size_b, a.displaySize), o.uniform1f(i.uniforms.u_scale_a, t.fromScale), o.uniform1f(i.uniforms.u_scale_b, t.toScale), n.activeTexture.set(o.TEXTURE0), e.imageManager.bind(e.context);
	    },
	    hi = function(t, e, i) {
	        var n = e.context.gl;
	        n.uniform1f(i.uniforms.u_tile_units_to_pixels, 1 / ye(t, 1, e.transform.tileZoom));
	        var o = Math.pow(2, t.tileID.overscaledZ),
	            r = t.tileSize * Math.pow(2, e.transform.tileZoom) / o,
	            a = r * (t.tileID.canonical.x + t.tileID.wrap * o),
	            s = r * t.tileID.canonical.y;
	        n.uniform2f(i.uniforms.u_pixel_coord_upper, a >> 16, s >> 16), n.uniform2f(i.uniforms.u_pixel_coord_lower, 65535 & a, 65535 & s);
	    };

	function ui(t, e, i, n, o) {
	    if (!li(i.paint.get("fill-pattern"), t))
	        for (var r = !0, a = 0, s = n; a < s.length; a += 1) {
	            var l = s[a],
	                c = e.getTile(l),
	                h = c.getBucket(i);
	            h && (t.context.setStencilMode(t.stencilModeForClipping(l)), o(t, e, i, c, l, h, r), r = !1);
	        }
	}

	function pi(t, e, i, n, o, r, a) {
	    var s = t.context.gl,
	        l = r.programConfigurations.get(i.id);
	    fi("fill", i.paint.get("fill-pattern"), t, l, i, n, o, a).draw(t.context, s.TRIANGLES, i.id, r.layoutVertexBuffer, r.indexBuffer, r.segments, l);
	}

	function di(t, e, i, n, o, r, a) {
	    var s = t.context.gl,
	        l = r.programConfigurations.get(i.id),
	        c = fi("fillOutline", i.getPaintProperty("fill-outline-color") ? null : i.paint.get("fill-pattern"), t, l, i, n, o, a);
	    s.uniform2f(c.uniforms.u_world, s.drawingBufferWidth, s.drawingBufferHeight), c.draw(t.context, s.LINES, i.id, r.layoutVertexBuffer, r.indexBuffer2, r.segments2, l);
	}

	function fi(t, e, i, n, o, r, a, s) {
	    var l, c = i.context.program.get();
	    return e ? (l = i.useProgram(t + "Pattern", n), (s || l.program !== c) && (n.setUniforms(i.context, l, o.paint, {
	        zoom: i.transform.zoom
	    }), ci(e, i, l)), hi(r, i, l)) : (l = i.useProgram(t, n), (s || l.program !== c) && n.setUniforms(i.context, l, o.paint, {
	        zoom: i.transform.zoom
	    })), i.context.gl.uniformMatrix4fv(l.uniforms.u_matrix, !1, i.translatePosMatrix(a.posMatrix, r, o.paint.get("fill-translate"), o.paint.get("fill-translate-anchor"))), l
	}

	function mi(e, i, n, o, r, a, s) {
	    var l = e.context,
	        c = l.gl,
	        h = n.paint.get("fill-extrusion-pattern"),
	        u = e.context.program.get(),
	        p = a.programConfigurations.get(n.id),
	        d = e.useProgram(h ? "fillExtrusionPattern" : "fillExtrusion", p);
	    if ((s || d.program !== u) && p.setUniforms(l, d, n.paint, {
	            zoom: e.transform.zoom
	        }), h) {
	        if (li(h, e)) return;
	        ci(h, e, d), hi(o, e, d), c.uniform1f(d.uniforms.u_height_factor, -Math.pow(2, r.overscaledZ) / o.tileSize / 8);
	    }
	    e.context.gl.uniformMatrix4fv(d.uniforms.u_matrix, !1, e.translatePosMatrix(r.posMatrix, o, n.paint.get("fill-extrusion-translate"), n.paint.get("fill-extrusion-translate-anchor"))),
	        function(e, i) {
	            var n = i.context.gl,
	                o = i.style.light,
	                r = o.properties.get("position"),
	                a = [r.x, r.y, r.z],
	                s = t.create$2();
	            "viewport" === o.properties.get("anchor") && t.fromRotation(s, -i.transform.angle);
	            t.transformMat3(a, a, s);
	            var l = o.properties.get("color");
	            n.uniform3fv(e.uniforms.u_lightpos, a), n.uniform1f(e.uniforms.u_lightintensity, o.properties.get("intensity")), n.uniform3f(e.uniforms.u_lightcolor, l.r, l.g, l.b);
	        }(d, e), d.draw(l, c.TRIANGLES, n.id, a.layoutVertexBuffer, a.indexBuffer, a.segments, p);
	}

	function _i(e, i, n) {
	    var o = e.context,
	        r = o.gl,
	        a = i.fbo;
	    if (a) {
	        var s = e.useProgram("hillshade"),
	            l = e.transform.calculatePosMatrix(i.tileID.toUnwrapped(), !0);
	        ! function(t, e, i) {
	            var n = i.paint.get("hillshade-illumination-direction") * (Math.PI / 180);
	            "viewport" === i.paint.get("hillshade-illumination-anchor") && (n -= e.transform.angle), e.context.gl.uniform2f(t.uniforms.u_light, i.paint.get("hillshade-exaggeration"), n);
	        }(s, e, n);
	        var c = function(e, i) {
	            var n = i.toCoordinate(),
	                o = new t.Coordinate(n.column, n.row + 1, n.zoom);
	            return [e.transform.coordinateLocation(n).lat, e.transform.coordinateLocation(o).lat]
	        }(e, i.tileID);
	        o.activeTexture.set(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, a.colorAttachment.get()), r.uniformMatrix4fv(s.uniforms.u_matrix, !1, l), r.uniform2fv(s.uniforms.u_latrange, c), r.uniform1i(s.uniforms.u_image, 0);
	        var h = n.paint.get("hillshade-shadow-color");
	        r.uniform4f(s.uniforms.u_shadow, h.r, h.g, h.b, h.a);
	        var u = n.paint.get("hillshade-highlight-color");
	        r.uniform4f(s.uniforms.u_highlight, u.r, u.g, u.b, u.a);
	        var p = n.paint.get("hillshade-accent-color");
	        if (r.uniform4f(s.uniforms.u_accent, p.r, p.g, p.b, p.a), i.maskedBoundsBuffer && i.maskedIndexBuffer && i.segments) s.draw(o, r.TRIANGLES, n.id, i.maskedBoundsBuffer, i.maskedIndexBuffer, i.segments);
	        else {
	            var d = e.rasterBoundsBuffer;
	            e.rasterBoundsVAO.bind(o, s, d, []), r.drawArrays(r.TRIANGLE_STRIP, 0, d.length);
	        }
	    }
	}

	function gi(e, i, n) {
	    var o = e.context,
	        r = o.gl;
	    if (i.dem && i.dem.data) {
	        var a = i.dem.dim,
	            s = i.dem.getPixels();
	        if (o.activeTexture.set(r.TEXTURE1), o.pixelStoreUnpackPremultiplyAlpha.set(!1), i.demTexture = i.demTexture || e.getTileTexture(i.tileSize), i.demTexture) {
	            var l = i.demTexture;
	            l.update(s, {
	                premultiply: !1
	            }), l.bind(r.NEAREST, r.CLAMP_TO_EDGE);
	        } else i.demTexture = new t.Texture(o, s, r.RGBA, {
	            premultiply: !1
	        }), i.demTexture.bind(r.NEAREST, r.CLAMP_TO_EDGE);
	        o.activeTexture.set(r.TEXTURE0);
	        var c = i.fbo;
	        if (!c) {
	            var h = new t.Texture(o, {
	                width: a,
	                height: a,
	                data: null
	            }, r.RGBA);
	            h.bind(r.LINEAR, r.CLAMP_TO_EDGE), (c = i.fbo = o.createFramebuffer(a, a)).colorAttachment.set(h.texture);
	        }
	        o.bindFramebuffer.set(c.framebuffer), o.viewport.set([0, 0, a, a]);
	        var u = t.create();
	        t.ortho(u, 0, t.EXTENT, -t.EXTENT, 0, 0, 1), t.translate(u, u, [0, -t.EXTENT, 0]);
	        var p = e.useProgram("hillshadePrepare");
	        r.uniformMatrix4fv(p.uniforms.u_matrix, !1, u), r.uniform1f(p.uniforms.u_zoom, i.tileID.overscaledZ), r.uniform2fv(p.uniforms.u_dimension, [2 * a, 2 * a]), r.uniform1i(p.uniforms.u_image, 1), r.uniform1f(p.uniforms.u_maxzoom, n);
	        var d = e.rasterBoundsBuffer;
	        e.rasterBoundsVAO.bind(o, p, d, []), r.drawArrays(r.TRIANGLE_STRIP, 0, d.length), i.needsHillshadePrepare = !1;
	    }
	}

	function vi(e, i, n, o, r) {
	    var a = o.paint.get("raster-fade-duration");
	    if (a > 0) {
	        var s = t.browser.now(),
	            l = (s - e.timeAdded) / a,
	            c = i ? (s - i.timeAdded) / a : -1,
	            h = n.getSource(),
	            u = r.coveringZoomLevel({
	                tileSize: h.tileSize,
	                roundZoom: h.roundZoom
	            }),
	            p = !i || Math.abs(i.tileID.overscaledZ - u) > Math.abs(e.tileID.overscaledZ - u),
	            d = p && e.refreshedUponExpiration ? 1 : t.clamp(p ? l : 1 - c, 0, 1);
	        return e.refreshedUponExpiration && l >= 1 && (e.refreshedUponExpiration = !1), i ? {
	            opacity: 1,
	            mix: 1 - d
	        } : {
	            opacity: d,
	            mix: 0
	        }
	    }
	    return {
	        opacity: 1,
	        mix: 0
	    }
	}

	function yi(e, i, n) {
	    var o = e.context,
	        r = o.gl,
	        a = n.posMatrix,
	        s = e.useProgram("debug");
	    o.setDepthMode(Lt.disabled), o.setStencilMode(kt.disabled), o.setColorMode(e.colorModeForRenderPass()), r.uniformMatrix4fv(s.uniforms.u_matrix, !1, a), r.uniform4f(s.uniforms.u_color, 1, 0, 0, 1), e.debugVAO.bind(o, s, e.debugBuffer, []), r.drawArrays(r.LINE_STRIP, 0, e.debugBuffer.length);
	    for (var l = function(t, e, i, n) {
	            n = n || 1;
	            var o, r, a, s, l, c, h, u, p = [];
	            for (o = 0, r = t.length; o < r; o++)
	                if (l = xi[t[o]]) {
	                    for (u = null, a = 0, s = l[1].length; a < s; a += 2) - 1 === l[1][a] && -1 === l[1][a + 1] ? u = null : (c = e + l[1][a] * n, h = i - l[1][a + 1] * n, u && p.push(u.x, u.y, c, h), u = {
	                        x: c,
	                        y: h
	                    });
	                    e += l[0] * n;
	                }
	            return p
	        }(n.toString(), 50, 200, 5), c = new t.StructArrayLayout2i4, h = 0; h < l.length; h += 2) c.emplaceBack(l[h], l[h + 1]);
	    var u = o.createVertexBuffer(c, Ge.members);
	    (new W).bind(o, s, u, []), r.uniform4f(s.uniforms.u_color, 1, 1, 1, 1);
	    for (var p = i.getTile(n).tileSize, d = t.EXTENT / (Math.pow(2, e.transform.zoom - n.overscaledZ) * p), f = [
	            [-1, -1],
	            [-1, 1],
	            [1, -1],
	            [1, 1]
	        ], m = 0; m < f.length; m++) {
	        var _ = f[m];
	        r.uniformMatrix4fv(s.uniforms.u_matrix, !1, t.translate([], a, [d * _[0], d * _[1], 0])), r.drawArrays(r.LINES, 0, u.length);
	    }
	    r.uniform4f(s.uniforms.u_color, 0, 0, 0, 1), r.uniformMatrix4fv(s.uniforms.u_matrix, !1, a), r.drawArrays(r.LINES, 0, u.length);
	}
	var xi = {
	    " ": [16, []],
	    "!": [10, [5, 21, 5, 7, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
	    '"': [16, [4, 21, 4, 14, -1, -1, 12, 21, 12, 14]],
	    "#": [21, [11, 25, 4, -7, -1, -1, 17, 25, 10, -7, -1, -1, 4, 12, 18, 12, -1, -1, 3, 6, 17, 6]],
	    $: [20, [8, 25, 8, -4, -1, -1, 12, 25, 12, -4, -1, -1, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3]],
	    "%": [24, [21, 21, 3, 0, -1, -1, 8, 21, 10, 19, 10, 17, 9, 15, 7, 14, 5, 14, 3, 16, 3, 18, 4, 20, 6, 21, 8, 21, 10, 20, 13, 19, 16, 19, 19, 20, 21, 21, -1, -1, 17, 7, 15, 6, 14, 4, 14, 2, 16, 0, 18, 0, 20, 1, 21, 3, 21, 5, 19, 7, 17, 7]],
	    "&": [26, [23, 12, 23, 13, 22, 14, 21, 14, 20, 13, 19, 11, 17, 6, 15, 3, 13, 1, 11, 0, 7, 0, 5, 1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9, 12, 13, 13, 14, 14, 16, 14, 18, 13, 20, 11, 21, 9, 20, 8, 18, 8, 16, 9, 13, 11, 10, 16, 3, 18, 1, 20, 0, 22, 0, 23, 1, 23, 2]],
	    "'": [10, [5, 19, 4, 20, 5, 21, 6, 20, 6, 18, 5, 16, 4, 15]],
	    "(": [14, [11, 25, 9, 23, 7, 20, 5, 16, 4, 11, 4, 7, 5, 2, 7, -2, 9, -5, 11, -7]],
	    ")": [14, [3, 25, 5, 23, 7, 20, 9, 16, 10, 11, 10, 7, 9, 2, 7, -2, 5, -5, 3, -7]],
	    "*": [16, [8, 21, 8, 9, -1, -1, 3, 18, 13, 12, -1, -1, 13, 18, 3, 12]],
	    "+": [26, [13, 18, 13, 0, -1, -1, 4, 9, 22, 9]],
	    ",": [10, [6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4]],
	    "-": [26, [4, 9, 22, 9]],
	    ".": [10, [5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
	    "/": [22, [20, 25, 2, -7]],
	    0: [20, [9, 21, 6, 20, 4, 17, 3, 12, 3, 9, 4, 4, 6, 1, 9, 0, 11, 0, 14, 1, 16, 4, 17, 9, 17, 12, 16, 17, 14, 20, 11, 21, 9, 21]],
	    1: [20, [6, 17, 8, 18, 11, 21, 11, 0]],
	    2: [20, [4, 16, 4, 17, 5, 19, 6, 20, 8, 21, 12, 21, 14, 20, 15, 19, 16, 17, 16, 15, 15, 13, 13, 10, 3, 0, 17, 0]],
	    3: [20, [5, 21, 16, 21, 10, 13, 13, 13, 15, 12, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4]],
	    4: [20, [13, 21, 3, 7, 18, 7, -1, -1, 13, 21, 13, 0]],
	    5: [20, [15, 21, 5, 21, 4, 12, 5, 13, 8, 14, 11, 14, 14, 13, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4]],
	    6: [20, [16, 18, 15, 20, 12, 21, 10, 21, 7, 20, 5, 17, 4, 12, 4, 7, 5, 3, 7, 1, 10, 0, 11, 0, 14, 1, 16, 3, 17, 6, 17, 7, 16, 10, 14, 12, 11, 13, 10, 13, 7, 12, 5, 10, 4, 7]],
	    7: [20, [17, 21, 7, 0, -1, -1, 3, 21, 17, 21]],
	    8: [20, [8, 21, 5, 20, 4, 18, 4, 16, 5, 14, 7, 13, 11, 12, 14, 11, 16, 9, 17, 7, 17, 4, 16, 2, 15, 1, 12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6, 11, 9, 12, 13, 13, 15, 14, 16, 16, 16, 18, 15, 20, 12, 21, 8, 21]],
	    9: [20, [16, 14, 15, 11, 13, 9, 10, 8, 9, 8, 6, 9, 4, 11, 3, 14, 3, 15, 4, 18, 6, 20, 9, 21, 10, 21, 13, 20, 15, 18, 16, 14, 16, 9, 15, 4, 13, 1, 10, 0, 8, 0, 5, 1, 4, 3]],
	    ":": [10, [5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
	    ";": [10, [5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4]],
	    "<": [24, [20, 18, 4, 9, 20, 0]],
	    "=": [26, [4, 12, 22, 12, -1, -1, 4, 6, 22, 6]],
	    ">": [24, [4, 18, 20, 9, 4, 0]],
	    "?": [18, [3, 16, 3, 17, 4, 19, 5, 20, 7, 21, 11, 21, 13, 20, 14, 19, 15, 17, 15, 15, 14, 13, 13, 12, 9, 10, 9, 7, -1, -1, 9, 2, 8, 1, 9, 0, 10, 1, 9, 2]],
	    "@": [27, [18, 13, 17, 15, 15, 16, 12, 16, 10, 15, 9, 14, 8, 11, 8, 8, 9, 6, 11, 5, 14, 5, 16, 6, 17, 8, -1, -1, 12, 16, 10, 14, 9, 11, 9, 8, 10, 6, 11, 5, -1, -1, 18, 16, 17, 8, 17, 6, 19, 5, 21, 5, 23, 7, 24, 10, 24, 12, 23, 15, 22, 17, 20, 19, 18, 20, 15, 21, 12, 21, 9, 20, 7, 19, 5, 17, 4, 15, 3, 12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1, 12, 0, 15, 0, 18, 1, 20, 2, 21, 3, -1, -1, 19, 16, 18, 8, 18, 6, 19, 5]],
	    A: [18, [9, 21, 1, 0, -1, -1, 9, 21, 17, 0, -1, -1, 4, 7, 14, 7]],
	    B: [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, -1, -1, 4, 11, 13, 11, 16, 10, 17, 9, 18, 7, 18, 4, 17, 2, 16, 1, 13, 0, 4, 0]],
	    C: [21, [18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5]],
	    D: [21, [4, 21, 4, 0, -1, -1, 4, 21, 11, 21, 14, 20, 16, 18, 17, 16, 18, 13, 18, 8, 17, 5, 16, 3, 14, 1, 11, 0, 4, 0]],
	    E: [19, [4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11, -1, -1, 4, 0, 17, 0]],
	    F: [18, [4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11]],
	    G: [21, [18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 18, 8, -1, -1, 13, 8, 18, 8]],
	    H: [22, [4, 21, 4, 0, -1, -1, 18, 21, 18, 0, -1, -1, 4, 11, 18, 11]],
	    I: [8, [4, 21, 4, 0]],
	    J: [16, [12, 21, 12, 5, 11, 2, 10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7]],
	    K: [21, [4, 21, 4, 0, -1, -1, 18, 21, 4, 7, -1, -1, 9, 12, 18, 0]],
	    L: [17, [4, 21, 4, 0, -1, -1, 4, 0, 16, 0]],
	    M: [24, [4, 21, 4, 0, -1, -1, 4, 21, 12, 0, -1, -1, 20, 21, 12, 0, -1, -1, 20, 21, 20, 0]],
	    N: [22, [4, 21, 4, 0, -1, -1, 4, 21, 18, 0, -1, -1, 18, 21, 18, 0]],
	    O: [22, [9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21]],
	    P: [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 14, 17, 12, 16, 11, 13, 10, 4, 10]],
	    Q: [22, [9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, -1, -1, 12, 4, 18, -2]],
	    R: [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, 4, 11, -1, -1, 11, 11, 18, 0]],
	    S: [20, [17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3]],
	    T: [16, [8, 21, 8, 0, -1, -1, 1, 21, 15, 21]],
	    U: [22, [4, 21, 4, 6, 5, 3, 7, 1, 10, 0, 12, 0, 15, 1, 17, 3, 18, 6, 18, 21]],
	    V: [18, [1, 21, 9, 0, -1, -1, 17, 21, 9, 0]],
	    W: [24, [2, 21, 7, 0, -1, -1, 12, 21, 7, 0, -1, -1, 12, 21, 17, 0, -1, -1, 22, 21, 17, 0]],
	    X: [20, [3, 21, 17, 0, -1, -1, 17, 21, 3, 0]],
	    Y: [18, [1, 21, 9, 11, 9, 0, -1, -1, 17, 21, 9, 11]],
	    Z: [20, [17, 21, 3, 0, -1, -1, 3, 21, 17, 21, -1, -1, 3, 0, 17, 0]],
	    "[": [14, [4, 25, 4, -7, -1, -1, 5, 25, 5, -7, -1, -1, 4, 25, 11, 25, -1, -1, 4, -7, 11, -7]],
	    "\\": [14, [0, 21, 14, -3]],
	    "]": [14, [9, 25, 9, -7, -1, -1, 10, 25, 10, -7, -1, -1, 3, 25, 10, 25, -1, -1, 3, -7, 10, -7]],
	    "^": [16, [6, 15, 8, 18, 10, 15, -1, -1, 3, 12, 8, 17, 13, 12, -1, -1, 8, 17, 8, 0]],
	    _: [16, [0, -2, 16, -2]],
	    "`": [10, [6, 21, 5, 20, 4, 18, 4, 16, 5, 15, 6, 16, 5, 17]],
	    a: [19, [15, 14, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    b: [19, [4, 21, 4, 0, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3]],
	    c: [18, [15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    d: [19, [15, 21, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    e: [18, [3, 8, 15, 8, 15, 10, 14, 12, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    f: [12, [10, 21, 8, 21, 6, 20, 5, 17, 5, 0, -1, -1, 2, 14, 9, 14]],
	    g: [19, [15, 14, 15, -2, 14, -5, 13, -6, 11, -7, 8, -7, 6, -6, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    h: [19, [4, 21, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0]],
	    i: [8, [3, 21, 4, 20, 5, 21, 4, 22, 3, 21, -1, -1, 4, 14, 4, 0]],
	    j: [10, [5, 21, 6, 20, 7, 21, 6, 22, 5, 21, -1, -1, 6, 14, 6, -3, 5, -6, 3, -7, 1, -7]],
	    k: [17, [4, 21, 4, 0, -1, -1, 14, 14, 4, 4, -1, -1, 8, 8, 15, 0]],
	    l: [8, [4, 21, 4, 0]],
	    m: [30, [4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0, -1, -1, 15, 10, 18, 13, 20, 14, 23, 14, 25, 13, 26, 10, 26, 0]],
	    n: [19, [4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0]],
	    o: [19, [8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3, 16, 6, 16, 8, 15, 11, 13, 13, 11, 14, 8, 14]],
	    p: [19, [4, 14, 4, -7, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3]],
	    q: [19, [15, 14, 15, -7, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    r: [13, [4, 14, 4, 0, -1, -1, 4, 8, 5, 11, 7, 13, 9, 14, 12, 14]],
	    s: [17, [14, 11, 13, 13, 10, 14, 7, 14, 4, 13, 3, 11, 4, 9, 6, 8, 11, 7, 13, 6, 14, 4, 14, 3, 13, 1, 10, 0, 7, 0, 4, 1, 3, 3]],
	    t: [12, [5, 21, 5, 4, 6, 1, 8, 0, 10, 0, -1, -1, 2, 14, 9, 14]],
	    u: [19, [4, 14, 4, 4, 5, 1, 7, 0, 10, 0, 12, 1, 15, 4, -1, -1, 15, 14, 15, 0]],
	    v: [16, [2, 14, 8, 0, -1, -1, 14, 14, 8, 0]],
	    w: [22, [3, 14, 7, 0, -1, -1, 11, 14, 7, 0, -1, -1, 11, 14, 15, 0, -1, -1, 19, 14, 15, 0]],
	    x: [17, [3, 14, 14, 0, -1, -1, 14, 14, 3, 0]],
	    y: [16, [2, 14, 8, 0, -1, -1, 14, 14, 8, 0, 6, -4, 4, -6, 2, -7, 1, -7]],
	    z: [17, [14, 14, 3, 0, -1, -1, 3, 14, 14, 14, -1, -1, 3, 0, 14, 0]],
	    "{": [14, [9, 25, 7, 24, 6, 23, 5, 21, 5, 19, 6, 17, 7, 16, 8, 14, 8, 12, 6, 10, -1, -1, 7, 24, 6, 22, 6, 20, 7, 18, 8, 17, 9, 15, 9, 13, 8, 11, 4, 9, 8, 7, 9, 5, 9, 3, 8, 1, 7, 0, 6, -2, 6, -4, 7, -6, -1, -1, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5, -1, 5, -3, 6, -5, 7, -6, 9, -7]],
	    "|": [8, [4, 25, 4, -7]],
	    "}": [14, [5, 25, 7, 24, 8, 23, 9, 21, 9, 19, 8, 17, 7, 16, 6, 14, 6, 12, 8, 10, -1, -1, 7, 24, 8, 22, 8, 20, 7, 18, 6, 17, 5, 15, 5, 13, 6, 11, 10, 9, 6, 7, 5, 5, 5, 3, 6, 1, 7, 0, 8, -2, 8, -4, 7, -6, -1, -1, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9, -1, 9, -3, 8, -5, 7, -6, 5, -7]],
	    "~": [24, [3, 6, 3, 8, 4, 11, 6, 12, 8, 12, 10, 11, 14, 8, 16, 7, 18, 7, 20, 8, 21, 10, -1, -1, 3, 8, 4, 10, 6, 11, 8, 11, 10, 10, 14, 7, 16, 6, 18, 6, 20, 7, 21, 10, 21, 12]]
	};
	var bi = {
	        symbol: function(t, e, i, n) {
	            if ("translucent" === t.renderPass) {
	                var o = t.context;
	                o.setStencilMode(kt.disabled), o.setColorMode(t.colorModeForRenderPass()), 0 !== i.paint.get("icon-opacity").constantOr(1) && ni(t, e, i, n, !1, i.paint.get("icon-translate"), i.paint.get("icon-translate-anchor"), i.layout.get("icon-rotation-alignment"), i.layout.get("icon-pitch-alignment"), i.layout.get("icon-keep-upright")), 0 !== i.paint.get("text-opacity").constantOr(1) && ni(t, e, i, n, !0, i.paint.get("text-translate"), i.paint.get("text-translate-anchor"), i.layout.get("text-rotation-alignment"), i.layout.get("text-pitch-alignment"), i.layout.get("text-keep-upright")), e.map.showCollisionBoxes && function(t, e, i, n) {
	                    ti(t, e, i, n, !1), ti(t, e, i, n, !0);
	                }(t, e, i, n);
	            }
	        },
	        circle: function(t, e, i, n) {
	            if ("translucent" === t.renderPass) {
	                var o = i.paint.get("circle-opacity"),
	                    r = i.paint.get("circle-stroke-width"),
	                    a = i.paint.get("circle-stroke-opacity");
	                if (0 !== o.constantOr(1) || 0 !== r.constantOr(1) && 0 !== a.constantOr(1)) {
	                    var s = t.context,
	                        l = s.gl;
	                    s.setDepthMode(t.depthModeForSublayer(0, Lt.ReadOnly)), s.setStencilMode(kt.disabled), s.setColorMode(t.colorModeForRenderPass());
	                    for (var c = !0, h = 0; h < n.length; h++) {
	                        var u = n[h],
	                            p = e.getTile(u),
	                            d = p.getBucket(i);
	                        if (d) {
	                            var f = t.context.program.get(),
	                                m = d.programConfigurations.get(i.id),
	                                _ = t.useProgram("circle", m);
	                            if ((c || _.program !== f) && (m.setUniforms(s, _, i.paint, {
	                                    zoom: t.transform.zoom
	                                }), c = !1), l.uniform1f(_.uniforms.u_camera_to_center_distance, t.transform.cameraToCenterDistance), l.uniform1i(_.uniforms.u_scale_with_map, "map" === i.paint.get("circle-pitch-scale") ? 1 : 0), "map" === i.paint.get("circle-pitch-alignment")) {
	                                l.uniform1i(_.uniforms.u_pitch_with_map, 1);
	                                var g = ye(p, 1, t.transform.zoom);
	                                l.uniform2f(_.uniforms.u_extrude_scale, g, g);
	                            } else l.uniform1i(_.uniforms.u_pitch_with_map, 0), l.uniform2fv(_.uniforms.u_extrude_scale, t.transform.pixelsToGLUnits);
	                            l.uniformMatrix4fv(_.uniforms.u_matrix, !1, t.translatePosMatrix(u.posMatrix, p, i.paint.get("circle-translate"), i.paint.get("circle-translate-anchor"))), _.draw(s, l.TRIANGLES, i.id, d.layoutVertexBuffer, d.indexBuffer, d.segments, m);
	                        }
	                    }
	                }
	            }
	        },
	        heatmap: function(e, i, n, o) {
	            if (0 !== n.paint.get("heatmap-opacity"))
	                if ("offscreen" === e.renderPass) {
	                    var r = e.context,
	                        a = r.gl;
	                    r.setDepthMode(e.depthModeForSublayer(0, Lt.ReadOnly)), r.setStencilMode(kt.disabled),
	                        function(t, e, i) {
	                            var n = t.gl;
	                            t.activeTexture.set(n.TEXTURE1), t.viewport.set([0, 0, e.width / 4, e.height / 4]);
	                            var o = i.heatmapFbo;
	                            if (o) n.bindTexture(n.TEXTURE_2D, o.colorAttachment.get()), t.bindFramebuffer.set(o.framebuffer);
	                            else {
	                                var r = n.createTexture();
	                                n.bindTexture(n.TEXTURE_2D, r), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), o = i.heatmapFbo = t.createFramebuffer(e.width / 4, e.height / 4),
	                                    function t(e, i, n, o) {
	                                        var r = e.gl;
	                                        r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, i.width / 4, i.height / 4, 0, r.RGBA, e.extTextureHalfFloat ? e.extTextureHalfFloat.HALF_FLOAT_OES : r.UNSIGNED_BYTE, null), o.colorAttachment.set(n), e.extTextureHalfFloat && r.checkFramebufferStatus(r.FRAMEBUFFER) !== r.FRAMEBUFFER_COMPLETE && (e.extTextureHalfFloat = null, o.colorAttachment.setDirty(), t(e, i, n, o));
	                                    }(t, e, r, o);
	                            }
	                        }(r, e, n), r.clear({
	                            color: t.Color.transparent
	                        }), r.setColorMode(new Bt([a.ONE, a.ONE], t.Color.transparent, [!0, !0, !0, !0]));
	                    for (var s = !0, l = 0; l < o.length; l++) {
	                        var c = o[l];
	                        if (!i.hasRenderableParent(c)) {
	                            var h = i.getTile(c),
	                                u = h.getBucket(n);
	                            if (u) {
	                                var p = e.context.program.get(),
	                                    d = u.programConfigurations.get(n.id),
	                                    f = e.useProgram("heatmap", d),
	                                    m = e.transform.zoom;
	                                (s || f.program !== p) && (d.setUniforms(e.context, f, n.paint, {
	                                    zoom: m
	                                }), s = !1), a.uniform1f(f.uniforms.u_extrude_scale, ye(h, 1, m)), a.uniform1f(f.uniforms.u_intensity, n.paint.get("heatmap-intensity")), a.uniformMatrix4fv(f.uniforms.u_matrix, !1, c.posMatrix), f.draw(r, a.TRIANGLES, n.id, u.layoutVertexBuffer, u.indexBuffer, u.segments, d);
	                            }
	                        }
	                    }
	                    r.viewport.set([0, 0, e.width, e.height]);
	                } else "translucent" === e.renderPass && (e.context.setColorMode(e.colorModeForRenderPass()), function(e, i) {
	                    var n = e.context,
	                        o = n.gl,
	                        r = i.heatmapFbo;
	                    if (r) {
	                        n.activeTexture.set(o.TEXTURE0), o.bindTexture(o.TEXTURE_2D, r.colorAttachment.get()), n.activeTexture.set(o.TEXTURE1);
	                        var a = i.colorRampTexture;
	                        a || (a = i.colorRampTexture = new t.Texture(n, i.colorRamp, o.RGBA)), a.bind(o.LINEAR, o.CLAMP_TO_EDGE), n.setDepthMode(Lt.disabled), n.setStencilMode(kt.disabled);
	                        var s = e.useProgram("heatmapTexture"),
	                            l = i.paint.get("heatmap-opacity");
	                        o.uniform1f(s.uniforms.u_opacity, l), o.uniform1i(s.uniforms.u_image, 0), o.uniform1i(s.uniforms.u_color_ramp, 1);
	                        var c = t.create();
	                        t.ortho(c, 0, e.width, e.height, 0, 0, 1), o.uniformMatrix4fv(s.uniforms.u_matrix, !1, c), o.uniform2f(s.uniforms.u_world, o.drawingBufferWidth, o.drawingBufferHeight), e.viewportVAO.bind(e.context, s, e.viewportBuffer, []), o.drawArrays(o.TRIANGLE_STRIP, 0, 4);
	                    }
	                }(e, n));
	        },
	        line: function(t, e, i, n) {
	            if ("translucent" === t.renderPass) {
	                var o = i.paint.get("line-opacity"),
	                    r = i.paint.get("line-width");
	                if (0 !== o.constantOr(1) && 0 !== r.constantOr(1)) {
	                    var a = t.context;
	                    a.setDepthMode(t.depthModeForSublayer(0, Lt.ReadOnly)), a.setColorMode(t.colorModeForRenderPass());
	                    for (var s, l = i.paint.get("line-dasharray") ? "lineSDF" : i.paint.get("line-pattern") ? "linePattern" : i.paint.get("line-gradient") ? "lineGradient" : "line", c = !0, h = 0, u = n; h < u.length; h += 1) {
	                        var p = u[h],
	                            d = e.getTile(p),
	                            f = d.getBucket(i);
	                        if (f) {
	                            var m = f.programConfigurations.get(i.id),
	                                _ = t.context.program.get(),
	                                g = t.useProgram(l, m),
	                                v = c || g.program !== _,
	                                y = s !== d.tileID.overscaledZ;
	                            v && m.setUniforms(t.context, g, i.paint, {
	                                zoom: t.transform.zoom
	                            }), si(g, t, d, f, i, p, m, v, y), s = d.tileID.overscaledZ, c = !1;
	                        }
	                    }
	                }
	            }
	        },
	        fill: function(e, i, n, o) {
	            var r = n.paint.get("fill-color"),
	                a = n.paint.get("fill-opacity");
	            if (0 !== a.constantOr(1)) {
	                var s = e.context;
	                s.setColorMode(e.colorModeForRenderPass());
	                var l = n.paint.get("fill-pattern") || 1 !== r.constantOr(t.Color.transparent).a || 1 !== a.constantOr(0) ? "translucent" : "opaque";
	                e.renderPass === l && (s.setDepthMode(e.depthModeForSublayer(1, "opaque" === e.renderPass ? Lt.ReadWrite : Lt.ReadOnly)), ui(e, i, n, o, pi)), "translucent" === e.renderPass && n.paint.get("fill-antialias") && (s.setDepthMode(e.depthModeForSublayer(n.getPaintProperty("fill-outline-color") ? 2 : 0, Lt.ReadOnly)), ui(e, i, n, o, di));
	            }
	        },
	        "fill-extrusion": function(e, i, n, o) {
	            if (0 !== n.paint.get("fill-extrusion-opacity"))
	                if ("offscreen" === e.renderPass) {
	                    ! function(e, i) {
	                        var n = e.context,
	                            o = n.gl,
	                            r = i.viewportFrame;
	                        if (e.depthRboNeedsClear && e.setupOffscreenDepthRenderbuffer(), !r) {
	                            var a = new t.Texture(n, {
	                                width: e.width,
	                                height: e.height,
	                                data: null
	                            }, o.RGBA);
	                            a.bind(o.LINEAR, o.CLAMP_TO_EDGE), (r = i.viewportFrame = n.createFramebuffer(e.width, e.height)).colorAttachment.set(a.texture);
	                        }
	                        n.bindFramebuffer.set(r.framebuffer), r.depthAttachment.set(e.depthRbo), e.depthRboNeedsClear && (n.clear({
	                            depth: 1
	                        }), e.depthRboNeedsClear = !1), n.clear({
	                            color: t.Color.transparent
	                        }), n.setStencilMode(kt.disabled), n.setDepthMode(new Lt(o.LEQUAL, Lt.ReadWrite, [0, 1])), n.setColorMode(e.colorModeForRenderPass());
	                    }(e, n);
	                    for (var r = !0, a = 0, s = o; a < s.length; a += 1) {
	                        var l = s[a],
	                            c = i.getTile(l),
	                            h = c.getBucket(n);
	                        h && (mi(e, 0, n, c, l, h, r), r = !1);
	                    }
	                } else "translucent" === e.renderPass && function(e, i) {
	                    var n = i.viewportFrame;
	                    if (n) {
	                        var o = e.context,
	                            r = o.gl,
	                            a = e.useProgram("extrusionTexture");
	                        o.setStencilMode(kt.disabled), o.setDepthMode(Lt.disabled), o.setColorMode(e.colorModeForRenderPass()), o.activeTexture.set(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, n.colorAttachment.get()), r.uniform1f(a.uniforms.u_opacity, i.paint.get("fill-extrusion-opacity")), r.uniform1i(a.uniforms.u_image, 0);
	                        var s = t.create();
	                        t.ortho(s, 0, e.width, e.height, 0, 0, 1), r.uniformMatrix4fv(a.uniforms.u_matrix, !1, s), r.uniform2f(a.uniforms.u_world, r.drawingBufferWidth, r.drawingBufferHeight), e.viewportVAO.bind(o, a, e.viewportBuffer, []), r.drawArrays(r.TRIANGLE_STRIP, 0, 4);
	                    }
	                }(e, n);
	        },
	        hillshade: function(t, e, i, n) {
	            if ("offscreen" === t.renderPass || "translucent" === t.renderPass) {
	                var o = t.context,
	                    r = e.getSource().maxzoom;
	                o.setDepthMode(t.depthModeForSublayer(0, Lt.ReadOnly)), o.setStencilMode(kt.disabled), o.setColorMode(t.colorModeForRenderPass());
	                for (var a = 0, s = n; a < s.length; a += 1) {
	                    var l = s[a],
	                        c = e.getTile(l);
	                    c.needsHillshadePrepare && "offscreen" === t.renderPass ? gi(t, c, r) : "translucent" === t.renderPass && _i(t, c, i);
	                }
	                o.viewport.set([0, 0, t.width, t.height]);
	            }
	        },
	        raster: function(t, e, i, n) {
	            if ("translucent" === t.renderPass && 0 !== i.paint.get("raster-opacity")) {
	                var o, r, a = t.context,
	                    s = a.gl,
	                    l = e.getSource(),
	                    c = t.useProgram("raster");
	                a.setStencilMode(kt.disabled), a.setColorMode(t.colorModeForRenderPass()), s.uniform1f(c.uniforms.u_brightness_low, i.paint.get("raster-brightness-min")), s.uniform1f(c.uniforms.u_brightness_high, i.paint.get("raster-brightness-max")), s.uniform1f(c.uniforms.u_saturation_factor, (o = i.paint.get("raster-saturation")) > 0 ? 1 - 1 / (1.001 - o) : -o), s.uniform1f(c.uniforms.u_contrast_factor, (r = i.paint.get("raster-contrast")) > 0 ? 1 / (1 - r) : 1 + r), s.uniform3fv(c.uniforms.u_spin_weights, function(t) {
	                    t *= Math.PI / 180;
	                    var e = Math.sin(t),
	                        i = Math.cos(t);
	                    return [(2 * i + 1) / 3, (-Math.sqrt(3) * e - i + 1) / 3, (Math.sqrt(3) * e - i + 1) / 3]
	                }(i.paint.get("raster-hue-rotate"))), s.uniform1f(c.uniforms.u_buffer_scale, 1), s.uniform1i(c.uniforms.u_image0, 0), s.uniform1i(c.uniforms.u_image1, 1);
	                for (var h = n.length && n[0].overscaledZ, u = 0, p = n; u < p.length; u += 1) {
	                    var d = p[u];
	                    a.setDepthMode(t.depthModeForSublayer(d.overscaledZ - h, 1 === i.paint.get("raster-opacity") ? Lt.ReadWrite : Lt.ReadOnly, s.LESS));
	                    var f = e.getTile(d),
	                        m = t.transform.calculatePosMatrix(d.toUnwrapped(), !0);
	                    f.registerFadeDuration(i.paint.get("raster-fade-duration")), s.uniformMatrix4fv(c.uniforms.u_matrix, !1, m);
	                    var _ = e.findLoadedParent(d, 0),
	                        g = vi(f, _, e, i, t.transform),
	                        v = void 0,
	                        y = void 0,
	                        x = "nearest" === i.paint.get("raster-resampling") ? s.NEAREST : s.LINEAR;
	                    if (a.activeTexture.set(s.TEXTURE0), f.texture.bind(x, s.CLAMP_TO_EDGE, s.LINEAR_MIPMAP_NEAREST), a.activeTexture.set(s.TEXTURE1), _ ? (_.texture.bind(x, s.CLAMP_TO_EDGE, s.LINEAR_MIPMAP_NEAREST), v = Math.pow(2, _.tileID.overscaledZ - f.tileID.overscaledZ), y = [f.tileID.canonical.x * v % 1, f.tileID.canonical.y * v % 1]) : f.texture.bind(x, s.CLAMP_TO_EDGE, s.LINEAR_MIPMAP_NEAREST), s.uniform2fv(c.uniforms.u_tl_parent, y || [0, 0]), s.uniform1f(c.uniforms.u_scale_parent, v || 1), s.uniform1f(c.uniforms.u_fade_t, g.mix), s.uniform1f(c.uniforms.u_opacity, g.opacity * i.paint.get("raster-opacity")), l instanceof X) {
	                        var b = l.boundsBuffer;
	                        l.boundsVAO.bind(a, c, b, []), s.drawArrays(s.TRIANGLE_STRIP, 0, b.length);
	                    } else if (f.maskedBoundsBuffer && f.maskedIndexBuffer && f.segments) c.draw(a, s.TRIANGLES, i.id, f.maskedBoundsBuffer, f.maskedIndexBuffer, f.segments);
	                    else {
	                        var w = t.rasterBoundsBuffer;
	                        t.rasterBoundsVAO.bind(a, c, w, []), s.drawArrays(s.TRIANGLE_STRIP, 0, w.length);
	                    }
	                }
	            }
	        },
	        background: function(t, e, i) {
	            var n = i.paint.get("background-color"),
	                o = i.paint.get("background-opacity");
	            if (0 !== o) {
	                var r = t.context,
	                    a = r.gl,
	                    s = t.transform,
	                    l = s.tileSize,
	                    c = i.paint.get("background-pattern"),
	                    h = c || 1 !== n.a || 1 !== o ? "translucent" : "opaque";
	                if (t.renderPass === h) {
	                    var u;
	                    if (r.setStencilMode(kt.disabled), r.setDepthMode(t.depthModeForSublayer(0, "opaque" === h ? Lt.ReadWrite : Lt.ReadOnly)), r.setColorMode(t.colorModeForRenderPass()), c) {
	                        if (li(c, t)) return;
	                        u = t.useProgram("backgroundPattern"), ci(c, t, u), t.tileExtentPatternVAO.bind(r, u, t.tileExtentBuffer, []);
	                    } else u = t.useProgram("background"), a.uniform4f(u.uniforms.u_color, n.r, n.g, n.b, n.a), t.tileExtentVAO.bind(r, u, t.tileExtentBuffer, []);
	                    a.uniform1f(u.uniforms.u_opacity, o);
	                    for (var p = 0, d = s.coveringTiles({
	                            tileSize: l
	                        }); p < d.length; p += 1) {
	                        var f = d[p];
	                        c && hi({
	                            tileID: f,
	                            tileSize: l
	                        }, t, u), a.uniformMatrix4fv(u.uniforms.u_matrix, !1, t.transform.calculatePosMatrix(f.toUnwrapped())), a.drawArrays(a.TRIANGLE_STRIP, 0, t.tileExtentBuffer.length);
	                    }
	                }
	            }
	        },
	        debug: function(t, e, i) {
	            for (var n = 0; n < i.length; n++) yi(t, e, i[n]);
	        }
	    },
	    wi = function(e, i) {
	        this.context = new Ot(e), this.transform = i, this._tileTextures = {}, this.setup(), this.numSublayers = Ft.maxUnderzooming + Ft.maxOverzooming + 1, this.depthEpsilon = 1 / Math.pow(2, 16), this.depthRboNeedsClear = !0, this.emptyProgramConfiguration = new t.ProgramConfiguration, this.crossTileSymbolIndex = new Ue;
	    };

	function Ei(t, e) {
	    if (t.row > e.row) {
	        var i = t;
	        t = e, e = i;
	    }
	    return {
	        x0: t.column,
	        y0: t.row,
	        x1: e.column,
	        y1: e.row,
	        dx: e.column - t.column,
	        dy: e.row - t.row
	    }
	}

	function Ti(t, e, i, n, o) {
	    var r = Math.max(i, Math.floor(e.y0)),
	        a = Math.min(n, Math.ceil(e.y1));
	    if (t.x0 === e.x0 && t.y0 === e.y0 ? t.x0 + e.dy / t.dy * t.dx < e.x1 : t.x1 - e.dy / t.dy * t.dx < e.x0) {
	        var s = t;
	        t = e, e = s;
	    }
	    for (var l = t.dx / t.dy, c = e.dx / e.dy, h = t.dx > 0, u = e.dx < 0, p = r; p < a; p++) {
	        var d = l * Math.max(0, Math.min(t.dy, p + h - t.y0)) + t.x0,
	            f = c * Math.max(0, Math.min(e.dy, p + u - e.y0)) + e.x0;
	        o(Math.floor(f), Math.ceil(d), p);
	    }
	}

	function Ii(t, e, i, n, o, r) {
	    var a, s = Ei(t, e),
	        l = Ei(e, i),
	        c = Ei(i, t);
	    s.dy > l.dy && (a = s, s = l, l = a), s.dy > c.dy && (a = s, s = c, c = a), l.dy > c.dy && (a = l, l = c, c = a), s.dy && Ti(c, s, n, o, r), l.dy && Ti(c, l, n, o, r);
	}
	wi.prototype.resize = function(e, i) {
	    var n = this.context.gl;
	    if (this.width = e * t.browser.devicePixelRatio, this.height = i * t.browser.devicePixelRatio, this.context.viewport.set([0, 0, this.width, this.height]), this.style)
	        for (var o = 0, r = this.style._order; o < r.length; o += 1) {
	            var a = r[o];
	            this.style._layers[a].resize();
	        }
	    this.depthRbo && (n.deleteRenderbuffer(this.depthRbo), this.depthRbo = null);
	}, wi.prototype.setup = function() {
	    var e = this.context,
	        i = new t.StructArrayLayout2i4;
	    i.emplaceBack(0, 0), i.emplaceBack(t.EXTENT, 0), i.emplaceBack(0, t.EXTENT), i.emplaceBack(t.EXTENT, t.EXTENT), this.tileExtentBuffer = e.createVertexBuffer(i, Ge.members), this.tileExtentVAO = new W, this.tileExtentPatternVAO = new W;
	    var n = new t.StructArrayLayout2i4;
	    n.emplaceBack(0, 0), n.emplaceBack(t.EXTENT, 0), n.emplaceBack(t.EXTENT, t.EXTENT), n.emplaceBack(0, t.EXTENT), n.emplaceBack(0, 0), this.debugBuffer = e.createVertexBuffer(n, Ge.members), this.debugVAO = new W;
	    var o = new t.StructArrayLayout4i8;
	    o.emplaceBack(0, 0, 0, 0), o.emplaceBack(t.EXTENT, 0, t.EXTENT, 0), o.emplaceBack(0, t.EXTENT, 0, t.EXTENT), o.emplaceBack(t.EXTENT, t.EXTENT, t.EXTENT, t.EXTENT), this.rasterBoundsBuffer = e.createVertexBuffer(o, t.rasterBoundsAttributes.members), this.rasterBoundsVAO = new W;
	    var r = new t.StructArrayLayout2i4;
	    r.emplaceBack(0, 0), r.emplaceBack(1, 0), r.emplaceBack(0, 1), r.emplaceBack(1, 1), this.viewportBuffer = e.createVertexBuffer(r, Ge.members), this.viewportVAO = new W;
	}, wi.prototype.clearStencil = function() {
	    var e = this.context,
	        i = e.gl;
	    e.setColorMode(Bt.disabled), e.setDepthMode(Lt.disabled), e.setStencilMode(new kt({
	        func: i.ALWAYS,
	        mask: 0
	    }, 0, 255, i.ZERO, i.ZERO, i.ZERO));
	    var n = t.create();
	    t.ortho(n, 0, this.width, this.height, 0, 0, 1), t.scale(n, n, [i.drawingBufferWidth, i.drawingBufferHeight, 0]);
	    var o = this.useProgram("clippingMask");
	    i.uniformMatrix4fv(o.uniforms.u_matrix, !1, n), this.viewportVAO.bind(e, o, this.viewportBuffer, []), i.drawArrays(i.TRIANGLE_STRIP, 0, 4);
	}, wi.prototype._renderTileClippingMasks = function(t) {
	    var e = this.context,
	        i = e.gl;
	    e.setColorMode(Bt.disabled), e.setDepthMode(Lt.disabled);
	    var n = 1;
	    this._tileClippingMaskIDs = {};
	    for (var o = 0, r = t; o < r.length; o += 1) {
	        var a = r[o],
	            s = this._tileClippingMaskIDs[a.key] = n++;
	        e.setStencilMode(new kt({
	            func: i.ALWAYS,
	            mask: 0
	        }, s, 255, i.KEEP, i.KEEP, i.REPLACE));
	        var l = this.useProgram("clippingMask");
	        i.uniformMatrix4fv(l.uniforms.u_matrix, !1, a.posMatrix), this.tileExtentVAO.bind(this.context, l, this.tileExtentBuffer, []), i.drawArrays(i.TRIANGLE_STRIP, 0, this.tileExtentBuffer.length);
	    }
	}, wi.prototype.stencilModeForClipping = function(t) {
	    var e = this.context.gl;
	    return new kt({
	        func: e.EQUAL,
	        mask: 255
	    }, this._tileClippingMaskIDs[t.key], 0, e.KEEP, e.KEEP, e.REPLACE)
	}, wi.prototype.colorModeForRenderPass = function() {
	    var e = this.context.gl;
	    if (this._showOverdrawInspector) {
	        return new Bt([e.CONSTANT_COLOR, e.ONE], new t.Color(1 / 8, 1 / 8, 1 / 8, 0), [!0, !0, !0, !0])
	    }
	    return "opaque" === this.renderPass ? Bt.unblended : Bt.alphaBlended
	}, wi.prototype.depthModeForSublayer = function(t, e, i) {
	    var n = 1 - ((1 + this.currentLayer) * this.numSublayers + t) * this.depthEpsilon,
	        o = n - 1 + this.depthRange;
	    return new Lt(i || this.context.gl.LEQUAL, e, [o, n])
	}, wi.prototype.render = function(e, i) {
	    this.style = e, this.options = i, this.lineAtlas = e.lineAtlas, this.imageManager = e.imageManager, this.glyphManager = e.glyphManager, this.symbolFadeChange = e.placement.symbolFadeChange(t.browser.now());
	    var n = this.style._order,
	        o = this.style.sourceCaches;
	    for (var r in o) {
	        var a = o[r];
	        a.used && a.prepare(this.context);
	    }
	    var s, l = {},
	        c = {},
	        h = {};
	    for (var u in o) {
	        var p = o[u];
	        l[u] = p.getVisibleCoordinates(), c[u] = l[u].slice().reverse(), h[u] = p.getVisibleCoordinates(!0).reverse();
	    }
	    for (var d in o) {
	        var f = o[d],
	            m = f.getSource();
	        if ("raster" === m.type || "raster-dem" === m.type) {
	            for (var _ = [], g = 0, v = l[d]; g < v.length; g += 1) {
	                var y = v[g];
	                _.push(f.getTile(y));
	            }
	            Qe(_, this.context);
	        }
	    }
	    this.renderPass = "offscreen", this.depthRboNeedsClear = !0;
	    for (var x = 0, b = n; x < b.length; x += 1) {
	        var w = b[x],
	            E = this.style._layers[w];
	        if (E.hasOffscreenPass() && !E.isHidden(this.transform.zoom)) {
	            var T = c[E.source];
	            T.length && this.renderLayer(this, o[E.source], E, T);
	        }
	    }
	    for (this.context.bindFramebuffer.set(null), this.context.clear({
	            color: i.showOverdrawInspector ? t.Color.black : t.Color.transparent,
	            depth: 1
	        }), this._showOverdrawInspector = i.showOverdrawInspector, this.depthRange = (e._order.length + 2) * this.numSublayers * this.depthEpsilon, this.renderPass = "opaque", this.currentLayer = n.length - 1; this.currentLayer >= 0; this.currentLayer--) {
	        var I = this.style._layers[n[this.currentLayer]],
	            S = o[I.source],
	            C = l[I.source];
	        I.source !== s && S && (this.clearStencil(), S.getSource().isTileClipped && this._renderTileClippingMasks(C)), this.renderLayer(this, S, I, C), s = I.source;
	    }
	    for (this.renderPass = "translucent", this.currentLayer = 0, s = null; this.currentLayer < n.length; this.currentLayer++) {
	        var z = this.style._layers[n[this.currentLayer]],
	            P = o[z.source],
	            A = ("symbol" === z.type ? h : c)[z.source];
	        z.source !== s && P && (this.clearStencil(), P.getSource().isTileClipped && this._renderTileClippingMasks(l[z.source])), this.renderLayer(this, P, z, A), s = z.source;
	    }
	    if (this.options.showTileBoundaries)
	        for (var D in o) {
	            bi.debug(this, o[D], l[D]);
	            break
	        }
	}, wi.prototype.setupOffscreenDepthRenderbuffer = function() {
	    var t = this.context;
	    this.depthRbo || (this.depthRbo = t.createRenderbuffer(t.gl.DEPTH_COMPONENT16, this.width, this.height));
	}, wi.prototype.renderLayer = function(t, e, i, n) {
	    i.isHidden(this.transform.zoom) || ("background" === i.type || n.length) && (this.id = i.id, bi[i.type](t, e, i, n));
	}, wi.prototype.translatePosMatrix = function(e, i, n, o, r) {
	    if (!n[0] && !n[1]) return e;
	    var a = r ? "map" === o ? this.transform.angle : 0 : "viewport" === o ? -this.transform.angle : 0;
	    if (a) {
	        var s = Math.sin(a),
	            l = Math.cos(a);
	        n = [n[0] * l - n[1] * s, n[0] * s + n[1] * l];
	    }
	    var c = [r ? n[0] : ye(i, n[0], this.transform.zoom), r ? n[1] : ye(i, n[1], this.transform.zoom), 0],
	        h = new Float32Array(16);
	    return t.translate(h, e, c), h
	}, wi.prototype.saveTileTexture = function(t) {
	    var e = this._tileTextures[t.size[0]];
	    e ? e.push(t) : this._tileTextures[t.size[0]] = [t];
	}, wi.prototype.getTileTexture = function(t) {
	    var e = this._tileTextures[t];
	    return e && e.length > 0 ? e.pop() : null
	}, wi.prototype._createProgramCached = function(t, e) {
	    this.cache = this.cache || {};
	    var i = "" + t + (e.cacheKey || "") + (this._showOverdrawInspector ? "/overdraw" : "");
	    return this.cache[i] || (this.cache[i] = new Je(this.context, Ye[t], e, this._showOverdrawInspector)), this.cache[i]
	}, wi.prototype.useProgram = function(t, e) {
	    var i = this._createProgramCached(t, e || this.emptyProgramConfiguration);
	    return this.context.program.set(i.program), i
	};
	var Si = function(t, e, i) {
	        this.tileSize = 512, this.maxValidLatitude = 85.051129, this._renderWorldCopies = void 0 === i || i, this._minZoom = t || 0, this._maxZoom = e || 22, this.setMaxBounds(), this.width = 0, this.height = 0, this._center = new N(0, 0), this.zoom = 0, this.angle = 0, this._fov = .6435011087932844, this._pitch = 0, this._unmodified = !0, this._posMatrixCache = {}, this._alignedPosMatrixCache = {};
	    },
	    Ci = {
	        minZoom: {
	            configurable: !0
	        },
	        maxZoom: {
	            configurable: !0
	        },
	        renderWorldCopies: {
	            configurable: !0
	        },
	        worldSize: {
	            configurable: !0
	        },
	        centerPoint: {
	            configurable: !0
	        },
	        size: {
	            configurable: !0
	        },
	        bearing: {
	            configurable: !0
	        },
	        pitch: {
	            configurable: !0
	        },
	        fov: {
	            configurable: !0
	        },
	        zoom: {
	            configurable: !0
	        },
	        center: {
	            configurable: !0
	        },
	        unmodified: {
	            configurable: !0
	        },
	        x: {
	            configurable: !0
	        },
	        y: {
	            configurable: !0
	        },
	        point: {
	            configurable: !0
	        }
	    };
	Si.prototype.clone = function() {
	    var t = new Si(this._minZoom, this._maxZoom, this._renderWorldCopies);
	    return t.tileSize = this.tileSize, t.latRange = this.latRange, t.width = this.width, t.height = this.height, t._center = this._center, t.zoom = this.zoom, t.angle = this.angle, t._fov = this._fov, t._pitch = this._pitch, t._unmodified = this._unmodified, t._calcMatrices(), t
	}, Ci.minZoom.get = function() {
	    return this._minZoom
	}, Ci.minZoom.set = function(t) {
	    this._minZoom !== t && (this._minZoom = t, this.zoom = Math.max(this.zoom, t));
	}, Ci.maxZoom.get = function() {
	    return this._maxZoom
	}, Ci.maxZoom.set = function(t) {
	    this._maxZoom !== t && (this._maxZoom = t, this.zoom = Math.min(this.zoom, t));
	}, Ci.renderWorldCopies.get = function() {
	    return this._renderWorldCopies
	}, Ci.renderWorldCopies.set = function(t) {
	    void 0 === t ? t = !0 : null === t && (t = !1), this._renderWorldCopies = t;
	}, Ci.worldSize.get = function() {
	    return this.tileSize * this.scale
	}, Ci.centerPoint.get = function() {
	    return this.size._div(2)
	}, Ci.size.get = function() {
	    return new t.Point(this.width, this.height)
	}, Ci.bearing.get = function() {
	    return -this.angle / Math.PI * 180
	}, Ci.bearing.set = function(e) {
	    var i = -t.wrap(e, -180, 180) * Math.PI / 180;
	    this.angle !== i && (this._unmodified = !1, this.angle = i, this._calcMatrices(), this.rotationMatrix = t.create$4(), t.rotate(this.rotationMatrix, this.rotationMatrix, this.angle));
	}, Ci.pitch.get = function() {
	    return this._pitch / Math.PI * 180
	}, Ci.pitch.set = function(e) {
	    var i = t.clamp(e, 0, 60) / 180 * Math.PI;
	    this._pitch !== i && (this._unmodified = !1, this._pitch = i, this._calcMatrices());
	}, Ci.fov.get = function() {
	    return this._fov / Math.PI * 180
	}, Ci.fov.set = function(t) {
	    t = Math.max(.01, Math.min(60, t)), this._fov !== t && (this._unmodified = !1, this._fov = t / 180 * Math.PI, this._calcMatrices());
	}, Ci.zoom.get = function() {
	    return this._zoom
	}, Ci.zoom.set = function(t) {
	    var e = Math.min(Math.max(t, this.minZoom), this.maxZoom);
	    this._zoom !== e && (this._unmodified = !1, this._zoom = e, this.scale = this.zoomScale(e), this.tileZoom = Math.floor(e), this.zoomFraction = e - this.tileZoom, this._constrain(), this._calcMatrices());
	}, Ci.center.get = function() {
	    return this._center
	}, Ci.center.set = function(t) {
	    t.lat === this._center.lat && t.lng === this._center.lng || (this._unmodified = !1, this._center = t, this._constrain(), this._calcMatrices());
	}, Si.prototype.coveringZoomLevel = function(t) {
	    return (t.roundZoom ? Math.round : Math.floor)(this.zoom + this.scaleZoom(this.tileSize / t.tileSize))
	}, Si.prototype.getVisibleUnwrappedCoordinates = function(e) {
	    var i = this.pointCoordinate(new t.Point(0, 0), 0),
	        n = this.pointCoordinate(new t.Point(this.width, 0), 0),
	        o = Math.floor(i.column),
	        r = Math.floor(n.column),
	        a = [new t.UnwrappedTileID(0, e)];
	    if (this._renderWorldCopies)
	        for (var s = o; s <= r; s++) 0 !== s && a.push(new t.UnwrappedTileID(s, e));
	    return a
	}, Si.prototype.coveringTiles = function(e) {
	    var i = this.coveringZoomLevel(e),
	        n = i;
	    if (void 0 !== e.minzoom && i < e.minzoom) return [];
	    void 0 !== e.maxzoom && i > e.maxzoom && (i = e.maxzoom);
	    var o = this.pointCoordinate(this.centerPoint, i),
	        r = new t.Point(o.column - .5, o.row - .5);
	    return function(e, i, n, o) {
	        void 0 === o && (o = !0);
	        var r = 1 << e,
	            a = {};

	        function s(i, s, l) {
	            var c, h, u, p;
	            if (l >= 0 && l <= r)
	                for (c = i; c < s; c++) h = Math.floor(c / r), u = (c % r + r) % r, 0 !== h && !0 !== o || (p = new t.OverscaledTileID(n, h, e, u, l), a[p.key] = p);
	        }
	        return Ii(i[0], i[1], i[2], 0, r, s), Ii(i[2], i[3], i[0], 0, r, s), Object.keys(a).map(function(t) {
	            return a[t]
	        })
	    }(i, [this.pointCoordinate(new t.Point(0, 0), i), this.pointCoordinate(new t.Point(this.width, 0), i), this.pointCoordinate(new t.Point(this.width, this.height), i), this.pointCoordinate(new t.Point(0, this.height), i)], e.reparseOverscaled ? n : i, this._renderWorldCopies).sort(function(t, e) {
	        return r.dist(t.canonical) - r.dist(e.canonical)
	    })
	}, Si.prototype.resize = function(t, e) {
	    this.width = t, this.height = e, this.pixelsToGLUnits = [2 / t, -2 / e], this._constrain(), this._calcMatrices();
	}, Ci.unmodified.get = function() {
	    return this._unmodified
	}, Si.prototype.zoomScale = function(t) {
	    return Math.pow(2, t)
	}, Si.prototype.scaleZoom = function(t) {
	    return Math.log(t) / Math.LN2
	}, Si.prototype.project = function(e) {
	    return new t.Point(this.lngX(e.lng), this.latY(e.lat))
	}, Si.prototype.unproject = function(t) {
	    return new N(this.xLng(t.x), this.yLat(t.y))
	}, Ci.x.get = function() {
	    return this.lngX(this.center.lng)
	}, Ci.y.get = function() {
	    return this.latY(this.center.lat)
	}, Ci.point.get = function() {
	    return new t.Point(this.x, this.y)
	}, Si.prototype.lngX = function(t) {
	    return (180 + t) * this.worldSize / 360
	}, Si.prototype.latY = function(e) {
	    return e = t.clamp(e, -this.maxValidLatitude, this.maxValidLatitude), (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + e * Math.PI / 360))) * this.worldSize / 360
	}, Si.prototype.xLng = function(t) {
	    return 360 * t / this.worldSize - 180
	}, Si.prototype.yLat = function(t) {
	    var e = 180 - 360 * t / this.worldSize;
	    return 360 / Math.PI * Math.atan(Math.exp(e * Math.PI / 180)) - 90
	}, Si.prototype.setLocationAtPoint = function(t, e) {
	    var i = this.pointCoordinate(e)._sub(this.pointCoordinate(this.centerPoint));
	    this.center = this.coordinateLocation(this.locationCoordinate(t)._sub(i)), this._renderWorldCopies && (this.center = this.center.wrap());
	}, Si.prototype.locationPoint = function(t) {
	    return this.coordinatePoint(this.locationCoordinate(t))
	}, Si.prototype.pointLocation = function(t) {
	    return this.coordinateLocation(this.pointCoordinate(t))
	}, Si.prototype.locationCoordinate = function(e) {
	    return new t.Coordinate(this.lngX(e.lng) / this.tileSize, this.latY(e.lat) / this.tileSize, this.zoom).zoomTo(this.tileZoom)
	}, Si.prototype.coordinateLocation = function(t) {
	    var e = t.zoomTo(this.zoom);
	    return new N(this.xLng(e.column * this.tileSize), this.yLat(e.row * this.tileSize))
	}, Si.prototype.pointCoordinate = function(e, i) {
	    void 0 === i && (i = this.tileZoom);
	    var n = [e.x, e.y, 0, 1],
	        o = [e.x, e.y, 1, 1];
	    t.transformMat4(n, n, this.pixelMatrixInverse), t.transformMat4(o, o, this.pixelMatrixInverse);
	    var r = n[3],
	        a = o[3],
	        s = n[0] / r,
	        l = o[0] / a,
	        c = n[1] / r,
	        h = o[1] / a,
	        u = n[2] / r,
	        p = o[2] / a,
	        d = u === p ? 0 : (0 - u) / (p - u);
	    return new t.Coordinate(t.number(s, l, d) / this.tileSize, t.number(c, h, d) / this.tileSize, this.zoom)._zoomTo(i)
	}, Si.prototype.coordinatePoint = function(e) {
	    var i = e.zoomTo(this.zoom),
	        n = [i.column * this.tileSize, i.row * this.tileSize, 0, 1];
	    return t.transformMat4(n, n, this.pixelMatrix), new t.Point(n[0] / n[3], n[1] / n[3])
	}, Si.prototype.getBounds = function() {
	    return (new U).extend(this.pointLocation(new t.Point(0, 0))).extend(this.pointLocation(new t.Point(this.width, 0))).extend(this.pointLocation(new t.Point(this.width, this.height))).extend(this.pointLocation(new t.Point(0, this.height)))
	}, Si.prototype.getMaxBounds = function() {
	    return this.latRange && 2 === this.latRange.length && this.lngRange && 2 === this.lngRange.length ? new U([this.lngRange[0], this.latRange[0]], [this.lngRange[1], this.latRange[1]]) : null
	}, Si.prototype.setMaxBounds = function(t) {
	    t ? (this.lngRange = [t.getWest(), t.getEast()], this.latRange = [t.getSouth(), t.getNorth()], this._constrain()) : (this.lngRange = null, this.latRange = [-this.maxValidLatitude, this.maxValidLatitude]);
	}, Si.prototype.calculatePosMatrix = function(e, i) {
	    void 0 === i && (i = !1);
	    var n = e.key,
	        o = i ? this._alignedPosMatrixCache : this._posMatrixCache;
	    if (o[n]) return o[n];
	    var r = e.canonical,
	        a = this.worldSize / this.zoomScale(r.z),
	        s = r.x + Math.pow(2, r.z) * e.wrap,
	        l = t.identity(new Float64Array(16));
	    return t.translate(l, l, [s * a, r.y * a, 0]), t.scale(l, l, [a / t.EXTENT, a / t.EXTENT, 1]), t.multiply(l, i ? this.alignedProjMatrix : this.projMatrix, l), o[n] = new Float32Array(l), o[n]
	}, Si.prototype._constrain = function() {
	    if (this.center && this.width && this.height && !this._constraining) {
	        this._constraining = !0;
	        var e, i, n, o, r = -90,
	            a = 90,
	            s = -180,
	            l = 180,
	            c = this.size,
	            h = this._unmodified;
	        if (this.latRange) {
	            var u = this.latRange;
	            r = this.latY(u[1]), e = (a = this.latY(u[0])) - r < c.y ? c.y / (a - r) : 0;
	        }
	        if (this.lngRange) {
	            var p = this.lngRange;
	            s = this.lngX(p[0]), i = (l = this.lngX(p[1])) - s < c.x ? c.x / (l - s) : 0;
	        }
	        var d = Math.max(i || 0, e || 0);
	        if (d) return this.center = this.unproject(new t.Point(i ? (l + s) / 2 : this.x, e ? (a + r) / 2 : this.y)), this.zoom += this.scaleZoom(d), this._unmodified = h, void(this._constraining = !1);
	        if (this.latRange) {
	            var f = this.y,
	                m = c.y / 2;
	            f - m < r && (o = r + m), f + m > a && (o = a - m);
	        }
	        if (this.lngRange) {
	            var _ = this.x,
	                g = c.x / 2;
	            _ - g < s && (n = s + g), _ + g > l && (n = l - g);
	        }
	        void 0 === n && void 0 === o || (this.center = this.unproject(new t.Point(void 0 !== n ? n : this.x, void 0 !== o ? o : this.y))), this._unmodified = h, this._constraining = !1;
	    }
	}, Si.prototype._calcMatrices = function() {
	    if (this.height) {
	        this.cameraToCenterDistance = .5 / Math.tan(this._fov / 2) * this.height;
	        var e = this._fov / 2,
	            i = Math.PI / 2 + this._pitch,
	            n = Math.sin(e) * this.cameraToCenterDistance / Math.sin(Math.PI - i - e),
	            o = this.x,
	            r = this.y,
	            a = 1.01 * (Math.cos(Math.PI / 2 - this._pitch) * n + this.cameraToCenterDistance),
	            s = new Float64Array(16);
	        t.perspective(s, this._fov, this.width / this.height, 1, a), t.scale(s, s, [1, -1, 1]), t.translate(s, s, [0, 0, -this.cameraToCenterDistance]), t.rotateX(s, s, this._pitch), t.rotateZ(s, s, this.angle), t.translate(s, s, [-o, -r, 0]);
	        var l = this.worldSize / (2 * Math.PI * 6378137 * Math.abs(Math.cos(this.center.lat * (Math.PI / 180))));
	        t.scale(s, s, [1, 1, l, 1]), this.projMatrix = s;
	        var c = this.width % 2 / 2,
	            h = this.height % 2 / 2,
	            u = Math.cos(this.angle),
	            p = Math.sin(this.angle),
	            d = o - Math.round(o) + u * c + p * h,
	            f = r - Math.round(r) + u * h + p * c,
	            m = new Float64Array(s);
	        if (t.translate(m, m, [d > .5 ? d - 1 : d, f > .5 ? f - 1 : f, 0]), this.alignedProjMatrix = m, s = t.create(), t.scale(s, s, [this.width / 2, -this.height / 2, 1]), t.translate(s, s, [1, -1, 0]), this.pixelMatrix = t.multiply(new Float64Array(16), s, this.projMatrix), !(s = t.invert(new Float64Array(16), this.pixelMatrix))) throw new Error("failed to invert matrix");
	        this.pixelMatrixInverse = s, this._posMatrixCache = {}, this._alignedPosMatrixCache = {};
	    }
	}, Si.prototype.maxPitchScaleFactor = function() {
	    if (!this.pixelMatrixInverse) return 1;
	    var e = this.pointCoordinate(new t.Point(0, 0)).zoomTo(this.zoom),
	        i = [e.column * this.tileSize, e.row * this.tileSize, 0, 1];
	    return t.transformMat4(i, i, this.pixelMatrix)[3] / this.cameraToCenterDistance
	}, Object.defineProperties(Si.prototype, Ci);
	var zi = function() {
	    var e, i, n, o, r;
	    t.bindAll(["_onHashChange", "_updateHash"], this), this._updateHash = (e = this._updateHashUnthrottled.bind(this), i = 300, n = !1, o = 0, r = function() {
	        o = 0, n && (e(), o = setTimeout(r, i), n = !1);
	    }, function() {
	        return n = !0, o || r(), o
	    });
	};
	zi.prototype.addTo = function(e) {
	    return this._map = e, t.window.addEventListener("hashchange", this._onHashChange, !1), this._map.on("moveend", this._updateHash), this
	}, zi.prototype.remove = function() {
	    return t.window.removeEventListener("hashchange", this._onHashChange, !1), this._map.off("moveend", this._updateHash), clearTimeout(this._updateHash()), delete this._map, this
	}, zi.prototype.getHashString = function(t) {
	    var e = this._map.getCenter(),
	        i = Math.round(100 * this._map.getZoom()) / 100,
	        n = Math.ceil((i * Math.LN2 + Math.log(512 / 360 / .5)) / Math.LN10),
	        o = Math.pow(10, n),
	        r = Math.round(e.lng * o) / o,
	        a = Math.round(e.lat * o) / o,
	        s = this._map.getBearing(),
	        l = this._map.getPitch(),
	        c = "";
	    return c += t ? "#/" + r + "/" + a + "/" + i : "#" + i + "/" + a + "/" + r, (s || l) && (c += "/" + Math.round(10 * s) / 10), l && (c += "/" + Math.round(l)), c
	}, zi.prototype._onHashChange = function() {
	    var e = t.window.location.hash.replace("#", "").split("/");
	    return e.length >= 3 && (this._map.jumpTo({
	        center: [+e[2], +e[1]],
	        zoom: +e[0],
	        bearing: +(e[3] || 0),
	        pitch: +(e[4] || 0)
	    }), !0)
	}, zi.prototype._updateHashUnthrottled = function() {
	    var e = this.getHashString();
	    t.window.history.replaceState(t.window.history.state, "", e);
	};
	var Pi = function(e) {
	        function n(n, o, r, a) {
	            void 0 === a && (a = {});
	            var s = i.mousePos(o.getCanvasContainer(), r),
	                l = o.unproject(s);
	            e.call(this, n, t.extend({
	                point: s,
	                lngLat: l,
	                originalEvent: r
	            }, a)), this._defaultPrevented = !1, this.target = o;
	        }
	        e && (n.__proto__ = e), n.prototype = Object.create(e && e.prototype), n.prototype.constructor = n;
	        var o = {
	            defaultPrevented: {
	                configurable: !0
	            }
	        };
	        return n.prototype.preventDefault = function() {
	            this._defaultPrevented = !0;
	        }, o.defaultPrevented.get = function() {
	            return this._defaultPrevented
	        }, Object.defineProperties(n.prototype, o), n
	    }(t.Event),
	    Ai = function(e) {
	        function n(n, o, r) {
	            var a = i.touchPos(o.getCanvasContainer(), r),
	                s = a.map(function(t) {
	                    return o.unproject(t)
	                }),
	                l = a.reduce(function(t, e, i, n) {
	                    return t.add(e.div(n.length))
	                }, new t.Point(0, 0)),
	                c = o.unproject(l);
	            e.call(this, n, {
	                points: a,
	                point: l,
	                lngLats: s,
	                lngLat: c,
	                originalEvent: r
	            }), this._defaultPrevented = !1;
	        }
	        e && (n.__proto__ = e), n.prototype = Object.create(e && e.prototype), n.prototype.constructor = n;
	        var o = {
	            defaultPrevented: {
	                configurable: !0
	            }
	        };
	        return n.prototype.preventDefault = function() {
	            this._defaultPrevented = !0;
	        }, o.defaultPrevented.get = function() {
	            return this._defaultPrevented
	        }, Object.defineProperties(n.prototype, o), n
	    }(t.Event),
	    Di = function(t) {
	        function e(e, i, n) {
	            t.call(this, e, {
	                originalEvent: n
	            }), this._defaultPrevented = !1;
	        }
	        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
	        var i = {
	            defaultPrevented: {
	                configurable: !0
	            }
	        };
	        return e.prototype.preventDefault = function() {
	            this._defaultPrevented = !0;
	        }, i.defaultPrevented.get = function() {
	            return this._defaultPrevented
	        }, Object.defineProperties(e.prototype, i), e
	    }(t.Event),
	    Ri = function(e) {
	        this._map = e, this._el = e.getCanvasContainer(), this._delta = 0, t.bindAll(["_onWheel", "_onTimeout", "_onScrollFrame", "_onScrollFinished"], this);
	    };
	Ri.prototype.isEnabled = function() {
	    return !!this._enabled
	}, Ri.prototype.isActive = function() {
	    return !!this._active
	}, Ri.prototype.enable = function(t) {
	    this.isEnabled() || (this._enabled = !0, this._aroundCenter = t && "center" === t.around);
	}, Ri.prototype.disable = function() {
	    this.isEnabled() && (this._enabled = !1);
	}, Ri.prototype.onWheel = function(e) {
	    if (this.isEnabled()) {
	        var i = e.deltaMode === t.window.WheelEvent.DOM_DELTA_LINE ? 40 * e.deltaY : e.deltaY,
	            n = t.browser.now(),
	            o = n - (this._lastWheelEventTime || 0);
	        this._lastWheelEventTime = n, 0 !== i && i % 4.000244140625 == 0 ? this._type = "wheel" : 0 !== i && Math.abs(i) < 4 ? this._type = "trackpad" : o > 400 ? (this._type = null, this._lastValue = i, this._timeout = setTimeout(this._onTimeout, 40, e)) : this._type || (this._type = Math.abs(o * i) < 200 ? "trackpad" : "wheel", this._timeout && (clearTimeout(this._timeout), this._timeout = null, i += this._lastValue)), e.shiftKey && i && (i /= 4), this._type && (this._lastWheelEvent = e, this._delta -= i, this.isActive() || this._start(e)), e.preventDefault();
	    }
	}, Ri.prototype._onTimeout = function(t) {
	    this._type = "wheel", this._delta -= this._lastValue, this.isActive() || this._start(t);
	}, Ri.prototype._start = function(e) {
	    if (this._delta) {
	        this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), this._active = !0, this._map.fire(new t.Event("movestart", {
	            originalEvent: e
	        })), this._map.fire(new t.Event("zoomstart", {
	            originalEvent: e
	        })), this._finishTimeout && clearTimeout(this._finishTimeout);
	        var n = i.mousePos(this._el, e);
	        this._around = N.convert(this._aroundCenter ? this._map.getCenter() : this._map.unproject(n)), this._aroundPoint = this._map.transform.locationPoint(this._around), this._frameId || (this._frameId = this._map._requestRenderFrame(this._onScrollFrame));
	    }
	}, Ri.prototype._onScrollFrame = function() {
	    var e = this;
	    if (this._frameId = null, this.isActive()) {
	        var i = this._map.transform;
	        if (0 !== this._delta) {
	            var n = "wheel" === this._type && Math.abs(this._delta) > 4.000244140625 ? 1 / 450 : .01,
	                o = 2 / (1 + Math.exp(-Math.abs(this._delta * n)));
	            this._delta < 0 && 0 !== o && (o = 1 / o);
	            var r = "number" == typeof this._targetZoom ? i.zoomScale(this._targetZoom) : i.scale;
	            this._targetZoom = Math.min(i.maxZoom, Math.max(i.minZoom, i.scaleZoom(r * o))), "wheel" === this._type && (this._startZoom = i.zoom, this._easing = this._smoothOutEasing(200)), this._delta = 0;
	        }
	        var a = "number" == typeof this._targetZoom ? this._targetZoom : i.zoom,
	            s = this._startZoom,
	            l = this._easing,
	            c = !1;
	        if ("wheel" === this._type && s && l) {
	            var h = Math.min((t.browser.now() - this._lastWheelEventTime) / 200, 1),
	                u = l(h);
	            i.zoom = t.number(s, a, u), h < 1 ? this._frameId || (this._frameId = this._map._requestRenderFrame(this._onScrollFrame)) : c = !0;
	        } else i.zoom = a, c = !0;
	        i.setLocationAtPoint(this._around, this._aroundPoint), this._map.fire(new t.Event("move", {
	            originalEvent: this._lastWheelEvent
	        })), this._map.fire(new t.Event("zoom", {
	            originalEvent: this._lastWheelEvent
	        })), c && (this._active = !1, this._finishTimeout = setTimeout(function() {
	            e._map.fire(new t.Event("zoomend", {
	                originalEvent: e._lastWheelEvent
	            })), e._map.fire(new t.Event("moveend", {
	                originalEvent: e._lastWheelEvent
	            })), delete e._targetZoom;
	        }, 200));
	    }
	}, Ri.prototype._smoothOutEasing = function(e) {
	    var i = t.ease;
	    if (this._prevEase) {
	        var n = this._prevEase,
	            o = (t.browser.now() - n.start) / n.duration,
	            r = n.easing(o + .01) - n.easing(o),
	            a = .27 / Math.sqrt(r * r + 1e-4) * .01,
	            s = Math.sqrt(.0729 - a * a);
	        i = t.bezier(a, s, .25, 1);
	    }
	    return this._prevEase = {
	        start: t.browser.now(),
	        duration: e,
	        easing: i
	    }, i
	};
	var Mi = function(e, i) {
	    this._map = e, this._el = e.getCanvasContainer(), this._container = e.getContainer(), this._clickTolerance = i.clickTolerance || 1, t.bindAll(["_onMouseMove", "_onMouseUp", "_onKeyDown"], this);
	};
	Mi.prototype.isEnabled = function() {
	    return !!this._enabled
	}, Mi.prototype.isActive = function() {
	    return !!this._active
	}, Mi.prototype.enable = function() {
	    this.isEnabled() || (this._enabled = !0);
	}, Mi.prototype.disable = function() {
	    this.isEnabled() && (this._enabled = !1);
	}, Mi.prototype.onMouseDown = function(e) {
	    this.isEnabled() && e.shiftKey && 0 === e.button && (t.window.document.addEventListener("mousemove", this._onMouseMove, !1), t.window.document.addEventListener("keydown", this._onKeyDown, !1), t.window.document.addEventListener("mouseup", this._onMouseUp, !1), i.disableDrag(), this._startPos = this._lastPos = i.mousePos(this._el, e), this._active = !0);
	}, Mi.prototype._onMouseMove = function(t) {
	    var e = i.mousePos(this._el, t);
	    if (!(this._lastPos.equals(e) || !this._box && e.dist(this._startPos) < this._clickTolerance)) {
	        var n = this._startPos;
	        this._lastPos = e, this._box || (this._box = i.create("div", "mapboxgl-boxzoom", this._container), this._container.classList.add("mapboxgl-crosshair"), this._fireEvent("boxzoomstart", t));
	        var o = Math.min(n.x, e.x),
	            r = Math.max(n.x, e.x),
	            a = Math.min(n.y, e.y),
	            s = Math.max(n.y, e.y);
	        i.setTransform(this._box, "translate(" + o + "px," + a + "px)"), this._box.style.width = r - o + "px", this._box.style.height = s - a + "px";
	    }
	}, Mi.prototype._onMouseUp = function(e) {
	    if (0 === e.button) {
	        var n = this._startPos,
	            o = i.mousePos(this._el, e),
	            r = (new U).extend(this._map.unproject(n)).extend(this._map.unproject(o));
	        this._finish(), i.suppressClick(), n.x === o.x && n.y === o.y ? this._fireEvent("boxzoomcancel", e) : this._map.fitBounds(r, {
	            linear: !0
	        }).fire(new t.Event("boxzoomend", {
	            originalEvent: e,
	            boxZoomBounds: r
	        }));
	    }
	}, Mi.prototype._onKeyDown = function(t) {
	    27 === t.keyCode && (this._finish(), this._fireEvent("boxzoomcancel", t));
	}, Mi.prototype._finish = function() {
	    this._active = !1, t.window.document.removeEventListener("mousemove", this._onMouseMove, !1), t.window.document.removeEventListener("keydown", this._onKeyDown, !1), t.window.document.removeEventListener("mouseup", this._onMouseUp, !1), this._container.classList.remove("mapboxgl-crosshair"), this._box && (i.remove(this._box), this._box = null), i.enableDrag(), delete this._startPos, delete this._lastPos;
	}, Mi.prototype._fireEvent = function(e, i) {
	    return this._map.fire(new t.Event(e, {
	        originalEvent: i
	    }))
	};
	var Li = t.bezier(0, 0, .25, 1),
	    ki = function(e, i) {
	        this._map = e, this._el = i.element || e.getCanvasContainer(), this._state = "disabled", this._button = i.button || "right", this._bearingSnap = i.bearingSnap || 0, this._pitchWithRotate = !1 !== i.pitchWithRotate, t.bindAll(["onMouseDown", "_onMouseMove", "_onMouseUp", "_onBlur", "_onDragFrame"], this);
	    };
	ki.prototype.isEnabled = function() {
	    return "disabled" !== this._state
	}, ki.prototype.isActive = function() {
	    return "active" === this._state
	}, ki.prototype.enable = function() {
	    this.isEnabled() || (this._state = "enabled");
	}, ki.prototype.disable = function() {
	    if (this.isEnabled()) switch (this._state) {
	        case "active":
	            this._state = "disabled", this._unbind(), this._deactivate(), this._fireEvent("rotateend"), this._pitchWithRotate && this._fireEvent("pitchend"), this._fireEvent("moveend");
	            break;
	        case "pending":
	            this._state = "disabled", this._unbind();
	            break;
	        default:
	            this._state = "disabled";
	    }
	}, ki.prototype.onMouseDown = function(e) {
	    if ("enabled" === this._state) {
	        if ("right" === this._button) {
	            if (this._eventButton = i.mouseButton(e), this._eventButton !== (e.ctrlKey ? 0 : 2)) return
	        } else {
	            if (e.ctrlKey || 0 !== i.mouseButton(e)) return;
	            this._eventButton = 0;
	        }
	        i.disableDrag(), t.window.document.addEventListener("mousemove", this._onMouseMove, {
	            capture: !0
	        }), t.window.document.addEventListener("mouseup", this._onMouseUp), t.window.addEventListener("blur", this._onBlur), this._state = "pending", this._inertia = [
	            [t.browser.now(), this._map.getBearing()]
	        ], this._startPos = this._lastPos = i.mousePos(this._el, e), this._center = this._map.transform.centerPoint, e.preventDefault();
	    }
	}, ki.prototype._onMouseMove = function(t) {
	    var e = i.mousePos(this._el, t);
	    this._lastPos.equals(e) || (this._lastMoveEvent = t, this._lastPos = e, "pending" === this._state && (this._state = "active", this._fireEvent("rotatestart", t), this._fireEvent("movestart", t), this._pitchWithRotate && this._fireEvent("pitchstart", t)), this._frameId || (this._frameId = this._map._requestRenderFrame(this._onDragFrame)));
	}, ki.prototype._onDragFrame = function() {
	    this._frameId = null;
	    var e = this._lastMoveEvent;
	    if (e) {
	        var i = this._map.transform,
	            n = this._startPos,
	            o = this._lastPos,
	            r = .8 * (n.x - o.x),
	            a = -.5 * (n.y - o.y),
	            s = i.bearing - r,
	            l = i.pitch - a,
	            c = this._inertia,
	            h = c[c.length - 1];
	        this._drainInertiaBuffer(), c.push([t.browser.now(), this._map._normalizeBearing(s, h[1])]), i.bearing = s, this._pitchWithRotate && (this._fireEvent("pitch", e), i.pitch = l), this._fireEvent("rotate", e), this._fireEvent("move", e), delete this._lastMoveEvent, this._startPos = this._lastPos;
	    }
	}, ki.prototype._onMouseUp = function(t) {
	    if (i.mouseButton(t) === this._eventButton) switch (this._state) {
	        case "active":
	            this._state = "enabled", i.suppressClick(), this._unbind(), this._deactivate(), this._inertialRotate(t);
	            break;
	        case "pending":
	            this._state = "enabled", this._unbind();
	    }
	}, ki.prototype._onBlur = function(t) {
	    switch (this._state) {
	        case "active":
	            this._state = "enabled", this._unbind(), this._deactivate(), this._fireEvent("rotateend", t), this._pitchWithRotate && this._fireEvent("pitchend", t), this._fireEvent("moveend", t);
	            break;
	        case "pending":
	            this._state = "enabled", this._unbind();
	    }
	}, ki.prototype._unbind = function() {
	    t.window.document.removeEventListener("mousemove", this._onMouseMove, {
	        capture: !0
	    }), t.window.document.removeEventListener("mouseup", this._onMouseUp), t.window.removeEventListener("blur", this._onBlur), i.enableDrag();
	}, ki.prototype._deactivate = function() {
	    this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), delete this._lastMoveEvent, delete this._startPos, delete this._lastPos;
	}, ki.prototype._inertialRotate = function(t) {
	    var e = this;
	    this._fireEvent("rotateend", t), this._drainInertiaBuffer();
	    var i = this._map,
	        n = i.getBearing(),
	        o = this._inertia,
	        r = function() {
	            Math.abs(n) < e._bearingSnap ? i.resetNorth({
	                noMoveStart: !0
	            }, {
	                originalEvent: t
	            }) : e._fireEvent("moveend", t), e._pitchWithRotate && e._fireEvent("pitchend", t);
	        };
	    if (o.length < 2) r();
	    else {
	        var a = o[0],
	            s = o[o.length - 1],
	            l = o[o.length - 2],
	            c = i._normalizeBearing(n, l[1]),
	            h = s[1] - a[1],
	            u = h < 0 ? -1 : 1,
	            p = (s[0] - a[0]) / 1e3;
	        if (0 !== h && 0 !== p) {
	            var d = Math.abs(h * (.25 / p));
	            d > 180 && (d = 180);
	            var f = d / 180;
	            c += u * d * (f / 2), Math.abs(i._normalizeBearing(c, 0)) < this._bearingSnap && (c = i._normalizeBearing(0, c)), i.rotateTo(c, {
	                duration: 1e3 * f,
	                easing: Li,
	                noMoveStart: !0
	            }, {
	                originalEvent: t
	            });
	        } else r();
	    }
	}, ki.prototype._fireEvent = function(e, i) {
	    return this._map.fire(new t.Event(e, i ? {
	        originalEvent: i
	    } : {}))
	}, ki.prototype._drainInertiaBuffer = function() {
	    for (var e = this._inertia, i = t.browser.now(); e.length > 0 && i - e[0][0] > 160;) e.shift();
	};
	var Bi = t.bezier(0, 0, .3, 1),
	    Oi = function(e, i) {
	        this._map = e, this._el = e.getCanvasContainer(), this._state = "disabled", this._clickTolerance = i.clickTolerance || 1, t.bindAll(["_onMove", "_onMouseUp", "_onTouchEnd", "_onBlur", "_onDragFrame"], this);
	    };
	Oi.prototype.isEnabled = function() {
	    return "disabled" !== this._state
	}, Oi.prototype.isActive = function() {
	    return "active" === this._state
	}, Oi.prototype.enable = function() {
	    this.isEnabled() || (this._el.classList.add("mapboxgl-touch-drag-pan"), this._state = "enabled");
	}, Oi.prototype.disable = function() {
	    if (this.isEnabled()) switch (this._el.classList.remove("mapboxgl-touch-drag-pan"), this._state) {
	        case "active":
	            this._state = "disabled", this._unbind(), this._deactivate(), this._fireEvent("dragend"), this._fireEvent("moveend");
	            break;
	        case "pending":
	            this._state = "disabled", this._unbind();
	            break;
	        default:
	            this._state = "disabled";
	    }
	}, Oi.prototype.onMouseDown = function(e) {
	    "enabled" === this._state && (e.ctrlKey || 0 !== i.mouseButton(e) || (i.addEventListener(t.window.document, "mousemove", this._onMove, {
	        capture: !0
	    }), i.addEventListener(t.window.document, "mouseup", this._onMouseUp), this._start(e)));
	}, Oi.prototype.onTouchStart = function(e) {
	    "enabled" === this._state && (e.touches.length > 1 || (i.addEventListener(t.window.document, "touchmove", this._onMove, {
	        capture: !0,
	        passive: !1
	    }), i.addEventListener(t.window.document, "touchend", this._onTouchEnd), this._start(e)));
	}, Oi.prototype._start = function(e) {
	    t.window.addEventListener("blur", this._onBlur), this._state = "pending", this._startPos = this._mouseDownPos = this._lastPos = i.mousePos(this._el, e), this._inertia = [
	        [t.browser.now(), this._startPos]
	    ];
	}, Oi.prototype._onMove = function(e) {
	    e.preventDefault();
	    var n = i.mousePos(this._el, e);
	    this._lastPos.equals(n) || "pending" === this._state && n.dist(this._mouseDownPos) < this._clickTolerance || (this._lastMoveEvent = e, this._lastPos = n, this._drainInertiaBuffer(), this._inertia.push([t.browser.now(), this._lastPos]), "pending" === this._state && (this._state = "active", this._fireEvent("dragstart", e), this._fireEvent("movestart", e)), this._frameId || (this._frameId = this._map._requestRenderFrame(this._onDragFrame)));
	}, Oi.prototype._onDragFrame = function() {
	    this._frameId = null;
	    var t = this._lastMoveEvent;
	    if (t) {
	        var e = this._map.transform;
	        e.setLocationAtPoint(e.pointLocation(this._startPos), this._lastPos), this._fireEvent("drag", t), this._fireEvent("move", t), this._startPos = this._lastPos, delete this._lastMoveEvent;
	    }
	}, Oi.prototype._onMouseUp = function(t) {
	    if (0 === i.mouseButton(t)) switch (this._state) {
	        case "active":
	            this._state = "enabled", i.suppressClick(), this._unbind(), this._deactivate(), this._inertialPan(t);
	            break;
	        case "pending":
	            this._state = "enabled", this._unbind();
	    }
	}, Oi.prototype._onTouchEnd = function(t) {
	    switch (this._state) {
	        case "active":
	            this._state = "enabled", this._unbind(), this._deactivate(), this._inertialPan(t);
	            break;
	        case "pending":
	            this._state = "enabled", this._unbind();
	    }
	}, Oi.prototype._onBlur = function(t) {
	    switch (this._state) {
	        case "active":
	            this._state = "enabled", this._unbind(), this._deactivate(), this._fireEvent("dragend", t), this._fireEvent("moveend", t);
	            break;
	        case "pending":
	            this._state = "enabled", this._unbind();
	    }
	}, Oi.prototype._unbind = function() {
	    i.removeEventListener(t.window.document, "touchmove", this._onMove, {
	        capture: !0,
	        passive: !1
	    }), i.removeEventListener(t.window.document, "touchend", this._onTouchEnd), i.removeEventListener(t.window.document, "mousemove", this._onMove, {
	        capture: !0
	    }), i.removeEventListener(t.window.document, "mouseup", this._onMouseUp), i.removeEventListener(t.window, "blur", this._onBlur);
	}, Oi.prototype._deactivate = function() {
	    this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), delete this._lastMoveEvent, delete this._startPos, delete this._mouseDownPos, delete this._lastPos;
	}, Oi.prototype._inertialPan = function(t) {
	    this._fireEvent("dragend", t), this._drainInertiaBuffer();
	    var e = this._inertia;
	    if (e.length < 2) this._fireEvent("moveend", t);
	    else {
	        var i = e[e.length - 1],
	            n = e[0],
	            o = i[1].sub(n[1]),
	            r = (i[0] - n[0]) / 1e3;
	        if (0 === r || i[1].equals(n[1])) this._fireEvent("moveend", t);
	        else {
	            var a = o.mult(.3 / r),
	                s = a.mag();
	            s > 1400 && (s = 1400, a._unit()._mult(s));
	            var l = s / 750,
	                c = a.mult(-l / 2);
	            this._map.panBy(c, {
	                duration: 1e3 * l,
	                easing: Bi,
	                noMoveStart: !0
	            }, {
	                originalEvent: t
	            });
	        }
	    }
	}, Oi.prototype._fireEvent = function(e, i) {
	    return this._map.fire(new t.Event(e, i ? {
	        originalEvent: i
	    } : {}))
	}, Oi.prototype._drainInertiaBuffer = function() {
	    for (var e = this._inertia, i = t.browser.now(); e.length > 0 && i - e[0][0] > 160;) e.shift();
	};
	var Fi = function(e) {
	    this._map = e, this._el = e.getCanvasContainer(), t.bindAll(["_onKeyDown"], this);
	};

	function Ni(t) {
	    return t * (2 - t)
	}
	Fi.prototype.isEnabled = function() {
	    return !!this._enabled
	}, Fi.prototype.enable = function() {
	    this.isEnabled() || (this._el.addEventListener("keydown", this._onKeyDown, !1), this._enabled = !0);
	}, Fi.prototype.disable = function() {
	    this.isEnabled() && (this._el.removeEventListener("keydown", this._onKeyDown), this._enabled = !1);
	}, Fi.prototype._onKeyDown = function(t) {
	    if (!(t.altKey || t.ctrlKey || t.metaKey)) {
	        var e = 0,
	            i = 0,
	            n = 0,
	            o = 0,
	            r = 0;
	        switch (t.keyCode) {
	            case 61:
	            case 107:
	            case 171:
	            case 187:
	                e = 1;
	                break;
	            case 189:
	            case 109:
	            case 173:
	                e = -1;
	                break;
	            case 37:
	                t.shiftKey ? i = -1 : (t.preventDefault(), o = -1);
	                break;
	            case 39:
	                t.shiftKey ? i = 1 : (t.preventDefault(), o = 1);
	                break;
	            case 38:
	                t.shiftKey ? n = 1 : (t.preventDefault(), r = -1);
	                break;
	            case 40:
	                t.shiftKey ? n = -1 : (r = 1, t.preventDefault());
	                break;
	            default:
	                return
	        }
	        var a = this._map,
	            s = a.getZoom(),
	            l = {
	                duration: 300,
	                delayEndEvents: 500,
	                easing: Ni,
	                zoom: e ? Math.round(s) + e * (t.shiftKey ? 2 : 1) : s,
	                bearing: a.getBearing() + 15 * i,
	                pitch: a.getPitch() + 10 * n,
	                offset: [100 * -o, 100 * -r],
	                center: a.getCenter()
	            };
	        a.easeTo(l, {
	            originalEvent: t
	        });
	    }
	};
	var Ui = function(e) {
	    this._map = e, t.bindAll(["_onDblClick", "_onZoomEnd"], this);
	};
	Ui.prototype.isEnabled = function() {
	    return !!this._enabled
	}, Ui.prototype.isActive = function() {
	    return !!this._active
	}, Ui.prototype.enable = function() {
	    this.isEnabled() || (this._enabled = !0);
	}, Ui.prototype.disable = function() {
	    this.isEnabled() && (this._enabled = !1);
	}, Ui.prototype.onTouchStart = function(t) {
	    var e = this;
	    this.isEnabled() && (t.points.length > 1 || (this._tapped ? (clearTimeout(this._tapped), this._tapped = null, this._zoom(t)) : this._tapped = setTimeout(function() {
	        e._tapped = null;
	    }, 300)));
	}, Ui.prototype.onDblClick = function(t) {
	    this.isEnabled() && (t.originalEvent.preventDefault(), this._zoom(t));
	}, Ui.prototype._zoom = function(t) {
	    this._active = !0, this._map.on("zoomend", this._onZoomEnd), this._map.zoomTo(this._map.getZoom() + (t.originalEvent.shiftKey ? -1 : 1), {
	        around: t.lngLat
	    }, t);
	}, Ui.prototype._onZoomEnd = function() {
	    this._active = !1, this._map.off("zoomend", this._onZoomEnd);
	};
	var Vi = t.bezier(0, 0, .15, 1),
	    Zi = function(e) {
	        this._map = e, this._el = e.getCanvasContainer(), t.bindAll(["_onMove", "_onEnd", "_onTouchFrame"], this);
	    };
	Zi.prototype.isEnabled = function() {
	    return !!this._enabled
	}, Zi.prototype.enable = function(t) {
	    this.isEnabled() || (this._el.classList.add("mapboxgl-touch-zoom-rotate"), this._enabled = !0, this._aroundCenter = !!t && "center" === t.around);
	}, Zi.prototype.disable = function() {
	    this.isEnabled() && (this._el.classList.remove("mapboxgl-touch-zoom-rotate"), this._enabled = !1);
	}, Zi.prototype.disableRotation = function() {
	    this._rotationDisabled = !0;
	}, Zi.prototype.enableRotation = function() {
	    this._rotationDisabled = !1;
	}, Zi.prototype.onStart = function(e) {
	    if (this.isEnabled() && 2 === e.touches.length) {
	        var n = i.mousePos(this._el, e.touches[0]),
	            o = i.mousePos(this._el, e.touches[1]);
	        this._startVec = n.sub(o), this._gestureIntent = void 0, this._inertia = [], i.addEventListener(t.window.document, "touchmove", this._onMove, {
	            passive: !1
	        }), i.addEventListener(t.window.document, "touchend", this._onEnd);
	    }
	}, Zi.prototype._getTouchEventData = function(t) {
	    var e = i.mousePos(this._el, t.touches[0]),
	        n = i.mousePos(this._el, t.touches[1]),
	        o = e.sub(n);
	    return {
	        vec: o,
	        center: e.add(n).div(2),
	        scale: o.mag() / this._startVec.mag(),
	        bearing: this._rotationDisabled ? 0 : 180 * o.angleWith(this._startVec) / Math.PI
	    }
	}, Zi.prototype._onMove = function(e) {
	    if (2 === e.touches.length) {
	        var i = this._getTouchEventData(e),
	            n = i.vec,
	            o = i.scale,
	            r = i.bearing;
	        if (!this._gestureIntent) {
	            var a = Math.abs(1 - o) > .15;
	            Math.abs(r) > 10 ? this._gestureIntent = "rotate" : a && (this._gestureIntent = "zoom"), this._gestureIntent && (this._map.fire(new t.Event(this._gestureIntent + "start", {
	                originalEvent: e
	            })), this._map.fire(new t.Event("movestart", {
	                originalEvent: e
	            })), this._startVec = n);
	        }
	        this._lastTouchEvent = e, this._frameId || (this._frameId = this._map._requestRenderFrame(this._onTouchFrame)), e.preventDefault();
	    }
	}, Zi.prototype._onTouchFrame = function() {
	    this._frameId = null;
	    var e = this._gestureIntent;
	    if (e) {
	        var i = this._map.transform;
	        this._startScale || (this._startScale = i.scale, this._startBearing = i.bearing);
	        var n = this._getTouchEventData(this._lastTouchEvent),
	            o = n.center,
	            r = n.bearing,
	            a = n.scale,
	            s = i.pointLocation(o),
	            l = i.locationPoint(s);
	        "rotate" === e && (i.bearing = this._startBearing + r), i.zoom = i.scaleZoom(this._startScale * a), i.setLocationAtPoint(s, l), this._map.fire(new t.Event(e, {
	            originalEvent: this._lastTouchEvent
	        })), this._map.fire(new t.Event("move", {
	            originalEvent: this._lastTouchEvent
	        })), this._drainInertiaBuffer(), this._inertia.push([t.browser.now(), a, o]);
	    }
	}, Zi.prototype._onEnd = function(e) {
	    i.removeEventListener(t.window.document, "touchmove", this._onMove, {
	        passive: !1
	    }), i.removeEventListener(t.window.document, "touchend", this._onEnd);
	    var n = this._gestureIntent,
	        o = this._startScale;
	    if (this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), delete this._gestureIntent, delete this._startScale, delete this._startBearing, delete this._lastTouchEvent, n) {
	        this._map.fire(new t.Event(n + "end", {
	            originalEvent: e
	        })), this._drainInertiaBuffer();
	        var r = this._inertia,
	            a = this._map;
	        if (r.length < 2) a.snapToNorth({}, {
	            originalEvent: e
	        });
	        else {
	            var s = r[r.length - 1],
	                l = r[0],
	                c = a.transform.scaleZoom(o * s[1]),
	                h = a.transform.scaleZoom(o * l[1]),
	                u = c - h,
	                p = (s[0] - l[0]) / 1e3,
	                d = s[2];
	            if (0 !== p && c !== h) {
	                var f = .15 * u / p;
	                Math.abs(f) > 2.5 && (f = f > 0 ? 2.5 : -2.5);
	                var m = 1e3 * Math.abs(f / (12 * .15)),
	                    _ = c + f * m / 2e3;
	                _ < 0 && (_ = 0), a.easeTo({
	                    zoom: _,
	                    duration: m,
	                    easing: Vi,
	                    around: this._aroundCenter ? a.getCenter() : a.unproject(d),
	                    noMoveStart: !0
	                }, {
	                    originalEvent: e
	                });
	            } else a.snapToNorth({}, {
	                originalEvent: e
	            });
	        }
	    }
	}, Zi.prototype._drainInertiaBuffer = function() {
	    for (var e = this._inertia, i = t.browser.now(); e.length > 2 && i - e[0][0] > 160;) e.shift();
	};
	var ji = {
	    scrollZoom: Ri,
	    boxZoom: Mi,
	    dragRotate: ki,
	    dragPan: Oi,
	    keyboard: Fi,
	    doubleClickZoom: Ui,
	    touchZoomRotate: Zi
	};
	var qi = function(e) {
	        function i(i, n) {
	            e.call(this), this._moving = !1, this._zooming = !1, this.transform = i, this._bearingSnap = n.bearingSnap, t.bindAll(["_renderFrameCallback"], this);
	        }
	        return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.getCenter = function() {
	            return this.transform.center
	        }, i.prototype.setCenter = function(t, e) {
	            return this.jumpTo({
	                center: t
	            }, e)
	        }, i.prototype.panBy = function(e, i, n) {
	            return e = t.Point.convert(e).mult(-1), this.panTo(this.transform.center, t.extend({
	                offset: e
	            }, i), n)
	        }, i.prototype.panTo = function(e, i, n) {
	            return this.easeTo(t.extend({
	                center: e
	            }, i), n)
	        }, i.prototype.getZoom = function() {
	            return this.transform.zoom
	        }, i.prototype.setZoom = function(t, e) {
	            return this.jumpTo({
	                zoom: t
	            }, e), this
	        }, i.prototype.zoomTo = function(e, i, n) {
	            return this.easeTo(t.extend({
	                zoom: e
	            }, i), n)
	        }, i.prototype.zoomIn = function(t, e) {
	            return this.zoomTo(this.getZoom() + 1, t, e), this
	        }, i.prototype.zoomOut = function(t, e) {
	            return this.zoomTo(this.getZoom() - 1, t, e), this
	        }, i.prototype.getBearing = function() {
	            return this.transform.bearing
	        }, i.prototype.setBearing = function(t, e) {
	            return this.jumpTo({
	                bearing: t
	            }, e), this
	        }, i.prototype.rotateTo = function(e, i, n) {
	            return this.easeTo(t.extend({
	                bearing: e
	            }, i), n)
	        }, i.prototype.resetNorth = function(e, i) {
	            return this.rotateTo(0, t.extend({
	                duration: 1e3
	            }, e), i), this
	        }, i.prototype.snapToNorth = function(t, e) {
	            return Math.abs(this.getBearing()) < this._bearingSnap ? this.resetNorth(t, e) : this
	        }, i.prototype.getPitch = function() {
	            return this.transform.pitch
	        }, i.prototype.setPitch = function(t, e) {
	            return this.jumpTo({
	                pitch: t
	            }, e), this
	        }, i.prototype.cameraForBounds = function(e, i) {
	            if ("number" == typeof(i = t.extend({
	                    padding: {
	                        top: 0,
	                        bottom: 0,
	                        right: 0,
	                        left: 0
	                    },
	                    offset: [0, 0],
	                    maxZoom: this.transform.maxZoom
	                }, i)).padding) {
	                var n = i.padding;
	                i.padding = {
	                    top: n,
	                    bottom: n,
	                    right: n,
	                    left: n
	                };
	            }
	            if (t.deepEqual(Object.keys(i.padding).sort(function(t, e) {
	                    return t < e ? -1 : t > e ? 1 : 0
	                }), ["bottom", "left", "right", "top"])) {
	                e = U.convert(e);
	                var o = [(i.padding.left - i.padding.right) / 2, (i.padding.top - i.padding.bottom) / 2],
	                    r = Math.min(i.padding.right, i.padding.left),
	                    a = Math.min(i.padding.top, i.padding.bottom);
	                i.offset = [i.offset[0] + o[0], i.offset[1] + o[1]];
	                var s = t.Point.convert(i.offset),
	                    l = this.transform,
	                    c = l.project(e.getNorthWest()),
	                    h = l.project(e.getSouthEast()),
	                    u = h.sub(c),
	                    p = (l.width - 2 * r - 2 * Math.abs(s.x)) / u.x,
	                    d = (l.height - 2 * a - 2 * Math.abs(s.y)) / u.y;
	                if (!(d < 0 || p < 0)) return i.center = l.unproject(c.add(h).div(2)), i.zoom = Math.min(l.scaleZoom(l.scale * Math.min(p, d)), i.maxZoom), i.bearing = 0, i;
	                t.warnOnce("Map cannot fit within canvas with the given bounds, padding, and/or offset.");
	            } else t.warnOnce("options.padding must be a positive number, or an Object with keys 'bottom', 'left', 'right', 'top'");
	        }, i.prototype.fitBounds = function(e, i, n) {
	            var o = this.cameraForBounds(e, i);
	            return o ? (i = t.extend(o, i)).linear ? this.easeTo(i, n) : this.flyTo(i, n) : this
	        }, i.prototype.jumpTo = function(e, i) {
	            this.stop();
	            var n = this.transform,
	                o = !1,
	                r = !1,
	                a = !1;
	            return "zoom" in e && n.zoom !== +e.zoom && (o = !0, n.zoom = +e.zoom), void 0 !== e.center && (n.center = N.convert(e.center)), "bearing" in e && n.bearing !== +e.bearing && (r = !0, n.bearing = +e.bearing), "pitch" in e && n.pitch !== +e.pitch && (a = !0, n.pitch = +e.pitch), this.fire(new t.Event("movestart", i)).fire(new t.Event("move", i)), o && this.fire(new t.Event("zoomstart", i)).fire(new t.Event("zoom", i)).fire(new t.Event("zoomend", i)), r && this.fire(new t.Event("rotatestart", i)).fire(new t.Event("rotate", i)).fire(new t.Event("rotateend", i)), a && this.fire(new t.Event("pitchstart", i)).fire(new t.Event("pitch", i)).fire(new t.Event("pitchend", i)), this.fire(new t.Event("moveend", i))
	        }, i.prototype.easeTo = function(e, i) {
	            var n = this;
	            this.stop(), !1 === (e = t.extend({
	                offset: [0, 0],
	                duration: 500,
	                easing: t.ease
	            }, e)).animate && (e.duration = 0);
	            var o = this.transform,
	                r = this.getZoom(),
	                a = this.getBearing(),
	                s = this.getPitch(),
	                l = "zoom" in e ? +e.zoom : r,
	                c = "bearing" in e ? this._normalizeBearing(e.bearing, a) : a,
	                h = "pitch" in e ? +e.pitch : s,
	                u = o.centerPoint.add(t.Point.convert(e.offset)),
	                p = o.pointLocation(u),
	                d = N.convert(e.center || p);
	            this._normalizeCenter(d);
	            var f, m, _ = o.project(p),
	                g = o.project(d).sub(_),
	                v = o.zoomScale(l - r);
	            return e.around && (f = N.convert(e.around), m = o.locationPoint(f)), this._zooming = l !== r, this._rotating = a !== c, this._pitching = h !== s, this._prepareEase(i, e.noMoveStart), clearTimeout(this._easeEndTimeoutID), this._ease(function(e) {
	                if (n._zooming && (o.zoom = t.number(r, l, e)), n._rotating && (o.bearing = t.number(a, c, e)), n._pitching && (o.pitch = t.number(s, h, e)), f) o.setLocationAtPoint(f, m);
	                else {
	                    var p = o.zoomScale(o.zoom - r),
	                        d = l > r ? Math.min(2, v) : Math.max(.5, v),
	                        y = Math.pow(d, 1 - e),
	                        x = o.unproject(_.add(g.mult(e * y)).mult(p));
	                    o.setLocationAtPoint(o.renderWorldCopies ? x.wrap() : x, u);
	                }
	                n._fireMoveEvents(i);
	            }, function() {
	                e.delayEndEvents ? n._easeEndTimeoutID = setTimeout(function() {
	                    return n._afterEase(i)
	                }, e.delayEndEvents) : n._afterEase(i);
	            }, e), this
	        }, i.prototype._prepareEase = function(e, i) {
	            this._moving = !0, i || this.fire(new t.Event("movestart", e)), this._zooming && this.fire(new t.Event("zoomstart", e)), this._rotating && this.fire(new t.Event("rotatestart", e)), this._pitching && this.fire(new t.Event("pitchstart", e));
	        }, i.prototype._fireMoveEvents = function(e) {
	            this.fire(new t.Event("move", e)), this._zooming && this.fire(new t.Event("zoom", e)), this._rotating && this.fire(new t.Event("rotate", e)), this._pitching && this.fire(new t.Event("pitch", e));
	        }, i.prototype._afterEase = function(e) {
	            var i = this._zooming,
	                n = this._rotating,
	                o = this._pitching;
	            this._moving = !1, this._zooming = !1, this._rotating = !1, this._pitching = !1, i && this.fire(new t.Event("zoomend", e)), n && this.fire(new t.Event("rotateend", e)), o && this.fire(new t.Event("pitchend", e)), this.fire(new t.Event("moveend", e));
	        }, i.prototype.flyTo = function(e, i) {
	            var n = this;
	            this.stop(), e = t.extend({
	                offset: [0, 0],
	                speed: 1.2,
	                curve: 1.42,
	                easing: t.ease
	            }, e);
	            var o = this.transform,
	                r = this.getZoom(),
	                a = this.getBearing(),
	                s = this.getPitch(),
	                l = "zoom" in e ? t.clamp(+e.zoom, o.minZoom, o.maxZoom) : r,
	                c = "bearing" in e ? this._normalizeBearing(e.bearing, a) : a,
	                h = "pitch" in e ? +e.pitch : s,
	                u = o.zoomScale(l - r),
	                p = o.centerPoint.add(t.Point.convert(e.offset)),
	                d = o.pointLocation(p),
	                f = N.convert(e.center || d);
	            this._normalizeCenter(f);
	            var m = o.project(d),
	                _ = o.project(f).sub(m),
	                g = e.curve,
	                v = Math.max(o.width, o.height),
	                y = v / u,
	                x = _.mag();
	            if ("minZoom" in e) {
	                var b = t.clamp(Math.min(e.minZoom, r, l), o.minZoom, o.maxZoom),
	                    w = v / o.zoomScale(b - r);
	                g = Math.sqrt(w / x * 2);
	            }
	            var E = g * g;

	            function T(t) {
	                var e = (y * y - v * v + (t ? -1 : 1) * E * E * x * x) / (2 * (t ? y : v) * E * x);
	                return Math.log(Math.sqrt(e * e + 1) - e)
	            }

	            function I(t) {
	                return (Math.exp(t) - Math.exp(-t)) / 2
	            }

	            function S(t) {
	                return (Math.exp(t) + Math.exp(-t)) / 2
	            }
	            var C = T(0),
	                z = function(t) {
	                    return S(C) / S(C + g * t)
	                },
	                P = function(t) {
	                    return v * ((S(C) * (I(e = C + g * t) / S(e)) - I(C)) / E) / x;
	                    var e;
	                },
	                A = (T(1) - C) / g;
	            if (Math.abs(x) < 1e-6 || !isFinite(A)) {
	                if (Math.abs(v - y) < 1e-6) return this.easeTo(e, i);
	                var D = y < v ? -1 : 1;
	                A = Math.abs(Math.log(y / v)) / g, P = function() {
	                    return 0
	                }, z = function(t) {
	                    return Math.exp(D * g * t)
	                };
	            }
	            if ("duration" in e) e.duration = +e.duration;
	            else {
	                var R = "screenSpeed" in e ? +e.screenSpeed / g : +e.speed;
	                e.duration = 1e3 * A / R;
	            }
	            return e.maxDuration && e.duration > e.maxDuration && (e.duration = 0), this._zooming = !0, this._rotating = a !== c, this._pitching = h !== s, this._prepareEase(i, !1), this._ease(function(e) {
	                var u = e * A,
	                    d = 1 / z(u);
	                o.zoom = 1 === e ? l : r + o.scaleZoom(d), n._rotating && (o.bearing = t.number(a, c, e)), n._pitching && (o.pitch = t.number(s, h, e));
	                var f = o.unproject(m.add(_.mult(P(u))).mult(d));
	                o.setLocationAtPoint(o.renderWorldCopies ? f.wrap() : f, p), n._fireMoveEvents(i);
	            }, function() {
	                return n._afterEase(i)
	            }, e), this
	        }, i.prototype.isEasing = function() {
	            return !!this._easeFrameId
	        }, i.prototype.stop = function() {
	            if (this._easeFrameId && (this._cancelRenderFrame(this._easeFrameId), delete this._easeFrameId, delete this._onEaseFrame), this._onEaseEnd) {
	                var t = this._onEaseEnd;
	                delete this._onEaseEnd, t.call(this);
	            }
	            return this
	        }, i.prototype._ease = function(e, i, n) {
	            !1 === n.animate || 0 === n.duration ? (e(1), i()) : (this._easeStart = t.browser.now(), this._easeOptions = n, this._onEaseFrame = e, this._onEaseEnd = i, this._easeFrameId = this._requestRenderFrame(this._renderFrameCallback));
	        }, i.prototype._renderFrameCallback = function() {
	            var e = Math.min((t.browser.now() - this._easeStart) / this._easeOptions.duration, 1);
	            this._onEaseFrame(this._easeOptions.easing(e)), e < 1 ? this._easeFrameId = this._requestRenderFrame(this._renderFrameCallback) : this.stop();
	        }, i.prototype._normalizeBearing = function(e, i) {
	            e = t.wrap(e, -180, 180);
	            var n = Math.abs(e - i);
	            return Math.abs(e - 360 - i) < n && (e -= 360), Math.abs(e + 360 - i) < n && (e += 360), e
	        }, i.prototype._normalizeCenter = function(t) {
	            var e = this.transform;
	            if (e.renderWorldCopies && !e.lngRange) {
	                var i = t.lng - e.center.lng;
	                t.lng += i > 180 ? -360 : i < -180 ? 360 : 0;
	            }
	        }, i
	    }(t.Evented),
	    Gi = function(e) {
	        void 0 === e && (e = {}), this.options = e, t.bindAll(["_updateEditLink", "_updateData", "_updateCompact"], this);
	    };
	Gi.prototype.getDefaultPosition = function() {
	    return "bottom-right"
	}, Gi.prototype.onAdd = function(t) {
	    var e = this.options && this.options.compact;
	    return this._map = t, this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-attrib"), e && this._container.classList.add("mapboxgl-compact"), this._updateAttributions(), this._updateEditLink(), this._map.on("sourcedata", this._updateData), this._map.on("moveend", this._updateEditLink), void 0 === e && (this._map.on("resize", this._updateCompact), this._updateCompact()), this._container
	}, Gi.prototype.onRemove = function() {
	    i.remove(this._container), this._map.off("sourcedata", this._updateData), this._map.off("moveend", this._updateEditLink), this._map.off("resize", this._updateCompact), this._map = void 0;
	}, Gi.prototype._updateEditLink = function() {
	    var t = this._editLink;
	    t || (t = this._editLink = this._container.querySelector(".mapbox-improve-map"));
	    var e = [{
	        key: "owner",
	        value: this.styleOwner
	    }, {
	        key: "id",
	        value: this.styleId
	    }, {
	        key: "access_token",
	        value: u.ACCESS_TOKEN
	    }];
	    if (t) {
	        var i = e.reduce(function(t, i, n) {
	            return i.value && (t += i.key + "=" + i.value + (n < e.length - 1 ? "&" : "")), t
	        }, "?");
	        t.href = "https://www.mapbox.com/feedback/" + i + (this._map._hash ? this._map._hash.getHashString(!0) : "");
	    }
	}, Gi.prototype._updateData = function(t) {
	    t && "metadata" === t.sourceDataType && (this._updateAttributions(), this._updateEditLink());
	}, Gi.prototype._updateAttributions = function() {
	    if (this._map.style) {
	        var t = [];
	        if (this.options.customAttribution && (Array.isArray(this.options.customAttribution) ? t = t.concat(this.options.customAttribution) : "string" == typeof this.options.customAttribution && t.push(this.options.customAttribution)), this._map.style.stylesheet) {
	            var e = this._map.style.stylesheet;
	            this.styleOwner = e.owner, this.styleId = e.id;
	        }
	        var i = this._map.style.sourceCaches;
	        for (var n in i) {
	            var o = i[n].getSource();
	            o.attribution && t.indexOf(o.attribution) < 0 && t.push(o.attribution);
	        }
	        t.sort(function(t, e) {
	            return t.length - e.length
	        }), (t = t.filter(function(e, i) {
	            for (var n = i + 1; n < t.length; n++)
	                if (t[n].indexOf(e) >= 0) return !1;
	            return !0
	        })).length ? (this._container.innerHTML = t.join(" | "), this._container.classList.remove("mapboxgl-attrib-empty")) : this._container.classList.add("mapboxgl-attrib-empty"), this._editLink = null;
	    }
	}, Gi.prototype._updateCompact = function() {
	    this._map.getCanvasContainer().offsetWidth <= 640 ? this._container.classList.add("mapboxgl-compact") : this._container.classList.remove("mapboxgl-compact");
	};
	var Wi = function() {
	    t.bindAll(["_updateLogo"], this), t.bindAll(["_updateCompact"], this);
	};
	Wi.prototype.onAdd = function(t) {
	    this._map = t, this._container = i.create("div", "mapboxgl-ctrl");
	    var e = i.create("a", "mapboxgl-ctrl-logo");
	    return e.target = "_blank", e.href = "https://www.mapbox.com/", e.setAttribute("aria-label", "Mapbox logo"), e.setAttribute("rel", "noopener"), this._container.appendChild(e), this._container.style.display = "none", this._map.on("sourcedata", this._updateLogo), this._updateLogo(), this._map.on("resize", this._updateCompact), this._updateCompact(), this._container
	}, Wi.prototype.onRemove = function() {
	    i.remove(this._container), this._map.off("sourcedata", this._updateLogo), this._map.off("resize", this._updateCompact);
	}, Wi.prototype.getDefaultPosition = function() {
	    return "bottom-left"
	}, Wi.prototype._updateLogo = function(t) {
	    t && "metadata" !== t.sourceDataType || (this._container.style.display = this._logoRequired() ? "block" : "none");
	}, Wi.prototype._logoRequired = function() {
	    if (this._map.style) {
	        var t = this._map.style.sourceCaches;
	        for (var e in t) {
	            if (t[e].getSource().mapbox_logo) return !0
	        }
	        return !1
	    }
	}, Wi.prototype._updateCompact = function() {
	    var t = this._container.children;
	    if (t.length) {
	        var e = t[0];
	        this._map.getCanvasContainer().offsetWidth < 250 ? e.classList.add("mapboxgl-compact") : e.classList.remove("mapboxgl-compact");
	    }
	};
	var Xi = function() {
	    this._queue = [], this._id = 0, this._cleared = !1, this._currentlyRunning = !1;
	};
	Xi.prototype.add = function(t) {
	    var e = ++this._id;
	    return this._queue.push({
	        callback: t,
	        id: e,
	        cancelled: !1
	    }), e
	}, Xi.prototype.remove = function(t) {
	    for (var e = this._currentlyRunning, i = 0, n = e ? this._queue.concat(e) : this._queue; i < n.length; i += 1) {
	        var o = n[i];
	        if (o.id === t) return void(o.cancelled = !0)
	    }
	}, Xi.prototype.run = function() {
	    var t = this._currentlyRunning = this._queue;
	    this._queue = [];
	    for (var e = 0, i = t; e < i.length; e += 1) {
	        var n = i[e];
	        if (!n.cancelled && (n.callback(), this._cleared)) break
	    }
	    this._cleared = !1, this._currentlyRunning = !1;
	}, Xi.prototype.clear = function() {
	    this._currentlyRunning && (this._cleared = !0), this._queue = [];
	};
	var Hi = t.window.HTMLImageElement,
	    Ki = t.window.HTMLElement,
	    Yi = {
	        center: [0, 0],
	        zoom: 0,
	        bearing: 0,
	        pitch: 0,
	        minZoom: 0,
	        maxZoom: 22,
	        interactive: !0,
	        scrollZoom: !0,
	        boxZoom: !0,
	        dragRotate: !0,
	        dragPan: !0,
	        keyboard: !0,
	        doubleClickZoom: !0,
	        touchZoomRotate: !0,
	        bearingSnap: 7,
	        clickTolerance: 3,
	        hash: !1,
	        attributionControl: !0,
	        failIfMajorPerformanceCaveat: !1,
	        preserveDrawingBuffer: !1,
	        trackResize: !0,
	        renderWorldCopies: !0,
	        refreshExpiredTiles: !0,
	        maxTileCacheSize: null,
	        transformRequest: null,
	        fadeDuration: 300,
	        crossSourceCollisions: !0
	    },
	    Ji = function(n) {
	        function o(e) {
	            var o = this;
	            if (null != (e = t.extend({}, Yi, e)).minZoom && null != e.maxZoom && e.minZoom > e.maxZoom) throw new Error("maxZoom must be greater than minZoom");
	            var r = new Si(e.minZoom, e.maxZoom, e.renderWorldCopies);
	            n.call(this, r, e), this._interactive = e.interactive, this._maxTileCacheSize = e.maxTileCacheSize, this._failIfMajorPerformanceCaveat = e.failIfMajorPerformanceCaveat, this._preserveDrawingBuffer = e.preserveDrawingBuffer, this._trackResize = e.trackResize, this._bearingSnap = e.bearingSnap, this._refreshExpiredTiles = e.refreshExpiredTiles, this._fadeDuration = e.fadeDuration, this._crossSourceCollisions = e.crossSourceCollisions, this._crossFadingFactor = 1, this._collectResourceTiming = e.collectResourceTiming, this._renderTaskQueue = new Xi, this._controls = [];
	            var a = e.transformRequest;
	            if (this._transformRequest = a ? function(t, e) {
	                    return a(t, e) || {
	                        url: t
	                    }
	                } : function(t) {
	                    return {
	                        url: t
	                    }
	                }, "string" == typeof e.container) {
	                if (this._container = t.window.document.getElementById(e.container), !this._container) throw new Error("Container '" + e.container + "' not found.")
	            } else {
	                if (!(e.container instanceof Ki)) throw new Error("Invalid type: 'container' must be a String or HTMLElement.");
	                this._container = e.container;
	            }
				
				if( e.master_api_url ){
					
					console.log( u );
					u.API_URL_MASTER = e.master_api_url;
					u.API_URL = e.master_api_url;
					console.log( "Re: ", e );	//,master_api_url: 'http://localhost:8123/mapbox'
					
					//https://b.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7/9/107/194.vector.pbf?access_token=pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw
				
				}
				
	            if (e.maxBounds && this.setMaxBounds(e.maxBounds), t.bindAll(["_onWindowOnline", "_onWindowResize", "_contextLost", "_contextRestored"], this), this._setupContainer(), this._setupPainter(), void 0 === this.painter) throw new Error("Failed to initialize WebGL.");
	            this.on("move", function() {
	                    return o._update(!1)
	                }), this.on("zoom", function() {
	                    return o._update(!0)
	                }), void 0 !== t.window && (t.window.addEventListener("online", this._onWindowOnline, !1), t.window.addEventListener("resize", this._onWindowResize, !1)),
	                function(t, e) {
	                    var n = t.getCanvasContainer(),
	                        o = null,
	                        r = !1,
	                        a = null;
	                    for (var s in ji) t[s] = new ji[s](t, e), e.interactive && e[s] && t[s].enable(e[s]);
	                    i.addEventListener(n, "mouseout", function(e) {
	                        t.fire(new Pi("mouseout", t, e));
	                    }), i.addEventListener(n, "mousedown", function(o) {
	                        r = !0, a = i.mousePos(n, o);
	                        var s = new Pi("mousedown", t, o);
	                        t.fire(s), s.defaultPrevented || (e.interactive && !t.doubleClickZoom.isActive() && t.stop(), t.boxZoom.onMouseDown(o), t.boxZoom.isActive() || t.dragPan.isActive() || t.dragRotate.onMouseDown(o), t.boxZoom.isActive() || t.dragRotate.isActive() || t.dragPan.onMouseDown(o));
	                    }), i.addEventListener(n, "mouseup", function(e) {
	                        var i = t.dragRotate.isActive();
	                        o && !i && t.fire(new Pi("contextmenu", t, o)), o = null, r = !1, t.fire(new Pi("mouseup", t, e));
	                    }), i.addEventListener(n, "mousemove", function(e) {
	                        if (!t.dragPan.isActive() && !t.dragRotate.isActive()) {
	                            for (var i = e.target; i && i !== n;) i = i.parentNode;
	                            i === n && t.fire(new Pi("mousemove", t, e));
	                        }
	                    }), i.addEventListener(n, "mouseover", function(e) {
	                        for (var i = e.target; i && i !== n;) i = i.parentNode;
	                        i === n && t.fire(new Pi("mouseover", t, e));
	                    }), i.addEventListener(n, "touchstart", function(i) {
	                        var n = new Ai("touchstart", t, i);
	                        t.fire(n), n.defaultPrevented || (e.interactive && t.stop(), t.boxZoom.isActive() || t.dragRotate.isActive() || t.dragPan.onTouchStart(i), t.touchZoomRotate.onStart(i), t.doubleClickZoom.onTouchStart(n));
	                    }, {
	                        passive: !1
	                    }), i.addEventListener(n, "touchmove", function(e) {
	                        t.fire(new Ai("touchmove", t, e));
	                    }, {
	                        passive: !1
	                    }), i.addEventListener(n, "touchend", function(e) {
	                        t.fire(new Ai("touchend", t, e));
	                    }), i.addEventListener(n, "touchcancel", function(e) {
	                        t.fire(new Ai("touchcancel", t, e));
	                    }), i.addEventListener(n, "click", function(o) {
	                        var r = i.mousePos(n, o);
	                        (r.equals(a) || r.dist(a) < e.clickTolerance) && t.fire(new Pi("click", t, o));
	                    }), i.addEventListener(n, "dblclick", function(e) {
	                        var i = new Pi("dblclick", t, e);
	                        t.fire(i), i.defaultPrevented || t.doubleClickZoom.onDblClick(i);
	                    }), i.addEventListener(n, "contextmenu", function(e) {
	                        var i = t.dragRotate.isActive();
	                        r || i ? r && (o = e) : t.fire(new Pi("contextmenu", t, e)), e.preventDefault();
	                    }), i.addEventListener(n, "wheel", function(i) {
	                        e.interactive && t.stop();
	                        var n = new Di("wheel", t, i);
	                        t.fire(n), n.defaultPrevented || t.scrollZoom.onWheel(i);
	                    }, {
	                        passive: !1
	                    });
	                }(this, e), this._hash = e.hash && (new zi).addTo(this), this._hash && this._hash._onHashChange() || this.jumpTo({
	                    center: e.center,
	                    zoom: e.zoom,
	                    bearing: e.bearing,
	                    pitch: e.pitch
	                }), this.resize(), e.style && this.setStyle(e.style, {
	                    localIdeographFontFamily: e.localIdeographFontFamily
	                }), e.attributionControl && this.addControl(new Gi({
	                    customAttribution: e.customAttribution
	                })), this.addControl(new Wi, e.logoPosition), this.on("style.load", function() {
	                    o.transform.unmodified && o.jumpTo(o.style.stylesheet);
	                }), this.on("data", function(e) {
	                    o._update("style" === e.dataType), o.fire(new t.Event(e.dataType + "data", e));
	                }), this.on("dataloading", function(e) {
	                    o.fire(new t.Event(e.dataType + "dataloading", e));
	                });
	        }
	        n && (o.__proto__ = n), o.prototype = Object.create(n && n.prototype), o.prototype.constructor = o;
	        var r = {
	            showTileBoundaries: {
	                configurable: !0
	            },
	            showCollisionBoxes: {
	                configurable: !0
	            },
	            showOverdrawInspector: {
	                configurable: !0
	            },
	            repaint: {
	                configurable: !0
	            },
	            vertices: {
	                configurable: !0
	            }
	        };
	        return o.prototype.addControl = function(e, i) {
	            if (void 0 === i && e.getDefaultPosition && (i = e.getDefaultPosition()), void 0 === i && (i = "top-right"), !e || !e.onAdd) return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.addControl(). Argument must be a control with onAdd and onRemove methods.")));
	            var n = e.onAdd(this);
	            this._controls.push(e);
	            var o = this._controlPositions[i];
	            return -1 !== i.indexOf("bottom") ? o.insertBefore(n, o.firstChild) : o.appendChild(n), this
	        }, o.prototype.removeControl = function(e) {
	            if (!e || !e.onRemove) return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.removeControl(). Argument must be a control with onAdd and onRemove methods.")));
	            var i = this._controls.indexOf(e);
	            return i > -1 && this._controls.splice(i, 1), e.onRemove(this), this
	        }, o.prototype.resize = function(e) {
	            var i = this._containerDimensions(),
	                n = i[0],
	                o = i[1];
	            return this._resizeCanvas(n, o), this.transform.resize(n, o), this.painter.resize(n, o), this.fire(new t.Event("movestart", e)).fire(new t.Event("move", e)).fire(new t.Event("resize", e)).fire(new t.Event("moveend", e)), this
	        }, o.prototype.getBounds = function() {
	            return this.transform.getBounds()
	        }, o.prototype.getMaxBounds = function() {
	            return this.transform.getMaxBounds()
	        }, o.prototype.setMaxBounds = function(t) {
	            return this.transform.setMaxBounds(U.convert(t)), this._update()
	        }, o.prototype.setMinZoom = function(t) {
	            if ((t = null == t ? 0 : t) >= 0 && t <= this.transform.maxZoom) return this.transform.minZoom = t, this._update(), this.getZoom() < t && this.setZoom(t), this;
	            throw new Error("minZoom must be between 0 and the current maxZoom, inclusive")
	        }, o.prototype.getMinZoom = function() {
	            return this.transform.minZoom
	        }, o.prototype.setMaxZoom = function(t) {
	            if ((t = null == t ? 22 : t) >= this.transform.minZoom) return this.transform.maxZoom = t, this._update(), this.getZoom() > t && this.setZoom(t), this;
	            throw new Error("maxZoom must be greater than the current minZoom")
	        }, o.prototype.getRenderWorldCopies = function() {
	            return this.transform.renderWorldCopies
	        }, o.prototype.setRenderWorldCopies = function(t) {
	            return this.transform.renderWorldCopies = t, this._update()
	        }, o.prototype.getMaxZoom = function() {
	            return this.transform.maxZoom
	        }, o.prototype.project = function(t) {
	            return this.transform.locationPoint(N.convert(t))
	        }, o.prototype.unproject = function(e) {
	            return this.transform.pointLocation(t.Point.convert(e))
	        }, o.prototype.isMoving = function() {
	            return this._moving || this.dragPan.isActive() || this.dragRotate.isActive() || this.scrollZoom.isActive()
	        }, o.prototype.isZooming = function() {
	            return this._zooming || this.scrollZoom.isActive()
	        }, o.prototype.isRotating = function() {
	            return this._rotating || this.dragRotate.isActive()
	        }, o.prototype.on = function(t, e, i) {
	            var o, r = this;
	            if (void 0 === i) return n.prototype.on.call(this, t, e);
	            var a = function() {
	                if ("mouseenter" === t || "mouseover" === t) {
	                    var n = !1;
	                    return {
	                        layer: e,
	                        listener: i,
	                        delegates: {
	                            mousemove: function(o) {
	                                var a = r.getLayer(e) ? r.queryRenderedFeatures(o.point, {
	                                    layers: [e]
	                                }) : [];
	                                a.length ? n || (n = !0, i.call(r, new Pi(t, r, o.originalEvent, {
	                                    features: a
	                                }))) : n = !1;
	                            },
	                            mouseout: function() {
	                                n = !1;
	                            }
	                        }
	                    }
	                }
	                if ("mouseleave" === t || "mouseout" === t) {
	                    var a = !1;
	                    return {
	                        layer: e,
	                        listener: i,
	                        delegates: {
	                            mousemove: function(n) {
	                                (r.getLayer(e) ? r.queryRenderedFeatures(n.point, {
	                                    layers: [e]
	                                }) : []).length ? a = !0 : a && (a = !1, i.call(r, new Pi(t, r, n.originalEvent)));
	                            },
	                            mouseout: function(e) {
	                                a && (a = !1, i.call(r, new Pi(t, r, e.originalEvent)));
	                            }
	                        }
	                    }
	                }
	                return {
	                    layer: e,
	                    listener: i,
	                    delegates: (o = {}, o[t] = function(t) {
	                        var n = r.getLayer(e) ? r.queryRenderedFeatures(t.point, {
	                            layers: [e]
	                        }) : [];
	                        n.length && (t.features = n, i.call(r, t), delete t.features);
	                    }, o)
	                }
	            }();
	            for (var s in this._delegatedListeners = this._delegatedListeners || {}, this._delegatedListeners[t] = this._delegatedListeners[t] || [], this._delegatedListeners[t].push(a), a.delegates) r.on(s, a.delegates[s]);
	            return this
	        }, o.prototype.off = function(t, e, i) {
	            if (void 0 === i) return n.prototype.off.call(this, t, e);
	            if (this._delegatedListeners && this._delegatedListeners[t])
	                for (var o = this._delegatedListeners[t], r = 0; r < o.length; r++) {
	                    var a = o[r];
	                    if (a.layer === e && a.listener === i) {
	                        for (var s in a.delegates) this.off(s, a.delegates[s]);
	                        return o.splice(r, 1), this
	                    }
	                }
	            return this
	        }, o.prototype.queryRenderedFeatures = function(e, i) {
	            if (!this.style) return [];
	            var n;
	            if (void 0 !== i || void 0 === e || e instanceof t.Point || Array.isArray(e) || (i = e, e = void 0), i = i || {}, (e = e || [
	                    [0, 0],
	                    [this.transform.width, this.transform.height]
	                ]) instanceof t.Point || "number" == typeof e[0]) n = [t.Point.convert(e)];
	            else {
	                var o = t.Point.convert(e[0]),
	                    r = t.Point.convert(e[1]);
	                n = [o, new t.Point(r.x, o.y), r, new t.Point(o.x, r.y), o];
	            }
	            return this.style.queryRenderedFeatures(n, i, this.transform)
	        }, o.prototype.querySourceFeatures = function(t, e) {
	            return this.style.querySourceFeatures(t, e)
	        }, o.prototype.setStyle = function(e, i) {
	            if ((!i || !1 !== i.diff && !i.localIdeographFontFamily) && this.style && e && "object" == typeof e) try {
	                return this.style.setState(e) && this._update(!0), this
	            } catch (e) {
	                t.warnOnce("Unable to perform style diff: " + (e.message || e.error || e) + ".  Rebuilding the style from scratch.");
	            }
	            return this.style && (this.style.setEventedParent(null), this.style._remove()), e ? (this.style = new qe(this, i || {}), this.style.setEventedParent(this, {
	                style: this.style
	            }), "string" == typeof e ? this.style.loadURL(e) : this.style.loadJSON(e), this) : (delete this.style, this)
	        }, o.prototype.getStyle = function() {
	            if (this.style) return this.style.serialize()
	        }, o.prototype.isStyleLoaded = function() {
	            return this.style ? this.style.loaded() : t.warnOnce("There is no style added to the map.")
	        }, o.prototype.addSource = function(t, e) {
	            return this.style.addSource(t, e), this._update(!0)
	        }, o.prototype.isSourceLoaded = function(e) {
	            var i = this.style && this.style.sourceCaches[e];
	            if (void 0 !== i) return i.loaded();
	            this.fire(new t.ErrorEvent(new Error("There is no source with ID '" + e + "'")));
	        }, o.prototype.areTilesLoaded = function() {
	            var t = this.style && this.style.sourceCaches;
	            for (var e in t) {
	                var i = t[e]._tiles;
	                for (var n in i) {
	                    var o = i[n];
	                    if ("loaded" !== o.state && "errored" !== o.state) return !1
	                }
	            }
	            return !0
	        }, o.prototype.addSourceType = function(t, e, i) {
	            return this.style.addSourceType(t, e, i)
	        }, o.prototype.removeSource = function(t) {
	            return this.style.removeSource(t), this._update(!0)
	        }, o.prototype.getSource = function(t) {
	            return this.style.getSource(t)
	        }, o.prototype.addImage = function(e, i, n) {
	            void 0 === n && (n = {});
	            var o = n.pixelRatio;
	            void 0 === o && (o = 1);
	            var r = n.sdf;
	            if (void 0 === r && (r = !1), i instanceof Hi) {
	                var a = t.browser.getImageData(i),
	                    s = a.width,
	                    l = a.height,
	                    c = a.data;
	                this.style.addImage(e, {
	                    data: new t.RGBAImage({
	                        width: s,
	                        height: l
	                    }, c),
	                    pixelRatio: o,
	                    sdf: r
	                });
	            } else {
	                if (void 0 === i.width || void 0 === i.height) return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.addImage(). The second argument must be an `HTMLImageElement`, `ImageData`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));
	                var h = i.width,
	                    u = i.height,
	                    p = i.data;
	                this.style.addImage(e, {
	                    data: new t.RGBAImage({
	                        width: h,
	                        height: u
	                    }, new Uint8Array(p)),
	                    pixelRatio: o,
	                    sdf: r
	                });
	            }
	        }, o.prototype.hasImage = function(e) {
	            return e ? !!this.style.getImage(e) : (this.fire(new t.ErrorEvent(new Error("Missing required image id"))), !1)
	        }, o.prototype.removeImage = function(t) {
	            this.style.removeImage(t);
	        }, o.prototype.loadImage = function(e, i) {
	            t.getImage(this._transformRequest(e, t.ResourceType.Image), i);
	        }, o.prototype.listImages = function() {
	            return this.style.listImages()
	        }, o.prototype.addLayer = function(t, e) {
	            return this.style.addLayer(t, e), this._update(!0)
	        }, o.prototype.moveLayer = function(t, e) {
	            return this.style.moveLayer(t, e), this._update(!0)
	        }, o.prototype.removeLayer = function(t) {
	            return this.style.removeLayer(t), this._update(!0)
	        }, o.prototype.getLayer = function(t) {
	            return this.style.getLayer(t)
	        }, o.prototype.setFilter = function(t, e) {
	            return this.style.setFilter(t, e), this._update(!0)
	        }, o.prototype.setLayerZoomRange = function(t, e, i) {
	            return this.style.setLayerZoomRange(t, e, i), this._update(!0)
	        }, o.prototype.getFilter = function(t) {
	            return this.style.getFilter(t)
	        }, o.prototype.setPaintProperty = function(t, e, i) {
	            return this.style.setPaintProperty(t, e, i), this._update(!0)
	        }, o.prototype.getPaintProperty = function(t, e) {
	            return this.style.getPaintProperty(t, e)
	        }, o.prototype.setLayoutProperty = function(t, e, i) {
	            return this.style.setLayoutProperty(t, e, i), this._update(!0)
	        }, o.prototype.getLayoutProperty = function(t, e) {
	            return this.style.getLayoutProperty(t, e)
	        }, o.prototype.setLight = function(t) {
	            return this.style.setLight(t), this._update(!0)
	        }, o.prototype.getLight = function() {
	            return this.style.getLight()
	        }, o.prototype.setFeatureState = function(t, e) {
	            return this.style.setFeatureState(t, e), this._update()
	        }, o.prototype.getFeatureState = function(t) {
	            return this.style.getFeatureState(t)
	        }, o.prototype.getContainer = function() {
	            return this._container
	        }, o.prototype.getCanvasContainer = function() {
	            return this._canvasContainer
	        }, o.prototype.getCanvas = function() {
	            return this._canvas
	        }, o.prototype._containerDimensions = function() {
	            var t = 0,
	                e = 0;
	            return this._container && (t = this._container.offsetWidth || 400, e = this._container.offsetHeight || 300), [t, e]
	        }, o.prototype._detectMissingCSS = function() {
	            "rgb(250, 128, 114)" !== t.window.getComputedStyle(this._missingCSSCanary).getPropertyValue("background-color") && t.warnOnce("This page appears to be missing CSS declarations for Mapbox GL JS, which may cause the map to display incorrectly. Please ensure your page includes mapbox-gl.css, as described in https://www.mapbox.com/mapbox-gl-js/api/.");
	        }, o.prototype._setupContainer = function() {
	            var t = this._container;
	            t.classList.add("mapboxgl-map"), (this._missingCSSCanary = i.create("div", "mapboxgl-canary", t)).style.visibility = "hidden", this._detectMissingCSS();
	            var e = this._canvasContainer = i.create("div", "mapboxgl-canvas-container", t);
	            this._interactive && e.classList.add("mapboxgl-interactive"), this._canvas = i.create("canvas", "mapboxgl-canvas", e), this._canvas.style.position = "absolute", this._canvas.addEventListener("webglcontextlost", this._contextLost, !1), this._canvas.addEventListener("webglcontextrestored", this._contextRestored, !1), this._canvas.setAttribute("tabindex", "0"), this._canvas.setAttribute("aria-label", "Map");
	            var n = this._containerDimensions();
	            this._resizeCanvas(n[0], n[1]);
	            var o = this._controlContainer = i.create("div", "mapboxgl-control-container", t),
	                r = this._controlPositions = {};
	            ["top-left", "top-right", "bottom-left", "bottom-right"].forEach(function(t) {
	                r[t] = i.create("div", "mapboxgl-ctrl-" + t, o);
	            });
	        }, o.prototype._resizeCanvas = function(e, i) {
	            var n = t.window.devicePixelRatio || 1;
	            this._canvas.width = n * e, this._canvas.height = n * i, this._canvas.style.width = e + "px", this._canvas.style.height = i + "px";
	        }, o.prototype._setupPainter = function() {
	            var i = t.extend({
	                    failIfMajorPerformanceCaveat: this._failIfMajorPerformanceCaveat,
	                    preserveDrawingBuffer: this._preserveDrawingBuffer
	                }, e.webGLContextAttributes),
	                n = this._canvas.getContext("webgl", i) || this._canvas.getContext("experimental-webgl", i);
	            n ? this.painter = new wi(n, this.transform) : this.fire(new t.ErrorEvent(new Error("Failed to initialize WebGL")));
	        }, o.prototype._contextLost = function(e) {
	            e.preventDefault(), this._frame && (this._frame.cancel(), this._frame = null), this.fire(new t.Event("webglcontextlost", {
	                originalEvent: e
	            }));
	        }, o.prototype._contextRestored = function(e) {
	            this._setupPainter(), this.resize(), this._update(), this.fire(new t.Event("webglcontextrestored", {
	                originalEvent: e
	            }));
	        }, o.prototype.loaded = function() {
	            return !this._styleDirty && !this._sourcesDirty && !!this.style && this.style.loaded()
	        }, o.prototype._update = function(t) {
	            return this.style ? (this._styleDirty = this._styleDirty || t, this._sourcesDirty = !0, this._rerender(), this) : this
	        }, o.prototype._requestRenderFrame = function(t) {
	            return this._update(), this._renderTaskQueue.add(t)
	        }, o.prototype._cancelRenderFrame = function(t) {
	            this._renderTaskQueue.remove(t);
	        }, o.prototype._render = function() {
	            this._renderTaskQueue.run();
	            var e = !1;
	            if (this.style && this._styleDirty) {
	                this._styleDirty = !1;
	                var i = this.transform.zoom,
	                    n = t.browser.now();
	                this.style.zoomHistory.update(i, n);
	                var o = new t.EvaluationParameters(i, {
	                        now: n,
	                        fadeDuration: this._fadeDuration,
	                        zoomHistory: this.style.zoomHistory,
	                        transition: this.style.getTransition()
	                    }),
	                    r = o.crossFadingFactor();
	                1 === r && r === this._crossFadingFactor || (e = !0, this._crossFadingFactor = r), this.style.update(o);
	            }
	            return this.style && this._sourcesDirty && (this._sourcesDirty = !1, this.style._updateSources(this.transform)), this._placementDirty = this.style && this.style._updatePlacement(this.painter.transform, this.showCollisionBoxes, this._fadeDuration, this._crossSourceCollisions), this.painter.render(this.style, {
	                showTileBoundaries: this.showTileBoundaries,
	                showOverdrawInspector: this._showOverdrawInspector,
	                rotating: this.isRotating(),
	                zooming: this.isZooming(),
	                fadeDuration: this._fadeDuration
	            }), this.fire(new t.Event("render")), this.loaded() && !this._loaded && (this._loaded = !0, this.fire(new t.Event("load"))), this.style && (this.style.hasTransitions() || e) && (this._styleDirty = !0), this.style && !this._placementDirty && this.style._releaseSymbolFadeTiles(), (this._sourcesDirty || this._repaint || this._styleDirty || this._placementDirty) && this._rerender(), this
	        }, o.prototype.remove = function() {
	            this._hash && this._hash.remove(), this._frame && (this._frame.cancel(), this._frame = null), this._renderTaskQueue.clear(), this.setStyle(null), void 0 !== t.window && (t.window.removeEventListener("resize", this._onWindowResize, !1), t.window.removeEventListener("online", this._onWindowOnline, !1));
	            for (var e = 0, i = this._controls; e < i.length; e += 1) {
	                i[e].onRemove(this);
	            }
	            this._controls = [];
	            var n = this.painter.context.gl.getExtension("WEBGL_lose_context");
	            n && n.loseContext(), Qi(this._canvasContainer), Qi(this._controlContainer), Qi(this._missingCSSCanary), this._container.classList.remove("mapboxgl-map"), this.fire(new t.Event("remove"));
	        }, o.prototype._rerender = function() {
	            var e = this;
	            this.style && !this._frame && (this._frame = t.browser.frame(function() {
	                e._frame = null, e._render();
	            }));
	        }, o.prototype._onWindowOnline = function() {
	            this._update();
	        }, o.prototype._onWindowResize = function() {
	            this._trackResize && this.resize()._update();
	        }, r.showTileBoundaries.get = function() {
	            return !!this._showTileBoundaries
	        }, r.showTileBoundaries.set = function(t) {
	            this._showTileBoundaries !== t && (this._showTileBoundaries = t, this._update());
	        }, r.showCollisionBoxes.get = function() {
	            return !!this._showCollisionBoxes
	        }, r.showCollisionBoxes.set = function(t) {
	            this._showCollisionBoxes !== t && (this._showCollisionBoxes = t, t ? this.style._generateCollisionBoxes() : this._update());
	        }, r.showOverdrawInspector.get = function() {
	            return !!this._showOverdrawInspector
	        }, r.showOverdrawInspector.set = function(t) {
	            this._showOverdrawInspector !== t && (this._showOverdrawInspector = t, this._update());
	        }, r.repaint.get = function() {
	            return !!this._repaint
	        }, r.repaint.set = function(t) {
	            this._repaint = t, this._update();
	        }, r.vertices.get = function() {
	            return !!this._vertices
	        }, r.vertices.set = function(t) {
	            this._vertices = t, this._update();
	        }, Object.defineProperties(o.prototype, r), o
	    }(qi);

	function Qi(t) {
	    t.parentNode && t.parentNode.removeChild(t);
	}
	var $i = {
	        showCompass: !0,
	        showZoom: !0
	    },
	    tn = function(e) {
	        var n = this;
	        this.options = t.extend({}, $i, e), this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-group"), this._container.addEventListener("contextmenu", function(t) {
	            return t.preventDefault()
	        }), this.options.showZoom && (this._zoomInButton = this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in", "Zoom In", function() {
	            return n._map.zoomIn()
	        }), this._zoomOutButton = this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out", "Zoom Out", function() {
	            return n._map.zoomOut()
	        })), this.options.showCompass && (t.bindAll(["_rotateCompassArrow"], this), this._compass = this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-compass", "Reset North", function() {
	            return n._map.resetNorth()
	        }), this._compassArrow = i.create("span", "mapboxgl-ctrl-compass-arrow", this._compass));
	    };

	function en(t, e, i) {
	    if (t = new N(t.lng, t.lat), e) {
	        var n = new N(t.lng - 360, t.lat),
	            o = new N(t.lng + 360, t.lat),
	            r = i.locationPoint(t).distSqr(e);
	        i.locationPoint(n).distSqr(e) < r ? t = n : i.locationPoint(o).distSqr(e) < r && (t = o);
	    }
	    for (; Math.abs(t.lng - i.center.lng) > 180;) {
	        var a = i.locationPoint(t);
	        if (a.x >= 0 && a.y >= 0 && a.x <= i.width && a.y <= i.height) break;
	        t.lng > i.center.lng ? t.lng -= 360 : t.lng += 360;
	    }
	    return t
	}
	tn.prototype._rotateCompassArrow = function() {
	    var t = "rotate(" + this._map.transform.angle * (180 / Math.PI) + "deg)";
	    this._compassArrow.style.transform = t;
	}, tn.prototype.onAdd = function(t) {
	    return this._map = t, this.options.showCompass && (this._map.on("rotate", this._rotateCompassArrow), this._rotateCompassArrow(), this._handler = new ki(t, {
	        button: "left",
	        element: this._compass
	    }), i.addEventListener(this._compass, "mousedown", this._handler.onMouseDown), this._handler.enable()), this._container
	}, tn.prototype.onRemove = function() {
	    i.remove(this._container), this.options.showCompass && (this._map.off("rotate", this._rotateCompassArrow), i.removeEventListener(this._compass, "mousedown", this._handler.onMouseDown), this._handler.disable(), delete this._handler), delete this._map;
	}, tn.prototype._createButton = function(t, e, n) {
	    var o = i.create("button", t, this._container);
	    return o.type = "button", o.setAttribute("aria-label", e), o.addEventListener("click", n), o
	};
	var nn = {
	    center: "translate(-50%,-50%)",
	    top: "translate(-50%,0)",
	    "top-left": "translate(0,0)",
	    "top-right": "translate(-100%,0)",
	    bottom: "translate(-50%,-100%)",
	    "bottom-left": "translate(0,-100%)",
	    "bottom-right": "translate(-100%,-100%)",
	    left: "translate(0,-50%)",
	    right: "translate(-100%,-50%)"
	};

	function on(t, e, i) {
	    var n = t.classList;
	    for (var o in nn) n.remove("mapboxgl-" + i + "-anchor-" + o);
	    n.add("mapboxgl-" + i + "-anchor-" + e);
	}
	var rn, an = function(e) {
	        function n(n) {
	            if (e.call(this), (arguments[0] instanceof t.window.HTMLElement || 2 === arguments.length) && (n = t.extend({
	                    element: n
	                }, arguments[1])), t.bindAll(["_update", "_onMove", "_onUp", "_addDragHandler", "_onMapClick"], this), this._anchor = n && n.anchor || "center", this._color = n && n.color || "#3FB1CE", this._draggable = n && n.draggable || !1, this._state = "inactive", n && n.element) this._element = n.element, this._offset = t.Point.convert(n && n.offset || [0, 0]);
	            else {
	                this._defaultMarker = !0, this._element = i.create("div");
	                var o = i.createNS("http://www.w3.org/2000/svg", "svg");
	                o.setAttributeNS(null, "height", "41px"), o.setAttributeNS(null, "width", "27px"), o.setAttributeNS(null, "viewBox", "0 0 27 41");
	                var r = i.createNS("http://www.w3.org/2000/svg", "g");
	                r.setAttributeNS(null, "stroke", "none"), r.setAttributeNS(null, "stroke-width", "1"), r.setAttributeNS(null, "fill", "none"), r.setAttributeNS(null, "fill-rule", "evenodd");
	                var a = i.createNS("http://www.w3.org/2000/svg", "g");
	                a.setAttributeNS(null, "fill-rule", "nonzero");
	                var s = i.createNS("http://www.w3.org/2000/svg", "g");
	                s.setAttributeNS(null, "transform", "translate(3.0, 29.0)"), s.setAttributeNS(null, "fill", "#000000");
	                for (var l = 0, c = [{
	                        rx: "10.5",
	                        ry: "5.25002273"
	                    }, {
	                        rx: "10.5",
	                        ry: "5.25002273"
	                    }, {
	                        rx: "9.5",
	                        ry: "4.77275007"
	                    }, {
	                        rx: "8.5",
	                        ry: "4.29549936"
	                    }, {
	                        rx: "7.5",
	                        ry: "3.81822308"
	                    }, {
	                        rx: "6.5",
	                        ry: "3.34094679"
	                    }, {
	                        rx: "5.5",
	                        ry: "2.86367051"
	                    }, {
	                        rx: "4.5",
	                        ry: "2.38636864"
	                    }]; l < c.length; l += 1) {
	                    var h = c[l],
	                        u = i.createNS("http://www.w3.org/2000/svg", "ellipse");
	                    u.setAttributeNS(null, "opacity", "0.04"), u.setAttributeNS(null, "cx", "10.5"), u.setAttributeNS(null, "cy", "5.80029008"), u.setAttributeNS(null, "rx", h.rx), u.setAttributeNS(null, "ry", h.ry), s.appendChild(u);
	                }
	                var p = i.createNS("http://www.w3.org/2000/svg", "g");
	                p.setAttributeNS(null, "fill", this._color);
	                var d = i.createNS("http://www.w3.org/2000/svg", "path");
	                d.setAttributeNS(null, "d", "M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"), p.appendChild(d);
	                var f = i.createNS("http://www.w3.org/2000/svg", "g");
	                f.setAttributeNS(null, "opacity", "0.25"), f.setAttributeNS(null, "fill", "#000000");
	                var m = i.createNS("http://www.w3.org/2000/svg", "path");
	                m.setAttributeNS(null, "d", "M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"), f.appendChild(m);
	                var _ = i.createNS("http://www.w3.org/2000/svg", "g");
	                _.setAttributeNS(null, "transform", "translate(6.0, 7.0)"), _.setAttributeNS(null, "fill", "#FFFFFF");
	                var g = i.createNS("http://www.w3.org/2000/svg", "g");
	                g.setAttributeNS(null, "transform", "translate(8.0, 8.0)");
	                var v = i.createNS("http://www.w3.org/2000/svg", "circle");
	                v.setAttributeNS(null, "fill", "#000000"), v.setAttributeNS(null, "opacity", "0.25"), v.setAttributeNS(null, "cx", "5.5"), v.setAttributeNS(null, "cy", "5.5"), v.setAttributeNS(null, "r", "5.4999962");
	                var y = i.createNS("http://www.w3.org/2000/svg", "circle");
	                y.setAttributeNS(null, "fill", "#FFFFFF"), y.setAttributeNS(null, "cx", "5.5"), y.setAttributeNS(null, "cy", "5.5"), y.setAttributeNS(null, "r", "5.4999962"), g.appendChild(v), g.appendChild(y), a.appendChild(s), a.appendChild(p), a.appendChild(f), a.appendChild(_), a.appendChild(g), o.appendChild(a), this._element.appendChild(o), this._offset = t.Point.convert(n && n.offset || [0, -14]);
	            }
	            this._element.classList.add("mapboxgl-marker"), this._popup = null;
	        }
	        return e && (n.__proto__ = e), n.prototype = Object.create(e && e.prototype), n.prototype.constructor = n, n.prototype.addTo = function(t) {
	            return this.remove(), this._map = t, t.getCanvasContainer().appendChild(this._element), t.on("move", this._update), t.on("moveend", this._update), this.setDraggable(this._draggable), this._update(), this._map.on("click", this._onMapClick), this
	        }, n.prototype.remove = function() {
	            return this._map && (this._map.off("click", this._onMapClick), this._map.off("move", this._update), this._map.off("moveend", this._update), this._map.off("mousedown", this._addDragHandler), this._map.off("touchstart", this._addDragHandler), delete this._map), i.remove(this._element), this._popup && this._popup.remove(), this
	        }, n.prototype.getLngLat = function() {
	            return this._lngLat
	        }, n.prototype.setLngLat = function(t) {
	            return this._lngLat = N.convert(t), this._pos = null, this._popup && this._popup.setLngLat(this._lngLat), this._update(), this
	        }, n.prototype.getElement = function() {
	            return this._element
	        }, n.prototype.setPopup = function(t) {
	            if (this._popup && (this._popup.remove(), this._popup = null), t) {
	                if (!("offset" in t.options)) {
	                    var e = Math.sqrt(Math.pow(13.5, 2) / 2);
	                    t.options.offset = this._defaultMarker ? {
	                        top: [0, 0],
	                        "top-left": [0, 0],
	                        "top-right": [0, 0],
	                        bottom: [0, -38.1],
	                        "bottom-left": [e, -1 * (24.6 + e)],
	                        "bottom-right": [-e, -1 * (24.6 + e)],
	                        left: [13.5, -24.6],
	                        right: [-13.5, -24.6]
	                    } : this._offset;
	                }
	                this._popup = t, this._lngLat && this._popup.setLngLat(this._lngLat);
	            }
	            return this
	        }, n.prototype._onMapClick = function(t) {
	            var e = t.originalEvent.target,
	                i = this._element;
	            this._popup && (e === i || i.contains(e)) && this.togglePopup();
	        }, n.prototype.getPopup = function() {
	            return this._popup
	        }, n.prototype.togglePopup = function() {
	            var t = this._popup;
	            return t ? (t.isOpen() ? t.remove() : t.addTo(this._map), this) : this
	        }, n.prototype._update = function(t) {
	            this._map && (this._map.transform.renderWorldCopies && (this._lngLat = en(this._lngLat, this._pos, this._map.transform)), this._pos = this._map.project(this._lngLat)._add(this._offset), t && "moveend" !== t.type || (this._pos = this._pos.round()), i.setTransform(this._element, nn[this._anchor] + " translate(" + this._pos.x + "px, " + this._pos.y + "px)"), on(this._element, this._anchor, "marker"));
	        }, n.prototype.getOffset = function() {
	            return this._offset
	        }, n.prototype.setOffset = function(e) {
	            return this._offset = t.Point.convert(e), this._update(), this
	        }, n.prototype._onMove = function(e) {
	            this._pos = e.point.sub(this._positionDelta), this._lngLat = this._map.unproject(this._pos), this.setLngLat(this._lngLat), this._element.style.pointerEvents = "none", "pending" === this._state && (this._state = "active", this.fire(new t.Event("dragstart"))), this.fire(new t.Event("drag"));
	        }, n.prototype._onUp = function() {
	            this._element.style.pointerEvents = "auto", this._positionDelta = null, this._map.off("mousemove", this._onMove), this._map.off("touchmove", this._onMove), "active" === this._state && this.fire(new t.Event("dragend")), this._state = "inactive";
	        }, n.prototype._addDragHandler = function(t) {
	            this._element.contains(t.originalEvent.target) && (t.preventDefault(), this._positionDelta = t.point.sub(this._pos).add(this._offset), this._state = "pending", this._map.on("mousemove", this._onMove), this._map.on("touchmove", this._onMove), this._map.once("mouseup", this._onUp), this._map.once("touchend", this._onUp));
	        }, n.prototype.setDraggable = function(t) {
	            return this._draggable = !!t, this._map && (t ? (this._map.on("mousedown", this._addDragHandler), this._map.on("touchstart", this._addDragHandler)) : (this._map.off("mousedown", this._addDragHandler), this._map.off("touchstart", this._addDragHandler))), this
	        }, n.prototype.isDraggable = function() {
	            return this._draggable
	        }, n
	    }(t.Evented),
	    sn = {
	        positionOptions: {
	            enableHighAccuracy: !1,
	            maximumAge: 0,
	            timeout: 6e3
	        },
	        fitBoundsOptions: {
	            maxZoom: 15
	        },
	        trackUserLocation: !1,
	        showUserLocation: !0
	    };
	var ln = function(e) {
	        function n(i) {
	            e.call(this), this.options = t.extend({}, sn, i), t.bindAll(["_onSuccess", "_onError", "_finish", "_setupUI", "_updateCamera", "_updateMarker"], this);
	        }
	        return e && (n.__proto__ = e), n.prototype = Object.create(e && e.prototype), n.prototype.constructor = n, n.prototype.onAdd = function(e) {
	            var n;
	            return this._map = e, this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-group"), n = this._setupUI, void 0 !== rn ? n(rn) : void 0 !== t.window.navigator.permissions ? t.window.navigator.permissions.query({
	                name: "geolocation"
	            }).then(function(t) {
	                rn = "denied" !== t.state, n(rn);
	            }) : (rn = !!t.window.navigator.geolocation, n(rn)), this._container
	        }, n.prototype.onRemove = function() {
	            void 0 !== this._geolocationWatchID && (t.window.navigator.geolocation.clearWatch(this._geolocationWatchID), this._geolocationWatchID = void 0), this.options.showUserLocation && this._userLocationDotMarker && this._userLocationDotMarker.remove(), i.remove(this._container), this._map = void 0;
	        }, n.prototype._onSuccess = function(e) {
	            if (this.options.trackUserLocation) switch (this._lastKnownPosition = e, this._watchState) {
	                case "WAITING_ACTIVE":
	                case "ACTIVE_LOCK":
	                case "ACTIVE_ERROR":
	                    this._watchState = "ACTIVE_LOCK", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");
	                    break;
	                case "BACKGROUND":
	                case "BACKGROUND_ERROR":
	                    this._watchState = "BACKGROUND", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");
	            }
	            this.options.showUserLocation && "OFF" !== this._watchState && this._updateMarker(e), this.options.trackUserLocation && "ACTIVE_LOCK" !== this._watchState || this._updateCamera(e), this.options.showUserLocation && this._dotElement.classList.remove("mapboxgl-user-location-dot-stale"), this.fire(new t.Event("geolocate", e)), this._finish();
	        }, n.prototype._updateCamera = function(t) {
	            var e = new N(t.coords.longitude, t.coords.latitude),
	                i = t.coords.accuracy;
	            this._map.fitBounds(e.toBounds(i), this.options.fitBoundsOptions, {
	                geolocateSource: !0
	            });
	        }, n.prototype._updateMarker = function(t) {
	            t ? this._userLocationDotMarker.setLngLat([t.coords.longitude, t.coords.latitude]).addTo(this._map) : this._userLocationDotMarker.remove();
	        }, n.prototype._onError = function(e) {
	            if (this.options.trackUserLocation)
	                if (1 === e.code) this._watchState = "OFF", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"), void 0 !== this._geolocationWatchID && this._clearWatch();
	                else switch (this._watchState) {
	                    case "WAITING_ACTIVE":
	                        this._watchState = "ACTIVE_ERROR", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");
	                        break;
	                    case "ACTIVE_LOCK":
	                        this._watchState = "ACTIVE_ERROR", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");
	                        break;
	                    case "BACKGROUND":
	                        this._watchState = "BACKGROUND_ERROR", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");
	                }
	            "OFF" !== this._watchState && this.options.showUserLocation && this._dotElement.classList.add("mapboxgl-user-location-dot-stale"), this.fire(new t.Event("error", e)), this._finish();
	        }, n.prototype._finish = function() {
	            this._timeoutId && clearTimeout(this._timeoutId), this._timeoutId = void 0;
	        }, n.prototype._setupUI = function(e) {
	            var n = this;
	            !1 !== e ? (this._container.addEventListener("contextmenu", function(t) {
	                return t.preventDefault()
	            }), this._geolocateButton = i.create("button", "mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate", this._container), this._geolocateButton.type = "button", this._geolocateButton.setAttribute("aria-label", "Geolocate"), this.options.trackUserLocation && (this._geolocateButton.setAttribute("aria-pressed", "false"), this._watchState = "OFF"), this.options.showUserLocation && (this._dotElement = i.create("div", "mapboxgl-user-location-dot"), this._userLocationDotMarker = new an(this._dotElement), this.options.trackUserLocation && (this._watchState = "OFF")), this._geolocateButton.addEventListener("click", this.trigger.bind(this)), this._setup = !0, this.options.trackUserLocation && this._map.on("movestart", function(e) {
	                e.geolocateSource || "ACTIVE_LOCK" !== n._watchState || (n._watchState = "BACKGROUND", n._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background"), n._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), n.fire(new t.Event("trackuserlocationend")));
	            })) : t.warnOnce("Geolocation support is not available, the GeolocateControl will not be visible.");
	        }, n.prototype.trigger = function() {
	            if (!this._setup) return t.warnOnce("Geolocate control triggered before added to a map"), !1;
	            if (this.options.trackUserLocation) {
	                switch (this._watchState) {
	                    case "OFF":
	                        this._watchState = "WAITING_ACTIVE", this.fire(new t.Event("trackuserlocationstart"));
	                        break;
	                    case "WAITING_ACTIVE":
	                    case "ACTIVE_LOCK":
	                    case "ACTIVE_ERROR":
	                    case "BACKGROUND_ERROR":
	                        this._watchState = "OFF", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"), this.fire(new t.Event("trackuserlocationend"));
	                        break;
	                    case "BACKGROUND":
	                        this._watchState = "ACTIVE_LOCK", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._lastKnownPosition && this._updateCamera(this._lastKnownPosition), this.fire(new t.Event("trackuserlocationstart"));
	                }
	                switch (this._watchState) {
	                    case "WAITING_ACTIVE":
	                        this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");
	                        break;
	                    case "ACTIVE_LOCK":
	                        this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");
	                        break;
	                    case "ACTIVE_ERROR":
	                        this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");
	                        break;
	                    case "BACKGROUND":
	                        this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");
	                        break;
	                    case "BACKGROUND_ERROR":
	                        this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error");
	                }
	                "OFF" === this._watchState && void 0 !== this._geolocationWatchID ? this._clearWatch() : void 0 === this._geolocationWatchID && (this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.setAttribute("aria-pressed", "true"), this._geolocationWatchID = t.window.navigator.geolocation.watchPosition(this._onSuccess, this._onError, this.options.positionOptions));
	            } else t.window.navigator.geolocation.getCurrentPosition(this._onSuccess, this._onError, this.options.positionOptions), this._timeoutId = setTimeout(this._finish, 1e4);
	            return !0
	        }, n.prototype._clearWatch = function() {
	            t.window.navigator.geolocation.clearWatch(this._geolocationWatchID), this._geolocationWatchID = void 0, this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.setAttribute("aria-pressed", "false"), this.options.showUserLocation && this._updateMarker(null);
	        }, n
	    }(t.Evented),
	    cn = {
	        maxWidth: 100,
	        unit: "metric"
	    },
	    hn = function(e) {
	        this.options = t.extend({}, cn, e), t.bindAll(["_onMove", "setUnit"], this);
	    };

	function un(t, e, i) {
	    var n, o, r, a, s, l, c = i && i.maxWidth || 100,
	        h = t._container.clientHeight / 2,
	        u = (n = t.unproject([0, h]), o = t.unproject([c, h]), r = Math.PI / 180, a = n.lat * r, s = o.lat * r, l = Math.sin(a) * Math.sin(s) + Math.cos(a) * Math.cos(s) * Math.cos((o.lng - n.lng) * r), 6371e3 * Math.acos(Math.min(l, 1)));
	    if (i && "imperial" === i.unit) {
	        var p = 3.2808 * u;
	        if (p > 5280) pn(e, c, p / 5280, "mi");
	        else pn(e, c, p, "ft");
	    } else if (i && "nautical" === i.unit) {
	        pn(e, c, u / 1852, "nm");
	    } else pn(e, c, u, "m");
	}

	function pn(t, e, i, n) {
	    var o, r, a, s = (o = i, (r = Math.pow(10, ("" + Math.floor(o)).length - 1)) * (a = (a = o / r) >= 10 ? 10 : a >= 5 ? 5 : a >= 3 ? 3 : a >= 2 ? 2 : 1)),
	        l = s / i;
	    "m" === n && s >= 1e3 && (s /= 1e3, n = "km"), t.style.width = e * l + "px", t.innerHTML = s + n;
	}
	hn.prototype.getDefaultPosition = function() {
	    return "bottom-left"
	}, hn.prototype._onMove = function() {
	    un(this._map, this._container, this.options);
	}, hn.prototype.onAdd = function(t) {
	    return this._map = t, this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-scale", t.getContainer()), this._map.on("move", this._onMove), this._onMove(), this._container
	}, hn.prototype.onRemove = function() {
	    i.remove(this._container), this._map.off("move", this._onMove), this._map = void 0;
	}, hn.prototype.setUnit = function(t) {
	    this.options.unit = t, un(this._map, this._container, this.options);
	};
	var dn = function() {
	    this._fullscreen = !1, t.bindAll(["_onClickFullscreen", "_changeIcon"], this), "onfullscreenchange" in t.window.document ? this._fullscreenchange = "fullscreenchange" : "onmozfullscreenchange" in t.window.document ? this._fullscreenchange = "mozfullscreenchange" : "onwebkitfullscreenchange" in t.window.document ? this._fullscreenchange = "webkitfullscreenchange" : "onmsfullscreenchange" in t.window.document && (this._fullscreenchange = "MSFullscreenChange"), this._className = "mapboxgl-ctrl";
	};
	dn.prototype.onAdd = function(e) {
	    return this._map = e, this._mapContainer = this._map.getContainer(), this._container = i.create("div", this._className + " mapboxgl-ctrl-group"), this._checkFullscreenSupport() ? this._setupUI() : (this._container.style.display = "none", t.warnOnce("This device does not support fullscreen mode.")), this._container
	}, dn.prototype.onRemove = function() {
	    i.remove(this._container), this._map = null, t.window.document.removeEventListener(this._fullscreenchange, this._changeIcon);
	}, dn.prototype._checkFullscreenSupport = function() {
	    return !!(t.window.document.fullscreenEnabled || t.window.document.mozFullScreenEnabled || t.window.document.msFullscreenEnabled || t.window.document.webkitFullscreenEnabled)
	}, dn.prototype._setupUI = function() {
	    var e = this._fullscreenButton = i.create("button", this._className + "-icon " + this._className + "-fullscreen", this._container);
	    e.setAttribute("aria-label", "Toggle fullscreen"), e.type = "button", this._fullscreenButton.addEventListener("click", this._onClickFullscreen), t.window.document.addEventListener(this._fullscreenchange, this._changeIcon);
	}, dn.prototype._isFullscreen = function() {
	    return this._fullscreen
	}, dn.prototype._changeIcon = function() {
	    (t.window.document.fullscreenElement || t.window.document.mozFullScreenElement || t.window.document.webkitFullscreenElement || t.window.document.msFullscreenElement) === this._mapContainer !== this._fullscreen && (this._fullscreen = !this._fullscreen, this._fullscreenButton.classList.toggle(this._className + "-shrink"), this._fullscreenButton.classList.toggle(this._className + "-fullscreen"));
	}, dn.prototype._onClickFullscreen = function() {
	    this._isFullscreen() ? t.window.document.exitFullscreen ? t.window.document.exitFullscreen() : t.window.document.mozCancelFullScreen ? t.window.document.mozCancelFullScreen() : t.window.document.msExitFullscreen ? t.window.document.msExitFullscreen() : t.window.document.webkitCancelFullScreen && t.window.document.webkitCancelFullScreen() : this._mapContainer.requestFullscreen ? this._mapContainer.requestFullscreen() : this._mapContainer.mozRequestFullScreen ? this._mapContainer.mozRequestFullScreen() : this._mapContainer.msRequestFullscreen ? this._mapContainer.msRequestFullscreen() : this._mapContainer.webkitRequestFullscreen && this._mapContainer.webkitRequestFullscreen();
	};
	var fn = {
	        closeButton: !0,
	        closeOnClick: !0,
	        className: ""
	    },
	    mn = function(e) {
	        function n(i) {
	            e.call(this), this.options = t.extend(Object.create(fn), i), t.bindAll(["_update", "_onClickClose"], this);
	        }
	        return e && (n.__proto__ = e), n.prototype = Object.create(e && e.prototype), n.prototype.constructor = n, n.prototype.addTo = function(e) {
	            return this._map = e, this._map.on("move", this._update), this.options.closeOnClick && this._map.on("click", this._onClickClose), this._update(), this.fire(new t.Event("open")), this
	        }, n.prototype.isOpen = function() {
	            return !!this._map
	        }, n.prototype.remove = function() {
	            return this._content && i.remove(this._content), this._container && (i.remove(this._container), delete this._container), this._map && (this._map.off("move", this._update), this._map.off("click", this._onClickClose), delete this._map), this.fire(new t.Event("close")), this
	        }, n.prototype.getLngLat = function() {
	            return this._lngLat
	        }, n.prototype.setLngLat = function(t) {
	            return this._lngLat = N.convert(t), this._pos = null, this._update(), this
	        }, n.prototype.setText = function(e) {
	            return this.setDOMContent(t.window.document.createTextNode(e))
	        }, n.prototype.setHTML = function(e) {
	            var i, n = t.window.document.createDocumentFragment(),
	                o = t.window.document.createElement("body");
	            for (o.innerHTML = e; i = o.firstChild;) n.appendChild(i);
	            return this.setDOMContent(n)
	        }, n.prototype.setDOMContent = function(t) {
	            return this._createContent(), this._content.appendChild(t), this._update(), this
	        }, n.prototype._createContent = function() {
	            this._content && i.remove(this._content), this._content = i.create("div", "mapboxgl-popup-content", this._container), this.options.closeButton && (this._closeButton = i.create("button", "mapboxgl-popup-close-button", this._content), this._closeButton.type = "button", this._closeButton.setAttribute("aria-label", "Close popup"), this._closeButton.innerHTML = "&#215;", this._closeButton.addEventListener("click", this._onClickClose));
	        }, n.prototype._update = function() {
	            var e = this;
	            if (this._map && this._lngLat && this._content) {
	                this._container || (this._container = i.create("div", "mapboxgl-popup", this._map.getContainer()), this._tip = i.create("div", "mapboxgl-popup-tip", this._container), this._container.appendChild(this._content), this.options.className && this.options.className.split(" ").forEach(function(t) {
	                    return e._container.classList.add(t)
	                })), this._map.transform.renderWorldCopies && (this._lngLat = en(this._lngLat, this._pos, this._map.transform));
	                var n = this._pos = this._map.project(this._lngLat),
	                    o = this.options.anchor,
	                    r = function e(i) {
	                        if (i) {
	                            if ("number" == typeof i) {
	                                var n = Math.round(Math.sqrt(.5 * Math.pow(i, 2)));
	                                return {
	                                    center: new t.Point(0, 0),
	                                    top: new t.Point(0, i),
	                                    "top-left": new t.Point(n, n),
	                                    "top-right": new t.Point(-n, n),
	                                    bottom: new t.Point(0, -i),
	                                    "bottom-left": new t.Point(n, -n),
	                                    "bottom-right": new t.Point(-n, -n),
	                                    left: new t.Point(i, 0),
	                                    right: new t.Point(-i, 0)
	                                }
	                            }
	                            if (i instanceof t.Point || Array.isArray(i)) {
	                                var o = t.Point.convert(i);
	                                return {
	                                    center: o,
	                                    top: o,
	                                    "top-left": o,
	                                    "top-right": o,
	                                    bottom: o,
	                                    "bottom-left": o,
	                                    "bottom-right": o,
	                                    left: o,
	                                    right: o
	                                }
	                            }
	                            return {
	                                center: t.Point.convert(i.center || [0, 0]),
	                                top: t.Point.convert(i.top || [0, 0]),
	                                "top-left": t.Point.convert(i["top-left"] || [0, 0]),
	                                "top-right": t.Point.convert(i["top-right"] || [0, 0]),
	                                bottom: t.Point.convert(i.bottom || [0, 0]),
	                                "bottom-left": t.Point.convert(i["bottom-left"] || [0, 0]),
	                                "bottom-right": t.Point.convert(i["bottom-right"] || [0, 0]),
	                                left: t.Point.convert(i.left || [0, 0]),
	                                right: t.Point.convert(i.right || [0, 0])
	                            }
	                        }
	                        return e(new t.Point(0, 0))
	                    }(this.options.offset);
	                if (!o) {
	                    var a, s = this._container.offsetWidth,
	                        l = this._container.offsetHeight;
	                    a = n.y + r.bottom.y < l ? ["top"] : n.y > this._map.transform.height - l ? ["bottom"] : [], n.x < s / 2 ? a.push("left") : n.x > this._map.transform.width - s / 2 && a.push("right"), o = 0 === a.length ? "bottom" : a.join("-");
	                }
	                var c = n.add(r[o]).round();
	                i.setTransform(this._container, nn[o] + " translate(" + c.x + "px," + c.y + "px)"), on(this._container, o, "popup");
	            }
	        }, n.prototype._onClickClose = function() {
	            this.remove();
	        }, n
	    }(t.Evented);
	var _n = {
	    version: "0.48.0",
	    supported: e,
	    setRTLTextPlugin: t.setRTLTextPlugin,
	    Map: Ji,
	    NavigationControl: tn,
	    GeolocateControl: ln,
	    AttributionControl: Gi,
	    ScaleControl: hn,
	    FullscreenControl: dn,
	    Popup: mn,
	    Marker: an,
	    Style: qe,
	    LngLat: N,
	    LngLatBounds: U,
	    Point: t.Point,
	    Evented: t.Evented,
	    config: u,
	    get accessToken() {
	        return u.ACCESS_TOKEN
	    },
	    set accessToken(t) {
	        u.ACCESS_TOKEN = t;
	    },
	    get workerCount() {
	        return qt.workerCount
	    },
	    set workerCount(t) {
	        qt.workerCount = t;
	    },
	    workerUrl: ""
	};
	return _n
	
});

//

return mapboxgl;

})));
//# sourceMappingURL=mapbox-gl.js.map
