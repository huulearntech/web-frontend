// TODO: Handle price input blur events to swap values if necessary 
"use client";

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { ListFilter } from 'lucide-react';
import { useFilterSheetContext } from './filter-sheet-context';

import { Controller } from 'react-hook-form';
import {
  CategoryKey,
  FILTER_CATEGORIES,
  FilterFormProvider,
  FilterFormType,
  typedEntries,
  useFilterForm
} from './filter-form-context';
import { cn } from '@/lib/utils';


// TODO: Cleanup
const minPrice = 100_000;
const maxPrice = 2_000_000;
const step = 100_000;

export const defaultFilterContentValues: FilterFormType = {
  priceRange: [minPrice, maxPrice],
  ratings: [],
  amenities: [],
  propertyTypes: [],
};

export default function Filter() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <FilterFormProvider initialValues={defaultFilterContentValues}>
      {isDesktop ? (
        <aside className="w-full max-w-62.5 flex flex-col gap-y-3">
          <FilterResetApplyButtons />
          <FilterContent />
        </aside>
      ) : (
        <FilterSheet />
      )}
    </FilterFormProvider>
  );
};

export function FilterSheet({
  side = 'left', className
}: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string
}) {
  const { open: filterSheetOpen, setOpen: setFilterSheetOpen } = useFilterSheetContext();

  return (
    <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
      <SheetContent side={side} className={cn(
        "w-full max-w-sm px-4 overflow-y-auto",
        className
      )}
      >
        <SheetHeader className='sticky top-0 left-0 right-0 flex-row px-0 items-center justify-between backdrop-blur-md bg-white/20 z-10'>
          <SheetTitle className='flex gap-2 items-center'>
            <ListFilter className="size-5" aria-hidden />
            <span className="text-lg font-bold">Bộ lọc</span>
          </SheetTitle>
          <SheetDescription className='sr-only' > Tuỳ chỉnh bộ lọc tìm kiếm của bạn </SheetDescription>
        </SheetHeader>

        <FilterContent />

        <SheetFooter className='sticky bottom-0 left-0 right-0 backdrop-blur-md bg-white/20 z-10'>
          <FilterResetApplyButtons />
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
};

// TODO: FilterCategory: how does server model its data?
// => Rigid structure for now
function FilterContent() {
  const { control } = useFilterForm();

  return (
    <div className="flex flex-col space-y-3 w-full max-w-sm">
      <PriceRangeSelector />

      <Accordion
        type="multiple"
        className="flex-col space-y-3"
        defaultValue={typedEntries(FILTER_CATEGORIES).map(([key]) => key as CategoryKey)}
      >
        {typedEntries(FILTER_CATEGORIES).map(([key, category]) => {
          const category_index = key as CategoryKey;
          return (
            <AccordionItem
              key={category_index}
              value={category_index}
              className="border rounded-md last:border"
            >
              <AccordionTrigger className="flex px-4 py-3 justify-between items-center text-sm font-bold">
                {category.label}
              </AccordionTrigger>

              <AccordionContent className="flex flex-col px-4">
                {/* Controller manages an array of selected option strings for this category */}
                <Controller
                  control={control}
                  name={category_index}
                  defaultValue={[]}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-col gap-2">
                      {category.options.map((option) => (
                        <div key={option} className="flex items-center">
                          <Checkbox
                            id={`${category_index}-${option}`}
                            checked={value.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, option]);
                              } else {
                                onChange(value.filter((v: string) => v !== option));
                              }
                            }}
                          />
                          <Label
                            htmlFor={`${category_index}-${option}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}

function FilterResetApplyButtons() {
  const { reset, getValues, formState } = useFilterForm();
  const filterHasChanged = formState.isDirty;
  return (
    <div className="flex gap-2">
      <Button
        variant='outline'
        className="flex-1"
        onClick={() => {
          reset(defaultFilterContentValues); // also call server actions
        }}
      >
        Đặt lại
      </Button>

      <Button
        variant={filterHasChanged ? 'default' : 'outline'}
        className="flex-1"
        onClick={() => {
          const values = getValues();
          console.log(values, "filter has changed: ", filterHasChanged); // call some server actions (only if filterHasChanged)
          reset(values);
        }}
      >
        Áp dụng
      </Button>
    </div>
  );
};

// These numbers should be retrieve from currency in the URL
function PriceRangeSelector() {
  const { control } = useFilterForm();

  return (
    <Controller
      control={control}
      name="priceRange"
      defaultValue={[minPrice, maxPrice]}
      render={({ field: { value: priceRange, onChange: setPriceRange } }) => {
        return (
          <div className="w-full bg-white border border-gray-300 rounded-lg p-4 flex flex-col space-y-3">
            <div>
              <h4 className="text-sm font-bold">Khoảng giá</h4>
              <p className="text-xs text-gray-500 mb-2">1 phòng, 1 đêm</p>
            </div>
            <Slider
              min={minPrice}
              max={maxPrice}
              step={step}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex items-center mt-2 space-x-2">
              <div className="relative flex space-x-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  name="minPrice"
                  placeholder="Min Price"
                  className="text-xs md:text-xs px-2 py-1 rounded-full h-auto"
                  value={priceRange[0]}
                  onChange={e => {
                    const newMin = Number(e.target.value.replace(/[^0-9]/g, ''));
                    setPriceRange([isNaN(newMin) ? minPrice : newMin, priceRange[1]]);
                  }}
                  // onBlur={() => { }} // swap input fields if necessary
                />
                <div className="h-px w-2 bg-(--color-border) top-1/2 left-1/2 -translate-x-1 absolute" />
                <Input
                  type="text"
                  inputMode="numeric"
                  name="maxPrice"
                  placeholder="Max Price"
                  className="text-xs md:text-xs px-2 py-1 rounded-full h-auto"
                  value={priceRange[1]}
                  onChange={e => {
                    const newMax = Number(e.target.value.replace(/[^0-9]/g, ''));
                    setPriceRange([priceRange[0], isNaN(newMax) ? maxPrice : newMax]);
                  }} // set values
                // onBlur={() => {}}
                />
              </div>
              <span className="text-right text-xs">VND</span> {/** should I support other currencies? */}
            </div>
          </div>
        );
      }}
    />
  );
};