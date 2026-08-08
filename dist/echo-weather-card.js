var ze = Object.defineProperty;
var Te = (r, e, t) => e in r ? ze(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var F = (r, e, t) => Te(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, Q = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), re = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Q && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = re.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && re.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ue = (r) => new Ae(typeof r == "string" ? r : r + "", void 0, ee), ke = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new Ae(t, r, ee);
}, Ne = (r, e) => {
  if (Q) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = H.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, ne = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ue(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Re, defineProperty: Le, getOwnPropertyDescriptor: He, getOwnPropertyNames: Oe, getOwnPropertySymbols: De, getPrototypeOf: Ie } = Object, g = globalThis, oe = g.trustedTypes, Be = oe ? oe.emptyScript : "", J = g.reactiveElementPolyfillSupport, C = (r, e) => r, K = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Be : null;
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
} }, xe = (r, e) => !Re(r, e), ae = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: xe };
var ge, be;
(ge = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (be = g.litPropertyMetadata) != null || (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ae) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Le(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: s, set: n } = (o = He(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: s, set(l) {
      const a = s == null ? void 0 : s.call(this);
      n == null || n.call(this, l), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = Ie(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, i = [...Oe(t), ...De(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(ne(s));
    } else e !== void 0 && t.push(ne(e));
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
    return Ne(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
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
    var n;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : K).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o, l;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : K;
      this._$Em = s;
      const u = c.fromAttribute(t, a.type);
      this[s] = (l = u != null ? u : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? l : u, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, n) {
    var o, l;
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (n = this[e]), i != null || (i = a.getPropertyOptions(e)), !(((o = i.hasChanged) != null ? o : xe)(n, t) || i.useDefault && i.reflect && n === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: n }, o) {
    var l, a, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = o != null ? o : t) != null ? a : this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var i, s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, l] of n) {
        const { wrapped: a } = l, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((n) => {
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
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
var ve;
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: A }), ((ve = g.reactiveElementVersions) != null ? ve : g.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, le = (r) => r, O = M.trustedTypes, ce = O ? O.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Se = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + f, Fe = `<${Ee}>`, $ = document, P = () => $.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, Je = (r) => te(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, ue = />/g, v = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, pe = /"/g, Ce = /^(?:script|style|textarea|title)$/i, je = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), p = je(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), me = /* @__PURE__ */ new WeakMap(), y = $.createTreeWalker($, 129);
function Me(r, e) {
  if (!te(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ce !== void 0 ? ce.createHTML(e) : e;
}
const Ge = (r, e) => {
  const t = r.length - 1, i = [];
  let s, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = E;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let c, u, h = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, u = o.exec(a), u !== null); ) m = o.lastIndex, o === E ? u[1] === "!--" ? o = de : u[1] !== void 0 ? o = ue : u[2] !== void 0 ? (Ce.test(u[2]) && (s = RegExp("</" + u[2], "g")), o = v) : u[3] !== void 0 && (o = v) : o === v ? u[0] === ">" ? (o = s != null ? s : E, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? v : u[3] === '"' ? pe : he) : o === pe || o === he ? o = v : o === de || o === ue ? o = E : (o = v, s = void 0);
    const _ = o === v && r[l + 1].startsWith("/>") ? " " : "";
    n += o === E ? a + Fe : h >= 0 ? (i.push(c), a.slice(0, h) + Se + a.slice(h) + f + _) : a + f + (h === -2 ? l : _);
  }
  return [Me(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, u] = Ge(e, t);
    if (this.el = T.createElement(c, i), y.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = y.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Se)) {
          const m = u[o++], _ = s.getAttribute(h).split(f), b = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: b[2], strings: _, ctor: b[1] === "." ? We : b[1] === "?" ? Ye : b[1] === "@" ? Ze : D }), s.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: n }), s.removeAttribute(h));
        if (Ce.test(s.tagName)) {
          const h = s.textContent.split(f), m = h.length - 1;
          if (m > 0) {
            s.textContent = O ? O.emptyScript : "";
            for (let _ = 0; _ < m; _++) s.append(h[_], P()), y.nextNode(), a.push({ type: 2, index: ++n });
            s.append(h[m], P());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += f.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = $.createElement("template");
    return i.innerHTML = e, i;
  }
}
function S(r, e, t = r, i) {
  var o, l, a;
  if (e === x) return e;
  let s = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const n = z(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = S(r, s._$AS(r, e.values), s, i)), e;
}
class Ve {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((c = e == null ? void 0 : e.creationScope) != null ? c : $).importNode(t, !0);
    y.currentNode = s;
    let n = y.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new U(n, n.nextSibling, this, e) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (u = new Ke(n, this, e)), this._$AV.push(u), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = y.nextNode(), o++);
    }
    return y.currentNode = $, s;
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
  constructor(e, t, i, s) {
    var n;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (n = s == null ? void 0 : s.isConnected) != null ? n : !0;
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
    e = S(this, e, t), z(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== x && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Je(e) ? this.k(e) : this._(e);
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
    var n;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = T.createElement(Me(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(t);
    else {
      const o = new Ve(s, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = me.get(e.strings);
    return t === void 0 && me.set(e.strings, t = new T(e)), t;
  }
  k(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const n of e) s === t.length ? t.push(i = new U(this.O(P()), this.O(P()), this, this.options)) : i = t[s], i._$AI(n), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = le(e).nextSibling;
      le(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = S(this, e, t, 0), o = !z(e) || e !== this._$AH && e !== x, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = S(this, l[i + a], t, a), c === x && (c = this._$AH[a]), o || (o = !z(c) || c !== this._$AH[a]), c === d ? e = d : e !== d && (e += (c != null ? c : "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class We extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class Ye extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Ze extends D {
  constructor(e, t, i, s, n) {
    super(e, t, i, s, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = S(this, e, t, 0)) != null ? o : d) === x) return;
    const i = this._$AH, s = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ke {
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
const G = M.litHtmlPolyfillSupport;
var ye;
G == null || G(T, U), ((ye = M.litHtmlVersions) != null ? ye : M.litHtmlVersions = []).push("3.3.3");
const Xe = (r, e, t) => {
  var n, o;
  const i = (n = t == null ? void 0 : t.renderBefore) != null ? n : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = s = new U(e.insertBefore(P(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class q extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Xe(t, this.renderRoot, this.renderOptions);
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
    return x;
  }
}
var we;
q._$litElement$ = !0, q.finalized = !0, (we = w.litElementHydrateSupport) == null || we.call(w, { LitElement: q });
const V = w.litElementPolyfillSupport;
V == null || V({ LitElement: q });
var $e;
(($e = w.litElementVersions) != null ? $e : w.litElementVersions = []).push("4.2.2");
const qe = "echo-weather-card", Qe = "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill", et = 1, tt = 2, _e = {
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
}, it = {
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
function W(r, e) {
  return r === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : r === "sunny" && e ? "clear-night" : it[r] || "not-available";
}
function Y(r, e) {
  return `${((e == null ? void 0 : e.base_url) || Qe).replace(/\/$/, "")}/${r}.svg`;
}
const R = /* @__PURE__ */ new Map();
async function st(r) {
  const t = await (await fetch(r)).text(), i = new DOMParser().parseFromString(t, "image/svg+xml");
  i.querySelectorAll("animate, animateTransform, animateMotion, animateColor, set").forEach((n) => n.remove());
  const s = new XMLSerializer().serializeToString(i.documentElement);
  return URL.createObjectURL(new Blob([s], { type: "image/svg+xml" }));
}
function rt(r, e) {
  const t = R.get(r);
  if (typeof t == "string") return t;
  if (!t) {
    const i = st(r).catch(() => r).then((s) => (R.set(r, s), s));
    R.set(r, i);
  }
  return Promise.resolve(R.get(r)).then(() => e == null ? void 0 : e()), null;
}
function nt(r, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    hour12: t === "12"
  }).format(r).replace(/\s/g, "");
}
function L(r, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(r).replace(/\s/g, "");
}
function ot(r, e) {
  return new Intl.DateTimeFormat(e, { weekday: "short" }).format(r);
}
function at(r, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(r);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Z(r, e) {
  return r.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
function lt(r) {
  const e = Number(r);
  return Number.isFinite(e) ? e < 3 ? "Faible" : e < 6 ? "Modéré" : e < 8 ? "Élevé" : e < 11 ? "Très élevé" : "Extrême" : null;
}
function fe(r, e) {
  return (Number(r.attributes.supported_features) & e) !== 0;
}
async function ct(r, e, t) {
  var i, s;
  try {
    const n = await r.callWS({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      service_data: { type: t },
      target: { entity_id: e },
      return_response: !0
    });
    return ((s = (i = n == null ? void 0 : n.response) == null ? void 0 : i[e]) == null ? void 0 : s.forecast) || [];
  } catch (n) {
    return console.warn(
      `[echo-weather-card] échec weather.get_forecasts (${t})`,
      n
    ), [];
  }
}
function dt(r, e, t) {
  const i = r.states[e];
  if (!i) return () => {
  };
  const s = [];
  if (fe(i, et) && s.push("daily"), fe(i, tt) && s.push("hourly"), s.length === 0)
    return console.warn(
      `[echo-weather-card] ${e} ne supporte ni forecast daily ni hourly`
    ), () => {
    };
  const n = [];
  let o = !1;
  return s.forEach((l) => {
    r.connection.subscribeMessage(
      (a) => t(l, a.forecast || []),
      { type: "weather/subscribe_forecast", forecast_type: l, entity_id: e }
    ).then((a) => {
      o ? a() : n.push(a);
    }).catch(async (a) => {
      console.warn(
        `[echo-weather-card] souscription forecast "${l}" indisponible, repli sur get_forecasts`,
        a
      );
      const c = await ct(r, e, l);
      o || t(l, c);
    });
  }), () => {
    o = !0, n.forEach((l) => l());
  };
}
const ut = `
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
`, ht = new Map(
  ut.trim().split(`
`).map((r) => {
    const e = r.indexOf(":");
    return [r.slice(0, e), r.slice(e + 1)];
  })
);
function pt(r) {
  const e = String(r.getMonth() + 1).padStart(2, "0"), t = String(r.getDate()).padStart(2, "0");
  return ht.get(`${e}-${t}`) || null;
}
const mt = {
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
function _t(r) {
  return mt[r] || null;
}
class X extends q {
  setConfig(e) {
    if (!(e != null && e.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    this._config = {
      ..._e,
      ...e,
      icons: { ..._e.icons, ...e.icons || {} }
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
    var s, n;
    const t = (n = this._hass) == null ? void 0 : n.states[(s = this._config) == null ? void 0 : s.entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.entity];
    i && this._subscribedEntity !== this._config.entity && this._subscribeToForecasts(), t !== i && this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _subscribeToForecasts() {
    var e;
    (e = this._unsubscribeForecasts) == null || e.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = dt(
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
    return rt(e, () => this.requestUpdate()) || e;
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
    var n, o;
    if (!this._config || !this._hass) return d;
    const e = this._hass.states[this._config.entity];
    if (!e)
      return p`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    this.classList.toggle("light", this._isLightMode());
    const t = this._config.language || ((n = this._hass.locale) == null ? void 0 : n.language) || "en", i = this._config.time_format || ((o = this._hass.locale) == null ? void 0 : o.time_format) || "24", s = this._config.background != null ? `background:${this._config.background}` : "";
    return p`
      <div class="card" style=${s}>
        ${this._config.title ? p`<div class="title">${this._config.title}</div>` : d}
        ${this._config.show_current ? this._renderCurrent(e, t, i) : d}
        ${this._config.show_hourly ? this._renderHourly(t, i) : d}
        ${this._config.show_daily ? this._renderDaily(t) : d}
        ${this._renderBottomBand(e, t, i)}
      </div>
    `;
  }
  _renderCurrent(e, t, i) {
    const s = W(e.state, this._isNight()), n = Y(s, this._config.icons), o = Z(this._hass, e.state), l = e.attributes.temperature, a = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, u = e.attributes.humidity, h = e.last_updated ? new Date(e.last_updated) : null, m = [];
    this._config.show_feels_like && c != null && m.push(`Ressenti ${Math.round(c)}°`), this._config.show_last_updated && h && m.push(`Maj à ${L(h, t, i)}`);
    const _ = this._config.uv_entity && this._hass.states[this._config.uv_entity], b = _ && !["unknown", "unavailable"].includes(_.state), ie = this._config.show_humidity && u != null, Pe = this._config.show_clock || this._config.show_date, I = /* @__PURE__ */ new Date(), se = this._config.show_date ? pt(I) : null, B = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], k = B && !["unknown", "unavailable"].includes(B.state) ? _t(B.state) : null, N = [];
    return k && N.push(k.label), se && N.push(se), p`
      <div class="current">
        <div class="current-icon-wrap">
          <img class="current-icon" src=${n} alt=${o} />
        </div>
        <div class="current-info">
          <div class="current-main">
            <div class="current-temp">${Math.round(l)}${a}</div>
            <div class="current-condition">${o}</div>
            ${m.length ? p`<div class="current-meta">
                  ${m.join(" · ")}
                </div>` : d}
          </div>
          ${b || ie ? p`
                <div class="uv-group">
                  ${b ? this._renderIndicators(_) : d}
                  ${ie ? p`<div class="humidity-line">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(u)}%</span>
                      </div>` : d}
                </div>
              ` : d}
        </div>
        ${Pe ? p`
              <div class="current-side">
                <div class="clock-group">
                  ${this._config.show_clock ? p`<div class="clock">
                        ${L(I, t, i)}
                      </div>` : d}
                  ${this._config.show_date ? p`<div class="date-line">
                        ${at(I, t)}
                      </div>` : d}
                  ${N.length ? p`<div class="moon-line">
                        ${k ? p`<ha-icon
                              class="moon-icon"
                              icon=${k.icon}
                            ></ha-icon>` : d}
                        <span>${N.join(" · ")}</span>
                      </div>` : d}
                </div>
              </div>
            ` : d}
      </div>
    `;
  }
  // Indice UV, à droite de la température — tuile à deux lignes (libellé
  // au-dessus, valeur + catégorie qualitative en dessous). L'UV a une
  // échelle universelle (OMS) donc la catégorie (Faible/Modéré/Élevé/...)
  // est fiable à afficher automatiquement, contrairement à la qualité de
  // l'air (mise de côté pour le moment : son échelle dépend entièrement
  // de l'entité choisie par l'utilisateur, pas de seuils génériques
  // fiables sans plus d'info — cf. air_quality_entity, toujours en
  // config mais non affiché ici pour l'instant). L'appelant a déjà
  // vérifié que uvObj est utilisable (évite de refaire le lookup ici).
  _renderIndicators(e) {
    const t = lt(e.state);
    return p`
      <div class="indicator-box indicator-uv">
        <div class="indicator-label">Indice UV</div>
        <div class="indicator-row">
          <span class="indicator-value">${e.state}</span>
          ${t ? p`<span class="indicator-category">${t}</span>` : d}
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
    const s = [], n = e.attributes.wind_speed;
    if (this._config.show_wind && n != null) {
      const c = e.attributes.wind_speed_unit || "";
      s.push({
        type: "wind",
        icon: "mdi:weather-windy",
        label: "Vent",
        value: `${Math.round(n)} ${c}`.trim()
      });
    }
    const o = this._config.dew_point_entity && this._hass.states[this._config.dew_point_entity], l = o ? Number(o.state) : e.attributes.dew_point;
    if (this._config.show_dew_point && l != null && Number.isFinite(l)) {
      const c = o ? o.attributes.unit_of_measurement || e.attributes.temperature_unit || "°C" : e.attributes.temperature_unit || "°C";
      s.push({
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
      const c = a.attributes.next_rising ? new Date(a.attributes.next_rising) : null, u = a.attributes.next_setting ? new Date(a.attributes.next_setting) : null;
      c && s.push({
        type: "sunrise",
        icon: "mdi:weather-sunset-up",
        label: "Lever",
        value: L(c, t, i)
      }), u && s.push({
        type: "sunset",
        icon: "mdi:weather-sunset-down",
        label: "Coucher",
        value: L(u, t, i)
      });
    }
    return s.length ? p`
      <div class="bottom-band">
        ${s.map(
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
    const i = Date.now(), s = (this._hourly || []).filter((n) => new Date(n.datetime).getTime() >= i).slice(0, this._config.hourly_count);
    return s.length ? p`
      <div class="hourly">
        ${s.map((n) => {
      const o = new Date(n.datetime), l = W(
        n.condition,
        this._isNight(o)
      ), a = Y(l, this._config.icons), c = Z(this._hass, n.condition), u = n.precipitation_probability;
      return p`
            <div class="hourly-item">
              <div class="hourly-time">
                ${nt(o, e, t)}
              </div>
              <img
                class="hourly-icon"
                src=${this._staticIcon(a)}
                alt=${c}
              />
              <div class="hourly-temp">
                ${Math.round(n.temperature)}°
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
      const s = new Date(i.datetime), n = W(i.condition, !1), o = Y(n, this._config.icons), l = Z(this._hass, i.condition);
      return p`
            <div class="daily-item">
              <div class="daily-day">${ot(s, e)}</div>
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
    ` : d;
  }
}
F(X, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 }
}), F(X, "styles", ke`
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
    .current-icon-wrap {
      position: relative;
      width: var(--_current-icon-size);
      height: var(--_current-icon-size);
      flex-shrink: 0;
    }
    .current-icon {
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
    }
    /* Halo de lisibilité en mode clair pour l'icône actuelle : un dégradé
       radial statique derrière l'icône plutôt qu'un filter drop-shadow
       (cf. commentaire plus bas sur .hourly-icon/.daily-icon) — un fond
       qui ne change jamais est peint une seule fois par le compositeur,
       sans recalcul à chaque frame de l'icône animée par-dessus. */
    :host(.light) .current-icon-wrap::before {
      content: "";
      position: absolute;
      inset: 4%;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        rgba(10, 20, 30, 0.32) 0%,
        rgba(10, 20, 30, 0.16) 55%,
        rgba(10, 20, 30, 0) 78%
      );
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
       traits clairs sans plaque/cercle disgracieux derrière.
       Volontairement PAS appliqué à .current-icon : c'est la seule icône
       encore animée (SMIL), et un drop-shadow sur un contenu qui change à
       chaque frame doit être recalculé à chaque frame (contrairement à un
       contenu statique, mis en cache après le premier paint) — sur le GPU
       modeste de l'Echo Show 5, ça suffisait à plafonner l'animation à
       ~10fps. Les icônes horaires/quotidiennes sont figées (cf. icons.js)
       donc le filtre n'y coûte plus qu'un calcul unique. */
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
  `);
customElements.define(qe, X);
window.customCards = window.customCards || [];
window.customCards.push({
  type: qe,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
