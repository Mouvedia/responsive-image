# Responsive Image Component

## Examples

### vanilla javascript

~~~xml
<responsive-image name="foo" ratio='{ "mdpi":"@1x", "hdpi": true }' text="alt attribute value"></responsive-image>
~~~

### React

~~~jsx

~~~

### Vue

~~~xml
<responsive-image name="foo" :ratio="{ mdpi:'@1x', hdpi: true }" text="alt attribute value"></responsive-image>
~~~

### Angular

~~~xml
<responsive-image name="foo" [ratio]="{ mdpi:'@1x', hdpi: true }" text="alt attribute value"></responsive-image>
~~~

### Ember

~~~jsx

~~~

## Properties

| Property | Type | Default |
| -------- | ---- | ------- |
| `extensions`        | `string[]` | `['webp','jxr','jp2','png']` |
| `name`&nbsp;<sup>_(required)_</sup> | `string`   |  |
| `path`              | `{ [qualifier: BINS]: string } \| string` | `''` |
| `ratio`             | `{ [qualifier: BINS]: string \| boolean }` | `{ ldpi: false, mdpi: '', tvdpi: false, hdpi: false, xhdpi: true, xxhdpi: true, xxxhdpi: true }` |
| `text`              | `string` | `''` |
| `whitelist`         | `string[]` | `['gif', 'png', 'webp', 'jpeg', 'jpg', 'jp2', 'jpg2', 'jpx', 'jpm', 'jxr', 'svg', 'svgz', 'avif', 'heif']` |

~~~ts
type BINS = 'ldpi' | 'mdpi' | 'tvdpi' | 'hdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';
~~~

----------------------------------------------
