import { computed } from "vue";

interface ButtonProps {
  variant: string;
}

export function useButton({ variant }: ButtonProps) {
  const variantClasses: Record<string, string> = {
    default: "button--default",
  };

  const variantClass = computed(() => {
    return variantClasses[variant] || variantClasses["default"];
  });

  return {
    variantClass,
  };
}
