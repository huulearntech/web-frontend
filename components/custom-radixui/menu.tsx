import * as React from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { createCollection } from '@radix-ui/react-collection';
import { useComposedRefs, composeRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { useDirection } from '@radix-ui/react-direction';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { useFocusGuards } from '@radix-ui/react-focus-guards';
import { FocusScope } from '@radix-ui/react-focus-scope';
// import { useId } from '@radix-ui/react-id';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { createPopperScope } from '@radix-ui/react-popper';
import { Portal as PortalPrimitive } from '@radix-ui/react-portal';
import { Presence } from '@radix-ui/react-presence';
import { Primitive, dispatchDiscreteCustomEvent } from '@radix-ui/react-primitive';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';
import { createSlot } from '@radix-ui/react-slot';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
// import { hideOthers } from 'aria-hidden';
import { RemoveScroll } from 'react-remove-scroll';

import type { Scope } from '@radix-ui/react-context';

type Direction = 'ltr' | 'rtl';

const FIRST_LAST_KEYS = ['ArrowUp', 'ArrowDown'];
const LAST_KEYS = ['ArrowDown'];
const SELECTION_KEYS = ['Enter'];


/* -------------------------------------------------------------------------------------------------
 * Menu
 * -----------------------------------------------------------------------------------------------*/

const MENU_NAME = 'Menu';

type ItemData = { disabled: boolean; textValue: string };
const [Collection, useCollection, createCollectionScope] = createCollection<
  MenuItemElement,
  ItemData
>(MENU_NAME);

type ScopedProps<P> = P & { __scopeMenu?: Scope };
const [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
  createCollectionScope,
  createPopperScope,
  createRovingFocusGroupScope,
]);
const usePopperScope = createPopperScope();
const useRovingFocusGroupScope = createRovingFocusGroupScope();

type MenuContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
  content: MenuContentElement | null;
  onContentChange(content: MenuContentElement | null): void;
};

const [MenuProvider, useMenuContext] = createMenuContext<MenuContextValue>(MENU_NAME);

type MenuRootContextValue = {
  onClose(): void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  dir: Direction;
  modal: boolean;
};

const [MenuRootProvider, useMenuRootContext] = createMenuContext<MenuRootContextValue>(MENU_NAME);

interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  dir?: Direction;
  modal?: boolean;
}

const Menu: React.FC<MenuProps> = (props: ScopedProps<MenuProps>) => {
  const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
  const popperScope = usePopperScope(__scopeMenu);
  const [content, setContent] = React.useState<MenuContentElement | null>(null);
  const isUsingKeyboardRef = React.useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);
  const direction = useDirection(dir);

  React.useEffect(() => {
    // Capture phase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener('pointerdown', handlePointer, { capture: true, once: true });
      document.addEventListener('pointermove', handlePointer, { capture: true, once: true });
    };
    const handlePointer = () => (isUsingKeyboardRef.current = false);
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('pointerdown', handlePointer, { capture: true });
      document.removeEventListener('pointermove', handlePointer, { capture: true });
    };
  }, []);

  return (
    <PopperPrimitive.Root {...popperScope}>
      <MenuProvider
        scope={__scopeMenu}
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        <MenuRootProvider
          scope={__scopeMenu}
          onClose={React.useCallback(() => handleOpenChange(false), [handleOpenChange])}
          isUsingKeyboardRef={isUsingKeyboardRef}
          dir={direction}
          modal={modal}
        >
          {children}
        </MenuRootProvider>
      </MenuProvider>
    </PopperPrimitive.Root>
  );
};

Menu.displayName = MENU_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuAnchor
 * -----------------------------------------------------------------------------------------------*/

const ANCHOR_NAME = 'MenuAnchor';

type MenuAnchorElement = React.ComponentRef<typeof PopperPrimitive.Anchor>;
type PopperAnchorProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Anchor>;
interface MenuAnchorProps extends PopperAnchorProps {}

const MenuAnchor = React.forwardRef<MenuAnchorElement, MenuAnchorProps>(
  (props: ScopedProps<MenuAnchorProps>, forwardedRef) => {
    const { __scopeMenu, ...anchorProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return <PopperPrimitive.Anchor {...popperScope} {...anchorProps} ref={forwardedRef} />;
  }
);

MenuAnchor.displayName = ANCHOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'MenuPortal';

type PortalContextValue = { forceMount?: true };
const [PortalProvider, usePortalContext] = createMenuContext<PortalContextValue>(PORTAL_NAME, {
  forceMount: undefined,
});

type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface MenuPortalProps {
  children?: React.ReactNode;
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container'];
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const MenuPortal: React.FC<MenuPortalProps> = (props: ScopedProps<MenuPortalProps>) => {
  const { __scopeMenu, forceMount, children, container } = props;
  const context = useMenuContext(PORTAL_NAME, __scopeMenu);
  return (
    <PortalProvider scope={__scopeMenu} forceMount={forceMount}>
      <Presence present={forceMount || context.open}>
        <PortalPrimitive asChild container={container}>
          {children}
        </PortalPrimitive>
      </Presence>
    </PortalProvider>
  );
};

MenuPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'MenuContent';

type MenuContentContextValue = {
  onItemEnter(event: React.PointerEvent): void;
  onItemLeave(event: React.PointerEvent): void;
  onTriggerLeave(event: React.PointerEvent): void;
  // searchRef: React.RefObject<string>;
  // pointerGraceTimerRef: React.MutableRefObject<number>;
  onPointerGraceIntentChange(intent: GraceIntent | null): void;
};
const [MenuContentProvider, useMenuContentContext] =
  createMenuContext<MenuContentContextValue>(CONTENT_NAME);

type MenuContentElement = MenuRootContentTypeElement;
/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
interface MenuContentProps extends MenuRootContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const MenuContent = React.forwardRef<MenuContentElement, MenuContentProps>(
  (props: ScopedProps<MenuContentProps>, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME, props.__scopeMenu);

    return (
      <Collection.Provider scope={props.__scopeMenu}>
        <Presence present={forceMount || context.open}>
          <Collection.Slot scope={props.__scopeMenu}>
            {rootContext.modal ? (
              <MenuRootContentModal {...contentProps} ref={forwardedRef} />
            ) : (
              <MenuRootContentNonModal {...contentProps} ref={forwardedRef} />
            )}
          </Collection.Slot>
        </Presence>
      </Collection.Provider>
    );
  }
);

/* ---------------------------------------------------------------------------------------------- */

type MenuRootContentTypeElement = MenuContentImplElement;
interface MenuRootContentTypeProps
  extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> {}

const MenuRootContentModal = React.forwardRef<MenuRootContentTypeElement, MenuRootContentTypeProps>(
  (props: ScopedProps<MenuRootContentTypeProps>, forwardedRef) => {
    const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
    const ref = React.useRef<MenuRootContentTypeElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    // Why does the original radix-ui component hide everything like this?
    // If these uncommented, the browser would complain!
    // Hide everything from ARIA except the `MenuContent`
    // React.useEffect(() => {
    //   const content = ref.current;
    //   if (content) return hideOthers(content);
    // }, []);

    return (
      <MenuContentImpl
        {...props}
        ref={composedRefs}
        // we make sure we're not trapping once it's been closed
        // (closed !== unmounted when animating out)
        trapFocus={context.open}
        // make sure to only disable pointer events when open
        // this avoids blocking interactions while animating out
        disableOutsidePointerEvents={context.open}
        disableOutsideScroll
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
        onFocusOutside={composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )}
        onDismiss={() => context.onOpenChange(false)}
      />
    );
  }
);

const MenuRootContentNonModal = React.forwardRef<
  MenuRootContentTypeElement,
  MenuRootContentTypeProps
>((props: ScopedProps<MenuRootContentTypeProps>, forwardedRef) => {
  const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
  return (
    <MenuContentImpl
      {...props}
      ref={forwardedRef}
      trapFocus={false}
      disableOutsidePointerEvents={false}
      disableOutsideScroll={false}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

/* ---------------------------------------------------------------------------------------------- */

type MenuContentImplElement = React.ComponentRef<typeof PopperPrimitive.Content>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
type MenuContentImplPrivateProps = {
  onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];
  onDismiss?: DismissableLayerProps['onDismiss'];
  disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents'];

  /**
   * Whether scrolling outside the `MenuContent` should be prevented
   * (default: `false`)
   */
  disableOutsideScroll?: boolean;

  /**
   * Whether focus should be trapped within the `MenuContent`
   * (default: false)
   */
  trapFocus?: FocusScopeProps['trapped'];
};
interface MenuContentImplProps
  extends MenuContentImplPrivateProps,
    Omit<PopperContentProps, 'dir' | 'onPlaced'> {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];

  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: RovingFocusGroupProps['loop'];

  onEntryFocus?: RovingFocusGroupProps['onEntryFocus'];
  onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown'];
  onPointerDownOutside?: DismissableLayerProps['onPointerDownOutside'];
  onFocusOutside?: DismissableLayerProps['onFocusOutside'];
  onInteractOutside?: DismissableLayerProps['onInteractOutside'];
}

const Slot = createSlot('MenuContent.ScrollLock');

const MenuContentImpl = React.forwardRef<MenuContentImplElement, MenuContentImplProps>(
  (props: ScopedProps<MenuContentImplProps>, forwardedRef) => {
    const {
      __scopeMenu,
      loop = false,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEntryFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      disableOutsideScroll,
      ...contentProps
    } = props;
    const context = useMenuContext(CONTENT_NAME, __scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const getItems = useCollection(__scopeMenu);
    const [currentItemId, setCurrentItemId] = React.useState<string | null>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
    // const timerRef = React.useRef(0);
    // const searchRef = React.useRef('');
    // const pointerGraceTimerRef = React.useRef(0);
    const pointerGraceIntentRef = React.useRef<GraceIntent | null>(null);
    const pointerDirRef = React.useRef<Side>('right');
    const lastPointerXRef = React.useRef(0);

    const ScrollLockWrapper = disableOutsideScroll ? RemoveScroll : React.Fragment;
    const scrollLockWrapperProps = disableOutsideScroll
      ? { as: Slot, allowPinchZoom: true }
      : undefined;


    // React.useEffect(() => {
    //   return () => window.clearTimeout(timerRef.current);
    // }, []);

    // Make sure the whole tree has focus guards as our `MenuContent` may be
    // the last element in the DOM (because of the `Portal`)
    useFocusGuards();

    const isPointerMovingToSubmenu = React.useCallback((event: React.PointerEvent) => {
      const isMovingTowards = pointerDirRef.current === pointerGraceIntentRef.current?.side;
      return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
    }, []);

    return (
      <MenuContentProvider
        scope={__scopeMenu}
        // searchRef={searchRef}
        onItemEnter={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
          },
          [isPointerMovingToSubmenu]
        )}
        onItemLeave={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) return;
            // TODO: Do something with these
            contentRef.current?.focus();
            setCurrentItemId(null);
          },
          [isPointerMovingToSubmenu]
        )}
        onTriggerLeave={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
          },
          [isPointerMovingToSubmenu]
        )}
        // pointerGraceTimerRef={pointerGraceTimerRef}
        onPointerGraceIntentChange={React.useCallback((intent) => {
          pointerGraceIntentRef.current = intent;
        }, [])}
      >
        <ScrollLockWrapper {...scrollLockWrapperProps}>
          <FocusScope
            asChild
            trapped={trapFocus}
            onMountAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) => {
              // when opening, explicitly focus the content area only and leave
              // `onEntryFocus` in  control of focusing first item
              event.preventDefault();
              // Fuck this following line:
              // contentRef.current?.focus({ preventScroll: true });
            })}
            onUnmountAutoFocus={onCloseAutoFocus}
          >
            <DismissableLayer
              asChild
              disableOutsidePointerEvents={disableOutsidePointerEvents}
              onEscapeKeyDown={onEscapeKeyDown}
              onPointerDownOutside={onPointerDownOutside}
              onFocusOutside={onFocusOutside}
              onInteractOutside={onInteractOutside}
              onDismiss={onDismiss}
            >
              <RovingFocusGroup.Root
                asChild
                {...rovingFocusGroupScope}
                dir={rootContext.dir}
                orientation="vertical"
                loop={loop}
                currentTabStopId={currentItemId}
                onCurrentTabStopIdChange={setCurrentItemId}
                onEntryFocus={composeEventHandlers(onEntryFocus, (event) => {
                  // only focus first item when using keyboard
                  if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
                })}
                preventScrollOnEntryFocus
              >
                <PopperPrimitive.Content
                  role="menu"
                  aria-orientation="vertical"
                  data-state={getOpenState(context.open)}
                  data-radix-menu-content=""
                  dir={rootContext.dir}
                  {...popperScope}
                  {...contentProps}
                  ref={composedRefs}
                  style={{ outline: 'none', ...contentProps.style }}
                  onKeyDown={composeEventHandlers(contentProps.onKeyDown, (event) => {
                    // submenu key events bubble through portals. We only care about keys in this menu.
                    const target = event.target as HTMLElement;
                    const isKeyDownInside =
                      target.closest('[data-radix-menu-content]') === event.currentTarget;
                    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                    const isCharacterKey = event.key.length === 1;
                    if (isKeyDownInside) {
                      // menus should not be navigated using tab key so we prevent it
                      if (event.key === 'Tab') event.preventDefault();
                      // TODO: Or just modify this line:
                      // if (!isModifierKey && isCharacterKey) {
                      //   setFocusedItem(null);
                      //   handleChange(event);
                      // }

                      // if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                    }
                    // focus first/last item based on key pressed
                    const content = contentRef.current;
                    if (event.target !== content) return;
                    if (!FIRST_LAST_KEYS.includes(event.key)) return;
                    event.preventDefault();
                    const items = getItems().filter((item) => !item.disabled);
                    const candidateNodes = items.map((item) => item.ref.current!);
                    if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                    focusFirst(candidateNodes);
                  })}

                  // onBlur={composeEventHandlers(props.onBlur, (event) => {
                  //   // clear search buffer when leaving the menu
                  //   if (!event.currentTarget.contains(event.target)) {
                  //     window.clearTimeout(timerRef.current);
                  //     searchRef.current = '';
                  //   }
                  // })}

                  onPointerMove={composeEventHandlers(
                    props.onPointerMove,
                    whenMouse((event) => {
                      const target = event.target as HTMLElement;
                      const pointerXHasChanged = lastPointerXRef.current !== event.clientX;

                      // We don't use `event.movementX` for this check because Safari will
                      // always return `0` on a pointer event.
                      if (event.currentTarget.contains(target) && pointerXHasChanged) {
                        const newDir = event.clientX > lastPointerXRef.current ? 'right' : 'left';
                        pointerDirRef.current = newDir;
                        lastPointerXRef.current = event.clientX;
                      }
                    })
                  )}
                />
              </RovingFocusGroup.Root>
            </DismissableLayer>
          </FocusScope>
        </ScrollLockWrapper>
      </MenuContentProvider>
    );
  }
);

MenuContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuGroup
 * -----------------------------------------------------------------------------------------------*/

const GROUP_NAME = 'MenuGroup';

type MenuGroupElement = React.ComponentRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface MenuGroupProps extends PrimitiveDivProps {}

const MenuGroup = React.forwardRef<MenuGroupElement, MenuGroupProps>(
  (props: ScopedProps<MenuGroupProps>, forwardedRef) => {
    const { __scopeMenu, ...groupProps } = props;
    return <Primitive.div role="group" {...groupProps} ref={forwardedRef} />;
  }
);

MenuGroup.displayName = GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuLabel
 * -----------------------------------------------------------------------------------------------*/

const LABEL_NAME = 'MenuLabel';

type MenuLabelElement = React.ComponentRef<typeof Primitive.div>;
interface MenuLabelProps extends PrimitiveDivProps {}

const MenuLabel = React.forwardRef<MenuLabelElement, MenuLabelProps>(
  (props: ScopedProps<MenuLabelProps>, forwardedRef) => {
    const { __scopeMenu, ...labelProps } = props;
    return <Primitive.div {...labelProps} ref={forwardedRef} />;
  }
);

MenuLabel.displayName = LABEL_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'MenuItem';
const ITEM_SELECT = 'menu.itemSelect';

type MenuItemElement = MenuItemImplElement;
interface MenuItemProps extends Omit<MenuItemImplProps, 'onSelect'> {
  onSelect?: (event: Event) => void;
}

const MenuItem = React.forwardRef<MenuItemElement, MenuItemProps>(
  (props: ScopedProps<MenuItemProps>, forwardedRef) => {
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = React.useRef<HTMLDivElement>(null);
    const rootContext = useMenuRootContext(ITEM_NAME, props.__scopeMenu);
    const contentContext = useMenuContentContext(ITEM_NAME, props.__scopeMenu);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const isPointerDownRef = React.useRef(false);

    const handleSelect = () => {
      const menuItem = ref.current;
      if (!disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
        menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
        dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      }
    };

    return (
      <MenuItemImpl
        {...itemProps}
        ref={composedRefs}
        disabled={disabled}
        onClick={composeEventHandlers(props.onClick, handleSelect)}
        onPointerDown={(event) => {
          props.onPointerDown?.(event);
          isPointerDownRef.current = true;
        }}
        onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
          // Pointer down can move to a different menu item which should activate it on pointer up.
          // We dispatch a click for selection to allow composition with click based triggers and to
          // prevent Firefox from getting stuck in text selection mode when the menu closes.
          if (!isPointerDownRef.current) event.currentTarget?.click();
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          // const isTypingAhead = contentContext.searchRef.current !== '';
          // if (disabled || (isTypingAhead && event.key === ' ')) return;
          if (SELECTION_KEYS.includes(event.key)) {
            event.currentTarget.click();
            /**
             * We prevent default browser behaviour for selection keys as they should trigger
             * a selection only:
             * - prevents space from scrolling the page.
             * - if keydown causes focus to move, prevents keydown from firing on the new target.
             */
            event.preventDefault();
          }
        })}
      />
    );
  }
);

MenuItem.displayName = ITEM_NAME;

/* ---------------------------------------------------------------------------------------------- */

type MenuItemImplElement = React.ComponentRef<typeof Primitive.div>;
interface MenuItemImplProps extends PrimitiveDivProps {
  disabled?: boolean;
  textValue?: string;
}

const MenuItemImpl = React.forwardRef<MenuItemImplElement, MenuItemImplProps>(
  (props: ScopedProps<MenuItemImplProps>, forwardedRef) => {
    const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
    const contentContext = useMenuContentContext(ITEM_NAME, __scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [isFocused, setIsFocused] = React.useState(false);

    // get the item's `.textContent` as default strategy for typeahead `textValue`
    const [textContent, setTextContent] = React.useState('');
    React.useEffect(() => {
      const menuItem = ref.current;
      if (menuItem) {
        setTextContent((menuItem.textContent ?? '').trim());
      }
    }, [itemProps.children]);

    return (
      <Collection.ItemSlot
        scope={__scopeMenu}
        disabled={disabled}
        textValue={textValue ?? textContent}
      >
        <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable={!disabled}>
          <Primitive.div
            role="menuitem"
            data-highlighted={isFocused ? '' : undefined}
            aria-disabled={disabled || undefined}
            data-disabled={disabled ? '' : undefined}
            {...itemProps}
            ref={composedRefs}
            /**
             * We focus items on `pointerMove` to achieve the following:
             *
             * - Mouse over an item (it focuses)
             * - Leave mouse where it is and use keyboard to focus a different item
             * - Wiggle mouse without it leaving previously focused item
             * - Previously focused item should re-focus
             *
             * If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
             * wiggles. This is to match native menu implementation.
             */
            onPointerMove={composeEventHandlers(
              props.onPointerMove,
              whenMouse((event) => {
                if (disabled) {
                  contentContext.onItemLeave(event);
                } else {
                  contentContext.onItemEnter(event);
                  if (!event.defaultPrevented) {
                    const item = event.currentTarget;
                    // TODO: Do something with this
                    // item.focus({ preventScroll: true });
                  }
                }
              })
            )}
            onPointerLeave={composeEventHandlers(
              props.onPointerLeave,
              whenMouse((event) => contentContext.onItemLeave(event))
            )}
            onFocus={composeEventHandlers(props.onFocus, () => setIsFocused(true))}
            onBlur={composeEventHandlers(props.onBlur, () => setIsFocused(false))}
          />
        </RovingFocusGroup.Item>
      </Collection.ItemSlot>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * MenuSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'MenuSeparator';

type MenuSeparatorElement = React.ComponentRef<typeof Primitive.div>;
interface MenuSeparatorProps extends PrimitiveDivProps {}

const MenuSeparator = React.forwardRef<MenuSeparatorElement, MenuSeparatorProps>(
  (props: ScopedProps<MenuSeparatorProps>, forwardedRef) => {
    const { __scopeMenu, ...separatorProps } = props;
    return (
      <Primitive.div
        role="separator"
        aria-orientation="horizontal"
        {...separatorProps}
        ref={forwardedRef}
      />
    );
  }
);

MenuSeparator.displayName = SEPARATOR_NAME;


/* -----------------------------------------------------------------------------------------------*/

function getOpenState(open: boolean) {
  return open ? 'open' : 'closed';
}

function focusFirst(candidates: HTMLElement[]) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
function wrapArray<T>(array: T[], startIndex: number) {
  return array.map<T>((_, index) => array[(startIndex + index) % array.length]!);
}

/**
 * This is the "meat" of the typeahead matching logic. It takes in all the values,
 * the search and the current match, and returns the next match (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through options starting with that character)
 *
 * We also reorder the values by wrapping the array around the current match.
 * This is so we always look forward from the current match, and picking the first
 * match will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current match from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current match still matches.
 */
function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0]! : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) =>
    value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextMatch !== currentMatch ? nextMatch : undefined;
}

type Point = { x: number; y: number };
type Polygon = Point[];
type Side = 'left' | 'right';
type GraceIntent = { area: Polygon; side: Side };

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
function isPointInPolygon(point: Point, polygon: Polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i]!;
    const jj = polygon[j]!;
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;

    // prettier-ignore
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

function isPointerInGraceArea(event: React.PointerEvent, area?: Polygon) {
  if (!area) return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}

function whenMouse<E>(handler: React.PointerEventHandler<E>): React.PointerEventHandler<E> {
  return (event) => (event.pointerType === 'mouse' ? handler(event) : undefined);
}

const Root = Menu;
const Anchor = MenuAnchor;
const Portal = MenuPortal;
const Content = MenuContent;
const Group = MenuGroup;
const Label = MenuLabel;
const Item = MenuItem;
const Separator = MenuSeparator;

export {
  createMenuScope,
  //
  Menu,
  MenuAnchor,
  MenuPortal,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuItem,
  MenuSeparator,
  //
  Root,
  Anchor,
  Portal,
  Content,
  Group,
  Label,
  Item,
  Separator,
};
export type {
  MenuProps,
  MenuAnchorProps,
  MenuPortalProps,
  MenuContentProps,
  MenuGroupProps,
  MenuLabelProps,
  MenuItemProps,
  MenuSeparatorProps,
};
