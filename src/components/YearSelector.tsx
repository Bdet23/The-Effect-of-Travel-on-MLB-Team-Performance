import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';



export default function YearSelector(ps: {
    year: number, setYear: (y: number) => void,
    allYears: boolean, setAllYears: (b: boolean) => void,
}) {
    return (
        <div className="horizontal-container w-full pb-10">
            <div className="w-1/2">
                <p className="text-8xl pb-4">{ ps.year }</p>

                <div className="horizontal-container">
                    <Slider.Root className="SliderRoot w-full" defaultValue={[ps.year - 2000]} max={23} step={1}
                                 onValueChange={([val]: number[]) => {
                                     if (ps.allYears) ps.setAllYears(false);
                                     ps.setYear(val + 2000);
                                 }}
                    >
                        <Slider.Track className="SliderTrack">
                            <Slider.Range className="SliderRange" />
                        </Slider.Track>
                        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                    </Slider.Root>

                    <Checkbox.Root className="CheckboxRoot shrink-0 ml-8" id="c1" defaultChecked={ps.allYears}
                                   onCheckedChange={(a) => ps.setAllYears(!!a)}
                    >
                        <Checkbox.Indicator className="CheckboxIndicator">
                            <CheckIcon />
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label className="Label shrink-0 ml-2" htmlFor="c1">All</label>
                </div>
            </div>
        </div>
    );
}
