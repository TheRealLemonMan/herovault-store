"use client"

import { clx } from "@modules/common/components/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import ChevronDown from "@modules/common/icons/chevron-down"

type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Select...", className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex items-center rounded-md border border-white/15 bg-[rgba(255,255,255,0.08)] text-white group",
            className,
            {
              "text-[#94a3b8]": isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="appearance-none bg-transparent border-none px-3 text-white transition-colors duration-150 outline-none w-16 h-10 items-center justify-center"
          >
            <option disabled value="" className="bg-[#0f172a] text-white">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute right-1 flex pointer-events-none justify-end w-6 text-[#94a3b8]">
            <ChevronDown />
          </span>
        </div>
      </div>
    )
  }
)

CartItemSelect.displayName = "CartItemSelect"

export default CartItemSelect
