import * as React from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Primitive } from '@radix-ui/react-primitive';

import { useId } from '@radix-ui/react-id';
import type { Scope } from '@radix-ui/react-context';

import * as MenuPrimitive from '@/components/custom-radixui/menu';
import { createMenuScope } from '@/components/custom-radixui/menu';

type Direction = 'ltr' | 'rtl';

/* -------------------------------------------------------------------------------------------------
 * AutoComplete
 * -----------------------------------------------------------------------------------------------*/

const AUTO_COMPLETE_NAME = 'AutoComplete';

type ScopedProps<P> = P & { __scopeAutoComplete?: Scope };
const [createAutoCompleteContext, createAutoCompleteScope] = createContextScope(
  AUTO_COMPLETE_NAME,
  [createMenuScope]
);
const useMenuScope = createMenuScope();

type AutoCompleteContextValue = {
  triggerId: string;
  triggerRef: React.RefObject<HTMLInputElement | null>;
  contentId: string;
  focusedItemRef: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: boolean;
};

const [AutoCompleteProvider, useAutoCompleteContext] =
  createAutoCompleteContext<AutoCompleteContextValue>(AUTO_COMPLETE_NAME);

interface AutoCompleteProps {
  children?: React.ReactNode;
  dir?: Direction;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  modal?: boolean;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props: ScopedProps<AutoCompleteProps>) => {
  const {
    __scopeAutoComplete,
    children,
    dir,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true,
  } = props;
  const menuScope = useMenuScope(__scopeAutoComplete);
  const triggerRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: AUTO_COMPLETE_NAME,
  });
  const focusedItemRef = React.useRef<HTMLDivElement>(null);

  return (
    <AutoCompleteProvider
      scope={__scopeAutoComplete}
      triggerId={useId()}
      triggerRef={triggerRef}
      contentId={useId()}
      focusedItemRef={focusedItemRef}
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={React.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen])}
      modal={modal}
    >
      <MenuPrimitive.Root {...menuScope} open={open} onOpenChange={setOpen} dir={dir} modal={modal}>
        {children}
      </MenuPrimitive.Root>
    </AutoCompleteProvider>
  );
};

AutoComplete.displayName = AUTO_COMPLETE_NAME;

/* -------------------------------------------------------------------------------------------------
 * AutoCompleteTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'AutoCompleteTrigger';

type AutoCompleteTriggerElement = React.ComponentRef<typeof Primitive.input>;
type PrimitiveInputProps = React.ComponentPropsWithoutRef<typeof Primitive.input>;
interface AutoCompleteTriggerProps extends PrimitiveInputProps {}

const AutoCompleteTrigger = React.forwardRef<AutoCompleteTriggerElement, AutoCompleteTriggerProps>(
  (props: ScopedProps<AutoCompleteTriggerProps>, forwardedRef) => {
    const { __scopeAutoComplete, disabled = false, ...triggerProps } = props;
    const context = useAutoCompleteContext(TRIGGER_NAME, __scopeAutoComplete);
    const menuScope = useMenuScope(__scopeAutoComplete);
    return (
      <MenuPrimitive.Anchor asChild {...menuScope}>
        <Primitive.input
          type="text"
          id={context.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={context.open ? context.contentId : undefined}
          data-state={context.open ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          {...triggerProps}
          ref={composeRefs(forwardedRef, context.triggerRef)}
          onFocus={composeEventHandlers(props.onFocus, (event) => {
            if (disabled) return;
            if (!context.open) {
              context.onOpenChange(true);
              event.preventDefault();
            }
          })}
          onBlur={composeEventHandlers(props.onBlur, (event) => {
            if (disabled) return;
            // if (focusWithinMenu) return;
            if (context.open) {
              context.onOpenChange(false);
              event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (disabled) return;
            if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
              // TODO: focus menu item
              console.log(event.key);
              event.preventDefault();
            }
          })}
        />
      </MenuPrimitive.Anchor>
    );
  }
);

AutoCompleteTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * AutoCompletePortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'AutoCompletePortal';

type MenuPortalProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;
interface AutoCompletePortalProps extends MenuPortalProps {}

const AutoCompletePortal: React.FC<AutoCompletePortalProps> = (
  props: ScopedProps<AutoCompletePortalProps>
) => {
  const { __scopeAutoComplete, ...portalProps } = props;
  const menuScope = useMenuScope(__scopeAutoComplete);
  return <MenuPrimitive.Portal {...menuScope} {...portalProps} />;
};

AutoCompletePortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * AutoCompleteContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'AutoCompleteContent';

type AutoCompleteContentElement = React.ComponentRef<typeof MenuPrimitive.Content>;
type MenuContentProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;
interface AutoCompleteContentProps extends Omit<MenuContentProps, 'onEntryFocus'> {}

const AutoCompleteContent = React.forwardRef<AutoCompleteContentElement, AutoCompleteContentProps>(
  (props: ScopedProps<AutoCompleteContentProps>, forwardedRef) => {
    const { __scopeAutoComplete, ...contentProps } = props;
    const context = useAutoCompleteContext(CONTENT_NAME, __scopeAutoComplete);
    const menuScope = useMenuScope(__scopeAutoComplete);
    const hasInteractedOutsideRef = React.useRef(false);

    return (
      <MenuPrimitive.Content
        id={context.contentId}
        aria-labelledby={context.triggerId}
        {...menuScope}
        {...contentProps}
        ref={forwardedRef}
        onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
          // if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
          hasInteractedOutsideRef.current = false;
          // Always prevent auto focus because we either focus manually or want user agent focus
          event.preventDefault();
        })}
        onInteractOutside={composeEventHandlers(props.onInteractOutside, (event) => {
          const originalEvent = event.detail.originalEvent as PointerEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
        })}
        style={{
          ...props.style,
          // re-namespace exposed content custom properties
          ...{
            '--radix-auto-complete-content-transform-origin':
              'var(--radix-popper-transform-origin)',
            '--radix-auto-complete-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-auto-complete-content-available-height':
              'var(--radix-popper-available-height)',
            '--radix-auto-complete-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-auto-c omplete-trigger-height': 'var(--radix-popper-anchor-height)',
          },
        }}
      />
    );
  }
);

AutoCompleteContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * AutoCompleteItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'AutoCompleteItem';

type AutoCompleteItemElement = React.ComponentRef<typeof MenuPrimitive.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item>;
interface AutoCompleteItemProps extends MenuItemProps {}

const AutoCompleteItem = React.forwardRef<AutoCompleteItemElement, AutoCompleteItemProps>(
  (props: ScopedProps<AutoCompleteItemProps>, forwardedRef) => {
    const { __scopeAutoComplete, ...itemProps } = props;
    const menuScope = useMenuScope(__scopeAutoComplete);
    return <MenuPrimitive.Item {...menuScope} {...itemProps} ref={forwardedRef} />;
  }
);

AutoCompleteItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * AutoCompleteSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'AutoCompleteSeparator';

type AutoCompleteSeparatorElement = React.ComponentRef<typeof MenuPrimitive.Separator>;
type MenuSeparatorProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>;
interface AutoCompleteSeparatorProps extends MenuSeparatorProps {}

const AutoCompleteSeparator = React.forwardRef<
  AutoCompleteSeparatorElement,
  AutoCompleteSeparatorProps
>((props: ScopedProps<AutoCompleteSeparatorProps>, forwardedRef) => {
  const { __scopeAutoComplete, ...separatorProps } = props;
  const menuScope = useMenuScope(__scopeAutoComplete);
  return <MenuPrimitive.Separator {...menuScope} {...separatorProps} ref={forwardedRef} />;
});

AutoCompleteSeparator.displayName = SEPARATOR_NAME;


/* -----------------------------------------------------------------------------------------------*/

const Root = AutoComplete;
const Trigger = AutoCompleteTrigger;
const Portal = AutoCompletePortal;
const Content = AutoCompleteContent;
const Item = AutoCompleteItem;
const Separator = AutoCompleteSeparator;

export {
  createAutoCompleteScope,
  //
  AutoComplete,
  AutoCompleteTrigger,
  AutoCompletePortal,
  AutoCompleteContent,
  AutoCompleteItem,
  AutoCompleteSeparator,
  //
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  Separator,
};
export type {
  AutoCompleteProps,
  AutoCompleteTriggerProps,
  AutoCompletePortalProps,
  AutoCompleteContentProps,
  AutoCompleteItemProps,
  AutoCompleteSeparatorProps,
};