import { j as jsxRuntimeExports, r as reactExports, R as React2, d as React, e as useInternetIdentity, b as useNavigate, u as ue } from "./index-D0yZ9B68.js";
import { h as useIsAdmin, u as useProjects, i as useSubmissions, b as useTestimonials, j as useBlogPosts, k as useAddProject, l as useUpdateProject, m as useDeleteProject, S as Skeleton, n as useDeleteSubmission, B as Badge, o as useAddTestimonial, p as useUpdateTestimonial, q as useDeleteTestimonial, r as useFeatureTestimonial, s as useAddBlogPost, t as useUpdateBlogPost, v as useDeleteBlogPost, w as useFeatureBlogPost } from "./useBackend-CzoG8yy-.js";
import { c as cn, a as createSlot$1, b as composeRefs, u as useComposedRefs, B as Button, m as motion } from "./proxy-BcgAcmJN.js";
import { u as useForm } from "./index.esm-D49b5EuF.js";
import { Q as Quote, S as Star } from "./star-51PYhvQz.js";
import { B as BookOpen } from "./book-open-BC0noi5b.js";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES$1 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive$1 = NODES$1.reduce((primitive, node) => {
  const Slot = createSlot$1(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive$1.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root$1 = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler == null ? void 0 : originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler == null ? void 0 : ourEventHandler(event);
    }
  };
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef$1(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$1(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React2.useRef(null);
    const itemMap = React2.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = /* @__PURE__ */ createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = /* @__PURE__ */ createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React2.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React2.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React2.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var useLayoutEffect2 = (globalThis == null ? void 0 : globalThis.document) ? reactExports.useLayoutEffect : () => {
};
var useReactId = React[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = reactExports.useState(useReactId());
  useLayoutEffect2(() => {
    setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function useCallbackRef(callback) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useEffect(() => {
    callbackRef.current = callback;
  });
  return reactExports.useMemo(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}
var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = reactExports.useRef(prop !== void 0);
    reactExports.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = reactExports.useCallback(
    (nextValue) => {
      var _a;
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = reactExports.useState(defaultProp);
  const prevValueRef = reactExports.useRef(value);
  const onChangeRef = reactExports.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  reactExports.useEffect(() => {
    var _a;
    if (prevValueRef.current !== value) {
      (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function ProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues ?? {
      title: "",
      category: "",
      description: "",
      techStack: "",
      imageUrl: ""
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "title",
            className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
            children: "Title"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "title",
            "data-ocid": "project_form.title_input",
            placeholder: "Project name",
            className: "bg-muted border-border/60 focus:border-primary h-9",
            ...register("title", { required: true })
          }
        ),
        errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "project_form.title_field_error",
            className: "text-xs text-destructive",
            children: "Required"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "category",
            className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
            children: "Category"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "category",
            "data-ocid": "project_form.category_input",
            placeholder: "e.g. Web App, Platform",
            className: "bg-muted border-border/60 focus:border-primary h-9",
            ...register("category", { required: true })
          }
        ),
        errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "project_form.category_field_error",
            className: "text-xs text-destructive",
            children: "Required"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "description",
          className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
          children: "Description"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "description",
          "data-ocid": "project_form.description_textarea",
          placeholder: "Brief project overview...",
          rows: 3,
          className: "bg-muted border-border/60 focus:border-primary resize-none",
          ...register("description", { required: true })
        }
      ),
      errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          "data-ocid": "project_form.description_field_error",
          className: "text-xs text-destructive",
          children: "Required"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "techStack",
            className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
            children: "Tech Stack"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "techStack",
            "data-ocid": "project_form.techstack_input",
            placeholder: "React, Laravel, PostgreSQL",
            className: "bg-muted border-border/60 focus:border-primary h-9",
            ...register("techStack", { required: true })
          }
        ),
        errors.techStack && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "project_form.techstack_field_error",
            className: "text-xs text-destructive",
            children: "Required"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "imageUrl",
            className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
            children: "Image URL"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "imageUrl",
            "data-ocid": "project_form.imageurl_input",
            placeholder: "https://...",
            className: "bg-muted border-border/60 focus:border-primary h-9",
            ...register("imageUrl")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          "data-ocid": "project_form.submit_button",
          disabled: isLoading,
          size: "sm",
          className: "glow-neon font-display font-semibold",
          children: isLoading ? "Saving..." : submitLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          "data-ocid": "project_form.cancel_button",
          onClick: onCancel,
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground hover:text-foreground",
          children: "Cancel"
        }
      )
    ] })
  ] });
}
function ProjectRow({
  project,
  index,
  onEdit,
  onDelete,
  isDeleting
}) {
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.05 },
      className: "flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group",
      "data-ocid": `projects.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border/30", children: project.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: project.imageUrl,
            alt: project.title,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.target.src = "/assets/images/placeholder.svg";
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            className: "text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "9", r: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15l-5-5L5 21" })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground truncate", children: project.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs flex-shrink-0 font-body",
                children: project.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mb-2", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            project.techStack.slice(0, 4).map((tech) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono",
                children: tech
              },
              tech
            )),
            project.techStack.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground", children: [
              "+",
              project.techStack.length - 4
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-body", children: "Delete?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `projects.confirm_button.${index + 1}`,
              size: "sm",
              variant: "destructive",
              className: "h-7 text-xs",
              disabled: isDeleting,
              onClick: () => {
                onDelete(project.id);
                setConfirmDelete(false);
              },
              children: "Yes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `projects.cancel_button.${index + 1}`,
              size: "sm",
              variant: "ghost",
              className: "h-7 text-xs",
              onClick: () => setConfirmDelete(false),
              children: "No"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `projects.edit_button.${index + 1}`,
              size: "sm",
              variant: "ghost",
              className: "h-7 text-xs opacity-0 group-hover:opacity-100 transition-smooth",
              onClick: () => onEdit(project),
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `projects.delete_button.${index + 1}`,
              size: "sm",
              variant: "ghost",
              className: "h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth",
              onClick: () => setConfirmDelete(true),
              children: "Delete"
            }
          )
        ] }) })
      ]
    }
  );
}
function ProjectsTab() {
  const { data: projects = [], isLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [mode, setMode] = reactExports.useState("idle");
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const handleAdd = async (data) => {
    try {
      await addProject.mutateAsync(data);
      ue.success("Project added successfully");
      setMode("idle");
    } catch {
      ue.error("Failed to add project");
    }
  };
  const handleEdit = async (data) => {
    if (!editTarget) return;
    try {
      await updateProject.mutateAsync({ id: editTarget.id, data });
      ue.success("Project updated");
      setMode("idle");
      setEditTarget(null);
    } catch {
      ue.error("Failed to update project");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteProject.mutateAsync(id);
      ue.success("Project deleted");
    } catch {
      ue.error("Failed to delete project");
    }
  };
  const startEdit = (p) => {
    setEditTarget(p);
    setMode("edit");
  };
  const editDefaults = editTarget ? {
    title: editTarget.title,
    category: editTarget.category,
    description: editTarget.description,
    techStack: editTarget.techStack.join(", "),
    imageUrl: editTarget.imageUrl
  } : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        projects.length,
        " project",
        projects.length !== 1 ? "s" : "",
        " total"
      ] }),
      mode === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          "data-ocid": "projects.open_modal_button",
          size: "sm",
          onClick: () => setMode("add"),
          className: "glow-neon font-display font-semibold text-xs h-8",
          children: "+ Add New Project"
        }
      )
    ] }),
    mode === "add" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "p-5 rounded-xl border border-primary/30 bg-card/80",
        "data-ocid": "projects.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-4 text-gradient-forge", children: "New Project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProjectForm,
            {
              onSubmit: handleAdd,
              onCancel: () => setMode("idle"),
              isLoading: addProject.isPending,
              submitLabel: "Add Project"
            }
          )
        ]
      }
    ),
    mode === "edit" && editDefaults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "p-5 rounded-xl border border-secondary/30 bg-card/80",
        "data-ocid": "projects.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm mb-4 text-secondary", children: [
            "Edit: ",
            editTarget == null ? void 0 : editTarget.title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProjectForm,
            {
              defaultValues: editDefaults,
              onSubmit: handleEdit,
              onCancel: () => {
                setMode("idle");
                setEditTarget(null);
              },
              isLoading: updateProject.isPending,
              submitLabel: "Save Changes"
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, k)) }) : projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "projects.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "aria-hidden": "true",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              className: "text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 21h8M12 17v4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground mb-1", children: "No projects yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Add your first portfolio project to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: () => setMode("add"),
              className: "glow-neon font-display font-semibold text-xs",
              children: "+ Add Project"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectRow,
      {
        project: p,
        index: i,
        onEdit: startEdit,
        onDelete: handleDelete,
        isDeleting: deleteProject.isPending
      },
      p.id.toString()
    )) })
  ] });
}
function SubmissionsTab() {
  const { data: submissions = [], isLoading } = useSubmissions();
  const deleteSubmission = useDeleteSubmission();
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const handleDelete = async (id) => {
    try {
      await deleteSubmission.mutateAsync(id);
      ue.success("Submission deleted");
      setConfirmId(null);
    } catch {
      ue.error("Failed to delete submission");
    }
  };
  const formatDate = (ts) => {
    const ms = Number(ts) / 1e6;
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, k)) });
  }
  if (submissions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "submissions.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              "aria-hidden": "true",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              className: "text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground mb-1", children: "No submissions yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Contact form submissions will appear here" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: submissions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: i * 0.05 },
      className: "p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group",
      "data-ocid": `submissions.item.${i + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm bg-secondary/15 text-secondary ring-1 ring-secondary/30", children: s.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-body ml-auto border-secondary/40 text-secondary",
                children: s.service
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-2", children: s.projectDetails }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60", children: formatDate(s.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 flex items-center gap-2", children: confirmId === s.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "Delete?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `submissions.confirm_button.${i + 1}`,
              size: "sm",
              variant: "destructive",
              className: "h-7 text-xs",
              disabled: deleteSubmission.isPending,
              onClick: () => handleDelete(s.id),
              children: "Yes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `submissions.cancel_button.${i + 1}`,
              size: "sm",
              variant: "ghost",
              className: "h-7 text-xs",
              onClick: () => setConfirmId(null),
              children: "No"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": `submissions.delete_button.${i + 1}`,
            size: "sm",
            variant: "ghost",
            className: "h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth",
            onClick: () => setConfirmId(s.id),
            children: "Delete"
          }
        ) })
      ] })
    },
    s.id.toString()
  )) });
}
function StarRatingDisplay({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 star-rating", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-3 h-3 ${i < rating ? "fill-current" : "opacity-25"}`
    },
    `star-pos-${i}`
  )) });
}
function TestimonialsTab() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const { data: projects = [] } = useProjects();
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const featureTestimonial = useFeatureTestimonial();
  const [mode, setMode] = reactExports.useState("idle");
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      clientName: "",
      clientTitle: "",
      company: "",
      quote: "",
      rating: "5",
      imageUrl: "",
      projectId: "",
      tags: "",
      featured: false
    }
  });
  const openAdd = () => {
    reset({
      clientName: "",
      clientTitle: "",
      company: "",
      quote: "",
      rating: "5",
      imageUrl: "",
      projectId: "",
      tags: "",
      featured: false
    });
    setEditTarget(null);
    setMode("add");
  };
  const openEdit = (t) => {
    setEditTarget(t);
    reset({
      clientName: t.clientName,
      clientTitle: t.clientTitle,
      company: t.company,
      quote: t.quote,
      rating: t.rating.toString(),
      imageUrl: t.imageUrl,
      projectId: t.projectId ? t.projectId.toString() : "",
      tags: t.tags.join(", "),
      featured: t.featured
    });
    setMode("edit");
  };
  const onSubmit = async (data) => {
    const input = {
      clientName: data.clientName,
      clientTitle: data.clientTitle,
      company: data.company,
      quote: data.quote,
      rating: BigInt(data.rating),
      imageUrl: data.imageUrl,
      featured: data.featured,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      ...data.projectId ? { projectId: BigInt(data.projectId) } : {}
    };
    try {
      if (mode === "edit" && editTarget) {
        await updateTestimonial.mutateAsync({ id: editTarget.id, input });
        ue.success("Testimonial updated");
      } else {
        await addTestimonial.mutateAsync(input);
        ue.success("Testimonial added");
      }
      setMode("idle");
      setEditTarget(null);
    } catch {
      ue.error("Failed to save testimonial");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteTestimonial.mutateAsync(id);
      ue.success("Testimonial deleted");
      setConfirmId(null);
    } catch {
      ue.error("Failed to delete");
    }
  };
  const handleToggleFeature = async (t) => {
    try {
      await featureTestimonial.mutateAsync({ id: t.id, featured: !t.featured });
      ue.success(t.featured ? "Unfeatured" : "Featured");
    } catch {
      ue.error("Failed to update");
    }
  };
  const isPending = addTestimonial.isPending || updateTestimonial.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        testimonials.length,
        " testimonial",
        testimonials.length !== 1 ? "s" : ""
      ] }),
      mode === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          "data-ocid": "testimonials_admin.open_modal_button",
          onClick: openAdd,
          className: "glow-neon font-display font-semibold text-xs h-8",
          children: "+ Add Testimonial"
        }
      )
    ] }),
    mode !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "p-5 rounded-xl border border-primary/30 bg-card/80",
        "data-ocid": "testimonials_admin.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-4 text-gradient-forge", children: mode === "edit" ? `Edit: ${editTarget == null ? void 0 : editTarget.clientName}` : "New Testimonial" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-clientName",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Client Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "t-clientName",
                    "data-ocid": "testimonials_admin.clientname_input",
                    placeholder: "Jane Smith",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("clientName", { required: true })
                  }
                ),
                errors.clientName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "testimonials_admin.clientname_field_error",
                    className: "text-xs text-destructive",
                    children: "Required"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-clientTitle",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Title / Role"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "t-clientTitle",
                    "data-ocid": "testimonials_admin.clienttitle_input",
                    placeholder: "CEO, Acme Corp",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("clientTitle", { required: true })
                  }
                ),
                errors.clientTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Required" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-company",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Company"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "t-company",
                    "data-ocid": "testimonials_admin.company_input",
                    placeholder: "Company",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("company")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-rating",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Rating"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "t-rating",
                    "data-ocid": "testimonials_admin.rating_select",
                    className: "w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm",
                    ...register("rating"),
                    children: [5, 4, 3, 2, 1].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: r, children: [
                      r,
                      " Stars"
                    ] }, r))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-project",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Project (optional)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "t-project",
                    "data-ocid": "testimonials_admin.project_select",
                    className: "w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm",
                    ...register("projectId"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None" }),
                      projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.title }, p.id.toString()))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "t-quote",
                  className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                  children: "Quote"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "t-quote",
                  "data-ocid": "testimonials_admin.quote_textarea",
                  placeholder: "What the client said...",
                  rows: 3,
                  className: "bg-muted border-border/60 focus:border-primary resize-none",
                  ...register("quote", { required: true })
                }
              ),
              errors.quote && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-imageUrl",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Avatar URL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "t-imageUrl",
                    "data-ocid": "testimonials_admin.imageurl_input",
                    placeholder: "https://...",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("imageUrl")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "t-tags",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Tags (comma-separated)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "t-tags",
                    "data-ocid": "testimonials_admin.tags_input",
                    placeholder: "Laravel, Fintech",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("tags")
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  id: "t-featured",
                  "data-ocid": "testimonials_admin.featured_checkbox",
                  className: "w-4 h-4 accent-primary rounded",
                  ...register("featured")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "t-featured",
                  className: "text-sm font-body text-foreground cursor-pointer",
                  children: "Feature on homepage"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "testimonials_admin.submit_button",
                  disabled: isPending,
                  size: "sm",
                  className: "glow-neon font-display font-semibold",
                  children: isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Add Testimonial"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "testimonials_admin.cancel_button",
                  onClick: () => {
                    setMode("idle");
                    setEditTarget(null);
                  },
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground hover:text-foreground",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, k)) }) : testimonials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "testimonials_admin.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground mb-1", children: "No testimonials yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Add your first client testimonial" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: openAdd,
              className: "glow-neon font-display font-semibold text-xs",
              children: "+ Add Testimonial"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        className: "flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group",
        "data-ocid": `testimonials_admin.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center", children: t.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: t.imageUrl,
              alt: t.clientName,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-primary", children: t.clientName.charAt(0) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: t.clientName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                t.clientTitle,
                t.company ? `, ${t.company}` : ""
              ] }),
              t.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30", children: "Featured" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRatingDisplay, { rating: Number(t.rating) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-1 italic", children: [
              "“",
              t.quote,
              "”"
            ] }),
            t.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1.5", children: t.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono",
                children: tag
              },
              tag
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": `testimonials_admin.feature_toggle.${i + 1}`,
                size: "sm",
                variant: "ghost",
                className: `h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-smooth ${t.featured ? "text-primary" : "text-muted-foreground"}`,
                title: t.featured ? "Unfeature" : "Feature",
                onClick: () => handleToggleFeature(t),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-3.5 h-3.5 ${t.featured ? "fill-current" : ""}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": `testimonials_admin.edit_button.${i + 1}`,
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs opacity-0 group-hover:opacity-100 transition-smooth",
                onClick: () => openEdit(t),
                children: "Edit"
              }
            ),
            confirmId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "Delete?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": `testimonials_admin.confirm_button.${i + 1}`,
                  size: "sm",
                  variant: "destructive",
                  className: "h-7 text-xs",
                  disabled: deleteTestimonial.isPending,
                  onClick: () => handleDelete(t.id),
                  children: "Yes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": `testimonials_admin.cancel_button.${i + 1}`,
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 text-xs",
                  onClick: () => setConfirmId(null),
                  children: "No"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": `testimonials_admin.delete_button.${i + 1}`,
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth",
                onClick: () => setConfirmId(t.id),
                children: "Delete"
              }
            )
          ] })
        ]
      },
      t.id.toString()
    )) })
  ] });
}
function BlogPostsTab() {
  const { data: blogPosts = [], isLoading } = useBlogPosts();
  const { data: projects = [] } = useProjects();
  const addBlogPost = useAddBlogPost();
  const updateBlogPost = useUpdateBlogPost();
  const deleteBlogPost = useDeleteBlogPost();
  const featureBlogPost = useFeatureBlogPost();
  const [mode, setMode] = reactExports.useState("idle");
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      postType: "standalone",
      projectId: "",
      tags: "",
      imageUrl: "",
      featured: false
    }
  });
  const titleValue = watch("title");
  reactExports.useEffect(() => {
    if (mode === "add" && titleValue) {
      setValue(
        "slug",
        titleValue.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      );
    }
  }, [titleValue, mode, setValue]);
  const openAdd = () => {
    reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      postType: "standalone",
      projectId: "",
      tags: "",
      imageUrl: "",
      featured: false
    });
    setEditTarget(null);
    setMode("add");
  };
  const openEdit = (post) => {
    setEditTarget(post);
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      postType: post.postType,
      projectId: post.projectId ? post.projectId.toString() : "",
      tags: post.tags.join(", "),
      imageUrl: post.imageUrl,
      featured: post.featured
    });
    setMode("edit");
  };
  const onSubmit = async (data) => {
    const input = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      postType: data.postType,
      featured: data.featured,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      imageUrl: data.imageUrl,
      ...data.projectId ? { projectId: BigInt(data.projectId) } : {}
    };
    try {
      if (mode === "edit" && editTarget) {
        await updateBlogPost.mutateAsync({ id: editTarget.id, input });
        ue.success("Blog post updated");
      } else {
        await addBlogPost.mutateAsync(input);
        ue.success("Blog post added");
      }
      setMode("idle");
      setEditTarget(null);
    } catch {
      ue.error("Failed to save blog post");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteBlogPost.mutateAsync(id);
      ue.success("Blog post deleted");
      setConfirmId(null);
    } catch {
      ue.error("Failed to delete");
    }
  };
  const handleToggleFeature = async (post) => {
    try {
      await featureBlogPost.mutateAsync({
        id: post.id,
        featured: !post.featured
      });
      ue.success(post.featured ? "Unfeatured" : "Featured");
    } catch {
      ue.error("Failed to update");
    }
  };
  const isPending = addBlogPost.isPending || updateBlogPost.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        blogPosts.length,
        " post",
        blogPosts.length !== 1 ? "s" : ""
      ] }),
      mode === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          "data-ocid": "blog_admin.open_modal_button",
          onClick: openAdd,
          className: "glow-neon font-display font-semibold text-xs h-8",
          children: "+ Add Blog Post"
        }
      )
    ] }),
    mode !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "p-5 rounded-xl border border-secondary/30 bg-card/80",
        "data-ocid": "blog_admin.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-4 text-secondary", children: mode === "edit" ? `Edit: ${editTarget == null ? void 0 : editTarget.title}` : "New Blog Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "b-title",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Title"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "b-title",
                    "data-ocid": "blog_admin.title_input",
                    placeholder: "Post title",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("title", { required: true })
                  }
                ),
                errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "blog_admin.title_field_error",
                    className: "text-xs text-destructive",
                    children: "Required"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "b-slug",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Slug"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "b-slug",
                    "data-ocid": "blog_admin.slug_input",
                    placeholder: "auto-generated",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("slug", { required: true })
                  }
                ),
                errors.slug && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Required" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "b-postType",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "b-postType",
                    "data-ocid": "blog_admin.posttype_select",
                    className: "w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm",
                    ...register("postType"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "caseStudy", children: "Case Study" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "standalone", children: "Standalone Article" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "b-project",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Project (optional)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "b-project",
                    "data-ocid": "blog_admin.project_select",
                    className: "w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm",
                    ...register("projectId"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None" }),
                      projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.title }, p.id.toString()))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "b-excerpt",
                  className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                  children: "Excerpt"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "b-excerpt",
                  "data-ocid": "blog_admin.excerpt_textarea",
                  placeholder: "Brief summary...",
                  rows: 2,
                  className: "bg-muted border-border/60 focus:border-primary resize-none",
                  ...register("excerpt", { required: true })
                }
              ),
              errors.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "b-content",
                  className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                  children: "Content"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "b-content",
                  "data-ocid": "blog_admin.content_textarea",
                  placeholder: "Full article content (Markdown supported)...",
                  rows: 6,
                  className: "bg-muted border-border/60 focus:border-primary resize-none",
                  ...register("content", { required: true })
                }
              ),
              errors.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "b-imageUrl",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Cover Image URL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "b-imageUrl",
                    "data-ocid": "blog_admin.imageurl_input",
                    placeholder: "https://...",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("imageUrl")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "b-tags",
                    className: "text-xs font-display tracking-wide text-muted-foreground uppercase",
                    children: "Tags (comma-separated)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "b-tags",
                    "data-ocid": "blog_admin.tags_input",
                    placeholder: "Laravel, Security",
                    className: "bg-muted border-border/60 focus:border-primary h-9",
                    ...register("tags")
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  id: "b-featured",
                  "data-ocid": "blog_admin.featured_checkbox",
                  className: "w-4 h-4 accent-primary rounded",
                  ...register("featured")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "b-featured",
                  className: "text-sm font-body text-foreground cursor-pointer",
                  children: "Feature this post"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "blog_admin.submit_button",
                  disabled: isPending,
                  size: "sm",
                  className: "glow-neon font-display font-semibold",
                  children: isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Add Post"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "blog_admin.cancel_button",
                  onClick: () => {
                    setMode("idle");
                    setEditTarget(null);
                  },
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground hover:text-foreground",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, k)) }) : blogPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "blog_admin.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground mb-1", children: "No blog posts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Write your first case study or article" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: openAdd,
              className: "glow-neon font-display font-semibold text-xs",
              children: "+ Add Blog Post"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: blogPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        className: "flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group",
        "data-ocid": `blog_admin.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground truncate", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: post.postType === "caseStudy" ? "badge-case-study" : "badge-article",
                  children: post.postType === "caseStudy" ? "Case Study" : "Article"
                }
              ),
              post.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30", children: "Featured" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mb-1", children: [
              "/blog/",
              post.slug
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: post.excerpt }),
            post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1.5", children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono",
                children: tag
              },
              tag
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": `blog_admin.feature_toggle.${i + 1}`,
                size: "sm",
                variant: "ghost",
                className: `h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-smooth ${post.featured ? "text-primary" : "text-muted-foreground"}`,
                title: post.featured ? "Unfeature" : "Feature",
                onClick: () => handleToggleFeature(post),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-3.5 h-3.5 ${post.featured ? "fill-current" : ""}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": `blog_admin.edit_button.${i + 1}`,
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs opacity-0 group-hover:opacity-100 transition-smooth",
                onClick: () => openEdit(post),
                children: "Edit"
              }
            ),
            confirmId === post.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "Delete?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": `blog_admin.confirm_button.${i + 1}`,
                  size: "sm",
                  variant: "destructive",
                  className: "h-7 text-xs",
                  disabled: deleteBlogPost.isPending,
                  onClick: () => handleDelete(post.id),
                  children: "Yes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": `blog_admin.cancel_button.${i + 1}`,
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 text-xs",
                  onClick: () => setConfirmId(null),
                  children: "No"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": `blog_admin.delete_button.${i + 1}`,
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth",
                onClick: () => setConfirmId(post.id),
                children: "Delete"
              }
            )
          ] })
        ]
      },
      post.id.toString()
    )) })
  ] });
}
function StatCard({
  label,
  value,
  color,
  ocid
}) {
  const borderClass = color === "primary" ? "border-primary/35" : color === "secondary" ? "border-secondary/35" : "border-border/40";
  const valueClass = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: `p-4 rounded-xl bg-card/60 border transition-smooth hover:border-border/70 ${borderClass}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `text-2xl font-display font-bold mb-1 tabular-nums ${valueClass}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body", children: label })
      ]
    }
  );
}
function AdminPage() {
  const { loginStatus, clear, isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: projects = [] } = useProjects();
  const { data: submissions = [] } = useSubmissions();
  const { data: testimonials = [] } = useTestimonials();
  const { data: blogPosts = [] } = useBlogPosts();
  reactExports.useEffect(() => {
    if (!isAuthenticated && loginStatus !== "initializing") {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, loginStatus, navigate]);
  const handleLogout = () => {
    clear();
    navigate({ to: "/admin/login" });
  };
  if (loginStatus === "initializing" || loginStatus === "logging-in") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Verifying identity..." })
    ] }) });
  }
  if (adminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Checking permissions..." })
    ] }) });
  }
  if (isAdmin === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin.error_state",
        className: "text-center max-w-sm mx-4 p-8 rounded-2xl border border-destructive/30 bg-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              "aria-hidden": "true",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              className: "text-destructive",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-2", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Your identity is not authorized to access the admin dashboard." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handleLogout,
              className: "font-display",
              children: "Sign Out"
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border/50 sticky top-0 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            width: "14",
            height: "14",
            viewBox: "0 0 32 32",
            fill: "none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M16 4L28 10V22L16 28L4 22V10L16 4Z",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  fill: "currentColor",
                  className: "text-primary opacity-20"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M16 10L22 13V19L16 22L10 19V13L16 10Z",
                  fill: "currentColor",
                  className: "text-primary"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: "YasinForge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/",
            "data-ocid": "admin.nav_link",
            className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
            children: "← View Site"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "admin.logout_button",
            variant: "outline",
            size: "sm",
            onClick: handleLogout,
            className: "h-7 text-xs font-display border-border/60 hover:border-destructive/50 hover:text-destructive",
            children: "Sign Out"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Projects",
                value: projects.length,
                color: "primary",
                ocid: "admin.stats_projects"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Submissions",
                value: submissions.length,
                color: "secondary",
                ocid: "admin.stats_submissions"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Testimonials",
                value: testimonials.length,
                color: "muted",
                ocid: "admin.stats_testimonials"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Blog Posts",
                value: blogPosts.length,
                color: "accent",
                ocid: "admin.stats_blogposts"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15, duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "projects", "data-ocid": "admin.tab", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 bg-card border border-border/40 h-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "projects",
                  "data-ocid": "admin.projects_tab",
                  className: "font-display text-xs font-medium data-[state=active]:glow-neon",
                  children: [
                    "Projects",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground", children: projects.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "submissions",
                  "data-ocid": "admin.submissions_tab",
                  className: "font-display text-xs font-medium",
                  children: [
                    "Submissions",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground", children: submissions.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "testimonials",
                  "data-ocid": "admin.testimonials_tab",
                  className: "font-display text-xs font-medium",
                  children: [
                    "Testimonials",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground", children: testimonials.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "blog",
                  "data-ocid": "admin.blog_tab",
                  className: "font-display text-xs font-medium",
                  children: [
                    "Blog Posts",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground", children: blogPosts.length })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "projects", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsTab, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "submissions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionsTab, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "testimonials", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsTab, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "blog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPostsTab, {}) })
          ] })
        }
      )
    ] })
  ] });
}
export {
  AdminPage as default
};
