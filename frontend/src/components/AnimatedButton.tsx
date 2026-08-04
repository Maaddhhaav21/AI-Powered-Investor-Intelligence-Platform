import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export function AnimatedButton({ children, ...props }: ButtonProps & { children: ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
