/**
 * EarlyBirdBenefit Adapter Component
 * 
 * Switch variants by changing the `variant` prop:
 * - 'original' - Static original design
 * - 'motion' - Framer Motion hover effects
 * - 'gsap' - GSAP-powered animations
 * - 'spline' - Spline 3D integration
 * - 'particles' - Particle effects (coming soon)
 */

import React from 'react';
import { OriginalVariant } from './variants/OriginalVariant';
import { MotionVariant } from './variants/MotionVariant';
import { GSAPVariant } from './variants/GSAPVariant';
import { SplineVariant } from './variants/SplineVariant';

export type EarlyBirdVariant = 'original' | 'motion' | 'gsap' | 'spline' | 'particles';

interface EarlyBirdBenefitProps {
  variant?: EarlyBirdVariant;
}

const variantMap: Record<EarlyBirdVariant, React.ComponentType> = {
  original: OriginalVariant,
  motion: MotionVariant,
  gsap: GSAPVariant,
  spline: SplineVariant,
  particles: OriginalVariant, // Placeholder
};

export function EarlyBirdBenefit({ variant = 'motion' }: EarlyBirdBenefitProps) {
  const VariantComponent = variantMap[variant];
  return <VariantComponent />;
}
