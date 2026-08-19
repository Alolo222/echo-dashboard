var We = Object.defineProperty;
var Ge = (r, e, t) => e in r ? We(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Q = (r, e, t) => Ge(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, le = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = Symbol(), pe = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (le && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ke = (r) => new De(typeof r == "string" ? r : r + "", void 0, ce), Je = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((o, i, a) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1], r[0]);
  return new De(t, r, ce);
}, Ye = (r, e) => {
  if (le) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), i = Y.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = t.cssText, r.appendChild(o);
  }
}, fe = le ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Ke(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xe, defineProperty: Ze, getOwnPropertyDescriptor: Qe, getOwnPropertyNames: et, getOwnPropertySymbols: tt, getPrototypeOf: ot } = Object, C = globalThis, me = C.trustedTypes, it = me ? me.emptyScript : "", ee = C.reactiveElementPolyfillSupport, L = (r, e) => r, re = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? it : null;
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
} }, Ie = (r, e) => !Xe(r, e), ge = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: Ie };
var Te, Re;
(Te = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Re = C.litPropertyMetadata) != null || (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ge) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(e, o, t);
      i !== void 0 && Ze(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    var n;
    const { get: i, set: a } = (n = Qe(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: i, set(l) {
      const s = i == null ? void 0 : i.call(this);
      a == null || a.call(this, l), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ge;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = ot(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const t = this.properties, o = [...et(t), ...tt(t)];
      for (const i of o) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, i] of t) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const i = this._$Eu(t, o);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const i of o) t.unshift(fe(i));
    } else e !== void 0 && t.push(fe(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, o;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) == null || o.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Ye(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((o) => {
      var i;
      return (i = o.hostConnected) == null ? void 0 : i.call(o);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostDisconnected) == null ? void 0 : o.call(t);
    });
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    var a;
    const o = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, o);
    if (i !== void 0 && o.reflect === !0) {
      const n = (((a = o.converter) == null ? void 0 : a.toAttribute) !== void 0 ? o.converter : re).toAttribute(t, o.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, n, l;
    const o = this.constructor, i = o._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = o.getPropertyOptions(i), c = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((a = s.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? s.converter : re;
      this._$Em = i;
      const u = c.fromAttribute(t, s.type);
      this[i] = (l = u != null ? u : (n = this._$Ej) == null ? void 0 : n.get(i)) != null ? l : u, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, i = !1, a) {
    var n, l;
    if (e !== void 0) {
      const s = this.constructor;
      if (i === !1 && (a = this[e]), o != null || (o = s.getPropertyOptions(e)), !(((n = o.hasChanged) != null ? n : Ie)(a, t) || o.useDefault && o.reflect && a === ((l = this._$Ej) == null ? void 0 : l.get(e)) && !this.hasAttribute(s._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: i, wrapped: a }, n) {
    var l, s, c;
    o && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (s = n != null ? n : t) != null ? s : this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var o, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((o = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, l] of this._$Ep) this[n] = l;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [n, l] of a) {
        const { wrapped: s } = l, c = this[n];
        s !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((a) => {
        var n;
        return (n = a.hostUpdate) == null ? void 0 : n.call(a);
      }), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
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
var Ne;
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[L("elementProperties")] = /* @__PURE__ */ new Map(), U[L("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: U }), ((Ne = C.reactiveElementVersions) != null ? Ne : C.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, _e = (r) => r, X = j.trustedTypes, ye = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, He = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + z, at = `<${Le}>`, T = document, V = () => T.createComment(""), W = (r) => r === null || typeof r != "object" && typeof r != "function", ue = Array.isArray, nt = (r) => ue(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", te = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, be = />/g, E = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, we = /"/g, je = /^(?:script|style|textarea|title)$/i, Fe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), v = Fe(1), _ = Fe(2), P = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), q = T.createTreeWalker(T, 129);
function Be(r, e) {
  if (!ue(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ye !== void 0 ? ye.createHTML(e) : e;
}
const rt = (r, e) => {
  const t = r.length - 1, o = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = I;
  for (let l = 0; l < t; l++) {
    const s = r[l];
    let c, u, d = -1, p = 0;
    for (; p < s.length && (n.lastIndex = p, u = n.exec(s), u !== null); ) p = n.lastIndex, n === I ? u[1] === "!--" ? n = $e : u[1] !== void 0 ? n = be : u[2] !== void 0 ? (je.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = E) : u[3] !== void 0 && (n = E) : n === E ? u[0] === ">" ? (n = i != null ? i : I, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? E : u[3] === '"' ? we : ve) : n === we || n === ve ? n = E : n === $e || n === be ? n = I : (n = E, i = void 0);
    const f = n === E && r[l + 1].startsWith("/>") ? " " : "";
    a += n === I ? s + at : d >= 0 ? (o.push(c), s.slice(0, d) + He + s.slice(d) + z + f) : s + z + (d === -2 ? l : f);
  }
  return [Be(r, a + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class G {
  constructor({ strings: e, _$litType$: t }, o) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const l = e.length - 1, s = this.parts, [c, u] = rt(e, t);
    if (this.el = G.createElement(c, o), q.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = q.nextNode()) !== null && s.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(He)) {
          const p = u[n++], f = i.getAttribute(d).split(z), m = /([.?@])?(.*)/.exec(p);
          s.push({ type: 1, index: a, name: m[2], strings: f, ctor: m[1] === "." ? lt : m[1] === "?" ? ct : m[1] === "@" ? ut : Z }), i.removeAttribute(d);
        } else d.startsWith(z) && (s.push({ type: 6, index: a }), i.removeAttribute(d));
        if (je.test(i.tagName)) {
          const d = i.textContent.split(z), p = d.length - 1;
          if (p > 0) {
            i.textContent = X ? X.emptyScript : "";
            for (let f = 0; f < p; f++) i.append(d[f], V()), q.nextNode(), s.push({ type: 2, index: ++a });
            i.append(d[p], V());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Le) s.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(z, d + 1)) !== -1; ) s.push({ type: 7, index: a }), d += z.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const o = T.createElement("template");
    return o.innerHTML = e, o;
  }
}
function M(r, e, t = r, o) {
  var n, l, s;
  if (e === P) return e;
  let i = o !== void 0 ? (n = t._$Co) == null ? void 0 : n[o] : t._$Cl;
  const a = W(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, t, o)), o !== void 0 ? ((s = t._$Co) != null ? s : t._$Co = [])[o] = i : t._$Cl = i), i !== void 0 && (e = M(r, i._$AS(r, e.values), i, o)), e;
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
    const { el: { content: t }, parts: o } = this._$AD, i = ((c = e == null ? void 0 : e.creationScope) != null ? c : T).importNode(t, !0);
    q.currentNode = i;
    let a = q.nextNode(), n = 0, l = 0, s = o[0];
    for (; s !== void 0; ) {
      if (n === s.index) {
        let u;
        s.type === 2 ? u = new K(a, a.nextSibling, this, e) : s.type === 1 ? u = new s.ctor(a, s.name, s.strings, this, e) : s.type === 6 && (u = new dt(a, this, e)), this._$AV.push(u), s = o[++l];
      }
      n !== (s == null ? void 0 : s.index) && (a = q.nextNode(), n++);
    }
    return q.currentNode = T, i;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class K {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, o, i) {
    var a;
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = i, this._$Cv = (a = i == null ? void 0 : i.isConnected) != null ? a : !0;
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
    e = M(this, e, t), W(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : nt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && W(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: o } = e, i = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = G.createElement(Be(o.h, o.h[0]), this.options)), o);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(t);
    else {
      const n = new st(i, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = ke.get(e.strings);
    return t === void 0 && ke.set(e.strings, t = new G(e)), t;
  }
  k(e) {
    ue(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, i = 0;
    for (const a of e) i === t.length ? t.push(o = new K(this.O(V()), this.O(V()), this, this.options)) : o = t[i], o._$AI(a), i++;
    i < t.length && (this._$AR(o && o._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = _e(e).nextSibling;
      _e(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, i, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = h;
  }
  _$AI(e, t = this, o, i) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = M(this, e, t, 0), n = !W(e) || e !== this._$AH && e !== P, n && (this._$AH = e);
    else {
      const l = e;
      let s, c;
      for (e = a[0], s = 0; s < a.length - 1; s++) c = M(this, l[o + s], t, s), c === P && (c = this._$AH[s]), n || (n = !W(c) || c !== this._$AH[s]), c === h ? e = h : e !== h && (e += (c != null ? c : "") + a[s + 1]), this._$AH[s] = c;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class lt extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ct extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class ut extends Z {
  constructor(e, t, o, i, a) {
    super(e, t, o, i, a), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = M(this, e, t, 0)) != null ? n : h) === P) return;
    const o = this._$AH, i = e === h && o !== h || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, a = e !== h && (o === h || i);
    i && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, o;
    typeof this._$AH == "function" ? this._$AH.call((o = (t = this.options) == null ? void 0 : t.host) != null ? o : this.element, e) : this._$AH.handleEvent(e);
  }
}
class dt {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const oe = j.litHtmlPolyfillSupport;
var Ue;
oe == null || oe(G, K), ((Ue = j.litHtmlVersions) != null ? Ue : j.litHtmlVersions = []).push("3.3.3");
const ht = (r, e, t) => {
  var a, n;
  const o = (a = t == null ? void 0 : t.renderBefore) != null ? a : e;
  let i = o._$litPart$;
  if (i === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    o._$litPart$ = i = new K(e.insertBefore(V(), l), l, void 0, t != null ? t : {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class F extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, o;
    const e = super.createRenderRoot();
    return (o = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ht(t, this.renderRoot, this.renderOptions);
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
    return P;
  }
}
var Pe;
F._$litElement$ = !0, F.finalized = !0, (Pe = O.litElementHydrateSupport) == null || Pe.call(O, { LitElement: F });
const ie = O.litElementPolyfillSupport;
ie == null || ie({ LitElement: F });
var Me;
((Me = O.litElementVersions) != null ? Me : O.litElementVersions = []).push("4.2.2");
const Ve = "echo-home-card", pt = "https://cdn.jsdelivr.net/npm/@meteocons/svg", A = {
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
  // "ardoise", "corail", "grenat", "prisme", "atlas", "carbone" ou
  // "soleil" (cf. src/analog-styles.js pour le détail de chacun).
  // Valeur spéciale "auto" : choisit automatiquement un style différent
  // chaque jour de la semaine (lundi -> "aurore", mardi -> "ardoise",
  // etc., cf. WEEKDAY_ANALOG_STYLES dans analog-styles.js) — recalculé à
  // chaque rendu, donc change tout seul à minuit sans reconfiguration.
  // Contrairement à clock_face, ce n'est qu'un réglage YAML : pas de
  // bouton pour en changer à l'écran, pas de mémorisation localStorage —
  // un seul style (ou "auto") choisi une fois. Ignoré si analog_background
  // a un type dynamique (satellite/url/media_folder) : retombe sur
  // "aurore", blanc, lisible sur n'importe quelle photo (les couleurs
  // d'un style donné, planétaire ou non, ne le sont pas forcément).
  zoom: 1
  // facteur d'échelle manuel (CSS zoom), filet de rattrapage si
  // les tailles fluides ne suivent pas correctement sur un appareil donné
}, ft = {
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
function Ae(r, e) {
  return r === "partlycloudy" ? e ? "partly-cloudy-night" : "partly-cloudy-day" : r === "sunny" && e ? "clear-night" : ft[r] || "not-available";
}
function xe(r, e) {
  if (e != null && e.base_url)
    return `${e.base_url.replace(/\/$/, "")}/${r}.svg`;
  const t = (e == null ? void 0 : e.style) || "fill";
  return `${pt}/${t}/${r}.svg`;
}
function ae(r, e, t) {
  return new Intl.DateTimeFormat(e, {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12"
  }).format(r).replace(/\s/g, "");
}
function ne(r, e) {
  const t = new Intl.DateTimeFormat(e, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(r);
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function mt(r, e) {
  return r.localize(
    `component.weather.entity_component._.state.${e}`
  ) || e;
}
const Se = "aurore", H = {
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
    comp: { color: "#ffffff", opacity: 0.85 },
    // "Aurore Boréale" : une teinte différente par aiguille (façon bandes
    // d'aurore) plutôt qu'une seule couleur, aucune graduation (le ciel
    // n'a pas de repères) — un vrai style de nuit à part entière, pas un
    // recolorage de la version de jour (cf. schéma "concept" dans
    // _resolveNightStyle, echo-home-card.js).
    night: {
      background: "radial-gradient(120% 100% at 50% 15%, #0d2b28 0%, #071a2e 45%, #030712 100%)",
      glow: !0,
      ticks: null,
      numerals: null,
      hour: { len: 23, color: "#2ee6c8", width: 4, cap: "round" },
      minute: { len: 35, color: "#5ee6a0", width: 2.6, cap: "round" },
      second: {
        len: 42,
        tail: 8,
        color: "#b06bff",
        width: 1,
        cap: "round",
        opacity: 0.9,
        tipDot: { r: 1.3, fill: "#b06bff" }
      },
      center: { r: 2, color: "#2ee6c8", ring: { r: 3.4, width: 1, color: "#b06bff" } },
      comp: { color: "#8ff5e0", opacity: 0.75 }
    }
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
    // Fond légèrement éclairci (#3a4750 -> #4a5a66, luminosité 0.06 ->
    // 0.10) — jugé trop sombre à l'usage.
    background: "radial-gradient(140% 100% at 50% 100%, rgba(0, 0, 0, 0.28), transparent 60%), #4a5a66",
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
    comp: { color: "#edeef0", opacity: 0.6 },
    // La nuit, bascule sur "carbone" affiché tel quel (pas recoloré) —
    // les deux styles partagent déjà l'esprit géométrique/technique,
    // cf. { swap } dans _resolveNightStyle (echo-home-card.js).
    night: { swap: "carbone" }
  },
  // --- Styles libres ---------------------------------------------------
  // Palette libre, sans thème imposé — contrairement à une première
  // tentative "planétaire" (un par jour sur le nom latin du jour
  // français) jugée trop démonstrative. Sept d'entre eux (aurore/
  // ardoise ci-dessus, et corail/grenat/prisme/atlas/soleil ci-dessous)
  // sont calés un par jour de la semaine via `analog_style: "auto"` (cf.
  // WEEKDAY_ANALOG_STYLES plus bas) ; "carbone" ne sert que de nuit à
  // "ardoise", mais reste sélectionnable seul comme les autres.
  //
  // Trois formes de nuit possibles (cf. _resolveNightStyle,
  // echo-home-card.js) :
  // - `night: { background, color }` — recolorage simple et atténué (une
  //   seule teinte), comme l'ancien traitement uniforme mais propre au
  //   style (ex: "soleil").
  // - `night: { swap: "autreStyle" }` — bascule sur un AUTRE style
  //   affiché tel quel, à pleine intensité (ex: "ardoise" -> "carbone").
  // - `night: { ...palette complète... }` — un concept de nuit à part
  //   entière (fond/graduations/aiguilles propres), pas dérivé du style
  //   de jour (ex: "aurore", "corail", "atlas").
  // Sans `night` du tout (mono/clair/neon ci-dessus) : traitement nuit
  // uniforme d'origine (fond bleu marine fixe, aiguilles rouge très
  // atténué).
  corail: {
    label: "Corail",
    description: "Récif profond : dégradé sarcelle vers turquoise, trotteuse corail vif, graduations sur les heures non cardinales.",
    // Bright end assombri (#1fa398 -> #0f5f57) + trotteuse éclaircie
    // (#ff7a59 -> #ffab8f) : contraste mesuré < 1.3:1 avant correction
    // sur la zone la plus claire du dégradé, > 4:1 partout après.
    background: "linear-gradient(160deg, #0d3b3a 0%, #146b64 50%, #0f5f57 100%)",
    // mode "minor" plutôt que "all" : les 4 points cardinaux se
    // superposaient aux chiffres "12/3/6/9" (même rayon) — laissés aux
    // chiffres, comme "aurore".
    ticks: { shape: "dot", mode: "minor", radius: 44, minorR: 0.9, minorOpacity: 0.35, color: "#ffffff" },
    numerals: { mode: "quad", radius: 41, size: 11, weight: 300, opacity: 0.9, color: "#ffffff" },
    hour: { len: 23, color: "#ffffff", width: 4, cap: "round" },
    minute: { len: 35, color: "#ffffff", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#ffab8f",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#ffab8f" }
    },
    center: { r: 1.8, color: "#ffffff", ring: { r: 3.2, width: 1, color: "#ffab8f" } },
    comp: { color: "#ffffff", opacity: 0.7 },
    // "Bioluminescence" : 12 points de taille ET luminosité irrégulières
    // (radii/opacities) — des organismes de tailles différentes qui
    // s'allument plus ou moins fort, pas une couronne uniforme.
    night: {
      background: "radial-gradient(120% 100% at 50% 100%, #04211f 0%, #010a09 70%)",
      glow: !0,
      ticks: {
        shape: "dot",
        mode: "all",
        radius: 44,
        radii: [1.8, 0.6, 1.2, 2.4, 0.8, 1.6, 0.5, 2, 1, 1.8, 0.7, 1.4],
        opacities: [0.7, 0.3, 0.5, 0.85, 0.35, 0.6, 0.25, 0.75, 0.4, 0.65, 0.3, 0.55],
        color: "#7dffcf"
      },
      numerals: null,
      hour: { len: 23, color: "#ff9f80", width: 4, cap: "round" },
      minute: { len: 35, color: "#ff9f80", width: 2.6, cap: "round" },
      second: {
        len: 42,
        tail: 8,
        color: "#7dffcf",
        width: 1,
        cap: "round",
        opacity: 0.95,
        tipDot: { r: 1.4, fill: "#7dffcf" }
      },
      center: { r: 1.8, color: "#ff9f80", ring: { r: 3.2, width: 1, color: "#7dffcf" } },
      comp: { color: "#7dffcf", opacity: 0.7 }
    }
  },
  grenat: {
    label: "Grenat",
    description: "Ton bijou : bordeaux vif, graduations en petits diamants facettés, aiguilles blush, accent or.",
    // Fond remonté 2 fois (luminosité 0.013/0.029/0.055 -> 0.07/0.10/0.15)
    // — jugé trop sombre à chaque étape précédente. Pas de chiffres :
    // ils se superposaient aux graduations diamant (même rayon) — corail
    // garde les siens, grenat s'en distingue justement par leur absence.
    background: "linear-gradient(150deg, #8a2340 0%, #a52a4a 50%, #c23a63 100%)",
    // Graduations en petits diamants (pierre facettée, cf. shape
    // "diamond" dans _renderTicks) plutôt que des points ronds : corail
    // et grenat se confondaient trop sinon, mêmes graduations/chiffres/
    // aiguilles, juste une teinte différente. Ton très sombre : un ton
    // clair ne se détache plus sur ce fond éclairci.
    ticks: {
      shape: "diamond",
      mode: "all",
      radius: 44,
      minorR: 1.2,
      minorOpacity: 0.5,
      cardinalR: 2.4,
      cardinalOpacity: 0.8,
      color: "#1a0308"
    },
    numerals: null,
    hour: { len: 24, color: "#fbeef0", width: 4, cap: "round" },
    minute: { len: 36, color: "#fbeef0", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#e8b84a", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#fbeef0", ring: { r: 3.4, width: 1, color: "#e8b84a" } },
    comp: { color: "#fbeef0", opacity: 0.75 },
    // La nuit, bascule sur "mono" affiché tel quel — sobre, sans
    // ornement, en contraste avec le jour très coloré.
    night: { swap: "mono" }
  },
  prisme: {
    label: "Prisme",
    description: "Fond neutre clair, une couleur par aiguille — bleu, violet, rose — sans graduation ni chiffre.",
    // Fond légèrement assombri (#f4f5f7 -> #e8eaee) + les 3 teintes
    // approfondies (bleu/violet/rose) : les 3 étaient sous 4:1 sur le
    // fond d'origine, la rose à 2.93:1 seulement.
    background: "#e8eaee",
    ticks: { shape: "dot", mode: "cardinal", radius: 44, cardinalR: 1.3, cardinalOpacity: 0.4, color: "#8a8f99" },
    numerals: null,
    hour: { len: 24, color: "#2f5bc4", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#7c3aed", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c2185b", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#20232a" },
    comp: { color: "#20232a", opacity: 0.6, iconFilter: "brightness(0)" },
    // La nuit, bascule sur "neon" affiché tel quel — la ville s'allume.
    night: { swap: "neon" }
  },
  atlas: {
    label: "Atlas",
    description: "Horloge ancienne : fond sépia chaud, 12 chiffres romains en serif, aiguilles en lame effilée, trotteuse en lollipop.",
    // Restylé façon horloge ancienne : les 12 chiffres romains (police
    // serif) servent de repère, plus besoin de graduations à part — et
    // "IIII" plutôt que "IV" à 4h, convention d'horlogerie traditionnelle
    // (symétrie visuelle avec "VIII"). Aiguilles en lame effilée (shape
    // "leaf") plutôt qu'un simple trait, pour l'esprit antique. Trotteuse
    // en "lollipop" (petit disque en pointe, tipDot) plutôt qu'un simple
    // trait — trotteuse classique d'horlogerie ancienne.
    background: "linear-gradient(160deg, #e0d0a8 0%, #c8a878 55%, #a68554 100%)",
    shape: "leaf",
    ticks: null,
    numerals: {
      mode: "all",
      radius: 41,
      size: 10.5,
      weight: 500,
      opacity: 0.9,
      color: "#2a1c10",
      fontFamily: "Georgia, 'Times New Roman', serif"
    },
    hour: { len: 24, color: "#2a1c10", width: 4.5, cap: "round" },
    minute: { len: 36, color: "#2a1c10", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 10,
      color: "#5c2a12",
      width: 0.9,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.6, fill: "#5c2a12" }
    },
    center: { r: 2.2, color: "#2a1c10" },
    comp: { color: "#2a1c10", opacity: 0.65, iconFilter: "brightness(0)" },
    // "Chandelle" : lame effilée adoucie (galbe réduit, cf. shape
    // "leaf"). Graduations à opacité irrégulière, comme une flamme qui
    // n'éclaire jamais le tour du cadran de façon égale.
    night: {
      background: "radial-gradient(60% 60% at 50% 55%, #3a1508 0%, #1a0a06 45%, #0a0403 100%)",
      glow: !0,
      shape: "leaf",
      ticks: {
        shape: "dot",
        mode: "all",
        radius: 44,
        minorR: 1.2,
        cardinalR: 1.2,
        opacities: [0.75, 0.15, 0.5, 0.9, 0.25, 0.6, 0.4, 0.15, 0.8, 0.3, 0.55, 0.2],
        color: "#e0a84a"
      },
      numerals: null,
      hour: { len: 24, color: "#f0b860", width: 4, cap: "round" },
      minute: { len: 36, color: "#f0b860", width: 2.6, cap: "round" },
      second: { len: 42, tail: 8, color: "#ff3d6e", width: 1, cap: "round", opacity: 0.9 },
      center: { r: 2, color: "#f0b860", ring: { r: 3.4, width: 1, color: "#ff3d6e" } },
      comp: { color: "#f0b860", opacity: 0.7 }
    }
  },
  carbone: {
    label: "Carbone",
    description: "Noir profond, aiguilles rectangulaires façon chronographe, accent cyan électrique — surtout utilisé comme nuit d'ardoise.",
    background: "radial-gradient(120% 100% at 50% 0%, #1a2028 0%, #0a0d12 70%)",
    shape: "rect",
    ticks: { shape: "dot", mode: "all", radius: 44, minorR: 1, minorOpacity: 0.3, cardinalR: 1.6, cardinalOpacity: 0.6, color: "#b8c4d4" },
    numerals: null,
    hour: { w: 5, len: 25, color: "#b8c4d4" },
    minute: { w: 3, len: 37, color: "#b8c4d4" },
    second: { w: 1.2, len: 43, tail: 8, color: "#2dd4ff" },
    center: { size: 4, color: "#2dd4ff" },
    comp: { color: "#b8c4d4", opacity: 0.6 }
  },
  soleil: {
    label: "Soleil",
    description: "Rayonnant et chaud : dégradé orange/jaune façon lever de soleil, rayons alternés longs/courts façon icône soleil, halo activé.",
    background: "linear-gradient(160deg, #ffb545 0%, #ff8a3d 55%, #ff5e3a 100%)",
    glow: !0,
    // Rayons alternés longs/courts (façon icône soleil) plutôt qu'une
    // couronne régulière de même longueur : les 4 cardinaux s'étirent
    // presque jusqu'au centre et sont plus opaques, les 8 autres restent
    // courts et discrets.
    ticks: {
      shape: "line",
      mode: "all",
      y2: 9,
      width: 1.2,
      color: "#fff6e0",
      y1s: [2, 7, 7, 2, 7, 7, 2, 7, 7, 2, 7, 7],
      opacities: [0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6]
    },
    numerals: null,
    hour: { len: 23, color: "#fff6e0", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#fff6e0", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#c81d1d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#fff6e0" },
    comp: { color: "#fff6e0", opacity: 0.85 },
    // Le soleil est couché la nuit : bascule sur un indigo profond plutôt
    // que de garder le fond orange/jaune. Braises ambrées éclaircies
    // (#8a5a2e -> #ffb84d, 3.27:1 -> 11.16:1 mesuré) pour rester dans le
    // même registre "vibrant" que les autres nuits plutôt que rester en
    // retrait.
    night: { background: "#0a0e1e", color: "#ffb84d" }
  },
  // --- Nuits sélectionnables seules ------------------------------------
  // Les concepts de nuit ci-dessus ne s'affichent normalement que la
  // nuit réelle (attribut `mode` du satellite View Assist, cf.
  // _isNightMode). Ces 4 entrées les exposent en clé à part —
  // sélectionnables via `analog_style` comme n'importe quel autre style,
  // pour les prévisualiser sans attendre/forcer la nuit. Chacune pointe
  // sur elle-même via `night: { swap }` : sélectionnée à la vraie nuit,
  // elle reste identique plutôt que de retomber sur le rouge atténué
  // générique (qui n'aurait pas de sens sur un style déjà pensé nuit).
  aurore_night: {
    label: "Aurore Boréale (nuit d'aurore)",
    description: 'Nuit de "aurore" isolée pour prévisualisation : une teinte différente par aiguille (cyan/vert/violet), aucune graduation.',
    background: "radial-gradient(120% 100% at 50% 15%, #0d2b28 0%, #071a2e 45%, #030712 100%)",
    glow: !0,
    ticks: null,
    numerals: null,
    hour: { len: 23, color: "#2ee6c8", width: 4, cap: "round" },
    minute: { len: 35, color: "#5ee6a0", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#b06bff",
      width: 1,
      cap: "round",
      opacity: 0.9,
      tipDot: { r: 1.3, fill: "#b06bff" }
    },
    center: { r: 2, color: "#2ee6c8", ring: { r: 3.4, width: 1, color: "#b06bff" } },
    comp: { color: "#8ff5e0", opacity: 0.75 },
    night: { swap: "aurore_night" }
  },
  corail_night: {
    label: "Bioluminescence (nuit de corail)",
    description: `Nuit de "corail" isolée pour prévisualisation : récif profond, graduations de taille et d'éclat irréguliers.`,
    background: "radial-gradient(120% 100% at 50% 100%, #04211f 0%, #010a09 70%)",
    glow: !0,
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      radii: [1.8, 0.6, 1.2, 2.4, 0.8, 1.6, 0.5, 2, 1, 1.8, 0.7, 1.4],
      opacities: [0.7, 0.3, 0.5, 0.85, 0.35, 0.6, 0.25, 0.75, 0.4, 0.65, 0.3, 0.55],
      color: "#7dffcf"
    },
    numerals: null,
    hour: { len: 23, color: "#ff9f80", width: 4, cap: "round" },
    minute: { len: 35, color: "#ff9f80", width: 2.6, cap: "round" },
    second: {
      len: 42,
      tail: 8,
      color: "#7dffcf",
      width: 1,
      cap: "round",
      opacity: 0.95,
      tipDot: { r: 1.4, fill: "#7dffcf" }
    },
    center: { r: 1.8, color: "#ff9f80", ring: { r: 3.2, width: 1, color: "#7dffcf" } },
    comp: { color: "#7dffcf", opacity: 0.7 },
    night: { swap: "corail_night" }
  },
  atlas_night: {
    label: "Chandelle (nuit d'atlas)",
    description: 'Nuit de "atlas" isolée pour prévisualisation : lueur de chandelle, aiguilles en lame effilée, graduations en flamme vacillante.',
    background: "radial-gradient(60% 60% at 50% 55%, #3a1508 0%, #1a0a06 45%, #0a0403 100%)",
    glow: !0,
    shape: "leaf",
    ticks: {
      shape: "dot",
      mode: "all",
      radius: 44,
      minorR: 1.2,
      cardinalR: 1.2,
      opacities: [0.75, 0.15, 0.5, 0.9, 0.25, 0.6, 0.4, 0.15, 0.8, 0.3, 0.55, 0.2],
      color: "#e0a84a"
    },
    numerals: null,
    hour: { len: 24, color: "#f0b860", width: 4, cap: "round" },
    minute: { len: 36, color: "#f0b860", width: 2.6, cap: "round" },
    second: { len: 42, tail: 8, color: "#ff3d6e", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2, color: "#f0b860", ring: { r: 3.4, width: 1, color: "#ff3d6e" } },
    comp: { color: "#f0b860", opacity: 0.7 },
    night: { swap: "atlas_night" }
  },
  soleil_night: {
    label: "Braises (nuit de soleil)",
    description: 'Nuit de "soleil" isolée pour prévisualisation : indigo profond, aiguilles et rayons en braises ambrées.',
    background: "#0a0e1e",
    glow: !1,
    ticks: {
      shape: "line",
      mode: "all",
      y2: 9,
      width: 1.2,
      color: "#ffb84d",
      y1s: [2, 7, 7, 2, 7, 7, 2, 7, 7, 2, 7, 7],
      opacities: [0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6, 0.95, 0.6, 0.6]
    },
    numerals: null,
    hour: { len: 23, color: "#ffb84d", width: 4.5, cap: "round" },
    minute: { len: 35, color: "#ffb84d", width: 2.8, cap: "round" },
    second: { len: 42, tail: 8, color: "#ffb84d", width: 1, cap: "round", opacity: 0.9 },
    center: { r: 2.2, color: "#ffb84d" },
    comp: { color: "#ffb84d", opacity: 0.85 },
    night: { swap: "soleil_night" }
  }
}, gt = [
  "soleil",
  // dimanche
  "aurore",
  // lundi
  "ardoise",
  // mardi
  "corail",
  // mercredi
  "grenat",
  // jeudi
  "prisme",
  // vendredi
  "atlas"
  // samedi
], _t = ["cover", "contain", "fill"], S = "cover", B = 300, yt = ["landscape", "portrait", "squarish"], J = ["satellite", "url", "media_folder", "picsum", "unsplash"];
function $t(r) {
  return r === "contain" ? "contain" : r === "fill" ? "100% 100%" : "cover";
}
function N(r, e) {
  return `center / ${$t(e)} no-repeat url("${r}")`;
}
function ze(r, e, t) {
  if (r != null) {
    if (typeof r == "string") return { type: "css", value: r };
    if (typeof r == "object") return { type: t, ...r };
  } else if (e)
    return { type: "satellite" };
  return { type: t };
}
function Ce(r, e, t, o, i) {
  var n;
  const a = { ...r };
  return e.includes(a.type) || (i(`${o}.type`, t), a.type = t), a.fit != null && !_t.includes(a.fit) && (i(`${o}.fit`, S), a.fit = S), a.interval != null && (typeof a.interval != "number" || !Number.isFinite(a.interval) || a.interval <= 0) && (i(`${o}.interval`, B), a.interval = B), a.type === "url" && !a.url && !(((n = a.urls) == null ? void 0 : n.length) > 0) && (i(`${o}.url`, "satellite"), a.type = "satellite"), a.type === "media_folder" && !a.path && (i(`${o}.path`, "satellite"), a.type = "satellite"), a.type === "unsplash" && !a.access_key && (i(`${o}.access_key`, "satellite"), a.type = "satellite"), a.orientation != null && !yt.includes(a.orientation) && (i(`${o}.orientation`, "aucune"), delete a.orientation), a;
}
async function bt(r, e) {
  return ((await r.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children || []).filter(
    (o) => {
      var i;
      return o.media_class === "image" || ((i = o.media_content_type) == null ? void 0 : i.startsWith("image/"));
    }
  ).map((o) => o.media_content_id);
}
async function vt(r, e) {
  return (await r.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
class Ee {
  constructor(e) {
    this._onChange = e, this._signature = null, this._images = [], this._resolvedUrl = null, this._index = 0, this._timer = null, this._token = 0, this.cssValue = null;
  }
  configure(e, t, o) {
    var n, l;
    const i = JSON.stringify([t, o]);
    if (i === this._signature) return;
    this._signature = i, this._token += 1;
    const a = this._token;
    switch (clearInterval(this._timer), this._timer = null, this._images = [], this._index = 0, t.type) {
      case "style":
        this.cssValue = null;
        return;
      case "css":
        this.cssValue = (n = t.value) != null ? n : null;
        return;
      case "satellite":
        this.cssValue = o.isNightMode ? null : o.satelliteBackgroundUrl ? N(o.satelliteBackgroundUrl, S) : null;
        return;
      case "url": {
        if (o.isNightMode) {
          this.cssValue = null;
          return;
        }
        const s = (l = t.urls) != null && l.length ? t.urls : [t.url];
        this._images = s, this.cssValue = N(s[0], t.fit || S), this._startRotation(e, t, a);
        return;
      }
      case "media_folder": {
        if (o.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadMediaFolder(e, t, a);
        return;
      }
      case "picsum": {
        if (o.isNightMode) {
          this.cssValue = null;
          return;
        }
        this._setPicsumUrl(t), this._timer = setInterval(() => {
          a === this._token && (this._setPicsumUrl(t), this._onChange());
        }, (t.interval || B) * 1e3);
        return;
      }
      case "unsplash": {
        if (o.isNightMode) {
          this.cssValue = null;
          return;
        }
        this.cssValue = null, this._loadUnsplash(t, a), this._timer = setInterval(() => {
          a === this._token && this._loadUnsplash(t, a);
        }, (t.interval || B) * 1e3);
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
    const t = e.width || Math.round(window.innerWidth) || 960, o = e.height || Math.round(window.innerHeight) || 480, i = `https://picsum.photos/${t}/${o}?random=${Date.now()}`;
    this.cssValue = N(i, e.fit || S);
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
    var o, i;
    try {
      const a = new URLSearchParams({ client_id: e.access_key });
      e.query && a.set("query", e.query), e.orientation && a.set("orientation", e.orientation), e.collections && a.set("collections", e.collections);
      const n = await fetch(`https://api.unsplash.com/photos/random?${a}`);
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const l = await n.json();
      if (t !== this._token) return;
      const s = ((o = l == null ? void 0 : l.urls) == null ? void 0 : o.regular) || ((i = l == null ? void 0 : l.urls) == null ? void 0 : i.full);
      if (!s) throw new Error("réponse Unsplash sans URL d'image exploitable");
      this.cssValue = N(s, e.fit || S), this._onChange();
    } catch (a) {
      if (t !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de récupérer une photo Unsplash (clé invalide, quota dépassé, ou hors-ligne ?)",
        a
      );
    }
  }
  async _loadMediaFolder(e, t, o) {
    try {
      const i = await bt(e, t.path);
      if (o !== this._token) return;
      if (this._images = i, !i.length) {
        console.warn(
          `[echo-home-card] aucune image trouvée dans le dossier Media Source "${t.path}"`
        ), this.cssValue = null, this._onChange();
        return;
      }
      await this._showMediaAt(e, t, o, 0), this._startRotation(e, t, o);
    } catch (i) {
      if (o !== this._token) return;
      console.warn(
        `[echo-home-card] impossible de parcourir le dossier Media Source "${t.path}"`,
        i
      ), this.cssValue = null, this._onChange();
    }
  }
  async _showMediaAt(e, t, o, i) {
    try {
      const a = await vt(e, this._images[i]);
      if (o !== this._token) return;
      this.cssValue = N(a, t.fit || S), this._onChange();
    } catch (a) {
      if (o !== this._token) return;
      console.warn(
        "[echo-home-card] impossible de charger une image du dossier Media Source",
        a
      );
    }
  }
  // Commune à "url" (rotation directe, pas de résolution) et
  // "media_folder" (résolution à chaque image, cf. _showMediaAt) —
  // seulement démarrée si plusieurs images (une source à une seule image
  // n'a pas besoin de minuteur).
  _startRotation(e, t, o) {
    if (this._images.length <= 1) return;
    const i = (t.interval || B) * 1e3;
    this._timer = setInterval(async () => {
      o === this._token && (this._index = (this._index + 1) % this._images.length, t.type === "media_folder" ? await this._showMediaAt(e, t, o, this._index) : (this.cssValue = N(this._images[this._index], t.fit || S), this._onChange()));
    }, i);
  }
  destroy() {
    clearInterval(this._timer), this._timer = null, this._token += 1;
  }
}
const qe = "echo-home-card-clock-face", Oe = new Date(2e3, 0, 27, 12, 59);
class se extends F {
  // Une source par présentation (digital/analogique), chacune avec son
  // propre réglage indépendant (background/analog_background, cf.
  // const.js) — cf. src/background.js. onChange redéclenche un rendu
  // Lit quand une résolution/rotation asynchrone (dossier Media Source,
  // plusieurs URLs) change la valeur CSS courante ; render() n'attend
  // jamais cette résolution, il lit juste le dernier résultat connu
  // (`.cssValue`, synchrone).
  constructor() {
    super(), this._digitalBackground = new Ee(() => this.requestUpdate()), this._analogBackground = new Ee(() => this.requestUpdate());
  }
  // Aucune entité n'est requise : sans rien configurer, la carte reste une
  // horloge plein écran sur fond dégradé — satellite_entity et
  // weather_entity ajoutent respectivement le fond dynamique/mode nuit et
  // le bloc météo, mais rien ne casse en leur absence.
  setConfig(e) {
    const t = {
      ...A,
      ...e,
      icons: { ...A.icons, ...(e == null ? void 0 : e.icons) || {} }
    };
    this._config = this._validateConfig(t, e || {}), this._clockFace === void 0 && (this._clockFace = this._initClockFace());
  }
  // Le choix retenu en localStorage prime sur clock_face (valeur de
  // config, juste un point de départ) — cf. _toggleClockFace.
  _initClockFace() {
    try {
      const e = localStorage.getItem(qe);
      if (e === "digital" || e === "analog") return e;
    } catch {
    }
    return this._config.clock_face;
  }
  _toggleClockFace() {
    this._clockFace = this._clockFace === "analog" ? "digital" : "analog";
    try {
      localStorage.setItem(qe, this._clockFace);
    } catch {
    }
  }
  // Validation légère : avertit dans la console et retombe sur la valeur
  // par défaut plutôt que de casser le rendu — cf. echo-weather-card.
  _validateConfig(e, t) {
    const o = (n, l) => console.warn(
      `[echo-home-card] "${n}" invalide (${JSON.stringify(t[n])}), valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.layout !== null && e.layout !== "round" && (o("layout", A.layout), e.layout = A.layout), ["digital", "analog"].includes(e.clock_face) || (o("clock_face", A.clock_face), e.clock_face = A.clock_face), e.analog_style !== "auto" && !Object.keys(H).includes(e.analog_style) && (o("analog_style", A.analog_style), e.analog_style = A.analog_style), (typeof e.zoom != "number" || !Number.isFinite(e.zoom) || e.zoom <= 0) && (o("zoom", A.zoom), e.zoom = A.zoom), e.dashboard && !e.navigate_device && !e.satellite_entity && console.warn(
      `[echo-home-card] "dashboard" est configuré mais ni "navigate_device" ni "satellite_entity" ne fournissent d'id à passer au service view_assist.navigate — le bloc météo ne sera pas cliquable.`
    );
    const i = (n, l) => console.warn(
      `[echo-home-card] "${n}" invalide, valeur par défaut utilisée (${JSON.stringify(l)})`
    );
    e.background = Ce(
      ze(e.background, !1, "satellite"),
      ["css", ...J],
      "satellite",
      "background",
      i
    );
    let a = Ce(
      ze(
        e.analog_background,
        e.analog_background_photo,
        "style"
      ),
      ["style", "css", ...J],
      "style",
      "analog_background",
      i
    );
    return e.layout === "round" && J.includes(a.type) && (i("analog_background.type", "style"), a = { type: "style" }), e.analog_background = a, e;
  }
  static getStubConfig(e) {
    const t = Object.keys(e.states).find(
      (o) => o.startsWith("weather.")
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
      var o, i;
      ((o = this._config) != null && o.show_clock || (i = this._config) != null && i.show_date) && this.requestUpdate(), this._scheduleClockTick();
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
    var s, c, u, d;
    const e = this.shadowRoot, t = e == null ? void 0 : e.querySelector(".card"), o = this._config;
    if (!t || !o) return;
    const i = o.language || ((c = (s = this._hass) == null ? void 0 : s.locale) == null ? void 0 : c.language) || "en", a = o.time_format || ((d = (u = this._hass) == null ? void 0 : u.locale) == null ? void 0 : d.time_format) || "24", n = t.getBoundingClientRect().width * 0.92, l = {
      ".clock": ae(Oe, i, a),
      ".date": ne(Oe, i)
    };
    for (const [p, f] of Object.entries(l)) {
      const m = e.querySelector(p);
      if (!m) continue;
      const g = m.cloneNode(!1);
      g.textContent = f, g.style.position = "absolute", g.style.visibility = "hidden", g.style.left = "-9999px", g.style.removeProperty("--_fit-scale"), m.parentNode.appendChild(g);
      const w = g.scrollWidth;
      g.remove();
      const y = w > n ? n / w : 1;
      m.style.setProperty("--_fit-scale", y);
    }
  }
  set hass(e) {
    var n, l, s, c;
    const t = (l = this._hass) == null ? void 0 : l.states[(n = this._config) == null ? void 0 : n.satellite_entity], o = (c = this._hass) == null ? void 0 : c.states[(s = this._config) == null ? void 0 : s.weather_entity];
    if (this._hass = e, !this._config) return;
    const i = e.states[this._config.satellite_entity], a = e.states[this._config.weather_entity];
    (t !== i || o !== a) && this.requestUpdate();
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
    const o = [];
    return e != null && o.push(`background:${e}`), this._config.zoom != null && this._config.zoom !== 1 && o.push(`zoom:${this._config.zoom}`), t && o.push(t), o.join(";");
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
    var R, de, he;
    if (!this._config || !this._hass) return h;
    const e = this._config, t = e.satellite_entity ? this._hass.states[e.satellite_entity] : void 0, o = this._isNightMode(t);
    this.classList.toggle("night", o);
    const i = e.language || ((R = this._hass.locale) == null ? void 0 : R.language) || "en", a = e.time_format || ((de = this._hass.locale) == null ? void 0 : de.time_format) || "24", n = /* @__PURE__ */ new Date(), l = e.weather_entity ? this._hass.states[e.weather_entity] : void 0, s = e.layout === "round", c = this._clockFace === "analog", u = {
      isNightMode: o,
      satelliteBackgroundUrl: (he = t == null ? void 0 : t.attributes) == null ? void 0 : he.background
    };
    this._digitalBackground.configure(this._hass, e.background, u), this._analogBackground.configure(this._hass, e.analog_background, u);
    const d = c && !s && !o && J.includes(e.analog_background.type), p = e.show_weather && !o && l && !["unavailable", "unknown"].includes(l.state) && l.attributes.temperature != null, f = p && !c, m = e.show_date && !o, g = c ? d ? this._analogBackground.cssValue : null : this._digitalBackground.cssValue, w = e.analog_style === "auto" ? gt[n.getDay()] : e.analog_style, y = c ? d ? H[Se] : H[w] || H[Se] : null, $ = o && c && !!(y != null && y.night), k = $ ? this._resolveNightStyle(y) : y, D = $ ? k.background : e.analog_background.type === "css" ? e.analog_background.value : y == null ? void 0 : y.background, b = this._cardStyle(
      g,
      y && !d ? `--_analog-default-bg:${D}` : null
    );
    return v`
      <div
        class="card ${s ? "round" : ""} ${c ? "analog" : ""} ${$ ? "custom-night" : ""}"
        style=${b}
      >
        ${!c || d ? v`<div class="shader"></div>` : h}
        ${f ? this._renderWeather(l) : h}
        <div class="clockgroup">
          ${e.show_clock ? c ? v`
                  ${this._renderAnalogComplications(
      k,
      p ? l : null,
      m,
      n,
      i
    )}
                  ${this._renderAnalogClock(n, i, a, k)}
                ` : v`<div class="clock">${ae(n, i, a)}</div>` : h}
          ${m && !c ? v`<div class="date">${ne(n, i)}</div>` : h}
        </div>
        ${o ? h : this._renderClockToggle(c)}
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
  _renderAnalogComplications(e, t, o, i, a) {
    if (!t && !o) return h;
    let n = h;
    if (t) {
      const l = Ae(t.state, this._isDarkOutside()), s = xe(l, this._config.icons), c = Number(t.attributes.temperature).toFixed(1), u = t.attributes.temperature_unit || "°C";
      n = v`
        <div class="analog-weather">
          <img
            class="analog-weather-icon"
            src=${s}
            alt=""
            style="filter:${e.comp.iconFilter || "none"}"
          />
          <span class="analog-weather-temp">${c}${u}</span>
        </div>
      `;
    }
    return v`
      <div
        class="analog-complications"
        style="color:${e.comp.color};opacity:${e.comp.opacity}"
      >
        ${n}
        ${o ? v`<div class="analog-date">${ne(i, a)}</div>` : h}
      </div>
    `;
  }
  // Résout le style à rendre la nuit à partir du bloc `night` d'un style
  // (cf. analog-styles.js) — 3 formes possibles :
  // - { swap: "autreStyle" } : affiche cet autre style tel quel, à pleine
  //   intensité (ex: "ardoise" -> "carbone") — aucun recolorage, c'est le
  //   style visé qui s'applique intégralement.
  // - un concept complet (contient déjà `hour`/`minute`/`second`/...) :
  //   c'est ce bloc lui-même qui sert de style de nuit, indépendant de la
  //   palette de jour (ex: "Aurore Boréale", "Chandelle").
  // - { background, color } : recolorage simple et atténué, cf.
  //   _applyNightPalette.
  _resolveNightStyle(e) {
    var o;
    const t = e.night;
    return t.swap ? (o = H[t.swap]) != null ? o : e : t.hour ? t : this._applyNightPalette(e, t);
  }
  // Recolore un style pour la nuit à partir de son bloc `night` ({
  // background, color }) : mêmes formes/longueurs/épaisseurs que le style
  // de jour (lisibilité, position des aiguilles inchangées), seules les
  // couleurs de tout ce qui se dessine (aiguilles, graduations, chiffres,
  // complications) basculent sur `night.color` — une seule teinte par
  // style, sobre, plutôt que de redéfinir une palette nuit complète par
  // élément. glow désactivé : pas de halo la nuit, la sobriété prime sur
  // l'esthétique (même principe que l'ancien traitement uniforme qu'il
  // remplace pour ces styles).
  _applyNightPalette(e, t) {
    const o = t.color, i = (a) => a && { ...a, color: o };
    return {
      ...e,
      background: t.background,
      glow: !1,
      ticks: i(e.ticks),
      numerals: i(e.numerals),
      hour: i(e.hour),
      minute: i(e.minute),
      second: {
        ...e.second,
        color: o,
        tipDot: e.second.tipDot ? { ...e.second.tipDot, fill: o } : void 0
      },
      center: {
        ...e.center,
        color: o,
        ring: e.center.ring ? { ...e.center.ring, color: o } : void 0
      },
      comp: { ...e.comp, color: o }
    };
  }
  // Cadran analogique en SVG : pensé pour rappeler l'horloge ronde de
  // l'Echo Spot d'origine (avant LineageOS/View Assist), en alternative
  // au digital. Diamètre indépendant de --_clock-size (qui pilote une
  // taille de police, pas un diamètre) — cf. --_analog-size et
  // .card.round.analog .date, qui a donc sa propre position plutôt que
  // de réutiliser le calcul basé sur --_clock-size. Onze habillages
  // possibles (cf. src/analog-styles.js, choisis via `analog_style`, ou
  // "auto" pour un style par jour de la semaine) : mêmes primitives
  // (graduations, chiffres, aiguilles), paramètres différents — sauf la
  // forme des aiguilles, qui varie aussi : "ardoise"/"carbone" en
  // rectangles (_renderRectHands), "atlas" en lame effilée
  // (_renderLeafHands), le reste en traits classiques
  // (_renderLineHands).
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
  _renderAnalogClock(e, t, o, i) {
    var g;
    const a = e.getHours() % 12, n = e.getMinutes(), l = a * 30 + n * 0.5, s = n * 6, c = e.getSeconds() + e.getMilliseconds() / 1e3, u = c * 6, d = `-${c}s`, m = ((g = {
      rect: this._renderRectHands,
      leaf: this._renderLeafHands
    }[i.shape]) != null ? g : this._renderLineHands).bind(this)(i, l, s, u, d);
    return v`
      <svg
        class="analog-clock"
        viewBox="0 0 100 100"
        role="img"
        aria-label=${ae(e, t, o)}
      >
        ${i.glow ? this._renderGlowFilter() : h}
        ${this._renderTicks(i.ticks, i.glow)}
        ${this._renderNumerals(i.numerals)}
        ${m}
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
    return _`
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
  // Graduations : trait fin proche du bord ("line", style "aurore"),
  // point ("dot") ou petit diamant façon pierre facettée ("diamond",
  // style "grenat") — sur les 12 heures ("all"), les 8 non cardinales
  // ("minor", pour laisser la place aux chiffres) ou les 4 cardinales
  // seulement ("cardinal"). `y1s`/`radii`/`opacities` (optionnels, un
  // tableau de 12 valeurs) remplacent la longueur/taille/opacité par
  // position plutôt que le seul binaire cardinal/mineur — pour un rendu
  // irrégulier (rais de lumière, points de taille inégale...) plutôt
  // qu'une couronne parfaitement régulière.
  _renderTicks(e, t) {
    var a, n, l, s, c, u, d, p, f, m, g, w, y;
    if (!e) return h;
    const o = t ? "url(#echo-home-analog-glow)" : void 0, i = [];
    for (let $ = 0; $ < 12; $++) {
      const k = $ % 3 === 0;
      if (e.mode === "minor" && k || e.mode === "cardinal" && !k || (a = e.skip) != null && a.includes($)) continue;
      const D = $ * 30;
      if (e.shape === "line") {
        const b = (l = (n = e.y1s) == null ? void 0 : n[$]) != null ? l : e.y1, x = (c = (s = e.opacities) == null ? void 0 : s[$]) != null ? c : e.opacity;
        i.push(_`
          <line
            class="tick hand"
            x1="50"
            y1=${b}
            x2="50"
            y2=${e.y2}
            stroke=${e.color}
            stroke-width=${e.width}
            opacity=${x}
            filter=${o != null ? o : h}
            transform="rotate(${D} 50 50)"
          />
        `);
      } else if (e.shape === "diamond") {
        const b = this._polar(e.radius, D), x = (d = (u = e.radii) == null ? void 0 : u[$]) != null ? d : k ? e.cardinalR : e.minorR, R = (f = (p = e.opacities) == null ? void 0 : p[$]) != null ? f : k ? e.cardinalOpacity : e.minorOpacity;
        i.push(_`
          <rect
            class="tick hand"
            x=${b.x - x} y=${b.y - x} width=${x * 2} height=${x * 2}
            fill=${e.color} opacity=${R} filter=${o != null ? o : h}
            transform="rotate(45 ${b.x} ${b.y})"
          />
        `);
      } else {
        const b = this._polar(e.radius, D), x = (g = (m = e.radii) == null ? void 0 : m[$]) != null ? g : k ? e.cardinalR : e.minorR, R = (y = (w = e.opacities) == null ? void 0 : w[$]) != null ? y : k ? e.cardinalOpacity : e.minorOpacity;
        i.push(_`
          <circle class="tick hand" cx=${b.x} cy=${b.y} r=${x} fill=${e.color} opacity=${R} filter=${o != null ? o : h} />
        `);
      }
    }
    return _`<g class="ticks">${i}</g>`;
  }
  // Chiffres arabes en "quad" (12/3/6/9, style "aurore") ou "single" (12
  // seulement, style "ardoise"), ou chiffres romains en "all" (les 12
  // heures, style "atlas" — "IIII" plutôt que "IV" à 4h, convention
  // d'horlogerie traditionnelle pour la symétrie visuelle avec "VIII").
  // Même rayon que les graduations à chaque fois — les chiffres doivent
  // être sur le même cercle qu'elles, pas ramenés vers le centre, sinon
  // ils paraissent "flotter" au milieu du cadran au lieu de marquer
  // l'heure à la même distance du bord (corrigé en 1.1.4 pour "aurore",
  // appliqué d'emblée ici aux autres). `cfg.labels` (optionnel) remplace
  // le texte par défaut à chaque position ; `cfg.fontFamily` (optionnel)
  // remplace la police par défaut (utile pour une police serif, style
  // "atlas").
  _renderNumerals(e) {
    var s, c;
    if (!e) return h;
    const t = e.mode === "all" ? 30 : 90, o = e.mode === "single" ? ["12"] : e.mode === "all" ? ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"] : ["12", "3", "6", "9"], i = (s = e.labels) != null ? s : o, a = e.mode === "single" ? [[i[0], 0]] : i.map((u, d) => [u, d * t]), n = (c = e.fontFamily) != null ? c : "inherit", l = a.map(([u, d]) => {
      const p = this._polar(e.radius, d);
      return _`
        <text
          class="numeral hand"
          x=${p.x}
          y=${p.y}
          font-size=${e.size}
          font-weight=${e.weight}
          font-family=${n}
          opacity=${e.opacity}
          fill=${e.color}
          text-anchor="middle"
          dominant-baseline="central"
        >${u}</text>
      `;
    });
    return _`<g class="numerals">${l}</g>`;
  }
  // sin/cos plutôt que des positions écrites en dur pour chaque heure :
  // évite de se tromper de signe pour l'une d'elles (angle depuis midi,
  // sens horaire — x = sin, y = -cos).
  _polar(e, t) {
    const o = t * Math.PI / 180;
    return { x: 50 + e * Math.sin(o), y: 50 - e * Math.cos(o) };
  }
  // Aiguilles "classiques" (tous les styles sauf "ardoise") : un simple
  // trait par aiguille, couleur/épaisseur/forme de bout définies par le
  // style. La seconde peut avoir une petite queue derrière le pivot et un
  // point à la pointe (styles "mono"/"neon").
  _renderLineHands(e, t, o, i, a) {
    const n = e.glow ? "url(#echo-home-analog-glow)" : void 0, l = _`
      <line
        class="hand hand-hour"
        x1="50" y1="50" x2="50" y2=${50 - e.hour.len}
        stroke=${e.hour.color}
        stroke-width=${e.hour.width}
        stroke-linecap=${e.hour.cap}
        filter=${n != null ? n : h}
        transform="rotate(${t} 50 50)"
      />
    `, s = _`
      <line
        class="hand hand-minute"
        x1="50" y1="50" x2="50" y2=${50 - e.minute.len}
        stroke=${e.minute.color}
        stroke-width=${e.minute.width}
        stroke-linecap=${e.minute.cap}
        filter=${n != null ? n : h}
        transform="rotate(${o} 50 50)"
      />
    `, c = e.second, u = c.tipDot ? _`<circle class="hand" cx="50" cy=${50 - c.len} r=${c.tipDot.r} fill=${c.tipDot.fill} filter=${n != null ? n : h} />` : h, d = _`
      <g
        class="hand-second"
        style="animation-delay: ${a}; transform: rotate(${i}deg)"
      >
        <line
          class="hand"
          x1="50" y1=${50 + c.tail} x2="50" y2=${50 - c.len}
          stroke=${c.color}
          stroke-width=${c.width}
          stroke-linecap=${c.cap}
          opacity=${c.opacity}
          filter=${n != null ? n : h}
        />
        ${u}
      </g>
    `, p = e.center, f = p.ring ? _`
          <circle
            class="hand"
            cx="50" cy="50" r=${p.ring.r} fill="none"
            stroke=${p.ring.color} stroke-width=${p.ring.width}
          />
        ` : h;
    return _`
      ${l}${s}${d}
      ${f}
      <circle class="hand" cx="50" cy="50" r=${p.r} fill=${p.color} />
    `;
  }
  // Aiguilles "géométriques" (style "ardoise" uniquement) : des
  // rectangles plutôt que des traits, plus un contrepoids derrière le
  // pivot pour la seconde (elle est animée via le même mécanisme —
  // rotation continue sur le <g> englobant, cf. .hand-second dans static
  // styles, qui s'applique aussi bien à un <line> qu'à un <g>).
  _renderRectHands(e, t, o, i, a) {
    const n = e.hour, l = e.minute, s = e.second, c = e.center;
    return _`
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
        transform="rotate(${o} 50 50)"
      />
      <g
        class="hand-second"
        style="animation-delay: ${a}; transform: rotate(${i}deg)"
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
  // Aiguilles "feuille" (style "atlas" — cadran ancien) : lame effilée
  // (étroite au pivot, large au tiers, étroite à la pointe) plutôt qu'un
  // trait uniforme — silhouette de flamme/lame plutôt qu'un simple trait.
  // Galbe volontairement discret (0.46/1.05, cf. constantes ci-dessous) :
  // une version plus prononcée testée d'abord a été jugée trop
  // excentrique. Trotteuse toujours un simple trait fin.
  _renderLeafHands(e, t, o, i, a) {
    const n = (f, m, g) => {
      const w = 50 - f.len * 0.46, y = f.width * 1.05;
      return _`
        <polygon
          class="hand ${g}"
          points="50,50 ${50 - y},${w} 50,${50 - f.len} ${50 + y},${w}"
          fill=${f.color}
          transform="rotate(${m} 50 50)"
        />
      `;
    }, l = n(e.hour, t, "hand-hour"), s = n(e.minute, o, "hand-minute"), c = e.second, u = c.tipDot ? _`<circle class="hand" cx="50" cy=${50 - c.len} r=${c.tipDot.r} fill=${c.tipDot.fill} />` : h, d = _`
      <g class="hand-second" style="animation-delay: ${a}; transform: rotate(${i}deg)">
        <line class="hand" x1="50" y1=${50 + c.tail} x2="50" y2=${50 - c.len} stroke=${c.color} stroke-width=${c.width} stroke-linecap=${c.cap} opacity=${c.opacity} />
        ${u}
      </g>
    `, p = e.center;
    return _`${l}${s}${d}<circle class="hand" cx="50" cy="50" r=${p.r} fill=${p.color} />`;
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
    const t = e ? "mdi:clock-digital" : "mdi:clock-outline", o = e ? "Afficher l'horloge digitale" : "Afficher l'horloge analogique";
    return v`
      <button
        type="button"
        class="clock-toggle"
        aria-label=${o}
        title=${o}
        @click=${() => this._toggleClockFace()}
      >
        <ha-icon icon=${t}></ha-icon>
      </button>
    `;
  }
  _renderWeather(e) {
    const t = Ae(e.state, this._isDarkOutside()), o = xe(t, this._config.icons), i = Number(e.attributes.temperature).toFixed(1), a = e.attributes.temperature_unit || "°C", n = mt(this._hass, e.state), l = this._weatherClickable();
    return v`
      <div
        class="weather ${l ? "clickable" : ""}"
        role=${l ? "button" : h}
        tabindex=${l ? "0" : h}
        aria-label="${n}, ${i}${a}"
        @click=${l ? () => this._navigateToWeather() : h}
        @keydown=${l ? (s) => this._onWeatherKeydown(s) : h}
      >
        <img class="weather-icon" src=${o} alt="" />
        <span class="weather-temp">${i}${a}</span>
      </div>
    `;
  }
}
Q(se, "properties", {
  _config: { state: !0 },
  _clockFace: { state: !0 }
}), Q(se, "styles", Je`
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
       qui définissent leur propre bloc "night" (cf. analog-styles.js,
       3 formes possibles : recolorage simple, bascule vers un autre
       style, ou concept complet) : ceux-là portent la classe
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
       attributs SVG par _renderLineHands/_renderRectHands/_renderLeafHands/
       _renderTicks/_renderNumerals, pas ici : contrairement
       à la version à un seul style (< 1.2.0), il n'y a plus de couleur
       "currentColor" commune à surcharger. Styles avec leur propre nuit
       ("custom-night") : ni l'opacité ni la couleur ne sont forcées ici —
       l'appareil baisse déjà la luminosité tout seul la nuit, donc ces
       nuits restent volontairement "vibrantes" (pleine opacité, propres
       couleurs) plutôt que doublement atténuées. Pour les styles SANS
       bloc "night" (mono/clair/neon), .hand regroupe toutes les
       aiguilles/graduations/chiffres et retombe uniformément sur le rouge
       très atténué habituel, comme avant. */
    :host(.night) .card.analog:not(.custom-night) .analog-clock {
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
customElements.define(Ve, se);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Ve,
  name: "Echo Home Card",
  description: "Écran d'accueil horloge + météo compacte pour smart displays (Echo Show 5, View Assist)."
});
