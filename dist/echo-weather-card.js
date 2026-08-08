var De = Object.defineProperty;
var Ne = (r, e, t) => e in r ? De(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var V = (r, e, t) => Ne(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, ee = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), oe = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Re = (r) => new Ce(typeof r == "string" ? r : r + "", void 0, te), Le = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Ce(t, r, te);
}, Oe = (r, e) => {
  if (ee) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = I.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, le = ee ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Re(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: He, defineProperty: Ie, getOwnPropertyDescriptor: Fe, getOwnPropertyNames: Be, getOwnPropertySymbols: Je, getPrototypeOf: Ge } = Object, g = globalThis, ce = g.trustedTypes, je = ce ? ce.emptyScript : "", W = g.reactiveElementPolyfillSupport, C = (r, e) => r, K = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? je : null;
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
} }, Me = (r, e) => !He(r, e), de = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: Me };
var we, $e;
(we = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), ($e = g.litPropertyMetadata) != null || (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = de) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Ie(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var a;
    const { get: n, set: s } = (a = Fe(this.prototype, e)) != null ? a : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: n, set(l) {
      const o = n == null ? void 0 : n.call(this);
      s == null || s.call(this, l), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = Ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, i = [...Be(t), ...Je(t)];
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
      for (const n of i) t.unshift(le(n));
    } else e !== void 0 && t.push(le(e));
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
    return Oe(e, this.constructor.elementStyles), e;
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
    var s;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : K).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, a, l;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : K;
      this._$Em = n;
      const u = c.fromAttribute(t, o.type);
      this[n] = (l = u != null ? u : (a = this._$Ej) == null ? void 0 : a.get(n)) != null ? l : u, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    var a, l;
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (s = this[e]), i != null || (i = o.getPropertyOptions(e)), !(((a = i.hasChanged) != null ? a : Me)(s, t) || i.useDefault && i.reflect && s === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, a) {
    var l, o, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (o = a != null ? a : t) != null ? o : this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
        for (const [a, l] of this._$Ep) this[a] = l;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, l] of s) {
        const { wrapped: o } = l, c = this[a];
        o !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (n = this._$EO) == null || n.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
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
var xe;
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[C("elementProperties")] = /* @__PURE__ */ new Map(), x[C("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: x }), ((xe = g.reactiveElementVersions) != null ? xe : g.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ue = (r) => r, F = M.trustedTypes, he = F ? F.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Pe = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, qe = "?" + f, Ve = `<${qe}>`, $ = document, q = () => $.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", ie = Array.isArray, We = (r) => ie(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, b = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, fe = /"/g, ze = /^(?:script|style|textarea|title)$/i, Qe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), p = Qe(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), y = $.createTreeWalker($, 129);
function ke(r, e) {
  if (!ie(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return he !== void 0 ? he.createHTML(e) : e;
}
const Ye = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = E;
  for (let l = 0; l < t; l++) {
    const o = r[l];
    let c, u, h = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, u = a.exec(o), u !== null); ) m = a.lastIndex, a === E ? u[1] === "!--" ? a = pe : u[1] !== void 0 ? a = me : u[2] !== void 0 ? (ze.test(u[2]) && (n = RegExp("</" + u[2], "g")), a = b) : u[3] !== void 0 && (a = b) : a === b ? u[0] === ">" ? (a = n != null ? n : E, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? b : u[3] === '"' ? fe : _e) : a === fe || a === _e ? a = b : a === pe || a === me ? a = E : (a = b, n = void 0);
    const _ = a === b && r[l + 1].startsWith("/>") ? " " : "";
    s += a === E ? o + Ve : h >= 0 ? (i.push(c), o.slice(0, h) + Pe + o.slice(h) + f + _) : o + f + (h === -2 ? l : _);
  }
  return [ke(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class k {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const l = e.length - 1, o = this.parts, [c, u] = Ye(e, t);
    if (this.el = k.createElement(c, i), y.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = y.nextNode()) !== null && o.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Pe)) {
          const m = u[a++], _ = n.getAttribute(h).split(f), v = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: s, name: v[2], strings: _, ctor: v[1] === "." ? Ke : v[1] === "?" ? Xe : v[1] === "@" ? et : B }), n.removeAttribute(h);
        } else h.startsWith(f) && (o.push({ type: 6, index: s }), n.removeAttribute(h));
        if (ze.test(n.tagName)) {
          const h = n.textContent.split(f), m = h.length - 1;
          if (m > 0) {
            n.textContent = F ? F.emptyScript : "";
            for (let _ = 0; _ < m; _++) n.append(h[_], q()), y.nextNode(), o.push({ type: 2, index: ++s });
            n.append(h[m], q());
          }
        }
      } else if (n.nodeType === 8) if (n.data === qe) o.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(f, h + 1)) !== -1; ) o.push({ type: 7, index: s }), h += f.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = $.createElement("template");
    return i.innerHTML = e, i;
  }
}
function S(r, e, t = r, i) {
  var a, l, o;
  if (e === A) return e;
  let n = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const s = z(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== s && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? ((o = t._$Co) != null ? o : t._$Co = [])[i] = n : t._$Cl = n), n !== void 0 && (e = S(r, n._$AS(r, e.values), n, i)), e;
}
class Ze {
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
    const { el: { content: t }, parts: i } = this._$AD, n = ((c = e == null ? void 0 : e.creationScope) != null ? c : $).importNode(t, !0);
    y.currentNode = n;
    let s = y.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let u;
        o.type === 2 ? u = new U(s, s.nextSibling, this, e) : o.type === 1 ? u = new o.ctor(s, o.name, o.strings, this, e) : o.type === 6 && (u = new tt(s, this, e)), this._$AV.push(u), o = i[++l];
      }
      a !== (o == null ? void 0 : o.index) && (s = y.nextNode(), a++);
    }
    return y.currentNode = $, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class U {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, n) {
    var s;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = (s = n == null ? void 0 : n.isConnected) != null ? s : !0;
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
    e = S(this, e, t), z(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : We(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T($.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = k.createElement(ke(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === n) this._$AH.p(t);
    else {
      const a = new Ze(n, this), l = a.u(this.options);
      a.p(t), this.T(l), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = ge.get(e.strings);
    return t === void 0 && ge.set(e.strings, t = new k(e)), t;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new U(this.O(q()), this.O(q()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = ue(e).nextSibling;
      ue(e).remove(), e = n;
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
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = S(this, e, t, 0), a = !z(e) || e !== this._$AH && e !== A, a && (this._$AH = e);
    else {
      const l = e;
      let o, c;
      for (e = s[0], o = 0; o < s.length - 1; o++) c = S(this, l[i + o], t, o), c === A && (c = this._$AH[o]), a || (a = !z(c) || c !== this._$AH[o]), c === d ? e = d : e !== d && (e += (c != null ? c : "") + s[o + 1]), this._$AH[o] = c;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Ke extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class Xe extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class et extends B {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var a;
    if ((e = (a = S(this, e, t, 0)) != null ? a : d) === A) return;
    const i = this._$AH, n = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== d && (i === d || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class tt {
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
const Y = M.litHtmlPolyfillSupport;
var Ae;
Y == null || Y(k, U), ((Ae = M.litHtmlVersions) != null ? Ae : M.litHtmlVersions = []).push("3.3.3");
const it = (r, e, t) => {
  var s, a;
  const i = (s = t == null ? void 0 : t.renderBefore) != null ? s : e;
  let n = i._$litPart$;
  if (n === void 0) {
    const l = (a = t == null ? void 0 : t.renderBefore) != null ? a : null;
    i._$litPart$ = n = new U(e.insertBefore(q(), l), l, void 0, t != null ? t : {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class P extends x {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = it(t, this.renderRoot, this.renderOptions);
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
var Se;
P._$litElement$ = !0, P.finalized = !0, (Se = w.litElementHydrateSupport) == null || Se.call(w, { LitElement: P });
const Z = w.litElementPolyfillSupport;
Z == null || Z({ LitElement: P });
var Ee;
((Ee = w.litElementVersions) != null ? Ee : w.litElementVersions = []).push("4.2.2");
const Ue = "echo-weather-card", nt = "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill", rt = 1, st = 2, ve = {
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
  theme_mode: "auto"
}, at = {
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
function N(r, e) {
  return r === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : r === "sunny" && e ? "clear-night" : at[r] || "not-available";
}
function R(r, e) {
  return `${((e == null ? void 0 : e.base_url) || nt).replace(/\/$/, "")}/${r}.svg`;
}
const L = /* @__PURE__ */ new Map();
async function ot(r) {
  const t = await (await fetch(r)).text(), i = new DOMParser().parseFromString(t, "image/svg+xml");
  i.querySelectorAll("animate, animateTransform, animateMotion, animateColor, set").forEach((s) => s.remove());
  const n = new XMLSerializer().serializeToString(i.documentElement);
  return URL.createObjectURL(new Blob([n], { type: "image/svg+xml" }));
}
function lt(r, e) {
  const t = L.get(r);
  if (typeof t == "string") return t;
  if (!t) {
    const i = ot(r).catch(() => r).then((n) => (L.set(r, n), n));
    L.set(r, i);
  }
  return Promise.resolve(L.get(r)).then(() => e == null ? void 0 : e()), null;
}
function ct(r, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    hour12: t === "12"
  }).format(r).replace(/\s/g, "");
}
function O(r, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(r).replace(/\s/g, "");
}
function dt(r, e) {
  return new Intl.DateTimeFormat(e, { weekday: "short" }).format(r);
}
function be(r, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(r);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function H(r, e) {
  return r.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
function ut(r) {
  const e = Number(r);
  return Number.isFinite(e) ? e < 3 ? "Faible" : e < 6 ? "Modéré" : e < 8 ? "Élevé" : e < 11 ? "Très élevé" : "Extrême" : null;
}
function ye(r, e) {
  return (Number(r.attributes.supported_features) & e) !== 0;
}
async function ht(r, e, t) {
  var i, n;
  try {
    const s = await r.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: t },
      target: { entity_id: e },
      return_response: !0
    });
    return ((n = (i = s == null ? void 0 : s.response) == null ? void 0 : i[e]) == null ? void 0 : n.forecast) || [];
  } catch (s) {
    return console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${t})`,
      s
    ), [];
  }
}
function pt(r, e, t) {
  const i = r.states[e];
  if (!i) return () => {
  };
  const n = [];
  if (ye(i, rt) && n.push("daily"), ye(i, st) && n.push("hourly"), n.length === 0)
    return console.warn(
      `[echo-weather-card] ${e} ne supporte ni forecast daily ni hourly`
    ), () => {
    };
  const s = [];
  let a = !1;
  return n.forEach((l) => {
    r.connection.subscribeMessage(
      (o) => t(l, o.forecast || []),
      { type: "weather/subscribe_forecast", forecast_type: l, entity_id: e }
    ).then((o) => {
      a ? o() : s.push(o);
    }).catch(async (o) => {
      console.warn(
        `[echo-weather-card] souscription forecast "${l}" indisponible, repli sur get_forecasts`,
        o
      );
      const c = await ht(r, e, l);
      a || t(l, c);
    });
  }), () => {
    a = !0, s.forEach((l) => l());
  };
}
const mt = `
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
`, _t = new Map(
  mt.trim().split(`
`).map((r) => {
    const e = r.indexOf(":");
    return [r.slice(0, e), r.slice(e + 1)];
  })
);
function ft(r) {
  const e = String(r.getMonth() + 1).padStart(2, "0"), t = String(r.getDate()).padStart(2, "0");
  return _t.get(`${e}-${t}`) || null;
}
const gt = {
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
function vt(r) {
  return gt[r] || null;
}
class X extends P {
  setConfig(e) {
    if (!(e != null && e.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    this._config = {
      ...ve,
      ...e,
      icons: { ...ve.icons, ...e.icons || {} }
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
    var n, s;
    const t = (s = this._hass) == null ? void 0 : s.states[(n = this._config) == null ? void 0 : n.entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.entity];
    i && this._subscribedEntity !== this._config.entity && this._subscribeToForecasts(), t !== i && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _subscribeToForecasts() {
    var e;
    (e = this._unsubscribeForecasts) == null || e.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = pt(
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
    return lt(e, () => this.requestUpdate()) || e;
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
    var s, a;
    if (!this._config || !this._hass) return d;
    const e = this._hass.states[this._config.entity];
    if (!e)
      return p`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    this.classList.toggle("light", this._isLightMode());
    const t = this._config.language || ((s = this._hass.locale) == null ? void 0 : s.language) || "en", i = this._config.time_format || ((a = this._hass.locale) == null ? void 0 : a.time_format) || "24", n = this._config.background != null ? `background:${this._config.background}` : "";
    return p`
      <div class="card" style=${n}>
        ${this._config.title ? p`<div class="title">${this._config.title}</div>` : d}
        ${this._config.show_current ? this._renderCurrent(e, t, i) : d}
        ${this._config.show_hourly ? this._renderHourly(t, i) : d}
        ${this._config.show_daily ? this._renderDaily(t) : d}
        ${this._renderBottomBand(e, t, i)}
      </div>
      ${this._renderDayDetail(e, t)}
    `;
  }
  _renderCurrent(e, t, i) {
    const n = N(e.state, this._isNight()), s = R(n, this._config.icons), a = H(this._hass, e.state), l = e.attributes.temperature, o = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, u = e.attributes.humidity, h = e.last_updated ? new Date(e.last_updated) : null, m = [];
    this._config.show_feels_like && c != null && m.push(`Ressenti ${Math.round(c)}°`), this._config.show_last_updated && h && m.push(`Maj à ${O(h, t, i)}`);
    const _ = this._config.uv_entity && this._hass.states[this._config.uv_entity], v = _ && !["unknown", "unavailable"].includes(_.state), J = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity], ne = J && !["unknown", "unavailable"].includes(J.state), re = v || ne, se = this._config.show_humidity && u != null, Te = this._config.show_clock || this._config.show_date, G = /* @__PURE__ */ new Date(), ae = this._config.show_date ? ft(G) : null, j = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], T = j && !["unknown", "unavailable"].includes(j.state) ? vt(j.state) : null, D = [];
    return T && D.push(T.label), ae && D.push(ae), p`
      <div class="current">
        <img
          class="current-icon"
          src=${this._config.icons.animate_current ? s : this._staticIcon(s)}
          alt=${a}
        />
        <div class="current-info">
          <div class="current-main">
            <div class="current-temp">${Math.round(l)}${o}</div>
            <div class="current-condition">${a}</div>
            ${m.length ? p`<div class="current-meta">
                  ${m.join(" · ")}
                </div>` : d}
          </div>
          ${re || se ? p`
                <div class="uv-group">
                  ${re ? p`<div class="indicators-row">
                        ${v ? this._renderIndicator("uv", _) : d}
                        ${ne ? this._renderIndicator("air", J) : d}
                      </div>` : d}
                  ${se ? p`<div class="humidity-line">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(u)}%</span>
                      </div>` : d}
                </div>
              ` : d}
        </div>
        ${Te ? p`
              <div class="current-side">
                <div class="clock-group">
                  ${this._config.show_clock ? p`<div class="clock">
                        ${O(G, t, i)}
                      </div>` : d}
                  ${this._config.show_date ? p`<div class="date-line">
                        ${be(G, t)}
                      </div>` : d}
                  ${D.length ? p`<div class="moon-line">
                        ${T ? p`<ha-icon
                              class="moon-icon"
                              icon=${T.icon}
                            ></ha-icon>` : d}
                        <span>${D.join(" · ")}</span>
                      </div>` : d}
                </div>
              </div>
            ` : d}
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
    const i = e === "uv", n = i ? "Indice UV" : "Qualité de l'air", s = i ? ut(t.state) : t.attributes.Libellé || t.attributes.libelle || null, a = i ? null : t.attributes.unit_of_measurement;
    return p`
      <div class="indicator-box indicator-${e}">
        <div class="indicator-label">${n}</div>
        <div class="indicator-row">
          <span class="indicator-value"
            >${t.state}${a ? ` ${a}` : ""}</span
          >
          ${s ? p`<span class="indicator-category">${s}</span>` : d}
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
    const n = [], s = e.attributes.wind_speed;
    if (this._config.show_wind && s != null) {
      const c = e.attributes.wind_speed_unit || "";
      n.push({
        type: "wind",
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(s)} ${c}`.trim()
      });
    }
    const a = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], l = a ? Number(a.state) : e.attributes.dew_point;
    if (this._config.show_dew_point && l != null && Number.isFinite(l)) {
      const c = a ? a.attributes.unit_of_measurement || e.attributes.temperature_unit || "°C" : e.attributes.temperature_unit || "°C";
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
    const o = this._hass.states[this._config.sun_entity || "sun.sun"];
    if (this._config.show_sun && o) {
      const c = o.attributes.next_rising ? new Date(o.attributes.next_rising) : null, u = o.attributes.next_setting ? new Date(o.attributes.next_setting) : null;
      c && n.push({
        type: "sunrise",
        icon: "mdi:weather-sunset-up",
        label: "Lever",
        value: O(c, t, i)
      }), u && n.push({
        type: "sunset",
        icon: "mdi:weather-sunset-down",
        label: "Coucher",
        value: O(u, t, i)
      });
    }
    return n.length ? p`
      <div class="bottom-band">
        ${n.map(
      (c) => p`
            <div class="band-tile band-${c.type}">
              <ha-icon class="band-icon" icon=${c.icon}></ha-icon>
              <span class="band-label">${c.label}</span>
              <span class="band-value">${c.value}</span>
            </div>
          `
    )}
      </div>
    ` : d;
  }
  _renderHourly(e, t) {
    const i = Date.now(), n = (this._hourly || []).filter((s) => new Date(s.datetime).getTime() >= i).slice(0, this._config.hourly_count);
    return n.length ? p`
      <div class="hourly">
        ${n.map((s) => {
      const a = new Date(s.datetime), l = N(
        s.condition,
        this._isNight(a)
      ), o = R(l, this._config.icons), c = H(this._hass, s.condition), u = s.precipitation_probability;
      return p`
            <div class="hourly-item">
              <div class="hourly-time">
                ${ct(a, e, t)}
              </div>
              <img
                class="hourly-icon"
                src=${this._staticIcon(o)}
                alt=${c}
              />
              <div class="hourly-temp">
                ${Math.round(s.temperature)}°
              </div>
              ${this._config.show_precipitation_probability && u > 0 ? p`<div class="hourly-pop">${u}%</div>` : d}
            </div>
          `;
    })}
      </div>
    ` : d;
  }
  _renderDaily(e) {
    const t = (this._daily || []).slice(0, this._config.daily_count);
    return t.length ? p`
      <div class="daily">
        ${t.map((i) => {
      const n = new Date(i.datetime), s = N(i.condition, !1), a = R(s, this._config.icons), l = H(this._hass, i.condition);
      return p`
            <div
              class="daily-item"
              role="button"
              tabindex="0"
              @click=${() => {
        this._detailForecast = i;
      }}
              @keydown=${(o) => {
        (o.key === "Enter" || o.key === " ") && (o.preventDefault(), this._detailForecast = i);
      }}
            >
              <div class="daily-day">${dt(n, e)}</div>
              <img
                class="daily-icon"
                src=${this._staticIcon(a)}
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
    ` : d;
  }
  // Détail d'un jour de prévision, ouvert au clic/tap sur une tuile
  // .daily-item — ha-dialog est un composant du frontend HA, toujours
  // disponible dans ce contexte (la carte ne tourne que dans HA). Les
  // champs au-delà de température/condition varient selon l'intégration
  // météo ; chaque ligne n'apparaît que si la donnée existe sur la
  // prévision.
  _renderDayDetail(e, t) {
    const i = this._detailForecast;
    if (!i) return d;
    const n = () => {
      this._detailForecast = null;
    }, s = new Date(i.datetime), a = N(i.condition, !1), l = R(a, this._config.icons), o = H(this._hass, i.condition), c = e.attributes.temperature_unit || "°C", u = e.attributes.wind_speed_unit || "", h = [];
    return i.precipitation_probability != null && h.push({
      icon: "mdi:water-percent",
      label: "Probabilité de pluie",
      value: `${Math.round(i.precipitation_probability)}%`
    }), i.precipitation != null && h.push({
      icon: "mdi:weather-pouring",
      label: "Cumul de précipitations",
      value: `${i.precipitation} mm`
    }), i.wind_speed != null && h.push({
      icon: "mdi:weather-windy",
      label: "Vent",
      value: `${Math.round(i.wind_speed)} ${u}`.trim()
    }), i.humidity != null && h.push({
      icon: "mdi:water-percent",
      label: "Humidité",
      value: `${Math.round(i.humidity)}%`
    }), i.uv_index != null && h.push({
      icon: "mdi:weather-sunny-alert",
      label: "Indice UV",
      value: `${i.uv_index}`
    }), p`
      <ha-dialog open hideActions @closed=${n}>
        <div class="detail">
          <div class="detail-header">
            <div class="detail-date">${be(s, t)}</div>
            <ha-icon
              class="detail-close"
              icon=${"mdi:close"}
              role="button"
              tabindex="0"
              @click=${n}
              @keydown=${(m) => {
      (m.key === "Enter" || m.key === " ") && n();
    }}
            ></ha-icon>
          </div>
          <img class="detail-icon" src=${l} alt=${o} />
          <div class="detail-condition">${o}</div>
          <div class="detail-temps">
            <span class="detail-max"
              >${Math.round(i.temperature)}${c}</span
            >
            <span class="detail-min"
              >${Math.round(i.templow)}${c}</span
            >
          </div>
          ${h.length ? p`<div class="detail-rows">
                ${h.map(
      (m) => p`<div class="detail-row">
                    <ha-icon icon=${m.icon}></ha-icon>
                    <span class="detail-row-label">${m.label}</span>
                    <span class="detail-row-value">${m.value}</span>
                  </div>`
    )}
              </div>` : d}
        </div>
      </ha-dialog>
    `;
  }
}
V(X, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 },
  _detailForecast: { state: !0 }
}), V(X, "styles", Le`
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
  `);
customElements.define(Ue, X);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Ue,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
