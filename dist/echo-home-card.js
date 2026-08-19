var Ie = Object.defineProperty;
var We = (n, e, t) => e in n ? Ie(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var K = (n, e, t) => We(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, oe = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), ue = /* @__PURE__ */ new WeakMap();
let Ue = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (oe && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = ue.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && ue.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ge = (n) => new Ue(typeof n == "string" ? n : n + "", void 0, ie), Ke = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((a, o, s) => a + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[s + 1], n[0]);
  return new Ue(t, n, ie);
}, Je = (n, e) => {
  if (oe) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), o = B.litNonce;
    o !== void 0 && a.setAttribute("nonce", o), a.textContent = t.cssText, n.appendChild(a);
  }
}, de = oe ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return Ge(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ye, defineProperty: Xe, getOwnPropertyDescriptor: Ze, getOwnPropertyNames: Qe, getOwnPropertySymbols: et, getPrototypeOf: tt } = Object, k = globalThis, he = k.trustedTypes, at = he ? he.emptyScript : "", J = k.reactiveElementPolyfillSupport, R = (n, e) => n, te = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? at : null;
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
} }, Me = (n, e) => !Ye(n, e), pe = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: Me };
var Ee, qe;
(Ee = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (qe = k.litPropertyMetadata) != null || (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = pe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = Symbol(), o = this.getPropertyDescriptor(e, a, t);
      o !== void 0 && Xe(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    var i;
    const { get: o, set: s } = (i = Ze(this.prototype, e)) != null ? i : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: o, set(l) {
      const r = o == null ? void 0 : o.call(this);
      s == null || s.call(this, l), this.requestUpdate(e, r, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const e = tt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const t = this.properties, a = [...Qe(t), ...et(t)];
      for (const o of a) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [a, o] of t) this.elementProperties.set(a, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, a] of this.elementProperties) {
      const o = this._$Eu(t, a);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const o of a) t.unshift(de(o));
    } else e !== void 0 && t.push(de(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, a;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((a = e.hostConnected) == null || a.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const a of t.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Je(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((a) => {
      var o;
      return (o = a.hostConnected) == null ? void 0 : o.call(a);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var a;
      return (a = t.hostDisconnected) == null ? void 0 : a.call(t);
    });
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$ET(e, t) {
    var s;
    const a = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, a);
    if (o !== void 0 && a.reflect === !0) {
      const i = (((s = a.converter) == null ? void 0 : s.toAttribute) !== void 0 ? a.converter : te).toAttribute(t, a.type);
      this._$Em = e, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, i, l;
    const a = this.constructor, o = a._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = a.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((s = r.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? r.converter : te;
      this._$Em = o;
      const d = c.fromAttribute(t, r.type);
      this[o] = (l = d != null ? d : (i = this._$Ej) == null ? void 0 : i.get(o)) != null ? l : d, this._$Em = null;
    }
  }
  requestUpdate(e, t, a, o = !1, s) {
    var i, l;
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[e]), a != null || (a = r.getPropertyOptions(e)), !(((i = a.hasChanged) != null ? i : Me)(s, t) || a.useDefault && a.reflect && s === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(r._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: o, wrapped: s }, i) {
    var l, r, c;
    a && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (r = i != null ? i : t) != null ? r : this[e]), s !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var a, o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((a = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, l] of this._$Ep) this[i] = l;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, l] of s) {
        const { wrapped: r } = l, c = this[i];
        r !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((s) => {
        var i;
        return (i = s.hostUpdate) == null ? void 0 : i.call(s);
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
    (t = this._$EO) == null || t.forEach((a) => {
      var o;
      return (o = a.hostUpdated) == null ? void 0 : o.call(a);
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
var Oe;
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[R("elementProperties")] = /* @__PURE__ */ new Map(), E[R("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: E }), ((Oe = k.reactiveElementVersions) != null ? Oe : k.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, ge = (n) => n, I = N.trustedTypes, me = I ? I.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Pe = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, De = "?" + w, ot = `<${De}>`, z = document, P = () => z.createComment(""), D = (n) => n === null || typeof n != "object" && typeof n != "function", se = Array.isArray, it = (n) => se(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, _e = />/g, A = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ye = /'/g, $e = /"/g, je = /^(?:script|style|textarea|title)$/i, Le = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), y = Le(1), m = Le(2), q = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), x = z.createTreeWalker(z, 129);
function He(n, e) {
  if (!se(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return me !== void 0 ? me.createHTML(e) : e;
}
const st = (n, e) => {
  const t = n.length - 1, a = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = T;
  for (let l = 0; l < t; l++) {
    const r = n[l];
    let c, d, h = -1, p = 0;
    for (; p < r.length && (i.lastIndex = p, d = i.exec(r), d !== null); ) p = i.lastIndex, i === T ? d[1] === "!--" ? i = fe : d[1] !== void 0 ? i = _e : d[2] !== void 0 ? (je.test(d[2]) && (o = RegExp("</" + d[2], "g")), i = A) : d[3] !== void 0 && (i = A) : i === A ? d[0] === ">" ? (i = o != null ? o : T, h = -1) : d[1] === void 0 ? h = -2 : (h = i.lastIndex - d[2].length, c = d[1], i = d[3] === void 0 ? A : d[3] === '"' ? $e : ye) : i === $e || i === ye ? i = A : i === fe || i === _e ? i = T : (i = A, o = void 0);
    const g = i === A && n[l + 1].startsWith("/>") ? " " : "";
    s += i === T ? r + ot : h >= 0 ? (a.push(c), r.slice(0, h) + Pe + r.slice(h) + w + g) : r + w + (h === -2 ? l : g);
  }
  return [He(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class j {
  constructor({ strings: e, _$litType$: t }, a) {
    let o;
    this.parts = [];
    let s = 0, i = 0;
    const l = e.length - 1, r = this.parts, [c, d] = st(e, t);
    if (this.el = j.createElement(c, a), x.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = x.nextNode()) !== null && r.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Pe)) {
          const p = d[i++], g = o.getAttribute(h).split(w), f = /([.?@])?(.*)/.exec(p);
          r.push({ type: 1, index: s, name: f[2], strings: g, ctor: f[1] === "." ? rt : f[1] === "?" ? lt : f[1] === "@" ? ct : W }), o.removeAttribute(h);
        } else h.startsWith(w) && (r.push({ type: 6, index: s }), o.removeAttribute(h));
        if (je.test(o.tagName)) {
          const h = o.textContent.split(w), p = h.length - 1;
          if (p > 0) {
            o.textContent = I ? I.emptyScript : "";
            for (let g = 0; g < p; g++) o.append(h[g], P()), x.nextNode(), r.push({ type: 2, index: ++s });
            o.append(h[p], P());
          }
        }
      } else if (o.nodeType === 8) if (o.data === De) r.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(w, h + 1)) !== -1; ) r.push({ type: 7, index: s }), h += w.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const a = z.createElement("template");
    return a.innerHTML = e, a;
  }
}
function O(n, e, t = n, a) {
  var i, l, r;
  if (e === q) return e;
  let o = a !== void 0 ? (i = t._$Co) == null ? void 0 : i[a] : t._$Cl;
  const s = D(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), s === void 0 ? o = void 0 : (o = new s(n), o._$AT(n, t, a)), a !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[a] = o : t._$Cl = o), o !== void 0 && (e = O(n, o._$AS(n, e.values), o, a)), e;
}
class nt {
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
    const { el: { content: t }, parts: a } = this._$AD, o = ((c = e == null ? void 0 : e.creationScope) != null ? c : z).importNode(t, !0);
    x.currentNode = o;
    let s = x.nextNode(), i = 0, l = 0, r = a[0];
    for (; r !== void 0; ) {
      if (i === r.index) {
        let d;
        r.type === 2 ? d = new L(s, s.nextSibling, this, e) : r.type === 1 ? d = new r.ctor(s, r.name, r.strings, this, e) : r.type === 6 && (d = new ut(s, this, e)), this._$AV.push(d), r = a[++l];
      }
      i !== (r == null ? void 0 : r.index) && (s = x.nextNode(), i++);
    }
    return x.currentNode = z, o;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class L {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, a, o) {
    var s;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = o, this._$Cv = (s = o == null ? void 0 : o.isConnected) != null ? s : !0;
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
    e = O(this, e, t), D(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : it(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: a } = e, o = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = j.createElement(He(a.h, a.h[0]), this.options)), a);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(t);
    else {
      const i = new nt(o, this), l = i.u(this.options);
      i.p(t), this.T(l), this._$AH = i;
    }
  }
  _$AC(e) {
    let t = ve.get(e.strings);
    return t === void 0 && ve.set(e.strings, t = new j(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, o = 0;
    for (const s of e) o === t.length ? t.push(a = new L(this.O(P()), this.O(P()), this, this.options)) : a = t[o], a._$AI(s), o++;
    o < t.length && (this._$AR(a && a._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = ge(e).nextSibling;
      ge(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, o, s) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = s, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = u;
  }
  _$AI(e, t = this, a, o) {
    const s = this.strings;
    let i = !1;
    if (s === void 0) e = O(this, e, t, 0), i = !D(e) || e !== this._$AH && e !== q, i && (this._$AH = e);
    else {
      const l = e;
      let r, c;
      for (e = s[0], r = 0; r < s.length - 1; r++) c = O(this, l[a + r], t, r), c === q && (c = this._$AH[r]), i || (i = !D(c) || c !== this._$AH[r]), c === u ? e = u : e !== u && (e += (c != null ? c : "") + s[r + 1]), this._$AH[r] = c;
    }
    i && !o && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class rt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class lt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class ct extends W {
  constructor(e, t, a, o, s) {
    super(e, t, a, o, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = O(this, e, t, 0)) != null ? i : u) === q) return;
    const a = this._$AH, o = e === u && a !== u || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, s = e !== u && (a === u || o);
    o && this.element.removeEventListener(this.name, this, a), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, a;
    typeof this._$AH == "function" ? this._$AH.call((a = (t = this.options) == null ? void 0 : t.host) != null ? a : this.element, e) : this._$AH.handleEvent(e);
  }
}
class ut {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const X = N.litHtmlPolyfillSupport;
var Te;
X == null || X(j, L), ((Te = N.litHtmlVersions) != null ? Te : N.litHtmlVersions = []).push("3.3.3");
const dt = (n, e, t) => {
  var s, i;
  const a = (s = t == null ? void 0 : t.renderBefore) != null ? s : e;
  let o = a._$litPart$;
  if (o === void 0) {
    const l = (i = t == null ? void 0 : t.renderBefore) != null ? i : null;
    a._$litPart$ = o = new L(e.insertBefore(P(), l), l, void 0, t != null ? t : {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
class U extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, a;
    const e = super.createRenderRoot();
    return (a = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = dt(t, this.renderRoot, this.renderOptions);
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
    return q;
  }
}
var Re;
U._$litElement$ = !0, U.finalized = !0, (Re = S.litElementHydrateSupport) == null || Re.call(S, { LitElement: U });
const Z = S.litElementPolyfillSupport;
Z == null || Z({ LitElement: U });
var Ne;
((Ne = S.litElementVersions) != null ? Ne : S.litElementVersions = []).push("4.2.2");
const Fe = "echo-home-card", ht = "https://cdn.jsdelivr.net/npm/@meteocons/svg", v = {
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
  //   - "picsum" : photo vraiment aléatoire (Lorem Picsum), aucune clé
  //     requise mais aucun filtrage par thème possible. width/height
  //     optionnels (sinon la taille réelle de l'écran).
  //   - "unsplash" : photo aléatoire filtrable (query/orientation), clé
  //     API gratuite requise (access_key, cf. unsplash.com/developers).
  // Jamais de fond dynamique/photo (satellite/url/media_folder/picsum/
  // unsplash) en mode round pour analog_background : l'écran à part sur
  // fond uni reproduit volontairement l'Echo Spot d'origine (cf.
  // README) — retombe sur "style" si configuré quand même.
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
  // (défaut, dégradé turquoise/bleu/violet), "mono", "clair", "neon",
  // "ardoise", ou l'un des 7 styles "planétaires" (un par jour de la
  // semaine, du nom latin des jours : "lune", "mars", "mercure",
  // "jupiter", "venus", "saturne", "soleil" — cf. src/analog-styles.js).
  // Valeur spéciale "auto" : choisit automatiquement le style planétaire
  // du jour (lundi -> "lune", mardi -> "mars", etc., cf.
  // WEEKDAY_ANALOG_STYLES dans analog-styles.js) — recalculé à chaque
  // rendu, donc change tout seul à minuit sans reconfiguration.
  // Contrairement à clock_face, ce n'est qu'un réglage YAML : pas de
  // bouton pour en changer à l'écran, pas de mémorisation localStorage —
  // un seul style (ou "auto") choisi une fois. Ignoré si analog_background
  // a un type dynamique (satellite/url/media_folder) : retombe sur
  // "aurore", blanc, lisible sur n'importe quelle photo (les couleurs
  // d'un style donné, planétaire ou non, ne le sont pas forcément).
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
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
function be(n, e) {
  return n === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : n === "sunny" && e ? "clear-night" : pt[n] || "not-available";
}
function we(n, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${n}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${ht}/${t}/${n}.svg`;
}
function Q(n, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(n).replace(/\s/g, "");
}
function ee(n, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(n);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function gt(n, e) {
  return n.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const ke = "aurore", F = {
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
  },
  // --- Styles "planétaires" ------------------------------------------------
  // Un par jour de la semaine, sur le nom latin dont vient le jour français
  // (lundi = Lune, mardi = Mars, ...) — sélectionnables individuellement via
  // `analog_style`, ou tous les 7 automatiquement via `analog_style: "auto"`
  // (cf. WEEKDAY_ANALOG_STYLES plus bas, et sa résolution dans render()).
  //
  // Chacun définit en plus un bloc `night` optionnel : { background, color }.
  // Contrairement aux 5 styles ci-dessus (sans `night`, qui gardent le
  // traitement nuit uniforme d'origine — fond bleu marine fixe, aiguilles
  // rouge très atténué, cf. règles :host(.night) dans static styles), ces
  // styles gardent une identité propre même la nuit : fond et couleur
  // d'aiguilles/graduations/chiffres propres au jour, mais toujours sombres
  // et atténués (même --_night-opacity qu'avant, cf. _applyNightPalette) —
  // l'économie de lumière reste respectée, seule la teinte change.
  lune: {
    label: "Lune (lundi)",
    description: 'Argenté et nocturne même de jour : bleu-gris profond, aiguilles blanc cassé, un croissant à la place du "12".',
    background: "linear-gradient(145deg, #1c2333 0%, #2e3a55 55%, #46567c 100%)",
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 0.9,
      minorOpacity: 0.35,
      cardinalR: 1.5,
      cardinalOpacity: 0.7,
      color: "#dbe4f5"
    },
    numerals: {
      mode: "single",
      labels: ["☾"],
      radius: 40,
      size: 13,
      weight: 300,
      opacity: 0.85,
      color: "#dbe4f5"
    },
    hour: { len: 24, color: "#f4f7ff", width: 4, cap: "round" },
    minute: { len: 36, color: "#f4f7ff", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#a9c2f2", width: 1, cap: "round", opacity: 0.85, tipDot: { r: 1.3, fill: "#a9c2f2" } },
    center: { r: 1.8, color: "#f4f7ff", ring: { r: 3.2, width: 1, color: "#a9c2f2" } },
    comp: { color: "#dbe4f5", opacity: 0.65 },
    night: { background: "#050914", color: "#5b7bb0" }
  },
  mars: {
    label: "Mars (mardi)",
    description: "Martial et rouille : dégradé brique profond, aiguilles rectangulaires épaisses, accent rouge-orangé vif.",
    background: "linear-gradient(160deg, #7a1f1f 0%, #4a1010 60%, #2a0a0a 100%)",
    shape: "rect",
    ticks: {
      shape: "dot",
      mode: "cardinal",
      skip: [0],
      // position de midi laissée au chiffre "12" (numerals ci-dessous)
      radius: 44,
      cardinalR: 1.6,
      cardinalOpacity: 0.6,
      color: "#e8b8a0"
    },
    numerals: { mode: "single", radius: 40, size: 10, weight: 600, opacity: 0.8, color: "#e8b8a0" },
    hour: { w: 5, len: 26, color: "#f2c9b0" },
    minute: { w: 3, len: 38, color: "#f2c9b0" },
    second: { w: 1.2, len: 44, tail: 8, color: "#ff5533" },
    center: { size: 4, color: "#ff5533" },
    comp: { color: "#f2c9b0", opacity: 0.65 },
    night: { background: "#0d0402", color: "#a13f2e" }
  },
  mercure: {
    label: "Mercure (mercredi)",
    description: "Vif-argent et véloce : dégradé métallique clair, aiguilles très fines sans chiffres, accent bleu rapide.",
    background: "linear-gradient(135deg, #eef1f4 0%, #c3c9d1 45%, #8f96a3 100%)",
    ticks: { shape: "line", mode: "all", y1: 6, y2: 9, width: 0.8, color: "#2c2f36", opacity: 0.5 },
    numerals: null,
    hour: { len: 22, color: "#20232a", width: 3.6, cap: "round" },
    minute: { len: 35, color: "#20232a", width: 2.2, cap: "round" },
    second: { len: 43, tail: 6, color: "#3b6fd6", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 1.8, color: "#20232a" },
    // Fond clair (comme "clair") : icônes Meteocons repassées en silhouette
    // encre, sinon illisibles en blanc sur ce fond.
    comp: { color: "#20232a", opacity: 0.55, iconFilter: "brightness(0)" },
    night: { background: "#0a0b0d", color: "#5c6b85" }
  },
  jupiter: {
    label: "Jupiter (jeudi)",
    description: "Royal et doré : fond violet profond, chiffres et graduations or aux cardinaux, seconde blanche.",
    background: "linear-gradient(150deg, #2e1a47 0%, #472569 50%, #6b3a94 100%)",
    ticks: {
      shape: "dot",
      mode: "minor",
      // cardinaux laissés aux chiffres "12/3/6/9" ci-dessous, comme "aurore"
      radius: 44,
      minorR: 1,
      minorOpacity: 0.3,
      color: "#f2c65c"
    },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 500, opacity: 0.9, color: "#f2c65c" },
    hour: { len: 24, color: "#f2c65c", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#f5d98a", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#ffffff", width: 1, cap: "round", opacity: 0.85 },
    center: { r: 2, color: "#f2c65c", ring: { r: 3.6, width: 1, color: "#f5d98a" } },
    comp: { color: "#f2c65c", opacity: 0.75 },
    night: { background: "#0e081a", color: "#8a6a2e" }
  },
  venus: {
    label: "Vénus (vendredi)",
    description: "Élégant et rose doré : fond champagne clair, aiguilles fines encre, seconde corail, aucune graduation.",
    background: "linear-gradient(160deg, #f6d9d0 0%, #f0c3c9 50%, #e5a9c2 100%)",
    ticks: { shape: "dot", mode: "cardinal", radius: 44, cardinalR: 1.3, cardinalOpacity: 0.5, color: "#7a4a52" },
    numerals: null,
    hour: { len: 27, color: "#7a4a52", width: 4, cap: "butt" },
    minute: { len: 36, color: "#7a4a52", width: 2.3, cap: "butt" },
    second: { len: 42, tail: 0, color: "#e0637d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#7a4a52" },
    comp: { color: "#7a4a52", opacity: 0.6, iconFilter: "brightness(0)" },
    night: { background: "#160a10", color: "#8a5566" }
  },
  saturne: {
    label: "Saturne (samedi)",
    description: "Lourd et cerclé : fond bronze/plomb mat, un fin anneau elliptique autour du cadran façon anneaux de Saturne.",
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.3), transparent 60%), #4a3f30",
    shape: "rect",
    // Anneau décoratif propre à ce style — rendu derrière graduations et
    // aiguilles (cf. _renderOuterRing, appelé avant _renderTicks dans
    // _renderAnalogClock) pour ne jamais gêner leur lisibilité.
    outerRing: { rx: 47, ry: 30, rotate: -18, color: "#c9a86a", width: 1.2, opacity: 0.5 },
    ticks: {
      shape: "dot",
      mode: "all",
      skip: [0],
      // position de midi laissée au chiffre "12"
      radius: 44,
      minorR: 1,
      minorOpacity: 0.22,
      cardinalR: 1,
      cardinalOpacity: 0.3,
      color: "#e7dcc4"
    },
    numerals: { mode: "single", radius: 40, size: 9, weight: 300, opacity: 0.7, color: "#e7dcc4" },
    hour: { w: 5, len: 24, color: "#e7dcc4" },
    minute: { w: 3, len: 36, color: "#d8caa0" },
    second: { w: 1.2, len: 42, tail: 8, color: "#c9a86a" },
    center: { size: 4, color: "#c9a86a" },
    comp: { color: "#e7dcc4", opacity: 0.6 },
    night: { background: "#0a0805", color: "#6b5a3a" }
  },
  soleil: {
    label: "Soleil (dimanche)",
    description: "Rayonnant et chaud : dégradé orange/jaune façon lever de soleil, graduations fines sur les 12 heures façon rayons, halo activé.",
    background: "linear-gradient(160deg, #ffb545 0%, #ff8a3d 55%, #ff5e3a 100%)",
    glow: !0,
    ticks: { shape: "line", mode: "all", y1: 4, y2: 9, width: 1.2, color: "#fff6e0", opacity: 0.85 },
    numerals: null,
    hour: { len: 23, color: "#fff6e0", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#fff6e0", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c81d1d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#fff6e0" },
    comp: { color: "#fff6e0", opacity: 0.85 },
    // Le soleil est couché la nuit : bascule sur un indigo profond plutôt
    // que de garder le fond orange/jaune, aiguilles en braises ambrées.
    night: { background: "#0a0e1e", color: "#8a5a2e" }
  }
}, mt = [
  "soleil",
  // dimanche
  "lune",
  // lundi
  "mars",
  // mardi
  "mercure",
  // mercredi
  "jupiter",
  // jeudi
  "venus",
  // vendredi
  "saturne"
  // samedi
], ft = ["cover", "contain", "fill"], b = "cover", M = 300, _t = ["landscape", "portrait", "squarish"], V = ["satellite", "url", "media_folder", "picsum", "unsplash"];
function yt(n) {
  return n === "contain" ? "contain" : n === "fill" ? "100% 100%" : "cover";
}
function C(n, e) {
  return `center / ${yt(e)} no-repeat url("${n}")`;
}
function Ae(n, e, t) {
  if (n != null) {
    if (typeof n == "string") return { type: "css", value: n };
    if (typeof n == "object") return { type: t, ...n };
  } else if (e)
    return { type: "satellite" };
  return { type: t };
}
function xe(n, e, t, a, o) {
  var i;
  const s = { ...n };
  return e.includes(s.type) || (o(`${a}.type`, t), s.type = t), s.fit != null && !ft.includes(s.fit) && (o(`${a}.fit`, b), s.fit = b), s.interval != null && (typeof s.interval != "number" || !Number.isFinite(s.interval) || s.interval <= 0) && (o(`${a}.interval`, M), s.interval = M), s.type === "url" && !s.url && !(((i = s.urls) == null ? void 0 : i.length) > 0) && (o(`${a}.url`, "satellite"), s.type = "satellite"), s.type === "media_folder" && !s.path && (o(`${a}.path`, "satellite"), s.type = "satellite"), s.type === "unsplash" && !s.access_key && (o(`${a}.access_key`, "satellite"), s.type = "satellite"), s.orientation != null && !_t.includes(s.orientation) && (o(`${a}.orientation`, "aucune"), delete s.orientation), s;
}
async function $t(n, e) {
  return ((await n.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children || []).filter(
    (a) => {
      var o;
      return a.media_class === "image" || ((o = a.media_content_type) == null ? void 0 : o.startsWith("image/"));
    }
  ).map((a) => a.media_content_id);
}
async function vt(n, e) {
  return (await n.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
class Se {
  constructor(e) {
    this._onChange = e, this._signature = null, this._images = [], this._resolvedUrl = null, this._index = 0, this._timer = null, this._token = 0, this.cssValue = null;
  }
  configure(e, t, a) {
    var i, l;
    const o = JSON.stringify([t, a]);
    if (o === this._signature) return;
    this._signature = o, this._token += 1;
    const s = this._token;
    switch (clearInterval(this._timer), this._timer = null, this._images = [], this._index = 0, t.type) {
      case "style":
        this.cssValue = null;
        return;
      case "css":
        this.cssValue = (i = t.value) != null ? i : null;
        return;
      case "satellite":
        this.cssValue = a.isNightMode ? null : a.satelliteBackgroundUrl ? C(a.satelliteBackgroundUrl, b) : null;
        return;
      case "url": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        const r = (l = t.urls) != null && l.length ? t.urls : [t.url];
        this._images = r, this.cssValue = C(r[0], t.fit || b), this._startRotation(e, t, s);
        return;
      }
      case "media_folder": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadMediaFolder(e, t, s);
        return;
      }
      case "picsum": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        this._setPicsumUrl(t), this._timer = setInterval(() => {
          s === this._token && (this._setPicsumUrl(t), this._onChange());
        }, (t.interval || M) * 1e3);
        return;
      }
      case "unsplash": {
        if (a.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadUnsplash(t, s), this._timer = setInterval(() => {
          s === this._token && this._loadUnsplash(t, s);
        }, (t.interval || M) * 1e3);
        return;
      }
      default:
        this.cssValue = null;
    }
  }
  // Lorem Picsum (picsum.photos) : aucune clé requise, mais aucun
  // filtrage par thème/mot-clé possible non plus — une photo vraiment
  // quelconque à chaque tirage (cf. RANDOM_IMAGE_URL de View Assist,
  // qui utilise ce même service via l'ancien domaine unsplash.it). La
  // taille de l'image demandée suit le viewport réel (fenêtre = écran
  // sur un Echo Show/Spot en usage normal, cf. gotchas matériel) sauf
  // si width/height sont précisés — ?random=<horodatage changeant>
  // pour forcer une image différente à chaque appel malgré le cache du
  // navigateur (une URL identique reste sinon mise en cache).
  _setPicsumUrl(e) {
    const t = e.width || Math.round(window.innerWidth) || 960, a = e.height || Math.round(window.innerHeight) || 480, o = `https://picsum.photos/${t}/${a}?random=${Date.now()}`;
    this.cssValue = C(o, e.fit || b);
  }
  // API Unsplash officielle (contrairement à "picsum" ci-dessus) :
  // filtrage par mot-clé (query) et/ou orientation possible, mais
  // access_key requis (compte développeur gratuit sur
  // unsplash.com/developers — palier "Demo" plafonné à 50 requêtes/
  // heure, cf. DEFAULT_INTERVAL). Pas de suivi des téléchargements
  // (download_location, recommandé par les règles d'usage de l'API pour
  // un usage à grande échelle) : hors de propos pour un cadre photo
  // personnel, mais à garder en tête pour un usage plus large.
  async _loadUnsplash(e, t) {
    var a, o;
    try {
      const s = new URLSearchParams({ client_id: e.access_key });
      e.query && s.set("query", e.query), e.orientation && s.set("orientation", e.orientation), e.collections && s.set("collections", e.collections);
      const i = await fetch(`https://api.unsplash.com/photos/random?${s}`);
      if (!i.ok) throw new Error(`HTTP ${i.status}`);
      const l = await i.json();
      if (t !== this._token) return;
      const r = ((a = l == null ? void 0 : l.urls) == null ? void 0 : a.regular) || ((o = l == null ? void 0 : l.urls) == null ? void 0 : o.full);
      if (!r) throw new Error("réponse Unsplash sans URL d'image exploitable");
      this.cssValue = C(r, e.fit || b), this._onChange();
    } catch (s) {
      if (t !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de récupérer une photo Unsplash (clé invalide, quota dépassé, ou hors-ligne ?)",
        s
      );
    }
  }
  async _loadMediaFolder(e, t, a) {
    try {
      const o = await $t(e, t.path);
      if (a !== this._token) return;
      if (this._images = o, !o.length) {
        console.warn(
          `[echo-home-card] aucune image trouvée dans le dossier Media Source "${t.path}"`
        ), this.cssValue = null, this._onChange();
        return;
      }
      await this._showMediaAt(e, t, a, 0), this._startRotation(e, t, a);
    } catch (o) {
      if (a !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de parcourir le dossier Media Source "${t.path}"`,
        o
      ), this.cssValue = null, this._onChange();
    }
  }
  async _showMediaAt(e, t, a, o) {
    try {
      const s = await vt(e, this._images[o]);
      if (a !== this._token) return;
      this.cssValue = C(s, t.fit || b), this._onChange();
    } catch (s) {
      if (a !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de charger une image du dossier Media Source",
        s
      );
    }
  }
  // Commune à "url" (rotation directe, pas de résolution) et
  // "media_folder" (résolution à chaque image, cf. _showMediaAt) —
  // seulement démarrée si plusieurs images (une source à une seule image
  // n'a pas besoin de minuteur).
  _startRotation(e, t, a) {
    if (this._images.length <= 1) return;
    const o = (t.interval || M) * 1e3;
    this._timer = setInterval(async () => {
      a === this._token && (this._index = (this._index + 1) % this._images.length, t.type === "media_folder" ? await this._showMediaAt(e, t, a, this._index) : (this.cssValue = C(this._images[this._index], t.fit || b), this._onChange()));
    }, o);
  }
  destroy() {
    clearInterval(this._timer), this._timer = null, this._token += 1;
  }
}
const ze = "echo-home-card-clock-face", Ce = new Date(2e3, 0, 27, 12, 59);
class ae extends U {
  // Une source par présentation (digital/analogique), chacune avec son
  // propre réglage indépendant (background/analog_background, cf.
  // const.js) — cf. src/background.js. onChange redéclenche un rendu
  // Lit quand une résolution/rotation asynchrone (dossier Media Source,
  // plusieurs URLs) change la valeur CSS courante ; render() n'attend
  // jamais cette résolution, il lit juste le dernier résultat connu
  // (`.cssValue`, synchrone).
  constructor() {
    super(), this._digitalBackground = new Se(() => this.requestUpdate()), this._analogBackground = new Se(() => this.requestUpdate());
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
      const e = localStorage.getItem(ze);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(ze, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const a = (i, l) => console.warn(
      `[echo-home-card] "${i}" invalide (${JSON.stringify(t[i])}), valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.layout !== null && e.layout !== "round" && (a("layout", v.layout), e.layout = v.layout), ["digital", "analog"].includes(e.clock_face) || (a("clock_face", v.clock_face), e.clock_face = v.clock_face), e.analog_style !== "auto" && !Object.keys(F).includes(e.analog_style) && (a("analog_style", v.analog_style), e.analog_style = v.analog_style), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (a("zoom", v.zoom), e.zoom = v.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-home-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable.`
    );
    const o = (i, l) => console.warn(
      `[echo-home-card] "${i}" invalide, valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.background = xe(
      Ae(e.background, !1, "satellite"),
      ["css", ...V],
      "satellite",
      "background",
      o
    );
    let s = xe(
      Ae(
        e.analog_background,
        e.analog_background_photo,
        "style"
      ),
      ["style", "css", ...V],
      "style",
      "analog_background",
      o
    );
    return e.layout === "round" && V.includes(s.type) && (o("analog_background.type", "style"), s = { type: "style" }), e.analog_background = s, e;
  }
  static getStubConfig(e) {
    const t = Object.keys(e.states).find(
      (a) => a.startsWith("weather.")
    );
    return t ? { weather_entity: t } : {};
  }
  getCardSize() {
    return 6;
  }
  connectedCallback() {
    super.connectedCallback(), this._scheduleClockTick(), this._resizeObserver = new ResizeObserver(() => this._fitOverflowingText()), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), clearTimeout(this._clockTimer), (e = this._resizeObserver) == null || e.disconnect(), this._digitalBackground.destroy(), this._analogBackground.destroy();
  }
  // Horloge : un tick recalé sur chaque changement de minute réelle,
  // pas un setInterval(30000) fixe démarré à la connexion du composant
  // (l'ancien comportement) — celui-ci ne tombait quasiment jamais pile
  // sur la bascule de minute (déphasé de jusqu'à 30s selon l'instant de
  // connexion), un décalage qui ne se corrigeait jamais tout seul :
  // l'horloge digitale, et surtout l'aiguille des minutes en
  // analogique (qui elle n'a pas d'animation continue pour masquer le
  // problème comme la trotteuse), changeaient de valeur jusqu'à 30s
  // après le vrai changement de minute plutôt qu'au bon moment —
  // signalé après un vrai test sur appareil. setTimeout recalculé à
  // chaque tick (pas setInterval) : se recale sur la seconde 0 de la
  // minute suivante à chaque fois, s'auto-corrige si un tick est
  // arrivé en retard plutôt que d'accumuler la dérive.
  _scheduleClockTick() {
    const e = /* @__PURE__ */ new Date(), t = 6e4 - (e.getSeconds() * 1e3 + e.getMilliseconds());
    this._clockTimer = setTimeout(() => {
      var a, o;
      ((a = this._config) != null && a.show_clock || (o = this._config) != null && o.show_date) && this.requestUpdate(), this._scheduleClockTick();
    }, t + 250);
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
  // lecture de layout par élément, au pire une fois par minute (tick
  // d'horloge, cf. _scheduleClockTick) ou au redimensionnement — jamais
  // par frame.
  _fitOverflowingText() {
    var r, c, d, h;
    const e = this.shadowRoot, t = e == null ? void 0 : e.querySelector(".card"), a = this._config;
    if (!t || !a) return;
    const o = a.language || ((c = (r = this._hass) == null ? void 0 : r.locale) == null ? void 0 : c.language) || "en", s = a.time_format || ((h = (d = this._hass) == null ? void 0 : d.locale) == null ? void 0 : h.time_format) || "24", i = t.getBoundingClientRect().width * 0.92, l = {
      ".clock": Q(Ce, o, s),
      ".date": ee(Ce, o)
    };
    for (const [p, g] of Object.entries(l)) {
      const f = e.querySelector(p);
      if (!f) continue;
      const $ = f.cloneNode(!1);
      $.textContent = g, $.style.position = "absolute", $.style.visibility = "hidden", $.style.left = "-9999px", $.style.removeProperty("--_fit-scale"), f.parentNode.appendChild($);
      const H = $.scrollWidth;
      $.remove();
      const _ = H > i ? i / H : 1;
      f.style.setProperty("--_fit-scale", _);
    }
  }
  set hass(e) {
    var i, l, r, c;
    const t = (l = this._hass) == null ? void 0 : l.states[(i = this._config) == null ? void 0 : i.satellite_entity], a = (c = this._hass) == null ? void 0 : c.states[(r = this._config) == null ? void 0 : r.weather_entity];
    if (this._hass = e, !this._config) return;
    const o = e.states[this._config.satellite_entity], s = e.states[this._config.weather_entity];
    (t !== o || a !== s) && this.requestUpdate();
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
    const a = [];
    return e != null && a.push(`background:${e}`), this._config.zoom != null && this._config.zoom !== 1 && a.push(`zoom:${this._config.zoom}`), t && a.push(t), a.join(";");
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
    var re, le, ce;
    if (!this._config || !this._hass) return u;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, a = this._isNightMode(t);
    this.classList.toggle("night", a);
    const o = e.language || ((re = this._hass.locale) == null ? void 0 : re.language) || "en", s = e.time_format || ((le = this._hass.locale) == null ? void 0 : le.time_format) || "24", i = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, r = e.layout === "round", c = this._clockFace === "analog", d = {
      isNightMode: a,
      satelliteBackgroundUrl: (ce = t == null ? void 0 : t.attributes) == null ? void 0 : ce.background
    };
    this._digitalBackground.configure(this._hass, e.background, d), this._analogBackground.configure(this._hass, e.analog_background, d);
    const h = c && !r && !a && V.includes(e.analog_background.type), p = e.show_weather && !a && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, g = p && !c, f = e.show_date && !a, $ = c ? h ? this._analogBackground.cssValue : null : this._digitalBackground.cssValue, H = e.analog_style === "auto" ? mt[i.getDay()] : e.analog_style, _ = c ? h ? F[ke] : F[H] || F[ke] : null, G = a && c && !!(_ != null && _.night), ne = G ? this._applyNightPalette(_) : _, Ve = G ? _.night.background : e.analog_background.type === "css" ? e.analog_background.value : _ == null ? void 0 : _.background, Be = this._cardStyle(
      $,
      _ && !h ? `--_analog-default-bg:${Ve}` : null
    );
    return y`
      <div
        class="card ${r ? "round" : ""} ${c ? "analog" : ""} ${G ? "custom-night" : ""}"
        style=${Be}
      >
        ${!c || h ? y`<div class="shader"></div>` : u}
        ${g ? this._renderWeather(l) : u}
        <div class="clockgroup">
          ${e.show_clock ? c ? y`
                  ${this._renderAnalogComplications(
      ne,
      p ? l : null,
      f,
      i,
      o
    )}
                  ${this._renderAnalogClock(i, o, s, ne)}
                ` : y`<div class="clock">${Q(i, o, s)}</div>` : u}
          ${f && !c ? y`<div class="date">${ee(i, o)}</div>` : u}
        </div>
        ${a ? u : this._renderClockToggle(c)}
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
  _renderAnalogComplications(e, t, a, o, s) {
    if (!t && !a) return u;
    let i = u;
    if (t) {
      const l = be(t.state, this._isDarkOutside()), r = we(l, this._config.icons), c = Number(t.attributes.temperature).toFixed(1), d = t.attributes.temperature_unit || "°C";
      i = y`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${r}
            alt=""
            style="filter:${e.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${c}${d}</span>
        </div>
      `;
    }
    return y`
      <div
        class="analog-complications"
        style="color:${e.comp.color};opacity:${e.comp.opacity}"
      >
        ${i}
        ${a ? y`<div class="analog-date">${ee(o, s)}</div>` : u}
      </div>
    `;
  }
  // Recolore un style pour la nuit à partir de son bloc `night` ({
  // background, color }, cf. analog-styles.js) : mêmes formes/longueurs/
  // épaisseurs que le style de jour (lisibilité, position des aiguilles
  // inchangées), seules les couleurs de tout ce qui se dessine (aiguilles,
  // graduations, chiffres, complications, éventuel anneau décoratif)
  // basculent sur `night.color` — une seule teinte par style, sobre, plutôt
  // que de redéfinir une palette nuit complète par élément. Le fond suit
  // séparément (cf. analogDefaultBg dans render(), pas ici). glow désactivé
  // : pas de halo la nuit, la sobriété prime sur l'esthétique (même
  // principe que l'ancien traitement uniforme qu'il remplace pour ces
  // styles).
  _applyNightPalette(e) {
    const t = e.night.color, a = (o) => o && { ...o, color: t };
    return {
      ...e,
      glow: !1,
      ticks: a(e.ticks),
      numerals: a(e.numerals),
      hour: a(e.hour),
      minute: a(e.minute),
      second: {
        ...e.second,
        color: t,
        tipDot: e.second.tipDot ? { ...e.second.tipDot, fill: t } : void 0
      },
      center: {
        ...e.center,
        color: t,
        ring: e.center.ring ? { ...e.center.ring, color: t } : void 0
      },
      comp: { ...e.comp, color: t },
      outerRing: e.outerRing ? { ...e.outerRing, color: t } : void 0
    };
  }
  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size. Douze habillages
  // possibles (cf. src/analog-styles.js, choisis via `analog_style`, ou
  // "auto" pour un style par jour de la semaine) : mêmes primitives
  // (graduations, chiffres, aiguilles), paramètres différents — sauf
  // "ardoise"/"mars"/"saturne", seuls styles à aiguilles rectangulaires
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
  _renderAnalogClock(e, t, a, o) {
    const s = e.getHours() % 12, i = e.getMinutes(), l = s * 30 + i * 0.5, r = i * 6, c = e.getSeconds() + e.getMilliseconds() / 1e3, d = c * 6, h = `-${c}s`, p = o.shape === "rect" ? this._renderRectHands(o, l, r, d, h) : this._renderLineHands(o, l, r, d, h);
    return y`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${Q(e, t, a)}
      >
        ${o.glow ? this._renderGlowFilter() : u}
        ${o.outerRing ? this._renderOuterRing(o.outerRing) : u}
        ${this._renderTicks(o.ticks, o.glow)}
        ${this._renderNumerals(o.numerals)}
        ${p}
      </svg>
    `;
  }
  // Anneau décoratif (style "saturne" uniquement) : une ellipse inclinée
  // façon anneaux de Saturne, rendue avant graduations/chiffres/aiguilles
  // (cf. ordre d'appel dans _renderAnalogClock) pour ne jamais passer
  // par-dessus et gêner leur lisibilité — juste un habillage de fond.
  _renderOuterRing(e) {
    return m`
      <ellipse
        class="outer-ring"
        cx="50" cy="50" rx=${e.rx} ry=${e.ry}
        fill="none"
        stroke=${e.color}
        stroke-width=${e.width}
        opacity=${e.opacity}
        transform="rotate(${e.rotate} 50 50)"
      />
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
    var s;
    if (!e) return u;
    const a = t ? "url(#echo-home-analog-glow)" : void 0, o = [];
    for (let i = 0; i < 12; i++) {
      const l = i % 3 === 0;
      if (e.mode === "minor" && l || e.mode === "cardinal" && !l || (s = e.skip) != null && s.includes(i)) continue;
      const r = i * 30;
      if (e.shape === "line")
        o.push(m`
          <line
            class="tick hand"
            x1="50"
            y1=${e.y1}
            x2="50"
            y2=${e.y2}
            stroke=${e.color}
            stroke-width=${e.width}
            opacity=${e.opacity}
            filter=${a != null ? a : u}
            transform="rotate(${r} 50 50)"
          />
        `);
      else {
        const c = this._polar(e.radius, r), d = l ? e.cardinalR : e.minorR, h = l ? e.cardinalOpacity : e.minorOpacity;
        o.push(m`
          <circle class="tick hand" cx=${c.x} cy=${c.y} r=${d} fill=${e.color} opacity=${h} filter=${a != null ? a : u} />
        `);
      }
    }
    return m`<g class="ticks">${o}</g>`;
  }
  // Chiffres : "quad" (12/3/6/9, style "aurore") ou "single" (12
  // seulement, style "ardoise"). Même rayon que les graduations à chaque
  // fois — les chiffres doivent être sur le même cercle qu'elles, pas
  // ramenés vers le centre, sinon ils paraissent "flotter" au milieu du
  // cadran au lieu de marquer l'heure à la même distance du bord
  // (corrigé en 1.1.4 pour "aurore", appliqué d'emblée ici aux autres).
  // `cfg.labels` (optionnel) remplace le texte par défaut à chaque
  // position — un seul élément pour "single" (ex: "☾", style "lune"),
  // jusqu'à quatre pour "quad", dans le même ordre que les positions par
  // défaut (12, 3, 6, 9).
  _renderNumerals(e) {
    var i;
    if (!e) return u;
    const t = e.mode === "single" ? ["12"] : ["12", "3", "6", "9"], a = (i = e.labels) != null ? i : t, s = (e.mode === "single" ? [[a[0], 0]] : a.map((l, r) => [l, r])).map(([l, r]) => {
      const c = this._polar(e.radius, r * 90);
      return m`
        <text
          class="numeral hand"
          x=${c.x}
          y=${c.y}
          font-size=${e.size}
          font-weight=${e.weight}
          opacity=${e.opacity}
          fill=${e.color}
          text-anchor="middle"
          dominant-baseline="central"
        >${l}</text>
      `;
    });
    return m`<g class="numerals">${s}</g>`;
  }
  // sin/cos plutôt que des positions écrites en dur pour chaque heure :
  // évite de se tromper de signe pour l'une d'elles (angle depuis midi,
  // sens horaire — x = sin, y = -cos).
  _polar(e, t) {
    const a = t * Math.PI / 180;
    return { x: 50 + e * Math.sin(a), y: 50 - e * Math.cos(a) };
  }
  // Aiguilles "classiques" (tous les styles sauf "ardoise") : un simple
  // trait par aiguille, couleur/épaisseur/forme de bout définies par le
  // style. La seconde peut avoir une petite queue derrière le pivot et un
  // point à la pointe (styles "mono"/"neon").
  _renderLineHands(e, t, a, o, s) {
    const i = e.glow ? "url(#echo-home-analog-glow)" : void 0, l = m`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - e.hour.len}
        stroke=${e.hour.color}
        stroke-width=${e.hour.width}
        stroke-linecap=${e.hour.cap}
        filter=${i != null ? i : u}
        transform="rotate(${t} 50 50)"
      />
    `, r = m`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - e.minute.len}
        stroke=${e.minute.color}
        stroke-width=${e.minute.width}
        stroke-linecap=${e.minute.cap}
        filter=${i != null ? i : u}
        transform="rotate(${a} 50 50)"
      />
    `, c = e.second, d = c.tipDot ? m`<circle class="hand" cx="50" cy=${50 - c.len} r=${c.tipDot.r} fill=${c.tipDot.fill} filter=${i != null ? i : u} />` : u, h = m`
      <g
        class="hand-second"
        style="animation-delay: ${s}; transform: rotate(${o}deg)"
      >
        <line
          class="hand"
          x1="50" y1=${50 + c.tail} x2="50" y2=${50 - c.len}
          stroke=${c.color}
          stroke-width=${c.width}
          stroke-linecap=${c.cap}
          opacity=${c.opacity}
          filter=${i != null ? i : u}
        />
        ${d}
      </g>
    `, p = e.center, g = p.ring ? m`
          <circle
            class="hand"
            cx="50" cy="50" r=${p.ring.r} fill="none"
            stroke=${p.ring.color} stroke-width=${p.ring.width}
          />
        ` : u;
    return m`
      ${l}${r}${h}
      ${g}
      <circle class="hand" cx="50" cy="50" r=${p.r} fill=${p.color} />
    `;
  }
  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(e, t, a, o, s) {
    const i = e.hour, l = e.minute, r = e.second, c = e.center;
    return m`
      <rect
        class="hand hand-hour"
        x=${50 - i.w / 2} y=${50 - i.len} width=${i.w} height=${i.len}
        fill=${i.color}
        transform="rotate(${t} 50 50)"
      />
      <rect
        class="hand hand-minute"
        x=${50 - l.w / 2} y=${50 - l.len} width=${l.w} height=${l.len}
        fill=${l.color}
        transform="rotate(${a} 50 50)"
      />
      <g
        class="hand-second"
        style="animation-delay: ${s}; transform: rotate(${o}deg)"
      >
        <rect class="hand" x=${50 - r.w / 2} y=${50 - r.len} width=${r.w} height=${r.len} fill=${r.color} />
        <rect class="hand" x=${50 - r.w / 2} y="50" width=${r.w} height=${r.tail} fill=${r.color} />
      </g>
      <rect
        class="hand"
        x=${50 - c.size / 2} y=${50 - c.size / 2} width=${c.size} height=${c.size}
        fill=${c.color}
        transform="rotate(45 50 50)"
      />
    `;
  }
  // Petit bouton discret (round et large, masqué la nuit comme le reste
  // — pas de lumière/info superflue sur un écran de chevet) pour
  // basculer digital ↔ analogique. L'icône affichée est celle du cadran
  // vers lequel on bascule (pas l'actuel) : la 1.4.2 avait inversé cette
  // convention ("icône = état actuel"), en pratique lu à l'envers une
  // fois sur l'appareil réel — l'attente naturelle sur un bouton est
  // "l'icône montre ce que le tap va donner", pas "l'icône décrit ce
  // qui est déjà à l'écran".
  _renderClockToggle(e) {
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", a = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return y`
      <button
        type="button"
        class="clock-toggle"
        aria-label=${a}
        title=${a}
        @click=${() => this._toggleClockFace()}
      >
        <ha-icon icon=${t}></ha-icon>
      </button>
    `;
  }
  _renderWeather(e) {
    const t = be(e.state, this._isDarkOutside()), a = we(t, this._config.icons), o = Number(e.attributes.temperature).toFixed(1), s = e.attributes.temperature_unit || "°C", i = gt(this._hass, e.state), l = this._weatherClickable();
    return y`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : u}
        tabindex=${l ? "0" : u}
        aria-label="${i}, ${o}${s}"
        @click=${l ? () => this._navigateToWeather() : u}
        @keydown=${l ? (r) => this._onWeatherKeydown(r) : u}
      >
        <img class="weather-icon" src=${a} alt="" />
        <span class="weather-temp">${o}${s}</span>
      </div>
    `;
  }
}
K(ae, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), K(ae, "styles", Ke`
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

    /* La nuit, on retombe sur le traitement nuit uniforme (fond quasi
       noir) plutôt que le fond du style choisi — SAUF pour les styles
       "planétaires" qui définissent leur propre fond de nuit (bloc
       "night", cf. analog-styles.js) : ceux-là portent la classe
       "custom-night" (posée dans le JS, cf. render()) et sont donc
       exemptés ici, leur fond nuit passant par --_analog-default-bg
       comme en journée (cf. règle .card.analog juste au-dessus). */
    :host(.night) .card.analog:not(.custom-night) {
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

    /* Couleurs et épaisseurs propres à chaque style posées directement en
       attributs SVG par _renderLineHands/_renderRectHands/_renderTicks/
       _renderNumerals, pas ici : contrairement à la version à un seul
       style (< 1.2.0), il n'y a plus de couleur "currentColor" commune à
       surcharger. L'opacité nuit (dimming) s'applique toujours, styles
       "planétaires" compris : l'économie de lumière reste de mise même
       quand ils gardent leur propre teinte (cf. règle suivante et
       _applyNightPalette). Seule la couleur forcée ici est exemptée pour
       eux (via "custom-night", cf. règle .card.analog plus haut) — pour
       les 5 styles d'origine sans bloc "night", .hand regroupe toutes les
       aiguilles/graduations/chiffres et retombe uniformément sur le rouge
       très atténué habituel, comme avant. */
    :host(.night) .analog-clock {
      opacity: var(--_night-opacity);
    }

    :host(.night) .card.analog:not(.custom-night) .analog-clock .hand {
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
      width: 44px;
      height: 44px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--_text-color);
      opacity: 0.55;
      cursor: pointer;
      transition: opacity 0.2s ease;
      --mdc-icon-size: 22px;
    }

    /* La 1.4.2 avait décalé ce bouton en bas à droite en mode round,
       pour l'écarter du chevron/de la date centrés à cette hauteur —
       signalé pas centré du tout une fois sur l'appareil réel (l'écart
       théorique trouvé en testant une position intermédiaire, plus haut
       mais toujours centrée, n'a jamais existé à la position d'origine
       ci-dessus, seulement à cette position intermédiaire jamais
       déployée). Redevenu centré, comme avant la 1.4.2. */

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
customElements.define(Fe, ae);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Fe,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
