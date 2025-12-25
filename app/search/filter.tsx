"use client";

import { usePathname } from 'next/navigation';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '@/components/ui/accordion';

// Can make it a shadcn's Sheet when on mobile
export default /*async*/ function Filter () {
  // const filterCategories = await getFilterCategories();
  // How to tell apart which checkbox has been selected?
  // Should this be a form?

  // TODO: Remove this useState hook if possible
  const [filterCategories, setFilterCategories] = useState<IFilterCategory[]>([
      { id: 'amenities', label: 'Tiện nghi', options: ['WiFi', 'Parking', 'Pool', 'Gym'] },
      { id: 'propertyTypes', label: 'Loại hình lưu trú', options: ['Apartment', 'House', 'Villa'] },
      { id: 'bla', label: 'blabla', options: ['Apartment', 'House', 'Villa'] },
    ]);

  const [checkedBox, setCheckedBox] = useState<string[]>([]);
  const [filterHasChanged, setFilterHasChanged] = useState(false);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex gap-2">
        <Button
          variant='outline'
          className="flex-1"
          onClick={() => {
            setCheckedBox([]);
            setFilterHasChanged(false);
          }}
        >
          Đặt lại
        </Button>

        <Button
          variant={filterHasChanged ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => {
            // call some server actions
            setFilterHasChanged(false);
          }}
        >
          Áp dụng
        </Button>
      </div>

      <PriceRangeSelector />

      <Accordion
        type="multiple"
        className="flex-col space-y-3"
        defaultValue={filterCategories.map(category => category.id)}
      >
        { filterCategories.map((category, category_index) => (
          <AccordionItem key={category_index} value={category.id}
            className="border rounded-md last:border"
          >
            <AccordionTrigger className="flex px-4 py-3 justify-between items-center text-sm font-bold">
              { category.label }
            </AccordionTrigger>

            <AccordionContent className="flex flex-col px-4">
              {category.options.map((option, option_index) => (
                <div key={option_index} className="inline-flex py-2">
                  <Checkbox id={option} checked={checkedBox.includes(option)}
                    onCheckedChange={() => setCheckedBox((checkedBox) => {
                      if(!filterHasChanged) setFilterHasChanged(true);
                      // This will be slow af but work for just now
                      // The root of this problem is AccordionItem's get unmounted when it collapses, no work around yet
                      if (checkedBox.includes(option)) return checkedBox.filter((box) => box !== option);
                      return [...checkedBox, option];
                    })}
                  />
                  <Label htmlFor={option} className="ml-2 text-sm"> {option} </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

function PriceRangeSelector () {
  // const pathName = usePathname();
  // const locale = getLocale(pathName.split('/')[1]); // should use next-intl instead of this

  // These numbers should be retrieve from currency in the URL
  const [priceRange, setPriceRange] = useState<number[]>([100_000, 2_000_000]);

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg p-4 flex flex-col space-y-3">
      <div>
        <h4 className="text-sm font-bold">Khoảng giá</h4>
        <p className="text-xs text-gray-500 mb-2">1 phòng, 1 đêm</p>
      </div>
      <Slider
        min={100_000}
        max={2_000_000}
        step={100_000}
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
          // value={priceRange[0].toLocaleString('vi-vn')} // should be dynamic
          // onChange={() => {}} // set values
          // onBlur={() => {}} // swap input fields if necessary
          />
          <div className="h-[1px] w-2 bg-(--color-border) top-1/2 left-1/2 -translate-x-1 absolute" />
          <Input
            type="text"
            inputMode="numeric"
            name="maxPrice"
            placeholder="Max Price"
            className="text-xs md:text-xs px-2 py-1 rounded-full h-auto"
          // value={priceRange[1].toLocaleString('vi-vn')}
          // onChange={() => {}} // set values
          // onBlur={() => {}}
          />
        </div>
        <span className="text-right text-xs">VND</span> {/** should be dynamic */}
      </div>
    </div>
  );
};

interface IFilterCategory {
  id: string,
  label: string,
  options: string[],
}