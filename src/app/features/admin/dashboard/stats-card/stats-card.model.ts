export interface StatCardData {
  title: string;
  value: number;
  description: string;
  icon: string;
  background: string;
}
export interface StatCardTemplateContext {
  $implicit: StatCardData;
}
