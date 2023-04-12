import { NextPageContext } from 'next';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from 'components';
import { useAlert } from 'components/Alert.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CompanyInformation,
  OpportunityDescription,
  OpportunityDetails,
  OpportunityType,
} from 'views/Opportunities/edit';
import { OpportunityType as Opportunity } from 'types';
import { axios } from 'lib/axios';

type Props = {
  projectId: string;
};

export enum EditStepsEnum {
  TYPE = 'Opportunity type',
  COMPANY_INFORMATION = 'Company information',
  DETAILS = 'Opportunity details',
  DESCRIPTION = 'Opportunity description',
}

const Edit: React.FC<Props> = ({ projectId }) => {
  const router = useRouter();
  const { dispatch } = useAlert({});
  const queryClient = useQueryClient();
  const [selectedStep, setSelectedStep] = React.useState<EditStepsEnum>(
    EditStepsEnum.TYPE
  );
  const [opportunity, setOpportunity] = React.useState<Opportunity<string>>();

  const { mutate, isLoading: isSubmitting } = useMutation({
    onSuccess: (data) => {
      queryClient.refetchQueries(['opportunitity', projectId]);
      router.push(`/opportunities/${data.id}`);
    },
    mutationFn: () =>
      createOpportunity({
        ...(opportunity || ({} as Opportunity<string>)),
      }),
  });

  const handleOpportunity = (value: Partial<Opportunity<string>>) =>
    setOpportunity((prev) => ({
      ...(prev || ({} as Opportunity<string>)),
      ...value,
    }));

  const editSteps: Record<
    EditStepsEnum,
    { step: number; component: JSX.Element }
  > = {
    [EditStepsEnum.TYPE]: {
      step: 1,
      component: (
        <OpportunityType
          opportunity={opportunity}
          onNavigate={() => setSelectedStep(EditStepsEnum.COMPANY_INFORMATION)}
          onSubmit={(opportunity) => {
            handleOpportunity(opportunity);
          }}
        />
      ),
    },
    [EditStepsEnum.COMPANY_INFORMATION]: {
      step: 2,
      component: (
        <CompanyInformation
          opportunity={opportunity}
          onSubmit={(opportunity) => {
            handleOpportunity(opportunity);
          }}
          onNavigate={(step) => {
            setSelectedStep(step);
          }}
        />
      ),
    },
    [EditStepsEnum.DETAILS]: {
      step: 3,
      component: (
        <OpportunityDetails
          opportunity={opportunity}
          onNavigate={(step) => {
            setSelectedStep(step);
          }}
          onChange={(opportunity) => {
            handleOpportunity(opportunity);
          }}
        />
      ),
    },
    [EditStepsEnum.DESCRIPTION]: {
      step: 4,
      component: (
        <OpportunityDescription
          opportunity={opportunity}
          onChange={(opportunity) => {
            handleOpportunity(opportunity);
          }}
          isSubmitting={isSubmitting}
          onSubmit={() => mutate()}
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
            <Link href={`/projects/${projectId}`}>
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
      projectId: context.query.projectId,
    },
  };
};

const createOpportunity = async (opportunity: Opportunity<string>) => {
  const { data } = await axios.post<Opportunity<string>>(
    `/opportunities/`,
    opportunity
  );
  return data;
};
