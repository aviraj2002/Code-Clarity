import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M10 16.5 8 18l-2-1.5" />
            <path d="m14 16.5 2 1.5 2-1.5" />
            <path d="M9 13.5 4 11l5-2.5" />
            <path d="m15 13.5 5-2.5-5-2.5" />
            <path d="m12 17.5 4-2.5-4-2.5-4 2.5 4 2.5z" />
            <path d="m12 17.5-4-2.5" />
            <path d="M4 11v4" />
            <path d="M20 11v4" />
            <path d="m12 6 4 2.5-4 2.5-4-2.5L12 6z" />
        </svg>
    )
}
