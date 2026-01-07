import { services, type ServiceCategoryId } from '../services';
import { Icon } from './Icon';

type Props = {
  titles: string[];
  lists: ServiceCategoryId[];
  colors: string[];
  icons: string[];
  cssStyles: string;
};

export function BillingList({ titles, lists, colors, icons, cssStyles }: Props) {
  return (
    <>
      {lists.map((categoryId, index) => {
        const category = services.categories.at(index);
        const items = services[categoryId];
        const color = colors.at(index) ?? category?.color;
        const title = titles.at(index);
        const icon = icons.at(index) as any;

        return (
          <div
            key={categoryId}
            id={category?.id}
            className="bg-custom-white rounded-[33px] p-6 container mx-auto my-5"
          >
            <div className="flex items-center gap-3">
              {icon && (
                <Icon name={icon} size={25} color={color} />
              )}
              <span className="font-bold text-custom-neutral text-sm">{title}</span>
            </div>
            <div>
              <div className={cssStyles}>
                {items.map((service) => (
                  <div
                    key={service.label}
                    className="grid place-items-center gap-3 text-center"
                  >
                    <a
                      href={service.disabled ? undefined : service.to}
                      className={`transition hover:scale-110 hover:opacity-60 ${
                        service.disabled ? 'opacity-40 pointer-events-none' : ''
                      }`}
                    >
                      <Icon
                        name={service.icon as any}
                        size={55}
                        className="w-[70px] h-[70px] p-3 bg-custom-whitesmoke rounded-2xl"
                        color={color}
                      />
                      <p className="text-xs mt-2">{service.label}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}


