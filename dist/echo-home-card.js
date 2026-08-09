var be = Object.defineProperty;
var we = (o, e, t) => e in o ? be(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var R = (o, e, t) => we(o, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, V = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = Symbol(), J = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (V && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = J.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && J.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (o) => new pe(typeof o == "string" ? o : o + "", void 0, B), ke = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new pe(t, o, B);
}, xe = (o, e) => {
  if (V) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = N.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, o.appendChild(s);
  }
}, G = V ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ae(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ee, defineProperty: Se, getOwnPropertyDescriptor: Ce, getOwnPropertyNames: ze, getOwnPropertySymbols: Te, getPrototypeOf: Pe } = Object, g = globalThis, X = g.trustedTypes, Ue = X ? X.emptyScript : "", D = g.reactiveElementPolyfillSupport, C = (o, e) => o, F = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Ue : null;
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
} }, _e = (o, e) => !Ee(o, e), Z = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: _e };
var ae, le;
(ae = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (le = g.litPropertyMetadata) != null || (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Z) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Se(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    var r;
    const { get: i, set: n } = (r = Ce(this.prototype, e)) != null ? r : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: i, set(l) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, l), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : Z;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = Pe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, s = [...ze(t), ...Te(t)];
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
      for (const i of s) t.unshift(G(i));
    } else e !== void 0 && t.push(G(e));
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
    return xe(e, this.constructor.elementStyles), e;
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
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : F).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, r, l;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : F;
      this._$Em = i;
      const h = c.fromAttribute(t, a.type);
      this[i] = (l = h != null ? h : (r = this._$Ej) == null ? void 0 : r.get(i)) != null ? l : h, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    var r, l;
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[e]), s != null || (s = a.getPropertyOptions(e)), !(((r = s.hasChanged) != null ? r : _e)(n, t) || s.useDefault && s.reflect && n === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, r) {
    var l, a, c;
    s && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = r != null ? r : t) != null ? a : this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, l] of this._$Ep) this[r] = l;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, l] of n) {
        const { wrapped: a } = l, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((n) => {
        var r;
        return (r = n.hostUpdate) == null ? void 0 : r.call(n);
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
var ce;
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[C("elementProperties")] = /* @__PURE__ */ new Map(), k[C("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: k }), ((ce = g.reactiveElementVersions) != null ? ce : g.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, Y = (o) => o, H = z.trustedTypes, Q = H ? H.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, me = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + f, Oe = `<${fe}>`, w = document, P = () => w.createComment(""), U = (o) => o === null || typeof o != "object" && typeof o != "function", K = Array.isArray, qe = (o) => K(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, te = />/g, v = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ie = /"/g, ge = /^(?:script|style|textarea|title)$/i, $e = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), A = $e(1), Ne = $e(2), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), oe = /* @__PURE__ */ new WeakMap(), y = w.createTreeWalker(w, 129);
function ve(o, e) {
  if (!K(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Q !== void 0 ? Q.createHTML(e) : e;
}
const He = (o, e) => {
  const t = o.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = S;
  for (let l = 0; l < t; l++) {
    const a = o[l];
    let c, h, u = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, h = r.exec(a), h !== null); ) p = r.lastIndex, r === S ? h[1] === "!--" ? r = ee : h[1] !== void 0 ? r = te : h[2] !== void 0 ? (ge.test(h[2]) && (i = RegExp("</" + h[2], "g")), r = v) : h[3] !== void 0 && (r = v) : r === v ? h[0] === ">" ? (r = i != null ? i : S, u = -1) : h[1] === void 0 ? u = -2 : (u = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? v : h[3] === '"' ? ie : se) : r === ie || r === se ? r = v : r === ee || r === te ? r = S : (r = v, i = void 0);
    const _ = r === v && o[l + 1].startsWith("/>") ? " " : "";
    n += r === S ? a + Oe : u >= 0 ? (s.push(c), a.slice(0, u) + me + a.slice(u) + f + _) : a + f + (u === -2 ? l : _);
  }
  return [ve(o, n + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const l = e.length - 1, a = this.parts, [c, h] = He(e, t);
    if (this.el = O.createElement(c, s), y.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = y.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(me)) {
          const p = h[r++], _ = i.getAttribute(u).split(f), $ = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: $[2], strings: _, ctor: $[1] === "." ? Re : $[1] === "?" ? De : $[1] === "@" ? je : M }), i.removeAttribute(u);
        } else u.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(u));
        if (ge.test(i.tagName)) {
          const u = i.textContent.split(f), p = u.length - 1;
          if (p > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let _ = 0; _ < p; _++) i.append(u[_], P()), y.nextNode(), a.push({ type: 2, index: ++n });
            i.append(u[p], P());
          }
        }
      } else if (i.nodeType === 8) if (i.data === fe) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(f, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += f.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = w.createElement("template");
    return s.innerHTML = e, s;
  }
}
function E(o, e, t = o, s) {
  var r, l, a;
  if (e === x) return e;
  let i = s !== void 0 ? (r = t._$Co) == null ? void 0 : r[s] : t._$Cl;
  const n = U(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, t, s)), s !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[s] = i : t._$Cl = i), i !== void 0 && (e = E(o, i._$AS(o, e.values), i, s)), e;
}
class Me {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((c = e == null ? void 0 : e.creationScope) != null ? c : w).importNode(t, !0);
    y.currentNode = i;
    let n = y.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new q(n, n.nextSibling, this, e) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (h = new Ie(n, this, e)), this._$AV.push(h), a = s[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = y.nextNode(), r++);
    }
    return y.currentNode = w, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class q {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, s, i) {
    var n;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (n = i == null ? void 0 : i.isConnected) != null ? n : !0;
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
    e = E(this, e, t), U(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== x && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = O.createElement(ve(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const r = new Me(i, this), l = r.u(this.options);
      r.p(t), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = oe.get(e.strings);
    return t === void 0 && oe.set(e.strings, t = new O(e)), t;
  }
  k(e) {
    K(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new q(this.O(P()), this.O(P()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Y(e).nextSibling;
      Y(e).remove(), e = i;
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
  constructor(e, t, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(e, t = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = E(this, e, t, 0), r = !U(e) || e !== this._$AH && e !== x, r && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = E(this, l[s + a], t, a), c === x && (c = this._$AH[a]), r || (r = !U(c) || c !== this._$AH[a]), c === d ? e = d : e !== d && (e += (c != null ? c : "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Re extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class De extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class je extends M {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var r;
    if ((e = (r = E(this, e, t, 0)) != null ? r : d) === x) return;
    const s = this._$AH, i = e === d && s !== d || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (t = this.options) == null ? void 0 : t.host) != null ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ie {
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
const I = z.litHtmlPolyfillSupport;
var he;
I == null || I(O, q), ((he = z.litHtmlVersions) != null ? he : z.litHtmlVersions = []).push("3.3.3");
const Le = (o, e, t) => {
  var n, r;
  const s = (n = t == null ? void 0 : t.renderBefore) != null ? n : e;
  let i = s._$litPart$;
  if (i === void 0) {
    const l = (r = t == null ? void 0 : t.renderBefore) != null ? r : null;
    s._$litPart$ = i = new q(e.insertBefore(P(), l), l, void 0, t != null ? t : {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class T extends k {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Le(t, this.renderRoot, this.renderOptions);
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
var ue;
T._$litElement$ = !0, T.finalized = !0, (ue = b.litElementHydrateSupport) == null || ue.call(b, { LitElement: T });
const L = b.litElementPolyfillSupport;
L == null || L({ LitElement: T });
var de;
((de = b.litElementVersions) != null ? de : b.litElementVersions = []).push("4.2.2");
const ye = "echo-home-card", Fe = "https://cdn.jsdelivr.net/npm/@meteocons/svg", m = {
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
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
}, We = {
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
function Ve(o, e) {
  return o === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : o === "sunny" && e ? "clear-night" : We[o] || "not-available";
}
function Be(o, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${o}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${Fe}/${t}/${o}.svg`;
}
function re(o, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(o).replace(/\s/g, "");
}
function Ke(o, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(o);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Je(o, e) {
  return o.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const ne = "echo-home-card-clock-face";
class W extends T {
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ...m,
      ...e,
      icons: { ...m.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {}), this._clockFace === void 0 && (this._clockFace = this._initClockFace());
  }
  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const e = localStorage.getItem(ne);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(ne, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const s = (i, n) => console.warn(
      `[echo-home-card] "${i}" invalide (${JSON.stringify(t[i])}), valeur par défaut utilisée (${JSON.stringify(n)})`
    );
    return e.layout !== null && e.layout !== "round" && (s("layout", m.layout), e.layout = m.layout), ["digital", "analog"].includes(e.clock_face) || (s("clock_face", m.clock_face), e.clock_face = m.clock_face), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (s("zoom", m.zoom), e.zoom = m.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
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
    var r, l, a, c;
    const t = (l = this._hass) == null ? void 0 : l.states[(r = this._config) == null ? void 0 : r.satellite_entity], s = (c = this._hass) == null ? void 0 : c.states[(a = this._config) == null ? void 0 : a.weather_entity];
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
    var _, $;
    if (!this._config || !this._hass) return d;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, s = this._isNightMode(t);
    this.classList.toggle("night", s);
    const i = e.language || ((_ = this._hass.locale) == null ? void 0 : _.language) || "en", n = e.time_format || (($ = this._hass.locale) == null ? void 0 : $.time_format) || "24", r = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, a = e.show_weather && !s && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, c = this._backgroundValue(t, s), h = this._cardStyle(c), u = e.layout === "round", p = u && this._clockFace === "analog";
    return A`
      <div
        class="card ${u ? "round" : ""} ${p ? "analog" : ""}"
        style=${h}
      >
        <div class="shader"></div>
        ${a ? this._renderWeather(l) : d}
        <div class="clockgroup">
          ${e.show_clock ? p ? this._renderAnalogClock(r, i, n) : A`<div class="clock">${re(r, i, n)}</div>` : d}
          ${e.show_date && !s ? A`<div class="date">${Ke(r, i)}</div>` : d}
        </div>
        ${u && !s ? this._renderClockToggle(p) : d}
      </div>
    `;
  }
  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size.
  //
  // Tout est construit avec le tag `svg` de Lit (pas `html`), y compris
  // les graduations générées en boucle : un sous-template `html` séparé
  // pour un élément SVG (ex: chaque <line> de graduation dans son propre
  // `html\`...\`` avant d'être inséré dans le <svg> englobant) atterrit
  // dans le mauvais espace de noms (xhtml, pas svg) et ne s'affiche pas
  // — piège classique de Lit avec du SVG composé/généré dynamiquement,
  // repéré ici en inspectant `line.namespaceURI` sur le rendu réel.
  _renderAnalogClock(e, t, s) {
    const i = e.getHours() % 12, n = e.getMinutes(), r = i * 30 + n * 0.5, l = n * 6, a = [];
    for (let c = 0; c < 12; c++) {
      const h = c % 3 === 0;
      a.push(Ne`
        <line
          class="tick"
          x1="50"
          y1=${h ? 6 : 8}
          x2="50"
          y2=${h ? 14 : 11}
          stroke-width=${h ? 2.5 : 1.5}
          transform="rotate(${c * 30} 50 50)"
        />
      `);
    }
    return A`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${re(e, t, s)}
      >
        <g class="ticks">${a}</g>
        <line
          class="hand hand-hour"
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          transform="rotate(${r} 50 50)"
        />
        <line
          class="hand hand-minute"
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          transform="rotate(${l} 50 50)"
        />
        <circle class="hand-center" cx="50" cy="50" r="3" />
      </svg>
    `;
  }
  // Petit bouton discret (mode round uniquement, masqué la nuit comme le
  // reste — pas de lumière/info superflue sur un écran de chevet) pour
  // basculer digital ↔ analogique. L'icône affichée est celle du cadran
  // vers lequel on bascule (convention usuelle pour un bouton toggle),
  // pas celle du cadran actuel.
  _renderClockToggle(e) {
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", s = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return A`
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
    const t = Ve(e.state, this._isDarkOutside()), s = Be(t, this._config.icons), i = Number(e.attributes.temperature).toFixed(1), n = e.attributes.temperature_unit || "°C", r = Je(this._hass, e.state), l = this._weatherClickable();
    return A`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : d}
        tabindex=${l ? "0" : d}
        aria-label="${r}, ${i}${n}"
        @click=${l ? () => this._navigateToWeather() : d}
        @keydown=${l ? (a) => this._onWeatherKeydown(a) : d}
      >
        <img class="weather-icon" src=${s} alt="" />
        <span class="weather-temp">${i}${n}</span>
      </div>
    `;
  }
}
R(W, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), R(W, "styles", ke`
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

    /* Cadran analogique (mode round uniquement) : rappelle l'horloge
       ronde de l'Echo Spot sous Alexa, avant LineageOS/View Assist.
       --_analog-size est un diamètre, pas une taille de police —
       calibré indépendamment de --_clock-size (cf. .card.round
       ci-dessous), donc .card.round.analog .date a sa propre position
       plutôt que de réutiliser le calcul basé sur --_clock-size. */
    .analog-clock {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--_analog-size);
      height: var(--_analog-size);
      color: var(--_text-color);
      transition: color 0.4s ease, opacity 0.4s ease;
    }

    :host(.night) .analog-clock {
      color: var(--_night-color);
      opacity: var(--_night-opacity);
    }

    .analog-clock .tick {
      stroke: currentColor;
      opacity: 0.7;
    }

    .analog-clock .hand {
      stroke: currentColor;
      stroke-linecap: round;
    }

    .analog-clock .hand-hour {
      stroke-width: 5;
    }

    .analog-clock .hand-minute {
      stroke-width: 3.5;
    }

    .analog-clock .hand-center {
      fill: currentColor;
    }

    .card.round.analog .date {
      top: calc(50% + var(--_analog-size) / 2 + clamp(12px, 4vmin, 24px));
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
      --_analog-size: clamp(120px, 50vmin, 240px);
    }
  `);
customElements.define(ye, W);
window.customCards = window.customCards || [];
window.customCards.push({
  type: ye,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
