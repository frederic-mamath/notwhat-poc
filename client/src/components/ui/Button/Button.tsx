interface Props {
  disabled?: boolean;
}

export const Button = ({}: Props & HTMLButtonElement) => {
  return <button>Im a button</button>;
};

export default Button;
