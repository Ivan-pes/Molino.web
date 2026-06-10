"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ anchors: { offset: -80 } }}>
            {children}
        </ReactLenis>
    );
}
