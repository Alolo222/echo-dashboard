var ze = Object.defineProperty;
var Te = (s, e, t) => e in s ? ze(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var I = (s, e, t) => Te(s, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, X = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), ne = /* @__PURE__ */ new WeakMap();
let $e = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ue = (s) => new $e(typeof s == "string" ? s : s + "", void 0, Q), Ne = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new $e(t, s, Q);
}, qe = (s, e) => {
  if (X) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = H.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, s.appendChild(i);
  }
}, se = X ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ue(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Re, defineProperty: ke, getOwnPropertyDescriptor: He, getOwnPropertyNames: Oe, getOwnPropertySymbols: De, getPrototypeOf: Le } = Object, g = globalThis, re = g.trustedTypes, Be = re ? re.emptyScript : "", F = g.reactiveElementPolyfillSupport, C = (s, e) => s, Z = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Be : null;
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
} }, Ae = (s, e) => !Re(s, e), oe = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: Ae };
var fe, ge;
(fe = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (ge = g.litPropertyMetadata) != null || (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = oe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && ke(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: n, set: r } = (o = He(this.prototype, e)) != null ? o : { get() {
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
    return (t = this.elementProperties.get(e)) != null ? t : oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = Le(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, i = [...Oe(t), ...De(t)];
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
      for (const n of i) t.unshift(se(n));
    } else e !== void 0 && t.push(se(e));
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
    return qe(e, this.constructor.elementStyles), e;
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
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Z).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, o, l;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Z;
      this._$Em = n;
      const d = c.fromAttribute(t, a.type);
      this[n] = (l = d != null ? d : (o = this._$Ej) == null ? void 0 : o.get(n)) != null ? l : d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, r) {
    var o, l;
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[e]), i != null || (i = a.getPropertyOptions(e)), !(((o = i.hasChanged) != null ? o : Ae)(r, t) || i.useDefault && i.reflect && r === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
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
var ye;
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: A }), ((ye = g.reactiveElementVersions) != null ? ye : g.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ae = (s) => s, O = M.trustedTypes, le = O ? O.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, xe = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + f, Ie = `<${Ee}>`, $ = document, z = () => $.createComment(""), T = (s) => s === null || typeof s != "object" && typeof s != "function", ee = Array.isArray, Fe = (s) => ee(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, he = />/g, v = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ue = /"/g, Se = /^(?:script|style|textarea|title)$/i, Je = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), p = Je(1), x = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), b = $.createTreeWalker($, 129);
function Ce(s, e) {
  if (!ee(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(e) : e;
}
const Ge = (s, e) => {
  const t = s.length - 1, i = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = S;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, d, u = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, d = o.exec(a), d !== null); ) m = o.lastIndex, o === S ? d[1] === "!--" ? o = ce : d[1] !== void 0 ? o = he : d[2] !== void 0 ? (Se.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = v) : d[3] !== void 0 && (o = v) : o === v ? d[0] === ">" ? (o = n != null ? n : S, u = -1) : d[1] === void 0 ? u = -2 : (u = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? v : d[3] === '"' ? ue : de) : o === ue || o === de ? o = v : o === ce || o === he ? o = S : (o = v, n = void 0);
    const _ = o === v && s[l + 1].startsWith("/>") ? " " : "";
    r += o === S ? a + Ie : u >= 0 ? (i.push(c), a.slice(0, u) + xe + a.slice(u) + f + _) : a + f + (u === -2 ? l : _);
  }
  return [Ce(s, r + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, d] = Ge(e, t);
    if (this.el = U.createElement(c, i), b.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = b.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(xe)) {
          const m = d[o++], _ = n.getAttribute(u).split(f), y = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: y[2], strings: _, ctor: y[1] === "." ? Ve : y[1] === "?" ? We : y[1] === "@" ? Ye : D }), n.removeAttribute(u);
        } else u.startsWith(f) && (a.push({ type: 6, index: r }), n.removeAttribute(u));
        if (Se.test(n.tagName)) {
          const u = n.textContent.split(f), m = u.length - 1;
          if (m > 0) {
            n.textContent = O ? O.emptyScript : "";
            for (let _ = 0; _ < m; _++) n.append(u[_], z()), b.nextNode(), a.push({ type: 2, index: ++r });
            n.append(u[m], z());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ee) a.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(f, u + 1)) !== -1; ) a.push({ type: 7, index: r }), u += f.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = $.createElement("template");
    return i.innerHTML = e, i;
  }
}
function E(s, e, t = s, i) {
  var o, l, a;
  if (e === x) return e;
  let n = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const r = T(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = n : t._$Cl = n), n !== void 0 && (e = E(s, n._$AS(s, e.values), n, i)), e;
}
class je {
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
    b.currentNode = n;
    let r = b.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new N(r, r.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (d = new Ze(r, this, e)), this._$AV.push(d), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = b.nextNode(), o++);
    }
    return b.currentNode = $, n;
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
    e = E(this, e, t), T(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== x && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && T(this._$AH) ? this._$AA.nextSibling.data = e : this.T($.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = U.createElement(Ce(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(t);
    else {
      const o = new je(n, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = pe.get(e.strings);
    return t === void 0 && pe.set(e.strings, t = new U(e)), t;
  }
  k(e) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const r of e) n === t.length ? t.push(i = new N(this.O(z()), this.O(z()), this, this.options)) : i = t[n], i._$AI(r), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = ae(e).nextSibling;
      ae(e).remove(), e = n;
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
  constructor(e, t, i, n, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = E(this, e, t, 0), o = !T(e) || e !== this._$AH && e !== x, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = r[0], a = 0; a < r.length - 1; a++) c = E(this, l[i + a], t, a), c === x && (c = this._$AH[a]), o || (o = !T(c) || c !== this._$AH[a]), c === h ? e = h : e !== h && (e += (c != null ? c : "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Ve extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class We extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Ye extends D {
  constructor(e, t, i, n, r) {
    super(e, t, i, n, r), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = E(this, e, t, 0)) != null ? o : h) === x) return;
    const i = this._$AH, n = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== h && (i === h || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ze {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    E(this, e);
  }
}
const G = M.litHtmlPolyfillSupport;
var ve;
G == null || G(U, N), ((ve = M.litHtmlVersions) != null ? ve : M.litHtmlVersions = []).push("3.3.3");
const Ke = (s, e, t) => {
  var r, o;
  const i = (r = t == null ? void 0 : t.renderBefore) != null ? r : e;
  let n = i._$litPart$;
  if (n === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = n = new N(e.insertBefore(z(), l), l, void 0, t != null ? t : {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class P extends A {
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
    return x;
  }
}
var be;
P._$litElement$ = !0, P.finalized = !0, (be = w.litElementHydrateSupport) == null || be.call(w, { LitElement: P });
const j = w.litElementPolyfillSupport;
j == null || j({ LitElement: P });
var we;
((we = w.litElementVersions) != null ? we : w.litElementVersions = []).push("4.2.2");
const Me = "echo-weather-card", Xe = "https://cdn.jsdelivr.net/npm/@meteocons/svg/fill", Qe = 1, et = 2, me = {
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
  background: "transparent"
}, tt = {
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
function V(s, e) {
  return s === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : s === "sunny" && e ? "clear-night" : tt[s] || "not-available";
}
function W(s, e) {
  return `${((e == null ? void 0 : e.base_url) || Xe).replace(/\/$/, "")}/${s}.svg`;
}
function it(s, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    hour12: t === "12"
  }).format(s).replace(/\s/g, "");
}
function k(s, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(s).replace(/\s/g, "");
}
function nt(s, e) {
  return new Intl.DateTimeFormat(e, { weekday: "short" }).format(s);
}
function st(s, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Y(s, e) {
  return s.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
function rt(s) {
  const e = Number(s);
  return Number.isFinite(e) ? e < 3 ? "Faible" : e < 6 ? "Modéré" : e < 8 ? "Élevé" : e < 11 ? "Très élevé" : "Extrême" : null;
}
function _e(s, e) {
  return (Number(s.attributes.supported_features) & e) !== 0;
}
async function ot(s, e, t) {
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
function at(s, e, t) {
  const i = s.states[e];
  if (!i) return () => {
  };
  const n = [];
  if (_e(i, Qe) && n.push("daily"), _e(i, et) && n.push("hourly"), n.length === 0)
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
      const c = await ot(s, e, l);
      o || t(l, c);
    });
  }), () => {
    o = !0, r.forEach((l) => l());
  };
}
const lt = `
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
`, ct = new Map(
  lt.trim().split(`
`).map((s) => {
    const e = s.indexOf(":");
    return [s.slice(0, e), s.slice(e + 1)];
  })
);
function ht(s) {
  const e = String(s.getMonth() + 1).padStart(2, "0"), t = String(s.getDate()).padStart(2, "0");
  return ct.get(`${e}-${t}`) || null;
}
const dt = {
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
function ut(s) {
  return dt[s] || null;
}
class K extends P {
  setConfig(e) {
    if (!(e != null && e.entity))
      throw new Error("echo-weather-card: 'entity' est requis");
    this._config = {
      ...me,
      ...e,
      icons: { ...me.icons, ...e.icons || {} }
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
    (e = this._unsubscribeForecasts) == null || e.call(this), this._subscribedEntity = this._config.entity, this._hourly = void 0, this._daily = void 0, this._unsubscribeForecasts = at(
      this._hass,
      this._config.entity,
      (t, i) => {
        t === "hourly" && (this._hourly = i), t === "daily" && (this._daily = i);
      }
    );
  }
  _isNight(e) {
    var i;
    if (!e)
      return ((i = this._hass.states["sun.sun"]) == null ? void 0 : i.state) === "below_horizon";
    const t = e.getHours();
    return t < 7 || t >= 21;
  }
  render() {
    var n, r;
    if (!this._config || !this._hass) return h;
    const e = this._hass.states[this._config.entity];
    if (!e)
      return p`<div class="error">
        Entité ${this._config.entity} introuvable
      </div>`;
    const t = this._config.language || ((n = this._hass.locale) == null ? void 0 : n.language) || "en", i = this._config.time_format || ((r = this._hass.locale) == null ? void 0 : r.time_format) || "24";
    return p`
      <div class="card" style="background:${this._config.background}">
        ${this._config.title ? p`<div class="title">${this._config.title}</div>` : h}
        ${this._config.show_current ? this._renderCurrent(e, t, i) : h}
        ${this._config.show_hourly ? this._renderHourly(t, i) : h}
        ${this._config.show_daily ? this._renderDaily(t) : h}
        ${this._renderBottomBand(e, t, i)}
      </div>
    `;
  }
  _renderCurrent(e, t, i) {
    const n = V(e.state, this._isNight()), r = W(n, this._config.icons), o = Y(this._hass, e.state), l = e.attributes.temperature, a = e.attributes.temperature_unit || "°C", c = e.attributes.apparent_temperature, d = e.attributes.humidity, u = e.last_updated ? new Date(e.last_updated) : null, m = [];
    this._config.show_feels_like && c != null && m.push(`Ressenti ${Math.round(c)}°`), this._config.show_last_updated && u && m.push(`Maj à ${k(u, t, i)}`);
    const _ = this._config.uv_entity && this._hass.states[this._config.uv_entity], y = _ && !["unknown", "unavailable"].includes(_.state), te = this._config.show_humidity && d != null, Pe = this._config.show_clock || this._config.show_date, L = /* @__PURE__ */ new Date(), ie = this._config.show_date ? ht(L) : null, B = this._config.show_moon && this._hass.states[this._config.moon_entity || "sensor.moon_phase"], q = B && !["unknown", "unavailable"].includes(B.state) ? ut(B.state) : null, R = [];
    return q && R.push(q.label), ie && R.push(ie), p`
      <div class="current">
        <img class="current-icon" src=${r} alt=${o} />
        <div class="current-info">
          <div class="current-main">
            <div class="current-temp">${Math.round(l)}${a}</div>
            <div class="current-condition">${o}</div>
            ${m.length ? p`<div class="current-meta">
                  ${m.join(" · ")}
                </div>` : h}
          </div>
          ${y || te ? p`
                <div class="uv-group">
                  ${y ? this._renderIndicators(_) : h}
                  ${te ? p`<div class="humidity-line">
                        <ha-icon
                          class="humidity-icon"
                          icon=${"mdi:water-percent"}
                        ></ha-icon>
                        <span>${Math.round(d)}%</span>
                      </div>` : h}
                </div>
              ` : h}
        </div>
        ${Pe ? p`
              <div class="current-side">
                <div class="clock-group">
                  ${this._config.show_clock ? p`<div class="clock">
                        ${k(L, t, i)}
                      </div>` : h}
                  ${this._config.show_date ? p`<div class="date-line">
                        ${st(L, t)}
                      </div>` : h}
                  ${R.length ? p`<div class="moon-line">
                        ${q ? p`<ha-icon
                              class="moon-icon"
                              icon=${q.icon}
                            ></ha-icon>` : h}
                        <span>${R.join(" · ")}</span>
                      </div>` : h}
                </div>
              </div>
            ` : h}
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
    const t = rt(e.state);
    return p`
      <div class="indicator-box indicator-uv">
        <div class="indicator-label">Indice UV</div>
        <div class="indicator-row">
          <span class="indicator-value">${e.state}</span>
          ${t ? p`<span class="indicator-category">${t}</span>` : h}
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
        value: `${Math.round(l)}${c}`
      });
    }
    const a = this._hass.states[this._config.sun_entity || "sun.sun"];
    if (this._config.show_sun && a) {
      const c = a.attributes.next_rising ? new Date(a.attributes.next_rising) : null, d = a.attributes.next_setting ? new Date(a.attributes.next_setting) : null;
      c && n.push({
        type: "sunrise",
        icon: "mdi:weather-sunset-up",
        label: "Lever",
        value: k(c, t, i)
      }), d && n.push({
        type: "sunset",
        icon: "mdi:weather-sunset-down",
        label: "Coucher",
        value: k(d, t, i)
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
    ` : h;
  }
  _renderHourly(e, t) {
    const i = Date.now(), n = (this._hourly || []).filter((r) => new Date(r.datetime).getTime() >= i).slice(0, this._config.hourly_count);
    return n.length ? p`
      <div class="hourly">
        ${n.map((r) => {
      const o = new Date(r.datetime), l = V(
        r.condition,
        this._isNight(o)
      ), a = W(l, this._config.icons), c = Y(this._hass, r.condition), d = r.precipitation_probability;
      return p`
            <div class="hourly-item">
              <div class="hourly-time">
                ${it(o, e, t)}
              </div>
              <img class="hourly-icon" src=${a} alt=${c} />
              <div class="hourly-temp">
                ${Math.round(r.temperature)}°
              </div>
              ${this._config.show_precipitation_probability && d > 0 ? p`<div class="hourly-pop">${d}%</div>` : h}
            </div>
          `;
    })}
      </div>
    ` : h;
  }
  _renderDaily(e) {
    const t = (this._daily || []).slice(0, this._config.daily_count);
    return t.length ? p`
      <div class="daily">
        ${t.map((i) => {
      const n = new Date(i.datetime), r = V(i.condition, !1), o = W(r, this._config.icons), l = Y(this._hass, i.condition);
      return p`
            <div class="daily-item">
              <div class="daily-day">${nt(n, e)}</div>
              <img class="daily-icon" src=${o} alt=${l} />
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
}
I(K, "properties", {
  _config: { state: !0 },
  _hourly: { state: !0 },
  _daily: { state: !0 }
}), I(K, "styles", Ne`
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
      --_row-gap: var(--echo-weather-row-gap, 5px);
      --_icon-size: var(--echo-weather-icon-size, clamp(64px, 8.5cqw, 84px));
      /* Icône météo actuelle : dimensionnée séparément des icônes horaire/
         quotidien (dérivées de --_icon-size, cf. plus bas) — la ligne
         actuelle a de la marge verticale que les prévisions n'ont pas. */
      --_current-icon-size: var(
        --echo-weather-current-icon-size,
        clamp(88px, 13cqw, 132px)
      );
      --_current-temp-size: var(
        --echo-weather-current-temp-size,
        clamp(2.75rem, 7cqw, 4.25rem)
      );
      --_hourly-temp-size: var(
        --echo-weather-hourly-temp-size,
        clamp(1.15rem, 2.4cqw, 1.5rem)
      );
      --_daily-temp-size: var(
        --echo-weather-daily-temp-size,
        clamp(1.05rem, 2.1cqw, 1.3rem)
      );
      --_text-color: var(
        --echo-weather-text-color,
        var(--primary-text-color, #fff)
      );
      --_secondary-color: var(
        --echo-weather-secondary-color,
        var(--secondary-text-color, #b0b0b0)
      );
      --_divider-color: var(--echo-weather-divider-color, rgba(127, 127, 127, 0.2));
      --_tile-background: var(--echo-weather-tile-background, rgba(127, 127, 127, 0.13));
      /* --primary-font-family est la variable de thème HA standard (ce que
         change un thème/View Assist quand on choisit une police) : on la
         lit en repli avant d'abandonner à inherit, sinon un changement de
         police fait via le thème plutôt que via notre propre variable
         n'atteint jamais la carte (même logique déjà appliquée à
         --_text-color juste au-dessus, avec --primary-text-color). */
      font-family: var(
        --echo-weather-font-family,
        var(--primary-font-family, inherit)
      );
      color: var(--_text-color);
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      padding: var(--_row-gap) var(--_gap);
      gap: var(--_row-gap);
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
      align-items: center;
      gap: var(--_gap);
      flex: 1 1 33%;
      padding-bottom: var(--_row-gap);
      border-bottom: 1px solid var(--_divider-color);
    }
    .current-icon {
      width: var(--_current-icon-size);
      height: var(--_current-icon-size);
      flex-shrink: 0;
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
      font-size: clamp(1rem, 1.8cqw, 1.25rem);
      font-weight: 500;
      margin-top: 4px;
    }
    /* Indice UV : tuile à deux lignes (libellé au-dessus, valeur +
       catégorie en dessous) — la version d'origine, jugée plus lisible
       qu'une puce sur une seule ligne. */
    .indicator-box {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 4px 12px;
      border-radius: 14px;
      background: var(--_tile-background);
      border: 1px solid var(--_divider-color);
    }
    .indicator-label {
      font-size: clamp(0.75rem, 1.2cqw, 0.85rem);
      font-weight: 600;
      color: var(--_secondary-color);
      white-space: nowrap;
    }
    .indicator-row {
      display: flex;
      align-items: baseline;
      gap: 7px;
    }
    .indicator-value {
      font-size: clamp(1.2rem, 2.2cqw, 1.45rem);
      font-weight: 800;
    }
    .indicator-uv .indicator-value {
      color: var(--echo-weather-uv-color, #ffb74d);
    }
    .indicator-category {
      font-size: clamp(0.8rem, 1.3cqw, 0.95rem);
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
      gap: 8px;
      font-size: clamp(1.6rem, 3.4cqw, 2.3rem);
      font-weight: 800;
      white-space: nowrap;
    }
    .humidity-icon {
      --mdc-icon-size: clamp(28px, 4.2cqw, 38px);
      color: var(--echo-weather-humidity-color, #4fc3f7);
      flex-shrink: 0;
    }
    .current-meta {
      color: var(--_secondary-color);
      font-size: clamp(0.85rem, 1.4cqw, 1rem);
      margin-top: 2px;
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
      gap: 2px;
    }
    .clock {
      font-size: clamp(2.1rem, 4.4cqw, 2.9rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .date-line {
      color: var(--_secondary-color);
      font-size: clamp(1.1rem, 2.2cqw, 1.5rem);
      font-weight: 600;
      text-align: right;
      margin-top: 2px;
    }
    .moon-line {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--_secondary-color);
      font-size: clamp(0.78rem, 1.3cqw, 0.95rem);
      font-weight: 500;
      text-align: right;
      margin-top: 2px;
    }
    .moon-icon {
      --mdc-icon-size: clamp(15px, 2.1cqw, 18px);
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
      gap: 2px;
      flex: 1;
      min-width: 0;
      padding: 4px 4px;
      border-radius: 14px;
      background: var(--_tile-background);
    }
    .daily-day {
      color: var(--_secondary-color);
      font-size: clamp(0.9rem, 1.6cqw, 1.05rem);
      font-weight: 600;
      text-transform: capitalize;
    }
    .daily-icon {
      width: calc(var(--_icon-size) * 0.46);
      height: calc(var(--_icon-size) * 0.46);
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
      border: 1px solid var(--_divider-color);
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
customElements.define(Me, K);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Me,
  name: "Echo Weather Card",
  description: "Carte météo compacte pour smart displays (Echo Show 5, View Assist)."
});
