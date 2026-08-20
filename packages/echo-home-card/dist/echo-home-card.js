var Ye = Object.defineProperty;
var Je = (s, e, t) => e in s ? Ye(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var z = (s, e, t) => Je(s, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ue = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), fe = /* @__PURE__ */ new WeakMap();
let Ie = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ue && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = fe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && fe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Xe = (s) => new Ie(typeof s == "string" ? s : s + "", void 0, de), He = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((a, o, i) => a + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[i + 1], s[0]);
  return new Ie(t, s, de);
}, Ze = (s, e) => {
  if (ue) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), o = X.litNonce;
    o !== void 0 && a.setAttribute("nonce", o), a.textContent = t.cssText, s.appendChild(a);
  }
}, ge = ue ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return Xe(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qe, defineProperty: et, getOwnPropertyDescriptor: tt, getOwnPropertyNames: at, getOwnPropertySymbols: ot, getPrototypeOf: it } = Object, C = globalThis, _e = C.trustedTypes, nt = _e ? _e.emptyScript : "", ee = C.reactiveElementPolyfillSupport, F = (s, e) => s, re = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? nt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, je = (s, e) => !Qe(s, e), be = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: je };
var Ne, Me;
(Ne = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Me = C.litPropertyMetadata) != null || (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = be) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = Symbol(), o = this.getPropertyDescriptor(e, a, t);
      o !== void 0 && et(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    var n;
    const { get: o, set: i } = (n = tt(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: o, set(l) {
      const r = o == null ? void 0 : o.call(this);
      i == null || i.call(this, l), this.requestUpdate(e, r, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : be;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const e = it(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const t = this.properties, a = [...at(t), ...ot(t)];
      for (const o of a) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [a, o] of t) this.elementProperties.set(a, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, a] of this.elementProperties) {
      const o = this._$Eu(t, a);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const o of a) t.unshift(ge(o));
    } else e !== void 0 && t.push(ge(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, a;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((a = e.hostConnected) == null || a.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const a of t.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((a) => {
      var o;
      return (o = a.hostConnected) == null ? void 0 : o.call(a);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var a;
      return (a = t.hostDisconnected) == null ? void 0 : a.call(t);
    });
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$ET(e, t) {
    var i;
    const a = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, a);
    if (o !== void 0 && a.reflect === !0) {
      const n = (((i = a.converter) == null ? void 0 : i.toAttribute) !== void 0 ? a.converter : re).toAttribute(t, a.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, n, l;
    const a = this.constructor, o = a._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = a.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? r.converter : re;
      this._$Em = o;
      const u = c.fromAttribute(t, r.type);
      this[o] = (l = u != null ? u : (n = this._$Ej) == null ? void 0 : n.get(o)) != null ? l : u, this._$Em = null;
    }
  }
  requestUpdate(e, t, a, o = !1, i) {
    var n, l;
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (i = this[e]), a != null || (a = r.getPropertyOptions(e)), !(((n = a.hasChanged) != null ? n : je)(i, t) || a.useDefault && a.reflect && i === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(r._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: o, wrapped: i }, n) {
    var l, r, c;
    a && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (r = n != null ? n : t) != null ? r : this[e]), i !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var a, o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((a = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, l] of this._$Ep) this[n] = l;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, l] of i) {
        const { wrapped: r } = l, c = this[n];
        r !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((a) => {
      var o;
      return (o = a.hostUpdated) == null ? void 0 : o.call(a);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
var Pe;
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[F("elementProperties")] = /* @__PURE__ */ new Map(), P[F("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: P }), ((Pe = C.reactiveElementVersions) != null ? Pe : C.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, ve = (s) => s, Z = V.trustedTypes, $e = Z ? Z.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Fe = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + E, st = `<${Ve}>`, R = document, W = () => R.createComment(""), G = (s) => s === null || typeof s != "object" && typeof s != "function", he = Array.isArray, rt = (s) => he(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", te = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, we = />/g, q = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ke = /'/g, Ae = /"/g, Be = /^(?:script|style|textarea|title)$/i, We = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), $ = We(1), g = We(2), D = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), O = R.createTreeWalker(R, 129);
function Ge(s, e) {
  if (!he(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(e) : e;
}
const lt = (s, e) => {
  const t = s.length - 1, a = [];
  let o, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = j;
  for (let l = 0; l < t; l++) {
    const r = s[l];
    let c, u, d = -1, p = 0;
    for (; p < r.length && (n.lastIndex = p, u = n.exec(r), u !== null); ) p = n.lastIndex, n === j ? u[1] === "!--" ? n = ye : u[1] !== void 0 ? n = we : u[2] !== void 0 ? (Be.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = q) : u[3] !== void 0 && (n = q) : n === q ? u[0] === ">" ? (n = o != null ? o : j, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? q : u[3] === '"' ? Ae : ke) : n === Ae || n === ke ? n = q : n === ye || n === we ? n = j : (n = q, o = void 0);
    const m = n === q && s[l + 1].startsWith("/>") ? " " : "";
    i += n === j ? r + st : d >= 0 ? (a.push(c), r.slice(0, d) + Fe + r.slice(d) + E + m) : r + E + (d === -2 ? l : m);
  }
  return [Ge(s, i + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class K {
  constructor({ strings: e, _$litType$: t }, a) {
    let o;
    this.parts = [];
    let i = 0, n = 0;
    const l = e.length - 1, r = this.parts, [c, u] = lt(e, t);
    if (this.el = K.createElement(c, a), O.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = O.nextNode()) !== null && r.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Fe)) {
          const p = u[n++], m = o.getAttribute(d).split(E), f = /([.?@])?(.*)/.exec(p);
          r.push({ type: 1, index: i, name: f[2], strings: m, ctor: f[1] === "." ? ut : f[1] === "?" ? dt : f[1] === "@" ? ht : Q }), o.removeAttribute(d);
        } else d.startsWith(E) && (r.push({ type: 6, index: i }), o.removeAttribute(d));
        if (Be.test(o.tagName)) {
          const d = o.textContent.split(E), p = d.length - 1;
          if (p > 0) {
            o.textContent = Z ? Z.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(d[m], W()), O.nextNode(), r.push({ type: 2, index: ++i });
            o.append(d[p], W());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ve) r.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(E, d + 1)) !== -1; ) r.push({ type: 7, index: i }), d += E.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const a = R.createElement("template");
    return a.innerHTML = e, a;
  }
}
function I(s, e, t = s, a) {
  var n, l, r;
  if (e === D) return e;
  let o = a !== void 0 ? (n = t._$Co) == null ? void 0 : n[a] : t._$Cl;
  const i = G(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== i && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), i === void 0 ? o = void 0 : (o = new i(s), o._$AT(s, t, a)), a !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[a] = o : t._$Cl = o), o !== void 0 && (e = I(s, o._$AS(s, e.values), o, a)), e;
}
class ct {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var c;
    const { el: { content: t }, parts: a } = this._$AD, o = ((c = e == null ? void 0 : e.creationScope) != null ? c : R).importNode(t, !0);
    O.currentNode = o;
    let i = O.nextNode(), n = 0, l = 0, r = a[0];
    for (; r !== void 0; ) {
      if (n === r.index) {
        let u;
        r.type === 2 ? u = new Y(i, i.nextSibling, this, e) : r.type === 1 ? u = new r.ctor(i, r.name, r.strings, this, e) : r.type === 6 && (u = new pt(i, this, e)), this._$AV.push(u), r = a[++l];
      }
      n !== (r == null ? void 0 : r.index) && (i = O.nextNode(), n++);
    }
    return O.currentNode = R, o;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class Y {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, a, o) {
    var i;
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = o, this._$Cv = (i = o == null ? void 0 : o.isConnected) != null ? i : !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = I(this, e, t), G(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== D && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && G(this._$AH) ? this._$AA.nextSibling.data = e : this.T(R.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: a } = e, o = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = K.createElement(Ge(a.h, a.h[0]), this.options)), a);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === o) this._$AH.p(t);
    else {
      const n = new ct(o, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = xe.get(e.strings);
    return t === void 0 && xe.set(e.strings, t = new K(e)), t;
  }
  k(e) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, o = 0;
    for (const i of e) o === t.length ? t.push(a = new Y(this.O(W()), this.O(W()), this, this.options)) : a = t[o], a._$AI(i), o++;
    o < t.length && (this._$AR(a && a._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = ve(e).nextSibling;
      ve(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, o, i) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = i, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = h;
  }
  _$AI(e, t = this, a, o) {
    const i = this.strings;
    let n = !1;
    if (i === void 0) e = I(this, e, t, 0), n = !G(e) || e !== this._$AH && e !== D, n && (this._$AH = e);
    else {
      const l = e;
      let r, c;
      for (e = i[0], r = 0; r < i.length - 1; r++) c = I(this, l[a + r], t, r), c === D && (c = this._$AH[r]), n || (n = !G(c) || c !== this._$AH[r]), c === h ? e = h : e !== h && (e += (c != null ? c : "") + i[r + 1]), this._$AH[r] = c;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class ut extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class dt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class ht extends Q {
  constructor(e, t, a, o, i) {
    super(e, t, a, o, i), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = I(this, e, t, 0)) != null ? n : h) === D) return;
    const a = this._$AH, o = e === h && a !== h || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, i = e !== h && (a === h || o);
    o && this.element.removeEventListener(this.name, this, a), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, a;
    typeof this._$AH == "function" ? this._$AH.call((a = (t = this.options) == null ? void 0 : t.host) != null ? a : this.element, e) : this._$AH.handleEvent(e);
  }
}
class pt {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    I(this, e);
  }
}
const ae = V.litHtmlPolyfillSupport;
var Ue;
ae == null || ae(K, Y), ((Ue = V.litHtmlVersions) != null ? Ue : V.litHtmlVersions = []).push("3.3.3");
const mt = (s, e, t) => {
  var i, n;
  const a = (i = t == null ? void 0 : t.renderBefore) != null ? i : e;
  let o = a._$litPart$;
  if (o === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    a._$litPart$ = o = new Y(e.insertBefore(W(), l), l, void 0, t != null ? t : {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
let L = class extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, a;
    const e = super.createRenderRoot();
    return (a = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = mt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return D;
  }
};
var Le;
L._$litElement$ = !0, L.finalized = !0, (Le = T.litElementHydrateSupport) == null || Le.call(T, { LitElement: L });
const oe = T.litElementPolyfillSupport;
oe == null || oe({ LitElement: L });
var De;
((De = T.litElementVersions) != null ? De : T.litElementVersions = []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (s) => (...e) => ({ _$litDirective$: s, values: e });
let gt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, a) {
    this._$Ct = e, this._$AM = t, this._$Ci = a;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = {}, bt = (s, e = _t) => s._$AH = e;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = ft(class extends gt {
  constructor() {
    super(...arguments), this.key = h;
  }
  render(s, e) {
    return this.key = s, e;
  }
  update(s, [e, t]) {
    return e !== this.key && (bt(s), this.key = e), t;
  }
}), Ke = "echo-home-card", vt = "https://cdn.jsdelivr.net/npm/@meteocons/svg", A = {
  // --- Entités (aucune n'est requise — la carte fonctionne comme simple
  // horloge sans rien configurer du tout) ---
  satellite_entity: null,
  // entité View Assist du satellite (attributs
  // `mode` — "night" bascule le mode nuit, sauf si night_mode_entity est
  // renseigné (voir plus bas) — et `background`, l'URL de fond
  // dynamique choisie côté View Assist)
  weather_entity: null,
  // bloc météo compact (icône + température) ; le
  // bloc est simplement absent si non renseignée
  sun_entity: null,
  // sinon sun.sun — sert uniquement à choisir la bonne
  // variante jour/nuit de l'icône météo (ex: partiellement nuageux) —
  // sans rapport avec night_mode_entity ci-dessous
  night_mode_entity: null,
  // source alternative pour le mode nuit "écran
  // de chevet", à la place de satellite_entity.attributes.mode (utile si
  // ton intégration ne l'expose pas facilement) : une entité "sun" (ex.
  // "sun.sun", nuit si en dessous de l'horizon) ou n'importe quelle
  // entité booléenne (input_boolean/switch/binary_sensor, nuit si état
  // "on") — ex. un input_boolean piloté par une automatisation horaire.
  // Une fois renseignée, remplace entièrement la vérification de
  // satellite_entity.attributes.mode (les deux ne se cumulent pas).
  // --- Navigation (bloc météo cliquable, via le service view_assist.navigate) ---
  dashboard: null,
  // base du chemin de dashboard, ex: "dashboard-view-assist"
  // — tant que non renseigné, le bloc météo n'est pas cliquable
  weather_view: "weather",
  // ajouté à `dashboard` -> "${dashboard}/${weather_view}"
  navigate_device: null,
  // id passé en `device` au service — sinon satellite_entity
  // --- Éléments affichés ---
  show_clock: !0,
  show_date: !0,
  show_weather: !0,
  // --- Localisation ---
  language: null,
  // ex: "fr" — sinon hérite de hass.locale
  time_format: null,
  // "12" ou "24" — sinon hérite de hass.locale
  // --- Icônes (mêmes options que echo-weather-card) ---
  icons: {
    provider: "meteocons",
    style: "fill",
    base_url: null
  },
  // --- Apparence ---
  //
  // background (mode DIGITAL) et analog_background (mode ANALOGIQUE)
  // acceptent chacun un objet {type, ...} — deux réglages indépendants,
  // chaque présentation garde son propre fond (cf. src/background.js
  // pour l'implémentation). Types disponibles :
  //   - "satellite" (défaut en digital) : fond dynamique de
  //     satellite_entity.attributes.background, comme la vue View
  //     Assist d'origine.
  //   - "style" (défaut en analogique) : dégradé par défaut du style
  //     choisi (analog_style) — pas de sens en digital, ignoré là.
  //   - "css" : { type: "css", value: "..." } — n'importe quelle valeur
  //     CSS `background` (couleur unie, dégradé, transparent...). Une
  //     chaîne brute (ex: background: "#1a1a1a") reste acceptée comme
  //     raccourci équivalent.
  //   - "url" : { type: "url", url: "https://..." } (une image) ou
  //     { type: "url", urls: [...] } (plusieurs, tournent en diaporama)
  //     — indépendant de satellite_entity. fit ("cover"/"contain"/
  //     "fill", défaut "cover") et interval (secondes entre deux
  //     images, défaut 300) optionnels.
  //   - "media_folder" : { type: "media_folder", path: "media-source://..." }
  //     — dossier local HA (Media Source), parcouru automatiquement ;
  //     mêmes fit/interval que "url".
  //   - "picsum" : photo vraiment aléatoire (Lorem Picsum), aucune clé
  //     requise mais aucun filtrage par thème possible. width/height
  //     optionnels (sinon la taille réelle de l'écran).
  //   - "unsplash" : photo aléatoire filtrable (query/orientation), clé
  //     API gratuite requise (access_key, cf. unsplash.com/developers).
  // Jamais de fond dynamique/photo (satellite/url/media_folder/picsum/
  // unsplash) en mode round pour analog_background : l'écran à part sur
  // fond uni reproduit volontairement l'Echo Spot d'origine (cf.
  // README) — retombe sur "style" si configuré quand même.
  background: null,
  analog_background: null,
  analog_background_photo: !1,
  // ANCIEN réglage (1.3.0), toujours
  // supporté : équivaut à analog_background: { type: "satellite" },
  // mais seulement si analog_background lui-même n'est pas défini (la
  // forme objet, plus précise, prime toujours si les deux sont présents).
  layout: null,
  // null (paysage, Echo Show) ou "round" (écran circulaire,
  // Echo Spot 1ère gen 2017, 480x480)
  clock_face: "digital",
  // "digital" ou "analog" — disponible dans les
  // deux mises en page (round : cadran plein écran ; large : cadran à
  // droite, météo/date à gauche). Sert juste de valeur de départ : le
  // petit bouton affiché à l'écran bascule l'affichage et retient le
  // choix (localStorage) au-delà de cette valeur de config.
  analog_style: "aurore",
  // habillage du cadran analogique — "aurore"
  // (défaut, dégradé turquoise/bleu/violet), "mono", "clair", "neon",
  // "ardoise", "corail", "grenat", "prisme", "atlas", "carbone" ou
  // "soleil" (cf. src/analog-styles.js pour le détail de chacun). Plus 4
  // clés "*_night" ("aurore_night", "corail_night", "atlas_night",
  // "soleil_night") qui prévisualisent le mode nuit dédié de ces 4
  // styles en permanence, jour comme nuit — pratique pour les tester
  // sans attendre la vraie nuit.
  // Valeur spéciale "auto" : choisit automatiquement un style différent
  // chaque jour de la semaine (lundi -> "aurore", mardi -> "ardoise",
  // etc., cf. WEEKDAY_ANALOG_STYLES dans analog-styles.js) — recalculé à
  // chaque rendu, donc change tout seul à minuit sans reconfiguration.
  // Contrairement à clock_face, ce n'est qu'un réglage YAML : pas de
  // bouton pour en changer à l'écran, pas de mémorisation localStorage —
  // un seul style (ou "auto") choisi une fois. Ignoré si analog_background
  // a un type dynamique (satellite/url/media_folder) : retombe sur
  // "aurore", blanc, lisible sur n'importe quelle photo (les couleurs
  // d'un style donné, planétaire ou non, ne le sont pas forcément).
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
}, $t = {
  "clear-night": "clear-night",
  cloudy: "cloudy",
  exceptional: "not-available",
  fog: "fog",
  hail: "hail",
  lightning: "thunderstorms",
  "lightning-rainy": "thunderstorms-rain",
  pouring: "extreme-rain",
  rainy: "rain",
  snowy: "snow",
  "snowy-rainy": "sleet",
  sunny: "clear-day",
  windy: "wind",
  "windy-variant": "wind"
};
function Se(s, e) {
  return s === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : s === "sunny" && e ? "clear-night" : $t[s] || "not-available";
}
function Ee(s, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${s}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${vt}/${t}/${s}.svg`;
}
function ne(s, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(s).replace(/\s/g, "");
}
function se(s, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function yt(s, e) {
  return s.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const Ce = "aurore", U = {
  aurore: {
    label: "Dégradé Aurore",
    description: "Le style d'origine : dégradé turquoise → bleu → violet, chiffres à 12/3/6/9, fines graduations sur les autres heures.",
    background: "linear-gradient(160deg, #1aa19b 0%, #2f6fb3 45%, #4a3d82 100%)",
    ticks: {
      shape: "line",
      mode: "minor",
      // graduations sur les heures non cardinales seulement
      y1: 5,
      y2: 9,
      width: 1,
      color: "#ffffff",
      opacity: 0.75
    },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 300, opacity: 0.9, color: "#ffffff" },
    hour: { len: 23, color: "#ffffff", width: 4, cap: "round" },
    minute: { len: 35, color: "#ffffff", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#ffffff", width: 1, cap: "round", opacity: 0.85 },
    center: { r: 2, color: "#ffffff" },
    comp: { color: "#ffffff", opacity: 0.85 },
    // "Aurore Boréale" : une teinte différente par aiguille (façon bandes
    // d'aurore) plutôt qu'une seule couleur, aucune graduation (le ciel
    // n'a pas de repères) — un vrai style de nuit à part entière, pas un
    // recolorage de la version de jour (cf. schéma "concept" dans
    // _resolveNightStyle, echo-home-card.js).
    night: {
      background: "radial-gradient(120% 100% at 50% 15%, #0d2b28 0%, #071a2e 45%, #030712 100%)",
      glow: !0,
      ticks: null,
      numerals: null,
      hour: { len: 23, color: "#2ee6c8", width: 4, cap: "round" },
      minute: { len: 35, color: "#5ee6a0", width: 2.6, cap: "round" },
      second: {
        len: 42,
        tail: 8,
        color: "#b06bff",
        width: 1,
        cap: "round",
        opacity: 0.9,
        tipDot: { r: 1.3, fill: "#b06bff" }
      },
      center: { r: 2, color: "#2ee6c8", ring: { r: 3.4, width: 1, color: "#b06bff" } },
      comp: { color: "#8ff5e0", opacity: 0.75 }
    }
  },
  mono: {
    label: "Mono Contraste",
    description: "Fond quasi noir, aiguilles blanches, seconde corail — l'esprit d'une montre de sport minimaliste.",
    background: "#0e0f12",
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 0.9,
      minorOpacity: 0.35,
      cardinalR: 1.6,
      cardinalOpacity: 0.6,
      color: "#f5f6f7"
    },
    numerals: null,
    hour: { len: 24, color: "#f5f6f7", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#f5f6f7", width: 2.8, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ff5a4e",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.4, fill: "#ff5a4e" }
    },
    center: { r: 1.8, color: "#f5f6f7", ring: { r: 3.4, width: 1, color: "#ff5a4e" } },
    comp: { color: "#f5f6f7", opacity: 0.6 }
  },
  clair: {
    label: "Clair Épuré",
    description: "Fond clair, aiguilles encre plates, quatre points cardinaux — sobre, presque scandinave.",
    background: "#efeee4",
    ticks: {
      shape: "dot",
      mode: "cardinal",
      radius: 44,
      cardinalR: 1.4,
      cardinalOpacity: 0.55,
      color: "#22262b"
    },
    numerals: null,
    hour: { len: 28, color: "#22262b", width: 4.5, cap: "butt" },
    minute: { len: 36, color: "#22262b", width: 2.4, cap: "butt" },
    second: { len: 42, tail: 0, color: "#3f6b4e", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#22262b" },
    // Les icônes Meteocons (style "fill", cf. icons.js) sont surtout
    // blanches/claires — illisibles sur ce fond clair par défaut,
    // repéré en testant les 5 styles (invisible à côté des aiguilles
    // sombres). iconFilter les repasse en silhouette encre, cohérent
    // avec le reste du style (aucune autre couleur que l'encre ici).
    comp: { color: "#22262b", opacity: 0.6, iconFilter: "brightness(0)" }
  },
  neon: {
    label: "Néon Sombre",
    description: "Bleu nuit profond, cyan lumineux avec halo, seconde magenta — plus gadget, plus spectaculaire.",
    background: "radial-gradient(120% 120% at 50% 28%, #141a2e 0%, #0b0e1a 70%)",
    glow: !0,
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 0.9,
      minorOpacity: 0.35,
      cardinalR: 1.5,
      cardinalOpacity: 0.7,
      color: "#5eead4"
    },
    numerals: null,
    hour: { len: 24, color: "#5eead4", width: 4, cap: "round" },
    minute: { len: 36, color: "#5eead4", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ff6ec9",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#ff6ec9" }
    },
    center: { r: 1.8, color: "#5eead4", ring: { r: 3.2, width: 1, color: "#ff6ec9" } },
    comp: { color: "#5eead4", opacity: 0.65 }
  },
  ardoise: {
    label: "Ardoise Géométrique",
    description: "Fond ardoise mat, aiguilles rectangulaires, seule l'heure 12 est marquée — plus architectural.",
    // Fond légèrement éclairci (#3a4750 -> #4a5a66, luminosité 0.06 ->
    // 0.10) — jugé trop sombre à l'usage.
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.28), transparent 60%), #4a5a66",
    shape: "rect",
    // seul style à aiguilles géométriques plutôt que des traits
    ticks: {
      shape: "dot",
      mode: "all",
      skip: [0],
      // position de midi laissée au chiffre "12"
      radius: 44,
      minorR: 1,
      minorOpacity: 0.22,
      cardinalR: 1,
      cardinalOpacity: 0.22,
      color: "#edeef0"
    },
    numerals: { mode: "single", radius: 40, size: 9, weight: 300, opacity: 0.75, color: "#edeef0" },
    hour: { w: 5, len: 26, color: "#edeef0" },
    minute: { w: 3, len: 38, color: "rgba(237, 238, 240, .92)" },
    second: { w: 1.2, len: 44, tail: 8, color: "#b7e778" },
    center: { size: 4, color: "#b7e778" },
    comp: { color: "#edeef0", opacity: 0.6 },
    // La nuit, bascule sur "carbone" affiché tel quel (pas recoloré) —
    // les deux styles partagent déjà l'esprit géométrique/technique,
    // cf. { swap } dans _resolveNightStyle (echo-home-card.js).
    night: { swap: "carbone" }
  },
  // --- Styles libres ---------------------------------------------------
  // Palette libre, sans thème imposé — contrairement à une première
  // tentative "planétaire" (un par jour sur le nom latin du jour
  // français) jugée trop démonstrative. Sept d'entre eux (aurore/
  // ardoise ci-dessus, et corail/grenat/prisme/atlas/soleil ci-dessous)
  // sont calés un par jour de la semaine via `analog_style: "auto"` (cf.
  // WEEKDAY_ANALOG_STYLES plus bas) ; "carbone" ne sert que de nuit à
  // "ardoise", mais reste sélectionnable seul comme les autres.
  //
  // Trois formes de nuit possibles (cf. _resolveNightStyle,
  // echo-home-card.js) :
  // - `night: { background, color }` — recolorage simple et atténué (une
  //   seule teinte), comme l'ancien traitement uniforme mais propre au
  //   style (ex: "soleil").
  // - `night: { swap: "autreStyle" }` — bascule sur un AUTRE style
  //   affiché tel quel, à pleine intensité (ex: "ardoise" -> "carbone").
  // - `night: { ...palette complète... }` — un concept de nuit à part
  //   entière (fond/graduations/aiguilles propres), pas dérivé du style
  //   de jour (ex: "aurore", "corail", "atlas").
  // Sans `night` du tout (mono/clair/neon ci-dessus) : traitement nuit
  // uniforme d'origine (fond bleu marine fixe, aiguilles rouge très
  // atténué).
  corail: {
    label: "Corail",
    description: "Récif profond : dégradé sarcelle vers turquoise, trotteuse corail vif, graduations sur les heures non cardinales.",
    // Bright end assombri (#1fa398 -> #0f5f57) + trotteuse éclaircie
    // (#ff7a59 -> #ffab8f) : contraste mesuré < 1.3:1 avant correction
    // sur la zone la plus claire du dégradé, > 4:1 partout après.
    background: "linear-gradient(160deg, #0d3b3a 0%, #146b64 50%, #0f5f57 100%)",
    // mode "minor" plutôt que "all" : les 4 points cardinaux se
    // superposaient aux chiffres "12/3/6/9" (même rayon) — laissés aux
    // chiffres, comme "aurore".
    ticks: { shape: "dot", mode: "minor", radius: 44, minorR: 0.9, minorOpacity: 0.35, color: "#ffffff" },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 300, opacity: 0.9, color: "#ffffff" },
    hour: { len: 23, color: "#ffffff", width: 4, cap: "round" },
    minute: { len: 35, color: "#ffffff", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ffab8f",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#ffab8f" }
    },
    center: { r: 1.8, color: "#ffffff", ring: { r: 3.2, width: 1, color: "#ffab8f" } },
    comp: { color: "#ffffff", opacity: 0.7 },
    // "Bioluminescence" : 12 points de taille ET luminosité irrégulières
    // (radii/opacities) — des organismes de tailles différentes qui
    // s'allument plus ou moins fort, pas une couronne uniforme.
    night: {
      background: "radial-gradient(120% 100% at 50% 100%, #04211f 0%, #010a09 70%)",
      glow: !0,
      ticks: {
        shape: "dot",
        mode: "all",
        radius: 44,
        radii: [1.8, 0.6, 1.2, 2.4, 0.8, 1.6, 0.5, 2, 1, 1.8, 0.7, 1.4],
        opacities: [0.7, 0.3, 0.5, 0.85, 0.35, 0.6, 0.25, 0.75, 0.4, 0.65, 0.3, 0.55],
        color: "#7dffcf"
      },
      numerals: null,
      hour: { len: 23, color: "#ff9f80", width: 4, cap: "round" },
      minute: { len: 35, color: "#ff9f80", width: 2.6, cap: "round" },
      second: {
        len: 42,
        tail: 8,
        color: "#7dffcf",
        width: 1,
        cap: "round",
        opacity: 0.95,
        tipDot: { r: 1.4, fill: "#7dffcf" }
      },
      center: { r: 1.8, color: "#ff9f80", ring: { r: 3.2, width: 1, color: "#7dffcf" } },
      comp: { color: "#7dffcf", opacity: 0.7 }
    }
  },
  grenat: {
    label: "Grenat",
    description: "Ton bijou : bordeaux vif, graduations en petits diamants facettés, aiguilles blush, accent or.",
    // Fond remonté 2 fois (luminosité 0.013/0.029/0.055 -> 0.07/0.10/0.15)
    // — jugé trop sombre à chaque étape précédente. Pas de chiffres :
    // ils se superposaient aux graduations diamant (même rayon) — corail
    // garde les siens, grenat s'en distingue justement par leur absence.
    background: "linear-gradient(150deg, #8a2340 0%, #a52a4a 50%, #c23a63 100%)",
    // Graduations en petits diamants (pierre facettée, cf. shape
    // "diamond" dans _renderTicks) plutôt que des points ronds : corail
    // et grenat se confondaient trop sinon, mêmes graduations/chiffres/
    // aiguilles, juste une teinte différente. Ton très sombre : un ton
    // clair ne se détache plus sur ce fond éclairci.
    ticks: {
      shape: "diamond",
      mode: "all",
      radius: 44,
      minorR: 1.2,
      minorOpacity: 0.5,
      cardinalR: 2.4,
      cardinalOpacity: 0.8,
      color: "#1a0308"
    },
    numerals: null,
    hour: { len: 24, color: "#fbeef0", width: 4, cap: "round" },
    minute: { len: 36, color: "#fbeef0", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#e8b84a", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#fbeef0", ring: { r: 3.4, width: 1, color: "#e8b84a" } },
    comp: { color: "#fbeef0", opacity: 0.75 },
    // La nuit, bascule sur "mono" affiché tel quel — sobre, sans
    // ornement, en contraste avec le jour très coloré.
    night: { swap: "mono" }
  },
  prisme: {
    label: "Prisme",
    description: "Fond neutre clair, une couleur par aiguille — bleu, violet, rose — sans graduation ni chiffre.",
    // Fond légèrement assombri (#f4f5f7 -> #e8eaee) + les 3 teintes
    // approfondies (bleu/violet/rose) : les 3 étaient sous 4:1 sur le
    // fond d'origine, la rose à 2.93:1 seulement.
    background: "#e8eaee",
    ticks: { shape: "dot", mode: "cardinal", radius: 44, cardinalR: 1.3, cardinalOpacity: 0.4, color: "#8a8f99" },
    numerals: null,
    hour: { len: 24, color: "#2f5bc4", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#7c3aed", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c2185b", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#20232a" },
    comp: { color: "#20232a", opacity: 0.6, iconFilter: "brightness(0)" },
    // La nuit, bascule sur "neon" affiché tel quel — la ville s'allume.
    night: { swap: "neon" }
  },
  atlas: {
    label: "Atlas",
    description: "Horloge ancienne : fond sépia chaud, 12 chiffres romains en serif, aiguilles en lame effilée, trotteuse en lollipop.",
    // Restylé façon horloge ancienne : les 12 chiffres romains (police
    // serif) servent de repère, plus besoin de graduations à part — et
    // "IIII" plutôt que "IV" à 4h, convention d'horlogerie traditionnelle
    // (symétrie visuelle avec "VIII"). Aiguilles en lame effilée (shape
    // "leaf") plutôt qu'un simple trait, pour l'esprit antique. Trotteuse
    // en "lollipop" (petit disque en pointe, tipDot) plutôt qu'un simple
    // trait — trotteuse classique d'horlogerie ancienne.
    background: "linear-gradient(160deg, #e0d0a8 0%, #c8a878 55%, #a68554 100%)",
    shape: "leaf",
    ticks: null,
    numerals: {
      mode: "all",
      radius: 41,
      size: 10.5,
      weight: 500,
      opacity: 0.9,
      color: "#2a1c10",
      fontFamily: "Georgia, 'Times New Roman', serif"
    },
    hour: { len: 24, color: "#2a1c10", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#2a1c10", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 10,
      color: "#5c2a12",
      width: 0.9,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.6, fill: "#5c2a12" }
    },
    center: { r: 2.2, color: "#2a1c10" },
    comp: { color: "#2a1c10", opacity: 0.65, iconFilter: "brightness(0)" },
    // "Chandelle" : lame effilée adoucie (galbe réduit, cf. shape
    // "leaf"). Graduations à opacité irrégulière, comme une flamme qui
    // n'éclaire jamais le tour du cadran de façon égale.
    night: {
      background: "radial-gradient(60% 60% at 50% 55%, #3a1508 0%, #1a0a06 45%, #0a0403 100%)",
      glow: !0,
      shape: "leaf",
      ticks: {
        shape: "dot",
        mode: "all",
        radius: 44,
        minorR: 1.2,
        cardinalR: 1.2,
        opacities: [0.75, 0.15, 0.5, 0.9, 0.25, 0.6, 0.4, 0.15, 0.8, 0.3, 0.55, 0.2],
        color: "#e0a84a"
      },
      numerals: null,
      hour: { len: 24, color: "#f0b860", width: 4, cap: "round" },
      minute: { len: 36, color: "#f0b860", width: 2.6, cap: "round" },
      second: { len: 42, tail: 8, color: "#ff3d6e", width: 1, cap: "round", opacity: 0.9 },
      center: { r: 2, color: "#f0b860", ring: { r: 3.4, width: 1, color: "#ff3d6e" } },
      comp: { color: "#f0b860", opacity: 0.7 }
    }
  },
  carbone: {
    label: "Carbone",
    description: "Noir profond, aiguilles rectangulaires façon chronographe, accent cyan électrique — surtout utilisé comme nuit d'ardoise.",
    background: "radial-gradient(120% 100% at 50% 0%, #1a2028 0%, #0a0d12 70%)",
    shape: "rect",
    ticks: { shape: "dot", mode: "all", radius: 44, minorR: 1, minorOpacity: 0.3, cardinalR: 1.6, cardinalOpacity: 0.6, color: "#b8c4d4" },
    numerals: null,
    hour: { w: 5, len: 25, color: "#b8c4d4" },
    minute: { w: 3, len: 37, color: "#b8c4d4" },
    second: { w: 1.2, len: 43, tail: 8, color: "#2dd4ff" },
    center: { size: 4, color: "#2dd4ff" },
    comp: { color: "#b8c4d4", opacity: 0.6 }
  },
  soleil: {
    label: "Soleil",
    description: "Rayonnant et chaud : dégradé orange/jaune façon lever de soleil, rayons alternés longs/courts façon icône soleil, halo activé.",
    background: "linear-gradient(160deg, #ffb545 0%, #ff8a3d 55%, #ff5e3a 100%)",
    glow: !0,
    // Rayons alternés longs/courts (façon icône soleil) plutôt qu'une
    // couronne régulière de même longueur : les 4 cardinaux s'étirent
    // presque jusqu'au centre et sont plus opaques, les 8 autres restent
    // courts et discrets.
    ticks: {
      shape: "line",
      mode: "all",
      y2: 9,
      width: 1.2,
      color: "#fff6e0",
      y1s: [2, 7, 7, 2, 7, 7, 2, 7, 7, 2, 7, 7],
      opacities: [0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6]
    },
    numerals: null,
    hour: { len: 23, color: "#fff6e0", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#fff6e0", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c81d1d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#fff6e0" },
    comp: { color: "#fff6e0", opacity: 0.85 },
    // Le soleil est couché la nuit : bascule sur un indigo profond plutôt
    // que de garder le fond orange/jaune. Braises ambrées éclaircies
    // (#8a5a2e -> #ffb84d, 3.27:1 -> 11.16:1 mesuré) pour rester dans le
    // même registre "vibrant" que les autres nuits plutôt que rester en
    // retrait.
    night: { background: "#0a0e1e", color: "#ffb84d" }
  },
  // --- Nuits sélectionnables seules ------------------------------------
  // Les concepts de nuit ci-dessus ne s'affichent normalement que la
  // nuit réelle (attribut `mode` du satellite View Assist, cf.
  // _isNightMode). Ces 4 entrées les exposent en clé à part —
  // sélectionnables via `analog_style` comme n'importe quel autre style,
  // pour les prévisualiser sans attendre/forcer la nuit. Chacune pointe
  // sur elle-même via `night: { swap }` : sélectionnée à la vraie nuit,
  // elle reste identique plutôt que de retomber sur le rouge atténué
  // générique (qui n'aurait pas de sens sur un style déjà pensé nuit).
  aurore_night: {
    label: "Aurore Boréale (nuit d'aurore)",
    description: 'Nuit de "aurore" isolée pour prévisualisation : une teinte différente par aiguille (cyan/vert/violet), aucune graduation.',
    background: "radial-gradient(120% 100% at 50% 15%, #0d2b28 0%, #071a2e 45%, #030712 100%)",
    glow: !0,
    ticks: null,
    numerals: null,
    hour: { len: 23, color: "#2ee6c8", width: 4, cap: "round" },
    minute: { len: 35, color: "#5ee6a0", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#b06bff",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#b06bff" }
    },
    center: { r: 2, color: "#2ee6c8", ring: { r: 3.4, width: 1, color: "#b06bff" } },
    comp: { color: "#8ff5e0", opacity: 0.75 },
    night: { swap: "aurore_night" }
  },
  corail_night: {
    label: "Bioluminescence (nuit de corail)",
    description: `Nuit de "corail" isolée pour prévisualisation : récif profond, graduations de taille et d'éclat irréguliers.`,
    background: "radial-gradient(120% 100% at 50% 100%, #04211f 0%, #010a09 70%)",
    glow: !0,
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      radii: [1.8, 0.6, 1.2, 2.4, 0.8, 1.6, 0.5, 2, 1, 1.8, 0.7, 1.4],
      opacities: [0.7, 0.3, 0.5, 0.85, 0.35, 0.6, 0.25, 0.75, 0.4, 0.65, 0.3, 0.55],
      color: "#7dffcf"
    },
    numerals: null,
    hour: { len: 23, color: "#ff9f80", width: 4, cap: "round" },
    minute: { len: 35, color: "#ff9f80", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#7dffcf",
      width: 1,
      cap: "round",
      opacity: 0.95,
      tipDot: { r: 1.4, fill: "#7dffcf" }
    },
    center: { r: 1.8, color: "#ff9f80", ring: { r: 3.2, width: 1, color: "#7dffcf" } },
    comp: { color: "#7dffcf", opacity: 0.7 },
    night: { swap: "corail_night" }
  },
  atlas_night: {
    label: "Chandelle (nuit d'atlas)",
    description: 'Nuit de "atlas" isolée pour prévisualisation : lueur de chandelle, aiguilles en lame effilée, graduations en flamme vacillante.',
    background: "radial-gradient(60% 60% at 50% 55%, #3a1508 0%, #1a0a06 45%, #0a0403 100%)",
    glow: !0,
    shape: "leaf",
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 1.2,
      cardinalR: 1.2,
      opacities: [0.75, 0.15, 0.5, 0.9, 0.25, 0.6, 0.4, 0.15, 0.8, 0.3, 0.55, 0.2],
      color: "#e0a84a"
    },
    numerals: null,
    hour: { len: 24, color: "#f0b860", width: 4, cap: "round" },
    minute: { len: 36, color: "#f0b860", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#ff3d6e", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#f0b860", ring: { r: 3.4, width: 1, color: "#ff3d6e" } },
    comp: { color: "#f0b860", opacity: 0.7 },
    night: { swap: "atlas_night" }
  },
  soleil_night: {
    label: "Braises (nuit de soleil)",
    description: 'Nuit de "soleil" isolée pour prévisualisation : indigo profond, aiguilles et rayons en braises ambrées.',
    background: "#0a0e1e",
    glow: !1,
    ticks: {
      shape: "line",
      mode: "all",
      y2: 9,
      width: 1.2,
      color: "#ffb84d",
      y1s: [2, 7, 7, 2, 7, 7, 2, 7, 7, 2, 7, 7],
      opacities: [0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6]
    },
    numerals: null,
    hour: { len: 23, color: "#ffb84d", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#ffb84d", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#ffb84d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#ffb84d" },
    comp: { color: "#ffb84d", opacity: 0.85 },
    night: { swap: "soleil_night" }
  }
}, wt = [
  "soleil",
  // dimanche
  "aurore",
  // lundi
  "ardoise",
  // mardi
  "corail",
  // mercredi
  "grenat",
  // jeudi
  "prisme",
  // vendredi
  "atlas"
  // samedi
], kt = ["cover", "contain", "fill"], S = "cover", B = 300, At = ["landscape", "portrait", "squarish"], J = ["satellite", "url", "media_folder", "picsum", "unsplash"];
function xt(s) {
  return s === "contain" ? "contain" : s === "fill" ? "100% 100%" : "cover";
}
function M(s, e) {
  return `center / ${xt(e)} no-repeat url("${s}")`;
}
function ze(s, e, t) {
  if (s != null) {
    if (typeof s == "string") return { type: "css", value: s };
    if (typeof s == "object") return { type: t, ...s };
  } else if (e)
    return { type: "satellite" };
  return { type: t };
}
function qe(s, e, t, a, o) {
  var n;
  const i = { ...s };
  return e.includes(i.type) || (o(`${a}.type`, t), i.type = t), i.fit != null && !kt.includes(i.fit) && (o(`${a}.fit`, S), i.fit = S), i.interval != null && (typeof i.interval != "number" || !Number.isFinite(i.interval) || i.interval <= 0) && (o(`${a}.interval`, B), i.interval = B), i.type === "url" && !i.url && !(((n = i.urls) == null ? void 0 : n.length) > 0) && (o(`${a}.url`, "satellite"), i.type = "satellite"), i.type === "media_folder" && !i.path && (o(`${a}.path`, "satellite"), i.type = "satellite"), i.type === "unsplash" && !i.access_key && (o(`${a}.access_key`, "satellite"), i.type = "satellite"), i.orientation != null && !At.includes(i.orientation) && (o(`${a}.orientation`, "aucune"), delete i.orientation), i;
}
async function St(s, e) {
  return ((await s.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children || []).filter(
    (a) => {
      var o;
      return a.media_class === "image" || ((o = a.media_content_type) == null ? void 0 : o.startsWith("image/"));
    }
  ).map((a) => a.media_content_id);
}
async function Et(s, e) {
  return (await s.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
class Oe {
  constructor(e) {
    this._onChange = e, this._signature = null, this._images = [], this._resolvedUrl = null, this._index = 0, this._timer = null, this._token = 0, this.cssValue = null;
  }
  configure(e, t, a) {
    var n, l;
    const o = JSON.stringify([t, a]);
    if (o === this._signature) return;
    this._signature = o, this._token += 1;
    const i = this._token;
    switch (clearInterval(this._timer), this._timer = null, this._images = [], this._index = 0, t.type) {
      case "style":
        this.cssValue = null;
        return;
      case "css":
        this.cssValue = (n = t.value) != null ? n : null;
        return;
      case "satellite":
        this.cssValue = a.isNightMode ? null : a.satelliteBackgroundUrl ? M(a.satelliteBackgroundUrl, S) : null;
        return;
      case "url": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        const r = (l = t.urls) != null && l.length ? t.urls : [t.url];
        this._images = r, this.cssValue = M(r[0], t.fit || S), this._startRotation(e, t, i);
        return;
      }
      case "media_folder": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadMediaFolder(e, t, i);
        return;
      }
      case "picsum": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        this._setPicsumUrl(t), this._timer = setInterval(() => {
          i === this._token && (this._setPicsumUrl(t), this._onChange());
        }, (t.interval || B) * 1e3);
        return;
      }
      case "unsplash": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadUnsplash(t, i), this._timer = setInterval(() => {
          i === this._token && this._loadUnsplash(t, i);
        }, (t.interval || B) * 1e3);
        return;
      }
      default:
        this.cssValue = null;
    }
  }
  // Lorem Picsum (picsum.photos) : aucune clé requise, mais aucun
  // filtrage par thème/mot-clé possible non plus — une photo vraiment
  // quelconque à chaque tirage (cf. RANDOM_IMAGE_URL de View Assist,
  // qui utilise ce même service via l'ancien domaine unsplash.it). La
  // taille de l'image demandée suit le viewport réel (fenêtre = écran
  // sur un Echo Show/Spot en usage normal, cf. gotchas matériel) sauf
  // si width/height sont précisés — ?random=<horodatage changeant>
  // pour forcer une image différente à chaque appel malgré le cache du
  // navigateur (une URL identique reste sinon mise en cache).
  _setPicsumUrl(e) {
    const t = e.width || Math.round(window.innerWidth) || 960, a = e.height || Math.round(window.innerHeight) || 480, o = `https://picsum.photos/${t}/${a}?random=${Date.now()}`;
    this.cssValue = M(o, e.fit || S);
  }
  // API Unsplash officielle (contrairement à "picsum" ci-dessus) :
  // filtrage par mot-clé (query) et/ou orientation possible, mais
  // access_key requis (compte développeur gratuit sur
  // unsplash.com/developers — palier "Demo" plafonné à 50 requêtes/
  // heure, cf. DEFAULT_INTERVAL). Pas de suivi des téléchargements
  // (download_location, recommandé par les règles d'usage de l'API pour
  // un usage à grande échelle) : hors de propos pour un cadre photo
  // personnel, mais à garder en tête pour un usage plus large.
  async _loadUnsplash(e, t) {
    var a, o;
    try {
      const i = new URLSearchParams({ client_id: e.access_key });
      e.query && i.set("query", e.query), e.orientation && i.set("orientation", e.orientation), e.collections && i.set("collections", e.collections);
      const n = await fetch(`https://api.unsplash.com/photos/random?${i}`);
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const l = await n.json();
      if (t !== this._token) return;
      const r = ((a = l == null ? void 0 : l.urls) == null ? void 0 : a.regular) || ((o = l == null ? void 0 : l.urls) == null ? void 0 : o.full);
      if (!r) throw new Error("réponse Unsplash sans URL d'image exploitable");
      this.cssValue = M(r, e.fit || S), this._onChange();
    } catch (i) {
      if (t !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de récupérer une photo Unsplash (clé invalide, quota dépassé, ou hors-ligne ?)",
        i
      );
    }
  }
  async _loadMediaFolder(e, t, a) {
    try {
      const o = await St(e, t.path);
      if (a !== this._token) return;
      if (this._images = o, !o.length) {
        console.warn(
          `[echo-home-card] aucune image trouvée dans le dossier Media Source "${t.path}"`
        ), this.cssValue = null, this._onChange();
        return;
      }
      await this._showMediaAt(e, t, a, 0), this._startRotation(e, t, a);
    } catch (o) {
      if (a !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de parcourir le dossier Media Source "${t.path}"`,
        o
      ), this.cssValue = null, this._onChange();
    }
  }
  async _showMediaAt(e, t, a, o) {
    try {
      const i = await Et(e, this._images[o]);
      if (a !== this._token) return;
      this.cssValue = M(i, t.fit || S), this._onChange();
    } catch (i) {
      if (a !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de charger une image du dossier Media Source",
        i
      );
    }
  }
  // Commune à "url" (rotation directe, pas de résolution) et
  // "media_folder" (résolution à chaque image, cf. _showMediaAt) —
  // seulement démarrée si plusieurs images (une source à une seule image
  // n'a pas besoin de minuteur).
  _startRotation(e, t, a) {
    if (this._images.length <= 1) return;
    const o = (t.interval || B) * 1e3;
    this._timer = setInterval(async () => {
      a === this._token && (this._index = (this._index + 1) % this._images.length, t.type === "media_folder" ? await this._showMediaAt(e, t, a, this._index) : (this.cssValue = M(this._images[this._index], t.fit || S), this._onChange()));
    }, o);
  }
  destroy() {
    clearInterval(this._timer), this._timer = null, this._token += 1;
  }
}
const Ct = [
  "satellite_entity",
  "weather_entity",
  "sun_entity",
  "night_mode_entity",
  "dashboard",
  "navigate_device",
  "language"
], zt = {
  satellite_entity: "Entité satellite View Assist",
  weather_entity: "Entité météo",
  sun_entity: "Entité soleil",
  night_mode_entity: "Entité mode nuit (alternative)",
  dashboard: "Dashboard",
  weather_view: "Vue météo",
  navigate_device: "Device pour view_assist.navigate",
  show_clock: "Horloge",
  show_date: "Date",
  show_weather: "Météo",
  layout: "Mise en page",
  clock_face: "Cadran au démarrage",
  analog_style: "Style du cadran analogique",
  language: "Langue",
  time_format: "Format horaire",
  zoom: "Zoom manuel"
}, qt = {
  satellite_entity: "Fond dynamique + mode nuit (attribute mode) — sauf si une entité mode nuit est choisie ci-dessous.",
  sun_entity: "Sinon sun.sun — choisit juste la variante jour/nuit de l'icône météo.",
  night_mode_entity: `Remplace entièrement satellite_entity.attributes.mode comme source du mode nuit : entité sun.* (nuit sous l'horizon) ou entité booléenne (nuit si état "on").`,
  dashboard: "Base du chemin de navigation (ex: dashboard-view-assist) — tant que vide, le bloc météo n'est pas cliquable.",
  navigate_device: "Sinon, l'entité satellite sert de device.",
  clock_face: "Valeur de départ seulement — le bouton à l'écran retient ensuite le choix.",
  analog_style: '"auto" change de style chaque jour de la semaine. Fonds personnalisés : voir "Arrière-plans" dans le README.',
  zoom: "Filet de rattrapage si les tailles ne suivent pas correctement sur un appareil donné."
}, Ot = [
  { value: "landscape", label: "Paysage (Echo Show)" },
  { value: "round", label: "Rond (Echo Spot)" }
], Tt = [
  { value: "digital", label: "Digital" },
  { value: "analog", label: "Analogique" }
], Rt = [
  { value: "", label: "Automatique (langue HA)" },
  { value: "12", label: "12h" },
  { value: "24", label: "24h" }
], Nt = [
  { value: "auto", label: "Automatique — change de style chaque jour" },
  ...Object.entries(U).map(([s, e]) => ({
    value: s,
    label: `${s} — ${e.label}`
  }))
];
class le extends L {
  constructor() {
    super(...arguments);
    z(this, "_computeLabel", (t) => {
      var a;
      return (a = zt[t.name]) != null ? a : t.name;
    });
    z(this, "_computeHelper", (t) => {
      var a;
      return (a = qt[t.name]) != null ? a : "";
    });
  }
  setConfig(t) {
    this._config = t || {};
  }
  // <ha-form> reçoit une copie de la config avec deux champs "repère" :
  // layout (null -> "landscape") et time_format (null -> ""), aucun des
  // deux n'étant une valeur réelle valide côté carte (cf. const.js) —
  // juste une valeur affichable pour le select. _valueChanged défait
  // cette traduction avant de renvoyer la config.
  get _data() {
    return {
      ...this._config,
      layout: this._config.layout === "round" ? "round" : "landscape",
      time_format: this._config.time_format || ""
    };
  }
  render() {
    return !this.hass || !this._config ? $`` : $`
      <div class="section">
        <h3>Entités</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
      { name: "satellite_entity", selector: { entity: {} } },
      {
        name: "weather_entity",
        selector: { entity: { domain: "weather" } }
      },
      { name: "sun_entity", selector: { entity: { domain: "sun" } } },
      { name: "night_mode_entity", selector: { entity: {} } }
    ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Navigation (bloc météo cliquable)</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
      { name: "dashboard", selector: { text: {} } },
      { name: "weather_view", selector: { text: {} } },
      { name: "navigate_device", selector: { text: {} } }
    ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Éléments affichés</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
      {
        type: "grid",
        name: "",
        column_min_width: "110px",
        schema: [
          { name: "show_clock", selector: { boolean: {} } },
          { name: "show_date", selector: { boolean: {} } },
          { name: "show_weather", selector: { boolean: {} } }
        ]
      }
    ]}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Présentation</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
      {
        name: "layout",
        selector: { select: { mode: "dropdown", options: Ot } }
      },
      {
        name: "clock_face",
        selector: {
          select: { mode: "dropdown", options: Tt }
        }
      },
      {
        name: "analog_style",
        selector: {
          select: { mode: "dropdown", options: Nt }
        }
      }
    ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Localisation</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
      { name: "language", selector: { text: {} } },
      {
        name: "time_format",
        selector: {
          select: { mode: "dropdown", options: Rt }
        }
      }
    ]}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>Réglages fins</h3>
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${[
      {
        name: "zoom",
        selector: { number: { min: 0.1, max: 3, step: 0.05, mode: "box" } }
      }
    ]}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>

      <p class="advanced-note">
        Fonds personnalisés (image, dossier, Unsplash...) et icônes
        (<code>background</code>, <code>analog_background</code>,
        <code>icons</code>) : pas encore d'éditeur visuel dédié, à régler
        via "Modifier en YAML" — voir la section "Arrière-plans" du
        <a
          href="https://git.alocoq.fr/alois/echo-dashboard/src/branch/main/packages/echo-home-card/README.md"
          target="_blank"
          rel="noreferrer"
          >README</a
        >.
      </p>
    `;
  }
  // ha-form renvoie systématiquement la config complète (les clés que ce
  // formulaire ne gère pas, ex. background/icons, traversent inchangées
  // depuis _data) — juste besoin de défaire les repères de select et de
  // retirer les champs texte/entité revenus à vide plutôt que d'écrire
  // `clé: ""` dans la config.
  _valueChanged(t) {
    const a = { ...t.detail.value };
    a.layout === "landscape" && delete a.layout, a.time_format || delete a.time_format;
    for (const o of Ct)
      a[o] || delete a[o];
    this._config = a, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
z(le, "properties", {
  hass: {},
  _config: { state: !0 }
}), z(le, "styles", He`
    .section {
      margin-bottom: 16px;
    }
    .section:last-of-type {
      margin-bottom: 8px;
    }
    h3 {
      font-size: 0.95em;
      font-weight: 600;
      color: var(--secondary-text-color, #666);
      margin: 0 0 8px;
    }
    .advanced-note {
      font-size: 0.85em;
      color: var(--secondary-text-color, #666);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }
    .advanced-note code {
      font-size: 0.95em;
    }
    .advanced-note a {
      color: var(--primary-color, inherit);
    }
  `);
customElements.define("echo-home-card-editor", le);
const Te = "echo-home-card-clock-face", Re = new Date(2e3, 0, 27, 12, 59);
class ce extends L {
  // Une source par présentation (digital/analogique), chacune avec son
  // propre réglage indépendant (background/analog_background, cf.
  // const.js) — cf. src/background.js. onChange redéclenche un rendu
  // Lit quand une résolution/rotation asynchrone (dossier Media Source,
  // plusieurs URLs) change la valeur CSS courante ; render() n'attend
  // jamais cette résolution, il lit juste le dernier résultat connu
  // (`.cssValue`, synchrone).
  constructor() {
    super(), this._digitalBackground = new Oe(() => this.requestUpdate()), this._analogBackground = new Oe(() => this.requestUpdate());
  }
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ...A,
      ...e,
      icons: { ...A.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {}), this._clockFace === void 0 && (this._clockFace = this._initClockFace());
  }
  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const e = localStorage.getItem(Te);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(Te, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const a = (n, l) => console.warn(
      `[echo-home-card] "${n}" invalide (${JSON.stringify(t[n])}), valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.layout !== null && e.layout !== "round" && (a("layout", A.layout), e.layout = A.layout), ["digital", "analog"].includes(e.clock_face) || (a("clock_face", A.clock_face), e.clock_face = A.clock_face), e.analog_style !== "auto" && !Object.keys(U).includes(e.analog_style) && (a("analog_style", A.analog_style), e.analog_style = A.analog_style), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (a("zoom", A.zoom), e.zoom = A.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-home-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable.`
    );
    const o = (n, l) => console.warn(
      `[echo-home-card] "${n}" invalide, valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.background = qe(
      ze(e.background, !1, "satellite"),
      ["css", ...J],
      "satellite",
      "background",
      o
    );
    let i = qe(
      ze(
        e.analog_background,
        e.analog_background_photo,
        "style"
      ),
      ["style", "css", ...J],
      "style",
      "analog_background",
      o
    );
    return e.layout === "round" && J.includes(i.type) && (o("analog_background.type", "style"), i = { type: "style" }), e.analog_background = i, e;
  }
  static getStubConfig(e) {
    const t = Object.keys(e.states).find(
      (a) => a.startsWith("weather.")
    );
    return t ? { weather_entity: t } : {};
  }
  // Menu de config visuel dans l'éditeur Lovelace, à la place du YAML
  // brut — options les plus courantes uniquement (entités, navigation,
  // éléments affichés, présentation, localisation, zoom) ; fonds
  // personnalisés/icônes restent YAML (cf. echo-home-card-editor.js).
  // Le bouton "Modifier en YAML" de Lovelace reste toujours disponible à
  // côté, quelle que soit la config.
  static getConfigElement() {
    return document.createElement("echo-home-card-editor");
  }
  getCardSize() {
    return 6;
  }
  connectedCallback() {
    super.connectedCallback(), this._scheduleClockTick(), this._resizeObserver = new ResizeObserver(() => this._fitOverflowingText()), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), clearTimeout(this._clockTimer), (e = this._resizeObserver) == null || e.disconnect(), this._digitalBackground.destroy(), this._analogBackground.destroy();
  }
  // Horloge : un tick recalé sur chaque changement de minute réelle,
  // pas un setInterval(30000) fixe démarré à la connexion du composant
  // (l'ancien comportement) — celui-ci ne tombait quasiment jamais pile
  // sur la bascule de minute (déphasé de jusqu'à 30s selon l'instant de
  // connexion), un décalage qui ne se corrigeait jamais tout seul :
  // l'horloge digitale, et surtout l'aiguille des minutes en
  // analogique (qui elle n'a pas d'animation continue pour masquer le
  // problème comme la trotteuse), changeaient de valeur jusqu'à 30s
  // après le vrai changement de minute plutôt qu'au bon moment —
  // signalé après un vrai test sur appareil. setTimeout recalculé à
  // chaque tick (pas setInterval) : se recale sur la seconde 0 de la
  // minute suivante à chaque fois, s'auto-corrige si un tick est
  // arrivé en retard plutôt que d'accumuler la dérive.
  _scheduleClockTick() {
    const e = /* @__PURE__ */ new Date(), t = 6e4 - (e.getSeconds() * 1e3 + e.getMilliseconds());
    this._clockTimer = setTimeout(() => {
      var a, o;
      ((a = this._config) != null && a.show_clock || (o = this._config) != null && o.show_date) && this.requestUpdate(), this._scheduleClockTick();
    }, t + 250);
  }
  updated(e) {
    super.updated(e), this._fitOverflowingText();
  }
  // Filet de rattrapage pour l'heure/la date en mode digital : leur
  // taille de police (--_clock-size/--_date-size) est calculée à partir
  // de la hauteur disponible (vh/vmin) sans jamais regarder la largeur
  // réellement nécessaire, qui elle dépend du contenu — une heure à deux
  // chiffres ("23:59" plutôt que "9:41"), un format 12h qui ajoute
  // "AM"/"PM", ou une date dont l'abréviation est plus longue dans telle
  // ou telle langue. Repéré par mesure (getBoundingClientRect), pas à
  // l'œil : "23:59" en 24h déborde déjà en mode round (552px de contenu
  // sur un disque de 480px), et "11:59PM" en 12h déborde même en mode
  // large (1098px sur 960px).
  //
  // Mesuré sur un texte "pire cas" fixe (CLOCK_FIT_PROBE_DATE), jamais
  // sur l'heure/la date réellement affichées : mesurer le contenu réel
  // donnerait une échelle différente selon qu'il s'affiche "9:41" (tient
  // sans réduire) ou "23:59" (déborde, donc réduit) — la taille de la
  // police changerait alors visiblement au passage de 9h à 10h, puis
  // reviendrait à la normale à minuit. En se calant toujours sur le pire
  // cas, l'échelle ne dépend plus de l'heure du moment : une heure à un
  // chiffre et une heure à deux chiffres s'affichent à l'identique.
  //
  // Plutôt que deviner une largeur "sûre" par format/langue/mise en page
  // (quatre combinaisons à recalibrer à la main, et jamais garanti pour
  // une langue non testée), on mesure le rendu réel du pire cas et on
  // réduit seulement s'il dépasse — `scrollWidth` reflète la largeur
  // intrinsèque du contenu, `transform: scale()` (posé via --_fit-scale,
  // cf. static styles) n'affecte que le rendu visuel, pas la mesure.
  //
  // Mesuré sur un clone détaché plutôt qu'en écrivant temporairement le
  // texte pire-cas dans .clock/.date elles-mêmes puis en le restaurant :
  // Lit garde une référence interne vers le nœud texte qu'il a créé pour
  // sa liaison `${...}` ; passer par `el.textContent = ...` en remplace
  // le contenu par un *nouveau* nœud texte à chaque fois (comportement
  // du setter DOM), ce qui rend cette référence obsolète — la prochaine
  // mise à jour de Lit plante alors (`Cannot set properties of null
  // (setting 'data')`, vu en testant ce changement). Un clone n'est pas
  // suivi par Lit, donc rien à casser. Coût négligeable : un clone + une
  // lecture de layout par élément, au pire une fois par minute (tick
  // d'horloge, cf. _scheduleClockTick) ou au redimensionnement — jamais
  // par frame.
  _fitOverflowingText() {
    var r, c, u, d;
    const e = this.shadowRoot, t = e == null ? void 0 : e.querySelector(".card"), a = this._config;
    if (!t || !a) return;
    const o = a.language || ((c = (r = this._hass) == null ? void 0 : r.locale) == null ? void 0 : c.language) || "en", i = a.time_format || ((d = (u = this._hass) == null ? void 0 : u.locale) == null ? void 0 : d.time_format) || "24", n = t.getBoundingClientRect().width * 0.92, l = {
      ".clock": ne(Re, o, i),
      ".date": se(Re, o)
    };
    for (const [p, m] of Object.entries(l)) {
      const f = e.querySelector(p);
      if (!f) continue;
      const _ = f.cloneNode(!1);
      _.textContent = m, _.style.position = "absolute", _.style.visibility = "hidden", _.style.left = "-9999px", _.style.removeProperty("--_fit-scale"), f.parentNode.appendChild(_);
      const w = _.scrollWidth;
      _.remove();
      const b = w > n ? n / w : 1;
      f.style.setProperty("--_fit-scale", b);
    }
  }
  set hass(e) {
    var r, c, u, d, p, m;
    const t = (c = this._hass) == null ? void 0 : c.states[(r = this._config) == null ? void 0 : r.satellite_entity], a = (d = this._hass) == null ? void 0 : d.states[(u = this._config) == null ? void 0 : u.weather_entity], o = (m = this._hass) == null ? void 0 : m.states[(p = this._config) == null ? void 0 : p.night_mode_entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.satellite_entity], n = e.states[this._config.weather_entity], l = e.states[this._config.night_mode_entity];
    (t !== i || a !== n || o !== l) && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  // Jour/nuit astronomique, uniquement pour choisir la bonne variante
  // d'icône météo (ex: partiellement nuageux jour/nuit) — sans rapport
  // avec le mode nuit "écran de chevet" de l'entité satellite ci-dessous.
  _isDarkOutside() {
    const e = this._hass.states[this._config.sun_entity || "sun.sun"];
    return (e == null ? void 0 : e.state) === "below_horizon";
  }
  // Mode nuit "écran de chevet" : piloté par l'attribut `mode` de l'entité
  // satellite View Assist (mode: "night") par défaut, pas par l'heure —
  // c'est l'utilisateur (ou une automatisation côté HA) qui décide quand
  // l'écran doit s'assombrir, pas la carte. `night_mode_entity` (cf.
  // const.js) remplace entièrement cette vérification si renseigné :
  // trouver le bon attribut/la bonne valeur côté View Assist peut être
  // pénible selon l'intégration installée (mode/do-not-disturb parfois
  // sur des entités séparées) — une entité "sun" ou un booléen
  // (input_boolean piloté par une automatisation horaire, par exemple)
  // est une source plus simple à mettre en place dans ce cas.
  _isNightMode(e) {
    var a, o;
    const t = this._config.night_mode_entity;
    if (t) {
      const i = (a = this._hass) == null ? void 0 : a.states[t];
      return i ? t.split(".")[0] === "sun" ? i.state === "below_horizon" : i.state === "on" : !1;
    }
    return ((o = e == null ? void 0 : e.attributes) == null ? void 0 : o.mode) === "night";
  }
  _cardStyle(e, t) {
    const a = [];
    return e != null && a.push(`background:${e}`), this._config.zoom != null && this._config.zoom !== 1 && a.push(`zoom:${this._config.zoom}`), t && a.push(t), a.join(";");
  }
  _weatherClickable() {
    return !!(this._config.dashboard && (this._config.navigate_device || this._config.satellite_entity));
  }
  // Service view_assist.navigate, mêmes clés que le button-card d'origine
  // (device + path) — `device` accepte l'id de l'entité satellite.
  _navigateToWeather() {
    if (!this._weatherClickable()) return;
    const e = this._config.navigate_device || this._config.satellite_entity, t = `${this._config.dashboard}/${this._config.weather_view}`;
    this._hass.callService("view_assist", "navigate", { device: e, path: t });
  }
  _onWeatherKeydown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._navigateToWeather());
  }
  render() {
    var N, pe, me;
    if (!this._config || !this._hass) return h;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, a = this._isNightMode(t);
    this.classList.toggle("night", a);
    const o = e.language || ((N = this._hass.locale) == null ? void 0 : N.language) || "en", i = e.time_format || ((pe = this._hass.locale) == null ? void 0 : pe.time_format) || "24", n = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, r = e.layout === "round", c = this._clockFace === "analog", u = {
      isNightMode: a,
      satelliteBackgroundUrl: (me = t == null ? void 0 : t.attributes) == null ? void 0 : me.background
    };
    this._digitalBackground.configure(this._hass, e.background, u), this._analogBackground.configure(this._hass, e.analog_background, u);
    const d = c && !r && !a && J.includes(e.analog_background.type), p = e.show_weather && !a && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, m = p && !c, f = e.show_date && !a, _ = c ? d ? this._analogBackground.cssValue : null : this._digitalBackground.cssValue, w = e.analog_style === "auto" ? wt[n.getDay()] : e.analog_style, b = c ? d ? U[Ce] : U[w] || U[Ce] : null, v = a && c && !!(b != null && b.night), k = v ? this._resolveNightStyle(b) : b, H = v ? k.background : e.analog_background.type === "css" ? e.analog_background.value : b == null ? void 0 : b.background, y = this._cardStyle(
      _,
      b && !d ? `--_analog-default-bg:${H}` : null
    );
    return $`
      <div
        class="card ${r ? "round" : ""} ${c ? "analog" : ""} ${v ? "custom-night" : ""}"
        style=${y}
      >
        ${!c || d ? $`<div class="shader"></div>` : h}
        ${m ? this._renderWeather(l) : h}
        <div class="clockgroup">
          ${e.show_clock ? c ? $`
                  ${this._renderAnalogComplications(
      k,
      p ? l : null,
      f,
      n,
      o
    )}
                  ${this._renderAnalogClock(n, o, i, k)}
                ` : $`<div class="clock">${ne(n, o, i)}</div>` : h}
          ${f && !c ? $`<div class="date">${se(n, o)}</div>` : h}
        </div>
        ${a ? h : this._renderClockToggle(c)}
      </div>
    `;
  }
  // Météo + date, discrètes, superposées au cadran analogique — mêmes
  // données et mêmes conditions d'affichage que la vue digitale
  // (show_weather/show_date, masquées la nuit, cf. render()), juste
  // repositionnées et réduites façon guichet de date de montre
  // mécanique. Icône via <img> (comme _renderWeather) plutôt qu'un
  // glyphe dessiné à la main ou un <image> SVG : c'est le mécanisme déjà
  // utilisé pour la météo en digital, dont on sait qu'il garde les
  // icônes Meteocons animées (SMIL) — un <image> SVG référençant un SVG
  // externe ne le garantit pas selon les moteurs.
  //
  // Rendu AVANT le <svg class="analog-clock"> dans le DOM (cf. appel
  // dans render()), jamais dedans : les deux sont position:absolute
  // superposés au même endroit, donc l'ordre du DOM suffit à garantir
  // que les aiguilles/graduations restent toujours visibles par-dessus
  // (le <svg> n'a pas de fond, seul ce qu'il dessine réellement masque
  // ce qu'il y a dessous) — pas besoin de <foreignObject> ni de z-index.
  _renderAnalogComplications(e, t, a, o, i) {
    if (!t && !a) return h;
    let n = h;
    if (t) {
      const l = Se(t.state, this._isDarkOutside()), r = Ee(l, this._config.icons), c = Number(t.attributes.temperature).toFixed(1), u = t.attributes.temperature_unit || "°C";
      n = $`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${r}
            alt=""
            style="filter:${e.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${c}${u}</span>
        </div>
      `;
    }
    return $`
      <div
        class="analog-complications"
        style="color:${e.comp.color};opacity:${e.comp.opacity}"
      >
        ${n}
        ${a ? $`<div class="analog-date">${se(o, i)}</div>` : h}
      </div>
    `;
  }
  // Résout le style à rendre la nuit à partir du bloc `night` d'un style
  // (cf. analog-styles.js) — 3 formes possibles :
  // - { swap: "autreStyle" } : affiche cet autre style tel quel, à pleine
  //   intensité (ex: "ardoise" -> "carbone") — aucun recolorage, c'est le
  //   style visé qui s'applique intégralement.
  // - un concept complet (contient déjà `hour`/`minute`/`second`/...) :
  //   c'est ce bloc lui-même qui sert de style de nuit, indépendant de la
  //   palette de jour (ex: "Aurore Boréale", "Chandelle").
  // - { background, color } : recolorage simple et atténué, cf.
  //   _applyNightPalette.
  _resolveNightStyle(e) {
    var a;
    const t = e.night;
    return t.swap ? (a = U[t.swap]) != null ? a : e : t.hour ? t : this._applyNightPalette(e, t);
  }
  // Recolore un style pour la nuit à partir de son bloc `night` ({
  // background, color }) : mêmes formes/longueurs/épaisseurs que le style
  // de jour (lisibilité, position des aiguilles inchangées), seules les
  // couleurs de tout ce qui se dessine (aiguilles, graduations, chiffres,
  // complications) basculent sur `night.color` — une seule teinte par
  // style, sobre, plutôt que de redéfinir une palette nuit complète par
  // élément. glow désactivé : pas de halo la nuit, la sobriété prime sur
  // l'esthétique (même principe que l'ancien traitement uniforme qu'il
  // remplace pour ces styles).
  _applyNightPalette(e, t) {
    const a = t.color, o = (i) => i && { ...i, color: a };
    return {
      ...e,
      background: t.background,
      glow: !1,
      ticks: o(e.ticks),
      numerals: o(e.numerals),
      hour: o(e.hour),
      minute: o(e.minute),
      second: {
        ...e.second,
        color: a,
        tipDot: e.second.tipDot ? { ...e.second.tipDot, fill: a } : void 0
      },
      center: {
        ...e.center,
        color: a,
        ring: e.center.ring ? { ...e.center.ring, color: a } : void 0
      },
      comp: { ...e.comp, color: a }
    };
  }
  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size. Onze habillages
  // possibles (cf. src/analog-styles.js, choisis via `analog_style`, ou
  // "auto" pour un style par jour de la semaine) : mêmes primitives
  // (graduations, chiffres, aiguilles), paramètres différents — sauf la
  // forme des aiguilles, qui varie aussi : "ardoise"/"carbone" en
  // rectangles (_renderRectHands), "atlas" en lame effilée
  // (_renderLeafHands), le reste en traits classiques
  // (_renderLineHands).
  //
  // Tout sous-template SVG (graduations, chiffres, aiguilles — construits
  // ici dans des méthodes séparées, donc interpolés dans le <svg>
  // englobant plutôt qu'écrits littéralement dedans) doit utiliser le tag
  // `svg` de Lit, jamais `html` : un sous-template `html` pour un élément
  // SVG atterrit dans le mauvais espace de noms (xhtml, pas svg) et ne
  // s'affiche pas — piège repéré en 1.1.0 en inspectant
  // `element.namespaceURI` sur le rendu réel. Seul le <svg> racine,
  // littéral dans CE template (pas construit à part), peut rester sous
  // `html`.
  _renderAnalogClock(e, t, a, o) {
    var _;
    const i = e.getHours() % 12, n = e.getMinutes(), l = i * 30 + n * 0.5, r = n * 6, c = e.getSeconds() + e.getMilliseconds() / 1e3, u = c * 6, d = `-${c}s`, f = ((_ = {
      rect: this._renderRectHands,
      leaf: this._renderLeafHands
    }[o.shape]) != null ? _ : this._renderLineHands).bind(this)(o, l, r, u, d);
    return $`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${ne(e, t, a)}
      >
        ${o.glow ? this._renderGlowFilter() : h}
        ${this._renderTicks(o.ticks, o.glow)}
        ${this._renderNumerals(o.numerals)}
        ${f}
      </svg>
    `;
  }
  // Filtre de halo (mode "neon" uniquement). filterUnits="userSpaceOnUse"
  // avec une région exprimée en coordonnées du viewBox, pas en % de la
  // bounding box (valeur par défaut) : les aiguilles sont des <line>
  // verticales avant rotation (x1 === x2), donc leur bounding box a une
  // largeur nulle — en unités objectBoundingBox la région du filtre
  // s'écrase à zéro et Chrome n'affiche rien du tout (repéré ici :
  // aiguilles absentes du rendu alors que les graduations, elles,
  // s'affichaient).
  _renderGlowFilter() {
    return g`
      <defs>
        <filter id="echo-home-analog-glow" filterUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    `;
  }
  // Graduations : trait fin proche du bord ("line", style "aurore"),
  // point ("dot") ou petit diamant façon pierre facettée ("diamond",
  // style "grenat") — sur les 12 heures ("all"), les 8 non cardinales
  // ("minor", pour laisser la place aux chiffres) ou les 4 cardinales
  // seulement ("cardinal"). `y1s`/`radii`/`opacities` (optionnels, un
  // tableau de 12 valeurs) remplacent la longueur/taille/opacité par
  // position plutôt que le seul binaire cardinal/mineur — pour un rendu
  // irrégulier (rais de lumière, points de taille inégale...) plutôt
  // qu'une couronne parfaitement régulière.
  _renderTicks(e, t) {
    var i, n, l, r, c, u, d, p, m, f, _, w, b;
    if (!e) return h;
    const a = t ? "url(#echo-home-analog-glow)" : void 0, o = [];
    for (let v = 0; v < 12; v++) {
      const k = v % 3 === 0;
      if (e.mode === "minor" && k || e.mode === "cardinal" && !k || (i = e.skip) != null && i.includes(v)) continue;
      const H = v * 30;
      if (e.shape === "line") {
        const y = (l = (n = e.y1s) == null ? void 0 : n[v]) != null ? l : e.y1, x = (c = (r = e.opacities) == null ? void 0 : r[v]) != null ? c : e.opacity;
        o.push(g`
          <line
            class="tick hand"
            x1="50"
            y1=${y}
            x2="50"
            y2=${e.y2}
            stroke=${e.color}
            stroke-width=${e.width}
            opacity=${x}
            filter=${a != null ? a : h}
            transform="rotate(${H} 50 50)"
          />
        `);
      } else if (e.shape === "diamond") {
        const y = this._polar(e.radius, H), x = (d = (u = e.radii) == null ? void 0 : u[v]) != null ? d : k ? e.cardinalR : e.minorR, N = (m = (p = e.opacities) == null ? void 0 : p[v]) != null ? m : k ? e.cardinalOpacity : e.minorOpacity;
        o.push(g`
          <rect
            class="tick hand"
            x=${y.x - x} y=${y.y - x} width=${x * 2} height=${x * 2}
            fill=${e.color} opacity=${N} filter=${a != null ? a : h}
            transform="rotate(45 ${y.x} ${y.y})"
          />
        `);
      } else {
        const y = this._polar(e.radius, H), x = (_ = (f = e.radii) == null ? void 0 : f[v]) != null ? _ : k ? e.cardinalR : e.minorR, N = (b = (w = e.opacities) == null ? void 0 : w[v]) != null ? b : k ? e.cardinalOpacity : e.minorOpacity;
        o.push(g`
          <circle class="tick hand" cx=${y.x} cy=${y.y} r=${x} fill=${e.color} opacity=${N} filter=${a != null ? a : h} />
        `);
      }
    }
    return g`<g class="ticks">${o}</g>`;
  }
  // Chiffres arabes en "quad" (12/3/6/9, style "aurore") ou "single" (12
  // seulement, style "ardoise"), ou chiffres romains en "all" (les 12
  // heures, style "atlas" — "IIII" plutôt que "IV" à 4h, convention
  // d'horlogerie traditionnelle pour la symétrie visuelle avec "VIII").
  // Même rayon que les graduations à chaque fois — les chiffres doivent
  // être sur le même cercle qu'elles, pas ramenés vers le centre, sinon
  // ils paraissent "flotter" au milieu du cadran au lieu de marquer
  // l'heure à la même distance du bord (corrigé en 1.1.4 pour "aurore",
  // appliqué d'emblée ici aux autres). `cfg.labels` (optionnel) remplace
  // le texte par défaut à chaque position ; `cfg.fontFamily` (optionnel)
  // remplace la police par défaut (utile pour une police serif, style
  // "atlas").
  _renderNumerals(e) {
    var r, c;
    if (!e) return h;
    const t = e.mode === "all" ? 30 : 90, a = e.mode === "single" ? ["12"] : e.mode === "all" ? ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"] : ["12", "3", "6", "9"], o = (r = e.labels) != null ? r : a, i = e.mode === "single" ? [[o[0], 0]] : o.map((u, d) => [u, d * t]), n = (c = e.fontFamily) != null ? c : "inherit", l = i.map(([u, d]) => {
      const p = this._polar(e.radius, d);
      return g`
        <text
          class="numeral hand"
          x=${p.x}
          y=${p.y}
          font-size=${e.size}
          font-weight=${e.weight}
          font-family=${n}
          opacity=${e.opacity}
          fill=${e.color}
          text-anchor="middle"
          dominant-baseline="central"
        >${u}</text>
      `;
    });
    return g`<g class="numerals">${l}</g>`;
  }
  // sin/cos plutôt que des positions écrites en dur pour chaque heure :
  // évite de se tromper de signe pour l'une d'elles (angle depuis midi,
  // sens horaire — x = sin, y = -cos).
  _polar(e, t) {
    const a = t * Math.PI / 180;
    return { x: 50 + e * Math.sin(a), y: 50 - e * Math.cos(a) };
  }
  // Aiguilles "classiques" (tous les styles sauf "ardoise") : un simple
  // trait par aiguille, couleur/épaisseur/forme de bout définies par le
  // style. La seconde peut avoir une petite queue derrière le pivot et un
  // point à la pointe (styles "mono"/"neon").
  _renderLineHands(e, t, a, o, i) {
    const n = e.glow ? "url(#echo-home-analog-glow)" : void 0, l = g`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - e.hour.len}
        stroke=${e.hour.color}
        stroke-width=${e.hour.width}
        stroke-linecap=${e.hour.cap}
        filter=${n != null ? n : h}
        transform="rotate(${t} 50 50)"
      />
    `, r = g`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - e.minute.len}
        stroke=${e.minute.color}
        stroke-width=${e.minute.width}
        stroke-linecap=${e.minute.cap}
        filter=${n != null ? n : h}
        transform="rotate(${a} 50 50)"
      />
    `, c = e.second, u = c.tipDot ? g`<circle class="hand" cx="50" cy=${50 - c.len} r=${c.tipDot.r} fill=${c.tipDot.fill} filter=${n != null ? n : h} />` : h, d = ie(
      i,
      g`
        <g
          class="hand-second"
          style="animation-delay: ${i}; transform: rotate(${o}deg)"
        >
          <line
            class="hand"
            x1="50" y1=${50 + c.tail} x2="50" y2=${50 - c.len}
            stroke=${c.color}
            stroke-width=${c.width}
            stroke-linecap=${c.cap}
            opacity=${c.opacity}
            filter=${n != null ? n : h}
          />
          ${u}
        </g>
      `
    ), p = e.center, m = p.ring ? g`
          <circle
            class="hand"
            cx="50" cy="50" r=${p.ring.r} fill="none"
            stroke=${p.ring.color} stroke-width=${p.ring.width}
          />
        ` : h;
    return g`
      ${l}${r}${d}
      ${m}
      <circle class="hand" cx="50" cy="50" r=${p.r} fill=${p.color} />
    `;
  }
  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(e, t, a, o, i) {
    const n = e.hour, l = e.minute, r = e.second, c = e.center, u = ie(
      i,
      g`
        <g
          class="hand-second"
          style="animation-delay: ${i}; transform: rotate(${o}deg)"
        >
          <rect class="hand" x=${50 - r.w / 2} y=${50 - r.len} width=${r.w} height=${r.len} fill=${r.color} />
          <rect class="hand" x=${50 - r.w / 2} y="50" width=${r.w} height=${r.tail} fill=${r.color} />
        </g>
      `
    );
    return g`
      <rect
        class="hand hand-hour"
        x=${50 - n.w / 2} y=${50 - n.len} width=${n.w} height=${n.len}
        fill=${n.color}
        transform="rotate(${t} 50 50)"
      />
      <rect
        class="hand hand-minute"
        x=${50 - l.w / 2} y=${50 - l.len} width=${l.w} height=${l.len}
        fill=${l.color}
        transform="rotate(${a} 50 50)"
      />
      ${u}
      <rect
        class="hand"
        x=${50 - c.size / 2} y=${50 - c.size / 2} width=${c.size} height=${c.size}
        fill=${c.color}
        transform="rotate(45 50 50)"
      />
    `;
  }
  // Aiguilles "feuille" (style "atlas" — cadran ancien) : lame effilée
  // (étroite au pivot, large au tiers, étroite à la pointe) plutôt qu'un
  // trait uniforme — silhouette de flamme/lame plutôt qu'un simple trait.
  // Galbe volontairement discret (0.46/1.05, cf. constantes ci-dessous) :
  // une version plus prononcée testée d'abord a été jugée trop
  // excentrique. Trotteuse toujours un simple trait fin.
  _renderLeafHands(e, t, a, o, i) {
    const n = (m, f, _) => {
      const w = 50 - m.len * 0.46, b = m.width * 1.05;
      return g`
        <polygon
          class="hand ${_}"
          points="50,50 ${50 - b},${w} 50,${50 - m.len} ${50 + b},${w}"
          fill=${m.color}
          transform="rotate(${f} 50 50)"
        />
      `;
    }, l = n(e.hour, t, "hand-hour"), r = n(e.minute, a, "hand-minute"), c = e.second, u = c.tipDot ? g`<circle class="hand" cx="50" cy=${50 - c.len} r=${c.tipDot.r} fill=${c.tipDot.fill} />` : h, d = ie(
      i,
      g`
        <g class="hand-second" style="animation-delay: ${i}; transform: rotate(${o}deg)">
          <line class="hand" x1="50" y1=${50 + c.tail} x2="50" y2=${50 - c.len} stroke=${c.color} stroke-width=${c.width} stroke-linecap=${c.cap} opacity=${c.opacity} />
          ${u}
        </g>
      `
    ), p = e.center;
    return g`${l}${r}${d}<circle class="hand" cx="50" cy="50" r=${p.r} fill=${p.color} />`;
  }
  // Petit bouton discret (round et large, masqué la nuit comme le reste
  // — pas de lumière/info superflue sur un écran de chevet) pour
  // basculer digital ↔ analogique. L'icône affichée est celle du cadran
  // vers lequel on bascule (pas l'actuel) : la 1.4.2 avait inversé cette
  // convention ("icône = état actuel"), en pratique lu à l'envers une
  // fois sur l'appareil réel — l'attente naturelle sur un bouton est
  // "l'icône montre ce que le tap va donner", pas "l'icône décrit ce
  // qui est déjà à l'écran".
  _renderClockToggle(e) {
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", a = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return $`
      <button
        type="button"
        class="clock-toggle"
        aria-label=${a}
        title=${a}
        @click=${() => this._toggleClockFace()}
      >
        <ha-icon icon=${t}></ha-icon>
      </button>
    `;
  }
  _renderWeather(e) {
    const t = Se(e.state, this._isDarkOutside()), a = Ee(t, this._config.icons), o = Number(e.attributes.temperature).toFixed(1), i = e.attributes.temperature_unit || "°C", n = yt(this._hass, e.state), l = this._weatherClickable();
    return $`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : h}
        tabindex=${l ? "0" : h}
        aria-label="${n}, ${o}${i}"
        @click=${l ? () => this._navigateToWeather() : h}
        @keydown=${l ? (r) => this._onWeatherKeydown(r) : h}
      >
        <img class="weather-icon" src=${a} alt="" />
        <span class="weather-temp">${o}${i}</span>
      </div>
    `;
  }
}
z(ce, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), z(ce, "styles", He`
    /* Contrairement à echo-weather-card, pas besoin ici de la mécanique
       clamp()+cqw / repli vw (container queries, Chromium 105+ — cf.
       gotchas WebView embarqué) : cette carte est pensée pour occuper
       tout l'écran d'un smart display (fond de vue View Assist), pas
       pour être redimensionnée dans une grille Lovelace. Ses tailles
       fluides se basent donc directement sur vh/vmin (viewport),
       supportés depuis bien plus longtemps que les container queries et
       sans repli à prévoir. */
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      /* Proportions reprises telles quelles du button-card d'origine
         (View Assist, personnalisé par l'utilisateur) : horloge à 55vh
         (volontairement plus grande que sa propre bande de grille,
         cf. .card ci-dessous), date et température météo toutes deux à
         15vh — même poids visuel, pas un sous-titre discret. Les
         clamp() ne sont là qu'en garde-fou (écran extrême), pas pour
         réduire la cible vh. */
      --_clock-size: var(--echo-home-clock-size, clamp(6rem, 55vh, 20rem));
      --_date-size: var(--echo-home-date-size, clamp(2rem, 15vh, 6rem));
      --_weather-icon-size: var(
        --echo-home-weather-icon-size,
        clamp(48px, 16vh, 130px)
      );
      --_weather-temp-size: var(
        --echo-home-weather-temp-size,
        clamp(1.8rem, 15vh, 5rem)
      );
      /* Cadran analogique en mode large (Echo Show) uniquement — sans
         effet en round, qui a son propre --_analog-size (%, cf.
         .card.round). min(vh, vw) plutôt qu'un simple vh : sur un écran
         inhabituellement étroit, une valeur purement basée sur la
         hauteur déborderait sur la colonne météo/date à gauche. */
      --_analog-landscape-size: min(80vh, 42vw);
      /* Plus petite que --_date-size (pensée pour le mode digital, sous
         l'horloge géante) : à côté de la météo plutôt que sous une
         horloge, --_date-size la ferait presque aussi grosse que la
         température elle-même (--_weather-temp-size, quasi le même
         facteur vh) — pas ce qu'on veut d'une info secondaire. Remontée
         (1.1rem/8vh/3rem -> 1.4rem/10vh/3.6rem) après un retour "trop
         petite" sur appareil réel, sans revenir au poids de
         --_date-size. */
      --_analog-landscape-date-size: clamp(1.4rem, 10vh, 3.6rem);
      --_text-color: var(--echo-home-text-color, #ffffff);
      /* "red" tel quel par défaut (pas une teinte adoucie) : c'est
         volontairement discret/peu lumineux plutôt que joli — usage
         écran de chevet, cf. --_night-opacity ci-dessous. */
      --_night-color: var(--echo-home-night-color, red);
      --_night-opacity: var(--echo-home-night-opacity, 0.35);
      --_shader-color: var(--echo-home-shader-color, rgba(0, 0, 0, 0.15));
      --_radius: var(--echo-home-radius, 0px);
      --_default-bg: radial-gradient(
        130% 140% at 18% -10%,
        #1f3350 0%,
        #111e30 45%,
        #0a1424 100%
      );
      font-family: var(
        --echo-home-font-family,
        var(--primary-font-family, inherit)
      );
      color: var(--_text-color);
    }

    .card {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: var(--_radius);
      background: var(--_default-bg);
      background-color: #0a1424;
      background-size: cover;
      background-position: center;
    }

    /* Écran rond (Echo Spot) : la carte se clippe elle-même en cercle
       plutôt que de compter sur le boîtier physique — cf. gotchas
       matériel. */
    .card.round {
      border-radius: 50%;
    }

    /* Assombrit légèrement toute image de fond pour garder l'horloge
       lisible dessus, jour comme nuit (sans effet en mode nuit puisqu'il
       n'y a alors pas d'image de fond, cf. _backgroundValue). */
    .shader {
      position: absolute;
      inset: 0;
      background: var(--_shader-color);
      pointer-events: none;
    }

    /* Horloge centrée sur toute la hauteur de la carte, indépendamment
       du bloc météo (positionné à part, cf. .weather ci-dessous) et de
       la date. Un flex column + justify-content:center centrerait le
       *groupe* horloge+date, pas l'horloge elle-même — comme la date est
       bien plus petite, ça tirait visiblement l'horloge au-dessus du
       centre réel de l'écran (repéré par l'utilisateur en comparant au
       rendu attendu). Positionnement absolu à la place : l'horloge est
       calée pile au centre, la date juste en dessous (décalée de la
       moitié de la taille de l'horloge + un petit espace, via
       --_clock-size plutôt qu'une valeur fixe pour rester correcte en
       mode round où --_clock-size est redéfinie, cf. .card.round). */
    .clockgroup {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .clock {
      position: absolute;
      top: 50%;
      left: 50%;
      /* --_fit-scale : 1 par défaut, réduit seulement si le contenu
         réel déborde à la taille vh/vmin normale (cf.
         _fitOverflowingText) — une heure à un chiffre ("9:41") n'est
         donc jamais rétrécie inutilement, seule une heure large
         ("23:59", ou "11:59PM" en 12h) l'est. */
      transform: translate(-50%, -50%) scale(var(--_fit-scale, 1));
      font-size: var(--_clock-size);
      font-weight: 700;
      line-height: 1;
      color: var(--_text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      transition: color 0.4s ease, opacity 0.4s ease;
    }

    :host(.night) .clock {
      color: var(--_night-color);
      opacity: var(--_night-opacity);
    }

    .date {
      position: absolute;
      /* La version précédente égalisait les *boîtes* CSS horloge/date
         (line-height:1), pas l'encre visible du texte — repéré avec une
         règle en pixels superposée sur une capture : la police (Nunito)
         réserve nettement plus d'espace vide sous le texte que dessus
         dans sa boîte de ligne (métriques mesurées via Canvas
         measureText : ~11% de la hauteur de l'horloge inutilisée en
         haut, ~15% en bas ; ~6% en haut / ~15% en bas pour la date —
         cf. les chiffres n'atteignent jamais la hauteur d'ascendante
         complète, contrairement à "Dim." avec sa majuscule). D'où
         l'écart visuel malgré des boîtes CSS symétriques. Coefficients
         ci-dessous ajustés à partir de ces mesures réelles (pas
         théoriques) pour que l'*encre* visible soit centrée dans
         l'espace sous l'horloge, pas la boîte. Toujours basé sur
         --_clock-size/--_date-size (donc correct en mode round aussi),
         mais avec des coefficients propres à Nunito — à réajuster si la
         police change (voir --echo-home-font-family). */
      /* +0.08*D par rapport au calage "encre parfaitement centrée"
         ci-dessus : léger rapprochement de l'horloge, demandé par
         l'utilisateur une fois la symétrie de base en place. */
      top: calc(75% + var(--_clock-size) * 0.175 - var(--_date-size) * 0.5315);
      left: 50%;
      /* transform-origin: top (pas le centre par défaut) : si
         --_fit-scale réduit le texte (cf. _fitOverflowingText, même
         filet de rattrapage que .clock pour une date à l'abréviation
         plus longue dans certaines langues), le bord haut ne doit pas
         bouger — c'est lui que la propriété top positionne avec le
         calcul d'encre ci-dessus, pas le centre de la boîte. */
      transform: translateX(-50%) scale(var(--_fit-scale, 1));
      transform-origin: top;
      line-height: 1;
      font-size: var(--_date-size);
      color: var(--_text-color);
      opacity: 0.85;
      white-space: nowrap;
    }

    .weather {
      position: absolute;
      top: clamp(8px, 3vh, 20px);
      left: clamp(8px, 3.5%, 22px);
      z-index: 1;
      display: flex;
      align-items: center;
      gap: clamp(6px, 1.2vw, 14px);
    }

    /* En mode round, l'espace disponible sous la date se rétrécit vite
       (courbe du cercle) — le calage "encre centrée dans l'espace
       jusqu'au bas de la carte" utilisé en paysage (cf. .date ci-dessus)
       n'a pas de sens ici : il n'y a pas de vrai "bas d'écran" plat,
       juste une courbe qui grignote progressivement la largeur
       disponible. Remontée par rapport au calcul paysage pour rester
       dans la partie encore confortablement large du cercle plutôt que
       de s'approcher de la pointe basse. */
    .card.round .date {
      top: calc(75% + var(--_clock-size) * 0.175 - var(--_date-size) * 0.86);
    }

    /* En mode round, un bloc météo calé à gauche tomberait sous le
       boîtier physique (coin clippé) — cf. gotchas écran rond. Centré
       en haut à la place. */
    .card.round .weather {
      left: 50%;
      top: clamp(20px, 11%, 40px);
      transform: translateX(-50%);
    }

    /* Cadran analogique : un écran à part, pas une variante du digital —
       comme sur l'Echo Spot d'origine sous Alexa (avant LineageOS/View
       Assist), dont le cadran rond plein écran sert de référence même
       en mode large (Echo Show, depuis 1.3.0) : mêmes aiguilles, casées
       à droite plutôt que centrées, la météo/date prenant la place à
       gauche (cf. .analog-weather/.analog-date plus bas) — toujours pas
       de photo de fond par défaut, sauf analog_background_photo
       (paysage uniquement, cf. render()). --_analog-default-bg vient du
       style choisi (analog_style, cf. analog-styles.js et render()) —
       --echo-home-analog-background (personnalisation utilisateur, cf.
       README) garde la priorité dessus ; ignoré si
       analog_background_photo est actif (fond dynamique posé en
       background direct par render() dans ce cas, pas ici). */
    .card.analog {
      background: var(--echo-home-analog-background, var(--_analog-default-bg));
    }

    /* La nuit, on retombe sur le traitement nuit uniforme (fond quasi
       noir) plutôt que le fond du style choisi — SAUF pour les styles
       qui définissent leur propre bloc "night" (cf. analog-styles.js,
       3 formes possibles : recolorage simple, bascule vers un autre
       style, ou concept complet) : ceux-là portent la classe
       "custom-night" (posée dans le JS, cf. render()) et sont donc
       exemptés ici, leur fond nuit passant par --_analog-default-bg
       comme en journée (cf. règle .card.analog juste au-dessus). */
    :host(.night) .card.analog:not(.custom-night) {
      background: var(--_default-bg);
      background-color: #0a1424;
    }

    .analog-clock {
      position: absolute;
      transition: opacity 0.4s ease;
    }

    /* Round : cadran plein écran, centré (cf. --_analog-size, 94% du
       conteneur — la carte round est toujours carrée, un % y suffit). */
    .card.round .analog-clock {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
    }

    /* Paysage : cadran plus petit, casé à droite plutôt que centré, pour
       laisser la place à la météo/date à gauche (cf. .analog-weather/
       .analog-date). --_analog-landscape-size en vh/vw (pas %, cf.
       --_clock-size) : contrairement à la carte round, la carte large
       n'est pas carrée — un % de sa largeur et un % de sa hauteur ne
       donneraient pas la même valeur, ce qui déformerait le cadran en
       ellipse. */
    .card:not(.round) .analog-clock {
      top: 50%;
      right: 4%;
      transform: translateY(-50%);
      width: var(--_analog-landscape-size);
      height: var(--_analog-landscape-size);
    }

    /* Couleurs et épaisseurs propres à chaque style posées directement en
       attributs SVG par _renderLineHands/_renderRectHands/_renderLeafHands/
       _renderTicks/_renderNumerals, pas ici : contrairement
       à la version à un seul style (< 1.2.0), il n'y a plus de couleur
       "currentColor" commune à surcharger. Styles avec leur propre nuit
       ("custom-night") : ni l'opacité ni la couleur ne sont forcées ici —
       l'appareil baisse déjà la luminosité tout seul la nuit, donc ces
       nuits restent volontairement "vibrantes" (pleine opacité, propres
       couleurs) plutôt que doublement atténuées. Pour les styles SANS
       bloc "night" (mono/clair/neon), .hand regroupe toutes les
       aiguilles/graduations/chiffres et retombe uniformément sur le rouge
       très atténué habituel, comme avant. */
    :host(.night) .card.analog:not(.custom-night) .analog-clock {
      opacity: var(--_night-opacity);
    }

    :host(.night) .card.analog:not(.custom-night) .analog-clock .hand {
      fill: var(--_night-color);
      stroke: var(--_night-color);
    }

    /* Tourne en continu via une animation CSS plutôt qu'un recalcul JS
       par seconde (cf. commentaire sur --_second-hand-delay dans
       _renderAnalogClock) — un seul transform animé, composité par le
       GPU, sans repeindre le reste du cadran à chaque frame. S'applique
       au groupe englobant la trotteuse (<g class="hand-second">, cf.
       _renderLineHands/_renderRectHands), pas à un unique trait : la
       queue/le contrepoids et l'éventuel point en pointe doivent tourner
       ensemble avec elle. transform-origin en unités du viewBox (50px
       50px = le centre du cadran, pas le centre de la boîte englobante
       du groupe lui-même, qui serait décalé à cause de la queue derrière
       le pivot). */
    .analog-clock .hand-second {
      transform-origin: 50px 50px;
    }

    @media (prefers-reduced-motion: no-preference) {
      .analog-clock .hand-second {
        animation: spin-second-hand 60s linear infinite;
      }
    }

    @keyframes spin-second-hand {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Météo + date associées au cadran analogique (cf.
       _renderAnalogComplications), rendues AVANT le <svg> des aiguilles
       dans le DOM pour qu'elles restent toujours visibles par-dessus
       (cf. commentaire sur cette méthode). pointer-events: none : une
       pure décoration, qui ne doit pas voler le tap destiné au bouton de
       bascule sous elle. Couleur/opacité posées en style inline par
       style analogique (cf. comp dans analog-styles.js), pas ici — pas
       de valeur commune à tous. */
    .analog-complications {
      position: absolute;
      pointer-events: none;
    }

    /* Round : superposée au cadran (même boîte que .analog-clock, donc
       alignée sur le même disque) — une complication discrète, comme un
       guichet de date sur une montre mécanique. */
    .card.round .analog-complications {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
    }

    /* Paysage : pas superposée au cadran (casé à droite, cf.
       .analog-clock) mais positionnée sur toute la carte — la météo/date
       occupent la colonne de gauche, pas un guichet discret mais un vrai
       bloc d'info à part entière (cf. .analog-weather/.analog-date plus
       bas). */
    .card:not(.round) .analog-complications {
      inset: 0;
    }

    .analog-weather {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 0.3em;
    }

    /* Round : positions choisies pour rester dans la partie du cadran
       non balayée par les chiffres (radius ~40-41 sur un viewBox 0-100,
       cf. analog-styles.js) : la météo juste au-dessus du centre, la
       date juste en dessous — symétriques sur l'axe midi-6h. Les
       aiguilles peuvent passer dessus sans gêner la lecture. */
    .card.round .analog-weather {
      left: 50%;
      top: 27%;
      transform: translate(-50%, -50%);
    }
    .card.round .analog-weather-icon {
      width: var(--_analog-weather-icon-size);
      height: var(--_analog-weather-icon-size);
    }
    .card.round .analog-weather-temp {
      font-size: var(--_analog-weather-temp-size);
    }
    .card.round .analog-date {
      left: 50%;
      top: 69%;
      transform: translate(-50%, -50%);
      font-size: var(--_analog-date-size);
    }

    /* Paysage : bloc météo/date centré sur le même axe horizontal que le
       centre du cadran (symétrique, au-dessus/en dessous), dans la
       colonne de gauche — ici, ce n'est plus une complication discrète
       mais l'info principale de ce côté de l'écran. Icône/température
       reprennent la taille du bloc météo du mode digital
       (--_weather-icon-size/--_weather-temp-size) ; la date a sa propre
       taille (--_analog-landscape-date-size), plus petite, pour rester
       secondaire par rapport à la météo au lieu de rivaliser avec elle
       (--_date-size, pensée pour être lue sous l'horloge géante du
       digital, est presque aussi grande que --_weather-temp-size — bien
       trop pour une info secondaire une fois les deux côte à côte). */
    .card:not(.round) .analog-weather {
      left: 21%;
      top: 41%;
      transform: translate(-50%, -50%);
    }
    .card:not(.round) .analog-weather-icon {
      width: var(--_weather-icon-size);
      height: var(--_weather-icon-size);
    }
    .card:not(.round) .analog-weather-temp {
      font-size: var(--_weather-temp-size);
    }
    .card:not(.round) .analog-date {
      left: 21%;
      top: 58%;
      transform: translate(-50%, -50%);
      font-size: var(--_analog-landscape-date-size);
    }

    .analog-weather-icon {
      display: block;
    }

    .analog-weather-temp {
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .analog-date {
      position: absolute;
      white-space: nowrap;
    }

    /* Bouton discret pour basculer digital ↔ analogique — masqué la nuit
       (cf. render(), même logique que la météo/la date : pas de lumière
       ni d'info superflue sur un écran de chevet). Docké près du bas :
       même à quelques px du bord, le cercle y offre encore largement
       assez de largeur pour un petit bouton (contrairement à une ligne
       de texte, cf. .card.round .date plus haut). */
    .clock-toggle {
      position: absolute;
      left: 50%;
      bottom: clamp(10px, 5%, 20px);
      transform: translateX(-50%);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--_text-color);
      opacity: 0.55;
      cursor: pointer;
      transition: opacity 0.2s ease;
      --mdc-icon-size: 22px;
    }

    /* La 1.4.2 avait décalé ce bouton en bas à droite en mode round,
       pour l'écarter du chevron/de la date centrés à cette hauteur —
       signalé pas centré du tout une fois sur l'appareil réel (l'écart
       théorique trouvé en testant une position intermédiaire, plus haut
       mais toujours centrée, n'a jamais existé à la position d'origine
       ci-dessus, seulement à cette position intermédiaire jamais
       déployée). Redevenu centré, comme avant la 1.4.2 — mais seulement
       en digital : en analogique + round, "bottom" le place ~91% vers
       le bas de la carte (calculé sur la position réelle), en plein
       dans l'anneau de graduations du cadran (~90-92%, cf.
       analog-styles.js) — signalé après un vrai test sur appareil.
       Remonté à 79%, sous la date (~68%) mais bien avant les
       graduations, dans l'espace vide entre les deux. Le digital n'a ni
       cadran ni date à cette hauteur, donc pas touché. */
    .card.round.analog .clock-toggle {
      top: 79%;
      bottom: auto;
      transform: translate(-50%, -50%);
    }

    .clock-toggle:hover,
    .clock-toggle:focus-visible {
      opacity: 1;
    }

    .clock-toggle:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }

    .weather.clickable {
      cursor: pointer;
    }
    .weather.clickable:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 4px;
      border-radius: 8px;
    }

    .weather-icon {
      width: var(--_weather-icon-size);
      height: var(--_weather-icon-size);
      flex-shrink: 0;
    }

    .weather-temp {
      font-size: var(--_weather-temp-size);
      font-weight: 600;
      color: var(--_text-color);
    }

    /* Tailles round : vmin plutôt que vh, pour rester correct même si la
       carte n'est pas exactement carrée (aperçu dans une fenêtre large,
       par exemple) — cf. même logique que echo-weather-card en mode
       round. Valeurs propres à ce layout (pas de variable CSS exposée),
       comme pour echo-weather-card. Redéfinies comme tokens (pas comme
       overrides directs de .clock/.date/...) pour que le calc() du
       décalage de la date (cf. .date ci-dessus) reste juste ici aussi. */
    .card.round {
      --_clock-size: clamp(4rem, 50vmin, 13rem);
      --_date-size: clamp(1.6rem, 13vmin, 3.6rem);
      --_weather-icon-size: clamp(40px, 14vmin, 84px);
      --_weather-temp-size: clamp(1.6rem, 13vmin, 3.2rem);
      /* % plutôt qu'un clamp() en px/vmin : le cadran doit occuper
         quasiment tout le disque visible (cf. commentaire sur
         .analog-clock), donc suivre directement la taille réelle de la
         carte plutôt qu'une cible de taille indépendante. 94% plutôt
         que 100% pour une petite marge entre les graduations et le bord
         clippé en cercle (évite un rendu "coupé net" à l'anticrénelage
         près). */
      --_analog-size: 94%;
      /* Plus petites que --_weather-icon-size/--_weather-temp-size/
         --_date-size ci-dessus : une complication reste plus discrète
         qu'à côté d'aiguilles qui occupent tout l'écran que le bloc
         météo/date du mode digital — mais remontées (0.65rem/4.6vmin/
         1.15rem -> 0.85rem/5.6vmin/1.4rem etc.) après un retour "trop
         petit" sur appareil réel. */
      --_analog-weather-icon-size: clamp(18px, 6vmin, 36px);
      --_analog-weather-temp-size: clamp(0.85rem, 5.6vmin, 1.4rem);
      --_analog-date-size: clamp(0.8rem, 5vmin, 1.3rem);
    }
  `);
customElements.define(Ke, ce);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Ke,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
