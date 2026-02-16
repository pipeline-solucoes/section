'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ScrollHighlightTextProps extends Omit<TypographyProps, 'children'> {
  /**
   * Texto exibido pelo componente.
   * Use `\n` para criar quebras de linha que serão animadas como parágrafos.
   * As palavras dentro de cada linha “acendem” em sequência.
   *
   * @default ''
   */
  text: string;

  /**
   * Variant tipográfica usada em cada linha do texto.
   *
   * @default "h5"
   */
  variant?: TypographyProps['variant'];

  /**
   * Cor usada antes do texto "acender" (estado inicial, mais suave).
   *
   * @default "rgba(0, 0, 0, 0.3)"
   */
  initialColor?: string;

  /**
   * Cor usada após o texto "acender" (estado final, em destaque).
   *
   * @default "rgba(0, 0, 0, 0.87)"
   */
  activeColor?: string;
}

/**
 * Props extras usadas apenas pelo styled do Word, não vão para o DOM.
 */
interface WordExtraProps {
  isActive: boolean;
  initialColor?: string;
  activeColor?: string;
  transitionDelay?: number;
}

const Word = styled('span', {
  shouldForwardProp: (prop) =>
    !['isActive', 'initialColor', 'activeColor', 'transitionDelay'].includes(
      prop as string,
    ),
})<WordExtraProps>(({ isActive, initialColor, activeColor, transitionDelay }) => ({
  display: 'inline-block',
  opacity: isActive ? 1 : 0.05,
  transform: isActive ? 'translateY(0px)' : 'translateY(10px)',
  color: isActive
    ? activeColor || 'rgba(0, 0, 0, 0.9)'
    : initialColor || 'rgba(0, 0, 0, 0.3)',
  transition: `
    opacity 0.6s ease-out,
    transform 0.6s ease-out,
    color 0.6s ease-out
  `,
  transitionDelay: `${transitionDelay ?? 0}ms`,
  willChange: 'opacity, transform, color',
}));

const LineWrapper = styled(Typography)({
  display: 'block',
  marginBottom: '16px', // <-- espaçamento entre parágrafos
});

/**
 * Componente que exibe um bloco de texto que vai “acendendo”
 * conforme entra na área visível da tela.
 *
 * A transição é feita **palavra a palavra** em sequência,
 * criando um efeito de leitura fluida e progressiva.
 *
 * Quebras de linha (`\n`) no `text` criam novos parágrafos.
 *
 * @example
 * ```tsx
 * <ScrollHighlightText
 *   text={`Introducing QuantumLab: Pioneering the Future of AI Research.\nEngineered to push the limits of artificial intelligence.`}
 *   variant="h4"
 * />
 * ```
 */
const ScrollHighlightText: React.FC<ScrollHighlightTextProps> = ({
  text,
  variant = 'body1',
  initialColor,
  activeColor,
  ...typographyProps
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setIsVisible(true);
        }
      },
      { threshold: Array.from({ length: 10 }, (_, i) => i / 10) }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const structuredLines = useMemo(() => {
    const rawLines = (text || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    return rawLines.map((line) => ({
      words: line.split(' ').filter(Boolean),
    }));
  }, [text]);

  const baseDelay = 40;
  let wordIndexGlobal = 0;

  return (
    <Box ref={containerRef} sx={{ display: 'block' }}>
      {structuredLines.map((line, lineIndex) => (
        <LineWrapper
          key={`line-${lineIndex}`}
          variant={variant}
          {...typographyProps}
        >
          {line.words.map((word, wordIndexInLine) => {
            const index = wordIndexGlobal;
            wordIndexGlobal += 1;

            return (
              <React.Fragment key={`word-${lineIndex}-${wordIndexInLine}`}>
                <Word
                  isActive={isVisible}
                  initialColor={initialColor}
                  activeColor={activeColor}
                  transitionDelay={index * baseDelay}
                >
                  {word}
                </Word>{' '}
              </React.Fragment>
            );
          })}
        </LineWrapper>
      ))}
    </Box>
  );
};

ScrollHighlightText.displayName = 'ScrollHighlightText';

export default ScrollHighlightText;

