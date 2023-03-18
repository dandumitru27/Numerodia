import { useTranslation } from "react-i18next";

export default function Separator() {
  const { i18n } = useTranslation();

  let separator = ',';
  if (i18n.language === 'ro') {
    separator = '.';
  }

  return (
    <div className='flex items-end text-lg'>{separator}</div>
  )
}
