var xt = Object.defineProperty;
var wt = (n, t, e) => t in n ? xt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var F = (n, t, e) => wt(n, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, J = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (n) => new ft(typeof n == "string" ? n : n + "", void 0, Q), kt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new ft(e, n, Q);
}, Et = (n, t) => {
  if (J) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = O.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, Y = J ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return At(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St, defineProperty: Ct, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: Tt, getOwnPropertySymbols: Ut, getPrototypeOf: zt } = Object, $ = globalThis, j = $.trustedTypes, Rt = j ? j.emptyScript : "", I = $.reactiveElementPolyfillSupport, P = (n, t) => n, G = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Rt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, mt = (n, t) => !St(n, t), tt = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: mt };
var ct, ht;
(ct = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (ht = $.litPropertyMetadata) != null || ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ct(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    var r;
    const { get: s, set: o } = (r = Pt(this.prototype, t)) != null ? r : { get() {
      return this[e];
    }, set(l) {
      this[e] = l;
    } };
    return { get: s, set(l) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, l), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Tt(e), ...Ut(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Y(s));
    } else t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return Et(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : G).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r, l;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : G;
      this._$Em = s;
      const p = d.fromAttribute(e, a.type);
      this[s] = (l = p != null ? p : (r = this._$Ej) == null ? void 0 : r.get(s)) != null ? l : p, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    var r, l;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), i != null || (i = a.getPropertyOptions(t)), !(((r = i.hasChanged) != null ? r : mt)(o, e) || i.useDefault && i.reflect && o === ((l = this._$Ej) == null ? void 0 : l.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    var l, a, d;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = r != null ? r : e) != null ? a : this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && ((d = this._$Eq) != null ? d : this._$Eq = /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i, s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, l] of this._$Ep) this[r] = l;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, l] of o) {
        const { wrapped: a } = l, d = this[r];
        a !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, l, d);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
var dt;
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[P("elementProperties")] = /* @__PURE__ */ new Map(), k[P("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: k }), ((dt = $.reactiveElementVersions) != null ? dt : $.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, et = (n) => n, V = T.trustedTypes, it = V ? V.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, gt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + v, Nt = `<${vt}>`, A = document, z = () => A.createComment(""), R = (n) => n === null || typeof n != "object" && typeof n != "function", X = Array.isArray, Mt = (n) => X(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", q = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, rt = />/g, y = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, nt = /"/g, $t = /^(?:script|style|textarea|title)$/i, Ht = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), h = Ht(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), x = A.createTreeWalker(A, 129);
function yt(n, t) {
  if (!X(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Lt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = C;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let d, p, u = -1, _ = 0;
    for (; _ < a.length && (r.lastIndex = _, p = r.exec(a), p !== null); ) _ = r.lastIndex, r === C ? p[1] === "!--" ? r = st : p[1] !== void 0 ? r = rt : p[2] !== void 0 ? ($t.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = y) : p[3] !== void 0 && (r = y) : r === y ? p[0] === ">" ? (r = s != null ? s : C, u = -1) : p[1] === void 0 ? u = -2 : (u = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? y : p[3] === '"' ? nt : ot) : r === nt || r === ot ? r = y : r === st || r === rt ? r = C : (r = y, s = void 0);
    const f = r === y && n[l + 1].startsWith("/>") ? " " : "";
    o += r === C ? a + Nt : u >= 0 ? (i.push(d), a.slice(0, u) + gt + a.slice(u) + v + f) : a + v + (u === -2 ? l : f);
  }
  return [yt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [d, p] = Lt(t, e);
    if (this.el = N.createElement(d, i), x.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = x.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(gt)) {
          const _ = p[r++], f = s.getAttribute(u).split(v), m = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: m[2], strings: f, ctor: m[1] === "." ? Vt : m[1] === "?" ? Dt : m[1] === "@" ? Ft : D }), s.removeAttribute(u);
        } else u.startsWith(v) && (a.push({ type: 6, index: o }), s.removeAttribute(u));
        if ($t.test(s.tagName)) {
          const u = s.textContent.split(v), _ = u.length - 1;
          if (_ > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let f = 0; f < _; f++) s.append(u[f], z()), x.nextNode(), a.push({ type: 2, index: ++o });
            s.append(u[_], z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === vt) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(v, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var r, l, a;
  if (t === E) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = R(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[i] = s : e._$Cl = s), s !== void 0 && (t = S(n, s._$AS(n, t.values), s, i)), t;
}
class Ot {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var d;
    const { el: { content: e }, parts: i } = this._$AD, s = ((d = t == null ? void 0 : t.creationScope) != null ? d : A).importNode(e, !0);
    x.currentNode = s;
    let o = x.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let p;
        a.type === 2 ? p = new M(o, o.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (p = new It(o, this, t)), this._$AV.push(p), a = i[++l];
      }
      r !== (a == null ? void 0 : a.index) && (o = x.nextNode(), r++);
    }
    return x.currentNode = A, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, i, s) {
    var o;
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (o = s == null ? void 0 : s.isConnected) != null ? o : !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), R(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(yt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const r = new Ot(s, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new M(this.O(z()), this.O(z()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = et(t).nextSibling;
      et(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = S(this, t, e, 0), r = !R(t) || t !== this._$AH && t !== E, r && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = S(this, l[i + a], e, a), d === E && (d = this._$AH[a]), r || (r = !R(d) || d !== this._$AH[a]), d === c ? t = c : t !== c && (t += (d != null ? d : "") + o[a + 1]), this._$AH[a] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Vt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Dt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ft extends D {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = S(this, t, e, 0)) != null ? r : c) === E) return;
    const i = this._$AH, s = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== c && (i === c || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) == null ? void 0 : e.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class It {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const B = T.litHtmlPolyfillSupport;
var pt;
B == null || B(N, M), ((pt = T.litHtmlVersions) != null ? pt : T.litHtmlVersions = []).push("3.3.3");
const qt = (n, t, e) => {
  var o, r;
  const i = (o = e == null ? void 0 : e.renderBefore) != null ? o : t;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (r = e == null ? void 0 : e.renderBefore) != null ? r : null;
    i._$litPart$ = s = new M(t.insertBefore(z(), l), l, void 0, e != null ? e : {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class U extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, i;
    const t = super.createRenderRoot();
    return (i = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var ut;
U._$litElement$ = !0, U.finalized = !0, (ut = w.litElementHydrateSupport) == null || ut.call(w, { LitElement: U });
const K = w.litElementPolyfillSupport;
K == null || K({ LitElement: U });
var _t;
((_t = w.litElementVersions) != null ? _t : w.litElementVersions = []).push("4.2.2");
const bt = "echo-player-card", g = {
  SEEK: 2,
  VOLUME_SET: 4,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  SHUFFLE_SET: 32768,
  REPEAT_SET: 262144,
  GROUPING: 524288
}, b = {
  // --- Entités (seule media_player_entity a un sens sans elle — la
  // carte affiche alors un état "aucune lecture" plutôt que de planter) ---
  media_player_entity: null,
  satellite_entity: null,
  // entité View Assist du satellite — lit
  // attributes.mode ("night" => mode nuit, cf. echo-home-card) ; pas de
  // fond dynamique ici (contrairement à echo-home-card), la pochette du
  // morceau en cours en tient déjà lieu.
  // --- Navigation (fiche d'attente uniquement — pas d'attribut HA
  // générique pour une file de lecture, contrairement à source_list/
  // group_members qui sont standard : cf. README) ---
  dashboard: null,
  // base du chemin de dashboard, ex: "dashboard-view-assist"
  // — tant que non renseigné, la puce "File d'attente" ne s'affiche pas
  queue_view: "player-queue",
  // ajouté à `dashboard` -> "${dashboard}/${queue_view}"
  navigate_device: null,
  // id passé en `device` au service view_assist.navigate
  // — sinon satellite_entity
  // --- Regroupement multi-pièces (media_player.join/unjoin) ---
  // Liste explicite des autres media_player proposés au regroupement —
  // HA n'expose aucun moyen générique de découvrir "les enceintes
  // regroupables avec celle-ci", donc pas d'auto-détection possible.
  // Sans cette liste, la puce "Groupe" reste masquée même si
  // l'intégration supporte le regroupement (FEATURE.GROUPING).
  group_entities: [],
  // --- Éléments affichés (masquables même si l'intégration les
  // supporte — show_* ne les fait jamais apparaître si le bit
  // FEATURE correspondant est absent) ---
  show_shuffle: !0,
  show_repeat: !0,
  show_volume: !0,
  show_source: !0,
  show_group: !0,
  show_queue: !0,
  show_clock: !0,
  // petite heure en coin (mise en page large uniquement)
  // --- Localisation ---
  language: null,
  // ex: "fr" — sinon hérite de hass.locale
  time_format: null,
  // "12" ou "24" — sinon hérite de hass.locale
  // --- Mise en page ---
  layout: null,
  // null (large, Echo Show) ou "round" (Echo Spot, écran
  // circulaire) — cf. echo-home-card, même convention
  // --- Apparence ---
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
};
function L(n) {
  if (n == null || !Number.isFinite(n) || n < 0)
    return "–:––";
  const t = Math.floor(n), e = Math.floor(t / 3600), i = Math.floor(t % 3600 / 60), s = t % 60, o = (r) => String(r).padStart(2, "0");
  return e > 0 ? `${e}:${o(i)}:${o(s)}` : `${i}:${o(s)}`;
}
function Bt(n, t, e) {
  const i = e === "12";
  try {
    return new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit",
      hour12: i
    }).format(n);
  } catch {
    return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", hour12: i }).format(
      n
    );
  }
}
function lt(n) {
  const t = (n == null ? void 0 : n.attributes) || {};
  if (t.media_position == null) return null;
  let e = t.media_position;
  if (n.state === "playing" && t.media_position_updated_at) {
    const i = new Date(t.media_position_updated_at).getTime();
    Number.isNaN(i) || (e += Math.max(0, (Date.now() - i) / 1e3));
  }
  return t.media_duration != null && (e = Math.min(e, t.media_duration)), Math.max(0, e);
}
const Kt = 2048;
class W extends U {
  constructor() {
    super(), this._artFailedUrl = null, this._sourcesOpen = !1, this._groupOpen = !1;
  }
  // Aucune entité n'est requise pour que setConfig réussisse — sans
  // media_player_entity, la carte affiche juste un état "aucun lecteur
  // configuré" (cf. _renderEmpty) plutôt que de planter, comme le reste
  // de la suite. Elle n'est pas pour autant "utile à vide" comme
  // echo-home-card (une horloge a un sens sans rien configurer, un
  // lecteur média non plus) — la différence est assumée, pas un oubli.
  setConfig(t) {
    const e = { ...b, ...t };
    this._config = this._validateConfig(e, t || {});
  }
  _validateConfig(t, e) {
    const i = (s, o) => console.warn(
      `[echo-player-card] "${s}" invalide (${JSON.stringify(e[s])}), valeur par défaut utilisée (${JSON.stringify(o)})`
    );
    return t.layout !== null && t.layout !== "round" && (i("layout", b.layout), t.layout = b.layout), (typeof t.zoom != "number" || !Number.isFinite(t.zoom) || t.zoom <= 0) && (i("zoom", b.zoom), t.zoom = b.zoom), Array.isArray(t.group_entities) || (i("group_entities", b.group_entities), t.group_entities = b.group_entities), t.dashboard && !t.navigate_device && !t.satellite_entity && console.warn(
      `[echo-player-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — la puce "File d'attente" ne sera pas cliquable.`
    ), t.media_player_entity || console.warn(
      `[echo-player-card] "media_player_entity" n'est pas configuré — la carte affichera un état "aucun lecteur configuré".`
    ), t;
  }
  static getStubConfig(t) {
    const e = Object.keys(t.states).find(
      (i) => i.startsWith("media_player.")
    );
    return e ? { media_player_entity: e } : {};
  }
  getCardSize() {
    return 6;
  }
  connectedCallback() {
    super.connectedCallback(), this._positionTimer = setInterval(() => {
      var t;
      ((t = this._stateObj()) == null ? void 0 : t.state) === "playing" && this.requestUpdate();
    }, 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._positionTimer);
  }
  _stateObj() {
    var t, e;
    return (t = this._config) != null && t.media_player_entity ? (e = this._hass) == null ? void 0 : e.states[this._config.media_player_entity] : void 0;
  }
  set hass(t) {
    var p, u, _, f;
    const e = this._config, i = (p = this._hass) == null ? void 0 : p.states[e == null ? void 0 : e.media_player_entity], s = (u = this._hass) == null ? void 0 : u.states[e == null ? void 0 : e.satellite_entity], o = (_ = e == null ? void 0 : e.group_entities) == null ? void 0 : _.map((m) => {
      var H;
      return (H = this._hass) == null ? void 0 : H.states[m];
    });
    if (this._hass = t, !e) return;
    const r = t.states[e.media_player_entity], l = t.states[e.satellite_entity], a = (f = e.group_entities) == null ? void 0 : f.map((m) => t.states[m]), d = (o == null ? void 0 : o.length) !== (a == null ? void 0 : a.length) || (a == null ? void 0 : a.some((m, H) => m !== o[H]));
    (i !== r || s !== l || d) && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _isNightMode(t) {
    var e;
    return ((e = t == null ? void 0 : t.attributes) == null ? void 0 : e.mode) === "night";
  }
  _supports(t, e) {
    return ((t.attributes.supported_features || 0) & e) === e;
  }
  // Une pochette est "disponible" tant que l'URL fournie n'est pas celle
  // qui a déjà échoué au chargement (cf. _onArtError) — une nouvelle URL
  // (changement de morceau) retente toujours, même si la précédente
  // avait échoué.
  _hasArt(t) {
    const e = t.attributes.entity_picture;
    return !!e && e !== this._artFailedUrl;
  }
  _onArtError(t) {
    this._artFailedUrl = t;
  }
  _call(t, e, i, s) {
    this._hass.callService(t, e, { entity_id: i, ...s || {} });
  }
  _playPause(t) {
    this._call("media_player", "media_play_pause", t.entity_id);
  }
  _prev(t) {
    this._call("media_player", "media_previous_track", t.entity_id);
  }
  _next(t) {
    this._call("media_player", "media_next_track", t.entity_id);
  }
  _toggleShuffle(t) {
    this._call("media_player", "shuffle_set", t.entity_id, {
      shuffle: !t.attributes.shuffle
    });
  }
  _cycleRepeat(t) {
    const e = { off: "all", all: "one", one: "off" }[t.attributes.repeat || "off"];
    this._call("media_player", "repeat_set", t.entity_id, { repeat: e || "off" });
  }
  _setVolume(t, e) {
    this._call("media_player", "volume_set", t.entity_id, {
      volume_level: Number(e.target.value)
    });
  }
  _seek(t, e) {
    this._call("media_player", "media_seek", t.entity_id, {
      seek_position: Number(e.target.value)
    });
  }
  _selectSource(t, e) {
    this._call("media_player", "select_source", t.entity_id, { source: e }), this._sourcesOpen = !1;
  }
  // "join" cible le lecteur principal (data.group_members = la liste
  // complète souhaitée) ; "unjoin" cible directement le membre qui doit
  // quitter le groupe — deux services HA génériques, pas symétriques en
  // paramètres (cf. doc media_player).
  _toggleGroupMember(t, e, i) {
    if (i)
      this._call("media_player", "unjoin", e);
    else {
      const s = t.attributes.group_members || [];
      this._call("media_player", "join", t.entity_id, {
        group_members: [.../* @__PURE__ */ new Set([...s, e])]
      });
    }
  }
  _navigateToQueue() {
    const t = this._config, e = t.navigate_device || t.satellite_entity, i = `${t.dashboard}/${t.queue_view}`;
    this._hass.callService("view_assist", "navigate", { device: e, path: i });
  }
  _cardStyle() {
    return this._config.zoom != null && this._config.zoom !== 1 ? `zoom:${this._config.zoom}` : "";
  }
  render() {
    if (!this._config || !this._hass) return c;
    const t = this._config, e = t.layout === "round", i = t.satellite_entity ? this._hass.states[t.satellite_entity] : void 0, s = this._isNightMode(i);
    this.classList.toggle("night", s);
    const o = this._stateObj(), r = `card ${e ? "round" : ""}`;
    if (!o || ["unavailable", "unknown"].includes(o.state))
      return h`
        <div class=${r} style=${this._cardStyle()}>
          ${e ? this._renderRoundEmpty() : this._renderLandscapeEmpty()}
        </div>
      `;
    const l = o.state === "playing";
    return h`
      <div class=${r} style=${this._cardStyle()}>
        ${e ? this._renderRound(o, l) : this._renderLandscape(o, l)}
      </div>
    `;
  }
  // -------------------- Round (Echo Spot) --------------------
  _renderRound(t, e) {
    const i = t.attributes, s = this._hasArt(t), o = i.media_duration, r = lt(t), l = o ? Math.min(1, (r || 0) / o) : 0;
    return h`
      <div class="art-layer ${s ? "" : "no-art"}">
        ${s ? h`<img
              class="art-img"
              src=${i.entity_picture}
              alt=""
              @error=${() => this._onArtError(i.entity_picture)}
            />` : this._renderVinyl(e)}
      </div>
      ${s ? h`<div class="scrim"></div>` : c}
      <svg class="ring" viewBox="0 0 100 100">
        <circle class="track" cx="50" cy="50" r="48" pathLength="100"></circle>
        <circle
          class="fill"
          cx="50"
          cy="50"
          r="48"
          pathLength="100"
          style="stroke-dasharray:${(l * 100).toFixed(2)} 100"
        ></circle>
      </svg>
      <div class="content">
        ${o != null ? h`<span class="time">${L(r)} / ${L(o)}</span>` : c}
        <div class="track-title">${i.media_title || "—"}</div>
        ${i.media_artist ? h`<div class="track-artist">${i.media_artist}</div>` : c}
        ${this._renderTransportCompact(t, e)}
      </div>
    `;
  }
  _renderRoundEmpty() {
    return h`
      <div class="art-layer no-art">${this._renderVinyl(!1)}</div>
      <div class="content">
        <div class="track-title empty">
          ${this._config.media_player_entity ? "Aucune lecture" : "Aucun lecteur configuré"}
        </div>
      </div>
    `;
  }
  _renderTransportCompact(t, e) {
    const i = this._supports(t, g.PREVIOUS_TRACK), s = this._supports(t, g.NEXT_TRACK);
    return h`
      <div class="transport">
        ${i ? h`<button class="ctrl small" aria-label="Précédent" @click=${() => this._prev(t)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : c}
        <button
          class="ctrl play"
          aria-label=${e ? "Pause" : "Lecture"}
          @click=${() => this._playPause(t)}
        >
          <ha-icon icon=${e ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${s ? h`<button class="ctrl small" aria-label="Suivant" @click=${() => this._next(t)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : c}
      </div>
    `;
  }
  // -------------------- Large (Echo Show) --------------------
  _renderLandscape(t, e) {
    var f, m;
    const i = this._config, s = t.attributes, o = this._hasArt(t), r = s.media_duration, l = lt(t), a = r ? Math.min(1, (l || 0) / r) : 0, d = i.language || ((f = this._hass.locale) == null ? void 0 : f.language) || "en", p = i.time_format || ((m = this._hass.locale) == null ? void 0 : m.time_format) || "24", u = s.source || s.app_name, _ = [s.media_artist, s.media_album_name].filter(Boolean).join(" — ");
    return h`
      <div class="art-col ${o ? "with-art" : "no-art"}">
        ${o ? h`<img
              class="art-img"
              src=${s.entity_picture}
              alt=""
              @error=${() => this._onArtError(s.entity_picture)}
            />` : this._renderVinyl(e)}
      </div>
      <div class="info-col">
        <div class="top-row">
          <div class="device-name">
            <ha-icon icon="mdi:speaker"></ha-icon>
            <span>${s.friendly_name || ""}</span>
          </div>
          ${i.show_clock ? h`<span class="clock">${Bt(/* @__PURE__ */ new Date(), d, p)}</span>` : c}
        </div>
        <div class="title-block">
          ${u ? h`<span class="eyebrow-src">${u}</span>` : c}
          <h3 class="track-title-lg">${s.media_title || "—"}</h3>
          ${_ ? h`<span class="track-meta">${_}</span>` : c}
        </div>
        ${r != null ? this._renderProgress(t, l, r, a) : c}
        ${this._renderTransportFull(t, e)}
        ${i.show_volume && this._supports(t, g.VOLUME_SET) ? this._renderVolume(t) : c}
        ${this._renderChips(t)}
      </div>
    `;
  }
  _renderLandscapeEmpty() {
    return h`
      <div class="art-col no-art">${this._renderVinyl(!1)}</div>
      <div class="info-col">
        <div class="title-block">
          <h3 class="track-title-lg empty">
            ${this._config.media_player_entity ? "Aucune lecture" : "Aucun lecteur configuré"}
          </h3>
        </div>
      </div>
    `;
  }
  _renderProgress(t, e, i, s) {
    const o = this._supports(t, g.SEEK);
    return h`
      <div class="progress-row">
        <time>${L(e)}</time>
        <div class="bar">
          <div class="fill" style="width:${(s * 100).toFixed(2)}%"></div>
          ${o ? h`<input
                type="range"
                class="range-overlay"
                min="0"
                max=${i}
                step="1"
                .value=${String(e != null ? e : 0)}
                aria-label="Position de lecture"
                @change=${(r) => this._seek(t, r)}
              />` : c}
        </div>
        <time>${L(i)}</time>
      </div>
    `;
  }
  _renderTransportFull(t, e) {
    const i = this._config, s = t.attributes, o = this._supports(t, g.PREVIOUS_TRACK), r = this._supports(t, g.NEXT_TRACK), l = i.show_shuffle && this._supports(t, g.SHUFFLE_SET) && s.shuffle !== void 0, a = i.show_repeat && this._supports(t, g.REPEAT_SET) && s.repeat !== void 0;
    return h`
      <div class="transport-lg">
        ${l ? h`<button
              class="ctrl ghost-sm ${s.shuffle ? "active" : ""}"
              aria-label="Lecture aléatoire"
              aria-pressed=${s.shuffle ? "true" : "false"}
              @click=${() => this._toggleShuffle(t)}
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>` : c}
        ${o ? h`<button class="ctrl mid" aria-label="Précédent" @click=${() => this._prev(t)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : c}
        <button
          class="ctrl play-lg"
          aria-label=${e ? "Pause" : "Lecture"}
          @click=${() => this._playPause(t)}
        >
          <ha-icon icon=${e ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${r ? h`<button class="ctrl mid" aria-label="Suivant" @click=${() => this._next(t)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : c}
        ${a ? h`<button
              class="ctrl ghost-sm ${s.repeat && s.repeat !== "off" ? "active" : ""}"
              aria-label="Répéter"
              aria-pressed=${s.repeat && s.repeat !== "off" ? "true" : "false"}
              @click=${() => this._cycleRepeat(t)}
            >
              <ha-icon icon=${s.repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}></ha-icon>
            </button>` : c}
      </div>
    `;
  }
  _renderVolume(t) {
    var o;
    const e = t.attributes, i = (o = e.volume_level) != null ? o : 0, s = e.is_volume_muted || i === 0 ? "mdi:volume-off" : i < 0.5 ? "mdi:volume-medium" : "mdi:volume-high";
    return h`
      <div class="volume-row">
        <ha-icon icon=${s}></ha-icon>
        <div class="bar">
          <div class="fill" style="width:${(i * 100).toFixed(0)}%"></div>
          <input
            type="range"
            class="range-overlay"
            min="0"
            max="1"
            step="0.01"
            .value=${String(i)}
            aria-label="Volume"
            @input=${(r) => this._setVolume(t, r)}
          />
        </div>
        <span class="pct">${Math.round(i * 100)}%</span>
      </div>
    `;
  }
  // Trois accès secondaires — pas d'attribut HA générique pour une file
  // de lecture (contrairement à source_list/group_members, standard),
  // donc "File d'attente" navigue vers une vue dédiée plutôt que
  // d'essayer de deviner une UI par intégration (cf. const.js). Sources
  // et Groupe, eux, sont pilotables directement (services HA génériques)
  // et s'ouvrent en popover sur place.
  _renderChips(t) {
    var d;
    const e = this._config, i = t.attributes, s = [];
    if (e.show_source && this._supports(t, Kt) && ((d = i.source_list) == null ? void 0 : d.length) && s.push(h`
        <button
          class="chip"
          aria-expanded=${this._sourcesOpen ? "true" : "false"}
          @click=${() => {
      this._sourcesOpen = !this._sourcesOpen, this._groupOpen = !1;
    }}
        >
          <ha-icon icon="mdi:cast"></ha-icon>Sources
        </button>
      `), e.show_group && this._supports(t, g.GROUPING) && e.group_entities.length && s.push(h`
        <button
          class="chip"
          aria-expanded=${this._groupOpen ? "true" : "false"}
          @click=${() => {
      this._groupOpen = !this._groupOpen, this._sourcesOpen = !1;
    }}
        >
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>Groupe
        </button>
      `), e.show_queue && e.dashboard && (e.navigate_device || e.satellite_entity) && s.push(h`
        <button class="chip" @click=${() => this._navigateToQueue()}>
          <ha-icon icon="mdi:playlist-music"></ha-icon>File d'attente
        </button>
      `), !s.length) return c;
    const a = this._sourcesOpen || this._groupOpen;
    return h`
      <div class="chip-row">${s}</div>
      ${a ? h`<div
            class="popover-backdrop"
            @click=${() => {
      this._sourcesOpen = !1, this._groupOpen = !1;
    }}
          ></div>` : c}
      ${this._sourcesOpen ? this._renderSourcesPopover(t) : c}
      ${this._groupOpen ? this._renderGroupPopover(t) : c}
    `;
  }
  _renderSourcesPopover(t) {
    const e = t.attributes;
    return h`
      <div class="popover" role="listbox" @click=${(i) => i.stopPropagation()}>
        ${e.source_list.map(
      (i) => h`
            <button
              class="popover-item ${i === e.source ? "current" : ""}"
              role="option"
              aria-selected=${i === e.source ? "true" : "false"}
              @click=${() => this._selectSource(t, i)}
            >
              ${i === e.source ? h`<ha-icon icon="mdi:check"></ha-icon>` : c}
              <span>${i}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  _renderGroupPopover(t) {
    const e = t.attributes.group_members || [];
    return h`
      <div class="popover" @click=${(i) => i.stopPropagation()}>
        ${this._config.group_entities.map((i) => {
      var l;
      const s = this._hass.states[i], o = ((l = s == null ? void 0 : s.attributes) == null ? void 0 : l.friendly_name) || i, r = e.includes(i);
      return h`
            <button
              class="popover-item ${r ? "current" : ""}"
              aria-pressed=${r ? "true" : "false"}
              @click=${() => this._toggleGroupMember(t, i, r)}
            >
              <ha-icon icon=${r ? "mdi:speaker-multiple" : "mdi:speaker-off"}></ha-icon>
              <span>${o}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  // -------------------- Pochette / vinyle --------------------
  // Repli commun round + large : disque tournant pendant la lecture
  // (animation-play-state plutôt que ajouter/retirer l'animation, pour
  // reprendre la rotation là où elle s'est arrêtée à la reprise, comme
  // un vrai vinyle) — label neutre crème/tan, pas de couleur "extraite"
  // d'une pochette qui n'existe pas ici (cf. README).
  _renderVinyl(t) {
    return h`
      <div class="vinyl-wrap ${t ? "spinning" : ""}">
        <div class="vinyl"></div>
        <div class="label"></div>
      </div>
      <div class="tonearm"></div>
    `;
  }
}
F(W, "properties", {
  _config: { state: !0 },
  _artFailedUrl: { state: !0 },
  // dernière entity_picture qui a fait
  // échouer le <img> (404, réseau...) — bascule sur le vinyle tant que
  // l'intégration ne fournit pas une URL différente (cf. _hasArt)
  _sourcesOpen: { state: !0 },
  _groupOpen: { state: !0 }
}), F(W, "styles", kt`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      --_accent: var(--echo-player-accent, #ffd9a8);
      --_text-color: var(--echo-player-text-color, #ffffff);
      --_text-dim: var(--echo-player-text-dim-color, rgba(255, 255, 255, 0.7));
      --_radius: var(--echo-player-radius, 0px);
      --_night-color: var(--echo-player-night-color, red);
      --_night-opacity: var(--echo-player-night-opacity, 0.55);
      font-family: var(--echo-player-font-family, var(--primary-font-family, inherit));
      color: var(--_text-color);
    }

    :host(.night) {
      --_accent: var(--_night-color);
    }

    .card {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: var(--_radius);
      background: #000;
      display: flex;
    }

    .card.round {
      border-radius: 50%;
      display: block;
    }

    .card:not(.round) {
      container-type: inline-size;
    }

    /* Mode nuit : chrome assombri/désaturé plutôt que masqué — à la
       différence d'echo-home-card (météo/date), on veut pouvoir couper
       un son de nuit sans rallumer l'écran à pleine luminosité, les
       contrôles restent donc utilisables. */
    :host(.night) .art-img,
    :host(.night) .art-col.with-art::after,
    :host(.night) .vinyl,
    :host(.night) .label {
      filter: grayscale(0.5) brightness(0.4);
    }
    :host(.night) .track-title,
    :host(.night) .track-title-lg,
    :host(.night) .track-artist,
    :host(.night) .track-meta,
    :host(.night) .time,
    :host(.night) time {
      opacity: var(--_night-opacity);
    }

    .icon,
    ha-icon {
      display: block;
    }

    .ctrl {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
      padding: 0;
      transition: transform 0.15s ease, background 0.15s ease, opacity 0.15s ease;
    }
    .ctrl:hover {
      background: rgba(255, 255, 255, 0.14);
      transform: scale(1.06);
    }
    .ctrl:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
    .ctrl:active {
      transform: scale(0.96);
    }

    time,
    .time {
      font-variant-numeric: tabular-nums;
    }

    /* -------------------- Vinyle (repli commun) -------------------- */
    .vinyl-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      aspect-ratio: 1;
      animation: spin-vinyl 7s linear infinite;
      animation-play-state: paused;
    }
    .vinyl-wrap.spinning {
      animation-play-state: running;
    }
    @media (prefers-reduced-motion: reduce) {
      .vinyl-wrap {
        animation-play-state: paused !important;
      }
    }
    @keyframes spin-vinyl {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    .vinyl {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        repeating-radial-gradient(circle, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 6px),
        radial-gradient(circle at 35% 30%, #2c2c31 0%, #1a1a1e 42%, #0a0a0c 75%, #000 100%);
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
    }
    .label {
      position: absolute;
      inset: 32%;
      border-radius: 50%;
      background: radial-gradient(circle at 38% 32%, #f0e2c2 0%, #d8bd8a 60%, #c2a068 100%);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35), inset 0 0 0 5px rgba(0, 0, 0, 0.08);
    }
    .label::after {
      content: "";
      position: absolute;
      inset: 46%;
      border-radius: 50%;
      background: #14100c;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    }
    .tonearm {
      position: absolute;
      top: 4%;
      right: 8%;
      width: 6%;
      height: 36%;
      transform-origin: top center;
      transform: rotate(24deg);
      z-index: 2;
    }
    .tonearm::before {
      content: "";
      position: absolute;
      inset: 0;
      margin: 0 auto;
      width: 26%;
      height: 100%;
      left: 37%;
      background: linear-gradient(#d9dbe3, #9a9ea8);
      border-radius: 3px;
    }
    .tonearm::after {
      content: "";
      position: absolute;
      top: -10%;
      left: 50%;
      width: 13px;
      height: 13px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: #c8cad2;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    /* ==================== Round (Echo Spot) ==================== */
    .card.round {
      background: radial-gradient(130% 140% at 18% -10%, #24406a 0%, #14233c 45%, #0a1424 100%);
    }
    .card.round .art-layer {
      position: absolute;
      inset: 0;
    }
    .card.round .art-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card.round .scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 30%, transparent 58%);
    }
    .card.round .ring {
      position: absolute;
      inset: 0;
      z-index: 1;
    }
    .card.round .ring circle {
      fill: none;
    }
    .card.round .ring .track {
      stroke: rgba(255, 255, 255, 0.16);
      stroke-width: 2.2;
    }
    .card.round .ring .fill {
      stroke: var(--_accent);
      stroke-width: 2.2;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transition: stroke-dasharray 1s linear;
    }
    .card.round .content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 11%;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 0 17%;
      text-align: center;
    }
    .card.round .time {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: 2px;
    }
    .card.round .track-title {
      font-weight: 600;
      font-size: clamp(0.95rem, 4.6vw, 1.15rem);
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .card.round .track-title.empty {
      color: var(--_text-dim);
      font-weight: 500;
    }
    .card.round .track-artist {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.72);
    }
    .card.round .transport {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 6px;
    }
    .card.round .ctrl.small {
      width: 30px;
      height: 30px;
      font-size: 15px;
    }
    .card.round .ctrl.play {
      width: 46px;
      height: 46px;
      font-size: 22px;
      background: #fff;
      color: #14100c;
      border: none;
    }
    .card.round .ctrl.play:hover {
      background: #ffe9d2;
    }
    .card.round .ctrl.small ha-icon,
    .card.round .ctrl.play ha-icon {
      --mdc-icon-size: 1.1em;
    }

    /* ==================== Large (Echo Show) ==================== */
    .card:not(.round) {
      flex-direction: row;
    }
    .art-col {
      position: relative;
      height: 100%;
      aspect-ratio: 1;
      flex-shrink: 0;
      overflow: hidden;
    }
    .art-col.with-art {
      background: #000;
    }
    .art-col .art-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .art-col.with-art::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, transparent 55%, rgba(10, 12, 18, 0.55) 100%);
    }
    .art-col.no-art {
      background: radial-gradient(150% 150% at 20% -10%, #24406a 0%, #14233c 45%, #0a1424 100%);
    }
    .art-col.no-art .vinyl-wrap {
      width: 74%;
    }

    .info-col {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: clamp(14px, 4.5%, 26px) clamp(16px, 5%, 28px);
      background: linear-gradient(165deg, #141721 0%, #0a0c12 100%);
      color: #fff;
    }
    .art-col.with-art + .info-col {
      background: linear-gradient(165deg, rgba(10, 12, 18, 0.55) 0%, #0a0c12 30%);
    }

    .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.72rem;
      color: var(--_text-dim);
      gap: 10px;
    }
    .top-row .device-name {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .top-row .device-name span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .top-row ha-icon {
      --mdc-icon-size: 13px;
      flex-shrink: 0;
    }
    .top-row .clock {
      flex-shrink: 0;
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: auto;
      min-width: 0;
    }
    .title-block .eyebrow-src {
      font-weight: 800;
      font-size: 0.66rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--_accent);
    }
    .title-block .track-title-lg {
      font-weight: 600;
      font-size: clamp(1.15rem, 8cqw, 1.7rem);
      line-height: 1.15;
      margin: 0;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title-block .track-title-lg.empty {
      color: var(--_text-dim);
      font-weight: 500;
    }
    .title-block .track-meta {
      font-size: 0.86rem;
      color: var(--_text-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .progress-row,
    .volume-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .progress-row time {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.55);
      flex-shrink: 0;
    }
    .volume-row {
      color: var(--_text-dim);
    }
    .volume-row ha-icon {
      --mdc-icon-size: 15px;
      flex-shrink: 0;
    }
    .volume-row .pct {
      font-size: 0.72rem;
      width: 2.6em;
      text-align: right;
      color: rgba(255, 255, 255, 0.55);
      flex-shrink: 0;
    }
    .progress-row .bar,
    .volume-row .bar {
      position: relative;
      flex: 1;
      height: 4px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.16);
    }
    .progress-row .fill {
      background: var(--_accent);
    }
    .volume-row .fill {
      background: rgba(255, 255, 255, 0.65);
    }
    .progress-row .fill,
    .volume-row .fill {
      position: absolute;
      inset: 0;
      width: 0%;
      border-radius: 999px;
      pointer-events: none;
    }
    /* Le curseur natif est superposé, transparent, uniquement pour
       l'interaction/l'accessibilité — le rendu visuel vient de .fill
       en dessous (cf. _renderProgress/_renderVolume). */
    .range-overlay {
      position: absolute;
      inset: -10px 0;
      width: 100%;
      height: 24px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
    }
    .range-overlay:focus-visible {
      opacity: 1;
    }
    .range-overlay::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--_accent);
    }
    .range-overlay::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border: none;
      border-radius: 50%;
      background: var(--_accent);
    }

    .transport-lg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(10px, 3cqw, 22px);
    }
    .transport-lg .ctrl.ghost-sm {
      width: 32px;
      height: 32px;
      font-size: 14px;
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.5);
    }
    .transport-lg .ctrl.ghost-sm.active {
      color: var(--_accent);
    }
    .transport-lg .ctrl.ghost-sm:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
    .transport-lg .ctrl.mid {
      width: 38px;
      height: 38px;
      font-size: 17px;
    }
    .transport-lg .ctrl.play-lg {
      width: 52px;
      height: 52px;
      font-size: 24px;
      background: #fff;
      color: #14100c;
      border: none;
    }
    .transport-lg .ctrl.play-lg:hover {
      background: #ffe9d2;
    }
    .transport-lg .ctrl ha-icon {
      --mdc-icon-size: 1.1em;
    }

    .chip-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      position: relative;
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--_text-dim);
      font-size: 0.74rem;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .chip:hover,
    .chip[aria-expanded="true"] {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
    .chip ha-icon {
      --mdc-icon-size: 14px;
    }

    .popover-backdrop {
      position: fixed;
      inset: 0;
      z-index: 3;
    }
    .popover {
      position: absolute;
      z-index: 4;
      bottom: calc(100% + 10px);
      left: 0;
      min-width: 180px;
      max-width: 260px;
      max-height: 220px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 6px;
      border-radius: 12px;
      background: #171a24;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6);
    }
    .popover-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--_text-dim);
      font-size: 0.82rem;
      text-align: left;
      cursor: pointer;
    }
    .popover-item:hover,
    .popover-item:focus-visible {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    .popover-item.current {
      color: var(--_accent);
    }
    .popover-item ha-icon {
      --mdc-icon-size: 15px;
      flex-shrink: 0;
    }
    .popover-item span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `);
customElements.define(bt, W);
window.customCards = window.customCards || [];
window.customCards.push({
  type: bt,
  name: "Echo Player Card",
  description: "Lecteur média plein écran pour smart displays (Echo Show, Echo Spot, View Assist)."
});
