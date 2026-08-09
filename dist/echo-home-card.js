var Fe = Object.defineProperty;
var Be = (n, e, t) => e in n ? Fe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var V = (n, e, t) => Be(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, te = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, se = Symbol(), re = /* @__PURE__ */ new WeakMap();
let Ne = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (te && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = re.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && re.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ie = (n) => new Ne(typeof n == "string" ? n : n + "", void 0, se), Ve = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((s, a, i) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + n[i + 1], n[0]);
  return new Ne(t, n, se);
}, We = (n, e) => {
  if (te) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), a = L.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = t.cssText, n.appendChild(s);
  }
}, le = te ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ie(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ge, defineProperty: Je, getOwnPropertyDescriptor: Ke, getOwnPropertyNames: Ye, getOwnPropertySymbols: Xe, getPrototypeOf: Ze } = Object, w = globalThis, ce = w.trustedTypes, Qe = ce ? ce.emptyScript : "", W = w.reactiveElementPolyfillSupport, T = (n, e) => n, Z = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Qe : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ue = (n, e) => !Ge(n, e), ue = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: Ue };
var ze, Ce;
(ze = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Ce = w.litPropertyMetadata) != null || (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ue) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), a = this.getPropertyDescriptor(e, s, t);
      a !== void 0 && Je(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    var o;
    const { get: a, set: i } = (o = Ke(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: a, set(l) {
      const r = a == null ? void 0 : a.call(this);
      i == null || i.call(this, l), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = Ze(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, s = [...Ye(t), ...Xe(t)];
      for (const a of s) this.createProperty(a, t[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, a] of t) this.elementProperties.set(s, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const a = this._$Eu(t, s);
      a !== void 0 && this._$Eh.set(a, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const a of s) t.unshift(le(a));
    } else e !== void 0 && t.push(le(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, s;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return We(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var a;
      return (a = s.hostConnected) == null ? void 0 : a.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var i;
    const s = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, s);
    if (a !== void 0 && s.reflect === !0) {
      const o = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : Z).toAttribute(t, s.type);
      this._$Em = e, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, o, l;
    const s = this.constructor, a = s._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const r = s.getPropertyOptions(a), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? r.converter : Z;
      this._$Em = a;
      const h = c.fromAttribute(t, r.type);
      this[a] = (l = h != null ? h : (o = this._$Ej) == null ? void 0 : o.get(a)) != null ? l : h, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, a = !1, i) {
    var o, l;
    if (e !== void 0) {
      const r = this.constructor;
      if (a === !1 && (i = this[e]), s != null || (s = r.getPropertyOptions(e)), !(((o = s.hasChanged) != null ? o : Ue)(i, t) || s.useDefault && s.reflect && i === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: a, wrapped: i }, o) {
    var l, r, c;
    s && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (r = o != null ? o : t) != null ? r : this[e]), i !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), a === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var s, a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, l] of i) {
        const { wrapped: r } = l, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (a = this._$EO) == null || a.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
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
    (t = this._$EO) == null || t.forEach((s) => {
      var a;
      return (a = s.hostUpdated) == null ? void 0 : a.call(s);
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
var Ee;
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[T("elementProperties")] = /* @__PURE__ */ new Map(), z[T("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: z }), ((Ee = w.reactiveElementVersions) != null ? Ee : w.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, de = (n) => n, F = N.trustedTypes, he = F ? F.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Me = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, Pe = "?" + b, et = `<${Pe}>`, S = document, M = () => S.createComment(""), P = (n) => n === null || typeof n != "object" && typeof n != "function", ae = Array.isArray, tt = (n) => ae(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, k = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, fe = /"/g, Re = /^(?:script|style|textarea|title)$/i, De = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), _ = De(1), m = De(2), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function He(n, e) {
  if (!ae(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return he !== void 0 ? he.createHTML(e) : e;
}
const st = (n, e) => {
  const t = n.length - 1, s = [];
  let a, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = O;
  for (let l = 0; l < t; l++) {
    const r = n[l];
    let c, h, u = -1, p = 0;
    for (; p < r.length && (o.lastIndex = p, h = o.exec(r), h !== null); ) p = o.lastIndex, o === O ? h[1] === "!--" ? o = pe : h[1] !== void 0 ? o = me : h[2] !== void 0 ? (Re.test(h[2]) && (a = RegExp("</" + h[2], "g")), o = k) : h[3] !== void 0 && (o = k) : o === k ? h[0] === ">" ? (o = a != null ? a : O, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? k : h[3] === '"' ? fe : ge) : o === fe || o === ge ? o = k : o === pe || o === me ? o = O : (o = k, a = void 0);
    const g = o === k && n[l + 1].startsWith("/>") ? " " : "";
    i += o === O ? r + et : u >= 0 ? (s.push(c), r.slice(0, u) + Me + r.slice(u) + b + g) : r + b + (u === -2 ? l : g);
  }
  return [He(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: e, _$litType$: t }, s) {
    let a;
    this.parts = [];
    let i = 0, o = 0;
    const l = e.length - 1, r = this.parts, [c, h] = st(e, t);
    if (this.el = R.createElement(c, s), A.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (a = A.nextNode()) !== null && r.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const u of a.getAttributeNames()) if (u.endsWith(Me)) {
          const p = h[o++], g = a.getAttribute(u).split(b), f = /([.?@])?(.*)/.exec(p);
          r.push({ type: 1, index: i, name: f[2], strings: g, ctor: f[1] === "." ? it : f[1] === "?" ? ot : f[1] === "@" ? nt : B }), a.removeAttribute(u);
        } else u.startsWith(b) && (r.push({ type: 6, index: i }), a.removeAttribute(u));
        if (Re.test(a.tagName)) {
          const u = a.textContent.split(b), p = u.length - 1;
          if (p > 0) {
            a.textContent = F ? F.emptyScript : "";
            for (let g = 0; g < p; g++) a.append(u[g], M()), A.nextNode(), r.push({ type: 2, index: ++i });
            a.append(u[p], M());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Pe) r.push({ type: 2, index: i });
      else {
        let u = -1;
        for (; (u = a.data.indexOf(b, u + 1)) !== -1; ) r.push({ type: 7, index: i }), u += b.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const s = S.createElement("template");
    return s.innerHTML = e, s;
  }
}
function q(n, e, t = n, s) {
  var o, l, r;
  if (e === E) return e;
  let a = s !== void 0 ? (o = t._$Co) == null ? void 0 : o[s] : t._$Cl;
  const i = P(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== i && ((l = a == null ? void 0 : a._$AO) == null || l.call(a, !1), i === void 0 ? a = void 0 : (a = new i(n), a._$AT(n, t, s)), s !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[s] = a : t._$Cl = a), a !== void 0 && (e = q(n, a._$AS(n, e.values), a, s)), e;
}
class at {
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
    const { el: { content: t }, parts: s } = this._$AD, a = ((c = e == null ? void 0 : e.creationScope) != null ? c : S).importNode(t, !0);
    A.currentNode = a;
    let i = A.nextNode(), o = 0, l = 0, r = s[0];
    for (; r !== void 0; ) {
      if (o === r.index) {
        let h;
        r.type === 2 ? h = new D(i, i.nextSibling, this, e) : r.type === 1 ? h = new r.ctor(i, r.name, r.strings, this, e) : r.type === 6 && (h = new rt(i, this, e)), this._$AV.push(h), r = s[++l];
      }
      o !== (r == null ? void 0 : r.index) && (i = A.nextNode(), o++);
    }
    return A.currentNode = S, a;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class D {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, s, a) {
    var i;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = a, this._$Cv = (i = a == null ? void 0 : a.isConnected) != null ? i : !0;
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
    e = q(this, e, t), P(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: s } = e, a = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = R.createElement(He(s.h, s.h[0]), this.options)), s);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === a) this._$AH.p(t);
    else {
      const o = new at(a, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = _e.get(e.strings);
    return t === void 0 && _e.set(e.strings, t = new R(e)), t;
  }
  k(e) {
    ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, a = 0;
    for (const i of e) a === t.length ? t.push(s = new D(this.O(M()), this.O(M()), this, this.options)) : s = t[a], s._$AI(i), a++;
    a < t.length && (this._$AR(s && s._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const a = de(e).nextSibling;
      de(e).remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, a, i) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(e, t = this, s, a) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) e = q(this, e, t, 0), o = !P(e) || e !== this._$AH && e !== E, o && (this._$AH = e);
    else {
      const l = e;
      let r, c;
      for (e = i[0], r = 0; r < i.length - 1; r++) c = q(this, l[s + r], t, r), c === E && (c = this._$AH[r]), o || (o = !P(c) || c !== this._$AH[r]), c === d ? e = d : e !== d && (e += (c != null ? c : "") + i[r + 1]), this._$AH[r] = c;
    }
    o && !a && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class it extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class ot extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class nt extends B {
  constructor(e, t, s, a, i) {
    super(e, t, s, a, i), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = q(this, e, t, 0)) != null ? o : d) === E) return;
    const s = this._$AH, a = e === d && s !== d || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, i = e !== d && (s === d || a);
    a && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (t = this.options) == null ? void 0 : t.host) != null ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class rt {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const J = N.litHtmlPolyfillSupport;
var qe;
J == null || J(R, D), ((qe = N.litHtmlVersions) != null ? qe : N.litHtmlVersions = []).push("3.3.3");
const lt = (n, e, t) => {
  var i, o;
  const s = (i = t == null ? void 0 : t.renderBefore) != null ? i : e;
  let a = s._$litPart$;
  if (a === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    s._$litPart$ = a = new D(e.insertBefore(M(), l), l, void 0, t != null ? t : {});
  }
  return a._$AI(n), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class U extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, s;
    const e = super.createRenderRoot();
    return (s = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = lt(t, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var Oe;
U._$litElement$ = !0, U.finalized = !0, (Oe = x.litElementHydrateSupport) == null || Oe.call(x, { LitElement: U });
const K = x.litElementPolyfillSupport;
K == null || K({ LitElement: U });
var Te;
((Te = x.litElementVersions) != null ? Te : x.litElementVersions = []).push("4.2.2");
const je = "echo-home-card", ct = "https://cdn.jsdelivr.net/npm/@meteocons/svg", v = {
  // --- Entités (aucune n'est requise — la carte fonctionne comme simple
  // horloge sans rien configurer du tout) ---
  satellite_entity: null,
  // entité View Assist du satellite (attributs
  // `mode` — "night" bascule le mode nuit — et `background`, l'URL de
  // fond dynamique choisie côté View Assist)
  weather_entity: null,
  // bloc météo compact (icône + température) ; le
  // bloc est simplement absent si non renseignée
  sun_entity: null,
  // sinon sun.sun — sert uniquement à choisir la bonne
  // variante jour/nuit de l'icône météo (ex: partiellement nuageux)
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
  // Jamais de fond dynamique/photo (satellite/url/media_folder) en mode
  // round pour analog_background : l'écran à part sur fond uni
  // reproduit volontairement l'Echo Spot d'origine (cf. README) —
  // retombe sur "style" si configuré quand même.
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
  // (défaut, dégradé turquoise/bleu/violet), "mono", "clair", "neon" ou
  // "ardoise" (cf. src/analog-styles.js). Contrairement à clock_face, ce
  // n'est qu'un réglage YAML : pas de bouton pour en changer à l'écran,
  // pas de mémorisation localStorage — un seul style choisi une fois.
  // Ignoré si analog_background a un type dynamique (satellite/url/
  // media_folder) : retombe sur "aurore", blanc, lisible sur n'importe
  // quelle photo (les couleurs d'un style donné ne le sont pas forcément).
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
}, ut = {
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
function $e(n, e) {
  return n === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : n === "sunny" && e ? "clear-night" : ut[n] || "not-available";
}
function ve(n, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${n}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${ct}/${t}/${n}.svg`;
}
function Y(n, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(n).replace(/\s/g, "");
}
function X(n, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(n);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function dt(n, e) {
  return n.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const ye = "aurore", H = {
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
    comp: { color: "#ffffff", opacity: 0.85 }
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
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.28), transparent 60%), #3a4750",
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
    comp: { color: "#edeef0", opacity: 0.6 }
  }
}, ht = ["cover", "contain", "fill"], C = "cover", Q = 300;
function pt(n) {
  return n === "contain" ? "contain" : n === "fill" ? "100% 100%" : "cover";
}
function j(n, e) {
  return `center / ${pt(e)} no-repeat url("${n}")`;
}
function be(n, e, t) {
  if (n != null) {
    if (typeof n == "string") return { type: "css", value: n };
    if (typeof n == "object") return { type: t, ...n };
  } else if (e)
    return { type: "satellite" };
  return { type: t };
}
function we(n, e, t, s, a) {
  var o;
  const i = { ...n };
  return e.includes(i.type) || (a(`${s}.type`, t), i.type = t), i.fit != null && !ht.includes(i.fit) && (a(`${s}.fit`, C), i.fit = C), i.interval != null && (typeof i.interval != "number" || !Number.isFinite(i.interval) || i.interval <= 0) && (a(`${s}.interval`, Q), i.interval = Q), i.type === "url" && !i.url && !(((o = i.urls) == null ? void 0 : o.length) > 0) && (a(`${s}.url`, "satellite"), i.type = "satellite"), i.type === "media_folder" && !i.path && (a(`${s}.path`, "satellite"), i.type = "satellite"), i;
}
async function mt(n, e) {
  return ((await n.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children || []).filter(
    (s) => {
      var a;
      return s.media_class === "image" || ((a = s.media_content_type) == null ? void 0 : a.startsWith("image/"));
    }
  ).map((s) => s.media_content_id);
}
async function ke(n, e) {
  return (await n.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
class Ae {
  constructor(e) {
    this._onChange = e, this._signature = null, this._images = [], this._resolvedUrl = null, this._index = 0, this._timer = null, this._token = 0, this.cssValue = null;
  }
  configure(e, t, s) {
    var o, l;
    const a = JSON.stringify([t, s]);
    if (a === this._signature) return;
    this._signature = a, this._token += 1;
    const i = this._token;
    switch (clearInterval(this._timer), this._timer = null, this._images = [], this._index = 0, t.type) {
      case "style":
        this.cssValue = null;
        return;
      case "css":
        this.cssValue = (o = t.value) != null ? o : null;
        return;
      case "satellite":
        this.cssValue = s.isNightMode ? null : s.satelliteBackgroundUrl ? j(s.satelliteBackgroundUrl, C) : null;
        return;
      case "url": {
        if (s.isNightMode) {
          this.cssValue = null;
          return;
        }
        const r = (l = t.urls) != null && l.length ? t.urls : [t.url];
        this._images = r, this.cssValue = j(r[0], t.fit || C), this._startRotation(e, t, i, (c) => c);
        return;
      }
      case "media_folder": {
        if (s.isNightMode) {
          this.cssValue = null;
          return;
        }
        this._loadMediaFolder(e, t, i);
        return;
      }
      default:
        this.cssValue = null;
    }
  }
  async _loadMediaFolder(e, t, s) {
    try {
      const a = await mt(e, t.path);
      if (s !== this._token) return;
      if (this._images = a, !a.length) {
        console.warn(
          `[echo-home-card] aucune image trouvée dans le dossier Media Source "${t.path}"`
        ), this.cssValue = null, this._onChange();
        return;
      }
      await this._showMediaAt(e, t, s, 0), this._startRotation(e, t, s, (i) => ke(e, i));
    } catch (a) {
      if (s !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de parcourir le dossier Media Source "${t.path}"`,
        a
      ), this.cssValue = null, this._onChange();
    }
  }
  async _showMediaAt(e, t, s, a) {
    try {
      const i = await ke(e, this._images[a]);
      if (s !== this._token) return;
      this.cssValue = j(i, t.fit || C), this._onChange();
    } catch (i) {
      if (s !== this._token) return;
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
  _startRotation(e, t, s, a) {
    if (this._images.length <= 1) return;
    const i = (t.interval || Q) * 1e3;
    this._timer = setInterval(async () => {
      s === this._token && (this._index = (this._index + 1) % this._images.length, t.type === "media_folder" ? await this._showMediaAt(e, t, s, this._index) : (this.cssValue = j(this._images[this._index], t.fit || C), this._onChange()));
    }, i);
  }
  destroy() {
    clearInterval(this._timer), this._timer = null, this._token += 1;
  }
}
const xe = "echo-home-card-clock-face", Se = new Date(2e3, 0, 27, 12, 59);
class ee extends U {
  // Une source par présentation (digital/analogique), chacune avec son
  // propre réglage indépendant (background/analog_background, cf.
  // const.js) — cf. src/background.js. onChange redéclenche un rendu
  // Lit quand une résolution/rotation asynchrone (dossier Media Source,
  // plusieurs URLs) change la valeur CSS courante ; render() n'attend
  // jamais cette résolution, il lit juste le dernier résultat connu
  // (`.cssValue`, synchrone).
  constructor() {
    super(), this._digitalBackground = new Ae(() => this.requestUpdate()), this._analogBackground = new Ae(() => this.requestUpdate());
  }
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ...v,
      ...e,
      icons: { ...v.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {}), this._clockFace === void 0 && (this._clockFace = this._initClockFace());
  }
  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const e = localStorage.getItem(xe);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(xe, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const s = (o, l) => console.warn(
      `[echo-home-card] "${o}" invalide (${JSON.stringify(t[o])}), valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.layout !== null && e.layout !== "round" && (s("layout", v.layout), e.layout = v.layout), ["digital", "analog"].includes(e.clock_face) || (s("clock_face", v.clock_face), e.clock_face = v.clock_face), Object.keys(H).includes(e.analog_style) || (s("analog_style", v.analog_style), e.analog_style = v.analog_style), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (s("zoom", v.zoom), e.zoom = v.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-home-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable.`
    );
    const a = (o, l) => console.warn(
      `[echo-home-card] "${o}" invalide, valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.background = we(
      be(e.background, !1, "satellite"),
      ["satellite", "css", "url", "media_folder"],
      "satellite",
      "background",
      a
    );
    let i = we(
      be(
        e.analog_background,
        e.analog_background_photo,
        "style"
      ),
      ["style", "satellite", "css", "url", "media_folder"],
      "style",
      "analog_background",
      a
    );
    return e.layout === "round" && ["satellite", "url", "media_folder"].includes(i.type) && (a("analog_background.type", "style"), i = { type: "style" }), e.analog_background = i, e;
  }
  static getStubConfig(e) {
    const t = Object.keys(e.states).find(
      (s) => s.startsWith("weather.")
    );
    return t ? { weather_entity: t } : {};
  }
  getCardSize() {
    return 6;
  }
  connectedCallback() {
    super.connectedCallback(), this._clockTimer = setInterval(() => {
      var e, t;
      ((e = this._config) != null && e.show_clock || (t = this._config) != null && t.show_date) && this.requestUpdate();
    }, 3e4), this._resizeObserver = new ResizeObserver(() => this._fitOverflowingText()), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), clearInterval(this._clockTimer), (e = this._resizeObserver) == null || e.disconnect(), this._digitalBackground.destroy(), this._analogBackground.destroy();
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
  // lecture de layout par élément, au pire toutes les 30s (tick
  // d'horloge) ou au redimensionnement — jamais par frame.
  _fitOverflowingText() {
    var r, c, h, u;
    const e = this.shadowRoot, t = e == null ? void 0 : e.querySelector(".card"), s = this._config;
    if (!t || !s) return;
    const a = s.language || ((c = (r = this._hass) == null ? void 0 : r.locale) == null ? void 0 : c.language) || "en", i = s.time_format || ((u = (h = this._hass) == null ? void 0 : h.locale) == null ? void 0 : u.time_format) || "24", o = t.getBoundingClientRect().width * 0.92, l = {
      ".clock": Y(Se, a, i),
      ".date": X(Se, a)
    };
    for (const [p, g] of Object.entries(l)) {
      const f = e.querySelector(p);
      if (!f) continue;
      const $ = f.cloneNode(!1);
      $.textContent = g, $.style.position = "absolute", $.style.visibility = "hidden", $.style.left = "-9999px", $.style.removeProperty("--_fit-scale"), f.parentNode.appendChild($);
      const y = $.scrollWidth;
      $.remove();
      const I = y > o ? o / y : 1;
      f.style.setProperty("--_fit-scale", I);
    }
  }
  set hass(e) {
    var o, l, r, c;
    const t = (l = this._hass) == null ? void 0 : l.states[(o = this._config) == null ? void 0 : o.satellite_entity], s = (c = this._hass) == null ? void 0 : c.states[(r = this._config) == null ? void 0 : r.weather_entity];
    if (this._hass = e, !this._config) return;
    const a = e.states[this._config.satellite_entity], i = e.states[this._config.weather_entity];
    (t !== a || s !== i) && this.requestUpdate();
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
  // satellite View Assist (mode: "night"), pas par l'heure — c'est
  // l'utilisateur (ou une automatisation côté HA) qui décide quand
  // l'écran doit s'assombrir, pas la carte.
  _isNightMode(e) {
    var t;
    return ((t = e == null ? void 0 : e.attributes) == null ? void 0 : t.mode) === "night";
  }
  _cardStyle(e, t) {
    const s = [];
    return e != null && s.push(`background:${e}`), this._config.zoom != null && this._config.zoom !== 1 && s.push(`zoom:${this._config.zoom}`), t && s.push(t), s.join(";");
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
    var ie, oe, ne;
    if (!this._config || !this._hass) return d;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, s = this._isNightMode(t);
    this.classList.toggle("night", s);
    const a = e.language || ((ie = this._hass.locale) == null ? void 0 : ie.language) || "en", i = e.time_format || ((oe = this._hass.locale) == null ? void 0 : oe.time_format) || "24", o = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, r = e.layout === "round", c = this._clockFace === "analog", h = {
      isNightMode: s,
      satelliteBackgroundUrl: (ne = t == null ? void 0 : t.attributes) == null ? void 0 : ne.background
    };
    this._digitalBackground.configure(this._hass, e.background, h), this._analogBackground.configure(this._hass, e.analog_background, h);
    const u = c && !r && !s && ["satellite", "url", "media_folder"].includes(e.analog_background.type), p = e.show_weather && !s && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, g = p && !c, f = e.show_date && !s, $ = c ? u ? this._analogBackground.cssValue : null : this._digitalBackground.cssValue, y = c ? u ? H[ye] : H[e.analog_style] || H[ye] : null, I = e.analog_background.type === "css" ? e.analog_background.value : y == null ? void 0 : y.background, Le = this._cardStyle(
      $,
      y && !u ? `--_analog-default-bg:${I}` : null
    );
    return c || (this._secondHandDelay = void 0), _`
      <div
        class="card ${r ? "round" : ""} ${c ? "analog" : ""}"
        style=${Le}
      >
        ${!c || u ? _`<div class="shader"></div>` : d}
        ${g ? this._renderWeather(l) : d}
        <div class="clockgroup">
          ${e.show_clock ? c ? _`
                  ${this._renderAnalogComplications(
      y,
      p ? l : null,
      f,
      o,
      a
    )}
                  ${this._renderAnalogClock(o, a, i, y)}
                ` : _`<div class="clock">${Y(o, a, i)}</div>` : d}
          ${f && !c ? _`<div class="date">${X(o, a)}</div>` : d}
        </div>
        ${s ? d : this._renderClockToggle(c)}
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
  _renderAnalogComplications(e, t, s, a, i) {
    if (!t && !s) return d;
    let o = d;
    if (t) {
      const l = $e(t.state, this._isDarkOutside()), r = ve(l, this._config.icons), c = Number(t.attributes.temperature).toFixed(1), h = t.attributes.temperature_unit || "°C";
      o = _`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${r}
            alt=""
            style="filter:${e.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${c}${h}</span>
        </div>
      `;
    }
    return _`
      <div
        class="analog-complications"
        style="color:${e.comp.color};opacity:${e.comp.opacity}"
      >
        ${o}
        ${s ? _`<div class="analog-date">${X(a, i)}</div>` : d}
      </div>
    `;
  }
  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size. Cinq habillages
  // possibles (cf. src/analog-styles.js, choisis via `analog_style`) :
  // mêmes primitives (graduations, chiffres, aiguilles), paramètres
  // différents — sauf "ardoise", seul style à aiguilles rectangulaires
  // plutôt que des traits (cf. _renderRectHands).
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
  _renderAnalogClock(e, t, s, a) {
    const i = e.getHours() % 12, o = e.getMinutes(), l = i * 30 + o * 0.5, r = o * 6, c = e.getSeconds() + e.getMilliseconds() / 1e3, h = c * 6;
    this._secondHandDelay === void 0 && (this._secondHandDelay = `-${c}s`);
    const u = a.shape === "rect" ? this._renderRectHands(a, l, r, h) : this._renderLineHands(a, l, r, h);
    return _`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${Y(e, t, s)}
      >
        ${a.glow ? this._renderGlowFilter() : d}
        ${this._renderTicks(a.ticks, a.glow)}
        ${this._renderNumerals(a.numerals)}
        ${u}
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
    return m`
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
  // Graduations : soit un trait fin proche du bord (style "aurore"
  // d'origine), soit un simple point (les 4 autres styles) — sur les 12
  // heures ("all"), les 8 non cardinales ("minor", pour laisser la place
  // aux chiffres) ou les 4 cardinales seulement ("cardinal").
  _renderTicks(e, t) {
    var i;
    if (!e) return d;
    const s = t ? "url(#echo-home-analog-glow)" : void 0, a = [];
    for (let o = 0; o < 12; o++) {
      const l = o % 3 === 0;
      if (e.mode === "minor" && l || e.mode === "cardinal" && !l || (i = e.skip) != null && i.includes(o)) continue;
      const r = o * 30;
      if (e.shape === "line")
        a.push(m`
          <line
            class="tick hand"
            x1="50"
            y1=${e.y1}
            x2="50"
            y2=${e.y2}
            stroke=${e.color}
            stroke-width=${e.width}
            opacity=${e.opacity}
            filter=${s != null ? s : d}
            transform="rotate(${r} 50 50)"
          />
        `);
      else {
        const c = this._polar(e.radius, r), h = l ? e.cardinalR : e.minorR, u = l ? e.cardinalOpacity : e.minorOpacity;
        a.push(m`
          <circle class="tick hand" cx=${c.x} cy=${c.y} r=${h} fill=${e.color} opacity=${u} filter=${s != null ? s : d} />
        `);
      }
    }
    return m`<g class="ticks">${a}</g>`;
  }
  // Chiffres : "quad" (12/3/6/9, style "aurore") ou "single" (12
  // seulement, style "ardoise"). Même rayon que les graduations à chaque
  // fois — les chiffres doivent être sur le même cercle qu'elles, pas
  // ramenés vers le centre, sinon ils paraissent "flotter" au milieu du
  // cadran au lieu de marquer l'heure à la même distance du bord
  // (corrigé en 1.1.4 pour "aurore", appliqué d'emblée ici aux autres).
  _renderNumerals(e) {
    if (!e) return d;
    const s = (e.mode === "single" ? [["12", 0]] : [["12", 0], ["3", 1], ["6", 2], ["9", 3]]).map(([a, i]) => {
      const o = this._polar(e.radius, i * 90);
      return m`
        <text
          class="numeral hand"
          x=${o.x}
          y=${o.y}
          font-size=${e.size}
          font-weight=${e.weight}
          opacity=${e.opacity}
          fill=${e.color}
          text-anchor="middle"
          dominant-baseline="central"
        >${a}</text>
      `;
    });
    return m`<g class="numerals">${s}</g>`;
  }
  // sin/cos plutôt que des positions écrites en dur pour chaque heure :
  // évite de se tromper de signe pour l'une d'elles (angle depuis midi,
  // sens horaire — x = sin, y = -cos).
  _polar(e, t) {
    const s = t * Math.PI / 180;
    return { x: 50 + e * Math.sin(s), y: 50 - e * Math.cos(s) };
  }
  // Aiguilles "classiques" (tous les styles sauf "ardoise") : un simple
  // trait par aiguille, couleur/épaisseur/forme de bout définies par le
  // style. La seconde peut avoir une petite queue derrière le pivot et un
  // point à la pointe (styles "mono"/"neon").
  _renderLineHands(e, t, s, a) {
    const i = e.glow ? "url(#echo-home-analog-glow)" : void 0, o = m`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - e.hour.len}
        stroke=${e.hour.color}
        stroke-width=${e.hour.width}
        stroke-linecap=${e.hour.cap}
        filter=${i != null ? i : d}
        transform="rotate(${t} 50 50)"
      />
    `, l = m`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - e.minute.len}
        stroke=${e.minute.color}
        stroke-width=${e.minute.width}
        stroke-linecap=${e.minute.cap}
        filter=${i != null ? i : d}
        transform="rotate(${s} 50 50)"
      />
    `, r = e.second, c = r.tipDot ? m`<circle class="hand" cx="50" cy=${50 - r.len} r=${r.tipDot.r} fill=${r.tipDot.fill} filter=${i != null ? i : d} />` : d, h = m`
      <g
        class="hand-second"
        style="animation-delay: ${this._secondHandDelay}; transform: rotate(${a}deg)"
      >
        <line
          class="hand"
          x1="50" y1=${50 + r.tail} x2="50" y2=${50 - r.len}
          stroke=${r.color}
          stroke-width=${r.width}
          stroke-linecap=${r.cap}
          opacity=${r.opacity}
          filter=${i != null ? i : d}
        />
        ${c}
      </g>
    `, u = e.center, p = u.ring ? m`
          <circle
            class="hand"
            cx="50" cy="50" r=${u.ring.r} fill="none"
            stroke=${u.ring.color} stroke-width=${u.ring.width}
          />
        ` : d;
    return m`
      ${o}${l}${h}
      ${p}
      <circle class="hand" cx="50" cy="50" r=${u.r} fill=${u.color} />
    `;
  }
  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(e, t, s, a) {
    const i = e.hour, o = e.minute, l = e.second, r = e.center;
    return m`
      <rect
        class="hand hand-hour"
        x=${50 - i.w / 2} y=${50 - i.len} width=${i.w} height=${i.len}
        fill=${i.color}
        transform="rotate(${t} 50 50)"
      />
      <rect
        class="hand hand-minute"
        x=${50 - o.w / 2} y=${50 - o.len} width=${o.w} height=${o.len}
        fill=${o.color}
        transform="rotate(${s} 50 50)"
      />
      <g
        class="hand-second"
        style="animation-delay: ${this._secondHandDelay}; transform: rotate(${a}deg)"
      >
        <rect class="hand" x=${50 - l.w / 2} y=${50 - l.len} width=${l.w} height=${l.len} fill=${l.color} />
        <rect class="hand" x=${50 - l.w / 2} y="50" width=${l.w} height=${l.tail} fill=${l.color} />
      </g>
      <rect
        class="hand"
        x=${50 - r.size / 2} y=${50 - r.size / 2} width=${r.size} height=${r.size}
        fill=${r.color}
        transform="rotate(45 50 50)"
      />
    `;
  }
  // Petit bouton discret (round et large, masqué la nuit comme le reste
  // — pas de lumière/info superflue sur un écran de chevet) pour
  // basculer digital ↔ analogique. L'icône affichée est celle du cadran
  // vers lequel on bascule (convention usuelle pour un bouton toggle),
  // pas celle du cadran actuel.
  _renderClockToggle(e) {
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", s = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return _`
      <button
        type="button"
        class="clock-toggle"
        aria-label=${s}
        title=${s}
        @click=${() => this._toggleClockFace()}
      >
        <ha-icon icon=${t}></ha-icon>
      </button>
    `;
  }
  _renderWeather(e) {
    const t = $e(e.state, this._isDarkOutside()), s = ve(t, this._config.icons), a = Number(e.attributes.temperature).toFixed(1), i = e.attributes.temperature_unit || "°C", o = dt(this._hass, e.state), l = this._weatherClickable();
    return _`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : d}
        tabindex=${l ? "0" : d}
        aria-label="${o}, ${a}${i}"
        @click=${l ? () => this._navigateToWeather() : d}
        @keydown=${l ? (r) => this._onWeatherKeydown(r) : d}
      >
        <img class="weather-icon" src=${s} alt="" />
        <span class="weather-temp">${a}${i}</span>
      </div>
    `;
  }
}
V(ee, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), V(ee, "styles", Ve`
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
      /* Sensiblement plus petite que --_date-size (pensée pour le mode
         digital, sous l'horloge géante) : à côté de la météo plutôt que
         sous une horloge, --_date-size la ferait presque aussi grosse
         que la température elle-même (--_weather-temp-size, quasi le
         même facteur vh) — pas ce qu'on veut d'une info secondaire. */
      --_analog-landscape-date-size: clamp(1.1rem, 8vh, 3rem);
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

    /* La nuit, même en analogique, on retombe sur le traitement nuit
       habituel (fond quasi noir) plutôt que le style choisi — l'objectif
       du mode nuit (peu de lumière émise sur un écran de chevet) prime
       sur l'esthétique. */
    :host(.night) .card.analog {
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

    /* Couleurs et épaisseurs propres à chaque style (mono/aurore/clair/
       neon/ardoise) posées directement en attributs SVG par
       _renderLineHands/_renderRectHands/_renderTicks/_renderNumerals,
       pas ici : contrairement à la version à un seul style (< 1.2.0), il
       n'y a plus de couleur "currentColor" commune à surcharger. La
       nuit, .hand regroupe toutes les aiguilles/graduations/chiffres
       (cf. classes posées dans le JS) et retombe uniformément sur le
       rouge très atténué habituel, quel que soit le style de jour. */
    :host(.night) .analog-clock {
      opacity: var(--_night-opacity);
    }

    :host(.night) .analog-clock .hand {
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
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--_text-color);
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.2s ease;
      --mdc-icon-size: 20px;
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
      /* Sensiblement plus petites que --_weather-icon-size/--_weather-
         temp-size/--_date-size ci-dessus : une complication doit rester
         discrète à côté d'aiguilles qui occupent tout l'écran, pas
         reproduire le poids visuel du bloc météo/date du mode digital. */
      --_analog-weather-icon-size: clamp(14px, 5vmin, 30px);
      --_analog-weather-temp-size: clamp(0.65rem, 4.6vmin, 1.15rem);
      --_analog-date-size: clamp(0.6rem, 4vmin, 1rem);
    }
  `);
customElements.define(je, ee);
window.customCards = window.customCards || [];
window.customCards.push({
  type: je,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
