export const cardColorUtils = () => {
  // Color utilities
  const getIconClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      primary: "text-primary",
      emerald: "text-emerald-500",
      indigo: "text-indigo-500",
      amber: "text-amber-500",
      orange: "text-orange-500",
      rose: "text-rose-500",
    };
    return colorMap[color] || "text-primary";
  };

  const getIconBgClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      primary: "bg-primary/10",
      emerald: "bg-emerald-500/10",
      indigo: "bg-indigo-500/10",
      amber: "bg-amber-500/10",
      orange: "bg-orange-500/10",
      rose: "bg-rose-500/10",
    };
    return colorMap[color] || "bg-primary/10";
  };

  const getBorderClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      primary: "border-primary/20",
      emerald: "border-emerald-500/20",
      indigo: "border-indigo-500/20",
      amber: "border-amber-500/20",
      orange: "border-orange-500/20",
      rose: "border-rose-500/20",
    };
    return colorMap[color] || "border-primary/20";
  };

  const getHoverTextClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      primary: "group-hover:text-primary dark:group-hover:text-primary-400",
      emerald: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
      indigo: "group-hover:text-indigo-500 dark:group-hover:text-indigo-400",
      amber: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
      orange: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
      rose: "group-hover:text-rose-500 dark:group-hover:text-rose-400",
    };
    return (
      colorMap[color] ||
      "group-hover:text-primary dark:group-hover:text-primary-400"
    );
  };

  const getAnimationClass = (index: number, delay?: boolean): string => {
    if (!delay) return "animate-fade-in";

    const classes = [
      "animate-fade-in-delayed-1",
      "animate-fade-in-delayed-2",
      "animate-fade-in-delayed-3",
      "animate-fade-in-delayed-4",
    ];

    return classes[index % 4] || "animate-fade-in";
  };

  return {
    getIconClass,
    getIconBgClass,
    getBorderClass,
    getHoverTextClass,
    getAnimationClass,
  };
};
