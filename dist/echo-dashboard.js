var ft = Object.defineProperty;
var _t = (o, e, t) => e in o ? ft(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var N = (o, e, t) => _t(o, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis, $e = ce.ShadowRoot && (ce.ShadyCSS === void 0 || ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ke = Symbol(), qe = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if ($e && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = qe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && qe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (o) => new ot(typeof o == "string" ? o : o + "", void 0, ke), Ae = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((i, a, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + o[r + 1], o[0]);
  return new ot(t, o, ke);
}, bt = (o, e) => {
  if ($e) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), a = ce.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = t.cssText, o.appendChild(i);
  }
}, Se = $e ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return vt(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: wt, getOwnPropertyDescriptor: xt, getOwnPropertyNames: $t, getOwnPropertySymbols: kt, getPrototypeOf: At } = Object, D = globalThis, Ce = D.trustedTypes, zt = Ce ? Ce.emptyScript : "", he = D.reactiveElementPolyfillSupport, X = (o, e) => o, be = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? zt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, st = (o, e) => !yt(o, e), Ee = { attribute: !0, type: String, converter: be, reflect: !1, useDefault: !1, hasChanged: st };
var et, tt;
(et = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (tt = D.litPropertyMetadata) != null || (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let J = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ee) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(e, i, t);
      a !== void 0 && wt(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var n;
    const { get: a, set: r } = (n = xt(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: a, set(l) {
      const s = a == null ? void 0 : a.call(this);
      r == null || r.call(this, l), this.requestUpdate(e, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : Ee;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const e = At(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const t = this.properties, i = [...$t(t), ...kt(t)];
      for (const a of i) this.createProperty(a, t[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, a] of t) this.elementProperties.set(i, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const a = this._$Eu(t, i);
      a !== void 0 && this._$Eh.set(a, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const a of i) t.unshift(Se(a));
    } else e !== void 0 && t.push(Se(e));
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
    return bt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var a;
      return (a = i.hostConnected) == null ? void 0 : a.call(i);
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
    const i = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, i);
    if (a !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : be).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, n, l;
    const i = this.constructor, a = i._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const s = i.getPropertyOptions(a), c = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((r = s.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? s.converter : be;
      this._$Em = a;
      const h = c.fromAttribute(t, s.type);
      this[a] = (l = h != null ? h : (n = this._$Ej) == null ? void 0 : n.get(a)) != null ? l : h, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, a = !1, r) {
    var n, l;
    if (e !== void 0) {
      const s = this.constructor;
      if (a === !1 && (r = this[e]), i != null || (i = s.getPropertyOptions(e)), !(((n = i.hasChanged) != null ? n : st)(r, t) || i.useDefault && i.reflect && r === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(s._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: a, wrapped: r }, n) {
    var l, s, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (s = n != null ? n : t) != null ? s : this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), a === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var i, a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, l] of this._$Ep) this[n] = l;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, l] of r) {
        const { wrapped: s } = l, c = this[n];
        s !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (a = this._$EO) == null || a.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
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
      var a;
      return (a = i.hostUpdated) == null ? void 0 : a.call(i);
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
var it;
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[X("elementProperties")] = /* @__PURE__ */ new Map(), J[X("finalized")] = /* @__PURE__ */ new Map(), he == null || he({ ReactiveElement: J }), ((it = D.reactiveElementVersions) != null ? it : D.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, Me = (o) => o, ue = Z.trustedTypes, De = ue ? ue.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, lt = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + M, qt = `<${ct}>`, j = document, te = () => j.createComment(""), ie = (o) => o === null || typeof o != "object" && typeof o != "function", ze = Array.isArray, St = (o) => ze(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", pe = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Te = /-->/g, Re = />/g, U = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pe = /'/g, Ne = /"/g, ut = /^(?:script|style|textarea|title)$/i, dt = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), u = dt(1), y = dt(2), W = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), H = j.createTreeWalker(j, 129);
function ht(o, e) {
  if (!ze(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return De !== void 0 ? De.createHTML(e) : e;
}
const Ct = (o, e) => {
  const t = o.length - 1, i = [];
  let a, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Q;
  for (let l = 0; l < t; l++) {
    const s = o[l];
    let c, h, p = -1, m = 0;
    for (; m < s.length && (n.lastIndex = m, h = n.exec(s), h !== null); ) m = n.lastIndex, n === Q ? h[1] === "!--" ? n = Te : h[1] !== void 0 ? n = Re : h[2] !== void 0 ? (ut.test(h[2]) && (a = RegExp("</" + h[2], "g")), n = U) : h[3] !== void 0 && (n = U) : n === U ? h[0] === ">" ? (n = a != null ? a : Q, p = -1) : h[1] === void 0 ? p = -2 : (p = n.lastIndex - h[2].length, c = h[1], n = h[3] === void 0 ? U : h[3] === '"' ? Ne : Pe) : n === Ne || n === Pe ? n = U : n === Te || n === Re ? n = Q : (n = U, a = void 0);
    const f = n === U && o[l + 1].startsWith("/>") ? " " : "";
    r += n === Q ? s + qt : p >= 0 ? (i.push(c), s.slice(0, p) + lt + s.slice(p) + M + f) : s + M + (p === -2 ? l : f);
  }
  return [ht(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class ae {
  constructor({ strings: e, _$litType$: t }, i) {
    let a;
    this.parts = [];
    let r = 0, n = 0;
    const l = e.length - 1, s = this.parts, [c, h] = Ct(e, t);
    if (this.el = ae.createElement(c, i), H.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (a = H.nextNode()) !== null && s.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const p of a.getAttributeNames()) if (p.endsWith(lt)) {
          const m = h[n++], f = a.getAttribute(p).split(M), g = /([.?@])?(.*)/.exec(m);
          s.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? Mt : g[1] === "?" ? Dt : g[1] === "@" ? Tt : de }), a.removeAttribute(p);
        } else p.startsWith(M) && (s.push({ type: 6, index: r }), a.removeAttribute(p));
        if (ut.test(a.tagName)) {
          const p = a.textContent.split(M), m = p.length - 1;
          if (m > 0) {
            a.textContent = ue ? ue.emptyScript : "";
            for (let f = 0; f < m; f++) a.append(p[f], te()), H.nextNode(), s.push({ type: 2, index: ++r });
            a.append(p[m], te());
          }
        }
      } else if (a.nodeType === 8) if (a.data === ct) s.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = a.data.indexOf(M, p + 1)) !== -1; ) s.push({ type: 7, index: r }), p += M.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = j.createElement("template");
    return i.innerHTML = e, i;
  }
}
function K(o, e, t = o, i) {
  var n, l, s;
  if (e === W) return e;
  let a = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const r = ie(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== r && ((l = a == null ? void 0 : a._$AO) == null || l.call(a, !1), r === void 0 ? a = void 0 : (a = new r(o), a._$AT(o, t, i)), i !== void 0 ? ((s = t._$Co) != null ? s : t._$Co = [])[i] = a : t._$Cl = a), a !== void 0 && (e = K(o, a._$AS(o, e.values), a, i)), e;
}
class Et {
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
    const { el: { content: t }, parts: i } = this._$AD, a = ((c = e == null ? void 0 : e.creationScope) != null ? c : j).importNode(t, !0);
    H.currentNode = a;
    let r = H.nextNode(), n = 0, l = 0, s = i[0];
    for (; s !== void 0; ) {
      if (n === s.index) {
        let h;
        s.type === 2 ? h = new re(r, r.nextSibling, this, e) : s.type === 1 ? h = new s.ctor(r, s.name, s.strings, this, e) : s.type === 6 && (h = new Rt(r, this, e)), this._$AV.push(h), s = i[++l];
      }
      n !== (s == null ? void 0 : s.index) && (r = H.nextNode(), n++);
    }
    return H.currentNode = j, a;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class re {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, a) {
    var r;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = a, this._$Cv = (r = a == null ? void 0 : a.isConnected) != null ? r : !0;
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
    e = K(this, e, t), ie(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== W && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : St(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(j.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, a = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ae.createElement(ht(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === a) this._$AH.p(t);
    else {
      const n = new Et(a, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Ue.get(e.strings);
    return t === void 0 && Ue.set(e.strings, t = new ae(e)), t;
  }
  k(e) {
    ze(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, a = 0;
    for (const r of e) a === t.length ? t.push(i = new re(this.O(te()), this.O(te()), this, this.options)) : i = t[a], i._$AI(r), a++;
    a < t.length && (this._$AR(i && i._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const a = Me(e).nextSibling;
      Me(e).remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class de {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, a, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, a) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = K(this, e, t, 0), n = !ie(e) || e !== this._$AH && e !== W, n && (this._$AH = e);
    else {
      const l = e;
      let s, c;
      for (e = r[0], s = 0; s < r.length - 1; s++) c = K(this, l[i + s], t, s), c === W && (c = this._$AH[s]), n || (n = !ie(c) || c !== this._$AH[s]), c === d ? e = d : e !== d && (e += (c != null ? c : "") + r[s + 1]), this._$AH[s] = c;
    }
    n && !a && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Mt extends de {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class Dt extends de {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Tt extends de {
  constructor(e, t, i, a, r) {
    super(e, t, i, a, r), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = K(this, e, t, 0)) != null ? n : d) === W) return;
    const i = this._$AH, a = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== d && (i === d || a);
    a && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Rt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    K(this, e);
  }
}
const me = Z.litHtmlPolyfillSupport;
var at;
me == null || me(ae, re), ((at = Z.litHtmlVersions) != null ? at : Z.litHtmlVersions = []).push("3.3.3");
const Pt = (o, e, t) => {
  var r, n;
  const i = (r = t == null ? void 0 : t.renderBefore) != null ? r : e;
  let a = i._$litPart$;
  if (a === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    i._$litPart$ = a = new re(e.insertBefore(te(), l), l, void 0, t != null ? t : {});
  }
  return a._$AI(o), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis;
class V extends J {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Pt(t, this.renderRoot, this.renderOptions);
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
    return W;
  }
}
var rt;
V._$litElement$ = !0, V.finalized = !0, (rt = B.litElementHydrateSupport) == null || rt.call(B, { LitElement: V });
const ge = B.litElementPolyfillSupport;
ge == null || ge({ LitElement: V });
var nt;
((nt = B.litElementVersions) != null ? nt : B.litElementVersions = []).push("4.2.2");
const pt = "echo-home-card", Nt = "https://cdn.jsdelivr.net/npm/@meteocons/svg", k = {
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
}, Ut = {
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
function Le(o, e) {
  return o === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : o === "sunny" && e ? "clear-night" : Ut[o] || "not-available";
}
function Fe(o, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${o}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${Nt}/${t}/${o}.svg`;
}
function fe(o, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(o).replace(/\s/g, "");
}
function _e(o, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(o);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Lt(o, e) {
  return o.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const Oe = "aurore", ne = {
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
}, Ft = [
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
], Ot = ["cover", "contain", "fill"], E = "cover", ee = 300, It = ["landscape", "portrait", "squarish"], oe = ["satellite", "url", "media_folder", "picsum", "unsplash"];
function Ht(o) {
  return o === "contain" ? "contain" : o === "fill" ? "100% 100%" : "cover";
}
function G(o, e) {
  return `center / ${Ht(e)} no-repeat url("${o}")`;
}
function Ie(o, e, t) {
  if (o != null) {
    if (typeof o == "string") return { type: "css", value: o };
    if (typeof o == "object") return { type: t, ...o };
  } else if (e)
    return { type: "satellite" };
  return { type: t };
}
function He(o, e, t, i, a) {
  var n;
  const r = { ...o };
  return e.includes(r.type) || (a(`${i}.type`, t), r.type = t), r.fit != null && !Ot.includes(r.fit) && (a(`${i}.fit`, E), r.fit = E), r.interval != null && (typeof r.interval != "number" || !Number.isFinite(r.interval) || r.interval <= 0) && (a(`${i}.interval`, ee), r.interval = ee), r.type === "url" && !r.url && !(((n = r.urls) == null ? void 0 : n.length) > 0) && (a(`${i}.url`, "satellite"), r.type = "satellite"), r.type === "media_folder" && !r.path && (a(`${i}.path`, "satellite"), r.type = "satellite"), r.type === "unsplash" && !r.access_key && (a(`${i}.access_key`, "satellite"), r.type = "satellite"), r.orientation != null && !It.includes(r.orientation) && (a(`${i}.orientation`, "aucune"), delete r.orientation), r;
}
async function Bt(o, e) {
  return ((await o.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children || []).filter(
    (i) => {
      var a;
      return i.media_class === "image" || ((a = i.media_content_type) == null ? void 0 : a.startsWith("image/"));
    }
  ).map((i) => i.media_content_id);
}
async function Vt(o, e) {
  return (await o.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
class Be {
  constructor(e) {
    this._onChange = e, this._signature = null, this._images = [], this._resolvedUrl = null, this._index = 0, this._timer = null, this._token = 0, this.cssValue = null;
  }
  configure(e, t, i) {
    var n, l;
    const a = JSON.stringify([t, i]);
    if (a === this._signature) return;
    this._signature = a, this._token += 1;
    const r = this._token;
    switch (clearInterval(this._timer), this._timer = null, this._images = [], this._index = 0, t.type) {
      case "style":
        this.cssValue = null;
        return;
      case "css":
        this.cssValue = (n = t.value) != null ? n : null;
        return;
      case "satellite":
        this.cssValue = i.isNightMode ? null : i.satelliteBackgroundUrl ? G(i.satelliteBackgroundUrl, E) : null;
        return;
      case "url": {
        if (i.isNightMode) {
          this.cssValue = null;
          return;
        }
        const s = (l = t.urls) != null && l.length ? t.urls : [t.url];
        this._images = s, this.cssValue = G(s[0], t.fit || E), this._startRotation(e, t, r);
        return;
      }
      case "media_folder": {
        if (i.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadMediaFolder(e, t, r);
        return;
      }
      case "picsum": {
        if (i.isNightMode) {
          this.cssValue = null;
          return;
        }
        this._setPicsumUrl(t), this._timer = setInterval(() => {
          r === this._token && (this._setPicsumUrl(t), this._onChange());
        }, (t.interval || ee) * 1e3);
        return;
      }
      case "unsplash": {
        if (i.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadUnsplash(t, r), this._timer = setInterval(() => {
          r === this._token && this._loadUnsplash(t, r);
        }, (t.interval || ee) * 1e3);
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
    const t = e.width || Math.round(window.innerWidth) || 960, i = e.height || Math.round(window.innerHeight) || 480, a = `https://picsum.photos/${t}/${i}?random=${Date.now()}`;
    this.cssValue = G(a, e.fit || E);
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
    var i, a;
    try {
      const r = new URLSearchParams({ client_id: e.access_key });
      e.query && r.set("query", e.query), e.orientation && r.set("orientation", e.orientation), e.collections && r.set("collections", e.collections);
      const n = await fetch(`https://api.unsplash.com/photos/random?${r}`);
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const l = await n.json();
      if (t !== this._token) return;
      const s = ((i = l == null ? void 0 : l.urls) == null ? void 0 : i.regular) || ((a = l == null ? void 0 : l.urls) == null ? void 0 : a.full);
      if (!s) throw new Error("réponse Unsplash sans URL d'image exploitable");
      this.cssValue = G(s, e.fit || E), this._onChange();
    } catch (r) {
      if (t !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de récupérer une photo Unsplash (clé invalide, quota dépassé, ou hors-ligne ?)",
        r
      );
    }
  }
  async _loadMediaFolder(e, t, i) {
    try {
      const a = await Bt(e, t.path);
      if (i !== this._token) return;
      if (this._images = a, !a.length) {
        console.warn(
          `[echo-home-card] aucune image trouvée dans le dossier Media Source "${t.path}"`
        ), this.cssValue = null, this._onChange();
        return;
      }
      await this._showMediaAt(e, t, i, 0), this._startRotation(e, t, i);
    } catch (a) {
      if (i !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de parcourir le dossier Media Source "${t.path}"`,
        a
      ), this.cssValue = null, this._onChange();
    }
  }
  async _showMediaAt(e, t, i, a) {
    try {
      const r = await Vt(e, this._images[a]);
      if (i !== this._token) return;
      this.cssValue = G(r, t.fit || E), this._onChange();
    } catch (r) {
      if (i !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de charger une image du dossier Media Source",
        r
      );
    }
  }
  // Commune à "url" (rotation directe, pas de résolution) et
  // "media_folder" (résolution à chaque image, cf. _showMediaAt) —
  // seulement démarrée si plusieurs images (une source à une seule image
  // n'a pas besoin de minuteur).
  _startRotation(e, t, i) {
    if (this._images.length <= 1) return;
    const a = (t.interval || ee) * 1e3;
    this._timer = setInterval(async () => {
      i === this._token && (this._index = (this._index + 1) % this._images.length, t.type === "media_folder" ? await this._showMediaAt(e, t, i, this._index) : (this.cssValue = G(this._images[this._index], t.fit || E), this._onChange()));
    }, a);
  }
  destroy() {
    clearInterval(this._timer), this._timer = null, this._token += 1;
  }
}
const Ve = "echo-home-card-clock-face", je = new Date(2e3, 0, 27, 12, 59);
class ye extends V {
  // Une source par présentation (digital/analogique), chacune avec son
  // propre réglage indépendant (background/analog_background, cf.
  // const.js) — cf. src/background.js. onChange redéclenche un rendu
  // Lit quand une résolution/rotation asynchrone (dossier Media Source,
  // plusieurs URLs) change la valeur CSS courante ; render() n'attend
  // jamais cette résolution, il lit juste le dernier résultat connu
  // (`.cssValue`, synchrone).
  constructor() {
    super(), this._digitalBackground = new Be(() => this.requestUpdate()), this._analogBackground = new Be(() => this.requestUpdate());
  }
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ...k,
      ...e,
      icons: { ...k.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {}), this._clockFace === void 0 && (this._clockFace = this._initClockFace());
  }
  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const e = localStorage.getItem(Ve);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(Ve, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const i = (n, l) => console.warn(
      `[echo-home-card] "${n}" invalide (${JSON.stringify(t[n])}), valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.layout !== null && e.layout !== "round" && (i("layout", k.layout), e.layout = k.layout), ["digital", "analog"].includes(e.clock_face) || (i("clock_face", k.clock_face), e.clock_face = k.clock_face), e.analog_style !== "auto" && !Object.keys(ne).includes(e.analog_style) && (i("analog_style", k.analog_style), e.analog_style = k.analog_style), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (i("zoom", k.zoom), e.zoom = k.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-home-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable.`
    );
    const a = (n, l) => console.warn(
      `[echo-home-card] "${n}" invalide, valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.background = He(
      Ie(e.background, !1, "satellite"),
      ["css", ...oe],
      "satellite",
      "background",
      a
    );
    let r = He(
      Ie(
        e.analog_background,
        e.analog_background_photo,
        "style"
      ),
      ["style", "css", ...oe],
      "style",
      "analog_background",
      a
    );
    return e.layout === "round" && oe.includes(r.type) && (a("analog_background.type", "style"), r = { type: "style" }), e.analog_background = r, e;
  }
  static getStubConfig(e) {
    const t = Object.keys(e.states).find(
      (i) => i.startsWith("weather.")
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
      var i, a;
      ((i = this._config) != null && i.show_clock || (a = this._config) != null && a.show_date) && this.requestUpdate(), this._scheduleClockTick();
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
    var s, c, h, p;
    const e = this.shadowRoot, t = e == null ? void 0 : e.querySelector(".card"), i = this._config;
    if (!t || !i) return;
    const a = i.language || ((c = (s = this._hass) == null ? void 0 : s.locale) == null ? void 0 : c.language) || "en", r = i.time_format || ((p = (h = this._hass) == null ? void 0 : h.locale) == null ? void 0 : p.time_format) || "24", n = t.getBoundingClientRect().width * 0.92, l = {
      ".clock": fe(je, a, r),
      ".date": _e(je, a)
    };
    for (const [m, f] of Object.entries(l)) {
      const g = e.querySelector(m);
      if (!g) continue;
      const _ = g.cloneNode(!1);
      _.textContent = f, _.style.position = "absolute", _.style.visibility = "hidden", _.style.left = "-9999px", _.style.removeProperty("--_fit-scale"), g.parentNode.appendChild(_);
      const b = _.scrollWidth;
      _.remove();
      const v = b > n ? n / b : 1;
      g.style.setProperty("--_fit-scale", v);
    }
  }
  set hass(e) {
    var n, l, s, c;
    const t = (l = this._hass) == null ? void 0 : l.states[(n = this._config) == null ? void 0 : n.satellite_entity], i = (c = this._hass) == null ? void 0 : c.states[(s = this._config) == null ? void 0 : s.weather_entity];
    if (this._hass = e, !this._config) return;
    const a = e.states[this._config.satellite_entity], r = e.states[this._config.weather_entity];
    (t !== a || i !== r) && this.requestUpdate();
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
    const i = [];
    return e != null && i.push(`background:${e}`), this._config.zoom != null && this._config.zoom !== 1 && i.push(`zoom:${this._config.zoom}`), t && i.push(t), i.join(";");
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
    var $, w, P;
    if (!this._config || !this._hass) return d;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, i = this._isNightMode(t);
    this.classList.toggle("night", i);
    const a = e.language || (($ = this._hass.locale) == null ? void 0 : $.language) || "en", r = e.time_format || ((w = this._hass.locale) == null ? void 0 : w.time_format) || "24", n = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, s = e.layout === "round", c = this._clockFace === "analog", h = {
      isNightMode: i,
      satelliteBackgroundUrl: (P = t == null ? void 0 : t.attributes) == null ? void 0 : P.background
    };
    this._digitalBackground.configure(this._hass, e.background, h), this._analogBackground.configure(this._hass, e.analog_background, h);
    const p = c && !s && !i && oe.includes(e.analog_background.type), m = e.show_weather && !i && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, f = m && !c, g = e.show_date && !i, _ = c ? p ? this._analogBackground.cssValue : null : this._digitalBackground.cssValue, b = e.analog_style === "auto" ? Ft[n.getDay()] : e.analog_style, v = c ? p ? ne[Oe] : ne[b] || ne[Oe] : null, S = i && c && !!(v != null && v.night), C = S ? this._applyNightPalette(v) : v, T = S ? v.night.background : e.analog_background.type === "css" ? e.analog_background.value : v == null ? void 0 : v.background, A = this._cardStyle(
      _,
      v && !p ? `--_analog-default-bg:${T}` : null
    );
    return u`
      <div
        class="card ${s ? "round" : ""} ${c ? "analog" : ""} ${S ? "custom-night" : ""}"
        style=${A}
      >
        ${!c || p ? u`<div class="shader"></div>` : d}
        ${f ? this._renderWeather(l) : d}
        <div class="clockgroup">
          ${e.show_clock ? c ? u`
                  ${this._renderAnalogComplications(
      C,
      m ? l : null,
      g,
      n,
      a
    )}
                  ${this._renderAnalogClock(n, a, r, C)}
                ` : u`<div class="clock">${fe(n, a, r)}</div>` : d}
          ${g && !c ? u`<div class="date">${_e(n, a)}</div>` : d}
        </div>
        ${i ? d : this._renderClockToggle(c)}
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
  _renderAnalogComplications(e, t, i, a, r) {
    if (!t && !i) return d;
    let n = d;
    if (t) {
      const l = Le(t.state, this._isDarkOutside()), s = Fe(l, this._config.icons), c = Number(t.attributes.temperature).toFixed(1), h = t.attributes.temperature_unit || "°C";
      n = u`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${s}
            alt=""
            style="filter:${e.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${c}${h}</span>
        </div>
      `;
    }
    return u`
      <div
        class="analog-complications"
        style="color:${e.comp.color};opacity:${e.comp.opacity}"
      >
        ${n}
        ${i ? u`<div class="analog-date">${_e(a, r)}</div>` : d}
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
    const t = e.night.color, i = (a) => a && { ...a, color: t };
    return {
      ...e,
      glow: !1,
      ticks: i(e.ticks),
      numerals: i(e.numerals),
      hour: i(e.hour),
      minute: i(e.minute),
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
  _renderAnalogClock(e, t, i, a) {
    const r = e.getHours() % 12, n = e.getMinutes(), l = r * 30 + n * 0.5, s = n * 6, c = e.getSeconds() + e.getMilliseconds() / 1e3, h = c * 6, p = `-${c}s`, m = a.shape === "rect" ? this._renderRectHands(a, l, s, h, p) : this._renderLineHands(a, l, s, h, p);
    return u`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${fe(e, t, i)}
      >
        ${a.glow ? this._renderGlowFilter() : d}
        ${a.outerRing ? this._renderOuterRing(a.outerRing) : d}
        ${this._renderTicks(a.ticks, a.glow)}
        ${this._renderNumerals(a.numerals)}
        ${m}
      </svg>
    `;
  }
  // Anneau décoratif (style "saturne" uniquement) : une ellipse inclinée
  // façon anneaux de Saturne, rendue avant graduations/chiffres/aiguilles
  // (cf. ordre d'appel dans _renderAnalogClock) pour ne jamais passer
  // par-dessus et gêner leur lisibilité — juste un habillage de fond.
  _renderOuterRing(e) {
    return y`
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
    return y`
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
    if (!e) return d;
    const i = t ? "url(#echo-home-analog-glow)" : void 0, a = [];
    for (let n = 0; n < 12; n++) {
      const l = n % 3 === 0;
      if (e.mode === "minor" && l || e.mode === "cardinal" && !l || (r = e.skip) != null && r.includes(n)) continue;
      const s = n * 30;
      if (e.shape === "line")
        a.push(y`
          <line
            class="tick hand"
            x1="50"
            y1=${e.y1}
            x2="50"
            y2=${e.y2}
            stroke=${e.color}
            stroke-width=${e.width}
            opacity=${e.opacity}
            filter=${i != null ? i : d}
            transform="rotate(${s} 50 50)"
          />
        `);
      else {
        const c = this._polar(e.radius, s), h = l ? e.cardinalR : e.minorR, p = l ? e.cardinalOpacity : e.minorOpacity;
        a.push(y`
          <circle class="tick hand" cx=${c.x} cy=${c.y} r=${h} fill=${e.color} opacity=${p} filter=${i != null ? i : d} />
        `);
      }
    }
    return y`<g class="ticks">${a}</g>`;
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
    var n;
    if (!e) return d;
    const t = e.mode === "single" ? ["12"] : ["12", "3", "6", "9"], i = (n = e.labels) != null ? n : t, r = (e.mode === "single" ? [[i[0], 0]] : i.map((l, s) => [l, s])).map(([l, s]) => {
      const c = this._polar(e.radius, s * 90);
      return y`
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
    return y`<g class="numerals">${r}</g>`;
  }
  // sin/cos plutôt que des positions écrites en dur pour chaque heure :
  // évite de se tromper de signe pour l'une d'elles (angle depuis midi,
  // sens horaire — x = sin, y = -cos).
  _polar(e, t) {
    const i = t * Math.PI / 180;
    return { x: 50 + e * Math.sin(i), y: 50 - e * Math.cos(i) };
  }
  // Aiguilles "classiques" (tous les styles sauf "ardoise") : un simple
  // trait par aiguille, couleur/épaisseur/forme de bout définies par le
  // style. La seconde peut avoir une petite queue derrière le pivot et un
  // point à la pointe (styles "mono"/"neon").
  _renderLineHands(e, t, i, a, r) {
    const n = e.glow ? "url(#echo-home-analog-glow)" : void 0, l = y`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - e.hour.len}
        stroke=${e.hour.color}
        stroke-width=${e.hour.width}
        stroke-linecap=${e.hour.cap}
        filter=${n != null ? n : d}
        transform="rotate(${t} 50 50)"
      />
    `, s = y`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - e.minute.len}
        stroke=${e.minute.color}
        stroke-width=${e.minute.width}
        stroke-linecap=${e.minute.cap}
        filter=${n != null ? n : d}
        transform="rotate(${i} 50 50)"
      />
    `, c = e.second, h = c.tipDot ? y`<circle class="hand" cx="50" cy=${50 - c.len} r=${c.tipDot.r} fill=${c.tipDot.fill} filter=${n != null ? n : d} />` : d, p = y`
      <g
        class="hand-second"
        style="animation-delay: ${r}; transform: rotate(${a}deg)"
      >
        <line
          class="hand"
          x1="50" y1=${50 + c.tail} x2="50" y2=${50 - c.len}
          stroke=${c.color}
          stroke-width=${c.width}
          stroke-linecap=${c.cap}
          opacity=${c.opacity}
          filter=${n != null ? n : d}
        />
        ${h}
      </g>
    `, m = e.center, f = m.ring ? y`
          <circle
            class="hand"
            cx="50" cy="50" r=${m.ring.r} fill="none"
            stroke=${m.ring.color} stroke-width=${m.ring.width}
          />
        ` : d;
    return y`
      ${l}${s}${p}
      ${f}
      <circle class="hand" cx="50" cy="50" r=${m.r} fill=${m.color} />
    `;
  }
  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(e, t, i, a, r) {
    const n = e.hour, l = e.minute, s = e.second, c = e.center;
    return y`
      <rect
        class="hand hand-hour"
        x=${50 - n.w / 2} y=${50 - n.len} width=${n.w} height=${n.len}
        fill=${n.color}
        transform="rotate(${t} 50 50)"
      />
      <rect
        class="hand hand-minute"
        x=${50 - l.w / 2} y=${50 - l.len} width=${l.w} height=${l.len}
        fill=${l.color}
        transform="rotate(${i} 50 50)"
      />
      <g
        class="hand-second"
        style="animation-delay: ${r}; transform: rotate(${a}deg)"
      >
        <rect class="hand" x=${50 - s.w / 2} y=${50 - s.len} width=${s.w} height=${s.len} fill=${s.color} />
        <rect class="hand" x=${50 - s.w / 2} y="50" width=${s.w} height=${s.tail} fill=${s.color} />
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
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", i = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return u`
      <button
        type="button"
        class="clock-toggle"
        aria-label=${i}
        title=${i}
        @click=${() => this._toggleClockFace()}
      >
        <ha-icon icon=${t}></ha-icon>
      </button>
    `;
  }
  _renderWeather(e) {
    const t = Le(e.state, this._isDarkOutside()), i = Fe(t, this._config.icons), a = Number(e.attributes.temperature).toFixed(1), r = e.attributes.temperature_unit || "°C", n = Lt(this._hass, e.state), l = this._weatherClickable();
    return u`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : d}
        tabindex=${l ? "0" : d}
        aria-label="${n}, ${a}${r}"
        @click=${l ? () => this._navigateToWeather() : d}
        @keydown=${l ? (s) => this._onWeatherKeydown(s) : d}
      >
        <img class="weather-icon" src=${i} alt="" />
        <span class="weather-temp">${a}${r}</span>
      </div>
    `;
  }
}
N(ye, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), N(ye, "styles", Ae`
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
customElements.define(pt, ye);
window.customCards = window.customCards || [];
window.customCards.push({
  type: pt,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
const mt = "echo-player-card", z = {
  SEEK: 2,
  VOLUME_SET: 4,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  SHUFFLE_SET: 32768,
  REPEAT_SET: 262144,
  GROUPING: 524288
}, L = {
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
function se(o) {
  if (o == null || !Number.isFinite(o) || o < 0)
    return "–:––";
  const e = Math.floor(o), t = Math.floor(e / 3600), i = Math.floor(e % 3600 / 60), a = e % 60, r = (n) => String(n).padStart(2, "0");
  return t > 0 ? `${t}:${r(i)}:${r(a)}` : `${i}:${r(a)}`;
}
function jt(o, e, t) {
  const i = t === "12";
  try {
    return new Intl.DateTimeFormat(e, {
      hour: "numeric",
      minute: "2-digit",
      hour12: i
    }).format(o);
  } catch {
    return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", hour12: i }).format(
      o
    );
  }
}
function Ge(o) {
  const e = (o == null ? void 0 : o.attributes) || {};
  if (e.media_position == null) return null;
  let t = e.media_position;
  if (o.state === "playing" && e.media_position_updated_at) {
    const i = new Date(e.media_position_updated_at).getTime();
    Number.isNaN(i) || (t += Math.max(0, (Date.now() - i) / 1e3));
  }
  return e.media_duration != null && (t = Math.min(t, e.media_duration)), Math.max(0, t);
}
const Gt = 2048;
class we extends V {
  constructor() {
    super(), this._artFailedUrl = null, this._sourcesOpen = !1, this._groupOpen = !1;
  }
  // Aucune entité n'est requise pour que setConfig réussisse — sans
  // media_player_entity, la carte affiche juste un état "aucun lecteur
  // configuré" (cf. _renderEmpty) plutôt que de planter, comme le reste
  // de la suite. Elle n'est pas pour autant "utile à vide" comme
  // echo-home-card (une horloge a un sens sans rien configurer, un
  // lecteur média non plus) — la différence est assumée, pas un oubli.
  setConfig(e) {
    const t = { ...L, ...e };
    this._config = this._validateConfig(t, e || {});
  }
  _validateConfig(e, t) {
    const i = (a, r) => console.warn(
      `[echo-player-card] "${a}" invalide (${JSON.stringify(t[a])}), valeur par défaut utilisée (${JSON.stringify(r)})`
    );
    return e.layout !== null && e.layout !== "round" && (i("layout", L.layout), e.layout = L.layout), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (i("zoom", L.zoom), e.zoom = L.zoom), Array.isArray(e.group_entities) || (i("group_entities", L.group_entities), e.group_entities = L.group_entities), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
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
    var h, p, m, f;
    const t = this._config, i = (h = this._hass) == null ? void 0 : h.states[t == null ? void 0 : t.media_player_entity], a = (p = this._hass) == null ? void 0 : p.states[t == null ? void 0 : t.satellite_entity], r = (m = t == null ? void 0 : t.group_entities) == null ? void 0 : m.map((g) => {
      var _;
      return (_ = this._hass) == null ? void 0 : _.states[g];
    });
    if (this._hass = e, !t) return;
    const n = e.states[t.media_player_entity], l = e.states[t.satellite_entity], s = (f = t.group_entities) == null ? void 0 : f.map((g) => e.states[g]), c = (r == null ? void 0 : r.length) !== (s == null ? void 0 : s.length) || (s == null ? void 0 : s.some((g, _) => g !== r[_]));
    (i !== n || a !== l || c) && this.requestUpdate();
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
  _call(e, t, i, a) {
    this._hass.callService(e, t, { entity_id: i, ...a || {} });
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
      const a = e.attributes.group_members || [];
      this._call("media_player", "join", e.entity_id, {
        group_members: [.../* @__PURE__ */ new Set([...a, t])]
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
    const e = this._config, t = e.layout === "round", i = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, a = this._isNightMode(i);
    this.classList.toggle("night", a);
    const r = this._stateObj(), n = `card ${t ? "round" : ""}`;
    if (!r || ["unavailable", "unknown"].includes(r.state))
      return u`
        <div class=${n} style=${this._cardStyle()}>
          ${t ? this._renderRoundEmpty() : this._renderLandscapeEmpty()}
        </div>
      `;
    const l = r.state === "playing";
    return u`
      <div class=${n} style=${this._cardStyle()}>
        ${t ? this._renderRound(r, l) : this._renderLandscape(r, l)}
      </div>
    `;
  }
  // -------------------- Round (Echo Spot) --------------------
  _renderRound(e, t) {
    const i = e.attributes, a = this._hasArt(e), r = i.media_duration, n = Ge(e), l = r ? Math.min(1, (n || 0) / r) : 0;
    return u`
      <div class="art-layer ${a ? "" : "no-art"}">
        ${a ? u`<img
              class="art-img"
              src=${i.entity_picture}
              alt=""
              @error=${() => this._onArtError(i.entity_picture)}
            />` : this._renderVinyl(t)}
      </div>
      ${a ? u`<div class="scrim"></div>` : d}
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
        ${r != null ? u`<span class="time">${se(n)} / ${se(r)}</span>` : d}
        <div class="track-title">${i.media_title || "—"}</div>
        ${i.media_artist ? u`<div class="track-artist">${i.media_artist}</div>` : d}
        ${this._renderTransportCompact(e, t)}
      </div>
    `;
  }
  _renderRoundEmpty() {
    return u`
      <div class="art-layer no-art">${this._renderVinyl(!1)}</div>
      <div class="content">
        <div class="track-title empty">
          ${this._config.media_player_entity ? "Aucune lecture" : "Aucun lecteur configuré"}
        </div>
      </div>
    `;
  }
  _renderTransportCompact(e, t) {
    const i = this._supports(e, z.PREVIOUS_TRACK), a = this._supports(e, z.NEXT_TRACK);
    return u`
      <div class="transport">
        ${i ? u`<button class="ctrl small" aria-label="Précédent" @click=${() => this._prev(e)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : d}
        <button
          class="ctrl play"
          aria-label=${t ? "Pause" : "Lecture"}
          @click=${() => this._playPause(e)}
        >
          <ha-icon icon=${t ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${a ? u`<button class="ctrl small" aria-label="Suivant" @click=${() => this._next(e)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : d}
      </div>
    `;
  }
  // -------------------- Large (Echo Show) --------------------
  _renderLandscape(e, t) {
    var f, g;
    const i = this._config, a = e.attributes, r = this._hasArt(e), n = a.media_duration, l = Ge(e), s = n ? Math.min(1, (l || 0) / n) : 0, c = i.language || ((f = this._hass.locale) == null ? void 0 : f.language) || "en", h = i.time_format || ((g = this._hass.locale) == null ? void 0 : g.time_format) || "24", p = a.source || a.app_name, m = [a.media_artist, a.media_album_name].filter(Boolean).join(" — ");
    return u`
      <div class="art-col ${r ? "with-art" : "no-art"}">
        ${r ? u`<img
              class="art-img"
              src=${a.entity_picture}
              alt=""
              @error=${() => this._onArtError(a.entity_picture)}
            />` : this._renderVinyl(t)}
      </div>
      <div class="info-col">
        <div class="top-row">
          <div class="device-name">
            <ha-icon icon="mdi:speaker"></ha-icon>
            <span>${a.friendly_name || ""}</span>
          </div>
          ${i.show_clock ? u`<span class="clock">${jt(/* @__PURE__ */ new Date(), c, h)}</span>` : d}
        </div>
        <div class="title-block">
          ${p ? u`<span class="eyebrow-src">${p}</span>` : d}
          <h3 class="track-title-lg">${a.media_title || "—"}</h3>
          ${m ? u`<span class="track-meta">${m}</span>` : d}
        </div>
        ${n != null ? this._renderProgress(e, l, n, s) : d}
        ${this._renderTransportFull(e, t)}
        ${i.show_volume && this._supports(e, z.VOLUME_SET) ? this._renderVolume(e) : d}
        ${this._renderChips(e)}
      </div>
    `;
  }
  _renderLandscapeEmpty() {
    return u`
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
  _renderProgress(e, t, i, a) {
    const r = this._supports(e, z.SEEK);
    return u`
      <div class="progress-row">
        <time>${se(t)}</time>
        <div class="bar">
          <div class="fill" style="width:${(a * 100).toFixed(2)}%"></div>
          ${r ? u`<input
                type="range"
                class="range-overlay"
                min="0"
                max=${i}
                step="1"
                .value=${String(t != null ? t : 0)}
                aria-label="Position de lecture"
                @change=${(n) => this._seek(e, n)}
              />` : d}
        </div>
        <time>${se(i)}</time>
      </div>
    `;
  }
  _renderTransportFull(e, t) {
    const i = this._config, a = e.attributes, r = this._supports(e, z.PREVIOUS_TRACK), n = this._supports(e, z.NEXT_TRACK), l = i.show_shuffle && this._supports(e, z.SHUFFLE_SET) && a.shuffle !== void 0, s = i.show_repeat && this._supports(e, z.REPEAT_SET) && a.repeat !== void 0;
    return u`
      <div class="transport-lg">
        ${l ? u`<button
              class="ctrl ghost-sm ${a.shuffle ? "active" : ""}"
              aria-label="Lecture aléatoire"
              aria-pressed=${a.shuffle ? "true" : "false"}
              @click=${() => this._toggleShuffle(e)}
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>` : d}
        ${r ? u`<button class="ctrl mid" aria-label="Précédent" @click=${() => this._prev(e)}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>` : d}
        <button
          class="ctrl play-lg"
          aria-label=${t ? "Pause" : "Lecture"}
          @click=${() => this._playPause(e)}
        >
          <ha-icon icon=${t ? "mdi:pause" : "mdi:play"}></ha-icon>
        </button>
        ${n ? u`<button class="ctrl mid" aria-label="Suivant" @click=${() => this._next(e)}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>` : d}
        ${s ? u`<button
              class="ctrl ghost-sm ${a.repeat && a.repeat !== "off" ? "active" : ""}"
              aria-label="Répéter"
              aria-pressed=${a.repeat && a.repeat !== "off" ? "true" : "false"}
              @click=${() => this._cycleRepeat(e)}
            >
              <ha-icon icon=${a.repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}></ha-icon>
            </button>` : d}
      </div>
    `;
  }
  _renderVolume(e) {
    var r;
    const t = e.attributes, i = (r = t.volume_level) != null ? r : 0, a = t.is_volume_muted || i === 0 ? "mdi:volume-off" : i < 0.5 ? "mdi:volume-medium" : "mdi:volume-high";
    return u`
      <div class="volume-row">
        <ha-icon icon=${a}></ha-icon>
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
            @input=${(n) => this._setVolume(e, n)}
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
    var c;
    const t = this._config, i = e.attributes, a = [];
    if (t.show_source && this._supports(e, Gt) && ((c = i.source_list) == null ? void 0 : c.length) && a.push(u`
        <button
          class="chip"
          aria-expanded=${this._sourcesOpen ? "true" : "false"}
          @click=${() => {
      this._sourcesOpen = !this._sourcesOpen, this._groupOpen = !1;
    }}
        >
          <ha-icon icon="mdi:cast"></ha-icon>Sources
        </button>
      `), t.show_group && this._supports(e, z.GROUPING) && t.group_entities.length && a.push(u`
        <button
          class="chip"
          aria-expanded=${this._groupOpen ? "true" : "false"}
          @click=${() => {
      this._groupOpen = !this._groupOpen, this._sourcesOpen = !1;
    }}
        >
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>Groupe
        </button>
      `), t.show_queue && t.dashboard && (t.navigate_device || t.satellite_entity) && a.push(u`
        <button class="chip" @click=${() => this._navigateToQueue()}>
          <ha-icon icon="mdi:playlist-music"></ha-icon>File d'attente
        </button>
      `), !a.length) return d;
    const s = this._sourcesOpen || this._groupOpen;
    return u`
      <div class="chip-row">${a}</div>
      ${s ? u`<div
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
    return u`
      <div class="popover" role="listbox" @click=${(i) => i.stopPropagation()}>
        ${t.source_list.map(
      (i) => u`
            <button
              class="popover-item ${i === t.source ? "current" : ""}"
              role="option"
              aria-selected=${i === t.source ? "true" : "false"}
              @click=${() => this._selectSource(e, i)}
            >
              ${i === t.source ? u`<ha-icon icon="mdi:check"></ha-icon>` : d}
              <span>${i}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  _renderGroupPopover(e) {
    const t = e.attributes.group_members || [];
    return u`
      <div class="popover" @click=${(i) => i.stopPropagation()}>
        ${this._config.group_entities.map((i) => {
      var l;
      const a = this._hass.states[i], r = ((l = a == null ? void 0 : a.attributes) == null ? void 0 : l.friendly_name) || i, n = t.includes(i);
      return u`
            <button
              class="popover-item ${n ? "current" : ""}"
              aria-pressed=${n ? "true" : "false"}
              @click=${() => this._toggleGroupMember(e, i, n)}
            >
              <ha-icon icon=${n ? "mdi:speaker-multiple" : "mdi:speaker-off"}></ha-icon>
              <span>${r}</span>
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
    return u`
      <div class="vinyl-wrap ${e ? "spinning" : ""}">
        <div class="vinyl"></div>
        <div class="label"></div>
      </div>
      <div class="tonearm"></div>
    `;
  }
}
N(we, "properties", {
  _config: { state: !0 },
  _artFailedUrl: { state: !0 },
  // dernière entity_picture qui a fait
  // échouer le <img> (404, réseau...) — bascule sur le vinyle tant que
  // l'intégration ne fournit pas une URL différente (cf. _hasArt)
  _sourcesOpen: { state: !0 },
  _groupOpen: { state: !0 }
}), N(we, "styles", Ae`
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
customElements.define(mt, we);
window.customCards = window.customCards || [];
window.customCards.push({
  type: mt,
  name: "Echo Player Card",
  description: "Lecteur média plein écran pour smart displays (Echo Show, Echo Spot, View Assist)."
});
const gt = "echo-weather-card", Jt = "https://cdn.jsdelivr.net/npm/@meteocons/svg", Wt = 1, Kt = 2, x = {
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
  layout: null,
  // Facteur d'échelle manuel de toute la carte (CSS zoom). 1 = pas de
  // changement. Filet de rattrapage si les tailles fluides ne
  // correspondent pas à l'attendu sur un appareil donné (WebView non
  // standard, densité d'écran particulière...) — ex: 1.3 pour agrandir
  // 30%, 0.85 pour réduire. À ajuster à l'œil sur l'appareil réel.
  zoom: 1
}, Yt = {
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
function F(o, e) {
  return o === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : o === "sunny" && e ? "clear-night" : Yt[o] || "not-available";
}
function O(o, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${o}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${Jt}/${t}/${o}.svg`;
}
const le = /* @__PURE__ */ new Map();
async function Qt(o) {
  const t = await (await fetch(o)).text(), i = new DOMParser().parseFromString(t, "image/svg+xml");
  i.querySelectorAll("animate, animateTransform, animateMotion, animateColor, set").forEach((r) => r.remove());
  const a = new XMLSerializer().serializeToString(i.documentElement);
  return URL.createObjectURL(new Blob([a], { type: "image/svg+xml" }));
}
function Xt(o, e) {
  const t = le.get(o);
  if (typeof t == "string") return t;
  if (!t) {
    const i = Qt(o).catch(() => o).then((a) => (le.set(o, a), a));
    le.set(o, i);
  }
  return Promise.resolve(le.get(o)).then(() => e == null ? void 0 : e()), null;
}
function ve(o, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    hour12: t === "12"
  }).format(o).replace(/\s/g, "");
}
function q(o, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(o).replace(/\s/g, "");
}
function Je(o, e) {
  return new Intl.DateTimeFormat(e, { weekday: "short" }).format(o);
}
function We(o, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(o);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ke(o, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(o);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function I(o, e) {
  return o.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
function Ye(o) {
  const e = Number(o);
  return Number.isFinite(e) ? e < 3 ? "Faible" : e < 6 ? "Modéré" : e < 8 ? "Élevé" : e < 11 ? "Très élevé" : "Extrême" : null;
}
function Qe(o, e) {
  return (Number(o.attributes.supported_features) & e) !== 0;
}
async function Zt(o, e, t) {
  var i, a;
  try {
    const r = await o.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: t },
      target: { entity_id: e },
      return_response: !0
    });
    return ((a = (i = r == null ? void 0 : r.response) == null ? void 0 : i[e]) == null ? void 0 : a.forecast) || [];
  } catch (r) {
    return console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${t})`,
      r
    ), [];
  }
}
function ei(o, e, t) {
  const i = o.states[e];
  if (!i) return () => {
  };
  const a = [];
  if (Qe(i, Wt) && a.push("daily"), Qe(i, Kt) && a.push("hourly"), a.length === 0)
    return console.warn(
      `[echo-weather-card] ${e} ne supporte ni forecast daily ni hourly`
    ), () => {
    };
  const r = [];
  let n = !1;
  return a.forEach((l) => {
    o.connection.subscribeMessage(
      (s) => t(l, s.forecast || []),
      { type: "weather/subscribe_forecast", forecast_type: l, entity_id: e }
    ).then((s) => {
      n ? s() : r.push(s);
    }).catch(async (s) => {
      console.warn(
        `[echo-weather-card] souscription forecast "${l}" indisponible, repli sur get_forecasts`,
        s
      );
      const c = await Zt(o, e, l);
      n || t(l, c);
    });
  }), () => {
    n = !0, r.forEach((l) => l());
  };
}
const ti = `
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
`, ii = new Map(
  ti.trim().split(`
`).map((o) => {
    const e = o.indexOf(":");
    return [o.slice(0, e), o.slice(e + 1)];
  })
);
function Xe(o) {
  const e = String(o.getMonth() + 1).padStart(2, "0"), t = String(o.getDate()).padStart(2, "0");
  return ii.get(`${e}-${t}`) || null;
}
const ai = {
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
function Ze(o) {
  return ai[o] || null;
}
class xe extends V {
  setConfig(e) {
    if (!(e != null && e.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    const t = {
      ...x,
      ...e,
      icons: { ...x.icons, ...e.icons || {} }
    };
    this._config = this._validateConfig(t, e);
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que d'échouer silencieusement (ex: hourly_count en
  // chaîne de caractères) ou de casser le rendu (theme_mode invalide ne
  // matchant aucun mode). Seule `entity` manquante est bloquante
  // (cf. setConfig ci-dessus) — une faute de frappe ailleurs ne doit pas
  // empêcher tout le reste de s'afficher.
  _validateConfig(e, t) {
    const i = (a, r) => console.warn(
      `[echo-weather-card] "${a}" invalide (${JSON.stringify(t[a])}), valeur par défaut utilisée (${JSON.stringify(r)})`
    );
    return (!Number.isInteger(e.hourly_count) || e.hourly_count < 0) && (i("hourly_count", x.hourly_count), e.hourly_count = x.hourly_count), (!Number.isInteger(e.daily_count) || e.daily_count < 0) && (i("daily_count", x.daily_count), e.daily_count = x.daily_count), ["auto", "light", "dark"].includes(e.theme_mode) || (i("theme_mode", x.theme_mode), e.theme_mode = x.theme_mode), e.layout !== null && e.layout !== "round" && (i("layout", x.layout), e.layout = x.layout), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (i("zoom", x.zoom), e.zoom = x.zoom), e;
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
    var a, r;
    const t = (r = this._hass) == null ? void 0 : r.states[(a = this._config) == null ? void 0 : a.entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.entity];
    i && this._subscribedEntity !== this._config.entity && this._subscribeToForecasts(), t !== i && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _subscribeToForecasts() {
    var e;
    (e = this._unsubscribeForecasts) == null || e.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = ei(
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
    return Xt(e, () => this.requestUpdate()) || e;
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
  // style inline de .card : fond personnalisé + zoom manuel. zoom existe
  // en secours pour les appareils où les tailles fluides (--_fluid-unit,
  // cqw/vw) ne correspondent pas à l'attendu malgré tout — plutôt que de
  // continuer à deviner la cause exacte à distance (WebView non standard,
  // densité d'écran particulière...), l'utilisateur peut l'ajuster
  // lui-même. zoom recalcule vraiment la mise en page à l'échelle
  // choisie (contrairement à transform: scale()), donc >1 peut faire
  // déborder .card de son hôte si l'espace autour ne l'absorbe pas —
  // c'est un réglage volontairement manuel, sans garde-fou automatique.
  _cardStyle() {
    const e = [];
    return this._config.background != null && e.push(`background:${this._config.background}`), this._config.zoom != null && this._config.zoom !== 1 && e.push(`zoom:${this._config.zoom}`), e.join(";");
  }
  render() {
    var r, n;
    if (!this._config || !this._hass) return d;
    const e = this._hass.states[this._config.entity];
    if (!e)
      return u`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    if (["unavailable", "unknown"].includes(e.state) || e.attributes.temperature == null)
      return u`<div class="error">
        Entité ${this._config.entity} indisponible
      </div>`;
    this.classList.toggle("light", this._isLightMode());
    const t = this._config.language || ((r = this._hass.locale) == null ? void 0 : r.language) || "en", i = this._config.time_format || ((n = this._hass.locale) == null ? void 0 : n.time_format) || "24";
    if (this._config.layout === "round")
      return this._renderRound(e, t, i);
    const a = this._cardStyle();
    return u`
      <div class="card" style=${a}>
        ${this._config.title ? u`<div class="title">${this._config.title}</div>` : d}
        ${this._config.show_current ? this._renderCurrent(e, t, i) : d}
        ${this._config.show_hourly ? this._renderHourly(t, i) : d}
        ${this._config.show_daily ? this._renderDaily(t) : d}
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
    const a = F(e.state, this._isNight()), r = O(a, this._config.icons), n = I(this._hass, e.state), l = e.attributes.temperature, s = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, h = e.attributes.humidity, p = e.last_updated ? new Date(e.last_updated) : null, m = /* @__PURE__ */ new Date(), f = this._cardStyle(), g = () => {
      this._roundDialog = "current";
    }, _ = () => {
      this._roundDialog = "hourly";
    }, b = () => {
      this._roundDialog = "daily";
    }, v = (this._hourly || []).find(
      (Y) => new Date(Y.datetime).getTime() >= Date.now()
    ), S = v ? `${ve(new Date(v.datetime), t, i)} · ${Math.round(v.temperature)}°` : null, C = (this._daily || [])[0], T = C ? `↑${Math.round(C.temperature)}° ↓${Math.round(C.templow)}°` : null, A = [];
    this._config.show_feels_like && c != null && A.push(`Ressenti ${Math.round(c)}°`), this._config.show_humidity && h != null && A.push(`Humidité ${Math.round(h)}%`);
    const R = this._config.show_date ? Xe(m) : null, $ = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], w = $ && !["unknown", "unavailable"].includes($.state) ? Ze($.state) : null, P = [];
    return w && P.push(w.label), R && P.push(R), u`
      <div class="card round" style=${f}>
        ${this._config.show_clock ? u`<div class="round-clock">
              ${q(m, t, i)}
            </div>` : d}
        ${this._config.show_date ? u`<div class="round-date">
              ${Ke(m, t)}
            </div>` : d}
        ${P.length ? u`<div class="round-moon-line">
              ${w ? u`<ha-icon
                    class="round-date-icon"
                    icon=${w.icon}
                  ></ha-icon>` : d}
              <span>${P.join(" · ")}</span>
            </div>` : d}
        ${this._config.show_current ? u`
              <div
                class="round-current"
                role="button"
                tabindex="0"
                @click=${g}
                @keydown=${(Y) => {
      (Y.key === "Enter" || Y.key === " ") && (Y.preventDefault(), g());
    }}
              >
                <img
                  class="round-icon"
                  src=${this._config.icons.animate_current ? r : this._staticIcon(r)}
                  alt=${n}
                />
                <div class="round-current-info">
                  <div class="round-temp">${Math.round(l)}${s}</div>
                  <div class="round-condition">${n}</div>
                  ${A.length ? u`<div class="round-meta">
                        ${A.join(" · ")}
                      </div>` : d}
                </div>
              </div>
            ` : d}
        ${this._renderRoundIndicators(e, g)}
        <div class="round-launchers">
          ${this._config.show_hourly ? this._renderRoundLauncher(
      "mdi:clock-outline",
      "Aujourd'hui",
      S,
      _
    ) : d}
          ${this._config.show_daily ? this._renderRoundLauncher(
      "mdi:calendar-week",
      "Semaine",
      T,
      b
    ) : d}
        </div>
        ${this._config.show_last_updated && p ? u`<div class="round-updated">
              Maj à ${q(p, t, i)}
            </div>` : d}
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
    const i = [], a = this._config.uv_entity && this._hass.states[this._config.uv_entity];
    a && !["unknown", "unavailable"].includes(a.state) && i.push({ icon: "mdi:weather-sunny-alert", value: a.state });
    const r = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity];
    r && !["unknown", "unavailable"].includes(r.state) && i.push({ icon: "mdi:air-filter", value: r.state });
    const n = e.attributes.wind_speed;
    this._config.show_wind && n != null && i.push({
      icon: "mdi:weather-windy",
      value: `${Math.round(n)}`
    });
    const l = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], s = l ? Number(l.state) : e.attributes.dew_point;
    return this._config.show_dew_point && s != null && Number.isFinite(s) && i.push({
      icon: "mdi:thermometer-water",
      value: `${Math.round(s)}°`
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
    ` : d;
  }
  _renderRoundLauncher(e, t, i, a) {
    return u`
      <div
        class="round-launcher"
        role="button"
        tabindex="0"
        @click=${a}
        @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), a());
    }}
      >
        <div class="round-launcher-top">
          <ha-icon icon=${e}></ha-icon>
          <span>${t}</span>
          <ha-icon class="round-chevron" icon=${"mdi:chevron-right"}></ha-icon>
        </div>
        ${i ? u`<div class="round-launcher-preview">${i}</div>` : d}
      </div>
    `;
  }
  _renderRoundDialog(e, t, i) {
    return this._roundDialog === "current" ? this._renderCurrentDetail(e, t, i) : this._roundDialog === "hourly" ? this._renderHourlyOverview(t, i) : this._roundDialog === "daily" ? this._renderDailyOverview(t) : d;
  }
  // isRound : sur écran circulaire, le bouton fermer est centré en bas
  // plutôt qu'en haut à droite — ce coin-là est le plus susceptible d'être
  // sous le boîtier physique (cf. _renderRound, .round-dialog en CSS).
  _renderDialogHeader(e, t, i) {
    return u`
      <div class="detail-header">
        <div class="detail-date">${e}</div>
        ${i ? d : u`<ha-icon
              class="detail-close"
              icon=${"mdi:close"}
              role="button"
              tabindex="0"
              @click=${t}
              @keydown=${(a) => {
      (a.key === "Enter" || a.key === " ") && t();
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
    const a = () => {
      this._roundDialog = null;
    }, r = e.attributes.temperature_unit || "°C", n = e.attributes.apparent_temperature, l = e.attributes.humidity, s = e.attributes.wind_speed, c = e.attributes.wind_speed_unit || "", h = this._config.uv_entity && this._hass.states[this._config.uv_entity], p = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity], m = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], f = m ? Number(m.state) : e.attributes.dew_point, g = this._hass.states[this._config.sun_entity || "sun.sun"], _ = [];
    if (this._config.show_feels_like && n != null && _.push({
      icon: "mdi:thermometer",
      label: "Ressenti",
      value: `${Math.round(n)}${r}`
    }), this._config.show_humidity && l != null && _.push({
      icon: "mdi:water-percent",
      label: "Humidité",
      value: `${Math.round(l)}%`
    }), h && !["unknown", "unavailable"].includes(h.state)) {
      const b = Ye(h.state);
      _.push({
        icon: "mdi:weather-sunny-alert",
        label: "Indice UV",
        value: b ? `${h.state} · ${b}` : `${h.state}`
      });
    }
    if (p && !["unknown", "unavailable"].includes(p.state)) {
      const b = p.attributes.Libellé || p.attributes.libelle, v = p.attributes.unit_of_measurement;
      _.push({
        icon: "mdi:air-filter",
        label: "Qualité de l'air",
        value: b ? `${p.state} · ${b}` : `${p.state}${v ? ` ${v}` : ""}`
      });
    }
    if (this._config.show_wind && s != null && _.push({
      icon: "mdi:weather-windy",
      label: "Vent",
      value: `${Math.round(s)} ${c}`.trim()
    }), this._config.show_dew_point && f != null && Number.isFinite(f)) {
      const b = m && m.attributes.unit_of_measurement || r;
      _.push({
        icon: "mdi:thermometer-water",
        label: "Point de rosée",
        value: `${f.toFixed(1)}${b}`
      });
    }
    return this._config.show_sun && g && (g.attributes.next_rising && _.push({
      icon: "mdi:weather-sunset-up",
      label: "Lever",
      value: q(
        new Date(g.attributes.next_rising),
        t,
        i
      )
    }), g.attributes.next_setting && _.push({
      icon: "mdi:weather-sunset-down",
      label: "Coucher",
      value: q(
        new Date(g.attributes.next_setting),
        t,
        i
      )
    })), this._config.show_last_updated && e.last_updated && _.push({
      icon: "mdi:update",
      label: "Mise à jour",
      value: q(
        new Date(e.last_updated),
        t,
        i
      )
    }), u`
      <ha-dialog class="round-dialog" open hideActions @closed=${a}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Météo actuelle", a, !0)}
            ${_.length ? u`<div class="detail-rows">
                  ${_.map(
      (b) => u`<div class="detail-row">
                      <ha-icon icon=${b.icon}></ha-icon>
                      <span class="detail-row-label">${b.label}</span>
                      <span class="detail-row-value">${b.value}</span>
                    </div>`
    )}
                </div>` : u`<div class="detail-row-empty">
                  Aucune information supplémentaire configurée.
                </div>`}
          </div>
          ${this._renderRoundBackButton(a)}
        </div>
      </ha-dialog>
    `;
  }
  // Liste des prochaines heures (mode round uniquement) — même donnée que
  // _renderHourly, mais en liste verticale scrollable plutôt qu'en rangée
  // horizontale (pas la largeur nécessaire sur un écran rond). Indépendant
  // de hourly_count : cette limite n'a de sens que pour l'aperçu affiché
  // en permanence en mise en page large (Echo Show) — ici, dans une liste
  // qu'on ouvre volontairement au tap, autant montrer tout ce que fournit
  // l'intégration météo. Un repère de date s'intercale dès que la liste
  // passe au jour suivant, pour rester lisible sur plusieurs jours.
  _renderHourlyOverview(e, t) {
    const i = () => {
      this._roundDialog = null;
    }, a = Date.now(), r = (this._hourly || []).filter(
      (s) => new Date(s.datetime).getTime() >= a
    );
    let n = null;
    const l = [];
    return r.forEach((s) => {
      const c = new Date(s.datetime), h = c.toDateString();
      h !== n && (l.push({ marker: Ke(c, e) }), n = h), l.push({ forecast: s, date: c });
    }), u`
      <ha-dialog class="round-dialog" open hideActions @closed=${i}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Aujourd'hui", i, !0)}
            ${l.length ? u`<div class="hourly-list">
                  ${l.map((s) => {
      if (s.marker)
        return u`<div class="hourly-list-day-marker">
                        ${s.marker}
                      </div>`;
      const { forecast: c, date: h } = s, p = F(
        c.condition,
        this._isNight(h)
      ), m = O(p, this._config.icons), f = I(
        this._hass,
        c.condition
      ), g = c.precipitation_probability;
      return u`<div class="hourly-list-item">
                      <span class="hourly-list-time"
                        >${ve(h, e, t)}</span
                      >
                      <img
                        class="hourly-list-icon"
                        src=${this._staticIcon(m)}
                        alt=${f}
                      />
                      <span class="hourly-list-temp"
                        >${Math.round(c.temperature)}°</span
                      >
                      <span class="hourly-list-pop"
                        >${this._config.show_precipitation_probability && g > 0 ? `${g}%` : ""}</span
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
  // Indépendant de daily_count, comme _renderHourlyOverview (cf. son
  // commentaire) : tout ce que fournit l'intégration météo.
  _renderDailyOverview(e) {
    const t = () => {
      this._roundDialog = null;
    }, i = this._daily || [];
    return u`
      <ha-dialog class="round-dialog" open hideActions @closed=${t}>
        <div class="round-dialog-wrap">
          <div class="detail detail-list round-detail">
            ${this._renderDialogHeader("Cette semaine", t, !0)}
            ${i.length ? u`<div class="daily-list">
                  ${i.map((a) => {
      const r = new Date(a.datetime), n = F(
        a.condition,
        !1
      ), l = O(n, this._config.icons), s = I(
        this._hass,
        a.condition
      ), c = () => {
        this._roundDialog = null, this._detailForecast = a;
      }, h = a.precipitation_probability;
      return u`<div
                      class="daily-list-item"
                      role="button"
                      tabindex="0"
                      @click=${c}
                      @keydown=${(p) => {
        (p.key === "Enter" || p.key === " ") && (p.preventDefault(), c());
      }}
                    >
                      <span class="daily-list-day"
                        >${Je(r, e)}</span
                      >
                      <img
                        class="daily-list-icon"
                        src=${this._staticIcon(l)}
                        alt=${s}
                      />
                      <span class="daily-list-temps">
                        <span class="daily-max"
                          >${Math.round(a.temperature)}°</span
                        >
                        <span class="daily-min"
                          >${Math.round(a.templow)}°</span
                        >
                      </span>
                      <span class="daily-list-pop"
                        >${this._config.show_precipitation_probability && h != null ? `${Math.round(h)}%` : ""}</span
                      >
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
    const a = F(e.state, this._isNight()), r = O(a, this._config.icons), n = I(this._hass, e.state), l = e.attributes.temperature, s = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, h = e.attributes.humidity, p = e.last_updated ? new Date(e.last_updated) : null, m = [];
    this._config.show_feels_like && c != null && m.push(`Ressenti ${Math.round(c)}°`), this._config.show_last_updated && p && m.push(`Maj à ${q(p, t, i)}`);
    const f = this._config.uv_entity && this._hass.states[this._config.uv_entity], g = f && !["unknown", "unavailable"].includes(f.state), _ = this._config.air_quality_entity && this._hass.states[this._config.air_quality_entity], b = _ && !["unknown", "unavailable"].includes(_.state), v = g || b, S = this._config.show_humidity && h != null, C = this._config.show_clock || this._config.show_date, T = /* @__PURE__ */ new Date(), A = this._config.show_date ? Xe(T) : null, R = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], $ = R && !["unknown", "unavailable"].includes(R.state) ? Ze(R.state) : null, w = [];
    return $ && w.push($.label), A && w.push(A), u`
      <div class="current">
        <img
          class="current-icon"
          src=${this._config.icons.animate_current ? r : this._staticIcon(r)}
          alt=${n}
        />
        <div class="current-info">
          <div class="current-main">
            <div class="current-temp">${Math.round(l)}${s}</div>
            <div class="current-condition">${n}</div>
            ${m.length ? u`<div class="current-meta">
                  ${m.join(" · ")}
                </div>` : d}
          </div>
          ${v || S ? u`
                <div class="uv-group">
                  ${v ? u`<div class="indicators-row">
                        ${g ? this._renderIndicator("uv", f) : d}
                        ${b ? this._renderIndicator("air", _) : d}
                      </div>` : d}
                  ${S ? u`<div class="humidity-line">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(h)}%</span>
                      </div>` : d}
                </div>
              ` : d}
        </div>
        ${C ? u`
              <div class="current-side">
                <div class="clock-group">
                  ${this._config.show_clock ? u`<div class="clock">
                        ${q(T, t, i)}
                      </div>` : d}
                  ${this._config.show_date ? u`<div class="date-line">
                        ${We(T, t)}
                      </div>` : d}
                  ${w.length ? u`<div class="moon-line">
                        ${$ ? u`<ha-icon
                              class="moon-icon"
                              icon=${$.icon}
                            ></ha-icon>` : d}
                        <span>${w.join(" · ")}</span>
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
    const i = e === "uv", a = i ? "Indice UV" : "Qualité de l'air", r = i ? Ye(t.state) : t.attributes.Libellé || t.attributes.libelle || null, n = i ? null : t.attributes.unit_of_measurement;
    return u`
      <div class="indicator-box indicator-${e}">
        <div class="indicator-label">${a}</div>
        <div class="indicator-row">
          <span class="indicator-value"
            >${t.state}${n ? ` ${n}` : ""}</span
          >
          ${r ? u`<span class="indicator-category">${r}</span>` : d}
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
    const a = [], r = e.attributes.wind_speed;
    if (this._config.show_wind && r != null) {
      const c = e.attributes.wind_speed_unit || "";
      a.push({
        type: "wind",
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(r)} ${c}`.trim()
      });
    }
    const n = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], l = n ? Number(n.state) : e.attributes.dew_point;
    if (this._config.show_dew_point && l != null && Number.isFinite(l)) {
      const c = n ? n.attributes.unit_of_measurement || e.attributes.temperature_unit || "°C" : e.attributes.temperature_unit || "°C";
      a.push({
        type: "dew-point",
        icon: "mdi:thermometer-water",
        label: "Point de rosée",
        // Arrondi à la décimale près (contrairement au reste des tuiles,
        // arrondies à l'entier) : la valeur bouge peu, la décimale aide à
        // voir qu'elle évolue.
        value: `${l.toFixed(1)}${c}`
      });
    }
    const s = this._hass.states[this._config.sun_entity || "sun.sun"];
    if (this._config.show_sun && s) {
      const c = s.attributes.next_rising ? new Date(s.attributes.next_rising) : null, h = s.attributes.next_setting ? new Date(s.attributes.next_setting) : null;
      c && a.push({
        type: "sunrise",
        icon: "mdi:weather-sunset-up",
        label: "Lever",
        value: q(c, t, i)
      }), h && a.push({
        type: "sunset",
        icon: "mdi:weather-sunset-down",
        label: "Coucher",
        value: q(h, t, i)
      });
    }
    return a.length ? u`
      <div class="bottom-band">
        ${a.map(
      (c) => u`
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
    const i = Date.now(), a = (this._hourly || []).filter((r) => new Date(r.datetime).getTime() >= i).slice(0, this._config.hourly_count);
    return a.length ? u`
      <div class="hourly">
        ${a.map((r) => {
      const n = new Date(r.datetime), l = F(
        r.condition,
        this._isNight(n)
      ), s = O(l, this._config.icons), c = I(this._hass, r.condition), h = r.precipitation_probability;
      return u`
            <div class="hourly-item">
              <div class="hourly-time">
                ${ve(n, e, t)}
              </div>
              <img
                class="hourly-icon"
                src=${this._staticIcon(s)}
                alt=${c}
              />
              <div class="hourly-temp">
                ${Math.round(r.temperature)}°
              </div>
              ${this._config.show_precipitation_probability && h > 0 ? u`<div class="hourly-pop">${h}%</div>` : d}
            </div>
          `;
    })}
      </div>
    ` : d;
  }
  _renderDaily(e) {
    const t = (this._daily || []).slice(0, this._config.daily_count);
    return t.length ? u`
      <div class="daily">
        ${t.map((i) => {
      const a = new Date(i.datetime), r = F(i.condition, !1), n = O(r, this._config.icons), l = I(this._hass, i.condition);
      return u`
            <div
              class="daily-item"
              role="button"
              tabindex="0"
              @click=${() => {
        this._detailForecast = i;
      }}
              @keydown=${(s) => {
        (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this._detailForecast = i);
      }}
            >
              <div class="daily-day">${Je(a, e)}</div>
              <img
                class="daily-icon"
                src=${this._staticIcon(n)}
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
  _renderDayDetail(e, t, i) {
    const a = this._detailForecast;
    if (!a) return d;
    const r = () => {
      this._detailForecast = null;
    }, n = new Date(a.datetime), l = F(a.condition, !1), s = O(l, this._config.icons), c = I(this._hass, a.condition), h = e.attributes.temperature_unit || "°C", p = e.attributes.wind_speed_unit || "", m = [];
    a.precipitation_probability != null && m.push({
      icon: "mdi:water-percent",
      label: "Probabilité de pluie",
      value: `${Math.round(a.precipitation_probability)}%`
    }), a.precipitation != null && m.push({
      icon: "mdi:weather-pouring",
      label: "Cumul de précipitations",
      value: `${a.precipitation} mm`
    }), a.wind_speed != null && m.push({
      icon: "mdi:weather-windy",
      label: "Vent",
      value: `${Math.round(a.wind_speed)} ${p}`.trim()
    }), a.humidity != null && m.push({
      icon: "mdi:water-percent",
      label: "Humidité",
      value: `${Math.round(a.humidity)}%`
    }), a.uv_index != null && m.push({
      icon: "mdi:weather-sunny-alert",
      label: "Indice UV",
      value: `${a.uv_index}`
    });
    const f = u`
      <div class="detail ${i ? "detail-list round-detail" : ""}">
        ${this._renderDialogHeader(We(n, t), r, i)}
        <img class="detail-icon" src=${s} alt=${c} />
        <div class="detail-condition">${c}</div>
        <div class="detail-temps">
          <span class="detail-max"
            >${Math.round(a.temperature)}${h}</span
          >
          <span class="detail-min"
            >${Math.round(a.templow)}${h}</span
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
            </div>` : d}
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
              ${f} ${this._renderRoundBackButton(r)}
            </div>` : f}
      </ha-dialog>
    `;
  }
}
N(xe, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 },
  _detailForecast: { state: !0 },
  _roundDialog: { state: !0 }
}), N(xe, "styles", Ae`
    /* container-type permet des tailles fluides (clamp + cqw) qui suivent
       la taille réelle du composant plutôt que le viewport — utile dans un
       conteneur View Assist dont la taille n'est pas celle de l'écran.
       Mais les container queries sont une fonctionnalité CSS relativement
       récente (Chromium 105+, mi-2022) : un WebView embarqué dans un ROM
       custom sur un appareil ancien (Echo Show 5 / Spot rootés) peut ne
       jamais l'avoir reçue, auquel cas toute unité cqw devient invalide et
       les tailles retombent sur leur valeur par défaut minuscule — repéré
       via un écart de taille significatif sur un vrai appareil. Toutes les
       tailles fluides passent donc par calc(N * var(--_fluid-unit))
       plutôt que "Ncqw" en dur : --_fluid-unit vaut 1vw par défaut
       (fonctionne partout, y compris les très vieux navigateurs), et
       seulement 1cqw quand @supports confirme que le navigateur gère
       réellement les container queries (cf. plus bas). vw se base sur le
       viewport plutôt que le conteneur — une approximation moins précise
       si la carte n'occupe pas tout l'écran, mais correcte pour l'usage
       principal visé (carte plein écran sur un smart display). */
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
      container-type: inline-size;
      --_fluid-unit: 1vw;
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
      --_icon-size: var(--echo-weather-icon-size, clamp(64px, calc(8.5 * var(--_fluid-unit)), 84px));
      --_current-icon-size: var(
        --echo-weather-current-icon-size,
        clamp(100px, calc(15 * var(--_fluid-unit)), 155px)
      );
      --_current-temp-size: var(
        --echo-weather-current-temp-size,
        clamp(3rem, calc(7.6 * var(--_fluid-unit)), 4.6rem)
      );
      --_hourly-temp-size: var(
        --echo-weather-hourly-temp-size,
        clamp(1.15rem, calc(2.4 * var(--_fluid-unit)), 1.5rem)
      );
      --_daily-icon-size: var(
        --echo-weather-daily-icon-size,
        clamp(38px, calc(5.2 * var(--_fluid-unit)), 49px)
      );
      --_daily-temp-size: var(
        --echo-weather-daily-temp-size,
        clamp(1.3rem, calc(2.6 * var(--_fluid-unit)), 1.6rem)
      );
      /* Jeu de couleurs sombre (par défaut) — repris/écrasé par
         :host(.light) ci-dessous quand le mode clair est actif (soleil
         levé, ou theme_mode forcé). Inspiré de RadarWise : dégradé doux
         plutôt qu'un fond plat, tuiles avec un léger relief (liseré haut
         + ombre portée) plutôt qu'un simple aplat. */
      --_mode-bg: radial-gradient(
        130% 140% at 18% -10%,
        #1f3350 0%,
        #111e30 45%,
        #0a1424 100%
      );
      /* Couleur pleine (pas un dégradé) pour les endroits qui ont besoin
         d'une vraie <color> CSS, ex: --mdc-theme-surface de ha-dialog —
         lui passer --_mode-bg (un radial-gradient) y est invalide, la
         déclaration est ignorée et le composant retombe sur son propre
         thème par défaut (d'où un fond noir en mode clair, repéré via
         test sur appareil réel). */
      --_mode-surface: #111e30;
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
      /* Tuiles des dialogues (menus heure/jour) : le fond du dialogue est
         un aplat uni (--_mode-surface), pas le dégradé riche de la carte
         (--_mode-bg) — les tuiles habituelles (--_mode-tile-bg, quasi
         blanches translucides) s'y distinguent à peine, surtout en clair
         (blanc quasi-transparent sur fond quasi-blanc). Couleur dédiée,
         nettement différenciée de --_mode-surface plutôt qu'une simple
         translucidité qui dépend trop de ce qu'il y a derrière. */
      --_mode-dialog-row-bg: #1f3350;
      --_mode-dialog-row-border: rgba(255, 255, 255, 0.16);
      --_text-color: var(--echo-weather-text-color, var(--_mode-text));
      --_secondary-color: var(
        --echo-weather-secondary-color,
        var(--_mode-secondary)
      );
      --_divider-color: var(--echo-weather-divider-color, var(--_mode-divider));
      --_tile-background: var(--echo-weather-tile-background, var(--_mode-tile-bg));
      --_tile-border: var(--echo-weather-tile-border, var(--_mode-tile-border));
      --_tile-shadow: var(--echo-weather-tile-shadow, var(--_mode-tile-shadow));
      --_dialog-row-background: var(
        --echo-weather-dialog-row-background,
        var(--_mode-dialog-row-bg)
      );
      --_dialog-row-border: var(
        --echo-weather-dialog-row-border,
        var(--_mode-dialog-row-border)
      );
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

    /* N'écrase --_fluid-unit en 1cqw que si le navigateur reconnaît
       vraiment container-type — sur un WebView qui ne le fait pas,
       @supports renvoie faux et le repli 1vw défini sur :host ci-dessus
       reste actif. */
    @supports (container-type: inline-size) {
      :host {
        --_fluid-unit: 1cqw;
      }
    }

    /* Mode clair : appliqué par render() (classe hôte) d'après le soleil,
       ou forcé via theme_mode. Écrase juste les tokens --_mode-*, tout le
       reste de la feuille de style s'adapte automatiquement à travers eux. */
    :host(.light) {
      --_mode-bg: radial-gradient(
        130% 140% at 18% -10%,
        #e6f3fb 0%,
        #cde6f5 45%,
        #a9d3ec 100%
      );
      --_mode-surface: #e6f3fb;
      --_mode-text: #16232e;
      /* Nettement plus foncé que la première tentative (#57697a) : sur les
         tuiles quasi blanches (--_tile-background) ou tout fond clair en
         général, un gris moyen manquait franchement de contraste (signalé
         explicitement illisible sur appareil réel) — mieux vaut un texte
         secondaire clairement lisible partout qu'une subtilité qui ne
         tient pas la route en usage réel. */
      --_mode-secondary: #3d4d5c;
      --_mode-divider: rgba(22, 35, 46, 0.14);
      --_mode-tile-bg: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.5)
      );
      --_mode-tile-border: rgba(22, 35, 46, 0.12);
      --_mode-tile-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 3px 10px rgba(22, 35, 46, 0.1);
      /* cf. commentaire sur --_mode-dialog-row-bg (mode sombre) : une
         teinte nettement distincte de --_mode-surface plutôt qu'un blanc
         translucide qui s'y fond. */
      --_mode-dialog-row-bg: #cde6f5;
      --_mode-dialog-row-border: rgba(22, 35, 46, 0.16);
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
      font-size: clamp(1.15rem, calc(2.1 * var(--_fluid-unit)), 1.45rem);
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
      font-size: clamp(0.82rem, calc(1.3 * var(--_fluid-unit)), 0.95rem);
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
      font-size: clamp(1.35rem, calc(2.5 * var(--_fluid-unit)), 1.65rem);
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
      font-size: clamp(0.88rem, calc(1.4 * var(--_fluid-unit)), 1.05rem);
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
      font-size: clamp(1.8rem, calc(3.9 * var(--_fluid-unit)), 2.6rem);
      font-weight: 800;
      white-space: nowrap;
    }
    .humidity-icon {
      --mdc-icon-size: clamp(32px, calc(4.8 * var(--_fluid-unit)), 43px);
      color: var(--echo-weather-humidity-color, #4fc3f7);
      flex-shrink: 0;
    }
    .current-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.95rem, calc(1.6 * var(--_fluid-unit)), 1.15rem);
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
      font-size: clamp(2.4rem, calc(5.2 * var(--_fluid-unit)), 3.4rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .date-line {
      color: var(--_secondary-color);
      font-size: clamp(1.25rem, calc(2.5 * var(--_fluid-unit)), 1.7rem);
      font-weight: 600;
      text-align: right;
      margin-top: 2px;
    }
    .moon-line {
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--_secondary-color);
      font-size: clamp(0.88rem, calc(1.5 * var(--_fluid-unit)), 1.08rem);
      font-weight: 500;
      text-align: right;
      margin-top: 2px;
    }
    .moon-icon {
      --mdc-icon-size: clamp(17px, calc(2.4 * var(--_fluid-unit)), 21px);
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
      font-size: clamp(0.9rem, calc(1.6 * var(--_fluid-unit)), 1.05rem);
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
      font-size: clamp(0.75rem, calc(1.3 * var(--_fluid-unit)), 0.9rem);
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
      font-size: clamp(0.95rem, calc(1.7 * var(--_fluid-unit)), 1.15rem);
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
      --mdc-icon-size: clamp(16px, calc(2.2 * var(--_fluid-unit)), 20px);
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
      font-size: clamp(0.8rem, calc(1.4 * var(--_fluid-unit)), 0.95rem);
      font-weight: 600;
      white-space: nowrap;
    }
    .band-value {
      font-size: clamp(0.85rem, calc(1.5 * var(--_fluid-unit)), 1.05rem);
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
      --mdc-dialog-min-width: min(90vw, 460px);
      --mdc-dialog-max-width: min(90vw, 460px);
      /* Deux variables plutôt qu'une : les versions récentes de Home
         Assistant ont migré ha-dialog vers un composant interne
         (wa-dialog, "WebAwesome") qui lit --ha-dialog-surface-background
         (repliée par défaut sur le thème global de HA, indépendamment du
         mode clair/sombre choisi par NOTRE carte — d'où un fond figé
         constaté sur un vrai appareil malgré --mdc-theme-surface, qui ne
         s'applique qu'à l'ancienne implémentation MDC/mwc). On fixe les
         deux pour être correct quelle que soit la version de HA. */
      --mdc-theme-surface: var(--_mode-surface);
      --ha-dialog-surface-background: var(--_mode-surface);
      --mdc-dialog-content-ink-color: var(--_text-color);
      --mdc-dialog-heading-ink-color: var(--_text-color);
      /* La source réelle de ha-dialog fixe explicitement
         color: var(--primary-text-color) sur sa propre surface interne —
         une variable de thème globale HA, indépendante de notre carte, qui
         gagne face à un simple héritage de "color" depuis l'hôte (une
         valeur EXPLICITE dans le shadow DOM interne l'emporte toujours sur
         une valeur héritée de l'extérieur). Sans la fixer nous-mêmes ici,
         tout le texte du dialogue retombe sur le thème HA de l'utilisateur
         plutôt que sur notre mode clair/sombre — repéré sur appareil réel
         (texte entièrement gris, y compris les valeurs censées être en
         texte "principal", pas seulement secondaire). --ha-dialog-header-
         title-color pour le titre, qui a son propre repli dédié. */
      --primary-text-color: var(--_text-color);
      --ha-dialog-header-title-color: var(--_text-color);
      color: var(--_text-color);
      font-family: inherit;
    }
    /* .detail peint son propre fond plutôt que de compter uniquement sur
       --mdc-theme-surface ci-dessus : cette variable MDC recevait jusque
       là --_mode-bg (un dégradé), une <color> CSS invalide pour la
       déclaration qui la consomme — la règle était donc ignorée et le
       dialogue retombait sur son thème interne par défaut (fond noir,
       peu importe le mode clair/sombre de la carte). Peindre notre
       propre fond ici garantit le bon rendu même si --mdc-theme-surface
       n'est pas respectée par une version donnée de ha-dialog. */
    .detail {
      display: flex;
      flex-direction: column;
      background: var(--_mode-surface);
      border-radius: 16px;
      align-items: center;
      gap: 4px;
      min-width: 240px;
      padding: 4px 4px 8px;
    }
    /* Détail d'un jour en mise en page large (jamais .detail-list — round
       ajoute toujours cette classe, cf. _renderDayDetail) : beaucoup plus
       de place disponible que sur un écran rond, autant en profiter — la
       boîte du dialogue elle-même (ha-dialog, cf. plus haut) est aussi
       plus large désormais. */
    .detail:not(.detail-list) {
      min-width: 340px;
      gap: 6px;
      padding: 8px 8px 14px;
    }
    .detail:not(.detail-list) .detail-icon {
      width: 128px;
      height: 128px;
    }
    .detail:not(.detail-list) .detail-date {
      font-size: 1.5rem;
    }
    .detail:not(.detail-list) .detail-condition {
      font-size: 1.25rem;
    }
    .detail:not(.detail-list) .detail-temps {
      font-size: 2.3rem;
    }
    .detail:not(.detail-list) .detail-rows {
      gap: 10px;
      margin-top: 18px;
    }
    .detail:not(.detail-list) .detail-row {
      padding: 11px 16px;
    }
    .detail:not(.detail-list) .detail-row ha-icon {
      --mdc-icon-size: 21px;
    }
    .detail:not(.detail-list) .detail-row-label {
      font-size: 1.05rem;
    }
    .detail:not(.detail-list) .detail-row-value {
      font-size: 1.1rem;
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
      background: var(--_dialog-row-background);
      border: 1px solid var(--_dialog-row-border);
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
      max-height: 80vh;
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
      background: var(--_dialog-row-background);
      border: 1px solid var(--_dialog-row-border);
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
    .hourly-list-pop,
    .daily-list-pop {
      color: var(--_secondary-color);
      font-size: 0.8rem;
      width: 32px;
      text-align: right;
      flex-shrink: 0;
    }
    /* Repère de date dans la liste des prochaines heures, dès qu'on passe
       au jour suivant — la liste n'étant plus limitée à "aujourd'hui"
       (hourly_count ne s'applique pas ici), elle peut couvrir plusieurs
       jours. */
    .hourly-list-day-marker {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: capitalize;
      margin-top: 10px;
      padding: 0 2px;
    }
    .hourly-list-day-marker:first-child {
      margin-top: 0;
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
      /* flex-start plutôt que center : l'horloge doit rester collée en
         haut, pas flotter au milieu d'un bloc lui-même centré dans le
         cercle. Le contenu est désormais assez grand pour occuper
         l'essentiel de la hauteur disponible de toute façon. */
      justify-content: flex-start;
      gap: 3px;
      /* Le contenu est un empilement vertical centré, pas un bloc plein
         cadre : contrairement à un carré inscrit, il n'a pas besoin d'une
         marge symétrique généreuse pour que ses "coins" restent dans le
         cercle (il n'a pas de coins à cet endroit). Marge horizontale
         réduite (les lignes les plus larges — tuiles Aujourd'hui/Semaine —
         sont proches du centre vertical, là où la corde du cercle est la
         plus large) ; un peu plus de marge en haut/bas où le cercle se
         resserre. */
      padding: 5% 6%;
      text-align: center;
    }
    /* flex-shrink:0 sur tous les blocs : sans ça, si le contenu (agrandi
       à la demande) dépasse d'un rien la hauteur fixe du cercle, flexbox
       écrase chaque élément proportionnellement au lieu de déborder —
       ce qui corrompait le rendu du texte (hauteur de ligne comprimée en
       dessous de sa taille de police) plutôt que de simplement déborder
       de façon visible et prévisible pendant les tests. */
    .card.round > * {
      flex-shrink: 0;
    }
    .round-clock {
      font-size: clamp(2.1rem, calc(20 * var(--_fluid-unit)), 3rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    /* Date sous l'horloge, plus grande — lecture au même niveau que
       l'horloge plutôt que noyée dans une ligne d'infos secondaires. */
    .round-date {
      font-size: clamp(1.1rem, calc(9.5 * var(--_fluid-unit)), 1.4rem);
      font-weight: 600;
      margin-top: 1px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Lune + saint, sur leur propre ligne en dessous — plus petit, icône
       collée à son libellé (et non à la date, qu'elle n'illustre pas).
       min-width:0 à chaque niveau flex imbriqué, sinon l'ellipsis du span
       interne n'a jamais l'occasion de se déclencher (un flex-item ne
       rétrécit pas sous sa largeur de contenu par défaut). */
    .round-moon-line {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, calc(7 * var(--_fluid-unit)), 1.02rem);
      font-weight: 500;
      margin-top: 1px;
      max-width: 100%;
      min-width: 0;
    }
    .round-moon-line span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .round-date-icon {
      --mdc-icon-size: clamp(13px, calc(5.2 * var(--_fluid-unit)), 17px);
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
      gap: 14px;
      cursor: pointer;
      margin: 4px 0;
      width: 100%;
      justify-content: center;
    }
    .round-current-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
      text-align: left;
    }
    .round-icon {
      width: clamp(90px, calc(39 * var(--_fluid-unit)), 126px);
      height: clamp(90px, calc(39 * var(--_fluid-unit)), 126px);
      flex-shrink: 0;
      /* Comme .current-icon en mise en page large : c'est la seule icône
         encore animée (SMIL) ici aussi, et elle porte le même filter
         drop-shadow en mode clair (cf. plus bas) — sans sa propre couche
         de composition GPU, cette combinaison avait causé un plafond de
         FPS en mise en page large, et pourrait expliquer des artefacts de
         rendu sur du matériel/pilote GPU capricieux. */
      will-change: transform;
    }
    .round-temp {
      font-size: clamp(2.6rem, calc(24 * var(--_fluid-unit)), 3.7rem);
      font-weight: 800;
      line-height: 1;
    }
    .round-condition {
      color: var(--_secondary-color);
      font-size: clamp(1.1rem, calc(9.5 * var(--_fluid-unit)), 1.35rem);
      font-weight: 500;
      margin-top: 2px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .round-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.75rem, calc(6.2 * var(--_fluid-unit)), 0.92rem);
      font-weight: 600;
      margin-top: 2px;
      white-space: nowrap;
    }
    /* Pied de page sous les deux tuiles Aujourd'hui/Semaine plutôt que
       collée à une donnée du bloc météo actuelle (point de rosée, etc.)
       sans rapport direct — une info de dernière mise à jour se lit
       naturellement en bas d'écran. */
    .round-updated {
      color: var(--_secondary-color);
      font-size: clamp(0.72rem, calc(5.8 * var(--_fluid-unit)), 0.85rem);
      margin-top: 3px;
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
      gap: 4px;
      font-size: clamp(1rem, calc(8.2 * var(--_fluid-unit)), 1.2rem);
      font-weight: 700;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .round-chip ha-icon {
      --mdc-icon-size: clamp(18px, calc(7 * var(--_fluid-unit)), 22px);
      flex-shrink: 0;
    }
    .round-launchers {
      display: flex;
      gap: 9px;
      margin-top: 6px;
    }
    .round-launcher {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 9px 13px;
      border-radius: 16px;
      background: var(--_tile-background);
      border: 1px solid var(--_tile-border);
      box-shadow: var(--_tile-shadow);
      cursor: pointer;
    }
    .round-launcher-top {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: clamp(1rem, calc(8.2 * var(--_fluid-unit)), 1.2rem);
      font-weight: 600;
      white-space: nowrap;
    }
    .round-launcher-preview {
      font-size: clamp(0.85rem, calc(7 * var(--_fluid-unit)), 1.02rem);
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
      --mdc-icon-size: clamp(19px, calc(7.4 * var(--_fluid-unit)), 23px);
      flex-shrink: 0;
    }
    .round-chevron {
      --mdc-icon-size: clamp(18px, calc(6.8 * var(--_fluid-unit)), 22px);
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
      /* 240x350 : diagonale/2 ≈ 212px, encore sous les ~220px de rayon sûr
         retenus pour la zone circulaire visible (cf. .card.round) — plus
         de place qu'avant (230x280), pensé pour que 5 jours tiennent sans
         défiler (cf. .detail-list.round-detail). */
      --mdc-dialog-min-width: 240px;
      --mdc-dialog-max-width: 240px;
    }
    .round-dialog-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .detail-list.round-detail {
      max-height: 350px;
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
customElements.define(gt, xe);
window.customCards = window.customCards || [];
window.customCards.push({
  type: gt,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
