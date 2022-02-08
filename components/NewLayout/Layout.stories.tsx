import { ComponentMeta, ComponentStory } from '@storybook/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Avatar } from '..';
import { SidebarContext } from '../../contexts';
import { InputWithIcon } from '../SearchInput';

import { Layout } from './Layout';

export default {
  title: 'Components/Layout',
  component: Layout,
  argTypes: {
    sidebarContent: {
      control: { type: 'text' },
    },
    innerLeftContent: {
      control: { type: 'text' },
    },
    innerRightContent: {
      control: { type: 'text' },
    },
    headerContent: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

const Sidebar = () => {
  const { isOpen } = useContext(SidebarContext);

  return (
    <>
      <Avatar
        src='/waves.png'
        height='40px'
        width='40px'
        alt='Mazury logo'
        className='mx-auto'
      />
      <menu
        className={`flex flex-col gap-12 mt-12 text-xl font-bold ${
          isOpen ? 'items-start' : 'items-center'
        } h-[100%] ${isOpen && 'px-4'}`}
      >
        <InputWithIcon
          iconAlt='Search icon'
          iconSrc='/icons/search.svg'
          expanded={isOpen}
        />
        <Link href='/' passHref>
          <a className='flex items-center gap-4 text-sm font-medium text-indigoGray-50'>
            <img src='/icons/home.svg' alt='Home icon' /> {isOpen && 'Home'}
          </a>
        </Link>

        <Link
          href='/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3'
          passHref
        >
          <a className='flex items-center gap-4 text-sm font-medium text-indigoGray-50'>
            <img src='/profile-active.svg' alt='Profile icon' />{' '}
            {isOpen && 'Profile'}
          </a>
        </Link>

        <Link href='/' passHref>
          <a className='flex items-center gap-4 text-sm font-medium text-indigoGray-50 mt-auto pb-12'>
            <img src='/icons/sliders.svg' alt='Settings icon' />{' '}
            {isOpen && 'Settings'}
          </a>
        </Link>
      </menu>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  sidebarContent: <Sidebar />,
  innerLeftContent: <h1>Inner left</h1>,
  innerRightContent: <h1>Inner right</h1>,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  sidebarContent: <Sidebar />,
  innerLeftContent: <h1>Inner left</h1>,
  innerRightContent: <h1>Inner right</h1>,
  headerContent: <h1>header</h1>,
};
