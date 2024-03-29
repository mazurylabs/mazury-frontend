import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import { Avatar, Button } from 'components';
import { CustomInput } from '../CustomInput';
import { CompanyType, ListResponse, OpportunityType, Profile } from 'types';
import { axios } from 'lib/axios';
import { EditStepsEnum } from 'pages/opportunities/[opportunityId]/edit';
import { useAlert } from 'components/Alert.tsx';

interface Props {
  user?: Profile;
  opportunity?: OpportunityType<string>;
  onSubmit: (opportunity: Partial<OpportunityType<string>>) => void;
  onNavigate: (step: EditStepsEnum) => void;
}

const generateNewTreeValues = <T extends {}>(originalTree: T, newTree: T) => {
  let payload = {};

  for (let field in newTree) {
    if (originalTree[field] !== newTree[field]) {
      payload = { ...payload, [field]: newTree[field] };
    }
  }

  return payload as T;
};

export const CompanyInformation: React.FC<Props> = ({
  user,
  opportunity,
  onSubmit,
  onNavigate,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { dispatch } = useAlert({});

  const cachedCompany = queryClient.getQueryData<OpportunityType<CompanyType>>([
    'opportunity',
    opportunity?.id,
  ])?.company_info;

  const [company, setCompany] = React.useState<CompanyType | undefined>();
  const prevCompany = React.useRef<CompanyType>();
  const routeCompanyId = router.query?.['company-id'] as string;
  const [isNewCompany, setIsNewCompany] = React.useState(
    !!routeCompanyId || false
  );

  const handlePrefillForm = (data: CompanyType) => {
    setIsNewCompany(true);
    setCompany(data);
    prevCompany.current = data;
  };

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });

  const { mutate, isLoading: isSavingCompany } = useMutation({
    onSuccess: (data) => {
      queryClient.setQueryData<CompanyType[]>(['companies'], (prev) => {
        const isEditing = prev?.find((company) => company.id === data.id);

        return isEditing
          ? prev?.filter((company) => company.id !== data.id).concat(data)
          : prev?.concat(data);
      });

      setIsNewCompany(false);
      setCompany(data);
      onSubmit({ company_info: data.id });
      prevCompany.current = undefined;
    },
    mutationFn: () => {
      const payload =
        prevCompany.current && company
          ? generateNewTreeValues<CompanyType>(prevCompany.current, {
              ...company,
              contact_email: company.contact_email || user?.email || '',
            })
          : {
              ...company,
              contact_email: company?.contact_email || user?.email || '',
            };

      return updateCompany({
        ...payload,
        id: isNewCompany
          ? company?.id || cachedCompany?.id
          : opportunity?.company_info,
      });
    },
  });

  const handleChange = (value: Partial<CompanyType>) => {
    setCompany((prev) => ({ ...(prev || ({} as CompanyType)), ...value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length !== 0) {
      handleChange({ logo: files[0] as any });
      event.target.value = '';
    }
  };

  const handleBackButton = () => {
    if (isNewCompany) {
      setIsNewCompany(false);
    } else {
      onNavigate(EditStepsEnum.TYPE);
    }
  };

  return (
    <div className="w-full space-y-4 pb-10">
      {companies?.length &&
        !isNewCompany &&
        companies.map((company) => (
          <button
            className={clsx(
              'rounded-lg w-full py-3 px-4 flex items-center justify-between',
              company.id === opportunity?.company_info
                ? 'border-[1.5px] border-indigo-600'
                : 'border border-indigoGray-20'
            )}
            onClick={() => onSubmit({ company_info: company.id })}
          >
            <div className="flex items-center space-x-4">
              <Avatar
                outerClassName="h-12 w-12"
                src={company.logo}
                alt={company.name}
              />

              <p className="font-sans text-sm font-medium text-indigoGray-90">
                {company.name}
              </p>
            </div>
            <button
              type="button"
              className="font-sans text-sm text-indigoGray-50"
              onClick={() => handlePrefillForm(company)}
            >
              Edit information
            </button>
          </button>
        ))}

      <div
        className={clsx(
          'border rounded-lg border-indigoGray-20 w-full space-y-4 pb-3',
          !isNewCompany && 'hover:border-indigoGray-30'
        )}
      >
        <button
          type="button"
          className="flex items-center space-x-4 px-4 pt-3 w-full"
          onClick={() => {
            setIsNewCompany(!isNewCompany);
            setCompany(undefined);
            prevCompany.current = undefined;
          }}
        >
          <div className="h-12 w-12 rounded-[5px] flex items-center justify-center bg-indigoGray-5 border border-indigoGray-20">
            <SVG src="/icons/plus.svg" className="text-indigoGray-90 w-4 h-4" />
          </div>
          <p className="font-sans text-sm font-medium text-indigoGray-90">
            New company
          </p>
        </button>

        {isNewCompany && (
          <form
            className="space-y-4 px-4"
            onSubmit={(event) => {
              event.preventDefault();
              mutate();
            }}
          >
            <div className="space-y-3">
              <CustomInput
                label="Contact e-mail"
                placeholder="Insert e-mail"
                value={
                  company?.contact_email ||
                  user?.email ||
                  cachedCompany?.contact_email ||
                  ''
                }
                onChange={(value) => handleChange({ contact_email: value })}
              />
              <CustomInput
                label="Company name"
                placeholder="Insert name"
                value={company?.name || cachedCompany?.name || ''}
                onChange={(value) => handleChange({ name: value })}
              />
              <CustomInput
                label="Description"
                placeholder="Write a short description"
                value={company?.description || cachedCompany?.description || ''}
                onChange={(value) => handleChange({ description: value })}
              />

              <Popover.Root>
                <div>
                  <div className="font-sans text-indigoGray-40 text-sm">
                    Company size{' '}
                    <span className="font-sans font-normal text-indigoGray-30">
                      (Required)
                    </span>
                  </div>

                  <Popover.Trigger asChild className="w-full text-start">
                    <button
                      type="button"
                      className="py-3 px-4 border border-indigoGray-20 rounded-lg h-[45px] text-sm font-medium font-sans text-indigoGray-50"
                    >
                      {company?.size || cachedCompany?.size || 'Choose size'}
                    </button>
                  </Popover.Trigger>
                </div>

                <Popover.Portal>
                  <Popover.Content align="start" sideOffset={4}>
                    <div className="rounded-lg bg-white py-[5px] shadow-lg font-sans text-sm font-semibold text-indigo-600 flex flex-col w-[calc(100vw-64px)] lg:w-[342px] space-y-[5.5px]">
                      <DropdownButton
                        size={company?.size || cachedCompany?.size}
                        label="Less than 10 people"
                        onClick={(size) => handleChange({ size })}
                      />
                      <DropdownButton
                        size={company?.size || cachedCompany?.size}
                        label="Between 10 and 50 people"
                        onClick={(size) => handleChange({ size: '10 - 50' })}
                      />
                      <DropdownButton
                        size={company?.size || cachedCompany?.size}
                        label="Between 50 and 200 people"
                        onClick={(size) => handleChange({ size: '50 - 200' })}
                      />
                      <DropdownButton
                        size={company?.size || cachedCompany?.size}
                        label="More than 200 people"
                        onClick={(size) => handleChange({ size: '200+' })}
                      />
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              <div className="space-y-2">
                <p className="text-sm font-sans text-indigoGray-40">
                  Company logo
                </p>
                <div className="relative w-fit rounded-full">
                  <Avatar
                    variant="xl"
                    src={
                      company?.logo
                        ? typeof company?.logo === 'string'
                          ? company.logo
                          : typeof company?.logo === 'object'
                          ? URL.createObjectURL(company.logo as any)
                          : ''
                        : typeof cachedCompany?.logo === 'string'
                        ? cachedCompany?.logo
                        : typeof cachedCompany?.logo === 'object'
                        ? URL.createObjectURL(cachedCompany?.logo as any)
                        : ''
                    }
                    alt={company?.name || cachedCompany?.name || 'logo'}
                  />
                  <label
                    className={`flex cursor-pointer items-center rounded-[40px] bg-[rgb(248,249,252)]/90 px-4 py-2 font-sansMid text-xs font-medium text-indigoGray-90 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[99px]`}
                    htmlFor="logo"
                  >
                    Add picture
                  </label>

                  <input
                    id="logo"
                    accept="image/*"
                    type="file"
                    onInput={handleFileUpload}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              className="font-semibold"
              type="submit"
              loading={isSavingCompany}
            >
              Save information
            </Button>
          </form>
        )}
      </div>

      <div className="flex w-full justify-between">
        <Button
          variant="tertiary"
          size="large"
          onClick={() => handleBackButton()}
        >
          <SVG src="/icons/chevron-left.svg" className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          variant="primary"
          size="large"
          className="text-indigoGray-5 ml-[auto] bg-teal-600"
          onClick={() => onNavigate(EditStepsEnum.DETAILS)}
          disabled={
            !opportunity?.company_info ||
            (!company && !cachedCompany && isNewCompany)
          }
        >
          Continue{' '}
          <SVG src="/icons/chevron-right.svg" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const DropdownButton = ({
  size,
  label,
  onClick,
}: {
  size?: string;
  label: string;
  onClick: (label: string) => void;
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'pr-6 pl-4 text-start',
        size === label && 'font-medium text-indigoGray-90'
      )}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

const getCompany = async (companyId?: string) => {
  const { data } = await axios.get<CompanyType>(`/companies/${companyId}/`);
  return data;
};

const updateCompany = async ({ id, ...company }: Partial<CompanyType>) => {
  const formData = new FormData();

  for (let key in company) {
    if (key === 'logo' && company[key]) {
      formData.append('logo', company.logo as any, company.name);
    }
    // @ts-ignore
    formData.append(key, company[key]);
  }

  const { data } = await axios[id ? 'patch' : 'post']<CompanyType>(
    `/companies/${id ? `${id}/` : ''}`,
    formData
  );
  return data;
};

const getCompanies = async () => {
  const { data } = await axios.get<ListResponse<CompanyType>>(`/companies/`);
  return data.results;
};
