import { NextPageContext } from 'next';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'next/link';

import { Layout } from 'components';
import { useAlert } from 'components/Alert.tsx';
import {
  CompanyInformation,
  OpportunityDescription,
  OpportunityDetails,
  OpportunityType,
} from 'views/Opportunities/edit';

type Props = {
  opportunityId: string;
};

export enum EditStepsEnum {
  TYPE = 'Opportunity type',
  COMPANY_INFORMATION = 'Company information',
  DETAILS = 'Opportunity details',
  DESCRIPTION = 'Opportunity description',
}

const Edit: React.FC<Props> = ({ opportunityId }) => {
  const { dispatch } = useAlert({});
  const [selectedStep, setSelectedStep] = React.useState<EditStepsEnum>(
    EditStepsEnum.TYPE
  );

  const editSteps: Record<
    EditStepsEnum,
    { step: number; component: JSX.Element }
  > = {
    [EditStepsEnum.TYPE]: {
      step: 1,
      component: (
        <OpportunityType
          onSubmit={() => {
            setSelectedStep(EditStepsEnum.COMPANY_INFORMATION);
          }}
        />
      ),
    },
    [EditStepsEnum.COMPANY_INFORMATION]: {
      step: 2,
      component: (
        <CompanyInformation
          onSave={() => {}}
          onSubmit={() => {
            setSelectedStep(EditStepsEnum.DETAILS);
          }}
          onBack={() => setSelectedStep(EditStepsEnum.TYPE)}
        />
      ),
    },
    [EditStepsEnum.DETAILS]: {
      step: 3,
      component: (
        <OpportunityDetails
          onBack={() => setSelectedStep(EditStepsEnum.COMPANY_INFORMATION)}
          onSubmit={(event) => {
            event.preventDefault();
            setSelectedStep(EditStepsEnum.DESCRIPTION);
          }}
        />
      ),
    },
    [EditStepsEnum.DESCRIPTION]: {
      step: 4,
      component: (
        <OpportunityDescription
          onSubmit={() => {
            dispatch({ message: 'Published', type: 'notification' });
          }}
          onBack={() => setSelectedStep(EditStepsEnum.DETAILS)}
        />
      ),
    },
  };

  return (
    <Layout variant="plain" showMobileSidebar={false} className="!px-2">
      <div className="flex flex-col grow space-y-6">
        <div className="border-transparent flex justify-center lg:border-b lg:border-b-indigoGray-20">
          <div className="px-4 pb-4 pt-6 flex space-x-3 items-center grow max-w-[730px] xl:max-w-[930px] lg:pt-16 lg:px-0">
            <Link href={`/opportunities/${opportunityId}`}>
              <SVG src="/icons/chevron-left.svg" width={24} height={24} />
            </Link>
            <p className="font-sans font-medium text-2xl text-indigoGray-90">
              Create opportunity
            </p>
          </div>
        </div>

        <div className="flex grow justify-center">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 grow max-w-[730px] xl:max-w-[930px]">
            <div className="lg:max-w-[230px] lg:grow">
              <p className="font-sans font-medium text-xs text-indigoGray-40">
                {editSteps[selectedStep].step} of 4
              </p>
              <p className="font-sans font-semibold text-indigoGray-70">
                {selectedStep}
              </p>
            </div>

            <div className="grow">{editSteps[selectedStep].component}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      opportunityId: context.query.opportunityId,
    },
  };
};
