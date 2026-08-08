var Oe = Object.defineProperty;
var Fe = (s, e, t) => e in s ? Oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var ee = (s, e, t) => Fe(s, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, le = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = Symbol(), ue = /* @__PURE__ */ new WeakMap();
let Re = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (le && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ue.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ue.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const je = (s) => new Re(typeof s == "string" ? s : s + "", void 0, ce), Je = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new Re(t, s, ce);
}, Ve = (s, e) => {
  if (le) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = Z.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, s.appendChild(i);
  }
}, he = le ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return je(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ge, defineProperty: We, getOwnPropertyDescriptor: Qe, getOwnPropertyNames: Ye, getOwnPropertySymbols: Ze, getPrototypeOf: Ke } = Object, A = globalThis, pe = A.trustedTypes, Xe = pe ? pe.emptyScript : "", te = A.reactiveElementPolyfillSupport, O = (s, e) => s, oe = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Xe : null;
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
} }, Te = (s, e) => !Ge(s, e), me = { attribute: !0, type: String, converter: oe, reflect: !1, useDefault: !1, hasChanged: Te };
var qe, Me;
(qe = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Me = A.litPropertyMetadata) != null || (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = me) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && We(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: n, set: r } = (o = Qe(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: n, set(l) {
      const a = n == null ? void 0 : n.call(this);
      r == null || r.call(this, l), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const e = Ke(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const t = this.properties, i = [...Ye(t), ...Ze(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift(he(n));
    } else e !== void 0 && t.push(he(e));
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
    return Ve(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var n;
      return (n = i.hostConnected) == null ? void 0 : n.call(i);
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
    var r;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : oe).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, o, l;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : oe;
      this._$Em = n;
      const d = c.fromAttribute(t, a.type);
      this[n] = (l = d != null ? d : (o = this._$Ej) == null ? void 0 : o.get(n)) != null ? l : d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, r) {
    var o, l;
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[e]), i != null || (i = a.getPropertyOptions(e)), !(((o = i.hasChanged) != null ? o : Te)(r, t) || i.useDefault && i.reflect && r === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: r }, o) {
    var l, a, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = o != null ? o : t) != null ? a : this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var i, n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, l] of r) {
        const { wrapped: a } = l, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (n = this._$EO) == null || n.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
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
var De;
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[O("elementProperties")] = /* @__PURE__ */ new Map(), U[O("finalized")] = /* @__PURE__ */ new Map(), te == null || te({ ReactiveElement: U }), ((De = A.reactiveElementVersions) != null ? De : A.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, _e = (s) => s, K = F.trustedTypes, ge = K ? K.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Le = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Ne = "?" + x, et = `<${Ne}>`, z = document, J = () => z.createComment(""), V = (s) => s === null || typeof s != "object" && typeof s != "function", de = Array.isArray, tt = (s) => de(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ie = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, ve = />/g, S = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, ye = /"/g, He = /^(?:script|style|textarea|title)$/i, it = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), u = it(1), R = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), M = z.createTreeWalker(z, 129);
function Ie(s, e) {
  if (!de(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ge !== void 0 ? ge.createHTML(e) : e;
}
const nt = (s, e) => {
  const t = s.length - 1, i = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = B;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, d, p = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, d = o.exec(a), d !== null); ) m = o.lastIndex, o === B ? d[1] === "!--" ? o = fe : d[1] !== void 0 ? o = ve : d[2] !== void 0 ? (He.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = S) : d[3] !== void 0 && (o = S) : o === S ? d[0] === ">" ? (o = n != null ? n : B, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? S : d[3] === '"' ? ye : we) : o === ye || o === we ? o = S : o === fe || o === ve ? o = B : (o = S, n = void 0);
    const _ = o === S && s[l + 1].startsWith("/>") ? " " : "";
    r += o === B ? a + et : p >= 0 ? (i.push(c), a.slice(0, p) + Le + a.slice(p) + x + _) : a + x + (p === -2 ? l : _);
  }
  return [Ie(s, r + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class G {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, d] = nt(e, t);
    if (this.el = G.createElement(c, i), M.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = M.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(Le)) {
          const m = d[o++], _ = n.getAttribute(p).split(x), g = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: g[2], strings: _, ctor: g[1] === "." ? rt : g[1] === "?" ? ot : g[1] === "@" ? at : X }), n.removeAttribute(p);
        } else p.startsWith(x) && (a.push({ type: 6, index: r }), n.removeAttribute(p));
        if (He.test(n.tagName)) {
          const p = n.textContent.split(x), m = p.length - 1;
          if (m > 0) {
            n.textContent = K ? K.emptyScript : "";
            for (let _ = 0; _ < m; _++) n.append(p[_], J()), M.nextNode(), a.push({ type: 2, index: ++r });
            n.append(p[m], J());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ne) a.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(x, p + 1)) !== -1; ) a.push({ type: 7, index: r }), p += x.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = z.createElement("template");
    return i.innerHTML = e, i;
  }
}
function T(s, e, t = s, i) {
  var o, l, a;
  if (e === R) return e;
  let n = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const r = V(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = n : t._$Cl = n), n !== void 0 && (e = T(s, n._$AS(s, e.values), n, i)), e;
}
class st {
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
    const { el: { content: t }, parts: i } = this._$AD, n = ((c = e == null ? void 0 : e.creationScope) != null ? c : z).importNode(t, !0);
    M.currentNode = n;
    let r = M.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new W(r, r.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (d = new lt(r, this, e)), this._$AV.push(d), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = M.nextNode(), o++);
    }
    return M.currentNode = z, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class W {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, n) {
    var r;
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = (r = n == null ? void 0 : n.isConnected) != null ? r : !0;
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
    e = T(this, e, t), V(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = G.createElement(Ie(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(t);
    else {
      const o = new st(n, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = be.get(e.strings);
    return t === void 0 && be.set(e.strings, t = new G(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const r of e) n === t.length ? t.push(i = new W(this.O(J()), this.O(J()), this, this.options)) : i = t[n], i._$AI(r), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = _e(e).nextSibling;
      _e(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = T(this, e, t, 0), o = !V(e) || e !== this._$AH && e !== R, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = r[0], a = 0; a < r.length - 1; a++) c = T(this, l[i + a], t, a), c === R && (c = this._$AH[a]), o || (o = !V(c) || c !== this._$AH[a]), c === h ? e = h : e !== h && (e += (c != null ? c : "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class rt extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ot extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class at extends X {
  constructor(e, t, i, n, r) {
    super(e, t, i, n, r), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = T(this, e, t, 0)) != null ? o : h) === R) return;
    const i = this._$AH, n = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== h && (i === h || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class lt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    T(this, e);
  }
}
const ne = F.litHtmlPolyfillSupport;
var ze;
ne == null || ne(G, W), ((ze = F.litHtmlVersions) != null ? ze : F.litHtmlVersions = []).push("3.3.3");
const ct = (s, e, t) => {
  var r, o;
  const i = (r = t == null ? void 0 : t.renderBefore) != null ? r : e;
  let n = i._$litPart$;
  if (n === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = n = new W(e.insertBefore(J(), l), l, void 0, t != null ? t : {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
class j extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ct(t, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Pe;
j._$litElement$ = !0, j.finalized = !0, (Pe = D.litElementHydrateSupport) == null || Pe.call(D, { LitElement: j });
const se = D.litElementPolyfillSupport;
se == null || se({ LitElement: j });
var Ue;
((Ue = D.litElementVersions) != null ? Ue : D.litElementVersions = []).push("4.2.2");
const Be = "echo-weather-card", dt = "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill", ut = 1, ht = 2, $e = {
  hourly_count: 6,
  daily_count: 4,
  language: null,
  time_format: null,
  icons: {
    provider: "meteocons",
    style: "fill",
    base_url: null,
    // Les icônes de prévisions (horaires/quotidiennes) sont toujours
    // figées (animation retirée) pour préserver le FPS. L'icône météo
    // actuelle reste animée par défaut ; à mettre à false si l'appareil
    // peine à suivre même une seule icône animée.
    animate_current: !0
  },
  show_current: !0,
  show_hourly: !0,
  show_daily: !0,
  show_feels_like: !0,
  show_precipitation_probability: !0,
  show_humidity: !0,
  show_dew_point: !0,
  dew_point_entity: null,
  show_clock: !0,
  show_date: !0,
  show_last_updated: !0,
  show_wind: !0,
  show_sun: !0,
  sun_entity: null,
  show_moon: !0,
  moon_entity: null,
  uv_entity: null,
  air_quality_entity: null,
  title: null,
  background: null,
  // "auto" (par défaut) : fond + couleurs clair le jour, sombre la nuit,
  // d'après le soleil (sun_entity). "light"/"dark" forcent un mode fixe.
  theme_mode: "auto",
  // null (par défaut) : mise en page actuelle/horaire/quotidienne empilée,
  // pensée pour un écran large (Echo Show). "round" : mise en page compacte
  // pour petit écran circulaire (Echo Spot 1ère gen, 480x480) — horloge +
  // météo actuelle + deux tuiles "Aujourd'hui"/"Semaine" qui ouvrent le
  // détail au tap plutôt que d'essayer de tout afficher à la fois.
  layout: null
}, pt = {
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
function E(s, e) {
  return s === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : s === "sunny" && e ? "clear-night" : pt[s] || "not-available";
}
function C(s, e) {
  return `${((e == null ? void 0 : e.base_url) || dt).replace(/\/$/, "")}/${s}.svg`;
}
const Y = /* @__PURE__ */ new Map();
async function mt(s) {
  const t = await (await fetch(s)).text(), i = new DOMParser().parseFromString(t, "image/svg+xml");
  i.querySelectorAll("animate, animateTransform, animateMotion, animateColor, set").forEach((r) => r.remove());
  const n = new XMLSerializer().serializeToString(i.documentElement);
  return URL.createObjectURL(new Blob([n], { type: "image/svg+xml" }));
}
function _t(s, e) {
  const t = Y.get(s);
  if (typeof t == "string") return t;
  if (!t) {
    const i = mt(s).catch(() => s).then((n) => (Y.set(s, n), n));
    Y.set(s, i);
  }
  return Promise.resolve(Y.get(s)).then(() => e == null ? void 0 : e()), null;
}
function re(s, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    hour12: t === "12"
  }).format(s).replace(/\s/g, "");
}
function b(s, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(s).replace(/\s/g, "");
}
function xe(s, e) {
  return new Intl.DateTimeFormat(e, { weekday: "short" }).format(s);
}
function Ae(s, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function gt(s, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function q(s, e) {
  return s.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
function ke(s) {
  const e = Number(s);
  return Number.isFinite(e) ? e < 3 ? "Faible" : e < 6 ? "Modéré" : e < 8 ? "Élevé" : e < 11 ? "Très élevé" : "Extrême" : null;
}
function Se(s, e) {
  return (Number(s.attributes.supported_features) & e) !== 0;
}
async function ft(s, e, t) {
  var i, n;
  try {
    const r = await s.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: t },
      target: { entity_id: e },
      return_response: !0
    });
    return ((n = (i = r == null ? void 0 : r.response) == null ? void 0 : i[e]) == null ? void 0 : n.forecast) || [];
  } catch (r) {
    return console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${t})`,
      r
    ), [];
  }
}
function vt(s, e, t) {
  const i = s.states[e];
  if (!i) return () => {
  };
  const n = [];
  if (Se(i, ut) && n.push("daily"), Se(i, ht) && n.push("hourly"), n.length === 0)
    return console.warn(
      `[echo-weather-card] ${e} ne supporte ni forecast daily ni hourly`
    ), () => {
    };
  const r = [];
  let o = !1;
  return n.forEach((l) => {
    s.connection.subscribeMessage(
      (a) => t(l, a.forecast || []),
      { type: "weather/subscribe_forecast", forecast_type: l, entity_id: e }
    ).then((a) => {
      o ? a() : r.push(a);
    }).catch(async (a) => {
      console.warn(
        `[echo-weather-card] souscription forecast "${l}" indisponible, repli sur get_forecasts`,
        a
      );
      const c = await ft(s, e, l);
      o || t(l, c);
    });
  }), () => {
    o = !0, r.forEach((l) => l());
  };
}
const wt = `
01-01:Marie
01-02:Odile
01-03:Geneviève
01-04:Rigobert
01-05:Édouard
01-06:Épiphanie
01-07:Raymond
01-08:Lucien
01-09:Alix
01-10:Guillaume
01-11:Paulin
01-12:Tatiana
01-13:Hilaire
01-14:Nina
01-15:Rémi
01-16:Marcel
01-17:Antoine
01-18:Prisca
01-19:Marius
01-20:Sébastien
01-21:Agnès
01-22:Vincent
01-23:Barnard
01-24:François de Sales
01-25:Paul
01-26:Timothée
01-27:Angèle
01-28:Thomas d'Aquin
01-29:Gildas
01-30:Martine
01-31:Jean Bosco
02-01:Ella
02-02:Marie
02-03:Blaise
02-04:Véronique
02-05:Agathe
02-06:Gaston
02-07:Eugène
02-08:Joséphine
02-09:Apolline
02-10:Scholastique
02-11:Notre-Dame de Lourdes
02-12:Eulalie
02-13:Béatrice
02-14:Valentin
02-15:Claude
02-16:Julienne
02-17:Alexis
02-18:Bernadette
02-19:Gabin
02-20:Aimée
02-21:Pierre Damien
02-22:Isabelle
02-23:Lazare
02-24:Modeste
02-25:Nestor
02-26:Nicanor
02-27:Honorine
02-28:Romain
03-01:Aubin
03-02:Charles
03-03:Guénolé
03-04:Casimir
03-05:Olive
03-06:Colette
03-07:Félicité
03-08:Jean de Dieu
03-09:Françoise
03-10:Vivien
03-11:Euloge
03-12:Maximilien
03-13:Rodrigue
03-14:Mathilde
03-15:Louise
03-16:Bénédicte
03-17:Patrick
03-18:Cyrille
03-19:Joseph
03-20:Herbert
03-21:Clément
03-22:Léa
03-23:Victorien
03-24:Catherine de Suède
03-25:Annonciation
03-26:Larissa
03-27:Habib
03-28:Gontran
03-29:Jonas
03-30:Amédée
03-31:Benjamin
04-01:Hugues
04-02:Sandrine
04-03:Richard
04-04:Isidore
04-05:Irène
04-06:Marcellin
04-07:Jean-Baptiste de La Salle
04-08:Julie
04-09:Gaëtan
04-10:Fulbert
04-11:Stanislas
04-12:Jules
04-13:Ida
04-14:Maxime
04-15:Anastasie
04-16:Bernadette
04-17:Anicet
04-18:Parfait
04-19:Léon
04-20:Odette
04-21:Anselme
04-22:Alexandre
04-23:Georges
04-24:Fidèle
04-25:Marc
04-26:Alida
04-27:Zita
04-28:Louis-Marie
04-29:Catherine de Sienne
04-30:Robert
05-01:Joseph travailleur
05-02:Athanase
05-03:Philippe
05-04:Sylvain
05-05:Judith
05-06:Jean devant la Porte Latine
05-07:Gisèle
05-08:Michel
05-09:Pacôme
05-10:Solange
05-11:Estelle
05-12:Achille
05-13:Servais
05-14:Matthias
05-15:Denise
05-16:Honoré
05-17:Pascal
05-18:Éric
05-19:Yves
05-20:Bernardin
05-21:Constantin
05-22:Rita
05-23:Didier
05-24:Donatien
05-25:Sophie
05-26:Bérenger
05-27:Auguste
05-28:Germain
05-29:Ursule
05-30:Ferdinand
05-31:Pétronille
06-01:Justin
06-02:Marcellin
06-03:Clotilde
06-04:Clotilde
06-05:Boniface
06-06:Norbert
06-07:Gilbert
06-08:Médard
06-09:Éphrem
06-10:Diane
06-11:Barnabé
06-12:Guy
06-13:Antoine de Padoue
06-14:Élie
06-15:Germaine
06-16:Jean-François Régis
06-17:Hervé
06-18:Léonce
06-19:Gervais
06-20:Silvère
06-21:Louis de Gonzague
06-22:Alban
06-23:Audrey
06-24:Jean-Baptiste
06-25:Prosper
06-26:Anthelme
06-27:Fernand
06-28:Irénée
06-29:Pierre et Paul
06-30:Martial
07-01:Thierry
07-02:Ottilie
07-03:Thomas
07-04:Élizabeth
07-05:Antoine-Marie
07-06:Maria Goretti
07-07:Raoul
07-08:Thibaut
07-09:Amandine
07-10:Ulrich
07-11:Benoît
07-12:Olive
07-13:Henri
07-14:Camille
07-15:Donald
07-17:Charlotte
07-18:Frédéric
07-19:Arsène
07-20:Marina
07-21:Victor
07-22:Marie-Madeleine
07-23:Brigitte
07-24:Christine
07-25:Jacques
07-26:Anne
07-27:Nathalie
07-28:Samson
07-29:Marthe
07-30:Julien Eymard
07-31:Ignace de Loyola
08-01:Alphonse
08-02:Julien Eymard
08-03:Lydie
08-04:Jean-Marie Vianney
08-05:Marguerite
08-07:Gaëtan
08-08:Dominique
08-09:Bénédicte de la Croix
08-10:Laurent
08-11:Claire
08-12:Jeanne-Françoise
08-13:Hippolyte
08-14:Maximilien Kolbe
08-15:Assomption
08-16:Radegonde
08-17:Hyacinthe
08-18:Hélène
08-19:Jean Eudes
08-20:Bernard
08-21:Christophe
08-23:Rose de Lima
08-24:Barthélemy
08-25:Louis
08-26:Natacha
08-27:Monique
08-28:Augustin
08-30:Fiacre
08-31:Aristide
09-01:Gilles
09-02:Ingrid
09-03:Grégoire
09-04:Rosalie
09-05:Bertille
09-06:Bertrand
09-07:Reine
09-08:Nativité de Marie
09-09:Pierre Claver
09-10:Adelphe
09-11:Aimé
09-13:Aimée
09-16:Corneille
09-17:Robert Bellarmin
09-18:Nadège
09-19:Janvier
09-21:Matthieu
09-22:Maurice
09-23:Pio
09-24:Thècle
09-25:Hermann
09-26:Côme
09-27:Vincent de Paul
09-28:Venceslas
09-29:Michel, Gabriel et Raphaël
09-30:Jérôme
10-01:Thérèse de l'Enfant-Jésus
10-02:Anges Gardiens
10-03:Gérard
10-04:François d'Assise
10-05:Fleur
10-06:Bruno
10-07:Notre-Dame du Rosaire
10-08:Pélagie
10-09:Denis
10-10:Ghislain
10-11:Firmin
10-12:Wilfrid
10-13:Géraud
10-14:Calliste
10-15:Thérèse d'Avila
10-16:Edwige
10-17:Ignace d'Antioche
10-18:Luc
10-19:René
10-20:Adeline
10-21:Ursule
10-22:Jean-Paul II
10-23:Jean de Capistran
10-24:Florentin
10-25:Crépin
10-26:Dimitri
10-27:Émeline
10-28:Simon
10-29:Narcisse
10-30:Bienvenu
10-31:Quentin
11-01:Toussaint
11-02:Défunts
11-03:Hubert
11-04:Charles Borromée
11-05:Sylvie
11-06:Léonard
11-07:Carine
11-08:Geoffroy
11-09:Jean
11-10:Léon
11-11:Martin
11-12:Christian
11-13:Brice
11-14:Sidonie
11-15:Albert
11-16:Marguerite d'Écosse
11-17:Élisabeth
11-18:Aude
11-19:Tanguy
11-20:Edmond
11-21:Marie
11-22:Cécile
11-23:Clément
11-24:Flora
11-25:Catherine d'Alexandrie
11-26:Christ-Roi
11-27:Séverin
11-28:Jacques
11-29:Saturnin
11-30:André
12-01:Éloi
12-02:Viviane
12-03:François Xavier
12-04:Barbara
12-05:Sabine
12-06:Nicolas
12-07:Ambroise
12-08:Marie
12-09:Pierre Fourier
12-10:Lorette
12-11:Daniel
12-12:Marie de Guadalupe
12-13:Lucie
12-14:Odile
12-15:Ninon
12-16:Albéric
12-17:Lazare
12-18:Gatien
12-19:Urbain
12-20:Théophile
12-21:Pierre Canisius
12-22:Françoise-Xavière
12-23:Armand
12-24:Adèle
12-25:Noël
12-26:Étienne
12-27:Jean
12-28:Innocents
12-29:David
12-30:Eugénie
12-31:Sylvestre
`, yt = new Map(
  wt.trim().split(`
`).map((s) => {
    const e = s.indexOf(":");
    return [s.slice(0, e), s.slice(e + 1)];
  })
);
function Ee(s) {
  const e = String(s.getMonth() + 1).padStart(2, "0"), t = String(s.getDate()).padStart(2, "0");
  return yt.get(`${e}-${t}`) || null;
}
const bt = {
  new_moon: { icon: "mdi:moon-new", label: "Nouvelle lune" },
  waxing_crescent: {
    icon: "mdi:moon-waxing-crescent",
    label: "Premier croissant"
  },
  first_quarter: { icon: "mdi:moon-first-quarter", label: "Premier quartier" },
  waxing_gibbous: {
    icon: "mdi:moon-waxing-gibbous",
    label: "Lune gibbeuse croissante"
  },
  full_moon: { icon: "mdi:moon-full", label: "Pleine lune" },
  waning_gibbous: {
    icon: "mdi:moon-waning-gibbous",
    label: "Lune gibbeuse décroissante"
  },
  last_quarter: { icon: "mdi:moon-last-quarter", label: "Dernier quartier" },
  waning_crescent: {
    icon: "mdi:moon-waning-crescent",
    label: "Dernier croissant"
  }
};
function Ce(s) {
  return bt[s] || null;
}
class ae extends j {
  setConfig(e) {
    if (!(e != null && e.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    this._config = {
      ...$e,
      ...e,
      icons: { ...$e.icons, ...e.icons || {} }
    };
  }
  static getStubConfig(e) {
    return { entity: Object.keys(e.states).find(
      (i) => i.startsWith("weather.")
    ) || "weather.home" };
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((e) => {
      var i;
      const t = ((i = e[0]) == null ? void 0 : i.contentRect.width) || 0;
      this.classList.toggle("portrait", t > 0 && t < 480);
    }), this._resizeObserver.observe(this), this._clockTimer = setInterval(() => {
      var e;
      (e = this._config) != null && e.show_clock && this.requestUpdate();
    }, 3e4);
  }
  disconnectedCallback() {
    var e, t;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), clearInterval(this._clockTimer), (t = this._unsubscribeForecasts) == null || t.call(this), this._unsubscribeForecasts = void 0, this._subscribedEntity = void 0;
  }
  set hass(e) {
    var n, r;
    const t = (r = this._hass) == null ? void 0 : r.states[(n = this._config) == null ? void 0 : n.entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.entity];
    i && this._subscribedEntity !== this._config.entity && this._subscribeToForecasts(), t !== i && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _subscribeToForecasts() {
    var e;
    (e = this._unsubscribeForecasts) == null || e.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = vt(
      this._hass,
      this._config.entity,
      (t, i) => {
        t === "hourly" && (this._hourly = i), t === "daily" && (this._daily = i);
      }
    );
  }
  // Icônes des prévisions (horaires/quotidiennes) : version figée, sans
  // l'animation SMIL embarquée dans les SVG Meteocons — seule l'icône
  // météo actuelle a besoin de bouger, et beaucoup d'icônes animées à
  // l'écran en même temps fait chuter le FPS sur du matériel modeste
  // (Echo Show 5). Tant que la version figée n'est pas prête (premier
  // fetch), on affiche l'animée le temps d'un re-render.
  _staticIcon(e) {
    return _t(e, () => this.requestUpdate()) || e;
  }
  _isNight(e) {
    if (!e) {
      const i = this._hass.states[this._config.sun_entity || "sun.sun"];
      return (i == null ? void 0 : i.state) === "below_horizon";
    }
    const t = e.getHours();
    return t < 7 || t >= 21;
  }
  // Mode clair/sombre automatique d'après le soleil (View Assist n'a pas
  // de bascule jour/nuit native pour ses cartes) — theme_mode: "auto" par
  // défaut, "light"/"dark" pour forcer un mode fixe indépendamment de
  // l'heure. Appliqué comme classe hôte pour piloter le fond et les
  // couleurs via CSS (cf. static styles, tokens --_mode-*).
  _isLightMode() {
    return this._config.theme_mode === "light" ? !0 : this._config.theme_mode === "dark" ? !1 : !this._isNight();
  }
  render() {
    var r, o;
    if (!this._config || !this._hass) return h;
    const e = this._hass.states[this._config.entity];
    if (!e)
      return u`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    this.classList.toggle("light", this._isLightMode());
    const t = this._config.language || ((r = this._hass.locale) == null ? void 0 : r.language) || "en", i = this._config.time_format || ((o = this._hass.locale) == null ? void 0 : o.time_format) || "24";
    if (this._config.layout === "round")
      return this._renderRound(e, t, i);
    const n = this._config.background != null ? `background:${this._config.background}` : "";
    return u`
      <div class="card" style=${n}>
        ${this._config.title ? u`<div class="title">${this._config.title}</div>` : h}
        ${this._config.show_current ? this._renderCurrent(e, t, i) : h}
        ${this._config.show_hourly ? this._renderHourly(t, i) : h}
        ${this._config.show_daily ? this._renderDaily(t) : h}
        ${this._renderBottomBand(e, t, i)}
      </div>
      ${this._renderDayDetail(e, t, !1)}
    `;
  }
  // --- Mise en page "round" (petit écran circulaire, ex: Echo Spot 1ère
  // gen 2017, 480x480) : pas la place pour empiler actuelle/horaire/
  // quotidienne/bandeau comme en mode large. À la place, un écran d'accueil
  // dense (horloge + météo actuelle + indicateurs compacts + deux tuiles
  // "Aujourd'hui"/"Semaine" avec aperçu) où chaque élément est aussi une
  // porte d'entrée vers plus de détail au tap (ha-dialog). ---
  _renderRound(e, t, i) {
    const n = E(e.state, this._isNight()), r = C(n, this._config.icons), o = q(this._hass, e.state), l = e.attributes.temperature, a = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, d = e.attributes.humidity, p = e.last_updated ? new Date(e.last_updated) : null, m = /* @__PURE__ */ new Date(), _ = this._config.background != null ? `background:${this._config.background}` : "", g = () => {
      this._roundDialog = "current";
    }, f = () => {
      this._roundDialog = "hourly";
    }, v = () => {
      this._roundDialog = "daily";
    }, w = (this._hourly || []).find(
      (I) => new Date(I.datetime).getTime() >= Date.now()
    ), Q = w ? `${re(new Date(w.datetime), t, i)} · ${Math.round(w.temperature)}°` : null, L = (this._daily || [])[0], N = L ? `↑${Math.round(L.temperature)}° ↓${Math.round(L.templow)}°` : null, k = [];
    this._config.show_feels_like && c != null && k.push(`Ressenti ${Math.round(c)}°`), this._config.show_humidity && d != null && k.push(`Humidité ${Math.round(d)}%`);
    const P = this._config.show_date ? Ee(m) : null, $ = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], y = $ && !["unknown", "unavailable"].includes($.state) ? Ce($.state) : null, H = [];
    return this._config.show_date && H.push(gt(m, t)), y && H.push(y.label), P && H.push(P), u`
      <div class="card round" style=${_}>
        ${this._config.show_clock ? u`<div class="round-clock">
              ${b(m, t, i)}
            </div>` : h}
        ${H.length ? u`<div class="round-date-line">
              ${y ? u`<ha-icon
                    class="round-date-icon"
                    icon=${y.icon}
                  ></ha-icon>` : h}
              <span>${H.join(" · ")}</span>
            </div>` : h}
        ${this._config.show_current ? u`
              <div
                class="round-current"
                role="button"
                tabindex="0"
                @click=${g}
                @keydown=${(I) => {
      (I.key === "Enter" || I.key === " ") && (I.preventDefault(), g());
    }}
              >
                <img
                  class="round-icon"
                  src=${this._config.icons.animate_current ? r : this._staticIcon(r)}
                  alt=${o}
                />
                <div class="round-current-info">
                  <div class="round-temp">${Math.round(l)}${a}</div>
                  <div class="round-condition">${o}</div>
                  ${k.length ? u`<div class="round-meta">
                        ${k.join(" · ")}
                      </div>` : h}
                  ${this._config.show_last_updated && p ? u`<div class="round-updated">
                        Maj à
                        ${b(p, t, i)}
                      </div>` : h}
                </div>
              </div>
            ` : h}
        ${this._renderRoundIndicators(e, g)}
        <div class="round-launchers">
          ${this._config.show_hourly ? this._renderRoundLauncher(
      "mdi:clock-outline",
      "Aujourd'hui",
      Q,
      f
    ) : h}
          ${this._config.show_daily ? this._renderRoundLauncher(
      "mdi:calendar-week",
      "Semaine",
      N,
      v
    ) : h}
        </div>
      </div>
      ${this._renderRoundDialog(e, t, i)}
      ${this._renderDayDetail(e, t, !0)}
    `;
  }
  // Ligne compacte d'indicateurs (UV, qualité de l'air, vent, point de
  // rosée) sous la condition — juste icône + valeur, sans libellé, pour
  // tenir sur une seule ligne (ou deux si ça déborde). Humidité exclue :
  // déjà dans la ligne Ressenti/Humidité sous la condition.
  // Tape dessus ouvre le même détail complet que la météo actuelle.
  _renderRoundIndicators(e, t) {
    const i = [], n = this._config.uv_entity && this._hass.states[this._config.uv_entity];
    n && !["unknown", "unavailable"].includes(n.state) && i.push({ icon: "mdi:weather-sunny-alert", value: n.state });
    const r = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity];
    r && !["unknown", "unavailable"].includes(r.state) && i.push({ icon: "mdi:air-filter", value: r.state });
    const o = e.attributes.wind_speed;
    this._config.show_wind && o != null && i.push({
      icon: "mdi:weather-windy",
      value: `${Math.round(o)}`
    });
    const l = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], a = l ? Number(l.state) : e.attributes.dew_point;
    return this._config.show_dew_point && a != null && Number.isFinite(a) && i.push({
      icon: "mdi:thermometer-water",
      value: `${Math.round(a)}°`
    }), i.length ? u`
      <div
        class="round-indicators"
        role="button"
        tabindex="0"
        @click=${t}
        @keydown=${(c) => {
      (c.key === "Enter" || c.key === " ") && (c.preventDefault(), t());
    }}
      >
        ${i.map(
      (c) => u`<span class="round-chip">
            <ha-icon icon=${c.icon}></ha-icon>${c.value}
          </span>`
    )}
      </div>
    ` : h;
  }
  _renderRoundLauncher(e, t, i, n) {
    return u`
      <div
        class="round-launcher"
        role="button"
        tabindex="0"
        @click=${n}
        @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), n());
    }}
      >
        <div class="round-launcher-top">
          <ha-icon icon=${e}></ha-icon>
          <span>${t}</span>
          <ha-icon class="round-chevron" icon=${"mdi:chevron-right"}></ha-icon>
        </div>
        ${i ? u`<div class="round-launcher-preview">${i}</div>` : h}
      </div>
    `;
  }
  _renderRoundDialog(e, t, i) {
    return this._roundDialog === "current" ? this._renderCurrentDetail(e, t, i) : this._roundDialog === "hourly" ? this._renderHourlyOverview(t, i) : this._roundDialog === "daily" ? this._renderDailyOverview(t) : h;
  }
  // isRound : sur écran circulaire, le bouton fermer est centré en bas
  // plutôt qu'en haut à droite — ce coin-là est le plus susceptible d'être
  // sous le boîtier physique (cf. _renderRound, .round-dialog en CSS).
  _renderDialogHeader(e, t, i) {
    return u`
      <div class="detail-header">
        <div class="detail-date">${e}</div>
        ${i ? h : u`<ha-icon
              class="detail-close"
              icon=${"mdi:close"}
              role="button"
              tabindex="0"
              @click=${t}
              @keydown=${(n) => {
      (n.key === "Enter" || n.key === " ") && t();
    }}
            ></ha-icon>`}
      </div>
    `;
  }
  _renderRoundBackButton(e) {
    return u`
      <ha-icon
        class="round-back"
        icon=${"mdi:arrow-left"}
        role="button"
        tabindex="0"
        @click=${e}
        @keydown=${(t) => {
      (t.key === "Enter" || t.key === " ") && e();
    }}
      ></ha-icon>
    `;
  }
  // Détail de la météo actuelle (mode round uniquement) : reprend les
  // mêmes données que le mode large (UV, qualité de l'air, humidité, vent,
  // point de rosée, lever/coucher, mise à jour) mais en liste verticale
  // plutôt qu'éclatées entre plusieurs zones — il n'y a pas la place pour
  // les afficher directement sur l'écran rond.
  _renderCurrentDetail(e, t, i) {
    const n = () => {
      this._roundDialog = null;
    }, r = e.attributes.temperature_unit || "°C", o = e.attributes.apparent_temperature, l = e.attributes.humidity, a = e.attributes.wind_speed, c = e.attributes.wind_speed_unit || "", d = this._config.uv_entity && this._hass.states[this._config.uv_entity], p = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity], m = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], _ = m ? Number(m.state) : e.attributes.dew_point, g = this._hass.states[this._config.sun_entity || "sun.sun"], f = [];
    if (this._config.show_feels_like && o != null && f.push({
      icon: "mdi:thermometer",
      label: "Ressenti",
      value: `${Math.round(o)}${r}`
    }), this._config.show_humidity && l != null && f.push({
      icon: "mdi:water-percent",
      label: "Humidité",
      value: `${Math.round(l)}%`
    }), d && !["unknown", "unavailable"].includes(d.state)) {
      const v = ke(d.state);
      f.push({
        icon: "mdi:weather-sunny-alert",
        label: "Indice UV",
        value: v ? `${d.state} · ${v}` : `${d.state}`
      });
    }
    if (p && !["unknown", "unavailable"].includes(p.state)) {
      const v = p.attributes.Libellé || p.attributes.libelle, w = p.attributes.unit_of_measurement;
      f.push({
        icon: "mdi:air-filter",
        label: "Qualité de l'air",
        value: v ? `${p.state} · ${v}` : `${p.state}${w ? ` ${w}` : ""}`
      });
    }
    if (this._config.show_wind && a != null && f.push({
      icon: "mdi:weather-windy",
      label: "Vent",
      value: `${Math.round(a)} ${c}`.trim()
    }), this._config.show_dew_point && _ != null && Number.isFinite(_)) {
      const v = m && m.attributes.unit_of_measurement || r;
      f.push({
        icon: "mdi:thermometer-water",
        label: "Point de rosée",
        value: `${_.toFixed(1)}${v}`
      });
    }
    return this._config.show_sun && g && (g.attributes.next_rising && f.push({
      icon: "mdi:weather-sunset-up",
      label: "Lever",
      value: b(
        new Date(g.attributes.next_rising),
        t,
        i
      )
    }), g.attributes.next_setting && f.push({
      icon: "mdi:weather-sunset-down",
      label: "Coucher",
      value: b(
        new Date(g.attributes.next_setting),
        t,
        i
      )
    })), this._config.show_last_updated && e.last_updated && f.push({
      icon: "mdi:update",
      label: "Mise à jour",
      value: b(
        new Date(e.last_updated),
        t,
        i
      )
    }), u`
      <ha-dialog class="round-dialog" open hideActions @closed=${n}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Météo actuelle", n, !0)}
            ${f.length ? u`<div class="detail-rows">
                  ${f.map(
      (v) => u`<div class="detail-row">
                      <ha-icon icon=${v.icon}></ha-icon>
                      <span class="detail-row-label">${v.label}</span>
                      <span class="detail-row-value">${v.value}</span>
                    </div>`
    )}
                </div>` : u`<div class="detail-row-empty">
                  Aucune information supplémentaire configurée.
                </div>`}
          </div>
          ${this._renderRoundBackButton(n)}
        </div>
      </ha-dialog>
    `;
  }
  // Liste des prochaines heures (mode round uniquement) — même donnée que
  // _renderHourly, mais en liste verticale scrollable plutôt qu'en rangée
  // horizontale (pas la largeur nécessaire sur un écran rond).
  _renderHourlyOverview(e, t) {
    const i = () => {
      this._roundDialog = null;
    }, n = Date.now(), r = (this._hourly || []).filter((o) => new Date(o.datetime).getTime() >= n).slice(0, this._config.hourly_count);
    return u`
      <ha-dialog class="round-dialog" open hideActions @closed=${i}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Aujourd'hui", i, !0)}
            ${r.length ? u`<div class="hourly-list">
                  ${r.map((o) => {
      const l = new Date(o.datetime), a = E(
        o.condition,
        this._isNight(l)
      ), c = C(a, this._config.icons), d = q(
        this._hass,
        o.condition
      ), p = o.precipitation_probability;
      return u`<div class="hourly-list-item">
                      <span class="hourly-list-time"
                        >${re(l, e, t)}</span
                      >
                      <img
                        class="hourly-list-icon"
                        src=${this._staticIcon(c)}
                        alt=${d}
                      />
                      <span class="hourly-list-temp"
                        >${Math.round(o.temperature)}°</span
                      >
                      <span class="hourly-list-pop"
                        >${this._config.show_precipitation_probability && p > 0 ? `${p}%` : ""}</span
                      >
                    </div>`;
    })}
                </div>` : u`<div class="detail-row-empty">
                  Pas de prévision disponible.
                </div>`}
          </div>
          ${this._renderRoundBackButton(i)}
        </div>
      </ha-dialog>
    `;
  }
  // Liste des prochains jours (mode round uniquement) — chaque jour est
  // lui-même cliquable et renvoie vers _renderDayDetail (même détail que
  // le tap sur une tuile .daily-item en mode large) : on ferme cette liste
  // et on ouvre le détail du jour choisi, plutôt que d'empiler les dialog.
  _renderDailyOverview(e) {
    const t = () => {
      this._roundDialog = null;
    }, i = (this._daily || []).slice(0, this._config.daily_count);
    return u`
      <ha-dialog class="round-dialog" open hideActions @closed=${t}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Cette semaine", t, !0)}
            ${i.length ? u`<div class="daily-list">
                  ${i.map((n) => {
      const r = new Date(n.datetime), o = E(
        n.condition,
        !1
      ), l = C(o, this._config.icons), a = q(
        this._hass,
        n.condition
      ), c = () => {
        this._roundDialog = null, this._detailForecast = n;
      };
      return u`<div
                      class="daily-list-item"
                      role="button"
                      tabindex="0"
                      @click=${c}
                      @keydown=${(d) => {
        (d.key === "Enter" || d.key === " ") && (d.preventDefault(), c());
      }}
                    >
                      <span class="daily-list-day"
                        >${xe(r, e)}</span
                      >
                      <img
                        class="daily-list-icon"
                        src=${this._staticIcon(l)}
                        alt=${a}
                      />
                      <span class="daily-list-temps">
                        <span class="daily-max"
                          >${Math.round(n.temperature)}°</span
                        >
                        <span class="daily-min"
                          >${Math.round(n.templow)}°</span
                        >
                      </span>
                      <ha-icon
                        class="round-chevron"
                        icon=${"mdi:chevron-right"}
                      ></ha-icon>
                    </div>`;
    })}
                </div>` : u`<div class="detail-row-empty">
                  Pas de prévision disponible.
                </div>`}
          </div>
          ${this._renderRoundBackButton(t)}
        </div>
      </ha-dialog>
    `;
  }
  _renderCurrent(e, t, i) {
    const n = E(e.state, this._isNight()), r = C(n, this._config.icons), o = q(this._hass, e.state), l = e.attributes.temperature, a = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, d = e.attributes.humidity, p = e.last_updated ? new Date(e.last_updated) : null, m = [];
    this._config.show_feels_like && c != null && m.push(`Ressenti ${Math.round(c)}°`), this._config.show_last_updated && p && m.push(`Maj à ${b(p, t, i)}`);
    const _ = this._config.uv_entity && this._hass.states[this._config.uv_entity], g = _ && !["unknown", "unavailable"].includes(_.state), f = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity], v = f && !["unknown", "unavailable"].includes(f.state), w = g || v, Q = this._config.show_humidity && d != null, L = this._config.show_clock || this._config.show_date, N = /* @__PURE__ */ new Date(), k = this._config.show_date ? Ee(N) : null, P = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], $ = P && !["unknown", "unavailable"].includes(P.state) ? Ce(P.state) : null, y = [];
    return $ && y.push($.label), k && y.push(k), u`
      <div class="current">
        <img
          class="current-icon"
          src=${this._config.icons.animate_current ? r : this._staticIcon(r)}
          alt=${o}
        />
        <div class="current-info">
          <div class="current-main">
            <div class="current-temp">${Math.round(l)}${a}</div>
            <div class="current-condition">${o}</div>
            ${m.length ? u`<div class="current-meta">
                  ${m.join(" · ")}
                </div>` : h}
          </div>
          ${w || Q ? u`
                <div class="uv-group">
                  ${w ? u`<div class="indicators-row">
                        ${g ? this._renderIndicator("uv", _) : h}
                        ${v ? this._renderIndicator("air", f) : h}
                      </div>` : h}
                  ${Q ? u`<div class="humidity-line">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(d)}%</span>
                      </div>` : h}
                </div>
              ` : h}
        </div>
        ${L ? u`
              <div class="current-side">
                <div class="clock-group">
                  ${this._config.show_clock ? u`<div class="clock">
                        ${b(N, t, i)}
                      </div>` : h}
                  ${this._config.show_date ? u`<div class="date-line">
                        ${Ae(N, t)}
                      </div>` : h}
                  ${y.length ? u`<div class="moon-line">
                        ${$ ? u`<ha-icon
                              class="moon-icon"
                              icon=${$.icon}
                            ></ha-icon>` : h}
                        <span>${y.join(" · ")}</span>
                      </div>` : h}
                </div>
              </div>
            ` : h}
      </div>
    `;
  }
  // Indice UV et qualité de l'air, côte à côte à droite de la température
  // — tuiles à deux lignes (libellé au-dessus, valeur + catégorie
  // qualitative en dessous). L'UV a une échelle universelle (OMS) donc la
  // catégorie (Faible/Modéré/Élevé/...) est calculée ici (uvCategory).
  // La qualité de l'air n'a pas d'échelle générique fiable (dépend de
  // l'intégration choisie par l'utilisateur) : on affiche un libellé
  // qualitatif seulement si l'entité elle-même en expose un (attribut
  // "Libellé"/"libelle", ex: intégrations atmofrance/recosante), sinon
  // juste la valeur brute + son unité. L'appelant a déjà vérifié que
  // l'entité est utilisable (évite de refaire le lookup ici).
  _renderIndicator(e, t) {
    const i = e === "uv", n = i ? "Indice UV" : "Qualité de l'air", r = i ? ke(t.state) : t.attributes.Libellé || t.attributes.libelle || null, o = i ? null : t.attributes.unit_of_measurement;
    return u`
      <div class="indicator-box indicator-${e}">
        <div class="indicator-label">${n}</div>
        <div class="indicator-row">
          <span class="indicator-value"
            >${t.state}${o ? ` ${o}` : ""}</span
          >
          ${r ? u`<span class="indicator-category">${r}</span>` : h}
        </div>
      </div>
    `;
  }
  // Bandeau bas : vent, lever/coucher de soleil. Chaque tuile n'apparaît
  // que si la donnée existe (attribut natif de l'entité météo pour le
  // vent, `sun.sun` pour lever/coucher) — pas de case à cocher requise
  // pour un usage de base. Libellé texte à côté de l'icône : une icône
  // seule pour lever/coucher est ambiguë (laquelle est laquelle ?).
  _renderBottomBand(e, t, i) {
    const n = [], r = e.attributes.wind_speed;
    if (this._config.show_wind && r != null) {
      const c = e.attributes.wind_speed_unit || "";
      n.push({
        type: "wind",
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(r)} ${c}`.trim()
      });
    }
    const o = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], l = o ? Number(o.state) : e.attributes.dew_point;
    if (this._config.show_dew_point && l != null && Number.isFinite(l)) {
      const c = o ? o.attributes.unit_of_measurement || e.attributes.temperature_unit || "°C" : e.attributes.temperature_unit || "°C";
      n.push({
        type: "dew-point",
        icon: "mdi:thermometer-water",
        label: "Point de rosée",
        // Arrondi à la décimale près (contrairement au reste des tuiles,
        // arrondies à l'entier) : la valeur bouge peu, la décimale aide à
        // voir qu'elle évolue.
        value: `${l.toFixed(1)}${c}`
      });
    }
    const a = this._hass.states[this._config.sun_entity || "sun.sun"];
    if (this._config.show_sun && a) {
      const c = a.attributes.next_rising ? new Date(a.attributes.next_rising) : null, d = a.attributes.next_setting ? new Date(a.attributes.next_setting) : null;
      c && n.push({
        type: "sunrise",
        icon: "mdi:weather-sunset-up",
        label: "Lever",
        value: b(c, t, i)
      }), d && n.push({
        type: "sunset",
        icon: "mdi:weather-sunset-down",
        label: "Coucher",
        value: b(d, t, i)
      });
    }
    return n.length ? u`
      <div class="bottom-band">
        ${n.map(
      (c) => u`
            <div class="band-tile band-${c.type}">
              <ha-icon class="band-icon" icon=${c.icon}></ha-icon>
              <span class="band-label">${c.label}</span>
              <span class="band-value">${c.value}</span>
            </div>
          `
    )}
      </div>
    ` : h;
  }
  _renderHourly(e, t) {
    const i = Date.now(), n = (this._hourly || []).filter((r) => new Date(r.datetime).getTime() >= i).slice(0, this._config.hourly_count);
    return n.length ? u`
      <div class="hourly">
        ${n.map((r) => {
      const o = new Date(r.datetime), l = E(
        r.condition,
        this._isNight(o)
      ), a = C(l, this._config.icons), c = q(this._hass, r.condition), d = r.precipitation_probability;
      return u`
            <div class="hourly-item">
              <div class="hourly-time">
                ${re(o, e, t)}
              </div>
              <img
                class="hourly-icon"
                src=${this._staticIcon(a)}
                alt=${c}
              />
              <div class="hourly-temp">
                ${Math.round(r.temperature)}°
              </div>
              ${this._config.show_precipitation_probability && d > 0 ? u`<div class="hourly-pop">${d}%</div>` : h}
            </div>
          `;
    })}
      </div>
    ` : h;
  }
  _renderDaily(e) {
    const t = (this._daily || []).slice(0, this._config.daily_count);
    return t.length ? u`
      <div class="daily">
        ${t.map((i) => {
      const n = new Date(i.datetime), r = E(i.condition, !1), o = C(r, this._config.icons), l = q(this._hass, i.condition);
      return u`
            <div
              class="daily-item"
              role="button"
              tabindex="0"
              @click=${() => {
        this._detailForecast = i;
      }}
              @keydown=${(a) => {
        (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this._detailForecast = i);
      }}
            >
              <div class="daily-day">${xe(n, e)}</div>
              <img
                class="daily-icon"
                src=${this._staticIcon(o)}
                alt=${l}
              />
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
    ` : h;
  }
  // Détail d'un jour de prévision, ouvert au clic/tap sur une tuile
  // .daily-item — ha-dialog est un composant du frontend HA, toujours
  // disponible dans ce contexte (la carte ne tourne que dans HA). Les
  // champs au-delà de température/condition varient selon l'intégration
  // météo ; chaque ligne n'apparaît que si la donnée existe sur la
  // prévision.
  _renderDayDetail(e, t, i) {
    const n = this._detailForecast;
    if (!n) return h;
    const r = () => {
      this._detailForecast = null;
    }, o = new Date(n.datetime), l = E(n.condition, !1), a = C(l, this._config.icons), c = q(this._hass, n.condition), d = e.attributes.temperature_unit || "°C", p = e.attributes.wind_speed_unit || "", m = [];
    n.precipitation_probability != null && m.push({
      icon: "mdi:water-percent",
      label: "Probabilité de pluie",
      value: `${Math.round(n.precipitation_probability)}%`
    }), n.precipitation != null && m.push({
      icon: "mdi:weather-pouring",
      label: "Cumul de précipitations",
      value: `${n.precipitation} mm`
    }), n.wind_speed != null && m.push({
      icon: "mdi:weather-windy",
      label: "Vent",
      value: `${Math.round(n.wind_speed)} ${p}`.trim()
    }), n.humidity != null && m.push({
      icon: "mdi:water-percent",
      label: "Humidité",
      value: `${Math.round(n.humidity)}%`
    }), n.uv_index != null && m.push({
      icon: "mdi:weather-sunny-alert",
      label: "Indice UV",
      value: `${n.uv_index}`
    });
    const _ = u`
      <div class="detail ${i ? "detail-list round-detail" : ""}">
        ${this._renderDialogHeader(Ae(o, t), r, i)}
        <img class="detail-icon" src=${a} alt=${c} />
        <div class="detail-condition">${c}</div>
        <div class="detail-temps">
          <span class="detail-max"
            >${Math.round(n.temperature)}${d}</span
          >
          <span class="detail-min"
            >${Math.round(n.templow)}${d}</span
          >
        </div>
        ${m.length ? u`<div class="detail-rows">
              ${m.map(
      (g) => u`<div class="detail-row">
                  <ha-icon icon=${g.icon}></ha-icon>
                  <span class="detail-row-label">${g.label}</span>
                  <span class="detail-row-value">${g.value}</span>
                </div>`
    )}
            </div>` : h}
      </div>
    `;
    return u`
      <ha-dialog
        class=${i ? "round-dialog" : ""}
        open
        hideActions
        @closed=${r}
      >
        ${i ? u`<div class="round-dialog-wrap">
              ${_} ${this._renderRoundBackButton(r)}
            </div>` : _}
      </ha-dialog>
    `;
  }
}
ee(ae, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 },
  _detailForecast: { state: !0 },
  _roundDialog: { state: !0 }
}), ee(ae, "styles", Je`
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
      --_row-gap: var(--echo-weather-row-gap, 2px);
      /* Icônes horaires uniquement désormais (actuelle et quotidien ont
         chacune leur propre variable ci-dessous) — actuelle et quotidien
         ont plus de marge verticale que les prévisions horaires, donc
         rien ne les oblige à partager la même taille. */
      --_icon-size: var(--echo-weather-icon-size, clamp(64px, 8.5cqw, 84px));
      --_current-icon-size: var(
        --echo-weather-current-icon-size,
        clamp(100px, 15cqw, 155px)
      );
      --_current-temp-size: var(
        --echo-weather-current-temp-size,
        clamp(3rem, 7.6cqw, 4.6rem)
      );
      --_hourly-temp-size: var(
        --echo-weather-hourly-temp-size,
        clamp(1.15rem, 2.4cqw, 1.5rem)
      );
      --_daily-icon-size: var(
        --echo-weather-daily-icon-size,
        clamp(38px, 5.2cqw, 49px)
      );
      --_daily-temp-size: var(
        --echo-weather-daily-temp-size,
        clamp(1.3rem, 2.6cqw, 1.6rem)
      );
      /* Jeu de couleurs sombre (par défaut) — repris/écrasé par
         :host(.light) ci-dessous quand le mode clair est actif (soleil
         levé, ou theme_mode forcé). Inspiré de RadarWise : dégradé doux
         plutôt qu'un fond plat, tuiles avec un léger relief (liseré haut
         + ombre portée) plutôt qu'un simple aplat. */
      --_mode-bg: radial-gradient(
        130% 140% at 18% -10%,
        #1c2c40 0%,
        #101a26 45%,
        #05080c 100%
      );
      --_mode-text: #ffffff;
      --_mode-secondary: #a9b4bf;
      --_mode-divider: rgba(255, 255, 255, 0.14);
      --_mode-tile-bg: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.12),
        rgba(255, 255, 255, 0.04)
      );
      --_mode-tile-border: rgba(255, 255, 255, 0.14);
      --_mode-tile-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18),
        0 3px 10px rgba(0, 0, 0, 0.35);
      --_text-color: var(--echo-weather-text-color, var(--_mode-text));
      --_secondary-color: var(
        --echo-weather-secondary-color,
        var(--_mode-secondary)
      );
      --_divider-color: var(--echo-weather-divider-color, var(--_mode-divider));
      --_tile-background: var(--echo-weather-tile-background, var(--_mode-tile-bg));
      --_tile-border: var(--echo-weather-tile-border, var(--_mode-tile-border));
      --_tile-shadow: var(--echo-weather-tile-shadow, var(--_mode-tile-shadow));
      /* --primary-font-family est la variable de thème HA standard (ce que
         change un thème/View Assist quand on choisit une police) : on la
         lit en repli avant d'abandonner à inherit, sinon un changement de
         police fait via le thème plutôt que via notre propre variable
         n'atteint jamais la carte. */
      font-family: var(
        --echo-weather-font-family,
        var(--primary-font-family, inherit)
      );
      color: var(--_text-color);
    }

    /* Mode clair : appliqué par render() (classe hôte) d'après le soleil,
       ou forcé via theme_mode. Écrase juste les tokens --_mode-*, tout le
       reste de la feuille de style s'adapte automatiquement à travers eux. */
    :host(.light) {
      --_mode-bg: radial-gradient(
        130% 140% at 18% -10%,
        #eef7fc 0%,
        #d7e9f4 45%,
        #bcdaeb 100%
      );
      --_mode-text: #16232e;
      --_mode-secondary: #57697a;
      --_mode-divider: rgba(22, 35, 46, 0.14);
      --_mode-tile-bg: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.5)
      );
      --_mode-tile-border: rgba(22, 35, 46, 0.12);
      --_mode-tile-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 3px 10px rgba(22, 35, 46, 0.1);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_row-gap) var(--_gap);
      gap: var(--_row-gap);
      background: var(--_mode-bg);
      /* 0 par défaut : la carte est pensée pour occuper tout l'écran d'un
         smart display (Echo Show, tablette...) plutôt qu'être une tuile
         parmi d'autres dans un dashboard — des coins arrondis par défaut
         créeraient un cadre visible contre les bords physiques de l'écran.
         Reste réglable via --echo-weather-radius pour un usage en tuile. */
      border-radius: var(--echo-weather-radius, 0px);
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
      /* flex-start plutôt que center : .current grandit via flex-grow
         pour occuper l'espace vertical disponible, et un centrage aurait
         réparti cet espace en trop au-dessus ET en dessous de l'icône —
         créant un bandeau vide visible en haut de la carte. Ancré en
         haut, l'espace en trop finit en bas (près de la bordure), sans
         rien au-dessus. */
      align-items: flex-start;
      gap: var(--_gap);
      flex: 1 1 33%;
      padding-bottom: var(--_row-gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .current-icon {
      width: var(--_current-icon-size);
      height: var(--_current-icon-size);
      flex-shrink: 0;
      /* Seule icône encore animée (SMIL) : on la promeut sur sa propre
         couche de composition GPU plutôt que de la laisser peinte dans le
         même calque que le reste de la carte. Sans ça, chaque frame de
         l'animation peut forcer le moteur à repeindre toute la zone
         environnante (pas juste l'icône) — ce qui expliquerait qu'elle
         tourne bien seule sur une page vide mais rame une fois intégrée à
         une mise en page chargée. */
      will-change: transform;
    }
    .current-temp {
      font-size: var(--_current-temp-size);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.01em;
    }
    .current-main {
      display: flex;
      flex-direction: column;
      min-width: 0;
      /* Pas de flex-grow : ne prend que sa largeur naturelle (le texte
         temp/condition/météo), sinon la boîte s'étire et pousse le
         groupe UV/humidité loin à droite au lieu de rester juste à
         côté de la température. */
      flex: 0 1 auto;
    }
    .current-condition {
      color: var(--_secondary-color);
      font-size: clamp(1.15rem, 2.1cqw, 1.45rem);
      font-weight: 500;
      margin-top: 6px;
    }
    /* Indice UV : tuile à deux lignes (libellé au-dessus, valeur +
       catégorie en dessous) — la version d'origine, jugée plus lisible
       qu'une puce sur une seule ligne. */
    .indicator-box {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 6px 14px;
      border-radius: 14px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
    }
    .indicator-label {
      font-size: clamp(0.82rem, 1.3cqw, 0.95rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .indicator-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .indicator-value {
      font-size: clamp(1.35rem, 2.5cqw, 1.65rem);
      font-weight: 800;
    }
    .indicator-uv .indicator-value {
      color: var(--echo-weather-uv-color, #ffb74d);
    }
    .indicator-air .indicator-value {
      color: var(--echo-weather-air-quality-color, #66bb6a);
    }
    .indicators-row {
      display: flex;
      gap: 10px;
    }
    .indicator-category {
      font-size: clamp(0.88rem, 1.4cqw, 1.05rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    /* Colonne UV + humidité, à côté du bloc temp/condition/météo plutôt
       qu'empilée dedans : elle s'étire (stretch) sur toute la hauteur du
       bloc actuel, tuile UV en haut et humidité poussée en bas (proche de
       la bordure séparant du bloc horaire) via justify-content. L'humidité
       reste sans fond ni bordure (pas un badge) : juste une icône goutte
       et la valeur, aussi grande que l'espace disponible le permet. */
    .uv-group {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .humidity-line {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: clamp(1.8rem, 3.9cqw, 2.6rem);
      font-weight: 800;
      white-space: nowrap;
    }
    .humidity-icon {
      --mdc-icon-size: clamp(32px, 4.8cqw, 43px);
      color: var(--echo-weather-humidity-color, #4fc3f7);
      flex-shrink: 0;
    }
    .current-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.95rem, 1.6cqw, 1.15rem);
      margin-top: 4px;
    }
    .current-info {
      display: flex;
      align-items: stretch;
      gap: 28px;
      flex: 1 1 auto;
      min-width: 0;
    }

    /* --- Colonne de droite : horloge + date + phase de lune/saint, aussi
       grandes que possible dans l'espace laissé libre à côté de la météo
       actuelle. --- */
    .current-side {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
      margin-left: auto;
    }
    /* Horloge + date + lune/saint collées ensemble (petit gap) plutôt
       qu'espacées comme le reste de la colonne — elles se lisent comme
       une seule unité. */
    .clock-group {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
    .clock {
      font-size: clamp(2.4rem, 5.2cqw, 3.4rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .date-line {
      color: var(--_secondary-color);
      font-size: clamp(1.25rem, 2.5cqw, 1.7rem);
      font-weight: 600;
      text-align: right;
      margin-top: 2px;
    }
    .moon-line {
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--_secondary-color);
      font-size: clamp(0.88rem, 1.5cqw, 1.08rem);
      font-weight: 500;
      text-align: right;
      margin-top: 2px;
    }
    .moon-icon {
      --mdc-icon-size: clamp(17px, 2.4cqw, 21px);
      color: var(--echo-weather-moon-color, #b0bec5);
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
      gap: 5px;
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
      gap: 3px;
      flex: 1;
      min-width: 0;
      padding: 6px 4px;
      border-radius: 14px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      /* Cliquable/tap-able : ouvre le détail du jour (_renderDayDetail). */
      cursor: pointer;
    }
    .daily-item:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
    .daily-day {
      color: var(--_secondary-color);
      font-size: clamp(0.95rem, 1.7cqw, 1.15rem);
      font-weight: 600;
      text-transform: capitalize;
    }
    .daily-icon {
      width: var(--_daily-icon-size);
      height: var(--_daily-icon-size);
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
      padding: 5px 10px;
      border-radius: 12px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
    }
    .band-icon {
      --mdc-icon-size: clamp(16px, 2.2cqw, 20px);
      flex-shrink: 0;
    }
    .band-wind .band-icon {
      color: var(--echo-weather-wind-color, #90a4ae);
    }
    .band-dew-point .band-icon {
      color: var(--echo-weather-dew-point-color, #4fc3f7);
    }
    .band-sunrise .band-icon {
      color: var(--echo-weather-sunrise-color, #ffb74d);
    }
    .band-sunset .band-icon {
      color: var(--echo-weather-sunset-color, #ff8a65);
    }
    .band-label {
      color: var(--_secondary-color);
      font-size: clamp(0.8rem, 1.4cqw, 0.95rem);
      font-weight: 600;
      white-space: nowrap;
    }
    .band-value {
      font-size: clamp(0.85rem, 1.5cqw, 1.05rem);
      font-weight: 700;
      white-space: nowrap;
    }

    /* Les icônes Meteocons "fill" ont des traits clairs pensés pour un
       fond sombre : en mode clair elles deviennent quasi invisibles sans
       aide. drop-shadow() (contrairement à box-shadow) suit la silhouette
       réelle de l'icône (alpha), donc ça ajoute un halo sombre autour des
       traits clairs sans plaque/cercle disgracieux derrière. Un halo
       statique (dégradé radial) a été testé sur l'icône actuelle pour
       éviter tout recalcul par frame, mais n'a ni amélioré le FPS ni le
       rendu (cercle visible, moins fidèle à la silhouette) : le vrai coût
       semble ailleurs (cf. will-change sur .current-icon), donc retour au
       drop-shadow partout, cohérent visuellement sur les trois tailles. */
    :host(.light) .current-icon,
    :host(.light) .hourly-icon,
    :host(.light) .daily-icon {
      filter: drop-shadow(0 0 2px rgba(10, 20, 30, 0.45))
        drop-shadow(0 0 5px rgba(10, 20, 30, 0.25));
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

    /* --- Détail d'un jour de prévision (ha-dialog) --- */
    ha-dialog {
      --mdc-dialog-min-width: min(90vw, 380px);
      --mdc-dialog-max-width: min(90vw, 380px);
      --mdc-theme-surface: var(--_mode-bg, #101a26);
      --mdc-dialog-content-ink-color: var(--_text-color);
      --mdc-dialog-heading-ink-color: var(--_text-color);
      color: var(--_text-color);
      font-family: inherit;
    }
    .detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 240px;
      padding: 4px 4px 8px;
    }
    .detail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .detail-date {
      font-size: 1.2rem;
      font-weight: 700;
      text-transform: capitalize;
    }
    .detail-close {
      --mdc-icon-size: 22px;
      color: var(--_secondary-color);
      cursor: pointer;
      flex-shrink: 0;
    }
    .detail-icon {
      width: 96px;
      height: 96px;
      margin-top: 6px;
    }
    .detail-condition {
      color: var(--_secondary-color);
      font-size: 1.05rem;
      font-weight: 500;
    }
    .detail-temps {
      font-size: 1.9rem;
      font-weight: 800;
      margin-top: 4px;
    }
    .detail-min {
      color: var(--_secondary-color);
      font-weight: 600;
      margin-left: 10px;
    }
    .detail-rows {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-top: 14px;
    }
    .detail-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
    }
    .detail-row ha-icon {
      --mdc-icon-size: 18px;
      color: var(--_secondary-color);
      flex-shrink: 0;
    }
    .detail-row-label {
      flex: 1;
      color: var(--_secondary-color);
      font-size: 0.9rem;
    }
    .detail-row-value {
      font-weight: 700;
      font-size: 0.95rem;
    }
    .detail-row-empty {
      color: var(--_secondary-color);
      font-size: 0.9rem;
      margin-top: 12px;
      text-align: center;
    }
    .detail-list {
      max-height: 70vh;
      overflow-y: auto;
    }
    .hourly-list,
    .daily-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      margin-top: 10px;
    }
    .hourly-list-item,
    .daily-list-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
    }
    .daily-list-item {
      cursor: pointer;
    }
    .hourly-list-time,
    .daily-list-day {
      width: 44px;
      flex-shrink: 0;
      color: var(--_secondary-color);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    .hourly-list-icon,
    .daily-list-icon {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }
    .hourly-list-temp,
    .daily-list-temps {
      flex: 1;
      font-weight: 700;
    }
    .hourly-list-pop {
      color: var(--_secondary-color);
      font-size: 0.8rem;
      width: 32px;
      text-align: right;
    }

    /* --- Mise en page "round" (petit écran circulaire) --- */
    .card.round {
      aspect-ratio: 1 / 1;
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      /* On se clippe nous-mêmes en cercle plutôt que de compter sur le
         boîtier physique : ça garantit qu'on ne dessine jamais rien au-delà
         de la zone visible, et ça donne un aperçu fidèle même testé dans
         une fenêtre carrée classique. */
      border-radius: 50%;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      gap: 5px;
      /* Le contenu est un empilement vertical centré, pas un bloc plein
         cadre : contrairement à un carré inscrit, il n'a pas besoin d'une
         marge symétrique généreuse pour que ses "coins" restent dans le
         cercle (il n'a pas de coins à cet endroit). Marge horizontale
         réduite (les lignes les plus larges — tuiles Aujourd'hui/Semaine —
         sont proches du centre vertical, là où la corde du cercle est la
         plus large) ; un peu plus de marge en haut/bas où le cercle se
         resserre. */
      padding: 9% 7%;
      text-align: center;
    }
    .round-clock {
      font-size: clamp(1.8rem, 17cqw, 2.6rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    /* Date + phase de lune + saint du jour, combinés sur une seule ligne
       sous l'horloge. min-width:0 à chaque niveau flex imbriqué, sinon
       l'ellipsis du span interne n'a jamais l'occasion de se déclencher
       (un flex-item ne rétrécit pas sous sa largeur de contenu par
       défaut). */
    .round-date-line {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      color: var(--_secondary-color);
      font-size: clamp(0.65rem, 5.4cqw, 0.8rem);
      font-weight: 500;
      margin-top: 2px;
      max-width: 100%;
      min-width: 0;
    }
    .round-date-line span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .round-date-icon {
      --mdc-icon-size: clamp(12px, 4.6cqw, 15px);
      color: var(--echo-weather-moon-color, #b0bec5);
      flex-shrink: 0;
    }
    /* Icône à gauche, infos (temp/condition/maj) à droite — comme le bloc
       météo actuelle en mise en page large, pour profiter de la largeur
       disponible plutôt que d'empiler verticalement. */
    .round-current {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      margin: 4px 0;
    }
    .round-current-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
      text-align: left;
    }
    .round-icon {
      width: clamp(76px, 34cqw, 112px);
      height: clamp(76px, 34cqw, 112px);
      flex-shrink: 0;
    }
    .round-temp {
      font-size: clamp(2.1rem, 20cqw, 3rem);
      font-weight: 800;
      line-height: 1;
    }
    .round-condition {
      color: var(--_secondary-color);
      font-size: clamp(0.95rem, 8cqw, 1.15rem);
      font-weight: 500;
      margin-top: 3px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .round-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.65rem, 5.4cqw, 0.8rem);
      font-weight: 600;
      margin-top: 3px;
      white-space: nowrap;
    }
    .round-updated {
      color: var(--_secondary-color);
      font-size: clamp(0.6rem, 4.8cqw, 0.72rem);
      margin-top: 2px;
      white-space: nowrap;
    }
    /* Ligne compacte d'indicateurs (UV, qualité de l'air, vent, point de
       rosée) — juste icône + valeur, pas de libellé, pour tenir sur une
       seule ligne dans le peu d'espace restant. */
    .round-indicators {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px 10px;
      margin-top: 5px;
      cursor: pointer;
    }
    .round-indicators:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
    .round-chip {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: clamp(0.85rem, 7cqw, 1.02rem);
      font-weight: 700;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .round-chip ha-icon {
      --mdc-icon-size: clamp(16px, 6.2cqw, 19px);
      flex-shrink: 0;
    }
    .round-launchers {
      display: flex;
      gap: 8px;
      margin-top: 9px;
    }
    .round-launcher {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 7px 11px;
      border-radius: 15px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      cursor: pointer;
    }
    .round-launcher-top {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: clamp(0.85rem, 7cqw, 1.02rem);
      font-weight: 600;
      white-space: nowrap;
    }
    .round-launcher-preview {
      font-size: clamp(0.75rem, 6.2cqw, 0.9rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .round-launcher:focus-visible,
    .round-current:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
    .round-launcher-top ha-icon {
      --mdc-icon-size: clamp(17px, 6.5cqw, 20px);
      flex-shrink: 0;
    }
    .round-chevron {
      --mdc-icon-size: clamp(16px, 6cqw, 19px);
      color: var(--_secondary-color);
      flex-shrink: 0;
    }
    :host(.light) .round-icon {
      filter: drop-shadow(0 0 2px rgba(10, 20, 30, 0.45))
        drop-shadow(0 0 5px rgba(10, 20, 30, 0.25));
    }

    /* --- Dialogues en mode round : boîte volontairement petite pour que
       même ses coins (pas juste son contenu) restent dans le cercle visible
       — le bouton fermer d'origine (haut-droite, cf. .detail-close) était
       justement dans la zone la plus susceptible d'être sous le boîtier
       physique. Remplacé par un bouton retour, centré, dans le flux normal
       (toujours après le contenu défilable — jamais de chevauchement
       possible, contrairement à un positionnement absolu calé au pixel). */
    ha-dialog.round-dialog {
      --mdc-dialog-min-width: 230px;
      --mdc-dialog-max-width: 230px;
    }
    .round-dialog-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .detail-list.round-detail {
      max-height: 280px;
      text-align: center;
    }
    .round-detail .detail-header {
      justify-content: center;
    }
    .round-back {
      width: 34px;
      height: 34px;
      --mdc-icon-size: 18px;
      border-radius: 50%;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--_text-color);
      flex-shrink: 0;
    }
    .round-back:focus-visible {
      outline: 2px solid var(--_text-color);
      outline-offset: 2px;
    }
  `);
customElements.define(Be, ae);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Be,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
