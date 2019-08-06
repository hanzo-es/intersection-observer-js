
# intersection-observer-js

Plain vanilla JS IntersectionObserver utility, to be used as a mixin. 

## Installation

$ npm install intersection-observer-js

## Basic Usage

You just need to import the utility and then instantiate it with an object:

```js
import inViewport from 'intersection-observer-js';

const sections = document.querySelectorAll(".section");
inViewport({
  $elements: sections,
});
```

A more complex example would be using special callback and data attribute (see below for API):

```js
import inViewport from 'intersection-observer-js';

const sections = document.querySelectorAll(".section");
inViewport({
  $elements: sections,
  inCallback: (entry) => {
    console.log('intersection crossed at', entry.intersectionRatio);
  },
  dataPos: 'data-intersection-state',
});
```

## Attributes

Object being passed to `inViewport` has the following attributes. 

### $elements

A Nodelist of elements must be provided. These are the elements being observed.

```javascript
@type {Nodelist}
@required
```

### observerOptions

The options object passed into the IntersectionObserver() constructor, as per [API definition](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). If not specified it takes the defaults.

```javascript
@type {Object}
```

### startCallback

Optional callback to be run at the `startHook` (beginning of an intersection change).

```javascript
@type {Function}
```

### inCallback

Optional callback to be run at the `inHook` (intersection entry).

```javascript
@type {Function}
```

### outCallback

Optional callback to be run at the `outHook` (intersection exit).

```javascript
@type {Function}
```

### endCallback

Optional callback to be run at the `endHook` (end of an intersection change).

```javascript
@type {Function}
```

### dataPos

Optional string being used to store the position changes.

```javascript
@type {String}
@default 'data-in-viewport-position'
```

### txtInter

Optional string being used as the position value when `entry.isIntersecting`.

```javascript
@type {String}
@default 'intersecting'
```

### txtAbove

Optional string being used as the position value when element being observed is above the definded intersection.

```javascript
@type {String}
@default 'above'
```

### txtBelow

Optional string being used as the position value when element being observed is below the definded intersection.

```javascript
@type {String}
@default 'below'
```

### dataDir

Optional string being used to store the direction changes.

```javascript
@type {String}
@default 'data-in-viewport-direction'
```

Please note this data attribute is only being set when `entry.isIntersecting`, and value is built prepending `from-` string to either `txtAbove` or `txtBelow`. 

## Events execution order

The order of execution of default and hooked events is as follows:

- `startHook`
- Internal update of direction data attribute
- Internal update of position data attribute
- `inHook` / `outHook`
- `endHook`

## License

MIT