import { useState, useEffect } from 'react';

type Sections = 'activity' | 'badges' | 'referrals' | 'writing';
const sectionsOrder = ['activity', 'badges', 'referrals', 'writing'];

export const useIntersection = (
  element: HTMLElement | null,
  rootMargin?: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setState(entry.isIntersecting);
        },
        { rootMargin }
      );

      element && observer.observe(element);

      return () => observer.unobserve(element);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, rootMargin]);

  return isVisible;
};

export const useActiveProfileSection = () => {
  const [activityRef, setActivityRef] = useState<HTMLElement | null>(null);
  const [altActivityRef, setAltActivityRef] = useState<HTMLElement | null>(
    null
  );
  const [badgesRef, setBadgesRef] = useState<HTMLElement | null>(null);
  const [referralsRef, setReferralsRef] = useState<HTMLElement | null>(null);
  const [writingRef, setWritingRef] = useState<HTMLElement | null>(null);

  const activityIsVisible = useIntersection(activityRef);
  const altActivityIsVisible = useIntersection(altActivityRef);
  const badgesIsVisible = useIntersection(badgesRef);
  const referralsIsVisible = useIntersection(referralsRef);
  const writingIsVisible = useIntersection(writingRef);

  const [activeSection, setActiveSection] = useState<Sections>('activity');

  useEffect(() => {
    setActivityRef(document.getElementById('activity'));
    setAltActivityRef(document.getElementById('activity-alt'));
    setBadgesRef(document.getElementById('badges'));
    setReferralsRef(document.getElementById('referrals'));
    setWritingRef(document.getElementById('writing'));
  }, []);

  useEffect(() => {
    if (activityIsVisible) {
      setActiveSection('activity');
    } else if (altActivityIsVisible) {
      setActiveSection('activity');
    } else if (badgesIsVisible) {
      setActiveSection('badges');
    } else if (referralsIsVisible) {
      setActiveSection('referrals');
    } else if (writingIsVisible) {
      setActiveSection('writing');
    }
  }, [
    activityIsVisible,
    altActivityIsVisible,
    badgesIsVisible,
    referralsIsVisible,
    writingIsVisible,
  ]);

  return activeSection;
};
