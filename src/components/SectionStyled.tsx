import { styled } from '@mui/material/styles';

/**
 * Container de seção com layout em **duas colunas responsivas**.
 *
 * - No mobile (largura < 960px) → 1 coluna
 * - No desktop (largura ≥ 960px) → 2 colunas
 *
 * Props customizáveis:
 * @property margin - Espaçamento externo (default: `"0px"`)
 * @property padding - Espaçamento interno (default: `"0"`)
 * @property border_radius - Arredondamento da borda (default: `"0"`)
 * @property background - Cor ou imagem de fundo (default: `"transparent"`)
 */
export const ContentSection2ColumnsWrap = styled('div', {
  shouldForwardProp: (prop) =>
    !['margin','padding', 'border_radius', 'background',].includes(prop as string),
})<{margin?: string; padding?: string; border_radius?: string; background?: string;}>
(({ margin = '0px', padding='0', border_radius='0', background='transparent'}) => ({
    width: '100%',
    height: '100%',      
    display: 'grid',
    gridTemplateColumns: '1fr', 
    justifyContent: 'flex-start',                    
    gap: '1.5rem', 
    padding: padding,
    margin: margin,
    borderRadius: border_radius,
    background: background,  
      
    '@media (min-width: 960px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
    }
}));

export const ContentSafeSection = styled('div')(({theme}) => ({
    
  position: 'relative',
  height: '100%',  
  width: '100%',  
  zIndex: '99', 
 
  [theme.breakpoints.between(0, 'sm')]: { 
    margin: theme.pipelinesolucoes?.safeArea?.xs?.margin ?? '0', 
    padding: theme.pipelinesolucoes?.safeArea?.xs?.padding ?? '0',
    maxWidth: theme.pipelinesolucoes?.safeArea?.xs?.maxWidth ?? '100%',
  },

  [theme.breakpoints.up('sm')]: { 
    margin: theme.pipelinesolucoes?.safeArea?.sm?.margin ?? '0', 
    padding: theme.pipelinesolucoes?.safeArea?.sm?.padding ?? '0' },
    maxWidth: theme.pipelinesolucoes?.safeArea?.sm?.maxWidth ?? '100%',

  [theme.breakpoints.up('md')]: { 
    margin: theme.pipelinesolucoes?.safeArea?.md?.margin ?? '0', 
    padding: theme.pipelinesolucoes?.safeArea?.md?.padding ?? '0', 
    maxWidth: theme.pipelinesolucoes?.safeArea?.md?.maxWidth ?? '100%',
  },
    
  [theme.breakpoints.up('lg')]: { 
    margin: theme.pipelinesolucoes?.safeArea?.lg?.margin ?? '0', 
    padding: theme.pipelinesolucoes?.safeArea?.lg?.padding ?? '0', 
    maxWidth: theme.pipelinesolucoes?.safeArea?.lg?.maxWidth ?? '100%',
  },

  [theme.breakpoints.up('xl')]: { 
    margin: theme.pipelinesolucoes?.safeArea?.xl?.margin ?? '0', 
    padding: theme.pipelinesolucoes?.safeArea?.xl?.padding ?? '0',
    maxWidth: theme.pipelinesolucoes?.safeArea?.xl?.maxWidth ?? '100%', 
  }, 
    

}));