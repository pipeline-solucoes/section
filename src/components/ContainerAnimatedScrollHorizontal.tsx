'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { styled } from '@mui/material/styles';

/**
 * Props para o ContainerAnimatedScrollHorizontal.
 *

 */
export interface ContainerAnimatedScrollHorizontalProps {
  children: ReactNode;

  /** @default 0.8 */
  duration?: number;

  /** @default 0 */
  delay?: number;

  /** @default 50 */
  offsetX?: number;

  /** @default "left-to-right" */
  direction?: 'left-to-right' | 'right-to-left';
}

/**
 * ContainerAnimatedScrollHorizontal
 *
 * Componente que anima seus filhos horizontalmente quando entram na área visível da tela ao scrollar.
 *
 * - Usa Framer Motion para animação.
 * - Usa Intersection Observer (useInView) para detectar quando o container entra na viewport.
 * - A direção pode ser controlada pela prop `direction`:
 *   - "left-to-right": o conteúdo entra da esquerda para a direita.
 *   - "right-to-left": o conteúdo entra da direita para a esquerda.
 * 
 * 
 * @property children Elementos que serão animados quando entrarem na área visível.
 * @property duration Duração da animação em segundos.
 * @property delay Atraso antes de iniciar a animação em segundos.
 * @property offsetX Intensidade do deslocamento inicial no eixo X (valor absoluto). O sinal é definido pela prop `direction`.
 * @property direction Direção da animação no eixo X: "left-to-right" (da esquerda para a direita) ou "right-to-left" (da direita para a esquerda).
 *
 * @default duration 0.8
 * @default delay 0
 * @default offsetX 50
 * @default direction "left-to-right"
 *
 * Exemplo de uso:
 * ```tsx
 * <ContainerAnimatedScrollHorizontal
 *   offsetX={80}
 *   duration={1}
 *   delay={0.2}
 *   direction="right-to-left"
 * >
 *   <div>Meu conteúdo animado</div>
 * </ContainerAnimatedScrollHorizontal>
 * ```
 */
const ContainerAnimatedScrollHorizontal: React.FC<ContainerAnimatedScrollHorizontalProps> = ({
  children,
  duration = 0.8,
  delay = 0.2,
  offsetX = 50,
  direction = 'left-to-right',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const absoluteOffset = Math.abs(offsetX);
  const computedOffsetX =
    direction === 'right-to-left' ? absoluteOffset : -absoluteOffset;

  return (
    <StyledMotionDiv
      ref={ref}
      computedOffsetX={computedOffsetX}
      initial={{ opacity: 0, x: computedOffsetX }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </StyledMotionDiv>
  );
};

const StyledMotionDiv = styled(motion.div, {
  shouldForwardProp: (prop) =>
    !['computedOffsetX'].includes(prop as string),
})<{
  computedOffsetX: number;
}>(({ computedOffsetX }) => ({
  // Estado inicial coerente com o Framer Motion (SSR-friendly)
  opacity: 0,
  transform: `translateX(${computedOffsetX}px)`,
}));

ContainerAnimatedScrollHorizontal.displayName = 'ContainerAnimatedScrollHorizontal';

export default ContainerAnimatedScrollHorizontal;
