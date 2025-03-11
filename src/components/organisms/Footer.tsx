"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
  icon: string;
  iconAlt: string;
}

interface FooterProps {
  links: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      {links.map((link, index) => (
        <motion.a
          key={index}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={link.icon}
            alt={link.iconAlt}
            width={16}
            height={16}
          />
          {link.label}
        </motion.a>
      ))}
    </footer>
  );
};

export default Footer;
