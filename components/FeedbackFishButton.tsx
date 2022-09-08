import { FeedbackFish } from '@feedback-fish/react';

const FeedbackFishButton = () => {
  // Get your projectId from your dashboard at feedback.fish/app
  return (
    <FeedbackFish projectId="36a0493932a949">
      <button className="absolute right-10 bottom-4 hidden rounded-lg border border-gray-900 bg-white px-2 py-1 lg:block">
        Send feedback
      </button>
    </FeedbackFish>
  );
};

export default FeedbackFishButton;
