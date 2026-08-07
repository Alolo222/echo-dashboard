var wt = Object.defineProperty;
var At = (r, t, e) => t in r ? wt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var N = (r, t, e) => At(r, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, Z = k.ShadowRoot && (k.ShadyCSS === void 0 || k.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), K = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (r) => new ft(typeof r == "string" ? r : r + "", void 0, G), xt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ft(e, r, G);
}, St = (r, t) => {
  if (Z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = k.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Y = Z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Et(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ct, defineProperty: zt, getOwnPropertyDescriptor: Ot, getOwnPropertyNames: Pt, getOwnPropertySymbols: Ut, getPrototypeOf: Tt } = Object, $ = globalThis, Q = $.trustedTypes, Rt = Q ? Q.emptyScript : "", D = $.reactiveElementPolyfillSupport, S = (r, t) => r, W = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Rt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, mt = (r, t) => !Ct(r, t), X = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: mt };
var lt, ht;
(lt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (ht = $.litPropertyMetadata) != null || ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = X) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && zt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    var n;
    const { get: i, set: o } = (n = Ot(this.prototype, t)) != null ? n : { get() {
      return this[e];
    }, set(c) {
      this[e] = c;
    } };
    return { get: i, set(c) {
      const a = i == null ? void 0 : i.call(this);
      o == null || o.call(this, c), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [...Pt(e), ...Ut(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(Y(i));
    } else t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return St(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : W).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n, c;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : W;
      this._$Em = i;
      const h = l.fromAttribute(e, a.type);
      this[i] = (c = h != null ? h : (n = this._$Ej) == null ? void 0 : n.get(i)) != null ? c : h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    var n, c;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (o = this[t]), s != null || (s = a.getPropertyOptions(t)), !(((n = s.hasChanged) != null ? n : mt)(o, e) || s.useDefault && s.reflect && o === ((c = this._$Ej) == null ? void 0 : c.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    var c, a, l;
    s && !((c = this._$Ej) != null ? c : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = n != null ? n : e) != null ? a : this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
    var s, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, c] of this._$Ep) this[n] = c;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, c] of o) {
        const { wrapped: a } = c, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, c, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[S("elementProperties")] = /* @__PURE__ */ new Map(), w[S("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: w }), ((dt = $.reactiveElementVersions) != null ? dt : $.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, tt = (r) => r, H = C.trustedTypes, et = H ? H.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, $t = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, yt = "?" + m, kt = `<${yt}>`, b = document, O = () => b.createComment(""), P = (r) => r === null || typeof r != "object" && typeof r != "function", J = Array.isArray, Ht = (r) => J(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", L = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, y = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, ot = /"/g, gt = /^(?:script|style|textarea|title)$/i, Mt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Mt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), g = b.createTreeWalker(b, 129);
function vt(r, t) {
  if (!J(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const Nt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = x;
  for (let c = 0; c < e; c++) {
    const a = r[c];
    let l, h, u = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, h = n.exec(a), h !== null); ) _ = n.lastIndex, n === x ? h[1] === "!--" ? n = st : h[1] !== void 0 ? n = it : h[2] !== void 0 ? (gt.test(h[2]) && (i = RegExp("</" + h[2], "g")), n = y) : h[3] !== void 0 && (n = y) : n === y ? h[0] === ">" ? (n = i != null ? i : x, u = -1) : h[1] === void 0 ? u = -2 : (u = n.lastIndex - h[2].length, l = h[1], n = h[3] === void 0 ? y : h[3] === '"' ? ot : rt) : n === ot || n === rt ? n = y : n === st || n === it ? n = x : (n = y, i = void 0);
    const f = n === y && r[c + 1].startsWith("/>") ? " " : "";
    o += n === x ? a + kt : u >= 0 ? (s.push(l), a.slice(0, u) + $t + a.slice(u) + m + f) : a + m + (u === -2 ? c : f);
  }
  return [vt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [l, h] = Nt(t, e);
    if (this.el = U.createElement(l, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith($t)) {
          const _ = h[n++], f = i.getAttribute(u).split(m), R = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: R[2], strings: f, ctor: R[1] === "." ? Lt : R[1] === "?" ? jt : R[1] === "@" ? qt : M }), i.removeAttribute(u);
        } else u.startsWith(m) && (a.push({ type: 6, index: o }), i.removeAttribute(u));
        if (gt.test(i.tagName)) {
          const u = i.textContent.split(m), _ = u.length - 1;
          if (_ > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let f = 0; f < _; f++) i.append(u[f], O()), g.nextNode(), a.push({ type: 2, index: ++o });
            i.append(u[_], O());
          }
        }
      } else if (i.nodeType === 8) if (i.data === yt) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(m, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += m.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  var n, c, a;
  if (t === A) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = P(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class Dt {
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
    var l;
    const { el: { content: e }, parts: s } = this._$AD, i = ((l = t == null ? void 0 : t.creationScope) != null ? l : b).importNode(e, !0);
    g.currentNode = i;
    let o = g.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new T(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Ft(o, this, t)), this._$AV.push(h), a = s[++c];
      }
      n !== (a == null ? void 0 : a.index) && (o = g.nextNode(), n++);
    }
    return g.currentNode = b, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, s, i) {
    var o;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (o = i == null ? void 0 : i.isConnected) != null ? o : !0;
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
    t = E(this, t, e), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(vt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new Dt(i, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new T(this.O(O()), this.O(O()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = tt(t).nextSibling;
      tt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !P(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = E(this, c[s + a], e, a), l === A && (l = this._$AH[a]), n || (n = !P(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Lt extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class jt extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class qt extends M {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var n;
    if ((t = (n = E(this, t, e, 0)) != null ? n : d) === A) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) == null ? void 0 : e.host) != null ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ft {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const j = C.litHtmlPolyfillSupport;
var ut;
j == null || j(U, T), ((ut = C.litHtmlVersions) != null ? ut : C.litHtmlVersions = []).push("3.3.3");
const It = (r, t, e) => {
  var o, n;
  const s = (o = e == null ? void 0 : e.renderBefore) != null ? o : t;
  let i = s._$litPart$;
  if (i === void 0) {
    const c = (n = e == null ? void 0 : e.renderBefore) != null ? n : null;
    s._$litPart$ = i = new T(t.insertBefore(O(), c), c, void 0, e != null ? e : {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class z extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, s;
    const t = super.createRenderRoot();
    return (s = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = It(e, this.renderRoot, this.renderOptions);
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
    return A;
  }
}
var pt;
z._$litElement$ = !0, z.finalized = !0, (pt = v.litElementHydrateSupport) == null || pt.call(v, { LitElement: z });
const q = v.litElementPolyfillSupport;
q == null || q({ LitElement: z });
var _t;
((_t = v.litElementVersions) != null ? _t : v.litElementVersions = []).push("4.2.2");
const bt = "echo-weather-card", Bt = "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill", Wt = 1, Vt = 2, at = {
  hourly_count: 6,
  daily_count: 4,
  language: null,
  time_format: null,
  icons: {
    provider: "meteocons",
    style: "fill",
    base_url: null
  },
  show_current: !0,
  show_hourly: !0,
  show_daily: !0,
  show_feels_like: !0,
  show_precipitation_probability: !0,
  title: null,
  background: "transparent"
}, Zt = {
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
function F(r, t) {
  return r === "partlycloudy" ? t ? "partly-cloudy-night" : "partly-cloudy-day" : r === "sunny" && t ? "clear-night" : Zt[r] || "not-available";
}
function I(r, t) {
  return `${((t == null ? void 0 : t.base_url) || Bt).replace(/\/$/, "")}/${r}.svg`;
}
function Gt(r, t, e) {
  return new Intl.DateTimeFormat(t, {
    hour: "numeric",
    hour12: e === "12"
  }).format(r).replace(/\s/g, "");
}
function Jt(r, t) {
  return new Intl.DateTimeFormat(t, { weekday: "short" }).format(r);
}
function B(r, t) {
  return r.localize(
    `component.weather.entity_component._.state.${t}`
  ) || t;
}
function ct(r, t) {
  return (Number(r.attributes.supported_features) & t) !== 0;
}
async function Kt(r, t, e) {
  var s, i;
  try {
    const o = await r.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: e },
      target: { entity_id: t },
      return_response: !0
    });
    return ((i = (s = o == null ? void 0 : o.response) == null ? void 0 : s[t]) == null ? void 0 : i.forecast) || [];
  } catch (o) {
    return console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${e})`,
      o
    ), [];
  }
}
function Yt(r, t, e) {
  const s = r.states[t];
  if (!s) return () => {
  };
  const i = [];
  if (ct(s, Wt) && i.push("daily"), ct(s, Vt) && i.push("hourly"), i.length === 0)
    return console.warn(
      `[echo-weather-card] ${t} ne supporte ni forecast daily ni hourly`
    ), () => {
    };
  const o = [];
  let n = !1;
  return i.forEach((c) => {
    r.connection.subscribeMessage(
      (a) => e(c, a.forecast || []),
      { type: "weather/subscribe_forecast", forecast_type: c, entity_id: t }
    ).then((a) => {
      n ? a() : o.push(a);
    }).catch(async (a) => {
      console.warn(
        `[echo-weather-card] souscription forecast "${c}" indisponible, repli sur get_forecasts`,
        a
      );
      const l = await Kt(r, t, c);
      n || e(c, l);
    });
  }), () => {
    n = !0, o.forEach((c) => c());
  };
}
class V extends z {
  setConfig(t) {
    if (!(t != null && t.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    this._config = {
      ...at,
      ...t,
      icons: { ...at.icons, ...t.icons || {} }
    };
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t.states).find(
      (s) => s.startsWith("weather.")
    ) || "weather.home" };
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((t) => {
      var s;
      const e = ((s = t[0]) == null ? void 0 : s.contentRect.width) || 0;
      this.classList.toggle("portrait", e > 0 && e < 480);
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var t, e;
    super.disconnectedCallback(), (t = this._resizeObserver) == null || t.disconnect(), (e = this._unsubscribeForecasts) == null || e.call(this), this._unsubscribeForecasts = void 0, this._subscribedEntity = void 0;
  }
  set hass(t) {
    var i, o;
    const e = (o = this._hass) == null ? void 0 : o.states[(i = this._config) == null ? void 0 : i.entity];
    if (this._hass = t, !this._config) return;
    const s = t.states[this._config.entity];
    s && this._subscribedEntity !== this._config.entity && this._subscribeToForecasts(), e !== s && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _subscribeToForecasts() {
    var t;
    (t = this._unsubscribeForecasts) == null || t.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = Yt(
      this._hass,
      this._config.entity,
      (e, s) => {
        e === "hourly" && (this._hourly = s), e === "daily" && (this._daily = s);
      }
    );
  }
  _isNight(t) {
    var s;
    if (!t)
      return ((s = this._hass.states["sun.sun"]) == null ? void 0 : s.state) === "below_horizon";
    const e = t.getHours();
    return e < 7 || e >= 21;
  }
  render() {
    var i, o;
    if (!this._config || !this._hass) return d;
    const t = this._hass.states[this._config.entity];
    if (!t)
      return p`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    const e = this._config.language || ((i = this._hass.locale) == null ? void 0 : i.language) || "en", s = this._config.time_format || ((o = this._hass.locale) == null ? void 0 : o.time_format) || "24";
    return p`
      <div class="card" style="background:${this._config.background}">
        ${this._config.title ? p`<div class="title">${this._config.title}</div>` : d}
        ${this._config.show_current ? this._renderCurrent(t) : d}
        ${this._config.show_hourly ? this._renderHourly(e, s) : d}
        ${this._config.show_daily ? this._renderDaily(e) : d}
      </div>
    `;
  }
  _renderCurrent(t) {
    const e = F(t.state, this._isNight()), s = I(e, this._config.icons), i = B(this._hass, t.state), o = t.attributes.temperature, n = t.attributes.apparent_temperature;
    return p`
      <div class="current">
        <img class="current-icon" src=${s} alt=${i} />
        <div class="current-info">
          <div class="current-temp">${Math.round(o)}°</div>
          <div class="current-condition">${i}</div>
          ${this._config.show_feels_like && n != null ? p`<div class="current-feels-like">
                Ressenti ${Math.round(n)}°
              </div>` : d}
        </div>
      </div>
    `;
  }
  _renderHourly(t, e) {
    const s = Date.now(), i = (this._hourly || []).filter((o) => new Date(o.datetime).getTime() >= s).slice(0, this._config.hourly_count);
    return i.length ? p`
      <div class="hourly">
        ${i.map((o) => {
      const n = new Date(o.datetime), c = F(
        o.condition,
        this._isNight(n)
      ), a = I(c, this._config.icons), l = B(this._hass, o.condition), h = o.precipitation_probability;
      return p`
            <div class="hourly-item">
              <div class="hourly-time">
                ${Gt(n, t, e)}
              </div>
              <img class="hourly-icon" src=${a} alt=${l} />
              <div class="hourly-temp">
                ${Math.round(o.temperature)}°
              </div>
              ${this._config.show_precipitation_probability && h > 0 ? p`<div class="hourly-pop">${h}%</div>` : d}
            </div>
          `;
    })}
      </div>
    ` : d;
  }
  _renderDaily(t) {
    const e = (this._daily || []).slice(0, this._config.daily_count);
    return e.length ? p`
      <div class="daily">
        ${e.map((s) => {
      const i = new Date(s.datetime), o = F(s.condition, !1), n = I(o, this._config.icons), c = B(this._hass, s.condition);
      return p`
            <div class="daily-item">
              <div class="daily-day">${Jt(i, t)}</div>
              <img class="daily-icon" src=${n} alt=${c} />
              <div class="daily-temps">
                <span class="daily-max"
                  >${Math.round(s.temperature)}°</span
                >
                <span class="daily-min"
                  >${Math.round(s.templow)}°</span
                >
              </div>
            </div>
          `;
    })}
      </div>
    ` : d;
  }
}
N(V, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 }
}), N(V, "styles", xt`
    /* container-type permet des tailles fluides (clamp + cqw) qui suivent
       la taille réelle du composant plutôt que le viewport — utile dans un
       conteneur View Assist dont la taille n'est pas celle de l'écran. */
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
      container-type: inline-size;
      --_gap: var(--echo-weather-gap, 14px);
      --_icon-size: var(--echo-weather-icon-size, clamp(76px, 11cqw, 108px));
      --_current-temp-size: var(
        --echo-weather-current-temp-size,
        clamp(2.75rem, 7cqw, 4.25rem)
      );
      --_hourly-temp-size: var(
        --echo-weather-hourly-temp-size,
        clamp(1.15rem, 2.4cqw, 1.5rem)
      );
      --_daily-temp-size: var(
        --echo-weather-daily-temp-size,
        clamp(1.05rem, 2.1cqw, 1.3rem)
      );
      --_text-color: var(
        --echo-weather-text-color,
        var(--primary-text-color, #fff)
      );
      --_secondary-color: var(
        --echo-weather-secondary-color,
        var(--secondary-text-color, #b0b0b0)
      );
      --_divider-color: var(--echo-weather-divider-color, rgba(127, 127, 127, 0.2));
      --_tile-background: var(--echo-weather-tile-background, rgba(127, 127, 127, 0.09));
      font-family: var(--echo-weather-font-family, inherit);
      color: var(--_text-color);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_gap);
      gap: var(--_gap);
    }

    .error {
      color: var(--error-color, #f44);
      padding: var(--_gap);
    }

    .title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--_secondary-color);
    }

    /* --- Météo actuelle : ~1/3 supérieur --- */
    .current {
      display: flex;
      align-items: center;
      gap: var(--_gap);
      flex: 1 1 33%;
      padding-bottom: var(--_gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .current-icon {
      width: var(--_icon-size);
      height: var(--_icon-size);
      flex-shrink: 0;
    }
    .current-temp {
      font-size: var(--_current-temp-size);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.01em;
    }
    .current-condition {
      color: var(--_secondary-color);
      font-size: clamp(1rem, 1.8cqw, 1.25rem);
      font-weight: 500;
      margin-top: 2px;
    }
    .current-feels-like {
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, 1.4cqw, 1rem);
      margin-top: 2px;
    }

    /* --- Prévisions horaires : contenu principal --- */
    .hourly {
      display: flex;
      justify-content: space-between;
      gap: var(--_gap);
      flex: 1 1 auto;
      padding-bottom: var(--_gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .hourly-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .hourly-time {
      color: var(--_secondary-color);
      font-size: clamp(0.9rem, 1.6cqw, 1.05rem);
      font-weight: 600;
    }
    .hourly-icon {
      width: calc(var(--_icon-size) * 0.56);
      height: calc(var(--_icon-size) * 0.56);
    }
    .hourly-temp {
      font-size: var(--_hourly-temp-size);
      font-weight: 700;
    }
    .hourly-pop {
      color: var(--_secondary-color);
      font-size: clamp(0.75rem, 1.3cqw, 0.9rem);
      font-weight: 600;
    }

    /* --- Prévisions journalières : bande compacte en bas, regroupée en
       tuiles légères pour lire max/min d'un coup d'œil --- */
    .daily {
      display: flex;
      justify-content: space-between;
      gap: var(--_gap);
      flex: 0 0 auto;
    }
    .daily-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex: 1;
      min-width: 0;
      padding: 8px 4px;
      border-radius: 14px;
      background: var(--_tile-background);
    }
    .daily-day {
      color: var(--_secondary-color);
      font-size: clamp(0.9rem, 1.6cqw, 1.05rem);
      font-weight: 600;
      text-transform: capitalize;
    }
    .daily-icon {
      width: calc(var(--_icon-size) * 0.46);
      height: calc(var(--_icon-size) * 0.46);
    }
    .daily-temps {
      font-size: var(--_daily-temp-size);
    }
    .daily-max {
      font-weight: 700;
    }
    .daily-min {
      color: var(--_secondary-color);
      margin-left: 5px;
    }

    /* --- Breakpoint portrait/étroit (posé via ResizeObserver) --- */
    :host(.portrait) .hourly,
    :host(.portrait) .daily {
      flex-wrap: wrap;
    }
    :host(.portrait) .hourly-item,
    :host(.portrait) .daily-item {
      flex: 1 1 30%;
    }
  `);
customElements.define(bt, V);
window.customCards = window.customCards || [];
window.customCards.push({
  type: bt,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
