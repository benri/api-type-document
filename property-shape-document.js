import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@advanced-rest-client/markdown-styles/markdown-styles.js';
import '@polymer/marked-element/marked-element.js';
import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import {PropertyDocumentMixin} from './property-document-mixin.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import './api-type-document.js';
import './property-range-document.js';
/**
 * `property-shape-document`
 *
 * Renders a documentation for a shape property of AMF model.
 *
 * ## Styling
 *
 * `<property-shape-document>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--property-shape-document` | Mixin applied to this elment | `{}`
 * `--property-shape-document-array-color` | Property border color when type is an array | `#8BC34A`
 * `--property-shape-document-object-color` | Property border color when type is an object | `#FF9800`
 * `--property-shape-document-union-color` | Property border color when type is an union | `#FFEB3B`
 * `--arc-font-subhead` | Theme mixin, applied to the property title | `{}`
 * `--property-shape-document-title` | Mixin applied to the property title | `{}`
 * `--api-type-document-property-parent-color` | Color of the parent property label | `#757575`
 * `--api-type-document-property-color` | Color of the property name label when display name is used | `#757575`
 * `--api-type-document-child-docs-margin-left` | Margin left of item's properties description relative to the title when the item is a child of another property | `24px`
 * `--api-type-document-type-color` | Color of the "type" trait | `white`
 * `--api-type-document-type-background-color` | Background color of the "type" trait | `#2196F3`
 * `--api-type-document-trait-background-color` | Background color to main range trait (type name) | `#EEEEEE`,
 * `--api-type-document-trait-border-radius` | Border radious of a main property traits | `3px`
 * `--api-type-document-property-name-width` | Width of the left hand side column with property name | `240px`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin PropertyDocumentMixin
 * @appliesMixin AmfHelperMixin
 */
class PropertyShapeDocument extends
  AmfHelperMixin(PropertyDocumentMixin(PolymerElement)) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style>
    :host {
      display: block;
      border-bottom: 1px var(--property-shape-document-border-bottom-color, #CFD8DC) var(--property-shape-document-border-bottom-style, dashed);
      @apply --property-shape-document;
    }

    :host(:last-of-type) {
      border-bottom: none;
    }

    [hidden] {
      display: none !important;
    }

    .property-title {
      @apply --arc-font-subhead;
      margin: 4px 0 4px 0;
      font-size: 15px;
      font-weight: var(--api-type-document-property-title-font-weight, 500);
      word-break: break-word;
      color: var(--api-type-document-property-title-color);
      @apply --property-shape-document-title;
    }

    .property-title[secondary] {
      font-weight: var(--api-type-document-property-title-secondary-font-weight, 400);
      color: var(--api-type-document-property-title-secondary-color, #616161);
    }

    .parent-label {
      color: var(--api-type-document-property-parent-color, #757575);
    }

    .property-display-name {
      font-weight: var(--api-type-document-property-name-font-weight, 500);
      color: var(--api-type-document-property-name-color, var(--api-type-document-property-color, #212121));
      margin: 4px 0 4px 0;
      font-size: var(--api-type-document-property-name-font-size, 16px);
    }

    .doc-wrapper {
      transition: background-color 0.4s linear;
    }

    :host([is-object]) .doc-wrapper.complex,
    :host([is-union]) .doc-wrapper.complex,
    :host([is-array]) .doc-wrapper.complex {
      padding-left: var(--api-type-document-child-docs-padding-left, 20px);
      margin-left: var(--api-type-document-child-docs-margin-left, 4px);
      margin-top: 12px;
      @apply --api-type-document-property-complex-wrapper;
    }

    :host([is-object]) .doc-wrapper {
      border-left: 2px var(--property-shape-document-object-color, #FF9800) solid;
      padding-left: 12px;
    }

    :host([is-array]) .doc-wrapper {
      border-left: 2px var(--property-shape-document-array-color, #8BC34A) solid;
      padding-left: 12px;
    }

    :host([is-union]) .doc-wrapper {
      border-left: 2px var(--property-shape-document-union-color, #FFEB3B) solid;
      padding-left: 12px;
    }

    .property-traits {
      @apply --layout-horizontal;
      @apply --layout-wrap;
    }

    .property-traits > span {
      display: inline-block;
      margin-right: 8px;
      padding: var(--api-type-document-trait-padding, 2px 4px);
      background-color: var(--api-type-document-trait-background-color, #EEEEEE);
      color: var(--api-type-document-trait-color, #616161);
      border-radius: var(--api-type-document-trait-border-radius, 3px);
      font-size: 13px;
    }

    .property-traits > span.data-type {
      background-color: var(--api-type-document-type-background-color, #2196F3);
      color: var(--api-type-document-type-color, white);
      padding: var(--api-type-document-trait-data-type-padding, 2px 4px);
    }

    :host([narrow]) .property-description {
      margin: 20px 0;
    }

    .content-wrapper {
      @apply --layout-horizontal;
    }

    .shape-properties {
      min-width: var(--api-type-document-property-name-width, 120px);
    }

    .shape-docs {
      @apply --layout-flex;
      word-break: break-word;
      overflow: hidden;
    }

    .shape-docs .doc-wrapper {
      border-left: none !important;
      padding-left: 0 !important;
    }

    :host([narrow]) .content-wrapper {
      display: block;
      -ms-flex-direction: initial;
      -webkit-flex-direction: initial;
      flex-direction: initial;
    }

    :host([narrow]) .shape-docs {
      -ms-flex: initial;
      -webkit-flex: initial;
      flex: initial;
      -webkit-flex-basis: initial;
      flex-basis: initial;
    }

    :host([narrow]) .shape-properties {
      min-width: 100%;
    }

    :host([narrow]) .shape-properties > * {
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
    </style>
    <template is="dom-if" if="[[hasDisplayName]]">
      <div class="property-display-name">[[displayName]]</div>
    </template>
    <template is="dom-if" if="[[propertyName]]">
      <h4 class="property-title" secondary\$="[[hasDisplayName]]">
        <span class="parent-label" hidden\$="[[!hasParentTypeName]]">[[parentTypeName]].</span>
        <span class="property-name">[[propertyName]]</span>
      </h4>
    </template>
    <div class="content-wrapper">
      <div class="shape-properties">
        <div class="property-traits">
          <span class="data-type">[[propertyDataType]]</span>
          <template is="dom-if" if="[[isRequired]]">
            <span class="required-type" title="This property is required by the API">Required</span>
          </template>
          <template is="dom-if" if="[[isEnum]]">
            <span class="enym-type" title="This property represent enumerable value">Enum</span>
          </template>
        </div>
      </div>
      <div class="shape-docs">
        <template is="dom-if" if="[[hasPropertyDescription]]">
          <div class="property-description">
            <marked-element markdown="[[propertyDescription]]">
              <div slot="markdown-html" class="markdown-body"></div>
            </marked-element>
          </div>
        </template>
        <div class="doc-wrapper">
          <div class="doc-content">
            <property-range-document amf-model="[[amfModel]]" shape="[[shape]]" range="[[range]]" no-examples-actions="[[noExamplesActions]]" media-type="[[mediaType]]" property-name="[[propertyName]]"></property-range-document>
          </div>
        </div>
      </div>
    </div>
    <template is="dom-if" if="[[isComplex]]">
      <div class="doc-wrapper complex">
        <div class="doc-content">
          <template is="dom-if" if="[[isArray]]">
            <api-type-document class="children" amf-model="[[amfModel]]" type="[[_resolve(range)]]" parent-type-name="item" narrow="[[narrow]]" no-examples-actions="[[noExamplesActions]]" no-main-example="" media-type="[[mediaType]]"></api-type-document>
          </template>
          <template is="dom-if" if="[[isObject]]">
            <api-type-document class="children" amf-model="[[amfModel]]" type="[[_resolve(range)]]" parent-type-name="[[displayName]]" narrow="[[narrow]]" no-examples-actions="[[noExamplesActions]]" no-main-example="" media-type="[[mediaType]]"></api-type-document>
          </template>
          <template is="dom-if" if="[[isUnion]]">
            <api-type-document class="children" amf-model="[[amfModel]]" type="[[_resolve(range)]]" parent-type-name="[[displayName]]" narrow="[[narrow]]" no-examples-actions="[[noExamplesActions]]" no-main-example="" media-type="[[mediaType]]"></api-type-document>
          </template>
        </div>
      </div>
    </template>
`;
  }

  static get is() {
    return 'property-shape-document';
  }
  static get properties() {
    return {
      /**
       * Computed value of shape's http://raml.org/vocabularies/shapes#range
       * @type {Object}
       */
      range: {
        type: Object,
        computed: '_computeRange(shape, amfModel.*)'
      },
      /**
       * Computed value of "display name" of the property
       */
      displayName: {
        type: String,
        computed: '_computeDisplayName(range, shape)'
      },
      /**
       * A type property name.
       * This may be different from `displayName` property if
       * `displayName` was specified in the API spec for this property.
       */
      propertyName: {
        type: String,
        computed: '_computePropertyName(range, shape)'
      },
      /**
       * Computed value, true if `displayName` has been defined for this
       * property.
       */
      hasDisplayName: {
        type: Boolean,
        computed: '_computeHasDisplayName(displayName, propertyName)',
        value: false
      },
      /**
       * Computed value, true if current property is an union.
       */
      isUnion: {
        type: Boolean,
        computed: '_computeIsUnion(range)',
        reflectToAttribute: true
      },
      /**
       * Computed value, true if current property is an object.
       */
      isObject: {
        type: Boolean,
        computed: '_computeIsObject(range)',
        reflectToAttribute: true
      },
      /**
       * Computed value, true if current property is an array.
       */
      isArray: {
        type: Boolean,
        computed: '_computeIsArray(range)',
        reflectToAttribute: true
      },
      /**
       * Computed value, true if this propery contains a complex
       * structure. It is computed when the property is and array,
       * object, or union.
       */
      isComplex: {
        type: Boolean,
        computed: '_computeIsComplex(isUnion, isObject, isArray)',
      },
      /**
       * Should be set if described properties has a parent type.
       * This is used when recursively iterating over properties.
       */
      parentTypeName: String,
      /**
       * Computed value, true if `parentTypeName` has a value.
       */
      hasParentTypeName: {
        value: false,
        computed: '_computeHasParentTypeName(parentTypeName)',
        type: Boolean
      },
      /**
       * Computed value of shape data type
       * @type {Object}
       */
      propertyDataType: {
        type: String,
        computed: '_computeType(range, shape)'
      },
      /**
       * Computed value form the shape. True if the property is required.
       */
      isRequired: {
        type: Boolean,
        computed: '_computeIsRequired(shape)'
      },
      /**
       * Computed value form the shape. True if the property is ENUM.
       */
      isEnum: {
        type: Boolean,
        computed: '_computeIsEnum(range)'
      },
      /**
       * A description of the property to render.
       */
      propertyDescription: {
        type: String,
        computed: '_computeDescription(range)'
      },
      /**
       * Computed value, true if desceription is set.
       */
      hasPropertyDescription: {
        type: Boolean,
        value: false,
        computed: '_computeHasStringValue(propertyDescription)'
      },
      /**
       * A property to set when the component is rendered in the narrow
       * view. To be used with mobile rendering or when the
       * components occupies only small part of the screen.
       */
      narrow: {
        type: Boolean,
        reflectToAttribute: true
      },
      /**
       * When set it removes actions bar from the examples render.
       */
      noExamplesActions: Boolean
    };
  }
  _computeType(range, shape) {
    let type = range && this._computeRangeDataType(this._resolve(range));
    if (!type) {
      type = shape && this._computeRangeDataType(this._resolve(shape));
    }
    return type;
  }
  /**
   * Computes name of the property. This may be different from the
   * `displayName` if `displayName` is set in API spec.
   *
   * @param {Object} range Range object of current shape.
   * @param {Object} shape The shape object
   * @return {String} Display name of the property
   */
  _computePropertyName(range, shape) {
    if (!shape && !range) {
      return;
    }
    if (shape) {
      shape = this._resolve(shape);
      if (this._hasType(shape, this.ns.raml.vocabularies.http + 'Parameter')) {
        return this._getValue(shape, this.ns.schema.schemaName);
      }
      if (this._hasType(shape, this.ns.w3.shacl.name + 'PropertyShape') ||
        this._hasType(shape, this.ns.raml.vocabularies.shapes + 'NilShape') ||
        this._hasType(shape, this.ns.raml.vocabularies.shapes + 'AnyShape')) {
        return this._getValue(shape, this.ns.w3.shacl.name + 'name');
      }
    }
    if (range) {
      range = this._resolve(range);
      const name = this._getValue(range, this.ns.w3.shacl.name + 'name');
      if (name === 'items' &&
      this._hasType(shape, this.ns.raml.vocabularies.shapes + 'ScalarShape')) {
        return;
      }
      return name;
    }
  }
  /**
   * Computes value for `hasDisplayName` property.
   * Indicates that `displayName` has been defined in the API specification.
   *
   * @param {String} displayName
   * @param {String} propertyName
   * @return {Boolean}
   */
  _computeHasDisplayName(displayName, propertyName) {
    return !!(displayName) && displayName !== propertyName;
  }
  /**
   * Computes value for `hasParentTypeName`.
   * @param {String?} parentTypeName
   * @return {Boolean}
   */
  _computeHasParentTypeName(parentTypeName) {
    return !!parentTypeName;
  }
  /**
   * Computes value for `isRequired` property.
   * In AMF model a property is required when `http://www.w3.org/ns/shacl#minCount`
   * does not equal `0`.
   *
   * @param {Object} shape Current shape object
   * @return {Boolean}
   */
  _computeIsRequired(shape) {
    if (!shape) {
      return false;
    }
    shape = this._resolve(shape);
    if (this._hasType(shape, this.ns.raml.vocabularies.http + 'Parameter')) {
      return this._getValue(shape, this.ns.w3.hydra.core + 'required');
    }
    const data = this._getValue(shape, this.ns.w3.shacl.name + 'minCount');
    return data !== undefined && data !== 0;
  }
  /**
   * Computes value `isEnum` property.
   * @param {Object} range Current `range` object.
   * @return {Boolean} Curently it always returns `false`
   */
  _computeIsEnum(range) {
    const ikey = this._getAmfKey(this.ns.w3.shacl.name + 'in');
    return !!(range && (ikey in range));
  }
  /**
   * Computes value for `propertyDescription`.
   * @param {Object} range Range model
   * @return {String} Description to render.
   */
  _computeDescription(range) {
    if (!range) {
      return;
    }
    return this._getValue(range, this.ns.schema.desc);
  }
  /**
   * Computes value for `isComplex` property.
   * @param {Boolean} isUnion
   * @param {Boolean} isObject
   * @param {Boolean} isArray
   * @return {Boolean}
   */
  _computeIsComplex(isUnion, isObject, isArray) {
    return isUnion || isObject || isArray;
  }
}
window.customElements.define(PropertyShapeDocument.is, PropertyShapeDocument);
