import { $Enums } from 'generated/prisma';

export default function calcNextBillingDate(
  frequency: $Enums.Frequency,
  date: Date,
) {
  switch (frequency) {
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      // leave date unchanged
      break;
  }

  return date;
}
