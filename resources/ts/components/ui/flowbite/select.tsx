import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp';
import { Select as FlowBiteSelect, SelectProps as FlowBiteSelectProps } from 'flowbite-react';
import React from 'react';

export type SelectProps = FlowBiteSelectProps & {
    iconColor?: string;
    onChange?: () => void;
    ref?: React.Ref<HTMLSelectElement>;
};

type SelectFC = React.FC<SelectProps>;

/**
 * Select is a wrapper around the FlowBite Select component.
 *
 * This is required to embellish the component with a
 * clear action.
 *
 * @constructor
 */
export const Select: SelectFC = ({
    children,
    iconColor = 'text-cyan-500',
    onChange,
    ref,
    value,
    ...props
}: SelectProps) => {
    const selectRef: React.RefObject<HTMLSelectElement | null> = React.useRef<HTMLSelectElement | null>(null);

    const [show, setShow] = React.useState<boolean>(false);

    const mergeRefs = (...refs: React.RefObject<HTMLSelectElement>[]) => {
        return (node: HTMLSelectElement) => {
            for (const ref of refs) {
                ref.current = node;
            }
        };
    };

    /**
     * On mounting, set the select value.
     */
    React.useEffect(
        () => {
            if (selectRef.current &&
              (
                  typeof value === 'string' || typeof value === 'number'
              ) && !!value) {
                selectRef.current.value = String(value);
                setShow(true);
            }
        },
        [value]
    );

    return (
        <div className="relative w-full pr-[30px]">
            {
                show &&
                (
                    <div
                        className="absolute z-10 right-8 top-[50%] translate-y-[-50%] h-fit overflow-hidden m-0 p-0 max-h-[20px]"
                    >
                        <button className="bg-transparent p-0 m-0 cursor-pointer"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
                                event.stopPropagation();
                                event.preventDefault();
                                if (selectRef.current) {
                                    selectRef.current.value = '';
                                    selectRef.current.dispatchEvent(new Event('change'));
                                    setShow(false);
                                    if (typeof onChange === 'function') {
                                        onChange();
                                    }
                                }
                            }}
                        >
                            <IoCloseSharp className={iconColor}
                                size={20}
                            />
                        </button>
                    </div>
                )}
            <FlowBiteSelect ref={mergeRefs(
                ref as React.RefObject<HTMLSelectElement>,
                selectRef as React.RefObject<HTMLSelectElement>
            )}
            className="clearable"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                setShow(!!event.target.value);

                if (typeof onChange === 'function') {
                    onChange();
                }
            }}
            {...props}
            >
                {children}
            </FlowBiteSelect>
        </div>
    );
};
