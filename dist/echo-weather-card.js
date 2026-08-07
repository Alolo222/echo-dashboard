var At = Object.defineProperty;
var xt = (r, t, e) => t in r ? At(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var D = (r, t, e) => xt(r, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, Z = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), K = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (r) => new mt(typeof r == "string" ? r : r + "", void 0, G), St = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new mt(e, r, G);
}, Ct = (r, t) => {
  if (Z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = R.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, Q = Z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Et(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: kt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Tt, getOwnPropertySymbols: Ot, getPrototypeOf: Pt } = Object, g = globalThis, X = g.trustedTypes, Mt = X ? X.emptyScript : "", q = g.reactiveElementPolyfillSupport, C = (r, t) => r, V = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Mt : null;
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
} }, gt = (r, t) => !zt(r, t), tt = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: gt };
var ht, dt;
(ht = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (dt = g.litPropertyMetadata) != null || (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
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
      s !== void 0 && kt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    var o;
    const { get: s, set: n } = (o = Ut(this.prototype, t)) != null ? o : { get() {
      return this[e];
    }, set(c) {
      this[e] = c;
    } };
    return { get: s, set(c) {
      const a = s == null ? void 0 : s.call(this);
      n == null || n.call(this, c), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Pt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, i = [...Tt(e), ...Ot(e)];
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
      for (const s of i) e.unshift(Q(s));
    } else t !== void 0 && e.push(Q(t));
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
    return Ct(t, this.constructor.elementStyles), t;
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
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : V).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o, c;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : V;
      this._$Em = s;
      const h = l.fromAttribute(e, a.type);
      this[s] = (c = h != null ? h : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? c : h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    var o, c;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (n = this[t]), i != null || (i = a.getPropertyOptions(t)), !(((o = i.hasChanged) != null ? o : gt)(n, e) || i.useDefault && i.reflect && n === ((c = this._$Ej) == null ? void 0 : c.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, o) {
    var c, a, l;
    i && !((c = this._$Ej) != null ? c : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = o != null ? o : e) != null ? a : this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, c] of this._$Ep) this[o] = c;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, c] of n) {
        const { wrapped: a } = c, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, c, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
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
var ut;
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: A }), ((ut = g.reactiveElementVersions) != null ? ut : g.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, et = (r) => r, N = z.trustedTypes, it = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, yt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + m, Rt = `<${$t}>`, w = document, U = () => w.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", J = Array.isArray, Nt = (r) => J(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, rt = />/g, y = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, ot = /"/g, vt = /^(?:script|style|textarea|title)$/i, Ht = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Ht(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), $ = w.createTreeWalker(w, 129);
function wt(r, t) {
  if (!J(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Dt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
  for (let c = 0; c < e; c++) {
    const a = r[c];
    let l, h, u = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, h = o.exec(a), h !== null); ) f = o.lastIndex, o === S ? h[1] === "!--" ? o = st : h[1] !== void 0 ? o = rt : h[2] !== void 0 ? (vt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = y) : h[3] !== void 0 && (o = y) : o === y ? h[0] === ">" ? (o = s != null ? s : S, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? y : h[3] === '"' ? ot : nt) : o === ot || o === nt ? o = y : o === st || o === rt ? o = S : (o = y, s = void 0);
    const _ = o === y && r[c + 1].startsWith("/>") ? " " : "";
    n += o === S ? a + Rt : u >= 0 ? (i.push(l), a.slice(0, u) + yt + a.slice(u) + m + _) : a + m + (u === -2 ? c : _);
  }
  return [wt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class O {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, h] = Dt(t, e);
    if (this.el = O.createElement(l, i), $.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = $.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(yt)) {
          const f = h[o++], _ = s.getAttribute(u).split(m), b = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: b[2], strings: _, ctor: b[1] === "." ? It : b[1] === "?" ? jt : b[1] === "@" ? Lt : H }), s.removeAttribute(u);
        } else u.startsWith(m) && (a.push({ type: 6, index: n }), s.removeAttribute(u));
        if (vt.test(s.tagName)) {
          const u = s.textContent.split(m), f = u.length - 1;
          if (f > 0) {
            s.textContent = N ? N.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(u[_], U()), $.nextNode(), a.push({ type: 2, index: ++n });
            s.append(u[f], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $t) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(m, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = w.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(r, t, e = r, i) {
  var o, c, a;
  if (t === x) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((c = s == null ? void 0 : s._$AO) == null || c.call(s, !1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[i] = s : e._$Cl = s), s !== void 0 && (t = E(r, s._$AS(r, t.values), s, i)), t;
}
class qt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((l = t == null ? void 0 : t.creationScope) != null ? l : w).importNode(e, !0);
    $.currentNode = s;
    let n = $.nextNode(), o = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new P(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Bt(n, this, t)), this._$AV.push(h), a = i[++c];
      }
      o !== (a == null ? void 0 : a.index) && (n = $.nextNode(), o++);
    }
    return $.currentNode = w, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class P {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, i, s) {
    var n;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (n = s == null ? void 0 : s.isConnected) != null ? n : !0;
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
    t = E(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = O.createElement(wt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const o = new qt(s, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new P(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(n), s++;
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
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = E(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== x, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = E(this, c[i + a], e, a), l === x && (l = this._$AH[a]), o || (o = !T(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l != null ? l : "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class It extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class jt extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Lt extends H {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    var o;
    if ((t = (o = E(this, t, e, 0)) != null ? o : d) === x) return;
    const i = this._$AH, s = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) == null ? void 0 : e.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const j = z.litHtmlPolyfillSupport;
var pt;
j == null || j(O, P), ((pt = z.litHtmlVersions) != null ? pt : z.litHtmlVersions = []).push("3.3.3");
const Ft = (r, t, e) => {
  var n, o;
  const i = (n = e == null ? void 0 : e.renderBefore) != null ? n : t;
  let s = i._$litPart$;
  if (s === void 0) {
    const c = (o = e == null ? void 0 : e.renderBefore) != null ? o : null;
    i._$litPart$ = s = new P(t.insertBefore(U(), c), c, void 0, e != null ? e : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class k extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ft(e, this.renderRoot, this.renderOptions);
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
    return x;
  }
}
var _t;
k._$litElement$ = !0, k.finalized = !0, (_t = v.litElementHydrateSupport) == null || _t.call(v, { LitElement: k });
const L = v.litElementPolyfillSupport;
L == null || L({ LitElement: k });
var ft;
((ft = v.litElementVersions) != null ? ft : v.litElementVersions = []).push("4.2.2");
const bt = "echo-weather-card", Wt = "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill", Vt = 1, Yt = 2, ct = {
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
  show_humidity: !0,
  show_clock: !0,
  show_last_updated: !0,
  show_wind: !0,
  show_sun: !0,
  sun_entity: null,
  uv_entity: null,
  air_quality_entity: null,
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
function B(r, t) {
  return r === "partlycloudy" ? t ? "partly-cloudy-night" : "partly-cloudy-day" : r === "sunny" && t ? "clear-night" : Zt[r] || "not-available";
}
function F(r, t) {
  return `${((t == null ? void 0 : t.base_url) || Wt).replace(/\/$/, "")}/${r}.svg`;
}
function Gt(r, t, e) {
  return new Intl.DateTimeFormat(t, {
    hour: "numeric",
    hour12: e === "12"
  }).format(r).replace(/\s/g, "");
}
function M(r, t, e) {
  return new Intl.DateTimeFormat(t, {
    hour: "numeric",
    minute: "2-digit",
    hour12: e === "12"
  }).format(r).replace(/\s/g, "");
}
function Jt(r, t) {
  return new Intl.DateTimeFormat(t, { weekday: "short" }).format(r);
}
function W(r, t) {
  return r.localize(
    `component.weather.entity_component._.state.${t}`
  ) || t;
}
function lt(r, t) {
  return (Number(r.attributes.supported_features) & t) !== 0;
}
async function Kt(r, t, e) {
  var i, s;
  try {
    const n = await r.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: e },
      target: { entity_id: t },
      return_response: !0
    });
    return ((s = (i = n == null ? void 0 : n.response) == null ? void 0 : i[t]) == null ? void 0 : s.forecast) || [];
  } catch (n) {
    return console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${e})`,
      n
    ), [];
  }
}
function Qt(r, t, e) {
  const i = r.states[t];
  if (!i) return () => {
  };
  const s = [];
  if (lt(i, Vt) && s.push("daily"), lt(i, Yt) && s.push("hourly"), s.length === 0)
    return console.warn(
      `[echo-weather-card] ${t} ne supporte ni forecast daily ni hourly`
    ), () => {
    };
  const n = [];
  let o = !1;
  return s.forEach((c) => {
    r.connection.subscribeMessage(
      (a) => e(c, a.forecast || []),
      { type: "weather/subscribe_forecast", forecast_type: c, entity_id: t }
    ).then((a) => {
      o ? a() : n.push(a);
    }).catch(async (a) => {
      console.warn(
        `[echo-weather-card] souscription forecast "${c}" indisponible, repli sur get_forecasts`,
        a
      );
      const l = await Kt(r, t, c);
      o || e(c, l);
    });
  }), () => {
    o = !0, n.forEach((c) => c());
  };
}
class Y extends k {
  setConfig(t) {
    if (!(t != null && t.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    this._config = {
      ...ct,
      ...t,
      icons: { ...ct.icons, ...t.icons || {} }
    };
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t.states).find(
      (i) => i.startsWith("weather.")
    ) || "weather.home" };
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((t) => {
      var i;
      const e = ((i = t[0]) == null ? void 0 : i.contentRect.width) || 0;
      this.classList.toggle("portrait", e > 0 && e < 480);
    }), this._resizeObserver.observe(this), this._clockTimer = setInterval(() => {
      var t;
      (t = this._config) != null && t.show_clock && this.requestUpdate();
    }, 3e4);
  }
  disconnectedCallback() {
    var t, e;
    super.disconnectedCallback(), (t = this._resizeObserver) == null || t.disconnect(), clearInterval(this._clockTimer), (e = this._unsubscribeForecasts) == null || e.call(this), this._unsubscribeForecasts = void 0, this._subscribedEntity = void 0;
  }
  set hass(t) {
    var s, n;
    const e = (n = this._hass) == null ? void 0 : n.states[(s = this._config) == null ? void 0 : s.entity];
    if (this._hass = t, !this._config) return;
    const i = t.states[this._config.entity];
    i && this._subscribedEntity !== this._config.entity && this._subscribeToForecasts(), e !== i && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _subscribeToForecasts() {
    var t;
    (t = this._unsubscribeForecasts) == null || t.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = Qt(
      this._hass,
      this._config.entity,
      (e, i) => {
        e === "hourly" && (this._hourly = i), e === "daily" && (this._daily = i);
      }
    );
  }
  _isNight(t) {
    var i;
    if (!t)
      return ((i = this._hass.states["sun.sun"]) == null ? void 0 : i.state) === "below_horizon";
    const e = t.getHours();
    return e < 7 || e >= 21;
  }
  render() {
    var s, n;
    if (!this._config || !this._hass) return d;
    const t = this._hass.states[this._config.entity];
    if (!t)
      return p`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    const e = this._config.language || ((s = this._hass.locale) == null ? void 0 : s.language) || "en", i = this._config.time_format || ((n = this._hass.locale) == null ? void 0 : n.time_format) || "24";
    return p`
      <div class="card" style="background:${this._config.background}">
        ${this._config.title ? p`<div class="title">${this._config.title}</div>` : d}
        ${this._config.show_current ? this._renderCurrent(t, e, i) : d}
        ${this._config.show_hourly ? this._renderHourly(e, i) : d}
        ${this._config.show_daily ? this._renderDaily(e) : d}
        ${this._renderBottomBand(t, e, i)}
      </div>
    `;
  }
  _renderCurrent(t, e, i) {
    const s = B(t.state, this._isNight()), n = F(s, this._config.icons), o = W(this._hass, t.state), c = t.attributes.temperature, a = t.attributes.apparent_temperature, l = t.attributes.humidity, h = this._config.uv_entity && this._hass.states[this._config.uv_entity], u = h && !["unknown", "unavailable"].includes(h.state) ? h.state : null, f = t.last_updated ? new Date(t.last_updated) : null, _ = [];
    this._config.show_feels_like && a != null && _.push(`Ressenti ${Math.round(a)}°`), this._config.show_last_updated && f && _.push(`Maj à ${M(f, e, i)}`);
    const b = this._config.show_clock || this._config.show_humidity && l != null;
    return p`
      <div class="current">
        <img class="current-icon" src=${n} alt=${o} />
        <div class="current-info">
          <div class="current-temp">${Math.round(c)}°</div>
          <div class="current-condition">
            ${o}
            ${u != null ? p`<span class="uv-badge">UV ${u}</span>` : d}
          </div>
          ${_.length ? p`<div class="current-meta">${_.join(" · ")}</div>` : d}
        </div>
        ${b ? p`
              <div class="current-side">
                ${this._config.show_clock ? p`<div class="clock">
                      ${M(/* @__PURE__ */ new Date(), e, i)}
                    </div>` : d}
                ${this._config.show_humidity && l != null ? p`
                      <div class="humidity-badge">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(l)}%</span>
                      </div>
                    ` : d}
              </div>
            ` : d}
      </div>
    `;
  }
  // Bandeau bas : vent, lever/coucher de soleil, qualité de l'air. Chaque
  // tuile n'apparaît que si la donnée existe (attribut natif de l'entité
  // météo pour le vent, `sun.sun` pour lever/coucher, entité dédiée pour
  // la qualité de l'air) — pas de case à cocher requise pour un usage de
  // base. `ha-icon` est déjà défini par le frontend HA : rien à bundler.
  _renderBottomBand(t, e, i) {
    const s = [], n = t.attributes.wind_speed;
    if (this._config.show_wind && n != null) {
      const a = t.attributes.wind_speed_unit || "";
      s.push({
        type: "wind",
        icon: "mdi:weather-windy",
        value: `${Math.round(n)} ${a}`.trim()
      });
    }
    const o = this._hass.states[this._config.sun_entity || "sun.sun"];
    if (this._config.show_sun && o) {
      const a = o.attributes.next_rising ? new Date(o.attributes.next_rising) : null, l = o.attributes.next_setting ? new Date(o.attributes.next_setting) : null;
      a && s.push({
        type: "sunrise",
        icon: "mdi:weather-sunset-up",
        value: M(a, e, i)
      }), l && s.push({
        type: "sunset",
        icon: "mdi:weather-sunset-down",
        value: M(l, e, i)
      });
    }
    const c = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity];
    if (c && !["unknown", "unavailable"].includes(c.state)) {
      const a = c.attributes.unit_of_measurement || "";
      s.push({
        type: "air",
        icon: "mdi:air-filter",
        value: `${c.state} ${a}`.trim()
      });
    }
    return s.length ? p`
      <div class="bottom-band">
        ${s.map(
      (a) => p`
            <div class="band-tile band-${a.type}">
              <ha-icon class="band-icon" icon=${a.icon}></ha-icon>
              <span class="band-value">${a.value}</span>
            </div>
          `
    )}
      </div>
    ` : d;
  }
  _renderHourly(t, e) {
    const i = Date.now(), s = (this._hourly || []).filter((n) => new Date(n.datetime).getTime() >= i).slice(0, this._config.hourly_count);
    return s.length ? p`
      <div class="hourly">
        ${s.map((n) => {
      const o = new Date(n.datetime), c = B(
        n.condition,
        this._isNight(o)
      ), a = F(c, this._config.icons), l = W(this._hass, n.condition), h = n.precipitation_probability;
      return p`
            <div class="hourly-item">
              <div class="hourly-time">
                ${Gt(o, t, e)}
              </div>
              <img class="hourly-icon" src=${a} alt=${l} />
              <div class="hourly-temp">
                ${Math.round(n.temperature)}°
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
        ${e.map((i) => {
      const s = new Date(i.datetime), n = B(i.condition, !1), o = F(n, this._config.icons), c = W(this._hass, i.condition);
      return p`
            <div class="daily-item">
              <div class="daily-day">${Jt(s, t)}</div>
              <img class="daily-icon" src=${o} alt=${c} />
              <div class="daily-temps">
                <span class="daily-max"
                  >${Math.round(i.temperature)}°</span
                >
                <span class="daily-min"
                  >${Math.round(i.templow)}°</span
                >
              </div>
            </div>
          `;
    })}
      </div>
    ` : d;
  }
}
D(Y, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 }
}), D(Y, "styles", St`
    /* container-type permet des tailles fluides (clamp + cqw) qui suivent
       la taille réelle du composant plutôt que le viewport — utile dans un
       conteneur View Assist dont la taille n'est pas celle de l'écran. */
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
      container-type: inline-size;
      --_gap: var(--echo-weather-gap, 14px);
      /* Espacement vertical entre sections, distinct de --_gap (horizontal,
         entre icônes/tuiles) : on tient désormais 4 blocs empilés (actuelle,
         horaire, quotidienne, bandeau bas) dans les mêmes 480px, un peu
         moins d'air entre eux était nécessaire pour que tout rentre. */
      --_row-gap: var(--echo-weather-row-gap, 10px);
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
      --_tile-background: var(--echo-weather-tile-background, rgba(127, 127, 127, 0.13));
      font-family: var(--echo-weather-font-family, inherit);
      color: var(--_text-color);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_row-gap) var(--_gap);
      gap: var(--_row-gap);
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
      padding-bottom: var(--_row-gap);
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
      display: flex;
      align-items: center;
      gap: 8px;
    }
    /* Badge UV : collé à la condition plutôt qu'isolé dans une tuile à
       part, comme sur RadarWise — précis et compact, sans bouffer de
       hauteur dans un bloc déjà serré. */
    .uv-badge {
      display: inline-flex;
      align-items: center;
      font-size: clamp(0.72rem, 1.2cqw, 0.85rem);
      font-weight: 700;
      color: var(--echo-weather-uv-color, #ffb74d);
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
      border-radius: 999px;
      padding: 2px 9px;
      line-height: 1.5;
    }
    .current-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, 1.4cqw, 1rem);
      margin-top: 2px;
    }
    .current-info {
      flex: 1 1 auto;
      min-width: 0;
    }

    /* --- Colonne de droite : horloge + humidité, dans l'espace resté
       libre à côté de la météo actuelle. --- */
    .current-side {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      flex-shrink: 0;
      margin-left: auto;
    }
    .clock {
      font-size: clamp(1.05rem, 2cqw, 1.35rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .humidity-badge {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 12px;
      border-radius: 14px;
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
      font-size: clamp(0.95rem, 1.7cqw, 1.15rem);
      font-weight: 700;
      white-space: nowrap;
    }
    .humidity-icon {
      --mdc-icon-size: clamp(18px, 2.6cqw, 22px);
      color: var(--echo-weather-humidity-color, #4fc3f7);
      flex-shrink: 0;
    }

    /* --- Prévisions horaires : contenu principal --- */
    .hourly {
      display: flex;
      justify-content: space-between;
      gap: var(--_gap);
      flex: 1 1 auto;
      padding-bottom: var(--_row-gap);
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

    /* --- Bandeau bas : vent / lever-coucher / qualité de l'air, une seule
       ligne pleine largeur — pendant compact des tuiles HUMIDITY/WIND/
       SUNRISE/SUNSET de RadarWise. --- */
    .bottom-band {
      display: flex;
      justify-content: center;
      gap: var(--_gap);
      flex: 0 0 auto;
      padding-top: var(--_row-gap);
      border-top: 1px solid var(--_divider-color);
    }
    .band-tile {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      flex: 1;
      min-width: 0;
      padding: 7px 10px;
      border-radius: 12px;
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
    }
    .band-icon {
      --mdc-icon-size: clamp(16px, 2.2cqw, 20px);
      flex-shrink: 0;
    }
    .band-wind .band-icon {
      color: var(--echo-weather-wind-color, #90a4ae);
    }
    .band-sunrise .band-icon {
      color: var(--echo-weather-sunrise-color, #ffb74d);
    }
    .band-sunset .band-icon {
      color: var(--echo-weather-sunset-color, #ff8a65);
    }
    .band-air .band-icon {
      color: var(--echo-weather-air-color, #81c784);
    }
    .band-value {
      font-size: clamp(0.85rem, 1.5cqw, 1.05rem);
      font-weight: 700;
      white-space: nowrap;
    }

    /* --- Breakpoint portrait/étroit (posé via ResizeObserver) --- */
    :host(.portrait) .current,
    :host(.portrait) .hourly,
    :host(.portrait) .daily {
      flex-wrap: wrap;
    }
    :host(.portrait) .hourly-item,
    :host(.portrait) .daily-item {
      flex: 1 1 30%;
    }
    :host(.portrait) .current-side {
      flex-direction: row;
      align-items: center;
    }
    :host(.portrait) .bottom-band {
      flex-wrap: wrap;
    }
    :host(.portrait) .band-tile {
      flex: 1 1 40%;
    }
  `);
customElements.define(bt, Y);
window.customCards = window.customCards || [];
window.customCards.push({
  type: bt,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
