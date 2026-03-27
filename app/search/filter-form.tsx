"use client";

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '@/components/ui/accordion';

import { Controller } from 'react-hook-form';
import {
  CategoryKey,
  FILTER_CATEGORIES,
  typedEntries,
  useFilterForm
} from './filter-form-context';

// TODO: Cleanup fragmentation of min price, max price definitions
import { minPrice, maxPrice } from './filter-form-context';
const step = 100_000;

export function FilterForm() {
  const { control } = useFilterForm();

  return (
    <div className="flex flex-col space-y-3 w-full max-w-sm overflow-y-auto px-3" >
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
                    className="px-2 py-1 rounded-full h-auto"
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
                    className="px-2 py-1 rounded-full h-auto"
                    value={priceRange[1]}
                    onChange={e => {
                      const newMax = Number(e.target.value.replace(/[^0-9]/g, ''));
                      setPriceRange([priceRange[0], isNaN(newMax) ? maxPrice : newMax]);
                    }} // set values
                  // onBlur={() => {}}
                  />
                </div>
                <span className="text-right text-xs">VND</span> {/** should I support other currencies?
               * If so, we might need to add a currency selector and handle currency conversion for the price range. For now, we can assume all prices are in VND and display the currency symbol accordingly.
               */}
              </div>
            </div>
          );
        }}
      />

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

export function FilterForm__Reset_and_Apply_Buttons() {
  const { reset, getValues, formState } = useFilterForm();
  const filterHasChanged = formState.isDirty;
  return (
    <div className="flex gap-2">
      <Button
        variant='outline'
        className="flex-1"
        onClick={() => {
          reset();
          console.log("filters reset to default values");
          // also call server action
          // Or just set the search params and call router.push() or some kind
        }}
      >
        Đặt lại
      </Button>

      <Button
        variant={filterHasChanged ? 'default' : 'outline'}
        className="flex-1"
        onClick={() => {
          if (!filterHasChanged) {
            console.log("filters are not dirty, no need to apply");
            return;
          }
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