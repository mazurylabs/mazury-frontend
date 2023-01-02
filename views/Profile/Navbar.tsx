import Link from 'next/link';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NavItem } from './type';

export const Navbar = ({ links }: { links: NavItem[] }) => {
  return (
    <div className="flex space-x-4">
      {links.map((link) => (
        <NavLink
          key={link.label}
          label={link.label}
          href={link.href}
          isActive={link.isActive}
          value={link.value}
          icon={link.icon}
        />
      ))}
    </div>
  );
};

const NavLink = ({
  icon,
  label,
  value,
  href,
  isActive,
}: {
  href: string;
  icon?: string;
  label: string;
  value?: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href}>
      <a
        className={`flex items-center space-x-2 ${
          isActive
            ? 'bg-indigoGray-90 font-sansSemi font-semibold text-indigo-50'
            : 'bg-transparent font-sansMid font-medium text-indigoGray-90'
        } rounded-md px-3 py-2 text-sm`}
      >
        {icon && <SVG src={icon} height={16} width={16} />}
        <span>{label}</span>
        {value && (
          <p
            className={`font-sansMid font-medium ${
              isActive ? 'indigoGray-5' : 'text-indigoGray-40'
            }`}
          >
            {value}
          </p>
        )}
      </a>
    </Link>
  );
};
