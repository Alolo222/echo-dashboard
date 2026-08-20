var xt = Object.defineProperty;
var wt = (n, t, e) => t in n ? xt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var q = (n, t, e) => wt(n, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, X = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (n) => new gt(typeof n == "string" ? n : n + "", void 0, J), kt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[s + 1], n[0]);
  return new gt(e, n, J);
}, Et = (n, t) => {
  if (X) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = D.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, n.appendChild(i);
  }
}, Y = X ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return At(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St, defineProperty: Pt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Tt, getOwnPropertySymbols: Rt, getPrototypeOf: Ut } = Object, $ = globalThis, j = $.trustedTypes, zt = j ? j.emptyScript : "", V = $.reactiveElementPolyfillSupport, C = (n, t) => n, G = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? zt : null;
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
} }, ft = (n, t) => !St(n, t), tt = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: ft };
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
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Pt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    var o;
    const { get: r, set: s } = (o = Ct(this.prototype, t)) != null ? o : { get() {
      return this[e];
    }, set(l) {
      this[e] = l;
    } };
    return { get: r, set(l) {
      const a = r == null ? void 0 : r.call(this);
      s == null || s.call(this, l), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, i = [...Tt(e), ...Rt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(Y(r));
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
      var r;
      return (r = i.hostConnected) == null ? void 0 : r.call(i);
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
    var s;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : G).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var s, o, l;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), p = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : G;
      this._$Em = r;
      const u = p.fromAttribute(e, a.type);
      this[r] = (l = u != null ? u : (o = this._$Ej) == null ? void 0 : o.get(r)) != null ? l : u, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, s) {
    var o, l;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (s = this[t]), i != null || (i = a.getPropertyOptions(t)), !(((o = i.hasChanged) != null ? o : ft)(s, e) || i.useDefault && i.reflect && s === ((l = this._$Ej) == null ? void 0 : l.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: s }, o) {
    var l, a, p;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = o != null ? o : e) != null ? a : this[t]), s !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && ((p = this._$Eq) != null ? p : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
    var i, r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, l] of s) {
        const { wrapped: a } = l, p = this[o];
        a !== !0 || this._$AL.has(o) || p === void 0 || this.C(o, void 0, l, p);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[C("elementProperties")] = /* @__PURE__ */ new Map(), k[C("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: k }), ((dt = $.reactiveElementVersions) != null ? dt : $.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, et = (n) => n, F = T.trustedTypes, it = F ? F.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, mt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + v, Mt = `<${vt}>`, A = document, U = () => A.createComment(""), z = (n) => n === null || typeof n != "object" && typeof n != "function", Q = Array.isArray, Nt = (n) => Q(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, st = />/g, y = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, nt = /"/g, $t = /^(?:script|style|textarea|title)$/i, Ht = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), d = Ht(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), x = A.createTreeWalker(A, 129);
function yt(n, t) {
  if (!Q(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Lt = (n, t) => {
  const e = n.length - 1, i = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let p, u, h = -1, _ = 0;
    for (; _ < a.length && (o.lastIndex = _, u = o.exec(a), u !== null); ) _ = o.lastIndex, o === P ? u[1] === "!--" ? o = rt : u[1] !== void 0 ? o = st : u[2] !== void 0 ? ($t.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = y) : u[3] !== void 0 && (o = y) : o === y ? u[0] === ">" ? (o = r != null ? r : P, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, p = u[1], o = u[3] === void 0 ? y : u[3] === '"' ? nt : ot) : o === nt || o === ot ? o = y : o === rt || o === st ? o = P : (o = y, r = void 0);
    const g = o === y && n[l + 1].startsWith("/>") ? " " : "";
    s += o === P ? a + Mt : h >= 0 ? (i.push(p), a.slice(0, h) + mt + a.slice(h) + v + g) : a + v + (h === -2 ? l : g);
  }
  return [yt(n, s + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const l = t.length - 1, a = this.parts, [p, u] = Lt(t, e);
    if (this.el = M.createElement(p, i), x.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = x.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(mt)) {
          const _ = u[o++], g = r.getAttribute(h).split(v), f = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: s, name: f[2], strings: g, ctor: f[1] === "." ? Ft : f[1] === "?" ? Ot : f[1] === "@" ? qt : O }), r.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: s }), r.removeAttribute(h));
        if ($t.test(r.tagName)) {
          const h = r.textContent.split(v), _ = h.length - 1;
          if (_ > 0) {
            r.textContent = F ? F.emptyScript : "";
            for (let g = 0; g < _; g++) r.append(h[g], U()), x.nextNode(), a.push({ type: 2, index: ++s });
            r.append(h[_], U());
          }
        }
      } else if (r.nodeType === 8) if (r.data === vt) a.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: s }), h += v.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var o, l, a;
  if (t === E) return t;
  let r = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const s = z(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), s === void 0 ? r = void 0 : (r = new s(n), r._$AT(n, e, i)), i !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[i] = r : e._$Cl = r), r !== void 0 && (t = S(n, r._$AS(n, t.values), r, i)), t;
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
    var p;
    const { el: { content: e }, parts: i } = this._$AD, r = ((p = t == null ? void 0 : t.creationScope) != null ? p : A).importNode(e, !0);
    x.currentNode = r;
    let s = x.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new N(s, s.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (u = new Vt(s, this, t)), this._$AV.push(u), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (s = x.nextNode(), o++);
    }
    return x.currentNode = A, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, i, r) {
    var s;
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (s = r == null ? void 0 : r.isConnected) != null ? s : !0;
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
    t = S(this, t, e), z(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(yt(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(e);
    else {
      const o = new Dt(r, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const s of t) r === e.length ? e.push(i = new N(this.O(U()), this.O(U()), this, this.options)) : i = e[r], i._$AI(s), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = et(t).nextSibling;
      et(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class O {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, s) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, e = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = S(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = s[0], a = 0; a < s.length - 1; a++) p = S(this, l[i + a], e, a), p === E && (p = this._$AH[a]), o || (o = !z(p) || p !== this._$AH[a]), p === c ? t = c : t !== c && (t += (p != null ? p : "") + s[a + 1]), this._$AH[a] = p;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Ft extends O {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Ot extends O {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class qt extends O {
  constructor(t, e, i, r, s) {
    super(t, e, i, r, s), this.type = 5;
  }
  _$AI(t, e = this) {
    var o;
    if ((t = (o = S(this, t, e, 0)) != null ? o : c) === E) return;
    const i = this._$AH, r = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== c && (i === c || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) == null ? void 0 : e.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vt {
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
B == null || B(M, N), ((pt = T.litHtmlVersions) != null ? pt : T.litHtmlVersions = []).push("3.3.3");
const It = (n, t, e) => {
  var s, o;
  const i = (s = e == null ? void 0 : e.renderBefore) != null ? s : t;
  let r = i._$litPart$;
  if (r === void 0) {
    const l = (o = e == null ? void 0 : e.renderBefore) != null ? o : null;
    i._$litPart$ = r = new N(t.insertBefore(U(), l), l, void 0, e != null ? e : {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class R extends k {
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
    return E;
  }
}
var ut;
R._$litElement$ = !0, R.finalized = !0, (ut = w.litElementHydrateSupport) == null || ut.call(w, { LitElement: R });
const K = w.litElementPolyfillSupport;
K == null || K({ LitElement: R });
var _t;
((_t = w.litElementVersions) != null ? _t : w.litElementVersions = []).push("4.2.2");
const bt = "echo-player-card", m = {
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
  const t = Math.floor(n), e = Math.floor(t / 3600), i = Math.floor(t % 3600 / 60), r = t % 60, s = (o) => String(o).padStart(2, "0");
  return e > 0 ? `${e}:${s(i)}:${s(r)}` : `${i}:${s(r)}`;
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
class W extends R {
  constructor() {
    super(), this._artFailedUrl = null, this._sourcesOpen = !1, this._groupOpen = !1, this._seekDragFrac = null;
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
    const i = (r, s) => console.warn(
      `[echo-player-card] "${r}" invalide (${JSON.stringify(e[r])}), valeur par défaut utilisée (${JSON.stringify(s)})`
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
    var u, h, _, g;
    const e = this._config, i = (u = this._hass) == null ? void 0 : u.states[e == null ? void 0 : e.media_player_entity], r = (h = this._hass) == null ? void 0 : h.states[e == null ? void 0 : e.satellite_entity], s = (_ = e == null ? void 0 : e.group_entities) == null ? void 0 : _.map((f) => {
      var H;
      return (H = this._hass) == null ? void 0 : H.states[f];
    });
    if (this._hass = t, !e) return;
    const o = t.states[e.media_player_entity], l = t.states[e.satellite_entity], a = (g = e.group_entities) == null ? void 0 : g.map((f) => t.states[f]), p = (s == null ? void 0 : s.length) !== (a == null ? void 0 : a.length) || (a == null ? void 0 : a.some((f, H) => f !== s[H]));
    (i !== o || r !== l || p) && this.requestUpdate();
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
  _call(t, e, i, r) {
    this._hass.callService(t, e, { entity_id: i, ...r || {} });
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
  // Recherche tactile sur l'anneau (mode round) — le range HTML natif de
  // _renderProgress (mise en page large) n'a pas d'équivalent circulaire,
  // donc drag au doigt géré à la main via Pointer Events : down capture le
  // pointeur sur l'anneau et fige _seekDragFrac (le rendu suit alors le
  // doigt, pas l'état HA réel) ; move met à jour cette fraction ; up envoie
  // le seek réel puis relâche - un seul appel de service en fin de geste,
  // pas un par pixel (même logique que l'input range en large : @change,
  // pas @input). setPointerCapture sur down garantit que move/up
  // continuent d'arriver même si le doigt sort du cercle en cours de
  // geste (comportement standard d'un slider).
  _onRingPointerDown(t, e) {
    this._supports(t, m.SEEK) && (e.currentTarget.setPointerCapture(e.pointerId), this._seekDragFrac = this._fracFromPointerEvent(e));
  }
  _onRingPointerMove(t) {
    this._seekDragFrac != null && (this._seekDragFrac = this._fracFromPointerEvent(t));
  }
  _onRingPointerUp(t, e) {
    if (this._seekDragFrac == null) return;
    const i = t.attributes.media_duration, r = this._seekDragFrac;
    this._seekDragFrac = null, i != null && this._call("media_player", "media_seek", t.entity_id, {
      seek_position: r * i
    });
  }
  // Angle depuis midi (12h), sens horaire, normalisé en fraction 0-1 - même
  // convention que le remplissage de l'anneau (stroke-dasharray sur un
  // cercle tourné de -90deg, cf. styles). atan2(dx, -dy) plutôt que le
  // atan2(dy, dx) habituel : place directement le zéro en haut et fait
  // croître l'angle dans le sens horaire, sans étape de conversion en plus.
  _fracFromPointerEvent(t) {
    const e = t.currentTarget.closest("svg").getBoundingClientRect(), i = t.clientX - (e.left + e.width / 2), r = t.clientY - (e.top + e.height / 2);
    let s = Math.atan2(i, -r);
    return s < 0 && (s += 2 * Math.PI), s / (2 * Math.PI);
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
      const r = t.attributes.group_members || [];
      this._call("media_player", "join", t.entity_id, {
        group_members: [.../* @__PURE__ */ new Set([...r, e])]
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
    const t = this._config, e = t.layout === "round", i = t.satellite_entity ? this._hass.states[t.satellite_entity] : void 0, r = this._isNightMode(i);
    this.classList.toggle("night", r);
    const s = this._stateObj(), o = `card ${e ? "round" : ""}`;
    if (!s || ["unavailable", "unknown"].includes(s.state))
      return d`
        <div class=${o} style=${this._cardStyle()}>
          ${e ? this._renderRoundEmpty() : this._renderLandscapeEmpty()}
        </div>
      `;
    const l = s.state === "playing";
    return d`
      <div class=${o} style=${this._cardStyle()}>
        ${e ? this._renderRound(s, l) : this._renderLandscape(s, l)}
      </div>
    `;
  }
  // -------------------- Round (Echo Spot) --------------------
  _renderRound(t, e) {
    const i = t.attributes, r = this._hasArt(t), s = i.media_duration, o = lt(t), l = this._supports(t, m.SEEK) && s != null, a = l && this._seekDragFrac != null, p = a ? this._seekDragFrac : s ? Math.min(1, (o || 0) / s) : 0, u = a ? p * s : o;
    return d`
      <div class="art-layer ${r ? "" : "no-art"}">
        ${r ? d`<img
              class="art-img"
              src=${i.entity_picture}
              alt=""
              @error=${() => this._onArtError(i.entity_picture)}
            />` : this._renderVinyl(e)}
      </div>
      ${r ? d`<div class="scrim"></div>` : c}
      <svg class="ring ${a ? "dragging" : ""}" viewBox="0 0 100 100">
        <circle class="track" cx="50" cy="50" r="48" pathLength="100"></circle>
        <circle
          class="fill"
          cx="50"
          cy="50"
          r="48"
          pathLength="100"
          style="stroke-dasharray:${(p * 100).toFixed(2)} 100"
        ></circle>
        ${l ? d`<circle
              class="hit-area"
              cx="50"
              cy="50"
              r="48"
              pathLength="100"
              aria-label="Position de lecture"
              @pointerdown=${(h) => this._onRingPointerDown(t, h)}
              @pointermove=${(h) => this._onRingPointerMove(h)}
              @pointerup=${(h) => this._onRingPointerUp(t, h)}
              @pointercancel=${(h) => this._onRingPointerUp(t, h)}
            ></circle>` : c}
      </svg>
      <div class="content">
        ${s != null ? d`<span class="time">${L(u)} / ${L(s)}</span>` : c}
        <div class="track-title">${i.media_title || "—"}</div>
        ${i.media_artist ? d`<div class="track-artist">${i.media_artist}</div>` : c}
        ${this._renderTransportCompact(t, e)}
      </div>
    `;
  }
  _renderRoundEmpty() {
    return d`
      <div class="art-layer no-art">${this._renderVinyl(!1)}</div>
      <div class="content">
        <div class="track-title empty">
          ${this._config.media_player_entity ? "Aucune lecture" : "Aucun lecteur configuré"}
        </div>
      </div>
    `;
  }
  _renderTransportCompact(t, e) {
    const i = this._supports(t, m.PREVIOUS_TRACK), r = this._supports(t, m.NEXT_TRACK);
    return d`
      <div class="transport">
        ${i ? d`<button class="ctrl small" aria-label="Précédent" @click=${() => this._prev(t)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : c}
        <button
          class="ctrl play"
          aria-label=${e ? "Pause" : "Lecture"}
          @click=${() => this._playPause(t)}
        >
          <ha-icon icon=${e ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${r ? d`<button class="ctrl small" aria-label="Suivant" @click=${() => this._next(t)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : c}
      </div>
    `;
  }
  // -------------------- Large (Echo Show) --------------------
  _renderLandscape(t, e) {
    var g, f;
    const i = this._config, r = t.attributes, s = this._hasArt(t), o = r.media_duration, l = lt(t), a = o ? Math.min(1, (l || 0) / o) : 0, p = i.language || ((g = this._hass.locale) == null ? void 0 : g.language) || "en", u = i.time_format || ((f = this._hass.locale) == null ? void 0 : f.time_format) || "24", h = r.source || r.app_name, _ = [r.media_artist, r.media_album_name].filter(Boolean).join(" — ");
    return d`
      <div class="art-col ${s ? "with-art" : "no-art"}">
        ${s ? d`<img
              class="art-img"
              src=${r.entity_picture}
              alt=""
              @error=${() => this._onArtError(r.entity_picture)}
            />` : this._renderVinyl(e)}
      </div>
      <div class="info-col">
        <div class="top-row">
          <div class="device-name">
            <ha-icon icon="mdi:speaker"></ha-icon>
            <span>${r.friendly_name || ""}</span>
          </div>
          ${i.show_clock ? d`<span class="clock">${Bt(/* @__PURE__ */ new Date(), p, u)}</span>` : c}
        </div>
        <div class="title-block">
          ${h ? d`<span class="eyebrow-src">${h}</span>` : c}
          <h3 class="track-title-lg">${r.media_title || "—"}</h3>
          ${_ ? d`<span class="track-meta">${_}</span>` : c}
        </div>
        ${o != null ? this._renderProgress(t, l, o, a) : c}
        ${this._renderTransportFull(t, e)}
        ${i.show_volume && this._supports(t, m.VOLUME_SET) ? this._renderVolume(t) : c}
        ${this._renderChips(t)}
      </div>
    `;
  }
  _renderLandscapeEmpty() {
    return d`
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
  _renderProgress(t, e, i, r) {
    const s = this._supports(t, m.SEEK);
    return d`
      <div class="progress-row">
        <time>${L(e)}</time>
        <div class="bar">
          <div class="fill" style="width:${(r * 100).toFixed(2)}%"></div>
          ${s ? d`<input
                type="range"
                class="range-overlay"
                min="0"
                max=${i}
                step="1"
                .value=${String(e != null ? e : 0)}
                aria-label="Position de lecture"
                @change=${(o) => this._seek(t, o)}
              />` : c}
        </div>
        <time>${L(i)}</time>
      </div>
    `;
  }
  _renderTransportFull(t, e) {
    const i = this._config, r = t.attributes, s = this._supports(t, m.PREVIOUS_TRACK), o = this._supports(t, m.NEXT_TRACK), l = i.show_shuffle && this._supports(t, m.SHUFFLE_SET) && r.shuffle !== void 0, a = i.show_repeat && this._supports(t, m.REPEAT_SET) && r.repeat !== void 0;
    return d`
      <div class="transport-lg">
        ${l ? d`<button
              class="ctrl ghost-sm ${r.shuffle ? "active" : ""}"
              aria-label="Lecture aléatoire"
              aria-pressed=${r.shuffle ? "true" : "false"}
              @click=${() => this._toggleShuffle(t)}
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>` : c}
        ${s ? d`<button class="ctrl mid" aria-label="Précédent" @click=${() => this._prev(t)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : c}
        <button
          class="ctrl play-lg"
          aria-label=${e ? "Pause" : "Lecture"}
          @click=${() => this._playPause(t)}
        >
          <ha-icon icon=${e ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${o ? d`<button class="ctrl mid" aria-label="Suivant" @click=${() => this._next(t)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : c}
        ${a ? d`<button
              class="ctrl ghost-sm ${r.repeat && r.repeat !== "off" ? "active" : ""}"
              aria-label="Répéter"
              aria-pressed=${r.repeat && r.repeat !== "off" ? "true" : "false"}
              @click=${() => this._cycleRepeat(t)}
            >
              <ha-icon icon=${r.repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}></ha-icon>
            </button>` : c}
      </div>
    `;
  }
  _renderVolume(t) {
    var s;
    const e = t.attributes, i = (s = e.volume_level) != null ? s : 0, r = e.is_volume_muted || i === 0 ? "mdi:volume-off" : i < 0.5 ? "mdi:volume-medium" : "mdi:volume-high";
    return d`
      <div class="volume-row">
        <ha-icon icon=${r}></ha-icon>
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
            @input=${(o) => this._setVolume(t, o)}
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
    var p;
    const e = this._config, i = t.attributes, r = [];
    if (e.show_source && this._supports(t, Kt) && ((p = i.source_list) == null ? void 0 : p.length) && r.push(d`
        <button
          class="chip"
          aria-expanded=${this._sourcesOpen ? "true" : "false"}
          @click=${() => {
      this._sourcesOpen = !this._sourcesOpen, this._groupOpen = !1;
    }}
        >
          <ha-icon icon="mdi:cast"></ha-icon>Sources
        </button>
      `), e.show_group && this._supports(t, m.GROUPING) && e.group_entities.length && r.push(d`
        <button
          class="chip"
          aria-expanded=${this._groupOpen ? "true" : "false"}
          @click=${() => {
      this._groupOpen = !this._groupOpen, this._sourcesOpen = !1;
    }}
        >
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>Groupe
        </button>
      `), e.show_queue && e.dashboard && (e.navigate_device || e.satellite_entity) && r.push(d`
        <button class="chip" @click=${() => this._navigateToQueue()}>
          <ha-icon icon="mdi:playlist-music"></ha-icon>File d'attente
        </button>
      `), !r.length) return c;
    const a = this._sourcesOpen || this._groupOpen;
    return d`
      <div class="chip-row">${r}</div>
      ${a ? d`<div
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
    return d`
      <div class="popover" role="listbox" @click=${(i) => i.stopPropagation()}>
        ${e.source_list.map(
      (i) => d`
            <button
              class="popover-item ${i === e.source ? "current" : ""}"
              role="option"
              aria-selected=${i === e.source ? "true" : "false"}
              @click=${() => this._selectSource(t, i)}
            >
              ${i === e.source ? d`<ha-icon icon="mdi:check"></ha-icon>` : c}
              <span>${i}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  _renderGroupPopover(t) {
    const e = t.attributes.group_members || [];
    return d`
      <div class="popover" @click=${(i) => i.stopPropagation()}>
        ${this._config.group_entities.map((i) => {
      var l;
      const r = this._hass.states[i], s = ((l = r == null ? void 0 : r.attributes) == null ? void 0 : l.friendly_name) || i, o = e.includes(i);
      return d`
            <button
              class="popover-item ${o ? "current" : ""}"
              aria-pressed=${o ? "true" : "false"}
              @click=${() => this._toggleGroupMember(t, i, o)}
            >
              <ha-icon icon=${o ? "mdi:speaker-multiple" : "mdi:speaker-off"}></ha-icon>
              <span>${s}</span>
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
    return d`
      <div class="vinyl-wrap ${t ? "spinning" : ""}">
        <div class="vinyl"></div>
        <div class="label"></div>
      </div>
      <div class="tonearm"></div>
    `;
  }
}
q(W, "properties", {
  _config: { state: !0 },
  _artFailedUrl: { state: !0 },
  // dernière entity_picture qui a fait
  // échouer le <img> (404, réseau...) — bascule sur le vinyle tant que
  // l'intégration ne fournit pas une URL différente (cf. _hasArt)
  _sourcesOpen: { state: !0 },
  _groupOpen: { state: !0 },
  _seekDragFrac: { state: !0 }
  // 0-1 position while dragging the round ring
  // (see _renderRound/_onRingPointer*) - null when not dragging, so the ring
  // falls back to the real, HA-reported position.
}), q(W, "styles", kt`
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
    /* Pendant un drag, le doigt doit être suivi immédiatement : la
       transition normale (qui lisse l'avancée automatique entre deux
       updates HA) donnerait un anneau "en retard" sur le geste. */
    .card.round .ring.dragging .fill {
      transition: none;
    }
    /* Cercle invisible plus épais que le trait visible, posé par-dessus
       l'anneau pour agrandir la zone tactile réellement saisissable au
       doigt (2.2 de trait est bien trop fin à viser sur un écran rond de
       montre/Echo Spot). pointer-events: stroke plutôt que "all" pour
       ne capter que la bande de l'anneau, pas tout le disque intérieur
       (qui doit rester cliquable pour play/pause au centre). */
    .card.round .ring .hit-area {
      stroke: transparent;
      stroke-width: 22;
      pointer-events: stroke;
      cursor: grab;
      touch-action: none;
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
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: 2px;
    }
    .card.round .track-title {
      font-weight: 600;
      font-size: clamp(1.15rem, 5.6vw, 1.4rem);
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
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.72);
    }
    .card.round .transport {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 6px;
    }
    .card.round .ctrl.small {
      width: 38px;
      height: 38px;
      font-size: 19px;
    }
    .card.round .ctrl.play {
      width: 58px;
      height: 58px;
      font-size: 28px;
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
