var ze = Object.defineProperty;
var qe = (n, e, t) => e in n ? ze(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var D = (n, e, t) => qe(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, G = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (G && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Z.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (n) => new ye(typeof n == "string" ? n : n + "", void 0, J), Te = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new ye(t, n, J);
}, Ne = (n, e) => {
  if (G) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = H.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, n.appendChild(s);
  }
}, Q = G ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Oe(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ue, defineProperty: Pe, getOwnPropertyDescriptor: He, getOwnPropertyNames: Re, getOwnPropertySymbols: Me, getPrototypeOf: De } = Object, y = globalThis, ee = y.trustedTypes, je = ee ? ee.emptyScript : "", j = y.reactiveElementPolyfillSupport, z = (n, e) => n, B = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? je : null;
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
} }, be = (n, e) => !Ue(n, e), te = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: be };
var me, fe;
(me = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (fe = y.litPropertyMetadata) != null || (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = te) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Pe(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    var o;
    const { get: i, set: r } = (o = He(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: i, set(l) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, l), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const e = De(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const t = this.properties, s = [...Re(t), ...Me(t)];
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
      for (const i of s) t.unshift(Q(i));
    } else e !== void 0 && t.push(Q(e));
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
    return Ne(e, this.constructor.elementStyles), e;
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
    var r;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : B).toAttribute(t, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, o, l;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : B;
      this._$Em = i;
      const d = c.fromAttribute(t, a.type);
      this[i] = (l = d != null ? d : (o = this._$Ej) == null ? void 0 : o.get(i)) != null ? l : d, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    var o, l;
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[e]), s != null || (s = a.getPropertyOptions(e)), !(((o = s.hasChanged) != null ? o : be)(r, t) || s.useDefault && s.reflect && r === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: r }, o) {
    var l, a, c;
    s && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = o != null ? o : t) != null ? a : this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((r) => {
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
var ge;
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[z("elementProperties")] = /* @__PURE__ */ new Map(), x[z("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: x }), ((ge = y.reactiveElementVersions) != null ? ge : y.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, se = (n) => n, R = q.trustedTypes, ie = R ? R.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, we = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + v, Le = `<${Ae}>`, k = document, T = () => k.createComment(""), N = (n) => n === null || typeof n != "object" && typeof n != "function", K = Array.isArray, Fe = (n) => K(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", L = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oe = /-->/g, re = />/g, b = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ne = /'/g, ae = /"/g, ke = /^(?:script|style|textarea|title)$/i, xe = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), f = xe(1), m = xe(2), S = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), le = /* @__PURE__ */ new WeakMap(), w = k.createTreeWalker(k, 129);
function Se(n, e) {
  if (!K(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(e) : e;
}
const Ie = (n, e) => {
  const t = n.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = C;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let c, d, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, d = o.exec(a), d !== null); ) p = o.lastIndex, o === C ? d[1] === "!--" ? o = oe : d[1] !== void 0 ? o = re : d[2] !== void 0 ? (ke.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = b) : d[3] !== void 0 && (o = b) : o === b ? d[0] === ">" ? (o = i != null ? i : C, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? b : d[3] === '"' ? ae : ne) : o === ae || o === ne ? o = b : o === oe || o === re ? o = C : (o = b, i = void 0);
    const g = o === b && n[l + 1].startsWith("/>") ? " " : "";
    r += o === C ? a + Le : h >= 0 ? (s.push(c), a.slice(0, h) + we + a.slice(h) + v + g) : a + v + (h === -2 ? l : g);
  }
  return [Se(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, d] = Ie(e, t);
    if (this.el = U.createElement(c, s), w.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = w.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(we)) {
          const p = d[o++], g = i.getAttribute(h).split(v), $ = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: $[2], strings: g, ctor: $[1] === "." ? Be : $[1] === "?" ? Ve : $[1] === "@" ? Ge : M }), i.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: r }), i.removeAttribute(h));
        if (ke.test(i.tagName)) {
          const h = i.textContent.split(v), p = h.length - 1;
          if (p > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let g = 0; g < p; g++) i.append(h[g], T()), w.nextNode(), a.push({ type: 2, index: ++r });
            i.append(h[p], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ae) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += v.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = k.createElement("template");
    return s.innerHTML = e, s;
  }
}
function E(n, e, t = n, s) {
  var o, l, a;
  if (e === S) return e;
  let i = s !== void 0 ? (o = t._$Co) == null ? void 0 : o[s] : t._$Cl;
  const r = N(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, t, s)), s !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[s] = i : t._$Cl = i), i !== void 0 && (e = E(n, i._$AS(n, e.values), i, s)), e;
}
class We {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((c = e == null ? void 0 : e.creationScope) != null ? c : k).importNode(t, !0);
    w.currentNode = i;
    let r = w.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new P(r, r.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (d = new Je(r, this, e)), this._$AV.push(d), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = w.nextNode(), o++);
    }
    return w.currentNode = k, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class P {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, s, i) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (r = i == null ? void 0 : i.isConnected) != null ? r : !0;
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
    e = E(this, e, t), N(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== S && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && N(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = U.createElement(Se(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const o = new We(i, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = le.get(e.strings);
    return t === void 0 && le.set(e.strings, t = new U(e)), t;
  }
  k(e) {
    K(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const r of e) i === t.length ? t.push(s = new P(this.O(T()), this.O(T()), this, this.options)) : s = t[i], s._$AI(r), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = se(e).nextSibling;
      se(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, t = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = E(this, e, t, 0), o = !N(e) || e !== this._$AH && e !== S, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = r[0], a = 0; a < r.length - 1; a++) c = E(this, l[s + a], t, a), c === S && (c = this._$AH[a]), o || (o = !N(c) || c !== this._$AH[a]), c === u ? e = u : e !== u && (e += (c != null ? c : "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Be extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Ve extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Ge extends M {
  constructor(e, t, s, i, r) {
    super(e, t, s, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = E(this, e, t, 0)) != null ? o : u) === S) return;
    const s = this._$AH, i = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (t = this.options) == null ? void 0 : t.host) != null ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Je {
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
const F = q.litHtmlPolyfillSupport;
var _e;
F == null || F(U, P), ((_e = q.litHtmlVersions) != null ? _e : q.litHtmlVersions = []).push("3.3.3");
const Ke = (n, e, t) => {
  var r, o;
  const s = (r = t == null ? void 0 : t.renderBefore) != null ? r : e;
  let i = s._$litPart$;
  if (i === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    s._$litPart$ = i = new P(e.insertBefore(T(), l), l, void 0, t != null ? t : {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class O extends x {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ke(t, this.renderRoot, this.renderOptions);
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
    return S;
  }
}
var $e;
O._$litElement$ = !0, O.finalized = !0, ($e = A.litElementHydrateSupport) == null || $e.call(A, { LitElement: O });
const I = A.litElementPolyfillSupport;
I == null || I({ LitElement: O });
var ve;
((ve = A.litElementVersions) != null ? ve : A.litElementVersions = []).push("4.2.2");
const Ee = "echo-home-card", Ye = "https://cdn.jsdelivr.net/npm/@meteocons/svg", _ = {
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
  clock_face: "digital",
  // "digital" ou "analog" — uniquement en mode
  // round (l'Echo Spot d'origine avait une horloge analogique). Sert
  // juste de valeur de départ : le petit bouton affiché en mode round
  // bascule l'affichage et retient le choix (localStorage) au-delà de
  // cette valeur de config.
  analog_style: "aurore",
  // habillage du cadran analogique — "aurore"
  // (défaut, dégradé turquoise/bleu/violet), "mono", "clair", "neon" ou
  // "ardoise" (cf. src/analog-styles.js). Contrairement à clock_face, ce
  // n'est qu'un réglage YAML : pas de bouton pour en changer à l'écran,
  // pas de mémorisation localStorage — un seul style choisi une fois.
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
}, Xe = {
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
function ce(n, e) {
  return n === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : n === "sunny" && e ? "clear-night" : Xe[n] || "not-available";
}
function ue(n, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${n}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${Ye}/${t}/${n}.svg`;
}
function de(n, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(n).replace(/\s/g, "");
}
function he(n, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(n);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ze(n, e) {
  return n.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const Qe = "aurore", W = {
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
}, pe = "echo-home-card-clock-face";
class V extends O {
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ..._,
      ...e,
      icons: { ..._.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {}), this._clockFace === void 0 && (this._clockFace = this._initClockFace());
  }
  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const e = localStorage.getItem(pe);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(pe, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const s = (i, r) => console.warn(
      `[echo-home-card] "${i}" invalide (${JSON.stringify(t[i])}), valeur par défaut utilisée (${JSON.stringify(r)})`
    );
    return e.layout !== null && e.layout !== "round" && (s("layout", _.layout), e.layout = _.layout), ["digital", "analog"].includes(e.clock_face) || (s("clock_face", _.clock_face), e.clock_face = _.clock_face), Object.keys(W).includes(e.analog_style) || (s("analog_style", _.analog_style), e.analog_style = _.analog_style), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (s("zoom", _.zoom), e.zoom = _.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
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
    var o, l, a, c;
    const t = (l = this._hass) == null ? void 0 : l.states[(o = this._config) == null ? void 0 : o.satellite_entity], s = (c = this._hass) == null ? void 0 : c.states[(a = this._config) == null ? void 0 : a.weather_entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.satellite_entity], r = e.states[this._config.weather_entity];
    (t !== i || s !== r) && this.requestUpdate();
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
    var Y, X;
    if (!this._config || !this._hass) return u;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, s = this._isNightMode(t);
    this.classList.toggle("night", s);
    const i = e.language || ((Y = this._hass.locale) == null ? void 0 : Y.language) || "en", r = e.time_format || ((X = this._hass.locale) == null ? void 0 : X.time_format) || "24", o = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, a = e.layout === "round", c = a && this._clockFace === "analog", d = e.show_weather && !s && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, h = d && !c, p = e.show_date && !s, g = c && !s ? null : this._backgroundValue(t, s), $ = c ? W[e.analog_style] || W[Qe] : null, Ce = this._cardStyle(
      g,
      $ ? `--_analog-default-bg:${$.background}` : null
    );
    return c || (this._secondHandDelay = void 0), f`
      <div
        class="card ${a ? "round" : ""} ${c ? "analog" : ""}"
        style=${Ce}
      >
        ${c ? u : f`<div class="shader"></div>`}
        ${h ? this._renderWeather(l) : u}
        <div class="clockgroup">
          ${e.show_clock ? c ? f`
                  ${this._renderAnalogComplications(
      $,
      d ? l : null,
      p,
      o,
      i
    )}
                  ${this._renderAnalogClock(o, i, r, $)}
                ` : f`<div class="clock">${de(o, i, r)}</div>` : u}
          ${p && !c ? f`<div class="date">${he(o, i)}</div>` : u}
        </div>
        ${a && !s ? this._renderClockToggle(c) : u}
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
  _renderAnalogComplications(e, t, s, i, r) {
    if (!t && !s) return u;
    let o = u;
    if (t) {
      const l = ce(t.state, this._isDarkOutside()), a = ue(l, this._config.icons), c = Number(t.attributes.temperature).toFixed(1), d = t.attributes.temperature_unit || "°C";
      o = f`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${a}
            alt=""
            style="filter:${e.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${c}${d}</span>
        </div>
      `;
    }
    return f`
      <div
        class="analog-complications"
        style="color:${e.comp.color};opacity:${e.comp.opacity}"
      >
        ${o}
        ${s ? f`<div class="analog-date">${he(i, r)}</div>` : u}
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
  _renderAnalogClock(e, t, s, i) {
    const r = e.getHours() % 12, o = e.getMinutes(), l = r * 30 + o * 0.5, a = o * 6, c = e.getSeconds() + e.getMilliseconds() / 1e3, d = c * 6;
    this._secondHandDelay === void 0 && (this._secondHandDelay = `-${c}s`);
    const h = i.shape === "rect" ? this._renderRectHands(i, l, a, d) : this._renderLineHands(i, l, a, d);
    return f`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${de(e, t, s)}
      >
        ${i.glow ? this._renderGlowFilter() : u}
        ${this._renderTicks(i.ticks, i.glow)}
        ${this._renderNumerals(i.numerals)}
        ${h}
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
    var r;
    if (!e) return u;
    const s = t ? "url(#echo-home-analog-glow)" : void 0, i = [];
    for (let o = 0; o < 12; o++) {
      const l = o % 3 === 0;
      if (e.mode === "minor" && l || e.mode === "cardinal" && !l || (r = e.skip) != null && r.includes(o)) continue;
      const a = o * 30;
      if (e.shape === "line")
        i.push(m`
          <line
            class="tick hand"
            x1="50"
            y1=${e.y1}
            x2="50"
            y2=${e.y2}
            stroke=${e.color}
            stroke-width=${e.width}
            opacity=${e.opacity}
            filter=${s != null ? s : u}
            transform="rotate(${a} 50 50)"
          />
        `);
      else {
        const c = this._polar(e.radius, a), d = l ? e.cardinalR : e.minorR, h = l ? e.cardinalOpacity : e.minorOpacity;
        i.push(m`
          <circle class="tick hand" cx=${c.x} cy=${c.y} r=${d} fill=${e.color} opacity=${h} filter=${s != null ? s : u} />
        `);
      }
    }
    return m`<g class="ticks">${i}</g>`;
  }
  // Chiffres : "quad" (12/3/6/9, style "aurore") ou "single" (12
  // seulement, style "ardoise"). Même rayon que les graduations à chaque
  // fois — les chiffres doivent être sur le même cercle qu'elles, pas
  // ramenés vers le centre, sinon ils paraissent "flotter" au milieu du
  // cadran au lieu de marquer l'heure à la même distance du bord
  // (corrigé en 1.1.4 pour "aurore", appliqué d'emblée ici aux autres).
  _renderNumerals(e) {
    if (!e) return u;
    const s = (e.mode === "single" ? [["12", 0]] : [["12", 0], ["3", 1], ["6", 2], ["9", 3]]).map(([i, r]) => {
      const o = this._polar(e.radius, r * 90);
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
        >${i}</text>
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
  _renderLineHands(e, t, s, i) {
    const r = e.glow ? "url(#echo-home-analog-glow)" : void 0, o = m`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - e.hour.len}
        stroke=${e.hour.color}
        stroke-width=${e.hour.width}
        stroke-linecap=${e.hour.cap}
        filter=${r != null ? r : u}
        transform="rotate(${t} 50 50)"
      />
    `, l = m`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - e.minute.len}
        stroke=${e.minute.color}
        stroke-width=${e.minute.width}
        stroke-linecap=${e.minute.cap}
        filter=${r != null ? r : u}
        transform="rotate(${s} 50 50)"
      />
    `, a = e.second, c = a.tipDot ? m`<circle class="hand" cx="50" cy=${50 - a.len} r=${a.tipDot.r} fill=${a.tipDot.fill} filter=${r != null ? r : u} />` : u, d = m`
      <g
        class="hand-second"
        style="animation-delay: ${this._secondHandDelay}; transform: rotate(${i}deg)"
      >
        <line
          class="hand"
          x1="50" y1=${50 + a.tail} x2="50" y2=${50 - a.len}
          stroke=${a.color}
          stroke-width=${a.width}
          stroke-linecap=${a.cap}
          opacity=${a.opacity}
          filter=${r != null ? r : u}
        />
        ${c}
      </g>
    `, h = e.center, p = h.ring ? m`
          <circle
            class="hand"
            cx="50" cy="50" r=${h.ring.r} fill="none"
            stroke=${h.ring.color} stroke-width=${h.ring.width}
          />
        ` : u;
    return m`
      ${o}${l}${d}
      ${p}
      <circle class="hand" cx="50" cy="50" r=${h.r} fill=${h.color} />
    `;
  }
  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(e, t, s, i) {
    const r = e.hour, o = e.minute, l = e.second, a = e.center;
    return m`
      <rect
        class="hand hand-hour"
        x=${50 - r.w / 2} y=${50 - r.len} width=${r.w} height=${r.len}
        fill=${r.color}
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
        style="animation-delay: ${this._secondHandDelay}; transform: rotate(${i}deg)"
      >
        <rect class="hand" x=${50 - l.w / 2} y=${50 - l.len} width=${l.w} height=${l.len} fill=${l.color} />
        <rect class="hand" x=${50 - l.w / 2} y="50" width=${l.w} height=${l.tail} fill=${l.color} />
      </g>
      <rect
        class="hand"
        x=${50 - a.size / 2} y=${50 - a.size / 2} width=${a.size} height=${a.size}
        fill=${a.color}
        transform="rotate(45 50 50)"
      />
    `;
  }
  // Petit bouton discret (mode round uniquement, masqué la nuit comme le
  // reste — pas de lumière/info superflue sur un écran de chevet) pour
  // basculer digital ↔ analogique. L'icône affichée est celle du cadran
  // vers lequel on bascule (convention usuelle pour un bouton toggle),
  // pas celle du cadran actuel.
  _renderClockToggle(e) {
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", s = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return f`
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
    const t = ce(e.state, this._isDarkOutside()), s = ue(t, this._config.icons), i = Number(e.attributes.temperature).toFixed(1), r = e.attributes.temperature_unit || "°C", o = Ze(this._hass, e.state), l = this._weatherClickable();
    return f`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : u}
        tabindex=${l ? "0" : u}
        aria-label="${o}, ${i}${r}"
        @click=${l ? () => this._navigateToWeather() : u}
        @keydown=${l ? (a) => this._onWeatherKeydown(a) : u}
      >
        <img class="weather-icon" src=${s} alt="" />
        <span class="weather-temp">${i}${r}</span>
      </div>
    `;
  }
}
D(V, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), D(V, "styles", Te`
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
      transform: translate(-50%, -50%);
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
      transform: translateX(-50%);
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

    /* Cadran analogique (mode round uniquement) : un écran à part, pas
       une variante du digital — comme sur l'Echo Spot d'origine sous
       Alexa (avant LineageOS/View Assist) : juste les aiguilles en plein
       écran sur un fond uni, sans photo, météo ni date (masquées dans
       render()). --_analog-size est un pourcentage du conteneur (quasi
       100%, cf. .card.round plus bas), pas un diamètre fixe en px, pour
       suivre la taille réelle de la carte. --_analog-default-bg vient du
       style choisi (analog_style, cf. analog-styles.js et render()) —
       --echo-home-analog-background (personnalisation utilisateur, cf.
       README) garde la priorité dessus. */
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
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
      transition: opacity 0.4s ease;
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

    /* Météo + date, superposées discrètement au cadran analogique (cf.
       _renderAnalogComplications) — même boîte que .analog-clock (donc
       alignée sur le même disque), rendue AVANT lui dans le DOM pour que
       les aiguilles/graduations restent toujours visibles par-dessus.
       pointer-events: none : une pure décoration, qui ne doit pas voler
       le tap destiné au bouton de bascule sous elle. Couleur/opacité
       posées en style inline par style analogique (cf. comp dans
       analog-styles.js), pas ici — pas de valeur commune à tous. */
    .analog-complications {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
      pointer-events: none;
    }

    /* Positions choisies pour rester dans la partie du cadran non
       balayée par les chiffres (radius ~40-41 sur un viewBox 0-100, cf.
       analog-styles.js) : la météo se love entre 10h et 11h, la date
       juste sous le centre — les aiguilles peuvent passer dessus sans
       gêner la lecture, comme un guichet de date sur une montre
       mécanique. */
    .analog-weather {
      position: absolute;
      left: 22%;
      top: 32%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 0.3em;
    }

    .analog-weather-icon {
      width: var(--_analog-weather-icon-size);
      height: var(--_analog-weather-icon-size);
      display: block;
    }

    .analog-weather-temp {
      font-size: var(--_analog-weather-temp-size);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .analog-date {
      position: absolute;
      left: 50%;
      top: 69%;
      transform: translate(-50%, -50%);
      font-size: var(--_analog-date-size);
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
customElements.define(Ee, V);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Ee,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
