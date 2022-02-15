import { Avatar } from '.';
import NumberFormat from 'react-number-format';

interface Props {
  imgSrc: string;
  heading: string;
  description: string;
  totalCount: number;
}

export const BadgePreview: React.FC<Props> = ({
  imgSrc,
  heading,
  description,
  totalCount,
}) => {
  return (
    <div className="flex gap-4">
      <Avatar src={imgSrc} height="100px" width="100px" />

      <div className="flex flex-col gap-2">
        <h5 className="font-serif text-2xl font-bold text-indigoGray-90">
          {heading}
        </h5>
        <p className="text-sm font-medium text-indigoGray-80">{description}</p>
        <span className="text-sm font-medium text-indigoGray-50">
          <NumberFormat
            value={totalCount}
            displayType="text"
            thousandSeparator
          />{' '}
          people have this badge
        </span>
      </div>
    </div>
  );
};
