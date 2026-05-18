
import { styled } from '@mui/material/styles';
import { ContentSafeSection } from './SectionStyled';

const ContainerSection = styled('section', {
  shouldForwardProp: (prop) =>
    !['padding', 'background'].includes(prop as string),
})<{
  padding: string;
  background: string;
}>(({ padding, background }) => ({

  position: 'relative',  
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',  
  maxWidth: '100%',
  zIndex: '0',   
  padding: padding,
  background: background, 
}));

const DivStyle = styled('div', {
  shouldForwardProp: (prop) =>
    !['border_radius', 'background'].includes(prop as string),
})<{  
  border_radius: string;  
  background: string; 
}>(({ border_radius, background}) => ({

  width: '100%',  
  borderRadius: border_radius,
  boxSizing: 'border-box', 
  position: 'relative', 
  zIndex: '1',
  display: 'flex',
  justifyContent: 'center',
  background: background,
}));


interface SectionProps { 
  /** 
   * Identificador único da seção (usado no atributo id do <section>).
   */
  section_id: string; 

  /** 
   * Cor de fundo da seção. 
   * Pode ser cor sólida, gradiente ou imagem (`url(...)`).
   * @default "transparent"
   */
  background?: string; 

  /** 
   * Arredondamento da borda aplicada no wrapper. 
   * @default "0"
   */
  border_radius_wrapper?: string;       

  /** 
   * Cor de fundo aplicada no wrapper. 
   * @default "transparent"
   */
  background_wrapper?: string; 

  /** 
   * Padding da seção (aplicada no wrapper).
   * @default "0"
   */
  padding?: string;

  /** 
   * Elementos que serão exibidos dentro da seção.
   */
  children: React.ReactNode; 
  
  /**
   * Imagens adicionais de fundo para decoração.
   * Pode ser `<img>` ou `<Image>` do Next.js.
   */
  backgroundImages?: React.ReactNode | React.ReactNode[];
}  

/**
 * Componente de seção genérica.
 *
 * Usado para estruturar páginas com fundo customizado,
 * áreas de segurança internas e possibilidade de renderizar
 * imagens de fundo. 
 *
 * ### Exemplo de uso:
 * ```tsx
 * <Section
 *   section_id="sobre"
 *   background="linear-gradient(to right, #fff, #eee)"
 *   border_radius="16px"
 *   background_wrapper="#fff"
 * >
 *   <h2>Sobre nós</h2>
 *   <p>Texto da seção...</p>
 * </Section>
 * ```
 */
const Section: React.FC<SectionProps> = ({ 
    section_id, 
    background = 'transparent', 
    border_radius_wrapper = '0',
    background_wrapper = 'transparent',     
    padding = '0',  
    children, 
    backgroundImages }) => {
  
    return (
      
      <ContainerSection id={section_id} padding={padding} background={background}> 
        <DivStyle border_radius={border_radius_wrapper} background={background_wrapper}>
          <ContentSafeSection>
            { children }
          </ContentSafeSection>
          {backgroundImages && backgroundImages}          
        </DivStyle>
      </ContainerSection>
     
    );  
};

export default Section;
