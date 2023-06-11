"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  navigationMenuLogoStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Logo } from "./Logo";
import { LogoTypography } from "./LogoTypography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggler from "./ThemeToggler";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Navigation() {
  const { data: sessionData } = useSession();
  return (
    <div className="hidden justify-between border-b py-1 md:flex">
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuLogoStyle()}>
                <div className="flex">
                  <Logo className="mx-2" />
                  <LogoTypography />
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Create</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[1000px] lg:grid-cols-[1fr_1fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <img
                        src="https://assets-prd.ignimgs.com/2022/06/12/keyboard-2-1655071227274.jpg?width=1280"
                        alt="keyboard"
                        className=" mb-2 rounded-md opacity-90"
                      />
                      <Icons.keyboard className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Build your own keyboard.
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Start customizing your own custom keyboard.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Icons.mouse className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Build your own mouse.
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Start customizing your own custom mouse.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>

                <ListItem href="/docs" title="Tutorial">
                  A step-by-step guide on how to create a project.
                </ListItem>
                <ListItem href="/docs/installation" title="History">
                  View past creations.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="More">
                  Full list of customizable components.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Store</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className=" justify-end">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar className="h-7 w-7">
                {sessionData && (
                  <AvatarImage
                    src={sessionData.user.image}
                    alt={`${sessionData.user.name || "user's"} profile picture`}
                  />
                )}
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <p className="w-24">
                {sessionData ? sessionData.user.name : "Sign in"}
              </p>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-7">
              <ul className="grid w-36 gap-3">
                <ListItem className="">
                  {sessionData ? (
                    <div>
                      <div className="grid grid-cols-2">
                        <div className="flex">
                          <User className="mr-2 w-4 text-primary" />
                        </div>

                        <p className="">Profile</p>
                      </div>
                      <Button
                        className="grid grid-cols-2"
                        onClick={
                   
                            () => void signOut()
                        
                        }
                      >
                        <div className="flex">
                          <LogOut className="mr-2 w-4 text-primary" />
                        </div>
                        <p className="">Sign Out</p>
                      </Button>
                    </div>
                  ) : (
                    <Button  onClick={
                      () => void signOut()}
                      >
                      <div className="grid grid-cols-2">
                        <div className="flex">
                          <LogIn className="mr-2 w-4 text-primary" />
                        </div>
                        <p>Sign In</p>
                      </div>
                    </Button>
                  )}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeToggler />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
