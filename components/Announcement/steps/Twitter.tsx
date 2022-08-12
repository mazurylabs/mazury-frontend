import React from 'react';
import SVG from 'react-inlinesvg';

export const Twitter = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          Twitter 🤖
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          We have a new bot on Twitter! It’s going to publish referrals on
          Twitter for you to easily retweet them or print for your parents ✨
        </p>
      </div>

      <div className="h-[250px] w-[250px] w-fit">
        <SVG src="/icons/twitter-showcase.svg" height={250} width={250} />
      </div>
    </div>
  );
};
