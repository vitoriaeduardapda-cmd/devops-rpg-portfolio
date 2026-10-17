// Mock simples da imagem do Next.js para evitar erros em ambiente de teste
module.exports = {
  __esModule: true,
  default: (props) => {
    const { src, alt, ...rest } = props;
    return React.createElement("img", { src, alt, ...rest });
  },
};
