'use client';

/**
 * PURPOSE:
 * Toolbar button and dropdown menu to select and apply font size by numeric value.
 * Integrates with Plate's FontSizePlugin via editor.tf.addMarks({ [KEYS.fontSize]: `${size}px` }).
 *
 * CONTEXT:
 * Mounted in components/ui/fixed-toolbar-buttons.tsx for RichTextEditor.
 */

import * as React from 'react';
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorRef, useSelectionFragmentProp } from 'platejs/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToolbarButton, ToolbarMenuGroup } from './toolbar';

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32', '36'];

export function FontSizeToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [open, setOpen] = React.useState(false);

  // Read current font-size mark on selection
  const rawSize = useSelectionFragmentProp({
    defaultValue: '16px',
    getProp: (node) => (node as any)?.fontSize ?? '16px',
  });

  const currentSize = React.useMemo(() => {
    if (!rawSize) return '16';
    const s = String(rawSize).replace('px', '').trim();
    return FONT_SIZES.includes(s) ? s : '16';
  }, [rawSize]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="min-w-[58px] px-2 text-xs font-semibold gap-1"
          pressed={open}
          tooltip="Font size"
          isDropdown
        >
          <span>{currentSize}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-[90px]"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.tf.focus();
        }}
        align="start"
      >
        <ToolbarMenuGroup
          value={currentSize}
          onValueChange={(size) => {
            editor.tf.addMarks({ [KEYS.fontSize]: `${size}px` });
            editor.tf.focus();
          }}
          label="Font size"
        >
          {FONT_SIZES.map((size) => (
            <DropdownMenuRadioItem
              key={size}
              className="min-w-[80px] pl-2 *:first:[span]:hidden text-xs"
              value={size}
            >
              <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
                <DropdownMenuItemIndicator>
                  <CheckIcon className="size-3.5" />
                </DropdownMenuItemIndicator>
              </span>
              <span>{size}</span>
            </DropdownMenuRadioItem>
          ))}
        </ToolbarMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
