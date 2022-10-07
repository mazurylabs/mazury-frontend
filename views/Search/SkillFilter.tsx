import * as React from 'react';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import ScrollLock from 'react-scrolllock';
import debounce from 'lodash.debounce';

import { Button, Checkbox } from 'components';

import { useScreenWidth, useIntersection } from 'hooks';
import { FilterState, FilterType, ValueOf } from 'types';
import { fadeAnimation, trayAnimation } from 'utils';
import { axios } from 'lib/axios';

interface SkillFilterProps {
  selectedSkills: string[];
  handleSelectSkill: (
    key: keyof FilterState,
    value: ValueOf<FilterState>
  ) => void;
  handleGoBack: (filter: FilterType) => void;
  handleApplyFilter: (key: keyof FilterState, reset?: boolean) => void;
}

type Skill = { name: string; slug: string };

export const SkillFilter = ({
  selectedSkills,
  handleGoBack,
  handleSelectSkill,
  handleApplyFilter,
}: SkillFilterProps) => {
  const initialMount = React.useRef(false);
  const intersectionRef = React.useRef(null!);

  const screenWidth = useScreenWidth();
  const shouldFetch = useIntersection(intersectionRef.current);

  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cursor, setCursor] = React.useState('');

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSkill = (slug: string) => {
    if (selectedSkills.includes(slug)) {
      const updatedSkills = selectedSkills.filter((skill) => skill !== slug);
      handleSelectSkill('skills', updatedSkills);
    } else {
      const updatedSkills = [...selectedSkills, slug];
      handleSelectSkill('skills', updatedSkills);
    }
  };

  const handleSearch = React.useCallback(
    debounce(async (query) => {
      const searchEndpoint = `/search/skills/?query=${query}`;

      const result = await axios.get(searchEndpoint);
      const nextCursor = result.data.next?.split('.com/')[1];

      if (cursor !== nextCursor) {
        setSkills(result?.data?.results);
        setCursor(nextCursor);
      }
    }, 500),
    [cursor]
  );

  React.useEffect(() => {
    const fetchMore = async () => {
      try {
        initialMount.current === true;
        let endpoint = cursor || searchTerm ? cursor : 'search/skills/?query';

        const result = await axios.get(endpoint);

        const nextCursor = result.data.next?.split('.com/')[1];

        if (cursor !== nextCursor) {
          //only load add unique data
          let updatedResult = skills?.concat(result?.data?.results);
          setSkills(updatedResult);
          setCursor(nextCursor);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!initialMount.current) {
      fetchMore();
      initialMount.current = shouldFetch;
    }
  }, [shouldFetch]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-[600px] w-full !cursor-default flex-col rounded-3xl bg-white p-6 shadow-base md:h-[687px] md:w-[500px] md:pb-2 lg:h-[400px]"
    >
      <div className="mb-6 lg:hidden">
        <button
          type="button"
          className="flex space-x-4"
          onClick={() => handleGoBack('empty')}
        >
          <div className="h-6 w-6">
            <SVG src="/icons/back.svg" height={24} width={24} />
          </div>
          <span className="font-sans text-xl font-medium leading-[30px] text-indigoGray-90">
            Referred skills
          </span>
        </button>
      </div>

      <div>
        <form
          className="flex h-12 w-full items-center space-x-[18px] rounded-lg bg-indigoGray-5 py-2 pl-[14px] pr-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex h-6 w-6 space-x-4">
            <SVG height={24} width={24} src={`/icons/search-black.svg`} />
          </div>

          <div className="grow font-sans text-base font-medium">
            <input
              type="text"
              placeholder="Skill name"
              aria-label="Search"
              className="h-full w-full bg-transparent"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <ScrollLock>
        <div className="flex grow overflow-y-auto">
          <ul className="mt-7 grow space-y-8 overflow-x-hidden">
            {skills?.map((skill, index) => (
              <li className="flex space-x-4" key={skill.name + index}>
                <Checkbox
                  key={skill.name}
                  label={
                    <div className="w-full font-sans">
                      <p className="flex w-full text-base font-medium text-indigoGray-90">
                        <span>{skill.name}</span>
                        {/* <span className="opacity-0" role="presentation">
                          i
                        </span>
                        <span className="text-indigoGray-40">
                          ({commify(Number(badge.total_supply))})
                        </span> */}
                      </p>
                    </div>
                  }
                  checked={selectedSkills.includes(skill.slug)}
                  setChecked={() => handleSkill(skill.slug)}
                  id={skill.name}
                  outerClassName="shrink-0"
                />
              </li>
            ))}

            <li
              className="h-[0.1px] w-full bg-transparent"
              ref={intersectionRef}
            />
          </ul>
        </div>
      </ScrollLock>

      <div className="ml-auto flex space-x-4 pt-2">
        <Button onClick={() => handleApplyFilter('skills')}>Apply</Button>

        <Button
          variant="secondary"
          onClick={() => handleApplyFilter('skills', true)}
        >
          Reset
        </Button>
      </div>
    </motion.div>
  );
};
