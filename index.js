/* global IntersectionObserver */

/**
 * Starts an intersectionObserver applied to an array of elements.
 * Sets following `data-*` attributes (customisable) on each target:
 * `data-in-viewport-direction` from-above/from-below
 * `data-in-viewport-position` above/below/intersecting if a threshold % of the target is in viewport
 *
 * @name inViewport
 * @type {Object}
 */
const inViewport = (params) => {
  const {
    $elements,
    observerOptions,
    startCallback,
    inCallback,
    outCallback,
    endCallback,
    dataDir,
    dataPos,
    txtInter,
    txtAbove,
    txtBelow,
  } = params;

  if (!$elements) return; // halt silently

  // sets custom/default data names
  const _dataDir = (dataDir)? dataDir : 'data-in-viewport-direction';
  const _dataPos = (dataPos)? dataPos : 'data-in-viewport-position';

  // sets custom/default data values
  const _txtInter = (txtInter)? txtInter : 'intersecting';
  const _txtAbove = (txtAbove)? txtAbove : 'above';
  const _txtBelow = (txtBelow)? txtBelow : 'below';

  // checks for valid callback function to apply
  const noop = () => {};
  const applyFunction = cb => ((cb && (cb instanceof Function)) ? cb : noop);

  const startHook = (entry) => {
    applyFunction(startCallback)(entry);
  };

  const setDirection = (entry) => {
    if (!entry.isIntersecting) {
      entry.target.removeAttribute(_dataDir);
    } else {
      let direction = entry.target.getAttribute(_dataPos);
      if(direction && direction !== _txtInter) {
        entry.target.setAttribute(_dataDir, `from-${direction}`);
      } else { // default onload value
        entry.target.setAttribute(_dataDir, `from-${_txtBelow}`);
      }
    }
  };

  const setPosition = (entry) => {
    let position;
    if (!entry.isIntersecting) {
      if (entry.boundingClientRect.top < 0) {
        position = _txtAbove;
      } else if (entry.boundingClientRect.top > 0) {
        position = _txtBelow;
      }
    } else {
      position = _txtInter;
    }

    entry.target.setAttribute(_dataPos, position);
  };

  const updateIntersection = (entry) => {
    if (entry.isIntersecting) {
      inHook(entry);
    } else {
      outHook(entry);
    }
  };

  const inHook = (entry) => {
    applyFunction(inCallback)(entry);
  };

  const outHook = (entry) => {
    applyFunction(outCallback)(entry);
  };

  const endHook = (entry) => {
    applyFunction(endCallback)(entry);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.map((entry) => {
      // optional start callback
      startHook(entry);

      // set direction
      setDirection(entry);

      // set position
      setPosition(entry);

      // Check for detection type
      updateIntersection(entry);

      // optional end callback
      endHook(entry);

      return true;
    });
  }, observerOptions);

  Array.from($elements).map(($element) => {
    if ($element) {
      observer.observe($element);
    }

    return true;
  });
};

export default inViewport;
