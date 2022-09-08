import { FeedbackFish } from '@feedback-fish/react';

const FeedbackFishButton = () => {
  // Get your projectId from your dashboard at feedback.fish/app
  return (
    <FeedbackFish projectId="36a0493932a949">
      <button className="fixed right-4 bottom-4 hidden rounded-lg border border-blue-100 bg-blue-50 px-6 py-3 font-medium text-blue-600 lg:block">
        Give us feedback
      </button>
    </FeedbackFish>
  );
};

export default FeedbackFishButton;
