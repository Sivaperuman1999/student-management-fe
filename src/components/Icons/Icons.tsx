export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  onClick,
}: IconProps) => {
  return (
    <img
      src={`../public/images/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      style={{
        cursor: onClick ? "pointer" : "default",
        filter: color !== "currentColor" ? `invert(0)` : undefined,
      }}
      onClick={onClick}
    />
  );
};

export default Icon;
