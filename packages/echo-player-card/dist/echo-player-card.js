var xe = Object.defineProperty;
var we = (n, e, t) => e in n ? xe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var O = (n, e, t) => we(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, X = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), Y = /* @__PURE__ */ new WeakMap();
let ge = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Y.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Y.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ke = (n) => new ge(typeof n == "string" ? n : n + "", void 0, J), Ae = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[s + 1], n[0]);
  return new ge(t, n, J);
}, Ee = (n, e) => {
  if (X) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = H.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, n.appendChild(i);
  }
}, Z = X ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ke(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Se, defineProperty: Pe, getOwnPropertyDescriptor: Ce, getOwnPropertyNames: Te, getOwnPropertySymbols: Re, getPrototypeOf: ze } = Object, $ = globalThis, j = $.trustedTypes, Me = j ? j.emptyScript : "", V = $.reactiveElementPolyfillSupport, C = (n, e) => n, G = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Me : null;
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
} }, fe = (n, e) => !Se(n, e), ee = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: fe };
var ce, de;
(ce = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (de = $.litPropertyMetadata) != null || ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ee) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Pe(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: r, set: s } = (o = Ce(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: r, set(l) {
      const a = r == null ? void 0 : r.call(this);
      s == null || s.call(this, l), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ee;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = ze(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, i = [...Te(t), ...Re(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(Z(r));
    } else e !== void 0 && t.push(Z(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Ee(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var r;
      return (r = i.hostConnected) == null ? void 0 : r.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var s;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : G).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, o, l;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), u = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : G;
      this._$Em = r;
      const p = u.fromAttribute(t, a.type);
      this[r] = (l = p != null ? p : (o = this._$Ej) == null ? void 0 : o.get(r)) != null ? l : p, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, s) {
    var o, l;
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (s = this[e]), i != null || (i = a.getPropertyOptions(e)), !(((o = i.hasChanged) != null ? o : fe)(s, t) || i.useDefault && i.reflect && s === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: s }, o) {
    var l, a, u;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = o != null ? o : t) != null ? a : this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && ((u = this._$Eq) != null ? u : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var i, r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, l] of s) {
        const { wrapped: a } = l, u = this[o];
        a !== !0 || this._$AL.has(o) || u === void 0 || this.C(o, void 0, l, u);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
var he;
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: A }), ((he = $.reactiveElementVersions) != null ? he : $.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, te = (n) => n, L = T.trustedTypes, ie = L ? L.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, me = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, ve = "?" + v, Ue = `<${ve}>`, k = document, z = () => k.createComment(""), M = (n) => n === null || typeof n != "object" && typeof n != "function", Q = Array.isArray, Ne = (n) => Q(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, re = /-->/g, se = />/g, y = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, ne = /"/g, $e = /^(?:script|style|textarea|title)$/i, De = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), h = De(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), x = k.createTreeWalker(k, 129);
function ye(n, e) {
  if (!Q(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(e) : e;
}
const Fe = (n, e) => {
  const t = n.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = P;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let u, p, c = -1, _ = 0;
    for (; _ < a.length && (o.lastIndex = _, p = o.exec(a), p !== null); ) _ = o.lastIndex, o === P ? p[1] === "!--" ? o = re : p[1] !== void 0 ? o = se : p[2] !== void 0 ? ($e.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = y) : p[3] !== void 0 && (o = y) : o === y ? p[0] === ">" ? (o = r != null ? r : P, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, u = p[1], o = p[3] === void 0 ? y : p[3] === '"' ? ne : oe) : o === ne || o === oe ? o = y : o === re || o === se ? o = P : (o = y, r = void 0);
    const g = o === y && n[l + 1].startsWith("/>") ? " " : "";
    s += o === P ? a + Ue : c >= 0 ? (i.push(u), a.slice(0, c) + me + a.slice(c) + v + g) : a + v + (c === -2 ? l : g);
  }
  return [ye(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [u, p] = Fe(e, t);
    if (this.el = U.createElement(u, i), x.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = x.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(me)) {
          const _ = p[o++], g = r.getAttribute(c).split(v), f = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: s, name: f[2], strings: g, ctor: f[1] === "." ? Le : f[1] === "?" ? qe : f[1] === "@" ? Oe : q }), r.removeAttribute(c);
        } else c.startsWith(v) && (a.push({ type: 6, index: s }), r.removeAttribute(c));
        if ($e.test(r.tagName)) {
          const c = r.textContent.split(v), _ = c.length - 1;
          if (_ > 0) {
            r.textContent = L ? L.emptyScript : "";
            for (let g = 0; g < _; g++) r.append(c[g], z()), x.nextNode(), a.push({ type: 2, index: ++s });
            r.append(c[_], z());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ve) a.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(v, c + 1)) !== -1; ) a.push({ type: 7, index: s }), c += v.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = k.createElement("template");
    return i.innerHTML = e, i;
  }
}
function S(n, e, t = n, i) {
  var o, l, a;
  if (e === E) return e;
  let r = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const s = M(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), s === void 0 ? r = void 0 : (r = new s(n), r._$AT(n, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = r : t._$Cl = r), r !== void 0 && (e = S(n, r._$AS(n, e.values), r, i)), e;
}
class He {
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
    var u;
    const { el: { content: t }, parts: i } = this._$AD, r = ((u = e == null ? void 0 : e.creationScope) != null ? u : k).importNode(t, !0);
    x.currentNode = r;
    let s = x.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let p;
        a.type === 2 ? p = new N(s, s.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (p = new Ve(s, this, e)), this._$AV.push(p), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (s = x.nextNode(), o++);
    }
    return x.currentNode = k, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class N {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, r) {
    var s;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = (s = r == null ? void 0 : r.isConnected) != null ? s : !0;
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
    e = S(this, e, t), M(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ne(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && M(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = U.createElement(ye(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(t);
    else {
      const o = new He(r, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = ae.get(e.strings);
    return t === void 0 && ae.set(e.strings, t = new U(e)), t;
  }
  k(e) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const s of e) r === t.length ? t.push(i = new N(this.O(z()), this.O(z()), this, this.options)) : i = t[r], i._$AI(s), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = te(e).nextSibling;
      te(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, s) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = S(this, e, t, 0), o = !M(e) || e !== this._$AH && e !== E, o && (this._$AH = e);
    else {
      const l = e;
      let a, u;
      for (e = s[0], a = 0; a < s.length - 1; a++) u = S(this, l[i + a], t, a), u === E && (u = this._$AH[a]), o || (o = !M(u) || u !== this._$AH[a]), u === d ? e = d : e !== d && (e += (u != null ? u : "") + s[a + 1]), this._$AH[a] = u;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Le extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class qe extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Oe extends q {
  constructor(e, t, i, r, s) {
    super(e, t, i, r, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = S(this, e, t, 0)) != null ? o : d) === E) return;
    const i = this._$AH, r = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ve {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    S(this, e);
  }
}
const B = T.litHtmlPolyfillSupport;
var ue;
B == null || B(U, N), ((ue = T.litHtmlVersions) != null ? ue : T.litHtmlVersions = []).push("3.3.3");
const Ie = (n, e, t) => {
  var s, o;
  const i = (s = t == null ? void 0 : t.renderBefore) != null ? s : e;
  let r = i._$litPart$;
  if (r === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = r = new N(e.insertBefore(z(), l), l, void 0, t != null ? t : {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class R extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, i;
    const e = super.createRenderRoot();
    return (i = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
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
var pe;
R._$litElement$ = !0, R.finalized = !0, (pe = w.litElementHydrateSupport) == null || pe.call(w, { LitElement: R });
const K = w.litElementPolyfillSupport;
K == null || K({ LitElement: R });
var _e;
((_e = w.litElementVersions) != null ? _e : w.litElementVersions = []).push("4.2.2");
const be = "echo-player-card", m = {
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
function F(n) {
  if (n == null || !Number.isFinite(n) || n < 0)
    return "–:––";
  const e = Math.floor(n), t = Math.floor(e / 3600), i = Math.floor(e % 3600 / 60), r = e % 60, s = (o) => String(o).padStart(2, "0");
  return t > 0 ? `${t}:${s(i)}:${s(r)}` : `${i}:${s(r)}`;
}
function Be(n, e, t) {
  const i = t === "12";
  try {
    return new Intl.DateTimeFormat(e, {
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
function le(n) {
  const e = (n == null ? void 0 : n.attributes) || {};
  if (e.media_position == null) return null;
  let t = e.media_position;
  if (n.state === "playing" && e.media_position_updated_at) {
    const i = new Date(e.media_position_updated_at).getTime();
    Number.isNaN(i) || (t += Math.max(0, (Date.now() - i) / 1e3));
  }
  return e.media_duration != null && (t = Math.min(t, e.media_duration)), Math.max(0, t);
}
const Ke = 2048;
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
  setConfig(e) {
    const t = { ...b, ...e };
    this._config = this._validateConfig(t, e || {});
  }
  _validateConfig(e, t) {
    const i = (r, s) => console.warn(
      `[echo-player-card] "${r}" invalide (${JSON.stringify(t[r])}), valeur par défaut utilisée (${JSON.stringify(s)})`
    );
    return e.layout !== null && e.layout !== "round" && (i("layout", b.layout), e.layout = b.layout), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (i("zoom", b.zoom), e.zoom = b.zoom), Array.isArray(e.group_entities) || (i("group_entities", b.group_entities), e.group_entities = b.group_entities), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-player-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — la puce "File d'attente" ne sera pas cliquable.`
    ), e.media_player_entity || console.warn(
      `[echo-player-card] "media_player_entity" n'est pas configuré — la carte affichera un état "aucun lecteur configuré".`
    ), e;
  }
  static getStubConfig(e) {
    const t = Object.keys(e.states).find(
      (i) => i.startsWith("media_player.")
    );
    return t ? { media_player_entity: t } : {};
  }
  getCardSize() {
    return 6;
  }
  connectedCallback() {
    super.connectedCallback(), this._positionTimer = setInterval(() => {
      var e;
      ((e = this._stateObj()) == null ? void 0 : e.state) === "playing" && this.requestUpdate();
    }, 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._positionTimer);
  }
  _stateObj() {
    var e, t;
    return (e = this._config) != null && e.media_player_entity ? (t = this._hass) == null ? void 0 : t.states[this._config.media_player_entity] : void 0;
  }
  set hass(e) {
    var p, c, _, g;
    const t = this._config, i = (p = this._hass) == null ? void 0 : p.states[t == null ? void 0 : t.media_player_entity], r = (c = this._hass) == null ? void 0 : c.states[t == null ? void 0 : t.satellite_entity], s = (_ = t == null ? void 0 : t.group_entities) == null ? void 0 : _.map((f) => {
      var D;
      return (D = this._hass) == null ? void 0 : D.states[f];
    });
    if (this._hass = e, !t) return;
    const o = e.states[t.media_player_entity], l = e.states[t.satellite_entity], a = (g = t.group_entities) == null ? void 0 : g.map((f) => e.states[f]), u = (s == null ? void 0 : s.length) !== (a == null ? void 0 : a.length) || (a == null ? void 0 : a.some((f, D) => f !== s[D]));
    (i !== o || r !== l || u) && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _isNightMode(e) {
    var t;
    return ((t = e == null ? void 0 : e.attributes) == null ? void 0 : t.mode) === "night";
  }
  _supports(e, t) {
    return ((e.attributes.supported_features || 0) & t) === t;
  }
  // Une pochette est "disponible" tant que l'URL fournie n'est pas celle
  // qui a déjà échoué au chargement (cf. _onArtError) — une nouvelle URL
  // (changement de morceau) retente toujours, même si la précédente
  // avait échoué.
  _hasArt(e) {
    const t = e.attributes.entity_picture;
    return !!t && t !== this._artFailedUrl;
  }
  _onArtError(e) {
    this._artFailedUrl = e;
  }
  _call(e, t, i, r) {
    this._hass.callService(e, t, { entity_id: i, ...r || {} });
  }
  _playPause(e) {
    this._call("media_player", "media_play_pause", e.entity_id);
  }
  _prev(e) {
    this._call("media_player", "media_previous_track", e.entity_id);
  }
  _next(e) {
    this._call("media_player", "media_next_track", e.entity_id);
  }
  _toggleShuffle(e) {
    this._call("media_player", "shuffle_set", e.entity_id, {
      shuffle: !e.attributes.shuffle
    });
  }
  _cycleRepeat(e) {
    const t = { off: "all", all: "one", one: "off" }[e.attributes.repeat || "off"];
    this._call("media_player", "repeat_set", e.entity_id, { repeat: t || "off" });
  }
  _setVolume(e, t) {
    this._call("media_player", "volume_set", e.entity_id, {
      volume_level: Number(t.target.value)
    });
  }
  _seek(e, t) {
    this._call("media_player", "media_seek", e.entity_id, {
      seek_position: Number(t.target.value)
    });
  }
  // Recherche tactile sur l'anneau (mode round) — le range HTML natif de
  // _renderProgress (mise en page large) n'a pas d'équivalent circulaire,
  // donc drag au doigt géré à la main : down fige _seekDragFrac (le rendu
  // suit alors le doigt, pas l'état HA réel) ; move met à jour cette
  // fraction ; l'arrêt du geste envoie le seek réel puis relâche - un
  // seul appel de service en fin de geste, pas un par pixel (même logique
  // que l'input range en large : @change, pas @input).
  //
  // Pointer Events *et* Touch Events, en double, sur la même zone : la
  // cible n'est plus une forme SVG (cf. _renderRound, hit-area est
  // maintenant un <div> HTML superposé) car pointer-events/setPointerCapture
  // sur un élément SVG s'est avéré peu fiable sur la WebView système d'un
  // Echo Spot sous LineageOS (pas de mise à jour WebView via Play Store) -
  // le geste ne déclenchait tout simplement rien. Touch Events est l'API
  // historique, plus largement supportée ; on la garde en repli même si
  // Pointer Events fonctionne ailleurs, plutôt que de parier sur un seul
  // mécanisme pour un appareil qu'on ne peut pas tester nous-même.
  _onRingPointerDown(e, t) {
    var i, r;
    this._supports(e, m.SEEK) && ((r = (i = t.currentTarget).setPointerCapture) == null || r.call(i, t.pointerId), this._seekDragFrac = this._fracFromPoint(t.currentTarget, t.clientX, t.clientY));
  }
  _onRingPointerMove(e) {
    this._seekDragFrac != null && (this._seekDragFrac = this._fracFromPoint(e.currentTarget, e.clientX, e.clientY));
  }
  _onRingPointerUp(e, t) {
    this._commitSeek(e);
  }
  // pointercancel = geste repris par autre chose (ex: scroll de la page) -
  // on abandonne sans envoyer de seek plutôt que de committer une position
  // potentiellement issue d'un dernier move non représentatif du doigt.
  _onRingPointerCancel() {
    this._seekDragFrac = null;
  }
  _onRingTouchStart(e, t) {
    if (!this._supports(e, m.SEEK)) return;
    t.preventDefault();
    const i = t.touches[0];
    this._seekDragFrac = this._fracFromPoint(t.currentTarget, i.clientX, i.clientY);
  }
  _onRingTouchMove(e) {
    if (this._seekDragFrac == null) return;
    e.preventDefault();
    const t = e.touches[0];
    this._seekDragFrac = this._fracFromPoint(e.currentTarget, t.clientX, t.clientY);
  }
  _onRingTouchEnd(e, t) {
    t.preventDefault(), this._commitSeek(e);
  }
  _onRingTouchCancel() {
    this._seekDragFrac = null;
  }
  _commitSeek(e) {
    if (this._seekDragFrac == null) return;
    const t = e.attributes.media_duration, i = this._seekDragFrac;
    this._seekDragFrac = null, t != null && this._call("media_player", "media_seek", e.entity_id, {
      seek_position: i * t
    });
  }
  // Angle depuis midi (12h), sens horaire, normalisé en fraction 0-1 - même
  // convention que le remplissage de l'anneau (stroke-dasharray sur un
  // cercle tourné de -90deg, cf. styles). atan2(dx, -dy) plutôt que le
  // atan2(dy, dx) habituel : place directement le zéro en haut et fait
  // croître l'angle dans le sens horaire, sans étape de conversion en plus.
  // Indépendant du rayon (seul l'angle compte) : peu importe où sur le
  // disque le doigt appuie, pas seulement sur le trait de l'anneau lui-même.
  _fracFromPoint(e, t, i) {
    const r = e.getBoundingClientRect(), s = t - (r.left + r.width / 2), o = i - (r.top + r.height / 2);
    let l = Math.atan2(s, -o);
    return l < 0 && (l += 2 * Math.PI), l / (2 * Math.PI);
  }
  _selectSource(e, t) {
    this._call("media_player", "select_source", e.entity_id, { source: t }), this._sourcesOpen = !1;
  }
  // "join" cible le lecteur principal (data.group_members = la liste
  // complète souhaitée) ; "unjoin" cible directement le membre qui doit
  // quitter le groupe — deux services HA génériques, pas symétriques en
  // paramètres (cf. doc media_player).
  _toggleGroupMember(e, t, i) {
    if (i)
      this._call("media_player", "unjoin", t);
    else {
      const r = e.attributes.group_members || [];
      this._call("media_player", "join", e.entity_id, {
        group_members: [.../* @__PURE__ */ new Set([...r, t])]
      });
    }
  }
  _navigateToQueue() {
    const e = this._config, t = e.navigate_device || e.satellite_entity, i = `${e.dashboard}/${e.queue_view}`;
    this._hass.callService("view_assist", "navigate", { device: t, path: i });
  }
  _cardStyle() {
    return this._config.zoom != null && this._config.zoom !== 1 ? `zoom:${this._config.zoom}` : "";
  }
  render() {
    if (!this._config || !this._hass) return d;
    const e = this._config, t = e.layout === "round", i = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, r = this._isNightMode(i);
    this.classList.toggle("night", r);
    const s = this._stateObj(), o = `card ${t ? "round" : ""}`;
    if (!s || ["unavailable", "unknown"].includes(s.state))
      return h`
        <div class=${o} style=${this._cardStyle()}>
          ${t ? this._renderRoundEmpty() : this._renderLandscapeEmpty()}
        </div>
      `;
    const l = s.state === "playing";
    return h`
      <div class=${o} style=${this._cardStyle()}>
        ${t ? this._renderRound(s, l) : this._renderLandscape(s, l)}
      </div>
    `;
  }
  // -------------------- Round (Echo Spot) --------------------
  _renderRound(e, t) {
    const i = e.attributes, r = this._hasArt(e), s = i.media_duration, o = le(e), l = this._supports(e, m.SEEK) && s != null, a = l && this._seekDragFrac != null, u = a ? this._seekDragFrac : s ? Math.min(1, (o || 0) / s) : 0, p = a ? u * s : o;
    return h`
      <div class="art-layer ${r ? "" : "no-art"}">
        ${r ? h`<img
              class="art-img"
              src=${i.entity_picture}
              alt=""
              @error=${() => this._onArtError(i.entity_picture)}
            />` : this._renderVinyl(t)}
      </div>
      ${r ? h`<div class="scrim"></div>` : d}
      <svg class="ring ${a ? "dragging" : ""}" viewBox="0 0 100 100">
        <circle class="track" cx="50" cy="50" r="48" pathLength="100"></circle>
        <circle
          class="fill"
          cx="50"
          cy="50"
          r="48"
          pathLength="100"
          style="stroke-dasharray:${(u * 100).toFixed(2)} 100"
        ></circle>
      </svg>
      ${l ? h`<div
            class="hit-area"
            role="slider"
            aria-label="Position de lecture"
            aria-valuemin="0"
            aria-valuemax=${s}
            aria-valuenow=${Math.round(p || 0)}
            @pointerdown=${(c) => this._onRingPointerDown(e, c)}
            @pointermove=${(c) => this._onRingPointerMove(c)}
            @pointerup=${(c) => this._onRingPointerUp(e, c)}
            @pointercancel=${() => this._onRingPointerCancel()}
            @touchstart=${(c) => this._onRingTouchStart(e, c)}
            @touchmove=${(c) => this._onRingTouchMove(c)}
            @touchend=${(c) => this._onRingTouchEnd(e, c)}
            @touchcancel=${() => this._onRingTouchCancel()}
          ></div>` : d}
      <div class="content">
        ${s != null ? h`<span class="time">${F(p)} / ${F(s)}</span>` : d}
        <div class="track-title">${i.media_title || "—"}</div>
        ${i.media_artist ? h`<div class="track-artist">${i.media_artist}</div>` : d}
        ${this._renderTransportCompact(e, t)}
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
  _renderTransportCompact(e, t) {
    const i = this._supports(e, m.PREVIOUS_TRACK), r = this._supports(e, m.NEXT_TRACK);
    return h`
      <div class="transport">
        ${i ? h`<button class="ctrl small" aria-label="Précédent" @click=${() => this._prev(e)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : d}
        <button
          class="ctrl play"
          aria-label=${t ? "Pause" : "Lecture"}
          @click=${() => this._playPause(e)}
        >
          <ha-icon icon=${t ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${r ? h`<button class="ctrl small" aria-label="Suivant" @click=${() => this._next(e)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : d}
      </div>
    `;
  }
  // -------------------- Large (Echo Show) --------------------
  _renderLandscape(e, t) {
    var g, f;
    const i = this._config, r = e.attributes, s = this._hasArt(e), o = r.media_duration, l = le(e), a = o ? Math.min(1, (l || 0) / o) : 0, u = i.language || ((g = this._hass.locale) == null ? void 0 : g.language) || "en", p = i.time_format || ((f = this._hass.locale) == null ? void 0 : f.time_format) || "24", c = r.source || r.app_name, _ = [r.media_artist, r.media_album_name].filter(Boolean).join(" — ");
    return h`
      <div class="art-col ${s ? "with-art" : "no-art"}">
        ${s ? h`<img
              class="art-img"
              src=${r.entity_picture}
              alt=""
              @error=${() => this._onArtError(r.entity_picture)}
            />` : this._renderVinyl(t)}
      </div>
      <div class="info-col">
        <div class="top-row">
          <div class="device-name">
            <ha-icon icon="mdi:speaker"></ha-icon>
            <span>${r.friendly_name || ""}</span>
          </div>
          ${i.show_clock ? h`<span class="clock">${Be(/* @__PURE__ */ new Date(), u, p)}</span>` : d}
        </div>
        <div class="title-block">
          ${c ? h`<span class="eyebrow-src">${c}</span>` : d}
          <h3 class="track-title-lg">${r.media_title || "—"}</h3>
          ${_ ? h`<span class="track-meta">${_}</span>` : d}
        </div>
        ${o != null ? this._renderProgress(e, l, o, a) : d}
        ${this._renderTransportFull(e, t)}
        ${i.show_volume && this._supports(e, m.VOLUME_SET) ? this._renderVolume(e) : d}
        ${this._renderChips(e)}
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
  _renderProgress(e, t, i, r) {
    const s = this._supports(e, m.SEEK);
    return h`
      <div class="progress-row">
        <time>${F(t)}</time>
        <div class="bar">
          <div class="fill" style="width:${(r * 100).toFixed(2)}%"></div>
          ${s ? h`<input
                type="range"
                class="range-overlay"
                min="0"
                max=${i}
                step="1"
                .value=${String(t != null ? t : 0)}
                aria-label="Position de lecture"
                @change=${(o) => this._seek(e, o)}
              />` : d}
        </div>
        <time>${F(i)}</time>
      </div>
    `;
  }
  _renderTransportFull(e, t) {
    const i = this._config, r = e.attributes, s = this._supports(e, m.PREVIOUS_TRACK), o = this._supports(e, m.NEXT_TRACK), l = i.show_shuffle && this._supports(e, m.SHUFFLE_SET) && r.shuffle !== void 0, a = i.show_repeat && this._supports(e, m.REPEAT_SET) && r.repeat !== void 0;
    return h`
      <div class="transport-lg">
        ${l ? h`<button
              class="ctrl ghost-sm ${r.shuffle ? "active" : ""}"
              aria-label="Lecture aléatoire"
              aria-pressed=${r.shuffle ? "true" : "false"}
              @click=${() => this._toggleShuffle(e)}
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>` : d}
        ${s ? h`<button class="ctrl mid" aria-label="Précédent" @click=${() => this._prev(e)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : d}
        <button
          class="ctrl play-lg"
          aria-label=${t ? "Pause" : "Lecture"}
          @click=${() => this._playPause(e)}
        >
          <ha-icon icon=${t ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${o ? h`<button class="ctrl mid" aria-label="Suivant" @click=${() => this._next(e)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : d}
        ${a ? h`<button
              class="ctrl ghost-sm ${r.repeat && r.repeat !== "off" ? "active" : ""}"
              aria-label="Répéter"
              aria-pressed=${r.repeat && r.repeat !== "off" ? "true" : "false"}
              @click=${() => this._cycleRepeat(e)}
            >
              <ha-icon icon=${r.repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}></ha-icon>
            </button>` : d}
      </div>
    `;
  }
  _renderVolume(e) {
    var s;
    const t = e.attributes, i = (s = t.volume_level) != null ? s : 0, r = t.is_volume_muted || i === 0 ? "mdi:volume-off" : i < 0.5 ? "mdi:volume-medium" : "mdi:volume-high";
    return h`
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
            @input=${(o) => this._setVolume(e, o)}
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
  _renderChips(e) {
    var u;
    const t = this._config, i = e.attributes, r = [];
    if (t.show_source && this._supports(e, Ke) && ((u = i.source_list) == null ? void 0 : u.length) && r.push(h`
        <button
          class="chip"
          aria-expanded=${this._sourcesOpen ? "true" : "false"}
          @click=${() => {
      this._sourcesOpen = !this._sourcesOpen, this._groupOpen = !1;
    }}
        >
          <ha-icon icon="mdi:cast"></ha-icon>Sources
        </button>
      `), t.show_group && this._supports(e, m.GROUPING) && t.group_entities.length && r.push(h`
        <button
          class="chip"
          aria-expanded=${this._groupOpen ? "true" : "false"}
          @click=${() => {
      this._groupOpen = !this._groupOpen, this._sourcesOpen = !1;
    }}
        >
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>Groupe
        </button>
      `), t.show_queue && t.dashboard && (t.navigate_device || t.satellite_entity) && r.push(h`
        <button class="chip" @click=${() => this._navigateToQueue()}>
          <ha-icon icon="mdi:playlist-music"></ha-icon>File d'attente
        </button>
      `), !r.length) return d;
    const a = this._sourcesOpen || this._groupOpen;
    return h`
      <div class="chip-row">${r}</div>
      ${a ? h`<div
            class="popover-backdrop"
            @click=${() => {
      this._sourcesOpen = !1, this._groupOpen = !1;
    }}
          ></div>` : d}
      ${this._sourcesOpen ? this._renderSourcesPopover(e) : d}
      ${this._groupOpen ? this._renderGroupPopover(e) : d}
    `;
  }
  _renderSourcesPopover(e) {
    const t = e.attributes;
    return h`
      <div class="popover" role="listbox" @click=${(i) => i.stopPropagation()}>
        ${t.source_list.map(
      (i) => h`
            <button
              class="popover-item ${i === t.source ? "current" : ""}"
              role="option"
              aria-selected=${i === t.source ? "true" : "false"}
              @click=${() => this._selectSource(e, i)}
            >
              ${i === t.source ? h`<ha-icon icon="mdi:check"></ha-icon>` : d}
              <span>${i}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  _renderGroupPopover(e) {
    const t = e.attributes.group_members || [];
    return h`
      <div class="popover" @click=${(i) => i.stopPropagation()}>
        ${this._config.group_entities.map((i) => {
      var l;
      const r = this._hass.states[i], s = ((l = r == null ? void 0 : r.attributes) == null ? void 0 : l.friendly_name) || i, o = t.includes(i);
      return h`
            <button
              class="popover-item ${o ? "current" : ""}"
              aria-pressed=${o ? "true" : "false"}
              @click=${() => this._toggleGroupMember(e, i, o)}
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
  _renderVinyl(e) {
    return h`
      <div class="vinyl-wrap ${e ? "spinning" : ""}">
        <div class="vinyl"></div>
        <div class="label"></div>
      </div>
      <div class="tonearm"></div>
    `;
  }
}
O(W, "properties", {
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
}), O(W, "styles", Ae`
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
    /* Pochette (et vinyle de repli) légèrement en retrait de l'anneau
       plutôt que pleine cadre jusqu'au bord de la carte : inset 4.5%
       donne un disque dont le bord tombe juste à l'intérieur du bord
       intérieur de l'anneau (~46.9/50, cf. .ring .track/.fill r=48
       stroke-width 2.2), avec un léger espace visible entre les deux.
       border-radius + overflow: hidden ici (plutôt que compter sur le
       clip circulaire de .card, qui touche le bord exact de la carte)
       pour que ce nouveau disque plus petit garde sa propre forme ronde,
       image comme vinyle. */
    .card.round .art-layer {
      position: absolute;
      inset: 4.5%;
      border-radius: 50%;
      overflow: hidden;
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
    /* Zone tactile de la recherche : un <div> HTML plein disque plutôt
       qu'une forme SVG (cf. render) - seul l'angle compte pour le calcul
       de position (_fracFromPoint), pas le rayon, donc pas besoin de
       limiter la zone à la bande de l'anneau elle-même. z-index 1 comme
       .ring (peint au-dessus grâce à l'ordre du DOM) mais toujours
       en-dessous de .content (z-index 2) : les boutons/texte du centre
       restent cliquables normalement, cette zone ne les recouvre pas
       visuellement en priorité. */
    .card.round .hit-area {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      z-index: 1;
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
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: 2px;
    }
    .card.round .track-title {
      font-weight: 600;
      font-size: clamp(1.7rem, 8.4vw, 2.1rem);
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
      font-size: 1.4rem;
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
customElements.define(be, W);
window.customCards = window.customCards || [];
window.customCards.push({
  type: be,
  name: "Echo Player Card",
  description: "Lecteur média plein écran pour smart displays (Echo Show, Echo Spot, View Assist)."
});
