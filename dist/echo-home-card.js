var ge = Object.defineProperty;
var ve = (r, e, t) => e in r ? ge(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var D = (r, e, t) => ve(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, B = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), K = /* @__PURE__ */ new WeakMap();
let de = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (B && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = K.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ye = (r) => new de(typeof r == "string" ? r : r + "", void 0, F), be = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new de(t, r, F);
}, we = (r, e) => {
  if (B) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = M.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, Z = B ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return ye(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ae, defineProperty: Ee, getOwnPropertyDescriptor: xe, getOwnPropertyNames: Se, getOwnPropertySymbols: Ce, getPrototypeOf: ke } = Object, m = globalThis, G = m.trustedTypes, ze = G ? G.emptyScript : "", q = m.reactiveElementPolyfillSupport, S = (r, e) => r, j = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? ze : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, ue = (r, e) => !Ae(r, e), X = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: ue };
var oe, ne;
(oe = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (ne = m.litPropertyMetadata) != null || (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = X) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Ee(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    var o;
    const { get: i, set: n } = (o = xe(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(h) {
      this[t] = h;
    } };
    return { get: i, set(h) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, h), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const e = ke(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const t = this.properties, s = [...Se(t), ...Ce(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(Z(i));
    } else e !== void 0 && t.push(Z(e));
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
    return we(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
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
    var n;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : j).toAttribute(t, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o, h;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : j;
      this._$Em = i;
      const c = l.fromAttribute(t, a.type);
      this[i] = (h = c != null ? c : (o = this._$Ej) == null ? void 0 : o.get(i)) != null ? h : c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    var o, h;
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[e]), s != null || (s = a.getPropertyOptions(e)), !(((o = s.hasChanged) != null ? o : ue)(n, t) || s.useDefault && s.reflect && n === ((h = this._$Ej) == null ? void 0 : h.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, o) {
    var h, a, l;
    s && !((h = this._$Ej) != null ? h : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = o != null ? o : t) != null ? a : this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var s, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, h] of this._$Ep) this[o] = h;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, h] of n) {
        const { wrapped: a } = h, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, h, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
var ae;
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[S("elementProperties")] = /* @__PURE__ */ new Map(), w[S("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: w }), ((ae = m.reactiveElementVersions) != null ? ae : m.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, Q = (r) => r, H = C.trustedTypes, Y = H ? H.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, pe = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + f, Pe = `<${_e}>`, y = document, z = () => y.createComment(""), P = (r) => r === null || typeof r != "object" && typeof r != "function", J = Array.isArray, Ue = (r) => J(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, te = />/g, $ = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ie = /"/g, fe = /^(?:script|style|textarea|title)$/i, Te = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), N = Te(1), A = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), re = /* @__PURE__ */ new WeakMap(), g = y.createTreeWalker(y, 129);
function me(r, e) {
  if (!J(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Y !== void 0 ? Y.createHTML(e) : e;
}
const Oe = (r, e) => {
  const t = r.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = x;
  for (let h = 0; h < t; h++) {
    const a = r[h];
    let l, c, d = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, c = o.exec(a), c !== null); ) p = o.lastIndex, o === x ? c[1] === "!--" ? o = ee : c[1] !== void 0 ? o = te : c[2] !== void 0 ? (fe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = $) : c[3] !== void 0 && (o = $) : o === $ ? c[0] === ">" ? (o = i != null ? i : x, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? $ : c[3] === '"' ? ie : se) : o === ie || o === se ? o = $ : o === ee || o === te ? o = x : (o = $, i = void 0);
    const _ = o === $ && r[h + 1].startsWith("/>") ? " " : "";
    n += o === x ? a + Pe : d >= 0 ? (s.push(l), a.slice(0, d) + pe + a.slice(d) + f + _) : a + f + (d === -2 ? h : _);
  }
  return [me(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = e.length - 1, a = this.parts, [l, c] = Oe(e, t);
    if (this.el = U.createElement(l, s), g.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(pe)) {
          const p = c[o++], _ = i.getAttribute(d).split(f), O = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: O[2], strings: _, ctor: O[1] === "." ? Me : O[1] === "?" ? He : O[1] === "@" ? Re : R }), i.removeAttribute(d);
        } else d.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(d));
        if (fe.test(i.tagName)) {
          const d = i.textContent.split(f), p = d.length - 1;
          if (p > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let _ = 0; _ < p; _++) i.append(d[_], z()), g.nextNode(), a.push({ type: 2, index: ++n });
            i.append(d[p], z());
          }
        }
      } else if (i.nodeType === 8) if (i.data === _e) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(f, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += f.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = y.createElement("template");
    return s.innerHTML = e, s;
  }
}
function E(r, e, t = r, s) {
  var o, h, a;
  if (e === A) return e;
  let i = s !== void 0 ? (o = t._$Co) == null ? void 0 : o[s] : t._$Cl;
  const n = P(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, t, s)), s !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[s] = i : t._$Cl = i), i !== void 0 && (e = E(r, i._$AS(r, e.values), i, s)), e;
}
class Ne {
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
    var l;
    const { el: { content: t }, parts: s } = this._$AD, i = ((l = e == null ? void 0 : e.creationScope) != null ? l : y).importNode(t, !0);
    g.currentNode = i;
    let n = g.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new T(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new De(n, this, e)), this._$AV.push(c), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = g.nextNode(), o++);
    }
    return g.currentNode = y, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class T {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, s, i) {
    var n;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (n = i == null ? void 0 : i.isConnected) != null ? n : !0;
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
    e = E(this, e, t), P(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ue(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && P(this._$AH) ? this._$AA.nextSibling.data = e : this.T(y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = U.createElement(me(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const o = new Ne(i, this), h = o.u(this.options);
      o.p(t), this.T(h), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = re.get(e.strings);
    return t === void 0 && re.set(e.strings, t = new U(e)), t;
  }
  k(e) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new T(this.O(z()), this.O(z()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Q(e).nextSibling;
      Q(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, t = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = E(this, e, t, 0), o = !P(e) || e !== this._$AH && e !== A, o && (this._$AH = e);
    else {
      const h = e;
      let a, l;
      for (e = n[0], a = 0; a < n.length - 1; a++) l = E(this, h[s + a], t, a), l === A && (l = this._$AH[a]), o || (o = !P(l) || l !== this._$AH[a]), l === u ? e = u : e !== u && (e += (l != null ? l : "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Me extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class He extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Re extends R {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = E(this, e, t, 0)) != null ? o : u) === A) return;
    const s = this._$AH, i = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (t = this.options) == null ? void 0 : t.host) != null ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class De {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    E(this, e);
  }
}
const L = C.litHtmlPolyfillSupport;
var he;
L == null || L(U, T), ((he = C.litHtmlVersions) != null ? he : C.litHtmlVersions = []).push("3.3.3");
const qe = (r, e, t) => {
  var n, o;
  const s = (n = t == null ? void 0 : t.renderBefore) != null ? n : e;
  let i = s._$litPart$;
  if (i === void 0) {
    const h = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    s._$litPart$ = i = new T(e.insertBefore(z(), h), h, void 0, t != null ? t : {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class k extends w {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qe(t, this.renderRoot, this.renderOptions);
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
    return A;
  }
}
var le;
k._$litElement$ = !0, k.finalized = !0, (le = v.litElementHydrateSupport) == null || le.call(v, { LitElement: k });
const W = v.litElementPolyfillSupport;
W == null || W({ LitElement: k });
var ce;
((ce = v.litElementVersions) != null ? ce : v.litElementVersions = []).push("4.2.2");
const $e = "echo-home-card", Ie = "https://cdn.jsdelivr.net/npm/@meteocons/svg", b = {
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
  background: null,
  // override CSS `background` complet (couleur unie,
  // dégradé, transparent...) — prioritaire sur l'image dynamique du
  // satellite et sur le dégradé par défaut
  layout: null,
  // null (paysage, Echo Show) ou "round" (écran circulaire,
  // Echo Spot 1ère gen 2017, 480x480)
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
}, Le = {
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
function We(r, e) {
  return r === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : r === "sunny" && e ? "clear-night" : Le[r] || "not-available";
}
function je(r, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${r}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${Ie}/${t}/${r}.svg`;
}
function Ve(r, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(r).replace(/\s/g, "");
}
function Be(r, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(r);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Fe(r, e) {
  return r.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
class V extends k {
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ...b,
      ...e,
      icons: { ...b.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {});
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const s = (i, n) => console.warn(
      `[echo-home-card] "${i}" invalide (${JSON.stringify(t[i])}), valeur par défaut utilisée (${JSON.stringify(n)})`
    );
    return e.layout !== null && e.layout !== "round" && (s("layout", b.layout), e.layout = b.layout), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (s("zoom", b.zoom), e.zoom = b.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-home-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable.`
    ), e;
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
    }, 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._clockTimer);
  }
  set hass(e) {
    var o, h, a, l;
    const t = (h = this._hass) == null ? void 0 : h.states[(o = this._config) == null ? void 0 : o.satellite_entity], s = (l = this._hass) == null ? void 0 : l.states[(a = this._config) == null ? void 0 : a.weather_entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.satellite_entity], n = e.states[this._config.weather_entity];
    (t !== i || s !== n) && this.requestUpdate();
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
  // Résout la valeur CSS `background` de la carte : l'option `background`
  // prime toujours (override manuel, ex: couleur unie ou transparent),
  // puis l'image dynamique fournie par l'attribut `background` du
  // satellite, sinon le dégradé par défaut défini en CSS. En mode nuit,
  // aucune image : la carte reste unie (peu de lumière émise, pas de
  // fond chargé pour rien puisqu'invisible).
  _backgroundValue(e, t) {
    var i;
    if (this._config.background != null) return this._config.background;
    if (t) return null;
    const s = (i = e == null ? void 0 : e.attributes) == null ? void 0 : i.background;
    return s ? `center / cover no-repeat url("${s}")` : null;
  }
  _cardStyle(e) {
    const t = [];
    return e != null && t.push(`background:${e}`), this._config.zoom != null && this._config.zoom !== 1 && t.push(`zoom:${this._config.zoom}`), t.join(";");
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
    var p, _;
    if (!this._config || !this._hass) return u;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, s = this._isNightMode(t);
    this.classList.toggle("night", s);
    const i = e.language || ((p = this._hass.locale) == null ? void 0 : p.language) || "en", n = e.time_format || ((_ = this._hass.locale) == null ? void 0 : _.time_format) || "24", o = /* @__PURE__ */ new Date(), h = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, a = e.show_weather && !s && h && !["unavailable", "unknown"].includes(h.state) && h.attributes.temperature != null, l = this._backgroundValue(t, s), c = this._cardStyle(l), d = e.layout === "round";
    return N`
      <div class="card ${d ? "round" : ""}" style=${c}>
        <div class="shader"></div>
        ${a ? this._renderWeather(h) : u}
        ${e.show_clock ? N`<div class="clock">${Ve(o, i, n)}</div>` : u}
        ${e.show_date && !s ? N`<div class="date">${Be(o, i)}</div>` : u}
      </div>
    `;
  }
  _renderWeather(e) {
    const t = We(e.state, this._isDarkOutside()), s = je(t, this._config.icons), i = Math.round(e.attributes.temperature), n = Fe(this._hass, e.state), o = this._weatherClickable();
    return N`
      <div
        class="weather ${o ? "clickable" : ""}"
        role=${o ? "button" : u}
        tabindex=${o ? "0" : u}
        aria-label="${n}, ${i}°"
        @click=${o ? () => this._navigateToWeather() : u}
        @keydown=${o ? (h) => this._onWeatherKeydown(h) : u}
      >
        <img class="weather-icon" src=${s} alt="" />
        <span class="weather-temp">${i}°</span>
      </div>
    `;
  }
}
D(V, "properties", {
  _config: { state: !0 }
}), D(V, "styles", be`
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
      --_clock-size: var(--echo-home-clock-size, clamp(6rem, 44vh, 16rem));
      --_date-size: var(--echo-home-date-size, clamp(1.7rem, 11vh, 3.4rem));
      --_weather-icon-size: var(
        --echo-home-weather-icon-size,
        clamp(56px, 16vh, 100px)
      );
      --_weather-temp-size: var(
        --echo-home-weather-temp-size,
        clamp(1.7rem, 9vh, 3rem)
      );
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: clamp(4px, 1.5vh, 12px);
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

    .clock {
      position: relative;
      z-index: 1;
      font-size: var(--_clock-size);
      font-weight: 700;
      line-height: 1;
      color: var(--_text-color);
      font-variant-numeric: tabular-nums;
      transition: color 0.4s ease, opacity 0.4s ease;
    }

    :host(.night) .clock {
      color: var(--_night-color);
      opacity: var(--_night-opacity);
    }

    .date {
      position: relative;
      z-index: 1;
      font-size: var(--_date-size);
      color: var(--_text-color);
      opacity: 0.85;
    }

    .weather {
      position: absolute;
      top: clamp(12px, 4vh, 28px);
      left: clamp(12px, 3vw, 28px);
      z-index: 1;
      display: flex;
      align-items: center;
      gap: clamp(4px, 1vw, 10px);
    }

    /* En mode round, un bloc météo calé en haut à gauche tomberait sous
       le boîtier physique (coin clippé) — cf. gotchas écran rond. Centré
       en haut à la place, avec assez de marge pour rester dans la zone
       visible du cercle. */
    .card.round .weather {
      left: 50%;
      top: clamp(28px, 15%, 56px);
      transform: translateX(-50%);
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
       comme pour echo-weather-card. */
    .card.round .clock {
      font-size: clamp(3.6rem, 34vmin, 8rem);
    }
    .card.round .date {
      font-size: clamp(1.2rem, 8.5vmin, 2rem);
    }
    .card.round .weather-icon {
      width: clamp(36px, 12vmin, 58px);
      height: clamp(36px, 12vmin, 58px);
    }
    .card.round .weather-temp {
      font-size: clamp(1.2rem, 8vmin, 1.9rem);
    }
  `);
customElements.define($e, V);
window.customCards = window.customCards || [];
window.customCards.push({
  type: $e,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
