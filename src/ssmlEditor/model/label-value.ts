export interface LabelValue {
  label
  value
}

export function defaultLabelValue(): LabelValue {
  return { label: '', value: '' }
}
