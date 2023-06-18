"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
const ThemeToggler = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      variant="ghost"
      className="bottom-32 rounded-lg bg-transparent text-lg text-foreground transition-all duration-100"
    >
    LIGHT 
    </Button>
  );
};

export default ThemeToggler;
